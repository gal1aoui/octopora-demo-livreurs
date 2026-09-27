import assert from "node:assert/strict";
import { test } from "node:test";
import { approachMessage, stopToNotify } from "./approach-sms.js";

const stops = [
  { ordre: 1, destinataire: "A", statut: "livre", telephone: "+216 00 000 001" },
  { ordre: 2, destinataire: "B", statut: "a_livrer", telephone: "+216 00 000 002" },
  { ordre: 3, destinataire: "C", statut: "a_livrer", telephone: "+216 00 000 003", creneau: "09:00-12:00" },
  { ordre: 4, destinataire: "D", statut: "a_livrer", telephone: null },
];

test("prévient le destinataire situé deux arrêts plus loin", () => {
  assert.equal(stopToNotify(stops, 1).destinataire, "C");
});

test("ne prévient pas un arrêt sans numéro de téléphone", () => {
  assert.equal(stopToNotify(stops, 2), null);
});

test("le message rappelle le créneau", () => {
  assert.match(approachMessage(stops[2], "Karim"), /Créneau prévu : 09:00 à 12:00/);
});
