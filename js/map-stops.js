// Carte des arrêts de la tournée : on place chaque arrêt dans le cadre de la carte (en pourcentage).
export const STOP_COORDS = [
  { id: 1, ordre: 1, lat: 36.8335, lng: 10.2297, statut: "livre" },
  { id: 2, ordre: 2, lat: 36.8002, lng: 10.1815, statut: "livre" },
  { id: 3, ordre: 3, lat: 36.7988, lng: 10.1761, statut: "a_livrer" },
  { id: 4, ordre: 4, lat: 36.8782, lng: 10.3247, statut: "a_livrer" },
];

export function boundsOf(points) {
  if (!points.length) return null;
  const lats = points.map((p) => p.lat);
  const lngs = points.map((p) => p.lng);
  return { north: Math.max(...lats), south: Math.min(...lats), east: Math.max(...lngs), west: Math.min(...lngs) };
}

export function project(points, bounds, margin = 8) {
  const spanX = bounds.east - bounds.west || 1;
  const spanY = bounds.north - bounds.south || 1;
  const scale = 100 - 2 * margin;
  return points.map((p) => ({
    ...p,
    x: margin + ((p.lng - bounds.west) / spanX) * scale,
    y: margin + ((bounds.north - p.lat) / spanY) * scale,
  }));
}

if (typeof document !== "undefined") {
  const projected = project(STOP_COORDS, boundsOf(STOP_COORDS));
  document.getElementById("carte").innerHTML = projected
    .map((p) => `<span class="pin" data-status="${p.statut}" style="left:${p.x.toFixed(1)}%;top:${p.y.toFixed(1)}%">${p.ordre}</span>`)
    .join("");
}
