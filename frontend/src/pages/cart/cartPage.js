import { renderHeader, renderFooter } from "../../components/layout.js";
import { getCart, removeFromCart, clearCart } from "../../store/cartStore.js";
import { conversionFromCentsToMoney } from "../../utils/utils.js";
import { iconTrash } from "../../utils/icons.js";

renderHeader(document.getElementById("header-root"));
renderFooter(document.getElementById("footer-root"));

const cartEl      = document.getElementById("cart");
const totalEl     = document.getElementById("total");
const summaryEl   = document.getElementById("cart-summary");
const checkoutBtn = document.getElementById("checkout");
const clearBtn    = document.getElementById("clear-cart");

await renderCart();

clearBtn?.addEventListener("click", async () => { clearCart(); await renderCart(); });

checkoutBtn?.addEventListener("click", async () => {
  const cart = getCart();
  checkoutBtn.disabled = true;
  checkoutBtn.innerHTML = `<span class="loading loading-spinner loading-sm"></span> Aguarde...`;

  const res  = await fetch("/api/create-checkout-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items: cart.items }),
  });
  const data = await res.json();

  if (!res.ok) {
    alert("Erro ao criar sessao de pagamento. Tente novamente.");
    checkoutBtn.disabled = false;
    checkoutBtn.innerHTML = `Finalizar Compra <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>`;
    return;
  }
  window.location.href = data.url;
});

async function renderCart() {
  const cart = getCart();

  if (!cart.items.length) {
    cartEl.innerHTML = `
      <div class="text-center py-20 text-base-content/40">
        <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="mx-auto mb-4 text-base-content/20"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
        <p class="text-lg font-semibold mb-2">Seu carrinho esta vazio</p>
        <p class="text-sm mb-6">Adicione produtos para continuar comprando.</p>
        <a href="/" class="btn btn-primary rounded-full px-8">Ver produtos</a>
      </div>
    `;
    summaryEl.style.display = "none";
    return;
  }

  const ids = cart.items.map(i => i.productId);
  const res = await fetch("/api/cart/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ids }),
  });

  const activeProducts = (await res.json()).activeProducts;

  if (ids.length !== activeProducts.length) {
    cartEl.innerHTML = `
      <div class="alert alert-warning flex-col gap-2 text-center">
        <p class="font-bold">Alguns produtos foram removidos da loja.</p>
        <p class="text-sm">Limpe o carrinho e adicione novamente os produtos desejados.</p>
        <button class="btn btn-sm btn-error rounded-full mt-2" id="clearErrBtn">Limpar carrinho</button>
      </div>
    `;
    document.getElementById("clearErrBtn")?.addEventListener("click", async () => { clearCart(); await renderCart(); });
    summaryEl.style.display = "none";
    return;
  }

  const byId  = Object.fromEntries(activeProducts.map(p => [p.id, p]));
  let   total = 0;
  cartEl.innerHTML = "";

  for (const item of cart.items) {
    const p = byId[item.productId];
    if (!p) continue;
    total += (p.price_cents ?? 0) * item.qty;

    const row = document.createElement("div");
    row.className = "flex items-center gap-4 p-4 bg-base-100 border-2 border-base-300 rounded-2xl mb-3 hover:border-primary/30 transition-colors";
    row.innerHTML = `
      <div class="flex-1 min-w-0">
        <p class="font-bold text-base-content truncate">${p.name}</p>
        <p class="text-primary font-extrabold text-lg">${conversionFromCentsToMoney(p.price_cents, (p.currency || "BRL").toUpperCase())}</p>
      </div>
      <button class="btn btn-ghost btn-sm btn-square text-error hover:bg-error/10 remove-btn" aria-label="Remover">
        ${iconTrash(16)}
      </button>
    `;
    row.querySelector(".remove-btn").addEventListener("click", async () => { removeFromCart(item.productId); await renderCart(); });
    cartEl.appendChild(row);
  }

  if (totalEl) totalEl.textContent = conversionFromCentsToMoney(total);
  summaryEl.style.display = "block";
  checkoutBtn.disabled = false;
}
