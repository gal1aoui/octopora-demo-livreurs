import assert from "node:assert/strict";
import { test } from "node:test";
import { afterFailure, backoffDelayMs, isDue } from "./queue-backoff.js";

test("le délai double à chaque essai", () => {
  assert.deepEqual([0, 1, 2, 3].map((n) => backoffDelayMs(n)), [2_000, 4_000, 8_000, 16_000]);
});

test("le délai plafonne à cinq minutes", () => {
  assert.equal(backoffDelayMs(20), 300_000);
});

test("une action échouée attend avant d'être renvoyée", () => {
  const failed = afterFailure({ type: "livre", arretId: 3 }, 10_000);
  assert.equal(failed.attempts, 1);
  assert.equal(isDue(failed, 11_000), false);
  assert.equal(isDue(failed, 12_000), true);
});
