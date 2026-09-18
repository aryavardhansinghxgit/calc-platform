export const ES_BUSINESS_LOAN_OVERLAY = {
  title: "Calculadora de Préstamos para Empresas — Cuotas, Intereses, Comisiones, TAE y Análisis Comercial",
  description: "Calcule cuotas mensuales de préstamos comerciales, intereses totales, comisiones bancarias, TAE actuarial real, opciones SBA y ratio de cobertura DSCR.",
  inputs: {
  "loanAmount": "Importe del Préstamo Comercial",
  "interestRate": "Tipo de Interés Fijo Anual (APR %)",
  "loanTermYears": "Plazo de Amortización (Años)",
  "originationFeePercent": "Comisión de Apertura (%)",
  "documentationFeeDollar": "Gastos de Formalización y Gestión ($)"
},
  outputs: {
  "paybackAmount": "Cuota Mensual Fija",
  "totalInterestPaid": "Total de Intereses a Pagar",
  "totalInterestAndFees": "Coste Total (Intereses + Comisiones)",
  "realAprPercent": "TAE Actuarial Real Efectiva"
}
};

export default ES_BUSINESS_LOAN_OVERLAY;
