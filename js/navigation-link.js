// Ouvre l'application de navigation préférée du livreur vers l'adresse de l'arrêt.
const BUILDERS = {
  google: (query) => `https://www.google.com/maps/dir/?api=1&destination=${query}&travelmode=driving`,
  waze: (query) => `https://waze.com/ul?q=${query}&navigate=yes`,
  apple: (query) => `https://maps.apple.com/?daddr=${query}&dirflg=d`,
};

export const NAVIGATION_APPS = Object.keys(BUILDERS);

export function navigationUrl(stop, app = "google") {
  const build = BUILDERS[app] ?? BUILDERS.google;
  return build(encodeURIComponent(stop.adresse));
}
