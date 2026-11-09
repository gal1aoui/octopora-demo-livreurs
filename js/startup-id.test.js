import assert from "node:assert/strict";
import { test } from "node:test";
import { newSessionId } from "./startup-id.js";

test("utilise randomUUID quand il existe", () => {
  assert.equal(newSessionId({ randomUUID: () => "abc" }), "abc");
});

test("LIVRAISON-47 : un crypto sans randomUUID ne fait plus planter le démarrage", () => {
  const androidTen = { getRandomValues: (array) => array.fill(171) };
  assert.equal(newSessionId(androidTen), "ab".repeat(16));
});

test("LIVRAISON-47 : sans aucun crypto, un identifiant de 32 caractères est quand même créé", () => {
  assert.match(newSessionId(undefined, () => 0.5), /^[0-9a-f]{32}$/);
});
