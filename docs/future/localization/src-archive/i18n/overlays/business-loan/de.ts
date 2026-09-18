export const DE_BUSINESS_LOAN_OVERLAY = {
  title: "Geschäftskredit-Rechner — Raten, Zinsen, Gebühren, Effektivzins & Gewerbliche Finanzierungsanalyse",
  description: "Berechnen Sie monatliche Raten für Firmenkredite, Gesamtzinsen, Bearbeitungsgebühren, versicherungsmathematischen Effektivzins, SBA-Kredite und DSCR-Deckung.",
  inputs: {
  "loanAmount": "Geschäftskreditbetrag",
  "interestRate": "Fester Jahreszinssatz (APR %)",
  "loanTermYears": "Kreditlaufzeit (Jahre)",
  "originationFeePercent": "Abschluss- / Bearbeitungsgebühr (%)",
  "documentationFeeDollar": "Dokumentations- und Verwaltungsgebühr ($)"
},
  outputs: {
  "paybackAmount": "Monatliche Rate",
  "totalInterestPaid": "Gezahlte Gesamtzinsen",
  "totalInterestAndFees": "Gesamtkosten (Zinsen + Gebühren)",
  "realAprPercent": "Effektiver Jahreszins (Effektiv-APR)"
}
};

export default DE_BUSINESS_LOAN_OVERLAY;
