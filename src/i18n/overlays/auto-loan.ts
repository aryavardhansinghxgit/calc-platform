import { Locale } from "../types";

export interface AutoLoanLocaleOverlay {
  locale: Locale;
  tabPayment: string;
  tabAffordable: string;
  tabComparison: string;
  vehiclePriceLabel: string;
  downPaymentLabel: string;
  tradeInLabel: string;
  interestRateLabel: string;
  loanTermLabel: string;
  salesTaxLabel: string;
  feesLabel: string;
  calculateBtn: string;
  resetBtn: string;
  monthlyPaymentLabel: string;
  totalInterestLabel: string;
  totalCostLabel: string;
  amortizationTableTitle: string;
}

export const AUTO_LOAN_OVERLAYS: Record<Locale, AutoLoanLocaleOverlay> = {
  en: {
    locale: "en",
    tabPayment: "Monthly Payment",
    tabAffordable: "Vehicle Affordability",
    tabComparison: "Compare Loan Terms",
    vehiclePriceLabel: "Vehicle Purchase Price",
    downPaymentLabel: "Cash Down Payment",
    tradeInLabel: "Trade-in Allowance",
    interestRateLabel: "Annual Interest Rate (APR %)",
    loanTermLabel: "Loan Term (Months)",
    salesTaxLabel: "Sales Tax Rate (%)",
    feesLabel: "Registration & Dealer Fees",
    calculateBtn: "Calculate Auto Loan",
    resetBtn: "Reset Defaults",
    monthlyPaymentLabel: "Monthly Loan Payment",
    totalInterestLabel: "Total Interest Paid",
    totalCostLabel: "Total Vehicle Loan Cost",
    amortizationTableTitle: "Auto Loan Amortization Schedule",
  },

  es: {
    locale: "es",
    tabPayment: "Pago Mensual (Cuota)",
    tabAffordable: "Capacidad de Compra",
    tabComparison: "Comparar Plazos",
    vehiclePriceLabel: "Precio del Vehículo",
    downPaymentLabel: "Entrada en Efectivo (Enganche)",
    tradeInLabel: "Valor de Canje / Retoma",
    interestRateLabel: "Tipo de Interés Anual (TIN / TAE %)",
    loanTermLabel: "Plazo del Préstamo (Meses)",
    salesTaxLabel: "Impuesto sobre las Ventas (IVA %)",
    feesLabel: "Gastos de Matriculación y Trámites",
    calculateBtn: "Calcular Préstamo Coche",
    resetBtn: "Restablecer",
    monthlyPaymentLabel: "Cuota Mensual Estimada",
    totalInterestLabel: "Total de Intereses a Pagar",
    totalCostLabel: "Coste Total de la Financiación",
    amortizationTableTitle: "Tabla de Amortización del Préstamo Auto",
  },

  fr: {
    locale: "fr",
    tabPayment: "Mensualité du Prêt",
    tabAffordable: "Capacité d'Achat",
    tabComparison: "Comparer les Durées",
    vehiclePriceLabel: "Prix d'Achat du Véhicule",
    downPaymentLabel: "Apport Personnel",
    tradeInLabel: "Valeur de Reprise",
    interestRateLabel: "Taux d'Intérêt Annuel (TAEG %)",
    loanTermLabel: "Durée du Crédit (Mois)",
    salesTaxLabel: "Taxes / TVA (%)",
    feesLabel: "Frais d'Immatriculation & Dossier",
    calculateBtn: "Calculer le Crédit Auto",
    resetBtn: "Réinitialiser",
    monthlyPaymentLabel: "Mensualité Estimée",
    totalInterestLabel: "Total des Intérêts Payés",
    totalCostLabel: "Coût Total du Crédit Auto",
    amortizationTableTitle: "Tableau d'Amortissement du Crédit Auto",
  },

  de: {
    locale: "de",
    tabPayment: "Monatliche Rate",
    tabAffordable: "Erschwinglicher Kaufpreis",
    tabComparison: "Laufzeiten vergleichen",
    vehiclePriceLabel: "Fahrzeugkaufpreis",
    downPaymentLabel: "Anzahlung",
    tradeInLabel: "Inzahlungnahme-Wert",
    interestRateLabel: "Effektiver Jahreszins (%)",
    loanTermLabel: "Laufzeit (Monate)",
    salesTaxLabel: "Mehrwertsteuer (%)",
    feesLabel: "Zulassung & Bereitstellungskosten",
    calculateBtn: "Autokredit berechnen",
    resetBtn: "Zurücksetzen",
    monthlyPaymentLabel: "Geschätzte Monatsrate",
    totalInterestLabel: "Gesamte Zinskosten",
    totalCostLabel: "Gesamtkosten des Kredits",
    amortizationTableTitle: "Tilgungsplan für Autokredit",
  },

  hi: {
    locale: "hi",
    tabPayment: "मासिक किस्त (EMI)",
    tabAffordable: "वाहन खरीदने की क्षमता",
    tabComparison: "ऋण अवधियों की तुलना",
    vehiclePriceLabel: "वाहन का खरीद मूल्य",
    downPaymentLabel: "डाउन पेमेंट (प्रारंभिक भुगतान)",
    tradeInLabel: "पुरानी गाड़ी का एक्सचेंज मूल्य",
    interestRateLabel: "वार्षिक ब्याज दर (Interest Rate %)",
    loanTermLabel: "ऋण अवधि (महीने)",
    salesTaxLabel: "बिक्री कर / GST (%)",
    feesLabel: "पंजीकरण एवं डीलर शुल्क",
    calculateBtn: "कार लोन की गणना करें",
    resetBtn: "रीसेट करें",
    monthlyPaymentLabel: "मासिक ईएमआई (Monthly Payment)",
    totalInterestLabel: "कुल देय ब्याज",
    totalCostLabel: "ऋण की कुल लागत",
    amortizationTableTitle: "कार लोन पुनर्भुगतान अनुसूची",
  },

  pt: {
    locale: "pt",
    tabPayment: "Parcela Mensal",
    tabAffordable: "Capacidade de Compra",
    tabComparison: "Comparar Prazos",
    vehiclePriceLabel: "Preço de Compra do Veículo",
    downPaymentLabel: "Entrada em Dinheiro",
    tradeInLabel: "Valor de Troca do Usado",
    interestRateLabel: "Taxa de Juros Anual (CET %)",
    loanTermLabel: "Prazo do Financiamento (Meses)",
    salesTaxLabel: "Impostos e Tributos (%)",
    feesLabel: "Taxas de Registro e Despachante",
    calculateBtn: "Calcular Financiamento de Veículo",
    resetBtn: "Redefinir",
    monthlyPaymentLabel: "Valor da Parcela Mensal",
    totalInterestLabel: "Total de Juros Pagos",
    totalCostLabel: "Custo Total do Financiamento",
    amortizationTableTitle: "Tabela de Amortização do Financiamento Auto",
  },
};

export function getAutoLoanOverlay(locale: string): AutoLoanLocaleOverlay {
  return AUTO_LOAN_OVERLAYS[locale as Locale] || AUTO_LOAN_OVERLAYS.en;
}
