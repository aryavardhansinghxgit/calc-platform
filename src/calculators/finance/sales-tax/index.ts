import { CalculatorModuleDefinition } from "../../types";

export const SALES_TAX_CALCULATOR: CalculatorModuleDefinition = {
  id: "sales-tax",
  title: "Sales Tax Calculator",
  slug: "sales-tax-calculator",
  category: "Finance",
  subcategory: "Taxes",
  description: "Calculate total retail purchase price including state and local sales tax rates.",
  iconName: "Receipt",
  featured: false,
  tags: ["sales tax", "state tax", "retail tax", "total price"],
  formulaDescription: "Sales Tax = Retail Price × (Tax Rate / 100). Total Price = Retail Price + Sales Tax.",
  faqs: [
    {
      question: "How is sales tax calculated at checkout?",
      answer: "Sales tax is calculated by taking the net pre-tax price of taxable items and multiplying by the combined state, county, and municipal tax rates.",
    },
  ],
  inputs: [
    { name: "beforeTaxPrice", label: "Pre-Tax Retail Price", type: "currency", defaultValue: 250, unit: "$", min: 0.1, max: 1000000, step: 10 },
    { name: "salesTaxRate", label: "Sales Tax Rate", type: "percentage", defaultValue: 8.25, unit: "%", min: 0, max: 25, step: 0.05 },
  ],
  outputs: [
    { name: "salesTaxAmount", label: "Sales Tax Amount", format: "currency", highlight: true },
    { name: "totalPrice", label: "Total Price (With Tax)", format: "currency", highlight: true },
  ],
  calculate: (inputs) => {
    const price = Number(inputs.beforeTaxPrice || 250);
    const rate = Number(inputs.salesTaxRate || 8.25) / 100;

    const tax = price * rate;
    const total = price + tax;

    return {
      salesTaxAmount: Number(tax.toFixed(2)),
      totalPrice: Number(total.toFixed(2)),
    };
  },
};

export default SALES_TAX_CALCULATOR;
