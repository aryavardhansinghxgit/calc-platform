import { CalculatorModuleDefinition } from "../../types";

export const FUTURE_VALUE_CALCULATOR: CalculatorModuleDefinition = {
  id: "future-value",
  title: "Future Value Calculator",
  slug: "future-value-calculator",
  category: "Finance",
  subcategory: "Investment",
  description: "Calculate the future value of a current lump sum based on compound interest rates and duration.",
  iconName: "TrendingUp",
  featured: false,
  tags: ["future value", "fv", "time value of money", "tvm"],
  formulaDescription: "FV = PV × (1 + r)^n",
  faqs: [
    {
      question: "What is Future Value (FV)?",
      answer: "Future Value measures how much a current sum of money will grow over time given a specified rate of return.",
    },
  ],
  inputs: [
    { name: "presentValue", label: "Present Value (PV)", type: "currency", defaultValue: 10000, unit: "$", min: 0, max: 10000000, step: 500 },
    { name: "annualRate", label: "Annual Interest Rate", type: "percentage", defaultValue: 6.0, unit: "%", min: 0.1, max: 25, step: 0.1 },
    { name: "periodsYears", label: "Number of Years", type: "slider", defaultValue: 10, unit: "years", min: 1, max: 50, step: 1 },
  ],
  outputs: [
    { name: "futureValue", label: "Future Value (FV)", format: "currency", highlight: true },
    { name: "totalGain", label: "Total Interest Gain", format: "currency" },
  ],
  calculate: (inputs) => {
    const pv = Number(inputs.presentValue || 10000);
    const r = Number(inputs.annualRate || 6.0) / 100;
    const n = Number(inputs.periodsYears || 10);

    const fv = pv * Math.pow(1 + r, n);
    const gain = fv - pv;

    return {
      futureValue: Number(fv.toFixed(2)),
      totalGain: Number(gain.toFixed(2)),
    };
  },
};

export default FUTURE_VALUE_CALCULATOR;
