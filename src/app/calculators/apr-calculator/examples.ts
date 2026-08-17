export const apr_calculatorExamples = [
  {
    title: "Standard Personal Loan ($100k)",
    description: "$100,000 loan over 10 years at 6.0% nominal rate with $2,500 upfront fees.",
    inputs: {
      loanAmount: 100000,
      interestRate: 6.0,
      loanTermYears: 10,
      upfrontFees: 2500,
    },
    expectedOutput: {
      realAPR: "6.563%",
      monthlyPayment: "$1,110.21",
      totalInterest: "$33,224.60",
    },
  },
  {
    title: "Mortgage Loan ($280k)",
    description: "$350,000 house with 20% down ($70k), 30-year term at 6.2% rate, $3,500 fees and 0.5 points.",
    inputs: {
      houseValue: 350000,
      downPayment: 70000,
      loanTermYears: 30,
      interestRate: 6.2,
      loanFees: 3500,
      pointsPct: 0.5,
    },
    expectedOutput: {
      realAPR: "6.367%",
      monthlyPayment: "$1,714.91",
      totalUpfrontFees: "$4,900",
    },
  },
];
