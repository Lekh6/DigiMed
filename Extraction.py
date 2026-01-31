import json
from rapidfuzz import fuzz 
from datetime import datetime

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

def step3(lines, glossary, llm_client, unknown_store):
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



