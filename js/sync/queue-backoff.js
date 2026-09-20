// Délai avant le nouvel envoi d'une action restée dans la file hors connexion.
export function backoffDelayMs(attempt, { baseMs = 2_000, maxMs = 5 * 60_000 } = {}) {
  return Math.min(maxMs, baseMs * 2 ** Math.max(0, attempt));
}

export function isDue(item, now) {
  return now >= (item.nextTryAt ?? 0);
}

export function afterFailure(item, now) {
  const attempts = (item.attempts ?? 0) + 1;
  return { ...item, attempts, nextTryAt: now + backoffDelayMs(attempts - 1) };
}
