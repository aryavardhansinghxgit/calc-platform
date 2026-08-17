export const fha_loanExamples = [
  {
    title: "First-Time Homebuyer ($350,000 Purchase)",
    description: "$350,000 home purchase with 3.5% down ($12,250), 30-year term at 6.5% interest rate, and financed 1.75% UFMIP.",
    inputs: {
      homePrice: 350000,
      downPaymentPct: 3.5,
      creditScoreBand: "580+",
      loanTermYears: 30,
      interestRate: 6.5,
      financeUfmip: true,
    },
    expectedOutput: {
      baseLoanAmount: "$337,750",
      ufmipAmount: "$5,911",
      totalFinancedLoanAmount: "$343,661",
      monthlyMipAmount: "$155",
      totalMonthlyPiti: "$2,747",
    },
  },
  {
    title: "Low Credit Score Profile (10% Down)",
    description: "$250,000 purchase with 10% down ($25,000) for a borrower with 550 credit score, triggering 11-year MIP drop-off.",
    inputs: {
      homePrice: 250000,
      downPaymentPct: 10.0,
      creditScoreBand: "500-579",
      loanTermYears: 30,
      interestRate: 6.8,
    },
    expectedOutput: {
      baseLoanAmount: "$225,000",
      annualMipRate: "0.50%",
      mipDurationYears: "11 Years",
    },
  },
];
