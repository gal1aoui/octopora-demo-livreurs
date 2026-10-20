// Reçu envoyé par SMS après un paiement. La date se lit à l'heure de Tunis.
const DATE = new Intl.DateTimeFormat("fr-FR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Africa/Tunis",
});

const MODES = { especes: "espèces", carte: "carte" };

function dinars(millimes) {
  return `${Math.floor(millimes / 1000)},${String(millimes % 1000).padStart(3, "0")} DT`;
}

export function receiptSms({ reference, mode, amountMillimes, paidAt }) {
  return `Reçu ${reference} : ${dinars(amountMillimes)} payés en ${MODES[mode]} le ${DATE.format(new Date(paidAt))}. Merci !`;
}
