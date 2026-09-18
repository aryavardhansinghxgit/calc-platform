export const PT_DOWN_PAYMENT_OVERLAY = {
  title: "Calculadora de Entrada Imobiliária (Down Payment)",
  description: "Calcule a entrada necessária para comprar imóvel, compare parcelas com 3%, 5%, 10% e 20%, eliminação de PMI e custos de fechamento.",
  inputs: {
  "homePrice": "Preço de Compra do Imóvel",
  "downPaymentPercent": "Percentual de Entrada (%)",
  "downPaymentAmount": "Valor da Entrada ($)",
  "interestRate": "Taxa de Juros Anual (%)",
  "loanTermYears": "Prazo do Financiamento (Anos)",
  "propertyTaxRate": "Imposto Predial / IPTU (%)",
  "homeInsuranceAnnual": "Seguro Residencial Anual ($)",
  "pmiRate": "Taxa de Seguro PMI (%)",
  "closingCostPercent": "Custos de Fechamento (%)"
},
  outputs: {
  "loanAmount": "Valor Total Financiado",
  "monthlyPrincipalInterest": "Parcela (Amortização + Juros)",
  "monthlyPmi": "Seguro PMI Mensal",
  "totalMonthlyPayment": "Pagamento Mensal Total",
  "cashToClose": "Recursos Necessários no Fechamento",
  "pmiDropOffMonth": "Mês de Cancelamento do PMI",
  "totalLifetimeInterest": "Juros Totais Financiados"
}
};

export default PT_DOWN_PAYMENT_OVERLAY;
