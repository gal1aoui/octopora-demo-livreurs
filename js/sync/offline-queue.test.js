import assert from "node:assert/strict";
import { test } from "node:test";
import { createOfflineQueue } from "./offline-queue.js";

function memoryStorage() {
  const items = new Map();
  return {
    getItem: (key) => (items.has(key) ? items.get(key) : null),
    setItem: (key, value) => items.set(key, String(value)),
  };
}

test("garde les actions qui n'ont pas pu partir", async () => {
  const queue = createOfflineQueue(memoryStorage(), async (action) => {
    if (action.arret === 2) throw new Error("réseau indisponible");
  });
  queue.enqueue({ type: "livre", arret: 1 });
  queue.enqueue({ type: "livre", arret: 2 });

  assert.equal(await queue.flush(), 1);
  assert.deepEqual(queue.pending().map((action) => action.arret), [2]);
});
