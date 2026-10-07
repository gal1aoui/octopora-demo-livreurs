// Heure d'arrivée estimée, partagée avec le destinataire.
const HOUR = new Intl.DateTimeFormat("fr-FR", { hour: "2-digit", minute: "2-digit", timeZone: "Africa/Tunis" });

export function estimateArrival(now, { remainingStops, minutesPerStop = 12, driveMinutes = 0 }) {
  const minutes = driveMinutes + Math.max(0, remainingStops - 1) * minutesPerStop;
  return new Date(new Date(now).getTime() + minutes * 60_000);
}

// On arrondit aux cinq minutes supérieures : mieux vaut annoncer un peu tard que trop tôt.
export function roundUpToFive(date) {
  const step = 5 * 60_000;
  return new Date(Math.ceil(date.getTime() / step) * step);
}

export function formatEta(date) {
  return `vers ${HOUR.format(roundUpToFive(date))}`;
}
