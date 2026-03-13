(() => {
  const dictionaries = {
    pt: {
      nav_home: 'Início', nav_about: 'Sobre', nav_services: 'Serviços', nav_articles_projects: 'Artigos / Projetos', nav_training: 'Formação Complementar', nav_courses_talks: 'Cursos & Palestras', nav_videos: 'Vídeos', nav_disclosure: 'Divulgação', nav_programs: 'Programas', nav_news: 'News/Articles', nav_course_plan: 'Plano de Cursos', nav_testimonials: 'Depoimentos', nav_contact: 'Contato',
      privacy_consent: 'Li e concordo com o tratamento dos meus dados pessoais conforme a', privacy_policy: 'Política de Privacidade',
      visitor_count: 'Total de visitas: ',
      hero_eyebrow: 'Dê o primeiro passo rumo a um futuro de inovação e excelência', hero_subtitle: 'Bioinformática, IA aplicada à ciência de dados ômicos e consultoria em análises avançadas.', hero_cta_schedule: 'Agendar conversa', hero_cta_cv: 'Ver CV Lattes', hero_highlight_1: 'Genômica, transcriptômica, proteômica e metagenômica', hero_highlight_2: 'Machine learning, NLP, deep learning e pipelines reprodutíveis', hero_highlight_3: 'Treinamentos, consultorias e projetos de P&D', contact_title: 'Precisa de suporte? Estamos com você a qualquer momento!', contact_subtitle: 'Entre em contato para consultorias, cursos e projetos personalizados.', contact_talk: 'Fale comigo', contact_hours_label: 'Horário:', contact_whatsapp: 'Enviar mensagem no WhatsApp', contact_email_btn: 'Enviar e-mail', contact_note: 'Seu atendimento pode ser iniciado por WhatsApp ou e-mail. O número não é exibido na página.', message_box: 'Caixa de mensagem', full_name: 'Nome completo', email_label: 'E-mail', message_label: 'Mensagem', message_placeholder: 'Como posso ajudar?', send_message_btn: 'Enviar mensagem por e-mail', footer_booking: 'Contato para agendamento de serviços', footer_booking_text: 'Agende pelo E-mail:', visitor_title: 'Visitante', visitor_country_loading: 'Carregando país do visitante...', visitor_country_prefix: 'País do visitante: ', visitor_country_error: 'Não foi possível identificar o país do visitante.', visitor_unavailable: 'Total de visitas: indisponível no momento.'
    },
    en: {
      nav_home: 'Home', nav_about: 'About', nav_services: 'Services', nav_articles_projects: 'Articles / Projects', nav_training: 'Additional Training', nav_courses_talks: 'Courses & Talks', nav_videos: 'Videos', nav_disclosure: 'Outreach', nav_programs: 'Programs', nav_news: 'News/Articles', nav_course_plan: 'Course Plan', nav_testimonials: 'Testimonials', nav_contact: 'Contact',
      privacy_consent: 'I have read and agree to the processing of my personal data according to the', privacy_policy: 'Privacy Policy',
      visitor_count: 'Total visits: ',
      hero_eyebrow: 'Take the first step toward a future of innovation and excellence', hero_subtitle: 'Bioinformatics, AI applied to omics data science, and consulting in advanced analytics.', hero_cta_schedule: 'Schedule a call', hero_cta_cv: 'View Lattes CV', hero_highlight_1: 'Genomics, transcriptomics, proteomics, and metagenomics', hero_highlight_2: 'Machine learning, NLP, deep learning, and reproducible pipelines', hero_highlight_3: 'Training, consulting, and R&D projects', contact_title: 'Need support? We’ve got your back anytime!', contact_subtitle: 'Get in touch for consulting, courses, and custom projects.', contact_talk: 'Talk to me', contact_hours_label: 'Hours:', contact_whatsapp: 'Send WhatsApp message', contact_email_btn: 'Send email', contact_note: 'Support can start via WhatsApp or email. The number is not displayed on the page.', message_box: 'Message box', full_name: 'Full name', email_label: 'Email', message_label: 'Message', message_placeholder: 'How can I help?', send_message_btn: 'Send message by email', footer_booking: 'Contact to book services', footer_booking_text: 'Book by email:', visitor_title: 'Visitor', visitor_country_loading: 'Loading visitor country...', visitor_country_prefix: 'Visitor country: ', visitor_country_error: 'Could not identify visitor country.', visitor_unavailable: 'Total visits: unavailable at the moment.'
    },
    es: {
      nav_home: 'Inicio', nav_about: 'Sobre', nav_services: 'Servicios', nav_articles_projects: 'Artículos / Proyectos', nav_training: 'Formación Complementaria', nav_courses_talks: 'Cursos y Charlas', nav_videos: 'Vídeos', nav_disclosure: 'Divulgación', nav_programs: 'Programas', nav_news: 'News/Articles', nav_course_plan: 'Plan de Cursos', nav_testimonials: 'Testimonios', nav_contact: 'Contacto',
      privacy_consent: 'He leído y acepto el tratamiento de mis datos personales según la', privacy_policy: 'Política de Privacidad',
      visitor_count: 'Total de visitas: ',
      hero_eyebrow: 'Da el primer paso hacia un futuro de innovación y excelencia', hero_subtitle: 'Bioinformática, IA aplicada a la ciencia de datos ómicos y consultoría en análisis avanzados.', hero_cta_schedule: 'Agendar conversación', hero_cta_cv: 'Ver CV Lattes', hero_highlight_1: 'Genómica, transcriptómica, proteómica y metagenómica', hero_highlight_2: 'Machine learning, NLP, deep learning y pipelines reproducibles', hero_highlight_3: 'Capacitaciones, consultorías y proyectos de I+D', contact_title: '¿Necesitas soporte? ¡Estamos contigo en todo momento!', contact_subtitle: 'Contáctame para consultorías, cursos y proyectos personalizados.', contact_talk: 'Habla conmigo', contact_hours_label: 'Horario:', contact_whatsapp: 'Enviar mensaje por WhatsApp', contact_email_btn: 'Enviar correo', contact_note: 'La atención puede iniciarse por WhatsApp o correo. El número no se muestra en la página.', message_box: 'Buzón de mensajes', full_name: 'Nombre completo', email_label: 'Correo electrónico', message_label: 'Mensaje', message_placeholder: '¿Cómo puedo ayudarte?', send_message_btn: 'Enviar mensaje por correo', footer_booking: 'Contacto para agendar servicios', footer_booking_text: 'Agenda por correo:', visitor_title: 'Visitante', visitor_country_loading: 'Cargando país del visitante...', visitor_country_prefix: 'País del visitante: ', visitor_country_error: 'No fue posible identificar el país del visitante.', visitor_unavailable: 'Total de visitas: no disponible en este momento.'
    }
  };

  const applyLanguage = (lang) => {
    const dict = dictionaries[lang] || dictionaries.pt;
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : lang;
    document.querySelectorAll('[data-i18n-key]').forEach((el) => {
      const key = el.getAttribute('data-i18n-key');
      if (dict[key]) el.textContent = dict[key];
    });
    document.querySelectorAll('[data-i18n-placeholder-key]').forEach((el) => {
      const key = el.getAttribute('data-i18n-placeholder-key');
      if (dict[key]) el.setAttribute('placeholder', dict[key]);
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
        const lang = localStorage.getItem('siteLang') || 'pt';
        countEl.textContent = (dictionaries[lang] || dictionaries.pt).visitor_unavailable;
      });

    document.addEventListener('site-language-changed', (e) => {
      const lang = e.detail.lang;
      const digits = countEl.textContent.replace(/\D+/g, '');
      if (digits) countEl.textContent = `${(dictionaries[lang] || dictionaries.pt).visitor_count}${digits}`;
    });
  }
})();
