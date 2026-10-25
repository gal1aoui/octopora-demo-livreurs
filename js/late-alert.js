// Alerte de retard : un arrêt à livrer est en retard quand la fin de son créneau est dépassée.
const CLOCK = new Intl.DateTimeFormat("fr-FR", {
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
  timeZone: "Africa/Tunis",
});

export function minutesOfDay(date) {
  const parts = CLOCK.formatToParts(date);
  const hours = Number(parts.find((part) => part.type === "hour").value);
  const minutes = Number(parts.find((part) => part.type === "minute").value);
  return hours * 60 + minutes;
}

function slotEnd(creneau) {
  const [hours, minutes] = creneau.split("-")[1].split(":").map(Number);
  return hours * 60 + minutes;
}

export function lateStops(stops, now) {
  const current = minutesOfDay(now);
  return stops.filter((stop) => stop.statut === "a_livrer" && stop.creneau && slotEnd(stop.creneau) < current);
}

export function lateAlert(livreur, stops, now) {
  const late = lateStops(stops, now);
  if (late.length === 0) {
    return null;
  }
  const plural = late.length > 1 ? "s" : "";
  return `${livreur} a ${late.length} arrêt${plural} en retard (premier : ${late[0].destinataire}).`;
}
