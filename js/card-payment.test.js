import assert from "node:assert/strict";
import { test } from "node:test";
import { payByCard } from "./card-payment.js";

const order = { amountMillimes: 25000, reference: "ARRET-3" };

test("renvoie le code d'autorisation d'un paiement accepté", async () => {
  const terminal = { charge: async () => ({ approved: true, authCode: "A1B2C3" }) };
  assert.deepEqual(await payByCard(terminal, order), { status: "accepte", authCode: "A1B2C3" });
});

test("indique le motif d'un refus", async () => {
  const terminal = { charge: async () => ({ approved: false, reason: "fonds insuffisants" }) };
  assert.deepEqual(await payByCard(terminal, order), { status: "refuse", reason: "fonds insuffisants" });
});

test("signale un terminal injoignable au lieu de planter", async () => {
  const terminal = {
    charge: async () => {
      throw new Error("bluetooth coupé");
    },
  };
  assert.equal((await payByCard(terminal, order)).status, "terminal_indisponible");
});

test("refuse un montant nul", async () => {
  await assert.rejects(payByCard({ charge: async () => ({}) }, { amountMillimes: 0, reference: "X" }), RangeError);
});
