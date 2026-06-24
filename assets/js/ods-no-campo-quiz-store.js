(() => {
  'use strict';
  const BASE = 'https://countapi.mileshilliard.com/api/v1';
  const PREFIX = 'databiomics-ods-quiz-2026-v4';
  const STATES = {AC:'Acre',AL:'Alagoas',AP:'Amapá',AM:'Amazonas',BA:'Bahia',CE:'Ceará',DF:'Distrito Federal',ES:'Espírito Santo',GO:'Goiás',MA:'Maranhão',MT:'Mato Grosso',MS:'Mato Grosso do Sul',MG:'Minas Gerais',PA:'Pará',PB:'Paraíba',PR:'Paraná',PE:'Pernambuco',PI:'Piauí',RJ:'Rio de Janeiro',RN:'Rio Grande do Norte',RS:'Rio Grande do Sul',RO:'Rondônia',RR:'Roraima',SC:'Santa Catarina',SP:'São Paulo',SE:'Sergipe',TO:'Tocantins',OTHER:'Outro/Não informado'};
  const CITIES = {APERIBE:'Aperibé',BOM_JESUS:'Bom Jesus do Itabapoana',CAMBUCI:'Cambuci',ITALVA:'Italva',ITAOCARA:'Itaocara',ITAPERUNA:'Itaperuna',LAJE:'Laje do Muriaé',MIRACEMA:'Miracema',NATIVIDADE:'Natividade',PORCIUNCULA:'Porciúncula',PADUA:'Santo Antônio de Pádua',SAO_JOSE:'São José de Ubá',VARRE_SAI:'Varre-Sai',OTHER_RJ:'Outro município do RJ',OTHER:'Outro/Não informado'};
  const COUNTRIES = {BR:'Brasil',PT:'Portugal',US:'Estados Unidos',ES:'Espanha',GB:'Reino Unido',FR:'França',DE:'Alemanha',IT:'Itália',CA:'Canadá',AR:'Argentina',CL:'Chile',CO:'Colômbia',PE:'Peru',MX:'México',UY:'Uruguai',PY:'Paraguai',BO:'Bolívia',EC:'Equador',JP:'Japão',CN:'China',OTHER:'Outro país'};
  const QUESTIONS = [
    {id:'q1',correct:'b',text:'Quem adotou a Agenda 2030?',options:[['a','Somente empresas'],['b','Os 193 Estados-membros da ONU'],['c','Apenas municípios rurais']]},
    {id:'q2',correct:'c',text:'Os ODS tratam apenas de meio ambiente?',options:[['a','Sim'],['b','Somente de clima'],['c','Não; integram dimensões sociais, econômicas e ambientais']]},
    {id:'q3',correct:'a',text:'Por que realizar a escuta inicial?',options:[['a','Para priorizar necessidades reais e melhorar a ação'],['b','Para vender dados pessoais'],['c','Para substituir políticas públicas']]}
  ];
  const safe = (value) => String(value || 'OTHER').replace(/[^A-Z0-9_-]/gi,'_');
  const key = (name) => `${PREFIX}-${name}`;
  async function get(name){try{const r=await fetch(`${BASE}/get/${encodeURIComponent(key(name))}`,{cache:'no-store'});if(!r.ok)return 0;const d=await r.json();return Number(d.value||0)}catch(_e){return 0}}
  async function hit(name){try{const r=await fetch(`${BASE}/hit/${encodeURIComponent(key(name))}`,{cache:'no-store'});if(!r.ok)return get(name);const d=await r.json();return Number(d.value||0)}catch(_e){return get(name)}}
  async function mapLimit(items,limit,worker){const out=new Array(items.length);let cursor=0;async function run(){while(cursor<items.length){const i=cursor++;try{out[i]=await worker(items[i],i)}catch(_e){out[i]=null}}}await Promise.all(Array.from({length:Math.min(limit,items.length)},run));return out}
  async function ensureChart(){if(window.Chart)return;await new Promise((resolve,reject)=>{const old=document.querySelector('script[data-ods-quiz-chartjs]');if(old){old.addEventListener('load',resolve,{once:true});old.addEventListener('error',reject,{once:true});return}const s=document.createElement('script');s.src='https://cdn.jsdelivr.net/npm/chart.js@4.4.7/dist/chart.umd.min.js';s.setAttribute('data-ods-quiz-chartjs','true');s.addEventListener('load',resolve,{once:true});s.addEventListener('error',reject,{once:true});document.head.appendChild(s)})}
  window.ODSQuizStore={STATES,CITIES,COUNTRIES,QUESTIONS,safe,get,hit,mapLimit,ensureChart,storageKey:'odsQuiz2026CountedV4'};
})();
