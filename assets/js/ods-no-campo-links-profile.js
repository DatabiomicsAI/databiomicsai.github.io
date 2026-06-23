(() => {
  const onReady = (fn) => {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn, { once: true });
    } else {
      fn();
    }
  };

  const odsLinks = [
    [2, 'Agricultura sustentável e segurança alimentar'],
    [3, 'Saúde e bem-estar'],
    [4, 'Educação de qualidade'],
    [6, 'Água potável e saneamento'],
    [7, 'Energia limpa e acessível'],
    [8, 'Trabalho decente e crescimento econômico'],
    [9, 'Indústria, inovação e infraestrutura'],
    [11, 'Cidades e comunidades sustentáveis'],
    [12, 'Consumo e produção responsáveis'],
    [13, 'Ação contra a mudança do clima'],
    [14, 'Vida na água'],
    [15, 'Vida terrestre e biodiversidade'],
    [17, 'Parcerias e meios de implementação']
  ];

  const replaceEmail = (root) => {
    root.querySelectorAll('a[href^="mailto:"]').forEach((link) => {
      if (/databiomics\.com/i.test(link.href)) {
        link.href = 'mailto:info@databiomics.com';
        link.textContent = 'info@databiomics.com';
      }
    });

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
      node.nodeValue = node.nodeValue
        .replace(/contact@databiomics\.com/gi, 'info@databiomics.com')
        .replace(/databiomics@gmail\.com/gi, 'info@databiomics.com');
    });
  };

  onReady(() => {
    const page = document.querySelector('.ods-page');
    if (!page || document.documentElement.dataset.odsLinksProfile === 'true') return;
    document.documentElement.dataset.odsLinksProfile = 'true';

    const form = document.getElementById('ods-listening-form');
    if (form) form.action = 'https://formsubmit.co/info@databiomics.com';
    replaceEmail(page);

    const priorityBlock = document.getElementById('ods-priority-block');
    if (priorityBlock && !priorityBlock.querySelector('.ods-official-links')) {
      const officialLinks = document.createElement('details');
      officialLinks.className = 'ods-official-links';
      officialLinks.open = true;
      officialLinks.innerHTML = `
        <summary>Conheça cada ODS antes de marcar</summary>
        <p>Os links abaixo levam às explicações oficiais do Ipea, com as metas adaptadas ao contexto brasileiro.</p>
        <div class="ods-official-links-grid">
          ${odsLinks.map(([number, title]) => `<a class="ods-official-link" href="https://www.ipea.gov.br/ods/ods${number}.html" target="_blank" rel="noopener noreferrer">ODS ${number} — ${title}</a>`).join('')}
        </div>`;
      const help = priorityBlock.querySelector('.ods-block-help');
      if (help) help.insertAdjacentElement('afterend', officialLinks);
      else priorityBlock.prepend(officialLinks);
    }

    const sourceCards = Array.from(page.querySelectorAll('.ods-card.ods-sources'));
    if (sourceCards[0]) {
      sourceCards[0].innerHTML = `
        <h3>Agenda 2030 e acompanhamento dos ODS no Brasil</h3>
        <p>Fontes oficiais para compreender os objetivos, metas e indicadores nacionais.</p>
        <ul class="ods-source-links">
          <li><a href="https://brasil.un.org/pt-br/sdgs" target="_blank" rel="noopener noreferrer">ONU Brasil — conheça os 17 ODS</a></li>
          <li><a href="https://www.gov.br/secretariageral/pt-br/cnods/agenda-2030" target="_blank" rel="noopener noreferrer">Comissão Nacional para os ODS — Agenda 2030</a></li>
          <li><a href="https://www.ipea.gov.br/ods/" target="_blank" rel="noopener noreferrer">Ipea — metas dos ODS adaptadas ao Brasil</a></li>
          <li><a href="https://odsbrasil.gov.br/home/agenda" target="_blank" rel="noopener noreferrer">ODS Brasil — indicadores oficiais</a></li>
        </ul>`;
    }

    if (sourceCards[1]) {
      sourceCards[1].innerHTML = `
        <h3>ODS diretamente relacionados a esta ação</h3>
        <p>Acesse as explicações, metas e indicadores dos temas abordados no questionário.</p>
        <ul class="ods-source-links">
          <li><a href="https://www.ipea.gov.br/ods/ods2.html" target="_blank" rel="noopener noreferrer">ODS 2 — agricultura sustentável e segurança alimentar</a></li>
          <li><a href="https://www.ipea.gov.br/ods/ods6.html" target="_blank" rel="noopener noreferrer">ODS 6 — água potável e saneamento</a></li>
          <li><a href="https://www.ipea.gov.br/ods/ods9.html" target="_blank" rel="noopener noreferrer">ODS 9 — ciência, inovação e infraestrutura</a></li>
          <li><a href="https://www.ipea.gov.br/ods/ods12.html" target="_blank" rel="noopener noreferrer">ODS 12 — consumo e produção responsáveis</a></li>
          <li><a href="https://www.ipea.gov.br/ods/ods13.html" target="_blank" rel="noopener noreferrer">ODS 13 — ação climática</a></li>
          <li><a href="https://www.ipea.gov.br/ods/ods14.html" target="_blank" rel="noopener noreferrer">ODS 14 — vida na água</a></li>
          <li><a href="https://www.ipea.gov.br/ods/ods15.html" target="_blank" rel="noopener noreferrer">ODS 15 — vida terrestre e biodiversidade</a></li>
          <li><a href="https://www.ipea.gov.br/ods/ods17.html" target="_blank" rel="noopener noreferrer">ODS 17 — parcerias e meios de implementação</a></li>
        </ul>`;
    }

    const academicGrid = page.querySelector('.ods-academic-grid');
    if (academicGrid) {
      const academicProfile = academicGrid.children[0];
      const organizationsCard = academicGrid.querySelector('.ods-academic-card');
      if (academicProfile) {
        academicProfile.innerHTML = `
          <span class="ods-kicker" style="color:#cdeb86">Identificação acadêmica</span>
          <h2>Atividades Extensionistas I — Desenvolvimento Sustentável</h2>
          <p>Esta página integra uma ação acadêmica extensionista vinculada ao Centro de Educação, Humanidades, Letras e Artes (CEHLA), aproximando conhecimento universitário, comunidade e contexto regional.</p>
          <p><strong>Estudante:</strong> Leandro de Mattos Pereira — R.A. nº 450257-2026<br>
          <strong>Curso atual:</strong> Licenciatura em Ciências Biológicas — 2ª graduação<br>
          <strong>Instituição:</strong> Centro Universitário Cidade Verde — UniCV</p>
          <div class="ods-profile-credentials">
            <p><strong>Formação e trajetória científica:</strong> Bacharel em Ciências Biológicas pela Universidade Estadual do Norte Fluminense Darcy Ribeiro (UENF), com ênfase em Biotecnologia; mestre em Biotecnologia e Biociências; doutor em Biologia Computacional e de Sistemas; pesquisador com experiência em bioinformática, genômica, microbioma, biotecnologia e inteligência artificial aplicada às ciências biológicas, além de experiências de pós-doutoramento em instituições de pesquisa no Brasil e em Portugal.</p>
          </div>`;
      }
      if (organizationsCard) {
        organizationsCard.innerHTML = `
          <h3>Organizações envolvidas</h3>
          <p><strong>WBPereira Comércio e Serviços</strong><br>CNPJ 31.037.104/0001-02</p>
          <div class="ods-databiomics-role">
            <p><strong>Databiomics®</strong><br>Laboratório de Tecnologia da WBPereira, responsável pelo desenvolvimento da página e pelo apoio à organização da informação. A Databiomics® é coordenada por Leandro de Mattos Pereira, que atua atualmente como <strong>sócio-administrador e consultor da WBPereira Comércio e Serviços</strong>.</p>
          </div>
          <p><strong>Contato:</strong> <a href="mailto:info@databiomics.com">info@databiomics.com</a></p>
          <p>A participação das organizações nesta ação tem caráter educativo, tecnológico e extensionista.</p>`;
      }
    }

    replaceEmail(page);

    if (!document.querySelector('script[data-ods-regional]')) {
      const regional = document.createElement('script');
      regional.src = 'https://cdn.jsdelivr.net/gh/DatabiomicsAI/databiomicsai.github.io@ajustes-ods-regiao-tecnologia/assets/js/ods-no-campo-regional.js';
      regional.setAttribute('data-ods-regional', 'true');
      document.head.appendChild(regional);
    }
  });
})();
