import { CalculatorModuleDefinition } from "../../types";

export const MARGIN_CALCULATOR: CalculatorModuleDefinition = {
  id: "margin",
  title: "Margin Calculator",
  slug: "margin-calculator",
  category: "Finance",
  subcategory: "Business",
  description: "Calculate gross profit margin percentage, markup percentage, and total gross profit.",
  iconName: "PieChart",
  featured: true,
  tags: ["margin", "profit margin", "markup", "gross profit", "business margin"],
  formulaDescription: "Gross Margin % = [(Revenue - Cost) / Revenue] × 100. Markup % = [(Revenue - Cost) / Cost] × 100.",
  faqs: [
    {
      question: "What is the difference between Margin and Markup?",
      answer: "Gross Margin measures profit relative to selling price (revenue), while Markup measures profit relative to item cost.",
    },
  ],
  inputs: [
    { name: "costOfGoods", label: "Item Cost of Goods (COGS)", type: "currency", defaultValue: 60, unit: "$", min: 0.01, max: 1000000, step: 5 },
    { name: "sellingPrice", label: "Selling Price (Revenue)", type: "currency", defaultValue: 100, unit: "$", min: 0.01, max: 1000000, step: 5 },
  ],
  outputs: [
    { name: "grossMarginPercent", label: "Gross Profit Margin", format: "percentage", highlight: true },
    { name: "grossProfit", label: "Gross Dollar Profit", format: "currency", highlight: true },
    { name: "markupPercent", label: "Markup Percentage", format: "percentage" },
  ],
  calculate: (inputs) => {
    const cost = Number(inputs.costOfGoods || 60);
    const rev = Number(inputs.sellingPrice || 100);

    if (rev <= 0 || cost <= 0) return { grossMarginPercent: "0%", grossProfit: 0, markupPercent: "0%" };

    const profit = rev - cost;
    const margin = (profit / rev) * 100;
    const markup = (profit / cost) * 100;

    return {
      grossMarginPercent: `${margin.toFixed(2)}%`,
      grossProfit: Number(profit.toFixed(2)),
      markupPercent: `${markup.toFixed(2)}%`,
    };
  },
};

export default MARGIN_CALCULATOR;
