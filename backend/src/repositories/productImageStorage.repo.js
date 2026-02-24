import { extFromFile } from "../utils/files.js";

export function productImageStorageRepo(supabase) {

    return {

        // UPLOAD
        async uploadImages({productId, images}) {
            console.log("IMG REPO received:", {
    productId,
    imagesIsArray: Array.isArray(images),
    len: images?.length,
    firstMimetype: images?.[0]?.mimetype
  });
            const uploadedPaths = [];

            for (let i=0 ; i< images.length ; i++){
                const img = images[i];

                const imgExtension = extFromFile(img.mimetype, img.originalname)

                const fileName = `${String(i).padStart(2, "0")}.${imgExtension}`;

                const storagePath = `${productId}/${fileName}`;

                const {error} = await supabase.storage
                    .from("product-images")
                    .upload(storagePath, img.buffer, {
                        contentType: img.mimetype,
                        upsert: true,
                    });

                if (error) throw Object.assign(new Error("STORAGE_IMAGES_UPLOAD_FAILED"), {cause: error})

                uploadedPaths.push(storagePath)

            }
            return uploadedPaths;
        },


        // DELETE
        async removeImages(paths) {
            if (!paths?.length) return

            const {error} = await supabase.storage
                .from("product-images")
                .remove(paths)

            if(error) throw Object.assign(new Error("STORAGE_IMAGES_DELETE_FAILED"), {cause: error})
        }
    }
}