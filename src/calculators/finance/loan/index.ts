import { CalculatorModuleDefinition } from "../../types";
import { calculateLoanFormula } from "@/lib/calculator-engine/formulas/loan";
import { safePmt } from "@/lib/calculator-engine/formulas/safety";

export const LOAN_CALCULATOR: CalculatorModuleDefinition = {
  id: "loan",
  title: "Loan Calculator",
  slug: "loan-calculator",
  category: "Finance",
  subcategory: "Mortgage & Home",
  description: "Estimate monthly auto and personal loan payments with custom interest rates and terms.",
  iconName: "CalcIcon",
  featured: true,
  tags: ["loan", "emi", "personal loan", "auto loan", "payment schedule"],
  formulaDescription: "Monthly Payment = P × [r(1 + r)^n] / [(1 + r)^n - 1]",
  faqs: [
    {
      question: "How is a loan monthly payment calculated?",
      answer: "Monthly payments are calculated using your loan amount, interest rate, and term length using the standard amortization payment formula.",
    },
  ],
  inputs: [
    { name: "loanAmount", label: "Loan Amount", type: "currency", defaultValue: 25000, unit: "$", min: 1000, max: 1000000, step: 1000 },
    { name: "interestRate", label: "Interest Rate (p.a.)", type: "percentage", defaultValue: 7.5, unit: "%", min: 0.1, max: 30, step: 0.1 },
    { name: "loanTermYears", label: "Loan Term", type: "slider", defaultValue: 5, unit: "years", min: 1, max: 30, step: 1 },
  ],
  outputs: [
    { name: "monthlyPayment", label: "Monthly Payment", format: "currency", highlight: true },
    { name: "totalInterestPaid", label: "Total Interest Paid", format: "currency" },
    { name: "totalPayment", label: "Total Amount Paid", format: "currency" },
  ],
  calculate: (inputs) => {
    const P = Math.max(0, Number(inputs.loanAmount || 25000));
    const r = Math.min(100, Math.max(0, Number(inputs.interestRate || 7.5))) / 100 / 12;
    const n = Math.max(1, Number(inputs.loanTermYears || 5)) * 12;

    const pmt = safePmt(P, r, n);
    const totalPayment = pmt * n;
    const totalInterest = Math.max(0, totalPayment - P);

    return {
      monthlyPayment: Number(pmt.toFixed(2)),
      totalInterestPaid: Number(totalInterest.toFixed(2)),
      totalPayment: Number(totalPayment.toFixed(2)),
    };
  },
};

export default LOAN_CALCULATOR;
