// Busca os produtos no supabase e renderiza na tela do index.html
// Search the products in supabase and render them all at index.html

import { supabase } from "../../lib/supabaseClient.js";

import { addToCart, cartCountItems } from "../../store/cartStore.js";

import { conversionFromCentsToMoney } from "../../utils/utils.js";

const grid = document.getElementById("grid");
const status = document.getElementById("status")
const cartCount = document.getElementById("cartCount")


// Só executa se a pagina tiver um elemento para mostrar o numero de itens do carrinho
// Only runs if the page has an element to show the number of items in the cart
if (cartCount) {
  cartCount.textContent = String(cartCountItems())
}

const res = await fetch("/api/products", {
  method: "GET",
  headers: {"Content-Type": "application/json"},

})


// RSOLVER PQ ISSO DÁ UNDEFINED
const data = await res.json()

console.log("Primeiro produto: ", data)

if (!data) {
    status.textContent = "Erro ao carregar produtos..."
} else {

    // Remove o status padrão "Carregando..."
    // Remove the standard status "Loading..."

    if(status){
      status.remove();
    }
    
    if (grid){
      grid.innerHTML = "";
    }
    
    for (const product of data) {
        const productCard = document.createElement("div");

        // Basic style

        productCard.style.border = "1px solid #ccc";
        productCard.style.padding = "12px";
        productCard.style.margin = "12px 0";

        // HTML interno do productCard
        productCard.innerHTML = `
          
          <h3>${product.name}</h3>
          <p>${product.description || ""}</p>
          <strong>${conversionFromCentsToMoney(
            product.price_cents,
            (product.currency || "BRL").toUpperCase()
          )}</strong>
          <br/>
          <button>Adicionar ao carrinho</button>`;

          productCard.querySelector("button").onclick = () => {
                     
            addToCart(product.id, 1)

            cartCount.textContent = String(cartCountItems())
          }

          if(grid){
            grid.appendChild(productCard)
          }
          
    }
}

