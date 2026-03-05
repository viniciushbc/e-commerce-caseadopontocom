import dotenv from "dotenv";
import express from "express";
import Stripe from "stripe";
import path from "path";
import { fileURLToPath } from "url";

import { makeSupabaseAdmin } from "./services/supabaseAdmin.js";
import { adminAuth } from "./middlewares/adminAuth.js";
import { adminRoutes } from "./routes/admin.routes.js";

import { productRepo } from "./repositories/productTable.repo.js";
import { productImageRepo } from "./repositories/productImageTable.repo.js";
import { productFileStorageRepo } from "./repositories/productFileStorage.repo.js";
import { productImageStorageRepo } from "./repositories/productImageStorage.repo.js";
import { adminCreateProduct } from "./services/adminCreateProduct.service.js";

import { buildStripeLineItems } from "./utils/buildStripeLineItems.js";

// __dirname (ESM)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Carrega o .env do backend (backend/.env)
dotenv.config({ path: path.resolve(__dirname, "../.env") });
const supabaseAdmin = makeSupabaseAdmin();

// Stripe
const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);

// App
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Repos
const productsDb = productRepo(supabaseAdmin);
const imagesDb = productImageRepo(supabaseAdmin);
const fileStorage = productFileStorageRepo(supabaseAdmin);
const imageStorage = productImageStorageRepo(supabaseAdmin);

// Services
const adminCreateProductService = adminCreateProduct({
  productRepo: productsDb,
  productImageRepo: imagesDb,
  productFileStorageRepo: fileStorage,
  productImageStorageRepo: imageStorage,
});

// Routes
app.use("/api/admin", adminRoutes({ adminCreateProductService }));

// Admin page (protected)
app.get("/admin", adminAuth, (req, res) => {
  res.sendFile(path.join(__dirname, "public", "admin.html"));
});



// Stripe Checkout
app.post("/api/create-checkout-session", async (req, res) => {
  try {
    const { items } = req.body;

    if (!items?.length) {
      return res.status(400).json({ error: "Carrinho vazio" });
    }

    const ids = items.map((i) => i.productId)
    const products = await productsDb.findActiveByIds(ids)
    const line_items = buildStripeLineItems(products)    

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      success_url: `${process.env.DOMAIN_URL}:${process.env.WEB_PORT}/return.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.DOMAIN_URL}:${process.env.WEB_PORT}/index.html`,
    });

    return res.send({ url: session.url });
  } catch (err) {
    console.error("create-checkout-session route error:", err);
    return res.status(500).json({ error: err.message });
  }
});

// Post - conferir itens do carrinho
app.post("/api/cart/products", async(req, res) => {
  const {ids} = req.body
  const activeProducts = await productsDb.findActiveByIds(ids)

  return res.send({
    status: 200,
    activeProducts
  })
})


// Get - Consultar itens do supabase
app.get("/api/products", async (req, res)=> {
  const produtos = await productsDb.getProducts()
  return res.send({
    status: 200,
    produtos
  })
})








app.get("/session-status", async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

  res.send({
    status: session.status,
    customer_email: session.customer_details?.email,
  });
});

// Start
app.listen(process.env.API_PORT, () => {
  console.log("Ouvindo na porta:", process.env.API_PORT);
});