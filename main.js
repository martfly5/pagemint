/* ============================================================
   PageMint — nav + homepage rendering
   ============================================================ */

function initNav() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");
  if (!toggle || !nav) return;
  toggle.addEventListener("click", () => {
    nav.classList.toggle("is-open");
  });
}

function renderCategoryGrid() {
  const grid = document.getElementById("categoryGrid");
  if (!grid) return;
  grid.innerHTML = CATEGORIES.map(
    (c) => `
    <a class="cat-card" data-cat="${c.slug}" href="store.html?cat=${c.slug}">
      <h3>${c.name}</h3>
      <p>${c.tagline}</p>
    </a>
  `
  ).join("");
}

function renderFeaturedBooks() {
  const rail = document.getElementById("featuredRail");
  if (!rail) return;
  const featured = BOOKS.filter((b) => b.isBestseller).slice(0, 8);
  rail.innerHTML = featured.map(bookCardHTML).join("");
}

function renderNewBooks() {
  const rail = document.getElementById("newRail");
  if (!rail) return;
  const fresh = BOOKS.filter((b) => b.isNew).slice(0, 8);
  rail.innerHTML = fresh.map(bookCardHTML).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  renderCategoryGrid();
  renderFeaturedBooks();
  renderNewBooks();
  if (typeof initBookModal === "function") initBookModal();
});
