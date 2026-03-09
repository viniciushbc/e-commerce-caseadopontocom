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
    <!-- Faixa de identidade rosa no topo -->
    <div class="brand-stripe"></div>

    <div class="navbar header-craft sticky top-0 z-50 min-h-[72px] sm:min-h-[84px] lg:min-h-[112px]">

      <!-- Mobile: hamburger + logo -->
      <div class="navbar-start gap-1">
        <!-- Hamburger (mobile only) -->
        <div class="dropdown lg:hidden">
          <label tabindex="0" class="btn btn-ghost btn-square btn-sm" aria-label="Menu">
            ${iconMenu(20)}
          </label>
          <ul tabindex="0" class="menu menu-sm dropdown-content z-[99] mt-2 w-60 rounded-2xl bg-base-100 shadow-xl border border-base-300 p-2 gap-0.5">
            <li><a href="/" class="font-bold rounded-xl">Início</a></li>
            <li>
              <span class="menu-title text-xs text-primary font-extrabold uppercase tracking-wider pt-2">Projetos Digitais</span>
              <ul>
                <li><a href="/category.html?cat=natal"  class="gap-2">${catIcon("natal")}  Natal</a></li>
                <li><a href="/category.html?cat=pascoa" class="gap-2">${catIcon("pascoa")} Páscoa</a></li>
                <li><a href="/category.html?cat=boneca" class="gap-2">${catIcon("boneca")} Boneca</a></li>
              </ul>
            </li>
            <li><a href="/category.html?cat=kits"     class="font-bold rounded-xl">Kits</a></li>
            <li><a href="/category.html?cat=diversos" class="font-bold rounded-xl">Diversos</a></li>
          </ul>
        </div>

        <!-- Logo + nome sempre visível -->
        <a href="/" class="flex items-center gap-3 px-2 hover:opacity-80 transition-opacity" aria-label="Caseado.com — Início">
          <img src="/images/logo.png"
               onerror="this.style.display='none'"
               alt="Caseado.com"
               class="h-14 sm:h-16 lg:h-24 w-auto object-contain" />
          <span class="flex flex-col leading-none gap-0.5 lg:gap-1">
            <span class="font-heading font-bold text-2xl sm:text-3xl lg:text-5xl text-primary tracking-tight leading-none">Caseado</span>
            <span class="font-extrabold text-xs sm:text-sm lg:text-base text-secondary tracking-[0.2em] lg:tracking-[0.25em] uppercase leading-none">.com</span>
          </span>
        </a>
      </div>

      <!-- Desktop nav (center) -->
      <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal gap-0.5 px-0 font-bold text-sm">
          <li><a href="/" class="rounded-full hover:bg-primary/10 hover:text-primary transition-colors">Início</a></li>

          <!-- Dropdown click-based (details/summary) sem seta dupla -->
          <li class="relative">
            <details class="group">
              <summary class="nav-dropdown-summary rounded-full hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer px-4 py-2">
                Projetos Digitais
                <span class="group-open:rotate-180 transition-transform duration-200 inline-flex">${iconChevronDown(13)}</span>
              </summary>
              <ul class="absolute z-[99] mt-1 w-52 rounded-2xl bg-base-100 shadow-xl border border-base-300 p-2 gap-0.5">
                <li><a href="/category.html?cat=natal"  class="gap-2 rounded-xl">${catIcon("natal")}  Natal</a></li>
                <li><a href="/category.html?cat=pascoa" class="gap-2 rounded-xl">${catIcon("pascoa")} Páscoa</a></li>
                <li><a href="/category.html?cat=boneca" class="gap-2 rounded-xl">${catIcon("boneca")} Boneca</a></li>
              </ul>
            </details>
          </li>

          <li><a href="/category.html?cat=kits"     class="rounded-full hover:bg-primary/10 hover:text-primary transition-colors">Kits</a></li>
          <li><a href="/category.html?cat=diversos" class="rounded-full hover:bg-primary/10 hover:text-primary transition-colors">Diversos</a></li>
        </ul>
      </div>

      <!-- Cart (end) -->
      <div class="navbar-end pr-2">
        <a href="/cart.html" class="btn btn-secondary btn-sm rounded-full gap-2 font-bold" aria-label="Carrinho">
          ${iconCart(16)}
          <span class="hidden sm:inline">Carrinho</span>
          <span class="badge badge-xs bg-white text-secondary font-extrabold border-0" id="cartBadge">${count}</span>
        </a>
      </div>

    </div>
  `;

  /* Fechar o dropdown ao clicar em qualquer link dentro dele */
  container.querySelectorAll("details a").forEach(link => {
    link.addEventListener("click", () => {
      link.closest("details")?.removeAttribute("open");
    });
  });
}

export function renderFooter(container) {
  container.innerHTML = `
    <footer class="bg-neutral text-neutral-content pt-12 pb-6 mt-auto">
      <!-- Faixa decorativa superior -->
      <div class="dot-divider opacity-20 mb-10"></div>

      <div class="max-w-5xl mx-auto px-6">
        <div class="footer gap-8 mb-10">

          <!-- Marca -->
          <div>
            <div class="flex items-center gap-3 mb-3">
              <img src="/images/logo.png"
                   onerror="this.style.display='none'"
                   alt="Caseado.com" class="h-14 w-auto brightness-0 invert opacity-90" />
              <span class="flex flex-col leading-none gap-0.5">
                <span class="font-heading font-bold text-3xl text-primary-content/90 tracking-tight leading-none">Caseado</span>
                <span class="font-extrabold text-sm text-secondary tracking-[0.25em] uppercase leading-none">.com</span>
              </span>
            </div>
            <p class="text-neutral-content/60 text-sm max-w-xs leading-relaxed">
              Artesanato de bonecas feito com carinho. Projetos digitais, kits e muito mais.
            </p>
          </div>

          <!-- Categorias -->
          <div class="flex flex-col gap-2">
            <span class="font-extrabold text-xs text-secondary uppercase tracking-widest block">Projetos Digitais</span>
            <a href="/category.html?cat=natal"  class="link link-hover text-neutral-content/70 hover:text-secondary">Natal</a>
            <a href="/category.html?cat=pascoa" class="link link-hover text-neutral-content/70 hover:text-secondary">Páscoa</a>
            <a href="/category.html?cat=boneca" class="link link-hover text-neutral-content/70 hover:text-secondary">Boneca</a>
          </div>

          <!-- Outros -->
          <div class="flex flex-col gap-2">
            <span class="font-extrabold text-xs text-secondary uppercase tracking-widest block">Loja</span>
            <a href="/category.html?cat=kits"     class="link link-hover text-neutral-content/70 hover:text-secondary">Kits</a>
            <a href="/category.html?cat=diversos" class="link link-hover text-neutral-content/70 hover:text-secondary">Diversos</a>
            <a href="/cart.html"                  class="link link-hover text-neutral-content/70 hover:text-secondary">Carrinho</a>
          </div>

          <!-- Decoracao artesanal com botoes PNG (rodizio aleatorio) -->
          <div class="hidden lg:flex flex-col items-center justify-center gap-2 opacity-30">
            <div class="flex gap-2">
              <img src="${getButtonIcon()}" width="32" height="32" class="object-contain" alt="" />
              <img src="${getButtonIcon()}" width="32" height="32" class="object-contain" alt="" />
            </div>
            <div class="flex gap-2">
              <img src="${getButtonIcon()}" width="32" height="32" class="object-contain" alt="" />
              <img src="${getButtonIcon()}" width="32" height="32" class="object-contain" alt="" />
            </div>
          </div>

        </div>

        <div class="dot-divider opacity-10 mb-6"></div>

        <p class="text-center text-neutral-content/40 text-xs">
          &copy; ${new Date().getFullYear()} Caseado.com &mdash; Todos os direitos reservados
        </p>
      </div>
    </footer>
  `;
}

/** Atualiza o badge do carrinho no header apos adicionar item */
export function refreshCartBadge() {
  const badge = document.getElementById("cartBadge");
  if (badge) badge.textContent = String(cartCountItems());
}
