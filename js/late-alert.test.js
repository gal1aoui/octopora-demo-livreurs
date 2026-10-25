import assert from "node:assert/strict";
import { test } from "node:test";
import { lateAlert, lateStops } from "./late-alert.js";

const stops = [
  { destinataire: "Pharmacie du Lac", creneau: "08:00-10:00", statut: "livre" },
  { destinataire: "Mme Haddad", creneau: "10:00-12:00", statut: "a_livrer" },
  { destinataire: "Atelier Sfax Couture", creneau: "14:00-18:00", statut: "a_livrer" },
];

// 11:30Z est 12:30 à Tunis : le créneau de Mme Haddad est dépassé.
const now = new Date("2026-10-30T11:30:00Z");

test("un arrêt à livrer dont le créneau est dépassé est en retard", () => {
  assert.deepEqual(lateStops(stops, now).map((stop) => stop.destinataire), ["Mme Haddad"]);
});

test("un arrêt déjà livré n'est jamais en retard", () => {
  assert.equal(lateStops([stops[0]], now).length, 0);
});

test("l'heure se lit à Tunis et non en UTC", () => {
  // 10:30Z est 11:30 à Tunis : le créneau 10:00-12:00 court encore.
  assert.equal(lateStops(stops, new Date("2026-10-30T10:30:00Z")).length, 0);
});

test("l'alerte nomme le livreur et le premier arrêt en retard", () => {
  assert.equal(lateAlert("Karim B.", stops, now), "Karim B. a 1 arrêt en retard (premier : Mme Haddad).");
  assert.equal(lateAlert("Karim B.", [stops[0]], now), null);
});
