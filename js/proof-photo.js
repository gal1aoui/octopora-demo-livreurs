// Photo du colis déposé, jointe à la livraison.
const DAY = new Intl.DateTimeFormat("sv-SE", { timeZone: "Africa/Tunis", dateStyle: "short", timeStyle: "medium" });
const MAX_BYTES = 5 * 1024 * 1024;
const TYPES = ["image/jpeg", "image/png"];

export function proofFileName(stop, takenAt) {
  const stamp = DAY.format(new Date(takenAt)).replace(/[-: ]/g, "");
  return `preuve-arret${stop.id}-${stamp}.jpg`;
}

export function validatePhoto({ size, type }) {
  if (!TYPES.includes(type)) return { ok: false, reason: "Format non pris en charge (JPEG ou PNG)." };
  if (size > MAX_BYTES) return { ok: false, reason: "Photo trop lourde (5 Mo maximum)." };
  return { ok: true };
}
