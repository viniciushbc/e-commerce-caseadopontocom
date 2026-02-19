// Cria um cliente do supabase para podermos consultar a tabela "products"
// Create a supabase cliente so we can access the "products" table


// Importamos createClient do supabase e configuramos com as variaveis do projeto
// Import createClient from supabase and configure it with the environment variables
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
)

// E entao chamaremos supabase() daqui em diante
// So we are going to call supabase() from now on 