const body = document.body;
const LOGO = 'stackly-logo-icon.webp';
const page = body.dataset.page || 'home';
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

const ICON = {
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>',
  alert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 9v4"/><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 17h.01"/></svg>',
  info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>',
  spark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9.9 15.5A2 2 0 0 0 8.5 14.1l-6.1-1.6a.5.5 0 0 1 0-1l6.1-1.6A2 2 0 0 0 9.9 8.5l1.6-6.1a.5.5 0 0 1 1 0l1.6 6.1a2 2 0 0 0 1.4 1.4l6.1 1.6a.5.5 0 0 1 0 1l-6.1 1.6a2 2 0 0 0-1.4 1.4l-1.6 6.1a.5.5 0 0 1-1 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>',
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/></svg>',
  arrowLeft: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>',
  arrowRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>'
};

const publicNav = [
  ['home', 'Home', 'index.html'],
  ['menu', 'Menu', 'menu.html'],
  ['services', 'Services', 'services.html'],
  ['gallery', 'Gallery', 'gallery.html'],
  ['about', 'About', 'about.html'],
  ['contact', 'Contact', 'contact.html']
];

const socialLinks = [
  ['instagram', 'Instagram', 'M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.3 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.3-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.3-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2zm0 1.8c-3.1 0-3.5 0-4.8.1-1.1.1-1.5.2-1.7.3-.3.1-.5.3-.7.5-.2.2-.4.4-.5.7-.1.2-.3.6-.3 1.7-.1 1.3-.1 1.7-.1 4.8s0 3.5.1 4.8c.1 1.1.2 1.5.3 1.7.1.3.3.5.5.7.2.2.4.4.7.5.2.1.6.3 1.7.3 1.3.1 1.7.1 4.8.1s3.5 0 4.8-.1c1.1-.1 1.5-.2 1.7-.3.3-.1.5-.3.7-.5.2-.2.4-.4.5-.7.1-.2.3-.6.3-1.7.1-1.3.1-1.7.1-4.8s0-3.5-.1-4.8c-.1-1.1-.2-1.5-.3-1.7-.1-.3-.3-.5-.5-.7-.2-.2-.4-.4-.7-.5-.2-.1-.6-.3-1.7-.3-1.3-.1-1.7-.1-4.8-.1zm0 3.1a4.9 4.9 0 1 1 0 9.8 4.9 4.9 0 0 1 0-9.8zm0 8.1a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4zm6.3-8.3a1.1 1.1 0 1 1-2.3 0 1.1 1.1 0 0 1 2.3 0z'],
  ['facebook', 'Facebook', 'M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12z'],
  ['pinterest', 'Pinterest', 'M12 2a10 10 0 0 0-3.7 19.3c-.1-.8-.2-2 0-2.9l1.2-5.1s-.3-.6-.3-1.5c0-1.4.8-2.5 1.8-2.5.9 0 1.3.6 1.3 1.4 0 .9-.6 2.2-.9 3.4-.2 1 .5 1.9 1.6 1.9 1.9 0 3.2-2.4 3.2-5.3 0-2.2-1.5-3.8-4.1-3.8a4.7 4.7 0 0 0-4.9 4.7c0 .9.3 1.5.7 2 .2.2.2.3.1.6l-.2.8c-.1.3-.3.4-.6.2-1.2-.5-1.8-1.9-1.8-3.5 0-2.6 2.2-5.7 6.5-5.7 3.5 0 5.8 2.5 5.8 5.2 0 3.6-2 6.2-4.9 6.2-1 0-1.9-.5-2.2-1.1l-.6 2.4c-.2.8-.7 1.7-1.1 2.3A10 10 0 1 0 12 2z'],
  ['whatsapp', 'WhatsApp', 'M12 2a9.9 9.9 0 0 0-8.5 15l-1.4 5.1 5.2-1.4A9.9 9.9 0 1 0 12 2zm5.8 14.2c-.2.7-1.4 1.3-2 1.4-.5.1-1.2.1-1.9-.1-.4-.1-1-.3-1.8-.6-3.1-1.3-5.1-4.4-5.3-4.6-.1-.2-1.2-1.6-1.2-3.1s.8-2.2 1-2.5c.3-.3.6-.4.8-.4h.6c.2 0 .4 0 .6.5l.8 2c.1.2.1.3 0 .5l-.3.6c-.1.2-.3.3-.1.5.2.3.6 1.1 1.4 1.8 1 .9 1.8 1.1 2 1.2.2.1.4.1.5-.1l.8-.9c.2-.2.3-.2.5-.1l2 1c.2.1.4.2.4.3.1.1.1.6-.1 1.3z'],
  ['youtube', 'YouTube', 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z']
];

const socialRow = socialLinks.map(([key, label, d]) =>
  `<a class="social-link" href="404.html" aria-label="Stackly Bakery on ${label}" title="${label}"><svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true"><path d="${d}"></path></svg></a>`
).join('');

function renderPublicChrome() {
  const headerSlot = $('[data-site-header]');
  if (headerSlot) {
    const nav = publicNav.map(([key, label, href]) =>
      `<a href="${href}"${key === page ? ' aria-current="page"' : ''}>${label}</a>`).join('');
    headerSlot.innerHTML = `
      <header class="site-header" data-site-header>
        <div class="container header-inner">
          <a class="brand" href="index.html" aria-label="Stackly Bakery home"><img src="${LOGO}" alt="Stackly Bakery logo" width="42" height="42"><span>STACKLY</span></a>
          <nav class="desktop-nav" aria-label="Primary navigation">${nav}</nav>
          <div class="header-actions">
            <a class="header-icon" href="404.html" aria-label="Cart">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18">
                <path d="M6 6h15l-1.5 9h-11L6 6z"></path>
                <path d="M6 6H3"></path>
                <circle cx="9" cy="20" r="1"></circle>
                <circle cx="19" cy="20" r="1"></circle>
              </svg>
            </a>
            <a class="header-icon" href="404.html" aria-label="Wishlist">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18">
                <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1L12 21l7.7-7.6 1.1-1a5.5 5.5 0 0 0 0-7.8z"></path>
              </svg>
            </a>
            <a class="header-login" href="login.html">Log in</a>
          </div>
          <button class="menu-toggle" type="button" aria-label="Open navigation" aria-controls="public-drawer" aria-expanded="false"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M4 7h16"></path><path d="M4 12h16"></path><path d="M4 17h16"></path></svg></button>
        </div>
      </header>
      <div class="drawer-backdrop" data-drawer-backdrop></div>
      <aside class="mobile-drawer" id="public-drawer" aria-label="Mobile navigation" aria-hidden="true">
        <div class="drawer-top">
          <a class="brand" href="index.html"><img src="${LOGO}" alt="" width="42" height="42"><span>STACKLY</span></a>
          <button class="drawer-close" type="button" data-drawer-close aria-label="Close navigation">${ICON.close}</button>
        </div>
        <nav aria-label="Mobile primary navigation">${nav}</nav>
        <div class="drawer-actions">
          <a class="button button--ghost" href="404.html">Cart</a>
          <a class="button button--ghost" href="404.html">Wishlist</a>
          <a class="button" href="login.html">Log in</a>
        </div>
        <div class="drawer-meta"><span>Open daily &middot; 7:00 AM &ndash; 9:00 PM</span></div>
      </aside>`;
  }
  const footerSlot = $('[data-site-footer]');
  if (footerSlot) {
    footerSlot.innerHTML = `
      <footer class="site-footer">
        <div class="container">
          <div class="footer-top">
            <div class="footer-brand">
              <a class="brand" href="index.html"><img src="${LOGO}" alt="" width="44" height="44"><span>STACKLY</span></a>
              <p>A small-batch bakery crafting slow-fermented breads, celebration cakes, and pastry worth waking up for &mdash; baked fresh every morning.</p>
              <div class="social-row" aria-label="Stackly Bakery on social media">${socialRow}</div>
            </div>
            <div class="footer-column"><h3>Explore</h3><a href="index.html">Home</a><a href="services.html">Services</a><a href="gallery.html">Gallery</a><a href="about.html">Our story</a><a href="contact.html">Contact</a></div>
            <div class="footer-column"><h3>Menu</h3><a href="404.html">Breads</a><a href="404.html">Cakes</a><a href="404.html">Pastry</a><a href="404.html">Cookies</a><a href="404.html">Drinks</a></div>
            <div class="footer-column footer-column--contact">
              <h3>Visit us</h3>
              <span class="contact-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg><span>14 Harper Lane, Riverside Quarter</span></span>
              <span class="contact-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/></svg><span>+1 (555) 240-1188</span></span>
              <span class="contact-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg><span>hello@stackly.com</span></span>
              <span class="contact-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg><span>Daily &middot; 7:00 AM &ndash; 9:00 PM</span></span>
            </div>
          </div>
          <div class="footer-bottom">
            <span>&copy; 2026 Stackly Bakery. A demo experience, baked with care.</span>
            <div class="footer-bottom-links"><a href="404.html">Privacy</a><a href="404.html">Terms</a><a href="404.html">Allergens</a></div>
          </div>
        </div>
      </footer>`;
  }
}

function setupHeader() {
  const header = $('.site-header');
  if (!header) return;
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 18);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  const toggle = $('.menu-toggle', header);
  const drawer = $('#public-drawer');
  const backdrop = $('[data-drawer-backdrop]');
  if (!toggle || !drawer || !backdrop) return;
  const close = () => {
    drawer.classList.remove('is-open');
    backdrop.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation');
    body.classList.remove('is-locked');
  };
  const open = () => {
    drawer.classList.add('is-open');
    backdrop.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close navigation');
    body.classList.add('is-locked');
    $('[data-drawer-close]', drawer)?.focus();
  };
  toggle.addEventListener('click', () => drawer.classList.contains('is-open') ? close() : open());
  $('[data-drawer-close]', drawer)?.addEventListener('click', close);
  backdrop.addEventListener('click', close);
  $$('a', drawer).forEach(link => link.addEventListener('click', close));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && drawer.classList.contains('is-open')) close();
  });
}

function setupScrollProgress() {
  const bar = $('.scroll-progress i');
  if (!bar) return;
  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = max > 0 ? (window.scrollY / max) * 100 : 0;
    bar.style.width = `${Math.min(100, Math.max(0, ratio))}%`;
  };
  update();
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
}

function setupCursorGlow() {
  const glow = $('.cursor-glow');
  if (!glow || reducedMotion || !window.matchMedia('(hover: hover)').matches) return;
  let frame = false;
  let x = 0;
  let y = 0;
  const paint = () => {
    glow.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    glow.style.opacity = '1';
    frame = false;
  };
  window.addEventListener('pointermove', event => {
    x = event.clientX;
    y = event.clientY;
    if (!frame) {
      frame = true;
      requestAnimationFrame(paint);
    }
  }, { passive: true });
}

function setupReveals() {
  const items = $$('.reveal');
  if (!items.length) return;
  if (reducedMotion || !('IntersectionObserver' in window)) {
    items.forEach(item => item.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .12, rootMargin: '0px 0px -28px' });
  items.forEach(item => observer.observe(item));
}

function setupCounters() {
  const counters = $$('[data-count]');
  if (!counters.length) return;
  const format = (value, decimals) => Number(value).toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
  const animate = element => {
    const raw = element.dataset.count;
    const target = Number(raw);
    const decimals = (String(raw).split('.')[1] || '').length;
    if (reducedMotion) {
      element.textContent = format(target, decimals);
      return;
    }
    const start = performance.now();
    const tick = now => {
      const progress = Math.min((now - start) / 1200, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = format(target * eased, decimals);
      if (progress < 1) requestAnimationFrame(tick);
      else element.textContent = format(target, decimals);
    };
    requestAnimationFrame(tick);
  };
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animate(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .6 });
  counters.forEach(counter => observer.observe(counter));
}

function setupMeters() {
  const fills = $$('.meter-fill[data-meter]');
  const bars = $$('.bar i[data-bar]');
  if (!fills.length && !bars.length) return;
  const reveal = element => {
    const value = Math.max(0, Math.min(100, Number(element.dataset.meter || element.dataset.bar || 0)));
    if (element.classList.contains('meter-fill')) element.style.width = `${value}%`;
    else element.style.height = `${value}%`;
  };
  if (reducedMotion || !('IntersectionObserver' in window)) {
    [...fills, ...bars].forEach(reveal);
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        reveal(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .4 });
  [...fills, ...bars].forEach(item => observer.observe(item));
}

function setupTaglineRotator() {
  const rotator = $('.tagline-rotator');
  if (!rotator) return;
  const spans = $$('span', rotator);
  if (spans.length < 2) return;
  if (reducedMotion) {
    spans.forEach((span, index) => span.classList.toggle('is-active', index === 0));
    return;
  }
  let current = spans.findIndex(span => span.classList.contains('is-active'));
  if (current < 0) current = 0;
  spans[current].classList.add('is-active');
  window.setInterval(() => {
    const next = (current + 1) % spans.length;
    spans[current].classList.remove('is-active');
    spans[current].classList.add('is-out');
    const previous = current;
    spans[next].classList.remove('is-out');
    spans[next].classList.add('is-active');
    window.setTimeout(() => spans[previous].classList.remove('is-out'), 700);
    current = next;
  }, 3400);
}

function setupFilters() {
  $$('[data-filter-button]').forEach(button => {
    button.addEventListener('click', () => {
      const group = button.dataset.filterButton;
      const filter = button.dataset.filterValue || 'all';
      const target = document.querySelector(`[data-filter-target="${group}"]`);
      if (!target) return;
      const row = button.closest('.filter-row') || button.parentElement;
      $$('[data-filter-button]', row).forEach(item => item.classList.toggle('is-active', item === button));
      let visible = 0;
      $$('[data-category]', target).forEach(item => {
        const match = filter === 'all' || item.dataset.category === filter;
        const show = match && (filter === 'all' || visible < 4);
        item.hidden = !show;
        if (show) visible += 1;
      });
      const count = document.querySelector(`[data-filter-count="${group}"]`);
      if (count) count.textContent = String(visible);
      const empty = document.querySelector(`[data-filter-empty="${group}"]`);
      if (empty) empty.classList.toggle('is-visible', visible === 0);
    });
  });
}

function setSelectLabel(trigger, text) {
  const label = $('.select-label', trigger);
  if (label) label.textContent = text;
  else {
    const caret = $('.select-caret', trigger);
    trigger.textContent = text;
    if (caret) trigger.appendChild(caret);
  }
}

function resetSelect(select, placeholder) {
  const trigger = $('.select-trigger', select);
  const hidden = $('.select-hidden', select);
  if (hidden) hidden.value = '';
  if (trigger) setSelectLabel(trigger, placeholder || trigger.dataset.placeholder || 'Select an option');
  $$('.select-option', select).forEach((option, index) => option.setAttribute('aria-selected', String(index === -1)));
}

function setupFavorites() {
  $$('.product-fav').forEach(button => {
    button.addEventListener('click', () => {
      const on = button.classList.toggle('is-on');
      button.setAttribute('aria-pressed', String(on));
    });
  });
}

function setupSort() {
  $$('[data-sort-select]').forEach(select => {
    const group = select.dataset.sortSelect;
    const hidden = $('.select-hidden', select);
    const target = document.querySelector(`[data-sort-target="${group}"]`);
    if (!hidden || !target) return;
    const original = $$('[data-category]', target);
    hidden.addEventListener('change', () => {
      const mode = hidden.value;
      const items = $$('[data-category]', target);
      let ordered = items;
      if (mode === 'price-asc') ordered = items.slice().sort((a, b) => Number(a.dataset.price) - Number(b.dataset.price));
      else if (mode === 'price-desc') ordered = items.slice().sort((a, b) => Number(b.dataset.price) - Number(a.dataset.price));
      else if (mode === 'name') ordered = items.slice().sort((a, b) => (a.dataset.name || '').localeCompare(b.dataset.name || ''));
      else ordered = original.slice();
      ordered.forEach(item => target.appendChild(item));
    });
  });
}

function setupDropdowns() {
  $$('.custom-select').forEach(select => {
    const trigger = $('.select-trigger', select);
    const menu = $('.select-menu', select);
    const hidden = $('.select-hidden', select);
    if (!trigger || !menu || !hidden) return;
    const close = () => {
      menu.classList.remove('is-open');
      trigger.setAttribute('aria-expanded', 'false');
    };
    const choose = option => {
      hidden.value = option.dataset.value;
      setSelectLabel(trigger, option.dataset.label || option.textContent.trim());
      $$('.select-option', menu).forEach(item => item.setAttribute('aria-selected', String(item === option)));
      close();
      trigger.focus();
      hidden.dispatchEvent(new Event('change', { bubbles: true }));
    };
    trigger.addEventListener('click', () => {
      const willOpen = !menu.classList.contains('is-open');
      $$('.custom-select').forEach(other => {
        if (other !== select) {
          other.querySelector('.select-menu')?.classList.remove('is-open');
          other.querySelector('.select-trigger')?.setAttribute('aria-expanded', 'false');
        }
      });
      close();
      if (willOpen) {
        menu.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
        ($('.select-option[aria-selected="true"]', menu) || $('.select-option', menu))?.focus();
      }
    });
    $$('.select-option', menu).forEach(option => option.addEventListener('click', () => choose(option)));
    select.addEventListener('keydown', event => {
      if (event.key === 'Escape') close();
    });
    menu.addEventListener('keydown', event => {
      const options = $$('.select-option', menu);
      const current = options.indexOf(document.activeElement);
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        const next = event.key === 'ArrowDown' ? (current + 1) % options.length : (current - 1 + options.length) % options.length;
        options[next]?.focus();
      }
    });
  });
  document.addEventListener('click', event => {
    $$('.custom-select').forEach(select => {
      if (!select.contains(event.target)) {
        $('.select-menu', select)?.classList.remove('is-open');
        $('.select-trigger', select)?.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

function setupDatePickers() {
  const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const pad = value => String(value).padStart(2, '0');
  const toISO = date => `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
  const startOfDay = date => new Date(date.getFullYear(), date.getMonth(), date.getDate());

  $$('[data-date-picker]').forEach(picker => {
    const hidden = $('input[type="hidden"]', picker);
    const trigger = $('.date-trigger', picker);
    const triggerText = $('.date-trigger-text', picker);
    const panel = $('.date-panel', picker);
    const title = $('[data-date-title]', picker);
    const weekdaysRow = $('[data-date-weekdays]', picker);
    const grid = $('[data-date-grid]', picker);
    const clearButton = $('[data-date-clear]', picker);
    const prevButton = $('[data-date-prev]', picker);
    const nextButton = $('[data-date-next]', picker);
    if (!hidden || !trigger || !panel || !grid) return;

    const today = startOfDay(new Date());
    let view = new Date(today.getFullYear(), today.getMonth(), 1);
    if (weekdaysRow) weekdaysRow.innerHTML = WEEKDAYS.map(day => `<span>${day}</span>`).join('');

    const labelFor = value => {
      const [year, month, day] = value.split('-').map(Number);
      return new Date(year, month - 1, day).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
    };

    const syncTrigger = () => {
      const has = Boolean(hidden.value);
      if (triggerText) {
        triggerText.textContent = has ? labelFor(hidden.value) : trigger.dataset.placeholder || 'Choose a date';
      }
      trigger.classList.toggle('is-placeholder', !has);
      if (clearButton) clearButton.hidden = !has;
    };

    const render = () => {
      if (title) title.textContent = `${MONTH_NAMES[view.getMonth()]} ${view.getFullYear()}`;
      if (prevButton) prevButton.disabled = view.getFullYear() === today.getFullYear() && view.getMonth() === today.getMonth();
      const first = new Date(view.getFullYear(), view.getMonth(), 1);
      const daysInMonth = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
      const cells = [];
      for (let i = 0; i < first.getDay(); i += 1) cells.push('<span class="date-blank" aria-hidden="true"></span>');
      for (let day = 1; day <= daysInMonth; day += 1) {
        const iso = toISO(new Date(view.getFullYear(), view.getMonth(), day));
        const classes = ['date-day'];
        if (iso === hidden.value) classes.push('is-selected');
        if (iso === toISO(today)) classes.push('is-today');
        const disabled = iso < toISO(today);
        cells.push(`<button type="button" class="${classes.join(' ')}" data-date-value="${iso}"${disabled ? ' disabled tabindex="-1"' : ''}>${day}</button>`);
      }
      grid.innerHTML = cells.join('');
    };

    const place = () => {
      panel.classList.remove('is-up');
      const rect = picker.getBoundingClientRect();
      if (rect.bottom + panel.offsetHeight + 12 > window.innerHeight && rect.top > panel.offsetHeight + 12) {
        panel.classList.add('is-up');
      }
    };

    const open = () => {
      if (hidden.value) {
        const [year, month] = hidden.value.split('-').map(Number);
        view = new Date(year, month - 1, 1);
      } else {
        view = new Date(today.getFullYear(), today.getMonth(), 1);
      }
      panel.hidden = false;
      trigger.setAttribute('aria-expanded', 'true');
      render();
      requestAnimationFrame(() => {
        place();
        ($('.date-day.is-selected', grid) || $('.date-day:not([disabled])', grid))?.focus();
      });
    };

    const close = (refocus = false) => {
      if (panel.hidden) return;
      panel.hidden = true;
      panel.classList.remove('is-up');
      trigger.setAttribute('aria-expanded', 'false');
      if (refocus) trigger.focus();
    };

    const applyValue = value => {
      hidden.value = value;
      syncTrigger();
      close(true);
      hidden.dispatchEvent(new Event('change', { bubbles: true }));
      if (hidden.getAttribute('aria-invalid') === 'true') validateInput(hidden);
    };

    trigger.addEventListener('click', () => panel.hidden ? open() : close(true));
    prevButton?.addEventListener('click', () => { view = new Date(view.getFullYear(), view.getMonth() - 1, 1); render(); place(); });
    nextButton?.addEventListener('click', () => { view = new Date(view.getFullYear(), view.getMonth() + 1, 1); render(); place(); });
    grid.addEventListener('click', event => {
      const day = event.target.closest('.date-day');
      if (!day || day.disabled) return;
      applyValue(day.dataset.dateValue);
    });
    clearButton?.addEventListener('click', () => applyValue(''));
    grid.addEventListener('keydown', event => {
      const days = $$('.date-day:not([disabled])', grid);
      const current = days.indexOf(document.activeElement);
      if (current < 0) return;
      const offsets = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: 7, ArrowUp: -7 };
      if (!(event.key in offsets)) return;
      const next = days[current + offsets[event.key]];
      if (next) { event.preventDefault(); next.focus(); }
    });
    picker.addEventListener('keydown', event => {
      if (event.key === 'Escape' && !panel.hidden) { event.stopPropagation(); close(true); }
    });
    document.addEventListener('click', event => { if (!picker.contains(event.target)) close(); });
    window.addEventListener('resize', () => { if (!panel.hidden) place(); });

    const label = document.querySelector(`label[for="${hidden.id}"]`);
    label?.addEventListener('click', event => { event.preventDefault(); trigger.focus(); if (panel.hidden) open(); });
    hidden.form?.addEventListener('reset', () => window.setTimeout(() => {
      hidden.value = '';
      syncTrigger();
      if (hidden.getAttribute('aria-invalid') === 'true') clearFieldError(hidden);
    }, 0));

    syncTrigger();
  });
}

function setupPasswordToggles() {
  $$('[data-password-toggle]').forEach(toggle => {
    toggle.addEventListener('click', () => {
      const input = document.getElementById(toggle.dataset.passwordToggle);
      if (!input) return;
      const visible = input.type === 'text';
      input.type = visible ? 'password' : 'text';
      toggle.textContent = visible ? 'Show' : 'Hide';
      toggle.setAttribute('aria-label', visible ? 'Show password' : 'Hide password');
    });
  });
}

function setupRoleCards() {
  $$('[data-role-card]').forEach(card => {
    card.addEventListener('click', () => {
      const group = card.closest('[data-role-group]') || card.parentElement;
      $$('[data-role-card]', group).forEach(item => item.classList.toggle('is-active', item === card));
      const form = card.closest('form');
      const hidden = form?.querySelector('input[name="role"]');
      if (hidden) {
        hidden.value = card.dataset.roleCard;
        if (hidden.getAttribute('aria-invalid') === 'true') clearFieldError(hidden);
      }
    });
  });
  $$('.check-chip input').forEach(input => {
    input.addEventListener('change', () => input.closest('.check-chip')?.classList.toggle('is-on', input.checked));
  });
}

function setupRoleSwitches() {
  $$('.role-switch').forEach(sw => {
    const thumb = $('.role-thumb', sw);
    const opts = $$('.role-opt', sw);
    const hidden = sw.closest('.field')?.querySelector('input[name="role"]');
    opts.forEach(opt => {
      const radio = opt.querySelector('input[type="radio"]');
      if (!radio) return;
      radio.addEventListener('change', () => {
        if (!radio.checked) return;
        thumb?.classList.toggle('admin', radio.value === 'admin');
        opts.forEach(item => item.classList.toggle('on', item.contains(radio)));
        if (hidden) {
          hidden.value = radio.value;
          if (hidden.getAttribute('aria-invalid') === 'true') clearFieldError(hidden);
        }
      });
    });
  });
}

function findFieldError(input) {
  const group = input.closest('.field') || input.closest('.form-group') || input.closest('.custom-select');
  if (group) {
    const error = group.querySelector('.field-error');
    if (error) return error;
  }
  const described = (input.getAttribute('aria-describedby') || '').split(/\s+/).filter(Boolean)
    .map(id => input.ownerDocument.getElementById(id))
    .find(node => node && node.classList.contains('field-error'));
  return described || null;
}

function dateOrSelectTrigger(input) {
  return input.closest('.custom-select')?.querySelector('.select-trigger')
    || input.closest('[data-date-picker]')?.querySelector('.date-trigger')
    || null;
}

function showFieldError(input, message) {
  const error = findFieldError(input);
  input.setAttribute('aria-invalid', 'true');
  const trigger = dateOrSelectTrigger(input);
  if (trigger) trigger.setAttribute('aria-invalid', 'true');
  if (error) error.textContent = message;
}

function clearFieldError(input) {
  const error = findFieldError(input);
  input.removeAttribute('aria-invalid');
  const trigger = dateOrSelectTrigger(input);
  if (trigger) trigger.removeAttribute('aria-invalid');
  if (error) error.textContent = '';
}

function validateInput(input) {
  const type = input.dataset.validate;
  const value = input.value.trim();
  let message = '';
  if (!message && (input.required || type === 'required') && !value) message = 'This field is required.';
  if (!message && type === 'name' && !/^[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ .'-]{2,}$/.test(value)) message = 'Use at least 3 letters for your name.';
  if (!message && type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(value)) message = 'Enter a valid email address.';
  if (!message && type === 'phone' && !/^\d{10}$/.test(value.replace(/[\s-]/g, ''))) message = 'Enter a valid 10-digit phone number.';
  if (!message && type === 'password' && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value)) message = 'Use 8+ characters with an uppercase letter, a lowercase letter, and a number.';
  if (!message && type === 'confirm' && value !== (input.form?.querySelector('[data-validate="password"]')?.value || '')) message = 'Passwords do not match.';
  if (!message && type === 'message' && value.length < 12) message = 'Tell us a little more (12 characters minimum).';
  if (!message && type === 'role' && !value) message = 'Choose an account role to continue.';
  if (message) showFieldError(input, message);
  else clearFieldError(input);
  return !message;
}

function validateForm(form) {
  let valid = true;
  $$('[data-validate]', form).forEach(input => {
    if (!validateInput(input)) valid = false;
  });
  $$('input[type="checkbox"][required]', form).forEach(input => {
    const error = findFieldError(input);
    if (!input.checked) {
      input.setAttribute('aria-invalid', 'true');
      if (error) error.textContent = 'Please accept the demo terms to continue.';
      valid = false;
    } else {
      input.removeAttribute('aria-invalid');
      if (error) error.textContent = '';
    }
  });
  return valid;
}

function showToast(message, tone = 'ok') {
  let stack = $('.toast-stack');
  if (!stack) {
    stack = document.createElement('div');
    stack.className = 'toast-stack';
    body.appendChild(stack);
  }
  const toast = document.createElement('div');
  toast.className = `toast${tone === 'ok' ? '' : tone === 'error' ? ' is-error' : ' is-warn'}`;
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-live', 'polite');
  const icon = tone === 'ok' ? ICON.check : tone === 'error' ? ICON.alert : ICON.info;
  toast.innerHTML = `
    <span class="toast-ico">${icon}</span>
    <div class="toast-body"><strong>${tone === 'ok' ? 'All set' : tone === 'error' ? 'Something went wrong' : 'Heads up'}</strong><p>${message}</p></div>
    <button class="toast-close" type="button" aria-label="Dismiss notification">${ICON.close}</button>`;
  stack.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('is-in'));
  const dismiss = () => {
    toast.classList.remove('is-in');
    window.setTimeout(() => toast.remove(), 450);
  };
  toast.querySelector('.toast-close')?.addEventListener('click', dismiss);
  window.setTimeout(dismiss, 4600);
}

async function hashPassword(value) {
  if (window.crypto?.subtle && window.TextEncoder) {
    const buffer = await window.crypto.subtle.digest('SHA-256', new TextEncoder().encode(value));
    return Array.from(new Uint8Array(buffer)).map(byte => byte.toString(16).padStart(2, '0')).join('');
  }
  return btoa(unescape(encodeURIComponent(value)));
}

const USERS_KEY = 'stackly.bakeryUsers';
const SESSION_KEY = 'stackly.session';

function getUsers() {
  try { return JSON.parse(localStorage.getItem(USERS_KEY) || '[]'); } catch { return []; }
}

function saveUsers(users) {
  try { localStorage.setItem(USERS_KEY, JSON.stringify(users)); } catch { /* storage unavailable */ }
}

const DEMO_ACCOUNTS = [
  { name: 'Demo Bakery Admin', email: 'admin@stackly.demo', phone: '5551234567', role: 'admin' },
  { name: 'Demo Customer', email: 'customer@stackly.demo', phone: '5551234567', role: 'customer' }
];
const DEMO_PASSWORD = 'Demo1234';

async function seedDemoAccounts() {
  try {
    const users = getUsers();
    let changed = false;
    const passwordHash = await hashPassword(DEMO_PASSWORD);
    for (const account of DEMO_ACCOUNTS) {
      const existing = users.find(user => user.email === account.email);
      if (!existing) {
        users.push({ ...account, passwordHash, createdAt: new Date().toISOString() });
        changed = true;
      } else if (existing.passwordHash !== passwordHash) {
        existing.passwordHash = passwordHash;
        changed = true;
      }
    }
    if (changed) saveUsers(users);
  } catch { /* storage unavailable */ }
}

function setupForms() {
  $$('[data-validate]').forEach(input => {
    input.addEventListener('blur', () => validateInput(input));
    input.addEventListener('input', () => {
      if (input.getAttribute('aria-invalid') === 'true') validateInput(input);
    });
    input.addEventListener('change', () => {
      if (input.getAttribute('aria-invalid') === 'true') validateInput(input);
    });
  });

  $$('input[type="checkbox"][required]').forEach(input => {
    input.addEventListener('change', () => {
      if (input.checked && input.getAttribute('aria-invalid') === 'true') clearFieldError(input);
    });
  });

  const signup = $('#signup-form');
  if (signup) {
    signup.addEventListener('submit', async event => {
      event.preventDefault();
      if (!validateForm(signup)) return;
      const users = getUsers();
      const email = signup.querySelector('[name="email"]').value.trim().toLowerCase();
      if (users.some(user => user.email === email)) {
        showFieldError(signup.querySelector('[name="email"]'), 'An account with this email already exists.');
        return;
      }
      const submit = signup.querySelector('[type="submit"]');
      const original = submit.textContent;
      submit.disabled = true;
      submit.textContent = 'Creating account…';
      const user = {
        name: signup.querySelector('[name="name"]').value.trim(),
        email,
        phone: signup.querySelector('[name="phone"]').value.replace(/[\s-]/g, ''),
        role: signup.querySelector('[name="role"]')?.value || 'customer',
        passwordHash: await hashPassword(signup.querySelector('[name="password"]').value),
        createdAt: new Date().toISOString()
      };
      users.push(user);
      saveUsers(users);
      try { sessionStorage.setItem('stacklySignupEmail', email); } catch { /* storage unavailable */ }
      submit.disabled = false;
      submit.textContent = original;
      window.location.href = 'login.html';
    });
  }

  const login = $('#login-form');
  if (login) {
    login.addEventListener('submit', async event => {
      event.preventDefault();
      if (!validateForm(login)) return;
      const email = login.querySelector('[name="email"]').value.trim().toLowerCase();
      const password = login.querySelector('[name="password"]').value;
      const role = login.querySelector('[name="role"]')?.value;
      const user = getUsers().find(item => item.email === email);
      if (!user || user.passwordHash !== await hashPassword(password)) {
        showFieldError(login.querySelector('[name="password"]'), 'Email or password is not correct.');
        return;
      }
      if (role && user.role !== role) {
        showFieldError(login.querySelector('[name="role"]'), `Choose the ${user.role === 'admin' ? 'Admin' : 'Customer'} role to continue.`);
        return;
      }
      try {
        sessionStorage.setItem(SESSION_KEY, JSON.stringify({ name: user.name, email: user.email, role: user.role, signedInAt: Date.now() }));
      } catch { /* storage unavailable */ }
      window.location.href = user.role === 'admin' ? 'admin-dashboard.html' : 'customer-dashboard.html';
    });
    const prefill = (() => {
      try { return sessionStorage.getItem('stacklySignupEmail') || ''; } catch { return ''; }
    })();
    if (prefill) {
      const emailInput = login.querySelector('[name="email"]');
      if (emailInput && !emailInput.value) emailInput.value = prefill;
      try { sessionStorage.removeItem('stacklySignupEmail'); } catch { /* storage unavailable */ }
    }
  }

  const contact = $('#contact-form');
  if (contact) {
    contact.addEventListener('submit', event => {
      event.preventDefault();
      if (!validateForm(contact)) {
        showToast('Please fix the highlighted fields and try again.', 'error');
        return;
      }
      $('.form-success', contact.parentElement)?.classList.add('is-visible');
      showToast('Message received. Our bakers reply within one business day.', 'ok');
      contact.reset();
      $$('.custom-select', contact).forEach(select => resetSelect(select));
      $$('[data-validate]', contact).forEach(input => clearFieldError(input));
    });
  }

  const booking = $('#booking-form');
  if (booking) {
    booking.addEventListener('submit', event => {
      event.preventDefault();
      if (!validateForm(booking)) {
        showToast('Please fix the highlighted fields and try again.', 'error');
        return;
      }
      $('.form-success', booking.parentElement)?.classList.add('is-visible');
      showToast('Request received. We will confirm your table shortly.', 'ok');
      booking.reset();
      $$('.custom-select', booking).forEach(select => resetSelect(select));
      $$('[data-validate]', booking).forEach(input => clearFieldError(input));
    });
  }

  $$('.newsletter-form').forEach(form => {
    const input = $('[data-validate="email"]', form);
    const success = $('.newsletter-success', form);
    let hideTimer;
    let removeTimer;
    const hideSuccess = () => {
      clearTimeout(hideTimer);
      if (!success || !success.classList.contains('is-visible')) return;
      success.classList.add('is-leaving');
      clearTimeout(removeTimer);
      removeTimer = setTimeout(() => success.classList.remove('is-visible', 'is-leaving'), 320);
    };
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (!input || !validateInput(input)) return;
      clearTimeout(removeTimer);
      success?.classList.remove('is-leaving');
      success?.classList.add('is-visible');
      showToast('You are on the fresh-bake list. Welcome in.', 'ok');
      form.reset();
      clearFieldError(input);
      clearTimeout(hideTimer);
      hideTimer = setTimeout(hideSuccess, 3000);
    });
    input?.addEventListener('input', hideSuccess);
  });
}

const RETURN_STACK_KEY = 'stacklyReturnStack';
const SAME_TAB_KEY = 'stacklyReturnSameTab';
const RETURN_SCROLL_KEY = 'stacklyReturnScroll';
const RETURN_SECTION_KEY = 'stacklyReturnSection';

function currentPageFile() {
  return window.location.pathname.split('/').pop() || 'index.html';
}

function readReturnStack() {
  try {
    const parsed = JSON.parse(sessionStorage.getItem(RETURN_STACK_KEY) || '[]');
    return Array.isArray(parsed) ? parsed.filter(item => typeof item === 'string') : [];
  } catch { return []; }
}

function writeReturnStack(stack) {
  try { sessionStorage.setItem(RETURN_STACK_KEY, JSON.stringify(stack.slice(-12))); } catch { /* storage unavailable */ }
}

function pushReturnPage(file, sameTab = true) {
  const stack = readReturnStack().filter(item => item !== file);
  stack.push(file);
  writeReturnStack(stack);
  recordReturnScroll(file);
  try {
    if (sameTab) sessionStorage.setItem(SAME_TAB_KEY, file);
    else sessionStorage.removeItem(SAME_TAB_KEY);
  } catch { /* storage unavailable */ }
}

function recordReturnScroll(file) {
  try { sessionStorage.setItem(RETURN_SCROLL_KEY, JSON.stringify({ file, y: Math.round(window.scrollY) || 0 })); } catch { /* storage unavailable */ }
}

function restoreReturnScroll(file) {
  let saved = null;
  try {
    saved = JSON.parse(sessionStorage.getItem(RETURN_SCROLL_KEY) || 'null');
    sessionStorage.removeItem(RETURN_SCROLL_KEY);
  } catch { /* storage unavailable */ }
  if (!saved || saved.file !== file || !saved.y) return;
  const apply = () => window.scrollTo({ top: saved.y, behavior: 'instant' });
  requestAnimationFrame(() => requestAnimationFrame(apply));
  if (document.readyState !== 'complete') {
    window.addEventListener('load', () => requestAnimationFrame(apply), { once: true });
  }
}

function recordReturnSection(file, section) {
  if (!section) return;
  try { sessionStorage.setItem(RETURN_SECTION_KEY, JSON.stringify({ file, section })); } catch { /* storage unavailable */ }
}

function consumeReturnSection(file) {
  try {
    const saved = JSON.parse(sessionStorage.getItem(RETURN_SECTION_KEY) || 'null');
    if (!saved || saved.file !== file) return null;
    sessionStorage.removeItem(RETURN_SECTION_KEY);
    return saved.section;
  } catch { return null; }
}

function consumeSameTabReturn() {
  try {
    const file = sessionStorage.getItem(SAME_TAB_KEY) || null;
    sessionStorage.removeItem(SAME_TAB_KEY);
    return file;
  } catch { return null; }
}

function peekReturnPage() {
  const stack = readReturnStack();
  return stack.length ? stack[stack.length - 1] : null;
}

function popReturnPage() {
  const stack = readReturnStack();
  const file = stack.pop() || null;
  writeReturnStack(stack);
  return file;
}

function dashboardForRole() {
  try {
    const session = JSON.parse(sessionStorage.getItem(SESSION_KEY) || 'null');
    if (session?.role === 'admin') return 'admin-dashboard.html';
    if (session?.role === 'customer') return 'customer-dashboard.html';
  } catch { /* storage unavailable */ }
  return null;
}

function readSession() {
  try { return JSON.parse(sessionStorage.getItem(SESSION_KEY) || 'null'); } catch { return null; }
}

function isErrorPage(file) {
  return file === '404.html' || file === '404dash.html';
}

function isDashboardPage(file) {
  return file === 'admin-dashboard.html' || file === 'customer-dashboard.html';
}

function inSiteReferrer() {
  try {
    if (!document.referrer) return null;
    const url = new URL(document.referrer, window.location.href);
    if (url.origin !== window.location.origin) return null;
    const file = url.pathname.split('/').pop() || 'index.html';
    return isErrorPage(file) ? null : file;
  } catch { return null; }
}

function goBackOr(fallback) {
  const here = currentPageFile();
  const referrer = inSiteReferrer();
  const recorded = peekReturnPage();
  const usable = file => Boolean(file) && file !== here && !isErrorPage(file);
  const from = consumeSameTabReturn();
  const sameTab = Boolean(from) && (from === referrer || from === recorded);

  if (sameTab && window.history.length > 1) {
    if (peekReturnPage() === from) popReturnPage();
    window.history.back();
    return;
  }
  if (usable(referrer)) {
    if (peekReturnPage() === referrer) popReturnPage();
    if (window.history.length > 1) {
      window.history.back();
      return;
    }
    window.location.href = referrer;
    return;
  }
  if (usable(recorded)) {
    popReturnPage();
    window.location.href = recorded;
    return;
  }
  window.location.href = fallback || 'index.html';
}

const ADMIN_NAV = [
  ['Overview', [
    ['overview', 'Overview', 'sec-overview', 'M3 12h7V3H3zM14 21h7v-9h-7zM14 3v6h7V3zM3 21h7v-6H3z']]],
  ['Bakery', [
    ['orders', 'Orders', 'sec-orders', 'M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0', '6'],
    ['products', 'Products', 'sec-products', 'M12 2 2 7l10 5 10-5zM2 17l10 5 10-5M2 12l10 5 10-5']]],
  ['People', [
    ['customers', 'Customers', 'sec-customers', 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8'],
    ['reservations', 'Reservations', 'sec-reservations', 'M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z', '3']]],
  ['Insights', [
    ['reports', 'Reports', 'sec-reports', 'M3 3v18h18M7 15l4-5 3 3 5-7'],
    ['settings', 'Settings', 'sec-settings', 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z']]]
];

const CUSTOMER_NAV = [
  ['My bakery', [
    ['overview', 'Overview', 'sec-overview', 'M3 12h7V3H3zM14 21h7v-9h-7zM14 3v6h7V3zM3 21h7v-6H3z']]],
  ['Orders', [
    ['orders', 'My orders', 'sec-orders', 'M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0', '2'],
    ['favorites', 'Favorites', 'sec-favorites', 'M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1L12 21l7.7-7.6 1.1-1a5.5 5.5 0 0 0 0-7.8z']]],
  ['Rewards', [
    ['rewards', 'Rewards', 'sec-rewards', 'M12 2 15 9l7 .5-5.4 4.6L18.3 21 12 17.3 5.7 21l1.7-6.9L2 9.5 9 9z'],
    ['reservations', 'Reservations', 'sec-reservations', 'M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z']]],
  ['Account', [
    ['settings', 'Settings', 'sec-settings', 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z']]]
];

function renderDashboardChrome(session) {
  const navSlot = $('[data-dash-nav]');
  if (!navSlot) return;
  const groups = session.role === 'admin' ? ADMIN_NAV : CUSTOMER_NAV;
  navSlot.innerHTML = groups.map(([label, items]) => `
    <div class="dash-nav-label">${label}</div>
    ${items.map(([key, text, section, path, badge]) => `
      <a class="dash-link" href="#${section}" data-section="${section}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${path}"/></svg>
        <span>${text}</span>${badge ? `<span class="pill">${badge}</span>` : ''}
      </a>`).join('')}`).join('');
}

function setupDashboard() {
  const dash = $('[data-dashboard]');
  if (!dash) return;
  const session = readSession();
  if (!session || !session.role) {
    window.location.href = 'login.html';
    return;
  }
  const roleLabel = session.role === 'admin' ? 'Bakery admin' : 'Customer';
  $$('[data-user-name]').forEach(el => { el.textContent = session.name; });
  $$('[data-role-name]').forEach(el => { el.textContent = roleLabel; });
  $$('[data-user-initials]').forEach(el => {
    el.textContent = session.name.split(/\s+/).map(part => part[0]).join('').slice(0, 2).toUpperCase();
  });
  $$('[data-user-email]').forEach(el => { el.textContent = session.email || session.name; });
  $$('[data-logout]').forEach(button => button.addEventListener('click', () => {
    sessionStorage.removeItem(SESSION_KEY);
    window.location.href = 'login.html';
  }));

  renderDashboardChrome(session);

  const overlay = $('[data-sidebar-overlay]');
  const burger = $('[data-sidebar-toggle]');
  const closeSidebar = () => {
    dash.classList.remove('is-side-open');
    body.classList.remove('is-locked');
  };
  burger?.addEventListener('click', () => {
    dash.classList.add('is-side-open');
    body.classList.add('is-locked');
  });
  $('[data-sidebar-close]')?.addEventListener('click', closeSidebar);
  overlay?.addEventListener('click', closeSidebar);
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && dash.classList.contains('is-side-open')) closeSidebar();
  });

  const navLinks = $$('.dash-link[href^="#"]', dash);
  const targets = navLinks
    .map(link => ({ link, section: document.querySelector(link.getAttribute('href') || '') }))
    .filter(item => item.section);
  const showSection = section => {
    $$('.dash-section', dash).forEach(item => item.classList.toggle('is-active', item === section));
  };
  const setActive = active => {
    targets.forEach(item => {
      const on = item === active;
      item.link.classList.toggle('is-active', on);
      if (on) item.link.setAttribute('aria-current', 'page');
      else item.link.removeAttribute('aria-current');
    });
  };
  const open = item => {
    showSection(item.section);
    setActive(item);
    closeSidebar();
    if (window.scrollY > 0) window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
  };
  targets.forEach(item => {
    item.link.addEventListener('click', event => {
      event.preventDefault();
      open(item);
    });
  });
  if (targets.length) {
    const fromHash = targets.find(item => '#' + item.section.id === window.location.hash);
    const savedId = fromHash ? null : consumeReturnSection(currentPageFile());
    const saved = savedId ? targets.find(item => item.section.id === savedId) : null;
    const initial = fromHash || saved || targets[0];
    showSection(initial.section);
    setActive(initial);
  }

  const activeSectionId = () => {
    const active = targets.find(item => item.link.classList.contains('is-active'));
    return active ? active.section.id : '';
  };
  $$('[data-dashboard-demo]').forEach(item => item.addEventListener('click', event => {
    event.preventDefault();
    pushReturnPage(currentPageFile());
    recordReturnSection(currentPageFile(), activeSectionId());
    window.location.href = '404dash.html';
  }));
}

function setupErrorPage() {
  const errorPage = $('[data-error-page]');
  if (!errorPage) return;
  const fallback = page === '404dash' ? (dashboardForRole() || 'login.html') : 'index.html';
  $$('[data-go-back]').forEach(button => button.addEventListener('click', () => goBackOr(fallback)));
  const dashLink = $('[data-dashboard-return]');
  if (dashLink) dashLink.href = dashboardForRole() || 'login.html';
  const form = $('[data-error-search]');
  if (form) {
    form.addEventListener('submit', event => {
      event.preventDefault();
      const input = $('input', form);
      if (!input || !input.value.trim()) return;
      pushReturnPage(currentPageFile());
      window.location.href = '404.html';
    });
  }
}

function setupGoBackButtons() {
  if ($('[data-error-page]')) return;
  $$('[data-go-back]').forEach(button => button.addEventListener('click', () => goBackOr('index.html')));
}

function setupReturnTracking() {
  const here = currentPageFile();
  if (isErrorPage(here)) return;
  consumeSameTabReturn();
  restoreReturnScroll(here);
  document.addEventListener('click', event => {
    if (event.defaultPrevented || event.button !== 0) return;
    const link = event.target instanceof Element ? event.target.closest('a[href]') : null;
    if (!link || (link.target && link.target !== '_self')) return;
    let file = null;
    try { file = new URL(link.href, window.location.href).pathname.split('/').pop() || 'index.html'; } catch { return; }
    if (!isErrorPage(file)) return;
    const sameTab = !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey;
    pushReturnPage(currentPageFile(), sameTab);
  }, true);
}

const PUBLIC_PAGES = ['home', 'menu', 'services', 'gallery', 'about', 'contact'];
const DASHBOARD_PAGES = ['admin', 'customer'];
const KEEP_CLICKABLE = [
  '.menu-toggle', '.drawer-close', '[data-drawer-close]', '[data-drawer-backdrop]',
  '.skip-link', '.select-trigger', '.select-option', '[data-filter-button]',
  '[data-date-picker]',
  '[data-modal-open]', '[data-modal-close]', '[data-go-back]', '[data-safe]',
  '[data-gallery-prev]', '[data-gallery-next]', '.product-fav',
  '.site-header a', '.site-header button', '.mobile-drawer a', '.mobile-drawer button',
  '.site-footer a', '.site-footer button', '.toast-close',
  '.auth-top a', '.auth-alt a', '.auth-alt button', '.brand',
  '.dash-signout', '[data-logout]', '[data-sidebar-toggle]', '[data-sidebar-close]',
  '[data-sidebar-overlay]', '[data-dashboard-return]'
].join(', ');

function setupDemoRouting() {
  const publicMode = PUBLIC_PAGES.includes(page);
  const dashMode = DASHBOARD_PAGES.includes(page);
  if (!publicMode && !dashMode) return;
  const destination = dashMode ? '404dash.html' : '404.html';
  document.addEventListener('click', event => {
    if (!(event.target instanceof Element)) return;
    const target = event.target.closest('a, button');
    if (!target || target.closest(KEEP_CLICKABLE)) return;
    if (target.matches('a[href^="#"]')) return;
    if (dashMode && target.matches('.dash-link')) return;
    if (!publicMode && target.matches('a[href="login.html"], a[href="signup.html"], a[href="index.html"]')) return;
    const form = target.closest('form');
    if (form && target.matches('button[type="submit"], input[type="submit"]')) return;
    event.preventDefault();
    pushReturnPage(currentPageFile());
    window.location.href = destination;
  });
}

function setupModals() {
  let openModal = null;
  let galleryIndex = 0;
  const items = $$('.gallery-item[data-gallery]');
  const captionTitle = $('[data-gallery-title]');
  const captionText = $('[data-gallery-text]');
  const modalImage = $('[data-gallery-image]');

  const paint = index => {
    if (!items.length) return;
    galleryIndex = (index + items.length) % items.length;
    const item = items[galleryIndex];
    const img = $('img', item);
    if (modalImage && img) {
      modalImage.src = img.currentSrc || img.src;
      modalImage.alt = img.alt;
    }
    if (captionTitle) captionTitle.textContent = item.dataset.galleryTitle || img?.alt || 'Stackly Bakery';
    if (captionText) captionText.textContent = item.dataset.galleryText || '';
  };

  const closeModal = modal => {
    if (!modal) return;
    modal.classList.remove('is-open');
    window.setTimeout(() => { modal.hidden = true; }, 380);
    $('.modal-backdrop')?.classList.remove('is-open');
    body.classList.remove('is-locked');
    openModal = null;
  };

  const openAt = item => {
    const modal = document.getElementById(item.dataset.modalOpen);
    if (!modal) return;
    galleryIndex = items.indexOf(item);
    paint(galleryIndex);
    modal.hidden = false;
    $('.modal-backdrop')?.classList.add('is-open');
    requestAnimationFrame(() => modal.classList.add('is-open'));
    body.classList.add('is-locked');
    openModal = modal;
    $('[data-modal-close]', modal)?.focus();
  };

  $$('[data-modal-open]').forEach(trigger => trigger.addEventListener('click', () => {
    if (trigger.classList.contains('gallery-item')) openAt(trigger);
    else {
      const modal = document.getElementById(trigger.dataset.modalOpen);
      if (!modal) return;
      modal.hidden = false;
      $('.modal-backdrop')?.classList.add('is-open');
      requestAnimationFrame(() => modal.classList.add('is-open'));
      body.classList.add('is-locked');
      openModal = modal;
      $('[data-modal-close]', modal)?.focus();
    }
  }));

  $('[data-gallery-prev]')?.addEventListener('click', () => paint(galleryIndex - 1));
  $('[data-gallery-next]')?.addEventListener('click', () => paint(galleryIndex + 1));
  $$('[data-modal-close]').forEach(item => item.addEventListener('click', () => closeModal(item.closest('.modal') || openModal)));
  $('.modal-backdrop')?.addEventListener('click', () => closeModal(openModal));
  document.addEventListener('keydown', event => {
    if (!openModal) return;
    if (event.key === 'Escape') closeModal(openModal);
    if (openModal.dataset.gallery === 'true') {
      if (event.key === 'ArrowLeft') paint(galleryIndex - 1);
      if (event.key === 'ArrowRight') paint(galleryIndex + 1);
    }
    if (event.key === 'Tab') {
      const focusable = $$('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])', openModal).filter(item => !item.disabled);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });
}

function setupMagneticElements() {
  if (reducedMotion || !window.matchMedia('(hover: hover)').matches) return;
  $$('.button, .cat-card, .feature-card').forEach(element => {
    element.addEventListener('pointermove', event => {
      const rect = element.getBoundingClientRect();
      const x = (event.clientX - rect.left - rect.width / 2) * .06;
      const y = (event.clientY - rect.top - rect.height / 2) * .06;
      element.style.setProperty('--mag-x', `${x}px`);
      element.style.setProperty('--mag-y', `${y}px`);
    });
    element.addEventListener('pointerleave', () => {
      element.style.removeProperty('--mag-x');
      element.style.removeProperty('--mag-y');
    });
  });
}

function setupParallax() {
  if (reducedMotion) return;
  const items = $$('[data-parallax]');
  if (!items.length) return;
  let frame = false;
  const paint = () => {
    const viewport = window.innerHeight;
    items.forEach(item => {
      const rect = item.getBoundingClientRect();
      const amount = (rect.top + rect.height / 2 - viewport / 2) * Number(item.dataset.parallax || -0.04);
      item.style.setProperty('--parallax-y', `${amount}px`);
      item.style.transform = `translate3d(0, ${amount}px, 0)`;
    });
    frame = false;
  };
  window.addEventListener('scroll', () => {
    if (frame) return;
    frame = true;
    requestAnimationFrame(paint);
  }, { passive: true });
  paint();
}

function boot() {
  renderPublicChrome();
  seedDemoAccounts();
  body.classList.add('page-transition');
  body.addEventListener('animationend', event => {
    if (event.target === body && event.animationName === 'blurIn') body.classList.remove('page-transition');
  });
  setupHeader();
  setupScrollProgress();
  setupCursorGlow();
  setupReveals();
  setupCounters();
  setupMeters();
  setupTaglineRotator();
  setupFilters();
  setupFavorites();
  setupSort();
  setupDropdowns();
  setupDatePickers();
  setupPasswordToggles();
  setupRoleCards();
  setupRoleSwitches();
  setupForms();
  setupDashboard();
  setupErrorPage();
  setupGoBackButtons();
  setupReturnTracking();
  setupDemoRouting();
  setupModals();
  setupMagneticElements();
  setupParallax();
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();
