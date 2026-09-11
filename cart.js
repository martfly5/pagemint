/* ============================================================
   PageMint — cart
   Stored in localStorage so it persists across pages on this
   browser. There is no payment gateway wired in yet — see the
   note in the checkout confirmation and in README.md.
   ============================================================ */

const CART_KEY = "pagemint_cart";

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
}

function addToCart(id) {
  const cart = getCart();
  if (!cart.includes(id)) cart.push(id);
  saveCart(cart);
  renderCartDrawer();
  openCartDrawer();
}

function removeFromCart(id) {
  const cart = getCart().filter((x) => x !== id);
  saveCart(cart);
  renderCartDrawer();
}

function cartBooks() {
  return getCart()
    .map((id) => BOOKS.find((b) => b.id === id))
    .filter(Boolean);
}

function cartTotal() {
  return cartBooks().reduce((sum, b) => sum + b.price, 0);
}

function updateCartCount() {
  document.querySelectorAll(".cart-count").forEach((el) => {
    const n = getCart().length;
    el.textContent = n;
    el.setAttribute("data-count", n);
  });
}

function openCartDrawer() {
  const overlay = document.getElementById("cartOverlay");
  if (!overlay) return;
  overlay.classList.add("is-open");
  document.body.style.overflow = "hidden";
}

function closeCartDrawer() {
  const overlay = document.getElementById("cartOverlay");
  if (!overlay) return;
  overlay.classList.remove("is-open");
  document.body.style.overflow = "";
}

function renderCartDrawer() {
  const itemsEl = document.getElementById("cartItems");
  const footEl = document.getElementById("cartFoot");
  if (!itemsEl) return;

  const books = cartBooks();

  if (books.length === 0) {
    itemsEl.innerHTML = `
      <div class="cart-empty">
        <p>Your cart is empty.</p>
        <a href="store.html" class="btn btn-outline btn-sm">Browse the store</a>
      </div>
    `;
    if (footEl) footEl.style.display = "none";
    return;
  }

  if (footEl) footEl.style.display = "block";

  itemsEl.innerHTML = books
    .map((book) => {
      const cat = getCategory(book.category);
      return `
        <div class="cart-item">
          <div class="swatch-cover" style="background:${cat.color}">${book.title}</div>
          <div class="ci-info">
            <h4>${book.title}</h4>
            <p class="author" style="margin:0;font-size:0.8rem;color:var(--ink-soft);">${book.author}</p>
            <div class="ci-row">
              <strong>${formatRupees(book.price)}</strong>
              <button class="remove-btn" data-remove-from-cart="${book.id}">Remove</button>
            </div>
          </div>
        </div>
      `;
    })
    .join("");

  const totalEl = document.getElementById("cartTotalAmount");
  if (totalEl) totalEl.textContent = formatRupees(cartTotal());
}

function initCart() {
  updateCartCount();
  renderCartDrawer();

  document.addEventListener("click", (e) => {
    const addBtn = e.target.closest("[data-add-to-cart]");
    if (addBtn) {
      addToCart(addBtn.getAttribute("data-add-to-cart"));
    }

    const buyBtn = e.target.closest("[data-buy-now]");
    if (buyBtn) {
      addToCart(buyBtn.getAttribute("data-buy-now"));
      closeBookModalSafe();
    }

    const removeBtn = e.target.closest("[data-remove-from-cart]");
    if (removeBtn) {
      removeFromCart(removeBtn.getAttribute("data-remove-from-cart"));
    }

    if (e.target.closest("[data-open-cart]")) {
      e.preventDefault();
      renderCartDrawer();
      openCartDrawer();
    }

    if (e.target.closest("[data-close-cart]") || e.target.id === "cartOverlay") {
      closeCartDrawer();
    }

    if (e.target.closest("[data-checkout]")) {
      openCheckoutConfirm();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeCartDrawer();
  });
}

function closeBookModalSafe() {
  if (typeof closeBookModal === "function") closeBookModal();
}

function openCheckoutConfirm() {
  const books = cartBooks();
  if (books.length === 0) return;
  const overlay = document.getElementById("bookModal");
  if (!overlay) return;

  overlay.querySelector(".modal").innerHTML = `
    <button class="modal-close" data-close-modal aria-label="Close">✕</button>
    <div class="confirm-body">
      <div class="mark">🌱</div>
      <h2>This is a demo checkout</h2>
      <p>PageMint's storefront works end to end, but a real payment gateway
      (Razorpay, Instamojo, Stripe, etc.) still needs to be connected before
      it can take real payments. Once that's wired up, this step becomes
      your actual checkout.</p>
      <p style="font-weight:700;">Order total: ${formatRupees(cartTotal())} for ${books.length} ebook${books.length > 1 ? "s" : ""}</p>
      <button class="btn btn-primary" data-close-modal>Got it</button>
    </div>
  `;
  overlay.classList.add("is-open");
  closeCartDrawer();
  document.body.style.overflow = "hidden";
}

document.addEventListener("DOMContentLoaded", initCart);
