(() => {
  'use strict';
  const COLORS=['#0f6b3a','#159bd2','#d5a126','#8f4aa8','#e76f51','#6b8e23','#457b9d','#9c6644','#6d597a','#2a9d8f'];
  const charts={};
  const format=(value)=>Number(value||0).toLocaleString('pt-BR');

  function chartData(entries,max=8){
    const active=entries.filter(x=>Number(x.value)>0).sort((a,b)=>b.value-a.value);
    if(!active.length)return{labels:['Aguardando respostas'],values:[1],empty:true};
    if(active.length<=max)return{labels:active.map(x=>x.label),values:active.map(x=>x.value),empty:false};
    const top=active.slice(0,max-1);const rest=active.slice(max-1).reduce((sum,x)=>sum+x.value,0);
    return{labels:[...top.map(x=>x.label),'Demais'],values:[...top.map(x=>x.value),rest],empty:false};
  }

  function pie(id,data){
    const canvas=document.getElementById(id);if(!canvas||!window.Chart)return;
    if(charts[id])charts[id].destroy();
    charts[id]=new Chart(canvas,{type:'pie',data:{labels:data.labels,datasets:[{data:data.values,backgroundColor:data.empty?['#d9e5d7']:data.values.map((_,i)=>COLORS[i%COLORS.length]),borderColor:'#fff',borderWidth:2}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'bottom',labels:{boxWidth:13,usePointStyle:true}},tooltip:{enabled:!data.empty}}}});
  }

  async function load(){
    const s=window.ODSQuizStore;if(!s||!document.getElementById('ods-quiz-stats'))return;
    const baseNames=['participants','perfect','q1-correct','q2-correct','q3-correct','score-0','score-1','score-2','score-3'];
    const basePairs=await s.mapLimit(baseNames,8,async name=>[name,await s.get(name)]);
    const countryPairs=await s.mapLimit(Object.keys(s.COUNTRIES),8,async code=>[code,await s.get(`country-${s.safe(code)}`)]);
    const statePairs=await s.mapLimit(Object.keys(s.STATES),8,async code=>[code,await s.get(`state-${s.safe(code)}`)]);
    const cityPairs=await s.mapLimit(Object.keys(s.CITIES),8,async code=>[code,await s.get(`city-${s.safe(code)}`)]);
    const base=Object.fromEntries(basePairs.filter(Boolean));
    const participants=Number(base.participants||0);const perfect=Number(base.perfect||0);
    const correct=Number(base['q1-correct']||0)+Number(base['q2-correct']||0)+Number(base['q3-correct']||0);
    const accuracy=participants?correct/(participants*3)*100:0;
    [['ods-quiz-live-count',participants],['ods-quiz-participants',participants],['ods-quiz-perfect',perfect],['ods-quiz-correct-total',correct]].forEach(([id,val])=>{const el=document.getElementById(id);if(el)el.textContent=format(val)});
    const acc=document.getElementById('ods-quiz-accuracy');if(acc)acc.textContent=`${accuracy.toLocaleString('pt-BR',{maximumFractionDigits:1})}%`;
    const list=document.getElementById('ods-quiz-question-list');
    if(list)list.innerHTML=s.QUESTIONS.map((q,i)=>`<li>Pergunta ${i+1}: <strong>${format(base[`${q.id}-correct`]||0)}</strong> participantes acertaram.</li>`).join('');
    await s.ensureChart();
    pie('ods-quiz-score-chart',chartData([{label:'0 acertos',value:Number(base['score-0']||0)},{label:'1 acerto',value:Number(base['score-1']||0)},{label:'2 acertos',value:Number(base['score-2']||0)},{label:'3 acertos',value:Number(base['score-3']||0)}],4));
    pie('ods-quiz-country-chart',chartData(countryPairs.filter(Boolean).map(([code,value])=>({label:s.COUNTRIES[code],value:Number(value||0)}))));
    pie('ods-quiz-state-chart',chartData(statePairs.filter(Boolean).map(([code,value])=>({label:s.STATES[code],value:Number(value||0)}))));
    pie('ods-quiz-city-chart',chartData(cityPairs.filter(Boolean).map(([code,value])=>({label:s.CITIES[code],value:Number(value||0)}))));
  }

  function wait(attempt=0){if(window.ODSQuizStore&&document.getElementById('ods-quiz-stats')){load();return}if(attempt<120)setTimeout(()=>wait(attempt+1),100)}
  document.addEventListener('ods-quiz-updated',load);
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>wait(),{once:true});else wait();
})();
