import assert from "node:assert/strict";
import { test } from "node:test";
import { pickIntervalSeconds, shouldSample } from "./geoloc-battery.js";

test("batterie pleine et en route : une position toutes les 10 secondes", () => {
  assert.equal(pickIntervalSeconds({ battery: 0.9, moving: true }), 10);
});

test("batterie faible : l'intervalle s'allonge", () => {
  assert.equal(pickIntervalSeconds({ battery: 0.25, moving: true }), 30);
  assert.equal(pickIntervalSeconds({ battery: 0.1, moving: true }), 60);
});

test("à l'arrêt, on relève beaucoup moins souvent", () => {
  assert.equal(pickIntervalSeconds({ battery: 0.9, moving: false }), 60);
  assert.equal(pickIntervalSeconds({ battery: 0.1, moving: false }), 300);
});

test("ne relève pas la position avant la fin de l'intervalle", () => {
  assert.equal(shouldSample(1_000, 6_000, 10), false);
  assert.equal(shouldSample(1_000, 11_000, 10), true);
  assert.equal(shouldSample(null, 0, 10), true);
});
