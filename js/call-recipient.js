// Appeler le destinataire sans afficher son numéro à l'écran.
export function callLink(phone) {
  const digits = String(phone ?? "").replace(/[^\d+]/g, "");
  return digits.length >= 8 ? `tel:${digits}` : null;
}

// Si le numéro doit quand même être montré (cas de secours), seuls les deux derniers chiffres sont lisibles.
export function maskPhone(phone) {
  const digits = String(phone ?? "").replace(/\D/g, "");
  if (digits.length < 4) return "";
  return `•••• •• ${digits.slice(-2)}`;
}
