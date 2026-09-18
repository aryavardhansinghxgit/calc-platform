export const PT_VA_OVERLAY = {
  title: "Calculadora de Financiamento VA (Militares)",
  description: "Calcule financiamentos VA com 0% de entrada, taxa de financiamento (Funding Fee), parcelas PITI, isenções por invalidez e comparativo triplo.",
  inputs: {
  "homePrice": "Preço de Compra do Imóvel",
  "downPaymentPercent": "Percentual de Entrada (%)",
  "interestRate": "Taxa de Juros Fixa (%)",
  "loanTermYears": "Prazo do Financiamento (Anos)",
  "militaryCategory": "Categoria de Serviço Militar",
  "vaUsageType": "Uso do Benefício VA (1º / Subsequente)",
  "isDisabilityExempt": "Isenção por Invalidez (0% Taxa)",
  "financeFundingFee": "Financiar Taxa no Contrato",
  "propertyTaxRate": "Alíquota de IPTU (%)",
  "homeInsuranceAnnual": "Seguro Habitacional Anual ($)",
  "monthlyHoa": "Taxa de Condomínio ($)"
},
  outputs: {
  "baseLoanAmount": "Valor do Financiamento Base",
  "fundingFeeAmount": "Taxa de Financiamento VA ($)",
  "totalFinancedLoan": "Total do Financiamento",
  "monthlyPrincipalInterest": "Parcela (Amortização + Juros)",
  "totalMonthlyPiti": "Encargo Mensal Total (PITI)",
  "vaFundingFeePercent": "Alíquota de Taxa Aplicada (%)",
  "lifetimeSavingsVsFha": "Economia Total Estimada vs. FHA"
}
};

export default PT_VA_OVERLAY;
