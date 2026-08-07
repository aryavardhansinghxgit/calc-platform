import { CalculatorModuleDefinition } from "../../types";
import { calculateSipFormula } from "@/lib/calculator-engine/formulas/sip";

export const SIP_CALCULATOR: CalculatorModuleDefinition = {
  id: "sip",
  title: "SIP Calculator",
  slug: "sip-calculator",
  category: "Finance",
  description: "Estimate Systematic Investment Plan returns, compounding growth, and maturity value.",
  iconName: "TrendingUp",
  featured: true,
  tags: ["sip", "mutual funds", "investment", "wealth"],
  formulaDescription: "M = P × [({1 + i}^n - 1) / i] × (1 + i)",
  inputs: [
    {
      name: "monthlyInvestment",
      label: "Monthly Investment",
      type: "currency",
      defaultValue: 500,
      unit: "$",
      min: 50,
      max: 50000,
      step: 50,
    },
    {
      name: "expectedReturnRate",
      label: "Expected Return Rate (p.a.)",
      type: "percentage",
      defaultValue: 12,
      unit: "%",
      min: 1,
      max: 30,
      step: 0.5,
    },
    {
      name: "timePeriodYears",
      label: "Time Period",
      type: "slider",
      defaultValue: 10,
      unit: "years",
      min: 1,
      max: 40,
      step: 1,
    },
  ],
  outputs: [
    {
      name: "totalMaturityValue",
      label: "Total Maturity Value",
      format: "currency",
      highlight: true,
    },
    {
      name: "totalInvested",
      label: "Total Invested Amount",
      format: "currency",
    },
    {
      name: "estimatedReturns",
      label: "Estimated Returns",
      format: "currency",
    },
  ],
  calculate: (inputs) => {
    const res = calculateSipFormula({
      monthlyInvestment: Number(inputs.monthlyInvestment || 500),
      expectedReturnRate: Number(inputs.expectedReturnRate || 12),
      timePeriodYears: Number(inputs.timePeriodYears || 10),
    });
    return {
      totalMaturityValue: res.totalMaturityValue,
      totalInvested: res.totalInvested,
      estimatedReturns: res.estimatedReturns,
    };
  },
};

export default SIP_CALCULATOR;
