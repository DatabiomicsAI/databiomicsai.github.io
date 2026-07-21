document.addEventListener('DOMContentLoaded', function () {
  function updateInstitutionalCredit() {
    var card = document.querySelector('.ods-academic-card');
    if (!card) return;
    var paragraphs = card.querySelectorAll('p');
    for (var i = 0; i < paragraphs.length; i += 1) {
      if ((paragraphs[i].textContent || '').indexOf('Databiomics') !== -1) {
        var institutionalText = '<strong>Databiomics®</strong><br>Leandro de Mattos Pereira atua como sócio-administrador e consultor da WBPereira Comércio e Serviços, sem vínculo empregatício.';
        if (paragraphs[i].innerHTML !== institutionalText) paragraphs[i].innerHTML = institutionalText;
        break;
      }
    }
  }

  function updateLgpdDisclosure() {
    var privacy = document.getElementById('ods-privacy-panel');
    if (privacy) {
      var items = privacy.querySelectorAll('li');
      items.forEach(function (item) {
        var text = (item.textContent || '').replace(/\s+/g, ' ').trim();

        if (text.indexOf('Finalidade:') === 0) {
          var purpose = '<strong>Finalidade:</strong> compreender percepções da comunidade, avaliar o alcance e a inclusão da ação, produzir sínteses agregadas, materiais educativos e relatórios da iniciativa. Caso a participação alcance volume e diversidade suficientes, poderá também ser elaborada uma síntese técnica, agregada e anonimizada para eventual encaminhamento a órgãos públicos, conselhos, instituições de pesquisa, entidades representativas e outras instituições competentes, exclusivamente como subsídio informativo ao planejamento e ao possível aprimoramento de políticas públicas relacionadas aos temas identificados.';
          if (item.innerHTML !== purpose) item.innerHTML = purpose;
        }

        if (text.indexOf('Compartilhamento:') === 0) {
          var sharing = '<strong>Compartilhamento e serviço de transmissão:</strong> as respostas individuais são transmitidas pelo serviço externo FormSubmit ao e-mail da iniciativa, exclusivamente para recebimento, organização e avaliação da iniciativa. Esse serviço processa os dados necessários ao encaminhamento da mensagem, conforme sua própria <a href="https://formsubmit.co/privacy.pdf" target="_blank" rel="noopener noreferrer">política de privacidade</a>. As respostas não serão vendidas, publicadas individualmente nem encaminhadas a autoridades, partidos, candidatos, empresas ou outras instituições. Eventual divulgação pública ou contribuição institucional utilizará somente resultados estatísticos agregados e anonimizados, sem nomes, contatos, comentários individualizados, dados sensíveis, microdados, respostas individuais ou combinações que permitam identificar ou reidentificar participantes.';
          if (item.innerHTML !== sharing) item.innerHTML = sharing;
        }
      });
    }

    var consent = document.querySelector('#ods-listening-form input[name="consentimento"]');
    var consentText = consent && consent.closest('label') ? consent.closest('label').querySelector('span') : null;
    if (consentText) {
      var consentHtml = 'Li o aviso de privacidade e <strong>consinto livremente</strong> com o envio das respostas por meio do FormSubmit e com seu tratamento para as finalidades educativas, participativas e de eventual contribuição institucional descritas nesta página. Sei que posso participar sem informar nome, bairro, faixa etária ou identidade de gênero. Nenhum dado pessoal ou resposta individual será divulgado publicamente ou incluído em encaminhamentos a instituições externas.';
      if (consentText.innerHTML !== consentHtml) consentText.innerHTML = consentHtml;
    }

    var demographicConsent = document.querySelector('#ods-demographic-consent');
    var demographicConsentText = demographicConsent && demographicConsent.closest('label') ? demographicConsent.closest('label').querySelector('span') : null;
    if (demographicConsentText) {
      var demographicHtml = 'Se eu preencher nome, bairro, faixa etária ou identidade de gênero, autorizo o envio dessas informações pelo FormSubmit e seu uso exclusivamente para análise agregada do alcance e da inclusão desta iniciativa, conforme o aviso de privacidade. Esses dados não serão publicados individualmente nem incluídos em encaminhamentos institucionais.';
      if (demographicConsentText.innerHTML !== demographicHtml) demographicConsentText.innerHTML = demographicHtml;
    }

    var submitNote = document.querySelector('#ods-listening-form .ods-listening-submit-note');
    if (submitNote) {
      var submitHtml = '<strong>Transparência:</strong> o relatório público contabiliza somente categorias agregadas — perfil geral, temas marcados, ODS prioritários, formatos de conteúdo, áreas de ciência e município agrupado. As respostas detalhadas são transmitidas pelo FormSubmit apenas ao e-mail da iniciativa. Nome, bairro, identidade de gênero, comentários, textos livres, microdados e respostas individuais não são publicados nem incluídos em encaminhamentos a instituições externas.';
      if (submitNote.innerHTML !== submitHtml) submitNote.innerHTML = submitHtml;
    }

    var form = document.getElementById('ods-listening-form');
    if (form) {
      var notes = form.querySelectorAll('p');
      notes.forEach(function (paragraph) {
        var text = (paragraph.textContent || '').replace(/\s+/g, ' ').trim();
        if (text.indexOf('Ao enviar, o serviço FormSubmit') === 0) {
          var formSubmitHtml = 'Ao enviar, o serviço externo <strong>FormSubmit</strong> transmitirá as respostas ao e-mail da iniciativa. Nome, bairro, faixa etária, identidade de gênero e comentários são opcionais; telefone e e-mail do participante não são solicitados. Consulte a <a href="https://formsubmit.co/privacy.pdf" target="_blank" rel="noopener noreferrer">política de privacidade do FormSubmit</a> e o aviso de privacidade desta página.';
          if (paragraph.innerHTML !== formSubmitHtml) paragraph.innerHTML = formSubmitHtml;
        }
      });
    }

    var minorNote = document.getElementById('ods-minor-note');
    if (minorNote) {
      var minorText = 'Para proteção de crianças e adolescentes, participantes menores de 18 anos não devem informar nome, bairro ou identidade de gênero e devem participar com ciência e autorização de um responsável legal.';
      if (minorNote.textContent !== minorText) minorNote.textContent = minorText;
    }
  }

  function addPublicPolicyNote() {
    var report = document.getElementById('ods-listening-report');
    if (!report) return false;

    var privacyNote = report.querySelector('.ods-listening-report-note');
    if (!privacyNote) return false;

    var note = report.querySelector('.ods-listening-policy-note');
    if (!note) {
      note = document.createElement('p');
      note.className = 'ods-listening-report-note ods-listening-policy-note';
      privacyNote.insertAdjacentElement('afterend', note);
    }

    var policyHtml = '<strong>Possível contribuição institucional e proteção de dados:</strong> caso a participação alcance volume e diversidade suficientes para produzir uma síntese informativa consistente, poderão ser sistematizados e encaminhados apenas resultados estatísticos agregados e anonimizados, de forma técnica, institucional e apartidária, a órgãos públicos, conselhos, instituições de pesquisa, entidades representativas e outras instituições competentes. Não serão encaminhados nomes, contatos, comentários individualizados, dados sensíveis, microdados, respostas individuais ou combinações que permitam identificar ou reidentificar participantes. O objetivo será oferecer subsídios informativos ao planejamento e ao eventual aprimoramento de políticas públicas relacionadas aos temas identificados. Esse encaminhamento não implicará apoio, oposição ou preferência por partidos, candidaturas, mandatos ou agentes políticos e não substituirá pesquisas amostrais, consultas públicas oficiais ou processos decisórios legalmente constituídos.';
    if (note.innerHTML !== policyHtml) note.innerHTML = policyHtml;
    return true;
  }

  function setLink(link, href, label) {
    if (!link) return;
    var text = label + ' ↗';
    if (link.href !== href) link.href = href;
    if (link.textContent !== text) link.textContent = text;
    if (link.target !== '_blank') link.target = '_blank';
    if (link.rel !== 'noopener noreferrer') link.rel = 'noopener noreferrer';
    var aria = label + ', link externo';
    if (link.getAttribute('aria-label') !== aria) link.setAttribute('aria-label', aria);
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
      var heading = card.querySelector('h3');
      var title = heading ? (heading.textContent || '').trim() : '';
      var links = card.querySelectorAll('.ods-bioai-link');

      if (title.indexOf('Biodiversidade e inovação farmacêutica') !== -1) {
        setLink(links[0], 'https://revistafitos.far.fiocruz.br/index.php/revista-fitos/article/view/1346', 'Artigo científico externo — Revista Fitos/Fiocruz: descoberta de fármacos por produtos naturais');
        setLink(links[1], 'https://www.gov.br/agricultura/pt-br/assuntos/noticias/2022/mapa-e-fiocruz-identificam-26-produtos-da-biodiversidade-com-potencial-de-mercado/', 'Fonte institucional externa — MAPA/Fiocruz: biodiversidade e mercado');
      }

      if (title.indexOf('Mata Atlântica: patrimônio biológico') !== -1) {
        setLink(links[0], 'https://www.gov.br/mma/pt-br/assuntos/biodiversidade-e-biomas/biomas-e-ecossistemas/biomas/mata-atlantica', 'Fonte institucional externa — Ministério do Meio Ambiente: Mata Atlântica');
        setLink(links[1], 'https://www.gov.br/inpe/pt-br/acesso-a-informacao/perguntas-frequentes/principais-produtos-e-servicos-do-inpe/monitoramento-do-territorio-florestas/o-que-resta-da-mata', 'Fonte institucional externa — INPE: remanescentes do bioma');
      }

      if (title.indexOf('Norte e Noroeste Fluminense') !== -1) {
        setLink(links[0], 'https://www.scielo.br/pdf/asoc/v27/1809-4422-asoc-27-e01701.pdf', 'Artigo científico externo — Ambiente & Sociedade: Norte e Noroeste Fluminense');
        for (var j = 1; j < links.length; j += 1) links[j].remove();
      }

      if (title.indexOf('IA, dados e monitoramento ambiental') !== -1) {
        setLink(links[0], 'https://www.youtube.com/watch?v=zjZNtGn7y5w', 'Vídeo externo — Embrapa: inteligência artificial na agricultura');
        setLink(links[1], 'https://www.gov.br/inpe/pt-br/acesso-a-informacao/perguntas-frequentes/principais-produtos-e-servicos-do-inpe/monitoramento-do-territorio-florestas/o-que-resta-da-mata', 'Fonte institucional externa — INPE: monitoramento dos remanescentes');
      }
    });

    if (!document.getElementById('ods-external-source-style')) {
      var style = document.createElement('style');
      style.id = 'ods-external-source-style';
      style.textContent = '.ods-page .ods-bioai-external-note{margin:15px 0 0;padding:13px 15px;border-left:4px solid #c7ed74;border-radius:0 12px 12px 0;background:rgba(255,255,255,.1);color:#eff9f1!important;font-size:.88rem;line-height:1.55}.ods-page .ods-bioai-external-note strong{color:#fff!important}.ods-page .ods-listening-policy-note{border-left-color:#159bd2;background:#f3f8fb;color:#36556a}';
      document.head.appendChild(style);
    }

    return true;
  }

  function applyUpdates() {
    updateInstitutionalCredit();
    updateLgpdDisclosure();
    addPublicPolicyNote();
    patchExternalSources();
  }

  applyUpdates();

  var observer = new MutationObserver(function () {
    applyUpdates();
  });
  observer.observe(document.body, { childList: true, subtree: true });
  window.setTimeout(function () { observer.disconnect(); }, 20000);

  document.addEventListener('site-language-changed', function () {
    window.setTimeout(applyUpdates, 250);
  });
});
