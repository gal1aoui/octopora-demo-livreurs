import assert from "node:assert/strict";
import { test } from "node:test";
import { gpsInterval } from "./battery-saver.js";

test("relève la position toutes les 10 secondes en charge", () => {
  assert.equal(gpsInterval({ level: 0.1, charging: true }), 10);
});

test("espace les relevés quand la batterie baisse", () => {
  assert.equal(gpsInterval({ level: 0.8, charging: false }), 10);
  assert.equal(gpsInterval({ level: 0.4, charging: false }), 30);
  assert.equal(gpsInterval({ level: 0.15, charging: false }), 60);
});
