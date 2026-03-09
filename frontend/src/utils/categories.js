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

/** Icones por categoria (4 opcoes cada — rodizio aleatorio por carregamento) */
export const CATEGORY_ICONS = {
  natal:    [
    "/images/category_icons/Natal/arvore_de_natal.png",
    "/images/category_icons/Natal/boneco_de_neve.png",
    "/images/category_icons/Natal/bota_de_natal.png",
    "/images/category_icons/Natal/papai_noel_saco.png",
  ],
  pascoa:   [
    "/images/category_icons/Pascoa/coelho_cenoura.png",
    "/images/category_icons/Pascoa/coelho_no_ovo.png",
    "/images/category_icons/Pascoa/coelho_ovo_mochila.png",
    "/images/category_icons/Pascoa/coelhos_cesta.png",
  ],
  boneca:   [
    "/images/category_icons/Boneca/boneca_bailarina.png",
    "/images/category_icons/Boneca/boneca_bebe.png",
    "/images/category_icons/Boneca/boneca_pano_ursinho.png",
    "/images/category_icons/Boneca/boneca_princesa_varinha.png",
  ],
  kits:     [
    "/images/category_icons/Kits/kit_bolsa_projeto.png",
    "/images/category_icons/Kits/kit_tecidos_patchwork.png",
    "/images/category_icons/Kits/kit_ursinho_projeto.png",
    "/images/category_icons/Kits/kit_vestido_projeto.png",
  ],
  diversos: [
    "/images/category_icons/Diversos/diversos_bordado_bastidor.png",
    "/images/category_icons/Diversos/diversos_cesta_costura.png",
    "/images/category_icons/Diversos/diversos_maquina_costura.png",
    "/images/category_icons/Diversos/diversos_patchwork_cesta.png",
  ],
};

/** Retorna uma URL de icone aleatorio para a categoria */
export function getCategoryIcon(slug) {
  const icons = CATEGORY_ICONS[slug] ?? CATEGORY_ICONS.diversos;
  return icons[Math.floor(Math.random() * icons.length)];
}

/** Botoes PNG decorativos da pasta /images/icons (rodizio aleatorio) */
export const BUTTON_ICONS = [
  "/images/icons/botao_01.png",
  "/images/icons/botao_02.png",
  "/images/icons/botao_03.png",
  "/images/icons/botao_04.png",
  "/images/icons/botao_05.png",
  "/images/icons/botao_06.png",
  "/images/icons/botao_07.png",
  "/images/icons/botao_08.png",
];

/** Retorna uma URL aleatoria de botao decorativo */
export function getButtonIcon() {
  return BUTTON_ICONS[Math.floor(Math.random() * BUTTON_ICONS.length)];
}

/** Imagens artesanais grandes para decoracao do hero (rodizio aleatorio) */
export const BIGGER_DETAILS = [
  "/images/bigger_details/alfineteiro_linhas_botoes_trim.png",
  "/images/bigger_details/maquina_costura_trim.png",
  "/images/bigger_details/coracao_agulha_trim.png",
  "/images/bigger_details/tesoura_tecidos_trim.png",
];

/** Retorna uma URL aleatoria de bigger_detail, evitando repetir a anterior */
export function getBiggerDetail(exclude) {
  const pool = BIGGER_DETAILS.filter(x => x !== exclude);
  return pool[Math.floor(Math.random() * pool.length)];
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
