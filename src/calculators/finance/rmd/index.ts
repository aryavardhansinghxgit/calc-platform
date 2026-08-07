import { CalculatorModuleDefinition } from "../../types";

export const RMD_CALCULATOR: CalculatorModuleDefinition = {
  id: "rmd",
  title: "RMD Calculator",
  slug: "rmd-calculator",
  category: "Finance",
  subcategory: "Retirement",
  description: "Calculate Required Minimum Distributions (RMD) from traditional IRAs and 401(k) accounts starting at age 73.",
  iconName: "Shield",
  featured: false,
  tags: ["rmd", "required minimum distribution", "ira distribution", "irs rmd"],
  formulaDescription: "RMD = Prior Year-End Account Balance / IRS Distribution Period Factor based on age.",
  faqs: [
    {
      question: "What is an RMD?",
      answer: "A Required Minimum Distribution (RMD) is the mandatory minimum amount you must withdraw from tax-deferred retirement accounts annually beginning at age 73.",
    },
  ],
  inputs: [
    { name: "currentAge", label: "Your Current Age", type: "number", defaultValue: 73, min: 73, max: 100, step: 1 },
    { name: "priorYearEndBalance", label: "Prior Dec 31 Total Balance", type: "currency", defaultValue: 500000, unit: "$", min: 1000, max: 10000000, step: 10000 },
  ],
  outputs: [
    { name: "rmdAmount", label: "Required Minimum Distribution (RMD)", format: "currency", highlight: true },
    { name: "monthlyRmd", label: "Equivalent Monthly Withdrawal", format: "currency" },
    { name: "remainingBalance", label: "Remaining Account Balance", format: "currency" },
  ],
  calculate: (inputs) => {
    const age = Math.max(73, Number(inputs.currentAge || 73));
    const bal = Number(inputs.priorYearEndBalance || 500000);

    // Uniform Lifetime Table distribution factors (sample IRS factors)
    const factorMap: Record<number, number> = {
      73: 26.5, 74: 25.5, 75: 24.6, 76: 23.7, 77: 22.9,
      78: 22.0, 79: 21.1, 80: 20.2, 81: 19.4, 82: 18.5,
      83: 17.7, 84: 16.8, 85: 16.0, 86: 15.2, 87: 14.4,
      88: 13.7, 89: 12.9, 90: 12.2, 91: 11.5, 92: 10.8,
    };

    const factor = factorMap[age] || Math.max(5.0, 26.5 - (age - 73) * 0.8);
    const rmd = bal / factor;
    const monthly = rmd / 12;
    const remaining = bal - rmd;

    return {
      rmdAmount: Number(rmd.toFixed(2)),
      monthlyRmd: Number(monthly.toFixed(2)),
      remainingBalance: Number(remaining.toFixed(2)),
    };
  },
};

export default RMD_CALCULATOR;
