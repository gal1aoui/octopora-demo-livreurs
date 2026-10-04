// Notification push envoyée au livreur quand sa tournée change.
const TITLES = {
  ajout: "Nouvel arrêt",
  retrait: "Arrêt retiré",
  deplacement: "Arrêt déplacé",
};

export function roundChangeNotification(change) {
  const title = TITLES[change.type];
  if (!title) {
    throw new RangeError(`Type de changement inconnu : ${change.type}`);
  }
  const where = change.ordre ? ` (arrêt n° ${change.ordre})` : "";
  return {
    title,
    body: `${change.destinataire}${where}`,
    tag: `tournee-${change.tourneeId}`,
    data: { tourneeId: change.tourneeId, url: "tournee.html" },
  };
}
