import { CalculatorModuleDefinition } from "../../types";
import { calculateProfitMargin } from "@/lib/calculator-engine/formulas/margin";

export const MARGIN_CALCULATOR: CalculatorModuleDefinition = {
  id: "margin",
  title: "Margin Calculator – Profit, Stock & Forex Leverage Suite",
  slug: "margin-calculator",
  category: "Finance",
  subcategory: "Others",
  description:
    "Free Margin Calculator. Calculate gross profit margin, markup percentage, stock trading margin requirements, margin call trigger prices, and forex leverage requirements.",
  iconName: "PieChart",
  featured: true,
  tags: [
    "margin",
    "profit margin",
    "markup",
    "stock margin",
    "margin call",
    "forex margin",
    "leverage calculator",
  ],
  formulaDescription:
    "Profit Margin % = [(Revenue - Cost) / Revenue] × 100. Markup % = [(Revenue - Cost) / Cost] × 100. Margin Call Price = Loan / [Shares × (1 - Maintenance%)].",
  faqs: [
    {
      question: "What is the difference between Margin and Markup?",
      answer:
        "Gross Profit Margin measures profit as a percentage of selling price (revenue), whereas Markup measures profit as a percentage of item cost.",
    },
    {
      question: "How is a Stock Margin Call trigger price calculated?",
      answer:
        "A margin call occurs when portfolio equity falls below the broker's maintenance margin requirement. The trigger price equals: Loan Amount / [Shares × (1 - Maintenance Margin %)].",
    },
  ],
  inputs: [
    { name: "costOfGoods", label: "Item Cost ($)", type: "currency", defaultValue: 120, unit: "$", min: 0, max: 1000000, step: 5 },
    { name: "sellingPrice", label: "Revenue / Selling Price ($)", type: "currency", defaultValue: 160, unit: "$", min: 0, max: 1000000, step: 5 },
  ],
  outputs: [
    { name: "grossMarginPercent", label: "Profit Margin", format: "percentage", highlight: true },
    { name: "grossProfit", label: "Dollar Profit", format: "currency", highlight: true },
    { name: "markupPercent", label: "Markup Percentage", format: "percentage" },
  ],
  calculate: (inputs) => {
    const res = calculateProfitMargin({
      cost: Number(inputs.costOfGoods || 120),
      revenue: Number(inputs.sellingPrice || 160),
    });

    return {
      grossMarginPercent: `${res.marginPercent}%`,
      grossProfit: res.profit,
      markupPercent: `${res.markupPercent}%`,
    };
  },
};

export default MARGIN_CALCULATOR;
