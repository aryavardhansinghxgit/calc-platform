export const DE_DOWN_PAYMENT_OVERLAY = {
  title: "Eigenkapital- und Anzahlungsrechner für Immobilien",
  description: "Berechnen Sie das benötigte Eigenkapital für den Immobilienkauf, Monatsraten bei 3%, 5%, 10% und 20% Anzahlung, PMI-Wegfall und Kaufnebenkosten.",
  inputs: {
  "homePrice": "Kaufpreis der Immobilie",
  "downPaymentPercent": "Anzahlungsquote in Prozent (%)",
  "downPaymentAmount": "Anzahlungsbetrag ($)",
  "interestRate": "Sollzinssatz p.a. (%)",
  "loanTermYears": "Darlehenslaufzeit (Jahre)",
  "propertyTaxRate": "Grundsteuersatz (%)",
  "homeInsuranceAnnual": "Jährliche Wohngebäudeversicherung ($)",
  "pmiRate": "PMI-Versicherungssatz (%)",
  "closingCostPercent": "Geschätzte Kaufnebenkosten (%)"
},
  outputs: {
  "loanAmount": "Nettodarlehensbetrag",
  "monthlyPrincipalInterest": "Monatsrate (Zins + Tilgung)",
  "monthlyPmi": "Monatliche PMI-Prämie",
  "totalMonthlyPayment": "Geschätzte monatliche Gesamtrate",
  "cashToClose": "Gesamter Barmittelbedarf bei Kauf",
  "pmiDropOffMonth": "Monat des PMI-Wegfalls",
  "totalLifetimeInterest": "Gesamte Zinskosten"
}
};

export default DE_DOWN_PAYMENT_OVERLAY;
