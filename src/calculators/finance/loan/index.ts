import { CalculatorModuleDefinition } from "../../types";
import { calculateLoanFormula } from "@/lib/calculator-engine/formulas/loan";
import LoanContentSection from "@/components/calculator/loan/LoanContentSection";

export const LOAN_CALCULATOR: CalculatorModuleDefinition = {
  id: "loan",
  title: "Loan Calculator",
  slug: "loan-calculator",
  category: "Finance",
  subcategory: "Mortgage & House",
  description: "Calculate monthly loan payments, maximum loan affordability, loan term, and estimated interest rates with detailed amortization schedules and charts.",
  iconName: "CalcIcon",
  featured: true,
  tags: ["loan", "loan calculator", "personal loan", "auto loan", "payment schedule", "amortization"],
  formulaDescription: "Monthly Payment = P × [r(1 + r)^n] / [(1 + r)^n - 1]. Supports 4 modes: Monthly Payment, Loan Amount, Loan Term, and Interest Rate.",
  ContentComponent: LoanContentSection,
  faqs: [
    {
      question: "How is a loan monthly payment calculated?",
      answer: "Monthly payments are calculated using your loan amount, interest rate, and term length using the standard amortization payment formula: P = L * [r(1+r)^n] / [(1+r)^n - 1].",
    },
    {
      question: "What is the difference between APR and interest rate?",
      answer: "The interest rate is the baseline cost of borrowing the principal amount per year, while the Annual Percentage Rate (APR) incorporates additional lender fees, points, and closing costs into a broader effective annual rate.",
    },
    {
      question: "How do extra monthly payments affect my loan?",
      answer: "Extra monthly payments go 100% toward reducing your remaining loan principal balance, which reduces total interest charges and shortens your overall loan term.",
    },
  ],
  inputs: [
    { name: "loanAmount", label: "Loan Amount", type: "currency", defaultValue: 25000, unit: "$", min: 1000, max: 1000000, step: 1000 },
    { name: "interestRate", label: "Interest Rate (p.a.)", type: "percentage", defaultValue: 7.5, unit: "%", min: 0.1, max: 30, step: 0.1 },
    { name: "loanTermYears", label: "Loan Term", type: "slider", defaultValue: 5, unit: "years", min: 1, max: 30, step: 1 },
  ],
  outputs: [
    { name: "monthlyPayment", label: "Monthly Payment", format: "currency", highlight: true },
    { name: "totalInterest", label: "Total Interest Paid", format: "currency" },
    { name: "totalRepayment", label: "Total Amount Paid", format: "currency" },
    { name: "payoffDate", label: "Loan Payoff Date", format: "text" },
  ],
  calculate: (inputs) => {
    return calculateLoanFormula({
      mode: inputs.mode || "monthly-payment",
      loanAmount: Number(inputs.loanAmount || 25000),
      interestRate: Number(inputs.interestRate || 7.5),
      loanTermYears: Number(inputs.loanTermYears || 5),
      loanTermMonths: Number(inputs.loanTermMonths || 0),
      desiredPayment: Number(inputs.desiredPayment || 500),
      paymentFrequency: inputs.paymentFrequency || "monthly",
      extraMonthlyPayment: Number(inputs.extraMonthlyPayment || 0),
    });
  },
};

export default LOAN_CALCULATOR;
