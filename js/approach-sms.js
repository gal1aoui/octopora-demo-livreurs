// SMS "livraison en approche" : envoyé quand le livreur est à deux arrêts du destinataire.
export const STOPS_AHEAD = 2;

export function stopToNotify(stops, currentOrdre) {
  return (
    stops.find(
      (stop) => stop.ordre === currentOrdre + STOPS_AHEAD && stop.statut === "a_livrer" && Boolean(stop.telephone),
    ) ?? null
  );
}

export function approachMessage(stop, driverName) {
  const slot = stop.creneau ? ` Créneau prévu : ${stop.creneau.replace("-", " à ")}.` : "";
  return `Bonjour ${stop.destinataire}, ${driverName} arrive dans environ deux arrêts.${slot}`;
}
