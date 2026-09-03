/* ═══════════════════════════════════════════════════════════
   CONON LABS — main.js
═══════════════════════════════════════════════════════════ */

/* ── Year ──────────────────────────────────────────────── */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ── Starfield Canvas ──────────────────────────────────── */
(function initStarfield() {
  const canvas = document.getElementById('starfield');
  if (!canvas) return;
  const ctx    = canvas.getContext('2d');
  let stars    = [];
  let W, H;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
    buildStars();
  }

  function buildStars() {
    stars = [];
    const count = Math.floor((W * H) / 4000);
    for (let i = 0; i < count; i++) {
      stars.push({
        x:     Math.random() * W,
        y:     Math.random() * H,
        r:     Math.random() * 0.9 + 0.1,
        alpha: Math.random(),
        speed: Math.random() * 0.003 + 0.001,
        phase: Math.random() * Math.PI * 2,
      });
    }
  }

  function draw(t) {
    ctx.clearRect(0, 0, W, H);
    for (const s of stars) {
      const a = 0.2 + 0.4 * Math.abs(Math.sin(t * s.speed + s.phase));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${a})`;
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  resize();
  requestAnimationFrame(draw);
})();

/* ── Navbar scroll behaviour ────────────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ── Hamburger / mobile menu ─────────────────────────────  */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  const open = hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open', open);
});

// Close on mobile link click
document.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

/* ── Apps dropdown ───────────────────────────────────────  */
document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
  const trigger = dropdown.querySelector('.nav-dropdown-trigger');
  if (!trigger) return;

  function closeDropdown() {
    dropdown.classList.remove('open');
    trigger.setAttribute('aria-expanded', 'false');
  }

  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    const open = dropdown.classList.toggle('open');
    trigger.setAttribute('aria-expanded', String(open));
  });

  document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target)) closeDropdown();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDropdown();
  });

  dropdown.querySelectorAll('.nav-dropdown-link').forEach(link => {
    link.addEventListener('click', closeDropdown);
  });
});

/* ── Active nav highlight on scroll ─────────────────────── */
const sections  = document.querySelectorAll('.content-section');
const navLinks  = document.querySelectorAll('.nav-link');
const NAV_H     = 70;

function updateActiveLink() {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - NAV_H - 40) {
      current = sec.id;
    }
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.dataset.section === current);
  });
}
window.addEventListener('scroll', updateActiveLink, { passive: true });

/* ── Markdown loader ─────────────────────────────────────── */
async function loadMarkdown(el) {
  const file = el.dataset.md;
  el.innerHTML = '<span class="md-loading">Loading…</span>';
  try {
    const res  = await fetch(file);
    if (!res.ok) throw new Error(res.status);
    const text = await res.text();
    el.innerHTML = marked.parse(text);
  } catch (e) {
    el.innerHTML = '<span class="md-loading">Content unavailable.</span>';
    console.warn('Could not load', file, e);
  }
}

document.querySelectorAll('.md-content').forEach(loadMarkdown);

/* ── Intersection observer — section fade-in ─────────────── */
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });

sections.forEach(sec => observer.observe(sec));

/* ── Smooth scroll for all anchor links ─────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const top = target.offsetTop - (target.id === 'hero' ? 0 : NAV_H - 4);
    window.scrollTo({ top, behavior: 'smooth' });
  });
});