export const PT_RENT_VS_BUY_OVERLAY = {
  title: "Calculadora Alugar ou Comprar Imóvel (Rent vs Buy)",
  description: "Compare alugar e comprar imóvel: parcelas de financiamento, valorização, reajuste de aluguel, custo de oportunidade e ponto de equilíbrio.",
  inputs: {
  "homePrice": "Preço de Compra do Imóvel",
  "downPaymentPercent": "Percentual de Entrada (%)",
  "interestRate": "Taxa de Financiamento (%)",
  "loanTermYears": "Prazo do Financiamento (Anos)",
  "propertyTaxRate": "Alíquota de IPTU (%)",
  "homeInsuranceAnnual": "Seguro Residencial Anual ($)",
  "monthlyRent": "Aluguel Mensal Inicial ($)",
  "rentGrowthRate": "Taxa de Reajuste Anual do Aluguel (%)",
  "homeAppreciationRate": "Taxa de Valorização Anual do Imóvel (%)",
  "investmentReturnRate": "Rentabilidade de Investimentos Alternativos (%)",
  "maintenanceRate": "Taxa de Manutenção Anual (%)"
},
  outputs: {
  "breakevenYears": "Ponto de Equilíbrio (Anos)",
  "netCostBuying30Yr": "Custo Líquido Cumulativo Compra (30 Anos)",
  "netCostRenting30Yr": "Custo Líquido Cumulativo Aluguel (30 Anos)",
  "netWorthBuying10Yr": "Patrimônio Líquido Comprador (10 Anos)",
  "netWorthRenting10Yr": "Patrimônio Inquilino Investidor (10 Anos)",
  "priceToRentRatio": "Índice Preço/Aluguel",
  "monthlyUnrecoverableCost": "Custo Mensal Irrecuperável"
}
};

export default PT_RENT_VS_BUY_OVERLAY;
