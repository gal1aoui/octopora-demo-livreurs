import assert from "node:assert/strict";
import { test } from "node:test";
import { STOPS } from "../sample-tournee.js";
import { progress, sortStops } from "../stops.js";

test("recette : la tournée du jour compte quatre arrêts dans l'ordre", () => {
  assert.deepEqual(sortStops(STOPS).map((stop) => stop.ordre), [1, 2, 3, 4]);
});

test("recette : deux livraisons sur quatre, soit 50 %", () => {
  assert.deepEqual(progress(STOPS), { delivered: 2, total: 4, percent: 50 });
});

test("recette : un échec ne compte pas comme une livraison", () => {
  const withFailure = STOPS.map((stop) => (stop.id === 3 ? { ...stop, statut: "echec" } : stop));
  assert.equal(progress(withFailure).delivered, 2);
});
