export function productImagesRepo(supabase) {
    return {
        async insertManyImagesToImagesTable(rows){
            const {error} = await supabase.from("product_images").insert(rows);

            if (error) throw Object.assign(new Error("DB_IMAGES_INSERT_FAILED"), {cause: error})
            
        },

        async deleteProductById(id){
            await supabase.from("product_images").delete().eq("product_id",id)
        }
    }
}

