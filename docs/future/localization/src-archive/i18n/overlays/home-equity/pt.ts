export const PT_HOME_EQUITY_OVERLAY = {
  title: "Calculadora de Empréstimo com Garantia de Imóvel (Home Equity)",
  description: "Calcule parcelas fixas de empréstimos com garantia de imóvel, CLTV, taxa efetiva anual (TAEG), tabela de amortização e capacidade máxima de crédito.",
  inputs: {
  "homeValue": "Valor Estimado do Imóvel",
  "currentMortgageBalance": "Saldo do Financiamento Atual",
  "loanAmount": "Valor do Empréstimo Pretendido",
  "interestRate": "Taxa de Juros Fixa Anual",
  "loanTerm": "Prazo do Empréstimo (Anos)",
  "closingCosts": "Custos de Fechamento Estimados",
  "closingCostMode": "Forma de Pagamento dos Custos",
  "mode": "Modo de Cálculo (Valor / Capacidade)",
  "cltvLimit": "Limite Máximo de CLTV",
  "extraMonthlyPayment": "Amortização Mensal Extra de Principal",
  "grossMonthlyIncome": "Renda Bruta Mensal",
  "monthlyDebtPayments": "Outros Compromissos Mensais"
},
  outputs: {
  "monthlyPayment": "Parcela Mensal Fixa",
  "totalInterest": "Juros Totais a Pagar",
  "totalCost": "Custo Total Financiado",
  "maxLoanAmount": "Capacidade Máxima de Crédito",
  "postLoanCltv": "CLTV Resultante",
  "trueApr": "Custo Efetivo Anual (TAEG)",
  "interestSavings": "Economia com Pagamentos Extras"
}
};

export default PT_HOME_EQUITY_OVERLAY;
