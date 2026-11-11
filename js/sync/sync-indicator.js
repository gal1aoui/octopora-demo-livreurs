// Texte de l'indicateur de synchronisation, en haut de l'écran de tournée.
function plural(count, word) {
  return `${count} ${word}${count > 1 ? "s" : ""}`;
}

export function indicatorLabel(pending, abandoned = 0) {
  if (abandoned > 0) {
    return `${plural(abandoned, "action")} à renvoyer à la main`;
  }
  if (pending === 0) {
    return "Tout est synchronisé";
  }
  return `${plural(pending, "action")} en attente`;
}
