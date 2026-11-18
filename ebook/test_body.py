import os
import re

ebook_dir = r"P:\prabhu\projects\git_react\react_docs\ebook"
chapters_dir = os.path.join(ebook_dir, "chapters")

for fname in ["cheatsheets.html", "glossary.html", "index.html", "projects.html"]:
    fpath = os.path.join(chapters_dir, fname)
    with open(fpath, "r", encoding="utf-8") as f:
        c = f.read()
    body = re.search(r'<body[^>]*>(.*?)</body>', c, re.DOTALL | re.IGNORECASE).group(1)
    pages = re.findall(r'<div[^>]*class=[\'"][^\'"]*page[^\'"]*[\'"]', body)
    print(f"=== {fname} ===")
    print(f"Body length: {len(body)}, Page divs found: {len(pages)}")
    print("First 300 chars:")
    print(body.strip()[:300])
    print("\n------------------\n")
