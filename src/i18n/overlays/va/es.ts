export const ES_VA_OVERLAY = {
  title: "Calculadora de Hipoteca VA (Préstamos Militares)",
  description: "Calcule cuotas de hipotecas VA sin entrada (0% down), tasa de financiación (Funding Fee), desglose PITI, exenciones por discapacidad y comparativa 3-vías.",
  inputs: {
  "homePrice": "Precio de Compra de la Vivienda",
  "downPaymentPercent": "Porcentaje de Entrada (%)",
  "interestRate": "Tipo de Interés Fijo (%)",
  "loanTermYears": "Plazo del Préstamo (Años)",
  "militaryCategory": "Categoría de Servicio Militar",
  "vaUsageType": "Uso del Beneficio VA (1º / Posterior)",
  "isDisabilityExempt": "Exención por Discapacidad (0% Tasa)",
  "financeFundingFee": "Financiar Tasa en el Préstamo",
  "propertyTaxRate": "Impuesto sobre Bienes Inmuebles (%)",
  "homeInsuranceAnnual": "Seguro de Hogar Anual ($)",
  "monthlyHoa": "Cuota de Comunidad / HOA ($)"
},
  outputs: {
  "baseLoanAmount": "Importe del Préstamo Base",
  "fundingFeeAmount": "Tasa de Financiación VA ($)",
  "totalFinancedLoan": "Total del Préstamo Financiado",
  "monthlyPrincipalInterest": "Cuota Mensual (Principal e Interés)",
  "totalMonthlyPiti": "Pago Mensual Total (PITI)",
  "vaFundingFeePercent": "Porcentaje de Tasa Aplicable (%)",
  "lifetimeSavingsVsFha": "Ahorro Total Estimado frente a FHA"
}
};

export default ES_VA_OVERLAY;
