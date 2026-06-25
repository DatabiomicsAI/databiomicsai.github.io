(() => {
  'use strict';

  const STORAGE_KEY = 'odsNoCampoProfileV1';
  const PROFILE_ORDER = ['agro', 'agua', 'biodiversidade', 'clima', 'comunidade'];

  const PROFILES = {
    agro: {
      emoji: '🤖',
      title: 'Inovador do Agro Sustentável',
      description: 'Você acredita que tecnologia, produtividade e responsabilidade ambiental precisam avançar juntas. Seu perfil valoriza soluções aplicadas, dados e inovação para fortalecer o campo.',
      ods: ['ODS 2', 'ODS 9', 'ODS 12'],
      actions: [
        'Acompanhar tecnologias de agricultura de precisão e uso eficiente de insumos.',
        'Conhecer bioinsumos, sensores e ferramentas de apoio à decisão.',
        'Compartilhar soluções que conciliem produtividade, renda e conservação.'
      ]
    },
    agua: {
      emoji: '💧',
      title: 'Guardião da Água',
      description: 'Você enxerga a água como recurso essencial para a vida, a produção e o desenvolvimento regional. Seu perfil prioriza eficiência, qualidade, prevenção e proteção dos recursos hídricos.',
      ods: ['ODS 6', 'ODS 12', 'ODS 13'],
      actions: [
        'Observar desperdícios, vazamentos e oportunidades de reúso responsável.',
        'Valorizar análises, sensores e monitoramento da qualidade da água.',
        'Apoiar a proteção de nascentes, reservatórios e áreas de recarga.'
      ]
    },
    biodiversidade: {
      emoji: '🌳',
      title: 'Protetor da Biodiversidade',
      description: 'Você reconhece que florestas, animais, plantas e microrganismos sustentam água, alimentos, saúde e inovação. Seu perfil valoriza conservação, conhecimento científico e recuperação ambiental.',
      ods: ['ODS 3', 'ODS 13', 'ODS 15'],
      actions: [
        'Apoiar inventários e monitoramento da biodiversidade regional.',
        'Conhecer espécies, fragmentos florestais e serviços ecossistêmicos locais.',
        'Incentivar recuperação ambiental e conexão entre remanescentes.'
      ]
    },
    clima: {
      emoji: '🌦️',
      title: 'Estrategista Climático',
      description: 'Você pensa no futuro e valoriza prevenção, adaptação e decisões baseadas em dados. Seu perfil busca reduzir riscos de secas, calor, chuvas intensas e perdas produtivas.',
      ods: ['ODS 7', 'ODS 11', 'ODS 13'],
      actions: [
        'Acompanhar dados climáticos, alertas e indicadores locais.',
        'Planejar produção, infraestrutura e uso de água considerando riscos.',
        'Defender soluções de adaptação com ciência e responsabilidade.'
      ]
    },
    comunidade: {
      emoji: '🤝',
      title: 'Conector da Comunidade',
      description: 'Você acredita que mudanças duradouras dependem de educação, cooperação e participação social. Seu perfil valoriza diálogo entre produtores, escolas, empresas, ciência e poder público.',
      ods: ['ODS 4', 'ODS 8', 'ODS 17'],
      actions: [
        'Compartilhar conhecimento em linguagem simples e acessível.',
        'Aproximar comunidade, instituições de ensino e setores produtivos.',
        'Participar de ações coletivas e apoiar decisões baseadas em evidências.'
      ]
    }
  };

  const QUESTIONS = [
    {
      title: 'Qual desafio local mais desperta sua atenção?',
      help: 'Escolha a alternativa que mais combina com sua percepção.',
      choices: [
        ['💧', 'Qualidade e disponibilidade de água', 'agua'],
        ['🌱', 'Produção de alimentos e fortalecimento do campo', 'agro'],
        ['🌳', 'Perda de biodiversidade e fragmentos florestais', 'biodiversidade'],
        ['🌦️', 'Secas, calor e eventos climáticos extremos', 'clima'],
        ['🤝', 'Falta de informação, cooperação e oportunidades', 'comunidade']
      ]
    },
    {
      title: 'Qual tipo de solução mais desperta sua curiosidade?',
      help: 'Não existe resposta certa ou errada.',
      choices: [
        ['🤖', 'IA, sensores, mapas e agricultura de precisão', 'agro'],
        ['🧪', 'Monitoramento, tratamento e uso eficiente da água', 'agua'],
        ['🧬', 'Biotecnologia, genômica e descoberta de espécies', 'biodiversidade'],
        ['📡', 'Alertas, dados climáticos e planejamento de riscos', 'clima'],
        ['📚', 'Educação, oficinas e mobilização comunitária', 'comunidade']
      ]
    },
    {
      title: 'Em uma iniciativa local, qual papel você assumiria primeiro?',
      help: 'Pense na atitude que seria mais natural para você.',
      choices: [
        ['📊', 'Testaria tecnologias e compararia resultados', 'agro'],
        ['🔎', 'Acompanharia indicadores de água e consumo', 'agua'],
        ['🦋', 'Mapearia espécies e áreas prioritárias', 'biodiversidade'],
        ['🛡️', 'Criaria planos de prevenção e adaptação', 'clima'],
        ['📣', 'Convidaria pessoas e traduziria o conhecimento', 'comunidade']
      ]
    },
    {
      title: 'Qual resultado faria você sentir que valeu a pena participar?',
      help: 'Escolha o impacto que mais importa para você.',
      choices: [
        ['🚜', 'Mais produtividade com menor impacto', 'agro'],
        ['🚰', 'Água mais segura e menos desperdício', 'agua'],
        ['🌿', 'Mais áreas protegidas e recuperadas', 'biodiversidade'],
        ['☀️', 'Comunidade mais preparada para riscos climáticos', 'clima'],
        ['👥', 'Mais conhecimento, parcerias e oportunidades', 'comunidade']
      ]
    },
    {
      title: 'Qual ideia melhor representa o futuro que você deseja?',
      help: 'Esta escolha ajuda a consolidar seu perfil.',
      choices: [
        ['🌾', 'Campo produtivo, tecnológico e sustentável', 'agro'],
        ['💙', 'Água protegida e utilizada com inteligência', 'agua'],
        ['🌎', 'Biodiversidade conhecida e valorizada', 'biodiversidade'],
        ['📈', 'Território preparado para mudanças climáticas', 'clima'],
        ['🔗', 'Pessoas e instituições trabalhando juntas', 'comunidade']
      ]
    }
  ];

  let answers = [];
  let currentStep = 0;
  let lastFocused = null;
  let dialog;
  let body;
  let progress;
  let startButton;

  function safeReadResult() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      if (parsed && PROFILES[parsed.profile]) return parsed;
    } catch (_error) {}
    return null;
  }

  function saveResult(profile) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ profile, answers, date: new Date().toISOString() }));
    } catch (_error) {}
  }

  function sectionMarkup() {
    const saved = safeReadResult();
    return `
      <section id="ods-profile-challenge" class="ods-profile-challenge" aria-labelledby="ods-profile-challenge-title">
        <div class="ods-profile-challenge-grid">
          <div>
            <span class="ods-profile-kicker">✨ Experiência interativa • cerca de 60 segundos</span>
            <h2 id="ods-profile-challenge-title">Qual é o seu perfil no futuro sustentável do campo?</h2>
            <p>Faça cinco escolhas rápidas e descubra quais ODS mais combinam com sua visão para Itaperuna e o Noroeste Fluminense. Você recebe um resultado personalizado, sugestões práticas e um cartão para compartilhar.</p>
            <div class="ods-profile-benefits" aria-label="Benefícios da experiência">
              <span class="ods-profile-benefit">✅ Apenas 5 escolhas</span>
              <span class="ods-profile-benefit">🎯 Resultado imediato</span>
              <span class="ods-profile-benefit">🔒 Sem cadastro</span>
              <span class="ods-profile-benefit">📱 Cartão compartilhável</span>
            </div>
            <div class="ods-profile-actions">
              <button type="button" class="ods-profile-start" data-ods-profile-open>${saved ? 'Ver meu perfil salvo' : 'Descobrir meu perfil'}</button>
              <a class="ods-profile-secondary" href="#entenda">Explorar todo o conteúdo</a>
            </div>
          </div>
          <aside class="ods-profile-preview" aria-label="O que você receberá">
            <strong>Seu resultado pode revelar um destes caminhos:</strong>
            <p>O perfil não é diagnóstico nem classificação científica. É uma experiência educativa para despertar curiosidade e aproximar você dos ODS.</p>
            <div class="ods-profile-preview-row"><span class="ods-profile-preview-icon">💧</span><span>Água e eficiência</span></div>
            <div class="ods-profile-preview-row"><span class="ods-profile-preview-icon">🤖</span><span>Tecnologia no agro</span></div>
            <div class="ods-profile-preview-row"><span class="ods-profile-preview-icon">🌳</span><span>Biodiversidade e clima</span></div>
          </aside>
        </div>
      </section>`;
  }

  function dialogMarkup() {
    return `
      <div id="ods-profile-dialog" class="ods-profile-dialog" role="dialog" aria-modal="true" aria-labelledby="ods-profile-dialog-title" hidden>
        <div class="ods-profile-panel">
          <div class="ods-profile-panel-head">
            <strong id="ods-profile-dialog-title">Desafio ODS no Campo</strong>
            <button type="button" class="ods-profile-close" data-ods-profile-close aria-label="Fechar experiência">×</button>
          </div>
          <div class="ods-profile-progress" aria-hidden="true"><span></span></div>
          <div class="ods-profile-body"></div>
        </div>
      </div>
      <div class="ods-profile-toast" role="status" aria-live="polite" hidden></div>`;
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

  function installMarkup() {
    const hero = document.querySelector('.ods-hero');
    if (!hero || document.getElementById('ods-profile-challenge')) return false;
    hero.insertAdjacentHTML('afterend', sectionMarkup());
    document.body.insertAdjacentHTML('beforeend', dialogMarkup());
    dialog = document.getElementById('ods-profile-dialog');
    body = dialog.querySelector('.ods-profile-body');
    progress = dialog.querySelector('.ods-profile-progress span');
    startButton = document.querySelector('#ods-profile-challenge [data-ods-profile-open]');
    addHeroButton();
    bindEvents();
    return true;
  }

  function calculateProfile() {
    const scores = Object.fromEntries(PROFILE_ORDER.map((id) => [id, 0]));
    answers.forEach((answer) => {
      if (scores[answer] !== undefined) scores[answer] += 1;
    });
    return PROFILE_ORDER.reduce((best, id) => scores[id] > scores[best] ? id : best, PROFILE_ORDER[0]);
  }

  function renderQuestion() {
    const question = QUESTIONS[currentStep];
    const selected = answers[currentStep] || '';
    progress.style.width = `${((currentStep + 1) / QUESTIONS.length) * 100}%`;
    body.innerHTML = `
      <p class="ods-profile-step-count">Pergunta ${currentStep + 1} de ${QUESTIONS.length}</p>
      <h3 class="ods-profile-question">${question.title}</h3>
      <p class="ods-profile-help">${question.help}</p>
      <div class="ods-profile-options" role="radiogroup" aria-label="${question.title}">
        ${question.choices.map(([icon, label, profile]) => `
          <button type="button" class="ods-profile-option${selected === profile ? ' is-selected' : ''}" data-profile-choice="${profile}" role="radio" aria-checked="${selected === profile}">
            <span class="ods-profile-option-icon" aria-hidden="true">${icon}</span><span>${label}</span>
          </button>`).join('')}
      </div>
      <div class="ods-profile-nav">
        ${currentStep > 0 ? '<button type="button" class="ods-profile-back">Voltar</button>' : ''}
        <button type="button" class="ods-profile-next" ${selected ? '' : 'disabled'}>${currentStep === QUESTIONS.length - 1 ? 'Ver meu perfil' : 'Continuar'}</button>
      </div>`;

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

    body.querySelector('.ods-profile-back')?.addEventListener('click', () => {
      currentStep -= 1;
      renderQuestion();
    });

    body.querySelector('.ods-profile-next').addEventListener('click', () => {
      if (!answers[currentStep]) return;
      if (currentStep < QUESTIONS.length - 1) {
        currentStep += 1;
        renderQuestion();
      } else {
        const profileId = calculateProfile();
        saveResult(profileId);
        renderResult(profileId);
        updateStartLabels(profileId);
      }
    });

    body.querySelector('[data-profile-choice]')?.focus();
  }

  function communityMessage(profile) {
    const first = document.querySelector('#ods-listening-top-ods li');
    const text = (first?.textContent || '').trim();
    if (!text || /aguardando/i.test(text)) {
      return 'O retrato coletivo ainda está sendo construído. Sua participação na escuta ajuda a revelar quais ODS são considerados prioritários pela comunidade.';
    }
    const matches = profile.ods.some((ods) => text.includes(ods));
    return matches
      ? `Uma das prioridades do seu perfil também aparece entre as mais indicadas pela comunidade: ${text}`
      : `A prioridade coletiva mais citada neste momento é: ${text}. Compare essa visão com o seu resultado.`;
  }

  function renderResult(profileId) {
    const profile = PROFILES[profileId];
    progress.style.width = '100%';
    body.innerHTML = `
      <section class="ods-profile-result" aria-live="polite">
        <div class="ods-profile-result-emoji" aria-hidden="true">${profile.emoji}</div>
        <p class="ods-profile-step-count">Seu perfil ODS</p>
        <h3>${profile.title}</h3>
        <p class="ods-profile-result-lead">${profile.description}</p>
        <div class="ods-profile-ods" aria-label="ODS relacionados">${profile.ods.map((ods) => `<span>${ods}</span>`).join('')}</div>
        <div class="ods-profile-actions-list">
          ${profile.actions.map((action, index) => `<div class="ods-profile-action-card"><strong>${index + 1}.</strong> ${action}</div>`).join('')}
        </div>
        <div class="ods-profile-community"><strong>Comparação com a comunidade:</strong> ${communityMessage(profile)}</div>
        <div class="ods-profile-result-buttons">
          <button type="button" class="ods-profile-share">Compartilhar meu perfil</button>
          <button type="button" class="ods-profile-download">Baixar meu cartão</button>
          <button type="button" class="ods-profile-survey">Contribuir com a escuta</button>
          <button type="button" class="ods-profile-restart">Refazer o desafio</button>
        </div>
        <p class="ods-profile-privacy">O resultado foi calculado no seu navegador, sem cadastro e sem envio das suas escolhas. Para participar da escuta comunitária, use o formulário específico da página.</p>
      </section>`;

    body.querySelector('.ods-profile-share').addEventListener('click', () => shareProfile(profile));
    body.querySelector('.ods-profile-download').addEventListener('click', () => downloadCard(profile));
    body.querySelector('.ods-profile-survey').addEventListener('click', () => {
      closeDialog();
      document.getElementById('escuta')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    body.querySelector('.ods-profile-restart').addEventListener('click', () => {
      answers = [];
      currentStep = 0;
      renderQuestion();
    });
    body.querySelector('.ods-profile-share')?.focus();
  }

  function updateStartLabels(profileId) {
    const profile = PROFILES[profileId];
    document.querySelectorAll('[data-ods-profile-open]').forEach((button) => {
      button.textContent = `Ver meu perfil: ${profile.title}`;
    });
  }

  function openDialog() {
    lastFocused = document.activeElement;
    dialog.hidden = false;
    document.body.classList.add('ods-profile-dialog-open');
    const saved = safeReadResult();
    if (saved) {
      answers = Array.isArray(saved.answers) ? saved.answers : [];
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
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !dialog.hidden) closeDialog();
    });
  }

  async function shareProfile(profile) {
    const text = `Meu perfil no ODS no Campo é “${profile.title}” ${profile.emoji}. Meus ODS relacionados são ${profile.ods.join(', ')}. Descubra também o seu perfil.`;
    const payload = { title: 'Meu perfil ODS no Campo', text, url: window.location.href.split('#')[0] };
    try {
      if (navigator.share) {
        await navigator.share(payload);
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(`${text} ${payload.url}`);
        showToast('Texto e link copiados para compartilhar.');
      } else {
        showToast('Compartilhamento não disponível neste navegador.');
      }
    } catch (_error) {}
  }

  function wrapText(ctx, text, x, y, maxWidth, lineHeight, maxLines) {
    const words = text.split(' ');
    let line = '';
    let lines = 0;
    for (let i = 0; i < words.length && lines < maxLines; i += 1) {
      const test = `${line}${words[i]} `;
      if (ctx.measureText(test).width > maxWidth && line) {
        ctx.fillText(line.trim(), x, y);
        line = `${words[i]} `;
        y += lineHeight;
        lines += 1;
      } else {
        line = test;
      }
    }
    if (line && lines < maxLines) ctx.fillText(line.trim(), x, y);
    return y;
  }

  function downloadCard(profile) {
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1350;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 1080, 1350);
    gradient.addColorStop(0, '#062e1b');
    gradient.addColorStop(.58, '#0f6b3a');
    gradient.addColorStop(1, '#74a92e');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'rgba(255,255,255,.10)';
    ctx.beginPath(); ctx.arc(930, 120, 250, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(130, 1240, 220, 0, Math.PI * 2); ctx.fill();

    ctx.textAlign = 'center';
    ctx.fillStyle = '#d8f58c';
    ctx.font = '700 38px Arial, sans-serif';
    ctx.fillText('ODS NO CAMPO', 540, 110);
    ctx.fillStyle = '#ffffff';
    ctx.font = '700 30px Arial, sans-serif';
    ctx.fillText('Meu perfil para o futuro sustentável do campo', 540, 165);

    ctx.font = '120px Arial, sans-serif';
    ctx.fillText(profile.emoji, 540, 360);
    ctx.font = '800 68px Arial, sans-serif';
    wrapText(ctx, profile.title, 540, 470, 880, 78, 3);

    ctx.font = '400 34px Arial, sans-serif';
    ctx.fillStyle = '#e8f5eb';
    wrapText(ctx, profile.description, 540, 650, 850, 48, 5);

    ctx.fillStyle = 'rgba(255,255,255,.14)';
    ctx.fillRect(125, 900, 830, 130);
    ctx.fillStyle = '#ffffff';
    ctx.font = '700 34px Arial, sans-serif';
    ctx.fillText('ODS relacionados', 540, 950);
    ctx.font = '800 40px Arial, sans-serif';
    ctx.fillText(profile.ods.join('  •  '), 540, 1005);

    ctx.fillStyle = '#ffffff';
    ctx.font = '700 31px Arial, sans-serif';
    ctx.fillText('Descubra também o seu perfil', 540, 1165);
    ctx.fillStyle = '#d8f58c';
    ctx.font = '700 28px Arial, sans-serif';
    ctx.fillText('databiomics.com/ods-no-campo/', 540, 1220);
    ctx.fillStyle = '#e8f5eb';
    ctx.font = '400 23px Arial, sans-serif';
    ctx.fillText('Experiência educativa • resultado calculado sem cadastro', 540, 1280);

    const link = document.createElement('a');
    link.download = `meu-perfil-ods-${profile.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    showToast('Cartão gerado com sucesso.');
  }

  function showToast(message) {
    const toast = document.querySelector('.ods-profile-toast');
    if (!toast) return;
    toast.textContent = message;
    toast.hidden = false;
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => { toast.hidden = true; }, 2800);
  }

  function boot(attempt = 0) {
    if (installMarkup()) return;
    if (attempt < 100) window.setTimeout(() => boot(attempt + 1), 100);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => boot(), { once: true });
  } else {
    boot();
  }
})();
