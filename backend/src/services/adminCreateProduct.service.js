import { stringMoneyToIntCents } from "../utils/money.js";
import { extFromFile } from "../utils/files.js";

export function adminCreateProduct({supabase}) {
    return {

        // Verificação das variaveis que serão usadas para criar o produto
        // Variable verification 
        async create({name, description, price, currency="brl", images, pdf}) {


            // name
            const nameTrimmed = name.trim()
            if(!nameTrimmed) throw Object.assign(new Error("NAME_REQUIRED"), {status:400})

            // price
            const price_cents = stringMoneyToIntCents(price)
            if(!price_cents) throw Object.assign(new Error("INVALID_PRICE"), {status:400})

            // pdf  
            if(!pdf) throw Object.assign(new Error("PDF_REQUIRED"), {status:400})

            // img
            if(!images) throw Object.assign(new Error("IMAGES_REQUIRED"), {status:400})

            // como "description não é NOT NULL, não é necessário verificar"
            // since "description isnt NOT NULL, don't need verification"


            // Inserindo o produto no DB - Inserting product into DB
            const {data: created, error: productError } = await supabase
                .from("products")
                .insert({
                    name: nameTrimmed,
                    description: description?.trim() || null,
                    price_cents,
                    currency,
                    is_active: true,
                    file_path: null
                })
                .select("id")
                .single();
            
            if(productError) throw Object.assign(new Error("PRODUCT_INSERT_ERROR"), {status: 500, cause: productError});

            const productId = created.id;

            const uploadedImagePath =[];
            let uploadedPdfPath = null;


            // UPLOADS
            try {
                {

                    // Upload PDF -> PRIVATE BUCKET (SUPABASE)
                    const extension = extFromFile(pdf.mimetype, pdf.originalname);
                    const path = `${productId}/file.${extension}`;

                    const {error: uploadError} = await supabase.storage
                        .from("product-files")
                        .upload(path, pdf.buffer, {contentType: pdf.mimetype, upsert: true});

                    if(uploadError) throw Object.assign(new Error("PDF_UPLOAD_ERROR"), {status: 500, cause: uploadError})

                    uploadedPdfPath = path;

                    const {error: updateError} = await supabase
                        .from("products")
                        .update({file_path: uploadedPdfPath})
                        .eq("id", productId)

                    if (updateError) throw Object.assign(new Error("PDF_UPDATE_ERROR"), {status: 500, cause: updateError})
                }

                // Upload IMG's -> PUBLIC BUCKET (SUPABASE)
                for (let i=0; i< images.length;i++){
                    const img = images[i];
                    const extension = extFromFile(img.mimetype, img.originalname);
                    const fileName = i === 0 ? `cover.${extension}` : `${String(i).padStart(2,"0")}.${extension}`;

                    const path = `${productId}/${fileName}`;

                    const {error: uploadError} = await supabase.storage
                        .from("product-images")
                        .upload(path, img.buffer, {contentType: img.mimetype, upsert: true})

                    
                    if (uploadError) throw Object.assign(new Error("IMG_UPLOAD_ERROR"), {status: 500, cause: uploadError})

                    uploadedImagePath.push(path)
                }


                // INSERT -> product_images (SUPABASE)
                const rows = uploadedImagePath.map((path, idx) => ({
                    product_id: productId,
                    path,
                    is_cover: idx === 0,
                    sort_order: idx
                }))

                const {error: imageError} = await supabase.from("product_images").insert(rows)

                if (imageError) throw Object.assign(new Error("IMAGES_INSERT_ERROR"), {status: 500, cause: imageError})

                return {productId}
            } catch(e){
                // rollback

                try {
                    if(uploadedImagePath.length) {
                        await supabase.storage.from("product-images")
                    }
                    if(uploadedPdfPath){
                        await supabase.storage.from("product-files")
                    }
                    await supabase.from("product_images").delete().eq("product_id", productId)
                    await supabase.from("products").delete().eq("id", productId)
                } catch (rollbackError) {
                    console.log("Rollback error: ", rollbackError)
                }
                throw e
            }
        }
    }
}