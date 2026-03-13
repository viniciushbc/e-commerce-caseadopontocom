import { cartCountItems } from "../store/cartStore.js";
import { iconCart, iconMenu, iconChevronDown } from "../utils/icons.js";
import { getCategoryIcon, getButtonIcon } from "../utils/categories.js";

/* -----------------------------------------------
   Icones de categoria para o dropdown (rodizio aleatorio por carregamento)
----------------------------------------------- */
function catIcon(slug) {
  return `<img src="${getCategoryIcon(slug)}" width="22" height="22" class="object-contain flex-shrink-0" alt="" />`;
}

export function renderHeader(container) {
  const count = cartCountItems();

  container.innerHTML = `
    <div class="navbar header-craft sticky top-0 z-50 min-h-[80px] sm:min-h-[96px] lg:min-h-[116px]">

      <!-- Espaçador balanceador (mesma largura do carrinho) -->
      <div class="navbar-start w-20 sm:w-28"></div>

      <!-- Logo + nome centralizado -->
      <div class="navbar-center flex-1 flex justify-center">
        <a href="/" class="flex items-center gap-3 sm:gap-4 hover:opacity-85 transition-opacity" aria-label="Caseado.com — Início">
          <img src="/images/logo.png"
               onerror="this.style.display='none'"
               alt="Caseado.com"
               class="h-14 sm:h-16 lg:h-20 w-auto object-contain drop-shadow-lg" />
          <span class="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-none drop-shadow">Caseado.com</span>
        </a>
      </div>

      <!-- Carrinho (end) -->
      <div class="navbar-end w-20 sm:w-28 lg:w-36 pr-3 justify-end">
        <a href="/cart.html"
           class="relative flex items-center justify-center w-11 h-11 lg:w-auto lg:h-10 lg:px-4 lg:gap-2 rounded-full bg-white/20 border border-white/40 text-white hover:bg-white/35 hover:border-white/60 transition-all font-bold"
           aria-label="Carrinho">
          ${iconCart(20)}
          <span class="hidden lg:inline text-sm">Carrinho</span>
          <span class="absolute -top-1 -right-1 lg:relative lg:top-auto lg:right-auto lg:ml-0.5 badge badge-xs bg-white text-secondary font-extrabold border-0 min-w-[18px]" id="cartBadge">${count}</span>
        </a>
      </div>

    </div>
  `;

  /* Carrinho flutuante — aparece ao scrollar para baixo do header */
  const floatEl = document.createElement("div");
  floatEl.id = "cart-float";
  floatEl.className = "cart-float";
  floatEl.innerHTML = `
    <a href="/cart.html" class="cart-float-btn" aria-label="Carrinho">
      ${iconCart(22)}
      <span class="cart-float-badge" id="cartBadgeFloat">${count}</span>
    </a>
  `;
  document.body.appendChild(floatEl);

  const headerEl = container.querySelector(".navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > (headerEl?.offsetHeight ?? 80)) {
      floatEl.classList.add("visible");
    } else {
      floatEl.classList.remove("visible");
    }
  }, { passive: true });
}

export function renderFooter(container) {
  container.innerHTML = `
    <footer class="footer-craft pt-10 pb-6 mt-auto">
      <div class="max-w-5xl mx-auto px-6">
        <div class="footer gap-8 mb-8">

          <!-- Marca -->
          <div>
            <div class="flex items-center gap-3 mb-3">
              <img src="/images/logo.png"
                   onerror="this.style.display='none'"
                   alt="Caseado.com" class="h-14 w-auto object-contain" />
              <span class="font-heading font-bold text-3xl text-primary tracking-tight leading-none">Caseado.com</span>
            </div>
            <p class="text-base-content/50 text-sm max-w-xs leading-relaxed">
              Artesanato de bonecas feito com carinho. Projetos digitais, kits e muito mais.
            </p>
            <!-- Decoracao artesanal com botoes PNG -->
            <div class="flex gap-2 mt-4 opacity-40">
              <img src="${getButtonIcon()}" width="24" height="24" class="object-contain" alt="" />
              <img src="${getButtonIcon()}" width="24" height="24" class="object-contain" alt="" />
              <img src="${getButtonIcon()}" width="24" height="24" class="object-contain" alt="" />
            </div>
          </div>

          <!-- Projetos Digitais -->
          <div class="flex flex-col gap-2">
            <span class="font-extrabold text-xs text-primary uppercase tracking-widest block">Projetos Digitais</span>
            <a href="/category.html?cat=natal"  class="link link-hover text-base-content/60 hover:text-secondary text-sm">Natal</a>
            <a href="/category.html?cat=pascoa" class="link link-hover text-base-content/60 hover:text-secondary text-sm">Páscoa</a>
            <a href="/category.html?cat=boneca" class="link link-hover text-base-content/60 hover:text-secondary text-sm">Boneca</a>
          </div>

          <!-- Loja -->
          <div class="flex flex-col gap-2">
            <span class="font-extrabold text-xs text-primary uppercase tracking-widest block">Loja</span>
            <a href="/category.html?cat=kits"     class="link link-hover text-base-content/60 hover:text-secondary text-sm">Kits</a>
            <a href="/category.html?cat=diversos" class="link link-hover text-base-content/60 hover:text-secondary text-sm">Diversos</a>
            <a href="/cart.html"                  class="link link-hover text-base-content/60 hover:text-secondary text-sm">Carrinho</a>
          </div>

          <!-- Contato -->
          <div class="flex flex-col gap-2">
            <span class="font-extrabold text-xs text-primary uppercase tracking-widest block">Contato</span>
            <a href="mailto:caseado.com@gmail.com"
               class="link link-hover text-base-content/60 hover:text-secondary text-sm inline-flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              E-mail
            </a>
          </div>

        </div>

        <div class="h-px bg-secondary/20 mb-5"></div>

        <p class="text-center text-base-content/40 text-xs">
          &copy; ${new Date().getFullYear()} Caseado.com &mdash; Todos os direitos reservados
        </p>
      </div>
    </footer>
  `;
}

/** Atualiza o badge do carrinho no header e no flutuante apos adicionar item */
export function refreshCartBadge() {
  const n = String(cartCountItems());
  const badge = document.getElementById("cartBadge");
  if (badge) badge.textContent = n;
  const floatBadge = document.getElementById("cartBadgeFloat");
  if (floatBadge) floatBadge.textContent = n;
}
