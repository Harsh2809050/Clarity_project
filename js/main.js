/* ==========================================
   THE INSIGHT HOUR — Main JavaScript
   ========================================== */

/* ---------- DARK MODE ---------- */
const html           = document.documentElement;
const darkModeToggle = document.getElementById('darkModeToggle');

function applyTheme(theme) {
  html.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  if (darkModeToggle) darkModeToggle.innerHTML = theme === 'dark' ? iconSun() : iconMoon();
}

function iconSun() {
  return `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
}

function iconMoon() {
  return `<svg viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
}

// Initialise from storage
const saved = localStorage.getItem('theme') || 'light';
applyTheme(saved);

darkModeToggle?.addEventListener('click', () => {
  applyTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
});

/* ---------- NAVBAR SCROLL STATE ---------- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar?.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

/* ---------- MOBILE NAV TOGGLE ---------- */
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle?.addEventListener('click', () => {
  const open = navLinks?.classList.toggle('open');
  navToggle.classList.toggle('active', open);
  navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
});

// Close on link click
navLinks?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle?.classList.remove('active');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

// Close on outside click
document.addEventListener('click', e => {
  if (!navbar?.contains(e.target)) {
    navLinks?.classList.remove('open');
    navToggle?.classList.remove('active');
  }
});

/* ---------- ACTIVE NAV LINK ---------- */
const currentFile = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  const href = a.getAttribute('href');
  const isHome = (currentFile === '' || currentFile === 'index.html') && href === 'index.html';
  if (href === currentFile || isHome) a.classList.add('active');
});

/* ---------- BACK TO TOP ---------- */
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  backToTop?.classList.toggle('visible', window.scrollY > 450);
}, { passive: true });

backToTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ---------- INTERSECTION OBSERVER (FADE IN) ---------- */
const observerOptions = {
  threshold: 0.10,
  rootMargin: '0px 0px -40px 0px',
};

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

function observeFadeEls(root = document) {
  root.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));
}
observeFadeEls();

/* ---------- FOOTER SUBSCRIBE FORM (UX only — wire up to service) ---------- */
const footerForm = document.getElementById('footerSubscribeForm');
footerForm?.addEventListener('submit', e => {
  e.preventDefault();
  const input = footerForm.querySelector('input[type="email"]');
  if (input && input.value) {
    input.value = '';
    input.placeholder = 'You\'re on the list! ✓';
    setTimeout(() => { input.placeholder = 'Your email'; }, 3000);
  }
});

/* ==========================================
   NEWSLETTER DATA — loaded on pages that need it
   ========================================== */
async function fetchNewsletters() {
  // Resolve data path relative to root, handling any subdirectory serving
  const base = document.querySelector('meta[name="base-path"]')?.content || '';
  const res  = await fetch(`${base}data/newsletters.json`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

/* --- Home page: latest 3 issues --- */
async function initHomePage() {
  const grid = document.getElementById('latestNewsletters');
  if (!grid) return;

  try {
    const newsletters = await fetchNewsletters();
    const latest = newsletters.slice(0, 3);
    grid.innerHTML = latest.map((n, i) => cardHTML(n, i)).join('');
    observeFadeEls(grid);
  } catch (err) {
    grid.innerHTML = '<p style="color:var(--text-muted);text-align:center;padding:24px 0">Could not load latest issues.</p>';
  }
}

/* --- Archive page: all issues + search + filter --- */
async function initArchivePage() {
  const grid      = document.getElementById('archiveGrid');
  const noResults = document.getElementById('noResults');
  const searchEl  = document.getElementById('searchInput');
  const chips     = document.querySelectorAll('.filter-chip');
  const countEl   = document.getElementById('resultsCount');

  if (!grid) return;

  let allData     = [];
  let activeFilter = 'all';

  function render(data) {
    if (data.length === 0) {
      grid.innerHTML = '';
      noResults?.classList.add('visible');
      if (countEl) countEl.textContent = '0 issues found';
    } else {
      noResults?.classList.remove('visible');
      grid.innerHTML = data.map((n, i) => cardHTML(n, i)).join('');
      if (countEl) countEl.textContent = `${data.length} issue${data.length !== 1 ? 's' : ''}`;
      // Instantly visible in archive (no scroll delay)
      grid.querySelectorAll('.fade-in').forEach(el => {
        requestAnimationFrame(() => el.classList.add('visible'));
      });
    }
  }

  function applyFilters() {
    const q = searchEl?.value.trim().toLowerCase() || '';
    let result = allData;

    if (activeFilter !== 'all') {
      result = result.filter(n => n.topic.toLowerCase() === activeFilter);
    }
    if (q) {
      result = result.filter(n =>
        n.guest.toLowerCase().includes(q)       ||
        n.title.toLowerCase().includes(q)       ||
        n.topic.toLowerCase().includes(q)       ||
        n.description.toLowerCase().includes(q)
      );
    }
    render(result);
  }

  // Search input
  searchEl?.addEventListener('input', applyFilters);

  // Filter chips
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeFilter = chip.dataset.filter;
      applyFilters();
    });
  });

  try {
    allData = await fetchNewsletters();
    render(allData);
  } catch (err) {
    grid.innerHTML = '<p style="color:var(--text-muted);text-align:center;padding:40px 0;grid-column:1/-1">Could not load newsletters.</p>';
  }
}

/* --- Newsletter card HTML --- */
function cardHTML(n, index) {
  const initials = n.guest.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  return `
    <a href="${escapeAttr(n.url)}" target="_blank" rel="noopener noreferrer"
       class="newsletter-card fade-in fade-in-delay-${Math.min(index % 4 + 1, 4)}"
       aria-label="Read: ${escapeAttr(n.title)}">
      <div class="card-meta">
        <span class="card-topic">${escape(n.topic)}</span>
        <span class="card-date">${escape(n.date)}</span>
      </div>
      <div class="card-guest">Guest: ${escape(n.guest)}</div>
      <h3 class="card-title">${escape(n.title)}</h3>
      <p class="card-description">${escape(n.description)}</p>
      <span class="card-link" aria-hidden="true">
        Read Issue
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
        </svg>
      </span>
    </a>`;
}

function escape(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
function escapeAttr(str) {
  return String(str).replace(/"/g, '&quot;');
}

/* ---------- PAGE INIT ---------- */
document.addEventListener('DOMContentLoaded', () => {
  initHomePage();
  initArchivePage();
});
