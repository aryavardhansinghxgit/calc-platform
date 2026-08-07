import { CalculatorModuleDefinition } from "../../types";

export const CAGR_CALCULATOR: CalculatorModuleDefinition = {
  id: "cagr",
  title: "CAGR Calculator",
  slug: "cagr-calculator",
  category: "Finance",
  subcategory: "Investment",
  description: "Calculate Compound Annual Growth Rate (CAGR) to measure annual investment performance over time.",
  iconName: "TrendingUp",
  featured: false,
  tags: ["cagr", "annual growth rate", "investment return", "performance"],
  formulaDescription: "CAGR = (Ending Value / Beginning Value)^(1 / Years) - 1",
  faqs: [
    {
      question: "What is CAGR?",
      answer: "CAGR represents the annualized rate of return earned by an investment over a period longer than one year, assuming reinvestment of profits.",
    },
  ],
  inputs: [
    { name: "initialValue", label: "Initial Investment Value", type: "currency", defaultValue: 10000, unit: "$", min: 10, max: 100000000, step: 1000 },
    { name: "finalValue", label: "Final Investment Value", type: "currency", defaultValue: 25000, unit: "$", min: 10, max: 100000000, step: 1000 },
    { name: "years", label: "Time Period", type: "slider", defaultValue: 5, unit: "years", min: 1, max: 30, step: 1 },
  ],
  outputs: [
    { name: "cagrPercent", label: "CAGR Percentage", format: "percentage", highlight: true },
    { name: "totalAbsoluteReturn", label: "Total Absolute Return", format: "percentage" },
    { name: "totalProfit", label: "Total Dollar Profit", format: "currency" },
  ],
  calculate: (inputs) => {
    const bv = Number(inputs.initialValue || 10000);
    const ev = Number(inputs.finalValue || 25000);
    const n = Number(inputs.years || 5);

    if (bv <= 0 || n <= 0 || ev <= 0) {
      return { cagrPercent: "0%", totalAbsoluteReturn: "0%", totalProfit: 0 };
    }

    const cagr = (Math.pow(ev / bv, 1 / n) - 1) * 100;
    const absReturn = ((ev - bv) / bv) * 100;
    const profit = ev - bv;

    return {
      cagrPercent: `${cagr.toFixed(2)}%`,
      totalAbsoluteReturn: `${absReturn.toFixed(2)}%`,
      totalProfit: Number(profit.toFixed(2)),
    };
  },
};

export default CAGR_CALCULATOR;
