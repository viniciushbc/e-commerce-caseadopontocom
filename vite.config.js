import { defineConfig, loadEnv } from "vite";
import { resolve } from "path";

export default defineConfig({
  root: resolve(__dirname, "frontend"),
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true
      },
    },
  },
  build: {
    outDir: resolve(__dirname, "frontend/dist"),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "frontend/index.html"),
        cart: resolve(__dirname, "frontend/cart.html"),
        checkout: resolve(__dirname, "frontend/checkout.html"),
        ret: resolve(__dirname, "frontend/return.html"),
      },
    },
  },
});