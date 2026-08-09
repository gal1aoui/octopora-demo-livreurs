import { STOPS } from "./sample-tournee.js";

const STATUS_LABELS = { a_livrer: "À livrer", livre: "Livré", echec: "Échec" };

export function sortStops(stops) {
  return [...stops].sort((a, b) => a.ordre - b.ordre);
}

export function progress(stops) {
  const delivered = stops.filter((stop) => stop.statut === "livre").length;
  const total = stops.length;
  return { delivered, total, percent: total ? Math.round((delivered / total) * 100) : 0 };
}

export function stopItem(stop) {
  return `<li class="stop" data-status="${stop.statut}">
    <span class="stop-order">${stop.ordre}</span>
    <div><strong>${stop.destinataire}</strong><br><span class="muted">${stop.adresse}</span></div>
    <span class="stop-status">${STATUS_LABELS[stop.statut]}</span>
  </li>`;
}

if (typeof document !== "undefined") {
  const { delivered, total, percent } = progress(STOPS);
  document.getElementById("progression").textContent = `${delivered} livraisons sur ${total} (${percent} %)`;
  document.getElementById("arrets").innerHTML = sortStops(STOPS).map(stopItem).join("");
}
