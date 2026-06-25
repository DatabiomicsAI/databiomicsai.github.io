(() => {
  const loadStyle = (href, marker) => {
    if (document.querySelector(`link[${marker}]`)) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.setAttribute(marker, 'true');
    document.head.appendChild(link);
  };

  const loadScript = (src, marker) => {
    if (document.querySelector(`script[${marker}]`)) return;
    const script = document.createElement('script');
    script.src = src;
    script.async = false;
    script.setAttribute(marker, 'true');
    document.head.appendChild(script);
  };

  loadStyle('/assets/css/ods-no-campo-agro-data.css?v=20260624-2', 'data-ods-agro-data-css');
  loadStyle('/assets/css/ods-no-campo-biodiversity-ai.css?v=20260624-1', 'data-ods-biodiversity-ai-css');
  loadStyle('/assets/css/ods-no-campo-quiz-stats.css?v=20260624-2', 'data-ods-quiz-stats-css');
  loadStyle('/assets/css/ods-no-campo-listening-report.css?v=20260624-2', 'data-ods-listening-report-css');

  loadScript('https://cdn.jsdelivr.net/gh/DatabiomicsAI/databiomicsai.github.io@ff5eaa478a2cf78fe93dba382a0496d98b90d997/assets/js/ods-no-campo-visitors.js', 'data-ods-visitors-original');
  loadScript('/assets/js/ods-no-campo-agro-data.js?v=20260624-2', 'data-ods-agro-data-js');
  loadScript('/assets/js/ods-no-campo-biodiversity-ai.js?v=20260624-1', 'data-ods-biodiversity-ai-js');
  loadScript('/assets/js/ods-no-campo-quiz-store.js?v=20260624-1', 'data-ods-quiz-store-js');
  loadScript('/assets/js/ods-no-campo-quiz-ui.js?v=20260624-1', 'data-ods-quiz-ui-js');
  loadScript('/assets/js/ods-no-campo-quiz-dashboard.js?v=20260624-1', 'data-ods-quiz-dashboard-js');
  loadScript('/assets/js/ods-no-campo-listening-report.js?v=20260624-1', 'data-ods-listening-report-js');
  loadScript('/assets/js/ods-no-campo-ods-ranking.js?v=20260624-1', 'data-ods-ranking-js');
  loadScript('/assets/js/ods-no-campo-credit-text-v2.js?v=20260625-3', 'data-ods-credit-text-v2-js');
})();
