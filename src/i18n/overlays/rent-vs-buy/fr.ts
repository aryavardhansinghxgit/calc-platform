export const FR_RENT_VS_BUY_OVERLAY = {
  title: "Calculateur Louer ou Acheter (Rent vs Buy)",
  description: "Comparez la location et l'achat immobilier : mensualités, appréciation, hausse des loyers, coût d'opportunité et horizon de rentabilité.",
  inputs: {
  "homePrice": "Prix d'Achat de la Propriété",
  "downPaymentPercent": "Pourcentage d'Apport Personnel (%)",
  "interestRate": "Taux d'Intérêt Hypothécaire (%)",
  "loanTermYears": "Durée du Prêt (Années)",
  "propertyTaxRate": "Taux de Taxe Foncière (%)",
  "homeInsuranceAnnual": "Assurance Habitation Annuelle ($)",
  "monthlyRent": "Loyer Mensuel Initial ($)",
  "rentGrowthRate": "Taux de Croissance Annuel du Loyer (%)",
  "homeAppreciationRate": "Taux d'Appréciation Annuel du Bien (%)",
  "investmentReturnRate": "Rendement des Placements Alternatifs (%)",
  "maintenanceRate": "Frais d'Entretien Annuels (%)"
},
  outputs: {
  "breakevenYears": "Horizon de Rentabilité (Années)",
  "netCostBuying30Yr": "Coût Net Cumulé Achat (30 Ans)",
  "netCostRenting30Yr": "Coût Net Cumulé Location (30 Ans)",
  "netWorthBuying10Yr": "Valeur Nette Acheteur (10 Ans)",
  "netWorthRenting10Yr": "Valeur Nette Locataire Investisseur (10 Ans)",
  "priceToRentRatio": "Ratio Prix / Loyer",
  "monthlyUnrecoverableCost": "Coût Mensuel Irrécupérable"
}
};

export default FR_RENT_VS_BUY_OVERLAY;
