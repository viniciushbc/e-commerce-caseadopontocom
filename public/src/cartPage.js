// Lê o carrinho do localStorage, calcula os preços e renderiza no cart.html
// Read the cart in the localStorage, calculate the price and renders it at cart.html


// Necessário para buscar os dados dos produtos lá no supabase
// Necessary to consult the product data in supabase
import { supabase } from "./supabaseClient.js";

// Função pra ler o carrinho do localStorage
// Function to read the localStorage cart
import { getCart } from "./cartStore.js";

import { conversionFromCentsToMoney } from "./utils";

const cartElement = document.getElementById("cart");     // lista de itens, items list
const totalElement = document.getElementById("total");   // total
const checkoutBtn = document.getElementById("checkout")

const cart = getCart();


// Se não houver itens, retornar 0
// If there is no items, return 0

if(!cart.items.length) {
    cartElement.textContent = "Carrinho vazio!"
    totalElement.textContent = conversionFromCentsToMoney(0);
} else {

    // Faz uma lista de ID's que estão no carrinho
    // Make the list of ID's of the items that are in the cart
    const itemsIDs = cart.items.map((item)=> item.productId)

    // Consulta ao supabase para conferir se os produtos do carrinho estão no banco
    // Checks if the products in the cart are present in the supabase database
    const {data, error} = await supabase.from("products").select("id,name,price_cents,currency").in("id",itemsIDs) // WHERE id IN itemsIDs

    if (error) {
        cartElement.textContent = "Erro ao carregar carrinho..."
        console.log("Supabase error: ", error)
    } else {

        // Crio um mapa [id, produto]
        // Create a map of [id, product]
        const mapOfProductsById = Object.fromEntries(data.map( (p) => [p.id, p] ))

        let total = 0 // Em centavos, in cents


        cartElement.innerHTML = ""


        for (const item of cart.items){

            const produto = mapOfProductsById[item.productId]


            // Se não encontrou o produto (Foi removido), passa pro próximo
            // If did not find the product (Got removed), skip
            if(!produto) continue;

            total += (produto.price_cents || 0) * item.qty

            const row = document.createElement("div");
            row.textContent = `${produto.name} x${item.qty} — ${conversionFromCentsToMoney(produto.price_cents,(produto.currency || "BRL").toUpperCase())}`;

            cartElement.appendChild(row);
        }

        totalElement.textContent = conversionFromCentsToMoney(total)

    }

}

checkoutBtn.onclick = async () => {
    console.log("integrar com api")

    const cart = getCart();


    // Enviando a req para a API
    
    const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({items: cart.items})
        
    });

    
    const data = await res.json();

    if (!res.ok) {
        console.log(data);
        alert("Erro ao criar sessão no stripe");
        return;
    }

    window.location.href = data.url


}


