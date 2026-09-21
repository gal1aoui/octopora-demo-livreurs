import assert from "node:assert/strict";
import { test } from "node:test";
import { needsReview, resolveConflict } from "./conflict-resolution.js";

test("une livraison faite hors connexion n'est pas écrasée par le superviseur", () => {
  const local = { statut: "livre", modifie_le: "2026-10-30T08:00:00Z" };
  const remote = { statut: "a_livrer", modifie_le: "2026-10-30T08:05:00Z" };
  assert.equal(resolveConflict(local, remote).winner, "local");
});

test("sinon la modification la plus récente gagne", () => {
  const local = { statut: "echec", modifie_le: "2026-10-30T09:00:00Z" };
  const remote = { statut: "a_livrer", modifie_le: "2026-10-30T08:00:00Z" };
  assert.equal(resolveConflict(local, remote).winner, "local");
});

test("à égalité, le superviseur l'emporte", () => {
  const same = "2026-10-30T09:00:00Z";
  assert.equal(resolveConflict({ statut: "echec", modifie_le: same }, { statut: "a_livrer", modifie_le: same }).winner, "remote");
});

test("un livré contre un échec demande une relecture", () => {
  assert.equal(needsReview({ statut: "livre" }, { statut: "echec" }), true);
  assert.equal(needsReview({ statut: "livre" }, { statut: "a_livrer" }), false);
});
