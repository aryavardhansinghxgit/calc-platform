export const ES_HELOC_OVERLAY = {
  title: "Calculadora de Línea de Crédito HELOC",
  description: "Calcule la capacidad de endeudamiento HELOC, pagos de solo interés, cuotas de amortización, impacto por salto de pago y pruebas de estrés.",
  inputs: {
  "homeValue": "Valor de Mercado de la Vivienda",
  "currentMortgageBalance": "Saldo Actual de Primera Hipoteca",
  "helocLineAmount": "Límite de Línea HELOC Solicitado",
  "interestRate": "Tipo de Interés Inicial Variable",
  "drawPeriodYears": "Periodo de Disposición (Años)",
  "repayPeriodYears": "Periodo de Amortización (Años)",
  "closingCosts": "Costes de Cierre Iniciales",
  "annualFee": "Comisión Anual de Mantenimiento",
  "drawPaymentType": "Tipo de Pago en Disposición",
  "cltvLimit": "Límite Máximo de CLTV",
  "interestRateStress": "Simulación de Subida de Tipos",
  "extraMonthlyPrincipal": "Pago Extra Mensual de Capital"
},
  outputs: {
  "maxBorrowingPower": "Capacidad Máxima HELOC",
  "drawnCltv": "CLTV con Saldo Dispuesto",
  "drawMonthlyPayment": "Cuota en Fase de Disposición",
  "repaymentMonthlyPayment": "Cuota en Fase de Amortización",
  "paymentShockIncrease": "Salto de Pago (Payment Shock)",
  "totalLifetimeInterest": "Intereses Totales Estimados"
}
};

export default ES_HELOC_OVERLAY;
