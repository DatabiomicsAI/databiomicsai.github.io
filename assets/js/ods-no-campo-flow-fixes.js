(() => {
  const onReady = (fn) => {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn, { once: true });
    } else {
      fn();
    }
  };

  const replaceText = (root, replacements) => {
    if (!root) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent || ['SCRIPT', 'STYLE', 'TEXTAREA'].includes(parent.tagName)) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((node) => {
      let text = node.nodeValue;
      replacements.forEach(([pattern, replacement]) => {
        text = text.replace(pattern, replacement);
      });
      node.nodeValue = text;
    });
  };

  onReady(() => {
    const page = document.querySelector('.ods-page');
    if (!page || document.documentElement.dataset.odsFlowFixed === 'true') return;
    document.documentElement.dataset.odsFlowFixed = 'true';

    replaceText(page, [
      [/descarte de óleo e embalagens/gi, 'uso eficiente de materiais e redução de desperdícios'],
      [/resíduos de óleo, filtros, peças e embalagens/gi, 'gestão responsável de materiais, manutenção e redução de desperdícios'],
      [/destinação correta de óleo, filtros, peças e embalagens protege pessoas, solo e água/gi, 'planejamento, manutenção e redução de desperdícios ajudam a proteger recursos e melhorar a eficiência'],
      [/descarte inadequado de óleo, filtros ou peças/gi, 'desperdício de materiais, componentes ou insumos'],
      [/óleo, filtros, peças e embalagens/gi, 'materiais, componentes e embalagens'],
      [/óleo, filtros ou peças/gi, 'materiais, componentes ou equipamentos'],
      [/óleo, filtros e embalagens/gi, 'materiais e embalagens']
    ]);

    document.querySelectorAll('input[name="desafios_ods12"]').forEach((input) => {
      if (/óleo|filtros|peças/i.test(input.value)) {
        input.value = 'Desperdício de materiais, componentes ou insumos';
      }
    });

    const brokenBioeconomyCard = Array.from(document.querySelectorAll('.ods-video')).find((card) => {
      const title = card.querySelector('h3')?.textContent || '';
      return /Bioeconomia: diversidade e riqueza.*Fiocruz/i.test(title);
    });
    if (brokenBioeconomyCard) {
      const iframe = brokenBioeconomyCard.querySelector('iframe');
      const title = brokenBioeconomyCard.querySelector('h3');
      const description = brokenBioeconomyCard.querySelector('.ods-video-copy p');
      const tags = brokenBioeconomyCard.querySelector('.ods-tags');
      if (iframe) {
        iframe.src = 'https://www.youtube-nocookie.com/embed/M3LIPctFCZc';
        iframe.title = 'Compostagem vegetal — Embrapa Agrobiologia, UFRRJ e Pesagro-Rio';
      }
      if (title) title.textContent = 'Compostagem vegetal — Embrapa Agrobiologia, UFRRJ e Pesagro-Rio';
      if (description) description.textContent = 'Apresenta uma tecnologia biológica simples para aproveitar materiais vegetais, produzir composto e devolver nutrientes ao sistema produtivo.';
      if (tags) tags.innerHTML = '<span class="ods-tag">ODS 2</span><span class="ods-tag">ODS 12</span><span class="ods-tag">ODS 13</span><span class="ods-tag">Biologia do solo</span>';
    }

    const videosSection = document.getElementById('videos-ods');
    const listeningSection = document.getElementById('escuta');
    const innovationSection = document.getElementById('ciencia-inovacao-ods');
    const appliedVideosSection = document.querySelector('section[aria-labelledby="videos-ciencia-title"]');
    const quizSection = document.querySelector('.ods-quiz')?.closest('.ods-section');

    if (videosSection && listeningSection) {
      let cta = document.getElementById('convite-questionario-ods');
      if (!cta) {
        cta = document.createElement('section');
        cta.id = 'convite-questionario-ods';
        cta.className = 'ods-questionnaire-cta';
        cta.setAttribute('aria-labelledby', 'convite-questionario-title');
        cta.innerHTML = `
          <div class="ods-questionnaire-cta-grid">
            <div>
              <span class="ods-kicker">Agora é a sua vez de participar</span>
              <h2 id="convite-questionario-title">Ajude a identificar os temas que merecem mais informação e atenção na região</h2>
              <p>Este questionário integra uma <strong>atividade participativa da Databiomics®</strong> no âmbito da iniciativa ODS no Campo. O conhecimento apresentado na página é compartilhado com a comunidade, e as respostas ajudam a orientar a continuidade da iniciativa.</p>
              <p>Ao participar, você contribui para compreender quais ODS, desafios ambientais e possibilidades de ciência e inovação são percebidos como mais importantes para <strong>Itaperuna, o Noroeste Fluminense e o Estado do Rio de Janeiro</strong>.</p>
              <p class="ods-extension-note"><strong>Finalidade da escuta:</strong> reunir percepções da comunidade para fins educativos, participativos e de melhoria da iniciativa Databiomics®. O formulário não solicita identificação de empresa ou propriedade e não avalia situações individuais.</p>
              <a class="ods-button primary" href="#escuta">Responder à escuta inicial</a>
            </div>
            <ul class="ods-questionnaire-cta-list" aria-label="Características do questionário">
              <li>Leva aproximadamente dois minutos.</li>
              <li>As perguntas são principalmente de marcar opções.</li>
              <li>Nome, cidade, bairro, faixa etária e identidade de gênero são opcionais.</li>
              <li>Os resultados serão analisados de forma agrupada e sem exposição individual.</li>
              <li>As respostas poderão orientar novos conteúdos educativos e futuras ações participativas da Databiomics®.</li>
            </ul>
          </div>`;
      }

      videosSection.insertAdjacentElement('afterend', cta);
      cta.insertAdjacentElement('afterend', listeningSection);

      if (innovationSection) {
        listeningSection.insertAdjacentElement('afterend', innovationSection);
      }
      if (appliedVideosSection) {
        (innovationSection || listeningSection).insertAdjacentElement('afterend', appliedVideosSection);
      }
      if (quizSection) {
        (appliedVideosSection || innovationSection || listeningSection).insertAdjacentElement('afterend', quizSection);
      }
    }

    const invite = listeningSection?.querySelector('.ods-invite');
    if (invite) {
      const heading = invite.querySelector('h2');
      const firstParagraph = invite.querySelector('p:not(.ods-time)');
      if (heading) heading.textContent = 'Escuta inicial da iniciativa Databiomics®';
      if (firstParagraph) {
        firstParagraph.textContent = 'Depois de conhecer os ODS nos vídeos e textos da página, marque as situações que você considera mais importantes para Itaperuna, o Noroeste Fluminense e o Estado do Rio de Janeiro. As respostas ajudam a planejar materiais educativos, analisar prioridades percebidas e avaliar o alcance da iniciativa Databiomics®.';
      }
      const extra = document.createElement('p');
      extra.className = 'ods-extension-note';
      extra.innerHTML = '<strong>Por que responder?</strong> Porque uma iniciativa participativa deve ouvir a comunidade, e não apenas transmitir conteúdo. Sua participação ajuda a aproximar informação científica aplicada das necessidades e interesses do território.';
      if (!invite.querySelector('.ods-extension-note')) {
        invite.appendChild(extra);
      }
    }

    if (!document.querySelector('link[data-ods-links-profile]')) {
      const stylesheet = document.createElement('link');
      stylesheet.rel = 'stylesheet';
      stylesheet.href = '/assets/css/ods-no-campo-links-profile.css?v=20260623-5';
      stylesheet.setAttribute('data-ods-links-profile', 'true');
      document.head.appendChild(stylesheet);
    }

    if (!document.querySelector('script[data-ods-links-profile]')) {
      const script = document.createElement('script');
      script.src = '/assets/js/ods-no-campo-links-profile.js?v=20260721-2';
      script.setAttribute('data-ods-links-profile', 'true');
      document.head.appendChild(script);
    }
  });
})();
