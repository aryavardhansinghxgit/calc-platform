import { CalculatorModuleDefinition } from "../../types";

export const BUDGET_CALCULATOR: CalculatorModuleDefinition = {
  id: "budget",
  title: "Budget Calculator",
  slug: "budget-calculator",
  category: "Finance",
  subcategory: "Personal",
  description: "Calculate your ideal monthly budget breakdown using the popular 50/30/20 rule (Needs, Wants, Savings).",
  iconName: "PieChart",
  featured: true,
  tags: ["budget", "50 30 20 rule", "personal budget", "money management"],
  formulaDescription: "Needs = Net Income × 50%. Wants = Net Income × 30%. Savings & Debt = Net Income × 20%.",
  faqs: [
    {
      question: "What is the 50/30/20 budgeting rule?",
      answer: "The 50/30/20 rule allocates 50% of net monthly income to essential Needs (rent, food, utilities), 30% to Wants (entertainment, dining out), and 20% to Savings and debt reduction.",
    },
  ],
  inputs: [
    { name: "monthlyNetIncome", label: "Monthly After-Tax Income", type: "currency", defaultValue: 5000, unit: "$", min: 500, max: 100000, step: 100 },
  ],
  outputs: [
    { name: "needs50", label: "Essential Needs (50%)", format: "currency", highlight: true, description: "Housing, groceries, utilities, transit" },
    { name: "wants30", label: "Personal Wants (30%)", format: "currency", highlight: true, description: "Dining, hobbies, entertainment" },
    { name: "savings20", label: "Savings & Debt (20%)", format: "currency", highlight: true, description: "Emergency fund, investing, debt payoff" },
  ],
  calculate: (inputs) => {
    const inc = Number(inputs.monthlyNetIncome || 5000);

    const needs = inc * 0.50;
    const wants = inc * 0.30;
    const savings = inc * 0.20;

    return {
      needs50: Number(needs.toFixed(2)),
      wants30: Number(wants.toFixed(2)),
      savings20: Number(savings.toFixed(2)),
    };
  },
};

export default BUDGET_CALCULATOR;
