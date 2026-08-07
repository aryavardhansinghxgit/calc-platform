import { CalculatorModuleDefinition } from "../../types";
import { safePmt } from "@/lib/calculator-engine/formulas/safety";

export const STUDENT_LOAN_CALCULATOR: CalculatorModuleDefinition = {
  id: "student-loan",
  title: "Student Loan Calculator",
  slug: "student-loan-calculator",
  category: "Finance",
  subcategory: "Personal",
  description: "Calculate monthly student loan payments, total interest accrued during school, and total repayment cost.",
  iconName: "GraduationCap",
  featured: false,
  tags: ["student loan", "college loan", "education loan", "student debt"],
  formulaDescription: "PMT = [Principal × r × (1 + r)^n] / [(1 + r)^n - 1]",
  faqs: [
    {
      question: "How does interest accrue while in school?",
      answer: "Unsubsidized student loans accrue interest while you are enrolled in school, which is added (capitalized) into your principal balance upon graduation.",
    },
  ],
  inputs: [
    { name: "loanBalance", label: "Student Loan Balance", type: "currency", defaultValue: 35000, unit: "$", min: 1000, max: 300000, step: 1000 },
    { name: "interestRate", label: "Interest Rate (p.a.)", type: "percentage", defaultValue: 5.8, unit: "%", min: 1, max: 20, step: 0.1 },
    { name: "repaymentTermYears", label: "Repayment Term", type: "slider", defaultValue: 10, unit: "years", min: 5, max: 25, step: 1 },
  ],
  outputs: [
    { name: "monthlyPayment", label: "Monthly Repayment", format: "currency", highlight: true },
    { name: "totalInterestPaid", label: "Total Interest Paid", format: "currency", highlight: true },
    { name: "totalRepaymentCost", label: "Total Repayment Cost", format: "currency" },
  ],
  calculate: (inputs) => {
    const P = Math.max(0, Number(inputs.loanBalance || 35000));
    const r = Math.min(100, Math.max(0, Number(inputs.interestRate || 5.8))) / 100 / 12;
    const n = Math.max(1, Number(inputs.repaymentTermYears || 10)) * 12;

    if (P <= 0 || n <= 0) return { monthlyPayment: 0, totalInterestPaid: 0, totalRepaymentCost: 0 };

    const pmt = safePmt(P, r, n);
    const totalCost = pmt * n;
    const totalInterest = Math.max(0, totalCost - P);

    return {
      monthlyPayment: Number(pmt.toFixed(2)),
      totalInterestPaid: Number(totalInterest.toFixed(2)),
      totalRepaymentCost: Number(totalCost.toFixed(2)),
    };
  },
};

export default STUDENT_LOAN_CALCULATOR;
