// Mise à jour de la carte : le zoom choisi par le livreur doit survivre aux rafraîchissements.
export function nextViewport(current, incoming, { userZoomed }) {
  if (!userZoomed) return { ...incoming };
  return { center: incoming.center, zoom: current.zoom };
}

// Tant que le livreur manipule la carte, on ne la recentre pas.
export function shouldRecenter({ lastTouchAt, now, holdMs = 30_000 }) {
  return lastTouchAt == null || now - lastTouchAt > holdMs;
}
