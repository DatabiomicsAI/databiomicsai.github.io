(() => {
  const run = () => {
    const page = document.querySelector('.ods-page');
    const title = document.getElementById('local-title');
    const section = title?.closest('.ods-section');
    const banner = section?.querySelector('.ods-local-banner');
    if (!page || !title || !banner || document.getElementById('ods-agro-data-sources')) return;

    title.textContent = 'Demandas produtivas do agro regional e sua relação com os ODS';

    const intro = section.querySelector('.ods-heading p');
    if (intro) {
      intro.textContent = 'Itaperuna e o Noroeste Fluminense reúnem agricultura familiar e empresarial, pecuária de leite e de corte, produção vegetal, aquicultura, agroindústrias, comércio de insumos, assistência técnica e serviços ligados ao campo. Os ODS ajudam a conectar essas atividades a produtividade, renda, segurança alimentar, água, energia, saúde animal, qualificação profissional, tecnologia e conservação ambiental.';
    }

    const heading = banner.querySelector('h3');
    const paragraphs = banner.querySelectorAll(':scope > div:first-child > p');
    const stats = banner.querySelectorAll('.ods-local-stat > div');

    if (heading) heading.textContent = 'Agro regional: produção de alimentos, renda, tecnologia e sustentabilidade';
    if (paragraphs[0]) {
      paragraphs[0].textContent = 'A base produtiva regional é diversificada e envolve criação de bovinos para leite e carne, agricultura, produção de alimentos, manejo de pastagens e forragens, aquicultura, comercialização, transporte, beneficiamento e serviços técnicos. O desenvolvimento do território depende de qualidade, produtividade, sanidade, gestão, infraestrutura, agregação de valor e acesso a conhecimento.';
    }
    if (paragraphs[1]) {
      paragraphs[1].innerHTML = 'Dados oficiais da Secretaria de Agricultura do Estado mostram a importância da bovinocultura para o agro fluminense: cerca de <strong>30 mil produtores</strong>, movimentação aproximada de <strong>R$ 2 bilhões</strong> e participação de <strong>32% do faturamento bruto agropecuário estadual em 2022</strong>. A pecuária leiteira reunia cerca de <strong>15 mil produtores</strong>, com o Noroeste como a segunda região de maior produção. A pecuária de corte envolvia aproximadamente <strong>14 mil produtores</strong>, e Itaperuna estava entre os cinco municípios de maior expressão na produção de carne bovina do estado.';
      paragraphs[1].classList.add('ods-local-focus');
    }

    if (stats[0]) stats[0].innerHTML = '<strong>Leite e derivados</strong>O estado produziu cerca de 373 milhões de litros de leite em 2022. Qualidade, genética, alimentação, sanidade, manejo e assistência técnica são pontos centrais para aumentar produtividade e renda.';
    if (stats[1]) stats[1].innerHTML = '<strong>Carne e pecuária</strong>A produção estadual de carne bovina chegou a aproximadamente 54 mil toneladas em 2022, com rebanhos e produtores concentrados especialmente nas regiões Norte e Noroeste.';
    if (stats[2]) stats[2].innerHTML = '<strong>Produção vegetal e recursos naturais</strong>Solo, água, sementes, mudas, pastagens, forrageiras, clima e biodiversidade sustentam diferentes cadeias produtivas e precisam ser manejados com eficiência e conservação.';
    if (stats[3]) stats[3].innerHTML = '<strong>Tecnologia e conhecimento</strong>Assistência técnica, conectividade, capacitação, sensores, análises laboratoriais, biotecnologia, dados e inovação podem melhorar decisões e ampliar oportunidades.';

    const sources = document.createElement('div');
    sources.id = 'ods-agro-data-sources';
    sources.className = 'ods-not-box';
    sources.innerHTML = '<strong>Fontes oficiais sobre o agro, leite, carne e inovação:</strong><ul style="margin:10px 0 0;padding-left:1.2rem"><li><a href="https://www.rj.gov.br/agricultura/node/523" target="_blank" rel="noopener noreferrer">Secretaria de Agricultura do RJ — bovinocultura de leite e de corte</a></li><li><a href="https://www.ibge.gov.br/estatisticas/economicas/agricultura-e-pecuaria/9107-producao-da-pecuaria-municipal.html" target="_blank" rel="noopener noreferrer">IBGE — Pesquisa da Pecuária Municipal: rebanhos, leite, ovos, mel e aquicultura</a></li><li><a href="https://www.rj.gov.br/agricultura/node/384" target="_blank" rel="noopener noreferrer">Emater-Rio e Embrapa — tecnologias sustentáveis para a pecuária leiteira</a></li><li><a href="https://www.rj.gov.br/pesagro/node/761" target="_blank" rel="noopener noreferrer">Pesagro-Rio — pesquisa em pecuária leiteira no Noroeste Fluminense</a></li></ul><p style="margin:10px 0 0"><small>Os valores são referentes ao ano indicado nas fontes e contextualizam a importância econômica, social e tecnológica dessas cadeias produtivas.</small></p>';
    banner.insertAdjacentElement('afterend', sources);
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run, { once: true });
  else run();
})();
