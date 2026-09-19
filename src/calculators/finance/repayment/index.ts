import { CalculatorModuleDefinition } from "../../types";
import { calculateRepayment } from "@/lib/calculator-engine/formulas/repayment";
import { RepaymentCalculator } from "@/components/calculator/repayment/RepaymentCalculator";
import { RepaymentContent, repaymentFaqs } from "@/components/calculator/repayment/RepaymentContent";

export const REPAYMENT_CALCULATOR: CalculatorModuleDefinition = {
  id: "repayment",
  title: "Repayment Calculator",
  slug: "repayment-calculator",
  category: "Finance",
  subcategory: "Others",
  description:
    "Free Repayment Calculator. Calculate loan payments and debt payoff timelines with 8 compounding intervals, 8 payment frequencies, fixed term vs. fixed payment modes, extra payments, and bi-weekly accelerators.",
  iconName: "DollarSign",
  featured: true,
  CustomComponent: RepaymentCalculator,
  ContentComponent: RepaymentContent,
  tags: [
    "repayment calculator",
    "loan repayment calculator",
    "debt repayment calculator",
    "mortgage repayment calculator",
    "credit card repayment calculator",
    "calculate loan payoff time",
    "fixed term vs fixed payment calculator",
    "amortization repayment schedule",
    "biweekly loan repayment calculator",
    "how long to repay loan",
  ],
  formulaDescription:
    "PMT = P × [i(1+i)^n] / [(1+i)^n - 1] where i = (1 + r/m)^(m/k) - 1. For fixed installment: n = -ln(1 - (P×i)/PMT) / ln(1+i).",
  faqs: repaymentFaqs,
  inputs: [
    { name: "loanBalance", label: "Loan Balance ($)", type: "currency", defaultValue: 10000, unit: "$", min: 100, max: 10000000, step: 100 },
    { name: "interestRate", label: "Interest Rate (%)", type: "percentage", defaultValue: 10, unit: "%", min: 0.1, max: 100, step: 0.1 },
  ],
  outputs: [
    { name: "installmentPayment", label: "Periodic Payment", format: "currency", highlight: true },
    { name: "totalInterestPaid", label: "Total Interest", format: "currency", highlight: true },
    { name: "totalAmountRepaid", label: "Total Amount Repaid", format: "currency" },
  ],
  calculate: (inputs: Record<string, any>) => {
    const res = calculateRepayment({
      loanBalance: Number(inputs.loanBalance) || 0,
      interestRatePct: Number(inputs.interestRate) || 0,
      compoundingFrequency: "monthly",
      paymentFrequency: "monthly",
      mode: "term",
      targetYears: 5,
      targetMonths: 0,
    });
    return {
      installmentPayment: res.installmentPayment,
      totalInterestPaid: res.totalInterestPaid,
      totalAmountRepaid: res.totalAmountRepaid,
    };
  },
};
