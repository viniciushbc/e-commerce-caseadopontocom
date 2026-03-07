import { cartCountItems } from "../store/cartStore.js";
import { iconCart, iconMenu, iconX, iconScissors, iconChevronDown, iconSewingButton, iconSpool } from "../utils/icons.js";

/* -----------------------------------------------
   Icones de categoria para o dropdown (SVG Lucide)
----------------------------------------------- */
const catIcons = {
  natal:    `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  pascoa:   `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2c-4 0-7 4.5-7 8.5a7 7 0 0 0 14 0C19 6.5 16 2 12 2z"/><path d="M9 13c1 1.5 5 1.5 6 0"/></svg>`,
  boneca:   `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="3"/><path d="M7 12a5 5 0 0 1 10 0"/><path d="M9 22v-6a3 3 0 0 1 6 0v6"/></svg>`,
};

export function renderHeader(container) {
  const count = cartCountItems();

  container.innerHTML = `
    <div class="navbar header-craft sticky top-0 z-50 border-b-2 border-primary/20 shadow-sm min-h-[60px]">

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
                <li><a href="/category.html?cat=natal"  class="gap-2">${catIcons.natal}  Natal</a></li>
                <li><a href="/category.html?cat=pascoa" class="gap-2">${catIcons.pascoa} Páscoa</a></li>
                <li><a href="/category.html?cat=boneca" class="gap-2">${catIcons.boneca} Boneca</a></li>
              </ul>
            </li>
            <li><a href="/category.html?cat=kits"     class="font-bold rounded-xl">Kits</a></li>
            <li><a href="/category.html?cat=diversos" class="font-bold rounded-xl">Diversos</a></li>
          </ul>
        </div>

        <!-- Logo -->
        <a href="/" class="flex items-center gap-2 px-2 hover:opacity-80 transition-opacity" aria-label="Caseado.com — Início">
          <img src="/images/logo.png"
               onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'"
               alt="Caseado.com"
               class="h-9 w-auto object-contain" />
          <span style="display:none" class="items-center gap-1.5 text-primary font-heading font-bold text-xl tracking-tight">
            ${iconScissors(18)}
            Caseado<span class="text-secondary">.com</span>
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
                <li><a href="/category.html?cat=natal"  class="gap-2 rounded-xl">${catIcons.natal}  Natal</a></li>
                <li><a href="/category.html?cat=pascoa" class="gap-2 rounded-xl">${catIcons.pascoa} Páscoa</a></li>
                <li><a href="/category.html?cat=boneca" class="gap-2 rounded-xl">${catIcons.boneca} Boneca</a></li>
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
            <div class="flex items-center gap-3 mb-2">
              <img src="/images/logo.png"
                   onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'"
                   alt="Caseado.com" class="h-10 w-auto brightness-0 invert opacity-90" />
              <span style="display:none" class="footer-brand text-primary-content/90 items-center gap-2">
                ${iconScissors(18)} Caseado.com
              </span>
            </div>
            <p class="text-neutral-content/60 text-sm max-w-xs leading-relaxed">
              Artesanato de bonecas feito com carinho. Projetos digitais, kits e muito mais.
            </p>
          </div>

          <!-- Categorias -->
          <div>
            <span class="footer-title text-primary/80">Projetos Digitais</span>
            <a href="/category.html?cat=natal"  class="link link-hover">Natal</a>
            <a href="/category.html?cat=pascoa" class="link link-hover">Páscoa</a>
            <a href="/category.html?cat=boneca" class="link link-hover">Boneca</a>
          </div>

          <!-- Outros -->
          <div>
            <span class="footer-title text-primary/80">Loja</span>
            <a href="/category.html?cat=kits"     class="link link-hover">Kits</a>
            <a href="/category.html?cat=diversos" class="link link-hover">Diversos</a>
            <a href="/cart.html"                  class="link link-hover">Carrinho</a>
          </div>

          <!-- Decoracao artesanal -->
          <div class="hidden lg:flex flex-col items-center justify-center gap-3 opacity-20">
            ${iconSewingButton(44)}
            ${iconSpool(40)}
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
