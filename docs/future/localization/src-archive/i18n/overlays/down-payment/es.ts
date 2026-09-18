export const ES_DOWN_PAYMENT_OVERLAY = {
  title: "Calculadora de Pago Inicial (Entrada Hipotecaria)",
  description: "Calcule la entrada requerida para comprar vivienda, comparativa de cuotas con 3%, 5%, 10% y 20%, eliminación del seguro PMI y costes de cierre.",
  inputs: {
  "homePrice": "Precio de Compra de la Vivienda",
  "downPaymentPercent": "Porcentaje de Pago Inicial (%)",
  "downPaymentAmount": "Importe del Pago Inicial ($)",
  "interestRate": "Tipo de Interés Anual (%)",
  "loanTermYears": "Plazo del Préstamo (Años)",
  "propertyTaxRate": "Impuesto sobre Bienes Inmuebles (%)",
  "homeInsuranceAnnual": "Seguro de Hogar Anual ($)",
  "pmiRate": "Tasa de Seguro PMI (%)",
  "closingCostPercent": "Costes de Cierre Estimados (%)"
},
  outputs: {
  "loanAmount": "Importe Total del Préstamo",
  "monthlyPrincipalInterest": "Cuota Mensual (Capital + Interés)",
  "monthlyPmi": "Cuota Mensual de PMI",
  "totalMonthlyPayment": "Pago Mensual Total Estimado",
  "cashToClose": "Total Efectivo Necesario al Cierre",
  "pmiDropOffMonth": "Mes de Cancelación del PMI",
  "totalLifetimeInterest": "Intereses Totales Financiados"
}
};

export default ES_DOWN_PAYMENT_OVERLAY;
