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
    scores = {"LAB":0,"MED":0,"NOTES":0}

    if re.search(r"\d", line): scores["LAB"] += 1
    if re.search(r"(mg|dl|%)", line.lower()): scores["LAB"] += 2
    if re.search(r"(tab|cap|od|bd|hs)", line.lower()): scores["MED"] += 2
    if re.search(r"(complains|advised|follow)", line.lower()): scores["NOTES"] += 1

    return normalize(scores)
