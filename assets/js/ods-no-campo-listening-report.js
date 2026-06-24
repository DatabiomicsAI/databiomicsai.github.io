(() => {
  'use strict';

  const BASE = 'https://countapi.mileshilliard.com/api/v1';
  const PREFIX = 'databiomics-ods-listening-2026-v1';
  const STORAGE_KEY = 'odsListeningAggregateCountedV1';
  const REFRESH_MS = 45000;
  const COLORS = ['#0f6b3a','#159bd2','#d5a126','#8f4aa8','#e76f51','#6b8e23','#457b9d','#9c6644','#6d597a','#2a9d8f','#4d908e','#f4a261'];
  const charts = {};
  let registry = null;
  let loading = false;

  const MUNICIPALITIES = {
    APERIBE:'Aperibé',BOM_JESUS:'Bom Jesus do Itabapoana',CAMBUCI:'Cambuci',ITALVA:'Italva',ITAOCARA:'Itaocara',ITAPERUNA:'Itaperuna',LAJE:'Laje do Muriaé',MIRACEMA:'Miracema',NATIVIDADE:'Natividade',PORCIUNCULA:'Porciúncula',PADUA:'Santo Antônio de Pádua',SAO_JOSE:'São José de Ubá',VARRE_SAI:'Varre-Sai',OTHER:'Outro município ou localidade'
  };

  const normalize = (value) => String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
  const formatNumber = (value) => Number(value || 0).toLocaleString('pt-BR');
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
    } catch (_error) { return 0; }
  }

  async function hitCount(name) {
    try {
      const response = await fetch(`${BASE}/hit/${encodeURIComponent(key(name))}`, { cache:'no-store' });
      if (!response.ok) return getCount(name);
      const data = await response.json();
      return Number(data.value || 0);
    } catch (_error) { return getCount(name); }
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

  function labelForInput(input) {
    const label = input.closest('label');
    if (!label) return input.value || 'Opção';
    return label.textContent.replace(/\s+/g,' ').trim();
  }

  function uniqueEntries(inputs) {
    const seen = new Set();
    const entries = [];
    inputs.forEach((input) => {
      const value = String(input.value || '').trim();
      if (!value || seen.has(value)) return;
      seen.add(value);
      entries.push({ value, label:labelForInput(input), input });
    });
    return entries;
  }

  function buildRegistry(form) {
    const profileSelect = form.querySelector('#perfil');
    const profiles = Array.from(profileSelect?.options || [])
      .filter((option) => option.value && option.value.trim())
      .map((option) => ({ value:option.value, label:option.textContent.trim() }));

    return {
      profiles,
      challenges:uniqueEntries(Array.from(form.querySelectorAll('input[type="checkbox"][name^="desafios_"]'))),
      priorities:uniqueEntries(Array.from(form.querySelectorAll('input[type="checkbox"][name^="ods_prioritarios"]'))),
      content:uniqueEntries(Array.from(form.querySelectorAll('input[type="checkbox"][name^="conteudo_desejado"]'))),
      science:uniqueEntries(Array.from(form.querySelectorAll('input[type="checkbox"][name^="ciencia_inovacao"]'))),
      municipalities:Object.entries(MUNICIPALITIES).map(([value,label]) => ({ value, label }))
    };
  }

  function municipalityBucket(raw) {
    const value = normalize(raw);
    if (!value) return null;
    const aliases = {
      APERIBE:['aperibe'],BOM_JESUS:['bom jesus do itabapoana'],CAMBUCI:['cambuci'],ITALVA:['italva'],ITAOCARA:['itaocara'],ITAPERUNA:['itaperuna'],LAJE:['laje do muriae'],MIRACEMA:['miracema'],NATIVIDADE:['natividade'],PORCIUNCULA:['porciuncula'],PADUA:['santo antonio de padua','padua'],SAO_JOSE:['sao jose de uba'],VARRE_SAI:['varre sai','varresai']
    };
    for (const [code, names] of Object.entries(aliases)) {
      if (names.some((name) => value.includes(name))) return code;
    }
    return 'OTHER';
  }

  function reopenSurvey(form) {
    form.querySelectorAll('input, select, textarea, button').forEach((field) => {
      if (field.type === 'hidden') return;
      field.disabled = false;
    });
    const otherCheck = document.getElementById('ods-science-other-check');
    const otherText = document.getElementById('ods-science-other-text');
    if (otherText) otherText.disabled = !otherCheck?.checked;
    const age = document.getElementById('ods-faixa-etaria');
    if (age?.value === 'Menor de 18 anos') {
      ['ods-nome','ods-bairro','ods-genero'].forEach((id) => { const field = document.getElementById(id); if (field) field.disabled = true; });
    }
    const status = document.getElementById('ods-form-status');
    if (status && /encerrad/i.test(status.textContent || '')) {
      status.textContent = '';
      status.classList.remove('show');
    }
    document.querySelectorAll('#escuta .ods-invite p').forEach((paragraph) => {
      if (/Escuta aberta até|período de participação/i.test(paragraph.textContent || '')) {
        paragraph.innerHTML = '<strong>Escuta disponível nesta página.</strong> As respostas temáticas são apresentadas abaixo em um relatório público, quantitativo e agregado.';
      }
    });
  }

  function insertSubmitNote(form) {
    if (form.querySelector('.ods-listening-submit-note')) return;
    const button = form.querySelector('button[type="submit"]');
    if (!button) return;
    const note = document.createElement('p');
    note.className = 'ods-listening-submit-note';
    note.innerHTML = '<strong>Transparência:</strong> o relatório público contabiliza somente categorias agregadas — perfil geral, temas marcados, ODS prioritários, formatos de conteúdo, áreas de ciência e município agrupado. Nome, bairro, identidade de gênero, comentários e textos livres não são publicados.';
    button.insertAdjacentElement('afterend', note);
  }

  function reportMarkup() {
    return `
      <div class="ods-listening-report-head">
        <div><span class="ods-kicker">Devolutiva pública da extensão</span><h2>Relatório em tempo real da escuta</h2><p class="ods-listening-report-intro">Este painel apresenta somente resultados quantitativos e agrupados das contribuições recebidas. Ele mostra quais desafios, ODS, formatos de conteúdo e aplicações de ciência e tecnologia foram mais indicados pela comunidade.</p></div>
        <div class="ods-listening-live">Atualização automática</div>
      </div>
      <div class="ods-listening-metrics">
        <div class="ods-listening-metric"><strong id="ods-listening-total">0</strong><span>contribuições contabilizadas</span></div>
        <div class="ods-listening-metric"><strong id="ods-listening-selections">0</strong><span>marcações temáticas registradas</span></div>
        <div class="ods-listening-metric"><strong id="ods-listening-cities">0</strong><span>municípios ou grupos territoriais representados</span></div>
        <div class="ods-listening-metric"><strong id="ods-listening-top-count">0</strong><span id="ods-listening-top-label">indicações no tema mais apontado</span></div>
      </div>
      <div class="ods-listening-chart-grid">
        <article class="ods-listening-chart-card"><h3>Perfil geral dos participantes</h3><p>Distribuição por relação declarada com o tema.</p><div class="ods-listening-chart-wrap"><canvas id="ods-listening-profile-chart"></canvas></div></article>
        <article class="ods-listening-chart-card"><h3>Municípios informados</h3><p>Localidades agrupadas, sem endereço ou bairro.</p><div class="ods-listening-chart-wrap"><canvas id="ods-listening-city-chart"></canvas></div></article>
        <article class="ods-listening-chart-card wide"><h3>Desafios mais apontados</h3><p>Como cada participante pode marcar várias opções, os percentuais não precisam somar 100%.</p><div class="ods-listening-chart-wrap"><canvas id="ods-listening-challenges-chart"></canvas></div></article>
        <article class="ods-listening-chart-card"><h3>ODS considerados prioritários</h3><p>Objetivos selecionados como mais relevantes.</p><div class="ods-listening-chart-wrap"><canvas id="ods-listening-priority-chart"></canvas></div></article>
        <article class="ods-listening-chart-card"><h3>Conteúdos mais desejados</h3><p>Formatos educativos preferidos pelos participantes.</p><div class="ods-listening-chart-wrap"><canvas id="ods-listening-content-chart"></canvas></div></article>
        <article class="ods-listening-chart-card wide"><h3>Onde ciência, biologia, biotecnologia e tecnologia podem ajudar</h3><p>Demandas de aplicação científica e tecnológica indicadas na escuta.</p><div class="ods-listening-chart-wrap"><canvas id="ods-listening-science-chart"></canvas></div></article>
      </div>
      <div class="ods-listening-topics">
        <div class="ods-listening-topic-list"><h3>Temas mais citados</h3><ol id="ods-listening-top-themes"><li>Aguardando contribuições.</li></ol></div>
        <div class="ods-listening-topic-list"><h3>ODS mais priorizados</h3><ol id="ods-listening-top-ods"><li>Aguardando contribuições.</li></ol></div>
      </div>
      <p class="ods-listening-report-note"><strong>Privacidade:</strong> este relatório não publica nomes, bairros, identidade de gênero, comentários, respostas abertas ou qualquer combinação que permita identificar uma pessoa. Os dados completos enviados pelo formulário continuam separados e não são exibidos publicamente.</p>
      <div class="ods-listening-report-controls"><button type="button" id="ods-listening-refresh" class="ods-listening-refresh">Atualizar agora</button><span id="ods-listening-updated" class="ods-listening-updated">Preparando dados…</span></div>`;
  }

  function insertReport() {
    if (document.getElementById('ods-listening-report')) return;
    const listening = document.getElementById('escuta');
    if (!listening) return;
    const section = document.createElement('section');
    section.id = 'ods-listening-report';
    section.className = 'ods-listening-report';
    section.setAttribute('aria-labelledby','ods-listening-report-title');
    section.innerHTML = reportMarkup();
    listening.insertAdjacentElement('afterend', section);
    const title = section.querySelector('h2');
    if (title) title.id = 'ods-listening-report-title';
    section.querySelector('#ods-listening-refresh')?.addEventListener('click', loadReport);
  }

  async function ensureChartJs() {
    if (window.Chart) return;
    if (window.ODSQuizStore?.ensureChart) {
      await window.ODSQuizStore.ensureChart();
      return;
    }
    await new Promise((resolve, reject) => {
      const existing = document.querySelector('script[data-ods-listening-chartjs]');
      if (existing) {
        existing.addEventListener('load', resolve, { once:true });
        existing.addEventListener('error', reject, { once:true });
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.7/dist/chart.umd.min.js';
      script.setAttribute('data-ods-listening-chartjs','true');
      script.addEventListener('load', resolve, { once:true });
      script.addEventListener('error', reject, { once:true });
      document.head.appendChild(script);
    });
  }

  function chartRows(entries, group, counts, limit=12) {
    return entries.map((entry) => ({ label:entry.label, value:Number(counts[counterName(group, entry.value)] || 0) }))
      .filter((row) => row.value > 0)
      .sort((a,b) => b.value - a.value)
      .slice(0, limit);
  }

  function emptyRows() {
    return [{ label:'Aguardando contribuições', value:1, empty:true }];
  }

  function renderChart(id, rows, type='bar', horizontal=false, total=0) {
    const canvas = document.getElementById(id);
    if (!canvas || !window.Chart) return;
    if (charts[id]) charts[id].destroy();
    const dataRows = rows.length ? rows : emptyRows();
    const empty = Boolean(dataRows[0]?.empty);
    charts[id] = new Chart(canvas, {
      type,
      data:{
        labels:dataRows.map((row) => row.label),
        datasets:[{
          data:dataRows.map((row) => row.value),
          backgroundColor:empty ? ['#d9e5d7'] : dataRows.map((_,index) => COLORS[index % COLORS.length]),
          borderColor:type === 'doughnut' ? '#fff' : 'transparent',
          borderWidth:type === 'doughnut' ? 2 : 0,
          borderRadius:type === 'bar' ? 7 : 0
        }]
      },
      options:{
        responsive:true,
        maintainAspectRatio:false,
        indexAxis:horizontal ? 'y' : 'x',
        scales:type === 'bar' ? { x:{ beginAtZero:true, ticks:{ precision:0 } }, y:{ beginAtZero:true, ticks:{ precision:0 } } } : undefined,
        plugins:{
          legend:{ display:type === 'doughnut', position:'bottom', labels:{ boxWidth:13, usePointStyle:true } },
          tooltip:{
            enabled:!empty,
            callbacks:{
              label(context) {
                const value = Number(context.raw || 0);
                const pct = total > 0 ? (value / total) * 100 : 0;
                return `${context.label}: ${formatNumber(value)} (${pct.toLocaleString('pt-BR',{maximumFractionDigits:1})}% dos participantes)`;
              }
            }
          }
        }
      }
    });
  }

  function renderList(id, rows) {
    const list = document.getElementById(id);
    if (!list) return;
    list.innerHTML = rows.length ? rows.slice(0,8).map((row) => `<li>${row.label}: <b>${formatNumber(row.value)}</b></li>`).join('') : '<li>Aguardando contribuições.</li>';
  }

  async function loadCountsFor(entries, group) {
    const pairs = await mapLimit(entries, 8, async (entry) => {
      const name = counterName(group, entry.value);
      return [name, await getCount(name)];
    });
    return Object.fromEntries(pairs.filter(Boolean));
  }

  async function loadReport() {
    if (loading || !registry || !document.getElementById('ods-listening-report')) return;
    loading = true;
    const updated = document.getElementById('ods-listening-updated');
    if (updated) updated.textContent = 'Atualizando…';
    try {
      const [submissions, profileCounts, challengeCounts, priorityCounts, contentCounts, scienceCounts, cityCounts] = await Promise.all([
        getCount('submissions'),
        loadCountsFor(registry.profiles,'profile'),
        loadCountsFor(registry.challenges,'challenge'),
        loadCountsFor(registry.priorities,'priority'),
        loadCountsFor(registry.content,'content'),
        loadCountsFor(registry.science,'science'),
        loadCountsFor(registry.municipalities,'city')
      ]);

      const profiles = chartRows(registry.profiles,'profile',profileCounts,12);
      const challenges = chartRows(registry.challenges,'challenge',challengeCounts,12);
      const priorities = chartRows(registry.priorities,'priority',priorityCounts,12);
      const content = chartRows(registry.content,'content',contentCounts,10);
      const science = chartRows(registry.science,'science',scienceCounts,12);
      const cities = chartRows(registry.municipalities,'city',cityCounts,14);
      const totalSelections = [...challenges,...priorities,...content,...science].reduce((sum,row) => sum + row.value,0);
      const top = [...challenges,...priorities,...science].sort((a,b) => b.value - a.value)[0] || { label:'Nenhum tema ainda', value:0 };

      const metrics = {
        'ods-listening-total':submissions,
        'ods-listening-selections':totalSelections,
        'ods-listening-cities':cities.length,
        'ods-listening-top-count':top.value
      };
      Object.entries(metrics).forEach(([id,value]) => { const element = document.getElementById(id); if (element) element.textContent = formatNumber(value); });
      const topLabel = document.getElementById('ods-listening-top-label');
      if (topLabel) topLabel.textContent = top.value ? `indicações em “${top.label}”` : 'indicações no tema mais apontado';

      await ensureChartJs();
      renderChart('ods-listening-profile-chart',profiles,'doughnut',false,submissions);
      renderChart('ods-listening-city-chart',cities,'doughnut',false,submissions);
      renderChart('ods-listening-challenges-chart',challenges,'bar',true,submissions);
      renderChart('ods-listening-priority-chart',priorities,'bar',true,submissions);
      renderChart('ods-listening-content-chart',content,'bar',true,submissions);
      renderChart('ods-listening-science-chart',science,'bar',true,submissions);
      renderList('ods-listening-top-themes',[...challenges,...science].sort((a,b) => b.value - a.value));
      renderList('ods-listening-top-ods',priorities);
      if (updated) updated.textContent = `Última atualização: ${new Date().toLocaleString('pt-BR')}`;
    } catch (error) {
      console.error('Falha ao atualizar relatório da escuta:', error);
      if (updated) updated.textContent = 'Não foi possível atualizar agora. Tente novamente em instantes.';
    } finally {
      loading = false;
    }
  }

  function selectedValues(entries) {
    return entries.filter((entry) => entry.input?.checked).map((entry) => entry.value);
  }

  async function registerSubmission(form) {
    if (localStorage.getItem(STORAGE_KEY)) return false;
    const jobs = [hitCount('submissions')];
    const profile = form.querySelector('#perfil')?.value;
    if (profile) jobs.push(hitCount(counterName('profile',profile)));
    selectedValues(registry.challenges).forEach((value) => jobs.push(hitCount(counterName('challenge',value))));
    selectedValues(registry.priorities).forEach((value) => jobs.push(hitCount(counterName('priority',value))));
    selectedValues(registry.content).forEach((value) => jobs.push(hitCount(counterName('content',value))));
    selectedValues(registry.science).forEach((value) => jobs.push(hitCount(counterName('science',value))));
    const city = municipalityBucket(form.querySelector('#localidade, input[name="cidade_municipio_opcional"]')?.value);
    if (city) jobs.push(hitCount(counterName('city',city)));
    await Promise.allSettled(jobs);
    localStorage.setItem(STORAGE_KEY, new Date().toISOString());
    return true;
  }

  function installSubmitHandler(form) {
    if (form.dataset.listeningReportInstalled === 'true') return;
    form.dataset.listeningReportInstalled = 'true';
    form.addEventListener('submit', async (event) => {
      if (event.defaultPrevented) return;
      const challenges = Array.from(form.querySelectorAll('input[type="checkbox"][name^="desafios_"]'));
      if (!challenges.some((input) => input.checked) || !form.checkValidity()) return;
      event.preventDefault();
      const button = form.querySelector('button[type="submit"]');
      if (button) { button.disabled = true; button.textContent = 'Registrando e enviando…'; }
      try {
        await Promise.race([
          registerSubmission(form),
          new Promise((resolve) => setTimeout(resolve, 4500))
        ]);
      } catch (error) {
        console.error('Falha ao registrar dados agregados:', error);
      }
      HTMLFormElement.prototype.submit.call(form);
    });
  }

  function boot(attempt=0) {
    const form = document.getElementById('ods-listening-form');
    if (!form) {
      if (attempt < 120) setTimeout(() => boot(attempt + 1),100);
      return;
    }
    reopenSurvey(form);
    insertSubmitNote(form);
    registry = buildRegistry(form);
    insertReport();
    installSubmitHandler(form);
    loadReport();
    setInterval(loadReport,REFRESH_MS);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => boot(), { once:true });
  else boot();
})();
