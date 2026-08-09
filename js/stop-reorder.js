// Réorganiser les arrêts quand la circulation l'impose : on déplace un arrêt, les numéros se recalculent.
export function moveStop(stops, stopId, newPosition) {
  const ordered = [...stops].sort((a, b) => a.ordre - b.ordre);
  const from = ordered.findIndex((stop) => stop.id === stopId);
  if (from === -1) return ordered;
  const [moved] = ordered.splice(from, 1);
  const to = Math.max(0, Math.min(newPosition, ordered.length));
  ordered.splice(to, 0, moved);
  return ordered.map((stop, index) => ({ ...stop, ordre: index + 1 }));
}

// Un arrêt déjà livré reste à sa place : on ne reprogramme que ce qui reste à faire.
export function canMove(stop) {
  return stop.statut === "a_livrer";
}
