(() => {
  'use strict';

  const newText = '<strong>Databiomics®</strong><br>Leandro de Mattos Pereira atua como sócio-administrador e consultor da WBPereira Comércio e Serviços, sem vínculo empregatício.';

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

  function loadPrivacyUpdate() {
    if (document.querySelector('script[data-ods-lgpd-complete]')) return;
    const script = document.createElement('script');
    script.src = '/assets/js/ods-no-campo-credit-text.js?v=20260625-4';
    script.async = false;
    script.setAttribute('data-ods-lgpd-complete', 'true');
    document.head.appendChild(script);
  }

  function boot() {
    applyCreditText();
    loadPrivacyUpdate();

    const observer = new MutationObserver(() => applyCreditText());
    observer.observe(document.body, { childList: true, subtree: true });
    window.setTimeout(() => observer.disconnect(), 15000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
})();
