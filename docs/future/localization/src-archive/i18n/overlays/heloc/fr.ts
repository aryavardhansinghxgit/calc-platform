export const FR_HELOC_OVERLAY = {
  title: "Calculateur de Marge de Crédit HELOC",
  description: "Calculez la capacité d'emprunt HELOC, les mensualités d'intérêts seuls, les paiements en phase de remboursement et les scénarios de hausse de taux.",
  inputs: {
  "homeValue": "Valeur Marchande de la Propriété",
  "currentMortgageBalance": "Solde de la Première Hypothèque",
  "helocLineAmount": "Montant de la Marge HELOC Souhaité",
  "interestRate": "Taux d'Intérêt Variable Initial",
  "drawPeriodYears": "Durée de la Période de Tirage (Ans)",
  "repayPeriodYears": "Durée de la Période de Remboursement (Ans)",
  "closingCosts": "Frais de Clôture Initiaux",
  "annualFee": "Frais Annuels de Gestion",
  "drawPaymentType": "Structure de Paiement en Tirage",
  "cltvLimit": "Plafond Maximal de CLTV",
  "interestRateStress": "Scénario de Hausse des Taux",
  "extraMonthlyPrincipal": "Versement Mensuel Extra de Capital"
},
  outputs: {
  "maxBorrowingPower": "Capacité d'Emprunt Maximale",
  "drawnCltv": "CLTV avec Solde Utilisé",
  "drawMonthlyPayment": "Mensualité en Période de Tirage",
  "repaymentMonthlyPayment": "Mensualité en Phase de Remboursement",
  "paymentShockIncrease": "Choc de Paiement (Payment Shock)",
  "totalLifetimeInterest": "Total des Intérêts Estimés"
}
};

export default FR_HELOC_OVERLAY;
