export const rental_propertyExamples = [
  {
    title: "Turnkey Single-Family Rental ($250k)",
    description: "$250,000 purchase price with 20% down ($50k), $2,200/mo rent, 5% vacancy, 8% management.",
    inputs: {
      purchasePrice: 250000,
      useLoan: true,
      downPaymentPct: 20,
      interestRate: 6.5,
      loanTermYears: 30,
      monthlyRent: 2200,
      vacancyRatePct: 5,
    },
    expectedOutput: {
      monthlyNetCashFlow: "$240",
      capRate: "6.84%",
      cashOnCashReturn: "7.92%",
    },
  },
  {
    title: "BRRRR Value-Add Duplex Profile",
    description: "$150,000 cash purchase with $40,000 rehab, $260,000 ARV, 75% LTV cash-out refinance.",
    inputs: {
      purchasePrice: 150000,
      rehabCost: 40000,
      arv: 260000,
      refinanceLtvPct: 75,
    },
    expectedOutput: {
      cashRecoupedAtRefinance: "$195,000",
      netCapitalTrapped: "-$5,000",
      isInfiniteReturn: "Yes",
    },
  },
];
