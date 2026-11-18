import os
import re

final_path = r"P:\prabhu\projects\git_react\react_docs\ebook\FINAL_EBOOK.html"

with open(final_path, "r", encoding="utf-8") as f:
    content = f.read()

print("File size:", len(content), "bytes")

# Check all chapters exist
for i in range(1, 21):
    has_id = f'id="chapter-{i}"' in content or f"id='chapter-{i}'" in content
    has_mention = f"Chapter {i}" in content
    print(f"Chapter {i:2d}: id present={has_id}, text present={has_mention}")

# Check Units
for u in range(1, 6):
    has_unit = f'id="unit-{u}"' in content
    print(f"Unit {u:2d}: id present={has_unit}")

# Check sections
for s in ["projects", "cheatsheets", "glossary", "index", "about-author", "cover", "toc"]:
    has_s = f'id="{s}"' in content
    print(f"Section {s:15s}: id present={has_s}")

# Check remaining placeholders
rem = re.findall(r'<!--\s*(CHAPTER_\d+_CONTENT|PROJECTS_CONTENT|CHEATSHEETS_CONTENT|GLOSSARY_CONTENT|INDEX_CONTENT)\s*-->', content)
print("Remaining unreplaced placeholders:", rem)

# Check print button and TOC sidebar
print("Print button present:", 'floating-print-btn' in content)
print("TOC sidebar present:", 'floating-toc-wrapper' in content)
print("Self-contained (no broken external scripts):", '<script src=' not in content)
