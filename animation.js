// ═══════════════════════════════════════════════════════
//  DATA — constellation positions + connections
// ═══════════════════════════════════════════════════════
const principles = [
  // Group 1: Inner Virtue (top-left) — ice blue #a8c5da
  { id:1, zh:'戒慎驕矜', en:'Guard Against Arrogance', x:140, y:110, group:1 },
  { id:4, zh:'廣闊的胸襟', en:'A Generous Heart', x:240, y:185, group:1 },
  { id:7, zh:'修心', en:'Cultivate the Heart', x:110, y:270, group:1 },

  // Group 2: Personal Discipline (top-right) — gold #c9a96e
  { id:2, zh:'堅守原則', en:'Hold Fast to Principles', x:780, y:100, group:2 },
  { id:6, zh:'對自己負責任', en:'Take Responsibility', x:880, y:185, group:2 },
  { id:8, zh:'惜福', en:'Cherish Your Blessings', x:840, y:285, group:2 },
  { id:9, zh:'三清四正，三省四勿', en:'Three Purities & Four Rectitudes', x:730, y:340, group:2 },

  // Group 3: Team Ethics (bottom) — lavender #d4c9e8
  { id:3, zh:'各居其要，扶圓補缺', en:'Know Your Role, Fill the Gaps', x:280, y:450, group:3 },
  { id:10, zh:'尊師重道，聽師調遣', en:'Honor Teachers, Follow the Way', x:500, y:490, group:3 },

  // Group 4: Driving Force (center) — white-gold #fffae8
  { id:5, zh:'激發內在的力量', en:'Ignite Your Inner Strength', x:500, y:260, group:4 },
];

// Only intra-group connections, no cross-group lines
const connections = [
  [1,4],[4,7],[7,1],         // Group 1 triangle
  [2,6],[6,8],[8,9],[2,9],   // Group 2 quadrilateral
  [3,10],                    // Group 3 line
  // Group 4 (center engine) — no lines, pulsing ring instead
];

const groupColors = {
  1: '#a8c5da',
  2: '#c9a96e',
  3: '#d4c9e8',
  4: '#fffae8',
};

const groupSizes = { 1: 6, 2: 6, 3: 6, 4: 10 };

// Principle id → slide index mapping for the interactive constellation (P7-new, idx=6)
const principleSlideMap = { 1: 7, 4: 9, 2: 10, 3: 14, 5: 15, 6: 16, 10: 17, 7: 19 };

// ═══════════════════════════════════════════════════════
//  STARS CANVAS
// ═══════════════════════════════════════════════════════
const canvas = document.getElementById('stars-canvas');
const ctx = canvas.getContext('2d');

let stars = [];
let starsOpacity = 1;
let animFrame;

function resizeCanvas() {
  canvas.width = document.documentElement.clientWidth;
  canvas.height = document.documentElement.clientHeight;
}

function createStars() {
  stars = [];
  for (let i = 0; i < 220; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2.5 + 0.5,
      alpha: Math.random() * 0.8 + 0.2,
      baseAlpha: 0,
      twinkle: Math.random() < 0.35,
      twinkleSpeed: Math.random() * 0.015 + 0.005,
      twinklePhase: Math.random() * Math.PI * 2,
    });
    stars[stars.length-1].baseAlpha = stars[stars.length-1].alpha;
  }
}

function drawStars(ts) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.globalAlpha = starsOpacity;

  stars.forEach(s => {
    let a = s.baseAlpha;
    if (s.twinkle) {
      a = s.baseAlpha * (0.6 + 0.4 * Math.sin(ts * s.twinkleSpeed + s.twinklePhase));
    }
    if (s.r > 1.8) {
      const grd = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 2);
      grd.addColorStop(0, `rgba(255,255,255,${a})`);
      grd.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r * 2, 0, Math.PI * 2);
    } else {
      ctx.fillStyle = `rgba(255,255,255,${a})`;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    }
    ctx.fill();
  });

  ctx.restore();
  animFrame = requestAnimationFrame(drawStars);
}

resizeCanvas();
createStars();
requestAnimationFrame(drawStars);

window.addEventListener('resize', () => {
  resizeCanvas();
  createStars();
  generateCityWindows();
});

// ═══════════════════════════════════════════════════════
//  CITY WINDOWS — irregular flicker
// ═══════════════════════════════════════════════════════
const windowTimers = [];

function generateCityWindows() {
  windowTimers.forEach(t => clearInterval(t));
  windowTimers.length = 0;

  const container = document.getElementById('city-windows');
  container.innerHTML = '';

  const zones = [
    [80, 260, 215, 270],
    [260, 380, 170, 255],
    [380, 460, 145, 220],
    [460, 545, 50, 160],
    [545, 620, 60, 140],
    [610, 740, 45, 150],
    [740, 850, 95, 195],
    [850, 980, 158, 230],
    [980, 1100, 185, 255],
    [1100, 1280, 200, 265],
    [1280, 1440, 220, 278],
  ];

  for (let i = 0; i < 110; i++) {
    const zone = zones[Math.floor(Math.random() * zones.length)];
    const wx = zone[0] + Math.random() * (zone[1] - zone[0]);
    const wy = zone[2] + Math.random() * (zone[3] - zone[2]);
    const w = 3 + Math.random() * 5;
    const h = 2 + Math.random() * 4;

    const warm = Math.random() < 0.6;
    const baseColor = warm
      ? { r: 255, g: 220, b: 150 }
      : { r: 200, g: 230, b: 255 };

    const rect = document.createElementNS('http://www.w3.org/2000/svg','rect');
    rect.setAttribute('x', wx);
    rect.setAttribute('y', wy);
    rect.setAttribute('width', w);
    rect.setAttribute('height', h);
    rect.setAttribute('rx', '0.5');

    const onOpacity = warm ? 0.7 + Math.random() * 0.2 : 0.5 + Math.random() * 0.2;
    const offOpacity = 0.05 + Math.random() * 0.1;

    function setColor(on) {
      const op = on ? onOpacity : offOpacity;
      rect.setAttribute('fill', `rgba(${baseColor.r},${baseColor.g},${baseColor.b},${op})`);
    }

    setColor(true);
    container.appendChild(rect);

    // Each window gets its own random flicker interval (800–3000ms)
    let isOn = true;
    const flickerMs = 800 + Math.random() * 2200;
    const timer = setInterval(() => {
      isOn = !isOn;
      setColor(isOn);
    }, flickerMs);
    windowTimers.push(timer);
  }
}

generateCityWindows();

// ═══════════════════════════════════════════════════════
//  CONSTELLATION DEPTH LAYERS
// ═══════════════════════════════════════════════════════
function addDepthStars(bgGroupId, midGroupId) {
  const vw = 1000, vh = 560;
  const ns = 'http://www.w3.org/2000/svg';
  const bgG = document.getElementById(bgGroupId);
  const midG = document.getElementById(midGroupId);

  // Background layer: 100+ tiny stars, opacity 0.15–0.35, size 0.5–1.5px
  for (let i = 0; i < 120; i++) {
    const c = document.createElementNS(ns, 'circle');
    c.setAttribute('cx', Math.random() * vw);
    c.setAttribute('cy', Math.random() * vh);
    c.setAttribute('r', 0.5 + Math.random() * 1.0);
    c.setAttribute('fill', 'white');
    c.setAttribute('opacity', (0.15 + Math.random() * 0.20).toFixed(2));
    bgG.appendChild(c);
  }

  // Mid layer: 50 stars, opacity 0.4–0.6, size 1.5–2.5px
  for (let i = 0; i < 50; i++) {
    const c = document.createElementNS(ns, 'circle');
    c.setAttribute('cx', Math.random() * vw);
    c.setAttribute('cy', Math.random() * vh);
    c.setAttribute('r', 1.5 + Math.random() * 1.0);
    c.setAttribute('fill', 'white');
    c.setAttribute('opacity', (0.40 + Math.random() * 0.20).toFixed(2));
    midG.appendChild(c);
  }
}

addDepthStars('bg-stars-p3', 'mid-stars-p3');
addDepthStars('bg-stars-p13', 'mid-stars-p13');

// ═══════════════════════════════════════════════════════
//  CONSTELLATION BUILDER
// ═══════════════════════════════════════════════════════
function buildConstellation(svgId, tooltipId, containerId, slideMap) {
  const svg = document.getElementById(svgId);
  const linesG = svg.querySelector('.constellation-lines');
  const starsG = svg.querySelector('.constellation-stars');
  const tooltip = document.getElementById(tooltipId);
  const container = document.getElementById(containerId);

  // Draw intra-group connection lines
  connections.forEach(([a, b]) => {
    const pa = principles.find(p => p.id === a);
    const pb = principles.find(p => p.id === b);
    if (!pa || !pb) return;
    const color = groupColors[pa.group];
    const line = document.createElementNS('http://www.w3.org/2000/svg','line');
    line.setAttribute('x1', pa.x); line.setAttribute('y1', pa.y);
    line.setAttribute('x2', pb.x); line.setAttribute('y2', pb.y);
    line.setAttribute('stroke', color);
    line.setAttribute('stroke-width', '1.5');
    line.setAttribute('opacity', '0.5');
    line.setAttribute('class', 'constellation-line');
    line.dataset.a = a;
    line.dataset.b = b;
    linesG.appendChild(line);
  });

  // Draw star nodes
  principles.forEach(p => {
    const color = groupColors[p.group];
    const size = groupSizes[p.group];
    const g = document.createElementNS('http://www.w3.org/2000/svg','g');
    g.setAttribute('class','star-node');
    g.dataset.id = p.id;
    g.setAttribute('transform',`translate(${p.x},${p.y})`);

    // Group 4 (center) gets pulsing ring
    if (p.group === 4) {
      const ring = document.createElementNS('http://www.w3.org/2000/svg','circle');
      ring.setAttribute('r', '18');
      ring.setAttribute('fill', 'none');
      ring.setAttribute('stroke', color);
      ring.setAttribute('stroke-width', '1.5');
      ring.setAttribute('opacity', '0.5');
      ring.setAttribute('class', 'pulse-ring');
      g.appendChild(ring);
    }

    // Outer glow
    const outer = document.createElementNS('http://www.w3.org/2000/svg','circle');
    outer.setAttribute('r', size + 6);
    outer.setAttribute('fill', color);
    outer.setAttribute('opacity','0.12');
    outer.setAttribute('class','star-circle-outer');
    g.appendChild(outer);

    // Mid ring
    const mid = document.createElementNS('http://www.w3.org/2000/svg','circle');
    mid.setAttribute('r', size + 1.5);
    mid.setAttribute('fill', 'none');
    mid.setAttribute('stroke', color);
    mid.setAttribute('stroke-width','0.5');
    mid.setAttribute('opacity','0.4');
    g.appendChild(mid);

    // Core — use glow filter for group 4
    const core = document.createElementNS('http://www.w3.org/2000/svg','circle');
    core.setAttribute('r', size);
    core.setAttribute('fill', color);
    core.setAttribute('opacity', p.group === 4 ? '1' : '0.85');
    if (p.group === 4) {
      core.setAttribute('filter', 'url(#' + svg.querySelector('filter').id + ')');
    }
    g.appendChild(core);

    // Label for group 4
    if (p.group === 4) {
      const label = document.createElementNS('http://www.w3.org/2000/svg','text');
      label.setAttribute('y', size + 18);
      label.setAttribute('text-anchor','middle');
      label.setAttribute('fill', 'rgba(255,255,255,0.7)');
      label.setAttribute('font-size','12');
      label.setAttribute('font-family','Noto Serif TC, serif');
      label.textContent = p.zh;
      g.appendChild(label);
    }

    // Hover events
    g.addEventListener('mouseenter', () => {
      const containerRect = container.getBoundingClientRect();
      const svgRect = svg.getBoundingClientRect();
      const scaleX = svgRect.width / 1000;
      const scaleY = svgRect.height / 560;

      let tx = svgRect.left - containerRect.left + p.x * scaleX;
      const ty = svgRect.top - containerRect.top + p.y * scaleY;

      // Keep tooltip within container horizontally
      const edgeMargin = 130;
      tx = Math.max(edgeMargin, Math.min(containerRect.width - edgeMargin, tx));

      tooltip.style.left = tx + 'px';
      tooltip.style.top = (ty + (size + 6) * scaleY + 8) + 'px'; // below the star
      document.getElementById(tooltipId + '-zh').textContent = p.zh;
      document.getElementById(tooltipId + '-en').textContent = p.en;
      tooltip.classList.add('visible');

      // Highlight connected lines
      linesG.querySelectorAll('.constellation-line').forEach(l => {
        const la = parseInt(l.dataset.a), lb = parseInt(l.dataset.b);
        if (la === p.id || lb === p.id) {
          l.classList.add('highlighted');
          l.setAttribute('stroke', color);
          l.setAttribute('opacity', '0.9');
        }
      });

      outer.setAttribute('opacity','0.28');
      outer.setAttribute('r', size + 12);
    });

    g.addEventListener('mouseleave', () => {
      tooltip.classList.remove('visible');
      linesG.querySelectorAll('.constellation-line').forEach(l => {
        l.classList.remove('highlighted');
        const la = parseInt(l.dataset.a), lb = parseInt(l.dataset.b);
        const pa2 = principles.find(p2 => p2.id === la);
        if (pa2) l.setAttribute('stroke', groupColors[pa2.group]);
        l.setAttribute('opacity', '0.5');
      });
      outer.setAttribute('opacity','0.12');
      outer.setAttribute('r', size + 6);
    });

    // Click-to-navigate for interactive constellation
    if (slideMap && slideMap[p.id] !== undefined) {
      g.style.cursor = 'pointer';
      g.addEventListener('click', () => { goToSlide(slideMap[p.id]); });
    }

    starsG.appendChild(g);
  });
}

buildConstellation('svg-p3', 'tooltip-p3', 'constellation-p3');
buildConstellation('svg-p13', 'tooltip-p13', 'constellation-p13');
addDepthStars('bg-stars-p7', 'mid-stars-p7');
buildConstellation('svg-p7', 'tooltip-p7', 'constellation-p7', principleSlideMap);

// ═══════════════════════════════════════════════════════
//  CURSOR GLOW
// ═══════════════════════════════════════════════════════
const cursorGlow = document.getElementById('cursor-glow');
let pendingMouseX = 0, pendingMouseY = 0, cssVarsQueued = false;
document.addEventListener('mousemove', e => {
  cursorGlow.style.left = e.clientX + 'px';
  cursorGlow.style.top = e.clientY + 'px';
  pendingMouseX = e.clientX;
  pendingMouseY = e.clientY;
  // Throttle CSS var updates to once per animation frame
  if (!cssVarsQueued) {
    cssVarsQueued = true;
    requestAnimationFrame(() => {
      document.documentElement.style.setProperty('--cursor-x', (pendingMouseX / window.innerWidth * 100) + '%');
      document.documentElement.style.setProperty('--cursor-y', (pendingMouseY / window.innerHeight * 100) + '%');
      cssVarsQueued = false;
    });
  }
});
