import { CalculatorModuleDefinition } from "../../types";

export const SIMPLE_INTEREST_CALCULATOR: CalculatorModuleDefinition = {
  id: "simple-interest",
  title: "Simple Interest Calculator",
  slug: "simple-interest-calculator",
  category: "Finance",
  subcategory: "Investment",
  description: "Calculate simple interest earned without compounding over a given principal and duration.",
  iconName: "TrendingUp",
  featured: false,
  tags: ["simple interest", "interest formula", "principal"],
  formulaDescription: "Interest = Principal × Rate × Time. Total Amount = Principal + Interest.",
  faqs: [
    {
      question: "How does simple interest differ from compound interest?",
      answer: "Simple interest is calculated solely on the principal amount, whereas compound interest is calculated on principal plus accumulated interest.",
    },
  ],
  inputs: [
    { name: "principal", label: "Principal Amount", type: "currency", defaultValue: 5000, unit: "$", min: 100, max: 10000000, step: 500 },
    { name: "interestRate", label: "Annual Interest Rate", type: "percentage", defaultValue: 5.0, unit: "%", min: 0.1, max: 30, step: 0.1 },
    { name: "timeYears", label: "Time Duration", type: "slider", defaultValue: 5, unit: "years", min: 1, max: 30, step: 1 },
  ],
  outputs: [
    { name: "totalInterest", label: "Total Interest Earned", format: "currency", highlight: true },
    { name: "totalAmount", label: "Total Ending Amount", format: "currency" },
  ],
  calculate: (inputs) => {
    const P = Number(inputs.principal || 5000);
    const r = Number(inputs.interestRate || 5.0) / 100;
    const t = Number(inputs.timeYears || 5);

    const interest = P * r * t;
    const total = P + interest;

    return {
      totalInterest: Number(interest.toFixed(2)),
      totalAmount: Number(total.toFixed(2)),
    };
  },
};

export default SIMPLE_INTEREST_CALCULATOR;
