(() => {
  'use strict';

  const BASE = 'https://countapi.mileshilliard.com/api/v1';
  const PREFIX = 'databiomics-ods-listening-2026-v1';
  const REFRESH_MS = 45000;
  let loading = false;

  const formatNumber = (value) => Number(value || 0).toLocaleString('pt-BR');
  const formatPercent = (value) => Number(value || 0).toLocaleString('pt-BR', { minimumFractionDigits:1, maximumFractionDigits:1 });
  const key = (name) => `${PREFIX}-${name}`;

  function hash(text) {
    let h = 2166136261;
    for (let i = 0; i < text.length; i += 1) {
      h ^= text.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return (h >>> 0).toString(36);
  }

  function counterName(group, value) {
    return `${group}-${hash(`${group}|${value}`)}`;
  }

  async function getCount(name) {
    try {
      const response = await fetch(`${BASE}/get/${encodeURIComponent(key(name))}`, { cache:'no-store' });
      if (!response.ok) return 0;
      const data = await response.json();
      return Number(data.value || 0);
    } catch (_error) {
      return 0;
    }
  }

  async function mapLimit(items, limit, worker) {
    const output = new Array(items.length);
    let cursor = 0;
    async function run() {
      while (cursor < items.length) {
        const index = cursor++;
        try { output[index] = await worker(items[index], index); }
        catch (_error) { output[index] = null; }
      }
    }
    await Promise.all(Array.from({ length:Math.min(limit, items.length) }, run));
    return output;
  }

  function getOdsNumber(text) {
    const match = String(text || '').match(/ODS\s*(\d+)/i);
    return match ? Number(match[1]) : 999;
  }

  function cleanLabel(input) {
    const raw = input.closest('label')?.textContent || input.value || 'ODS';
    return raw.replace(/\s+/g,' ').trim();
  }

  function getOdsEntries() {
    const inputs = Array.from(document.querySelectorAll('#ods-priority-block input[type="checkbox"][name^="ods_prioritarios"]'));
    const seen = new Set();
    return inputs.reduce((entries,input) => {
      const value = String(input.value || '').trim();
      if (!value || seen.has(value)) return entries;
      seen.add(value);
      entries.push({
        value,
        label:cleanLabel(input),
        number:getOdsNumber(input.value || cleanLabel(input))
      });
      return entries;
    },[]);
  }

  function assignRanks(rows) {
    let previousValue = null;
    let previousRank = 0;
    return rows.map((row,index) => {
      const rank = previousValue === row.value ? previousRank : index + 1;
      previousValue = row.value;
      previousRank = rank;
      return { ...row, rank };
    });
  }

  function insertPanel() {
    const report = document.getElementById('ods-listening-report');
    const metrics = report?.querySelector('.ods-listening-metrics');
    const chartGrid = report?.querySelector('.ods-listening-chart-grid');
    if (!report || !metrics || !chartGrid) return null;

    let panel = document.getElementById('ods-ranking-panel');
    if (panel) return panel;

    panel = document.createElement('section');
    panel.id = 'ods-ranking-panel';
    panel.className = 'ods-ranking-panel';
    panel.setAttribute('aria-labelledby','ods-ranking-title');
    panel.innerHTML = `
      <div class="ods-ranking-head">
        <div>
          <h3 id="ods-ranking-title">Ranking dos ODS indicados em cada resposta</h3>
          <p>Cada ODS marcado em uma contribuição conta como <strong>uma indicação</strong>. Como uma mesma pessoa pode selecionar vários ODS, o ranking mostra quantos participantes escolheram cada objetivo e o percentual sobre o total de respostas recebidas.</p>
        </div>
        <span class="ods-ranking-badge">Resultados agrupados</span>
      </div>
      <div class="ods-ranking-summary">
        <div class="ods-ranking-summary-item"><strong id="ods-ranking-votes">0</strong><span>indicações de ODS registradas</span></div>
        <div class="ods-ranking-summary-item"><strong id="ods-ranking-average">0,0</strong><span>ODS marcados, em média, por resposta</span></div>
        <div class="ods-ranking-summary-item"><strong id="ods-ranking-active">0</strong><span>ODS diferentes receberam indicações</span></div>
        <div class="ods-ranking-summary-item"><strong id="ods-ranking-leader-count">0</strong><span id="ods-ranking-leader-label">indicações no ODS mais priorizado</span></div>
      </div>
      <div id="ods-ranking-podium" class="ods-ranking-podium" aria-label="Três ODS mais priorizados"></div>
      <div id="ods-ranking-list" class="ods-ranking-list" aria-label="Ranking completo dos ODS"></div>
      <p class="ods-ranking-explanation"><strong>Como interpretar:</strong> “40% dos participantes” significa que 4 em cada 10 respostas marcaram aquele ODS. Como é permitido escolher vários objetivos, a soma dos percentuais pode ultrapassar 100%. Nenhuma resposta individual é exibida.</p>`;
    chartGrid.insertAdjacentElement('beforebegin', panel);

    const priorityCanvas = document.getElementById('ods-listening-priority-chart');
    const priorityCard = priorityCanvas?.closest('.ods-listening-chart-card');
    const title = priorityCard?.querySelector('h3');
    const description = priorityCard?.querySelector('p');
    if (title) title.textContent = 'Comparação visual das indicações por ODS';
    if (description) description.textContent = 'O gráfico complementa o ranking completo, mostrando o número de respostas que selecionou cada ODS.';

    return panel;
  }

  function renderPodium(rows, submissions) {
    const podium = document.getElementById('ods-ranking-podium');
    if (!podium) return;
    const top = rows.filter((row) => row.value > 0).slice(0,3);
    const classes = ['gold','silver','bronze'];
    if (!top.length) {
      podium.innerHTML = '<div class="ods-podium-card"><span class="ods-podium-place">—</span><h4>Aguardando contribuições</h4><p>O pódio será preenchido após as primeiras respostas.</p></div>';
      return;
    }
    podium.innerHTML = top.map((row,index) => {
      const pct = submissions > 0 ? (row.value / submissions) * 100 : 0;
      return `<article class="ods-podium-card ${classes[index] || ''}"><span class="ods-podium-place">${index + 1}º</span><h4>${row.label}</h4><p><strong>${formatNumber(row.value)}</strong> indicações · ${formatPercent(pct)}% dos participantes</p></article>`;
    }).join('');
  }

  function renderList(rows, submissions) {
    const list = document.getElementById('ods-ranking-list');
    if (!list) return;
    const max = Math.max(...rows.map((row) => row.value),1);
    list.innerHTML = rows.map((row) => {
      const respondentPct = submissions > 0 ? (row.value / submissions) * 100 : 0;
      const width = row.value > 0 ? Math.max(3,(row.value / max) * 100) : 0;
      const odsBadge = Number.isFinite(row.number) && row.number < 999 ? `ODS ${row.number}` : 'ODS';
      const readableLabel = row.label.replace(/^ODS\s*\d+\s*[—-]\s*/i,'');
      return `
        <div class="ods-ranking-row">
          <span class="ods-ranking-position">${row.rank}º</span>
          <div class="ods-ranking-label"><span class="ods-ranking-ods">${odsBadge}</span>${readableLabel}</div>
          <div class="ods-ranking-progress" role="img" aria-label="${formatPercent(respondentPct)}% dos participantes selecionaram ${odsBadge}"><span style="width:${width}%"></span></div>
          <div class="ods-ranking-values"><strong>${formatNumber(row.value)} indicações</strong>${formatPercent(respondentPct)}% dos participantes</div>
        </div>`;
    }).join('');
  }

  function updateSummary(rows, submissions) {
    const totalVotes = rows.reduce((sum,row) => sum + row.value,0);
    const active = rows.filter((row) => row.value > 0).length;
    const average = submissions > 0 ? totalVotes / submissions : 0;
    const leader = rows[0] || { value:0, label:'ODS ainda sem indicação' };

    const values = {
      'ods-ranking-votes':formatNumber(totalVotes),
      'ods-ranking-average':average.toLocaleString('pt-BR',{minimumFractionDigits:1,maximumFractionDigits:1}),
      'ods-ranking-active':formatNumber(active),
      'ods-ranking-leader-count':formatNumber(leader.value)
    };
    Object.entries(values).forEach(([id,value]) => {
      const element = document.getElementById(id);
      if (element) element.textContent = value;
    });
    const label = document.getElementById('ods-ranking-leader-label');
    if (label) label.textContent = leader.value > 0 ? `indicações em “${leader.label}”` : 'indicações no ODS mais priorizado';
  }

  async function loadRanking() {
    if (loading || !document.getElementById('ods-ranking-panel')) return;
    const entries = getOdsEntries();
    if (!entries.length) return;
    loading = true;
    try {
      const [submissions, pairs] = await Promise.all([
        getCount('submissions'),
        mapLimit(entries,8,async (entry) => [entry.value,await getCount(counterName('priority',entry.value))])
      ]);
      const counts = Object.fromEntries(pairs.filter(Boolean));
      const rows = assignRanks(entries.map((entry) => ({ ...entry, value:Number(counts[entry.value] || 0) }))
        .sort((a,b) => b.value - a.value || a.number - b.number));
      updateSummary(rows,submissions);
      renderPodium(rows,submissions);
      renderList(rows,submissions);

      const oldList = document.getElementById('ods-listening-top-ods');
      if (oldList) {
        oldList.innerHTML = rows.filter((row) => row.value > 0).slice(0,8).map((row) => {
          const pct = submissions > 0 ? (row.value / submissions) * 100 : 0;
          return `<li><strong>${row.rank}º — ${row.label}</strong>: ${formatNumber(row.value)} indicações (${formatPercent(pct)}% dos participantes)</li>`;
        }).join('') || '<li>Aguardando contribuições.</li>';
      }
    } catch (error) {
      console.error('Falha ao atualizar ranking dos ODS:',error);
    } finally {
      loading = false;
    }
  }

  function boot(attempt=0) {
    const entries = getOdsEntries();
    const panel = insertPanel();
    if ((!panel || !entries.length) && attempt < 140) {
      setTimeout(() => boot(attempt + 1),100);
      return;
    }
    loadRanking();
    document.getElementById('ods-listening-refresh')?.addEventListener('click',loadRanking);
    setInterval(loadRanking,REFRESH_MS);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded',() => boot(),{ once:true });
  else boot();
})();
