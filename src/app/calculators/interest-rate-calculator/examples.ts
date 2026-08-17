export const interestRateExamples = [
  {
    title: "Fixed Auto Loan ($30,000 Principal, $580/mo, 5-Yr)",
    description: "Calculate the exact interest rate and true APR for a 60-month car loan.",
    inputs: {
      loanAmount: 30000,
      years: 5,
      months: 0,
      monthlyPayment: 580,
      upfrontFees: 500,
      balloonPayment: 0,
    },
  },
  {
    title: "Lump-Sum Investment ($5,000 to $8,000 in 5 Years)",
    description: "Determine the required annualized growth rate and APY for a single deposit.",
    inputs: {
      startingPrincipal: 5000,
      endingBalance: 8000,
      years: 5,
      months: 0,
      days: 0,
      compoundingFrequency: "monthly",
    },
  },
  {
    title: "High-Yield Savings Compounder",
    description: "Evaluate effective annual yield (APY) across monthly vs daily compounding.",
    inputs: {
      nominalRate: 5.25,
      compoundingFrequency: "daily",
    },
  },
];

export default interestRateExamples;
