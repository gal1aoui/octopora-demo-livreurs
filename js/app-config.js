// Configuration de l'application mobile : nom, version et plateformes prises en charge.
export const APP_CONFIG = {
  name: "Application livreurs",
  version: "0.1.0",
  minAndroid: 9,
  minIos: 15,
};

const BUILD_DATE = new Intl.DateTimeFormat("fr-FR", {
  dateStyle: "long",
  timeStyle: "short",
  timeZone: "Africa/Tunis",
});

export function buildLabel(builtAt, config = APP_CONFIG) {
  return `${config.name} ${config.version} (compilée le ${BUILD_DATE.format(new Date(builtAt))})`;
}

export function isSupported({ platform, osVersion }, config = APP_CONFIG) {
  if (platform === "android") return osVersion >= config.minAndroid;
  if (platform === "ios") return osVersion >= config.minIos;
  return false;
}
