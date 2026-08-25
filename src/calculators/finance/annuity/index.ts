import { CalculatorModuleDefinition } from "../../types";
import { calculateAnnuity } from "@/lib/calculator-engine/formulas/annuity";
import { annuityFaqs } from "./faq";

export const ANNUITY_CALCULATOR: CalculatorModuleDefinition = {
  id: "annuity",
  title: "Annuity Calculator — Growth, Accumulation, Annuity Due & Target Planner",
  slug: "annuity-calculator",
  category: "Finance",
  subcategory: "Retirement",
  description:
    "Calculate annuity growth, compare ordinary and due timing, solve contributions needed for a target balance, model monthly or annual deposits, compare scenarios, and see inflation-adjusted results.",
  iconName: "Shield",
  featured: true,
  tags: [
    "annuity",
    "annuity calculator",
    "fixed annuity",
    "annuity due",
    "ordinary annuity",
    "target balance planner",
    "accumulation schedule",
  ],
  formulaDescription:
    "Annuity Due: FV = P(1+r)^n + PMT × [((1+r)^n - 1) / r] × (1+r). Ordinary Annuity: FV = P(1+r)^n + PMT × [((1+r)^n - 1) / r].",
  faqs: annuityFaqs,
  inputs: [
    { name: "startingPrincipal", label: "Starting Principal ($)", type: "currency", defaultValue: 20000, unit: "$", min: 0, max: 10000000, step: 5000 },
    { name: "annualContribution", label: "Annual Contribution ($)", type: "currency", defaultValue: 10000, unit: "$", min: 0, max: 500000, step: 1000 },
    { name: "monthlyContribution", label: "Monthly Contribution ($)", type: "currency", defaultValue: 0, unit: "$", min: 0, max: 50000, step: 100 },
    {
      name: "timing",
      label: "Contribution Timing",
      type: "select",
      defaultValue: "beginning",
      options: [
        { label: "Beginning of period (Annuity Due)", value: "beginning" },
        { label: "End of period (Ordinary Annuity)", value: "end" },
      ],
    },
    { name: "growthRatePercent", label: "Annual Growth Rate (%)", type: "number", defaultValue: 6.0, min: 0, max: 25, step: 0.25 },
    { name: "years", label: "Duration (Years)", type: "number", defaultValue: 10, min: 1, max: 50, step: 1 },
  ],
  outputs: [
    { name: "endBalance", label: "Ending Balance", format: "currency", highlight: true },
    { name: "totalContributions", label: "Total Contributions", format: "currency" },
    { name: "totalInterestEarned", label: "Total Interest Earned", format: "currency", highlight: true },
    { name: "inflationAdjustedRealValue", label: "Inflation-Adjusted Real Value", format: "currency" },
  ],
  calculate: (inputs) => {
    const res = calculateAnnuity({
      startingPrincipal: Number(inputs.startingPrincipal || 20000),
      annualContribution: Number(inputs.annualContribution || 10000),
      monthlyContribution: Number(inputs.monthlyContribution || 0),
      timing: (inputs.timing as any) || "beginning",
      growthRatePercent: Number(inputs.growthRatePercent || 6.0),
      years: Number(inputs.years || 10),
      months: 0,
      inflationRatePercent: 2.5,
      taxRatePercent: 20,
    });

    return {
      endBalance: res.endBalance,
      totalContributions: res.totalContributions,
      totalInterestEarned: res.totalInterestEarned,
      inflationAdjustedRealValue: res.inflationAdjustedRealValue,
    };
  },
};

export default ANNUITY_CALCULATOR;
