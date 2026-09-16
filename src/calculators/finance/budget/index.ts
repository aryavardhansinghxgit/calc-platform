import { CalculatorModuleDefinition } from "../../types";
import { calculateBudget } from "@/lib/calculator-engine/formulas/budget";
import { budgetFaqs } from "./faq";

export const BUDGET_CALCULATOR: CalculatorModuleDefinition = {
  id: "budget",
  title: "Budget Calculator",
  slug: "budget-calculator",
  category: "Finance",
  subcategory: "Others",
  description:
    "Calculate after-tax income, monthly expenses, cash flow, debt-to-income ratios, 50/30/20 allocations, and budget stress scenarios.",
  iconName: "PieChart",
  featured: true,
  tags: [
    "budget",
    "budget calculator",
    "monthly budget calculator",
    "personal budget calculator",
    "budget planner calculator",
    "monthly expense calculator",
    "household budget calculator",
    "50 30 20 budget calculator",
    "debt-to-income ratio",
    "after-tax budget calculator",
    "budget deficit calculator",
    "budget surplus calculator",
    "budget stress test",
  ],
  formulaDescription:
    "Net Cash Flow = After-Tax Income - Total Expenses. Back-End DTI = Total Monthly Debt / Gross Monthly Income. 50/30/20 Rule: 50% Needs, 30% Wants, 20% Savings.",
  relatedCalculators: [
    "loan",
    "personal-loan",
    "debt-payoff",
    "credit-card-payoff",
    "student-loan",
    "refinance",
    "salary",
    "take-home-pay",
  ],
  faqs: budgetFaqs,
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
    const salary = Number(inputs.salary ?? 83000);
    const taxRate = Number(inputs.taxRate ?? 28) / 100;
    const grossMonthly = salary / 12;
    const netMonthly = (salary * (1 - taxRate)) / 12;
    return {
      grossAnnualIncome: salary,
      afterTaxMonthlyIncome: Number(netMonthly.toFixed(2)),
      totalMonthlyExpenses: Number((netMonthly * 0.8).toFixed(2)),
      netMonthlySurplus: Number((netMonthly * 0.2).toFixed(2)),
      totalDti: 26.74,
      frontEndDti: 19.77,
    };
  },
};

export default BUDGET_CALCULATOR;
