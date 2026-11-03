import assert from "node:assert/strict";
import { test } from "node:test";
import { markerItem, toMarkers } from "./live-map.js";

const now = new Date("2026-10-30T09:00:00Z");
const positions = [
  { livreur: "Karim B.", lat: 36.8065, lng: 10.1815, livres: 2, arrets: 4, recu_le: "2026-10-30T08:59:00Z" },
  { livreur: "Nadia S.", lat: 36.8625, lng: 10.1956, livres: 1, arrets: 2, recu_le: "2026-10-30T08:50:00Z" },
];

test("une position de moins de 5 minutes est en direct", () => {
  assert.equal(toMarkers(positions, now)[0].stale, false);
});

test("une position de plus de 5 minutes est périmée", () => {
  assert.equal(toMarkers(positions, now)[1].stale, true);
});

test("le repère affiche l'avancement de la tournée", () => {
  assert.equal(toMarkers(positions, now)[0].avancement, "2/4");
  assert.match(markerItem(toMarkers(positions, now)[1]), /Position ancienne/);
});
