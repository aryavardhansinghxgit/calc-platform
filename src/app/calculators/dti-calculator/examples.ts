export const dti_calculatorExamples = [
  {
    title: "First-Time Homebuyer Profile",
    description: "$75,000 annual gross salary with $400 monthly student loan payment and $1,800 target housing payment.",
    inputs: {
      incomeFreq: "annual",
      primarySalary: 75000,
      mortgageRentPI: 1800,
      studentLoans: 400,
    },
    expectedOutput: {
      frontEndRatio: "28.8%",
      backEndRatio: "35.2%",
      riskTier: "Manageable / Good",
    },
  },
  {
    title: "High-Debt Professional Profile",
    description: "$120,000 annual gross salary with $1,500 total monthly auto, student loan, and credit card debt.",
    inputs: {
      incomeFreq: "annual",
      primarySalary: 120000,
      mortgageRentPI: 2600,
      autoLoansLeases: 600,
      studentLoans: 500,
      creditCardMinimums: 400,
    },
    expectedOutput: {
      frontEndRatio: "26.0%",
      backEndRatio: "41.0%",
      riskTier: "Manageable / Good",
    },
  },
];
