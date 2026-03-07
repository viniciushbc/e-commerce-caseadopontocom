/**
 * Mapa de slugs de categoria para label legivel.
 * Nota: "geral" (cadastros antigos) e mapeado para "Diversos"
 */
export const CATEGORIES = {
  natal:    { label: "Natal",    parent: "Projetos Digitais" },
  pascoa:   { label: "Páscoa",  parent: "Projetos Digitais" },
  boneca:   { label: "Boneca",  parent: "Projetos Digitais" },
  kits:     { label: "Kits",    parent: null },
  diversos: { label: "Diversos", parent: null },
  geral:    { label: "Diversos", parent: null }, // legado: exibido como Diversos
};

/** Retorna o label legivel de uma categoria */
export function getCategoryLabel(slug) {
  return CATEGORIES[slug]?.label ?? (slug ? slug.charAt(0).toUpperCase() + slug.slice(1) : "Produto");
}

/** Retorna a descricao de uma categoria para o banner */
export const CATEGORY_DESCRIPTIONS = {
  natal:    "Projetos digitais com tema natalino para enfeitar sua casa",
  pascoa:   "Bonecas e projetos especiais para a Páscoa",
  boneca:   "Projetos exclusivos de bonecas artesanais",
  kits:     "Kits completos para você criar suas peças",
  diversos: "Outros produtos e projetos especiais",
  geral:    "Outros produtos e projetos especiais",
};
