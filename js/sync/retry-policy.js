// Relance des actions en échec : 2 s, 4 s, 8 s puis 16 s, et abandon au cinquième essai.
export const MAX_ATTEMPTS = 5;
const BASE_DELAY_MS = 2000;
const MAX_DELAY_MS = 60_000;

export function nextDelay(attempt) {
  return Math.min(BASE_DELAY_MS * 2 ** (attempt - 1), MAX_DELAY_MS);
}

export function shouldGiveUp(attempts) {
  return attempts >= MAX_ATTEMPTS;
}
