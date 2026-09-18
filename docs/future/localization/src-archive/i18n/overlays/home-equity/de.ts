export const DE_HOME_EQUITY_OVERLAY = {
  title: "Eigenheimkredit-Rechner (Home Equity Loan)",
  description: "Berechnen Sie feste Monatsraten für Eigenheimkredite, Beleihungsauslauf (CLTV), effektiven Jahreszins, Tilgungspläne und maximale Kreditsummen.",
  inputs: {
  "homeValue": "Geschätzter Marktwert der Immobilie",
  "currentMortgageBalance": "Restschuld der Ersthypothek",
  "loanAmount": "Gewünschte Kreditsumme",
  "interestRate": "Fester Sollzinssatz p.a.",
  "loanTerm": "Kreditlaufzeit (Jahre)",
  "closingCosts": "Geschätzte Abschlusskosten",
  "closingCostMode": "Behandlung der Abschlusskosten",
  "mode": "Berechnungsmodus (Wunschbetrag / Höchstgrenze)",
  "cltvLimit": "Maximale CLTV-Beleihungsgrenze",
  "extraMonthlyPayment": "Monatliche Sondertilgung",
  "grossMonthlyIncome": "Monatliches Bruttoeinkommen",
  "monthlyDebtPayments": "Sonstige monatliche Ratenverpflichtungen"
},
  outputs: {
  "monthlyPayment": "Feste Monatsrate",
  "totalInterest": "Gesamte Zinskosten",
  "totalCost": "Gesamter Finanzierungsaufwand",
  "maxLoanAmount": "Maximaler Kreditrahmen",
  "postLoanCltv": "Resultierender CLTV",
  "trueApr": "Effektiver Jahreszins",
  "interestSavings": "Zinsersparnis durch Sondertilgung"
}
};

export default DE_HOME_EQUITY_OVERLAY;
