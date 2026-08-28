import { CalculatorModuleDefinition } from "../../types";
import { calculateIra } from "@/lib/calculator-engine/formulas/ira";
import { traditionalIraFaqs } from "./faq";

export const TRADITIONAL_IRA_CALCULATOR: CalculatorModuleDefinition = {
  id: "traditional-ira",
  title: "Traditional IRA Calculator – Growth, Taxes & Roth Comparison",
  slug: "traditional-ira-calculator",
  category: "Finance",
  subcategory: "Retirement",
  description:
    "Use this Traditional IRA Calculator to estimate retirement growth, after-tax value, IRA contribution limits, catch-up contributions, and Traditional vs. Roth IRA outcomes.",
  iconName: "Shield",
  featured: true,
  tags: [
    "traditional ira calculator",
    "traditional ira growth",
    "traditional vs roth ira",
    "ira contribution limits",
    "ira tax deduction",
    "retirement savings calculator",
  ],
  formulaDescription:
    "FV = P × (1 + r)^n + Annual Contribution × (1 + r) × [((1 + r)^n - 1) / r]. Terminal balance taxed at expected retirement ordinary income tax rate.",
  faqs: traditionalIraFaqs,
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
      currentBalance: inputs.currentBalance !== undefined && !isNaN(Number(inputs.currentBalance)) ? Number(inputs.currentBalance) : 30000,
      annualContribution: inputs.annualContribution !== undefined && !isNaN(Number(inputs.annualContribution)) ? Number(inputs.annualContribution) : 7500,
      investmentReturn: inputs.investmentReturn !== undefined && !isNaN(Number(inputs.investmentReturn)) ? Number(inputs.investmentReturn) : 6,
      currentAge: inputs.currentAge !== undefined && !isNaN(Number(inputs.currentAge)) ? Number(inputs.currentAge) : 30,
      retirementAge: inputs.retirementAge !== undefined && !isNaN(Number(inputs.retirementAge)) ? Number(inputs.retirementAge) : 65,
      currentTaxRate: inputs.currentTaxRate !== undefined && !isNaN(Number(inputs.currentTaxRate)) ? Number(inputs.currentTaxRate) : 25,
      retirementTaxRate: inputs.retirementTaxRate !== undefined && !isNaN(Number(inputs.retirementTaxRate)) ? Number(inputs.retirementTaxRate) : 15,
    });

    return {
      traditionalPreTaxBalance: res.traditionalPreTaxBalance,
      traditionalPostTaxBalance: res.traditionalPostTaxBalance,
      rothBalance: res.rothBalance,
      taxableBalance: res.taxableBalance,
    };
  },
};

export default TRADITIONAL_IRA_CALCULATOR;
