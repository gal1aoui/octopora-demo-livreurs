// Un arrêt modifié à la fois par le livreur (hors connexion) et par le superviseur : qui l'emporte ?
export function resolveConflict(local, remote) {
  // Une livraison faite sur le terrain ne doit jamais être écrasée.
  if (local.statut === "livre" && remote.statut !== "livre") {
    return { winner: "local", stop: local };
  }
  if (remote.statut === "livre" && local.statut !== "livre") {
    return { winner: "remote", stop: remote };
  }
  // Sinon, la dernière modification gagne ; à égalité, celle du superviseur.
  const localTime = Date.parse(local.modifie_le);
  const remoteTime = Date.parse(remote.modifie_le);
  return localTime > remoteTime ? { winner: "local", stop: local } : { winner: "remote", stop: remote };
}

export function needsReview(local, remote) {
  return local.statut !== remote.statut && local.statut !== "a_livrer" && remote.statut !== "a_livrer";
}
