const HOUR = new Intl.DateTimeFormat("fr-FR", { hour: "2-digit", minute: "2-digit", timeZone: "UTC" });

const SAMPLE = [
  { livreur: "Karim B.", arrets: 4, livres: 2, echecs: 0, premiere_livraison: "2026-10-30T07:42:00Z", derniere_livraison: "2026-10-30T08:15:00Z" },
  { livreur: "Nadia S.", arrets: 2, livres: 1, echecs: 1, premiere_livraison: "2026-10-30T06:58:00Z", derniere_livraison: "2026-10-30T06:58:00Z" },
];

export function formatHour(iso) {
  return iso ? HOUR.format(new Date(iso)) : "–";
}

export function reportRow(row) {
  return `<tr><td>${row.livreur}</td><td>${row.livres}/${row.arrets}</td><td>${row.echecs}</td>
    <td>${formatHour(row.premiere_livraison)}</td><td>${formatHour(row.derniere_livraison)}</td></tr>`;
}

if (typeof document !== "undefined") {
  document.getElementById("rapport").innerHTML = SAMPLE.map(reportRow).join("");
}
