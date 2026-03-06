import express from 'express'
import { adminAuth } from '../middlewares/adminAuth.js';
import { upload } from '../services/multer.js';

export function adminRoutes({ adminCreateProductService}) {

    // Criando uma rota pro admin
    const router = express.Router();


    router.post(
        "/products",
        adminAuth,
        upload.fields([
            {name: "images", maxCount: 10},
            {name: "file", maxCount: 1}
        ]),
        async (req, res) => {
            try {

                // 
                const {name, category, description, price, currency} = req.body
                const images = req.files?.images || [];
                const pdf = req.files?.file?.[0];
                const result = await adminCreateProductService.create({
                    name,
                    category,
                    description,
                    price,
                    currency: currency || "brl",
                    images,
                    pdf
                })

                return res.status(201).json(result)
            } catch (e) {
                const status = e.status || 500

                const msg =
                    e.message === "NAME_REQUIRED" ? "Nome é obrigatório" :
                    e.message === "CATEGORY_REQUIRED" ? "Categoria é obrigatória" :
                    e.message === "PRICE_INVALID" ? "Preço inválido" :
                    e.message === "PDF_REQUIRED" ? "PDF é obrigatório" :
                    e.message === "IMAGES_REQUIRED" ? "Envie ao menos 1 imagem" :
                    "Erro ao cadastrar produto";

                    console.error("admin/products error:", e.message, e.cause || "");
                    return res.status(status).json({ error: msg });
            }
        }
    )

    return router;
}