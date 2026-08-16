// Géolocalisation économe : on relève la position moins souvent quand la batterie baisse ou à l'arrêt.
export function pickIntervalSeconds({ battery, moving }) {
  if (battery <= 0.15) return moving ? 60 : 300;
  if (battery <= 0.3) return moving ? 30 : 120;
  return moving ? 10 : 60;
}

export function shouldSample(lastSampleAt, now, intervalSeconds) {
  if (lastSampleAt == null) return true;
  return now - lastSampleAt >= intervalSeconds * 1000;
}
