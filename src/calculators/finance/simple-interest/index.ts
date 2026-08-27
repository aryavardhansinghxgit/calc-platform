import { CalculatorModuleDefinition } from "../../types";
import { calculateSimpleInterestFormula } from "@/lib/calculator-engine/formulas/simple-interest";
import { SIMPLE_INTEREST_FAQS } from "./faq";

export const SIMPLE_INTEREST_CALCULATOR: CalculatorModuleDefinition = {
  id: "simple-interest",
  title: "Simple Interest Calculator",
  slug: "simple-interest-calculator",
  category: "Finance",
  subcategory: "Investment",
  description:
    "Use our Simple Interest Calculator to calculate interest, final balance, principal, rate, or time. Compare simple and compound interest with yearly schedules and step-by-step calculations.",
  iconName: "TrendingUp",
  featured: true,
  tags: [
    "simple interest calculator",
    "simple interest formula",
    "calculate simple interest",
    "simple interest calculator online",
    "simple interest on principal",
    "simple interest rate calculator",
    "simple interest time calculator",
    "simple interest vs compound interest",
    "simple interest formula with examples",
  ],
  formulaDescription:
    "Calculates simple interest (I = P × r × t) and total ending balance (A = P + I), supports inverse solving for Principal, Rate, or Term, handles multi-unit conversions (years, months, weeks, days), and provides linear schedules and compound comparisons.",
  faqs: SIMPLE_INTEREST_FAQS,
  inputs: [
    { name: "principal", label: "Principal Amount", type: "currency", defaultValue: 20000, unit: "$", min: 0, max: 1000000000, step: 500 },
    { name: "interestRate", label: "Annual Interest Rate", type: "percentage", defaultValue: 3.0, unit: "%", min: 0, max: 100, step: 0.1 },
    { name: "timeYears", label: "Time Duration", type: "slider", defaultValue: 10, unit: "years", min: 0, max: 50, step: 1 },
  ],
  outputs: [
    { name: "totalInterest", label: "Total Simple Interest", format: "currency", highlight: true },
    { name: "totalAmount", label: "Final Ending Balance", format: "currency" },
  ],
  calculate: (inputs) => {
    const res = calculateSimpleInterestFormula({
      mode: "balance",
      principal: Number(inputs.principal ?? 20000),
      annualRatePercent: Number(inputs.interestRate ?? 3.0),
      term: Number(inputs.timeYears ?? 10),
      timeUnit: "years",
    });

    return {
      totalInterest: res.totalInterest,
      totalAmount: res.finalBalance,
    };
  },
};

export default SIMPLE_INTEREST_CALCULATOR;
