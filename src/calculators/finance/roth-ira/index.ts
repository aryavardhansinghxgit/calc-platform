import { CalculatorModuleDefinition } from "../../types";
import { calculateRothIra } from "@/lib/calculator-engine/formulas/roth-ira";

export const ROTH_IRA_CALCULATOR: CalculatorModuleDefinition = {
  id: "roth-ira",
  title: "Roth IRA Calculator – Tax-Free Wealth Suite",
  slug: "roth-ira-calculator",
  category: "Finance",
  subcategory: "Retirement",
  description:
    "Free Roth IRA Calculator. Calculate 100% tax-free retirement growth, compare against regular taxable savings accounts, test 2025/2026 IRS contribution caps, and evaluate Backdoor Roth conversions.",
  iconName: "TrendingUp",
  featured: true,
  tags: [
    "roth ira calculator",
    "roth ira vs taxable",
    "backdoor roth ira",
    "tax free growth calculator",
    "roth ira growth",
    "roth ira limit 2025",
  ],
  formulaDescription:
    "Compares after-tax Roth IRA contributions compounding 100% tax-free against taxable savings accounts subjected to annual tax drag.",
  faqs: [
    {
      question: "What is a Roth IRA and how does it work?",
      answer:
        "A Roth IRA is an individual retirement account allowing after-tax contributions to grow 100% tax-free. Qualified withdrawals in retirement are completely tax-free.",
    },
    {
      question: "What are the 2025 and 2026 Roth IRA contribution limits?",
      answer:
        "For 2025, the annual Roth IRA contribution limit is $7,000 ($8,000 for individuals aged 50 and older). For 2026, the limit is $7,500 ($8,600 for age 50+).",
    },
  ],
  inputs: [
    { name: "currentBalance", label: "Current Roth Balance ($)", type: "currency", defaultValue: 30000, unit: "$", min: 0, max: 10000000, step: 5000 },
    { name: "annualContribution", label: "Annual Contribution ($)", type: "currency", defaultValue: 7500, unit: "$", min: 0, max: 1000000, step: 500 },
    { name: "investmentReturn", label: "Expected Return (%/yr)", type: "percentage", defaultValue: 6, unit: "%", min: 0, max: 20, step: 0.5 },
    { name: "currentAge", label: "Current Age", type: "number", defaultValue: 30, unit: "yrs", min: 18, max: 100, step: 1 },
    { name: "retirementAge", label: "Retirement Age", type: "number", defaultValue: 65, unit: "yrs", min: 19, max: 100, step: 1 },
    { name: "marginalTaxRate", label: "Marginal Tax Rate (%)", type: "percentage", defaultValue: 25, unit: "%", min: 0, max: 50, step: 1 },
  ],
  outputs: [
    { name: "rothBalanceAtRetirement", label: "Roth IRA (100% Tax-Free)", format: "currency", highlight: true },
    { name: "taxableBalanceAtRetirement", label: "Taxable Account Balance", format: "currency" },
    { name: "totalPrincipalContributed", label: "Total Principal Contributed", format: "currency" },
    { name: "rothAdvantageOverTaxable", label: "Net Roth Tax Savings Advantage", format: "currency", highlight: true },
  ],
  calculate: (inputs) => {
    const res = calculateRothIra({
      currentBalance: Number(inputs.currentBalance || 30000),
      annualContribution: Number(inputs.annualContribution || 7500),
      investmentReturn: Number(inputs.investmentReturn || 6),
      currentAge: Number(inputs.currentAge || 30),
      retirementAge: Number(inputs.retirementAge || 65),
      marginalTaxRate: Number(inputs.marginalTaxRate || 25),
    });

    return {
      rothBalanceAtRetirement: res.rothBalanceAtRetirement,
      taxableBalanceAtRetirement: res.taxableBalanceAtRetirement,
      totalPrincipalContributed: res.totalPrincipalContributed,
      rothAdvantageOverTaxable: res.rothAdvantageOverTaxable,
    };
  },
};

export default ROTH_IRA_CALCULATOR;
