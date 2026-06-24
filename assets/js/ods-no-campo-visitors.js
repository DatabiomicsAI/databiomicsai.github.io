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
    script.setAttribute(marker, 'true');
    document.head.appendChild(script);
  };

  loadStyle('/assets/css/ods-no-campo-agro-data.css?v=20260624-2', 'data-ods-agro-data-css');
  loadStyle('/assets/css/ods-no-campo-biodiversity-ai.css?v=20260624-1', 'data-ods-biodiversity-ai-css');
  loadScript('https://cdn.jsdelivr.net/gh/DatabiomicsAI/databiomicsai.github.io@ff5eaa478a2cf78fe93dba382a0496d98b90d997/assets/js/ods-no-campo-visitors.js', 'data-ods-visitors-original');
  loadScript('/assets/js/ods-no-campo-agro-data.js?v=20260624-2', 'data-ods-agro-data-js');
  loadScript('/assets/js/ods-no-campo-biodiversity-ai.js?v=20260624-1', 'data-ods-biodiversity-ai-js');
})();
