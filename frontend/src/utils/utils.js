// Exportando a função para usar no cartPage.js e productPage.js
// Exporting this function to use it in the cartPage.js and productPage.js
export function conversionFromCentsToMoney(cents, currency="BRL") {
    return new Intl.NumberFormat("pt-br", {
        style: "currency",
        currency,
    }).format((cents || 0) / 100)
}