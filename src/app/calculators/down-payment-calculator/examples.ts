export const downPaymentExamples = [
  {
    title: "Standard $500,000 Purchase with 20% Down Payment",
    description: "$500,000 home purchase with $100,000 (20%) down payment, 6.5% interest rate, 30-year term, resulting in $0 PMI.",
    inputs: {
      calculationMode: "home_price",
      homePrice: 500000,
      downPaymentPct: 20,
      upfrontCashAvailable: 100000,
      loanTermYears: 30,
      interestRate: 6.5,
      propertyTaxAnnual: 6000,
      homeInsuranceAnnual: 1800,
      pmiRatePct: 0.5,
      hoaDuesMonthly: 0,
      closingCostsPct: 3.0,
    },
    expectedOutput: {
      downPaymentAmount: "$100,000 (20%)",
      loanAmount: "$400,000",
      monthlyPrincipalAndInterest: "$2,528/mo",
      pmiCancellationDateLabel: "No PMI Required ($0)",
    },
  },
  {
    title: "Upfront Cash Available Mode ($100,000 Cash Budget)",
    description: "Determining max affordable home price using $100,000 cash budget at 20% down + 3% closing costs.",
    inputs: {
      calculationMode: "upfront_cash",
      upfrontCashAvailable: 115000,
      downPaymentPct: 20,
      closingCostsPct: 3.0,
      interestRate: 6.5,
      loanTermYears: 30,
    },
    expectedOutput: {
      homePrice: "$500,000",
      downPaymentAmount: "$100,000",
      closingCostsAmount: "$15,000",
    },
  },
];
