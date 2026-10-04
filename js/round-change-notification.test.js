import assert from "node:assert/strict";
import { test } from "node:test";
import { roundChangeNotification } from "./round-change-notification.js";

test("annonce un nouvel arrêt avec son numéro", () => {
  const note = roundChangeNotification({ type: "ajout", destinataire: "Mme Haddad", ordre: 3, tourneeId: 1 });
  assert.equal(note.title, "Nouvel arrêt");
  assert.equal(note.body, "Mme Haddad (arrêt n° 3)");
});

test("regroupe les notifications d'une même tournée", () => {
  const note = roundChangeNotification({ type: "retrait", destinataire: "M. Gharbi", tourneeId: 2 });
  assert.equal(note.tag, "tournee-2");
});

test("refuse un type de changement inconnu", () => {
  assert.throws(() => roundChangeNotification({ type: "autre", tourneeId: 1 }), RangeError);
});
