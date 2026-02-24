// Funcao para descobrir as extensoes do arquivos enviados pelo admin
// Function to discover the extensions from the files uploaded by the admin

export function extFromFile(mimetype, originalname) {
  const fallback = (originalname.split(".").pop() || "").toLowerCase();
  if (mimetype === "application/pdf") return "pdf";
  if (mimetype === "image/png") return "png";
  if (mimetype === "image/jpeg") return "jpg";
  return fallback || "bin";
}

