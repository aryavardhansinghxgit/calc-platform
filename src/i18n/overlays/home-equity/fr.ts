export const FR_HOME_EQUITY_OVERLAY = {
  title: "Calculateur de Prêt sur Valeur Domiciliaire",
  description: "Calculez les mensualités fixes d'un prêt sur valeur nette immobilière, le CLTV, le TAEG réel, l'amortissement et la capacité d'emprunt.",
  inputs: {
  "homeValue": "Valeur Estimée de la Propriété",
  "currentMortgageBalance": "Solde Hypothécaire Actuel",
  "loanAmount": "Montant du Prêt Souhaité",
  "interestRate": "Taux d'Intérêt Fixe Annuel",
  "loanTerm": "Durée du Prêt (Années)",
  "closingCosts": "Frais de Clôture Estimés",
  "closingCostMode": "Mode de Règlement des Frais",
  "mode": "Mode de Calcul (Montant / Capacité)",
  "cltvLimit": "Plafond CLTV Maximal",
  "extraMonthlyPayment": "Paiement Mensuel Extra de Capital",
  "grossMonthlyIncome": "Revenu Mensuel Brut",
  "monthlyDebtPayments": "Autres Dettes Mensuelles"
},
  outputs: {
  "monthlyPayment": "Mensualité Fixe",
  "totalInterest": "Total des Intérêts",
  "totalCost": "Coût Total du Financement",
  "maxLoanAmount": "Capacité d'Emprunt Maximale",
  "postLoanCltv": "CLTV Résultant",
  "trueApr": "TAEG Réel Effectif",
  "interestSavings": "Économie d'Intérêts"
}
};

export default FR_HOME_EQUITY_OVERLAY;
