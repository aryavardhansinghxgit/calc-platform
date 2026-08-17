export const cdExamples = [
  {
    title: "1-Year High-Yield CD ($10,000 @ 5.0% APY, Daily Compounding)",
    description: "Standard 12-month certificate of deposit with daily compounding and 24% tax drag.",
    inputs: {
      startingDeposit: 10000,
      termMonths: 12,
      rateValue: 5.0,
      rateType: "apy",
      compoundingFrequency: "daily",
      marginalTaxRate: 24,
      inflationRate: 2.5,
    },
  },
  {
    title: "5-Year Retirement CD Ladder ($25,000 Split 5 Ways)",
    description: "Rolling 5-stage CD ladder for annual liquidity and top long-term APY.",
    inputs: {
      totalCapital: 25000,
      stagesCount: 5,
      baseShortRate: 4.25,
      topLongRate: 5.25,
    },
  },
  {
    title: "Early Exit Penalty ($15,000 2-Year CD Broken at Month 6)",
    description: "Calculate net payout after 180 days of simple interest penalty deduction.",
    inputs: {
      originalPrincipal: 15000,
      cdRateApy: 4.8,
      cdTermMonths: 24,
      penaltyDays: 180,
      monthsElapsedBeforeExit: 6,
      newReinvestmentRateApy: 5.5,
    },
  },
];

export default cdExamples;
