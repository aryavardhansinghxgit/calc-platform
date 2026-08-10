import { CalculatorModuleDefinition } from "../../types";
import { calculateCreditCardPayoff } from "@/lib/calculator-engine/formulas/credit-card";

export const CREDIT_CARD_CALCULATOR: CalculatorModuleDefinition = {
  id: "credit-card",
  title: "Credit Card Payoff Calculator – Debt Free Acceleration Suite",
  slug: "credit-card-calculator",
  category: "Finance",
  subcategory: "Credit & Debt",
  description:
    "Calculate credit card payoff time, total interest, minimum payment rules, extra monthly payments, 0% balance transfers, and Debt Avalanche vs. Snowball payoff strategies.",
  iconName: "CreditCard",
  featured: true,
  tags: [
    "credit card calculator",
    "credit card payoff calculator",
    "credit card interest calculator",
    "balance transfer calculator",
    "debt avalanche calculator",
    "debt snowball calculator",
    "minimum payment calculator",
    "average daily balance calculator",
  ],
  formulaDescription:
    "Monthly Interest = Average Daily Balance × (APR / 365) × Days in Billing Cycle. Amortization calculated monthly.",
  faqs: [
    {
      question: "How long will it take to pay off my credit card minimum payments?",
      answer:
        "Paying only the minimum monthly payment (typically 1% to 2% plus interest) can take 10 to 25+ years and double your total interest cost.",
    },
    {
      question: "What is the difference between Debt Avalanche and Debt Snowball?",
      answer:
        "Debt Avalanche pays off the highest APR card first (saving the most interest), while Debt Snowball pays off the smallest balance card first (building psychological momentum).",
    },
  ],
  inputs: [
    { name: "balance", label: "Credit Card Balance ($)", type: "currency", defaultValue: 8000, unit: "$", min: 0, max: 1000000, step: 500 },
    { name: "apr", label: "Interest Rate (% APR)", type: "percentage", defaultValue: 18, unit: "%", min: 0, max: 100, step: 0.25 },
    { name: "monthlyPayment", label: "Monthly Payment Amount ($)", type: "currency", defaultValue: 200, unit: "$", min: 1, max: 100000, step: 25 },
  ],
  outputs: [
    { name: "monthsToPayoff", label: "Months to Pay Off", format: "number", highlight: true },
    { name: "yearsToPayoff", label: "Years to Pay Off", format: "number" },
    { name: "totalInterestPaid", label: "Total Interest Paid", format: "currency", highlight: true },
    { name: "totalAmountPaid", label: "Total Amount Paid", format: "currency" },
    { name: "payoffDate", label: "Estimated Payoff Date", format: "text" },
  ],
  calculate: (inputs) => {
    const res = calculateCreditCardPayoff({
      balance: Number(inputs.balance || 8000),
      apr: Number(inputs.apr || 18),
      monthlyPayment: Number(inputs.monthlyPayment || 200),
      mode: "A",
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

export default CREDIT_CARD_CALCULATOR;
