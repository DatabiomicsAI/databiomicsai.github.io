(() => {
  const STORAGE_KEY = 'databiomics-visitor-countries-v1';
  const EMPTY_TEXT = 'Sem dados por país ainda.';

  const safeParse = (value) => {
    try {
      const parsed = JSON.parse(value);
      return parsed && typeof parsed === 'object' ? parsed : {};
    } catch (_error) {
      return {};
    }
  };

  const countryCodeToFlag = (code) => {
    if (!code || code.length !== 2) return '🌍';
    return code
      .toUpperCase()
      .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));
  };

  const loadMap = () => safeParse(localStorage.getItem(STORAGE_KEY));

  const saveMap = (map) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  };

  const render = (widget, countriesMap) => {
    const totalEl = widget.querySelector('[data-total-visits]');
    const brazilCounterEl = widget.querySelector('[data-brazil-counter]');
    const otherCountriesStripEl = widget.querySelector('[data-other-countries-strip]');
    if (!brazilCounterEl || !otherCountriesStripEl) return;

    const rows = Object.entries(countriesMap)
      .map(([code, data]) => ({
        code,
        name: typeof data?.name === 'string' ? data.name : code,
        count: Number(data?.count || 0)
      }))
      .filter((row) => row.count > 0)
      .sort((a, b) => b.count - a.count);

    const totalVisits = rows.reduce((sum, row) => sum + Number(row.count || 0), 0);
    if (totalEl) totalEl.textContent = `Total de visitas: ${totalVisits}`;

    const brazilRow = rows.find((row) => row.code === 'BR');
    const otherRows = rows.filter((row) => row.code !== 'BR');
    brazilCounterEl.textContent = `${Number(brazilRow?.count || 0)}`;

    if (!rows.length) {
      otherCountriesStripEl.innerHTML = `<span class="country-flag-empty">${EMPTY_TEXT}</span>`;
      return;
    }

    if (!otherRows.length) {
      otherCountriesStripEl.innerHTML = `<span class="country-flag-empty">${EMPTY_TEXT}</span>`;
    } else {
      otherCountriesStripEl.innerHTML = otherRows.slice(0, 20)
        .map((row) => `<span class="country-flag-chip" title="${row.name}: ${row.count}">
          <img src="https://flagcdn.com/48x36/${String(row.code || '').toLowerCase()}.png" alt="Bandeira de ${row.name}" loading="lazy">
          <span class="country-flag-fallback" aria-hidden="true" hidden>${countryCodeToFlag(row.code)}</span>
          <strong class="country-flag-count">${row.count}</strong>
        </span>`)
        .join('');

      otherCountriesStripEl.querySelectorAll('.country-flag-chip img').forEach((imgEl) => {
        const chip = imgEl.closest('.country-flag-chip');
        const fallback = chip && chip.querySelector('.country-flag-fallback');
        if (!chip || !fallback) return;
        imgEl.addEventListener('error', () => {
          imgEl.hidden = true;
          fallback.hidden = false;
        });
        imgEl.addEventListener('load', () => {
          fallback.hidden = true;
        });
      });
    }
  };

  const fetchVisitorCountry = async () => {
    const endpoints = [
      'https://ipwho.is/?fields=success,country,country_code',
      'https://ipapi.co/json/'
    ];

    for (const url of endpoints) {
      try {
        const response = await fetch(url, { cache: 'no-store' });
        if (!response.ok) continue;
        const data = await response.json();

        if (url.includes('ipwho.is') && data?.success && data?.country_code) {
          return {
            code: String(data.country_code).toUpperCase(),
            name: data.country || String(data.country_code).toUpperCase()
          };
        }

        if (url.includes('ipapi.co') && data?.country_code) {
          return {
            code: String(data.country_code).toUpperCase(),
            name: data.country_name || String(data.country_code).toUpperCase()
          };
        }
      } catch (_error) {
        // tenta próximo endpoint
      }
    }

    return null;
  };

  const boot = async () => {
    const widgets = Array.from(document.querySelectorAll('[data-visitor-widget]'));
    if (!widgets.length) return;

    const countriesMap = loadMap();

    widgets.forEach((widget) => {
      render(widget, countriesMap);
    });

    const visitor = await fetchVisitorCountry();
    if (!visitor?.code) return;

    const current = countriesMap[visitor.code] || { name: visitor.name, count: 0 };
    countriesMap[visitor.code] = {
      name: visitor.name || current.name,
      count: Number(current.count || 0) + 1
    };

    saveMap(countriesMap);
    widgets.forEach((widget) => render(widget, countriesMap));
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
    return;
  }
  boot();
})();
