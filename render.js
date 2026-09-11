/* ============================================================
   PageMint — shared rendering helpers
   Used by index.html, store.html and the cart drawer.
   ============================================================ */

function formatRupees(n) {
  return "₹" + Number(n).toLocaleString("en-IN");
}

function bookCoverHTML(book, opts) {
  opts = opts || {};
  const cat = getCategory(book.category);
  const badge = book.isNew
    ? '<span class="book-cover__badge">New</span>'
    : book.isBestseller
    ? '<span class="book-cover__badge">Bestseller</span>'
    : "<span></span>";
  return `
    <div class="book-cover" data-cat="${book.category}">
      <div style="display:flex;justify-content:space-between;width:100%;">
        <span class="book-cover__tag">${cat.name}</span>
        ${badge}
      </div>
      <div>
        <div class="book-cover__title">${book.title}</div>
        <div class="book-cover__author">${book.author}</div>
      </div>
    </div>
  `;
}

function bookCardHTML(book) {
  return `
    <article class="book-card" data-id="${book.id}">
      <a href="#" class="book-cover-link" data-open-book="${book.id}" style="text-decoration:none;">
        ${bookCoverHTML(book)}
      </a>
      <div class="book-info">
        <h4><a href="#" data-open-book="${book.id}" style="text-decoration:none;color:inherit;">${book.title}</a></h4>
        <p class="author">${book.author}</p>
        <p class="rating">★ ${book.rating.toFixed(1)}</p>
        <div class="price-row">
          <span>
            <span class="price-now">${formatRupees(book.price)}</span>
            <span class="price-mrp">${formatRupees(book.mrp)}</span>
          </span>
          <button class="btn btn-primary btn-sm" data-add-to-cart="${book.id}">Add to cart</button>
        </div>
      </div>
    </article>
  `;
}

/* ---------------- book detail modal ---------------- */
function initBookModal() {
  const overlay = document.getElementById("bookModal");
  if (!overlay) return;

  document.addEventListener("click", (e) => {
    const opener = e.target.closest("[data-open-book]");
    if (opener) {
      e.preventDefault();
      openBookModal(opener.getAttribute("data-open-book"));
    }
    if (e.target.closest("[data-close-modal]") || e.target === overlay) {
      closeBookModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeBookModal();
  });
}

function openBookModal(id) {
  const book = BOOKS.find((b) => b.id === id);
  if (!book) return;
  const overlay = document.getElementById("bookModal");
  const cat = getCategory(book.category);
  overlay.querySelector(".modal").innerHTML = `
    <button class="modal-close" data-close-modal aria-label="Close">✕</button>
    ${bookCoverHTML(book)}
    <div class="modal-body">
      <span class="cat-label">${cat.name} · ${cat.tagline}</span>
      <h2>${book.title}</h2>
      <p class="author">by ${book.author}</p>
      <div class="modal-meta">
        <span>${book.pages} pages</span>
        <span>${book.format}</span>
        <span>★ ${book.rating.toFixed(1)}</span>
      </div>
      <p>${book.blurb}</p>
      <div class="modal-price">
        <span class="price-now">${formatRupees(book.price)}</span>
        <span class="price-mrp">${formatRupees(book.mrp)}</span>
      </div>
      <div class="modal-actions">
        <button class="btn btn-primary" data-add-to-cart="${book.id}">Add to cart</button>
        <button class="btn btn-outline" data-buy-now="${book.id}">Buy now</button>
      </div>
    </div>
  `;
  overlay.classList.add("is-open");
  document.body.style.overflow = "hidden";
}

function closeBookModal() {
  const overlay = document.getElementById("bookModal");
  if (!overlay) return;
  overlay.classList.remove("is-open");
  document.body.style.overflow = "";
}
