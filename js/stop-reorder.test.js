import assert from "node:assert/strict";
import { test } from "node:test";
import { canMove, moveStop } from "./stop-reorder.js";

const stops = [
  { id: 10, ordre: 1, statut: "livre" },
  { id: 11, ordre: 2, statut: "a_livrer" },
  { id: 12, ordre: 3, statut: "a_livrer" },
];

test("déplace l'arrêt et renumérote la tournée", () => {
  const result = moveStop(stops, 12, 1);
  assert.deepEqual(result.map((stop) => stop.id), [10, 12, 11]);
  assert.deepEqual(result.map((stop) => stop.ordre), [1, 2, 3]);
});

test("un identifiant inconnu laisse la tournée telle quelle", () => {
  assert.deepEqual(moveStop(stops, 99, 0).map((stop) => stop.id), [10, 11, 12]);
});

test("un arrêt livré ne se déplace pas", () => {
  assert.equal(canMove(stops[0]), false);
  assert.equal(canMove(stops[1]), true);
});
