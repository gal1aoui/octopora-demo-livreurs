import assert from "node:assert/strict";
import { test } from "node:test";
import { callLink, maskPhone } from "./call-recipient.js";

test("construit un lien tel: sans espaces", () => {
  assert.equal(callLink("+216 00 000 201"), "tel:+21600000201");
});

test("pas de bouton d'appel sans numéro exploitable", () => {
  assert.equal(callLink(""), null);
  assert.equal(callLink("12"), null);
});

test("le numéro masqué ne garde que les deux derniers chiffres", () => {
  assert.equal(maskPhone("+216 00 000 201"), "•••• •• 01");
});
