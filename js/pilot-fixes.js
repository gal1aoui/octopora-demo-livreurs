// Corrections du lot 1 des retours du pilote.

// Retour 1 : un numéro avec des espaces ne s'ouvrait pas dans l'application d'appel.
export function telHref(phone) {
  if (!phone) {
    return null;
  }
  return `tel:${phone.replace(/[\s.-]/g, "")}`;
}

// Retour 2 : un échec de livraison sans motif rendait le rapport du soir illisible.
export function failureReason(motif) {
  const clean = (motif ?? "").trim();
  if (clean === "") {
    throw new RangeError("Le motif de l'échec est obligatoire");
  }
  return clean;
}
