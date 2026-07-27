// Connexion par code à six chiffres reçu par SMS.
export function normalizeCode(input) {
  return String(input ?? "").replace(/\D/g, "");
}

export function isValidCode(input) {
  return /^\d{6}$/.test(normalizeCode(input));
}

// Après trop d'essais ratés, la saisie est bloquée un moment.
export function createAttemptCounter({ maxAttempts = 5, lockMs = 60_000, now = () => Date.now() } = {}) {
  let failures = 0;
  let lockedUntil = 0;
  return {
    fail() {
      failures += 1;
      if (failures >= maxAttempts) {
        lockedUntil = now() + lockMs;
        failures = 0;
      }
    },
    succeed() {
      failures = 0;
    },
    isLocked() {
      return now() < lockedUntil;
    },
  };
}
