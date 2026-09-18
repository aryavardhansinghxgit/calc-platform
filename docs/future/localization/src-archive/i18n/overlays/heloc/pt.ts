export const PT_HELOC_OVERLAY = {
  title: "Calculadora de Linha de Crédito HELOC",
  description: "Calcule limite de crédito HELOC, parcelas de juros na fase de saque, amortização na fase de pagamento e simulações de alta de juros.",
  inputs: {
  "homeValue": "Valor de Mercado do Imóvel",
  "currentMortgageBalance": "Saldo da Primeira Hipoteca",
  "helocLineAmount": "Limite HELOC Pretendido",
  "interestRate": "Taxa Variável Inicial",
  "drawPeriodYears": "Período de Saque (Anos)",
  "repayPeriodYears": "Período de Amortização (Anos)",
  "closingCosts": "Custos Iniciais de Fechamento",
  "annualFee": "Anuidade de Manutenção",
  "drawPaymentType": "Tipo de Pagamento no Saque",
  "cltvLimit": "Limite Máximo de CLTV",
  "interestRateStress": "Simulação de Alta de Juros",
  "extraMonthlyPrincipal": "Amortização Mensal Extra"
},
  outputs: {
  "maxBorrowingPower": "Capacidade Máxima HELOC",
  "drawnCltv": "CLTV com Saldo Utilizado",
  "drawMonthlyPayment": "Parcela na Fase de Saque",
  "repaymentMonthlyPayment": "Parcela na Fase de Amortização",
  "paymentShockIncrease": "Salto de Parcela (Payment Shock)",
  "totalLifetimeInterest": "Juros Totais Estimados"
}
};

export default PT_HELOC_OVERLAY;
