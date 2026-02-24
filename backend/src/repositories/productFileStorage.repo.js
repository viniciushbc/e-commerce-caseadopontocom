import { extFromFile } from "../utils/files.js";

export function productFileStorageRepo(supabase) {

    return {
        async uploadPdf({productId, pdfFile}) {

            console.log("PDF REPO received:", { productId, hasPdf: !!pdf, mimetype: pdf?.mimetype });
            const fileExtension = extFromFile(pdfFile.mimetype, pdfFile.originalname);
            const storagePath = `${productId}/file.${fileExtension}`

            const {error} = await supabase.storage
                .from("product-files")
                .upload(storagePath, pdfFile.buffer, {
                    contentType: pdfFile.mimetype,
                    upsert: true
                })
            
            if (error) throw Object.assign(new Error("STORAGE_PDF_UPLOAD_ERROR"), {status: 500, cause: error})

            return storagePath
        },

        async removePdf(path) {
            if (!path) return;

            const {error} = await supabase
                .from("product-files")
                .remove([path])

            if (error) throw Object.assign(new Error("STORAGE_PDF_REMOVE_ERROR"), {status: 500, cause: error})
        }
    }
}