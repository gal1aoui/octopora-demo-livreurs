import assert from "node:assert/strict";
import { test } from "node:test";
import { progress, sortStops, stopItem } from "./stops.js";

const stops = [
  { ordre: 2, destinataire: "B", adresse: "2 rue B", statut: "a_livrer" },
  { ordre: 1, destinataire: "A", adresse: "1 rue A", statut: "livre" },
  { ordre: 3, destinataire: "C", adresse: "3 rue C", statut: "echec" },
];

test("range les arrêts dans l'ordre de la tournée", () => {
  assert.deepEqual(sortStops(stops).map((stop) => stop.ordre), [1, 2, 3]);
});

test("compte les livraisons faites", () => {
  assert.deepEqual(progress(stops), { delivered: 1, total: 3, percent: 33 });
});

test("une tournée vide affiche 0 %", () => {
  assert.equal(progress([]).percent, 0);
});

test("affiche le statut de l'arrêt en clair", () => {
  assert.match(stopItem(stops[2]), /Échec/);
});
