import { CalculatorModuleDefinition } from "../../types";
import { safePmt } from "@/lib/calculator-engine/formulas/safety";

export const EMI_CALCULATOR: CalculatorModuleDefinition = {
  id: "emi",
  title: "EMI Calculator",
  slug: "emi-calculator",
  category: "Finance",
  subcategory: "Mortgage & Home",
  description: "Calculate Equated Monthly Installment (EMI) and interest component schedule.",
  iconName: "DollarSign",
  featured: true,
  tags: ["emi", "loan emi", "home loan emi", "car loan emi"],
  formulaDescription: "EMI = P × r × (1 + r)^n / [(1 + r)^n - 1]",
  faqs: [
    {
      question: "What is EMI?",
      answer: "EMI stands for Equated Monthly Installment, a fixed payment amount made by a borrower to a lender at a specified date each calendar month.",
    },
  ],
  inputs: [
    { name: "loanAmount", label: "Loan Amount", type: "currency", defaultValue: 50000, unit: "₹", min: 10000, max: 10000000, step: 5000 },
    { name: "interestRate", label: "Interest Rate (p.a.)", type: "percentage", defaultValue: 8.5, unit: "%", min: 0.1, max: 30, step: 0.1 },
    { name: "loanTermYears", label: "Loan Tenure", type: "slider", defaultValue: 10, unit: "years", min: 1, max: 30, step: 1 },
  ],
  outputs: [
    { name: "monthlyEmi", label: "Equated Monthly Installment (EMI)", format: "currency", highlight: true },
    { name: "totalInterestPaid", label: "Total Interest Payable", format: "currency" },
    { name: "totalPayment", label: "Total Amount Payable", format: "currency" },
  ],
  calculate: (inputs) => {
    const P = Math.max(0, Number(inputs.loanAmount || 50000));
    const r = Math.min(100, Math.max(0, Number(inputs.interestRate || 8.5))) / 100 / 12;
    const n = Math.max(1, Number(inputs.loanTermYears || 10)) * 12;

    const pmt = safePmt(P, r, n);
    const totalPayment = pmt * n;
    const totalInterest = Math.max(0, totalPayment - P);

    return {
      monthlyEmi: Number(pmt.toFixed(2)),
      totalInterestPaid: Number(totalInterest.toFixed(2)),
      totalPayment: Number(totalPayment.toFixed(2)),
    };
  },
};

export default EMI_CALCULATOR;
