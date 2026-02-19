// A ideia é salvar o carrinho no local storage do navegador
// The ideia is to save the cart items into the browser's local storage

// IMPORTANTE: O localStorage do navegador só guarda dados em formato de string JSON, por isso tenho que fazer conversões dependendo da função
// IMPORTANT: The browser localStorage store files in the JSON string format, so we have to do conversions depending on the function

// Essa chave é usada para identificar o "array" carrinho no meu local storage e ler.
// This key is used to identify the "array" cart in the local storage and read it
const KEY = "cartUser"

// Lê os itens do carrinho
// Read the cart items
export function getCart() {

    // Acessa o carrinho atraves da chave
    // Access the cart through the KEY
    const cartSavedInLocalStorage = localStorage.getItem(KEY)


    if (!cartSavedInLocalStorage) return { items: [] };

    // Converte o carrinho de uma "string JSON" para um objeto JSON    
    // Convert the cart from a "JSON string" to JSON 
    try {
        return JSON.parse(cartSavedInLocalStorage)
    } catch {
        return { items: [] }
    }
}


// Salva o carrinho no local storage do browser
// Saves the cart into the browser's local storage
export function saveCart(cart){

    // Como eu quero salvar o meu carrinho no local storage, preciso transformar em string json
    // Since I want to save my cart into the browser's local storage, we have to convert it into a json string
    const cartToSaveInLocalStorage = JSON.stringify(cart)

    localStorage.setItem(KEY, cartToSaveInLocalStorage)
}


export function addToCart(productId, qty = 1){

    const cart = getCart()

    
    console.log(cart)

    const item = cart.items.find( (produto) => produto.productId === productId )

    if (item) {
        item.qty += qty
    } else {
        cart.items.push( {productId, qty})
    }

    saveCart(cart)

}


export function cartCountItems() {

    const cart = getCart()


    // Somando todas as quantidades de todos os items do array (carrinho)
    // Summing up all the quantities of items in the array (cart)
    return cart.items.reduce( (totalItems, item) => totalItems + item.qty, 0)
}
