export const FR_VA_OVERLAY = {
  title: "Calculateur de Prêt Hypothécaire VA (Militaires)",
  description: "Calculez les mensualités d'un prêt VA sans apport (0% down), les droits de financement (Funding Fee), le PITI et les exonérations pour invalidité.",
  inputs: {
  "homePrice": "Prix d'Achat du Logement",
  "downPaymentPercent": "Pourcentage d'Apport (%)",
  "interestRate": "Taux Fixe Annuel (%)",
  "loanTermYears": "Durée du Prêt (Années)",
  "militaryCategory": "Catégorie de Service Militaire",
  "vaUsageType": "Usage des Droits VA (1er / Ultérieur)",
  "isDisabilityExempt": "Exonération pour Invalidité (0 % Taxe)",
  "financeFundingFee": "Financer la Taxe dans le Prêt",
  "propertyTaxRate": "Taux de Taxe Foncière (%)",
  "homeInsuranceAnnual": "Assurance Habitation Annuelle ($)",
  "monthlyHoa": "Charges de Copropriété / HOA ($)"
},
  outputs: {
  "baseLoanAmount": "Montant du Prêt de Base",
  "fundingFeeAmount": "Taxe de Financement VA ($)",
  "totalFinancedLoan": "Total du Prêt Financé",
  "monthlyPrincipalInterest": "Mensualité (Principal et Intérêts)",
  "totalMonthlyPiti": "Mensualité Globale (PITI)",
  "vaFundingFeePercent": "Pourcentage de Taxe Appliqué (%)",
  "lifetimeSavingsVsFha": "Économie Totale Estimée vs FHA"
}
};

export default FR_VA_OVERLAY;
