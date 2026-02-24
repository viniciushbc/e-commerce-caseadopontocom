import { createClient } from "@supabase/supabase-js";

export const supabaseAdmin = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
)

// E entao chamaremos supabaseAdmin() daqui em diante
// So we are going to call supabaseAdmin() from now on 