import { CalculatorModuleDefinition } from "../../types";

export const INTEREST_CALCULATOR: CalculatorModuleDefinition = {
  id: "interest",
  title: "Interest Calculator",
  slug: "interest-calculator",
  category: "Finance",
  subcategory: "Investment",
  description: "Calculate simple and compound interest earned over daily, monthly, quarterly, or annual compounding periods.",
  iconName: "TrendingUp",
  featured: false,
  tags: ["interest", "compound interest", "simple interest", "growth"],
  formulaDescription: "Compound Interest: A = P(1 + r/n)^(nt). Simple Interest: A = P(1 + rt).",
  faqs: [
    {
      question: "What is compounding frequency?",
      answer: "Compounding frequency determines how often accumulated interest is added back to the principal balance to earn interest on interest.",
    },
  ],
  inputs: [
    { name: "principal", label: "Initial Principal Amount", type: "currency", defaultValue: 10000, unit: "$", min: 100, max: 10000000, step: 500 },
    { name: "interestRate", label: "Annual Interest Rate", type: "percentage", defaultValue: 7.0, unit: "%", min: 0.1, max: 30, step: 0.1 },
    { name: "timeYears", label: "Investment Duration", type: "slider", defaultValue: 10, unit: "years", min: 1, max: 50, step: 1 },
    {
      name: "compoundingFrequency",
      label: "Compounding Frequency",
      type: "select",
      defaultValue: 12,
      options: [
        { label: "Annually (1/yr)", value: 1 },
        { label: "Quarterly (4/yr)", value: 4 },
        { label: "Monthly (12/yr)", value: 12 },
        { label: "Daily (365/yr)", value: 365 },
      ],
    },
  ],
  outputs: [
    { name: "endBalance", label: "Ending Balance", format: "currency", highlight: true },
    { name: "totalInterest", label: "Total Interest Earned", format: "currency", highlight: true },
  ],
  calculate: (inputs) => {
    const P = Number(inputs.principal || 10000);
    const r = Number(inputs.interestRate || 7.0) / 100;
    const t = Number(inputs.timeYears || 10);
    const n = Number(inputs.compoundingFrequency || 12);

    const endBalance = P * Math.pow(1 + r / n, n * t);
    const totalInterest = endBalance - P;

    return {
      endBalance: Number(endBalance.toFixed(2)),
      totalInterest: Number(totalInterest.toFixed(2)),
    };
  },
};

export default INTEREST_CALCULATOR;
