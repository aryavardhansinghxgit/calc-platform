export const ES_HOME_EQUITY_OVERLAY = {
  title: "Calculadora de Préstamo con Garantía Hipotecaria",
  description: "Calcule cuotas fijas de préstamos sobre el valor neto de la vivienda, CLTV, TAE real, amortización y capacidad de endeudamiento.",
  inputs: {
  "homeValue": "Valor Estimado de la Vivienda",
  "currentMortgageBalance": "Saldo de Hipoteca Existente",
  "loanAmount": "Importe del Préstamo con Garantía",
  "interestRate": "Tipo de Interés Fijo Anual",
  "loanTerm": "Plazo del Préstamo (Años)",
  "closingCosts": "Costes de Cierre Estimados",
  "closingCostMode": "Tratamiento de Costes de Cierre",
  "mode": "Modo de Cálculo (Importe / Capacidad)",
  "cltvLimit": "Límite Máximo de CLTV",
  "extraMonthlyPayment": "Pago Mensual Extra de Principal",
  "grossMonthlyIncome": "Ingresos Brutos Mensuales",
  "monthlyDebtPayments": "Otros Pagos Mensuales de Deuda"
},
  outputs: {
  "monthlyPayment": "Cuota Mensual Fija",
  "totalInterest": "Total de Intereses a Pagar",
  "totalCost": "Coste Total Financiado",
  "maxLoanAmount": "Capacidad Máxima Disponible",
  "postLoanCltv": "CLTV Resultante Posterior",
  "trueApr": "TAE Real Efectiva",
  "interestSavings": "Ahorro en Intereses por Pagos Extra"
}
};

export default ES_HOME_EQUITY_OVERLAY;
