import assert from "node:assert/strict";
import { test } from "node:test";
import { failureReason, telHref } from "./pilot-fixes.js";

test("retour 1 : le lien d'appel ne contient plus d'espaces", () => {
  assert.equal(telHref("+216 00 000 201"), "tel:+21600000201");
});

test("retour 1 : un arrêt sans téléphone n'a pas de lien d'appel", () => {
  assert.equal(telHref(null), null);
});

test("retour 2 : un échec sans motif est refusé", () => {
  assert.throws(() => failureReason("   "), RangeError);
  assert.throws(() => failureReason(undefined), RangeError);
});

test("retour 2 : le motif est nettoyé", () => {
  assert.equal(failureReason("  Destinataire absent "), "Destinataire absent");
});
