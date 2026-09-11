/* ============================================================
   PageMint — store page logic
   Search + category filter + price filter + sort, all client
   side over the BOOKS array from data.js. Search works with or
   without the filters applied (they combine).
   ============================================================ */

const state = {
  query: "",
  categories: new Set(),
  minPrice: null,
  maxPrice: null,
  sort: "newest",
};

function readCategoryFromURL() {
  const params = new URLSearchParams(window.location.search);
  const cat = params.get("cat");
  if (cat && CATEGORIES.some((c) => c.slug === cat)) {
    state.categories.add(cat);
  }
  const q = params.get("q");
  if (q) state.query = q;
}

function renderFilterPanel() {
  const wrap = document.getElementById("categoryFilters");
  if (!wrap) return;
  wrap.innerHTML = CATEGORIES.map(
    (c) => `
    <label class="filter-check">
      <input type="checkbox" value="${c.slug}" ${state.categories.has(c.slug) ? "checked" : ""} />
      <span class="swatch" style="background:${c.color}"></span>
      ${c.name}
    </label>
  `
  ).join("");
}

function applyFiltersAndRender() {
  let results = BOOKS.slice();

  if (state.query.trim()) {
    const q = state.query.trim().toLowerCase();
    results = results.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.blurb.toLowerCase().includes(q) ||
        getCategory(b.category).name.toLowerCase().includes(q)
    );
  }

  if (state.categories.size > 0) {
    results = results.filter((b) => state.categories.has(b.category));
  }

  if (state.minPrice !== null && !Number.isNaN(state.minPrice)) {
    results = results.filter((b) => b.price >= state.minPrice);
  }
  if (state.maxPrice !== null && !Number.isNaN(state.maxPrice)) {
    results = results.filter((b) => b.price <= state.maxPrice);
  }

  switch (state.sort) {
    case "price-asc":
      results.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      results.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      results.sort((a, b) => b.rating - a.rating);
      break;
    case "newest":
    default:
      results.sort((a, b) => (b.isNew === a.isNew ? 0 : b.isNew ? 1 : -1));
      break;
  }

  renderResults(results);
  renderChips();
}

function renderResults(results) {
  const grid = document.getElementById("bookGrid");
  const count = document.getElementById("resultCount");
  if (count) {
    count.textContent = `${results.length} ebook${results.length === 1 ? "" : "s"} found`;
  }
  if (!grid) return;

  if (results.length === 0) {
    grid.innerHTML = "";
    document.getElementById("emptyState").style.display = "block";
    return;
  }
  document.getElementById("emptyState").style.display = "none";
  grid.innerHTML = results.map(bookCardHTML).join("");
}

function renderChips() {
  const chipWrap = document.getElementById("activeChips");
  if (!chipWrap) return;
  const chips = [];

  state.categories.forEach((slug) => {
    const cat = getCategory(slug);
    chips.push(`<span class="chip" data-chip-cat="${slug}">${cat.name} <button aria-label="Remove filter">✕</button></span>`);
  });

  if (state.query.trim()) {
    chips.push(`<span class="chip" data-chip-query="1">"${state.query}" <button aria-label="Clear search">✕</button></span>`);
  }
  if (state.minPrice !== null || state.maxPrice !== null) {
    const label = `${state.minPrice ?? 0} – ${state.maxPrice ?? "∞"}`;
    chips.push(`<span class="chip" data-chip-price="1">₹${label} <button aria-label="Clear price filter">✕</button></span>`);
  }

  chipWrap.innerHTML = chips.join("");
}

function initStorePage() {
  readCategoryFromURL();
  renderFilterPanel();

  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.value = state.query;
    searchInput.addEventListener("input", (e) => {
      state.query = e.target.value;
      applyFiltersAndRender();
    });
  }

  const searchForm = document.getElementById("searchForm");
  if (searchForm) {
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      applyFiltersAndRender();
    });
  }

  document.getElementById("categoryFilters")?.addEventListener("change", (e) => {
    if (e.target.matches('input[type="checkbox"]')) {
      const val = e.target.value;
      if (e.target.checked) state.categories.add(val);
      else state.categories.delete(val);
      applyFiltersAndRender();
    }
  });

  const minInput = document.getElementById("priceMin");
  const maxInput = document.getElementById("priceMax");
  const applyPrice = () => {
    state.minPrice = minInput.value ? Number(minInput.value) : null;
    state.maxPrice = maxInput.value ? Number(maxInput.value) : null;
    applyFiltersAndRender();
  };
  minInput?.addEventListener("change", applyPrice);
  maxInput?.addEventListener("change", applyPrice);

  document.getElementById("sortSelect")?.addEventListener("change", (e) => {
    state.sort = e.target.value;
    applyFiltersAndRender();
  });

  document.getElementById("clearFilters")?.addEventListener("click", () => {
    state.query = "";
    state.categories.clear();
    state.minPrice = null;
    state.maxPrice = null;
    state.sort = "newest";
    if (searchInput) searchInput.value = "";
    if (minInput) minInput.value = "";
    if (maxInput) maxInput.value = "";
    document.getElementById("sortSelect").value = "newest";
    renderFilterPanel();
    applyFiltersAndRender();
  });

  document.getElementById("activeChips")?.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;
    const chip = btn.closest(".chip");
    if (chip.dataset.chipCat) {
      state.categories.delete(chip.dataset.chipCat);
      renderFilterPanel();
    } else if (chip.dataset.chipQuery) {
      state.query = "";
      if (searchInput) searchInput.value = "";
    } else if (chip.dataset.chipPrice) {
      state.minPrice = null;
      state.maxPrice = null;
      if (minInput) minInput.value = "";
      if (maxInput) maxInput.value = "";
    }
    applyFiltersAndRender();
  });

  document.getElementById("mobileFilterToggle")?.addEventListener("click", () => {
    document.querySelector(".filters").classList.toggle("is-open");
  });

  applyFiltersAndRender();
}

document.addEventListener("DOMContentLoaded", () => {
  initStorePage();
  if (typeof initBookModal === "function") initBookModal();
});
