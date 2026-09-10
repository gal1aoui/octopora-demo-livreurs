import assert from "node:assert/strict";
import { test } from "node:test";
import { generateConfirmationCode, requiresConfirmation, verifyConfirmationCode } from "./confirmation-code.js";

test("le code a toujours quatre chiffres, zéros initiaux compris", () => {
  assert.equal(generateConfirmationCode(() => 0.0042), "0042");
  assert.equal(generateConfirmationCode(() => 0.9999), "9999");
});

test("accepte le bon code même saisi avec un espace", () => {
  assert.equal(verifyConfirmationCode("0042", "00 42"), true);
});

test("refuse un mauvais code ou un code incomplet", () => {
  assert.equal(verifyConfirmationCode("0042", "0043"), false);
  assert.equal(verifyConfirmationCode("0042", "42"), false);
});

test("seuls les colis de 200 DT ou plus demandent un code", () => {
  assert.equal(requiresConfirmation({ valeur_dt: 350 }), true);
  assert.equal(requiresConfirmation({ valeur_dt: 80 }), false);
  assert.equal(requiresConfirmation({}), false);
});
