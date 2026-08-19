import { CalculatorModuleDefinition } from "../../types";
import { calculateDebtPayoff } from "@/lib/calculator-engine/formulas/debt-payoff";

export const DEBT_PAYOFF_CALCULATOR: CalculatorModuleDefinition = {
  id: "debt-payoff",
  title: "Debt Payoff Calculator – Financial Freedom Acceleration Suite",
  slug: "debt-payoff-calculator",
  category: "Finance",
  subcategory: "Others",
  description:
    "Calculate multi-debt payoff schedules, compare Debt Avalanche (highest interest first) vs. Debt Snowball (lowest balance first), test payment rollover reallocation, extra payments, and debt consolidation loan savings.",
  iconName: "TrendingDown",
  featured: true,
  tags: [
    "debt payoff calculator",
    "debt avalanche calculator",
    "debt snowball calculator",
    "debt free date calculator",
    "debt consolidation calculator",
    "multi debt payoff",
    "pay off debt fast",
    "snowball rollover calculator",
  ],
  formulaDescription:
    "Debt Avalanche sorts by APR descending; Debt Snowball sorts by Balance ascending. Rollover reallocation rolls freed minimum payments into remaining debt target payments.",
  faqs: [
    {
      question: "Which strategy is better: Debt Avalanche or Debt Snowball?",
      answer:
        "Debt Avalanche mathematically minimizes total interest paid by prioritizing highest APR debts first. Debt Snowball prioritizes lowest balance debts first to build rapid psychological momentum.",
    },
    {
      question: "What is payment rollover reallocation in debt payoff?",
      answer:
        "When a debt is paid off, its monthly minimum payment is added to the extra payment pool targeting the next debt, keeping your total monthly debt budget constant.",
    },
  ],
  inputs: [
    { name: "balance1", label: "Auto Loan Balance ($)", type: "currency", defaultValue: 25000, unit: "$", min: 0, max: 1000000, step: 500 },
    { name: "balance2", label: "Home Mortgage Balance ($)", type: "currency", defaultValue: 250000, unit: "$", min: 0, max: 10000000, step: 1000 },
    { name: "balance3", label: "Credit Card #1 Balance ($)", type: "currency", defaultValue: 6000, unit: "$", min: 0, max: 1000000, step: 500 },
    { name: "balance4", label: "Credit Card #2 Balance ($)", type: "currency", defaultValue: 3000, unit: "$", min: 0, max: 1000000, step: 500 },
  ],
  outputs: [
    { name: "monthsToPayoff", label: "Months to Debt Free", format: "number", highlight: true },
    { name: "yearsToPayoff", label: "Years to Debt Free", format: "number" },
    { name: "totalInterestPaid", label: "Total Interest Paid", format: "currency", highlight: true },
    { name: "totalAmountPaid", label: "Total Amount Paid", format: "currency" },
    { name: "payoffDate", label: "Estimated Debt-Free Date", format: "text" },
  ],
  calculate: (inputs) => {
    const defaultDebts = [
      { id: "1", name: "Auto Loan", balance: Number(inputs.balance1 || 25000), minPayment: 519, apr: 4.9 },
      { id: "2", name: "Home Mortgage", balance: Number(inputs.balance2 || 250000), minPayment: 1800, apr: 4.0 },
      { id: "3", name: "Credit Card 1", balance: Number(inputs.balance3 || 6000), minPayment: 150, apr: 18.99 },
      { id: "4", name: "Credit Card 2", balance: Number(inputs.balance4 || 3000), minPayment: 60, apr: 16.99 },
    ];

    const res = calculateDebtPayoff({
      debts: defaultDebts,
      strategy: "avalanche",
      reallocateFreedCash: true,
      extraMonthlyPayment: 100,
    });

    return {
      monthsToPayoff: res.monthsToPayoff,
      yearsToPayoff: res.yearsToPayoff,
      totalInterestPaid: res.totalInterestPaid,
      totalAmountPaid: res.totalAmountPaid,
      payoffDate: res.payoffDate,
    };
  },
};

export default DEBT_PAYOFF_CALCULATOR;
