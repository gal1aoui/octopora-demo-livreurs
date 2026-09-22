import assert from "node:assert/strict";
import { test } from "node:test";
import { estimateDownloadMo, tilesForBounds, tilesForRound } from "./offline-map-tiles.js";

const world = { north: 85, south: -85, east: 179, west: -179 };

test("au zoom 0 le monde tient dans une tuile", () => {
  assert.deepEqual(tilesForBounds(world, 0), [{ z: 0, x: 0, y: 0 }]);
});

test("au zoom 1 il faut quatre tuiles", () => {
  assert.equal(tilesForBounds(world, 1).length, 4);
});

test("une tournée à Tunis tient dans quelques tuiles par niveau de zoom", () => {
  const tunis = { north: 36.88, south: 36.79, east: 10.33, west: 10.17 };
  const tiles = tilesForRound(tunis, [12, 13]);
  assert.ok(tiles.length >= 2 && tiles.length < 30);
  assert.ok(tiles.every((tile) => tile.z === 12 || tile.z === 13));
});

test("estime le poids du téléchargement en Mo", () => {
  assert.equal(estimateDownloadMo(new Array(512).fill({})), 10);
});
