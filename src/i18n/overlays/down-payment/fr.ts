export const FR_DOWN_PAYMENT_OVERLAY = {
  title: "Calculateur de Mise de Fonds (Apport Personnel)",
  description: "Calculez la mise de fonds requise, comparez les mensualités avec 3%, 5%, 10% et 20%, l'annulation de l'assurance PMI et les frais de clôture.",
  inputs: {
  "homePrice": "Prix d'Achat du Bien Immobilier",
  "downPaymentPercent": "Pourcentage de Mise de Fonds (%)",
  "downPaymentAmount": "Montant de la Mise de Fonds ($)",
  "interestRate": "Taux d'Intérêt Annuel (%)",
  "loanTermYears": "Durée du Prêt (Années)",
  "propertyTaxRate": "Taux de Taxe Foncière (%)",
  "homeInsuranceAnnual": "Assurance Habitation Annuelle ($)",
  "pmiRate": "Taux d'Assurance PMI (%)",
  "closingCostPercent": "Frais de Clôture Estimés (%)"
},
  outputs: {
  "loanAmount": "Montant Total Emprunté",
  "monthlyPrincipalInterest": "Mensualité (Capital + Intérêts)",
  "monthlyPmi": "Assurance PMI Mensuelle",
  "totalMonthlyPayment": "Paiement Mensuel Total Estimé",
  "cashToClose": "Liquidités Requises à la Clôture",
  "pmiDropOffMonth": "Mois de Suppression du PMI",
  "totalLifetimeInterest": "Total des Intérêts Financés"
}
};

export default FR_DOWN_PAYMENT_OVERLAY;
