// Identifiant de session. LIVRAISON-47 : le WebView d'Android 10 n'a pas crypto.randomUUID.
function hex(bytes) {
  return [...bytes].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

export function newSessionId(cryptoLike, random = Math.random) {
  if (cryptoLike && typeof cryptoLike.randomUUID === "function") {
    return cryptoLike.randomUUID();
  }
  if (cryptoLike && typeof cryptoLike.getRandomValues === "function") {
    return hex(cryptoLike.getRandomValues(new Uint8Array(16)));
  }
  return hex(Array.from({ length: 16 }, () => Math.floor(random() * 256)));
}
