import { CalculatorModuleDefinition } from "../../types";
import { calculateBusinessLoan } from "@/lib/calculator-engine/formulas/business-loan";

export const BUSINESS_LOAN_CALCULATOR: CalculatorModuleDefinition = {
  id: "business-loan",
  title: "Business Loan Calculator – Real APR & Commercial Suite",
  slug: "business-loan-calculator",
  category: "Finance",
  subcategory: "Business",
  description:
    "Free Business Loan Calculator. Calculate monthly payback, total interest, origination and documentation fees, Real Rate (APR), SBA loan options, DSCR cash flow coverage, and amortization schedules.",
  iconName: "Briefcase",
  featured: true,
  tags: [
    "business loan",
    "business loan calculator",
    "commercial loan",
    "sba loan",
    "real rate apr",
    "origination fee",
    "dscr calculator",
  ],
  formulaDescription:
    "Payback = [Principal × r × (1 + r)^n] / [(1 + r)^n - 1]. Real APR = Interest Rate % + [ (Total Fees / Principal / Term Years) × 100 ].",
  faqs: [
    {
      question: "What is the Real Rate (APR) on a business loan?",
      answer:
        "The Real Rate (APR) incorporates upfront fees—such as origination fees, documentation fees, and underwriting costs—into the nominal interest rate, reflecting the true annualized cost of commercial capital.",
    },
    {
      question: "What is Debt Service Coverage Ratio (DSCR)?",
      answer:
        "DSCR measures a business's net operating income (NOI) relative to its annual debt obligations. Commercial lenders typically require a DSCR of 1.25x or higher to approve a business loan.",
    },
  ],
  inputs: [
    { name: "loanAmount", label: "Business Loan Amount ($)", type: "currency", defaultValue: 10000, unit: "$", min: 1000, max: 10000000, step: 1000 },
    { name: "interestRate", label: "Interest Rate (APR %)", type: "percentage", defaultValue: 10.0, unit: "%", min: 1, max: 36, step: 0.25 },
    { name: "loanTermYears", label: "Loan Term (Years)", type: "slider", defaultValue: 5, unit: "years", min: 1, max: 25, step: 1 },
    { name: "originationFeePercent", label: "Origination Fee (%)", type: "percentage", defaultValue: 5.0, unit: "%", min: 0, max: 15, step: 0.25 },
    { name: "documentationFeeDollar", label: "Documentation Fee ($)", type: "currency", defaultValue: 750, unit: "$", min: 0, max: 10000, step: 50 },
  ],
  outputs: [
    { name: "paybackAmount", label: "Payback Every Month", format: "currency", highlight: true },
    { name: "totalInterestPaid", label: "Total Interest Paid", format: "currency", highlight: true },
    { name: "totalInterestAndFees", label: "Interest + Fees", format: "currency" },
    { name: "realAprPercent", label: "Real Rate (APR)", format: "percentage", highlight: true },
  ],
  calculate: (inputs) => {
    const res = calculateBusinessLoan({
      loanAmount: Number(inputs.loanAmount || 10000),
      interestRate: Number(inputs.interestRate || 10.0),
      loanTermYears: Number(inputs.loanTermYears || 5),
      originationFeePercent: Number(inputs.originationFeePercent || 5.0),
      documentationFeeDollar: Number(inputs.documentationFeeDollar || 750),
    });

    return {
      paybackAmount: res.paybackAmount,
      totalInterestPaid: res.totalInterestPaid,
      totalInterestAndFees: res.totalInterestAndFees,
      realAprPercent: `${res.realAprPercent}%`,
    };
  },
};

export default BUSINESS_LOAN_CALCULATOR;
