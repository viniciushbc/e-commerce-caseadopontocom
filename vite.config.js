import { defineConfig } from "vite";
import { resolve } from "path";

const r = (p) => resolve(process.cwd(), p);

export default defineConfig({
  root: r("frontend"),

  server: {
    port: 5000,
    strictPort: true,
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
      "/session-status": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },

  build: {
    outDir: r("frontend/dist"),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main:     r("frontend/index.html"),
        category: r("frontend/category.html"),
        product:  r("frontend/product.html"),
        cart:     r("frontend/cart.html"),
        ret:      r("frontend/return.html"),
      },
    },
  },
});