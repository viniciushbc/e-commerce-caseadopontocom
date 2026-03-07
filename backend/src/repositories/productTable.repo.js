// Funções para manipular/consultar produtos da tabela "products"
// Functions to manipulate/consult products from "products" table

export function productRepo(supabase){
    return {

        // ADD (POST)
        async insertProduct({name, category, description, price_cents, currency, is_active, file_path}) {
            const {data, error} = await supabase
                .from("products")
                .insert({
                    name,
                    category,
                    description,
                    price_cents,
                    currency,
                    is_active,
                    file_path
                })
                .select("id")
                .single()

            if (error) throw Object.assign( new Error("DB_PRODUCT_INSERT_ERROR"), {status: 500, cause: error})
            
            return data // {id}
        },

        // UPDATE -- (Usar quando fizer upload de PDF) 
        async updateFilePath(productId, file_path){
            const {error} = await supabase
                .from("products")
                .update({file_path})
                .eq("id", productId)

            if (error) throw Object.assign(new Error("DB_PRODUCT_UPDATE_ERROR"), {status: 500, cause: error})
        },

        // DELETE
        async deleteById(productId){
            const {error} = await supabase
                .from("products")
                .delete()
                .eq("id", productId)
            
            if(error) throw Object.assign(new Error("DB_PRODUCT_DELETE_ERROR"), {status:500, cause:error})
        },

        // GET ALL (com categoria e imagens)
        async getProducts(){
            const {data, error} = await supabase
                .from("products")
                .select("id, name, description, price_cents, currency, category, is_active, product_images(path, is_cover, sort_order)")
                .eq("is_active", true)
                .order("name", {ascending: true})

            if(error) throw Object.assign(new Error("DB_PRODUCT_GET_ERROR"), {status: 500, cause: error})

            return data ?? []
        },

        // GET BY ID (produto individual com imagens)
        async getProductById(id){
            const {data, error} = await supabase
                .from("products")
                .select("id, name, description, price_cents, currency, category, is_active, product_images(path, is_cover, sort_order)")
                .eq("id", id)
                .eq("is_active", true)
                .single()

            if (error) {
                if (error.code === "PGRST116") return null
                throw Object.assign(new Error("DB_PRODUCT_GET_BY_ID_ERROR"), {status: 500, cause: error})
            }

            return data
        },

        // GET - WHERE IS_ACTIVE = 1
        // Vou usar essa função quando o frontend fizer a requisição de checkout, para verificar se os itens do carrinho constam no DB, para poder prosseguir com o checkout
        async findActiveByIds(ids){

            // Edge case, se os os ids não existirem
            // Edge case, if id's doesnt exist
            if (!Array.isArray(ids) || ids.length === 0) {
                return [];
            }
        
            // Transforma ids em um array sem repetidos
            // Transform ids into an array with no repetitive ids
            const uniqueIDs = [...new Set(ids)]

            // SELECT FROM DATABASE
            const {data, error} = await supabase
                .from("products")
                .select("id,price_cents,name,currency,file_path")
                .eq("is_active", true)
                .in("id", uniqueIDs);

            if (error) throw Object.assign(new Error("DB_PRODUCT_QUERY_ERROR"), {status:500, cause:error})

            
            return (data ?? [])

        }
    }
}