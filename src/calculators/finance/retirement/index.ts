import { CalculatorModuleDefinition } from "../../types";

export const RETIREMENT_CALCULATOR: CalculatorModuleDefinition = {
  id: "retirement",
  title: "Retirement Calculator",
  slug: "retirement-calculator",
  category: "Finance",
  subcategory: "Retirement",
  description: "Calculate how much nest egg you need to retire comfortably and whether your current savings rate is on track.",
  iconName: "Shield",
  featured: true,
  tags: ["retirement", "nest egg", "401k", "financial independence", "fire"],
  formulaDescription: "FV = Current Savings × (1 + r)^n + Annual Savings × [((1 + r)^n - 1) / r]. Compares against 4% safe withdrawal rule.",
  faqs: [
    {
      question: "What is the 4% safe withdrawal rule?",
      answer: "The 4% rule suggests that retirees can withdraw 4% of their initial portfolio balance in year one, adjusted for inflation thereafter, with a high probability of not running out of money over 30 years.",
    },
  ],
  inputs: [
    { name: "currentAge", label: "Current Age", type: "number", defaultValue: 30, min: 18, max: 80, step: 1 },
    { name: "targetRetirementAge", label: "Target Retirement Age", type: "number", defaultValue: 65, min: 40, max: 85, step: 1 },
    { name: "currentSavings", label: "Current Retirement Savings", type: "currency", defaultValue: 50000, unit: "$", min: 0, max: 10000000, step: 5000 },
    { name: "annualContribution", label: "Annual Contribution", type: "currency", defaultValue: 10000, unit: "$", min: 0, max: 200000, step: 1000 },
    { name: "investmentReturn", label: "Expected Annual Return", type: "percentage", defaultValue: 7.0, unit: "%", min: 1, max: 15, step: 0.5 },
  ],
  outputs: [
    { name: "projectedNestEgg", label: "Projected Nest Egg at Retirement", format: "currency", highlight: true },
    { name: "estimatedAnnualIncome", label: "Estimated Annual Retirement Income (4% Rule)", format: "currency", highlight: true },
    { name: "totalContributions", label: "Total Out-of-Pocket Contributions", format: "currency" },
  ],
  calculate: (inputs) => {
    const age = Number(inputs.currentAge || 30);
    const retAge = Number(inputs.targetRetirementAge || 65);
    const years = Math.max(1, retAge - age);
    const P = Number(inputs.currentSavings || 50000);
    const pmt = Number(inputs.annualContribution || 10000);
    const r = Number(inputs.investmentReturn || 7.0) / 100;

    const fvPrincipal = P * Math.pow(1 + r, years);
    const fvAnnuity = pmt * ((Math.pow(1 + r, years) - 1) / r);
    const totalNestEgg = fvPrincipal + fvAnnuity;
    const annualIncome = totalNestEgg * 0.04;
    const totalContrib = P + (pmt * years);

    return {
      projectedNestEgg: Number(totalNestEgg.toFixed(2)),
      estimatedAnnualIncome: Number(annualIncome.toFixed(2)),
      totalContributions: Number(totalContrib.toFixed(2)),
    };
  },
};

export default RETIREMENT_CALCULATOR;
