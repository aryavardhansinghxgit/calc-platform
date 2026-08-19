import { CalculatorModuleDefinition } from "../../types";
import { safePmt } from "@/lib/calculator-engine/formulas/safety";

export const CREDIT_CARD_PAYOFF_CALCULATOR: CalculatorModuleDefinition = {
  id: "credit-card-payoff",
  title: "Credit Card Payoff Calculator",
  slug: "credit-card-payoff-calculator",
  category: "Finance",
  subcategory: "Others",
  description: "Calculate the exact monthly payment required to pay off your credit card balance in a target timeframe.",
  iconName: "CreditCard",
  featured: false,
  tags: ["credit card payoff", "debt free timeline", "target payoff"],
  formulaDescription: "PMT = [P × r × (1 + r)^n] / [(1 + r)^n - 1]",
  faqs: [
    {
      question: "How do I calculate the payment needed to be debt free in 3 years?",
      answer: "Enter your balance, APR, and set your target timeframe to 36 months to calculate your exact required monthly payment.",
    },
  ],
  inputs: [
    { name: "cardBalance", label: "Credit Card Balance", type: "currency", defaultValue: 10000, unit: "$", min: 100, max: 200000, step: 500 },
    { name: "interestRate", label: "APR (Interest Rate)", type: "percentage", defaultValue: 22.5, unit: "%", min: 1, max: 40, step: 0.1 },
    { name: "targetMonths", label: "Desired Payoff Time", type: "slider", defaultValue: 24, unit: "months", min: 6, max: 60, step: 6 },
  ],
  outputs: [
    { name: "requiredMonthlyPayment", label: "Required Monthly Payment", format: "currency", highlight: true },
    { name: "totalInterest", label: "Total Interest Paid", format: "currency", highlight: true },
    { name: "totalAmountPaid", label: "Total Amount Paid", format: "currency" },
  ],
  calculate: (inputs) => {
    const P = Math.max(0, Number(inputs.cardBalance || 10000));
    const r = Math.min(100, Math.max(0, Number(inputs.interestRate || 22.5))) / 100 / 12;
    const n = Math.max(1, Number(inputs.targetMonths || 24));

    if (P <= 0 || n <= 0) return { requiredMonthlyPayment: 0, totalInterest: 0, totalAmountPaid: 0 };

    const pmt = safePmt(P, r, n);
    const totalPaid = pmt * n;
    const totalInterest = Math.max(0, totalPaid - P);

    return {
      requiredMonthlyPayment: Number(pmt.toFixed(2)),
      totalInterest: Number(totalInterest.toFixed(2)),
      totalAmountPaid: Number(totalPaid.toFixed(2)),
    };
  },
};

export default CREDIT_CARD_PAYOFF_CALCULATOR;
