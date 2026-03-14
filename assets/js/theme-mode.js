(() => {
  const STORAGE_KEY = 'siteThemeMode';
  const root = document.documentElement;

  const validModes = new Set(['auto', 'light', 'dark', 'colorblind']);

  const applyMode = (mode) => {
    const selected = validModes.has(mode) ? mode : 'auto';
    root.setAttribute('data-theme', selected);
    localStorage.setItem(STORAGE_KEY, selected);

    document.querySelectorAll('.theme-mode-btn').forEach((btn) => {
      btn.classList.toggle('is-active', btn.dataset.themeMode === selected);
    });
  };

  const stored = localStorage.getItem(STORAGE_KEY) || root.getAttribute('data-theme') || 'auto';
  applyMode(stored);

  document.querySelectorAll('.theme-mode-btn').forEach((btn) => {
    btn.addEventListener('click', () => applyMode(btn.dataset.themeMode));
  });
})();
