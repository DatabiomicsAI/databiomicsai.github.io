(() => {
  'use strict';

  const YEAR = '2024';
  const SOURCE_COFFEE = 'https://www.rj.gov.br/agricultura/node/644';
  const SOURCE_MILK = 'https://sidra.ibge.gov.br/tabela/74';
  const SOUTHEAST_MILK = 12028287;
  const RIO_MILK = 391284;

  const ready = (fn) => document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', fn, { once: true })
    : fn();

  const api = (level, id) => {
    const url = new URL(`https://servicodados.ibge.gov.br/api/v3/agregados/74/periodos/${YEAR}/variaveis/106`);
    url.searchParams.set('localidades', `${level}[${id}]`);
    url.searchParams.set('classificacao', '80[2682]');
    return url;
  };

  const extractValue = (payload) => {
    for (const result of payload?.[0]?.resultados || []) {
      for (const series of result.series || []) {
        const value = series?.serie?.[YEAR];
        if (value && value !== '-' && value !== '...') return value;
      }
    }
    return null;
  };

  const parseNumber = (value) => {
    const text = String(value || '').trim();
    if (/^\d{1,3}(\.\d{3})+(,\d+)?$/.test(text)) {
      return Number(text.replace(/\./g, '').replace(',', '.'));
    }
    return Number(text.replace(',', '.'));
  };

  const formatNumber = (value, digits = 0) => Number(value || 0).toLocaleString('pt-BR', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits
  });

  const formatMilk = (value) => {
    const number = parseNumber(value);
    if (!Number.isFinite(number)) return `${value} mil litros`;
    return `${formatNumber(number, 0)} mil litros (aprox. ${formatNumber(number / 1000, 2)} milhões de litros)`;
  };

  const percentage = (part, total) => total > 0 ? (part / total) * 100 : 0;

  async function fetchMilk(level, id) {
    const response = await fetch(api(level, id), { cache: 'no-store' });
    if (!response.ok) throw new Error(`IBGE ${response.status}`);
    return extractValue(await response.json());
  }

  function ensureChartJs() {
    return new Promise((resolve, reject) => {
      if (window.Chart) return resolve();
      const existing = document.querySelector('script[data-chartjs-ods]');
      if (existing) {
        existing.addEventListener('load', resolve, { once: true });
        existing.addEventListener('error', reject, { once: true });
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.7/dist/chart.umd.min.js';
      script.setAttribute('data-chartjs-ods', 'true');
      script.addEventListener('load', resolve, { once: true });
      script.addEventListener('error', reject, { once: true });
      document.head.appendChild(script);
    });
  }

  function chartOptions(title, total) {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom', labels: { boxWidth: 14, usePointStyle: true } },
        title: { display: false, text: title },
        tooltip: {
          callbacks: {
            label(context) {
              const value = Number(context.raw || 0);
              const pct = percentage(value, total);
              return `${context.label}: ${formatNumber(value)} mil litros (${formatNumber(pct, 2)}%)`;
            }
          }
        }
      }
    };
  }

  function renderCharts(itaperunaMilk) {
    if (!window.Chart) return;

    const southeastCanvas = document.getElementById('ods-chart-rio-southeast');
    if (southeastCanvas && !southeastCanvas.dataset.rendered) {
      southeastCanvas.dataset.rendered = 'true';
      new Chart(southeastCanvas, {
        type: 'doughnut',
        data: {
          labels: ['Estado do Rio de Janeiro', 'Demais estados do Sudeste'],
          datasets: [{
            data: [RIO_MILK, Math.max(SOUTHEAST_MILK - RIO_MILK, 0)],
            backgroundColor: ['#2f855a', '#cfe3d5'],
            borderColor: ['#ffffff', '#ffffff'],
            borderWidth: 3
          }]
        },
        options: chartOptions('Participação do Rio de Janeiro no Sudeste', SOUTHEAST_MILK)
      });
    }

    const cityCanvas = document.getElementById('ods-chart-itaperuna-rio');
    if (cityCanvas && Number.isFinite(itaperunaMilk) && !cityCanvas.dataset.rendered) {
      cityCanvas.dataset.rendered = 'true';
      new Chart(cityCanvas, {
        type: 'doughnut',
        data: {
          labels: ['Itaperuna', 'Demais municípios do Rio de Janeiro'],
          datasets: [{
            data: [itaperunaMilk, Math.max(RIO_MILK - itaperunaMilk, 0)],
            backgroundColor: ['#2563eb', '#c9ddf7'],
            borderColor: ['#ffffff', '#ffffff'],
            borderWidth: 3
          }]
        },
        options: chartOptions('Participação de Itaperuna no Estado do Rio', RIO_MILK)
      });
    }
  }

  function insertPanel(page) {
    if (document.getElementById('ods-agro-data-panel')) return document.getElementById('ods-agro-data-panel');
    const localBanner = page.querySelector('.ods-local-banner');
    if (!localBanner) return null;

    const panel = document.createElement('section');
    panel.id = 'ods-agro-data-panel';
    panel.className = 'ods-agro-data-panel';
    panel.setAttribute('aria-labelledby', 'ods-agro-data-title');
    panel.innerHTML = `
      <h3 id="ods-agro-data-title">Café e leite: cadeias relevantes para o agro regional</h3>
      <p class="ods-agro-data-intro">A agropecuária do Noroeste Fluminense é diversificada. A cafeicultura e a produção leiteira se relacionam aos ODS por envolverem alimentos, renda, água, solo, tecnologia, qualidade, assistência técnica, inovação e cooperação.</p>
      <div class="ods-agro-data-grid">
        <article class="ods-agro-data-card coffee">
          <h4>☕ Cafeicultura no Noroeste Fluminense</h4>
          <span class="ods-agro-stat">85% da produção fluminense</span>
          <span class="ods-agro-stat-caption">concentrada na Região Noroeste</span>
          <p>Em 2023, o café movimentou <strong>mais de R$ 240 milhões</strong> na região. A Secretaria de Agricultura do RJ também informou <strong>2.673 produtores</strong> e crescimento de <strong>3%</strong> da produção em relação a 2022.</p>
          <p>A cadeia se relaciona aos ODS 2, 6, 8, 9, 12, 13 e 17 por envolver produção de alimentos, água, renda, inovação, consumo responsável, adaptação climática e parcerias.</p>
          <a class="ods-agro-source" href="${SOURCE_COFFEE}" target="_blank" rel="noopener noreferrer">Fonte oficial — Secretaria de Agricultura do RJ ↗</a>
        </article>
        <article class="ods-agro-data-card milk">
          <h4>🥛 Produção de leite em Itaperuna, Rio de Janeiro e Sudeste</h4>
          <span id="ods-milk-itaperuna" class="ods-agro-stat ods-data-loading">Carregando dado oficial do IBGE…</span>
          <span class="ods-agro-stat-caption">produção de leite em Itaperuna, ${YEAR}</span>
          <p id="ods-milk-rio" class="ods-data-loading">Carregando a produção do Estado do Rio de Janeiro…</p>
          <div class="ods-milk-context">
            <p>No <strong>Sudeste</strong>, a produção foi de <strong>${formatNumber(SOUTHEAST_MILK)} mil litros</strong> em ${YEAR}. No mesmo período, o <strong>Estado do Rio de Janeiro</strong> produziu <strong>${formatNumber(RIO_MILK)} mil litros</strong>, correspondendo a <strong>${formatNumber(percentage(RIO_MILK, SOUTHEAST_MILK), 2)}%</strong> da produção regional.</p>
            <p id="ods-milk-itaperuna-share" class="ods-data-loading">Calculando a participação de Itaperuna no total fluminense…</p>
          </div>
          <div class="ods-chart-grid">
            <div class="ods-chart-card"><h5>Rio de Janeiro no total do Sudeste</h5><div class="ods-chart-wrap"><canvas id="ods-chart-rio-southeast"></canvas></div><p class="ods-chart-caption">Produção em mil litros — ${YEAR}</p></div>
            <div class="ods-chart-card"><h5>Itaperuna no total do Estado do Rio</h5><div class="ods-chart-wrap"><canvas id="ods-chart-itaperuna-rio"></canvas></div><p class="ods-chart-caption">Produção em mil litros — ${YEAR}</p></div>
          </div>
          <p>A cadeia do leite envolve renda rural, manejo de pastagens, saúde e bem-estar animal, qualidade da água, refrigeração, controle microbiológico, logística, segurança dos alimentos e inovação.</p>
          <a class="ods-agro-source" href="${SOURCE_MILK}" target="_blank" rel="noopener noreferrer">Fonte oficial — SIDRA/IBGE, Tabela 74 ↗</a>
        </article>
      </div>
      <p class="ods-data-note"><strong>Referências:</strong> café com dados da Secretaria de Estado de Agricultura do RJ; leite com base na Pesquisa da Pecuária Municipal do IBGE, Tabela 74. Os valores do Sudeste e do Estado do Rio de Janeiro correspondem aos números apresentados na consulta do SIDRA para ${YEAR}; o valor de Itaperuna é consultado automaticamente na API do IBGE.</p>`;
    localBanner.insertAdjacentElement('afterend', panel);
    return panel;
  }

  async function loadData(panel) {
    const itaperunaElement = panel.querySelector('#ods-milk-itaperuna');
    const rioElement = panel.querySelector('#ods-milk-rio');
    const shareElement = panel.querySelector('#ods-milk-itaperuna-share');
    try {
      const [itaperunaRaw, rioRaw] = await Promise.all([
        fetchMilk('N6', '3302205'),
        fetchMilk('N3', '33'),
        ensureChartJs()
      ]);
      const itaperuna = parseNumber(itaperunaRaw);
      const rioApi = parseNumber(rioRaw);

      itaperunaElement.textContent = Number.isFinite(itaperuna) ? formatMilk(itaperuna) : 'Consulte o valor municipal no SIDRA/IBGE.';
      itaperunaElement.classList.remove('ods-data-loading');

      rioElement.innerHTML = Number.isFinite(rioApi)
        ? `No conjunto do Estado do Rio de Janeiro, o IBGE registrou <strong>${formatMilk(rioApi)}</strong> em ${YEAR}.`
        : `No Estado do Rio de Janeiro, a consulta do SIDRA apresenta <strong>${formatMilk(RIO_MILK)}</strong> em ${YEAR}.`;
      rioElement.classList.remove('ods-data-loading');

      if (Number.isFinite(itaperuna)) {
        shareElement.innerHTML = `Itaperuna produziu <strong>${formatMilk(itaperuna)}</strong>, equivalente a <strong>${formatNumber(percentage(itaperuna, RIO_MILK), 2)}%</strong> do total do Estado do Rio de Janeiro.`;
      } else {
        shareElement.textContent = 'Não foi possível calcular automaticamente a participação de Itaperuna.';
      }
      shareElement.classList.remove('ods-data-loading');
      renderCharts(itaperuna);
    } catch (error) {
      console.error('Falha ao consultar dados de leite:', error);
      itaperunaElement.textContent = 'Consulte o valor atualizado de Itaperuna no SIDRA/IBGE.';
      rioElement.innerHTML = `No Estado do Rio de Janeiro, a consulta apresentada registra <strong>${formatMilk(RIO_MILK)}</strong> em ${YEAR}.`;
      shareElement.textContent = 'A participação de Itaperuna não pôde ser calculada automaticamente.';
      [itaperunaElement, rioElement, shareElement].forEach((element) => element.classList.remove('ods-data-loading'));
      ensureChartJs().then(() => renderCharts(NaN)).catch(() => {});
    }
  }

  function boot(attempt = 0) {
    const page = document.querySelector('.ods-page');
    if (!page) {
      if (attempt < 100) setTimeout(() => boot(attempt + 1), 120);
      return;
    }
    const panel = insertPanel(page);
    if (panel) loadData(panel);
  }

  ready(() => boot());
})();
