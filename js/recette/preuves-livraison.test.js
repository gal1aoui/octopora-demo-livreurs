import assert from "node:assert/strict";
import { test } from "node:test";
import { formatHour, reportRow } from "../report.js";

test("recette : l'heure d'une preuve s'affiche à l'heure de Tunis", () => {
  assert.match(formatHour("2026-10-30T07:42:00Z"), /08[:h ]42/);
});

test("recette : une livraison sans preuve n'a pas d'heure", () => {
  assert.equal(formatHour(null), "–");
});

test("recette : la ligne du rapport rattache les livraisons au bon livreur", () => {
  const row = reportRow({ livreur: "Nadia S.", arrets: 2, livres: 1, echecs: 1, premiere_livraison: "2026-10-30T06:58:00Z", derniere_livraison: "2026-10-30T06:58:00Z" });
  assert.match(row, /Nadia S\./);
  assert.match(row, /1\/2/);
});
