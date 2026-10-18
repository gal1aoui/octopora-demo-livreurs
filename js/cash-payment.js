// Encaissement en espèces : tous les montants sont des entiers en millimes (1 DT = 1000 millimes).
export function changeDue(dueMillimes, givenMillimes) {
  if (!Number.isInteger(dueMillimes) || !Number.isInteger(givenMillimes)) {
    throw new TypeError("Les montants doivent être des entiers en millimes");
  }
  if (givenMillimes < dueMillimes) {
    throw new RangeError("Le montant remis est inférieur au montant dû");
  }
  return givenMillimes - dueMillimes;
}

export function formatDinars(millimes) {
  const dinars = Math.floor(millimes / 1000);
  const rest = String(millimes % 1000).padStart(3, "0");
  return `${dinars},${rest} DT`;
}
