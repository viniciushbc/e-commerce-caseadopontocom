import { renderHeader, renderFooter } from "../../components/layout.js";
import { clearCart } from "../../store/cartStore.js";

renderHeader(document.getElementById("header-root"));
renderFooter(document.getElementById("footer-root"));

const returnContent = document.getElementById("return-content");

const params    = new URLSearchParams(window.location.search);
const sessionId = params.get("session_id");

if (!sessionId) {
  renderResult("error", null);
} else {
  try {
    const res     = await fetch(`/session-status?session_id=${encodeURIComponent(sessionId)}`);
    const session = await res.json();

    if (session.status === "complete") {
      clearCart();
      renderResult("success", session.customer_email);
    } else if (session.status === "open") {
      window.location.replace("/cart.html");
    } else {
      renderResult("error", null);
    }
  } catch {
    renderResult("error", null);
  }
}

function renderResult(type, email) {
  if (type === "success") {
    returnContent.innerHTML = `
      <div class="card bg-base-100 border-2 border-base-300 shadow-xl max-w-lg w-full p-8 items-center text-center gap-4">
        <div class="text-primary">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
        </div>
        <h1 class="text-2xl font-heading font-bold text-base-content">Pedido Confirmado!</h1>
        <p class="text-base-content/65 leading-relaxed">
          Obrigada pela sua compra! Um email de confirmacao foi enviado para
          <span class="font-bold text-primary">${email ?? "seu email"}</span>.
        </p>
        <p class="text-base-content/50 text-sm">
          Duvidas? Fale conosco em
          <a href="mailto:contato@caseado.com" class="text-secondary font-bold hover:underline">
            contato@caseado.com
          </a>.
        </p>
        <a href="/" class="btn btn-primary rounded-full px-8 mt-2">Continuar comprando</a>
      </div>
    `;
  } else {
    returnContent.innerHTML = `
      <div class="card bg-base-100 border-2 border-base-300 shadow-xl max-w-lg w-full p-8 items-center text-center gap-4">
        <div class="text-error">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
        </div>
        <h1 class="text-2xl font-heading font-bold text-base-content">Algo deu errado</h1>
        <p class="text-base-content/65 leading-relaxed">Nao foi possivel verificar seu pedido. Tente novamente ou entre em contato conosco.</p>
        <a href="/" class="btn btn-outline btn-primary rounded-full px-8 mt-2">Voltar para a loja</a>
      </div>
    `;
  }
}
