import assert from "node:assert/strict";
import { test } from "node:test";
import { formatHour } from "./report.js";

test("un arrêt livré à 13 h 05 UTC s'affiche à 14:05, l'heure de Tunis", () => {
  assert.equal(formatHour("2026-10-30T13:05:00Z"), "14:05");
});

test("affiche un tiret quand le livreur n'a encore rien livré", () => {
  assert.equal(formatHour(null), "–");
});
