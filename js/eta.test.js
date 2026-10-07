import assert from "node:assert/strict";
import { test } from "node:test";
import { estimateArrival, formatEta, roundUpToFive } from "./eta.js";

const now = "2026-10-30T08:00:00Z";

test("le prochain arrêt est atteint après le trajet seulement", () => {
  const eta = estimateArrival(now, { remainingStops: 1, driveMinutes: 7 });
  assert.equal(eta.toISOString(), "2026-10-30T08:07:00.000Z");
});

test("chaque arrêt intermédiaire ajoute sa durée de service", () => {
  const eta = estimateArrival(now, { remainingStops: 3, driveMinutes: 10, minutesPerStop: 12 });
  assert.equal(eta.toISOString(), "2026-10-30T08:34:00.000Z");
});

test("arrondit aux cinq minutes supérieures", () => {
  assert.equal(roundUpToFive(new Date("2026-10-30T08:07:00Z")).toISOString(), "2026-10-30T08:10:00.000Z");
});

test("annonce l'heure de Tunis (UTC+1)", () => {
  assert.match(formatEta(new Date("2026-10-30T08:07:00Z")), /^vers 09[:h ]10$/);
});
