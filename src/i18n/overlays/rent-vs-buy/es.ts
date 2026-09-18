export const ES_RENT_VS_BUY_OVERLAY = {
  title: "Calculadora de Alquilar frente a Comprar (Rent vs Buy)",
  description: "Compare alquilar y comprar vivienda: cuotas hipotecarias, revalorización, inflación de alquileres, costes irrecuperables y horizonte de equilibrio.",
  inputs: {
  "homePrice": "Precio de Compra de la Vivienda",
  "downPaymentPercent": "Porcentaje de Entrada (%)",
  "interestRate": "Tipo de Interés Hipotecario (%)",
  "loanTermYears": "Plazo de la Hipoteca (Años)",
  "propertyTaxRate": "Impuesto sobre Bienes Inmuebles (%)",
  "homeInsuranceAnnual": "Seguro de Hogar Anual ($)",
  "monthlyRent": "Alquiler Mensual Actual ($)",
  "rentGrowthRate": "Crecimiento Anual del Alquiler (%)",
  "homeAppreciationRate": "Revalorización Anual del Inmueble (%)",
  "investmentReturnRate": "Rentabilidad de Inversiones Alternativas (%)",
  "maintenanceRate": "Mantenimiento Anual Estimado (%)"
},
  outputs: {
  "breakevenYears": "Horizonte de Equilibrio (Años)",
  "netCostBuying30Yr": "Coste Neto Acumulado Comprando (30 Años)",
  "netCostRenting30Yr": "Coste Neto Acumulado Alquilando (30 Años)",
  "netWorthBuying10Yr": "Patrimonio Neto Comprador (10 Años)",
  "netWorthRenting10Yr": "Patrimonio Inquilino Inversor (10 Años)",
  "priceToRentRatio": "Ratio Precio-Alquiler",
  "monthlyUnrecoverableCost": "Coste Mensual Irrecuperable"
}
};

export default ES_RENT_VS_BUY_OVERLAY;
