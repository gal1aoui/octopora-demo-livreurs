// Carte en direct du superviseur : une position est périmée au-delà de 5 minutes.
export const STALE_AFTER_MS = 5 * 60 * 1000;

export function toMarkers(positions, now) {
  return positions.map((position) => ({
    livreur: position.livreur,
    lat: position.lat,
    lng: position.lng,
    avancement: `${position.livres}/${position.arrets}`,
    stale: now.getTime() - Date.parse(position.recu_le) > STALE_AFTER_MS,
  }));
}

export function markerItem(marker) {
  const state = marker.stale ? "Position ancienne" : "En direct";
  return `<li class="stop" data-status="${marker.stale ? "echec" : "livre"}">
    <div><strong>${marker.livreur}</strong><br><span class="muted">${marker.lat.toFixed(4)}, ${marker.lng.toFixed(4)}</span></div>
    <span class="stop-status">${marker.avancement} - ${state}</span>
  </li>`;
}

if (typeof document !== "undefined") {
  const now = new Date();
  const sample = [
    { livreur: "Karim B.", lat: 36.8065, lng: 10.1815, livres: 2, arrets: 4, recu_le: new Date(now - 60 * 1000).toISOString() },
    { livreur: "Nadia S.", lat: 36.8625, lng: 10.1956, livres: 1, arrets: 2, recu_le: new Date(now - 12 * 60 * 1000).toISOString() },
  ];
  document.getElementById("livreurs").innerHTML = toMarkers(sample, now).map(markerItem).join("");
}
