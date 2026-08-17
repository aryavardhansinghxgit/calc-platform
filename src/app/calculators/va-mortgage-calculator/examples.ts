export const va_mortgageExamples = [
  {
    title: "Standard Active Duty Purchase ($500,000)",
    description: "$500,000 home purchase with $0 down payment, 30-year term at 6.632% interest rate, and financed 2.15% VA Funding Fee.",
    inputs: {
      homePrice: 500000,
      downPaymentPct: 0,
      militaryStatus: "Active/Veteran",
      usedVALoanBefore: false,
      isDisabilityExempt: false,
      loanTermYears: 30,
      interestRate: 6.632,
    },
    expectedOutput: {
      fundingFeeAmount: "$10,750",
      totalFinancedLoanAmount: "$510,750",
      monthlyPrincipalAndInterest: "$3,270",
      totalMonthlyPiti: "$3,978",
    },
  },
  {
    title: "Disabled Veteran Profile (Exempt Fee)",
    description: "$400,000 home purchase for a veteran with >=10% VA disability rating, resulting in 0% funding fee.",
    inputs: {
      homePrice: 400000,
      downPaymentPct: 0,
      isDisabilityExempt: true,
      loanTermYears: 30,
      interestRate: 6.5,
    },
    expectedOutput: {
      fundingFeeRatePct: "0.0%",
      fundingFeeAmount: "$0",
      totalFinancedLoanAmount: "$400,000",
    },
  },
];
