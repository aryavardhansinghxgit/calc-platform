import { CalculatorModuleDefinition } from "../../types";
import { safePmt } from "@/lib/calculator-engine/formulas/safety";

export const AMORTIZATION_CALCULATOR: CalculatorModuleDefinition = {
  id: "amortization",
  title: "Amortization Calculator",
  slug: "amortization-calculator",
  category: "Finance",
  subcategory: "Mortgage & Home",
  description: "Generate a complete loan amortization schedule with monthly principal and interest breakdowns.",
  iconName: "Table",
  featured: true,
  tags: ["amortization", "loan schedule", "principal", "interest", "mortgage"],
  formulaDescription: "Monthly Payment = P × [r(1 + r)^n] / [(1 + r)^n - 1]. Each payment splits into Interest (Balance × r) and Principal.",
  faqs: [
    {
      question: "What is a loan amortization schedule?",
      answer: "An amortization schedule is a complete table showing every periodic payment on a loan, detailing how much goes to interest and how much reduces principal over time.",
    },
  ],
  inputs: [
    { name: "loanAmount", label: "Loan Amount", type: "currency", defaultValue: 250000, unit: "$", min: 1000, max: 10000000, step: 5000 },
    { name: "interestRate", label: "Interest Rate (p.a.)", type: "percentage", defaultValue: 6.5, unit: "%", min: 0.1, max: 30, step: 0.1 },
    { name: "loanTermYears", label: "Loan Term", type: "slider", defaultValue: 30, unit: "years", min: 1, max: 40, step: 1 },
  ],
  outputs: [
    { name: "monthlyPayment", label: "Monthly Payment", format: "currency", highlight: true },
    { name: "totalInterestPaid", label: "Total Interest Paid", format: "currency" },
    { name: "totalPayment", label: "Total Payment", format: "currency" },
  ],
  calculate: (inputs) => {
    const P = Math.max(0, Number(inputs.loanAmount || 250000));
    const rate = Math.min(100, Math.max(0, Number(inputs.interestRate || 6.5))) / 100 / 12;
    const n = Math.max(1, Number(inputs.loanTermYears || 30)) * 12;

    const pmt = safePmt(P, rate, n);
    const totalPayment = pmt * n;
    const totalInterest = Math.max(0, totalPayment - P);

    return {
      monthlyPayment: Number(pmt.toFixed(2)),
      totalInterestPaid: Number(totalInterest.toFixed(2)),
      totalPayment: Number(totalPayment.toFixed(2)),
    };
  },
};

export default AMORTIZATION_CALCULATOR;
