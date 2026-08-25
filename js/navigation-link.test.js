import assert from "node:assert/strict";
import { test } from "node:test";
import { NAVIGATION_APPS, navigationUrl } from "./navigation-link.js";

const stop = { adresse: "8 rue de Marseille, Tunis" };

test("encode l'adresse dans le lien Google Maps", () => {
  assert.equal(
    navigationUrl(stop, "google"),
    "https://www.google.com/maps/dir/?api=1&destination=8%20rue%20de%20Marseille%2C%20Tunis&travelmode=driving",
  );
});

test("une application inconnue retombe sur Google Maps", () => {
  assert.equal(navigationUrl(stop, "inconnue"), navigationUrl(stop, "google"));
});

test("propose Google Maps, Waze et Plans", () => {
  assert.deepEqual(NAVIGATION_APPS, ["google", "waze", "apple"]);
});
