import assert from "node:assert/strict";
import { test } from "node:test";
import { createDeduper } from "./notification-dedupe.js";

test("LIVRAISON-28 : le même changement de tournée ne notifie qu'une fois", () => {
  const deduper = createDeduper({ now: () => 1_000 });
  assert.equal(deduper.isDuplicate("tournee-12-v7"), false);
  assert.equal(deduper.isDuplicate("tournee-12-v7"), true);
});

test("deux changements différents notifient tous les deux", () => {
  const deduper = createDeduper({ now: () => 1_000 });
  assert.equal(deduper.isDuplicate("tournee-12-v7"), false);
  assert.equal(deduper.isDuplicate("tournee-12-v8"), false);
});

test("le même identifiant peut revenir après le délai de garde", () => {
  let clock = 1_000;
  const deduper = createDeduper({ ttlMs: 60_000, now: () => clock });
  deduper.isDuplicate("tournee-12-v7");
  clock += 61_000;
  assert.equal(deduper.isDuplicate("tournee-12-v7"), false);
});
