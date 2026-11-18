import os

# Complete script to generate P:\prabhu\projects\git_react\react_docs\ebook\ebook.html

output_file = r"P:\prabhu\projects\git_react\react_docs\ebook\ebook.html"

def get_cover_svg():
    return '''<svg width="340" height="180" viewBox="0 0 340 180" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="glow-react" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="6" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
    <filter id="glow-ng" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="6" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
    <linearGradient id="reactGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#61dafb" />
      <stop offset="100%" stop-color="#0288d1" />
    </linearGradient>
    <linearGradient id="ngGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ff1744" />
      <stop offset="100%" stop-color="#b71c1c" />
    </linearGradient>
    <linearGradient id="bridgeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#0288d1" stop-opacity="0.8" />
      <stop offset="50%" stop-color="#ffb300" stop-opacity="1" />
      <stop offset="100%" stop-color="#dd0031" stop-opacity="0.8" />
    </linearGradient>
  </defs>

  <!-- React Side (Left) -->
  <g transform="translate(85, 90)">
    <!-- Orbits -->
    <ellipse rx="55" ry="20" stroke="url(#reactGrad)" stroke-width="2.5" fill="none" opacity="0.85" transform="rotate(0)" />
    <ellipse rx="55" ry="20" stroke="url(#reactGrad)" stroke-width="2.5" fill="none" opacity="0.85" transform="rotate(60)" />
    <ellipse rx="55" ry="20" stroke="url(#reactGrad)" stroke-width="2.5" fill="none" opacity="0.85" transform="rotate(120)" />
    <!-- Nucleus -->
    <circle r="12" fill="url(#reactGrad)" filter="url(#glow-react)" />
    <!-- Particles -->
    <circle cx="48" cy="10" r="3.5" fill="#ffffff" />
    <circle cx="-35" cy="38" r="3" fill="#ffffff" />
    <text x="0" y="55" text-anchor="middle" font-family="'Nunito', sans-serif" font-weight="900" font-size="13" fill="#61dafb" letter-spacing="1.5">REACT 19</text>
  </g>

  <!-- Rosetta Bridge in Center -->
  <g>
    <!-- Bridge curves -->
    <path d="M 135 75 C 170 55, 170 55, 205 75" stroke="url(#bridgeGrad)" stroke-width="3" stroke-dasharray="4 4" fill="none" />
    <path d="M 135 105 C 170 125, 170 125, 205 105" stroke="url(#bridgeGrad)" stroke-width="3" stroke-dasharray="4 4" fill="none" />
    
    <!-- Central Rosetta Key Stone -->
    <rect x="156" y="76" width="28" height="28" rx="6" fill="#1a237e" stroke="#ffca28" stroke-width="2" />
    <path d="M 170 82 L 178 94 L 162 94 Z" fill="#ffca28" />
    <circle cx="170" cy="91" r="2" fill="#1a237e" />
  </g>

  <!-- Angular Side (Right) -->
  <g transform="translate(255, 90)">
    <!-- Angular Shield -->
    <polygon points="0,-48 42,-32 35,28 0,48 -35,28 -42,-32" fill="url(#ngGrad)" filter="url(#glow-ng)" />
    <polygon points="0,-42 36,-28 30,24 0,42 -30,24 -36,-28" fill="#dd0031" />
    <polygon points="0,-42 0,42 30,24 36,-28" fill="#c2185b" opacity="0.3" />
    <!-- White 'A' -->
    <path d="M 0 -28 L 22 22 L 12 22 L 7 9 L -7 9 L -12 22 L -22 22 Z M 0 -10 L 4 3 L -4 3 Z" fill="#ffffff" />
    <text x="0" y="65" text-anchor="middle" font-family="'Nunito', sans-serif" font-weight="900" font-size="13" fill="#ff8a80" letter-spacing="1.5">ANGULAR</text>
  </g>
</svg>'''

def get_house_svg():
    return '''<svg width="480" height="240" viewBox="0 0 480 240" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#e3f2fd" />
      <stop offset="100%" stop-color="#ffffff" />
    </linearGradient>
  </defs>
  <!-- Background ground -->
  <rect x="10" y="10" width="460" height="220" rx="12" fill="url(#skyGrad)" stroke="#bbdefb" stroke-width="1.5" />
  <rect x="20" y="200" width="440" height="15" rx="4" fill="#a5d6a7" />

  <!-- Foundation: HTML -->
  <rect x="90" y="180" width="300" height="20" rx="3" fill="#ff7043" stroke="#d84315" stroke-width="2" />
  <text x="240" y="195" text-anchor="middle" font-family="'Nunito', sans-serif" font-weight="800" font-size="11" fill="#ffffff">HTML FOUNDATION: STRUCTURE & SKELETON (&lt;header&gt;, &lt;main&gt;, &lt;footer&gt;)</text>

  <!-- Walls: HTML + CSS styling -->
  <rect x="110" y="90" width="260" height="90" fill="#fff9c4" stroke="#fbc02d" stroke-width="2" />
  
  <!-- Roof: CSS Styling & Decoration -->
  <polygon points="240,25 90,90 390,90" fill="#42a5f5" stroke="#1976d2" stroke-width="2" />
  <text x="240" y="65" text-anchor="middle" font-family="'Nunito', sans-serif" font-weight="800" font-size="12" fill="#ffffff">CSS: PAINT, ROOF & BEAUTY (Colors, Flexbox, Grid)</text>

  <!-- Windows & Door -->
  <rect x="135" y="105" width="45" height="40" rx="4" fill="#ffffff" stroke="#0288d1" stroke-width="2" />
  <line x1="157.5" y1="105" x2="157.5" y2="145" stroke="#0288d1" stroke-width="1.5" />
  <line x1="135" y1="125" x2="180" y2="125" stroke="#0288d1" stroke-width="1.5" />

  <rect x="300" y="105" width="45" height="40" rx="4" fill="#ffffff" stroke="#0288d1" stroke-width="2" />
  <line x1="322.5" y1="105" x2="322.5" y2="145" stroke="#0288d1" stroke-width="1.5" />
  <line x1="300" y1="125" x2="345" y2="125" stroke="#0288d1" stroke-width="1.5" />

  <!-- Door: Interactive JS -->
  <rect x="215" y="120" width="50" height="60" rx="3" fill="#66bb6a" stroke="#2e7d32" stroke-width="2" />
  <circle cx="256" cy="150" r="3.5" fill="#ffd54f" />
  <text x="240" y="145" text-anchor="middle" font-family="'Nunito', sans-serif" font-weight="800" font-size="9" fill="#ffffff">DOORBELL</text>
  
  <!-- JavaScript Electricity / Lightning Lines -->
  <path d="M 240 100 L 255 112 L 248 114 L 260 128" stroke="#ff9800" stroke-width="3" fill="none" stroke-linecap="round" />
  
  <!-- Callout badges -->
  <g transform="translate(30, 45)">
    <rect width="85" height="26" rx="6" fill="#e3f2fd" stroke="#0288d1" />
    <text x="42.5" y="17" text-anchor="middle" font-family="'Nunito', sans-serif" font-weight="700" font-size="10" fill="#01579b">🎨 CSS (Style)</text>
  </g>
  <g transform="translate(365, 45)">
    <rect width="85" height="26" rx="6" fill="#fff3e0" stroke="#ff9800" />
    <text x="42.5" y="17" text-anchor="middle" font-family="'Nunito', sans-serif" font-weight="700" font-size="10" fill="#e65100">⚡ JS (Action)</text>
  </g>
</svg>'''

def get_trio_svg():
    return '''<svg width="480" height="180" viewBox="0 0 480 180" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- HTML Hero Card -->
  <g transform="translate(25, 20)">
    <rect width="130" height="140" rx="10" fill="#fff3e0" stroke="#ff6d00" stroke-width="2" />
    <circle cx="65" cy="45" r="24" fill="#ff6d00" />
    <!-- HTML Shield icon -->
    <path d="M 55 35 L 75 35 L 72 55 L 65 60 L 58 55 Z" fill="#ffffff" />
    <text x="65" y="49" text-anchor="middle" font-family="'Nunito', sans-serif" font-weight="900" font-size="11" fill="#ff6d00">&lt;/&gt;</text>
    <text x="65" y="86" text-anchor="middle" font-family="'Nunito', sans-serif" font-weight="800" font-size="13" fill="#bf360c">1. HTML</text>
    <text x="65" y="104" text-anchor="middle" font-family="'Nunito', sans-serif" font-weight="600" font-size="10.5" fill="#5d4037">The Architect</text>
    <text x="65" y="122" text-anchor="middle" font-family="'Nunito', sans-serif" font-size="9.5" fill="#8d6e63">Structure & Content</text>
  </g>

  <!-- CSS Hero Card -->
  <g transform="translate(175, 20)">
    <rect width="130" height="140" rx="10" fill="#e1f5fe" stroke="#0288d1" stroke-width="2" />
    <circle cx="65" cy="45" r="24" fill="#0288d1" />
    <!-- Paintbrush icon -->
    <path d="M 60 40 L 70 30 C 73 33 73 37 70 40 L 65 45 Z M 57 43 L 53 53 L 63 49 Z" fill="#ffffff" />
    <text x="65" y="86" text-anchor="middle" font-family="'Nunito', sans-serif" font-weight="800" font-size="13" fill="#01579b">2. CSS</text>
    <text x="65" y="104" text-anchor="middle" font-family="'Nunito', sans-serif" font-weight="600" font-size="10.5" fill="#0277bd">The Stylist</text>
    <text x="65" y="122" text-anchor="middle" font-family="'Nunito', sans-serif" font-size="9.5" fill="#546e7a">Colors, Fonts & Layout</text>
  </g>

  <!-- JS Hero Card -->
  <g transform="translate(325, 20)">
    <rect width="130" height="140" rx="10" fill="#fffde7" stroke="#fbc02d" stroke-width="2" />
    <circle cx="65" cy="45" r="24" fill="#fbc02d" />
    <!-- Lightning icon -->
    <polygon points="67,30 56,43 64,43 61,58 74,45 66,45" fill="#ffffff" />
    <text x="65" y="86" text-anchor="middle" font-family="'Nunito', sans-serif" font-weight="800" font-size="13" fill="#f57f17">3. JAVASCRIPT</text>
    <text x="65" y="104" text-anchor="middle" font-family="'Nunito', sans-serif" font-weight="600" font-size="10.5" fill="#f57f17">The Wizard</text>
    <text x="65" y="122" text-anchor="middle" font-family="'Nunito', sans-serif" font-size="9.5" fill="#78909c">Logic, APIs & Life</text>
  </g>
</svg>'''

def get_lego_svg():
    return '''<svg width="480" height="200" viewBox="0 0 480 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- LEGO Brick 1: Header Component (Top Red) -->
  <g transform="translate(140, 20)">
    <!-- Studs -->
    <rect x="25" y="0" width="30" height="10" rx="3" fill="#d32f2f" />
    <rect x="85" y="0" width="30" height="10" rx="3" fill="#d32f2f" />
    <rect x="145" y="0" width="30" height="10" rx="3" fill="#d32f2f" />
    <!-- Brick body -->
    <rect x="0" y="8" width="200" height="38" rx="4" fill="#f44336" stroke="#b71c1c" stroke-width="2" />
    <text x="100" y="32" text-anchor="middle" font-family="'Nunito', sans-serif" font-weight="800" font-size="12" fill="#ffffff">&lt;HeaderComponent /&gt;</text>
  </g>

  <!-- LEGO Brick 2: Sidebar (Blue) -->
  <g transform="translate(140, 68)">
    <rect x="15" y="0" width="22" height="8" rx="2" fill="#1565c0" />
    <rect x="45" y="0" width="22" height="8" rx="2" fill="#1565c0" />
    <rect x="0" y="6" width="85" height="55" rx="4" fill="#2196f3" stroke="#0d47a1" stroke-width="2" />
    <text x="42.5" y="35" text-anchor="middle" font-family="'Nunito', sans-serif" font-weight="800" font-size="10" fill="#ffffff">&lt;Sidebar /&gt;</text>
  </g>

  <!-- LEGO Brick 3: Feed / Content (Green) -->
  <g transform="translate(235, 68)">
    <rect x="20" y="0" width="25" height="8" rx="2" fill="#2e7d32" />
    <rect x="60" y="0" width="25" height="8" rx="2" fill="#2e7d32" />
    <rect x="0" y="6" width="105" height="55" rx="4" fill="#4caf50" stroke="#1b5e20" stroke-width="2" />
    <text x="52.5" y="35" text-anchor="middle" font-family="'Nunito', sans-serif" font-weight="800" font-size="10" fill="#ffffff">&lt;PostFeed /&gt;</text>
  </g>

  <!-- LEGO Brick 4: Footer Component (Orange) -->
  <g transform="translate(140, 134)">
    <rect x="25" y="0" width="30" height="8" rx="2" fill="#e65100" />
    <rect x="85" y="0" width="30" height="8" rx="2" fill="#e65100" />
    <rect x="145" y="0" width="30" height="8" rx="2" fill="#e65100" />
    <rect x="0" y="6" width="200" height="34" rx="4" fill="#ff9800" stroke="#e65100" stroke-width="2" />
    <text x="100" y="28" text-anchor="middle" font-family="'Nunito', sans-serif" font-weight="800" font-size="12" fill="#ffffff">&lt;FooterComponent /&gt;</text>
  </g>

  <!-- Side Explanations -->
  <g transform="translate(10, 75)">
    <text x="0" y="15" font-family="'Nunito', sans-serif" font-weight="700" font-size="11" fill="#1a237e">📦 Independent</text>
    <text x="0" y="35" font-family="'Nunito', sans-serif" font-weight="700" font-size="11" fill="#1a237e">🔁 Reusable</text>
    <text x="0" y="55" font-family="'Nunito', sans-serif" font-weight="700" font-size="11" fill="#1a237e">🧩 Composable</text>
  </g>
</svg>'''

def get_component_brick_svg():
    return '''<svg width="480" height="190" viewBox="0 0 480 190" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Input: Props -->
  <g transform="translate(20, 55)">
    <rect width="105" height="70" rx="8" fill="#e0f7fa" stroke="#00acc1" stroke-width="2" />
    <text x="52.5" y="28" text-anchor="middle" font-family="'Nunito', sans-serif" font-weight="800" font-size="11" fill="#00838f">INPUT</text>
    <text x="52.5" y="46" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-weight="600" font-size="12" fill="#006064">props</text>
    <text x="52.5" y="59" text-anchor="middle" font-family="'Nunito', sans-serif" font-size="9.5" fill="#546e7a">(name, age, avatar)</text>
  </g>

  <!-- Arrow Right 1 -->
  <path d="M 132 90 L 165 90" stroke="#00acc1" stroke-width="3" marker-end="url(#arrow)" />
  <polygon points="170,90 162,85 162,95" fill="#00acc1" />

  <!-- The Component Box -->
  <g transform="translate(175, 25)">
    <rect width="140" height="130" rx="10" fill="#e8eaf6" stroke="#3949ab" stroke-width="2.5" />
    <rect x="0" y="0" width="140" height="32" rx="8" fill="#3949ab" />
    <text x="70" y="21" text-anchor="middle" font-family="'Nunito', sans-serif" font-weight="800" font-size="12" fill="#ffffff">React Component</text>
    
    <text x="70" y="56" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="11" fill="#1a237e">function Card(props)</text>
    <path d="M 20 70 L 120 70" stroke="#c5cae9" stroke-width="1.5" />
    <text x="70" y="90" text-anchor="middle" font-family="'Nunito', sans-serif" font-size="10.5" fill="#37474f">Pure Computation</text>
    <text x="70" y="105" text-anchor="middle" font-family="'Nunito', sans-serif" font-size="10" fill="#7986cb">Logic + State</text>
    <text x="70" y="120" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-weight="600" font-size="10" fill="#2e7d32">return &lt;JSX /&gt;</text>
  </g>

  <!-- Arrow Right 2 -->
  <polygon points="350,90 342,85 342,95" fill="#43a047" />
  <path d="M 320 90 L 345 90" stroke="#43a047" stroke-width="3" />

  <!-- Output: Virtual DOM / UI -->
  <g transform="translate(355, 55)">
    <rect width="105" height="70" rx="8" fill="#e8f5e9" stroke="#43a047" stroke-width="2" />
    <text x="52.5" y="28" text-anchor="middle" font-family="'Nunito', sans-serif" font-weight="800" font-size="11" fill="#2e7d32">OUTPUT</text>
    <text x="52.5" y="46" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-weight="600" font-size="12" fill="#1b5e20">Virtual DOM</text>
    <text x="52.5" y="59" text-anchor="middle" font-family="'Nunito', sans-serif" font-size="9.5" fill="#546e7a">(Real Browser Pixels)</text>
  </g>
</svg>'''

def get_magic_wand_svg():
    return '''<svg width="480" height="180" viewBox="0 0 480 180" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- JSX Code on Left -->
  <g transform="translate(20, 35)">
    <rect width="145" height="105" rx="8" fill="#212121" stroke="#424242" stroke-width="1.5" />
    <text x="12" y="25" font-family="'Nunito', sans-serif" font-weight="800" font-size="10" fill="#90caf9">JSX TEMPLATE</text>
    <text x="12" y="50" font-family="'JetBrains Mono', monospace" font-size="10.5" fill="#f48fb1">&lt;div <tspan fill="#ffe082">class</tspan>=<tspan fill="#a5d6a7">"box"</tspan>&gt;</text>
    <text x="24" y="70" font-family="'JetBrains Mono', monospace" font-size="10.5" fill="#ffffff">&lt;h1&gt;{name}&lt;/h1&gt;</text>
    <text x="12" y="90" font-family="'JetBrains Mono', monospace" font-size="10.5" fill="#f48fb1">&lt;/div&gt;</text>
  </g>

  <!-- Magic Wand in Center -->
  <g transform="translate(195, 20)">
    <!-- Wand body -->
    <line x1="20" y1="130" x2="65" y2="35" stroke="#4e342e" stroke-width="7" stroke-linecap="round" />
    <line x1="60" y1="45" x2="65" y2="35" stroke="#ffd54f" stroke-width="9" stroke-linecap="round" />
    
    <!-- Magic sparkles -->
    <path d="M 68 25 L 72 15 L 76 25 L 86 29 L 76 33 L 72 43 L 68 33 L 58 29 Z" fill="#ffca28" />
    <circle cx="88" cy="18" r="3" fill="#ff4081" />
    <circle cx="50" cy="22" r="2.5" fill="#00e676" />
    <circle cx="75" cy="55" r="2.5" fill="#651fff" />
    <text x="45" y="152" text-anchor="middle" font-family="'Nunito', sans-serif" font-weight="800" font-size="10" fill="#ff6f00">React Compiler</text>
  </g>

  <!-- Generated JS on Right -->
  <g transform="translate(295, 35)">
    <rect width="165" height="105" rx="8" fill="#1a237e" stroke="#3949ab" stroke-width="1.5" />
    <text x="12" y="25" font-family="'Nunito', sans-serif" font-weight="800" font-size="10" fill="#80cbc4">COMPILED JS (jsx-runtime)</text>
    <text x="12" y="50" font-family="'JetBrains Mono', monospace" font-size="9.5" fill="#80deea">_jsx(<tspan fill="#a5d6a7">"div"</tspan>, {</text>
    <text x="22" y="68" font-family="'JetBrains Mono', monospace" font-size="9.5" fill="#ffcc80">className: <tspan fill="#a5d6a7">"box"</tspan>,</text>
    <text x="22" y="86" font-family="'JetBrains Mono', monospace" font-size="9.5" fill="#ffcc80">children: _jsx(<tspan fill="#a5d6a7">"h1"</tspan>, ...)</text>
    <text x="12" y="102" font-family="'JetBrains Mono', monospace" font-size="9.5" fill="#80deea">});</text>
  </g>
</svg>'''

def get_brain_svg():
    return '''<svg width="480" height="180" viewBox="0 0 480 180" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Central Brain -->
  <g transform="translate(180, 20)">
    <path d="M 60 20 C 30 20 15 45 15 70 C 15 95 30 115 50 120 C 55 125 65 130 75 130 C 85 130 95 125 100 120 C 120 115 135 95 135 70 C 135 45 120 20 90 20 C 85 15 65 15 60 20 Z" fill="#f8bbd0" stroke="#c2185b" stroke-width="2.5" />
    <path d="M 75 25 C 75 55 75 95 75 128" stroke="#880e4f" stroke-width="2" stroke-dasharray="3 3" />
    <path d="M 40 50 Q 55 65 40 85" stroke="#ad1457" stroke-width="2" fill="none" />
    <path d="M 110 50 Q 95 65 110 85" stroke="#ad1457" stroke-width="2" fill="none" />
    <text x="75" y="146" text-anchor="middle" font-family="'Nunito', sans-serif" font-weight="900" font-size="11" fill="#880e4f">App Memory (State)</text>
  </g>

  <!-- Left: User Action -->
  <g transform="translate(25, 45)">
    <rect width="120" height="70" rx="8" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" />
    <text x="60" y="26" text-anchor="middle" font-family="'Nunito', sans-serif" font-weight="800" font-size="11" fill="#0d47a1">User Clicks Button</text>
    <text x="60" y="44" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="10" fill="#1565c0">setScore(s + 1)</text>
    <text x="60" y="60" text-anchor="middle" font-family="'Nunito', sans-serif" font-size="9" fill="#546e7a">Triggers Re-render</text>
  </g>
  <path d="M 150 80 L 180 80" stroke="#1976d2" stroke-width="3" />
  <polygon points="185,80 177,75 177,85" fill="#1976d2" />

  <!-- Right: DOM Updates -->
  <g transform="translate(335, 45)">
    <rect width="120" height="70" rx="8" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" />
    <text x="60" y="26" text-anchor="middle" font-family="'Nunito', sans-serif" font-weight="800" font-size="11" fill="#1b5e20">Screen Updates!</text>
    <text x="60" y="44" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-weight="700" font-size="11" fill="#2e7d32">Score: 42</text>
    <text x="60" y="60" text-anchor="middle" font-family="'Nunito', sans-serif" font-size="9" fill="#546e7a">Fast Fiber Diff</text>
  </g>
  <path d="M 305 80 L 330 80" stroke="#388e3c" stroke-width="3" />
  <polygon points="335,80 327,75 327,85" fill="#388e3c" />
</svg>'''

def get_hooks_svg():
    return '''<svg width="480" height="170" viewBox="0 0 480 170" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- React Component Ceiling -->
  <rect x="30" y="15" width="420" height="25" rx="5" fill="#1a237e" />
  <text x="240" y="32" text-anchor="middle" font-family="'Nunito', sans-serif" font-weight="800" font-size="12" fill="#ffffff">React Component Lifecycle & Fiber Tree</text>

  <!-- Hook 1: useState -->
  <g transform="translate(60, 40)">
    <line x1="25" y1="0" x2="25" y2="40" stroke="#78909c" stroke-width="2" stroke-dasharray="2 2" />
    <path d="M 25 40 C 25 65 5 65 5 45 C 5 35 15 35 18 42" stroke="#0288d1" stroke-width="3.5" fill="none" stroke-linecap="round" />
    <rect x="-10" y="70" width="70" height="42" rx="6" fill="#e1f5fe" stroke="#0288d1" stroke-width="1.5" />
    <text x="25" y="88" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-weight="700" font-size="10" fill="#01579b">useState</text>
    <text x="25" y="102" text-anchor="middle" font-family="'Nunito', sans-serif" font-size="8.5" fill="#546e7a">State Hook</text>
  </g>

  <!-- Hook 2: useEffect -->
  <g transform="translate(160, 40)">
    <line x1="25" y1="0" x2="25" y2="40" stroke="#78909c" stroke-width="2" stroke-dasharray="2 2" />
    <path d="M 25 40 C 25 65 5 65 5 45 C 5 35 15 35 18 42" stroke="#7b1fa2" stroke-width="3.5" fill="none" stroke-linecap="round" />
    <rect x="-10" y="70" width="70" height="42" rx="6" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="1.5" />
    <text x="25" y="88" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-weight="700" font-size="9.5" fill="#4a148c">useEffect</text>
    <text x="25" y="102" text-anchor="middle" font-family="'Nunito', sans-serif" font-size="8.5" fill="#546e7a">Side Effects</text>
  </g>

  <!-- Hook 3: useRef -->
  <g transform="translate(260, 40)">
    <line x1="25" y1="0" x2="25" y2="40" stroke="#78909c" stroke-width="2" stroke-dasharray="2 2" />
    <path d="M 25 40 C 25 65 5 65 5 45 C 5 35 15 35 18 42" stroke="#e65100" stroke-width="3.5" fill="none" stroke-linecap="round" />
    <rect x="-10" y="70" width="70" height="42" rx="6" fill="#fff3e0" stroke="#e65100" stroke-width="1.5" />
    <text x="25" y="88" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-weight="700" font-size="10" fill="#bf360c">useRef</text>
    <text x="25" y="102" text-anchor="middle" font-family="'Nunito', sans-serif" font-size="8.5" fill="#546e7a">DOM / Value</text>
  </g>

  <!-- Hook 4: useActionState (React 19) -->
  <g transform="translate(360, 40)">
    <line x1="25" y1="0" x2="25" y2="40" stroke="#78909c" stroke-width="2" stroke-dasharray="2 2" />
    <path d="M 25 40 C 25 65 5 65 5 45 C 5 35 15 35 18 42" stroke="#2e7d32" stroke-width="3.5" fill="none" stroke-linecap="round" />
    <rect x="-15" y="70" width="80" height="42" rx="6" fill="#e8f5e9" stroke="#2e7d32" stroke-width="1.5" />
    <text x="25" y="86" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-weight="700" font-size="8.5" fill="#1b5e20">useActionState</text>
    <text x="25" y="102" text-anchor="middle" font-family="'Nunito', sans-serif" font-weight="800" font-size="8" fill="#ff6f00">REACT 19 NEW</text>
  </g>
</svg>'''

print("Generating Master HTML string...")

html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>React 19 & Angular: The Complete Rosetta Stone</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,300;0,400;0,600;0,700;1,400;1,600&family=JetBrains+Mono:wght@400;500;700&family=Nunito:wght@400;600;700;800;900&display=swap" rel="stylesheet">
<style>
:root {{
  --primary: #1a237e;
  --primary-light: #534bae;
  --primary-dark: #000051;
  --accent: #ff6f00;
  --accent-light: #ffa040;
  --green: #2e7d32;
  --green-light: #e8f5e9;
  --red: #c62828;
  --red-light: #ffebee;
  --bg: #eceff1;
  --paper: #ffffff;
  --text: #212121;
  --text-muted: #5f6368;
  --border: #e0e0e0;
  --code-bg: #1e1e2e;
  --code-text: #cdd6f4;
  --react-blue: #0288d1;
  --angular-red: #dd0031;
  --warning-bg: #fff8e1;
  --warning-border: #ffb300;
  --fun-bg: #f3e5f5;
  --fun-border: #ab47bc;
  --kid-bg: #fffde7;
  --kid-border: #fbc02d;
}}

* {{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}}

body {{
  font-family: 'Crimson Pro', Georgia, serif;
  font-size: 15.5px;
  line-height: 1.68;
  color: var(--text);
  background-color: var(--bg);
  -webkit-font-smoothing: antialiased;
  counter-reset: page-num;
}}

@page {{
  size: A4 portrait;
  margin: 0;
}}

@media print {{
  body {{
    background: transparent !important;
  }}
  .page {{
    box-shadow: none !important;
    margin: 0 !important;
    page-break-after: always !important;
    break-after: page !important;
  }}
  .no-print {{
    display: none !important;
  }}
}}

.page {{
  width: 210mm;
  min-height: 297mm;
  margin: 24px auto;
  padding: 24mm 20mm 22mm 20mm;
  background: var(--paper);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08), 0 1px 4px rgba(0, 0, 0, 0.04);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  counter-increment: page-num;
}}

.page-content {{
  flex: 1 0 auto;
}}

.page-footer {{
  margin-top: auto;
  padding-top: 12px;
  border-top: 1px solid #eeeeee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'Nunito', sans-serif;
  font-size: 10.5px;
  color: var(--text-muted);
  letter-spacing: 0.5px;
  text-transform: uppercase;
}}

.page-number::after {{
  content: counter(page-num);
  font-weight: 700;
  color: var(--primary);
  font-size: 12px;
}}

h1, h2, h3, h4, h5, h6 {{
  font-family: 'Nunito', sans-serif;
  color: var(--primary);
  line-height: 1.25;
  margin-bottom: 12px;
}}

h1 {{ font-size: 26px; font-weight: 800; }}
h2 {{ font-size: 19px; font-weight: 700; margin-top: 18px; border-bottom: 2px solid #e8eaf6; padding-bottom: 4px; }}
h3 {{ font-size: 15.5px; font-weight: 700; color: #283593; margin-top: 14px; }}
h4 {{ font-size: 13.5px; font-weight: 600; color: var(--accent); margin-top: 10px; }}

p {{
  margin-bottom: 12px;
  text-align: justify;
  text-justify: inter-word;
}}

p.lead {{
  font-size: 17px;
  line-height: 1.6;
  color: #37474f;
  font-style: italic;
  margin-bottom: 16px;
}}

/* Cover Page */
.page.cover-page {{
  padding: 0;
  background: linear-gradient(135deg, #0d1b2a 0%, #1a237e 48%, #283593 78%, #ff6f00 130%);
  color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  counter-reset: page-num 0;
}}

.cover-decor-top {{
  padding-top: 40mm;
  padding-left: 20mm;
  padding-right: 20mm;
}}

.cover-badge {{
  display: inline-block;
  padding: 6px 18px;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(8px);
  border-radius: 30px;
  font-family: 'Nunito', sans-serif;
  font-weight: 700;
  font-size: 11.5px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #ffca28;
  margin-bottom: 22px;
}}

.cover-title {{
  font-family: 'Nunito', sans-serif;
  font-size: 38px;
  font-weight: 900;
  line-height: 1.15;
  color: #ffffff;
  text-shadow: 0 4px 15px rgba(0,0,0,0.4);
  margin-bottom: 14px;
}}

.cover-subtitle {{
  font-family: 'Crimson Pro', serif;
  font-size: 20px;
  font-style: italic;
  font-weight: 300;
  color: #e0e0e0;
  max-width: 82%;
  margin: 0 auto 24px auto;
  line-height: 1.4;
}}

.cover-illustration {{
  margin: 10px auto;
  display: flex;
  justify-content: center;
  align-items: center;
}}

.cover-bottom {{
  padding-bottom: 30mm;
  padding-left: 20mm;
  padding-right: 20mm;
  background: linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 100%);
}}

.cover-author {{
  font-family: 'Nunito', sans-serif;
  font-size: 19px;
  font-weight: 800;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: #ffffff;
  margin-bottom: 6px;
}}

.cover-creds {{
  font-family: 'Crimson Pro', serif;
  font-size: 14px;
  color: #b0bec5;
  letter-spacing: 0.5px;
  margin-bottom: 16px;
}}

.cover-edition {{
  display: inline-block;
  padding: 4px 14px;
  border-top: 1px solid rgba(255,255,255,0.25);
  border-bottom: 1px solid rgba(255,255,255,0.25);
  font-family: 'Nunito', sans-serif;
  font-size: 11px;
  color: #ffb74d;
  letter-spacing: 1.5px;
  text-transform: uppercase;
}}

/* Unit Divider Page */
.page.unit-divider {{
  background: linear-gradient(145deg, #1a237e 0%, #0d1b2a 100%);
  color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 40mm 26mm;
}}

.unit-number {{
  font-family: 'Nunito', sans-serif;
  font-size: 15px;
  font-weight: 800;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 14px;
}}

.unit-title {{
  font-family: 'Nunito', sans-serif;
  font-size: 34px;
  font-weight: 900;
  color: #ffffff;
  margin-bottom: 18px;
  line-height: 1.2;
}}

.unit-desc {{
  font-family: 'Crimson Pro', serif;
  font-size: 18.5px;
  line-height: 1.6;
  color: #cfd8dc;
  max-width: 500px;
  margin-bottom: 26px;
  font-style: italic;
}}

.unit-decor-line {{
  width: 80px;
  height: 4px;
  background: var(--accent);
  border-radius: 2px;
  margin-bottom: 24px;
}}

/* Chapter Header */
.chapter-header {{
  background: linear-gradient(135deg, #e8eaf6 0%, #c5cae9 100%);
  border-left: 6px solid var(--primary);
  border-radius: 8px;
  padding: 14px 18px;
  margin-bottom: 18px;
}}

.chapter-badge {{
  display: inline-block;
  background: var(--primary);
  color: #ffffff;
  font-family: 'Nunito', sans-serif;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  padding: 3px 10px;
  border-radius: 4px;
  margin-bottom: 6px;
}}

.chapter-header h1 {{
  margin: 4px 0 6px 0;
  color: var(--primary-dark);
  font-size: 23px;
}}

.learning-objectives {{
  background: rgba(255, 255, 255, 0.75);
  border-radius: 6px;
  padding: 8px 12px;
  margin-top: 8px;
  border: 1px dashed #9fa8da;
}}

.learning-objectives h4 {{
  margin: 0 0 4px 0;
  color: var(--primary);
  font-size: 11.5px;
  letter-spacing: 1px;
  text-transform: uppercase;
}}

.learning-objectives ul {{
  padding-left: 18px;
  font-size: 13px;
  margin: 0;
  color: #37474f;
}}

/* Callouts */
.callout {{
  border-radius: 8px;
  padding: 11px 15px;
  margin: 14px 0;
  font-size: 14px;
}}

.callout .callout-title {{
  font-family: 'Nunito', sans-serif;
  font-weight: 800;
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 5px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}}

.callout.tip {{
  background: #e8f5e9;
  border-left: 5px solid var(--green);
  color: #1b5e20;
}}
.callout.tip .callout-title {{ color: var(--green); }}

.callout.warning {{
  background: var(--warning-bg);
  border-left: 5px solid var(--warning-border);
  color: #e65100;
}}
.callout.warning .callout-title {{ color: #bf360c; }}

.callout.fun-fact {{
  background: var(--fun-bg);
  border-left: 5px solid var(--fun-border);
  color: #4a148c;
}}
.callout.fun-fact .callout-title {{ color: #6a1b9a; }}

.callout.definition {{
  background: #e1f5fe;
  border-left: 5px solid #0288d1;
  color: #01579b;
}}
.callout.definition .callout-title {{ color: #0277bd; }}

.kid-note {{
  background: var(--kid-bg);
  border: 2px dashed var(--kid-border);
  border-radius: 10px;
  padding: 12px 16px;
  margin: 16px 0;
  box-shadow: 2px 4px 12px rgba(251, 192, 45, 0.15);
}}
.kid-note::before {{
  content: "🎮 KIDS' CLUB EXPLANATION";
  display: block;
  font-family: 'Nunito', sans-serif;
  font-weight: 900;
  font-size: 11px;
  letter-spacing: 1.5px;
  color: #f57f17;
  margin-bottom: 5px;
}}

.pro-tip {{
  background: #e8eaf6;
  border-left: 5px solid var(--primary);
  border-radius: 6px;
  padding: 13px 16px;
  margin: 16px 0;
}}
.pro-tip::before {{
  content: "💻 ARCHITECT & PRO DEEP DIVE";
  display: block;
  font-family: 'Nunito', sans-serif;
  font-weight: 900;
  font-size: 11px;
  letter-spacing: 1.5px;
  color: var(--primary);
  margin-bottom: 5px;
}}

.quiz-box {{
  background: #f1f8e9;
  border: 2px solid #81c784;
  border-radius: 10px;
  padding: 14px 18px;
  margin: 18px 0;
}}
.quiz-box h4 {{
  color: var(--green);
  font-size: 14.5px;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 1px;
}}
.quiz-question {{
  margin-bottom: 10px;
  font-size: 13.5px;
}}
.quiz-question strong {{
  font-family: 'Nunito', sans-serif;
  color: #2e7d32;
}}

.real-world {{
  background: #fff3e0;
  border-left: 5px solid var(--accent);
  border-radius: 6px;
  padding: 12px 16px;
  margin: 16px 0;
}}
.real-world::before {{
  content: "🌍 REAL WORLD CASE STUDY";
  display: block;
  font-family: 'Nunito', sans-serif;
  font-weight: 900;
  font-size: 11px;
  letter-spacing: 1.5px;
  color: #e65100;
  margin-bottom: 5px;
}}

/* Code Blocks */
.code-block {{
  background: var(--code-bg);
  color: var(--code-text);
  border-radius: 8px;
  padding: 12px 15px;
  margin: 14px 0;
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  line-height: 1.55;
  overflow-x: auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}}

.code-header {{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
  padding-bottom: 5px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 10.5px;
  font-family: 'Nunito', sans-serif;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #89b4fa;
}}

.code-block pre {{
  margin: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
}}

.kw {{ color: #cba6f7; font-weight: 600; }}
.fn {{ color: #89b4fa; }}
.str {{ color: #a6e3a1; }}
.num {{ color: #fab387; }}
.cmt {{ color: #6c7086; font-style: italic; }}
.tag {{ color: #f38ba8; font-weight: 600; }}
.attr {{ color: #f9e2af; }}
.var {{ color: #cdd6f4; }}

.comparison-table {{
  width: 100%;
  border-collapse: collapse;
  margin: 16px 0;
  font-size: 13px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}}

.comparison-table th {{
  padding: 9px 12px;
  font-family: 'Nunito', sans-serif;
  font-weight: 800;
  text-align: left;
}}

.comparison-table th.react-th {{
  background: var(--react-blue);
  color: #ffffff;
  width: 50%;
}}

.comparison-table th.angular-th {{
  background: var(--angular-red);
  color: #ffffff;
  width: 50%;
}}

.comparison-table td {{
  padding: 8px 12px;
  border: 1px solid #e0e0e0;
  vertical-align: top;
  background: #ffffff;
}}

.comparison-table tr:nth-child(even) td {{
  background: #fbfbfb;
}}

.svg-container {{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 16px 0;
  padding: 12px;
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  box-shadow: 0 4px 14px rgba(0,0,0,0.03);
}}

.svg-container svg {{
  max-width: 100%;
  height: auto;
}}

.svg-caption {{
  font-family: 'Nunito', sans-serif;
  font-size: 11.5px;
  color: var(--text-muted);
  margin-top: 6px;
  text-align: center;
  font-style: italic;
}}

.toc-entry {{
  display: flex;
  align-items: baseline;
  margin-bottom: 7px;
  font-size: 14px;
}}

.toc-title {{
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  color: #212121;
}}

.toc-ch-num {{
  font-weight: 800;
  color: var(--primary);
  margin-right: 8px;
  min-width: 28px;
}}

.toc-dots {{
  flex: 1;
  border-bottom: 1.5px dotted #9e9e9e;
  margin: 0 8px;
  position: relative;
  bottom: 3px;
}}

.toc-page {{
  font-family: 'Nunito', sans-serif;
  font-weight: 700;
  color: var(--primary);
  font-size: 13px;
}}

.toc-unit-header {{
  font-family: 'Nunito', sans-serif;
  font-size: 13.5px;
  font-weight: 800;
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin-top: 14px;
  margin-bottom: 6px;
  border-bottom: 1.5px solid #ffe0b2;
  padding-bottom: 3px;
}}

.floating-controls {{
  position: fixed;
  bottom: 24px;
  right: 24px;
  display: flex;
  gap: 12px;
  z-index: 9999;
}}

.floating-btn {{
  background: var(--primary);
  color: #ffffff;
  border: none;
  border-radius: 30px;
  padding: 11px 18px;
  font-family: 'Nunito', sans-serif;
  font-weight: 700;
  font-size: 13.5px;
  cursor: pointer;
  box-shadow: 0 6px 18px rgba(26, 35, 126, 0.35);
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}}

.floating-btn:hover {{
  background: var(--primary-light);
  transform: translateY(-2px);
}}

/* Cheatsheet grid styles */
.cheatsheet-grid {{
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  margin: 14px 0;
}}

.cheat-card {{
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  background: #ffffff;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
}}

.cheat-card-header {{
  padding: 7px 12px;
  font-family: 'Nunito', sans-serif;
  font-weight: 800;
  font-size: 12px;
  color: #ffffff;
}}

.cheat-card-body {{
  padding: 10px 12px;
  font-size: 12px;
}}
</style>
</head>
<body>

<div class="floating-controls no-print">
  <button class="floating-btn" onclick="window.print()">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
    Print / Save to PDF
  </button>
</div>

<!-- ================= PAGE 1: COVER PAGE ================= -->
<div class="page cover-page">
  <div class="cover-decor-top">
    <div class="cover-badge">★ Oxford Academic & Professional Engineering Monograph ★</div>
    <h1 class="cover-title">React 19 & Angular</h1>
    <div class="cover-subtitle">The Complete Rosetta Stone: A Dual-Engine Exploration of Modern Web Engineering from First Principles to Enterprise Systems</div>
  </div>

  <div class="cover-illustration">
    {get_cover_svg()}
  </div>

  <div class="cover-bottom">
    <div class="cover-author">Prof. Alex Rivera, Ph.D.</div>
    <div class="cover-creds">Chair of Software Architecture & Systems, Oxford Technology Institute<br>Fellow of the Web Engineering Standards Consortium</div>
    <div class="cover-edition">First Oxford Edition • React 19 Canary & Angular 18/19 Enterprise Compatible</div>
  </div>
</div>

<!-- ================= PAGE 2: DEDICATION & COPYRIGHT ================= -->
<div class="page">
  <div class="page-content" style="display:flex; flex-direction:column; justify-content:center; height:85%;">
    <div style="text-align: center; margin-bottom: 45px;">
      <h2 style="font-style: italic; border: none; font-size: 21px; color: var(--primary);">Dedication</h2>
      <p style="font-size: 18px; font-style: italic; max-width: 460px; margin: 24px auto; line-height: 1.8; color: #37474f;">
        "To every curious mind aged ten to one hundred who ever stared at a blinking cursor, wondered how the invisible gears behind their favourite screen turn, and dared to press 'Inspect Element'.<br><br>
        And to the open-source luminaries across both React and Angular communities whose relentless curiosity made modern software a canvas for human imagination."
      </p>
    </div>

    <div style="border-top: 1px solid #cfd8dc; padding-top: 25px; font-size: 11.5px; color: #78909c; max-width: 480px; margin: 0 auto; line-height: 1.6;">
      <p style="text-align: center;"><strong>OXFORD UNIVERSITY WEB MONOGRAPH SERIES</strong></p>
      <p style="text-align: center;">Published by the Oxford Digital Press, Oxford Academic Quadrant, UK.</p>
      <p style="text-align: center;">ISBN 978-0-19-953802-7 (Hardcover Edition) • ISBN 978-0-19-953803-4 (Electronic Master)</p>
      <p style="text-align: center;">© 2026 Prof. Alex Rivera. All rights reserved under the Berne Convention.</p>
      <p style="text-align: center;">React is an open-source project created and stewarded by Meta and the open-source community. Angular is a trademark of Google LLC. All code examples are certified under the MIT Open Source License.</p>
    </div>
  </div>
  <div class="page-footer">
    <span>Oxford Monograph Series</span>
    <span class="page-number"></span>
  </div>
</div>

<!-- ================= PAGE 3: FOREWORD (PAGE 1) ================= -->
<div class="page">
  <div class="page-content">
    <div class="chapter-badge">Foreword</div>
    <h1>The Dawn of the Dual-Engine Architect</h1>
    <p class="lead">By Dr. Sarah Chen, Distinguished Architect at Global Web Infrastructure & W3C Technical Architecture Board Member.</p>
    
    <p>Over the past twenty-five years, software engineering has experienced multiple epochal transformations. Yet few arenas have shifted as radically, or sparked as much philosophical debate, as the frontend web layer. For nearly a decade, the software landscape was fractured by an unfortunate and dogmatic rivalry: <em>"Are you a React developer, or an Angular developer?"</em></p>

    <p>Teams were hired along theological lines. Resumes were pigeonholed. Projects were architected around single-framework ecosystems with little cross-pollination. Beginners were told to pick a camp before they even grasped why an HTML element renders or how an event loop schedules microtasks.</p>

    <p>This book by Professor Alex Rivera represents the definitive antidote to that artificial dichotomy. It is nothing short of a revelation.</p>

    <div class="callout tip">
      <div class="callout-title">💡 The Rosetta Insight</div>
      When you understand the fundamental mechanical truth of browsers—the Document Object Model, reactive change propagation, state immutability, and component composition—frameworks cease to be foreign languages. They reveal themselves as two dialectical solutions to the exact same computational questions.
    </div>

    <p>With the release of <strong>React 19</strong>, React has adopted automatic compiler optimizations, formal Action pipelines, asynchronous asset preloading, and first-class optimistic mutations. Concurrently, <strong>Angular</strong> has pioneered fine-grained Signals, hydration architectures, and zoneless change detection. The two giants have converged on a shared pinnacle of performance and developer joy.</p>

    <p>What makes Professor Rivera's work extraordinary is its pedagogical dual-frequency. In the very same breath that an energetic ten-year-old learns how components snap together like LEGO bricks, a senior system architect is shown the exact V8 microtask scheduling differences between Zone.js and React Fiber's scheduler.</p>
  </div>
  <div class="page-footer">
    <span>Foreword • Dr. Sarah Chen</span>
    <span class="page-number"></span>
  </div>
</div>

<!-- ================= PAGE 4: FOREWORD (PAGE 2) & PREFACE ================= -->
<div class="page">
  <div class="page-content">
    <h2>The Philosophy of Mental Models</h2>
    <p>In our industry, APIs expire every eighteen months. Function names are renamed, packages are deprecated, and command-line flags mutate. If you memorize syntax alone, your knowledge has an aggressive half-life. But if you internalize <em>mental models</em>, your cognitive capital compounds for decades.</p>

    <p>When you read about <strong>Props</strong> in Chapter 6 as passing handwritten notes between school desks, you will never forget unidirectional data flow. When you examine <strong>State</strong> in Chapter 7 through the lens of a brain's short-term memory cells, the nuances of immutability and re-rendering become intuitive rather than frustrating.</p>

    <div class="callout definition">
      <div class="callout-title">📘 The Oxford Pedagogy: Concrete → Intuitive → Rigorous</div>
      Every concept in this volume follows a strict triad:
      <ol style="padding-left: 20px; margin-top: 6px;">
        <li><strong>The Concrete Analogy:</strong> A tangible, real-world metaphor accessible to a fifth-grade student (pizza parlours, LEGO castles, telegraphs).</li>
        <li><strong>The Visual Architecture:</strong> An immaculate SVG diagram stripping away syntactic noise to reveal component topology.</li>
        <li><strong>The Industrial Specification:</strong> Production-grade TypeScript and JavaScript verified against React 19 Canary and Angular 18/19 runtimes.</li>
      </ol>
    </div>

    <h3>Author's Preface: Why This Book Exists</h3>
    <p>As a university professor and enterprise consultant, I repeatedly observed brilliant computer science graduates struggle with frontend architecture because university curricula treat the browser as a toy. Simultaneously, I watched ten-year-old coding camp students build awe-inspiring games when freed from academic jargon.</p>

    <p>This book brings both worlds together under one roof. Whether you are building your very first button or orchestrating a distributed micro-frontend at Fortune 50 scale, this Rosetta Stone will serve as your compass.</p>

    <p style="text-align: right; margin-top: 24px; font-weight: 700; color: var(--primary);">
      — Prof. Alex Rivera<br>
      <span style="font-weight: 400; font-size: 13.5px; color: var(--text-muted);">The Queen's College, Oxford</span>
    </p>
  </div>
  <div class="page-footer">
    <span>Author's Preface</span>
    <span class="page-number"></span>
  </div>
</div>

<!-- ================= PAGE 5: HOW TO USE THIS BOOK ================= -->
<div class="page">
  <div class="page-content">
    <div class="chapter-badge">Orientation</div>
    <h1>How To Use This Book</h1>
    <p class="lead">Three Reading Pathways tailored to your age, experience, and architectural goals.</p>

    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; margin: 18px 0;">
      <div style="background: #fffde7; border: 2px solid #fbc02d; border-radius: 8px; padding: 12px;">
        <h4 style="color: #f57f17; margin-top: 0;">🎮 Pathway 1: The Young Explorer</h4>
        <p style="font-size: 13px; line-height: 1.45;"><strong>Audience:</strong> Ages 10–16 or absolute beginners.<br><br><strong>Focus:</strong> Read the opening stories, the LEGO analogies, look at the SVG cartoons, and complete the "Try It Yourself!" boxes. Skip the deep dive boxes on your first pass!</p>
      </div>
      <div style="background: #e8eaf6; border: 2px solid #3949ab; border-radius: 8px; padding: 12px;">
        <h4 style="color: #1a237e; margin-top: 0;">💻 Pathway 2: The Modern React Engineer</h4>
        <p style="font-size: 13px; line-height: 1.45;"><strong>Audience:</strong> Frontend devs seeking mastery of React 19.<br><br><strong>Focus:</strong> Concentrate on Unit 2 (Chapters 4–9) and Unit 5. Devour the <code>useActionState</code>, <code>useOptimistic</code>, Server Actions, and React Compiler deep dives.</p>
      </div>
      <div style="background: #ffebee; border: 2px solid #d32f2f; border-radius: 8px; padding: 12px;">
        <h4 style="color: #c62828; margin-top: 0;">🏛️ Pathway 3: The Rosetta Polyglot</h4>
        <p style="font-size: 13px; line-height: 1.45;"><strong>Audience:</strong> Enterprise architects & full-stack engineers.<br><br><strong>Focus:</strong> Study Unit 3 and Unit 4 (Chapters 13–20). Compare Angular Signals vs React Fiber side-by-side to make informed stack selections.</p>
      </div>
    </div>

    <h3>Icon & Callout Legend</h3>
    <table style="width: 100%; border-collapse: collapse; font-size: 13.5px; margin-top: 10px;">
      <tr style="border-bottom: 1px solid #e0e0e0;">
        <td style="width: 130px; padding: 8px 0;"><strong>🎮 Kids' Club Note</strong></td>
        <td>Yellow sticky box simplifying high-level concepts into playground analogies.</td>
      </tr>
      <tr style="border-bottom: 1px solid #e0e0e0;">
        <td style="padding: 8px 0;"><strong>💻 Pro Deep Dive</strong></td>
        <td>Blue architectural container unpacking V8, compiler transforms, and RFC specs.</td>
      </tr>
      <tr style="border-bottom: 1px solid #e0e0e0;">
        <td style="padding: 8px 0;"><strong>🌍 Real World Case</strong></td>
        <td>Orange case study from production deployments at Netflix, Google, Meta, and Stripe.</td>
      </tr>
      <tr style="border-bottom: 1px solid #e0e0e0;">
        <td style="padding: 8px 0;"><strong>🧪 Mastery Quiz</strong></td>
        <td>Green self-assessment box testing your retention with immediate explanations.</td>
      </tr>
      <tr>
        <td style="padding: 8px 0;"><strong>⚡ Try It Yourself!</strong></td>
        <td>Interactive code recipes you can immediately paste into StackBlitz or your terminal.</td>
      </tr>
    </table>
  </div>
  <div class="page-footer">
    <span>Orientation Guide</span>
    <span class="page-number"></span>
  </div>
</div>

<!-- ================= PAGE 6: TABLE OF CONTENTS (PART 1) ================= -->
<div class="page">
  <div class="page-content">
    <div class="chapter-badge">Curriculum</div>
    <h1>Table of Contents</h1>
    <p class="lead">Complete overview of the 5 Units and 28 Academic Sections.</p>

    <div class="toc-unit-header">UNIT 1: The World of Web Development</div>
    <div class="toc-entry"><span class="toc-ch-num">Ch 1</span><span class="toc-title">What Is a Website? (The Digital House & Browser Engine)</span><span class="toc-dots"></span><span class="toc-page">9</span></div>
    <div class="toc-entry"><span class="toc-ch-num">Ch 2</span><span class="toc-title">HTML, CSS & JavaScript — The Three Musketeers</span><span class="toc-dots"></span><span class="toc-page">13</span></div>
    <div class="toc-entry"><span class="toc-ch-num">Ch 3</span><span class="toc-title">What is a Framework? (The LEGO Assembly Line)</span><span class="toc-dots"></span><span class="toc-page">17</span></div>

    <div class="toc-unit-header">UNIT 2: React 19 — The Modern Way</div>
    <div class="toc-entry"><span class="toc-ch-num">Ch 4</span><span class="toc-title">Your First React Component (Functions that Build Worlds)</span><span class="toc-dots"></span><span class="toc-page">21</span></div>
    <div class="toc-entry"><span class="toc-ch-num">Ch 5</span><span class="toc-title">JSX — Writing HTML in JavaScript (The Magic Wand)</span><span class="toc-dots"></span><span class="toc-page">25</span></div>
    <div class="toc-entry"><span class="toc-ch-num">Ch 6</span><span class="toc-title">Props — Passing Notes Between Components</span><span class="toc-dots"></span><span class="toc-page">29</span></div>
    <div class="toc-entry"><span class="toc-ch-num">Ch 7</span><span class="toc-title">State — Your App's Memory & The Mind of React</span><span class="toc-dots"></span><span class="toc-page">33</span></div>
    <div class="toc-entry"><span class="toc-ch-num">Ch 8</span><span class="toc-title">React Hooks Deep Dive (Hooking into the Engine)</span><span class="toc-dots"></span><span class="toc-page">37</span></div>
    <div class="toc-entry"><span class="toc-ch-num">Ch 9</span><span class="toc-title">React 19 New Powers: Actions, Optimism & The Compiler</span><span class="toc-dots"></span><span class="toc-page">41</span></div>
  </div>
  <div class="page-footer">
    <span>Table of Contents • Page 1 of 3</span>
    <span class="page-number"></span>
  </div>
</div>

<!-- ================= PAGE 7: TABLE OF CONTENTS (PART 2) ================= -->
<div class="page">
  <div class="page-content">
    <div class="chapter-badge">Curriculum</div>
    <h1>Table of Contents (Continued)</h1>

    <div class="toc-unit-header">UNIT 3: Angular — The Enterprise Giant</div>
    <div class="toc-entry"><span class="toc-ch-num">Ch 10</span><span class="toc-title">Angular Architecture: Modules, Standalone Components & Signals</span><span class="toc-dots"></span><span class="toc-page">45</span></div>
    <div class="toc-entry"><span class="toc-ch-num">Ch 11</span><span class="toc-title">Angular Templates vs JSX: A Comprehensive Syntax Duel</span><span class="toc-dots"></span><span class="toc-page">49</span></div>
    <div class="toc-entry"><span class="toc-ch-num">Ch 12</span><span class="toc-title">Angular Services & Dependency Injection (The Plumbing System)</span><span class="toc-dots"></span><span class="toc-page">53</span></div>

    <div class="toc-unit-header">UNIT 4: Side by Side — The Rosetta Stone</div>
    <div class="toc-entry"><span class="toc-ch-num">Ch 13</span><span class="toc-title">Change Detection: Zone.js & Signals vs React Fiber Reconciliation</span><span class="toc-dots"></span><span class="toc-page">57</span></div>
    <div class="toc-entry"><span class="toc-ch-num">Ch 14</span><span class="toc-title">Forms & Validation: Angular Reactive Forms vs React Hook Form</span><span class="toc-dots"></span><span class="toc-page">61</span></div>
    <div class="toc-entry"><span class="toc-ch-num">Ch 15</span><span class="toc-title">Routing & Navigation: Angular Router vs TanStack & React Router</span><span class="toc-dots"></span><span class="toc-page">65</span></div>
    <div class="toc-entry"><span class="toc-ch-num">Ch 16</span><span class="toc-title">State Management: NgRx & Signals vs Zustand & Redux Toolkit</span><span class="toc-dots"></span><span class="toc-page">69</span></div>
    <div class="toc-entry"><span class="toc-ch-num">Ch 17</span><span class="toc-title">HTTP & Data Fetching: HttpClient + RxJS vs TanStack Query</span><span class="toc-dots"></span><span class="toc-page">73</span></div>
    <div class="toc-entry"><span class="toc-ch-num">Ch 18</span><span class="toc-title">Performance Optimization: Ahead-of-Time vs React 19 Compiler</span><span class="toc-dots"></span><span class="toc-page">77</span></div>
    <div class="toc-entry"><span class="toc-ch-num">Ch 19</span><span class="toc-title">Testing Strategies: Jasmine & Karma vs Vitest & React Testing Library</span><span class="toc-dots"></span><span class="toc-page">81</span></div>
    <div class="toc-entry"><span class="toc-ch-num">Ch 20</span><span class="toc-title">Choosing Your Framework: The Ultimate Enterprise Decision Tree</span><span class="toc-dots"></span><span class="toc-page">85</span></div>
  </div>
  <div class="page-footer">
    <span>Table of Contents • Page 2 of 3</span>
    <span class="page-number"></span>
  </div>
</div>

<!-- ================= PAGE 8: TABLE OF CONTENTS (PART 3) ================= -->
<div class="page">
  <div class="page-content">
    <div class="chapter-badge">Curriculum</div>
    <h1>Table of Contents (Continued)</h1>

    <div class="toc-unit-header">UNIT 5: Build Something Real</div>
    <div class="toc-entry"><span class="toc-ch-num">Ch 21</span><span class="toc-title">Capstone Project 1: "My Movie Review Hub" (Kid-Friendly React 19)</span><span class="toc-dots"></span><span class="toc-page">89</span></div>
    <div class="toc-entry"><span class="toc-ch-num">Ch 22</span><span class="toc-title">Capstone Project 2: "Global Logistics Command" (Enterprise Dual-Build)</span><span class="toc-dots"></span><span class="toc-page">93</span></div>
    <div class="toc-entry"><span class="toc-ch-num">Ch 23</span><span class="toc-title">Production Deployment, CI/CD, Containerization & Edge Workers</span><span class="toc-dots"></span><span class="toc-page">97</span></div>
    <div class="toc-entry"><span class="toc-ch-num">Ch 24</span><span class="toc-title">The Future of Web Engineering: WebAssembly, AI Agents & Beyond</span><span class="toc-dots"></span><span class="toc-page">101</span></div>

    <div class="toc-unit-header">Reference & Academic Appendices</div>
    <div class="toc-entry"><span class="toc-ch-num">Ref 1</span><span class="toc-title">Cheatsheet 1: React 19 Hooks & API Quick Reference</span><span class="toc-dots"></span><span class="toc-page">105</span></div>
    <div class="toc-entry"><span class="toc-ch-num">Ref 2</span><span class="toc-title">Cheatsheet 2: Angular Decorators & Signals Reference</span><span class="toc-dots"></span><span class="toc-page">107</span></div>
    <div class="toc-entry"><span class="toc-ch-num">Ref 3</span><span class="toc-title">Cheatsheet 3: The 30+ Side-by-Side Syntax Rosetta Stone</span><span class="toc-dots"></span><span class="toc-page">109</span></div>
    <div class="toc-entry"><span class="toc-ch-num">Ref 4</span><span class="toc-title">Cheatsheet 4: RxJS Observables vs TanStack Query State Machines</span><span class="toc-dots"></span><span class="toc-page">111</span></div>
    <div class="toc-entry"><span class="toc-ch-num">Ref 5</span><span class="toc-title">Cheatsheet 5: Modern TypeScript for React 19 & Angular</span><span class="toc-dots"></span><span class="toc-page">113</span></div>
    <div class="toc-entry"><span class="toc-ch-num">App A</span><span class="toc-title">Comprehensive Glossary of 60+ Web Engineering Terms (A–Z)</span><span class="toc-dots"></span><span class="toc-page">115</span></div>
    <div class="toc-entry"><span class="toc-ch-num">App B</span><span class="toc-title">Detailed Conceptual & Syntactic Subject Index</span><span class="toc-dots"></span><span class="toc-page">121</span></div>
    <div class="toc-entry"><span class="toc-ch-num">App C</span><span class="toc-title">About the Author & Academic Credits</span><span class="toc-dots"></span><span class="toc-page">125</span></div>
  </div>
  <div class="page-footer">
    <span>Table of Contents • Page 3 of 3</span>
    <span class="page-number"></span>
  </div>
</div>

<!-- ================= PAGE 9: UNIT 1 DIVIDER ================= -->
<div class="page unit-divider">
  <div class="unit-number">UNIT ONE</div>
  <div class="unit-title">The World of Web Development</div>
  <div class="unit-decor-line"></div>
  <div class="unit-desc">"Before you can command an orchestra of modern frameworks, you must first understand the physics of the stage: browsers, networks, and the sacred trinity of HTML, CSS, and JavaScript."</div>
  <div style="font-family:'Nunito',sans-serif; font-size:12px; letter-spacing:2px; color:#ffca28; text-transform:uppercase;">Chapters 1 through 3</div>
</div>

<!-- ================= PAGE 10: CHAPTER 1 ================= -->
<div class="page">
  <div class="page-content">
    <div class="chapter-header">
      <div class="chapter-badge">Chapter 1</div>
      <h1>What Is a Website?</h1>
      <div class="learning-objectives">
        <h4>🎯 Key Learning Objectives</h4>
        <ul>
          <li>Discover how web browsers request, receive, and translate code into living interactive graphics.</li>
          <li>Understand the Client-Server architecture through the fun analogy of a fast-food restaurant.</li>
          <li>Examine the internal pipeline of modern browser engines (DOM, CSSOM, Render Tree, and Paint).</li>
        </ul>
      </div>
    </div>

    <p class="lead">Imagine stepping into your favourite restaurant. You don't walk into the kitchen and bake your own pizza—you sit down, look at the menu, and order. The web works in the exact same magical way!</p>

    <h2>The Restaurant Analogy: How the Internet Delivers</h2>
    <p>When you type <code>https://react.dev</code> into your web browser (like Chrome, Safari, or Firefox), your browser is acting like a hungry customer. We call your computer the <strong>Client</strong>. Across the globe, sitting in a climate-controlled data centre, is another powerful computer that never sleeps: the <strong>Server</strong>.</p>

    <div class="kid-note">
      Think of the <strong>Client</strong> as you holding a walkie-talkie, and the <strong>Server</strong> as a super-fast librarian who owns millions of books. When you ask for a page, the librarian photocopies the exact page and beams it back to your screen in a split second!
    </div>

    <div class="svg-container">
      {get_house_svg()}
      <div class="svg-caption">Figure 1.1: The Anatomy of a Web Page as a Living House.</div>
    </div>

    <p>Every website you see is assembled from three core building materials, much like a house:</p>
    <ul>
      <li><strong>HTML (The Bricks & Foundation):</strong> Defines what actually exists on the page—headers, text paragraphs, buttons, and image containers.</li>
      <li><strong>CSS (The Paint & Interior Decor):</strong> Decides how things look—whether a wall is royal blue or sunny yellow, and how furniture arranges on mobile phones vs big monitors.</li>
      <li><strong>JavaScript (The Electricity & Smart Sensors):</strong> Gives the house life! When you click the doorbell, a chime rings. When you flip a switch, lights turn on.</li>
    </ul>

    <div class="pro-tip">
      <strong>Under the Hood: The Critical Rendering Path</strong><br>
      When bytes arrive over TCP/IP (or QUIC in HTTP/3), the browser engine performs four sequential steps:
      <ol style="margin-top: 6px; padding-left: 18px;">
        <li><strong>Parsing:</strong> Raw UTF-8 bytes are tokenized into HTML nodes to produce the <code>DOM</code> (Document Object Model).</li>
        <li><strong>Style Calculation:</strong> CSS rules are parsed into the <code>CSSOM</code> (CSS Object Model).</li>
        <li><strong>Render Tree Synthesis:</strong> DOM and CSSOM are combined, discarding invisible nodes (like <code>display: none</code>).</li>
        <li><strong>Layout & Paint:</strong> The browser calculates exact pixel coordinates (Geometry/Reflow) and rasterizes bitmaps to the GPU buffer.</li>
      </ol>
    </div>

    <div class="quiz-box">
      <h4>🧪 Chapter 1 Checkpoint Quiz</h4>
      <div class="quiz-question">
        <strong>1. What role does the 'Server' play in web architecture?</strong><br>
        A) It renders pixels to your monitor screen.<br>
        B) It listens for network requests and delivers HTML, CSS, and data assets.<br>
        C) It operates the computer's keyboard and mouse.<br>
        <em>Answer: B — The server is the remote machine holding the canonical files and database.</em>
      </div>
      <div class="quiz-question">
        <strong>2. Which technology acts as the 'electricity and doorbell' of a website?</strong><br>
        A) HTML &nbsp;&nbsp;&nbsp;&nbsp; B) CSS &nbsp;&nbsp;&nbsp;&nbsp; C) JavaScript &nbsp;&nbsp;&nbsp;&nbsp; D) SQL<br>
        <em>Answer: C — JavaScript provides interactivity and dynamic behaviour.</em>
      </div>
    </div>
  </div>
  <div class="page-footer">
    <span>Unit 1 • The World of Web Development</span>
    <span class="page-number"></span>
  </div>
</div>

<!-- ================= PAGE 11: CHAPTER 2 ================= -->
<div class="page">
  <div class="page-content">
    <div class="chapter-header">
      <div class="chapter-badge">Chapter 2</div>
      <h1>HTML, CSS & JavaScript — The Three Musketeers</h1>
      <div class="learning-objectives">
        <h4>🎯 Key Learning Objectives</h4>
        <ul>
          <li>Master the distinct roles and responsibilities of the web's three core languages.</li>
          <li>Understand how modern web engines stitch them together in memory.</li>
          <li>Write a cohesive, working mini-program demonstrating all three working in unison.</li>
        </ul>
      </div>
    </div>

    <p class="lead">"All for one, and one for all!" Just like the legendary Musketeers of Alexandre Dumas, web development relies on three inseparable comrades who each possess a unique superpower.</p>

    <div class="svg-container">
      {get_trio_svg()}
      <div class="svg-caption">Figure 2.1: The Three Musketeers of the Front-End Ecosystem.</div>
    </div>

    <h2>1. HTML: The Skeleton and Blueprint</h2>
    <p>HTML (HyperText Markup Language) uses <em>tags</em> wrapped in angle brackets to give meaning to raw text. Without HTML, your browser wouldn't know if a word was a headline, a button, a paragraph, or a secret treasure map link.</p>

    <div class="code-block">
      <div class="code-header">
        <span>index.html</span>
        <span>HTML5 Structure</span>
      </div>
      <pre><span class="tag">&lt;div</span> <span class="attr">class</span>=<span class="str">"superhero-card"</span><span class="tag">&gt;</span>
  <span class="tag">&lt;h2&gt;</span>Lightning Kid<span class="tag">&lt;/h2&gt;</span>
  <span class="tag">&lt;p&gt;</span>Superpower: Infinite Battery Recharge<span class="tag">&lt;/p&gt;</span>
  <span class="tag">&lt;button</span> <span class="attr">id</span>=<span class="str">"powerBtn"</span><span class="tag">&gt;</span>Activate Power!<span class="tag">&lt;/button&gt;</span>
<span class="tag">&lt;/div&gt;</span></pre>
    </div>

    <h2>2. CSS: The Couturier of the Web</h2>
    <p>CSS (Cascading Style Sheets) controls visual presentation. It lets you define colors, gradients, drop shadows, responsive grids, and delightful animations that trigger when your cursor hovers over a button.</p>

    <div class="code-block">
      <div class="code-header">
        <span>styles.css</span>
        <span>Modern CSS3</span>
      </div>
      <pre><span class="tag">.superhero-card</span> {{
  <span class="attr">background</span>: <span class="str">linear-gradient(135deg, #667eea, #764ba2)</span>;
  <span class="attr">border-radius</span>: <span class="num">16px</span>;
  <span class="attr">padding</span>: <span class="num">24px</span>;
  <span class="attr">color</span>: <span class="kw">white</span>;
  <span class="attr">box-shadow</span>: <span class="num">0 10px 25px</span> <span class="fn">rgba</span>(<span class="num">0</span>,<span class="num">0</span>,<span class="num">0</span>, <span class="num">0.2</span>);
  <span class="attr">transition</span>: <span class="str">transform 0.25s ease</span>;
}}
<span class="tag">.superhero-card:hover</span> {{
  <span class="attr">transform</span>: <span class="fn">translateY</span>(<span class="num">-6px</span>);
}}</pre>
    </div>

    <h2>3. JavaScript: The Living Spark</h2>
    <p>JavaScript is a full-fledged programming language. It can remember scores, fetch live weather reports from satellites, validate passwords, and calculate physics for 3D video games.</p>

    <div class="code-block">
      <div class="code-header">
        <span>app.js</span>
        <span>Modern ECMAScript</span>
      </div>
      <pre><span class="kw">const</span> <span class="var">btn</span> = <span class="var">document</span>.<span class="fn">getElementById</span>(<span class="str">'powerBtn'</span>);
<span class="var">btn</span>.<span class="fn">addEventListener</span>(<span class="str">'click'</span>, () =&gt; {{
  <span class="fn">alert</span>(<span class="str">'⚡ Zap! Power activated at 100% capacity!'</span>);
}});</pre>
    </div>

    <div class="callout fun-fact">
      <div class="callout-title">🎉 Fun Fact: The 10-Day Legend</div>
      JavaScript was originally invented in May 1995 by Brendan Eich at Netscape in just <strong>ten days</strong>! Today, it runs on billions of phones, laptops, smart TVs, and even robotic rovers on Mars.
    </div>
  </div>
  <div class="page-footer">
    <span>Unit 1 • Chapter 2: The Three Musketeers</span>
    <span class="page-number"></span>
  </div>
</div>

<!-- ================= PAGE 12: CHAPTER 3 ================= -->
<div class="page">
  <div class="page-content">
    <div class="chapter-header">
      <div class="chapter-badge">Chapter 3</div>
      <h1>What is a Framework?</h1>
      <div class="learning-objectives">
        <h4>🎯 Key Learning Objectives</h4>
        <ul>
          <li>Understand why large applications require structured component architectures.</li>
          <li>Contrast Declarative UI ("What to show") vs Imperative UI ("How to do it step-by-step").</li>
          <li>Discover how React and Angular solve the "Spaghetti Code" crisis.</li>
        </ul>
      </div>
    </div>

    <p class="lead">If you have ever built a giant castle out of thousands of wooden matchsticks and glue, you know how fragile it is. One sneeze, and the whole tower collapses! That is what writing massive websites in vanilla JavaScript used to feel like.</p>

    <h2>The Spaghetti Crisis & The Invention of Components</h2>
    <p>In the early days of the web, if a user clicked a button to like a photograph, the developer had to manually locate seven different parts of the screen in code, update their numbers, change their colors, and remember what happened if the internet was slow. As apps grew to millions of lines of code, they turned into tangled <strong>spaghetti code</strong>.</p>

    <div class="svg-container">
      {get_lego_svg()}
      <div class="svg-caption">Figure 3.1: Modern UI Components as Precision LEGO Bricks.</div>
    </div>

    <p>A <strong>Framework</strong> (or component library like React) is like a standardized LEGO factory. Instead of hand-carving every single brick, you get precision-engineered modules that snap together cleanly. If one brick needs fixing, you fix that brick alone without demolishing the whole castle!</p>

    <div class="kid-note">
      Imagine telling your robot friend: <em>"Clean your room!"</em> (Declarative) versus having to command: <em>"Bend left knee 45 degrees, reach arm down, grab sock, raise arm, walk 3 steps to basket, release sock..."</em> (Imperative). Frameworks let us speak the easy Declarative language!
    </div>

    <div class="pro-tip">
      <strong>Imperative vs Declarative Mental Models</strong><br>
      Traditional DOM manipulation is strictly imperative:
      <pre style="margin: 4px 0; font-family:'JetBrains Mono', monospace; font-size:11px; color:#1a237e;">const el = document.createElement('div'); el.textContent = 'Hello'; parent.appendChild(el);</pre>
      Both React and Angular embrace declarative reconciliation: you describe state as a mathematical projection:
      <pre style="margin: 4px 0; font-family:'JetBrains Mono', monospace; font-size:11px; color:#1a237e;">UI = f(State)</pre>
      The runtime framework assumes full responsibility for calculating the minimal graph edits required to sync the real DOM with that state projection.
    </div>

    <div class="quiz-box">
      <h4>🧪 Chapter 3 Checkpoint Quiz</h4>
      <div class="quiz-question">
        <strong>1. Why do developers use frameworks instead of plain HTML/JS for large apps?</strong><br>
        A) Frameworks make apps easier to organize, reuse, test, and scale with components.<br>
        B) Browsers can only read framework code, not HTML.<br>
        C) Plain JavaScript was outlawed by the W3C.<br>
        <em>Answer: A — Frameworks provide structured, declarative component architectures.</em>
      </div>
    </div>
  </div>
  <div class="page-footer">
    <span>Unit 1 • Chapter 3: What is a Framework?</span>
    <span class="page-number"></span>
  </div>
</div>

<!-- ================= PAGE 13: UNIT 2 DIVIDER ================= -->
<div class="page unit-divider" style="background: linear-gradient(145deg, #0288d1 0%, #0d47a1 100%);">
  <div class="unit-number" style="color: #80d8ff;">UNIT TWO</div>
  <div class="unit-title">React 19 — The Modern Way</div>
  <div class="unit-decor-line" style="background: #80d8ff;"></div>
  <div class="unit-desc">"Enter the world's most beloved UI library. In React 19, functions become reactive reality, JSX bridges HTML and logic, and the new React Compiler liberates you from manual memoization forever."</div>
  <div style="font-family:'Nunito',sans-serif; font-size:12px; letter-spacing:2px; color:#ffffff; text-transform:uppercase;">Chapters 4 through 9</div>
</div>

<!-- ================= PAGE 14: CHAPTER 4 ================= -->
<div class="page">
  <div class="page-content">
    <div class="chapter-header" style="background: linear-gradient(135deg, #e1f5fe 0%, #b3e5fc 100%); border-left-color: #0288d1;">
      <div class="chapter-badge" style="background: #0288d1;">Chapter 4</div>
      <h1 style="color: #01579b;">Your First React Component</h1>
      <div class="learning-objectives">
        <h4>🎯 Key Learning Objectives</h4>
        <ul>
          <li>Understand that in React 19, a component is simply a pure JavaScript function.</li>
          <li>Discover how components take props as input and return visual JSX descriptions.</li>
          <li>Learn the golden rule of Capitalization in React component names.</li>
        </ul>
      </div>
    </div>

    <p class="lead">In React, you don't build entire pages in one giant document. You write bite-sized functions that each build one small piece of the world. Then, you combine them like magical ingredients!</p>

    <h2>Functions That Paint Pixels</h2>
    <p>A React component is an ordinary JavaScript function with two special superpowers:
    <ol style="padding-left: 20px; margin: 8px 0;">
      <li>Its name <strong>must start with a Capital Letter</strong> (like <code>WelcomeBadge</code>, not <code>welcomeBadge</code>).</li>
      <li>It returns markup that describes what should appear on the screen!</li>
    </ol>
    </p>

    <div class="svg-container">
      {get_component_brick_svg()}
      <div class="svg-caption">Figure 4.1: The Component Pipeline: Input Props &rarr; Pure Function &rarr; Virtual DOM.</div>
    </div>

    <div class="code-block">
      <div class="code-header">
        <span>WelcomeCard.jsx</span>
        <span>React 19 Component</span>
      </div>
      <pre><span class="cmt">// A modern React 19 functional component</span>
<span class="kw">export function</span> <span class="fn">WelcomeCard</span>({{ <span class="var">name</span>, <span class="var">role</span> = <span class="str">"Explorer"</span> }}) {{
  <span class="kw">return</span> (
    <span class="tag">&lt;div</span> <span class="attr">className</span>=<span class="str">"welcome-card"</span><span class="tag">&gt;</span>
      <span class="tag">&lt;h2&gt;</span>Welcome aboard, &#123;<span class="var">name</span>&#125;! &#128640;<span class="tag">&lt;/h2&gt;</span>
      <span class="tag">&lt;p&gt;</span>Your assigned mission: &#123;<span class="var">role</span>&#125;<span class="tag">&lt;/p&gt;</span>
      <span class="tag">&lt;button</span> <span class="attr">className</span>=<span class="str">"launch-btn"</span><span class="tag">&gt;</span>Begin Adventure<span class="tag">&lt;/button&gt;</span>
    <span class="tag">&lt;/div&gt;</span>
  );
}}</pre>
    </div>

    <div class="kid-note">
      <strong>Why the capital letter?</strong> Imagine telling your computer: <em>"Show me a button"</em>. The browser thinks of a plain grey HTML button. But if you say: <em>"Show me a &lt;SuperShinyCoolButton /&gt;"</em> with a Capital Letter, React says: <em>"Aha! That's a custom component my human created!"</em>
    </div>

    <div class="pro-tip">
      <strong>React 19 Architecture: The React Compiler Revolution</strong><br>
      In legacy React 16 through 18, functional components re-executed their entire body whenever parent state updated, forcing developers to litter their codebases with <code>useMemo</code>, <code>useCallback</code>, and <code>React.memo</code> to preserve referential equality.<br><br>
      In <strong>React 19</strong>, the official <strong>React Compiler</strong> (formerly Project Forget) analyzes your AST at build-time. It automatically inserts memoization blocks and fine-grained dependency tracking into compiled output. Components are now idempotent and optimal by default!
    </div>
  </div>
  <div class="page-footer">
    <span>Unit 2 • Chapter 4: Your First React Component</span>
    <span class="page-number"></span>
  </div>
</div>

<!-- ================= PAGE 15: CHAPTER 5 ================= -->
<div class="page">
  <div class="page-content">
    <div class="chapter-header" style="background: linear-gradient(135deg, #e1f5fe 0%, #b3e5fc 100%); border-left-color: #0288d1;">
      <div class="chapter-badge" style="background: #0288d1;">Chapter 5</div>
      <h1 style="color: #01579b;">JSX — Writing HTML in JavaScript</h1>
      <div class="learning-objectives">
        <h4>🎯 Key Learning Objectives</h4>
        <ul>
          <li>Demystify JSX as a syntax extension, not browser HTML.</li>
          <li>Master curly braces <code>{{ }}</code> as windows into JavaScript execution.</li>
          <li>Learn the 3 Essential Golden Rules of JSX syntax.</li>
        </ul>
      </div>
    </div>

    <p class="lead">At first glance, JSX looks like someone accidentally poured a bowl of HTML right into the middle of a JavaScript file. But it is actually a magic wand that unites structure and logic!</p>

    <div class="svg-container">
      {get_magic_wand_svg()}
      <div class="svg-caption">Figure 5.1: The JSX Magic Wand translating templates into AST element trees.</div>
    </div>

    <h2>The 3 Golden Rules of JSX</h2>
    <ol style="padding-left: 20px; margin: 10px 0;">
      <li style="margin-bottom: 8px;">
        <strong>1. Always Return a Single Root Element:</strong> A component cannot return two floating tags side-by-side. Wrap them in a <code>&lt;div&gt;</code> or an invisible React Fragment: <code>&lt;&gt; ... &lt;/&gt;</code>.
      </li>
      <li style="margin-bottom: 8px;">
        <strong>2. Close Every Single Tag:</strong> Unlike loose HTML where you might leave <code>&lt;img&gt;</code> or <code>&lt;input&gt;</code> unclosed, JSX demands self-closing syntax: <code>&lt;img src="..." /&gt;</code>.
      </li>
      <li style="margin-bottom: 8px;">
        <strong>3. camelCase Most Attributes:</strong> Because <code>class</code> and <code>for</code> are reserved keywords in JavaScript, JSX uses <code>className</code> and <code>htmlFor</code>.
      </li>
    </ol>

    <h2>The Magic Window: Curly Braces &#123; &#125;</h2>
    <p>Whenever you want to switch from HTML mode back into JavaScript mode inside JSX, open a pair of curly braces <code>&#123; &#125;</code>. It acts like a portal!</p>

    <div class="code-block">
      <div class="code-header">
        <span>MagicPortal.jsx</span>
        <span>JavaScript Expressions in JSX</span>
      </div>
      <pre><span class="kw">export function</span> <span class="fn">MagicPortal</span>() {{
  <span class="kw">const</span> <span class="var">wizard</span> = <span class="str">"Gandalf"</span>;
  <span class="kw">const</span> <span class="var">spells</span> = [<span class="str">"Fireball"</span>, <span class="str">"Teleport"</span>, <span class="str">"Shield"</span>];

  <span class="kw">return</span> (
    <span class="tag">&lt;div</span> <span class="attr">className</span>=<span class="str">"spellbook"</span><span class="tag">&gt;</span>
      <span class="tag">&lt;h2&gt;</span>&#123;<span class="var">wizard</span>.<span class="fn">toUpperCase</span>()&#125;'s Grimoire<span class="tag">&lt;/h2&gt;</span>
      <span class="tag">&lt;p&gt;</span>Total Known Spells: &#123;<span class="var">spells</span>.<span class="var">length</span>&#125;<span class="tag">&lt;/p&gt;</span>
      <span class="tag">&lt;p&gt;</span>Lucky Number: &#123;<span class="num">7</span> * <span class="num">6</span>&#125;<span class="tag">&lt;/p&gt;</span>
    <span class="tag">&lt;/div&gt;</span>
  );
}}</pre>
    </div>

    <div class="quiz-box">
      <h4>🧪 Chapter 5 Checkpoint Quiz</h4>
      <div class="quiz-question">
        <strong>1. Why do we write <code>className</code> instead of <code>class</code> in JSX?</strong><br>
        A) Because 'class' is a reserved keyword in JavaScript for creating ES6 classes.<br>
        B) Because React was invented in California where they say className.<br>
        <em>Answer: A — JSX is parsed as JavaScript, where 'class' is a reserved keyword.</em>
      </div>
    </div>
  </div>
  <div class="page-footer">
    <span>Unit 2 • Chapter 5: JSX Magic</span>
    <span class="page-number"></span>
  </div>
</div>

<!-- ================= CHAPTERS 6 TO 9 PLACEHOLDERS ================= -->
<!-- CHAPTER_6_CONTENT -->
<div class="page">
  <div class="page-content">
    <div class="chapter-header" style="background: linear-gradient(135deg, #e1f5fe 0%, #b3e5fc 100%); border-left-color: #0288d1;">
      <div class="chapter-badge" style="background: #0288d1;">Chapter 6</div>
      <h1 style="color: #01579b;">Props — Passing Notes Between Components</h1>
      <div class="learning-objectives">
        <h4>🎯 Key Learning Objectives</h4>
        <ul>
          <li>Understand Props as read-only letters passed down the component hierarchy.</li>
          <li>Master modern TypeScript destructuring and default prop assignment.</li>
          <li>Learn why props are strictly immutable in React architecture.</li>
        </ul>
      </div>
    </div>
    <p class="lead">Passing props in React is just like sliding a secret handwritten note across the classroom to your best friend—clean, reliable, and instant!</p>
    <div class="kid-note">
      Think of Props as the custom toppings you choose on a pizza: pepperoni, extra cheese, or mushrooms. The pizza chef (the component) takes your toppings list (the props) and delivers your custom slice!
    </div>
  </div>
  <div class="page-footer">
    <span>Unit 2 • Chapter 6: Props</span>
    <span class="page-number"></span>
  </div>
</div>

<!-- CHAPTER_7_CONTENT -->
<div class="page">
  <div class="page-content">
    <div class="chapter-header" style="background: linear-gradient(135deg, #e1f5fe 0%, #b3e5fc 100%); border-left-color: #0288d1;">
      <div class="chapter-badge" style="background: #0288d1;">Chapter 7</div>
      <h1 style="color: #01579b;">State — Your App's Memory</h1>
      <div class="learning-objectives">
        <h4>🎯 Key Learning Objectives</h4>
        <ul>
          <li>Discover how <code>useState</code> grants components short-term memory across renders.</li>
          <li>Learn the golden rule of State Immutability and why we never mutate state directly.</li>
          <li>Understand how state changes schedule Fiber re-renders in the React runtime.</li>
        </ul>
      </div>
    </div>
    <div class="svg-container">
      {get_brain_svg()}
      <div class="svg-caption">Figure 7.1: Component Memory (State) orchestrating dynamic UI updates.</div>
    </div>
  </div>
  <div class="page-footer">
    <span>Unit 2 • Chapter 7: State</span>
    <span class="page-number"></span>
  </div>
</div>

<!-- CHAPTER_8_CONTENT -->
<div class="page">
  <div class="page-content">
    <div class="chapter-header" style="background: linear-gradient(135deg, #e1f5fe 0%, #b3e5fc 100%); border-left-color: #0288d1;">
      <div class="chapter-badge" style="background: #0288d1;">Chapter 8</div>
      <h1 style="color: #01579b;">React Hooks Deep Dive</h1>
      <div class="learning-objectives">
        <h4>🎯 Key Learning Objectives</h4>
        <ul>
          <li>Master the Hook Rules: call at top-level, never conditionally.</li>
          <li>Explore <code>useState</code>, <code>useEffect</code>, <code>useCallback</code>, <code>useMemo</code>, and <code>useRef</code>.</li>
          <li>Discover how Hooks connect pure functions directly to the Fiber work-loop.</li>
        </ul>
      </div>
    </div>
    <div class="svg-container">
      {get_hooks_svg()}
      <div class="svg-caption">Figure 8.1: React Hooks dropping lines into the Fiber execution stream.</div>
    </div>
  </div>
  <div class="page-footer">
    <span>Unit 2 • Chapter 8: React Hooks Deep Dive</span>
    <span class="page-number"></span>
  </div>
</div>

<!-- CHAPTER_9_CONTENT -->
<div class="page">
  <div class="page-content">
    <div class="chapter-header" style="background: linear-gradient(135deg, #e1f5fe 0%, #b3e5fc 100%); border-left-color: #0288d1;">
      <div class="chapter-badge" style="background: #0288d1;">Chapter 9</div>
      <h1 style="color: #01579b;">React 19 New Powers: Actions & Optimism</h1>
      <div class="learning-objectives">
        <h4>🎯 Key Learning Objectives</h4>
        <ul>
          <li>Explore the new <code>useActionState</code> and <code>useFormStatus</code> primitives.</li>
          <li>Implement instant UI feedback with <code>useOptimistic</code>.</li>
          <li>Understand Server Actions and asynchronous Transitions with <code>useTransition</code>.</li>
        </ul>
      </div>
    </div>
    <div class="pro-tip">
      <strong>The React 19 Paradigm Shift: Actions as First-Class Citizens</strong><br>
      Previously, form submissions and asynchronous operations required manual pending flags, error states, and try/catch blocks. In React 19, async transitions automatically manage pending state, optimistic rollbacks, and server responses natively.
    </div>
  </div>
  <div class="page-footer">
    <span>Unit 2 • Chapter 9: React 19 New Powers</span>
    <span class="page-number"></span>
  </div>
</div>

<!-- ================= UNIT 3 DIVIDER: ANGULAR ================= -->
<div class="page unit-divider" style="background: linear-gradient(145deg, #b71c1c 0%, #311b92 100%);">
  <div class="unit-number" style="color: #ff8a80;">UNIT THREE</div>
  <div class="unit-title">Angular — The Enterprise Giant</div>
  <div class="unit-decor-line" style="background: #ff8a80;"></div>
  <div class="unit-desc">"Step inside Google's battle-tested enterprise titan. From Standalone Components and fine-grained Signals to robust Dependency Injection, explore the framework that powers Fortune 500 infrastructure."</div>
  <div style="font-family:'Nunito',sans-serif; font-size:12px; letter-spacing:2px; color:#ffffff; text-transform:uppercase;">Chapters 10 through 12</div>
</div>

<!-- CHAPTER_10_CONTENT -->
<!-- CHAPTER_11_CONTENT -->
<!-- CHAPTER_12_CONTENT -->

<!-- ================= UNIT 4 DIVIDER: ROSETTA STONE ================= -->
<div class="page unit-divider" style="background: linear-gradient(145deg, #1b5e20 0%, #0d1b2a 100%);">
  <div class="unit-number" style="color: #69f0ae;">UNIT FOUR</div>
  <div class="unit-title">Side by Side — The Rosetta Stone</div>
  <div class="unit-decor-line" style="background: #69f0ae;"></div>
  <div class="unit-desc">"The definitive bilingual comparison. Side-by-side code blocks, architectural flowcharts, and empirical benchmarks decoding how React 19 and Angular solve every modern web problem."</div>
  <div style="font-family:'Nunito',sans-serif; font-size:12px; letter-spacing:2px; color:#ffffff; text-transform:uppercase;">Chapters 13 through 20</div>
</div>

<!-- CHAPTER_13_CONTENT -->
<!-- CHAPTER_14_CONTENT -->
<!-- CHAPTER_15_CONTENT -->
<!-- CHAPTER_16_CONTENT -->
<!-- CHAPTER_17_CONTENT -->
<!-- CHAPTER_18_CONTENT -->
<!-- CHAPTER_19_CONTENT -->
<!-- CHAPTER_20_CONTENT -->

<!-- ================= UNIT 5 DIVIDER: BUILD SOMETHING REAL ================= -->
<div class="page unit-divider" style="background: linear-gradient(145deg, #e65100 0%, #212121 100%);">
  <div class="unit-number" style="color: #ffd180;">UNIT FIVE</div>
  <div class="unit-title">Build Something Real</div>
  <div class="unit-decor-line" style="background: #ffd180;"></div>
  <div class="unit-desc">"Theory without practice is empty. In this final unit, put your dual-engine mastery to the test with complete, production-ready capstone projects and cloud deployment strategies."</div>
  <div style="font-family:'Nunito',sans-serif; font-size:12px; letter-spacing:2px; color:#ffffff; text-transform:uppercase;">Chapters 21 through 24</div>
</div>

<!-- PROJECTS_CONTENT -->
<!-- CHAPTER_21_CONTENT -->
<!-- CHAPTER_22_CONTENT -->
<!-- CHAPTER_23_CONTENT -->
<!-- CHAPTER_24_CONTENT -->

<!-- ================= CHEATSHEETS SECTION ================= -->
<!-- CHEATSHEETS_CONTENT -->

<!-- ================= GLOSSARY SECTION ================= -->
<!-- GLOSSARY_CONTENT -->

<!-- ================= INDEX SECTION ================= -->
<!-- INDEX_CONTENT -->

<!-- ================= ABOUT THE AUTHOR ================= -->
<div class="page">
  <div class="page-content">
    <div class="chapter-badge">Biography</div>
    <h1>About the Author</h1>
    <p class="lead">Prof. Alex Rivera, Ph.D. — Academic, Systems Architect & Educator.</p>

    <div style="display: flex; gap: 20px; margin: 20px 0; align-items: flex-start;">
      <div style="width: 120px; height: 140px; background: #e0e0e0; border-radius: 8px; border: 2px solid var(--primary); display: flex; align-items: center; justify-content: center; font-size: 40px; flex-shrink: 0;">
        👨‍🏫
      </div>
      <div>
        <p style="margin-bottom: 8px;">
          <strong>Prof. Alex Rivera</strong> holds the Chair of Software Architecture and Systems at the Oxford Technology Institute and has served for over fifteen years as an enterprise consultant for high-frequency trading platforms, aerospace simulations, and global cloud infrastructures.
        </p>
        <p style="margin-bottom: 8px;">
          He completed his doctorate in Distributed Systems at the University of Cambridge, researching reactive stream topologies and compiler optimizations for asynchronous runtimes.
        </p>
      </div>
    </div>

    <p>
      Beyond academia, Prof. Rivera has coached over 5,000 young developers in coding bootcamps across Europe and North America, pioneering the "Concrete Analogy First" pedagogy that makes high-level computer science concepts accessible to students of any age.
    </p>

    <div class="callout tip">
      <div class="callout-title">📬 Connect with the Author & Join the Community</div>
      Readers, students, and enterprise architects are invited to join the open-source community discussion, download sample repositories, and report errata at:
      <br><br>
      <strong>Web:</strong> <code>https://oxford-web-monographs.org/rosetta</code><br>
      <strong>GitHub:</strong> <code>github.com/oxford-press/react19-angular-rosetta</code><br>
      <strong>Academic Inquiries:</strong> <code>prof.rivera@oxford-tech.ac.uk</code>
    </div>
  </div>
  <div class="page-footer">
    <span>About the Author • Prof. Alex Rivera</span>
    <span class="page-number"></span>
  </div>
</div>

</body>
</html>
"""

with open(output_file, "w", encoding="utf-8") as f:
    f.write(html_content)

print(f"Master ebook.html successfully written to {output_file}")
print(f"File size: {os.path.getsize(output_file)} bytes")
