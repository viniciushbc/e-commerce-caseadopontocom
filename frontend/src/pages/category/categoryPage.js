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

const CHEVRON_LEFT  = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>`;
const CHEVRON_RIGHT = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>`;
const PLACEHOLDER   = `<div class="w-full h-52 bg-base-200 flex items-center justify-center text-base-content/20"><svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg></div>`;

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
  const images       = (product.images ?? []).sort((a, b) => a.sort_order - b.sort_order);
  const catLabelCard = getCategoryLabel(product.category);
  const inCart       = isInCart(product.id);
  const multi        = images.length > 1;

  const card = document.createElement("article");
  card.className = "craft-card rounded-2xl overflow-hidden flex flex-col";
  card.innerHTML = `
    <div class="card-img-wrap relative">
      ${images.length > 0
        ? `<a href="/product.html?id=${product.id}" class="block" aria-label="Ver ${product.name}">
             <img class="card-carousel-img w-full h-52 object-cover transition-opacity duration-200"
                  src="${images[0].url}" alt="${product.name}" loading="lazy" />
           </a>`
        : PLACEHOLDER
      }
      ${multi ? `
        <button class="prev-btn card-arrow-btn left" aria-label="Anterior">${CHEVRON_LEFT}</button>
        <button class="next-btn card-arrow-btn right" aria-label="Próxima">${CHEVRON_RIGHT}</button>
        <div class="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex gap-1 pointer-events-none">
          ${images.map((_, i) => `<span class="card-dot w-1.5 h-1.5 rounded-full transition-colors ${i === 0 ? "bg-white" : "bg-white/40"}"></span>`).join("")}
        </div>
      ` : ""}
      <span class="badge badge-secondary badge-sm absolute top-3 left-3 z-20 font-bold uppercase tracking-wide">${catLabelCard}</span>
    </div>
    <div class="card-body p-4 flex flex-col flex-1 gap-2">
      <h3 class="font-heading text-base font-bold text-base-content leading-snug line-clamp-2">${product.name}</h3>
      <p class="text-secondary font-extrabold text-lg mt-auto">${conversionFromCentsToMoney(product.price_cents, (product.currency || "BRL").toUpperCase())}</p>
      <div class="flex flex-col gap-1.5 mt-2">
        <button class="btn btn-primary btn-sm w-full rounded-full add-btn ${inCart ? "btn-disabled" : ""}">
          ${inCart ? `${iconCheck(14)} Adicionado` : "Adicionar ao Carrinho"}
        </button>
        <a href="/product.html?id=${product.id}" class="btn btn-ghost btn-xs w-full rounded-full text-base-content/50 gap-1">
          ${iconEye(12)} Ver produto
        </a>
      </div>
    </div>
  `;

  /* Carrossel */
  if (multi) {
    let current = 0;
    const imgEl   = card.querySelector(".card-carousel-img");
    const dotsEl  = card.querySelectorAll(".card-dot");
    const prevBtn = card.querySelector(".prev-btn");
    const nextBtn = card.querySelector(".next-btn");

    const goTo = (idx) => {
      current = (idx + images.length) % images.length;
      imgEl.style.opacity = "0";
      setTimeout(() => { imgEl.src = images[current].url; imgEl.style.opacity = "1"; }, 150);
      dotsEl.forEach((d, i) => {
        d.classList.toggle("bg-white",    i === current);
        d.classList.toggle("bg-white/40", i !== current);
      });
    };

    prevBtn.addEventListener("click", (e) => { e.preventDefault(); e.stopPropagation(); goTo(current - 1); });
    nextBtn.addEventListener("click", (e) => { e.preventDefault(); e.stopPropagation(); goTo(current + 1); });
  }

  /* Adicionar ao carrinho */
  const addBtn = card.querySelector(".add-btn");
  if (!inCart) {
    addBtn.addEventListener("click", () => {
      if (isInCart(product.id)) return;
      addToCart(product.id, 1);
      refreshCartBadge();
      addBtn.classList.add("btn-disabled");
      addBtn.innerHTML = `${iconCheck(14)} Adicionado`;
    });
  }

  return card;
}
