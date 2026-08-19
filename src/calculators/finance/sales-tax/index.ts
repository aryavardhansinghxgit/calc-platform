import { CalculatorModuleDefinition } from "../../types";
import { solveSalesTax } from "@/lib/calculator-engine/formulas/sales-tax";

export const SALES_TAX_CALCULATOR: CalculatorModuleDefinition = {
  id: "sales-tax",
  title: "Sales Tax Calculator – U.S. State & Local Tax Estimator",
  slug: "sales-tax-calculator",
  category: "Finance",
  subcategory: "Tax and Salary",
  description:
    "Calculate U.S. state and local sales taxes, 5-way bi-directional solving (Modes A–E), 50 US state tax rate directory, multi-item receipt builder, business tax collection solver, and what-if state tax savings comparison.",
  iconName: "Receipt",
  featured: true,
  tags: [
    "sales tax calculator",
    "us sales tax calculator",
    "state sales tax rates",
    "california sales tax",
    "texas sales tax",
    "sales tax deduction",
    "multi item receipt calculator",
    "business sales tax collection",
  ],
  formulaDescription:
    "Mode A: Tax = Price × (Rate / 100). Mode B: Pre-Tax = Final / (1 + Rate / 100). Mode C: Rate = ((Final - Pre-Tax) / Pre-Tax) × 100.",
  faqs: [
    {
      question: "Which US states have no sales tax?",
      answer:
        "Five US states have no general state sales tax (NOMAD): New Hampshire, Oregon, Montana, Alaska, and Delaware.",
    },
    {
      question: "How do I calculate pre-tax price from a final tax-inclusive price?",
      answer: "Divide the final price by (1 + Tax Rate / 100). For example, $108.25 at 8.25% gives a pre-tax price of $100.00.",
    },
  ],
  inputs: [
    { name: "preTaxPrice", label: "Pre-Tax Price ($)", type: "currency", defaultValue: 100, unit: "$", min: 0, max: 100000000, step: 10 },
    { name: "taxRate", label: "Sales Tax Rate (%)", type: "percentage", defaultValue: 8.25, unit: "%", min: 0, max: 100, step: 0.125 },
  ],
  outputs: [
    { name: "afterTaxPrice", label: "Final Total Price (After Tax)", format: "currency", highlight: true },
    { name: "taxAmount", label: "Sales Tax Amount", format: "currency", highlight: true },
    { name: "preTaxPrice", label: "Pre-Tax Base Price", format: "currency" },
  ],
  calculate: (inputs) => {
    const res = solveSalesTax({
      preTaxPrice: Number(inputs.preTaxPrice || 100),
      taxRate: Number(inputs.taxRate || 8.25),
      mode: "A",
    });

    return {
      afterTaxPrice: res.afterTaxPrice,
      taxAmount: res.taxAmount,
      preTaxPrice: res.preTaxPrice,
    };
  },
};

export default SALES_TAX_CALCULATOR;
