export const home_equityExamples = [
  {
    title: "Standard Equity Borrowing ($500,000 Home Value)",
    description: "$500,000 home value with $275,000 existing 1st mortgage, 80% CLTV limit, $125,000 15-year loan at 8.0% interest rate.",
    inputs: {
      homeValue: 500000,
      currentMortgageBalance: 275000,
      cltvLimitPct: 80,
      loanAmount: 125000,
      loanTermYears: 15,
      interestRate: 8.0,
      closingCostsAmount: 2500,
      closingCostTreatment: "upfront",
    },
    expectedOutput: {
      maxBorrowableEquity: "$125,000",
      monthlyPayment: "$1,195",
      newCltvPct: "80.0%",
      totalInterestPaid: "$90,011",
    },
  },
  {
    title: "High-Equity Debt Consolidation Profile",
    description: "Borrowing $50,000 equity loan at 8.5% for 5 years to consolidate 22% credit card and 12% personal loan debt.",
    inputs: {
      homeValue: 600000,
      currentMortgageBalance: 250000,
      cltvLimitPct: 80,
      loanAmount: 50000,
      loanTermYears: 5,
      interestRate: 8.5,
    },
    expectedOutput: {
      maxBorrowableEquity: "$230,000",
      monthlyPayment: "$1,026",
    },
  },
];
