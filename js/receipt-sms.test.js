import assert from "node:assert/strict";
import { test } from "node:test";
import { receiptSms } from "./receipt-sms.js";

const payment = { reference: "ARRET-3", mode: "especes", amountMillimes: 12500, paidAt: "2026-10-30T07:42:00Z" };

test("le reçu donne le montant et le mode de paiement", () => {
  const text = receiptSms(payment);
  assert.match(text, /12,500 DT payés en espèces/);
});

test("la date est à l'heure de Tunis, une heure après UTC", () => {
  assert.match(receiptSms(payment), /30\/10\/2026.*08:42/);
});

test("le reçu tient dans un seul SMS", () => {
  assert.ok(receiptSms({ ...payment, mode: "carte" }).length <= 160);
});
