import re

with open(r"P:\prabhu\projects\git_react\react_docs\ebook\ebook.html", "r", encoding="utf-8") as f:
    text = f.read()

for i in range(1, 6):
    m = re.search(rf'Chapter\s+{i}\b', text)
    print(f"Chapter {i} found at {m.start() if m else None}")
    # find enclosing page or header
    if m:
        snippet = text[max(0, m.start()-100):min(len(text), m.start()+200)]
        print(snippet[:150].replace('\n', ' '))
