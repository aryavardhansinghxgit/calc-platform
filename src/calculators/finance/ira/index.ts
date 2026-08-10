import { CalculatorModuleDefinition } from "../../types";
import { calculateIra } from "@/lib/calculator-engine/formulas/ira";

export const IRA_CALCULATOR: CalculatorModuleDefinition = {
  id: "ira",
  title: "IRA Calculator – Traditional vs Roth Retirement Suite",
  slug: "ira-calculator",
  category: "Finance",
  subcategory: "Retirement & Investing",
  description:
    "Free IRA Calculator. Compare Traditional IRA, Roth IRA, SEP IRA, SIMPLE IRA, and regular taxable savings side-by-side. Calculate pre-tax and post-tax retirement balances and test 2025/2026 IRS contribution caps.",
  iconName: "TrendingUp",
  featured: true,
  tags: [
    "ira calculator",
    "traditional ira calculator",
    "roth ira calculator",
    "sep ira calculator",
    "simple ira calculator",
    "ira comparison calculator",
    "traditional vs roth ira",
  ],
  formulaDescription:
    "Compares pre-tax deductible Traditional IRA growth (taxed at retirement rate) against post-tax Roth IRA growth (100% tax-free) and taxable savings (annual tax drag).",
  faqs: [
    {
      question: "What is the difference between a Traditional IRA and a Roth IRA?",
      answer:
        "Traditional IRAs allow tax-deductible contributions today, lowering your taxable income now, but withdrawals in retirement are taxed. Roth IRAs are funded with after-tax dollars today, but all future growth and withdrawals are 100% tax-free.",
    },
    {
      question: "What are the 2025 and 2026 IRA contribution limits?",
      answer:
        "For 2025, the total combined IRA annual contribution limit is $7,000 across all Traditional and Roth IRAs ($8,000 for individuals aged 50 and older).",
    },
  ],
  inputs: [
    { name: "currentBalance", label: "Current Balance ($)", type: "currency", defaultValue: 30000, unit: "$", min: 0, max: 10000000, step: 5000 },
    { name: "annualContribution", label: "Annual Before-Tax Contrib ($)", type: "currency", defaultValue: 7500, unit: "$", min: 0, max: 1000000, step: 500 },
    { name: "investmentReturn", label: "Rate of Return (%/yr)", type: "percentage", defaultValue: 6, unit: "%", min: 0, max: 20, step: 0.5 },
    { name: "currentAge", label: "Current Age", type: "number", defaultValue: 30, unit: "yrs", min: 18, max: 100, step: 1 },
    { name: "retirementAge", label: "Retirement Age", type: "number", defaultValue: 65, unit: "yrs", min: 19, max: 100, step: 1 },
    { name: "currentTaxRate", label: "Current Marginal Tax Rate (%)", type: "percentage", defaultValue: 25, unit: "%", min: 0, max: 50, step: 1 },
    { name: "retirementTaxRate", label: "Retirement Tax Rate (%)", type: "percentage", defaultValue: 15, unit: "%", min: 0, max: 50, step: 1 },
  ],
  outputs: [
    { name: "traditionalPreTaxBalance", label: "Traditional IRA (Pre-Tax)", format: "currency" },
    { name: "traditionalPostTaxBalance", label: "Traditional IRA (Post-Tax)", format: "currency", highlight: true },
    { name: "rothBalance", label: "Roth IRA (100% Tax-Free)", format: "currency", highlight: true },
    { name: "taxableBalance", label: "Regular Taxable Savings", format: "currency" },
  ],
  calculate: (inputs) => {
    const res = calculateIra({
      currentBalance: Number(inputs.currentBalance || 30000),
      annualContribution: Number(inputs.annualContribution || 7500),
      investmentReturn: Number(inputs.investmentReturn || 6),
      currentAge: Number(inputs.currentAge || 30),
      retirementAge: Number(inputs.retirementAge || 65),
      currentTaxRate: Number(inputs.currentTaxRate || 25),
      retirementTaxRate: Number(inputs.retirementTaxRate || 15),
    });

    return {
      traditionalPreTaxBalance: res.traditionalPreTaxBalance,
      traditionalPostTaxBalance: res.traditionalPostTaxBalance,
      rothBalance: res.rothBalance,
      taxableBalance: res.taxableBalance,
    };
  },
};

export default IRA_CALCULATOR;
