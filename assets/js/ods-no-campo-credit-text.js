document.addEventListener('DOMContentLoaded', function () {
  function updateInstitutionalCredit() {
    var card = document.querySelector('.ods-academic-card');
    if (!card) return;
    var paragraphs = card.querySelectorAll('p');
    for (var i = 0; i < paragraphs.length; i += 1) {
      if ((paragraphs[i].textContent || '').indexOf('Databiomics') !== -1) {
        paragraphs[i].innerHTML = '<strong>Databiomics®</strong><br>Leandro de Mattos Pereira atua como sócio-administrador e consultor da WBPereira Comércio e Serviços, sem vínculo empregatício.';
        break;
      }
    }
  }

  function setLink(link, href, label) {
    if (!link) return;
    link.href = href;
    link.textContent = label + ' ↗';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.setAttribute('aria-label', label + ', link externo');
  }

  function patchExternalSources() {
    var section = document.querySelector('.ods-bioai-section');
    if (!section) return false;

    var intro = section.querySelector('.ods-bioai-intro');
    if (intro && !section.querySelector('.ods-bioai-external-note')) {
      var note = document.createElement('p');
      note.className = 'ods-bioai-external-note';
      note.innerHTML = '<strong>ℹ️ Transparência das fontes:</strong> os links abaixo levam a conteúdos externos. Cada link informa se o destino é um artigo científico, uma fonte institucional ou um vídeo. Quando existe um artigo diretamente relacionado ao conteúdo, o acesso é direcionado ao próprio artigo, e não apenas à página geral da instituição.';
      intro.insertAdjacentElement('afterend', note);
    }

    var cards = section.querySelectorAll('.ods-bioai-card');
    cards.forEach(function (card) {
      var title = (card.querySelector('h3')?.textContent || '').trim();
      var links = card.querySelectorAll('.ods-bioai-link');

      if (title.indexOf('Biodiversidade e inovação farmacêutica') !== -1) {
        setLink(
          links[0],
          'https://revistafitos.far.fiocruz.br/index.php/revista-fitos/article/view/1346',
          'Artigo científico externo — Revista Fitos/Fiocruz: descoberta de fármacos por produtos naturais'
        );
        setLink(
          links[1],
          'https://www.gov.br/agricultura/pt-br/assuntos/noticias/2022/mapa-e-fiocruz-identificam-26-produtos-da-biodiversidade-com-potencial-de-mercado/',
          'Fonte institucional externa — MAPA/Fiocruz: biodiversidade e mercado'
        );
      }

      if (title.indexOf('Mata Atlântica: patrimônio biológico') !== -1) {
        setLink(
          links[0],
          'https://www.gov.br/mma/pt-br/assuntos/biodiversidade-e-biomas/biomas-e-ecossistemas/biomas/mata-atlantica',
          'Fonte institucional externa — Ministério do Meio Ambiente: Mata Atlântica'
        );
        setLink(
          links[1],
          'https://www.gov.br/inpe/pt-br/acesso-a-informacao/perguntas-frequentes/principais-produtos-e-servicos-do-inpe/monitoramento-do-territorio-florestas/o-que-resta-da-mata',
          'Fonte institucional externa — INPE: remanescentes do bioma'
        );
      }

      if (title.indexOf('Norte e Noroeste Fluminense') !== -1) {
        setLink(
          links[0],
          'https://www.scielo.br/pdf/asoc/v27/1809-4422-asoc-27-e01701.pdf',
          'Artigo científico externo — Ambiente & Sociedade: Norte e Noroeste Fluminense'
        );
        for (var j = 1; j < links.length; j += 1) links[j].remove();
      }

      if (title.indexOf('IA, dados e monitoramento ambiental') !== -1) {
        setLink(
          links[0],
          'https://www.youtube.com/watch?v=zjZNtGn7y5w',
          'Vídeo externo — Embrapa: inteligência artificial na agricultura'
        );
        setLink(
          links[1],
          'https://www.gov.br/inpe/pt-br/acesso-a-informacao/perguntas-frequentes/principais-produtos-e-servicos-do-inpe/monitoramento-do-territorio-florestas/o-que-resta-da-mata',
          'Fonte institucional externa — INPE: monitoramento dos remanescentes'
        );
      }
    });

    if (!document.getElementById('ods-external-source-style')) {
      var style = document.createElement('style');
      style.id = 'ods-external-source-style';
      style.textContent = '.ods-page .ods-bioai-external-note{margin:15px 0 0;padding:13px 15px;border-left:4px solid #c7ed74;border-radius:0 12px 12px 0;background:rgba(255,255,255,.1);color:#eff9f1!important;font-size:.88rem;line-height:1.55}.ods-page .ods-bioai-external-note strong{color:#fff!important}';
      document.head.appendChild(style);
    }

    return true;
  }

  updateInstitutionalCredit();
  patchExternalSources();

  var observer = new MutationObserver(function () {
    updateInstitutionalCredit();
    patchExternalSources();
  });
  observer.observe(document.body, { childList: true, subtree: true });
  window.setTimeout(function () { observer.disconnect(); }, 20000);

  document.addEventListener('site-language-changed', function () {
    window.setTimeout(patchExternalSources, 250);
  });
});
