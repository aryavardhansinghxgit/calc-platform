export const DE_HELOC_OVERLAY = {
  title: "HELOC-Rechner (Rahmenkredit auf Eigenheimkapital)",
  description: "Berechnen Sie HELOC-Kreditrahmen, reine Zinszahlungen in der Abrufphase, Tilgungsraten in der Rückzahlungsphase und Zinserhöhungsszenarien.",
  inputs: {
  "homeValue": "Marktwert der Immobilie",
  "currentMortgageBalance": "Restschuld der Ersthypothek",
  "helocLineAmount": "Gewünschter HELOC-Kreditrahmen",
  "interestRate": "Variabler Einstiegszinssatz",
  "drawPeriodYears": "Dauer der Abrufphase (Jahre)",
  "repayPeriodYears": "Dauer der Rückzahlungsphase (Jahre)",
  "closingCosts": "Abschlusskosten",
  "annualFee": "Jährliche Kontoführungsgebühr",
  "drawPaymentType": "Zahlungsart in der Abrufphase",
  "cltvLimit": "Maximale CLTV-Beleihungsgrenze",
  "interestRateStress": "Simulierter Zinsanstieg",
  "extraMonthlyPrincipal": "Monatliche Sondertilgung"
},
  outputs: {
  "maxBorrowingPower": "Maximaler HELOC-Kreditrahmen",
  "drawnCltv": "CLTV mit in Anspruch genommenem Betrag",
  "drawMonthlyPayment": "Monatsrate in der Abrufphase",
  "repaymentMonthlyPayment": "Monatsrate in der Rückzahlungsphase",
  "paymentShockIncrease": "Zahlungsschock (Payment Shock)",
  "totalLifetimeInterest": "Geschätzte Gesamtzinsen"
}
};

export default DE_HELOC_OVERLAY;
