// Android délivre parfois deux fois le même message : on ignore un identifiant déjà vu récemment.
export function createDeduper({ ttlMs = 60_000, now = () => Date.now() } = {}) {
  const seen = new Map();
  return {
    isDuplicate(id) {
      const time = now();
      for (const [key, at] of seen) {
        if (time - at > ttlMs) seen.delete(key);
      }
      if (seen.has(id)) return true;
      seen.set(id, time);
      return false;
    },
  };
}
