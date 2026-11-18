import os
import re

with open(r"P:\prabhu\projects\git_react\react_docs\ebook\ebook.html", "r", encoding="utf-8") as f:
    text = f.read()

print("IDs in ebook.html:")
for x in re.findall(r'id=["\']([^"\']+)["\']', text):
    if any(k in x for k in ["chap", "unit", "toc", "author", "foreword"]):
        print(" ", x)

chapters_dir = r"P:\prabhu\projects\git_react\react_docs\ebook\chapters"
for name in sorted(os.listdir(chapters_dir)):
    with open(os.path.join(chapters_dir, name), "r", encoding="utf-8") as f:
        c = f.read()
    ids = re.findall(r'id=["\']([^"\']+)["\']', c)
    print(f"{name}: {ids[:4]}")
