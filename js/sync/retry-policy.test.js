import assert from "node:assert/strict";
import { test } from "node:test";
import { createOfflineQueue } from "./offline-queue.js";
import { MAX_ATTEMPTS, nextDelay, shouldGiveUp } from "./retry-policy.js";
import { indicatorLabel } from "./sync-indicator.js";

function memoryStorage() {
  const items = new Map();
  return {
    getItem: (key) => (items.has(key) ? items.get(key) : null),
    setItem: (key, value) => items.set(key, String(value)),
  };
}

test("le délai double à chaque essai", () => {
  assert.deepEqual([1, 2, 3, 4].map(nextDelay), [2000, 4000, 8000, 16000]);
});

test("abandonne au cinquième essai", () => {
  assert.equal(shouldGiveUp(MAX_ATTEMPTS - 1), false);
  assert.equal(shouldGiveUp(MAX_ATTEMPTS), true);
});

test("relance une action refusée, puis l'abandonne après cinq échecs", async () => {
  let clock = 0;
  const queue = createOfflineQueue(
    memoryStorage(),
    async () => {
      throw new Error("serveur indisponible");
    },
    { now: () => clock }
  );
  queue.enqueue({ type: "livre", arret: 7 });

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
    await queue.flush();
    clock += nextDelay(attempt);
  }

  assert.equal(queue.pending().length, 0);
  assert.equal(queue.abandoned().length, 1);
});

test("l'indicateur annonce les actions en attente", () => {
  assert.equal(indicatorLabel(0), "Tout est synchronisé");
  assert.equal(indicatorLabel(1), "1 action en attente");
  assert.equal(indicatorLabel(3), "3 actions en attente");
  assert.equal(indicatorLabel(0, 2), "2 actions à renvoyer à la main");
});
