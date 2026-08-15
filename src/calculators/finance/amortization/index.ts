import { CalculatorModuleDefinition } from "../../types";
import { calculateAmortizationFormula } from "@/lib/calculator-engine/formulas/amortization";
import AmortizationContentSection from "@/components/calculator/amortization/AmortizationContentSection";

export const AMORTIZATION_CALCULATOR: CalculatorModuleDefinition = {
  id: "amortization",
  title: "Amortization Calculator",
  slug: "amortization-calculator",
  category: "Finance",
  subcategory: "Mortgage & House",
  description: "Generate a complete loan amortization schedule with monthly & annual principal, interest, extra payment, and comparison metrics.",
  iconName: "Table",
  featured: true,
  tags: ["amortization", "loan schedule", "principal", "interest", "mortgage", "extra payments"],
  formulaDescription: "Monthly Payment = P × [r(1 + r)^n] / [(1 + r)^n - 1]. Each payment splits into Interest (Balance × r) and Principal reduction.",
  ContentComponent: AmortizationContentSection,
  faqs: [
    {
      question: "What is a loan amortization schedule?",
      answer: "An amortization schedule is a complete table showing every periodic payment on a loan, detailing how much goes to interest and how much reduces principal over time.",
    },
    {
      question: "How do extra payments affect my amortization schedule?",
      answer: "Extra payments go 100% toward reducing your remaining principal balance, which reduces future compounding interest and shortens your overall payoff timeline.",
    },
    {
      question: "What is the difference between an annual and monthly schedule?",
      answer: "A monthly schedule details every individual payment (e.g. 1 to 360), while an annual schedule aggregates total principal, interest, and ending balance by year.",
    },
  ],
  inputs: [
    { name: "loanAmount", label: "Loan Amount", type: "currency", defaultValue: 200000, unit: "$", min: 1000, max: 10000000, step: 5000 },
    { name: "interestRate", label: "Interest Rate (p.a.)", type: "percentage", defaultValue: 6.0, unit: "%", min: 0.1, max: 30, step: 0.1 },
    { name: "loanTermYears", label: "Loan Term (Years)", type: "slider", defaultValue: 15, unit: "years", min: 1, max: 50, step: 1 },
    { name: "loanTermMonths", label: "Loan Term (Months)", type: "number", defaultValue: 0, unit: "months", min: 0, max: 11, step: 1 },
  ],
  outputs: [
    { name: "monthlyPayment", label: "Monthly Payment", format: "currency", highlight: true },
    { name: "totalInterest", label: "Total Interest", format: "currency" },
    { name: "totalAmountPaid", label: "Total Amount Paid", format: "currency" },
    { name: "loanPayoffDate", label: "Loan Payoff Date", format: "text" },
  ],
  calculate: (inputs) => {
    return calculateAmortizationFormula({
      loanAmount: Number(inputs.loanAmount || 200000),
      interestRate: Number(inputs.interestRate || 6.0),
      loanTermYears: Number(inputs.loanTermYears || 15),
      loanTermMonths: Number(inputs.loanTermMonths || 0),
      showExtraPayments: Boolean(inputs.showExtraPayments),
      extraMonthlyPayment: Number(inputs.extraMonthlyPayment || 0),
      extraYearlyPayment: Number(inputs.extraYearlyPayment || 0),
      extraOneTimePayment: Number(inputs.extraOneTimePayment || 0),
    });
  },
};

export default AMORTIZATION_CALCULATOR;
