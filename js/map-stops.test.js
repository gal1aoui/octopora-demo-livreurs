import assert from "node:assert/strict";
import { test } from "node:test";
import { boundsOf, project } from "./map-stops.js";

const points = [
  { id: 1, lat: 36.8, lng: 10.1 },
  { id: 2, lat: 36.9, lng: 10.3 },
];

test("calcule le cadre qui contient tous les arrêts", () => {
  assert.deepEqual(boundsOf(points), { north: 36.9, south: 36.8, east: 10.3, west: 10.1 });
});

test("pas d'arrêt, pas de cadre", () => {
  assert.equal(boundsOf([]), null);
});

test("place le nord-est en haut à droite et le sud-ouest en bas à gauche", () => {
  const [sw, ne] = project(points, boundsOf(points));
  assert.deepEqual({ x: sw.x, y: sw.y }, { x: 8, y: 92 });
  assert.deepEqual({ x: ne.x, y: ne.y }, { x: 92, y: 8 });
});
