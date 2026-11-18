import os
import re

ebook_dir = r"P:\prabhu\projects\git_react\react_docs\ebook"
chapters_dir = os.path.join(ebook_dir, "chapters")

def assemble():
    print("Reading ebook.html...")
    with open(os.path.join(ebook_dir, "ebook.html"), "r", encoding="utf-8") as f:
        master = f.read()

    # Read chapter fragments ch06 - ch20
    chapters = {}
    for i in range(6, 21):
        cname = f"ch{i:02d}.html"
        cpath = os.path.join(chapters_dir, cname)
        with open(cpath, "r", encoding="utf-8") as f:
            chapters[i] = f.read().strip()
        print(f"Loaded {cname}: {len(chapters[i])} chars")

    # Read reference files
    ref_files = ["cheatsheets.html", "glossary.html", "index.html", "projects.html"]
    ref_data = {}
    for rname in ref_files:
        rpath = os.path.join(chapters_dir, rname)
        with open(rpath, "r", encoding="utf-8") as f:
            content = f.read()
        body_m = re.search(r'<body[^>]*>(.*?)</body>', content, re.DOTALL | re.IGNORECASE)
        style_m = re.search(r'<style[^>]*>(.*?)</style>', content, re.DOTALL | re.IGNORECASE)
        
        body_content = body_m.group(1).strip() if body_m else content
        style_content = style_m.group(1).strip() if style_m else ""
        
        # Clean up style content: remove body { ... } and * { ... } so they don't conflict
        cleaned_style = re.sub(r'(?s)\bbody\s*\{[^}]*\}', '', style_content)
        cleaned_style = re.sub(r'(?s)\*\s*\{[^}]*\}', '', cleaned_style)
        
        ref_data[rname] = {
            "body": body_content,
            "style": cleaned_style
        }
        print(f"Loaded {rname}: body {len(body_content)} chars, style {len(cleaned_style)} chars")

    # Add IDs to Chapters 1 to 5 in master
    for i in range(1, 6):
        # Find chapter badge Chapter i
        pattern = rf'(<div class=["\']page["\'][^>]*>\s*<div class=["\']page-content["\']>\s*<div class=["\']chapter-header["\'][^>]*>\s*<div class=["\']chapter-badge["\'][^>]*>\s*Chapter\s+{i}\b)'
        def add_id(m, ch_num=i):
            tag = m.group(1)
            # Add id to page div
            return re.sub(r'<div class=["\']page["\']', f'<div class="page" id="chapter-{ch_num}"', tag, count=1)
        
        new_master = re.sub(pattern, add_id, master, count=1)
        if new_master != master:
            print(f"Added id='chapter-{i}'")
            master = new_master
        else:
            print(f"Warning: could not add id for Chapter {i}")

    # Add IDs to Unit dividers in master
    unit_map = {
        "UNIT ONE": "unit-1",
        "UNIT TWO": "unit-2",
        "UNIT THREE": "unit-3",
        "UNIT FOUR": "unit-4",
        "UNIT FIVE": "unit-5"
    }
    for uname, uid in unit_map.items():
        pattern = rf'(<div class=["\']page unit-divider["\'][^>]*>\s*<div class=["\']unit-number["\'][^>]*>\s*{uname}\b)'
        def add_unit_id(m, u_id=uid):
            return re.sub(r'<div class=["\']page unit-divider["\']', f'<div class="page unit-divider" id="{u_id}"', m.group(1), count=1)
        new_master = re.sub(pattern, add_unit_id, master, count=1)
        if new_master != master:
            print(f"Added id='{uid}'")
            master = new_master

    # Replace Chapters 6-9:
    # Look for block from <!-- CHAPTERS 6 TO 9 PLACEHOLDERS --> up to <!-- ================= UNIT 3 DIVIDER: ANGULAR ================= -->
    ch6_9_pattern = r'<!-- ================= CHAPTERS 6 TO 9 PLACEHOLDERS ================= -->.*?<!-- ================= UNIT 3 DIVIDER: ANGULAR ================= -->'
    ch6_9_replacement = "<!-- ================= CHAPTERS 6 TO 9 CONTENT ================= -->\n" + \
                        "\n".join([chapters[6], chapters[7], chapters[8], chapters[9]]) + \
                        "\n\n<!-- ================= UNIT 3 DIVIDER: ANGULAR ================= -->"
    
    if re.search(ch6_9_pattern, master, re.DOTALL):
        master = re.sub(ch6_9_pattern, ch6_9_replacement, master, count=1, flags=re.DOTALL)
        print("Replaced Chapters 6-9 placeholders with full chapters")
    else:
        print("ERROR: Could not find Chapters 6-9 placeholder pattern!")

    # Replace Chapters 10, 11, 12
    for i in (10, 11, 12):
        placeholder = f"<!-- CHAPTER_{i}_CONTENT -->"
        if placeholder in master:
            master = master.replace(placeholder, f"<!-- CHAPTER {i} FULL -->\n" + chapters[i])
            print(f"Replaced {placeholder}")
        else:
            print(f"ERROR: Could not find {placeholder}")

    # Replace Chapters 13 through 20
    for i in range(13, 21):
        placeholder = f"<!-- CHAPTER_{i}_CONTENT -->"
        if placeholder in master:
            master = master.replace(placeholder, f"<!-- CHAPTER {i} FULL -->\n" + chapters[i])
            print(f"Replaced {placeholder}")
        else:
            print(f"ERROR: Could not find {placeholder}")

    # Replace Projects section:
    # <!-- PROJECTS_CONTENT --> ... <!-- CHAPTER_24_CONTENT -->
    proj_pattern = r'<!-- PROJECTS_CONTENT -->.*?<!-- CHAPTER_24_CONTENT -->'
    proj_replacement = '<div id="projects"></div>\n<!-- ================= CAPSTONE PROJECTS CONTENT ================= -->\n' + ref_data["projects.html"]["body"]
    if re.search(proj_pattern, master, re.DOTALL):
        master = re.sub(proj_pattern, proj_replacement, master, count=1, flags=re.DOTALL)
        print("Replaced Capstone Projects section")
    else:
        print("ERROR: Could not find Projects placeholder pattern!")

    # Replace Cheatsheets section
    if "<!-- CHEATSHEETS_CONTENT -->" in master:
        master = master.replace("<!-- CHEATSHEETS_CONTENT -->", '<div id="cheatsheets"></div>\n<!-- ================= CHEATSHEETS CONTENT ================= -->\n' + ref_data["cheatsheets.html"]["body"])
        print("Replaced CHEATSHEETS_CONTENT")

    # Replace Glossary section
    if "<!-- GLOSSARY_CONTENT -->" in master:
        master = master.replace("<!-- GLOSSARY_CONTENT -->", '<div id="glossary"></div>\n<!-- ================= GLOSSARY CONTENT ================= -->\n' + ref_data["glossary.html"]["body"])
        print("Replaced GLOSSARY_CONTENT")

    # Replace Index section
    if "<!-- INDEX_CONTENT -->" in master:
        master = master.replace("<!-- INDEX_CONTENT -->", '<div id="index"></div>\n<!-- ================= INDEX CONTENT ================= -->\n' + ref_data["index.html"]["body"])
        print("Replaced INDEX_CONTENT")

    # Add id to About the author
    master = master.replace('<!-- ================= ABOUT THE AUTHOR ================= -->\n<div class="page">', '<!-- ================= ABOUT THE AUTHOR ================= -->\n<div class="page" id="about-author">')

    # Now inject extra styles from ref_data into <style>
    extra_css = "\n\n/* ================= EXTRA STYLES FOR REFERENCE SECTIONS ================= */\n"
    for rname in ref_files:
        extra_css += f"\n/* --- Styles from {rname} --- */\n" + ref_data[rname]["style"] + "\n"

    # UI styles for floating Print button and Floating TOC Sidebar
    floating_ui_css = """
/* ================= FLOATING UI & NAVIGATION CONTROLS ================= */
.floating-print-btn {
  position: fixed;
  bottom: 28px;
  right: 28px;
  z-index: 99999;
  background: linear-gradient(135deg, #ff6f00 0%, #e65100 100%);
  color: #ffffff;
  border: none;
  border-radius: 50px;
  padding: 14px 24px;
  font-family: 'Nunito', sans-serif;
  font-weight: 800;
  font-size: 15px;
  letter-spacing: 0.5px;
  box-shadow: 0 8px 24px rgba(230, 81, 0, 0.4), 0 2px 6px rgba(0,0,0,0.15);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.floating-print-btn:hover {
  transform: translateY(-3px) scale(1.03);
  box-shadow: 0 12px 30px rgba(230, 81, 0, 0.55), 0 4px 10px rgba(0,0,0,0.2);
  background: linear-gradient(135deg, #ffa000 0%, #ef6c00 100%);
}

.floating-print-btn:active {
  transform: translateY(1px) scale(0.98);
}

/* Floating Table of Contents Sidebar */
.floating-toc-wrapper {
  position: fixed;
  top: 80px;
  left: 0;
  z-index: 99998;
  display: flex;
  align-items: flex-start;
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  transform: translateX(-320px);
}

.floating-toc-wrapper:hover,
.floating-toc-wrapper.pinned {
  transform: translateX(0);
}

.floating-toc-panel {
  width: 320px;
  max-height: calc(100vh - 120px);
  background: rgba(15, 23, 42, 0.94);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-radius: 0 16px 16px 0;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-left: none;
  box-shadow: 10px 10px 35px rgba(0, 0, 0, 0.35);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  color: #f8fafc;
}

.floating-toc-tab {
  background: linear-gradient(135deg, #1a237e 0%, #283593 100%);
  color: #ffffff;
  padding: 12px 14px;
  border-radius: 0 12px 12px 0;
  box-shadow: 4px 4px 16px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  font-family: 'Nunito', sans-serif;
  font-weight: 800;
  font-size: 13px;
  user-select: none;
  border: 1px solid rgba(255,255,255,0.2);
  border-left: none;
  transition: background 0.2s ease;
}

.floating-toc-tab:hover {
  background: linear-gradient(135deg, #283593 0%, #3949ab 100%);
}

.floating-toc-header {
  padding: 18px 20px 14px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.03);
}

.floating-toc-title {
  font-family: 'Nunito', sans-serif;
  font-weight: 900;
  font-size: 16px;
  color: #38bdf8;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.floating-toc-subtitle {
  font-size: 12px;
  color: #94a3b8;
  margin-top: 2px;
}

.floating-toc-list {
  padding: 12px 14px;
  overflow-y: auto;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.floating-toc-list::-webkit-scrollbar {
  width: 6px;
}
.floating-toc-list::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
}

.toc-group-title {
  font-family: 'Nunito', sans-serif;
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #f59e0b;
  margin: 10px 6px 4px 6px;
}

.floating-toc-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 10px;
  color: #e2e8f0;
  text-decoration: none;
  font-family: 'Nunito', sans-serif;
  font-size: 13px;
  font-weight: 600;
  border-radius: 8px;
  transition: all 0.18s ease;
}

.floating-toc-link:hover {
  background: rgba(56, 189, 248, 0.15);
  color: #38bdf8;
  padding-left: 14px;
}

.floating-toc-link span.badge {
  font-size: 10px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.1);
  color: #cbd5e1;
}

/* Print Overrides */
@media print {
  .no-print,
  .floating-print-btn,
  .floating-toc-wrapper {
    display: none !important;
  }
  .cheatsheet-page,
  .projects-container,
  .glossary-container,
  .index-container {
    box-shadow: none !important;
    margin: 0 auto !important;
    max-width: 210mm !important;
    width: 210mm !important;
    page-break-after: always !important;
    break-after: page !important;
    border-radius: 0 !important;
  }
}
"""

    master = master.replace("</style>", extra_css + floating_ui_css + "\n</style>")
    print("Injected extra CSS and Floating UI styles")

    # Build the Floating TOC HTML & Floating Print Button HTML
    floating_ui_html = """
<!-- ================= FLOATING PRINT TO PDF BUTTON ================= -->
<button class="no-print floating-print-btn" onclick="window.print()" title="Print to PDF (Ctrl+P)">
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
    <polyline points="6 9 6 2 18 2 18 9"></polyline>
    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
    <rect x="6" y="14" width="12" height="8"></rect>
  </svg>
  <span>Print to PDF</span>
</button>

<!-- ================= FLOATING TABLE OF CONTENTS SIDEBAR ================= -->
<div class="no-print floating-toc-wrapper" id="floatingToc">
  <div class="floating-toc-panel">
    <div class="floating-toc-header">
      <div class="floating-toc-title">
        <span>📖 Quick Navigator</span>
        <span style="font-size: 11px; cursor: pointer; opacity: 0.7;" onclick="toggleTocPin()">📌 Pin</span>
      </div>
      <div class="floating-toc-subtitle">React 19 & Angular Rosetta Stone</div>
    </div>
    <div class="floating-toc-list">
      <div class="toc-group-title">Front Matter</div>
      <a href="#cover" class="floating-toc-link">Cover Page <span class="badge">A4</span></a>
      <a href="#toc" class="floating-toc-link">Table of Contents <span class="badge">Full</span></a>

      <div class="toc-group-title">Unit 1: The World of Web Dev</div>
      <a href="#unit-1" class="floating-toc-link">Unit 1 Overview <span class="badge">U1</span></a>
      <a href="#chapter-1" class="floating-toc-link">Ch 1: What is a Website? <span class="badge">1</span></a>
      <a href="#chapter-2" class="floating-toc-link">Ch 2: The Three Musketeers <span class="badge">2</span></a>
      <a href="#chapter-3" class="floating-toc-link">Ch 3: What is a Framework? <span class="badge">3</span></a>

      <div class="toc-group-title">Unit 2: React 19 — The Modern Way</div>
      <a href="#unit-2" class="floating-toc-link">Unit 2 Overview <span class="badge">U2</span></a>
      <a href="#chapter-4" class="floating-toc-link">Ch 4: First Component <span class="badge">4</span></a>
      <a href="#chapter-5" class="floating-toc-link">Ch 5: JSX Deep Dive <span class="badge">5</span></a>
      <a href="#chapter-6" class="floating-toc-link">Ch 6: Props Architecture <span class="badge">6</span></a>
      <a href="#chapter-7" class="floating-toc-link">Ch 7: State & App Memory <span class="badge">7</span></a>
      <a href="#chapter-8" class="floating-toc-link">Ch 8: React Hooks Deep Dive <span class="badge">8</span></a>
      <a href="#chapter-9" class="floating-toc-link">Ch 9: React 19 New Powers <span class="badge">9</span></a>

      <div class="toc-group-title">Unit 3: Angular — The Enterprise Giant</div>
      <a href="#unit-3" class="floating-toc-link">Unit 3 Overview <span class="badge">U3</span></a>
      <a href="#chapter-10" class="floating-toc-link">Ch 10: Angular Architecture <span class="badge">10</span></a>
      <a href="#chapter-11" class="floating-toc-link">Ch 11: Templates vs JSX <span class="badge">11</span></a>
      <a href="#chapter-12" class="floating-toc-link">Ch 12: Services & DI <span class="badge">12</span></a>

      <div class="toc-group-title">Unit 4: Rosetta Stone — Side-by-Side</div>
      <a href="#unit-4" class="floating-toc-link">Unit 4 Overview <span class="badge">U4</span></a>
      <a href="#chapter-13" class="floating-toc-link">Ch 13: Zone.js vs Fiber <span class="badge">13</span></a>
      <a href="#chapter-14" class="floating-toc-link">Ch 14: Signals vs Hooks <span class="badge">14</span></a>
      <a href="#chapter-15" class="floating-toc-link">Ch 15: RxJS vs State Mgmt <span class="badge">15</span></a>
      <a href="#chapter-16" class="floating-toc-link">Ch 16: Forms & Validation <span class="badge">16</span></a>
      <a href="#chapter-17" class="floating-toc-link">Ch 17: Routing & Navigation <span class="badge">17</span></a>
      <a href="#chapter-18" class="floating-toc-link">Ch 18: Performance Tuning <span class="badge">18</span></a>
      <a href="#chapter-19" class="floating-toc-link">Ch 19: Testing Paradigms <span class="badge">19</span></a>
      <a href="#chapter-20" class="floating-toc-link">Ch 20: Decision Matrix & Flow <span class="badge">20</span></a>

      <div class="toc-group-title">Unit 5: Capstone Projects</div>
      <a href="#unit-5" class="floating-toc-link">Unit 5 Overview <span class="badge">U5</span></a>
      <a href="#projects" class="floating-toc-link">Capstone Projects (1 & 2) <span class="badge">Apps</span></a>

      <div class="toc-group-title">Reference & Back Matter</div>
      <a href="#cheatsheets" class="floating-toc-link">5 Full Cheatsheets <span class="badge">Ref</span></a>
      <a href="#glossary" class="floating-toc-link">A-Z Master Glossary <span class="badge">60+</span></a>
      <a href="#index" class="floating-toc-link">Subject Index <span class="badge">100+</span></a>
      <a href="#about-author" class="floating-toc-link">About the Author <span class="badge">Bio</span></a>
    </div>
  </div>
  <div class="floating-toc-tab" title="Click or hover to browse table of contents">
    <span>📖</span>
    <span>T</span>
    <span>O</span>
    <span>C</span>
    <span>❯</span>
  </div>
</div>

<script>
function toggleTocPin() {
  const toc = document.getElementById('floatingToc');
  toc.classList.toggle('pinned');
}
// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.floating-toc-link').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href').substring(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});
</script>
"""

    # Add id="cover" to cover page
    master = master.replace('<div class="page cover-page">', '<div class="page cover-page" id="cover">')
    # Add id="toc" to TOC page
    master = master.replace('<!-- ================= PAGE 6: TABLE OF CONTENTS (PART 1) ================= -->\n<div class="page">', '<!-- ================= PAGE 6: TABLE OF CONTENTS (PART 1) ================= -->\n<div class="page" id="toc">')

    # Inject floating UI before </body>
    master = master.replace("</body>", floating_ui_html + "\n</body>")

    # Output file path
    final_path = os.path.join(ebook_dir, "FINAL_EBOOK.html")
    with open(final_path, "w", encoding="utf-8") as f:
        f.write(master)

    file_size_bytes = os.path.getsize(final_path)
    file_size_kb = file_size_bytes / 1024.0
    print(f"\n==========================================")
    print(f"ASSEMBLY COMPLETE!")
    print(f"Final file: {final_path}")
    print(f"Final file size: {file_size_bytes:,} bytes ({file_size_kb:.1f} KB)")
    print(f"==========================================")
    return file_size_kb

if __name__ == "__main__":
    assemble()
