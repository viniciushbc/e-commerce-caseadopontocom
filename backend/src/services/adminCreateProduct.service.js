import { productDataValidation } from "../utils/productDataValidation.js";

export function adminCreateProduct({
    productRepo,                    // table "products"
    productImageRepo,               // table "product_images"
    productFileStorageRepo,         // storage "product-files"
    productImageStorageRepo,        // storage "product-images"
}) {

    return {

        async create(payload) {

            const {name, description, price_cents, currency, images, pdf} = productDataValidation(payload);
            const productCreated = await productRepo.insertProduct({
                name,
                description,
                price_cents,
                currency,
                is_active: true,
                file_path: null
            })

            const productId = productCreated.id;

            let uploadedPdfPath = null;
            let uploadedImagePaths = [];

            try {
                // Upload PDF
                uploadedPdfPath = await productFileStorageRepo.uploadPdf({productId, pdf}); // Retorna o caminho do pdf carregado no storage
                await productRepo.updateFilePath(productId, uploadedPdfPath) // Adiciona o caminho do produto na tabela "products" 


                // Upload Images
                uploadedImagePaths = await productImageStorageRepo.uploadImages({productId, images});

                // Criando as linhas para inserir na tabela "product_images"
                const rows = uploadedImagePaths.map((path, idx) => ({
                    product_id: productId,
                    path,
                    is_cover: idx === 0,
                    sort_order: idx
                }))

                await productImageRepo.insertManyImagesToImagesTable(rows);


                return { productId }
            } catch (e) {
                // Storage
                await productImageStorageRepo.removeImages(uploadedImagePaths);
                await productFileStorageRepo.removePdf(uploadedPdfPath);


                // Database
                await productImageRepo.deleteProductImagesById(productId);
                await productRepo.deleteById(productId);

                throw e;
            }
            
        }
    }
}