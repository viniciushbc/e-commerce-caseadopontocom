// Função para buscar os produtos no DB
// Function o consult the products from DB


// Vou usar essa função quando o frontend fizer a requisição de checkout, para verificar se os itens do carrinho constam no DB, para poder prosseguir com o checkout


export function searchProductsDB(supabase){
    return {

        // Função para checar os produtos ativos no DB, através do ID
            // Deve retornar um array de objetos (Id's dos produtos)
        // Function to check the active products in DB through the ID
            // Shall return an array of objects (Products id's)

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
            const {data, error} = await supabase.from("products").select("id,price_cents,name,currency,file_path").eq("is_active", true).in("id", uniqueIDs);

            if (error) throw new Error("DB_PRODUCTS_QUERY_FAILED")

            
            return (data ?? [])

        }
    }
}