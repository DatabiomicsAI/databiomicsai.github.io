(() => {
  'use strict';

  const SOURCE = {
    mma: 'https://www.gov.br/mma/pt-br/assuntos/biodiversidade-e-biomas/biomas-e-ecossistemas/biomas/mata-atlantica',
    inpe: 'https://www.gov.br/inpe/pt-br/acesso-a-informacao/perguntas-frequentes/principais-produtos-e-servicos-do-inpe/monitoramento-do-territorio-florestas/o-que-resta-da-mata',
    fiocruzNatural: 'https://www.far.fiocruz.br/pesquisa/departamentos-da-pesquisa/produtos-naturais/',
    fiocruzBioprospecting: 'https://plataformas.fiocruz.br/unidades/RPT10A',
    mapaFiocruz: 'https://www.gov.br/agricultura/pt-br/assuntos/noticias/2022/mapa-e-fiocruz-identificam-26-produtos-da-biodiversidade-com-potencial-de-mercado/',
    regionalPaper: 'https://www.scielo.br/pdf/asoc/v27/1809-4422-asoc-27-e01701.pdf',
    uenf: 'https://uenf.br/cbb/lca/2024/03/07/publicacoes-feitas-em-2024/',
    embrapaAiVideo: 'https://www.youtube.com/watch?v=zjZNtGn7y5w'
  };

  const copy = {
    pt: {
      kicker: 'Aplicações brasileiras conectadas aos ODS',
      title: 'Ciência, biodiversidade, Mata Atlântica e inteligência artificial para o desenvolvimento sustentável',
      intro: 'O cumprimento dos ODS não depende de uma única tecnologia. Ele pode envolver conservação da biodiversidade, descoberta de produtos naturais, pesquisa farmacêutica, inventários biológicos, sensoriamento remoto, inteligência artificial, agricultura de precisão e participação social.',
      pharmaTitle: 'Biodiversidade e inovação farmacêutica',
      pharmaText: 'Plantas, fungos, bactérias e outros organismos podem produzir moléculas bioativas com interesse para saúde, cosméticos, alimentos e indústria. A Fiocruz mantém estruturas de bioprospecção e desenvolvimento de produtos naturais, e iniciativas públicas já identificaram cadeias da biodiversidade com potencial de mercado. Preservar espécies e conhecimentos associados é também preservar possibilidades futuras de novos fármacos, fitoterápicos, diagnósticos e processos biotecnológicos.',
      atlanticTitle: 'Mata Atlântica: patrimônio biológico e fonte de conhecimento',
      atlanticText: 'O Ministério do Meio Ambiente registra 17.150 espécies vegetais de ocorrência na Mata Atlântica. Entre as espécies com estado de conservação conhecido, 43% estão em alguma categoria de ameaça. O bioma também protege água, solo, clima, polinizadores e recursos genéticos importantes para agricultura, saúde e inovação.',
      regionalTitle: 'Norte e Noroeste Fluminense: fragmentos que ainda precisam ser conhecidos',
      regionalText: 'Estudos sobre o Norte e o Noroeste Fluminense mostram uma paisagem historicamente alterada e fragmentada, com diferentes formações da Mata Atlântica. Ganhos de vegetação secundária podem esconder perdas de florestas maduras. Isso torna prioritários inventários locais de plantas, fungos, microrganismos e fauna, além do monitoramento de remanescentes menos estudados e de áreas estratégicas para conexão ecológica.',
      aiTitle: 'IA, dados e monitoramento ambiental',
      aiText: 'Inteligência artificial pode combinar imagens de satélite, sensores, clima, produção e registros de espécies para detectar mudanças, apoiar alertas, reconhecer padrões e priorizar áreas de conservação ou manejo. No agro, também pode ajudar no uso eficiente de água e insumos, previsão de riscos e tomada de decisão. Sempre deve ser usada com validação científica, transparência e proteção de dados.',
      regionalNote: 'Para o Noroeste Fluminense, uma agenda integrada pode unir ODS 2, 3, 6, 8, 9, 12, 13, 15 e 17: produção de alimentos, saúde, água, inovação, trabalho, consumo responsável, clima, biodiversidade e parcerias.',
      videosTitle: 'Vídeos e exemplos de aplicação',
      videosIntro: 'Os exemplos abaixo mostram que ciência aplicada aos ODS vai além dos bioinsumos e inclui inteligência artificial, biotecnologia, economia circular e monitoramento.',
      aiVideoTitle: 'Uso de inteligência artificial na agricultura — Embrapa',
      aiVideoText: 'Debate sobre como técnicas de IA podem apoiar pesquisa agropecuária, gestão, previsão e inovação.',
      bioinputsTitle: 'Bioinsumos — Embrapa Agrobiologia',
      bioinputsText: 'Exemplo de microbiologia aplicada à produção sustentável e à redução de impactos.',
      compostTitle: 'Compostagem vegetal e aproveitamento de biomassa',
      compostText: 'Exemplo de bioprocesso ligado à ciclagem de nutrientes, redução de resíduos e saúde do solo.',
      sourceMma: 'MMA — Mata Atlântica',
      sourceInpe: 'INPE — remanescentes do bioma',
      sourceFiocruz: 'Fiocruz — produtos naturais',
      sourceMap: 'Mapa/Fiocruz — biodiversidade e mercado',
      sourceRegional: 'Artigo científico — Norte e Noroeste Fluminense',
      sourceUenf: 'UENF — publicação regional',
      questionTitle: 'Novas opções adicionadas à escuta',
      questionText: 'Você também pode indicar interesse em biodiversidade, bioprospecção, Mata Atlântica e uso responsável de IA.'
    },
    en: {
      kicker: 'Brazilian applications connected to the SDGs',
      title: 'Science, biodiversity, the Atlantic Forest and artificial intelligence for sustainable development',
      intro: 'Achieving the SDGs does not depend on a single technology. It may involve biodiversity conservation, natural-product discovery, pharmaceutical research, biological inventories, remote sensing, artificial intelligence, precision agriculture and public participation.',
      pharmaTitle: 'Biodiversity and pharmaceutical innovation',
      pharmaText: 'Plants, fungi, bacteria and other organisms can produce bioactive molecules of interest to health, cosmetics, food and industry. Fiocruz maintains natural-product and bioprospecting facilities, while public initiatives have identified biodiversity value chains with market potential. Conserving species and associated knowledge also preserves opportunities for future medicines, herbal products, diagnostics and biotechnological processes.',
      atlanticTitle: 'Atlantic Forest: biological heritage and source of knowledge',
      atlanticText: 'Brazil’s Ministry of the Environment records 17,150 plant species occurring in the Atlantic Forest. Among species with a known conservation status, 43% fall into a threatened category. The biome also protects water, soil, climate, pollinators and genetic resources relevant to agriculture, health and innovation.',
      regionalTitle: 'Northern and Northwestern Rio de Janeiro: fragments that still require research',
      regionalText: 'Studies of Northern and Northwestern Rio de Janeiro show a historically altered and fragmented landscape with different Atlantic Forest formations. Gains in secondary vegetation may conceal losses of mature forest. This makes local inventories of plants, fungi, microorganisms and fauna, as well as monitoring of less-studied remnants and ecological connections, especially important.',
      aiTitle: 'AI, data and environmental monitoring',
      aiText: 'Artificial intelligence can combine satellite imagery, sensors, climate, production and species records to detect changes, support alerts, recognise patterns and prioritise conservation or management areas. In agriculture, it can also support efficient use of water and inputs, risk forecasting and decision-making. It should always be applied with scientific validation, transparency and data protection.',
      regionalNote: 'For Northwestern Rio de Janeiro, an integrated agenda can connect SDGs 2, 3, 6, 8, 9, 12, 13, 15 and 17: food production, health, water, innovation, work, responsible consumption, climate, biodiversity and partnerships.',
      videosTitle: 'Videos and application examples',
      videosIntro: 'These examples show that science applied to the SDGs goes beyond bioinputs and also includes artificial intelligence, biotechnology, circular economy and monitoring.',
      aiVideoTitle: 'Artificial intelligence in agriculture — Embrapa',
      aiVideoText: 'A discussion of how AI techniques can support agricultural research, management, forecasting and innovation.',
      bioinputsTitle: 'Bioinputs — Embrapa Agrobiologia',
      bioinputsText: 'An example of microbiology applied to sustainable production and impact reduction.',
      compostTitle: 'Plant composting and biomass reuse',
      compostText: 'An example of a bioprocess linked to nutrient cycling, waste reduction and soil health.',
      sourceMma: 'MMA — Atlantic Forest',
      sourceInpe: 'INPE — remaining forest',
      sourceFiocruz: 'Fiocruz — natural products',
      sourceMap: 'Mapa/Fiocruz — biodiversity and markets',
      sourceRegional: 'Scientific paper — Northern and Northwestern Rio',
      sourceUenf: 'UENF — regional publication',
      questionTitle: 'New survey options added',
      questionText: 'You may also indicate interest in biodiversity, bioprospecting, the Atlantic Forest and responsible AI use.'
    }
  };

  const lang = () => String(localStorage.getItem('siteLang') || document.documentElement.lang || 'pt').toLowerCase().startsWith('en') ? 'en' : 'pt';
  const t = (key) => (copy[lang()] || copy.pt)[key] || copy.pt[key] || key;

  const link = (href, label) => `<a class="ods-bioai-link" href="${href}" target="_blank" rel="noopener noreferrer">${label} ↗</a>`;
  const video = (id, title, text, tags) => `
    <article class="ods-bioai-video">
      <div class="ods-bioai-video-frame"><iframe src="https://www.youtube-nocookie.com/embed/${id}" title="${title}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>
      <div class="ods-bioai-video-copy"><h4>${title}</h4><p>${text}</p><div class="ods-bioai-tags">${tags.map((tag) => `<span class="ods-bioai-tag">${tag}</span>`).join('')}</div></div>
    </article>`;

  function renderSection() {
    const oldSection = document.querySelector('section[aria-labelledby="videos-ciencia-title"]');
    if (!oldSection) return false;
    oldSection.className = 'ods-bioai-section';
    oldSection.setAttribute('aria-labelledby', 'ods-bioai-title');
    oldSection.innerHTML = `
      <div class="ods-bioai-hero">
        <span class="ods-kicker">${t('kicker')}</span>
        <h2 id="ods-bioai-title">${t('title')}</h2>
        <p class="ods-bioai-intro">${t('intro')}</p>
        <div class="ods-bioai-grid">
          <article class="ods-bioai-card"><span class="ods-bioai-icon">💊</span><h3>${t('pharmaTitle')}</h3><p>${t('pharmaText')}</p><div class="ods-bioai-links">${link(SOURCE.fiocruzNatural,t('sourceFiocruz'))}${link(SOURCE.mapaFiocruz,t('sourceMap'))}</div></article>
          <article class="ods-bioai-card"><span class="ods-bioai-icon">🌳</span><h3>${t('atlanticTitle')}</h3><p>${t('atlanticText')}</p><div class="ods-bioai-links">${link(SOURCE.mma,t('sourceMma'))}${link(SOURCE.inpe,t('sourceInpe'))}</div></article>
          <article class="ods-bioai-card"><span class="ods-bioai-icon">🦋</span><h3>${t('regionalTitle')}</h3><p>${t('regionalText')}</p><div class="ods-bioai-links">${link(SOURCE.regionalPaper,t('sourceRegional'))}${link(SOURCE.uenf,t('sourceUenf'))}</div></article>
          <article class="ods-bioai-card"><span class="ods-bioai-icon">🤖</span><h3>${t('aiTitle')}</h3><p>${t('aiText')}</p><div class="ods-bioai-links">${link(SOURCE.embrapaAiVideo,'Embrapa — IA e agricultura')}${link(SOURCE.inpe,t('sourceInpe'))}</div></article>
        </div>
        <p class="ods-bioai-regional-note">${t('regionalNote')}</p>
      </div>
      <div class="ods-bioai-video-section">
        <h3>${t('videosTitle')}</h3><p>${t('videosIntro')}</p>
        <div class="ods-bioai-video-grid">
          ${video('zjZNtGn7y5w',t('aiVideoTitle'),t('aiVideoText'),['ODS 2','ODS 9','ODS 12','ODS 13','IA'])}
          ${video('reUq2yMn-Ow',t('bioinputsTitle'),t('bioinputsText'),['ODS 2','ODS 9','ODS 12','ODS 13'])}
          ${video('M3LIPctFCZc',t('compostTitle'),t('compostText'),['ODS 2','ODS 12','ODS 13','Bioprocessos'])}
        </div>
      </div>`;
    return true;
  }

  function addSurveyOptions() {
    const block = document.getElementById('ods-science-block');
    const checks = block?.querySelector('.ods-checks');
    if (!checks || checks.querySelector('[data-bioai-option]')) return;
    const options = [
      ['Bioprospecção de plantas, fungos e microrganismos para saúde, fármacos, cosméticos ou alimentos','Bioprospecção de biodiversidade para saúde e novos produtos'],
      ['Inventários e monitoramento da biodiversidade em fragmentos de Mata Atlântica','Inventários de plantas, fungos, microrganismos e fauna da Mata Atlântica'],
      ['Inteligência artificial para monitoramento ambiental, clima, agricultura e biodiversidade','IA aplicada a clima, agricultura e biodiversidade'],
      ['Sensoriamento remoto e imagens de satélite para acompanhar vegetação, água e uso do solo','Satélites e sensoriamento remoto para monitoramento territorial']
    ];
    options.forEach(([value,label]) => {
      const item = document.createElement('label');
      item.className = 'ods-check';
      item.setAttribute('data-bioai-option','true');
      item.innerHTML = `<input type="checkbox" name="ciencia_inovacao[]" value="${value}"> ${label}`;
      checks.appendChild(item);
    });
    const note = document.createElement('div');
    note.className = 'ods-bioai-checkbox-note';
    note.setAttribute('data-bioai-option','true');
    note.innerHTML = `<strong>${t('questionTitle')}:</strong> ${t('questionText')}`;
    checks.appendChild(note);
  }

  function boot(attempt = 0) {
    const done = renderSection();
    addSurveyOptions();
    if ((!done || !document.getElementById('ods-science-block')) && attempt < 100) {
      setTimeout(() => boot(attempt + 1), 120);
    }
  }

  document.addEventListener('site-language-changed', () => {
    renderSection();
    const note = document.querySelector('.ods-bioai-checkbox-note');
    if (note) note.innerHTML = `<strong>${t('questionTitle')}:</strong> ${t('questionText')}`;
  });

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => boot(), { once: true });
  else boot();
})();
