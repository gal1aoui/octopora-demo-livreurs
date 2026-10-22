import assert from "node:assert/strict";
import { test } from "node:test";
import { changeDue, formatDinars } from "./cash-payment.js";

test("rend la différence entre le montant remis et le montant dû", () => {
  assert.equal(changeDue(12500, 20000), 7500);
});

test("ne rend rien quand le compte est juste", () => {
  assert.equal(changeDue(8300, 8300), 0);
});

test("refuse un montant remis insuffisant", () => {
  assert.throws(() => changeDue(10000, 5000), RangeError);
});

test("affiche les millimes sur trois chiffres", () => {
  assert.equal(formatDinars(12500), "12,500 DT");
  assert.equal(formatDinars(3005), "3,005 DT");
});
