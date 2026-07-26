(() => {
  const container = document.getElementById('article-cards');
  const search = document.getElementById('catalog-search');
  const typeFilter = document.getElementById('catalog-type');
  const count = document.getElementById('resource-count');
  let articles = [];

  const text = (value) => String(value ?? '');
  const link = (label, href, variant = '') => {
    if (!href) return null;
    const anchor = document.createElement('a');
    anchor.className = `catalog-button ${variant}`.trim();
    anchor.href = href;
    anchor.textContent = label;
    if (/^https?:\/\//.test(href)) {
      anchor.target = '_blank';
      anchor.rel = 'noopener noreferrer';
    }
    return anchor;
  };

  const card = (article) => {
    const node = document.createElement('article');
    node.className = `article-card${article.featured ? ' featured' : ''}`;
    const topline = document.createElement('div');
    topline.className = 'card-topline';
    const resourceType = document.createElement('span');
    resourceType.className = 'resource-type';
    resourceType.textContent = article.resource_type || 'Research resource';
    const status = document.createElement('span');
    status.className = 'resource-status';
    status.textContent = article.status || 'Public resource';
    topline.append(resourceType, status);

    const title = document.createElement('h2');
    title.textContent = article.title;
    const summary = document.createElement('p');
    summary.textContent = article.summary || '';
    const authors = document.createElement('p');
    authors.className = 'authors';
    authors.innerHTML = '<strong>Authors:</strong> ';
    authors.append(document.createTextNode(article.authors || 'Not specified'));

    const tags = document.createElement('div');
    tags.className = 'tags';
    (article.tags || []).forEach((tag) => {
      const item = document.createElement('span');
      item.className = 'tag';
      item.textContent = tag;
      tags.append(item);
    });

    const details = document.createElement('dl');
    details.className = 'card-details';
    [
      ['Release', article.release],
      ['Journal target', article.journal_target],
      ['Updated', article.updated_at],
    ].filter(([, value]) => value).forEach(([label, value]) => {
      const term = document.createElement('dt');
      term.textContent = label;
      const definition = document.createElement('dd');
      definition.textContent = value;
      details.append(term, definition);
    });

    const actions = document.createElement('div');
    actions.className = 'actions';
    [
      link('Open resource', article.project_url),
      link('Figures', article.figures_url, 'secondary'),
      link('Data', article.tables_url, 'ghost'),
      link('Article', article.article_pdf, 'ghost'),
      link('Repository', article.repository_url, 'ghost'),
    ].filter(Boolean).forEach((item) => actions.append(item));

    node.append(topline, title, summary, authors, tags, details, actions);
    return node;
  };

  const render = () => {
    const query = search.value.trim().toLowerCase();
    const selectedType = typeFilter.value;
    const filtered = articles.filter((article) => {
      const corpus = JSON.stringify(article).toLowerCase();
      const type = article.resource_type || 'Research resource';
      return (!query || corpus.includes(query))
        && (!selectedType || type === selectedType);
    });
    container.replaceChildren(...filtered.map(card));
    if (!filtered.length) {
      const empty = document.createElement('p');
      empty.className = 'empty-state';
      empty.textContent = 'No research resource matches the selected filters.';
      container.append(empty);
    }
    count.textContent = `${filtered.length} of ${articles.length} resources`;
  };

  fetch('articles.json', {cache: 'no-store'})
    .then((response) => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    })
    .then((payload) => {
      if (!Array.isArray(payload)) throw new Error('articles.json is not an array');
      articles = payload.slice().sort((first, second) => {
        const featured = Number(Boolean(second.featured)) - Number(Boolean(first.featured));
        return featured || text(second.updated_at).localeCompare(text(first.updated_at));
      });
      [...new Set(articles.map((item) => item.resource_type || 'Research resource'))]
        .sort()
        .forEach((resourceType) => {
          const option = document.createElement('option');
          option.value = resourceType;
          option.textContent = resourceType;
          typeFilter.append(option);
        });
      search.addEventListener('input', render);
      typeFilter.addEventListener('change', render);
      render();
    })
    .catch((error) => {
      count.textContent = 'Catalog unavailable';
      const message = document.createElement('p');
      message.className = 'empty-state';
      message.textContent = `Article catalog unavailable: ${error.message}`;
      container.replaceChildren(message);
    });
})();
