(function(){
  const docEl = document.documentElement;
  const body = document.body;

  function clearInlineBackgrounds(){
    if (docEl) docEl.style.background = '';
    if (body) body.style.background = '';
    ['.plan--second','.plan--third','.plan--fourth','.plan--fifth']
      .forEach(sel => document.querySelectorAll(sel)
        .forEach(el => { el.style.backgroundImage = ''; }));
  }

  function applyTheme(theme) {
    const t = 'light';
    if (t === 'dark') {
      docEl.classList.add('dark');
      body && body.classList && body.classList.add('dark');
      // Night mode: ensure sun icon is visible to allow switching back, and hide moon
      try {
        const sun = document.getElementById('sun-icon');
        const moon = document.getElementById('moon-icon');
        if (sun) { sun.style.display = ''; sun.setAttribute('aria-hidden','false'); }
        if (moon) { moon.style.display = 'none'; moon.setAttribute('aria-hidden','true'); }
      } catch(_) {}
    } else {
      docEl.classList.remove('dark');
      body && body.classList && body.classList.remove('dark');
    }
    try { docEl.setAttribute('data-theme', t); } catch(_) {}
    // Always defer to CSS for visuals
    clearInlineBackgrounds();
  }

  function setTheme(theme) {
    localStorage.setItem('theme', 'light');
    try { localStorage.setItem('nuxt-color-mode', 'light'); } catch(_) {}
    try { docEl.setAttribute('data-theme', 'light'); } catch(_) {}
    applyTheme('light');
  }

  function onClickToggle(e){
    const t = e.target;
    if (!t || !t.closest) return;
    // Support multiple possible toggles used in the site
    const el = t.closest('[data-theme], [data-theme-toggle], #sun-icon, #moon-icon, .theme-toggle, .toggle-theme, .dark-mode-toggle, .light-mode-toggle, [aria-label*="theme" i], [aria-label*="thème" i]');
    if (!el) return;

    // If explicit data-theme present
    const desired = el.getAttribute && el.getAttribute('data-theme');
    if (desired === 'light' || desired === 'dark') {
      e.stopPropagation();
      e.preventDefault();
      setTheme(desired);
      return;
    }

    // Sun/Moon icons or generic toggle buttons
    if (el.id === 'sun-icon' || el.classList.contains('light-mode-toggle')) {
      e.stopPropagation(); e.preventDefault(); setTheme('light'); return;
    }
    if (el.id === 'moon-icon' || el.classList.contains('dark-mode-toggle')) {
      e.stopPropagation(); e.preventDefault(); setTheme('dark'); return;
    }

    // aria-label contains theme/thème -> toggle
    if ((el.getAttribute('aria-label') || '').toLowerCase().includes('theme') || (el.getAttribute('aria-label') || '').toLowerCase().includes('thème')) {
      e.stopPropagation(); e.preventDefault();
      const current = localStorage.getItem('theme') || 'light';
      setTheme(current === 'dark' ? 'light' : 'dark');
      return;
    }

    // Fallback for .theme-toggle / .toggle-theme elements
    if (el.classList.contains('theme-toggle') || el.classList.contains('toggle-theme')) {
      e.stopPropagation(); e.preventDefault();
      const current = localStorage.getItem('theme') || 'light';
      setTheme(current === 'dark' ? 'light' : 'dark');
    }
  }

  // Init ASAP (prefer light by default)
  applyTheme();

  // Ensure after hydration too
  document.addEventListener('DOMContentLoaded', function(){
    applyTheme();
    // Attach listeners to common controls if present
    const sunBtn = document.getElementById('sun-icon');
    const moonBtn = document.getElementById('moon-icon');
    if (sunBtn) sunBtn.addEventListener('click', function(ev){ ev.stopPropagation(); setTheme('light'); });
    if (moonBtn) moonBtn.addEventListener('click', function(ev){ ev.stopPropagation(); setTheme('dark'); });
    // Generic toggler if present
    const toggler = document.querySelector('[data-theme-toggle], .theme-toggle, .toggle-theme');
    if (toggler) toggler.addEventListener('click', function(ev){ ev.stopPropagation(); const cur = localStorage.getItem('theme') || 'light'; setTheme(cur === 'dark' ? 'light' : 'dark'); });
  });

  // Global delegation (covers dynamic buttons)
  document.addEventListener('click', onClickToggle, true);

  // Observe class changes to keep light if requested
  const mo = new MutationObserver(() => {
    const pref = localStorage.getItem('theme') || 'light';
    // ensure class matches preference, but do not set inline styles
    if (pref === 'light' && docEl.classList.contains('dark')) {
      docEl.classList.remove('dark');
      body && body.classList && body.classList.remove('dark');
    }
    if (pref === 'dark' && !docEl.classList.contains('dark')) {
      docEl.classList.add('dark');
      body && body.classList && body.classList.add('dark');
    }
    clearInlineBackgrounds();
  });
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  // Expose helpers for manual wiring if needed
  try { window.setTheme = setTheme; } catch(_) {}
})();
