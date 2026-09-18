export const DE_RENT_VS_BUY_OVERLAY = {
  title: "Mieten oder Kaufen Rechner (Rent vs Buy)",
  description: "Vergleichen Sie Mieten und Kaufen: Hypothekenzinsen, Wertsteigerung, Mieterhöhungen, Opportunitätskosten und Amortisationszeit.",
  inputs: {
  "homePrice": "Kaufpreis der Immobilie",
  "downPaymentPercent": "Eigenkapitalquote (%)",
  "interestRate": "Hypothekenzinssatz (%)",
  "loanTermYears": "Kreditlaufzeit (Jahre)",
  "propertyTaxRate": "Grundsteuersatz (%)",
  "homeInsuranceAnnual": "Wohngebäudeversicherung p.a. ($)",
  "monthlyRent": "Aktuelle Monatskaltmiete ($)",
  "rentGrowthRate": "Jährliche Mietsteigerung (%)",
  "homeAppreciationRate": "Jährliche Wertsteigerung der Immobilie (%)",
  "investmentReturnRate": "Rendite alternativer Geldanlagen (%)",
  "maintenanceRate": "Jährliche Instandhaltungsquote (%)"
},
  outputs: {
  "breakevenYears": "Breakeven-Horizont (Jahre)",
  "netCostBuying30Yr": "Kumulierte Nettokosten Kaufen (30 Jahre)",
  "netCostRenting30Yr": "Kumulierte Nettokosten Mieten (30 Jahre)",
  "netWorthBuying10Yr": "Nettovermögen Käufer (10 Jahre)",
  "netWorthRenting10Yr": "Nettovermögen Mieter (10 Jahre)",
  "priceToRentRatio": "Kaufpreis-Miete-Verhältnis",
  "monthlyUnrecoverableCost": "Monatliche verfallene Kosten"
}
};

export default DE_RENT_VS_BUY_OVERLAY;
