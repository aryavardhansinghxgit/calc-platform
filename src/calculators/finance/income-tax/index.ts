import { CalculatorModuleDefinition } from "../../types";
import { calculateIncomeTax } from "@/lib/calculator-engine/formulas/income-tax";

export const INCOME_TAX_CALCULATOR: CalculatorModuleDefinition = {
  id: "income-tax",
  title: "Income Tax Calculator – US Federal Tax & Refund Estimator",
  slug: "income-tax-calculator",
  category: "Finance",
  subcategory: "Tax and Salary",
  description:
    "Calculate 2026 & 2025 US Federal income tax liability, tax refund checks, self-employment tax, capital gains rates, itemized vs standard deductions, and tax credit savings.",
  iconName: "FileText",
  featured: true,
  tags: [
    "income tax calculator",
    "tax refund calculator",
    "federal tax calculator",
    "tax bracket calculator",
    "w2 tax calculator",
    "1099 tax calculator",
    "standard deduction 2026",
    "child tax credit",
    "form 1040 calculator",
  ],
  formulaDescription: "Calculates progressive federal income tax liability based on 2026 & 2025 IRS bracket thresholds, standard vs itemized deductions, and refundable tax credits.",
  faqs: [
    {
      question: "What is the difference between Marginal Tax Rate and Effective Tax Rate?",
      answer:
        "Marginal Tax Rate is the rate applied to your highest dollar of taxable income. Effective Tax Rate is total tax paid divided by total gross income.",
    },
    {
      question: "What is the 2026 Standard Deduction?",
      answer:
        "For 2026, the Standard Deduction is projected at $15,000 for Single, $30,000 for Married Filing Jointly, and $22,500 for Head of Household.",
    },
    {
      question: "Should I claim the Standard Deduction or Itemize Deductions?",
      answer:
        "Claim whichever is higher. If the sum of mortgage interest, state/local taxes (SALT capped at $10k), and donations exceeds your standard deduction, itemizing lowers your tax bill.",
    },
    {
      question: "How does the Child Tax Credit (CTC) work?",
      answer:
        "The CTC provides up to $2,200 per qualifying child under 17, with up to $1,700 refundable even if your tax bill is zero.",
    },
  ],
  inputs: [
    { name: "wagesW2", label: "W-2 Wages & Salary (Box 1)", type: "currency", defaultValue: 85000, unit: "$", min: 0, max: 5000000, step: 2500 },
    { name: "fedTaxWithheld", label: "Federal Tax Withheld (Box 2)", type: "currency", defaultValue: 9500, unit: "$", min: 0, max: 1000000, step: 500 },
    {
      name: "filingStatus",
      label: "Filing Status",
      type: "select",
      defaultValue: "single",
      options: [
        { label: "Single", value: "single" },
        { label: "Married Filing Jointly", value: "joint" },
        { label: "Married Filing Separately", value: "separately" },
        { label: "Head of Household", value: "head" },
      ],
    },
    { name: "youngDependents", label: "Child Dependents (Age 0-16)", type: "slider", defaultValue: 0, unit: "", min: 0, max: 10, step: 1 },
  ],
  outputs: [
    { name: "netTaxRefundOrOwed", label: "Estimated Tax Refund / Owed", format: "currency", highlight: true },
    { name: "totalTaxLiability", label: "Total Tax Liability", format: "currency", highlight: true },
    { name: "effectiveTaxRate", label: "Effective Tax Rate", format: "percentage" },
    { name: "marginalTaxBracketLabel", label: "Top Marginal Bracket", format: "text" },
  ],
  calculate: (inputs) => {
    const res = calculateIncomeTax({
      taxYear: "2026",
      filingStatus: (inputs.filingStatus as any) || "single",
      wagesW2: Number(inputs.wagesW2 || 85000),
      fedTaxWithheld: Number(inputs.fedTaxWithheld || 9500),
      youngDependents: Number(inputs.youngDependents || 0),
    });

    return {
      netTaxRefundOrOwed: res.netTaxRefundOrOwed,
      totalTaxLiability: res.totalTaxLiability,
      effectiveTaxRate: `${res.effectiveTaxRate}%`,
      marginalTaxBracketLabel: res.marginalTaxBracketLabel,
    };
  },
};

export default INCOME_TAX_CALCULATOR;
