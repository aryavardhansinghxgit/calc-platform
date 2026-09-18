export const FR_BUSINESS_LOAN_OVERLAY = {
  title: "Calculateur de Prêt Professionnel — Mensualités, Intérêts, Frais, TAEG et Analyse Commerciale",
  description: "Calculez les mensualités de prêts commerciaux, les intérêts totaux, les frais d'origination, le TAEG réel, les options SBA et le ratio de couverture DSCR.",
  inputs: {
  "loanAmount": "Montant du Prêt Professionnel",
  "interestRate": "Taux d'Intérêt Annuel Fixe (APR %)",
  "loanTermYears": "Durée de Remboursement (Années)",
  "originationFeePercent": "Frais d'Origination / Dossier (%)",
  "documentationFeeDollar": "Frais de Gestion et Formalisation ($)"
},
  outputs: {
  "paybackAmount": "Mensualité Constante",
  "totalInterestPaid": "Total des Intérêts à Payer",
  "totalInterestAndFees": "Coût Global (Intérêts + Frais)",
  "realAprPercent": "TAEG Actuariel Réel Effectif"
}
};

export default FR_BUSINESS_LOAN_OVERLAY;
