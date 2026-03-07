import { renderHeader, renderFooter, refreshCartBadge } from "../../components/layout.js";
import { addToCart, getCart } from "../../store/cartStore.js";
import { conversionFromCentsToMoney } from "../../utils/utils.js";
import { getCategoryLabel } from "../../utils/categories.js";
import { iconCartPlus, iconCheck, iconArrowLeft } from "../../utils/icons.js";

renderHeader(document.getElementById("header-root"));
renderFooter(document.getElementById("footer-root"));

const root   = document.getElementById("product-root");
const params = new URLSearchParams(window.location.search);
const id     = params.get("id");

if (!id) { renderError("ID do produto nao informado."); throw new Error("no id"); }

let product;
try {
  const res = await fetch(`/api/products/${encodeURIComponent(id)}`);
  if (!res.ok) {
    renderError(res.status === 404 ? "Produto nao encontrado." : "Erro ao carregar produto.");
    throw new Error("fetch failed");
  }
  product = (await res.json()).produto;
} catch {
  renderError("Erro de conexao. Tente novamente.");
  throw new Error("fetch failed");
}

document.title = `${product.name} — Caseado.com`;

const images    = (product.images ?? []).sort((a, b) => a.sort_order - b.sort_order);
const catLabel  = getCategoryLabel(product.category);
const price     = conversionFromCentsToMoney(product.price_cents, (product.currency || "BRL").toUpperCase());
const hasImages = images.length > 0;
const inCart    = getCart().items.some(i => i.productId === product.id);

root.innerHTML = `
  <div class="max-w-5xl mx-auto px-4 py-10">

    <!-- Breadcrumb -->
    <nav class="breadcrumbs text-sm mb-6 text-base-content/50" aria-label="Caminho">
      <ul class="flex gap-1">
        <li><a href="/" class="hover:text-primary font-semibold transition-colors">${iconArrowLeft(14)} Loja</a></li>
        <li class="text-base-content/30">›</li>
        <li class="text-base-content/70">${catLabel}</li>
        <li class="text-base-content/30">›</li>
        <li class="text-base-content font-semibold truncate max-w-[200px]">${product.name}</li>
      </ul>
    </nav>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

      <!-- CARROSSEL -->
      <div class="space-y-3">
        <div class="carousel-img-wrap" id="mainImgWrap">
          ${hasImages
            ? `<img id="mainImg" src="${images[0].url}" alt="${product.name}" class="carousel-main-img" />`
            : `<div class="flex items-center justify-center h-full text-base-content/15">
                 <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
               </div>`
          }
          ${hasImages && images.length > 1 ? `
            <button class="carousel-arrow-btn prev" id="prevBtn" aria-label="Anterior">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <button class="carousel-arrow-btn next" id="nextBtn" aria-label="Proxima">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          ` : ""}
        </div>

        ${hasImages && images.length > 1 ? `
          <div class="flex gap-2 flex-wrap" id="thumbs">
            ${images.map((img, i) => `
              <div class="carousel-thumb-item ${i === 0 ? "active" : ""}" data-idx="${i}">
                <img src="${img.url}" alt="Imagem ${i + 1}" loading="lazy" />
              </div>
            `).join("")}
          </div>
        ` : ""}
      </div>

      <!-- INFO DO PRODUTO -->
      <div class="space-y-5">
        <div>
          <span class="badge badge-primary badge-outline font-bold uppercase tracking-widest text-xs mb-3">${catLabel}</span>
          <h1 class="text-3xl font-heading text-base-content leading-snug">${product.name}</h1>
        </div>

        <p class="text-3xl font-extrabold text-secondary">${price}</p>

        <div class="divider my-2 opacity-40"></div>

        ${product.description
          ? `<p class="text-base-content/65 leading-relaxed">${product.description}</p>`
          : ""
        }

        <div class="space-y-3 pt-2">
          <button id="addToCartBtn" class="btn btn-primary w-full rounded-full text-base font-bold shadow-md shadow-primary/30 gap-2 ${inCart ? "btn-disabled" : ""}">
            ${inCart ? iconCheck(18) : iconCartPlus(18)}
            <span id="addBtnLabel">${inCart ? "Produto já no carrinho" : "Adicionar ao Carrinho"}</span>
          </button>

          <div id="addFeedback" class="alert gap-2 py-2 text-sm font-semibold hidden"></div>

          <a href="/" class="btn btn-ghost btn-sm w-full rounded-full text-base-content/50 gap-1">
            ${iconArrowLeft(15)} Continuar comprando
          </a>
        </div>
      </div>

    </div>
  </div>
`;

/* --- Carrossel --- */
if (hasImages && images.length > 1) {
  let current  = 0;
  const mainImg  = document.getElementById("mainImg");
  const thumbEls = document.querySelectorAll(".carousel-thumb-item");

  function goTo(idx) {
    current = (idx + images.length) % images.length;
    mainImg.style.opacity = "0";
    setTimeout(() => { mainImg.src = images[current].url; mainImg.style.opacity = "1"; }, 160);
    thumbEls.forEach((t, i) => t.classList.toggle("active", i === current));
  }

  document.getElementById("prevBtn")?.addEventListener("click", () => goTo(current - 1));
  document.getElementById("nextBtn")?.addEventListener("click", () => goTo(current + 1));
  thumbEls.forEach(t => t.addEventListener("click", () => goTo(Number(t.dataset.idx))));
}

/* --- Adicionar ao carrinho --- */
const addBtn     = document.getElementById("addToCartBtn");
const addLabel   = document.getElementById("addBtnLabel");
const feedback   = document.getElementById("addFeedback");

if (!inCart) {
  addBtn.addEventListener("click", () => {
    const alreadyInCart = getCart().items.some(i => i.productId === product.id);

    if (alreadyInCart) {
      feedback.className = "alert alert-warning gap-2 py-2 text-sm font-semibold flex";
      feedback.innerHTML = `${iconCheck(16)} Produto já adicionado ao carrinho!`;
      return;
    }

    addToCart(product.id, 1);
    refreshCartBadge();

    addBtn.classList.add("btn-disabled");
    addBtn.innerHTML = `${iconCheck(18)} <span>Adicionado ao carrinho!</span>`;

    feedback.className = "alert alert-success gap-2 py-2 text-sm font-semibold flex";
    feedback.innerHTML = `${iconCheck(16)} Produto adicionado ao carrinho!`;

    setTimeout(() => { feedback.className = "hidden"; }, 3000);
  });
}

function renderError(msg) {
  document.getElementById("product-root").innerHTML = `
    <div class="flex flex-col items-center gap-4 py-24 px-4 text-center text-base-content/50">
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-base-content/20"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
      <p class="text-lg">${msg}</p>
      <a href="/" class="btn btn-outline btn-primary btn-sm rounded-full">Voltar para a loja</a>
    </div>
  `;
}
