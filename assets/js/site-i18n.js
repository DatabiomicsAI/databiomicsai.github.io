(() => {
  const dictionaries = {
    pt: {
      nav_home: 'Início', nav_about: 'Sobre', nav_services: 'Serviços', nav_articles_projects: 'Artigos / Projetos', nav_training: 'Formação Complementar', nav_courses_talks: 'Cursos & Palestras', nav_videos: 'Vídeos', nav_disclosure: 'Divulgação', nav_programs: 'Programas', nav_news: 'Veja Selected Articles', nav_course_plan: 'Plano de Cursos', nav_testimonials: 'Depoimentos', nav_support_projects: 'Apoie os projetos', nav_support_projects_cta: 'Apoie os projetos →', nav_cv_others: 'CV / Others', nav_catalog: 'Catálogo', nav_contact: 'Contato',
      privacy_consent: 'Li e concordo com o tratamento dos meus dados pessoais conforme a', privacy_policy: 'Política de Privacidade',
      visitor_count: 'Total de visitas: ',
      hero_eyebrow: 'Dê o primeiro passo rumo a um futuro de inovação e excelência', hero_subtitle: 'Bioinformática, IA aplicada à ciência de dados ômicos e consultoria em análises avançadas.', hero_cta_schedule: 'Agendar conversa', hero_cta_cv: 'Ver CV Lattes', hero_highlight_1: 'Genômica, transcriptômica, proteômica e metagenômica', hero_highlight_2: 'Machine learning, NLP, deep learning e pipelines reprodutíveis', hero_highlight_3: 'Treinamentos, consultorias e projetos de P&D', contact_title: 'Precisa de suporte? Estamos com você a qualquer momento!', contact_subtitle: 'Entre em contato para consultorias, cursos e projetos personalizados.', contact_talk: 'Fale comigo', contact_hours_label: 'Horário:', contact_whatsapp: 'Enviar mensagem no WhatsApp', contact_email_btn: 'Enviar e-mail', contact_note: 'Seu atendimento pode ser iniciado por WhatsApp ou e-mail. O número não é exibido na página.', message_box: 'Caixa de mensagem', full_name: 'Nome completo', email_label: 'E-mail', message_label: 'Mensagem', message_placeholder: 'Como posso ajudar?', send_message_btn: 'Enviar mensagem por e-mail', footer_booking: 'Contato para agendamento de serviços', footer_booking_text: 'Agende pelo E-mail:', visitor_title: 'Visitante', visitor_country_loading: 'Carregando país do visitante...', visitor_country_prefix: 'País do visitante: ', visitor_country_error: 'Não foi possível identificar o país do visitante.', lead_title: 'Desbloqueie seu potencial em IA & ML', lead_intro: 'Solicite orientação personalizada para seus projetos e equipes.', lead_full_name: 'Nome completo', lead_name_ph: 'Seu nome completo', lead_phone: 'Telefone', lead_phone_ph: 'Seu telefone / WhatsApp', lead_email: 'E-mail', lead_email_ph: 'seuemail@dominio.com', lead_terms: 'Concordo com os Termos e Condições', lead_updates: 'Receber atualizações por WhatsApp', lead_submit: 'Quero orientação especializada', lead_footnote: 'Você receberá retorno em até 24 horas.', stats_title: 'Impacto e diferenciais', stats_subtitle: 'Foco em resultados aplicados, eficiência de análise e capacitação de equipes multidisciplinares.', stats_card2_title: 'Projetos internacionais', stats_card2_text: 'colaborações com universidades, centros de pesquisa e empresas.', stats_card3_title: 'IA aplicada', stats_card3_text: 'modelos preditivos e NLP para acelerar descoberta científica.', stats_card4_title: 'Treinamentos customizados', stats_card4_text: 'do básico ao avançado, com foco em prática e reprodutibilidade.', about_title: 'Sobre', about_subtitle: 'Pesquisador e consultor com trajetória em bioinformática, biologia computacional e ciência de dados aplicada à saúde, biodiversidade e biotecnologia.', about_exp_title: 'Experiência', about_li1: 'Ciência de dados ômicos e pipelines reprodutíveis', about_li2: 'Modelagem preditiva e aprendizagem supervisionada/não supervisionada', about_li3: 'Desenvolvimento de aplicações com Python, R, PostgreSQL, Flask e Streamlit', help_title: 'Como posso ajudar sua organização?', help_subtitle: 'Transformo dados complexos em decisões claras, com entregas estruturadas e comunicação objetiva.',  videos_title: 'Galeria de vídeos · Databiomics', newsletter_title: 'Newsletter Databiomics',  programs_title: 'Programas em Destaque', programs_subtitle: 'Projetos estruturados para acelerar resultados e inovação científica', visitor_unavailable: 'Total de visitas: indisponível no momento.', top_countries_title: 'Principais países visitantes', support_projects_title: 'Apoie os projetos da Databiomics', support_projects_summary: 'Veja missão, valores, transparência, projetos em andamento, além de formulário para colaborar e apoiar a Databiomics.', support_projects_intro: 'Veja a página dedicada e acompanhe as oportunidades de apoiar as iniciativas da Databiomics.', support_projects_btn: 'Abrir página Apoie os projetos', about_profile_p1: 'Leandro de Mattos Pereira Sou pesquisador e biólogo (CRBio-2 143240), com doutorado em Biologia Computacional e de Sistemas pela Fiocruz (RJ), mestrado em Biociências e Biotecnologia pela UENF e graduação em Ciências Biológicas pela UENF, com ênfase em Biotecnologia. Realizei ainda seis pós-doutorados — na PUCRS, HCPA, UFRJ, Fiocruz, ITV e CIIMAR (Portugal) — na área de Bioinformática aplicada à Parasitologia, Microbiologia, Virologia e Biotecnologia. Atuo em bioinformática e análise de dados ômicos (genômica, transcriptômica, proteômica e metagenômica), com experiência em anotação funcional, descoberta de enzimas, reconstrução de vias metabólicas, genômica comparativa e filogenômica, mineração de clusters de genes biossintéticos (BGCs), análises de metabarcoding e análises estatísticas para índices ecológicos de diversidade. Trabalho principalmente com Python e R, aplicando metodologias de ciência de dados e aprendizado de máquina — desde métodos clássicos (Random Forest, SVM e redes neurais profundas) até LLMs (como GPT-J), incluindo fine-tuning e RAG.', about_profile_p2: 'Desenvolvo pipelines de ponta a ponta — desde a aquisição e curadoria de dados, passando pelo processamento e modelagem, até a disponibilização de resultados em soluções do tipo Software as a Service (SaaS), incluindo configuração de ambientes, configuração da infraestrutura de rede e implantação em produção. Esses pipelines integram machine learning clássico com modelos baseados em transformers (por exemplo, BERT e ESM2) e abordagens baseadas em embeddings (como word2vec) para prever a especificidade de substrato de enzimas. Tenho interesse em integrar Bioinformática e IA para gerar conhecimento aplicável, com impacto em biotecnologia, preservação ambiental e desenvolvimento sustentável.', about_linkedin_btn: 'LinkedIn', services_title: 'Serviços & Consultoria', services_subtitle: 'Projetos sob medida para instituições de pesquisa, estudantes, empresas e laboratórios.', services_card1_title: 'Bioinformática e IA para Prospecção In silico inteligente de microrganismos benéficos com potencial funcional aplicado', services_card1_text: 'Desenho, construção e implementação de programas para priorização de enzimas inéditas para validação experimental. Dentro desse tópico: ranking de candidatos com maior chance funcional; mineração de genomas para encontrar enzimas com perfil industrial; análise de milhares de genomas para encontrar candidatos para validação funcional com interesse bioquímico e industrial. Exemplo de pesquisa relacionada realizada no pós-doutorado:', services_card2_title: 'Análises Ômicas Avançadas', services_card2_text: 'Integração de dados genômicos, transcriptômicos e metabarcoding/metagenômicos com relatórios claros e acionáveis.', services_card3_title: 'IA & IA: Machine Learning e Redes neurais profundas', services_card3_text: 'Modelos preditivos utilizando machine learning tradicional, redes neurais e NLP aplicados a dados biomoleculares e clínicas.', services_card4_title: 'Análises Genômicas comparativa', services_card4_text: 'Automatização de acesso a base de dados públicas e obtenção de dados em larga escala (genomas, proteomas), comparação de genomas utilizando pipelines customizados e análises filogenômicas com relatórios.', services_card5_title: 'Desenvolvimento de Soluções', services_card5_text: 'Dashboards, APIs e aplicativos científicos para automatizar fluxos e acelerar decisões.', services_card6_title: 'Mentoria Estratégica', services_card6_text: 'Planejamento de pesquisa, revisão de pipelines e capacitação de equipes técnicas', cv_others_title: 'CV / Others', cv_others_intro: 'Nesta seção você encontra categorias relacionadas ao currículo profissional e histórico acadêmico.', cv_others_articles_desc: 'Acesse publicações, projetos e materiais técnicos relacionados ao meu trabalho.', cv_others_articles_btn: 'Abrir Articles / Projects', cv_others_training_desc: 'Veja cursos, certificações e conteúdos de formação complementar.', cv_others_training_btn: 'Abrir Additional Training'
    },
    en: {
      nav_home: 'Home', nav_about: 'About', nav_services: 'Services', nav_articles_projects: 'Articles / Projects', nav_training: 'Additional Training', nav_courses_talks: 'Courses & Talks', nav_videos: 'Videos', nav_disclosure: 'Outreach', nav_programs: 'Programs', nav_news: 'Veja Selected Articles', nav_course_plan: 'Course Plan', nav_testimonials: 'Testimonials', nav_support_projects: 'Support projects', nav_support_projects_cta: 'Support projects →', nav_cv_others: 'CV / Others', nav_catalog: 'Catalog', nav_contact: 'Contact',
      privacy_consent: 'I have read and agree to the processing of my personal data according to the', privacy_policy: 'Privacy Policy',
      visitor_count: 'Total visits: ',
      hero_eyebrow: 'Take the first step toward a future of innovation and excellence', hero_subtitle: 'Bioinformatics, AI applied to omics data science, and consulting in advanced analytics.', hero_cta_schedule: 'Schedule a call', hero_cta_cv: 'View Lattes CV', hero_highlight_1: 'Genomics, transcriptomics, proteomics, and metagenomics', hero_highlight_2: 'Machine learning, NLP, deep learning, and reproducible pipelines', hero_highlight_3: 'Training, consulting, and R&D projects', contact_title: 'Need support? We’ve got your back anytime!', contact_subtitle: 'Get in touch for consulting, courses, and custom projects.', contact_talk: 'Talk to me', contact_hours_label: 'Hours:', contact_whatsapp: 'Send WhatsApp message', contact_email_btn: 'Send email', contact_note: 'Support can start via WhatsApp or email. The number is not displayed on the page.', message_box: 'Message box', full_name: 'Full name', email_label: 'Email', message_label: 'Message', message_placeholder: 'How can I help?', send_message_btn: 'Send message by email', footer_booking: 'Contact to book services', footer_booking_text: 'Book by email:', visitor_title: 'Visitor', visitor_country_loading: 'Loading visitor country...', visitor_country_prefix: 'Visitor country: ', visitor_country_error: 'Could not identify visitor country.', lead_title: 'Unlock Your AI & ML Potential', lead_intro: 'Request tailored guidance for your projects and teams.', lead_full_name: 'Full name', lead_name_ph: 'Your full name', lead_phone: 'Phone number', lead_phone_ph: 'Your phone / WhatsApp', lead_email: 'Email', lead_email_ph: 'youremail@domain.com', lead_terms: 'I agree to the Terms & Conditions', lead_updates: 'Send WhatsApp updates', lead_submit: 'Get expert guidance', lead_footnote: 'You will hear back within 24 hours.', stats_title: 'Impact and differentiators', stats_subtitle: 'Focus on applied results, analytical efficiency, and upskilling multidisciplinary teams.', stats_card2_title: 'International projects', stats_card2_text: 'collaborations with universities, research centers, and companies.', stats_card3_title: 'Applied AI', stats_card3_text: 'predictive models and NLP to accelerate scientific discovery.', stats_card4_title: 'Customized training', stats_card4_text: 'from basic to advanced, focused on practice and reproducibility.', about_title: 'About', about_subtitle: 'Researcher and consultant with a track record in bioinformatics, computational biology, and data science applied to health, biodiversity, and biotechnology.', about_exp_title: 'Experience', about_li1: 'Omics data science and reproducible pipelines', about_li2: 'Predictive modeling and supervised/unsupervised learning', about_li3: 'Application development with Python, R, PostgreSQL, Flask, and Streamlit', help_title: 'How can I help your organization?', help_subtitle: 'I turn complex data into clear decisions with structured deliverables and objective communication.',  videos_title: 'Video gallery · Databiomics', newsletter_title: 'Databiomics Newsletter',  programs_title: 'Featured Programs', programs_subtitle: 'Structured projects to accelerate results and scientific innovation', visitor_unavailable: 'Total visits: unavailable at the moment.', top_countries_title: 'Top visitor countries', support_projects_title: 'Support Databiomics projects', support_projects_summary: 'See mission, values, transparency, ongoing projects, and a form to collaborate with and support Databiomics.', support_projects_intro: 'Visit the dedicated page and follow opportunities to support Databiomics initiatives.', support_projects_btn: 'Open Support Projects page', about_profile_p1: 'Researcher and Biologist (MSc, PhD) - CRBIO2: 143240 with interdisciplinary training in Biotechnology, Computational Biology, and Data Science. I work in bioinformatics and omics data analysis (genomics, transcriptomics, proteomics, and metagenomics), with experience in functional annotation, enzyme discovery, metabolic pathway reconstruction, comparative genomics and phylogenomics, mining of biosynthetic gene clusters (BGCs), and metabarcoding/ecology analyses. I work mainly with Python and R, applying data science and machine learning methodologies—from classical methods (Random Forest, SVM, and deep neural networks) to LLMs (such as GPT-J and BLOOM), including fine-tuning and RAG.', about_profile_p2: 'I develop end-to-end pipelines—from data acquisition and curation, through processing and modeling, to delivering results in Software as a Service (SaaS) solutions, including environment setup, infrastructure, and production deployment. These pipelines integrate classical machine learning with transformer-based models (for example, BERT and ESM2) and embedding-based approaches (such as word2vec) to predict enzyme substrate specificity. I am interested in integrating Bioinformatics and AI to generate applicable knowledge with impact on biotechnology, environmental preservation, and sustainable development.', about_linkedin_btn: 'LinkedIn', services_title: 'Services & Consulting', services_subtitle: 'Tailor-made projects for research institutions, students, companies, and laboratories.', services_card1_title: 'Bioinformatics and AI for intelligent in silico prospection of beneficial microorganisms with applied functional potential', services_card1_text: 'Design, construction, and implementation of programs to prioritize novel enzymes for experimental validation. Within this topic: ranking candidates with higher functional probability; genome mining to find enzymes with industrial profiles; analysis of thousands of genomes to identify candidates for functional validation with biochemical and industrial interest. Example of related postdoctoral research:', services_card2_title: 'Advanced Omics Analyses', services_card2_text: 'Integration of genomic, transcriptomic, and metabarcoding/metagenomic data with clear and actionable reports.', services_card3_title: 'AI & ML: Machine Learning and Deep Neural Networks', services_card3_text: 'Predictive models using traditional machine learning, neural networks, and NLP applied to biomolecular and clinical data.', services_card4_title: 'Comparative Genomic Analyses', services_card4_text: 'Automation of access to public databases and large-scale data retrieval (genomes, proteomes), genome comparison with custom pipelines, and phylogenomic analyses with reporting.', services_card5_title: 'Solution Development', services_card5_text: 'Dashboards, APIs, and scientific applications to automate workflows and accelerate decisions.', services_card6_title: 'Strategic Mentorship', services_card6_text: 'Research planning, pipeline review, and technical team training', cv_others_title: 'CV / Others', cv_others_intro: 'In this section you can find categories related to my professional CV and academic background.', cv_others_articles_desc: 'Access publications, projects, and technical materials related to my work.', cv_others_articles_btn: 'Open Articles / Projects', cv_others_training_desc: 'See courses, certifications, and additional training content.', cv_others_training_btn: 'Open Additional Training'
    },
    es: {
      nav_home: 'Inicio', nav_about: 'Sobre', nav_services: 'Servicios', nav_articles_projects: 'Artículos / Proyectos', nav_training: 'Formación Complementaria', nav_courses_talks: 'Cursos y Charlas', nav_videos: 'Vídeos', nav_disclosure: 'Divulgación', nav_programs: 'Programas', nav_news: 'Veja Selected Articles', nav_course_plan: 'Plan de Cursos', nav_testimonials: 'Testimonios', nav_support_projects: 'Apoye los proyectos', nav_support_projects_cta: 'Apoye los proyectos →', nav_cv_others: 'CV / Others', nav_catalog: 'Catálogo', nav_contact: 'Contacto',
      privacy_consent: 'He leído y acepto el tratamiento de mis datos personales según la', privacy_policy: 'Política de Privacidad',
      visitor_count: 'Total de visitas: ',
      hero_eyebrow: 'Da el primer paso hacia un futuro de innovación y excelencia', hero_subtitle: 'Bioinformática, IA aplicada a la ciencia de datos ómicos y consultoría en análisis avanzados.', hero_cta_schedule: 'Agendar conversación', hero_cta_cv: 'Ver CV Lattes', hero_highlight_1: 'Genómica, transcriptómica, proteómica y metagenómica', hero_highlight_2: 'Machine learning, NLP, deep learning y pipelines reproducibles', hero_highlight_3: 'Capacitaciones, consultorías y proyectos de I+D', contact_title: '¿Necesitas soporte? ¡Estamos contigo en todo momento!', contact_subtitle: 'Contáctame para consultorías, cursos y proyectos personalizados.', contact_talk: 'Habla conmigo', contact_hours_label: 'Horario:', contact_whatsapp: 'Enviar mensaje por WhatsApp', contact_email_btn: 'Enviar correo', contact_note: 'La atención puede iniciarse por WhatsApp o correo. El número no se muestra en la página.', message_box: 'Buzón de mensajes', full_name: 'Nombre completo', email_label: 'Correo electrónico', message_label: 'Mensaje', message_placeholder: '¿Cómo puedo ayudarte?', send_message_btn: 'Enviar mensaje por correo', footer_booking: 'Contacto para agendar servicios', footer_booking_text: 'Agenda por correo:', visitor_title: 'Visitante', visitor_country_loading: 'Cargando país del visitante...', visitor_country_prefix: 'País del visitante: ', visitor_country_error: 'No fue posible identificar el país del visitante.', lead_title: 'Desbloquea tu potencial en IA y ML', lead_intro: 'Solicita orientación personalizada para tus proyectos y equipos.', lead_full_name: 'Nombre completo', lead_name_ph: 'Su nombre completo', lead_phone: 'Teléfono', lead_phone_ph: 'Su teléfono / WhatsApp', lead_email: 'Correo electrónico', lead_email_ph: 'suemail@dominio.com', lead_terms: 'Acepto los Términos y Condiciones', lead_updates: 'Recibir actualizaciones por WhatsApp', lead_submit: 'Quiero orientación especializada', lead_footnote: 'Recibirás respuesta en hasta 24 horas.', stats_title: 'Impacto y diferenciales', stats_subtitle: 'Enfoque en resultados aplicados, eficiencia analítica y capacitación de equipos multidisciplinarios.', stats_card2_title: 'Proyectos internacionales', stats_card2_text: 'colaboraciones con universidades, centros de investigación y empresas.', stats_card3_title: 'IA aplicada', stats_card3_text: 'modelos predictivos y NLP para acelerar el descubrimiento científico.', stats_card4_title: 'Capacitaciones personalizadas', stats_card4_text: 'de básico a avanzado, con foco en práctica y reproducibilidad.', about_title: 'Sobre', about_subtitle: 'Investigador y consultor con trayectoria en bioinformática, biología computacional y ciencia de datos aplicada a salud, biodiversidad y biotecnología.', about_exp_title: 'Experiencia', about_li1: 'Ciencia de datos ómicos y pipelines reproducibles', about_li2: 'Modelado predictivo y aprendizaje supervisado/no supervisado', about_li3: 'Desarrollo de aplicaciones con Python, R, PostgreSQL, Flask y Streamlit', help_title: '¿Cómo puedo ayudar a tu organización?', help_subtitle: 'Transformo datos complejos en decisiones claras, con entregables estructurados y comunicación objetiva.',  videos_title: 'Galería de videos · Databiomics', newsletter_title: 'Newsletter Databiomics',  programs_title: 'Programas destacados', programs_subtitle: 'Proyectos estructurados para acelerar resultados e innovación científica', visitor_unavailable: 'Total de visitas: no disponible en este momento.', top_countries_title: 'Principales países visitantes', support_projects_title: 'Apoya los proyectos de Databiomics', support_projects_summary: 'Consulta misión, valores, transparencia, proyectos en curso y un formulario para colaborar y apoyar a Databiomics.', support_projects_intro: 'Consulta la página dedicada y sigue las oportunidades para apoyar las iniciativas de Databiomics.', support_projects_btn: 'Abrir página de apoyo a proyectos', about_profile_p1: 'Investigador y Biólogo (MSc, PhD) - CRBIO2: 143240 con formación interdisciplinaria en Biotecnología, Biología Computacional y Ciencia de Datos. Trabajo en bioinformática y análisis de datos ómicos (genómica, transcriptómica, proteómica y metagenómica), con experiencia en anotación funcional, descubrimiento de enzimas, reconstrucción de vías metabólicas, genómica comparativa y filogenómica, minería de clústeres de genes biosintéticos (BGCs) y análisis de metabarcoding/ecología. Trabajo principalmente con Python y R, aplicando metodologías de ciencia de datos y aprendizaje automático, desde métodos clásicos (Random Forest, SVM y redes neuronales profundas) hasta LLMs (como GPT-J y BLOOM), incluyendo fine-tuning y RAG.', about_profile_p2: 'Desarrollo pipelines de extremo a extremo: desde la adquisición y curación de datos, pasando por el procesamiento y modelado, hasta la entrega de resultados en soluciones de Software as a Service (SaaS), incluyendo configuración de entornos, infraestructura y despliegue en producción. Estos pipelines integran machine learning clásico con modelos basados en transformers (por ejemplo, BERT y ESM2) y enfoques basados en embeddings (como word2vec) para predecir la especificidad de sustrato de enzimas. Me interesa integrar Bioinformática e IA para generar conocimiento aplicable con impacto en biotecnología, preservación ambiental y desarrollo sostenible.', about_linkedin_btn: 'LinkedIn', services_title: 'Servicios y Consultoría', services_subtitle: 'Proyectos a medida para instituciones de investigación, estudiantes, empresas y laboratorios.', services_card1_title: 'Bioinformática e IA para prospección in silico inteligente de microorganismos benéficos con potencial funcional aplicado', services_card1_text: 'Diseño, construcción e implementación de programas para priorizar enzimas inéditas para validación experimental. Dentro de este tema: ranking de candidatos con mayor probabilidad funcional; minería de genomas para encontrar enzimas con perfil industrial; análisis de miles de genomas para identificar candidatos para validación funcional con interés bioquímico e industrial. Ejemplo de investigación relacionada realizada en el posdoctorado:', services_card2_title: 'Análisis Ómicos Avanzados', services_card2_text: 'Integración de datos genómicos, transcriptómicos y de metabarcoding/metagenómicos con informes claros y accionables.', services_card3_title: 'IA y ML: Machine Learning y Redes Neuronales Profundas', services_card3_text: 'Modelos predictivos usando machine learning tradicional, redes neuronales y NLP aplicados a datos biomoleculares y clínicos.', services_card4_title: 'Análisis Genómicos Comparativos', services_card4_text: 'Automatización del acceso a bases de datos públicas y obtención de datos a gran escala (genomas, proteomas), comparación de genomas con pipelines personalizados y análisis filogenómicos con informes.', services_card5_title: 'Desarrollo de Soluciones', services_card5_text: 'Dashboards, APIs y aplicaciones científicas para automatizar flujos y acelerar decisiones.', services_card6_title: 'Mentoría Estratégica', services_card6_text: 'Planificación de investigación, revisión de pipelines y capacitación de equipos técnicos', cv_others_title: 'CV / Others', cv_others_intro: 'En esta sección encontrarás categorías relacionadas con mi CV profesional y trayectoria académica.', cv_others_articles_desc: 'Accede a publicaciones, proyectos y materiales técnicos relacionados con mi trabajo.', cv_others_articles_btn: 'Abrir Articles / Projects', cv_others_training_desc: 'Consulta cursos, certificaciones y contenidos de formación complementaria.', cv_others_training_btn: 'Abrir Additional Training'
    }
  };
  const translationBaseLang = 'pt';
  let googleTranslateReady = false;

  const setGoogleTranslateCookie = (lang) => {
    const targetLang = dictionaries[lang] ? lang : translationBaseLang;
    const value = `/pt/${targetLang}`;
    document.cookie = `googtrans=${value}; path=/`;
    document.cookie = `googtrans=${value}; domain=.${window.location.hostname}; path=/`;
  };

  const triggerGoogleCombo = (lang, attempt = 0) => {
    const combo = document.querySelector('.goog-te-combo');
    if (!combo) {
      if (attempt < 20) {
        setTimeout(() => triggerGoogleCombo(lang, attempt + 1), 150);
      }
      return;
    }

    combo.value = lang;
    combo.dispatchEvent(new Event('change'));
  };

  const applyGoogleTranslate = (lang) => {
    const targetLang = dictionaries[lang] ? lang : translationBaseLang;
    setGoogleTranslateCookie(targetLang);
    if (!googleTranslateReady) {
      setTimeout(() => applyGoogleTranslate(targetLang), 250);
      return;
    }
    triggerGoogleCombo(targetLang);
  };

  const initGoogleTranslator = () => {
    window.googleTranslateElementInit = () => {
      if (!window.google || !window.google.translate) return;
      new window.google.translate.TranslateElement(
        {
          pageLanguage: translationBaseLang,
          includedLanguages: Object.keys(dictionaries).join(','),
          autoDisplay: false,
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
        },
        'google_translate_element'
      );
      googleTranslateReady = true;
      const lang = localStorage.getItem('siteLang') || translationBaseLang;
      applyGoogleTranslate(lang);
    };

    if (window.google && window.google.translate) {
      window.googleTranslateElementInit();
      return;
    }

    if (document.querySelector('script[data-google-translate-script="true"]')) return;

    const script = document.createElement('script');
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    script.dataset.googleTranslateScript = 'true';
    document.head.appendChild(script);
  };

  window.setGoogleTranslateCookie = setGoogleTranslateCookie;
  window.applyGoogleTranslate = applyGoogleTranslate;



  const textNodeSelectorExclusions = [
    'script',
    'style',
    'noscript',
    'textarea',
    '#google_translate_element',
    '.global-language-switcher'
  ];

  const translationCachePrefix = 'site-auto-i18n';
  const myMemoryBlockedUntilKey = 'site-auto-i18n-mymemory-blocked-until';
  const autoTranslateInFlight = new Map();

  const shouldSkipTextNode = (node) => {
    if (!node || !node.parentElement) return true;
    if (!node.textContent || !node.textContent.trim()) return true;
    return textNodeSelectorExclusions.some((sel) => node.parentElement.closest(sel));
  };

  const getOriginalText = (node) => {
    if (node.__originalText !== undefined) return node.__originalText;
    node.__originalText = node.textContent;
    return node.__originalText;
  };

  const getOriginalAttribute = (el, attr) => {
    const key = `__originalAttr_${attr}`;
    if (el[key] !== undefined) return el[key];
    el[key] = el.getAttribute(attr) || '';
    return el[key];
  };


  const captureOriginalTranslatableState = () => {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const node = walker.currentNode;
      if (shouldSkipTextNode(node)) continue;
      if (node.parentElement && node.parentElement.closest('[data-i18n-key]')) continue;
      getOriginalText(node);
    }

    document.querySelectorAll('input[placeholder], textarea[placeholder], select option').forEach((el) => {
      if (textNodeSelectorExclusions.some((sel) => el.closest(sel))) return;
      if (el.matches('[data-i18n-placeholder-key]')) return;
      if (el.tagName.toLowerCase() === 'option') {
        if (el.__originalOptionText === undefined) el.__originalOptionText = el.textContent;
      } else {
        getOriginalAttribute(el, 'placeholder');
      }
    });
  };

  const readCachedTranslation = (lang, text) => {
    try {
      const key = `${translationCachePrefix}:${lang}:${text}`;
      const cached = localStorage.getItem(key);
      if (!cached) return null;
      if (hasMyMemoryWarning(cached)) {
        localStorage.removeItem(key);
        return null;
      }
      return cached;
    } catch (_) {
      return null;
    }
  };

  const writeCachedTranslation = (lang, text, value) => {
    try {
      localStorage.setItem(`${translationCachePrefix}:${lang}:${text}`, value);
    } catch (_) {
      // ignore storage failures
    }
  };


  const hasMyMemoryWarning = (value) => {
    if (typeof value !== 'string') return false;
    const upper = value.toUpperCase();
    return upper.includes('MYMEMORY WARNING') || upper.includes('USAGELIMITS.PHP');
  };


  const purgeWarningCacheEntries = () => {
    try {
      for (let i = localStorage.length - 1; i >= 0; i -= 1) {
        const key = localStorage.key(i);
        if (!key || !key.startsWith(`${translationCachePrefix}:`)) continue;
        const value = localStorage.getItem(key);
        if (hasMyMemoryWarning(value)) localStorage.removeItem(key);
      }
    } catch (_) {
      // ignore storage failures
    }
  };

  const getMyMemoryBlockedUntil = () => {
    try {
      return Number(localStorage.getItem(myMemoryBlockedUntilKey) || 0);
    } catch (_) {
      return 0;
    }
  };

  const isMyMemoryTemporarilyBlocked = () => Date.now() < getMyMemoryBlockedUntil();

  const blockMyMemoryForHours = (hours = 13) => {
    try {
      localStorage.setItem(myMemoryBlockedUntilKey, String(Date.now() + hours * 60 * 60 * 1000));
    } catch (_) {
      // ignore storage failures
    }
  };



  const sanitizeMyMemoryWarning = (translatedText) => {
    if (typeof translatedText !== 'string') return '';

    const warningPattern = /(?:\s*MYMEMORY WARNING:[\s\S]*$)|(?:\s*VISIT\s+HTTPS?:\/\/MYMEMORY\.TRANSLATED\.NET\/DOC\/USAGELIMITS\.PHP[\s\S]*$)/gi;
    const cleaned = translatedText.replace(warningPattern, '').trim();
    if (hasMyMemoryWarning(cleaned)) return '';
    return cleaned;
  };

  const scrubMyMemoryWarningsFromDom = () => {
    const warningPattern = /(?:\s*MYMEMORY WARNING:[\s\S]*$)|(?:\s*VISIT\s+HTTPS?:\/\/MYMEMORY\.TRANSLATED\.NET\/DOC\/USAGELIMITS\.PHP[\s\S]*$)/gi;
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const node = walker.currentNode;
      const current = node.textContent || '';
      if (!hasMyMemoryWarning(current)) continue;
      node.textContent = current.replace(warningPattern, '').trim();
    }
  };

  const fetchAutoTranslation = async (text, lang) => {
    if (!text.trim() || lang === translationBaseLang) return text;
    if (isMyMemoryTemporarilyBlocked()) return text;
    const cached = readCachedTranslation(lang, text);
    if (cached) return cached;

    const key = `${lang}::${text}`;
    if (autoTranslateInFlight.has(key)) return autoTranslateInFlight.get(key);

    const promise = fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=pt|${lang}`)
      .then((r) => r.json())
      .then((payload) => {
        const status = Number(payload?.responseStatus || 0);
        if (status >= 400) {
          if (hasMyMemoryWarning(JSON.stringify(payload || {}))) blockMyMemoryForHours();
          return text;
        }

        const translated = sanitizeMyMemoryWarning(payload?.responseData?.translatedText);
        if (hasMyMemoryWarning(translated)) {
          blockMyMemoryForHours();
          return text;
        }
        if (translated) {
          writeCachedTranslation(lang, text, translated);
          return translated;
        }
        return text;
      })
      .catch(() => text)
      .finally(() => autoTranslateInFlight.delete(key));

    autoTranslateInFlight.set(key, promise);
    return promise;
  };

  const applyInternalFullPageTranslation = async (lang) => {
    const textNodes = [];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const node = walker.currentNode;
      if (shouldSkipTextNode(node)) continue;
      if (node.parentElement && node.parentElement.closest('[data-i18n-key]')) continue;
      textNodes.push(node);
    }

    const placeholders = Array.from(document.querySelectorAll('input[placeholder], textarea[placeholder], select option'))
      .filter((el) => !textNodeSelectorExclusions.some((sel) => el.closest(sel)))
      .filter((el) => !el.matches('[data-i18n-placeholder-key]'));

    if (lang === translationBaseLang) {
      textNodes.forEach((node) => {
        node.textContent = getOriginalText(node);
      });
      placeholders.forEach((el) => {
        if (el.tagName.toLowerCase() === 'option') {
          if (el.__originalOptionText !== undefined) el.textContent = el.__originalOptionText;
          return;
        }
        el.setAttribute('placeholder', getOriginalAttribute(el, 'placeholder'));
      });
      return;
    }

    await Promise.all(
      textNodes.map(async (node) => {
        const original = getOriginalText(node);
        const translated = await fetchAutoTranslation(original, lang);
        node.textContent = translated;
      })
    );

    await Promise.all(
      placeholders.map(async (el) => {
        if (el.tagName.toLowerCase() === 'option') {
          const k = '__originalOptionText';
          if (el[k] === undefined) el[k] = el.textContent;
          el.textContent = await fetchAutoTranslation(el[k], lang);
          return;
        }
        const original = getOriginalAttribute(el, 'placeholder');
        const translated = await fetchAutoTranslation(original, lang);
        el.setAttribute('placeholder', translated);
      })
    );
  };

  const safeApplyExternalTranslator = (lang) => {
    try {
      if (typeof window.setGoogleTranslateCookie === 'function') {
        window.setGoogleTranslateCookie(lang);
      }
      if (typeof window.applyGoogleTranslate === 'function') {
        setTimeout(() => window.applyGoogleTranslate(lang), 50);
      }
    } catch (_) {
      // ignore third-party translate failures to keep local i18n working
    }
  };

  const applyLanguage = async (lang) => {
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
    await applyInternalFullPageTranslation(lang);
    scrubMyMemoryWarningsFromDom();
    document.dispatchEvent(new CustomEvent('site-language-changed', { detail: { lang, dict } }));
  };

  purgeWarningCacheEntries();
  captureOriginalTranslatableState();
  const current = localStorage.getItem('siteLang') || 'pt';
  initGoogleTranslator();
  document.querySelectorAll('.global-lang-btn').forEach((btn) => {
    btn.addEventListener('click', () => { void applyLanguage(btn.dataset.globalLang); });
  });
  void applyLanguage(current);

  const countEl = document.getElementById('visitor-count');
  if (countEl) {
    const ns = 'databiomicsai-github-io';
    const key = 'site-visits';
    fetch(`https://api.countapi.xyz/get/${ns}/${key}`)
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
