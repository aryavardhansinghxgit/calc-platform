export const DE_VA_OVERLAY = {
  title: "VA-Hypothekenrechner (Militär- und Veteranendarlehen)",
  description: "Berechnen Sie VA-Darlehen ohne Anzahlung (0% Down), Fördergebühr (Funding Fee), monatliche PITI-Raten, Invaliditätsbefreiung und 3-Wege-Vergleich.",
  inputs: {
  "homePrice": "Kaufpreis der Immobilie",
  "downPaymentPercent": "Anzahlungsquote (%)",
  "interestRate": "Fester Sollzinssatz (%)",
  "loanTermYears": "Darlehenslaufzeit (Jahre)",
  "militaryCategory": "Militärische Dienstkategorie",
  "vaUsageType": "Nutzung des VA-Anspruchs (Erst / Folge)",
  "isDisabilityExempt": "Befreiung bei Dienstbeschädigung (0 % Gebühr)",
  "financeFundingFee": "Gebühr im Darlehen mitfinanzieren",
  "propertyTaxRate": "Grundsteuersatz (%)",
  "homeInsuranceAnnual": "Wohngebäudeversicherung p.a. ($)",
  "monthlyHoa": "Monatliches Hausgeld ($)"
},
  outputs: {
  "baseLoanAmount": "Basisdarlehensbetrag",
  "fundingFeeAmount": "VA-Fördergebühr ($)",
  "totalFinancedLoan": "Gesamtes finanziertes Darlehen",
  "monthlyPrincipalInterest": "Monatliche Rate (Zins + Tilgung)",
  "totalMonthlyPiti": "Monatliche PITI-Gesamtrate",
  "vaFundingFeePercent": "Angewendeter Gebührensatz (%)",
  "lifetimeSavingsVsFha": "Geschätzte Gesamtersparnis vs. FHA"
}
};

export default DE_VA_OVERLAY;
