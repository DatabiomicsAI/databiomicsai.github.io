(() => {
  'use strict';

  const init = () => {
    if (window.location.pathname.replace(/\/+$/, '') !== '/apoie-projetos') return;

    const PIX_KEY = 'mattoslmp@gmail.com';
    const supportSection = document.getElementById('necessidades-apoio');
    const supportHeading = supportSection?.querySelector('.section-heading');
    const supportCard = supportSection?.querySelector('.info-card');

    if (supportHeading) {
      supportHeading.innerHTML = `
        <h2>🔬 Apoie pesquisas e projetos independentes</h2>
        <p>A Databiomics® desenvolve pesquisas, ferramentas computacionais e projetos independentes em bioinformática, ciência de dados e inteligência artificial aplicada às ciências biológicas.</p>
        <p>Entre as iniciativas atualmente em desenvolvimento estão projetos como o <strong>MonkSeal</strong> e as demais plataformas científicas apresentadas nesta página. O MonkSeal é um exemplo entre diferentes frentes em desenvolvimento e o apoio não é destinado exclusivamente a esse projeto.</p>
        <p>Projetos modernos de bioinformática e inteligência artificial podem exigir infraestrutura computacional de alto desempenho que não está disponível em computadores convencionais. Essa capacidade é importante para processar grandes volumes de dados biológicos, treinar e executar modelos de IA, armazenar resultados e desenvolver ferramentas científicas.</p>
        <p>Caso pessoas ou instituições se identifiquem com essas iniciativas, podem contribuir voluntariamente para apoiar a continuidade e a evolução das pesquisas e projetos da Databiomics®.</p>`;
    }

    if (supportCard) {
      supportCard.innerHTML = `
        <h3>Infraestrutura para bioinformática e inteligência artificial</h3>
        <p>As contribuições voluntárias poderão auxiliar, conforme as necessidades e prioridades técnicas dos projetos em desenvolvimento, em atividades como:</p>
        <ul class="icon-list">
          <li>acesso a servidores de alto desempenho e infraestrutura HPC;</li>
          <li>contratação de recursos de computação em nuvem;</li>
          <li>acesso a GPUs para treinamento, avaliação, inferência e execução de modelos de inteligência artificial;</li>
          <li>processamento de grandes conjuntos de dados genômicos, metagenômicos, proteômicos e outros dados ômicos;</li>
          <li>armazenamento, backup e transferência de grandes volumes de dados científicos;</li>
          <li>desenvolvimento e manutenção de softwares, plataformas, agentes de IA, bancos de dados e pipelines científicos;</li>
          <li>aquisição, montagem ou expansão de servidores e estações computacionais próprias, quando tecnicamente e financeiramente viável;</li>
          <li>aquisição ou atualização de GPUs, CPUs, memória RAM e dispositivos de armazenamento;</li>
          <li>manutenção da infraestrutura computacional utilizada nos projetos;</li>
          <li>serviços digitais, APIs e outros recursos computacionais necessários à pesquisa e ao desenvolvimento.</li>
        </ul>
        <p><strong>A utilização dependerá das necessidades e prioridades técnicas e científicas das iniciativas em desenvolvimento.</strong></p>
        <div class="support-research-pix" role="region" aria-label="Apoio voluntário via PIX">
          <h3>Apoio voluntário via PIX</h3>
          <p>As contribuições são voluntárias e poderão auxiliar no desenvolvimento dos projetos da Databiomics®, incluindo custos relacionados a infraestrutura computacional, acesso a servidores de alto desempenho e GPUs, computação em nuvem, armazenamento e backup de dados, serviços digitais, desenvolvimento de software e, quando tecnicamente e financeiramente viável, aquisição ou expansão de servidores e infraestrutura computacional própria destinada às atividades de bioinformática e inteligência artificial.</p>
          <p><strong>PIX:</strong> <code>${PIX_KEY}</code></p>
          <button class="button ghost support-research-copy" type="button" data-support-copy-pix="${PIX_KEY}">Copiar chave PIX</button>
          <p>O apoio pode ser destinado à infraestrutura compartilhada entre diferentes projetos ou, quando indicado pelo apoiador e tecnicamente aplicável, a uma iniciativa específica.</p>
          <p class="support-transparency-small"><strong>Transparência:</strong> As contribuições são voluntárias. Não há obrigação de contribuir para acessar o conteúdo público disponibilizado pela Databiomics®. O apoio não implica participação societária, investimento, retorno financeiro, autoria científica, prioridade de atendimento ou qualquer outra contraprestação automática.</p>
          <p class="support-transparency-small">Os recursos poderão ser direcionados às necessidades técnicas e científicas dos projetos, incluindo infraestrutura computacional compartilhada entre diferentes iniciativas da Databiomics®. Uma contribuição não garante a aquisição de servidor, conclusão de projeto, acesso antecipado, propriedade intelectual, autoria ou acesso exclusivo a sistemas.</p>
        </div>`;
    }

    const copyPix = document.querySelector('[data-support-copy-pix]');
    copyPix?.addEventListener('click', async () => {
      const original = 'Copiar chave PIX';
      try {
        await navigator.clipboard.writeText(copyPix.dataset.supportCopyPix || PIX_KEY);
        copyPix.textContent = 'PIX copiado.';
      } catch (_) {
        const area = document.createElement('textarea');
        area.value = copyPix.dataset.supportCopyPix || PIX_KEY;
        area.setAttribute('readonly', '');
        area.style.position = 'fixed';
        area.style.opacity = '0';
        document.body.appendChild(area);
        area.select();
        document.execCommand('copy');
        area.remove();
        copyPix.textContent = 'PIX copiado.';
      }
      window.setTimeout(() => { copyPix.textContent = original; }, 2200);
    });

    const formSection = document.getElementById('contato-apoio');
    const formHeading = formSection?.querySelector('.section-heading');
    const form = formSection?.querySelector('form.interest-form');
    if (!form) return;

    if (formHeading) {
      formHeading.innerHTML = `
        <h2>Contato, colaboração e identificação opcional após apoio</h2>
        <p>Use este canal para parcerias, colaborações técnico-científicas, propostas estratégicas ou, se desejar, para informar voluntariamente um apoio realizado.</p>
        <p>Para identificação após apoio financeiro, os dados são opcionais. Não solicitamos CPF, documento de identidade, endereço residencial ou comprovante de pagamento.</p>`;
    }

    const typeSelect = form.querySelector('#ap-tipo-contato');
    const pixBox = form.querySelector('[data-donation-pix]');
    if (typeSelect) {
      typeSelect.innerHTML = `
        <option value="" disabled>Selecione uma opção</option>
        <option>Apoio voluntário / identificação após contribuição</option>
        <option>Parceria científica</option>
        <option>Parceria estratégica</option>
        <option>Apoio institucional</option>
        <option>Colaboração técnica especializada</option>
        <option>Proposta de cooperação de longo prazo</option>
        <option>Patrocínio ou apoio formal de projeto</option>
        <option>Investimento estratégico</option>`;
    }

    if (pixBox) {
      pixBox.hidden = true;
      pixBox.innerHTML = `
        <strong>Apoio voluntário à pesquisa e ao desenvolvimento</strong>
        <p>Se desejar contribuir via PIX: <strong>${PIX_KEY}</strong>. A identificação neste formulário é opcional.</p>
        <p>Você pode indicar uma frente específica; quando não houver indicação, o apoio será considerado geral e poderá contribuir para necessidades compartilhadas dos projetos.</p>
        <input type="hidden" name="chave_pix_apoio" value="${PIX_KEY}">`;
    }

    const projectSelect = form.querySelector('#ap-projeto');
    if (projectSelect) {
      projectSelect.innerHTML = `
        <option selected>Apoio geral à Databiomics®</option>
        <option>MonkSeal</option>
        <option>ParasiteDx-AI</option>
        <option>BioCatalyticAI</option>
        <option>ProteinDesign – Databiomics®</option>
        <option>DataAgrobiomics</option>
        <option>Infraestrutura computacional / HPC / IA</option>
        <option>Pesquisa independente em bioinformática e IA</option>
        <option>Outro projeto ou iniciativa</option>`;
      projectSelect.required = false;
    }

    const name = form.querySelector('#ap-nome');
    const institution = form.querySelector('#ap-instituto');
    const country = form.querySelector('#ap-pais');
    const phone = form.querySelector('#ap-telefone');
    const email = form.querySelector('#ap-email');
    const value = form.querySelector('#ap-valor-contribuicao');
    const date = form.querySelector('#ap-data-pix');
    const reference = form.querySelector('#ap-comprovante');
    const proposal = form.querySelector('#ap-proposta');
    const submit = form.querySelector('button[type="submit"]');

    const setLabel = (input, text) => {
      const label = input?.previousElementSibling;
      if (label?.tagName === 'LABEL') label.textContent = text;
    };

    setLabel(name, 'Nome');
    setLabel(institution, 'Instituição / organização, se aplicável');
    setLabel(country, 'País / localização');
    setLabel(phone, 'Telefone (opcional)');
    setLabel(email, 'E-mail');
    setLabel(value, 'Valor do apoio (opcional)');
    setLabel(date, 'Data do apoio (opcional)');
    setLabel(reference, 'Referência da transação (opcional; não é necessário enviar comprovante)');
    setLabel(proposal, 'Mensagem / resumo da proposta');

    phone?.removeAttribute('required');
    if (reference) {
      reference.name = 'referencia_transacao';
      reference.placeholder = 'Ex.: ID ou referência da transação, se desejar informar';
    }
    if (proposal) {
      proposal.placeholder = 'Para propostas, descreva objetivo e escopo. Para identificação de apoio, este campo é opcional.';
    }

    const voluntaryPattern = /(apoio volunt[aá]rio|identifica[cç][aã]o ap[oó]s contribui[cç][aã]o)/i;
    const updateFormMode = () => {
      const selected = typeSelect?.options[typeSelect.selectedIndex]?.textContent || '';
      const voluntary = voluntaryPattern.test(selected);
      if (pixBox) pixBox.hidden = !voluntary;

      [name, institution, country, email, proposal].forEach((field) => {
        if (!field) return;
        if (voluntary) field.removeAttribute('required');
        else field.setAttribute('required', '');
      });
      if (institution && !voluntary) institution.removeAttribute('required');
      if (country && !voluntary) country.setAttribute('required', '');
      if (submit) submit.textContent = voluntary
        ? 'Registrar identificação opcional do apoio'
        : 'Submeter proposta para análise institucional';
    };

    typeSelect?.addEventListener('change', updateFormMode);
    updateFormMode();

    const transparency = document.createElement('p');
    transparency.className = 'support-form-privacy-note';
    transparency.textContent = 'A identificação após um apoio é opcional. Não é necessário enviar comprovante. Os dados informados serão utilizados apenas para registro, resposta ao contato ou acompanhamento da proposta, conforme aplicável.';
    form.insertBefore(transparency, form.querySelector('label:has(input[name="privacy_consent_support"])') || submit);

    const oldDonationScriptButtons = document.querySelectorAll('[data-copy-pix]');
    oldDonationScriptButtons.forEach((button) => {
      button.textContent = 'Copiar chave PIX';
      button.addEventListener('click', () => { button.textContent = 'PIX copiado.'; });
    });

    const style = document.createElement('style');
    style.textContent = `
      #necessidades-apoio .section-heading { max-width: 980px; }
      #necessidades-apoio .info-card { max-width: 980px; margin-inline: auto; }
      .support-research-pix { margin-top: 1rem; padding: 1rem 1.1rem; border: 1px solid rgba(80,160,200,.34); border-radius: 14px; background: rgba(80,160,200,.07); }
      .support-research-pix h3 { margin-top: 0; }
      .support-research-pix code { font-size: .95em; overflow-wrap: anywhere; }
      .support-research-copy { margin: .25rem 0 .7rem; }
      .support-transparency-small, .support-form-privacy-note { font-size: .82rem; line-height: 1.48; opacity: .82; }
      #contato-apoio .interest-form { max-width: 900px; margin-inline: auto; }
      @media (max-width: 680px) {
        .support-research-pix { padding: .85rem; }
        .support-research-copy { width: 100%; }
      }`;
    document.head.appendChild(style);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
