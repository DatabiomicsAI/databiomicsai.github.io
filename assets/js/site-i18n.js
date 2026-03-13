(() => {
  const dictionaries = {
    pt: {
      nav_home: 'Início', nav_about: 'Sobre', nav_services: 'Serviços', nav_articles_projects: 'Artigos / Projetos', nav_training: 'Formação Complementar', nav_courses_talks: 'Cursos & Palestras', nav_videos: 'Vídeos', nav_disclosure: 'Divulgação', nav_programs: 'Programas', nav_news: 'News/Articles', nav_course_plan: 'Plano de Cursos', nav_testimonials: 'Depoimentos', nav_contact: 'Contato',
      privacy_consent: 'Li e concordo com o tratamento dos meus dados pessoais conforme a', privacy_policy: 'Política de Privacidade',
      visitor_count: 'Total de visitas: '
    },
    en: {
      nav_home: 'Home', nav_about: 'About', nav_services: 'Services', nav_articles_projects: 'Articles / Projects', nav_training: 'Additional Training', nav_courses_talks: 'Courses & Talks', nav_videos: 'Videos', nav_disclosure: 'Outreach', nav_programs: 'Programs', nav_news: 'News/Articles', nav_course_plan: 'Course Plan', nav_testimonials: 'Testimonials', nav_contact: 'Contact',
      privacy_consent: 'I have read and agree to the processing of my personal data according to the', privacy_policy: 'Privacy Policy',
      visitor_count: 'Total visits: '
    },
    es: {
      nav_home: 'Inicio', nav_about: 'Sobre', nav_services: 'Servicios', nav_articles_projects: 'Artículos / Proyectos', nav_training: 'Formación Complementaria', nav_courses_talks: 'Cursos y Charlas', nav_videos: 'Vídeos', nav_disclosure: 'Divulgación', nav_programs: 'Programas', nav_news: 'News/Articles', nav_course_plan: 'Plan de Cursos', nav_testimonials: 'Testimonios', nav_contact: 'Contacto',
      privacy_consent: 'He leído y acepto el tratamiento de mis datos personales según la', privacy_policy: 'Política de Privacidad',
      visitor_count: 'Total de visitas: '
    }
  };

  const applyLanguage = (lang) => {
    const dict = dictionaries[lang] || dictionaries.pt;
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : lang;
    document.querySelectorAll('[data-i18n-key]').forEach((el) => {
      const key = el.getAttribute('data-i18n-key');
      if (dict[key]) el.textContent = dict[key];
    });
    document.querySelectorAll('.global-lang-btn').forEach((btn) => {
      btn.classList.toggle('is-active', btn.dataset.globalLang === lang);
    });
    localStorage.setItem('siteLang', lang);
    document.dispatchEvent(new CustomEvent('site-language-changed', { detail: { lang, dict } }));
  };

  const current = localStorage.getItem('siteLang') || 'pt';
  document.querySelectorAll('.global-lang-btn').forEach((btn) => {
    btn.addEventListener('click', () => applyLanguage(btn.dataset.globalLang));
  });
  applyLanguage(current);

  const countEl = document.getElementById('visitor-count');
  if (countEl) {
    const ns = 'databiomicsai-github-io';
    const key = 'site-visits';
    fetch(`https://api.countapi.xyz/hit/${ns}/${key}`)
      .then((r) => r.json())
      .then((d) => {
        const lang = localStorage.getItem('siteLang') || 'pt';
        const prefix = (dictionaries[lang] || dictionaries.pt).visitor_count;
        countEl.textContent = `${prefix}${d.value}`;
      })
      .catch(() => {
        countEl.textContent = 'Total de visitas: indisponível no momento.';
      });

    document.addEventListener('site-language-changed', (e) => {
      const lang = e.detail.lang;
      const digits = countEl.textContent.replace(/\D+/g, '');
      if (digits) countEl.textContent = `${(dictionaries[lang] || dictionaries.pt).visitor_count}${digits}`;
    });
  }
})();
