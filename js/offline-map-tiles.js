// Télécharger la carte de la tournée au départ de l'entrepôt : on calcule les tuiles à mettre en cache.
const lngToX = (lng, zoom) => Math.floor(((lng + 180) / 360) * 2 ** zoom);
const latToY = (lat, zoom) => {
  const rad = (lat * Math.PI) / 180;
  return Math.floor(((1 - Math.log(Math.tan(rad) + 1 / Math.cos(rad)) / Math.PI) / 2) * 2 ** zoom);
};

export function tilesForBounds({ north, south, east, west }, zoom) {
  const tiles = [];
  for (let x = lngToX(west, zoom); x <= lngToX(east, zoom); x += 1) {
    for (let y = latToY(north, zoom); y <= latToY(south, zoom); y += 1) {
      tiles.push({ z: zoom, x, y });
    }
  }
  return tiles;
}

export function tilesForRound(bounds, zooms = [12, 13, 14, 15]) {
  return zooms.flatMap((zoom) => tilesForBounds(bounds, zoom));
}

// Une tuile pèse environ 20 Ko : on annonce la taille avant de télécharger sur le réseau mobile.
export function estimateDownloadMo(tiles, kbPerTile = 20) {
  return Math.round(((tiles.length * kbPerTile) / 1024) * 10) / 10;
}
