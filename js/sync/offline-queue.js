import { nextDelay, shouldGiveUp } from "./retry-policy.js";

// File d'attente hors connexion : les actions du livreur (livré, échec, photo) partent dès que le réseau revient.
// Une action refusée est relancée avec un délai croissant, puis abandonnée après cinq essais.
const QUEUE_KEY = "file-hors-connexion";

export function createOfflineQueue(storage, send, { now = () => Date.now() } = {}) {
  const read = () => JSON.parse(storage.getItem(QUEUE_KEY) ?? "[]");
  const write = (items) => storage.setItem(QUEUE_KEY, JSON.stringify(items));

  return {
    enqueue(action) {
      const queuedAt = new Date(now()).toISOString();
      write([...read(), { ...action, queuedAt, attempts: 0, retryAt: 0 }]);
    },
    pending() {
      return read().filter((item) => !item.abandoned);
    },
    abandoned() {
      return read().filter((item) => item.abandoned);
    },
    async flush() {
      const kept = [];
      for (const item of read()) {
        if (item.abandoned || (item.retryAt ?? 0) > now()) {
          kept.push(item);
          continue;
        }
        try {
          await send(item);
        } catch {
          const attempts = (item.attempts ?? 0) + 1;
          kept.push(
            shouldGiveUp(attempts)
              ? { ...item, attempts, abandoned: true }
              : { ...item, attempts, retryAt: now() + nextDelay(attempts) }
          );
        }
      }
      write(kept);
      return kept.filter((item) => !item.abandoned).length;
    },
  };
}
