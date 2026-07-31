import assert from "node:assert/strict";
import { test } from "node:test";
import { createAttemptCounter, isValidCode, normalizeCode } from "./login-code.js";

test("accepte un code saisi avec des espaces", () => {
  assert.equal(normalizeCode("481 516"), "481516");
  assert.equal(isValidCode("481 516"), true);
});

test("refuse un code trop court ou avec des lettres", () => {
  assert.equal(isValidCode("12345"), false);
  assert.equal(isValidCode("12ab56"), false);
});

test("bloque la saisie après cinq échecs puis la rouvre", () => {
  let clock = 1_000;
  const counter = createAttemptCounter({ now: () => clock });
  for (let i = 0; i < 5; i += 1) counter.fail();
  assert.equal(counter.isLocked(), true);
  clock += 60_001;
  assert.equal(counter.isLocked(), false);
});
