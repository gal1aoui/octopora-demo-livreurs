import { STOPS } from "./sample-tournee.js";

export function sortStops(stops) {
  return [...stops].sort((a, b) => a.ordre - b.ordre);
}

export function stopItem(stop) {
  return `<li class="stop">
    <span class="stop-order">${stop.ordre}</span>
    <div><strong>${stop.destinataire}</strong><br><span class="muted">${stop.adresse}</span></div>
  </li>`;
}

if (typeof document !== "undefined") {
  document.getElementById("arrets").innerHTML = sortStops(STOPS).map(stopItem).join("");
}
