export const helocExamples = [
  {
    title: "Standard $50,000 HELOC Profile ($500,000 Home Value)",
    description: "$500,000 home value with $260,000 1st mortgage, 80% CLTV limit, $50,000 drawn line at 8.0% interest rate, 10-year interest-only draw and 20-year repayment term.",
    inputs: {
      homeValue: 500000,
      currentMortgageBalance: 260000,
      cltvLimitPct: 80,
      creditLineAmount: 50000,
      drawPeriodYears: 10,
      drawPaymentStructure: "interest_only",
      repaymentPeriodYears: 20,
      interestRate: 8.0,
      closingCostsAmount: 2000,
      closingCostTreatment: "upfront",
      annualMaintenanceFee: 50,
    },
    expectedOutput: {
      maxBorrowableCreditLine: "$140,000",
      drawPeriodMonthlyPayment: "$333/mo",
      repaymentPeriodMonthlyPayment: "$418/mo",
      paymentShockDollarIncrease: "+$85/mo (+25.5%)",
    },
  },
  {
    title: "High-Equity Renovation Draw Profile ($600,000 Home Value)",
    description: "Borrowing $100,000 HELOC at 8.5% for 10-year draw / 20-year repay term.",
    inputs: {
      homeValue: 600000,
      currentMortgageBalance: 250000,
      cltvLimitPct: 80,
      creditLineAmount: 100000,
      drawPeriodYears: 10,
      drawPaymentStructure: "interest_only",
      repaymentPeriodYears: 20,
      interestRate: 8.5,
    },
    expectedOutput: {
      maxBorrowableCreditLine: "$230,000",
      drawPeriodMonthlyPayment: "$708/mo",
      repaymentPeriodMonthlyPayment: "$868/mo",
    },
  },
];
