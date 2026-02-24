import { stringMoneyToIntCents } from "./money.js";


// Vou usar essa função antes de criar/manipular um produto, para validar se as entradas são válidas 
// Going to use this function before creating/manipulating a product, to validate its inputs

export function productDataValidation({name, description, price, currency="brl", images, pdf}) {

        // name
        const nameTrimmed = (name ?? "").trim();
        if(!nameTrimmed) throw Object.assign(new Error("NAME_REQUIRED"), {status:400})
        
        // description
        // "description" é NULLABLE, não precisa validar
        // "description" is NULLABLE, no need to validate
        const descriptionTrimmed = description?.trim() || null

        // price
        const price_cents = stringMoneyToIntCents(price)
        if(!price_cents) throw Object.assign(new Error("INVALID_PRICE"), {status:400})

        // img
        if(!Array.isArray(images) || images.length === 0) throw Object.assign(new Error("IMAGES_REQUIRED"), {status:400})

        // pdf  
        if(!pdf) throw Object.assign(new Error("PDF_REQUIRED"), {status:400})
        
        
        return {
            name: nameTrimmed,
            description: descriptionTrimmed,
            price_cents,
            currency,
            images,
            pdf
        }
}