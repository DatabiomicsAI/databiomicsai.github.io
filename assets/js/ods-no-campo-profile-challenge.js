(() => {
  'use strict';

  const STORAGE_KEY = 'odsNoCampoProfileV2';
  const COUNTED_KEY = 'odsNoCampoProfileCountedV1';
  const COUNTER_BASE = 'https://countapi.mileshilliard.com/api/v1';
  const COUNTER_PREFIX = 'databiomics-ods-profile-2026-v1';
  const PROFILE_ORDER = ['agro', 'agua', 'biodiversidade', 'clima', 'comunidade'];

  const PROFILES = {
    agro: {
      emoji: '🤖', title: 'Inovador do Agro Sustentável', label: 'Tecnologia e produção',
      description: 'Você acredita que tecnologia, produtividade e responsabilidade ambiental precisam avançar juntas. Seu perfil valoriza soluções aplicadas, dados e inovação para fortalecer o campo.',
      ods: ['ODS 2', 'ODS 9', 'ODS 12'],
      actions: ['Acompanhar tecnologias de agricultura de precisão e uso eficiente de insumos.', 'Conhecer bioinsumos, sensores e ferramentas de apoio à decisão.', 'Compartilhar soluções que conciliem produtividade, renda e conservação.']
    },
    agua: {
      emoji: '💧', title: 'Guardião da Água', label: 'Água e eficiência',
      description: 'Você enxerga a água como recurso essencial para a vida, a produção e o desenvolvimento regional. Seu perfil prioriza eficiência, qualidade, prevenção e proteção dos recursos hídricos.',
      ods: ['ODS 6', 'ODS 12', 'ODS 13'],
      actions: ['Observar desperdícios, vazamentos e oportunidades de reúso responsável.', 'Valorizar análises, sensores e monitoramento da qualidade da água.', 'Apoiar a proteção de nascentes, reservatórios e áreas de recarga.']
    },
    biodiversidade: {
      emoji: '🌳', title: 'Protetor da Biodiversidade', label: 'Biodiversidade',
      description: 'Você reconhece que florestas, animais, plantas e microrganismos sustentam água, alimentos, saúde e inovação. Seu perfil valoriza conservação, conhecimento científico e recuperação ambiental.',
      ods: ['ODS 3', 'ODS 13', 'ODS 15'],
      actions: ['Apoiar inventários e monitoramento da biodiversidade regional.', 'Conhecer espécies, fragmentos florestais e serviços ecossistêmicos locais.', 'Incentivar recuperação ambiental e conexão entre remanescentes.']
    },
    clima: {
      emoji: '🌦️', title: 'Estrategista Climático', label: 'Clima e prevenção',
      description: 'Você pensa no futuro e valoriza prevenção, adaptação e decisões baseadas em dados. Seu perfil busca reduzir riscos de secas, calor, chuvas intensas e perdas produtivas.',
      ods: ['ODS 7', 'ODS 11', 'ODS 13'],
      actions: ['Acompanhar dados climáticos, alertas e indicadores locais.', 'Planejar produção, infraestrutura e uso de água considerando riscos.', 'Defender soluções de adaptação com ciência e responsabilidade.']
    },
    comunidade: {
      emoji: '🤝', title: 'Conector da Comunidade', label: 'Educação e parcerias',
      description: 'Você acredita que mudanças duradouras dependem de educação, cooperação e participação social. Seu perfil valoriza diálogo entre produtores, escolas, empresas, ciência e poder público.',
      ods: ['ODS 4', 'ODS 8', 'ODS 17'],
      actions: ['Compartilhar conhecimento em linguagem simples e acessível.', 'Aproximar comunidade, instituições de ensino e setores produtivos.', 'Participar de ações coletivas e apoiar decisões baseadas em evidências.']
    }
  };

  const QUESTIONS = [
    { title: 'Qual desafio local mais desperta sua atenção?', help: 'Escolha a alternativa que mais combina com sua percepção.', choices: [['💧','Qualidade e disponibilidade de água','agua'],['🌱','Produção de alimentos e fortalecimento do campo','agro'],['🌳','Perda de biodiversidade e fragmentos florestais','biodiversidade'],['🌦️','Secas, calor e eventos climáticos extremos','clima'],['🤝','Falta de informação, cooperação e oportunidades','comunidade']] },
    { title: 'Qual tipo de solução mais desperta sua curiosidade?', help: 'Não existe resposta certa ou errada.', choices: [['🤖','IA, sensores, mapas e agricultura de precisão','agro'],['🧪','Monitoramento, tratamento e uso eficiente da água','agua'],['🧬','Biotecnologia, genômica e descoberta de espécies','biodiversidade'],['📡','Alertas, dados climáticos e planejamento de riscos','clima'],['📚','Educação, oficinas e mobilização comunitária','comunidade']] },
    { title: 'Em uma iniciativa local, qual papel você assumiria primeiro?', help: 'Pense na atitude que seria mais natural para você.', choices: [['📊','Testaria tecnologias e compararia resultados','agro'],['🔎','Acompanharia indicadores de água e consumo','agua'],['🦋','Mapearia espécies e áreas prioritárias','biodiversidade'],['🛡️','Criaria planos de prevenção e adaptação','clima'],['📣','Convidaria pessoas e traduziria o conhecimento','comunidade']] },
    { title: 'Qual resultado faria você sentir que valeu a pena participar?', help: 'Escolha o impacto que mais importa para você.', choices: [['🚜','Mais produtividade com menor impacto','agro'],['🚰','Água mais segura e menos desperdício','agua'],['🌿','Mais áreas protegidas e recuperadas','biodiversidade'],['☀️','Comunidade mais preparada para riscos climáticos','clima'],['👥','Mais conhecimento, parcerias e oportunidades','comunidade']] },
    { title: 'Qual ideia melhor representa o futuro que você deseja?', help: 'Esta escolha ajuda a consolidar seu perfil.', choices: [['🌾','Campo produtivo, tecnológico e sustentável','agro'],['💙','Água protegida e utilizada com inteligência','agua'],['🌎','Biodiversidade conhecida e valorizada','biodiversidade'],['📈','Território preparado para mudanças climáticas','clima'],['🔗','Pessoas e instituições trabalhando juntas','comunidade']] }
  ];

  let answers = [];
  let currentStep = 0;
  let lastFocused = null;
  let dialog;
  let body;
  let progress;
  let latestStats = { total: 0, profiles: {} };

  const counterKey = (name) => `${COUNTER_PREFIX}-${name}`;
  async function getCounter(name) {
    try {
      const response = await fetch(`${COUNTER_BASE}/get/${encodeURIComponent(counterKey(name))}`, { cache: 'no-store' });
      if (!response.ok) return 0;
      const data = await response.json();
      return Number(data.value || 0);
    } catch (_error) { return 0; }
  }
  async function hitCounter(name) {
    try {
      const response = await fetch(`${COUNTER_BASE}/hit/${encodeURIComponent(counterKey(name))}`, { cache: 'no-store' });
      if (!response.ok) return getCounter(name);
      const data = await response.json();
      return Number(data.value || 0);
    } catch (_error) { return getCounter(name); }
  }

  function safeReadResult() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      if (parsed && PROFILES[parsed.profile]) return parsed;
    } catch (_error) {}
    return null;
  }

  function saveResult(profile) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ profile, answers, date: new Date().toISOString() })); } catch (_error) {}
  }

  function scoreAnswers(source = answers) {
    const scores = Object.fromEntries(PROFILE_ORDER.map((id) => [id, 0]));
    source.forEach((answer) => { if (scores[answer] !== undefined) scores[answer] += 1; });
    return scores;
  }

  function calculateProfile(source = answers) {
    const scores = scoreAnswers(source);
    return PROFILE_ORDER.reduce((best, id) => scores[id] > scores[best] ? id : best, PROFILE_ORDER[0]);
  }

  async function loadStats() {
    const values = await Promise.all([getCounter('participants'), ...PROFILE_ORDER.map((id) => getCounter(`profile-${id}`))]);
    latestStats.total = values[0];
    latestStats.profiles = Object.fromEntries(PROFILE_ORDER.map((id, index) => [id, values[index + 1]]));
    document.querySelectorAll('[data-ods-profile-total]').forEach((node) => { node.textContent = String(latestStats.total); });
    return latestStats;
  }

  async function registerCompletion(profileId) {
    let counted = false;
    try { counted = localStorage.getItem(COUNTED_KEY) === 'true'; } catch (_error) {}
    if (!counted) {
      const values = await Promise.all([hitCounter('participants'), hitCounter(`profile-${profileId}`)]);
      latestStats.total = values[0];
      latestStats.profiles[profileId] = values[1];
      try { localStorage.setItem(COUNTED_KEY, 'true'); } catch (_error) {}
    }
    await loadStats();
  }

  function sectionMarkup() {
    const saved = safeReadResult();
    return `
      <section id="ods-profile-challenge" class="ods-profile-challenge" aria-labelledby="ods-profile-challenge-title">
        <div class="ods-profile-challenge-grid">
          <div>
            <span class="ods-profile-kicker">✨ Experiência interativa • cerca de 60 segundos</span>
            <h2 id="ods-profile-challenge-title">Qual é o seu perfil no futuro sustentável do campo?</h2>
            <p>Faça cinco escolhas rápidas e descubra quais ODS mais combinam com sua visão para Itaperuna e o Noroeste Fluminense. Você recebe um resultado personalizado, um mapa de afinidades, sugestões práticas e um passaporte visual para compartilhar.</p>
            <div class="ods-profile-benefits">
              <span class="ods-profile-benefit">✅ Apenas 5 escolhas</span><span class="ods-profile-benefit">🎯 Resultado imediato</span><span class="ods-profile-benefit">🔒 Sem cadastro</span><span class="ods-profile-benefit">📊 Estatística coletiva</span>
            </div>
            <div class="ods-profile-actions">
              <button type="button" class="ods-profile-start" data-ods-profile-open>${saved ? 'Ver meu perfil salvo' : 'Descobrir meu perfil'}</button>
              <a class="ods-profile-secondary" href="#escuta">Ir direto para a escuta</a>
            </div>
          </div>
          <aside class="ods-profile-preview" aria-label="Participação e benefícios">
            <div class="ods-profile-live-stat"><strong data-ods-profile-total>—</strong><span>pessoas já concluíram o desafio</span><small>Contador agregado, sem identificação pessoal.</small></div>
            <strong>Você receberá um resultado mais completo:</strong>
            <div class="ods-profile-preview-row"><span class="ods-profile-preview-icon">🧭</span><span>Perfil principal e ODS relacionados</span></div>
            <div class="ods-profile-preview-row"><span class="ods-profile-preview-icon">📊</span><span>Mapa das cinco afinidades</span></div>
            <div class="ods-profile-preview-row"><span class="ods-profile-preview-icon">🎫</span><span>Passaporte visual personalizado</span></div>
          </aside>
        </div>
      </section>`;
  }

  function dialogMarkup() {
    return `<div id="ods-profile-dialog" class="ods-profile-dialog" role="dialog" aria-modal="true" aria-labelledby="ods-profile-dialog-title" hidden><div class="ods-profile-panel"><div class="ods-profile-panel-head"><strong id="ods-profile-dialog-title">Desafio ODS no Campo</strong><button type="button" class="ods-profile-close" data-ods-profile-close aria-label="Fechar experiência">×</button></div><div class="ods-profile-progress" aria-hidden="true"><span></span></div><div class="ods-profile-body"></div></div></div><div class="ods-profile-toast" role="status" aria-live="polite" hidden></div>`;
  }

  function addHeroButton() {
    const actions = document.querySelector('.ods-hero-actions');
    if (!actions || actions.querySelector('[data-ods-profile-open]')) return;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'ods-button primary';
    button.setAttribute('data-ods-profile-open', 'true');
    button.textContent = safeReadResult() ? 'Ver meu perfil ODS' : 'Descobrir meu perfil ODS';
    actions.insertBefore(button, actions.firstChild);
  }

  function moveListeningSection() {
    const challenge = document.getElementById('ods-profile-challenge');
    const listening = document.getElementById('escuta');
    if (challenge && listening && challenge.nextElementSibling !== listening) challenge.insertAdjacentElement('afterend', listening);
  }

  function installMarkup() {
    const hero = document.querySelector('.ods-hero');
    if (!hero || document.getElementById('ods-profile-challenge')) return false;
    hero.insertAdjacentHTML('afterend', sectionMarkup());
    document.body.insertAdjacentHTML('beforeend', dialogMarkup());
    dialog = document.getElementById('ods-profile-dialog');
    body = dialog.querySelector('.ods-profile-body');
    progress = dialog.querySelector('.ods-profile-progress span');
    addHeroButton();
    moveListeningSection();
    bindEvents();
    loadStats();
    return true;
  }

  function renderQuestion() {
    const question = QUESTIONS[currentStep];
    const selected = answers[currentStep] || '';
    progress.style.width = `${((currentStep + 1) / QUESTIONS.length) * 100}%`;
    body.innerHTML = `<p class="ods-profile-step-count">Pergunta ${currentStep + 1} de ${QUESTIONS.length}</p><h3 class="ods-profile-question">${question.title}</h3><p class="ods-profile-help">${question.help}</p><div class="ods-profile-options" role="radiogroup" aria-label="${question.title}">${question.choices.map(([icon,label,profile]) => `<button type="button" class="ods-profile-option${selected === profile ? ' is-selected' : ''}" data-profile-choice="${profile}" role="radio" aria-checked="${selected === profile}"><span class="ods-profile-option-icon" aria-hidden="true">${icon}</span><span>${label}</span></button>`).join('')}</div><div class="ods-profile-nav">${currentStep > 0 ? '<button type="button" class="ods-profile-back">Voltar</button>' : ''}<button type="button" class="ods-profile-next" ${selected ? '' : 'disabled'}>${currentStep === QUESTIONS.length - 1 ? 'Ver meu perfil' : 'Continuar'}</button></div>`;

    body.querySelectorAll('[data-profile-choice]').forEach((button) => {
      button.addEventListener('click', () => {
        answers[currentStep] = button.dataset.profileChoice;
        body.querySelectorAll('[data-profile-choice]').forEach((option) => {
          const active = option === button;
          option.classList.toggle('is-selected', active);
          option.setAttribute('aria-checked', String(active));
        });
        body.querySelector('.ods-profile-next').disabled = false;
      });
    });
    body.querySelector('.ods-profile-back')?.addEventListener('click', () => { currentStep -= 1; renderQuestion(); });
    body.querySelector('.ods-profile-next').addEventListener('click', async () => {
      if (!answers[currentStep]) return;
      if (currentStep < QUESTIONS.length - 1) { currentStep += 1; renderQuestion(); return; }
      const profileId = calculateProfile();
      saveResult(profileId);
      await registerCompletion(profileId);
      renderResult(profileId);
      updateStartLabels(profileId);
    });
    body.querySelector('[data-profile-choice]')?.focus();
  }

  function affinityMarkup(scores) {
    return PROFILE_ORDER.map((id) => {
      const profile = PROFILES[id];
      const value = scores[id] || 0;
      const percent = value * 20;
      return `<div class="ods-profile-affinity-row"><div><span>${profile.emoji}</span><strong>${profile.label}</strong><em>${value}/5</em></div><div class="ods-profile-affinity-track"><span style="width:${percent}%"></span></div></div>`;
    }).join('');
  }

  function communityMessage(profile) {
    const first = document.querySelector('#ods-listening-top-ods li');
    const text = (first?.textContent || '').trim();
    if (!text || /aguardando/i.test(text)) return 'O retrato coletivo ainda está sendo construído. Sua contribuição na escuta ajuda a revelar quais ODS são considerados prioritários pela comunidade.';
    return profile.ods.some((ods) => text.includes(ods)) ? `Uma prioridade do seu perfil também aparece entre as mais indicadas pela comunidade: ${text}` : `A prioridade coletiva mais citada neste momento é: ${text}. Compare essa visão com o seu resultado.`;
  }

  function renderResult(profileId) {
    const profile = PROFILES[profileId];
    const scores = scoreAnswers();
    const sameProfile = latestStats.profiles[profileId] || 0;
    progress.style.width = '100%';
    body.innerHTML = `<section class="ods-profile-result" aria-live="polite"><div class="ods-profile-result-header"><div class="ods-profile-result-emoji" aria-hidden="true">${profile.emoji}</div><div><p class="ods-profile-step-count">Seu passaporte ODS</p><h3>${profile.title}</h3><div class="ods-profile-ods">${profile.ods.map((ods) => `<span>${ods}</span>`).join('')}</div></div></div><p class="ods-profile-result-lead">${profile.description}</p><div class="ods-profile-result-stats"><div><strong>${latestStats.total}</strong><span>participantes no desafio</span></div><div><strong>${sameProfile}</strong><span>com este mesmo perfil</span></div><div><strong>${Math.max(...Object.values(scores))}/5</strong><span>afinidade principal</span></div></div><div class="ods-profile-affinity"><h4>Seu mapa de afinidades</h4><p>Cada barra representa quantas das cinco escolhas se relacionaram com aquela dimensão.</p>${affinityMarkup(scores)}</div><div class="ods-profile-actions-list">${profile.actions.map((action,index) => `<div class="ods-profile-action-card"><strong>${index + 1}.</strong> ${action}</div>`).join('')}</div><div class="ods-profile-community"><strong>Comparação com a comunidade:</strong> ${communityMessage(profile)}</div><div class="ods-profile-result-buttons"><button type="button" class="ods-profile-share">Compartilhar resultado</button><button type="button" class="ods-profile-download">Baixar passaporte visual</button><button type="button" class="ods-profile-survey">Responder à escuta agora</button><button type="button" class="ods-profile-restart">Refazer o desafio</button></div><p class="ods-profile-privacy">O resultado é educativo e foi calculado no seu navegador. As cinco escolhas não são enviadas com nome, e-mail ou outro identificador. O contador registra somente uma conclusão agregada por navegador.</p></section>`;

    body.querySelector('.ods-profile-share').addEventListener('click', () => shareProfile(profile));
    body.querySelector('.ods-profile-download').addEventListener('click', () => downloadPassport(profile, scores));
    body.querySelector('.ods-profile-survey').addEventListener('click', () => { closeDialog(); document.getElementById('escuta')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); });
    body.querySelector('.ods-profile-restart').addEventListener('click', () => { answers = []; currentStep = 0; renderQuestion(); });
    body.querySelector('.ods-profile-share')?.focus();
  }

  function updateStartLabels(profileId) {
    const profile = PROFILES[profileId];
    document.querySelectorAll('[data-ods-profile-open]').forEach((button) => { button.textContent = `Ver meu perfil: ${profile.title}`; });
  }

  async function openDialog() {
    lastFocused = document.activeElement;
    dialog.hidden = false;
    document.body.classList.add('ods-profile-dialog-open');
    const saved = safeReadResult();
    if (saved) {
      answers = Array.isArray(saved.answers) ? saved.answers : [];
      await registerCompletion(saved.profile);
      renderResult(saved.profile);
    } else {
      answers = [];
      currentStep = 0;
      renderQuestion();
    }
    dialog.querySelector('[data-ods-profile-close]')?.focus();
  }

  function closeDialog() {
    dialog.hidden = true;
    document.body.classList.remove('ods-profile-dialog-open');
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
  }

  function bindEvents() {
    document.addEventListener('click', (event) => {
      if (event.target.closest('[data-ods-profile-open]')) openDialog();
      if (event.target.closest('[data-ods-profile-close]')) closeDialog();
      if (event.target === dialog) closeDialog();
    });
    document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && !dialog.hidden) closeDialog(); });
  }

  async function shareProfile(profile) {
    const text = `Meu perfil no ODS no Campo é “${profile.title}” ${profile.emoji}. Meus ODS relacionados são ${profile.ods.join(', ')}. ${latestStats.total} pessoas já concluíram o desafio. Descubra também o seu perfil.`;
    const payload = { title: 'Meu perfil ODS no Campo', text, url: window.location.href.split('#')[0] };
    try {
      if (navigator.share) await navigator.share(payload);
      else if (navigator.clipboard) { await navigator.clipboard.writeText(`${text} ${payload.url}`); showToast('Texto e link copiados para compartilhar.'); }
      else showToast('Compartilhamento não disponível neste navegador.');
    } catch (_error) {}
  }

  function wrapText(ctx, text, x, y, maxWidth, lineHeight, maxLines) {
    const words = text.split(' '); let line = ''; let lines = 0;
    for (let i = 0; i < words.length && lines < maxLines; i += 1) {
      const test = `${line}${words[i]} `;
      if (ctx.measureText(test).width > maxWidth && line) { ctx.fillText(line.trim(), x, y); line = `${words[i]} `; y += lineHeight; lines += 1; } else line = test;
    }
    if (line && lines < maxLines) ctx.fillText(line.trim(), x, y);
    return y;
  }

  function roundRect(ctx, x, y, w, h, r, fill) {
    ctx.beginPath(); ctx.roundRect(x, y, w, h, r); ctx.fillStyle = fill; ctx.fill();
  }

  function downloadPassport(profile, scores) {
    const canvas = document.createElement('canvas');
    canvas.width = 1080; canvas.height = 1920;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 1080, 1920);
    gradient.addColorStop(0, '#052b19'); gradient.addColorStop(.52, '#0f6b3a'); gradient.addColorStop(1, '#72a52d');
    ctx.fillStyle = gradient; ctx.fillRect(0, 0, 1080, 1920);
    ctx.fillStyle = 'rgba(255,255,255,.08)'; ctx.beginPath(); ctx.arc(945, 120, 280, 0, Math.PI * 2); ctx.fill(); ctx.beginPath(); ctx.arc(120, 1810, 260, 0, Math.PI * 2); ctx.fill();

    ctx.textAlign = 'left'; ctx.fillStyle = '#d8f58c'; ctx.font = '800 32px Arial'; ctx.fillText('ODS NO CAMPO', 86, 105);
    ctx.fillStyle = '#ffffff'; ctx.font = '700 24px Arial'; ctx.fillText('PASSAPORTE DE AFINIDADES PARA O FUTURO SUSTENTÁVEL', 86, 148);
    roundRect(ctx, 82, 205, 916, 390, 34, 'rgba(255,255,255,.12)');
    ctx.textAlign = 'center'; ctx.font = '112px Arial'; ctx.fillText(profile.emoji, 540, 350);
    ctx.font = '800 62px Arial'; ctx.fillStyle = '#ffffff'; wrapText(ctx, profile.title, 540, 455, 820, 70, 2);
    ctx.font = '700 28px Arial'; ctx.fillStyle = '#d8f58c'; ctx.fillText(profile.ods.join('   •   '), 540, 555);

    ctx.textAlign = 'left'; ctx.fillStyle = '#ffffff'; ctx.font = '800 34px Arial'; ctx.fillText('Síntese do seu perfil', 86, 670);
    ctx.font = '400 30px Arial'; ctx.fillStyle = '#edf8ef'; wrapText(ctx, profile.description, 86, 722, 900, 43, 5);

    ctx.fillStyle = '#ffffff'; ctx.font = '800 34px Arial'; ctx.fillText('Mapa de afinidades', 86, 930);
    let y = 980;
    PROFILE_ORDER.forEach((id) => {
      const item = PROFILES[id]; const value = scores[id] || 0; const width = Math.max(10, value * 150);
      ctx.font = '700 25px Arial'; ctx.fillStyle = '#ffffff'; ctx.fillText(`${item.emoji}  ${item.label}`, 86, y);
      ctx.textAlign = 'right'; ctx.fillStyle = '#d8f58c'; ctx.fillText(`${value}/5`, 978, y); ctx.textAlign = 'left';
      roundRect(ctx, 86, y + 18, 892, 24, 12, 'rgba(255,255,255,.15)');
      roundRect(ctx, 86, y + 18, width, 24, 12, '#d8f58c'); y += 92;
    });

    ctx.fillStyle = '#ffffff'; ctx.font = '800 34px Arial'; ctx.fillText('Três caminhos práticos', 86, 1490);
    profile.actions.forEach((action, index) => {
      roundRect(ctx, 82, 1530 + index * 105, 916, 82, 18, 'rgba(255,255,255,.11)');
      ctx.fillStyle = '#d8f58c'; ctx.font = '800 28px Arial'; ctx.fillText(`${index + 1}`, 110, 1581 + index * 105);
      ctx.fillStyle = '#ffffff'; ctx.font = '500 23px Arial'; wrapText(ctx, action, 165, 1568 + index * 105, 790, 31, 2);
    });

    ctx.fillStyle = '#ffffff'; ctx.font = '800 28px Arial'; ctx.fillText(`${latestStats.total} pessoas já concluíram o desafio`, 86, 1870);
    ctx.textAlign = 'right'; ctx.fillStyle = '#d8f58c'; ctx.font = '700 25px Arial'; ctx.fillText('databiomics.com/ods-no-campo/', 994, 1870);
    ctx.textAlign = 'left'; ctx.fillStyle = '#e8f5eb'; ctx.font = '400 18px Arial'; ctx.fillText('Resultado educativo, calculado localmente e sem cadastro.', 86, 1905);

    const link = document.createElement('a');
    link.download = `passaporte-ods-${profile.title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-')}.png`;
    link.href = canvas.toDataURL('image/png'); link.click(); showToast('Passaporte visual gerado com sucesso.');
  }

  function showToast(message) {
    const toast = document.querySelector('.ods-profile-toast');
    if (!toast) return;
    toast.textContent = message; toast.hidden = false; window.clearTimeout(showToast.timer); showToast.timer = window.setTimeout(() => { toast.hidden = true; }, 2800);
  }

  function boot(attempt = 0) {
    if (installMarkup()) return;
    if (attempt < 100) window.setTimeout(() => boot(attempt + 1), 100);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => boot(), { once: true });
  else boot();
})();
