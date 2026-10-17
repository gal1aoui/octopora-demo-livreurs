import assert from "node:assert/strict";
import { test } from "node:test";
import { createOfflineQueue } from "../sync/offline-queue.js";

function fakeStorage() {
  const data = new Map();
  return { getItem: (key) => data.get(key) ?? null, setItem: (key, value) => data.set(key, value) };
}

test("un paiement validé hors connexion reste dans la file", () => {
  const queue = createOfflineQueue(fakeStorage(), async () => {});
  queue.enqueue({ type: "paiement", arretId: 3, mode: "especes", montantMillimes: 12500 });
  assert.equal(queue.pending().length, 1);
  assert.equal(queue.pending()[0].type, "paiement");
});

test("les paiements partent quand le réseau revient", async () => {
  const sent = [];
  const queue = createOfflineQueue(fakeStorage(), async (item) => sent.push(item.arretId));
  queue.enqueue({ type: "paiement", arretId: 3, mode: "carte", montantMillimes: 25000 });
  queue.enqueue({ type: "paiement", arretId: 4, mode: "especes", montantMillimes: 8300 });
  assert.equal(await queue.flush(), 0);
  assert.deepEqual(sent, [3, 4]);
});

test("un envoi qui échoue reste en attente", async () => {
  const queue = createOfflineQueue(fakeStorage(), async () => {
    throw new Error("réseau coupé");
  });
  queue.enqueue({ type: "paiement", arretId: 3, mode: "carte", montantMillimes: 25000 });
  assert.equal(await queue.flush(), 1);
  assert.equal(queue.pending().length, 1);
});
