import json
from rapidfuzz import fuzz 
from datetime import datetime
from collections import defaultdict
from datetime import date
import re
import sqlite3
import uuid

def normalize(scores):
    total = sum(scores.values()) or 1
    return {k: v / total for k, v in scores.items()}

def interpret_with_llm(line, glossary_hits, llm_client=None):
    text = line["text"].lower()

    # LAB
    if re.search(r"\d", text) and re.search(r"(mg|dl|%)", text):
        nums = re.findall(r"\d+\.?\d*", text)
        return {
            "type": "LAB",
            "confidence": 0.9,
            "test": glossary_hits[0]["term"] if glossary_hits else extract_candidate_term(text),
            "value": float(nums[0]) if nums else None,
            "unit": "%" if "%" in text else "mg/dL",
            "reference": None,
            "flag": None
        }

    # MED
    if re.search(r"(tab|cap|od|bd|hs)", text):
        return {
            "type": "MED",
            "confidence": 0.9,
            "drug": glossary_hits[0]["term"] if glossary_hits else extract_candidate_term(text),
            "dose": None,
            "route": "oral",
            "frequency": "OD",
            "duration": None
        }

    # NOTE
    return {
        "type": "NOTE",
        "confidence": 0.8,
        "text": line["text"],
        "category": "general"
    }



def canonicalize_lines(ocr_text):
    lines = []
    for i, line in enumerate(ocr_text.split("\n"), start=1):
        if line.strip():
            lines.append({
                "line_id": i,
                "text": line.strip()
            })
    return lines


def section_scores(line):
    scores = {"LAB": 0, "MED": 0, "NOTES": 0}

    if re.search(r"\d", line):
        scores["LAB"] += 1
    if re.search(r"(mg|dl|%)", line.lower()):
        scores["LAB"] += 2
    if re.search(r"(tab|cap|od|bd|hs)", line.lower()):
        scores["MED"] += 2
    if re.search(r"(complains|advised|follow)", line.lower()):
        scores["NOTES"] += 1

    return normalize(scores)

def enrich_lines(lines):
    enriched = []

    for i, line in enumerate(lines):
        enriched.append({
            "line_id": line["line_id"],
            "text": line["text"],
            "prev": lines[i-1]["text"] if i > 0 else "",
            "next": lines[i+1]["text"] if i < len(lines)-1 else "",
            "section_scores": section_scores(line["text"])
        })

    return enriched

def load_glossary(path="glossary.json"):
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def retrieve_glossary(line_text, glossary, threshold=85, k=3):
    hits = []
    text = line_text.lower()

    for entry in glossary:
        term = entry["term"].lower()
        if term in text:
            hits.append(entry)
        elif fuzz.partial_ratio(term, text) >= threshold:
            hits.append(entry)

    return hits[:k]

UNKNOWN_CONFIDENCE_THRESHOLD = 0.7

def is_unknown(llm_output):
    if llm_output is None:
        return True
    if llm_output.get("confidence", 0) < UNKNOWN_CONFIDENCE_THRESHOLD:
        return True
    if llm_output.get("type") is None:
        return True
    return False

def log_unknown_term(line, llm_output, store):
    record = {
        "term": extract_candidate_term(line["text"]),
        "full_line": line["text"],
        "context": {
            "prev": line["prev"],
            "next": line["next"]
        },
        "section_scores": line["section_scores"],
        "confidence": llm_output.get("confidence") if llm_output else None,
        "first_seen": datetime.utcnow().isoformat(),
        "occurrences": 1,
        "status": "unreviewed"
    }

    store.upsert(record)

def extract_candidate_term(text):
    tokens = re.findall(r"[A-Za-z./]+", text)
    return max(tokens, key=len) if tokens else text

def Glossary(lines, glossary, llm_client, unknown_store):
    results = []

    for line in lines:
        glossary_hits = retrieve_glossary(line["text"], glossary)
        llm_output = interpret_with_llm(line, glossary_hits, llm_client)

        if is_unknown(llm_output):
            log_unknown_term(line, llm_output or {}, unknown_store)
            continue

        results.append({
            "line_id": line["line_id"],
            "text": line["text"],
            "interpreted": llm_output
        })

    return results


def aggregate(interpreted_lines):
    record = {
        "meta": {
            "generated_on": date.today().isoformat(),
            "source": "ocr+llm"
        },
        "labs": [],
        "medications": [],
        "clinical_notes": []
    }

    seen = {
        "labs": set(),
        "medications": set(),
        "clinical_notes": set()
    }

    for item in interpreted_lines:
        data = item["interpreted"]
        t = data["type"]

        if t == "LAB":
            key = (data.get("test"), data.get("value"), data.get("unit"))
            if key in seen["labs"]:
                continue
            seen["labs"].add(key)

            record["labs"].append({
                "test": data.get("test"),
                "value": data.get("value"),
                "unit": data.get("unit"),
                "reference": data.get("reference"),
                "flag": data.get("flag"),
                "source_line": item["line_id"]
            })

        elif t == "MED":
            key = (data.get("drug"), data.get("dose"), data.get("frequency"))
            if key in seen["medications"]:
                continue
            seen["medications"].add(key)

            record["medications"].append({
                "drug": data.get("drug"),
                "dose": data.get("dose"),
                "route": data.get("route"),
                "frequency": data.get("frequency"),
                "duration": data.get("duration"),
                "source_line": item["line_id"]
            })

        elif t == "NOTE":
            text = data.get("text")
            if not text or text in seen["clinical_notes"]:
                continue
            seen["clinical_notes"].add(text)

            record["clinical_notes"].append({
                "text": text,
                "category": data.get("category"),
                "source_line": item["line_id"]
            })

    return record

def extract_patient_metadata(lines):
    meta = {}

    for l in lines:
        t = l["text"].lower()

        if "age" in t:
            m = re.search(r"(\d{1,3})\s*years?", t)
            if m: meta["age"] = int(m.group(1))

        if "height" in t:
            m = re.search(r"(\d+\.?\d*)\s*(cm|m)", t)
            if m: meta["height_cm"] = float(m.group(1))

        if "weight" in t:
            m = re.search(r"(\d+\.?\d*)\s*(kg)", t)
            if m: meta["weight_kg"] = float(m.group(1))

        if "blood" in t and "group" in t:
            m = re.search(r"(a\+|a-|b\+|b-|ab\+|ab-|o\+|o-)", t)
            if m: meta["blood_group"] = m.group(1).upper()

        if "male" in t or "female" in t:
            meta["sex"] = "male" if "male" in t else "female"

    return meta

COMMON_TREND_LABS = {
    "hba1c", "glucose", "creatinine", "hemoglobin",
    "cholesterol", "urea", "bp", "spo2"
}

def select_trend_labs(labs, k=4):
    ranked = []

    for lab in labs:
        name = lab["test"].lower() if lab["test"] else ""
        score = 0
        if name in COMMON_TREND_LABS:
            score += 2
        if isinstance(lab["value"], (int, float)):
            score += 1
        ranked.append((score, lab))

    ranked.sort(reverse=True, key=lambda x: x[0])
    return [l for _, l in ranked[:k]]

def summarize_patient(record, llm_client=None):
    labs = record["labs"]
    meds = record["medications"]

    abnormal = [l for l in labs if l.get("flag")]

    summary = "Patient summary:\n"

    if abnormal:
        summary += "Abnormal findings include: "
        summary += ", ".join(f"{l['test']} ({l['value']} {l['unit']})" for l in abnormal)
        summary += ". "

    if meds:
        summary += "Patient is currently on "
        summary += ", ".join(m["drug"] for m in meds) + ". "

    return summary.strip()

def final_pipeline(ocr_text, glossary):
    lines = canonicalize_lines(ocr_text)
    enriched = enrich_lines(lines)

    metadata = extract_patient_metadata(enriched)

    interpreted = step3(enriched, glossary, None, UnknownStore())
    record = aggregate(interpreted)

    trends = select_trend_labs(record["labs"])
    summary = summarize_patient(record)

    return {
        "patient_metadata": metadata,
        "tables": {
            "labs": record["labs"],
            "medications": record["medications"],
            "clinical_notes": record["clinical_notes"]
        },
        "trend_metrics": trends,
        "ai_summary": summary
    }



