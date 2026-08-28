import { CalculatorModuleDefinition } from "../../types";
import { calculateBusinessLoan } from "@/lib/calculator-engine/formulas/business-loan";
import { businessLoanFaqs } from "./faq";

export const BUSINESS_LOAN_CALCULATOR: CalculatorModuleDefinition = {
  id: "business-loan",
  title: "Business Loan Calculator – Payment, Interest, Fees, APR & Commercial Loan Analysis",
  slug: "business-loan-calculator",
  category: "Finance",
  subcategory: "Others",
  description:
    "Calculate business loan monthly payments, total interest, commercial fees, actuarial APR, SBA loan options, amortization schedules, and DSCR cash-flow coverage.",
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
    "PMT = [P × r × (1 + r)^n] / [(1 + r)^n - 1]. Real Actuarial APR = IRR Cash Flow Method. DSCR = NOI / Annual Debt Service.",
  faqs: businessLoanFaqs,
  relatedCalculators: [
    "loan",
    "personal-loan",
    "mortgage",
    "auto-loan",
    "roi",
    "payback-period",
    "margin",
    "compound-interest",
  ],
  inputs: [
    { name: "loanAmount", label: "Business Loan Amount ($)", type: "currency", defaultValue: 10000, unit: "$", min: 1000, max: 10000000, step: 1000 },
    { name: "interestRate", label: "Interest Rate (APR %)", type: "percentage", defaultValue: 10.0, unit: "%", min: 0, max: 40, step: 0.25 },
    { name: "loanTermYears", label: "Loan Term (Years)", type: "slider", defaultValue: 5, unit: "years", min: 1, max: 30, step: 1 },
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
      loanAmount: Number(inputs.loanAmount !== undefined && inputs.loanAmount !== "" ? inputs.loanAmount : 10000),
      interestRate: Number(inputs.interestRate !== undefined && inputs.interestRate !== "" ? inputs.interestRate : 10.0),
      loanTermYears: Number(inputs.loanTermYears !== undefined && inputs.loanTermYears !== "" ? inputs.loanTermYears : 5),
      originationFeePercent: Number(inputs.originationFeePercent !== undefined && inputs.originationFeePercent !== "" ? inputs.originationFeePercent : 5.0),
      documentationFeeDollar: Number(inputs.documentationFeeDollar !== undefined && inputs.documentationFeeDollar !== "" ? inputs.documentationFeeDollar : 750),
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
