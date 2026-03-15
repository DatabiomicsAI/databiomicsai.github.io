(() => {
  const CATEGORIES = [
    {
      id: 'apostilas',
      nome: 'Apostilas',
      descricao: 'Materiais digitais de apoio e estudo em bioinformática, biotecnologia, ciência de dados e inteligência artificial.'
    },
    {
      id: 'livros',
      nome: 'Livros',
      descricao: 'Obras, materiais editoriais e publicações que poderão ser disponibilizados futuramente.'
    },
    {
      id: 'camisas',
      nome: 'Camisas',
      descricao: 'Produtos institucionais e temáticos da Databiomics.'
    },
    {
      id: 'bones',
      nome: 'Bonés',
      descricao: 'Acessórios e itens visuais da marca Databiomics.'
    },
    {
      id: 'aulas',
      nome: 'Aulas',
      descricao: 'Aulas, mentorias e encontros sob solicitação, voltados a temas científicos e tecnológicos.'
    }
  ];

  const CART_KEY = 'databiomicsCatalogCart';
  const form = document.getElementById('catalog-order-form');
  if (!form) return;

  const catalogItems = Array.isArray(window.DATABIOMICS_CATALOG_ITEMS) ? window.DATABIOMICS_CATALOG_ITEMS : [];
  let cart = loadCart();

  const categoryContainer = document.getElementById('catalog-categories');
  const cartDrawer = document.getElementById('cart-drawer');
  const cartCount = document.getElementById('cart-count');
  const cartSummary = document.getElementById('cart-summary');
  const cartSubtotal = document.getElementById('cart-subtotal');
  const cartTotal = document.getElementById('cart-total');
  const emptyState = document.getElementById('cart-empty-state');
  const orderSummaryInput = document.getElementById('order-summary-input');
  const orderSummaryPreview = document.getElementById('order-summary-preview');
  const needsAddressSection = document.getElementById('address-fields');
  const serviceSection = document.getElementById('service-fields');
  const feedback = document.getElementById('form-feedback');

  const currency = (value) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(value || 0));

  function loadCart() {
    try {
      const raw = localStorage.getItem(CART_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (_) {
      return [];
    }
  }

  function saveCart() {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }

  function findItemById(id) {
    return catalogItems.find((item) => item.id === id && item.ativo === true);
  }

  function addToCart(id) {
    const item = findItemById(id);
    if (!item) return;
    const existing = cart.find((entry) => entry.id === id);
    if (existing) {
      existing.quantidade += 1;
    } else {
      cart.push({ id: item.id, quantidade: 1 });
    }
    saveCart();
    renderCart();
  }

  function removeFromCart(id) {
    cart = cart.filter((entry) => entry.id !== id);
    saveCart();
    renderCart();
  }

  function updateQuantity(id, value) {
    const qty = Math.max(1, Number(value || 1));
    cart = cart.map((entry) => (entry.id === id ? { ...entry, quantidade: qty } : entry));
    saveCart();
    renderCart();
  }

  function clearCart() {
    cart = [];
    saveCart();
    renderCart();
  }

  function buildUnavailableCard(categoryName) {
    return `
      <article class="catalog-card unavailable">
        <div class="catalog-card-content">
          <h4>${categoryName} — Em breve</h4>
          <p>Disponível futuramente.</p>
          <button type="button" class="button ghost disabled" disabled>Em breve</button>
        </div>
      </article>
    `;
  }

  function renderCategories() {
    categoryContainer.innerHTML = CATEGORIES.map((category) => {
      const activeItems = catalogItems.filter((item) => item.categoria === category.id && item.ativo === true);
      const cardsMarkup = activeItems.length
        ? activeItems.map((item) => `
          <article class="catalog-card ${item.destaque ? 'highlight' : ''}">
            ${item.imagem ? `<img src="${item.imagem}" alt="${item.nome}" loading="lazy">` : ''}
            <div class="catalog-card-content">
              <h4>${item.nome}</h4>
              <p>${item.descricao}</p>
              <div class="catalog-card-meta">
                <span class="catalog-type">${item.tipo}</span>
                <strong>${currency(item.preco)}</strong>
              </div>
              <button type="button" class="button primary add-to-cart" data-item-id="${item.id}">Adicionar ao pedido</button>
            </div>
          </article>
        `).join('')
        : buildUnavailableCard(category.nome);

      return `
        <section class="catalog-category" id="categoria-${category.id}" aria-labelledby="title-${category.id}">
          <header class="category-header">
            <h3 id="title-${category.id}">${category.nome}</h3>
            <p>${category.descricao}</p>
          </header>
          <div class="catalog-grid">${cardsMarkup}</div>
        </section>
      `;
    }).join('');

    categoryContainer.querySelectorAll('.add-to-cart').forEach((button) => {
      button.addEventListener('click', () => addToCart(button.dataset.itemId));
    });
  }

  function renderCart() {
    const enriched = cart.map((entry) => {
      const item = findItemById(entry.id);
      return item ? { ...entry, item } : null;
    }).filter(Boolean);

    const count = enriched.reduce((acc, entry) => acc + entry.quantidade, 0);
    cartCount.textContent = String(count);

    if (!enriched.length) {
      emptyState.hidden = false;
      cartSummary.innerHTML = '';
      cartSubtotal.textContent = currency(0);
      cartTotal.textContent = currency(0);
      orderSummaryPreview.textContent = 'Seu pedido ainda está vazio.';
      orderSummaryInput.value = '';
      toggleConditionalFields([]);
      return;
    }

    emptyState.hidden = true;

    const subtotal = enriched.reduce((acc, entry) => acc + (Number(entry.item.preco) * entry.quantidade), 0);
    cartSummary.innerHTML = enriched.map((entry) => `
      <li>
        <div>
          <strong>${entry.item.nome}</strong>
          <span>${currency(entry.item.preco)} cada</span>
        </div>
        <div class="cart-line-actions">
          <label>
            <span class="sr-only">Quantidade</span>
            <input type="number" min="1" value="${entry.quantidade}" data-qty-id="${entry.item.id}">
          </label>
          <button type="button" class="remove-item" data-remove-id="${entry.item.id}">Remover</button>
        </div>
      </li>
    `).join('');

    cartSubtotal.textContent = currency(subtotal);
    cartTotal.textContent = currency(subtotal);

    const summaryText = enriched.map((entry) => `- ${entry.item.nome} | quantidade: ${entry.quantidade} | valor unitário: ${currency(entry.item.preco)} | subtotal: ${currency(entry.item.preco * entry.quantidade)}`).join('\n');
    orderSummaryPreview.textContent = summaryText;
    orderSummaryInput.value = summaryText;

    cartSummary.querySelectorAll('input[data-qty-id]').forEach((input) => {
      input.addEventListener('change', () => updateQuantity(input.dataset.qtyId, input.value));
    });

    cartSummary.querySelectorAll('button[data-remove-id]').forEach((button) => {
      button.addEventListener('click', () => removeFromCart(button.dataset.removeId));
    });

    toggleConditionalFields(enriched.map((entry) => entry.item));
  }

  function toggleConditionalFields(items) {
    const hasPhysical = items.some((item) => item.tipo === 'fisico' || item.precisa_endereco === true);
    const hasService = items.some((item) => item.tipo === 'servico');

    needsAddressSection.hidden = !hasPhysical;
    serviceSection.hidden = !hasService;

    needsAddressSection.querySelectorAll('input').forEach((input) => {
      input.required = hasPhysical && ['cep', 'endereco', 'numero', 'bairro', 'cidade', 'estado'].includes(input.name);
    });

    const availability = document.getElementById('availability');
    availability.required = hasService;
  }

  function validateForm() {
    if (!cart.length) {
      showFeedback('Seu pedido ainda está vazio.', 'error');
      return false;
    }

    if (!form.checkValidity()) {
      showFeedback('Revise os campos obrigatórios antes de enviar.', 'error');
      form.reportValidity();
      return false;
    }

    const consent = document.getElementById('privacy-consent');
    if (!consent.checked) {
      showFeedback('É necessário consentir com o tratamento de dados para enviar o pedido.', 'error');
      return false;
    }

    return true;
  }

  function showFeedback(message, type) {
    feedback.textContent = message;
    feedback.className = `form-feedback ${type}`;
  }

  document.getElementById('open-cart').addEventListener('click', () => {
    cartDrawer.classList.add('is-open');
    cartDrawer.setAttribute('aria-hidden', 'false');
  });

  document.getElementById('close-cart').addEventListener('click', () => {
    cartDrawer.classList.remove('is-open');
    cartDrawer.setAttribute('aria-hidden', 'true');
  });

  document.getElementById('clear-cart').addEventListener('click', clearCart);

  form.addEventListener('submit', (event) => {
    if (!validateForm()) {
      event.preventDefault();
      return;
    }

    showFeedback('Pedido recebido com sucesso. Em breve você receberá as instruções para continuidade do atendimento.', 'success');
  });

  renderCategories();
  renderCart();
})();
