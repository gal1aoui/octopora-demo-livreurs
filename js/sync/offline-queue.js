// File d'attente hors connexion : les actions du livreur (livré, échec, photo) partent dès que le réseau revient.
const QUEUE_KEY = "file-hors-connexion";

export function createOfflineQueue(storage, send) {
  const read = () => JSON.parse(storage.getItem(QUEUE_KEY) ?? "[]");
  const write = (items) => storage.setItem(QUEUE_KEY, JSON.stringify(items));

  return {
    enqueue(action) {
      write([...read(), { ...action, queuedAt: new Date().toISOString() }]);
    },
    pending() {
      return read();
    },
    async flush() {
      const remaining = [];
      for (const item of read()) {
        try {
          await send(item);
        } catch {
          remaining.push(item);
        }
      }
      write(remaining);
      return remaining.length;
    },
  };
}
