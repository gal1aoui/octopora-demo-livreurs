import assert from "node:assert/strict";
import { test } from "node:test";
import { APP_CONFIG, buildLabel, isSupported } from "./app-config.js";

test("le libellé de version donne la date de compilation à l'heure de Tunis", () => {
  const label = buildLabel("2026-10-05T08:30:00Z");
  assert.match(label, /Application livreurs 0\.1\.0/);
  assert.match(label, /09:30|09 h 30/);
});

test("Android 9 et iOS 15 sont les versions minimales", () => {
  assert.equal(isSupported({ platform: "android", osVersion: APP_CONFIG.minAndroid }), true);
  assert.equal(isSupported({ platform: "ios", osVersion: 14 }), false);
});

test("une plateforme inconnue n'est pas prise en charge", () => {
  assert.equal(isSupported({ platform: "windows-phone", osVersion: 10 }), false);
});
