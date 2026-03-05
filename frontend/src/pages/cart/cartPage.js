import { getCart, removeFromCart } from "../../store/cartStore.js";
import { conversionFromCentsToMoney } from "../../utils/utils.js";

const cartElement = document.getElementById("cart");
const totalElement = document.getElementById("total");
const checkoutBtn = document.getElementById("checkout");

async function renderCart() {
  const cart = getCart();

  // estado vazio
  if (!cart.items.length) {
    cartElement.textContent = "Carrinho vazio!";
    totalElement.textContent = conversionFromCentsToMoney(0);
    checkoutBtn.disabled = true;
    return;
  }

  checkoutBtn.disabled = false;

  const itemsIDs = cart.items.map((item) => item.productId);

  const res = await fetch("/api/cart/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ids: itemsIDs }),
  });

  const json = await res.json();
  const data = json.activeProducts;

  if (itemsIDs.length !== data.length) {
    cartElement.textContent = "Erro ao carregar carrinho...";
    totalElement.textContent = conversionFromCentsToMoney(0);
    return;
  }

  const mapOfProductsById = Object.fromEntries(data.map((p) => [p.id, p]));

  let total = 0;
  cartElement.innerHTML = "";

  for (const item of cart.items) {
    const produto = mapOfProductsById[item.productId];
    if (!produto) continue;

    total += (produto.price_cents || 0) * item.qty;

    const row = document.createElement("div");
    row.style.display = "flex";
    row.style.alignItems = "center";
    row.style.justifyContent = "space-between";
    row.style.gap = "12px";
    row.style.marginBottom = "8px";

    const info = document.createElement("span");
    info.textContent = `${produto.name} — ${conversionFromCentsToMoney(
      produto.price_cents,
      (produto.currency || "BRL").toUpperCase()
    )}`;

    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.textContent = "Remover";

    removeBtn.onclick = async () => {
      removeFromCart(item.productId);
      await renderCart(); // re-renderiza sem dar refresh na página
    };

    row.appendChild(info);
    row.appendChild(removeBtn);

    cartElement.appendChild(row);
  }

  totalElement.textContent = conversionFromCentsToMoney(total);
}

await renderCart();

checkoutBtn.onclick = async () => {
  const cart = getCart();

  const res = await fetch("/api/create-checkout-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items: cart.items }),
  });

  const data = await res.json();

  if (!res.ok) {
    console.log(data);
    alert("Erro ao criar sessão no stripe");
    return;
  }

  window.location.href = data.url;
};