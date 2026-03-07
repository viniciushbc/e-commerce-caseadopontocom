import { renderHeader, renderFooter, refreshCartBadge } from "../../components/layout.js";
import { addToCart, getCart } from "../../store/cartStore.js";
import { conversionFromCentsToMoney } from "../../utils/utils.js";
import { getCategoryLabel, CATEGORY_DESCRIPTIONS } from "../../utils/categories.js";
import { iconEye, iconCartPlus, iconCheck } from "../../utils/icons.js";

renderHeader(document.getElementById("header-root"));
renderFooter(document.getElementById("footer-root"));

const params   = new URLSearchParams(window.location.search);
const cat      = params.get("cat") ?? "";
const catLabel = getCategoryLabel(cat);
const catDesc  = CATEGORY_DESCRIPTIONS[cat] ?? "Produtos de " + catLabel;

document.title = `${catLabel} — Caseado.com`;

/* Banner da categoria */
document.getElementById("cat-banner").innerHTML = `
  <section class="bg-base-200 diagonal-stripe border-b border-base-300 py-12 px-4 text-center relative overflow-hidden">
    <div class="pointer-events-none select-none absolute inset-0 opacity-[0.04] flex items-center justify-end pr-16" aria-hidden="true">
      <svg width="200" height="200" viewBox="0 0 32 32" fill="currentColor" class="text-primary -rotate-12">
        <circle cx="16" cy="16" r="14" fill="none" stroke="currentColor" stroke-width="1.5"/>
        <circle cx="16" cy="16" r="9" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="3 2"/>
        <circle cx="11" cy="11" r="2.5"/><circle cx="21" cy="11" r="2.5"/>
        <circle cx="11" cy="21" r="2.5"/><circle cx="21" cy="21" r="2.5"/>
      </svg>
    </div>
    <nav class="breadcrumbs text-sm justify-center mb-3" aria-label="Caminho">
      <ul class="flex gap-1 justify-center text-base-content/50">
        <li><a href="/" class="hover:text-primary transition-colors font-semibold">Inicio</a></li>
        <li class="text-base-content/30">›</li>
        <li class="text-primary font-bold">${catLabel}</li>
      </ul>
    </nav>
    <h1 class="text-4xl font-heading text-base-content mb-2">${catLabel}</h1>
    <p class="text-base-content/55">${catDesc}</p>
  </section>
`;

const grid   = document.getElementById("grid");
const status = document.getElementById("status");

const url = cat ? `/api/products?cat=${encodeURIComponent(cat)}` : "/api/products";
const res  = await fetch(url);
const json = await res.json();
const data = json.produtos;

if (!data) {
  status.innerHTML = `<div class="alert alert-error max-w-sm mx-auto">Erro ao carregar produtos.</div>`;
} else {
  status.remove();

  if (!data.length) {
    grid.insertAdjacentHTML("beforebegin", `
      <div class="text-center py-24 text-base-content/40 col-span-full">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="mx-auto mb-4 text-base-content/20"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
        <p class="mb-4">Nenhum produto encontrado nesta categoria.</p>
        <a href="/" class="btn btn-outline btn-primary btn-sm rounded-full">Voltar para a loja</a>
      </div>
    `);
  } else {
    for (const product of data) grid.appendChild(buildCard(product));
  }
}

function isInCart(productId) {
  return getCart().items.some(i => i.productId === productId);
}

function buildCard(product) {
  const cover      = product.images?.find(i => i.is_cover) ?? product.images?.[0];
  const catLabelCard = getCategoryLabel(product.category);
  const inCart     = isInCart(product.id);

  const card = document.createElement("article");
  card.className = "craft-card rounded-2xl overflow-hidden flex flex-col";
  card.innerHTML = `
    <div class="relative">
      ${cover
        ? `<img class="w-full h-52 object-cover" src="${cover.url}" alt="${product.name}" loading="lazy" />`
        : `<div class="w-full h-52 bg-base-200 flex items-center justify-center text-base-content/20">
             <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
           </div>`
      }
      <span class="badge badge-primary badge-sm absolute top-3 left-3 font-bold uppercase tracking-wide">${catLabelCard}</span>
    </div>
    <div class="card-body p-4 flex flex-col flex-1 gap-2">
      <h3 class="font-heading text-base font-bold text-base-content leading-snug line-clamp-2">${product.name}</h3>
      <p class="text-secondary font-extrabold text-lg mt-auto">${conversionFromCentsToMoney(product.price_cents, (product.currency || "BRL").toUpperCase())}</p>
      <div class="flex gap-2 mt-1">
        <a href="/product.html?id=${product.id}" class="btn btn-outline btn-primary btn-sm flex-1 rounded-full gap-1">
          ${iconEye(13)} Ver mais
        </a>
        <button class="btn btn-primary btn-sm rounded-full gap-1 add-btn ${inCart ? "btn-disabled btn-square" : "flex-1"}" title="${inCart ? "Já no carrinho" : "Adicionar ao carrinho"}">
          ${inCart ? iconCheck(14) : `${iconCartPlus(13)} <span>Carrinho</span>`}
        </button>
      </div>
    </div>
  `;

  const addBtn = card.querySelector(".add-btn");

  if (!inCart) {
    addBtn.addEventListener("click", () => {
      if (isInCart(product.id)) return;
      addToCart(product.id, 1);
      refreshCartBadge();
      addBtn.classList.remove("flex-1");
      addBtn.classList.add("btn-disabled", "btn-square");
      addBtn.title = "Já no carrinho";
      addBtn.innerHTML = iconCheck(14);
    });
  }

  return card;
}
