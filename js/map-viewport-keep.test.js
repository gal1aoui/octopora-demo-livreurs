import assert from "node:assert/strict";
import { test } from "node:test";
import { nextViewport, shouldRecenter } from "./map-viewport-keep.js";

test("LIVRAISON-13 : la mise à jour toutes les dix secondes ne remet pas le zoom à zéro", () => {
  const current = { center: [36.8, 10.18], zoom: 16 };
  const incoming = { center: [36.81, 10.19], zoom: 12 };
  assert.equal(nextViewport(current, incoming, { userZoomed: true }).zoom, 16);
});

test("sans zoom du livreur, la carte suit la mise à jour", () => {
  const incoming = { center: [36.81, 10.19], zoom: 12 };
  assert.deepEqual(nextViewport({ center: [0, 0], zoom: 5 }, incoming, { userZoomed: false }), incoming);
});

test("la carte ne se recentre pas pendant que le livreur la touche", () => {
  assert.equal(shouldRecenter({ lastTouchAt: 100_000, now: 110_000 }), false);
  assert.equal(shouldRecenter({ lastTouchAt: 100_000, now: 140_000 }), true);
});
