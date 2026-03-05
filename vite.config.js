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
    },
  },

  build: {
    outDir: r("frontend/dist"),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: r("frontend/index.html"),
        cart: r("frontend/cart.html"),
        checkout: r("frontend/checkout.html"),
        ret: r("frontend/return.html"),
      },
    },
  },
});