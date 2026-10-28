// Bilan du soir envoyé au client : une ligne par livreur, puis le total.
import { formatHour } from "./report.js";

export function eveningSummary(jour, rows) {
  const [year, month, day] = jour.split("-");
  const lines = rows.map(
    (row) => `- ${row.livreur} : ${row.livres}/${row.arrets} livrés, ${row.echecs} échec(s), dernière livraison à ${formatHour(row.derniere_livraison)}`,
  );
  const delivered = rows.reduce((sum, row) => sum + row.livres, 0);
  const total = rows.reduce((sum, row) => sum + row.arrets, 0);
  return [`Bilan des livraisons du ${day}/${month}/${year}`, ...lines, `Total : ${delivered} livraisons sur ${total} arrêts.`].join("\n");
}
