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

/* ── Hero intro video ──────────────────────────────────────
   Muted loop by default. "Play with sound" / fullscreen reveal a second <video>
   holding the full cut (with audio). It is warmed up in the background once the
   page is idle, so the click starts playback from buffered data. When it ends,
   the loop returns. Interactions are counted as GoatCounter events. */
(function initHeroVideo() {
  const wrap  = document.getElementById('heroVideoWrap');
  const loop  = document.getElementById('heroVideo');
  if (!wrap || !loop) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const conn = navigator.connection || {};

  // 720p cut for phones and slow links, 1080p otherwise
  const useSmall = window.matchMedia('(max-width: 680px)').matches
    || /(^|-)2g$|3g/.test(conn.effectiveType || '');
  const FULL_SRC = useSmall ? 'assets/video/intro_full_720.mp4' : 'assets/video/intro_full.mp4';

  /* GoatCounter events — each fires once per page view; no-op if blocked/missing */
  const sent = new Set();
  function track(name) {
    if (sent.has(name)) return;
    sent.add(name);
    try {
      if (window.goatcounter && window.goatcounter.count) {
        window.goatcounter.count({ path: name, title: name, event: true });
      }
    } catch (e) { /* analytics must never break the page */ }
  }

  if (reduceMotion.matches) { loop.removeAttribute('autoplay'); loop.pause(); }

  // Pause the loop while it's off-screen
  new IntersectionObserver(([entry]) => {
    if (wrap.classList.contains('is-full') || reduceMotion.matches) return;
    if (entry.isIntersecting) loop.play().catch(() => {});
    else loop.pause();
  }, { threshold: 0.25 }).observe(wrap);

  /* Full video element — created lazily, buffered in the background */
  let full = null;
  function getFull() {
    if (full) return full;
    full = document.createElement('video');
    full.className = 'hero-video-full';
    full.src = FULL_SRC;
    full.preload = 'auto';
    full.playsInline = true;
    full.setAttribute('playsinline', '');
    full.setAttribute('poster', loop.getAttribute('poster'));
    full.setAttribute('aria-label', 'Conon Labs intro video (with sound)');
    wrap.insertBefore(full, wrap.querySelector('.hero-video-controls'));

    full.addEventListener('playing', () => {
      wrap.classList.remove('is-loading');
      track('video-play-started');
    });
    full.addEventListener('waiting', () => wrap.classList.add('is-loading'));
    full.addEventListener('timeupdate', () => {
      if (!full.duration) return;
      const pct = full.currentTime / full.duration;
      if (pct >= 0.25) track('video-progress-25');
      if (pct >= 0.5)  track('video-progress-50');
      if (pct >= 0.75) track('video-progress-75');
    });
    full.addEventListener('ended', () => {
      track('video-completed');
      if (document.fullscreenElement && document.exitFullscreen) document.exitFullscreen();
      backToLoop();
    });
    return full;
  }

  const canWarm = !conn.saveData && !/(^|-)2g$/.test(conn.effectiveType || '');
  function warmUp() { if (canWarm) getFull(); }
  const idle = window.requestIdleCallback || (cb => setTimeout(cb, 2500));
  const warmWhenReady = () => idle(warmUp);
  if (document.readyState === 'complete') warmWhenReady();
  else window.addEventListener('load', warmWhenReady, { once: true });

  function playFull() {
    const v = getFull();
    wrap.classList.add('is-full', 'is-loading');
    loop.pause();
    v.currentTime = 0;
    v.muted = false;
    v.controls = true;
    v.play().catch(() => wrap.classList.remove('is-loading'));
    return v;
  }

  function backToLoop() {
    wrap.classList.remove('is-full', 'is-loading');
    if (full) { full.pause(); full.controls = false; }
    if (!reduceMotion.matches) loop.play().catch(() => {});
  }

  function enterFullscreen(v) {
    if (v.requestFullscreen) {
      v.requestFullscreen()
        .then(() => {
          // Android: use the whole landscape screen for the 16:9 video
          if (screen.orientation && screen.orientation.lock) screen.orientation.lock('landscape').catch(() => {});
        })
        .catch(() => {});
    } else if (v.webkitEnterFullscreen) {
      v.webkitEnterFullscreen(); // iPhone Safari: native player, needs metadata loaded
    }
  }

  const soundBtn = document.getElementById('hvSound');
  const fullBtn  = document.getElementById('hvFull');
  [soundBtn, fullBtn].forEach(btn => {
    ['pointerenter', 'touchstart'].forEach(evt =>
      btn.addEventListener(evt, () => { if (!conn.saveData) getFull(); }, { passive: true, once: true }));
  });

  soundBtn.addEventListener('click', () => {
    track('video-sound-click');
    playFull();
  });
  fullBtn.addEventListener('click', () => {
    track('video-fullscreen-click');
    const v = playFull();
    // Standard API works straight from the click; iPhone's webkitEnterFullscreen
    // throws until the source has metadata, so only that path waits.
    if (v.requestFullscreen || v.readyState >= 1) enterFullscreen(v);
    else v.addEventListener('loadedmetadata', () => enterFullscreen(v), { once: true });
  });

  // Fullscreen entered via the native controls
  document.addEventListener('fullscreenchange', () => {
    if (document.fullscreenElement && document.fullscreenElement === full) track('video-fullscreen-native');
  });
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
// Sections grow as their markdown/images load, so a one-off scroll position goes
// stale. Keep re-aligning to the target until the layout settles or the user scrolls.
let pendingTarget = null;
let settleTimer   = null;

const targetTop = el => el.offsetTop - (el.id === 'hero' ? 0 : NAV_H - 4);

function armSettleTimer() {
  clearTimeout(settleTimer);
  settleTimer = setTimeout(() => { pendingTarget = null; }, 2500);
}

function scrollToTarget(el) {
  pendingTarget = el;
  armSettleTimer();
  window.scrollTo({ top: targetTop(el), behavior: 'smooth' });
}

new ResizeObserver(() => {
  if (!pendingTarget) return;
  window.scrollTo({ top: targetTop(pendingTarget), behavior: 'instant' });
  armSettleTimer();
}).observe(document.body);

['wheel', 'touchstart', 'keydown', 'mousedown'].forEach(evt =>
  window.addEventListener(evt, () => { pendingTarget = null; }, { passive: true })
);

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    scrollToTarget(target);
  });
});

// Arriving via /#section (e.g. from another page)
if (location.hash.length > 1) {
  const hashTarget = document.getElementById(decodeURIComponent(location.hash.slice(1)));
  if (hashTarget) {
    pendingTarget = hashTarget;
    armSettleTimer();
    window.scrollTo({ top: targetTop(hashTarget), behavior: 'instant' });
  }
}