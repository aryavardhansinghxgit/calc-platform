import { CalculatorModuleDefinition } from "../../types";
import { calculateProfitMargin } from "@/lib/calculator-engine/formulas/margin";
import { MarginCalculator } from "@/components/calculator/margin/MarginCalculator";
import { MarginContent, marginFaqs } from "@/components/calculator/margin/MarginContent";

export const MARGIN_CALCULATOR: CalculatorModuleDefinition = {
  id: "margin",
  title: "Margin Calculator — Profit Margin, Markup, Stock & Forex Margin",
  slug: "margin-calculator",
  category: "Finance",
  subcategory: "Others",
  description:
    "Calculate profit margin and markup, stock margin requirements, margin-call prices, forex margin, leverage, and pricing sensitivity with detailed formulas and examples.",
  iconName: "PieChart",
  featured: true,
  CustomComponent: MarginCalculator,
  ContentComponent: MarginContent,
  tags: [
    "margin",
    "profit margin",
    "markup",
    "stock margin",
    "margin call",
    "forex margin",
    "leverage calculator",
  ],
  relatedCalculators: [
    "percentage-calculator",
    "discount-calculator",
    "sales-tax-calculator",
    "roi-calculator",
    "loan-calculator",
    "mortgage-calculator",
    "heloc-calculator",
    "home-equity-loan-calculator",
    "down-payment-calculator",
    "rent-vs-buy-calculator",
  ],
  formulaDescription:
    "Profit Margin % = [(Revenue - Cost) / Revenue] × 100. Markup % = [(Revenue - Cost) / Cost] × 100. Margin Call Price = Loan / [Shares × (1 - Maintenance%)].",
  faqs: marginFaqs,
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
