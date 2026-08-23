import { CalculatorModuleDefinition } from "../../types";
import { calculateFutureValue } from "@/lib/calculator-engine/formulas/future-value";
import { future_valueFaqs } from "./faq";
import { FutureValueCalculator } from "@/components/calculator/future-value/FutureValueCalculator";
import { FutureValueContent } from "@/components/calculator/future-value/FutureValueContent";

export const FUTURE_VALUE_CALCULATOR: CalculatorModuleDefinition = {
  id: "future-value",
  title: "Future Value Calculator - Compound Growth, Contributions & Goal Planner",
  slug: "future-value-calculator",
  category: "Finance",
  subcategory: "Investment",
  description:
    "Calculate future value for a lump sum and recurring contributions with compounding, contribution timing, inflation, taxes, scenarios, goal planning and model-based Monte Carlo analysis.",
  iconName: "TrendingUp",
  featured: true,
  CustomComponent: FutureValueCalculator,
  ContentComponent: FutureValueContent,
  tags: [
    "future value calculator",
    "future value calculator with monthly contributions",
    "future value of investment calculator",
    "future value formula calculator",
    "compound growth calculator",
    "annuity future value calculator",
    "future value with recurring contributions",
    "future value with inflation",
    "future value goal calculator",
    "investment growth calculator",
    "future value comparison calculator",
    "future value calculator with compounding frequency",
    "future value with step-up contributions",
    "present value vs future value",
    "Monte Carlo investment goal calculator",
  ],
  relatedCalculators: [
    "investment-calculator",
    "savings-calculator",
    "present-value-calculator",
    "retirement-calculator",
    "401k-calculator",
    "ira-calculator",
    "inflation-calculator",
  ],
  formulaDescription: "FV = PV × (1 + r/n)^(n×t) + PMT × [((1 + r/n)^(n×t) - 1) / (r/n)]",
  faqs: future_valueFaqs,
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
