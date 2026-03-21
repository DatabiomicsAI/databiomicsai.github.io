(() => {
  const root = document.querySelector('[data-community-form]');
  if (!root) return;

  const STORAGE_KEY = 'databiomicsCommunityEntries';
  const MAX_VISIBLE = 6;
  const form = root;
  const messageInput = form.querySelector('#message');
  const feedback = form.querySelector('[data-form-feedback]');
  const countNode = form.querySelector('[data-message-count]');
  const avatarPreview = form.querySelector('[data-preview-avatar]');
  const namePreview = form.querySelector('[data-preview-name]');
  const metaPreview = form.querySelector('[data-preview-meta]');
  const messagePreview = form.querySelector('[data-preview-message]');

  const gallery = document.querySelector('[data-community-gallery]');
  const emptyState = document.querySelector('[data-community-empty]');
  const showMoreBtn = document.querySelector('[data-gallery-more]');
  const searchInput = document.querySelector('[data-gallery-search]');
  const countryFilter = document.querySelector('[data-gallery-country]');
  const occupationFilter = document.querySelector('[data-gallery-occupation]');
  const analyticsCountries = document.querySelector('[data-analytics-countries]');
  const analyticsTime = document.querySelector('[data-analytics-time]');
  const analyticsSample = document.querySelector('[data-analytics-sample]');

  let visibleCount = MAX_VISIBLE;

  const safeEntries = () => {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      return Array.isArray(parsed) ? parsed : [];
    } catch (_) {
      return [];
    }
  };

  const saveEntries = (entries) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries.slice(0, 100)));
  };

  const readForm = () => ({
    publicName: form.publicName.value.trim(),
    displayName: form.displayName.value.trim(),
    photoUrl: form.photoUrl.value.trim(),
    country: form.country.value.trim() || 'Brasil',
    occupation: form.occupation.value.trim(),
    socialLink: form.socialLink.value.trim(),
    message: form.message.value.trim(),
    createdAt: new Date().toISOString()
  });

  const updatePreview = () => {
    const data = readForm();
    if (countNode) countNode.textContent = String(data.message.length);
    namePreview.textContent = data.displayName || 'Nome para exibição';
    metaPreview.textContent = `${data.country || 'Brasil'} • ${data.occupation || 'Pesquisador(a)'}`;
    messagePreview.textContent = data.message || 'Mensagem para aparecer na galeria.';
    avatarPreview.src = data.photoUrl || '/assets/databiomics-logo.svg';
  };

  const uniqueOptions = (entries, key) => [...new Set(entries.map((entry) => entry[key]).filter(Boolean))].sort();

  const hydrateFilters = (entries) => {
    const currentCountry = countryFilter.value;
    const currentOccupation = occupationFilter.value;
    const countries = uniqueOptions(entries, 'country');
    const occupations = uniqueOptions(entries, 'occupation');

    countryFilter.innerHTML = `<option value="all">${countryFilter.options[0]?.textContent || 'Todos os países'}</option>`;
    occupationFilter.innerHTML = `<option value="all">${occupationFilter.options[0]?.textContent || 'Todas as áreas'}</option>`;

    countries.forEach((country) => {
      const option = document.createElement('option');
      option.value = country;
      option.textContent = country;
      countryFilter.appendChild(option);
    });

    occupations.forEach((occupation) => {
      const option = document.createElement('option');
      option.value = occupation;
      option.textContent = occupation;
      occupationFilter.appendChild(option);
    });

    countryFilter.value = countries.includes(currentCountry) ? currentCountry : 'all';
    occupationFilter.value = occupations.includes(currentOccupation) ? currentOccupation : 'all';
  };

  const cardTemplate = (entry) => {
    const social = entry.socialLink
      ? `<a href="${entry.socialLink}" target="_blank" rel="noreferrer noopener">${entry.socialLink}</a>`
      : '<span>—</span>';

    return `
      <article class="community-entry-card reveal-on-scroll is-visible">
        <img src="${entry.photoUrl || '/assets/databiomics-logo.svg'}" alt="Foto de ${entry.displayName || entry.publicName}">
        <h3>${entry.displayName || entry.publicName}</h3>
        <p class="meta">${entry.country} • ${entry.occupation}</p>
        <p class="message">${entry.message || 'Sem mensagem pública.'}</p>
        <p class="social">${social}</p>
      </article>
    `;
  };

  const filteredEntries = (entries) => {
    const search = (searchInput.value || '').toLowerCase().trim();
    const country = countryFilter.value;
    const occupation = occupationFilter.value;

    return entries.filter((entry) => {
      const searchable = `${entry.displayName} ${entry.publicName} ${entry.country} ${entry.occupation}`.toLowerCase();
      const matchSearch = !search || searchable.includes(search);
      const matchCountry = country === 'all' || entry.country === country;
      const matchOccupation = occupation === 'all' || entry.occupation === occupation;
      return matchSearch && matchCountry && matchOccupation;
    });
  };

  const updateAnalytics = (entries) => {
    const countries = uniqueOptions(entries, 'country');
    analyticsCountries.textContent = String(countries.length || 1);
    analyticsSample.textContent = countries.length ? `🌍 ${countries.slice(0, 3).join(' • ')}` : '🇧🇷 Brazil';
  };

  const renderGallery = () => {
    const entries = safeEntries();
    hydrateFilters(entries);
    updateAnalytics(entries);
    const list = filteredEntries(entries);
    const visible = list.slice(0, visibleCount);

    gallery.innerHTML = visible.map(cardTemplate).join('');
    emptyState.hidden = visible.length > 0;
    showMoreBtn.hidden = visible.length >= list.length;
  };

  const setFeedback = (text, success = false) => {
    feedback.textContent = text;
    feedback.classList.toggle('is-success', success);
  };

  form.addEventListener('input', updatePreview);
  [searchInput, countryFilter, occupationFilter].forEach((el) => {
    el.addEventListener('input', () => {
      visibleCount = MAX_VISIBLE;
      renderGallery();
    });
  });

  showMoreBtn.addEventListener('click', () => {
    visibleCount += MAX_VISIBLE;
    renderGallery();
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) {
      setFeedback('Revise os campos obrigatórios e tente novamente.');
      return;
    }

    const data = readForm();
    const entries = safeEntries();
    entries.unshift(data);
    saveEntries(entries);

    form.reset();
    form.country.value = 'Brasil';
    visibleCount = MAX_VISIBLE;
    updatePreview();
    renderGallery();
    setFeedback('Mensagem enviada com sucesso para a galeria da comunidade!', true);
  });

  document.querySelectorAll('[data-scroll-target]').forEach((btn) => {
    btn.addEventListener('click', (event) => {
      event.preventDefault();
      const id = btn.getAttribute('data-scroll-target');
      const target = document.getElementById(id);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal-on-scroll').forEach((element) => {
    revealObserver.observe(element);
  });

  const tick = () => {
    analyticsTime.textContent = new Intl.DateTimeFormat('pt-BR', {
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    }).format(new Date());
  };

  tick();
  setInterval(tick, 1000);
  updatePreview();
  renderGallery();
})();

(() => {
  const form = document.querySelector('[data-community-contact-form]');
  if (!form) return;

  const feedback = form.querySelector('[data-community-contact-feedback]');
  const CONTACT_EMAIL = 'info@databiomics.com';

  const setFeedback = (message, success = false) => {
    if (!feedback) return;
    feedback.textContent = message;
    feedback.classList.toggle('is-success', success);
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) {
      setFeedback('Revise os campos obrigatórios e tente novamente.');
      return;
    }

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const subject = form.subject.value.trim();
    const message = form.message.value.trim();

    const mailtoSubject = encodeURIComponent(`[Comunidade Databiomics] ${subject}`);
    const mailtoBody = encodeURIComponent(
      `Nome: ${name}\nE-mail: ${email}\n\nMensagem:\n${message}`
    );

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${mailtoSubject}&body=${mailtoBody}`;
    setFeedback('Seu aplicativo de e-mail foi aberto para enviar a mensagem.', true);
    form.reset();
  });
})();
