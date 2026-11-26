import { SITE_DATA } from './data/content.js';

/* ==========================================================================
   App State
   ========================================================================== */
const state = {
  posts: [],
  lifePosts: [],
  researchFilter: 'All',
  notesFilter: 'All',
  currentView: 'home', // 'home' | 'article' | 'life-index' | 'life-article' | 'preview'
  currentSlug: null,
  localDraft: null,
  tocObserver: null,
  scrollSpyHandler: null,
  spotlightSelectedIdx: 0,
  spotlightItems: [],
  toastTimer: null,
  visitStats: null
};

const appEl = document.getElementById('app');
const readingProgressEl = document.getElementById('reading-progress');
const readingProgressFillEl = document.getElementById('reading-progress-fill');
const toastEl = document.getElementById('toast');

/* ==========================================================================
   Icons (Crisp Apple SF-Symbol Inspired Inline SVGs)
   ========================================================================== */
const ICONS = {
  scholar: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>`,
  github: `<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.58 2 12.23c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.49 0-.24-.01-.88-.01-1.72-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.05 1.53 1.05.9 1.57 2.35 1.12 2.92.86.09-.67.35-1.12.64-1.38-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05A9.38 9.38 0 0 1 12 6.84c.85 0 1.71.12 2.51.35 1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.05.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.82 0 .27.18.59.69.49A10.22 10.22 0 0 0 22 12.23C22 6.58 17.52 2 12 2Z"/></svg>`,
  hf: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 3 7v10l9 5 9-5V7l-9-5Z"/><path d="M12 22V12M21 7l-9 5-9-5"/></svg>`,
  mail: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m4 7 8 6 8-6"/></svg>`,
  arrowRight: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`,
  arrowLeft: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M11 18l-6-6 6-6"/></svg>`,
  expand: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>`,
  copy: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`,
  star: `<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="m12 2.5 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.3l-5.8 3.1 1.1-6.5-4.7-4.6 6.5-.9L12 2.5Z"/></svg>`,
  upload: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>`,
  users: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  eye: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M2.06 12.35a1 1 0 0 1 0-.7C3.42 7.55 7.36 4.5 12 4.5s8.58 3.05 9.94 7.15a1 1 0 0 1 0 .7C20.58 16.45 16.64 19.5 12 19.5s-8.58-3.05-9.94-7.15Z"/><circle cx="12" cy="12" r="3"/></svg>`
};

/* ==========================================================================
   Utilities
   ========================================================================== */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function showToast(message) {
  toastEl.textContent = message;
  toastEl.classList.add('is-visible');
  clearTimeout(state.toastTimer);
  state.toastTimer = setTimeout(() => {
    toastEl.classList.remove('is-visible');
  }, 2400);
}

async function copyText(text, successMsg = 'Copied to clipboard') {
  try {
    await navigator.clipboard.writeText(text);
    showToast(successMsg);
  } catch {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showToast(successMsg);
  }
}

function slugifyHeading(text, index) {
  const clean = text
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fa5\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
  return clean ? `sec-${clean}-${index}` : `sec-${index}`;
}

function estimateReadingTime(md) {
  const cnChars = (md.match(/[\u4e00-\u9fa5]/g) || []).length;
  const enWords = md
    .replace(/[\u4e00-\u9fa5]/g, ' ')
    .replace(/```[\s\S]*?```/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  const mins = Math.max(1, Math.round(cnChars / 320 + enWords / 200));
  return `${mins} min read`;
}

/* ==========================================================================
   Data Initialization
   ========================================================================== */
async function loadPostsManifest() {
  try {
    const res = await fetch('data/posts.json');
    if (!res.ok) throw new Error('Failed to fetch posts manifest');
    state.posts = await res.json();
  } catch (err) {
    console.warn('Could not load posts.json:', err);
    state.posts = [];
  }
  try {
    const lifeRes = await fetch('data/life.json');
    if (!lifeRes.ok) throw new Error('Failed to fetch life manifest');
    state.lifePosts = await lifeRes.json();
  } catch (err) {
    console.warn('Could not load life.json:', err);
    state.lifePosts = [];
  }
}

async function hydrateGitHubStars() {
  const badges = document.querySelectorAll('[data-gh-repo]');
  const CACHE_MS = 6 * 60 * 60 * 1000;
  for (const el of badges) {
    const repo = el.dataset.ghRepo;
    const cacheKey = `gh-stars:${repo}`;
    try {
      const cached = JSON.parse(localStorage.getItem(cacheKey) || 'null');
      if (cached && Date.now() - cached.ts < CACHE_MS) {
        el.textContent = cached.count;
        continue;
      }
      const res = await fetch(`https://api.github.com/repos/${repo}`, {
        headers: { Accept: 'application/vnd.github+json' }
      });
      if (!res.ok) continue;
      const data = await res.json();
      if (typeof data.stargazers_count === 'number') {
        el.textContent = data.stargazers_count;
        localStorage.setItem(cacheKey, JSON.stringify({ count: data.stargazers_count, ts: Date.now() }));
      }
    } catch {
      // Keep snapshot value gracefully
    }
  }
}

/* ==========================================================================
   Visitor & Pageview Counter (Vercount API — Zero-Backend UV / PV Tracking)
   ========================================================================== */
const CANONICAL_SITE_BASE = 'https://neuqrui.github.io/personal-page/';
const VERCOUNT_ENDPOINT = 'https://events.vercount.one/api/v2/log';
const UV_STORAGE_KEY = 'qirui-personal-page-uv-v1';
const VISIT_CACHE_KEY = 'qirui-personal-page-visit-cache-v1';

function formatCount(num) {
  const n = Number(num);
  if (!Number.isFinite(n) || n < 0) return '—';
  return new Intl.NumberFormat('en-US').format(n);
}

function renderFooterCounterHtml() {
  const stats = state.visitStats;
  const hiddenAttr = stats ? '' : ' hidden';
  const uv = stats ? formatCount(Math.max(1, stats.site_uv)) : '—';
  const pv = stats ? formatCount(Math.max(1, stats.site_pv)) : '—';
  return `
    <div class="visit-counter" data-visit-counter${hiddenAttr} title="Total unique visitors and page views">
      <span class="visit-metric">${ICONS.users}<span data-visit-uv>${uv}</span> <span class="visit-label">Visitors</span></span>
      <span class="visit-sep" aria-hidden="true">·</span>
      <span class="visit-metric">${ICONS.eye}<span data-visit-pv>${pv}</span> <span class="visit-label">Views</span></span>
    </div>
  `;
}

function paintVisitStats(stats, updateArticleViews = false) {
  if (!stats) return;
  const uv = formatCount(Math.max(1, Number(stats.site_uv || 0)));
  const pv = formatCount(Math.max(1, Number(stats.site_pv || 0)));

  document.querySelectorAll('[data-visit-counter]').forEach((wrap) => {
    wrap.hidden = false;
    const uvEl = wrap.querySelector('[data-visit-uv]');
    const pvEl = wrap.querySelector('[data-visit-pv]');
    if (uvEl) uvEl.textContent = uv;
    if (pvEl) pvEl.textContent = pv;
  });

  if (updateArticleViews && Number(stats.page_pv) > 0) {
    const pageEl = document.querySelector('[data-article-views]');
    if (pageEl) {
      const views = Number(stats.page_pv);
      pageEl.textContent = ` · ${formatCount(views)} ${views === 1 ? 'view' : 'views'}`;
      pageEl.hidden = false;
    }
  }
}

async function trackVisit(pageSubpath = '', { isArticle = false } = {}) {
  // Show cached site stats immediately to avoid layout shift
  if (!state.visitStats) {
    try {
      const cached = JSON.parse(localStorage.getItem(VISIT_CACHE_KEY) || 'null');
      if (cached && typeof cached.site_pv === 'number') {
        state.visitStats = cached;
      }
    } catch {}
  }
  if (state.visitStats) {
    paintVisitStats(state.visitStats, false);
  }

  const cleanSubpath = pageSubpath.replace(/^\/+/, '');
  const canonicalUrl = `${CANONICAL_SITE_BASE}${cleanSubpath}`;
  const isLocalHost =
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1' ||
    window.location.protocol === 'file:';

  // Avoid double-counting the same page on rapid SPA re-renders within the same tab session
  const sessionKey = `qirui-counted:${canonicalUrl}`;
  try {
    const prevPageData = JSON.parse(sessionStorage.getItem(sessionKey) || 'null');
    if (prevPageData) {
      state.visitStats = {
        site_uv: Math.max(state.visitStats?.site_uv || 0, prevPageData.site_uv || 0),
        site_pv: Math.max(state.visitStats?.site_pv || 0, prevPageData.site_pv || 0),
        page_pv: prevPageData.page_pv || 0
      };
      paintVisitStats(state.visitStats, isArticle);
      return;
    }
  } catch {}

  let isNewUv = false;
  if (!isLocalHost) {
    try {
      if (localStorage.getItem(UV_STORAGE_KEY) !== '1') {
        isNewUv = true;
      }
    } catch {}
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 5000);
  try {
    const res = await fetch(VERCOUNT_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: canonicalUrl, isNewUv }),
      signal: controller.signal
    });
    clearTimeout(timer);
    if (!res.ok) return;
    const json = await res.json();
    const d = json && json.data ? json.data : json;
    if (!d || (typeof d.site_pv !== 'number' && typeof d.site_uv !== 'number')) return;

    if (isNewUv) {
      try {
        localStorage.setItem(UV_STORAGE_KEY, '1');
      } catch {}
    }

    const stats = {
      site_uv: Number(d.site_uv || 0),
      site_pv: Number(d.site_pv || 0),
      page_pv: Number(d.page_pv || 0)
    };
    state.visitStats = stats;

    try {
      localStorage.setItem(VISIT_CACHE_KEY, JSON.stringify({ site_uv: stats.site_uv, site_pv: stats.site_pv }));
      sessionStorage.setItem(sessionKey, JSON.stringify(stats));
    } catch {}

    paintVisitStats(stats, isArticle);
  } catch {
    clearTimeout(timer);
    // Keep cached value or remain quietly hidden if offline
  }
}

/* ==========================================================================
   Home View Rendering
   ========================================================================== */
function getResearchFilters() {
  return ['All', 'Published', 'Preprints', 'Safety Alignment', 'Self-Distillation', 'Agentic RL', 'Omnimodal'];
}

function getFilteredPapers() {
  const f = state.researchFilter;
  if (f === 'All') return SITE_DATA.papers;
  if (f === 'Published') return SITE_DATA.papers.filter((p) => p.type === 'publication');
  if (f === 'Preprints') return SITE_DATA.papers.filter((p) => p.type === 'preprint');
  return SITE_DATA.papers.filter((p) => p.topics.includes(f));
}

function getNotesFilters() {
  const cats = Array.from(new Set(state.posts.map((p) => p.category)));
  return ['All', ...cats];
}

function getFilteredNotes() {
  if (state.notesFilter === 'All') return state.posts;
  return state.posts.filter((p) => p.category === state.notesFilter);
}

function renderPaperCard(paper) {
  const authorsHtml = paper.authors
    .map((a) => (a.me ? `<span class="author-me">${escapeHtml(a.name)}</span>` : escapeHtml(a.name)))
    .join(', ');

  const linksHtml = paper.links
    .map((l) => {
      const primaryClass = l.primary ? ' paper-link--primary' : '';
      const starHtml = l.repo
        ? `<span class="star-count">${ICONS.star}<span data-gh-repo="${escapeHtml(l.repo)}">${l.stars}</span></span>`
        : '';
      const ghIcon = l.repo ? ICONS.github : '';
      return `<a class="paper-link${primaryClass}" href="${escapeHtml(l.href)}" target="_blank" rel="noopener noreferrer">${ghIcon}<span>${escapeHtml(l.label)}</span>${starHtml}</a>`;
    })
    .join('');

  const venueBadgeClass = paper.type === 'publication' ? 'badge badge--green' : 'badge badge--neutral';

  return `
    <article class="paper-card${paper.featured ? ' paper-card--featured' : ''}" id="paper-${escapeHtml(paper.id)}">
      <button type="button" class="paper-figure-btn" data-lightbox-img="${escapeHtml(paper.image)}" data-lightbox-title="${escapeHtml(paper.shortTitle)}" data-lightbox-caption="${escapeHtml(paper.imageAlt)}" aria-label="Inspect ${escapeHtml(paper.shortTitle)} figure">
        <img src="${escapeHtml(paper.image)}" alt="${escapeHtml(paper.imageAlt)}" loading="lazy">
        <span class="figure-zoom-hint">${ICONS.expand} Quick Look</span>
      </button>

      <div class="paper-content">
        <div class="paper-meta-row">
          <span class="${venueBadgeClass}">${escapeHtml(paper.venue)}</span>
          <span class="paper-highlight-pill">${escapeHtml(paper.metricHighlight)}</span>
        </div>
        <h3 class="paper-title">
          <a href="${escapeHtml(paper.links[0].href)}" target="_blank" rel="noopener noreferrer">${escapeHtml(paper.title)}</a>
        </h3>
        <p class="paper-authors">${authorsHtml}</p>
        <p class="paper-summary">${escapeHtml(paper.summary)}</p>
        <div class="paper-links">
          ${linksHtml}
          <button type="button" class="paper-link" data-copy-bibtex="${escapeHtml(paper.id)}">${ICONS.copy}<span>BibTeX</span></button>
        </div>
      </div>
    </article>
  `;
}

function renderNoteCard(post, basePath = '#/notes') {
  const tagsHtml = (post.tags || [])
    .slice(0, 4)
    .map((t) => `<span class="tag-chip">${escapeHtml(t)}</span>`)
    .join('');

  const highlightsHtml = (post.highlights || [])
    .map((h) => `<li>${escapeHtml(h)}</li>`)
    .join('');

  const ctaLabel = basePath === '#/life' ? 'Read Entry' : 'Read Note';

  return `
    <a class="note-card" href="${basePath}/${encodeURIComponent(post.slug)}" data-accent="${escapeHtml(post.accent || 'blue')}">
      <div>
        <div class="note-card-meta">
          <span class="badge ${post.accent === 'indigo' ? 'badge--indigo' : post.accent === 'teal' ? 'badge--teal' : ''}">${escapeHtml(post.category || 'Journal')}</span>
          <span class="note-date-read">${escapeHtml(post.date || '')}${post.readingTime ? ` · ${escapeHtml(post.readingTime)}` : ''}</span>
        </div>
        <h3 class="note-card-title">${escapeHtml(post.title)}</h3>
        ${post.subtitle ? `<p class="note-card-subtitle">${escapeHtml(post.subtitle)}</p>` : ''}
        ${highlightsHtml ? `<ul class="note-highlights">${highlightsHtml}</ul>` : ''}
      </div>

      <div class="note-card-footer">
        <div class="note-tags">${tagsHtml}</div>
        <span class="note-read-cta">${ctaLabel} ${ICONS.arrowRight}</span>
      </div>
    </a>
  `;
}

function renderHomeView(scrollToId = null) {
  cleanupArticleListeners();
  state.currentView = 'home';
  state.currentSlug = null;
  document.title = 'Qirui Liu (刘骐瑞) — Research & Notes';
  readingProgressEl.classList.remove('is-visible');

  const { profile, news, education, internships } = SITE_DATA;
  const filteredPapers = getFilteredPapers();
  const filteredNotes = getFilteredNotes();

  appEl.innerHTML = `
    <!-- Hero Showcase & About Me -->
    <section class="hero" id="overview">
      <div class="hero-grid">
        <div class="hero-copy">
          <h1 class="hero-title">
            ${escapeHtml(profile.nameEn)}<span class="hero-title-zh">${escapeHtml(profile.nameZh)}</span>
          </h1>

          <div class="about-me-block">
            <h2 class="about-me-label">About Me</h2>
            <p>
              I am <strong>Qirui Liu (刘骐瑞)</strong>, a master’s student at the
              <a href="${escapeHtml(profile.departmentUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(profile.department)}</a>,
              <a href="${escapeHtml(profile.institutionUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(profile.institution)}</a>
              (2026–Present), fortunate to be advised by
              <a href="${escapeHtml(profile.advisor.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(profile.advisor.name)}</a>.
              Previously, I studied Computer Science and Technology at
              <a href="https://www.neuq.edu.cn/" target="_blank" rel="noopener noreferrer">Northeastern University</a>
              (2022–2026), advised by
              <a href="${escapeHtml(profile.prevAdvisor.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(profile.prevAdvisor.name)}</a>.
            </p>
            <p>
              My research focuses on <strong>safety alignment of large reasoning models</strong>,
              <strong>efficient on-policy self-distillation</strong>, and
              <strong>reinforcement learning for language agents</strong>.
              I am interested in how models can learn from their own experience to reason, interact, and align more effectively.
            </p>
            <p>
              I was a <strong>Research Intern at TruthLab</strong> (2025–2026), working on reasoning-model safety alignment,
              and previously a <strong>Research Intern at Wukong Lab</strong>, Northeastern University (2023–2025),
              working on deep reinforcement learning and computer games.
            </p>
            <p class="about-me-connect">
              Find my work on
              <a href="https://scholar.google.com/citations?user=St1xlXQAAAAJ&hl=zh-CN" target="_blank" rel="noopener noreferrer">Google Scholar</a>
              and
              <a href="https://github.com/neuqrui" target="_blank" rel="noopener noreferrer">GitHub</a>.
            </p>
          </div>

          <div class="hero-actions">
            <a href="#research" class="pill-btn pill-btn--primary">Explore Research ${ICONS.arrowRight}</a>
            <a href="#notes" class="pill-btn pill-btn--secondary">Technical Notes</a>
            ${profile.socials
              .map(
                (s) =>
                  `<a href="${escapeHtml(s.href)}" class="pill-btn pill-btn--secondary" ${s.href.startsWith('http') ? 'target="_blank" rel="noopener noreferrer"' : ''} aria-label="${escapeHtml(s.label)}">${ICONS[s.icon]}<span>${escapeHtml(s.label)}</span></a>`
              )
              .join('')}
          </div>
        </div>

        <aside class="hero-portrait-card" aria-label="Portrait and affiliation">
          <div class="hero-portrait-wrap">
            <img src="${escapeHtml(profile.portrait)}" alt="${escapeHtml(profile.nameEn)} (${escapeHtml(profile.nameZh)})" width="520" height="520">
          </div>
          <div class="portrait-role">
            <span class="status-dot" aria-hidden="true"></span>
            <span>Master’s Student @ ZJU</span>
          </div>
          <div class="hero-affiliation-bar">
            <a href="${escapeHtml(profile.institutionUrl)}" target="_blank" rel="noopener noreferrer" class="affiliation-chip">
              <img src="assets/zju-emblem.svg" alt="Zhejiang University emblem" width="20" height="20">
              <span>Zhejiang University</span>
            </a>
            <button type="button" class="pill-btn pill-btn--subtle" data-copy-email="${escapeHtml(profile.email)}">Copy Email</button>
          </div>
        </aside>
      </div>

      <!-- Recent Highlights / News -->
      <div class="news-block" aria-label="Latest News">
        <div class="news-panel">
          <div class="news-panel-header">
            <h2 class="news-panel-title"><span aria-hidden="true">🔥</span> News</h2>
          </div>
          <ul class="news-list">
            ${news
              .map(
                (n) => `
              <li class="news-list-item">
                <span class="news-list-dot" aria-hidden="true"></span>
                <span class="news-list-date">${escapeHtml(n.date)}:</span>
                <span class="news-list-body"><span class="news-list-emoji" aria-hidden="true">${n.emoji}</span> ${n.html}</span>
              </li>
            `
              )
              .join('')}
          </ul>
        </div>
      </div>
    </section>

    <!-- Publications & Preprints Showcase -->
    <section class="band band--alt" id="research">
      <div class="container">
        <div class="section-header">
          <div>
            <h2 class="section-title">Publications &amp; Preprints</h2>
          </div>
          <div class="segmented-bar" role="tablist" aria-label="Filter research papers">
            ${getResearchFilters()
              .map(
                (f) =>
                  `<button type="button" role="tab" aria-selected="${state.researchFilter === f}" class="seg-btn${state.researchFilter === f ? ' is-active' : ''}" data-research-filter="${escapeHtml(f)}">${escapeHtml(f)}</button>`
              )
              .join('')}
          </div>
        </div>

        <div class="papers-stack" id="papers-stack">
          ${filteredPapers.map(renderPaperCard).join('')}
        </div>
      </div>
    </section>

    <!-- Technical Blog & Research Notes -->
    <section class="band" id="notes">
      <div class="container">
        <div class="section-header">
          <div>
            <h2 class="section-title">Technical Notes</h2>
            <p class="section-subtitle">Deep-dive architecture walkthroughs, reproducible recipes, and quick references on Agentic RL, environment synthesis, and LLM alignment.</p>
          </div>
          <div class="segmented-bar" role="tablist" aria-label="Filter notes by category">
            ${getNotesFilters()
              .map(
                (f) =>
                  `<button type="button" role="tab" aria-selected="${state.notesFilter === f}" class="seg-btn${state.notesFilter === f ? ' is-active' : ''}" data-notes-filter="${escapeHtml(f)}">${escapeHtml(f)}</button>`
              )
              .join('')}
          </div>
        </div>

        <div class="notes-grid" id="notes-grid">
          ${filteredNotes.map((p) => renderNoteCard(p, '#/notes')).join('')}
        </div>
      </div>
    </section>

    <!-- Background: Education & Internships -->
    <section class="band band--alt" id="background">
      <div class="container">
        <div class="section-header">
          <div>
            <h2 class="section-title">Education &amp; Experience</h2>
          </div>
        </div>

        <div class="background-grid">
          <div>
            <h3 class="bg-column-title">Education</h3>
            <div class="timeline-list">
              ${education
                .map(
                  (ed) => `
                <div class="org-card">
                  <div class="org-logos">
                    ${ed.logos.map((src) => `<img src="${escapeHtml(src)}" alt="" width="36" height="36" loading="lazy">`).join('')}
                  </div>
                  <div class="org-body">
                    <div class="org-top">
                      <h4 class="org-name"><a href="${escapeHtml(ed.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(ed.institution)}</a></h4>
                      <span class="org-period">${escapeHtml(ed.period)}</span>
                    </div>
                    <p class="org-role">${escapeHtml(ed.degree)}</p>
                    <p class="org-detail">${escapeHtml(ed.detail)}</p>
                  </div>
                </div>
              `
                )
                .join('')}
            </div>
          </div>

          <div>
            <h3 class="bg-column-title">Research Internships</h3>
            <div class="timeline-list">
              ${internships
                .map(
                  (it) => `
                <div class="org-card">
                  <div class="org-logos">
                    ${it.logos.map((src) => `<img src="${escapeHtml(src)}" alt="" width="36" height="36" loading="lazy">`).join('')}
                  </div>
                  <div class="org-body">
                    <div class="org-top">
                      <h4 class="org-name">${escapeHtml(it.organization)}</h4>
                      <span class="org-period">${escapeHtml(it.period)}</span>
                    </div>
                    <p class="org-role">${escapeHtml(it.role)} · ${escapeHtml(it.affiliation)}</p>
                    <p class="org-detail">${escapeHtml(it.topic)}</p>
                  </div>
                </div>
              `
                )
                .join('')}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Life & Moments (Jumpable Journal Section) -->
    <section class="band" id="life">
      <div class="container">
        <div class="section-header">
          <div>
            <h2 class="section-title">Life &amp; Journal</h2>
            <p class="section-subtitle">Personal reflections, travel snapshots, reading notes, and everyday moments.</p>
          </div>
          <a href="#/life" class="pill-btn pill-btn--secondary pill-btn--sm">Open Journal ${ICONS.arrowRight}</a>
        </div>

        ${
          state.lifePosts.length
            ? `<div class="notes-grid">${state.lifePosts.map((p) => renderNoteCard(p, '#/life')).join('')}</div>`
            : `
          <a href="#/life" class="life-entry-card">
            <div class="life-entry-content">
              <span class="badge badge--teal">Life Log</span>
              <h3 class="life-entry-title">Stories, travels &amp; everyday thoughts</h3>
              <p class="life-entry-desc">A quiet corner reserved for non-academic writing and life records. Entries coming soon.</p>
            </div>
            <span class="note-read-cta">Enter Space ${ICONS.arrowRight}</span>
          </a>
        `
        }
      </div>
    </section>

    <!-- Contact Band -->
    <section class="band band--alt band--tight" id="contact">
      <div class="container">
        <div class="contact-card">
          <div>
            <h2>Contact</h2>
            <p>Always happy to chat about large reasoning model safety, on-policy self-distillation, and agentic RL systems.</p>
          </div>
          <div class="contact-actions">
            <a href="mailto:${escapeHtml(profile.email)}" class="pill-btn pill-btn--primary">${ICONS.mail}<span>${escapeHtml(profile.email)}</span></a>
            <button type="button" class="pill-btn pill-btn--secondary" data-copy-email="${escapeHtml(profile.email)}">${ICONS.copy}<span>Copy Address</span></button>
          </div>
        </div>
      </div>
    </section>

    <footer class="site-footer">
      <div class="footer-inner">
        <div class="footer-left">
          <span>© 2026 Qirui Liu (刘骐瑞)</span>
          ${renderFooterCounterHtml()}
        </div>
        <div class="footer-links">
          <a href="https://neuqrui.github.io" target="_blank" rel="noopener noreferrer">neuqrui.github.io</a>
          <a href="https://github.com/neuqrui" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://scholar.google.com/citations?user=St1xlXQAAAAJ&hl=zh-CN" target="_blank" rel="noopener noreferrer">Google Scholar</a>
          <a href="https://huggingface.co/neuqrui" target="_blank" rel="noopener noreferrer">Hugging Face</a>
          <a href="#overview">Back to top ↑</a>
        </div>
      </div>
    </footer>
  `;

  bindHomeInteractions();
  hydrateGitHubStars();
  setupHomeScrollSpy();
  trackVisit('');

  if (scrollToId) {
    requestAnimationFrame(() => {
      const target = document.getElementById(scrollToId);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  } else {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
}

function bindHomeInteractions() {
  // Research filter buttons
  document.querySelectorAll('[data-research-filter]').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.researchFilter = btn.dataset.researchFilter;
      document.querySelectorAll('[data-research-filter]').forEach((b) => {
        const active = b.dataset.researchFilter === state.researchFilter;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-selected', String(active));
      });
      const stack = document.getElementById('papers-stack');
      if (stack) {
        stack.innerHTML = getFilteredPapers().map(renderPaperCard).join('');
        bindPaperActions();
        hydrateGitHubStars();
      }
    });
  });

  // Notes filter buttons
  document.querySelectorAll('[data-notes-filter]').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.notesFilter = btn.dataset.notesFilter;
      document.querySelectorAll('[data-notes-filter]').forEach((b) => {
        const active = b.dataset.notesFilter === state.notesFilter;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-selected', String(active));
      });
      const grid = document.getElementById('notes-grid');
      if (grid) {
        grid.innerHTML = getFilteredNotes().map((p) => renderNoteCard(p, '#/notes')).join('');
      }
    });
  });

  // Copy email buttons
  document.querySelectorAll('[data-copy-email]').forEach((btn) => {
    btn.addEventListener('click', () => {
      copyText(btn.dataset.copyEmail, `Copied ${btn.dataset.copyEmail}`);
    });
  });

  // Local Markdown preview trigger
  const localBtn = document.getElementById('open-local-md');
  if (localBtn) {
    localBtn.addEventListener('click', () => {
      document.getElementById('local-md-input').click();
    });
  }

  bindPaperActions();
}

function bindPaperActions() {
  // Quick Look image lightbox
  document.querySelectorAll('[data-lightbox-img]').forEach((btn) => {
    btn.addEventListener('click', () => {
      openImageLightbox({
        src: btn.dataset.lightboxImg,
        title: btn.dataset.lightboxTitle,
        caption: btn.dataset.lightboxCaption
      });
    });
  });

  // BibTeX copy
  document.querySelectorAll('[data-copy-bibtex]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const paper = SITE_DATA.papers.find((p) => p.id === btn.dataset.copyBibtex);
      if (paper) {
        copyText(paper.bibtex, `Copied ${paper.shortTitle} BibTeX`);
      }
    });
  });
}

/* ==========================================================================
   Blog Article Reader View (Markdown + Mermaid + Highlight.js + Sticky TOC)
   ========================================================================== */
function configureMermaid() {
  if (!window.mermaid) return;
  window.mermaid.initialize({
    startOnLoad: false,
    theme: 'default',
    securityLevel: 'loose',
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "PingFang SC", sans-serif',
    flowchart: {
      curve: 'basis',
      htmlLabels: true,
      padding: 18,
      wrappingWidth: 360,
      subGraphTitleMargin: { top: 10, bottom: 18 }
    },
    themeCSS: '.cluster-label { font-size: 13px !important; font-weight: 600 !important; }'
  });
}

function sanitizeMermaidCode(raw) {
  return raw
    // Prevent Mermaid v11 markdown parser from treating "1. xxx" edge labels as unsupported lists
    .replace(/(\|\s*")(\d+)\.\s+/g, '$1$2．')
    // Render literal \n inside quoted node labels cleanly as line breaks
    .replace(/"([^"]*\\n[^"]*)"/g, (_, inner) => `"${inner.replace(/\\n/g, '<br/>')}"`);
}

async function renderMarkdownArticle({ post, markdown, isLocalDraft = false, collection = 'notes' }) {
  cleanupArticleListeners();
  const isLife = collection === 'life';
  state.currentView = isLocalDraft ? 'preview' : isLife ? 'life-article' : 'article';
  state.currentSlug = post.slug;
  document.title = `${post.title} — Qirui Liu`;
  setActiveNav(isLife ? 'life' : 'notes');

  // Parse Markdown with marked
  const rawHtml = window.marked
    ? window.marked.parse(markdown, { gfm: true, breaks: false })
    : `<pre>${escapeHtml(markdown)}</pre>`;

  // Determine prev/next posts
  const list = isLife ? state.lifePosts : state.posts;
  const basePath = isLife ? '#/life' : '#/notes';
  const idx = isLocalDraft ? -1 : list.findIndex((p) => p.slug === post.slug);
  const prevPost = idx > 0 ? list[idx - 1] : null;
  const nextPost = idx >= 0 && idx < list.length - 1 ? list[idx + 1] : null;

  appEl.innerHTML = `
    <article class="article-page">
      <div class="article-shell">
        <div class="article-breadcrumb">
          <a href="${isLife ? '#/life' : '#notes'}" class="back-link">${ICONS.arrowLeft}<span>${isLife ? 'Life & Journal' : 'All Notes'}</span></a>
          <div style="display:flex;gap:8px;align-items:center;">
            ${isLocalDraft ? `<span class="badge badge--teal">Local Draft Preview</span>` : ''}
            <button type="button" class="pill-btn pill-btn--subtle" id="copy-raw-md">${ICONS.copy}<span>Copy Markdown</span></button>
          </div>
        </div>

        <header class="article-header">
          <div class="article-meta-top">
            <span class="badge ${post.accent === 'indigo' ? 'badge--indigo' : post.accent === 'teal' ? 'badge--teal' : ''}">${escapeHtml(post.category || (isLife ? 'Journal' : 'Note'))}</span>
            <span class="note-date-read">${escapeHtml(post.date || 'Draft')} · ${escapeHtml(post.readingTime || estimateReadingTime(markdown))}<span data-article-views hidden></span></span>
          </div>
          <h1 class="article-title">${escapeHtml(post.title)}</h1>
          ${post.subtitle ? `<p class="article-subtitle">${escapeHtml(post.subtitle)}</p>` : ''}
          ${
            post.tags && post.tags.length
              ? `<div class="article-tags">${post.tags.map((t) => `<span class="tag-chip">${escapeHtml(t)}</span>`).join('')}</div>`
              : ''
          }
        </header>

        <div class="article-layout">
          <div class="prose" id="article-prose">${rawHtml}</div>
          <aside class="article-toc" id="article-toc" aria-label="Table of contents">
            <p class="toc-heading">On this page</p>
            <ul class="toc-list" id="toc-list"></ul>
          </aside>
        </div>

        ${
          prevPost || nextPost
            ? `
          <nav class="article-nav-footer" aria-label="More entries">
            ${
              prevPost
                ? `<a class="article-nav-card" href="${basePath}/${encodeURIComponent(prevPost.slug)}"><span class="article-nav-label">← Previous</span><span class="article-nav-title">${escapeHtml(prevPost.title)}</span></a>`
                : '<div></div>'
            }
            ${
              nextPost
                ? `<a class="article-nav-card article-nav-card--next" href="${basePath}/${encodeURIComponent(nextPost.slug)}"><span class="article-nav-label">Next →</span><span class="article-nav-title">${escapeHtml(nextPost.title)}</span></a>`
                : ''
            }
          </nav>
        `
            : ''
        }
      </div>
    </article>

    <footer class="site-footer">
      <div class="footer-inner">
        <div class="footer-left">
          <span>© 2026 Qirui Liu (刘骐瑞)</span>
          ${renderFooterCounterHtml()}
        </div>
        <div class="footer-links">
          <a href="#overview">Home</a>
          <a href="#research">Research</a>
          <a href="#notes">Notes</a>
          <a href="#/life">Life</a>
        </div>
      </div>
    </footer>
  `;

  window.scrollTo({ top: 0, behavior: 'instant' });
  if (!isLocalDraft) {
    trackVisit(`${isLife ? 'life' : 'notes'}/${encodeURIComponent(post.slug)}`, { isArticle: true });
  }

  const copyMdBtn = document.getElementById('copy-raw-md');
  if (copyMdBtn) {
    copyMdBtn.addEventListener('click', () => copyText(markdown, 'Copied Markdown source'));
  }

  const proseEl = document.getElementById('article-prose');
  await enhanceProse(proseEl);
  buildArticleToc(proseEl);
  setupReadingProgress();
}

async function enhanceProse(proseEl) {
  if (!proseEl) return;

  // 1. External links open in new tab cleanly
  proseEl.querySelectorAll('a[href^="http"]').forEach((a) => {
    a.setAttribute('target', '_blank');
    a.setAttribute('rel', 'noopener noreferrer');
  });

  // 2. Wrap tables in smooth horizontal scroll container
  proseEl.querySelectorAll('table').forEach((table) => {
    const wrap = document.createElement('div');
    wrap.className = 'table-wrap';
    table.parentNode.insertBefore(wrap, table);
    wrap.appendChild(table);
  });

  // 3. Transform code blocks into macOS Code Windows or Mermaid Artboards
  const preBlocks = Array.from(proseEl.querySelectorAll('pre'));
  configureMermaid();

  let mermaidCounter = 0;
  for (const pre of preBlocks) {
    const codeEl = pre.querySelector('code');
    if (!codeEl) continue;

    const className = codeEl.className || '';
    const langMatch = className.match(/language-([\w-]+)/);
    const lang = langMatch ? langMatch[1].toLowerCase() : 'text';
    const rawCode = codeEl.textContent || '';

    if (lang === 'mermaid' && window.mermaid) {
      mermaidCounter += 1;
      const diagramId = `mermaid-diagram-${Date.now()}-${mermaidCounter}`;
      const card = document.createElement('div');
      card.className = 'mermaid-card';
      card.innerHTML = `
        <div class="mermaid-card-bar">
          <span>Architecture Diagram · Mermaid</span>
          <button type="button" class="mermaid-expand-btn">${ICONS.expand}<span>Expand</span></button>
        </div>
        <div class="mermaid-canvas"></div>
      `;

      const canvas = card.querySelector('.mermaid-canvas');
      try {
        const sanitized = sanitizeMermaidCode(rawCode);
        const { svg } = await window.mermaid.render(diagramId, sanitized);
        canvas.innerHTML = svg;
        const expandBtn = card.querySelector('.mermaid-expand-btn');
        expandBtn.addEventListener('click', () => {
          openSvgLightbox({
            svgHtml: svg,
            title: 'Architecture Diagram',
            caption: 'Mermaid diagram rendered directly from Markdown source'
          });
        });
        pre.replaceWith(card);
        continue;
      } catch (err) {
        console.warn('Mermaid render error, falling back to code block:', err);
      }
    }

    // Syntax highlighting via Highlight.js
    let highlightedHtml = escapeHtml(rawCode);
    if (window.hljs) {
      try {
        if (lang && lang !== 'text' && window.hljs.getLanguage(lang)) {
          highlightedHtml = window.hljs.highlight(rawCode, { language: lang }).value;
        } else if (lang !== 'text') {
          highlightedHtml = window.hljs.highlightAuto(rawCode).value;
        }
      } catch {
        highlightedHtml = escapeHtml(rawCode);
      }
    }

    const wrapper = document.createElement('div');
    wrapper.className = 'code-block';
    wrapper.innerHTML = `
      <div class="code-block-header">
        <span class="code-lang">${escapeHtml(lang)}</span>
        <button type="button" class="code-copy-btn">${ICONS.copy}<span>Copy</span></button>
      </div>
      <pre><code>${highlightedHtml}</code></pre>
    `;
    const copyBtn = wrapper.querySelector('.code-copy-btn');
    copyBtn.addEventListener('click', () => {
      copyText(rawCode, `Copied ${lang.toUpperCase()} snippet`);
    });
    pre.replaceWith(wrapper);
  }
}

function buildArticleToc(proseEl) {
  const tocList = document.getElementById('toc-list');
  const tocAside = document.getElementById('article-toc');
  if (!proseEl || !tocList) return;

  const headings = Array.from(proseEl.querySelectorAll('h2, h3'));
  if (!headings.length) {
    if (tocAside) tocAside.style.display = 'none';
    return;
  }

  tocList.innerHTML = headings
    .map((h, i) => {
      const id = slugifyHeading(h.textContent, i);
      h.id = id;
      const isH3 = h.tagName === 'H3';
      return `<li class="toc-item${isH3 ? ' toc-item--h3' : ''}"><a href="#${id}" data-toc-id="${id}">${escapeHtml(h.textContent)}</a></li>`;
    })
    .join('');

  tocList.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById(link.dataset.tocId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Scroll spy for TOC
  const tocLinks = Array.from(tocList.querySelectorAll('a'));
  const setActive = (id) => {
    tocLinks.forEach((a) => a.classList.toggle('is-active', a.dataset.tocId === id));
  };
  if (headings[0]) setActive(headings[0].id);

  state.tocObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries.filter((en) => en.isIntersecting);
      if (visible.length) {
        setActive(visible[0].target.id);
      }
    },
    { rootMargin: '-70px 0px -70% 0px', threshold: 0 }
  );

  headings.forEach((h) => state.tocObserver.observe(h));
}

function setupReadingProgress() {
  readingProgressEl.classList.add('is-visible');
  const onScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0;
    readingProgressFillEl.style.width = `${pct}%`;
  };
  state.scrollSpyHandler = onScroll;
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

function setupHomeScrollSpy() {
  const sections = ['overview', 'research', 'notes', 'background', 'life', 'contact'];
  const onScroll = () => {
    const y = window.scrollY + 120;
    let active = 'overview';
    for (const id of sections) {
      const el = document.getElementById(id);
      if (el && el.offsetTop <= y) active = id;
    }
    setActiveNav(active);
  };
  state.scrollSpyHandler = onScroll;
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

function cleanupArticleListeners() {
  if (state.tocObserver) {
    state.tocObserver.disconnect();
    state.tocObserver = null;
  }
  if (state.scrollSpyHandler) {
    window.removeEventListener('scroll', state.scrollSpyHandler);
    state.scrollSpyHandler = null;
  }
}

function setActiveNav(navKey) {
  document.querySelectorAll('.nav-link').forEach((link) => {
    link.classList.toggle('is-active', link.dataset.nav === navKey);
  });
}

async function openArticleBySlug(slug, collection = 'notes') {
  const list = collection === 'life' ? state.lifePosts : state.posts;
  const post = list.find((p) => p.slug === slug);
  if (!post) {
    if (collection === 'life') {
      renderLifeIndexView();
      showToast('Journal entry not found');
    } else {
      renderHomeView('notes');
      showToast('Note not found');
    }
    return;
  }

  appEl.innerHTML = `<div class="article-page"><div class="article-shell"><p style="color:var(--text-tertiary);">Loading…</p></div></div>`;
  try {
    const res = await fetch(post.file);
    if (!res.ok) throw new Error('Failed to load markdown file');
    const md = await res.text();
    await renderMarkdownArticle({ post, markdown: md, collection });
  } catch (err) {
    console.error(err);
    const backHref = collection === 'life' ? '#/life' : '#notes';
    appEl.innerHTML = `<div class="article-page"><div class="article-shell"><a href="${backHref}" class="back-link">${ICONS.arrowLeft} Back</a><h2 style="margin-top:20px;">Unable to load entry</h2><p style="color:var(--text-secondary);">Make sure the site is served over HTTP (e.g. <code>python3 -m http.server</code>).</p></div></div>`;
  }
}

function renderLifeIndexView() {
  cleanupArticleListeners();
  state.currentView = 'life-index';
  state.currentSlug = null;
  document.title = 'Life & Journal — Qirui Liu (刘骐瑞)';
  readingProgressEl.classList.remove('is-visible');
  setActiveNav('life');

  appEl.innerHTML = `
    <section class="article-page">
      <div class="article-shell">
        <div class="article-breadcrumb">
          <a href="#life" class="back-link">${ICONS.arrowLeft}<span>Back to Home</span></a>
        </div>

        <header class="article-header">
          <h1 class="article-title">Life &amp; Journal</h1>
          <p class="article-subtitle">Personal reflections, travels, books, photography, and everyday life moments.</p>
        </header>

        ${
          state.lifePosts.length
            ? `<div class="notes-grid">${state.lifePosts.map((p) => renderNoteCard(p, '#/life')).join('')}</div>`
            : `
          <div class="life-empty-panel">
            <div class="life-empty-icon" aria-hidden="true">✦</div>
            <h3>First entry coming soon</h3>
            <p>This space is reserved for life records and essays. Add Markdown files to <code>life/</code> and register them in <code>data/life.json</code> whenever you’re ready to publish.</p>
            <a href="#overview" class="pill-btn pill-btn--secondary pill-btn--sm" style="margin-top:16px;">Return Home</a>
          </div>
        `
        }
      </div>
    </section>

    <footer class="site-footer">
      <div class="footer-inner">
        <div class="footer-left">
          <span>© 2026 Qirui Liu (刘骐瑞)</span>
          ${renderFooterCounterHtml()}
        </div>
        <div class="footer-links">
          <a href="#overview">Home</a>
          <a href="#research">Research</a>
          <a href="#notes">Notes</a>
        </div>
      </div>
    </footer>
  `;

  window.scrollTo({ top: 0, behavior: 'instant' });
  trackVisit('life');
}

/* ==========================================================================
   Quick Look Lightbox (Paper Figures & Expanded Mermaid Diagrams)
   ========================================================================== */
const lightboxEl = document.getElementById('lightbox');
const lightboxTitleEl = document.getElementById('lightbox-title');
const lightboxBadgeEl = document.getElementById('lightbox-badge');
const lightboxStageEl = document.getElementById('lightbox-stage');
const lightboxCaptionEl = document.getElementById('lightbox-caption');
const lightboxOpenRawEl = document.getElementById('lightbox-open-raw');

function openImageLightbox({ src, title, caption }) {
  lightboxBadgeEl.textContent = 'Figure · Quick Look';
  lightboxTitleEl.textContent = title || 'Preview';
  lightboxCaptionEl.textContent = caption || '';
  lightboxStageEl.innerHTML = `<img src="${escapeHtml(src)}" alt="${escapeHtml(caption || title)}">`;
  lightboxOpenRawEl.href = src;
  lightboxOpenRawEl.hidden = false;
  lightboxEl.hidden = false;
  document.body.style.overflow = 'hidden';
}

function openSvgLightbox({ svgHtml, title, caption }) {
  lightboxBadgeEl.textContent = 'Diagram · Quick Look';
  lightboxTitleEl.textContent = title || 'Mermaid Diagram';
  lightboxCaptionEl.textContent = caption || '';
  lightboxStageEl.innerHTML = svgHtml;
  lightboxOpenRawEl.hidden = true;
  lightboxEl.hidden = false;
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightboxEl.hidden = true;
  lightboxStageEl.innerHTML = '';
  document.body.style.overflow = '';
}

document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
lightboxEl.addEventListener('click', (e) => {
  if (e.target === lightboxEl) closeLightbox();
});

/* ==========================================================================
   Spotlight Command Palette (⌘K)
   ========================================================================== */
const spotlightEl = document.getElementById('spotlight');
const spotlightInputEl = document.getElementById('spotlight-input');
const spotlightResultsEl = document.getElementById('spotlight-results');

function buildSpotlightCatalog() {
  const items = [];

  SITE_DATA.papers.forEach((p) => {
    items.push({
      group: 'Research Papers',
      title: p.shortTitle,
      subtitle: `${p.venue} · ${p.title}`,
      type: p.type === 'publication' ? 'Paper' : 'Preprint',
      searchText: `${p.shortTitle} ${p.title} ${p.venue} ${p.topics.join(' ')} ${p.summary}`.toLowerCase(),
      action: () => {
        closeSpotlight();
        state.researchFilter = 'All';
        if (state.currentView !== 'home') {
          window.location.hash = '#research';
          setTimeout(() => {
            document.getElementById(`paper-${p.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 120);
        } else {
          renderHomeView();
          setTimeout(() => {
            document.getElementById(`paper-${p.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 60);
        }
      }
    });
  });

  state.posts.forEach((post) => {
    items.push({
      group: 'Technical Notes',
      title: post.title,
      subtitle: post.subtitle,
      type: post.category,
      searchText: `${post.title} ${post.subtitle} ${(post.tags || []).join(' ')} ${post.category}`.toLowerCase(),
      action: () => {
        closeSpotlight();
        window.location.hash = `#/notes/${encodeURIComponent(post.slug)}`;
      }
    });
  });

  state.lifePosts.forEach((post) => {
    items.push({
      group: 'Life & Journal',
      title: post.title,
      subtitle: post.subtitle || '',
      type: post.category || 'Life',
      searchText: `${post.title} ${post.subtitle || ''} ${(post.tags || []).join(' ')} life journal`.toLowerCase(),
      action: () => {
        closeSpotlight();
        window.location.hash = `#/life/${encodeURIComponent(post.slug)}`;
      }
    });
  });

  items.push(
    {
      group: 'Quick Actions',
      title: 'Open Life & Journal',
      subtitle: 'Personal reflections, travels, and everyday moments',
      type: 'Page',
      searchText: 'life journal moments diary blog essays 生活 记录',
      action: () => {
        closeSpotlight();
        window.location.hash = '#/life';
      }
    },
    {
      group: 'Quick Actions',
      title: 'Toggle Light / Dark Mode',
      subtitle: 'Switch between Apple Light and Dark appearance',
      type: 'Action',
      searchText: 'theme dark light mode appearance switch',
      action: () => {
        closeSpotlight();
        toggleTheme();
      }
    },
    {
      group: 'Quick Actions',
      title: 'Copy Email Address',
      subtitle: SITE_DATA.profile.email,
      type: 'Action',
      searchText: 'email contact copy zjulqr@gmail.com',
      action: () => {
        closeSpotlight();
        copyText(SITE_DATA.profile.email, `Copied ${SITE_DATA.profile.email}`);
      }
    },
    {
      group: 'Quick Actions',
      title: 'Preview Local Markdown Note (.md)',
      subtitle: 'Render any local .md file with Mermaid & TOC',
      type: 'Tool',
      searchText: 'markdown preview local md draft note open',
      action: () => {
        closeSpotlight();
        document.getElementById('local-md-input').click();
      }
    }
  );

  return items;
}

function renderSpotlightResults(query = '') {
  const q = query.trim().toLowerCase();
  const catalog = buildSpotlightCatalog();
  const filtered = q ? catalog.filter((it) => it.searchText.includes(q)) : catalog;

  state.spotlightItems = filtered;
  state.spotlightSelectedIdx = 0;

  if (!filtered.length) {
    spotlightResultsEl.innerHTML = `<div class="spotlight-empty">No matching papers, notes, or actions for “${escapeHtml(query)}”</div>`;
    return;
  }

  let html = '';
  let lastGroup = '';
  filtered.forEach((item, idx) => {
    if (item.group !== lastGroup) {
      html += `<div class="spotlight-group-label">${escapeHtml(item.group)}</div>`;
      lastGroup = item.group;
    }
    html += `
      <button type="button" role="option" class="spotlight-item${idx === 0 ? ' is-selected' : ''}" data-spotlight-idx="${idx}">
        <div style="min-width:0;">
          <div class="spotlight-item-title">${escapeHtml(item.title)}</div>
          <div class="spotlight-item-sub">${escapeHtml(item.subtitle)}</div>
        </div>
        <span class="spotlight-item-type">${escapeHtml(item.type)}</span>
      </button>
    `;
  });

  spotlightResultsEl.innerHTML = html;
  spotlightResultsEl.querySelectorAll('[data-spotlight-idx]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const i = Number(btn.dataset.spotlightIdx);
      state.spotlightItems[i]?.action();
    });
  });
}

function updateSpotlightSelection() {
  spotlightResultsEl.querySelectorAll('[data-spotlight-idx]').forEach((btn) => {
    const selected = Number(btn.dataset.spotlightIdx) === state.spotlightSelectedIdx;
    btn.classList.toggle('is-selected', selected);
    if (selected) btn.scrollIntoView({ block: 'nearest' });
  });
}

function openSpotlight() {
  spotlightEl.hidden = false;
  spotlightInputEl.value = '';
  renderSpotlightResults('');
  document.body.style.overflow = 'hidden';
  requestAnimationFrame(() => spotlightInputEl.focus());
}

function closeSpotlight() {
  spotlightEl.hidden = true;
  document.body.style.overflow = '';
}

document.getElementById('open-spotlight').addEventListener('click', openSpotlight);
spotlightEl.addEventListener('click', (e) => {
  if (e.target === spotlightEl) closeSpotlight();
});
spotlightInputEl.addEventListener('input', (e) => renderSpotlightResults(e.target.value));
spotlightInputEl.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    if (state.spotlightItems.length) {
      state.spotlightSelectedIdx = (state.spotlightSelectedIdx + 1) % state.spotlightItems.length;
      updateSpotlightSelection();
    }
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    if (state.spotlightItems.length) {
      state.spotlightSelectedIdx =
        (state.spotlightSelectedIdx - 1 + state.spotlightItems.length) % state.spotlightItems.length;
      updateSpotlightSelection();
    }
  } else if (e.key === 'Enter') {
    e.preventDefault();
    state.spotlightItems[state.spotlightSelectedIdx]?.action();
  }
});

/* ==========================================================================
   Theme Toggle, Mobile Menu, Keyboard Shortcuts, Local Markdown Reader
   ========================================================================== */
function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  try {
    localStorage.setItem('qirui-theme', next);
  } catch {}
  showToast(next === 'dark' ? 'Switched to Dark Mode' : 'Switched to Light Mode');
}

document.getElementById('theme-toggle').addEventListener('click', toggleTheme);

// Mobile Menu
const mobileMenuBtn = document.getElementById('mobile-menu-toggle');
const mobileNavEl = document.getElementById('mobile-nav');
mobileMenuBtn.addEventListener('click', () => {
  const isOpen = !mobileNavEl.hidden;
  mobileNavEl.hidden = isOpen;
  mobileMenuBtn.setAttribute('aria-expanded', String(!isOpen));
});
mobileNavEl.querySelectorAll('a').forEach((a) => {
  a.addEventListener('click', () => {
    mobileNavEl.hidden = true;
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
  });
});

// Global Keyboard Shortcuts
document.addEventListener('keydown', (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    if (spotlightEl.hidden) openSpotlight();
    else closeSpotlight();
  } else if (e.key === 'Escape') {
    if (!spotlightEl.hidden) closeSpotlight();
    else if (!lightboxEl.hidden) closeLightbox();
  }
});

// Local Markdown File Preview
document.getElementById('local-md-input').addEventListener('change', async (e) => {
  const file = e.target.files?.[0];
  if (!file) return;
  const text = await file.text();
  const h1Match = text.match(/^#\s+(.+)$/m);
  const title = h1Match ? h1Match[1].trim() : file.name.replace(/\.md$/i, '');
  state.localDraft = {
    post: {
      slug: 'local-preview',
      title,
      subtitle: `Local file: ${file.name}`,
      date: new Date().toISOString().slice(0, 10),
      category: 'Local Preview',
      tags: ['Markdown', 'Draft'],
      readingTime: estimateReadingTime(text)
    },
    markdown: text
  };
  e.target.value = '';
  window.location.hash = '#/preview';
});

/* ==========================================================================
   Hash Router
   ========================================================================== */
async function handleRoute() {
  const hash = window.location.hash || '#/';

  if (hash.startsWith('#/notes/')) {
    const slug = decodeURIComponent(hash.slice('#/notes/'.length));
    await openArticleBySlug(slug, 'notes');
    return;
  }

  if (hash === '#/life' || hash === '#/life/') {
    renderLifeIndexView();
    return;
  }

  if (hash.startsWith('#/life/')) {
    const slug = decodeURIComponent(hash.slice('#/life/'.length));
    await openArticleBySlug(slug, 'life');
    return;
  }

  if (hash === '#/preview' && state.localDraft) {
    await renderMarkdownArticle({
      post: state.localDraft.post,
      markdown: state.localDraft.markdown,
      isLocalDraft: true
    });
    return;
  }

  const sectionIds = ['overview', 'research', 'notes', 'background', 'life', 'contact'];
  const cleanHash = hash.replace(/^#\/?/, '');
  const targetSection = sectionIds.includes(cleanHash) ? cleanHash : null;

  if (state.currentView !== 'home') {
    renderHomeView(targetSection);
  } else if (targetSection) {
    document.getElementById(targetSection)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else {
    renderHomeView(null);
  }
}

/* ==========================================================================
   Boot
   ========================================================================== */
async function init() {
  await loadPostsManifest();
  renderHomeView(null);
  if (window.location.hash && window.location.hash !== '#/') {
    await handleRoute();
  }
  window.addEventListener('hashchange', handleRoute);
}

init();
