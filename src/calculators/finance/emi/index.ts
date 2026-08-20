import { CalculatorModuleDefinition } from "../../types";
import { calculateEmiFormula } from "@/lib/calculator-engine/formulas/emi";
import EmiContentSection from "@/components/calculator/emi/EmiContentSection";

export const EMI_CALCULATOR: CalculatorModuleDefinition = {
  id: "emi",
  title: "EMI Calculator",
  slug: "emi-calculator",
  category: "Finance",
  subcategory: "Mortgage and Real Estate",
  description: "Calculate exact monthly loan payments (EMI), compare Reducing Balance vs Flat Rate interest, model extra payment savings, and analyze total borrowing costs.",
  iconName: "DollarSign",
  featured: true,
  tags: ["emi", "loan emi", "home loan emi", "car loan emi", "personal loan emi", "prepayment", "monthly payment"],
  formulaDescription: "EMI = P × r × (1 + r)^n / [(1 + r)^n - 1]. Compounding reducing-balance monthly debt service calculation.",
  ContentComponent: EmiContentSection,
  faqs: [
    {
      question: "What is an Equated Monthly Installment (EMI)?",
      answer: "An Equated Monthly Installment (EMI) is a fixed monthly payment made by a borrower to a lender over a designated loan term. Each installment combines principal balance repayment and accrued periodic interest charges.",
    },
    {
      question: "What is the difference between an EMI and a standard monthly loan payment?",
      answer: "There is no mathematical difference. 'EMI' is the standard term used internationally (particularly in India, the UK, and the GCC), while US lenders and consumers conventionally use 'monthly loan payment' or 'installment payment.'",
    },
    {
      question: "How is a monthly loan payment calculated mathematically?",
      answer: "It is calculated using the universal compounding annuity formula: M = P × [r(1+r)^n] / [(1+r)^n - 1], where P is principal, r is the periodic monthly interest rate (Annual Rate / 12 / 100), and n is total months.",
    },
    {
      question: "How do prepayments reduce total loan interest?",
      answer: "Extra prepayments apply directly toward reducing your unpaid principal balance. Lowering the principal balance immediately reduces future compounding interest charges in subsequent billing periods.",
    },
    {
      question: "What is the difference between Reducing Balance Rate and Flat Interest Rate?",
      answer: "Reducing Balance Rate calculates interest only on the remaining unpaid principal balance after each monthly payment. Flat Rate calculates interest on the full original starting principal for the entire loan life, resulting in substantially higher lifetime borrowing costs.",
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
