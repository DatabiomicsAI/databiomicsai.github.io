(() => {
  const ready = (fn) => document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', fn, { once: true })
    : fn();

  const setLabel = (input, text) => {
    if (!input) return;
    input.value = text;
    const label = input.closest('label');
    const node = label && Array.from(label.childNodes).find((item) => item.nodeType === Node.TEXT_NODE);
    if (node) node.nodeValue = ` ${text}`;
  };

  ready(() => {
    const page = document.querySelector('.ods-page');
    if (!page || document.documentElement.dataset.odsRegional === 'true') return;
    document.documentElement.dataset.odsRegional = 'true';

    const helpText = 'Marque o que você percebe como desafio ou tema importante para Itaperuna / Noroeste Fluminense / Rio de Janeiro / outro estado do Brasil.';
    page.querySelectorAll('.ods-theme.t2 > small, .ods-theme.t6 > small, .ods-theme.t12 > small, .ods-theme.t13 > small')
      .forEach((item) => { item.textContent = helpText; });

    const localTitle = document.getElementById('local-title');
    const localSection = localTitle?.closest('.ods-section');
    const localBanner = localSection?.querySelector('.ods-local-banner');
    if (localTitle) localTitle.textContent = 'Demandas produtivas da região e sua relação com os ODS';
    const localIntro = localSection?.querySelector('.ods-heading p');
    if (localIntro) {
      localIntro.textContent = 'Itaperuna e o Noroeste Fluminense reúnem atividades agropecuárias, produção de alimentos, comércio, serviços e cadeias que dependem de água, solo, energia, infraestrutura, conhecimento e capacidade de inovação. Os ODS ajudam a relacionar essas demandas produtivas ao desenvolvimento econômico, social e ambiental.';
    }
    if (localBanner) {
      const heading = localBanner.querySelector('h3');
      const paragraphs = localBanner.querySelectorAll(':scope > div:first-child > p');
      const stats = localBanner.querySelectorAll('.ods-local-stat > div');
      if (heading) heading.textContent = 'Um território produtivo que pode avançar com sustentabilidade, ciência e inovação';
      if (paragraphs[0]) paragraphs[0].textContent = 'A região possui agricultura familiar e empresarial, pecuária, produção vegetal e animal, comércio, serviços técnicos e atividades relacionadas aos recursos naturais. Essas cadeias precisam conciliar produtividade, geração de renda, conservação ambiental, qualificação profissional e acesso a soluções adequadas às condições locais.';
      if (paragraphs[1]) {
        paragraphs[1].textContent = 'Relacionar as demandas produtivas aos ODS permite identificar oportunidades para reduzir perdas e custos, melhorar o uso de água e energia, ampliar o acesso ao conhecimento, fortalecer pequenos e médios produtores, estimular inovação responsável e criar parcerias entre comunidade, instituições de ensino, poder público e empresas.';
        paragraphs[1].classList.add('ods-local-focus');
      }
      if (stats[3]) stats[3].innerHTML = '<strong>Tecnologia e conhecimento</strong>Assistência técnica, conectividade, capacitação, sensores, análise de dados e inovação podem melhorar decisões e ampliar oportunidades.';
    }

    const ods2 = page.querySelector('.ods-theme.t2');
    if (ods2) {
      const assistance = Array.from(ods2.querySelectorAll('input[name="desafios_ods2"]'))
        .find((input) => /assistência técnica|informação/i.test(input.value));
      setLabel(assistance, 'Pouco acesso a assistência técnica, capacitação, informação científica ou tecnologias produtivas');

      if (!document.getElementById('ods-innovation-access-block')) {
        const block = document.createElement('fieldset');
        block.id = 'ods-innovation-access-block';
        block.className = 'ods-theme ods-theme-innovation';
        block.innerHTML = `
          <legend>ODS 4, 9 e 17 — conhecimento, tecnologia, inovação e parcerias</legend>
          <small>${helpText}</small>
          <p class="ods-cross-ods-note"><strong>Relação com os ODS:</strong> educação e formação se relacionam ao ODS 4; infraestrutura, tecnologia e inovação ao ODS 9; e cooperação entre comunidade, instituições de ensino, poder público e empresas ao ODS 17. Esses fatores também apoiam o ODS 2 no setor agropecuário.</p>
          <div class="ods-checks">
            <label class="ods-check"><input type="checkbox" name="desafios_tecnologia_inovacao[]" value="Acesso limitado à internet ou conectividade no campo"> Acesso limitado à internet ou conectividade no campo</label>
            <label class="ods-check"><input type="checkbox" name="desafios_tecnologia_inovacao[]" value="Pouco acesso a cursos, capacitação, extensão rural ou conhecimento científico"> Pouco acesso a cursos, capacitação, extensão rural ou conhecimento científico</label>
            <label class="ods-check"><input type="checkbox" name="desafios_tecnologia_inovacao[]" value="Dificuldade para conhecer ou adotar sensores, aplicativos, automação, drones ou agricultura de precisão"> Dificuldade para conhecer ou adotar sensores, aplicativos, automação, drones ou agricultura de precisão</label>
            <label class="ods-check"><input type="checkbox" name="desafios_tecnologia_inovacao[]" value="Custo elevado de equipamentos, análises ou soluções tecnológicas"> Custo elevado de equipamentos, análises ou soluções tecnológicas</label>
            <label class="ods-check"><input type="checkbox" name="desafios_tecnologia_inovacao[]" value="Pouco acesso a análises de solo, água, clima, plantas ou dados produtivos"> Pouco acesso a análises de solo, água, clima, plantas ou dados produtivos</label>
            <label class="ods-check"><input type="checkbox" name="desafios_tecnologia_inovacao[]" value="Falta de projetos demonstrativos adaptados à realidade regional"> Falta de projetos demonstrativos adaptados à realidade regional</label>
            <label class="ods-check"><input type="checkbox" name="desafios_tecnologia_inovacao[]" value="Pouca integração entre produtores, escolas, universidades, órgãos públicos e empresas"> Pouca integração entre produtores, escolas, universidades, órgãos públicos e empresas</label>
            <label class="ods-check"><input type="checkbox" name="desafios_tecnologia_inovacao[]" value="Dificuldade para transformar conhecimento em soluções práticas e acessíveis"> Dificuldade para transformar conhecimento em soluções práticas e acessíveis</label>
          </div>`;
        ods2.insertAdjacentElement('afterend', block);
      }
    }

    const science = document.getElementById('ods-science-block');
    if (science && !document.getElementById('ods-science-other')) {
      const checks = science.querySelector('.ods-checks');
      const label = document.createElement('label');
      label.className = 'ods-check';
      label.innerHTML = '<input id="ods-science-other-check" type="checkbox" name="ciencia_inovacao[]" value="Outra área ou necessidade"> Outra área ou necessidade';
      checks?.appendChild(label);

      const field = document.createElement('div');
      field.id = 'ods-science-other';
      field.className = 'ods-other-field';
      field.innerHTML = '<label for="ods-science-other-text">Em qual outra área ciência, biologia, biotecnologia ou tecnologia poderia ajudar?</label><textarea id="ods-science-other-text" name="outra_area_ciencia_tecnologia_opcional" maxlength="500" placeholder="Descreva brevemente a necessidade, o problema ou a ideia que você considera importante."></textarea>';
      checks?.insertAdjacentElement('afterend', field);

      const checkbox = label.querySelector('input');
      const textarea = field.querySelector('textarea');
      textarea.disabled = true;
      checkbox.addEventListener('change', () => {
        field.classList.toggle('show', checkbox.checked);
        textarea.disabled = !checkbox.checked;
        if (!checkbox.checked) textarea.value = '';
        if (checkbox.checked) textarea.focus();
      });
    }

    const inviteText = page.querySelector('#escuta .ods-invite p:not(.ods-time)');
    if (inviteText) {
      inviteText.textContent = 'Depois de conhecer os ODS nos vídeos e textos da página, marque as situações que você considera importantes para Itaperuna, o Noroeste Fluminense, o Estado do Rio de Janeiro ou outro estado do Brasil. As respostas ajudam a planejar materiais educativos, analisar prioridades percebidas e avaliar o alcance da atividade extensionista.';
    }
  });
})();
