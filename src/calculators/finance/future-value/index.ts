import { CalculatorModuleDefinition } from "../../types";
import { calculateFutureValue } from "@/lib/calculator-engine/formulas/future-value";

export const FUTURE_VALUE_CALCULATOR: CalculatorModuleDefinition = {
  id: "future-value",
  title: "Future Value Calculator – Advanced Wealth & Compound Growth Model",
  slug: "future-value-calculator",
  category: "Finance",
  subcategory: "Investment",
  description:
    "Calculate the future value of investments, lump sums, and recurring contributions with compounding frequencies, inflation adjustment, step-up contributions, tax drag, scenario comparisons, and goal-based planning.",
  iconName: "TrendingUp",
  featured: true,
  tags: [
    "future value calculator",
    "fv calculator",
    "investment growth calculator",
    "future investment calculator",
    "investment return calculator",
    "compound growth calculator",
    "savings growth calculator",
    "retirement growth calculator",
    "future wealth calculator",
    "fv formula calculator",
    "time value of money",
    "tvm",
    "annuity due",
  ],
  formulaDescription: "FV = PV × (1 + r/n)^(n×t) + PMT × [((1 + r/n)^(n×t) - 1) / (r/n)]",
  faqs: [
    {
      question: "What is Future Value (FV)?",
      answer:
        "Future Value (FV) is a financial calculation that estimates how much an asset, lump sum, or stream of cash flows will be worth at a specific date in the future, given a specified expected rate of interest or investment growth.",
    },
    {
      question: "How is Future Value calculated?",
      answer:
        "For a single lump sum, Future Value is calculated using FV = PV × (1 + r/n)^(n×t). For periodic deposits, annuity formulas account for recurring contributions made over time.",
    },
    {
      question: "What is the difference between Present Value (PV) and Future Value (FV)?",
      answer:
        "Present Value (PV) represents the current worth of a future sum of money discounted at a specific rate. Future Value (FV) represents what current money will accumulate to over time when compounded.",
    },
    {
      question: "How does inflation affect Future Value?",
      answer:
        "Inflation reduces purchasing power over time. Real Future Value discounts nominal Future Value using the annual inflation rate: FV_real = FV_nominal / (1 + i)^t.",
    },
  ],
  inputs: [
    { name: "initialInvestment", label: "Initial Investment (PV)", type: "currency", defaultValue: 10000, unit: "$", min: 0, max: 10000000, step: 500 },
    { name: "periodicContribution", label: "Periodic Contribution (PMT)", type: "currency", defaultValue: 500, unit: "$", min: 0, max: 100000, step: 50 },
    { name: "interestRate", label: "Expected Annual Interest Rate", type: "percentage", defaultValue: 8.0, unit: "%", min: 0.1, max: 30, step: 0.1 },
    { name: "years", label: "Investment Duration (Years)", type: "slider", defaultValue: 10, unit: "years", min: 1, max: 50, step: 1 },
  ],
  outputs: [
    { name: "futureValue", label: "Future Value (FV)", format: "currency", highlight: true },
    { name: "totalInvested", label: "Total Invested", format: "currency" },
    { name: "totalInterestEarned", label: "Total Interest Earned", format: "currency" },
    { name: "inflationAdjustedFV", label: "Real Inflation-Adjusted FV", format: "currency" },
  ],
  calculate: (inputs) => {
    const res = calculateFutureValue({
      initialInvestment: Number(inputs.initialInvestment || 10000),
      periodicContribution: Number(inputs.periodicContribution || 500),
      interestRate: Number(inputs.interestRate || 8.0),
      years: Number(inputs.years || 10),
      compoundingFrequency: "monthly",
      contributionFrequency: "monthly",
      contributionTiming: "end",
    });

    return {
      futureValue: res.futureValue,
      totalInvested: res.totalInvested,
      totalInterestEarned: res.totalInterestEarned,
      inflationAdjustedFV: res.inflationAdjustedFV,
    };
  },
};

export default FUTURE_VALUE_CALCULATOR;
