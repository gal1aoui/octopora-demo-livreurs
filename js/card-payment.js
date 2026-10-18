// Paiement par carte : le terminal mobile est injecté (il expose charge(montant, reference)).
export async function payByCard(terminal, { amountMillimes, reference }) {
  if (!Number.isInteger(amountMillimes) || amountMillimes <= 0) {
    throw new RangeError("Montant invalide");
  }
  try {
    const result = await terminal.charge(amountMillimes, reference);
    if (result.approved) {
      return { status: "accepte", authCode: result.authCode };
    }
    return { status: "refuse", reason: result.reason ?? "inconnu" };
  } catch {
    return { status: "terminal_indisponible" };
  }
}
