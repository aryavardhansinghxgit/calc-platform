import { CalculatorModuleDefinition } from "../../types";
import { safePmt } from "@/lib/calculator-engine/formulas/safety";

export const PERSONAL_LOAN_CALCULATOR: CalculatorModuleDefinition = {
  id: "personal-loan",
  title: "Personal Loan Calculator",
  slug: "personal-loan-calculator",
  category: "Finance",
  subcategory: "Personal",
  description: "Calculate monthly payments and total interest cost for personal unsecured loans.",
  iconName: "DollarSign",
  featured: true,
  tags: ["personal loan", "unsecured loan", "monthly payment", "loan interest"],
  formulaDescription: "PMT = [Principal × r × (1 + r)^n] / [(1 + r)^n - 1]",
  faqs: [
    {
      question: "What is an unsecured personal loan?",
      answer: "An unsecured personal loan is a loan that does not require collateral (such as a house or car) and relies on your credit score and income for approval.",
    },
  ],
  inputs: [
    { name: "loanAmount", label: "Personal Loan Amount", type: "currency", defaultValue: 15000, unit: "$", min: 1000, max: 100000, step: 500 },
    { name: "interestRate", label: "Interest Rate (APR)", type: "percentage", defaultValue: 10.5, unit: "%", min: 1, max: 36, step: 0.25 },
    { name: "loanTermYears", label: "Loan Term", type: "slider", defaultValue: 3, unit: "years", min: 1, max: 7, step: 1 },
  ],
  outputs: [
    { name: "monthlyPayment", label: "Monthly Loan Payment", format: "currency", highlight: true },
    { name: "totalInterestPaid", label: "Total Interest Paid", format: "currency", highlight: true },
    { name: "totalPaid", label: "Total Amount Paid", format: "currency" },
  ],
  calculate: (inputs) => {
    const P = Math.max(0, Number(inputs.loanAmount || 15000));
    const r = Math.min(100, Math.max(0, Number(inputs.interestRate || 10.5))) / 100 / 12;
    const n = Math.max(1, Number(inputs.loanTermYears || 3)) * 12;

    if (P <= 0 || n <= 0) return { monthlyPayment: 0, totalInterestPaid: 0, totalPaid: 0 };

    const pmt = safePmt(P, r, n);
    const total = pmt * n;
    const totalInterest = Math.max(0, total - P);

    return {
      monthlyPayment: Number(pmt.toFixed(2)),
      totalInterestPaid: Number(totalInterest.toFixed(2)),
      totalPaid: Number(total.toFixed(2)),
    };
  },
};

export default PERSONAL_LOAN_CALCULATOR;
