import { CalculatorModuleDefinition } from "../../types";
import { calculateEmiFormula } from "@/lib/calculator-engine/formulas/emi";
import EmiContentSection from "@/components/calculator/emi/EmiContentSection";

export const EMI_CALCULATOR: CalculatorModuleDefinition = {
  id: "emi",
  title: "EMI Calculator",
  slug: "emi-calculator",
  category: "Finance",
  subcategory: "Mortgage & Home",
  description: "Calculate Equated Monthly Installment (EMI), prepayment strategies, reducing vs flat rate comparison, and total loan interest schedule.",
  iconName: "DollarSign",
  featured: true,
  tags: ["emi", "loan emi", "home loan emi", "car loan emi", "personal loan emi", "prepayment"],
  formulaDescription: "EMI = P × r × (1 + r)^n / [(1 + r)^n - 1]. Supports prepayment strategies and Flat Rate vs Reducing Balance Interest methods.",
  ContentComponent: EmiContentSection,
  faqs: [
    {
      question: "What is an EMI (Equated Monthly Installment)?",
      answer: "EMI stands for Equated Monthly Installment, a fixed payment amount made by a borrower to a lender at a specified date each calendar month until the loan is fully paid off.",
    },
    {
      question: "How do prepayments reduce total loan interest?",
      answer: "Prepayments reduce your remaining loan principal balance directly. Lowering principal reduces monthly compounding interest in subsequent periods, allowing you to save money or pay off early.",
    },
    {
      question: "What is the difference between Reducing Balance Rate and Flat Interest Rate?",
      answer: "Reducing Balance Rate calculates interest only on the remaining principal balance after each EMI payment. Flat Rate calculates interest on the original starting principal for the entire loan life, resulting in significantly higher total interest.",
    },
  ],
  inputs: [
    { name: "loanAmount", label: "Loan Amount", type: "currency", defaultValue: 500000, unit: "₹", min: 10000, max: 100000000, step: 10000 },
    { name: "interestRate", label: "Interest Rate (p.a.)", type: "percentage", defaultValue: 8.5, unit: "%", min: 0.1, max: 30, step: 0.1 },
    { name: "loanTermYears", label: "Loan Tenure", type: "slider", defaultValue: 10, unit: "years", min: 1, max: 30, step: 1 },
  ],
  outputs: [
    { name: "monthlyEmi", label: "Equated Monthly Installment (EMI)", format: "currency", highlight: true },
    { name: "totalInterestPayable", label: "Total Interest Payable", format: "currency" },
    { name: "totalCostOfLoan", label: "Total Cost of Loan", format: "currency" },
    { name: "payoffDate", label: "Loan Payoff Date", format: "text" },
  ],
  calculate: (inputs) => {
    return calculateEmiFormula({
      mode: inputs.mode || "standard",
      loanAmount: Number(inputs.loanAmount || 500000),
      interestRate: Number(inputs.interestRate || 8.5),
      loanTermYears: Number(inputs.loanTermYears || 10),
      loanTermMonths: Number(inputs.loanTermMonths || 0),
      processingFeeRate: Number(inputs.processingFeeRate || 0.5),
      extraMonthlyPrepayment: Number(inputs.extraMonthlyPrepayment || 0),
      prepaymentStrategy: inputs.prepaymentStrategy || "reduce-tenure",
    });
  },
};

export default EMI_CALCULATOR;
