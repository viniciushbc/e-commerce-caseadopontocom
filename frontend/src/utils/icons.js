/**
 * Utilitario de icones SVG para o site Caseado.com
 * Fonte: Lucide Icons (https://lucide.dev) + icones artesanais customizados
 * Uso: inline em innerHTML para evitar dependencias de DOM
 */

const BASE = `xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"`;

/** Cria um SVG Lucide com tamanho configuravel */
function svg(size, paths) {
  return `<svg ${BASE} width="${size}" height="${size}" viewBox="0 0 24 24">${paths}</svg>`;
}

/* --- Icones de interface (Lucide) --- */

export const iconCart = (size = 18) => svg(size,
  `<circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/>
   <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>`
);

export const iconCartPlus = (size = 16) => svg(size,
  `<circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/>
   <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
   <path d="M12 9v6m-3-3h6"/>`
);

export const iconMenu = (size = 22) => svg(size,
  `<line x1="4" y1="12" x2="20" y2="12"/>
   <line x1="4" y1="6"  x2="20" y2="6"/>
   <line x1="4" y1="18" x2="20" y2="18"/>`
);

export const iconX = (size = 22) => svg(size,
  `<path d="M18 6 6 18M6 6l12 12"/>`
);

export const iconChevronDown = (size = 14) => svg(size,
  `<path d="m6 9 6 6 6-6"/>`
);

export const iconTrash = (size = 16) => svg(size,
  `<polyline points="3 6 5 6 21 6"/>
   <path d="m19 6-.867 12.142A2 2 0 0 1 16.138 20H7.862a2 2 0 0 1-1.995-1.858L5 6"/>
   <path d="M10 11v6M14 11v6M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>`
);

export const iconArrowLeft = (size = 18) => svg(size,
  `<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>`
);

export const iconCheck = (size = 16) => svg(size,
  `<polyline points="20 6 9 17 4 12"/>`
);

export const iconEye = (size = 15) => svg(size,
  `<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
   <circle cx="12" cy="12" r="3"/>`
);

export const iconTag = (size = 14) => svg(size,
  `<path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"/>
   <circle cx="7.5" cy="7.5" r=".5" fill="currentColor"/>`
);

export const iconPackage = (size = 48) => svg(size,
  `<path d="m7.5 4.27 9 5.15"/>
   <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/>
   <path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>`
);

export const iconGift = (size = 20) => svg(size,
  `<polyline points="20 12 20 22 4 22 4 12"/>
   <rect x="2" y="7" width="20" height="5"/>
   <line x1="12" y1="22" x2="12" y2="7"/>
   <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/>
   <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>`
);

export const iconLayers = (size = 20) => svg(size,
  `<polygon points="12 2 2 7 12 12 22 7 12 2"/>
   <polyline points="2 17 12 22 22 17"/>
   <polyline points="2 12 12 17 22 12"/>`
);

export const iconHome = (size = 18) => svg(size,
  `<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
   <polyline points="9 22 9 12 15 12 15 22"/>`
);

/* --- Icones de artesanato customizados --- */

/** Tesoura de artesanato (Lucide Scissors) */
export const iconScissors = (size = 20) => svg(size,
  `<circle cx="6" cy="6" r="3"/>
   <circle cx="6" cy="18" r="3"/>
   <line x1="20" y1="4" x2="8.12" y2="15.88"/>
   <line x1="14.47" y1="14.48" x2="20" y2="20"/>
   <line x1="8.12" y1="8.12" x2="12" y2="12"/>`
);

/** Botao de costura (4 furos) — decoracao artesanal */
export const iconSewingButton = (size = 28, cls = "") =>
  `<svg width="${size}" height="${size}" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5" class="${cls}">
    <circle cx="16" cy="16" r="14"/>
    <circle cx="16" cy="16" r="9" stroke-dasharray="3 2"/>
    <circle cx="11" cy="11" r="2.5" fill="currentColor" stroke="none"/>
    <circle cx="21" cy="11" r="2.5" fill="currentColor" stroke="none"/>
    <circle cx="11" cy="21" r="2.5" fill="currentColor" stroke="none"/>
    <circle cx="21" cy="21" r="2.5" fill="currentColor" stroke="none"/>
  </svg>`;

/** Agulha com linha — decoracao artesanal */
export const iconNeedle = (size = 24, cls = "") =>
  `<svg width="${size}" height="${size * 2}" viewBox="0 0 20 40" fill="none" stroke="currentColor" stroke-width="1.5" class="${cls}">
    <ellipse cx="10" cy="20" rx="2" ry="18"/>
    <ellipse cx="10" cy="34" rx="3" ry="4.5" stroke-width="1.2"/>
    <path d="M10 38.5 Q17 40 19 36" stroke-width="1.2"/>
  </svg>`;

/** Carretel de linha — icone artesanal */
export const iconSpool = (size = 32, cls = "") =>
  `<svg width="${size}" height="${size}" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5" class="${cls}">
    <rect x="4" y="8" width="24" height="16" rx="3"/>
    <rect x="8" y="4" width="16" height="6" rx="2"/>
    <rect x="8" y="22" width="16" height="6" rx="2"/>
    <line x1="10" y1="14" x2="22" y2="14" stroke-dasharray="2 2"/>
    <line x1="10" y1="18" x2="22" y2="18" stroke-dasharray="2 2"/>
  </svg>`;
