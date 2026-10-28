import assert from "node:assert/strict";
import { test } from "node:test";
import { eveningSummary } from "./evening-summary.js";

const rows = [
  { livreur: "Karim B.", arrets: 4, livres: 2, echecs: 0, derniere_livraison: "2026-10-30T08:15:00Z" },
  { livreur: "Nadia S.", arrets: 2, livres: 1, echecs: 1, derniere_livraison: null },
];

test("le bilan commence par la date du jour", () => {
  assert.match(eveningSummary("2026-10-30", rows), /^Bilan des livraisons du 30\/10\/2026/);
});

test("l'heure de dernière livraison est celle de Tunis", () => {
  assert.match(eveningSummary("2026-10-30", rows), /Karim B\. : 2\/4 livrés, 0 échec\(s\), dernière livraison à 09:15/);
});

test("le total additionne tous les livreurs", () => {
  assert.match(eveningSummary("2026-10-30", rows), /Total : 3 livraisons sur 6 arrêts\./);
});
