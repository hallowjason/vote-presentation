// ═══════════════════════════════════════════════════════
//  CLICKABLE CHIPS (P3) → jump to story slide
//  (depends on goToSlide defined below)
// ═══════════════════════════════════════════════════════
document.querySelectorAll('.clickable-chip').forEach(chip => {
  chip.addEventListener('click', () => {
    goToSlide(parseInt(chip.dataset.target));
  });
});

// ═══════════════════════════════════════════════════════
//  SLIDE NAVIGATION
//  (starsOpacity is a global declared in animation.js)
// ═══════════════════════════════════════════════════════
const slides = Array.from(document.querySelectorAll('.slide'));
const total = slides.length;
let current = 0;
let isTransitioning = false;

const progressBar = document.getElementById('progress-bar');
const slideCounter = document.getElementById('slide-counter');
const cityLayer = document.getElementById('city-layer');
const starsBg = document.getElementById('stars-bg');

function pad(n) { return String(n).padStart(2,'0'); }

function goToSlide(idx) {
  if (idx < 0 || idx >= total || isTransitioning) return;
  isTransitioning = true;

  const prev = slides[current];
  const next = slides[idx];

  prev.classList.remove('active');
  current = idx;
  next.classList.add('active');

  // Reset dialogue step progression when entering any slide
  next.querySelectorAll('.dialogue-row').forEach(r => r.classList.remove('revealed'));

  // Reset anim items so stagger re-triggers
  const animItems = next.querySelectorAll('.anim-item');
  animItems.forEach(el => { el.style.opacity = '0'; el.style.transform = 'translateY(18px)'; });
  next.offsetHeight; // force reflow
  animItems.forEach(el => { el.style.opacity = ''; el.style.transform = ''; });

  // Update background
  const bg = next.dataset.bg;
  if (bg === 'city') {
    cityLayer.classList.add('visible');
    starsBg.classList.remove('visible');
    starsOpacity = 0.6;
  } else if (bg === 'stars') {
    cityLayer.classList.remove('visible');
    starsBg.classList.add('visible');
    starsOpacity = 1.0;
  } else {
    cityLayer.classList.remove('visible');
    starsBg.classList.remove('visible');
    starsOpacity = 0.35;
  }

  // Progress bar + slide counter
  const pct = ((current) / (total - 1)) * 100;
  progressBar.style.width = pct + '%';
  slideCounter.textContent = pad(current + 1) + ' / ' + pad(total);

  updateNavDots(idx);
  setTimeout(() => { isTransitioning = false; }, 650);
}

function next() {
  if (isTransitioning) return;
  const currentSlide = slides[current];
  // Within-slide step progression for dialogue slides
  if (currentSlide.classList.contains('dialogue-slide')) {
    const nextHidden = currentSlide.querySelector('.dialogue-row:not(.revealed)');
    if (nextHidden) {
      nextHidden.classList.add('revealed');
      return;
    }
  }
  const dataNext = currentSlide.dataset.next;
  if (dataNext !== undefined) {
    goToSlide(parseInt(dataNext));
  } else {
    goToSlide(current + 1);
  }
}

function prev() { goToSlide(current - 1); }

document.getElementById('btn-next').addEventListener('click', next);
document.getElementById('btn-prev').addEventListener('click', prev);
document.getElementById('btn-skip').addEventListener('click', () => goToSlide(6));

document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next();
  if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') prev();
});

let wheelDebounce = false;
document.addEventListener('wheel', e => {
  if (wheelDebounce) return;
  wheelDebounce = true;
  if (e.deltaY > 0) next(); else prev();
  setTimeout(() => { wheelDebounce = false; }, 320);
}, { passive: true });

// ─── Bottom navigation bar ───
const slideNavPanel = document.getElementById('slide-nav-panel');
const slideNavTrigger = document.getElementById('slide-nav-trigger');
let navHideTimer;

function showNav() {
  clearTimeout(navHideTimer);
  slideNavPanel.classList.add('visible');
}
function hideNav() {
  navHideTimer = setTimeout(() => slideNavPanel.classList.remove('visible'), 400);
}

slideNavTrigger.addEventListener('mouseenter', showNav);
slideNavTrigger.addEventListener('mouseleave', hideNav);
slideNavPanel.addEventListener('mouseenter', showNav);
slideNavPanel.addEventListener('mouseleave', hideNav);

const navDots = [];
const navFragment = document.createDocumentFragment();
slides.forEach((_, i) => {
  const dot = document.createElement('div');
  dot.className = 'nav-dot';
  dot.dataset.num = pad(i + 1);
  dot.addEventListener('click', () => goToSlide(i));
  navDots.push(dot);
  navFragment.appendChild(dot);
});
slideNavPanel.appendChild(navFragment);

function updateNavDots(idx) {
  navDots.forEach((dot, i) => dot.classList.toggle('active', i === idx));
}

// Init first slide background
goToSlide(0);
