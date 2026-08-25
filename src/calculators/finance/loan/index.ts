import { CalculatorModuleDefinition } from "../../types";
import { calculateLoanFormula } from "@/lib/calculator-engine/formulas/loan";
import { loan_calculatorFaqs } from "./faq";

export const LOAN_CALCULATOR: CalculatorModuleDefinition = {
  id: "loan",
  title: "Loan Calculator – Monthly, Biweekly & Extra Payment Payoff",
  slug: "loan-calculator",
  category: "Finance",
  subcategory: "Others",
  description: "Calculate loan payments across monthly, biweekly, and weekly schedules. Model extra payments, generate complete amortization schedules, and solve for loan amount, term, or interest rate.",
  iconName: "CalcIcon",
  featured: true,
  tags: ["loan", "loan calculator", "loan payment calculator", "loan amortization calculator", "biweekly loan payment", "loan payoff calculator", "extra payments"],
  formulaDescription: "PMT = P × [r(1 + r)^n] / [(1 + r)^n − 1]. Supports 8 analysis modes: Standard Loan, Extra Payments, 3-Offer Comparison, Affordability, Duration Solver, Refinance Analysis, Deferred Payment Loan, and Bond Model.",
  faqs: loan_calculatorFaqs,
  inputs: [
    { name: "loanAmount", label: "Loan Amount", type: "currency", defaultValue: 100000, unit: "$", min: 1000, max: 10000000, step: 1000 },
    { name: "interestRate", label: "Interest Rate (p.a.)", type: "percentage", defaultValue: 6.0, unit: "%", min: 0.0, max: 50, step: 0.1 },
    { name: "loanTermYears", label: "Loan Term", type: "slider", defaultValue: 10, unit: "years", min: 1, max: 50, step: 1 },
  ],
  outputs: [
    { name: "monthlyPayment", label: "Monthly Payment", format: "currency", highlight: true },
    { name: "totalInterest", label: "Total Interest Paid", format: "currency" },
    { name: "totalRepayment", label: "Total Amount Paid", format: "currency" },
    { name: "payoffDate", label: "Loan Payoff Date", format: "text" },
  ],
  calculate: (inputs) => {
    return calculateLoanFormula({
      mode: inputs.mode || "standard",
      loanAmount: Number(inputs.loanAmount || 100000),
      interestRate: Number(inputs.interestRate || 6.0),
      loanTermYears: Number(inputs.loanTermYears || 10),
      loanTermMonths: Number(inputs.loanTermMonths || 0),
      desiredPayment: Number(inputs.desiredPayment || 1110.21),
      paymentFrequency: inputs.paymentFrequency || "monthly",
      compoundingFrequency: inputs.compoundingFrequency || "monthly",
      extraMonthlyPayment: Number(inputs.extraMonthlyPayment || 0),
    });
  },
};

export default LOAN_CALCULATOR;
