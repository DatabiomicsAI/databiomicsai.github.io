(() => {
  'use strict';
  const wait = (fn, attempt=0) => {
    if (window.ODSQuizStore && document.querySelector('.ods-quiz')) return fn();
    if (attempt < 100) setTimeout(() => wait(fn, attempt + 1), 100);
  };

  function options(map, placeholder){
    return `<option value="">${placeholder}</option>${Object.entries(map).map(([code,label])=>`<option value="${code}">${label}</option>`).join('')}`;
  }

  function markup(store){
    return `
      <div class="ods-quiz-head">
        <div><span class="ods-quiz-kicker">Teste rápido</span><h2 id="quiz-title">Você já entendeu a ideia principal?</h2><p>Marque uma alternativa em cada pergunta. O resultado será mostrado imediatamente após a conclusão.</p></div>
        <div class="ods-quiz-count-badge"><span id="ods-quiz-live-count">—</span> participantes</div>
      </div>
      <form id="ods-quick-quiz" novalidate>
        ${store.QUESTIONS.map((q,i)=>`<fieldset class="ods-quiz-question"><legend>${i+1}. ${q.text}</legend><div class="ods-quiz-options">${q.options.map(([value,label])=>`<label class="ods-quiz-option"><input type="radio" name="${q.id}" value="${value}"><span>${label}</span></label>`).join('')}</div></fieldset>`).join('')}
        <fieldset class="ods-quiz-question">
          <legend>Localização para os gráficos agregados</legend>
          <p>Selecione as opções abaixo. Não são solicitados nome, e-mail, endereço ou número de documento.</p>
          <div class="ods-quiz-location-grid">
            <label><span>País</span><select id="ods-quiz-country" required>${options(store.COUNTRIES,'Selecione o país')}</select></label>
            <label><span>Estado brasileiro</span><select id="ods-quiz-state" disabled>${options(store.STATES,'Selecione o estado')}</select></label>
            <label><span>Município do Noroeste Fluminense</span><select id="ods-quiz-city" disabled>${options(store.CITIES,'Selecione o município')}</select></label>
          </div>
        </fieldset>
        <div class="ods-quiz-actions"><button type="submit" class="ods-quiz-submit">Concluir teste e ver resultado</button></div>
        <p class="ods-quiz-privacy">As escolhas territoriais são registradas apenas em contadores agregados para gerar os gráficos de país, estado e município. O teste não grava nome, e-mail ou resposta individual identificável.</p>
        <div id="ods-quiz-message" class="ods-quiz-message" role="status" aria-live="polite"></div>
      </form>
      <section id="ods-quiz-stats" class="ods-quiz-stats" aria-labelledby="ods-quiz-stats-title">
        <h3 id="ods-quiz-stats-title">Resultados quantitativos do teste rápido</h3><p>Os resultados são atualizados de forma agregada.</p>
        <div class="ods-quiz-metrics">
          <div class="ods-quiz-metric"><strong id="ods-quiz-participants">0</strong><span>pessoas concluíram o teste</span></div>
          <div class="ods-quiz-metric"><strong id="ods-quiz-perfect">0</strong><span>pessoas acertaram as 3 perguntas</span></div>
          <div class="ods-quiz-metric"><strong id="ods-quiz-correct-total">0</strong><span>respostas corretas contabilizadas</span></div>
          <div class="ods-quiz-metric"><strong id="ods-quiz-accuracy">0%</strong><span>taxa geral de acertos</span></div>
        </div>
        <div class="ods-quiz-charts">
          <article class="ods-quiz-chart-card"><h4>Distribuição das notas</h4><div class="ods-quiz-chart-wrap"><canvas id="ods-quiz-score-chart"></canvas></div></article>
          <article class="ods-quiz-chart-card"><h4>Participantes por país</h4><div class="ods-quiz-chart-wrap"><canvas id="ods-quiz-country-chart"></canvas></div></article>
          <article class="ods-quiz-chart-card"><h4>Participantes por estado</h4><div class="ods-quiz-chart-wrap"><canvas id="ods-quiz-state-chart"></canvas></div></article>
          <article class="ods-quiz-chart-card"><h4>Participantes por município</h4><div class="ods-quiz-chart-wrap"><canvas id="ods-quiz-city-chart"></canvas></div></article>
        </div>
        <div class="ods-quiz-list"><strong>Acertos por pergunta</strong><ul id="ods-quiz-question-list"><li>Carregando dados…</li></ul></div>
        <p class="ods-quiz-stats-note">Os contadores são indicadores públicos e aproximados. Localidades sem categoria específica são agrupadas como “Outro”.</p>
      </section>`;
  }

  function message(html){const box=document.getElementById('ods-quiz-message');if(box){box.innerHTML=html;box.classList.add('show')}}

  function markAnswers(form,answers,store){
    form.querySelectorAll('.ods-quiz-option').forEach(x=>x.classList.remove('is-correct','is-wrong'));
    store.QUESTIONS.forEach(q=>{
      const selected=form.querySelector(`input[name="${q.id}"][value="${answers[q.id]}"]`);
      selected?.closest('.ods-quiz-option')?.classList.add(answers[q.id]===q.correct?'is-correct':'is-wrong');
      form.querySelector(`input[name="${q.id}"][value="${q.correct}"]`)?.closest('.ods-quiz-option')?.classList.add('is-correct');
    });
  }

  async function register(store,score,answers,country,state,city){
    if(localStorage.getItem(store.storageKey)) return false;
    const jobs=[store.hit('participants'),store.hit(`score-${score}`),store.hit(`country-${store.safe(country||'OTHER')}`),store.hit(`state-${store.safe(state||'OTHER')}`),store.hit(`city-${store.safe(city||'OTHER')}`)];
    if(score===store.QUESTIONS.length) jobs.push(store.hit('perfect'));
    store.QUESTIONS.forEach(q=>{if(answers[q.id]===q.correct)jobs.push(store.hit(`${q.id}-correct`))});
    await Promise.all(jobs);
    localStorage.setItem(store.storageKey,JSON.stringify({score,date:new Date().toISOString()}));
    return true;
  }

  function install(){
    const store=window.ODSQuizStore;
    const quiz=document.querySelector('.ods-quiz');
    if(!store||!quiz||quiz.dataset.enhancedQuiz==='true')return;
    quiz.dataset.enhancedQuiz='true';
    quiz.className='ods-quiz ods-quiz-enhanced';
    quiz.innerHTML=markup(store);
    const form=document.getElementById('ods-quick-quiz');
    const country=document.getElementById('ods-quiz-country');
    const state=document.getElementById('ods-quiz-state');
    const city=document.getElementById('ods-quiz-city');

    country.addEventListener('change',()=>{
      const isBrazil=country.value==='BR';
      state.disabled=!isBrazil;
      state.required=isBrazil;
      if(!isBrazil){state.value='';city.value='';city.disabled=true;city.required=false}
    });
    state.addEventListener('change',()=>{
      const isRio=state.value==='RJ';
      city.disabled=!isRio;
      city.required=isRio;
      if(!isRio)city.value='';
    });

    form.addEventListener('submit',async(event)=>{
      event.preventDefault();
      const answers={};
      for(const q of store.QUESTIONS){
        const checked=form.querySelector(`input[name="${q.id}"]:checked`);
        if(!checked){message('<strong>Antes de concluir:</strong> marque uma alternativa em todas as três perguntas.');form.querySelector(`input[name="${q.id}"]`)?.focus();return}
        answers[q.id]=checked.value;
      }
      if(!country.value){message('<strong>Antes de concluir:</strong> selecione o país.');country.focus();return}
      if(country.value==='BR'&&!state.value){message('<strong>Antes de concluir:</strong> selecione o estado.');state.focus();return}
      if(country.value==='BR'&&state.value==='RJ'&&!city.value){message('<strong>Antes de concluir:</strong> selecione o município ou a opção “Outro município do RJ”.');city.focus();return}

      const score=store.QUESTIONS.reduce((sum,q)=>sum+(answers[q.id]===q.correct?1:0),0);
      markAnswers(form,answers,store);
      const counted=await register(store,score,answers,country.value,state.value||'OTHER',city.value||'OTHER');
      const result=score===3?'<strong>Parabéns!</strong> Você acertou as três perguntas.':`<strong>Resultado:</strong> você acertou ${score} de 3. As respostas corretas foram destacadas em verde.`;
      message(`${result}${counted?' Sua participação foi incluída nos gráficos agregados.':' Este navegador já havia sido contabilizado; o resultado foi corrigido, mas não foi contado novamente.'}`);
      document.dispatchEvent(new CustomEvent('ods-quiz-updated'));
      document.getElementById('ods-quiz-stats')?.scrollIntoView({behavior:'smooth',block:'start'});
    });
  }

  wait(install);
})();
