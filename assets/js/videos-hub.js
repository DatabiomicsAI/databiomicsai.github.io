(() => {
  const filterButtons = document.querySelectorAll('.video-filters [data-filter]');
  const videoCards = document.querySelectorAll('.video-card[data-category]');
  const reactionWrappers = document.querySelectorAll('.video-reactions');
  const form = document.getElementById('video-suggestion-form');
  const feedback = document.getElementById('video-form-feedback');
  const submitButton = document.getElementById('video-form-submit');

  const REACTION_COUNTS_KEY = 'databiomics_video_reaction_counts_v1';
  const REACTION_VOTES_KEY = 'databiomics_video_reaction_votes_v1';

  const load = (key, fallback) => {
    try {
      return JSON.parse(localStorage.getItem(key)) ?? fallback;
    } catch (_) {
      return fallback;
    }
  };

  const save = (key, value) => localStorage.setItem(key, JSON.stringify(value));

  const setFilter = (filter) => {
    filterButtons.forEach((button) => button.classList.toggle('is-active', button.dataset.filter === filter));

    videoCards.forEach((card) => {
      if (filter === 'Todos') {
        card.hidden = false;
        return;
      }
      const categories = (card.dataset.category || '').split(/\s+/);
      card.hidden = !categories.includes(filter);
    });
  };

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => setFilter(button.dataset.filter));
  });

  const renderReactions = () => {
    const counts = load(REACTION_COUNTS_KEY, {});
    const votes = load(REACTION_VOTES_KEY, {});

    reactionWrappers.forEach((wrapper) => {
      const videoId = wrapper.dataset.videoId;
      const videoCounts = counts[videoId] || {};
      const videoVotes = votes[videoId] || {};

      wrapper.querySelectorAll('button[data-emoji]').forEach((button) => {
        const emoji = button.dataset.emoji;
        const count = videoCounts[emoji] || 0;
        const span = button.querySelector('span');
        if (span) span.textContent = String(count);

        if (videoVotes[emoji]) {
          button.disabled = true;
          button.classList.add('is-locked');
        } else {
          button.disabled = false;
          button.classList.remove('is-locked');
        }
      });
    });
  };

  reactionWrappers.forEach((wrapper) => {
    wrapper.addEventListener('click', (event) => {
      const button = event.target.closest('button[data-emoji]');
      if (!button) return;

      const videoId = wrapper.dataset.videoId;
      const emoji = button.dataset.emoji;

      const counts = load(REACTION_COUNTS_KEY, {});
      const votes = load(REACTION_VOTES_KEY, {});

      counts[videoId] = counts[videoId] || {};
      votes[videoId] = votes[videoId] || {};

      if (votes[videoId][emoji]) {
        button.classList.add('shake');
        setTimeout(() => button.classList.remove('shake'), 260);
        return;
      }

      votes[videoId][emoji] = true;
      counts[videoId][emoji] = (counts[videoId][emoji] || 0) + 1;

      save(REACTION_COUNTS_KEY, counts);
      save(REACTION_VOTES_KEY, votes);
      renderReactions();
    });
  });

  if (form) {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const data = new FormData(form);
      submitButton.disabled = true;
      submitButton.textContent = 'Enviando...';
      feedback.textContent = 'Enviando sua sugestão, aguarde.';

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: data,
          headers: { Accept: 'application/json' }
        });

        if (!response.ok) throw new Error('Falha ao enviar.');

        feedback.textContent = 'Sugestão enviada com sucesso. Obrigado por contribuir com a Databiomics®.';
        form.reset();
      } catch (_) {
        feedback.textContent = 'Não foi possível enviar agora. Tente novamente em instantes.';
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Enviar sugestão';
      }
    });
  }

  setFilter('Todos');
  renderReactions();
})();
