import { CalculatorModuleDefinition } from "../../types";
import { safePmt } from "@/lib/calculator-engine/formulas/safety";

export const BUSINESS_LOAN_CALCULATOR: CalculatorModuleDefinition = {
  id: "business-loan",
  title: "Business Loan Calculator",
  slug: "business-loan-calculator",
  category: "Finance",
  subcategory: "Personal",
  description: "Calculate commercial business loan payments including origination fees and total cost of capital.",
  iconName: "Briefcase",
  featured: false,
  tags: ["business loan", "commercial loan", "sba loan", "origination fee"],
  formulaDescription: "PMT = [Loan Amount × r × (1 + r)^n] / [(1 + r)^n - 1] + Origination Fees.",
  faqs: [
    {
      question: "What is an origination fee on a business loan?",
      answer: "An origination fee is an upfront fee charged by lenders to process and underwrite the loan, typically 1% to 5% of total loan value.",
    },
  ],
  inputs: [
    { name: "loanAmount", label: "Business Loan Amount", type: "currency", defaultValue: 100000, unit: "$", min: 5000, max: 5000000, step: 5000 },
    { name: "interestRate", label: "Interest Rate (p.a.)", type: "percentage", defaultValue: 8.5, unit: "%", min: 1, max: 30, step: 0.25 },
    { name: "loanTermYears", label: "Loan Term", type: "slider", defaultValue: 5, unit: "years", min: 1, max: 25, step: 1 },
    { name: "originationFeePercent", label: "Origination Fee %", type: "percentage", defaultValue: 2.0, unit: "%", min: 0, max: 10, step: 0.25 },
  ],
  outputs: [
    { name: "monthlyPayment", label: "Monthly Loan Payment", format: "currency", highlight: true },
    { name: "originationFeeAmount", label: "Upfront Origination Fee", format: "currency" },
    { name: "totalInterestPaid", label: "Total Interest Paid", format: "currency", highlight: true },
    { name: "totalCostOfLoan", label: "Total Cost of Loan", format: "currency" },
  ],
  calculate: (inputs) => {
    const P = Math.max(0, Number(inputs.loanAmount || 100000));
    const r = Math.min(100, Math.max(0, Number(inputs.interestRate || 8.5))) / 100 / 12;
    const n = Math.max(1, Number(inputs.loanTermYears || 5)) * 12;
    const feeRate = Math.min(100, Math.max(0, Number(inputs.originationFeePercent || 2.0))) / 100;

    if (P <= 0 || n <= 0) return { monthlyPayment: 0, originationFeeAmount: 0, totalInterestPaid: 0, totalCostOfLoan: 0 };

    const pmt = safePmt(P, r, n);
    const fee = P * feeRate;
    const totalInterest = Math.max(0, (pmt * n) - P);
    const totalCost = (pmt * n) + fee;

    return {
      monthlyPayment: Number(pmt.toFixed(2)),
      originationFeeAmount: Number(fee.toFixed(2)),
      totalInterestPaid: Number(totalInterest.toFixed(2)),
      totalCostOfLoan: Number(totalCost.toFixed(2)),
    };
  },
};

export default BUSINESS_LOAN_CALCULATOR;
