// Funcoes para manipular imagens da tabela "product_images" (Adicionar e Remover)
// Functions to manipulate images from the "product_images" table (Add and delete)

export function productImageRepo(supabase) {
    return {
        async insertManyImagesToImagesTable(rows){
            const {error} = await supabase.from("product_images").insert(rows);

            if (error) throw Object.assign(new Error("DB_IMAGES_INSERT_FAILED"), {cause: error})   
        },

        async deleteProductImagesById(id){
            const {error} = await supabase.from("product_images").delete().eq("product_id",id)

            if (error) throw Object.assign(new Error("DB_IMAGES_DELETE_FAILED"), {cause: error})  
        }
    }
}

