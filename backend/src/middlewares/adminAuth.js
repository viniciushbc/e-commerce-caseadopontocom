// Middleware de autenticação do ADMIN para criação de produtos
// Middleware to athenticate ADMIN to create products

export function adminAuth(req, res, next){

    // Busca o campo authorization no header da req
    // Search for authorization field in the header
    const header = req.headers.authorization || "";


    // Não autorizado -- Unauthorized (401)
    if(!header.startsWith("Basic")) {
        res.setHeader("WWW-Authenticate", "Basic");
        return res.status(401).end();
    }

    const decoded = Buffer.from(header.slice(5), "base64").toString("utf-8");
    const[user, pass] = decoded.split(":")


    // Proibido - Forbidden (403)
    if(user !== process.env.ADMIN_USER || pass !== process.env.ADMIN_PASS) {
        return res.status(403).json({error: "Acesso negado"})
    }

    next();
}