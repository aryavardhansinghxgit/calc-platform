export const PT_BUSINESS_LOAN_OVERLAY = {
  title: "Calculadora de Empréstimo Empresarial — Parcelas, Juros, Taxas, CET e Análise Comercial",
  description: "Calcule parcelas mensais de empréstimos empresariais, juros totais, taxas de originação, CET/APR atuarial real, opções SBA e cobertura DSCR.",
  inputs: {
  "loanAmount": "Valor do Empréstimo Comercial",
  "interestRate": "Taxa de Juros Anual Fixa (APR %)",
  "loanTermYears": "Prazo de Pagamento (Anos)",
  "originationFeePercent": "Taxa de Abertura / Originação (%)",
  "documentationFeeDollar": "Tarifa de Cadastro e Documentação ($)"
},
  outputs: {
  "paybackAmount": "Parcela Mensal Fixa",
  "totalInterestPaid": "Total de Juros a Pagar",
  "totalInterestAndFees": "Custo Total (Juros + Tarifas)",
  "realAprPercent": "Taxa Efetiva Real (CET/APR)"
}
};

export default PT_BUSINESS_LOAN_OVERLAY;
