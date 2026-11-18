import os
import re

ebook_dir = r"P:\prabhu\projects\git_react\react_docs\ebook"
chapters_dir = os.path.join(ebook_dir, "chapters")

with open(os.path.join(ebook_dir, "ebook.html"), "r", encoding="utf-8") as f:
    ebook_html = f.read()

print("ebook.html length:", len(ebook_html))

# Check styles in chapters
for fname in sorted(os.listdir(chapters_dir)):
    fpath = os.path.join(chapters_dir, fname)
    with open(fpath, "r", encoding="utf-8") as f:
        c = f.read()
    styles = re.findall(r'<style[^>]*>(.*?)</style>', c, re.DOTALL | re.IGNORECASE)
    has_body = "<body" in c.lower()
    has_html = "<html" in c.lower()
    print(f"{fname:18} | length: {len(c):6} | styles: {len(styles)} | html/body: {has_html}/{has_body}")
