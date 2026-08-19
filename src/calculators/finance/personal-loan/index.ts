import { CalculatorModuleDefinition } from "../../types";
import { calculatePersonalLoan } from "@/lib/calculator-engine/formulas/personal-loan";

export const PERSONAL_LOAN_CALCULATOR: CalculatorModuleDefinition = {
  id: "personal-loan",
  title: "Personal Loan Calculator – Amortization & Consolidation Suite",
  slug: "personal-loan-calculator",
  category: "Finance",
  subcategory: "Others",
  description:
    "Free Personal Loan Calculator. Calculate monthly payments, total interest, annual and monthly amortization schedules, fee options, debt consolidation APR savings, and early payoff acceleration.",
  iconName: "DollarSign",
  featured: true,
  tags: [
    "personal loan",
    "unsecured loan",
    "monthly payment",
    "loan interest",
    "amortization schedule",
    "debt consolidation",
    "early payoff",
  ],
  formulaDescription:
    "PMT = [Principal × r × (1 + r)^n] / [(1 + r)^n - 1]. Total Interest = (PMT × n) - Principal.",
  faqs: [
    {
      question: "What is an unsecured personal loan?",
      answer:
        "An unsecured personal loan is a fixed-rate loan that does not require collateral (such as a home or car) and relies primarily on your credit score, debt-to-income ratio, and verified income for approval.",
    },
    {
      question: "How do origination fees affect the effective loan APR?",
      answer:
        "An origination fee (typically 1% to 8%) is deducted upfront from loan proceeds or added to the principal balance. This increases your effective Annual Percentage Rate (APR) above the nominal interest rate.",
    },
  ],
  inputs: [
    { name: "loanAmount", label: "Personal Loan Amount ($)", type: "currency", defaultValue: 20000, unit: "$", min: 1000, max: 200000, step: 500 },
    { name: "interestRate", label: "Interest Rate (APR %)", type: "percentage", defaultValue: 10.0, unit: "%", min: 1, max: 36, step: 0.25 },
    { name: "loanTermYears", label: "Loan Term (Years)", type: "slider", defaultValue: 5, unit: "years", min: 1, max: 10, step: 1 },
  ],
  outputs: [
    { name: "monthlyPayment", label: "Monthly Payment", format: "currency", highlight: true },
    { name: "totalInterestPaid", label: "Total Interest Paid", format: "currency", highlight: true },
    { name: "totalPayments", label: "Total Loan Cost", format: "currency" },
    { name: "payoffDateStr", label: "Payoff Date", format: "text" },

  ],
  calculate: (inputs) => {
    const res = calculatePersonalLoan({
      loanAmount: Number(inputs.loanAmount || 20000),
      interestRate: Number(inputs.interestRate || 10.0),
      loanTermYears: Number(inputs.loanTermYears || 5),
    });

    return {
      monthlyPayment: res.monthlyPayment,
      totalInterestPaid: res.totalInterestPaid,
      totalPayments: res.totalPayments,
      payoffDateStr: res.payoffDateStr,
    };
  },
};

export default PERSONAL_LOAN_CALCULATOR;
