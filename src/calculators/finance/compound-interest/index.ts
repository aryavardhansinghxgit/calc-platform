import { CalculatorModuleDefinition } from "../../types";
import { calculateCompoundInterestFormula } from "@/lib/calculator-engine/formulas/compound-interest";

export const COMPOUND_INTEREST_CALCULATOR: CalculatorModuleDefinition = {
  id: "compound-interest",
  title: "Compound Interest Calculator",
  slug: "compound-interest-calculator",
  category: "Finance",
  subcategory: "Investment",
  description: "Calculate compounding growth for savings, fixed deposits, and long-term investments.",
  iconName: "TrendingUp",
  featured: true,
  tags: ["compound interest", "savings", "interest rate", "fixed deposit"],
  formulaDescription: "A = P(1 + r/n)^(nt)",
  inputs: [
    {
      name: "principal",
      label: "Initial Principal",
      type: "currency",
      defaultValue: 10000,
      unit: "$",
      min: 100,
      max: 1000000,
      step: 100,
    },
    {
      name: "annualInterestRate",
      label: "Annual Interest Rate",
      type: "percentage",
      defaultValue: 7,
      unit: "%",
      min: 0.1,
      max: 25,
      step: 0.1,
    },
    {
      name: "years",
      label: "Length of Time",
      type: "slider",
      defaultValue: 5,
      unit: "years",
      min: 1,
      max: 30,
      step: 1,
    },
  ],
  outputs: [
    {
      name: "futureValue",
      label: "Future Investment Value",
      format: "currency",
      highlight: true,
    },
    {
      name: "principal",
      label: "Initial Principal",
      format: "currency",
    },
    {
      name: "totalInterestEarned",
      label: "Total Interest Earned",
      format: "currency",
    },
  ],
  calculate: (inputs) => {
    const res = calculateCompoundInterestFormula({
      principal: Number(inputs.principal || 10000),
      annualInterestRate: Number(inputs.annualInterestRate || 7),
      years: Number(inputs.years || 5),
    });
    return {
      futureValue: res.futureValue,
      principal: res.principal,
      totalInterestEarned: res.totalInterestEarned,
    };
  },
};

export default COMPOUND_INTEREST_CALCULATOR;
