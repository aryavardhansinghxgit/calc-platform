export const cashBackExamples = [
  {
    title: "Calculator.net Benchmark ($50,000 Purchase, $1,000 Rebate vs 2% Low Rate)",
    description: "$50,000 vehicle purchase with $10,000 down payment, 60-month loan term, $1,000 rebate @ 5% high rate vs 2% low rate.",
    inputs: {
      autoPrice: 50000,
      cashBackAmount: 1000,
      highInterestRate: 5.0,
      lowInterestRate: 2.0,
      loanTermMonths: 60,
      downPayment: 10000,
      tradeInValue: 0,
      salesTaxRate: 7.0,
      fees: 2000,
    },
    expectedOutput: {
      winningMessage: "The Low Interest Rate Offer is Better!",
      savingsAmount: "$2,092",
    },
  },
  {
    title: "Compact Sedan ($28,000 Purchase, $2,500 Rebate vs 0.9% Low Rate)",
    description: "Shorter 48-month loan term comparison where cash back rebate dominates.",
    inputs: {
      autoPrice: 28000,
      cashBackAmount: 2500,
      highInterestRate: 5.5,
      lowInterestRate: 0.9,
      loanTermMonths: 48,
      downPayment: 5000,
    },
    expectedOutput: {
      winningMessage: "The Cash Back Offer is Better!",
    },
  },
];
