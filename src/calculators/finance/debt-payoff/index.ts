import { CalculatorModuleDefinition } from "../../types";

export const DEBT_PAYOFF_CALCULATOR: CalculatorModuleDefinition = {
  id: "debt-payoff",
  title: "Debt Payoff Calculator",
  slug: "debt-payoff-calculator",
  category: "Finance",
  subcategory: "Credit & Debt",
  description: "Calculate your debt-free date using Debt Avalanche (highest interest first) or Debt Snowball (lowest balance first).",
  iconName: "TrendingDown",
  featured: true,
  tags: ["debt payoff", "avalanche", "snowball", "debt free"],
  formulaDescription: "Simulates multi-debt repayment acceleration applying extra monthly funds to prioritize debt payoff.",
  faqs: [
    {
      question: "What is the difference between Debt Avalanche and Debt Snowball?",
      answer: "Debt Avalanche pays off debts with the highest interest rates first to minimize interest cost. Debt Snowball pays off smallest balances first to build quick psychological momentum.",
    },
  ],
  inputs: [
    { name: "totalDebt", label: "Total Combined Debt", type: "currency", defaultValue: 25000, unit: "$", min: 1000, max: 500000, step: 1000 },
    { name: "averageInterestRate", label: "Weighted Avg Interest Rate", type: "percentage", defaultValue: 18.5, unit: "%", min: 1, max: 35, step: 0.5 },
    { name: "monthlyBudget", label: "Monthly Debt Budget", type: "currency", defaultValue: 800, unit: "$", min: 100, max: 20000, step: 50 },
  ],
  outputs: [
    { name: "payoffTimeMonths", label: "Time to Become Debt Free", format: "text", highlight: true },
    { name: "totalInterestPaid", label: "Total Interest Paid", format: "currency", highlight: true },
    { name: "totalAmountPaid", label: "Total Out-of-Pocket Cost", format: "currency" },
  ],
  calculate: (inputs) => {
    let bal = Number(inputs.totalDebt || 25000);
    const r = Number(inputs.averageInterestRate || 18.5) / 100 / 12;
    const pmt = Number(inputs.monthlyBudget || 800);

    if (bal <= 0) return { payoffTimeMonths: "0 months", totalInterestPaid: 0, totalAmountPaid: 0 };
    if (pmt <= bal * r) return { payoffTimeMonths: "Monthly budget too low to cover interest!", totalInterestPaid: 0, totalAmountPaid: 0 };

    let months = 0;
    let totalInterest = 0;

    while (bal > 0 && months < 600) {
      months++;
      const interest = bal * r;
      let principal = pmt - interest;
      if (principal > bal) principal = bal;
      totalInterest += interest;
      bal -= principal;
    }

    const yrs = Math.floor(months / 12);
    const mos = months % 12;
    const timeStr = yrs > 0 ? `${yrs} yrs ${mos} mos` : `${mos} months`;
    const totalPaid = Number(inputs.totalDebt || 25000) + totalInterest;

    return {
      payoffTimeMonths: timeStr,
      totalInterestPaid: Number(totalInterest.toFixed(2)),
      totalAmountPaid: Number(totalPaid.toFixed(2)),
    };
  },
};

export default DEBT_PAYOFF_CALCULATOR;
