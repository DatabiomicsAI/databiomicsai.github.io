(() => {
  'use strict';

  const COUNT_BASE = 'https://countapi.mileshilliard.com/api/v1';
  const COUNT_PREFIX = 'databiomics-ods-no-campo-2026-v1';
  const BRAZIL_GEOJSON = 'https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/brazil-states.geojson';
  const RJ_GEOJSON = 'https://raw.githubusercontent.com/tbrugz/geodata-br/master/geojson/geojs-33-mun.json';

  const stateNames = {
    AC: 'Acre', AL: 'Alagoas', AP: 'Amapá', AM: 'Amazonas', BA: 'Bahia', CE: 'Ceará', DF: 'Distrito Federal',
    ES: 'Espírito Santo', GO: 'Goiás', MA: 'Maranhão', MT: 'Mato Grosso', MS: 'Mato Grosso do Sul', MG: 'Minas Gerais',
    PA: 'Pará', PB: 'Paraíba', PR: 'Paraná', PE: 'Pernambuco', PI: 'Piauí', RJ: 'Rio de Janeiro', RN: 'Rio Grande do Norte',
    RS: 'Rio Grande do Sul', RO: 'Rondônia', RR: 'Roraima', SC: 'Santa Catarina', SP: 'São Paulo', SE: 'Sergipe', TO: 'Tocantins'
  };
  const stateCodeByName = Object.fromEntries(Object.entries(stateNames).map(([code, name]) => [normalize(name), code]));

  const copy = {
    pt: {
      kicker: 'Alcance da ação extensionista',
      title: 'De onde vêm as visitas a esta página?',
      intro: 'O painel apresenta um contador geral e, somente com autorização do visitante, registra cidade, estado e país de forma aproximada e agregada. O objetivo é avaliar o alcance territorial da ação, sem identificar pessoas.',
      total: 'visitas contabilizadas',
      states: 'estados representados',
      cities: 'municípios do RJ representados',
      current: 'localidade desta visita',
      unknown: 'não informada',
      consentTitle: 'Autorizar o registro da localização aproximada?',
      consentText: 'Ao autorizar, um serviço de geolocalização por IP estima cidade, estado e país. O site não armazena endereço completo, coordenadas exatas ou o número do IP; apenas incrementa contadores públicos agregados por localidade. A estimativa pode conter imprecisões.',
      accept: 'Autorizar e registrar',
      decline: 'Continuar sem localização',
      change: 'Alterar preferência',
      loading: 'Carregando o contador e os mapas de visitas…',
      mapBrazil: 'Brasil — visitas por estado',
      mapBrazilText: 'Clique ou toque em um estado para ver o número de visitas registradas.',
      mapRio: 'Estado do Rio de Janeiro — visitas por município',
      mapRioText: 'Clique ou toque em um município para consultar a contagem agregada.',
      ranking: 'Municípios do Rio de Janeiro com visitas registradas',
      rankingText: 'A lista considera apenas visitas que autorizaram o uso da localização aproximada.',
      noCities: 'Ainda não há municípios com visitas geográficas autorizadas.',
      visits: 'visitas',
      visit: 'visita',
      locationRegistered: 'Localização aproximada registrada: {city}, {state}, {country}.',
      locationDeclined: 'A localização aproximada não será registrada. O contador geral continuará funcionando.',
      locationError: 'Não foi possível estimar a localização desta visita. O contador geral permanece disponível.',
      mapError: 'O contador foi carregado, mas um dos mapas não pôde ser exibido neste momento.',
      indicative: 'Indicador de alcance, não estatística oficial',
      note: 'As contagens são indicativas e podem sofrer bloqueios, repetições ou limitações técnicas. Os limites geográficos são carregados de bases abertas. Para relatórios oficiais, recomenda-se usar uma plataforma analítica própria com controle de qualidade e governança de dados.',
      thanksTitle: 'Obrigado por visitar e participar do ODS no Campo!',
      thanksText: 'Sua visita amplia o alcance desta ação extensionista. Ao conhecer, compartilhar ou responder à escuta, você ajuda a aproximar universidade, ciência, comunidade, setor produtivo e desenvolvimento sustentável em Itaperuna e no Noroeste Fluminense.',
      language: 'Idioma da página',
      brazil: 'Brasil',
      rio: 'Rio de Janeiro',
      cityLabel: 'Município',
      stateLabel: 'Estado',
      countLabel: 'Visitas registradas',
      mapsReady: 'Mapas atualizados com as contagens disponíveis.',
      consentRequired: 'Autorize a localização aproximada para incluir esta cidade nos indicadores.'
    },
    en: {
      kicker: 'Extension project reach',
      title: 'Where are the visitors to this page from?',
      intro: 'This dashboard shows a general visit counter and, only with the visitor’s permission, records an approximate city, state and country in aggregate form. Its purpose is to assess the territorial reach of the project without identifying individuals.',
      total: 'visits counted',
      states: 'Brazilian states represented',
      cities: 'Rio de Janeiro municipalities represented',
      current: 'location of this visit',
      unknown: 'not provided',
      consentTitle: 'Allow approximate location counting?',
      consentText: 'When authorised, an IP geolocation service estimates city, state and country. The website does not store a full address, exact coordinates or the IP number; it only increments public aggregate counters by location. The estimate may be inaccurate.',
      accept: 'Allow and register',
      decline: 'Continue without location',
      change: 'Change preference',
      loading: 'Loading visit counter and maps…',
      mapBrazil: 'Brazil — visits by state',
      mapBrazilText: 'Click or tap a state to view the number of recorded visits.',
      mapRio: 'State of Rio de Janeiro — visits by municipality',
      mapRioText: 'Click or tap a municipality to view its aggregate count.',
      ranking: 'Rio de Janeiro municipalities with recorded visits',
      rankingText: 'The list includes only visits that authorised approximate location use.',
      noCities: 'No municipality has authorised geographic visits yet.',
      visits: 'visits',
      visit: 'visit',
      locationRegistered: 'Approximate location registered: {city}, {state}, {country}.',
      locationDeclined: 'Approximate location will not be recorded. The general counter will continue to work.',
      locationError: 'The location of this visit could not be estimated. The general counter remains available.',
      mapError: 'The counter loaded, but one of the maps could not be displayed at this time.',
      indicative: 'Reach indicator, not an official statistic',
      note: 'Counts are indicative and may be affected by blocking, repeated visits or technical limitations. Geographic boundaries are loaded from open datasets. An owned analytics platform with data governance and quality control is recommended for official reporting.',
      thanksTitle: 'Thank you for visiting and taking part in ODS no Campo!',
      thanksText: 'Your visit expands the reach of this extension project. By learning, sharing or answering the survey, you help connect university, science, community, the productive sector and sustainable development in Itaperuna and Northwestern Rio de Janeiro.',
      language: 'Page language',
      brazil: 'Brazil',
      rio: 'Rio de Janeiro',
      cityLabel: 'Municipality',
      stateLabel: 'State',
      countLabel: 'Recorded visits',
      mapsReady: 'Maps updated with the available counts.',
      consentRequired: 'Allow approximate location to include this city in the indicators.'
    }
  };

  let currentLang = normalizeLang(localStorage.getItem('siteLang') || 'pt');
  let brazilMap = null;
  let rioMap = null;
  let brazilLayer = null;
  let rioLayer = null;
  let brazilGeo = null;
  let rioGeo = null;
  let stateCounts = {};
  let cityCounts = {};
  let currentLocation = null;
  let mapSection = null;

  function normalize(value) {
    return String(value || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }

  function normalizeLang(value) {
    return String(value || '').toLowerCase().startsWith('en') ? 'en' : 'pt';
  }

  function t(key) {
    return (copy[currentLang] || copy.pt)[key] || copy.pt[key] || key;
  }

  function formatCount(value) {
    return Number(value || 0).toLocaleString(currentLang === 'en' ? 'en-US' : 'pt-BR');
  }

  function featureName(feature) {
    const p = feature?.properties || {};
    let value = p.name || p.nome || p.NOME || p.NM_MUN || p.NM_MUNICIP || p.NM_MUNICIPIO || p.description || p.DESCRIPTION || p.municipio || p.MUNICIPIO || p.id || feature?.id || '';
    value = String(value).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    value = value.replace(/\s*[-–]\s*RJ$/i, '').trim();
    return value;
  }

  function stateCode(feature) {
    const p = feature?.properties || {};
    const direct = String(p.sigla || p.uf || p.UF || p.abbrev || p.code || '').toUpperCase();
    if (stateNames[direct]) return direct;
    return stateCodeByName[normalize(featureName(feature))] || '';
  }

  function countKey(kind, value, state = '') {
    if (kind === 'total') return `${COUNT_PREFIX}-total`;
    if (kind === 'state') return `${COUNT_PREFIX}-state-${normalize(value)}`;
    if (kind === 'city') return `${COUNT_PREFIX}-city-${normalize(state)}-${normalize(value)}`;
    if (kind === 'country') return `${COUNT_PREFIX}-country-${normalize(value)}`;
    return `${COUNT_PREFIX}-${kind}-${normalize(value)}`;
  }

  async function getCount(key) {
    try {
      const response = await fetch(`${COUNT_BASE}/get/${encodeURIComponent(key)}`, { cache: 'no-store' });
      if (!response.ok) return 0;
      const data = await response.json();
      return Number(data.value || 0);
    } catch (_error) {
      return 0;
    }
  }

  async function hitCount(key) {
    try {
      const response = await fetch(`${COUNT_BASE}/hit/${encodeURIComponent(key)}`, { cache: 'no-store' });
      if (!response.ok) return getCount(key);
      const data = await response.json();
      return Number(data.value || 0);
    } catch (_error) {
      return getCount(key);
    }
  }

  async function countTotalVisit() {
    const storageKey = `${COUNT_PREFIX}-session-total`;
    if (sessionStorage.getItem(storageKey)) return getCount(countKey('total'));
    const value = await hitCount(countKey('total'));
    sessionStorage.setItem(storageKey, '1');
    return value;
  }

  async function mapLimit(items, limit, worker) {
    const results = new Array(items.length);
    let next = 0;
    async function runner() {
      while (next < items.length) {
        const index = next++;
        try {
          results[index] = await worker(items[index], index);
        } catch (_error) {
          results[index] = null;
        }
      }
    }
    await Promise.all(Array.from({ length: Math.min(limit, items.length) }, runner));
    return results;
  }

  function colorForCount(value) {
    const count = Number(value || 0);
    if (count >= 20) return '#07572f';
    if (count >= 10) return '#168044';
    if (count >= 5) return '#3da55d';
    if (count >= 2) return '#79c56f';
    if (count >= 1) return '#b9df9f';
    return '#e8efe6';
  }

  function addLegend(element) {
    element.innerHTML = `
      <span><i style="background:#e8efe6"></i>0</span>
      <span><i style="background:#b9df9f"></i>1</span>
      <span><i style="background:#79c56f"></i>2–4</span>
      <span><i style="background:#3da55d"></i>5–9</span>
      <span><i style="background:#168044"></i>10–19</span>
      <span><i style="background:#07572f"></i>20+</span>`;
  }

  function updateText() {
    if (!mapSection) return;
    mapSection.querySelectorAll('[data-map-key]').forEach((element) => {
      const key = element.getAttribute('data-map-key');
      element.textContent = t(key);
    });
    mapSection.querySelectorAll('.ods-visitors-lang button').forEach((button) => {
      button.classList.toggle('is-active', normalizeLang(button.dataset.lang) === currentLang);
    });
    const locationMetric = mapSection.querySelector('#ods-current-location');
    if (locationMetric) {
      locationMetric.textContent = currentLocation
        ? [currentLocation.city, currentLocation.regionCode || currentLocation.region, currentLocation.countryCode].filter(Boolean).join(' · ')
        : t('unknown');
    }
    const status = mapSection.querySelector('#ods-map-status');
    if (status && status.dataset.statusKey) status.textContent = interpolate(t(status.dataset.statusKey), currentLocation || {});
    renderRanking();
    renderMaps();
  }

  function interpolate(text, data) {
    return String(text || '').replace(/\{(\w+)\}/g, (_match, key) => data[key] || '');
  }

  function setStatus(key, data = {}) {
    const status = mapSection?.querySelector('#ods-map-status');
    if (!status) return;
    status.dataset.statusKey = key;
    status.textContent = interpolate(t(key), data);
  }

  function updateMetrics(total) {
    const totalElement = mapSection?.querySelector('#ods-total-visits');
    const statesElement = mapSection?.querySelector('#ods-states-count');
    const citiesElement = mapSection?.querySelector('#ods-cities-count');
    if (totalElement && total !== undefined) totalElement.textContent = formatCount(total);
    if (statesElement) statesElement.textContent = formatCount(Object.values(stateCounts).filter((value) => value > 0).length);
    if (citiesElement) citiesElement.textContent = formatCount(Object.values(cityCounts).filter((value) => value > 0).length);
  }

  function renderRanking() {
    const list = mapSection?.querySelector('#ods-city-list');
    if (!list) return;
    const rows = Object.entries(cityCounts)
      .filter(([, value]) => Number(value) > 0)
      .sort((a, b) => Number(b[1]) - Number(a[1]))
      .slice(0, 16);
    if (!rows.length) {
      list.innerHTML = `<li><span>${t('noCities')}</span><strong>0</strong></li>`;
      return;
    }
    list.innerHTML = rows.map(([city, value]) => {
      const noun = Number(value) === 1 ? t('visit') : t('visits');
      return `<li><span>${city}</span><strong>${formatCount(value)} ${noun}</strong></li>`;
    }).join('');
  }

  async function ensureLeaflet() {
    if (window.L) return;
    if (!document.querySelector('link[data-leaflet-css]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      link.setAttribute('data-leaflet-css', 'true');
      document.head.appendChild(link);
    }
    await new Promise((resolve, reject) => {
      const existing = document.querySelector('script[data-leaflet-js]');
      if (existing) {
        if (window.L) resolve();
        else existing.addEventListener('load', resolve, { once: true });
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.setAttribute('data-leaflet-js', 'true');
      script.addEventListener('load', resolve, { once: true });
      script.addEventListener('error', reject, { once: true });
      document.head.appendChild(script);
    });
  }

  function initializeMaps() {
    if (!window.L || !mapSection) return;
    if (!brazilMap) {
      brazilMap = L.map('ods-map-brazil', { scrollWheelZoom: false, zoomControl: true, attributionControl: true });
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(brazilMap);
    }
    if (!rioMap) {
      rioMap = L.map('ods-map-rio', { scrollWheelZoom: false, zoomControl: true, attributionControl: true });
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(rioMap);
    }
  }

  function renderMaps() {
    if (!window.L || !brazilMap || !rioMap) return;
    if (brazilLayer) brazilLayer.remove();
    if (rioLayer) rioLayer.remove();

    if (brazilGeo) {
      brazilLayer = L.geoJSON(brazilGeo, {
        style(feature) {
          const code = stateCode(feature);
          return { color: '#ffffff', weight: 1.2, fillColor: colorForCount(stateCounts[code]), fillOpacity: .85 };
        },
        onEachFeature(feature, layer) {
          const code = stateCode(feature);
          const name = featureName(feature) || stateNames[code] || code;
          const value = Number(stateCounts[code] || 0);
          layer.bindPopup(`<strong>${name}</strong><br>${t('countLabel')}: ${formatCount(value)}`);
        }
      }).addTo(brazilMap);
      const bounds = brazilLayer.getBounds();
      if (bounds.isValid()) brazilMap.fitBounds(bounds, { padding: [8, 8] });
    }

    if (rioGeo) {
      rioLayer = L.geoJSON(rioGeo, {
        style(feature) {
          const name = featureName(feature);
          return { color: '#ffffff', weight: .8, fillColor: colorForCount(cityCounts[name]), fillOpacity: .9 };
        },
        onEachFeature(feature, layer) {
          const name = featureName(feature);
          const value = Number(cityCounts[name] || 0);
          layer.bindPopup(`<strong>${name || t('cityLabel')}</strong><br>${t('countLabel')}: ${formatCount(value)}`);
        }
      }).addTo(rioMap);
      const bounds = rioLayer.getBounds();
      if (bounds.isValid()) rioMap.fitBounds(bounds, { padding: [8, 8] });
    }

    if (currentLocation?.latitude && currentLocation?.longitude) {
      const targetMap = currentLocation.regionCode === 'RJ' ? rioMap : brazilMap;
      L.circleMarker([currentLocation.latitude, currentLocation.longitude], {
        radius: 7,
        color: '#7a4c00',
        fillColor: '#ffd45c',
        fillOpacity: 1,
        weight: 2
      }).addTo(targetMap).bindPopup(`<strong>${currentLocation.city || t('unknown')}</strong><br>${currentLocation.region || ''}`);
    }

    setTimeout(() => {
      brazilMap.invalidateSize();
      rioMap.invalidateSize();
    }, 100);
  }

  async function loadMapData() {
    try {
      await ensureLeaflet();
      initializeMaps();
      const [brResponse, rjResponse] = await Promise.all([
        fetch(BRAZIL_GEOJSON, { cache: 'force-cache' }),
        fetch(RJ_GEOJSON, { cache: 'force-cache' })
      ]);
      if (!brResponse.ok || !rjResponse.ok) throw new Error('GeoJSON unavailable');
      [brazilGeo, rioGeo] = await Promise.all([brResponse.json(), rjResponse.json()]);

      const stateCodes = [...new Set((brazilGeo.features || []).map(stateCode).filter(Boolean))];
      const cityNames = [...new Set((rioGeo.features || []).map(featureName).filter(Boolean))];

      const stateValues = await mapLimit(stateCodes, 8, async (code) => [code, await getCount(countKey('state', code))]);
      stateCounts = Object.fromEntries(stateValues.filter(Boolean));

      const cityValues = await mapLimit(cityNames, 8, async (city) => [city, await getCount(countKey('city', city, 'RJ'))]);
      cityCounts = Object.fromEntries(cityValues.filter(Boolean));

      updateMetrics();
      renderRanking();
      renderMaps();
      setStatus('mapsReady');
    } catch (error) {
      console.error('ODS maps:', error);
      setStatus('mapError');
    }
  }

  async function locateVisitor() {
    const endpoints = [
      'https://ipwho.is/?fields=success,country,country_code,region,region_code,city,latitude,longitude',
      'https://ipapi.co/json/'
    ];
    for (const endpoint of endpoints) {
      try {
        const response = await fetch(endpoint, { cache: 'no-store' });
        if (!response.ok) continue;
        const data = await response.json();
        if (endpoint.includes('ipwho.is') && data.success) {
          return {
            city: data.city || '', region: data.region || '', regionCode: String(data.region_code || '').toUpperCase(),
            country: data.country || '', countryCode: String(data.country_code || '').toUpperCase(),
            latitude: Number(data.latitude || 0), longitude: Number(data.longitude || 0)
          };
        }
        if (data.country_code) {
          return {
            city: data.city || '', region: data.region || '', regionCode: String(data.region_code || '').toUpperCase(),
            country: data.country_name || '', countryCode: String(data.country_code || '').toUpperCase(),
            latitude: Number(data.latitude || 0), longitude: Number(data.longitude || 0)
          };
        }
      } catch (_error) {
        // Try the next provider.
      }
    }
    return null;
  }

  async function registerApproximateLocation() {
    setStatus('loading');
    const location = await locateVisitor();
    if (!location) {
      setStatus('locationError');
      return;
    }
    currentLocation = location;
    const sessionKey = `${COUNT_PREFIX}-geo-session`;
    if (!sessionStorage.getItem(sessionKey)) {
      const tasks = [];
      if (location.countryCode) tasks.push(hitCount(countKey('country', location.countryCode)));
      if (location.countryCode === 'BR' && location.regionCode) tasks.push(hitCount(countKey('state', location.regionCode)));
      if (location.countryCode === 'BR' && location.city && location.regionCode) tasks.push(hitCount(countKey('city', location.city, location.regionCode)));
      await Promise.all(tasks);
      sessionStorage.setItem(sessionKey, '1');
    }

    if (location.regionCode) stateCounts[location.regionCode] = await getCount(countKey('state', location.regionCode));
    if (location.regionCode === 'RJ' && location.city) {
      cityCounts[location.city] = await getCount(countKey('city', location.city, 'RJ'));
    }
    updateMetrics();
    renderRanking();
    renderMaps();
    setStatus('locationRegistered', location);
    updateText();
  }

  function bindConsent() {
    const accept = mapSection.querySelector('#ods-geo-accept');
    const decline = mapSection.querySelector('#ods-geo-decline');
    const change = mapSection.querySelector('#ods-geo-change');
    const actions = mapSection.querySelector('#ods-geo-actions');

    const choice = localStorage.getItem('odsGeoConsent');
    if (choice === 'accepted') {
      actions.hidden = true;
      change.hidden = false;
      registerApproximateLocation();
    } else if (choice === 'declined') {
      actions.hidden = true;
      change.hidden = false;
      setStatus('locationDeclined');
    }

    accept.addEventListener('click', () => {
      localStorage.setItem('odsGeoConsent', 'accepted');
      actions.hidden = true;
      change.hidden = false;
      registerApproximateLocation();
    });
    decline.addEventListener('click', () => {
      localStorage.setItem('odsGeoConsent', 'declined');
      actions.hidden = true;
      change.hidden = false;
      setStatus('locationDeclined');
    });
    change.addEventListener('click', () => {
      localStorage.removeItem('odsGeoConsent');
      actions.hidden = false;
      change.hidden = true;
      setStatus('consentRequired');
    });
  }

  function buildSection(page) {
    const section = document.createElement('section');
    section.id = 'alcance-visitas';
    section.className = 'ods-visitors-section';
    section.setAttribute('aria-labelledby', 'ods-visitors-title');
    section.innerHTML = `
      <div class="ods-visitors-panel">
        <div class="ods-visitors-header">
          <div class="ods-visitors-header-row">
            <div>
              <span class="ods-kicker" data-map-key="kicker"></span>
              <h2 id="ods-visitors-title" data-map-key="title"></h2>
              <p data-map-key="intro"></p>
            </div>
            <div>
              <div class="ods-visitors-lang" role="group" aria-label="Português / English">
                <button type="button" class="lang-btn ods-map-lang-btn" data-lang="pt">Português</button>
                <button type="button" class="lang-btn ods-map-lang-btn" data-lang="en">English</button>
              </div>
            </div>
          </div>
          <div class="ods-visitors-metrics">
            <div class="ods-visitor-metric"><strong id="ods-total-visits">—</strong><span data-map-key="total"></span></div>
            <div class="ods-visitor-metric"><strong id="ods-states-count">0</strong><span data-map-key="states"></span></div>
            <div class="ods-visitor-metric"><strong id="ods-cities-count">0</strong><span data-map-key="cities"></span></div>
            <div class="ods-visitor-metric"><strong id="ods-current-location">—</strong><span data-map-key="current"></span></div>
          </div>
        </div>
        <div class="ods-visitors-body">
          <div class="ods-geo-consent">
            <div><h3 data-map-key="consentTitle"></h3><p data-map-key="consentText"></p></div>
            <div class="ods-geo-actions" id="ods-geo-actions">
              <button id="ods-geo-decline" type="button" class="ods-button secondary" data-map-key="decline"></button>
              <button id="ods-geo-accept" type="button" class="ods-button primary" data-map-key="accept"></button>
            </div>
            <button id="ods-geo-change" type="button" class="ods-button secondary" data-map-key="change" hidden></button>
          </div>
          <p id="ods-map-status" class="ods-map-status" data-status-key="loading"></p>
          <div class="ods-map-grid">
            <article class="ods-map-card"><div class="ods-map-card-head"><h3 data-map-key="mapBrazil"></h3><p data-map-key="mapBrazilText"></p></div><div id="ods-map-brazil" class="ods-leaflet-map" role="img" aria-label="Mapa de visitas por estado do Brasil"></div><div id="ods-brazil-legend" class="ods-map-legend"></div></article>
            <article class="ods-map-card"><div class="ods-map-card-head"><h3 data-map-key="mapRio"></h3><p data-map-key="mapRioText"></p></div><div id="ods-map-rio" class="ods-leaflet-map" role="img" aria-label="Mapa de visitas por município do Rio de Janeiro"></div><div id="ods-rio-legend" class="ods-map-legend"></div></article>
          </div>
          <article class="ods-city-ranking"><h3 data-map-key="ranking"></h3><p class="ods-city-ranking-intro" data-map-key="rankingText"></p><ol id="ods-city-list" class="ods-city-list"></ol></article>
          <p class="ods-analytics-note"><strong data-map-key="indicative"></strong> — <span data-map-key="note"></span></p>
        </div>
      </div>`;

    const academic = page.querySelector('.ods-academic')?.closest('.ods-section');
    if (academic) academic.insertAdjacentElement('beforebegin', section);
    else page.appendChild(section);

    const thanks = document.createElement('section');
    thanks.className = 'ods-thank-you';
    thanks.setAttribute('aria-labelledby', 'ods-thanks-title');
    thanks.innerHTML = `<div class="ods-thank-icon" aria-hidden="true">🌱</div><h2 id="ods-thanks-title" data-map-key="thanksTitle"></h2><p data-map-key="thanksText"></p>`;
    const finalAcademic = page.querySelector('.ods-academic')?.closest('.ods-section');
    if (finalAcademic) finalAcademic.insertAdjacentElement('afterend', thanks);
    else page.appendChild(thanks);

    return section;
  }

  async function boot() {
    const page = document.querySelector('.ods-page');
    if (!page || document.documentElement.dataset.odsVisitorsLoaded === 'true') return;
    document.documentElement.dataset.odsVisitorsLoaded = 'true';
    mapSection = buildSection(page);
    addLegend(mapSection.querySelector('#ods-brazil-legend'));
    addLegend(mapSection.querySelector('#ods-rio-legend'));
    updateText();
    bindConsent();

    mapSection.querySelectorAll('.ods-map-lang-btn').forEach((button) => {
      button.addEventListener('click', () => {
        const language = button.dataset.lang;
        const globalButton = document.querySelector(`.global-lang-btn[data-global-lang="${language}"]`);
        if (globalButton) globalButton.click();
        currentLang = normalizeLang(language);
        updateText();
      });
    });

    document.addEventListener('site-language-changed', (event) => {
      currentLang = normalizeLang(event.detail?.lang || 'pt');
      updateText();
    });

    const total = await countTotalVisit();
    updateMetrics(total);
    await loadMapData();
  }

  function waitForPage(attempt = 0) {
    if (document.querySelector('.ods-page')) {
      boot();
      return;
    }
    if (attempt < 80) setTimeout(() => waitForPage(attempt + 1), 125);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => waitForPage(), { once: true });
  else waitForPage();
})();
