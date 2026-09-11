import assert from "node:assert/strict";
import { test } from "node:test";
import { proofFileName, validatePhoto } from "./proof-photo.js";

test("le nom du fichier porte l'arrêt et l'heure de Tunis", () => {
  assert.equal(proofFileName({ id: 3 }, "2026-10-30T07:42:10Z"), "preuve-arret3-20261030084210.jpg");
});

test("accepte une photo JPEG de taille raisonnable", () => {
  assert.deepEqual(validatePhoto({ size: 1_200_000, type: "image/jpeg" }), { ok: true });
});

test("refuse une photo trop lourde", () => {
  assert.equal(validatePhoto({ size: 6 * 1024 * 1024, type: "image/jpeg" }).ok, false);
});

test("refuse un format inconnu", () => {
  assert.match(validatePhoto({ size: 100, type: "image/gif" }).reason, /JPEG ou PNG/);
});
