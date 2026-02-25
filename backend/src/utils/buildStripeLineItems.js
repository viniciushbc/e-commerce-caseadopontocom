export function buildStripeLineItems(products) {
  return products.map((p) => ({
    quantity: 1,
    price_data: {
      currency: p.currency || "brl",
      unit_amount: p.price_cents,
      product_data: {
        name: p.name,
      },
    },
  }));
}