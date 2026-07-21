(() => {
  'use strict';

  const newText = '<strong>Databiomics®</strong><br>Leandro de Mattos Pereira atua como sócio-administrador e consultor da WBPereira Comércio e Serviços, sem vínculo empregatício.';
  const textReplacements = [
    ['projeto de extensão universitária', 'atividade participativa da Databiomics®'],
    ['projeto de extensão', 'iniciativa Databiomics®'],
    ['Atividades Extensionistas I — Desenvolvimento Sustentável', 'ODS no Campo — Desenvolvimento Sustentável'],
    ['Identificação acadêmica', 'Identificação da iniciativa'],
    ['ação acadêmica extensionista', 'iniciativa independente da Databiomics®/WBPereira'],
    ['atividade acadêmica', 'iniciativa Databiomics®'],
    ['atividade extensionista', 'iniciativa Databiomics®'],
    ['ação extensionista', 'iniciativa Databiomics®'],
    ['Devolutiva pública da extensão', 'Devolutiva pública da iniciativa'],
    ['Alcance da ação extensionista', 'Alcance da iniciativa Databiomics®'],
    ['Escuta inicial do projeto de extensão', 'Escuta inicial da iniciativa Databiomics®'],
    ['fins acadêmicos, educativos e participativos', 'fins educativos, participativos e de melhoria da iniciativa Databiomics®'],
    ['finalidades acadêmicas, educativas', 'finalidades educativas, participativas'],
    ['relatório da atividade extensionista', 'relatório da iniciativa'],
    ['futuras ações extensionistas', 'futuras ações participativas da Databiomics®'],
    ['conhecimento acadêmico', 'informação científica aplicada'],
    ['universidade e sociedade', 'Databiomics® e sociedade'],
    ['conhecimento universitário', 'informação científica aplicada'],
    ['Centro de Educação, Humanidades, Letras e Artes (CEHLA)', 'Databiomics®/WBPereira'],
    ['Centro Universitário Cidade Verde — UniCV', 'Databiomics®/WBPereira'],
    ['Instituição: Centro Universitário Cidade Verde — UniCV', 'Iniciativa: Databiomics®/WBPereira'],
    ['Estudante: Leandro de Mattos Pereira — R.A. nº 450257-2026', 'Responsável: Leandro de Mattos Pereira'],
    ['Curso atual: Licenciatura em Ciências Biológicas — 2ª graduação', 'Foco: Objetivos de Desenvolvimento Sustentável aplicados ao território'],
    ['disciplina ODS no Campo — Desenvolvimento Sustentável, do curso de Licenciatura em Ciências Biológicas', 'iniciativa ODS no Campo da Databiomics®'],
    ['da disciplina ODS no Campo — Desenvolvimento Sustentável, do curso de Licenciatura em Ciências Biológicas', 'da iniciativa ODS no Campo da Databiomics®'],
    ['da disciplina Atividades Extensionistas I — Desenvolvimento Sustentável, do curso de Licenciatura em Ciências Biológicas', 'da iniciativa ODS no Campo da Databiomics®'],
    ['Pouca integração entre produtores, escolas, universidades, órgãos públicos e empresas', 'Pouca integração entre produtores, escolas, centros de pesquisa, órgãos públicos e empresas'],
    ['instituições de ensino', 'centros de pesquisa e formação']
  ];

  function applyCreditText() {
    const card = document.querySelector('.ods-academic-card');
    if (!card) return false;

    const paragraphs = Array.from(card.querySelectorAll('p'));
    const target = paragraphs.find((paragraph) => /Databiomics/i.test(paragraph.textContent || ''));
    if (!target) return false;

    if (target.innerHTML !== newText) target.innerHTML = newText;

    paragraphs.forEach((paragraph) => {
      if (paragraph === target) return;
      const text = (paragraph.textContent || '').replace(/\s+/g, ' ').trim();
      if (/Databiomics.*coordenada por Leandro de Mattos Pereira/i.test(text)) {
        paragraph.remove();
      }
    });

    return true;
  }

  function hideSourceNotice() {
    document.querySelectorAll('.ods-bioai-external-note').forEach((notice) => {
      notice.hidden = true;
      notice.setAttribute('aria-hidden', 'true');
      notice.style.display = 'none';
    });
  }

  function sanitizeUniversityLanguage() {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent || ['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(parent.tagName)) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });

    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);

    nodes.forEach((node) => {
      let value = node.nodeValue;
      textReplacements.forEach(([from, to]) => {
        value = value.split(from).join(to);
      });
      if (node.nodeValue !== value) node.nodeValue = value;
    });
  }

  function loadPrivacyUpdate() {
    if (document.querySelector('script[data-ods-lgpd-complete]')) return;
    const script = document.createElement('script');
    script.src = '/assets/js/ods-no-campo-credit-text.js?v=20260721-2';
    script.async = false;
    script.setAttribute('data-ods-lgpd-complete', 'true');
    document.head.appendChild(script);
  }

  function applyUpdates() {
    applyCreditText();
    hideSourceNotice();
    sanitizeUniversityLanguage();
  }

  function boot() {
    applyUpdates();
    loadPrivacyUpdate();

    const observer = new MutationObserver(applyUpdates);
    observer.observe(document.body, { childList: true, subtree: true });
    window.setTimeout(() => observer.disconnect(), 30000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
})();
