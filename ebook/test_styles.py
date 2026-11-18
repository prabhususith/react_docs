import os
import re

chapters_dir = r"P:\prabhu\projects\git_react\react_docs\ebook\chapters"

for fname in ["cheatsheets.html", "glossary.html", "index.html", "projects.html"]:
    fpath = os.path.join(chapters_dir, fname)
    with open(fpath, "r", encoding="utf-8") as f:
        c = f.read()
    style = re.search(r'<style[^>]*>(.*?)</style>', c, re.DOTALL | re.IGNORECASE).group(1)
    print(f"=== {fname} style ===")
    print(style[:400])
    print("\n------------------\n")
