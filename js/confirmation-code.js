// Colis de valeur : le destinataire donne le code reçu par SMS avant la remise.
export function generateConfirmationCode(random = Math.random) {
  return String(Math.floor(random() * 10_000)).padStart(4, "0");
}

export function verifyConfirmationCode(expected, typed) {
  const clean = String(typed ?? "").replace(/\s/g, "");
  return clean.length === expected.length && clean === expected;
}

export function requiresConfirmation(stop, thresholdDt = 200) {
  return Number(stop.valeur_dt ?? 0) >= thresholdDt;
}
