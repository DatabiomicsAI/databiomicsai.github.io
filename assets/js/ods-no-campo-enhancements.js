(() => {
  const onReady = (fn) => {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn, { once: true });
    } else {
      fn();
    }
  };

  const videoCard = ({ id, title, description, tags }) => `
    <article class="ods-video">
      <div class="ods-video-frame">
        <iframe
          src="https://www.youtube-nocookie.com/embed/${id}"
          title="${title}"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen></iframe>
      </div>
      <div class="ods-video-copy">
        <h3>${title}</h3>
        <p>${description}</p>
        <div class="ods-tags">${tags.map((tag) => `<span class="ods-tag">${tag}</span>`).join('')}</div>
      </div>
    </article>`;

  onReady(() => {
    const page = document.querySelector('.ods-page');
    if (!page) return;

    document.querySelectorAll('.ods-theme.t2 > small, .ods-theme.t6 > small, .ods-theme.t12 > small, .ods-theme.t13 > small')
      .forEach((help) => {
        help.textContent = 'Marque o que você percebe como desafio ou tema importante para Itaperuna / Noroeste Fluminense / Rio de Janeiro.';
      });

    const videosSection = document.getElementById('videos-ods');
    if (videosSection && !document.getElementById('ciencia-inovacao-ods')) {
      const innovationSection = document.createElement('section');
      innovationSection.id = 'ciencia-inovacao-ods';
      innovationSection.className = 'ods-innovation-section';
      innovationSection.setAttribute('aria-labelledby', 'ciencia-inovacao-title');
      innovationSection.innerHTML = `
        <div class="ods-innovation-dark">
          <span class="ods-kicker">Ciência aplicada ao território</span>
          <h2 id="ciencia-inovacao-title">Como biologia, biotecnologia e tecnologia podem ajudar a cumprir os ODS?</h2>
          <p class="ods-innovation-intro">Os ODS ganham força quando conhecimento científico se transforma em soluções acessíveis. Biologia, microbiologia, biotecnologia, bioinformática, inteligência artificial, sensores e análise de dados podem apoiar decisões sobre produção, água, saúde, resíduos, biodiversidade e clima.</p>
          <div class="ods-innovation-grid">
            <article class="ods-innovation-card"><span class="icon">🦠</span><h3>Microbiologia e bioinsumos</h3><p>Microrganismos benéficos podem auxiliar na nutrição de plantas, no controle biológico, na recuperação do solo e na redução de insumos de maior impacto.</p></article>
            <article class="ods-innovation-card"><span class="icon">🌱</span><h3>Biotecnologia vegetal</h3><p>Propagação, melhoramento, diagnóstico molecular e conservação de material vegetal podem fortalecer cultivos mais produtivos, sadios e adaptados.</p></article>
            <article class="ods-innovation-card"><span class="icon">🧬</span><h3>Genômica e bioinformática</h3><p>A análise de DNA e de comunidades microbianas ajuda a conhecer biodiversidade, rastrear organismos e encontrar genes, enzimas e funções de interesse.</p></article>
            <article class="ods-innovation-card"><span class="icon">💧</span><h3>Monitoramento de água e solo</h3><p>Sensores, análises laboratoriais e séries de dados podem detectar mudanças, orientar manejo e reduzir perdas de água, energia e nutrientes.</p></article>
            <article class="ods-innovation-card"><span class="icon">♻️</span><h3>Bioprocessos e economia circular</h3><p>Compostagem, tratamento biológico e aproveitamento de resíduos podem transformar passivos ambientais em fertilizantes, energia ou novos produtos.</p></article>
            <article class="ods-innovation-card"><span class="icon">📊</span><h3>IA e análise de dados</h3><p>Modelos, mapas e painéis podem integrar clima, produção, biodiversidade e consumo para apoiar alertas, prioridades e políticas baseadas em evidências.</p></article>
          </div>
        </div>`;
      videosSection.parentNode.insertBefore(innovationSection, videosSection);

      const extraVideos = document.createElement('section');
      extraVideos.className = 'ods-section alt';
      extraVideos.setAttribute('aria-labelledby', 'videos-ciencia-title');
      extraVideos.innerHTML = `
        <div class="ods-heading">
          <span class="ods-kicker">Biologia, biotecnologia e inovação</span>
          <h2 id="videos-ciencia-title">Veja aplicações brasileiras que aproximam ciência e desenvolvimento sustentável</h2>
          <p>Os vídeos abaixo, em português e de instituições públicas de ciência, mostram como microrganismos, bioinsumos, bioeconomia, manejo e aproveitamento de resíduos podem contribuir para diferentes ODS.</p>
        </div>
        <div class="ods-video-grid ods-video-grid-expanded">
          ${videoCard({
            id: 'reUq2yMn-Ow',
            title: 'Bioinsumos — Embrapa Agrobiologia',
            description: 'Mostra como microrganismos podem favorecer a agricultura, reduzir custos e diminuir impactos ambientais, conectando biologia aplicada, inovação e agricultura de baixo carbono.',
            tags: ['ODS 2', 'ODS 9', 'ODS 12', 'ODS 13', 'Microbiologia']
          })}
          ${videoCard({
            id: '2cZ0TKBCrb4',
            title: 'Bioinsumos para uma agricultura mais sustentável — Embrapa',
            description: 'Apresenta insumos produzidos a partir de microrganismos e materiais biológicos, com aplicações no controle de pragas, doenças e disponibilidade de nutrientes.',
            tags: ['ODS 2', 'ODS 12', 'ODS 15', 'Bioinsumos']
          })}
          ${videoCard({
            id: '7jn-9UMu4Sk',
            title: 'Bioeconomia: diversidade e riqueza para o desenvolvimento sustentável — Fiocruz',
            description: 'Discute o papel integrado da ciência, tecnologia e inovação no desenvolvimento social, econômico e ambiental do Brasil.',
            tags: ['ODS 8', 'ODS 9', 'ODS 12', 'ODS 17', 'Bioeconomia']
          })}
          ${videoCard({
            id: '8AE1oKYmwJo',
            title: 'Compostagem e aproveitamento de resíduos na propriedade — Embrapa',
            description: 'Exemplo de aplicação biológica para devolver nutrientes ao sistema produtivo, reduzir resíduos e apoiar a economia circular no campo.',
            tags: ['ODS 2', 'ODS 11', 'ODS 12', 'ODS 13', 'Bioprocessos']
          })}
        </div>`;
      videosSection.parentNode.insertBefore(extraVideos, videosSection.nextSibling);
    }

    const form = document.getElementById('ods-listening-form');
    if (!form) return;

    const localityInput = form.querySelector('#localidade');
    const localityField = localityInput?.closest('.ods-field');
    if (localityInput) {
      localityInput.name = 'cidade_municipio_opcional';
      localityInput.placeholder = 'Ex.: Itaperuna, Bom Jesus do Itabapoana ou outro município';
      const localityLabel = localityField?.querySelector('label');
      if (localityLabel) localityLabel.innerHTML = 'Cidade ou município <small>(opcional)</small>';
    }

    if (localityField && !document.getElementById('ods-demographic-block')) {
      const demographics = document.createElement('section');
      demographics.id = 'ods-demographic-block';
      demographics.className = 'ods-demographic-block';
      demographics.setAttribute('aria-labelledby', 'ods-demographic-title');
      demographics.innerHTML = `
        <h4 id="ods-demographic-title">Informações opcionais sobre quem está participando</h4>
        <p class="ods-block-help">Esses campos ajudam a avaliar se a ação alcançou públicos e territórios diversos. Você pode deixar todos em branco e responder apenas às perguntas temáticas. Para reduzir a coleta de dados, usamos faixa etária e identidade de gênero, sem solicitar documento, telefone ou endereço completo.</p>
        <div class="ods-mini-grid">
          <div class="ods-mini-field full">
            <label for="ods-nome">Nome ou nome social <small>(opcional)</small></label>
            <input id="ods-nome" name="nome_ou_nome_social_opcional" type="text" maxlength="100" autocomplete="name" placeholder="Você pode participar sem se identificar">
          </div>
          <div class="ods-mini-field">
            <label for="ods-bairro">Bairro ou distrito <small>(opcional)</small></label>
            <input id="ods-bairro" name="bairro_ou_distrito_opcional" type="text" maxlength="80" placeholder="Não informe rua ou número">
          </div>
          <div class="ods-mini-field">
            <label for="ods-faixa-etaria">Faixa etária <small>(opcional)</small></label>
            <select id="ods-faixa-etaria" name="faixa_etaria_opcional">
              <option value="">Prefiro não informar</option>
              <option value="Menor de 18 anos">Menor de 18 anos</option>
              <option value="18 a 24 anos">18 a 24 anos</option>
              <option value="25 a 34 anos">25 a 34 anos</option>
              <option value="35 a 44 anos">35 a 44 anos</option>
              <option value="45 a 59 anos">45 a 59 anos</option>
              <option value="60 anos ou mais">60 anos ou mais</option>
            </select>
          </div>
          <div class="ods-mini-field full">
            <label for="ods-genero">Identidade de gênero <small>(opcional)</small></label>
            <select id="ods-genero" name="identidade_de_genero_opcional">
              <option value="">Prefiro não informar</option>
              <option value="Mulher cisgênero">Mulher cisgênero</option>
              <option value="Mulher transgênero">Mulher transgênero</option>
              <option value="Homem cisgênero">Homem cisgênero</option>
              <option value="Homem transgênero">Homem transgênero</option>
              <option value="Pessoa não binária">Pessoa não binária</option>
              <option value="Pessoa agênero">Pessoa agênero</option>
              <option value="Outra identidade de gênero">Outra identidade de gênero</option>
            </select>
          </div>
        </div>
        <p id="ods-minor-note" class="ods-minor-note">Para proteção de crianças e adolescentes, participantes menores de 18 anos não devem informar nome, bairro ou identidade de gênero e devem participar com ciência de um responsável.</p>
        <label class="ods-consent" style="margin-top:14px">
          <input id="ods-demographic-consent" type="checkbox" name="consentimento_dados_demograficos_opcionais" value="Sim">
          <span>Se eu preencher nome, bairro, faixa etária ou identidade de gênero, autorizo o uso dessas informações exclusivamente para análise agregada do alcance e da inclusão desta ação, conforme o aviso de privacidade abaixo.</span>
        </label>
      `;
      localityField.insertAdjacentElement('afterend', demographics);

      const age = demographics.querySelector('#ods-faixa-etaria');
      const name = demographics.querySelector('#ods-nome');
      const neighborhood = demographics.querySelector('#ods-bairro');
      const gender = demographics.querySelector('#ods-genero');
      const minorNote = demographics.querySelector('#ods-minor-note');
      age?.addEventListener('change', () => {
        const isMinor = age.value === 'Menor de 18 anos';
        [name, neighborhood, gender].forEach((field) => {
          if (!field) return;
          field.disabled = isMinor;
          if (isMinor) field.value = '';
        });
        minorNote?.classList.toggle('show', isMinor);
      });
    }

    const ods13 = form.querySelector('.ods-theme.t13');
    if (ods13 && !document.getElementById('ods-priority-block')) {
      const priorities = document.createElement('fieldset');
      priorities.id = 'ods-priority-block';
      priorities.className = 'ods-priority-block';
      priorities.innerHTML = `
        <legend class="ods-legend">Quais ODS você considera mais importantes para o município?</legend>
        <p class="ods-block-help">Marque quantos considerar relevantes. A seleção ajuda a compreender como a comunidade relaciona desenvolvimento, biologia, saúde, tecnologia, inovação e ambiente.</p>
        <div class="ods-checks">
          <label class="ods-check"><input type="checkbox" name="ods_prioritarios[]" value="ODS 2 - Fome zero e agricultura sustentável"> ODS 2 — Agricultura sustentável e segurança alimentar</label>
          <label class="ods-check"><input type="checkbox" name="ods_prioritarios[]" value="ODS 3 - Saúde e bem-estar"> ODS 3 — Saúde e bem-estar</label>
          <label class="ods-check"><input type="checkbox" name="ods_prioritarios[]" value="ODS 4 - Educação de qualidade"> ODS 4 — Educação, ciência e formação</label>
          <label class="ods-check"><input type="checkbox" name="ods_prioritarios[]" value="ODS 6 - Água potável e saneamento"> ODS 6 — Água potável e saneamento</label>
          <label class="ods-check"><input type="checkbox" name="ods_prioritarios[]" value="ODS 7 - Energia limpa e acessível"> ODS 7 — Energia limpa e acessível</label>
          <label class="ods-check"><input type="checkbox" name="ods_prioritarios[]" value="ODS 8 - Trabalho decente e crescimento econômico"> ODS 8 — Trabalho, renda e desenvolvimento local</label>
          <label class="ods-check"><input type="checkbox" name="ods_prioritarios[]" value="ODS 9 - Indústria, inovação e infraestrutura"> ODS 9 — Tecnologia, inovação e infraestrutura</label>
          <label class="ods-check"><input type="checkbox" name="ods_prioritarios[]" value="ODS 11 - Cidades e comunidades sustentáveis"> ODS 11 — Cidades e comunidades sustentáveis</label>
          <label class="ods-check"><input type="checkbox" name="ods_prioritarios[]" value="ODS 12 - Consumo e produção responsáveis"> ODS 12 — Consumo, produção e resíduos</label>
          <label class="ods-check"><input type="checkbox" name="ods_prioritarios[]" value="ODS 13 - Ação contra a mudança global do clima"> ODS 13 — Clima, prevenção e adaptação</label>
          <label class="ods-check"><input type="checkbox" name="ods_prioritarios[]" value="ODS 14 - Vida na água"> ODS 14 — Rios, lagoas, peixes e vida na água</label>
          <label class="ods-check"><input type="checkbox" name="ods_prioritarios[]" value="ODS 15 - Vida terrestre"> ODS 15 — Biodiversidade, florestas e vida terrestre</label>
          <label class="ods-check"><input type="checkbox" name="ods_prioritarios[]" value="ODS 17 - Parcerias e meios de implementação"> ODS 17 — Parcerias entre comunidade, ciência, governo e empresas</label>
        </div>`;
      ods13.insertAdjacentElement('afterend', priorities);

      const science = document.createElement('fieldset');
      science.id = 'ods-science-block';
      science.className = 'ods-science-block';
      science.innerHTML = `
        <legend class="ods-legend">Onde ciência, biologia, biotecnologia e tecnologia poderiam ajudar mais?</legend>
        <p class="ods-block-help">Marque os assuntos sobre os quais você gostaria de receber informação, ver projetos demonstrativos ou acompanhar resultados.</p>
        <div class="ods-checks">
          <label class="ods-check"><input type="checkbox" name="ciencia_inovacao[]" value="Análise e monitoramento da qualidade da água"> Análise e monitoramento da qualidade da água</label>
          <label class="ods-check"><input type="checkbox" name="ciencia_inovacao[]" value="Análise de solo, microbioma e fertilidade"> Análise de solo, microbioma e fertilidade</label>
          <label class="ods-check"><input type="checkbox" name="ciencia_inovacao[]" value="Bioinsumos, microrganismos benéficos e controle biológico"> Bioinsumos, microrganismos benéficos e controle biológico</label>
          <label class="ods-check"><input type="checkbox" name="ciencia_inovacao[]" value="Biotecnologia vegetal, mudas e diagnóstico de plantas"> Biotecnologia vegetal, mudas e diagnóstico de plantas</label>
          <label class="ods-check"><input type="checkbox" name="ciencia_inovacao[]" value="Monitoramento de biodiversidade e recuperação ambiental"> Monitoramento de biodiversidade e recuperação ambiental</label>
          <label class="ods-check"><input type="checkbox" name="ciencia_inovacao[]" value="Compostagem, bioprocessos e reaproveitamento de resíduos"> Compostagem, bioprocessos e reaproveitamento de resíduos</label>
          <label class="ods-check"><input type="checkbox" name="ciencia_inovacao[]" value="Sensores, irrigação inteligente e agricultura de precisão"> Sensores, irrigação inteligente e agricultura de precisão</label>
          <label class="ods-check"><input type="checkbox" name="ciencia_inovacao[]" value="Inteligência artificial, mapas e análise de dados ambientais"> Inteligência artificial, mapas e análise de dados ambientais</label>
          <label class="ods-check"><input type="checkbox" name="ciencia_inovacao[]" value="Genômica, bioinformática e identificação de microrganismos"> Genômica, bioinformática e identificação de microrganismos</label>
          <label class="ods-check"><input type="checkbox" name="ciencia_inovacao[]" value="Educação científica para escolas, produtores e comunidade"> Educação científica para escolas, produtores e comunidade</label>
        </div>`;
      priorities.insertAdjacentElement('afterend', science);
    }

    const consent = form.querySelector('input[name="consentimento"]')?.closest('label');
    if (consent && !document.getElementById('ods-privacy-panel')) {
      consent.querySelector('span').innerHTML = 'Li o aviso de privacidade e <strong>consinto livremente</strong> com o tratamento das respostas desta escuta para as finalidades acadêmicas e educativas descritas. Sei que posso participar sem informar nome, bairro, faixa etária ou identidade de gênero.';

      const privacy = document.createElement('details');
      privacy.id = 'ods-privacy-panel';
      privacy.className = 'ods-privacy-panel';
      privacy.open = true;
      privacy.innerHTML = `
        <summary>Aviso de privacidade e consentimento — LGPD</summary>
        <p><strong>Responsável pelo tratamento:</strong> Leandro de Mattos Pereira, responsável pela atividade acadêmica, com apoio tecnológico da Databiomics®. Contato para assuntos de dados pessoais: <a href="mailto:contact@databiomics.com">contact@databiomics.com</a>.</p>
        <ul>
          <li><strong>Finalidade:</strong> compreender percepções da comunidade, avaliar alcance e inclusão, produzir sínteses agregadas, materiais educativos e o relatório da atividade extensionista.</li>
          <li><strong>Dados tratados:</strong> respostas marcadas e, somente quando o participante desejar, nome ou nome social, cidade, bairro, faixa etária, identidade de gênero e comentário.</li>
          <li><strong>Base legal:</strong> consentimento do titular. O preenchimento é voluntário e os dados opcionais não são necessários para acessar os conteúdos da página.</li>
          <li><strong>Compartilhamento:</strong> as respostas são encaminhadas pelo serviço FormSubmit ao e-mail da atividade. Não serão vendidas nem divulgadas individualmente. Resultados públicos serão apresentados apenas de forma agregada e anonimizada.</li>
          <li><strong>Retenção:</strong> informações identificáveis serão mantidas somente durante a consolidação e avaliação da ação, no máximo até 23 de junho de 2027; depois serão eliminadas ou anonimizadas. Sínteses estatísticas sem identificação poderão ser preservadas.</li>
          <li><strong>Direitos:</strong> você pode solicitar confirmação, acesso, correção, anonimização, eliminação ou revogação do consentimento pelo e-mail indicado. A revogação não afeta tratamentos já realizados de forma legítima.</li>
        </ul>
        <p class="ods-sensitive-note"><strong>Proteção e não discriminação:</strong> identidade de gênero é opcional e será usada somente em análise agregada de alcance e inclusão. Não informe dados de saúde, orientação sexual, religião, opinião política, documentos, endereço completo ou outras informações sensíveis no campo de comentário. Consulte também a <a href="/privacidade/" target="_blank" rel="noopener">Política de Privacidade da Databiomics®</a>.</p>`;
      consent.insertAdjacentElement('beforebegin', privacy);
    }

    const demographicInputs = [
      form.querySelector('#ods-nome'),
      form.querySelector('#ods-bairro'),
      form.querySelector('#ods-faixa-etaria'),
      form.querySelector('#ods-genero')
    ].filter(Boolean);
    const demographicConsent = form.querySelector('#ods-demographic-consent');
    const formStatus = form.querySelector('#ods-form-status');

    const hasDemographicData = () => demographicInputs.some((field) => String(field.value || '').trim() !== '');
    const updateDemographicRequirement = () => {
      if (!demographicConsent) return;
      demographicConsent.required = hasDemographicData();
    };
    demographicInputs.forEach((field) => field.addEventListener('input', updateDemographicRequirement));
    demographicInputs.forEach((field) => field.addEventListener('change', updateDemographicRequirement));
    updateDemographicRequirement();

    form.addEventListener('submit', (event) => {
      updateDemographicRequirement();
      if (hasDemographicData() && demographicConsent && !demographicConsent.checked) {
        event.preventDefault();
        if (formStatus) {
          formStatus.textContent = 'Como você preencheu informações opcionais de perfil, marque o consentimento específico para esses dados ou deixe os campos em branco.';
          formStatus.classList.add('show');
        }
        demographicConsent.focus();
      }
    });
  });
})();
