document.addEventListener('DOMContentLoaded', function () {
  var card = document.querySelector('.ods-academic-card');
  if (!card) return;
  var paragraphs = card.querySelectorAll('p');
  for (var i = 0; i < paragraphs.length; i += 1) {
    if ((paragraphs[i].textContent || '').indexOf('Databiomics') !== -1) {
      paragraphs[i].innerHTML = '<strong>Databiomics®</strong><br>Leandro de Mattos Pereira atua como sócio-administrador e consultor da WBPereira Comércio e Serviços, sem vínculo empregatício.';
      break;
    }
  }
});
