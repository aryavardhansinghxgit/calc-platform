export const rent_calculatorExamples = [
  {
    title: "Recent College Graduate Profile",
    description: "$55,000 annual gross salary with $350 monthly student loan debt payment.",
    inputs: {
      incomeFrequency: "annual",
      grossIncome: 55000,
      monthlyDebt: 350,
      rulePreset: "30",
    },
    expectedOutput: {
      maxMonthlyRent: "$1,375",
      recommendedRange: "$917 - $1,375",
      dtiStatus: "Comfortable",
    },
  },
  {
    title: "Dual-Income Couple Profile",
    description: "$130,000 joint annual gross salary with $800 total monthly debt obligation.",
    inputs: {
      incomeFrequency: "annual",
      grossIncome: 130000,
      monthlyDebt: 800,
      rulePreset: "30",
    },
    expectedOutput: {
      maxMonthlyRent: "$3,250",
      recommendedRange: "$2,167 - $3,250",
      dtiStatus: "Comfortable",
    },
  },
];
