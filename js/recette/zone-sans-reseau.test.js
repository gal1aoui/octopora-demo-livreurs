import assert from "node:assert/strict";
import { test } from "node:test";
import { createOfflineQueue } from "../sync/offline-queue.js";

function fakeStorage() {
  const data = new Map();
  return { getItem: (key) => data.get(key) ?? null, setItem: (key, value) => data.set(key, value) };
}

test("recette : sans réseau, les actions restent en attente", async () => {
  const queue = createOfflineQueue(fakeStorage(), async () => {
    throw new Error("réseau coupé");
  });
  queue.enqueue({ type: "livre", arretId: 3 });
  queue.enqueue({ type: "livre", arretId: 4 });
  assert.equal(await queue.flush(), 2);
  assert.equal(queue.pending().length, 2);
});

test("recette : au retour du réseau, la file se vide", async () => {
  const sent = [];
  const storage = fakeStorage();
  const offline = createOfflineQueue(storage, async () => {
    throw new Error("réseau coupé");
  });
  offline.enqueue({ type: "echec", arretId: 5 });
  await offline.flush();
  const online = createOfflineQueue(storage, async (item) => sent.push(item.arretId));
  assert.equal(await online.flush(), 0);
  assert.deepEqual(sent, [5]);
});
