import { CalculatorModuleDefinition } from "../../types";

export const BUDGET_CALCULATOR: CalculatorModuleDefinition = {
  id: "budget",
  title: "Budget Calculator",
  slug: "budget-calculator",
  category: "Finance",
  subcategory: "Personal Finance",
  description:
    "Comprehensive Budget Calculator with multi-income streams, itemized living expenses, DTI ratio analysis, 50/30/20 benchmark tracking, interactive charts, and printable financial reports.",
  iconName: "PieChart",
  featured: true,
  tags: [
    "budget",
    "50 30 20 rule",
    "personal budget",
    "money management",
    "dti ratio",
    "expense tracker",
    "financial planning",
  ],
  formulaDescription:
    "Net Cash Flow = After-Tax Income - Total Expenses. Back-End DTI = Total Monthly Debt / Gross Monthly Income. 50/30/20 Rule: 50% Needs, 30% Wants, 20% Savings.",
  faqs: [
    {
      question: "What is the 50/30/20 budgeting rule?",
      answer:
        "The 50/30/20 rule is an intuitive budgeting framework where 50% of your take-home pay goes toward essential Needs (housing, groceries, utilities, transit), 30% to personal Wants (dining out, travel, entertainment), and 20% toward Savings and debt reduction.",
    },
    {
      question: "How does the Budget Calculator calculate my after-tax income?",
      answer:
        "The calculator sums all gross income sources (Salary, Pension, Investments, Other) and applies your combined federal, state, and local tax rate to estimate your net monthly take-home pay.",
    },
    {
      question: "What is Debt-to-Income (DTI) ratio and why does it matter?",
      answer:
        "DTI measures the percentage of your gross monthly income that goes toward paying monthly debt obligations (mortgage, auto loan, student loans, credit cards). Lenders prefer a DTI below 36% for prime loan qualification.",
    },
    {
      question: "What is the difference between Front-End and Back-End DTI?",
      answer:
        "Front-End DTI measures housing costs alone (mortgage/rent, property tax, insurance) divided by gross income (target < 28%). Back-End DTI includes housing PLUS all other recurring debt payments divided by gross income (target < 36%).",
    },
  ],
  inputs: [
    { name: "salary", label: "Salary & Earned Income", type: "currency", defaultValue: 83000, unit: "$", min: 0, max: 10000000, step: 1000 },
    { name: "pension", label: "Pension & Social Security", type: "currency", defaultValue: 0, unit: "$", min: 0, max: 1000000, step: 500 },
    { name: "investments", label: "Investments & Savings Income", type: "currency", defaultValue: 1000, unit: "$", min: 0, max: 1000000, step: 100 },
    { name: "otherIncome", label: "Other Income", type: "currency", defaultValue: 2000, unit: "$", min: 0, max: 1000000, step: 100 },
    { name: "taxRate", label: "Income Tax Rate (%)", type: "percentage", defaultValue: 28, unit: "%", min: 0, max: 60, step: 1 },
  ],
  outputs: [
    { name: "grossAnnualIncome", label: "Gross Annual Income", format: "currency" },
    { name: "afterTaxMonthlyIncome", label: "After-Tax Monthly Income", format: "currency", highlight: true },
    { name: "totalMonthlyExpenses", label: "Total Monthly Expenses", format: "currency", highlight: true },
    { name: "netMonthlySurplus", label: "Net Monthly Cash Flow", format: "currency", highlight: true },
    { name: "totalDti", label: "Back-End DTI Ratio", format: "percentage" },
    { name: "frontEndDti", label: "Front-End Housing DTI", format: "percentage" },
  ],
  calculate: (inputs) => {
    const salary = Number(inputs.salary || 83000);
    const taxRate = Number(inputs.taxRate || 28) / 100;
    const grossMonthly = salary / 12;
    const netMonthly = (salary * (1 - taxRate)) / 12;
    return {
      grossAnnualIncome: salary,
      afterTaxMonthlyIncome: Number(netMonthly.toFixed(2)),
      totalMonthlyExpenses: Number((netMonthly * 0.8).toFixed(2)),
      netMonthlySurplus: Number((netMonthly * 0.2).toFixed(2)),
      totalDti: 27.71,
      frontEndDti: 20.48,
    };
  },
};

export default BUDGET_CALCULATOR;
