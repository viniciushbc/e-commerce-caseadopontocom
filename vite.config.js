import { defineConfig, loadEnv } from "vite";

export default defineConfig( ({mode}) => {
    const env = loadEnv(mode, process.cwd(), "");

    // Me permite acessar o front com a WEB_PORT e o back-end com a API_PORT
    // Allows me to access the front-end via WEB_PORT, and back-end via API_PORT
    return {
        root: "public",
        envDir: "../",
        server : {
            port: process.env.WEB_PORT,
            proxy: {
                // Toda rota "/api" vai pro back-end (porta 3000)
                // Every route "/api" goes to the back-end (PORT 3000) 
                "/api": `${process.env.DOMAIN_URL}:${process.env.API_PORT}`
            },
        },
        build: {
            outDir: "../dist",
            emptyOutDir: true,
        },
    }
})