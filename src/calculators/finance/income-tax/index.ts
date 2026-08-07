import { CalculatorModuleDefinition } from "../../types";

export const INCOME_TAX_CALCULATOR: CalculatorModuleDefinition = {
  id: "income-tax",
  title: "Income Tax Calculator",
  slug: "income-tax-calculator",
  category: "Finance",
  subcategory: "Taxes",
  description: "Estimate US federal income tax liability, effective tax rate, and marginal tax bracket.",
  iconName: "FileText",
  featured: true,
  tags: ["income tax", "tax calculator", "federal tax", "tax bracket"],
  formulaDescription: "Calculates progressive federal income tax liability based on US standard deduction and 2026 bracket thresholds.",
  faqs: [
    {
      question: "What is marginal tax rate vs effective tax rate?",
      answer: "Marginal tax rate is the rate paid on your last dollar of income. Effective tax rate is total tax paid divided by total taxable income.",
    },
  ],
  inputs: [
    { name: "grossIncome", label: "Gross Annual Income", type: "currency", defaultValue: 85000, unit: "$", min: 5000, max: 2000000, step: 2500 },
    {
      name: "filingStatus",
      label: "Filing Status",
      type: "select",
      defaultValue: "single",
      options: [
        { label: "Single", value: "single" },
        { label: "Married Filing Jointly", value: "joint" },
        { label: "Head of Household", value: "head" },
      ],
    },
  ],
  outputs: [
    { name: "estimatedTax", label: "Estimated Federal Tax", format: "currency", highlight: true },
    { name: "effectiveTaxRate", label: "Effective Tax Rate", format: "percentage", highlight: true },
    { name: "marginalTaxRate", label: "Marginal Tax Bracket", format: "text" },
    { name: "takeHomePay", label: "Estimated Take-Home Pay", format: "currency" },
  ],
  calculate: (inputs) => {
    const gross = Number(inputs.grossIncome || 85000);
    const status = String(inputs.filingStatus || "single");

    const deductions: Record<string, number> = { single: 14600, joint: 29200, head: 21900 };
    const stdDeduction = deductions[status] || 14600;
    const taxable = Math.max(0, gross - stdDeduction);

    // Simplified 2026 tax brackets for Single
    let tax = 0;
    let marginal = "10%";

    if (taxable <= 11600) {
      tax = taxable * 0.10;
      marginal = "10%";
    } else if (taxable <= 47150) {
      tax = 1160 + (taxable - 11600) * 0.12;
      marginal = "12%";
    } else if (taxable <= 100525) {
      tax = 5426 + (taxable - 47150) * 0.22;
      marginal = "22%";
    } else if (taxable <= 191950) {
      tax = 17168.5 + (taxable - 100525) * 0.24;
      marginal = "24%";
    } else {
      tax = 39110.5 + (taxable - 191950) * 0.32;
      marginal = "32%";
    }

    const effectiveRate = gross > 0 ? (tax / gross) * 100 : 0;
    const takeHome = Math.max(0, gross - tax);

    return {
      estimatedTax: Number(tax.toFixed(2)),
      effectiveTaxRate: `${effectiveRate.toFixed(2)}%`,
      marginalTaxRate: marginal,
      takeHomePay: Number(takeHome.toFixed(2)),
    };
  },
};

export default INCOME_TAX_CALCULATOR;
