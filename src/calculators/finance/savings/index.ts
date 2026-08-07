import { CalculatorModuleDefinition } from "../../types";

export const SAVINGS_CALCULATOR: CalculatorModuleDefinition = {
  id: "savings",
  title: "Savings Calculator",
  slug: "savings-calculator",
  category: "Finance",
  subcategory: "Investment",
  description: "Calculate how fast your savings will grow or find the monthly deposit needed to reach a target savings goal.",
  iconName: "Landmark",
  featured: false,
  tags: ["savings", "savings goal", "emergency fund", "wealth"],
  formulaDescription: "Calculates interest accumulated and ending savings balance based on monthly deposits.",
  faqs: [
    {
      question: "How much should I save in an emergency fund?",
      answer: "Financial advisors recommend saving 3 to 6 months of essential living expenses in an accessible high-yield savings account.",
    },
  ],
  inputs: [
    { name: "initialSavings", label: "Initial Deposit", type: "currency", defaultValue: 5000, unit: "$", min: 0, max: 1000000, step: 500 },
    { name: "monthlyDeposit", label: "Monthly Deposit", type: "currency", defaultValue: 300, unit: "$", min: 0, max: 20000, step: 50 },
    { name: "interestRate", label: "Annual APY", type: "percentage", defaultValue: 4.5, unit: "%", min: 0.1, max: 15, step: 0.1 },
    { name: "savingsYears", label: "Time Period", type: "slider", defaultValue: 5, unit: "years", min: 1, max: 30, step: 1 },
  ],
  outputs: [
    { name: "totalSavings", label: "Total Savings Accumulated", format: "currency", highlight: true },
    { name: "totalDeposited", label: "Total Money Deposited", format: "currency" },
    { name: "interestEarned", label: "Total Interest Earned", format: "currency" },
  ],
  calculate: (inputs) => {
    const P = Number(inputs.initialSavings || 5000);
    const pmt = Number(inputs.monthlyDeposit || 300);
    const r = Number(inputs.interestRate || 4.5) / 100 / 12;
    const n = Number(inputs.savingsYears || 5) * 12;

    const fvPrincipal = P * Math.pow(1 + r, n);
    const fvAnnuity = r > 0 ? pmt * ((Math.pow(1 + r, n) - 1) / r) : pmt * n;
    const total = fvPrincipal + fvAnnuity;
    const totalDep = P + (pmt * n);
    const interest = total - totalDep;

    return {
      totalSavings: Number(total.toFixed(2)),
      totalDeposited: Number(totalDep.toFixed(2)),
      interestEarned: Number(interest.toFixed(2)),
    };
  },
};

export default SAVINGS_CALCULATOR;
