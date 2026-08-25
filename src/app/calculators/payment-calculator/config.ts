import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateFixedTermPayment } from "./calculator";
import { PaymentCalculator } from "@/components/calculator/payment/PaymentCalculator";
import { PaymentContent } from "@/components/calculator/payment/PaymentContent";
import { paymentFaqs } from "./faq";

export const payment_calculatorConfig: CalculatorModuleDefinition = {
  id: "payment-calculator",
  title: "Payment Calculator — Calculate Monthly Loan Payments & Amortization",
  slug: "payment-calculator",
  category: "Finance",
  subcategory: "Others",
  description:
    "Calculate monthly loan payments, multi-frequency bi-weekly savings, payoff schedules, and interest with our free payment calculator.",
  iconName: "DollarSign",
  featured: true,
  keywords: [
    "payment calculator",
    "loan payment calculator",
    "monthly payment calculator",
    "calculate loan payments",
    "loan payoff calculator",
    "amortization schedule calculator",
    "biweekly loan payment calculator",
    "car loan payment calculator",
    "personal loan payment calculator",
    "how to calculate monthly loan payments",
  ],
  priority: 1,
  faqs: paymentFaqs,
  relatedCalculators: [
    "loan-calculator",
    "mortgage-calculator",
    "auto-loan-calculator",
    "amortization-calculator",
    "interest-calculator",
    "take-home-pay-calculator",
  ],
  formulaDescription:
    "Payment (M) = Principal × [r(1 + r)^n] / [(1 + r)^n - 1], where r is the monthly interest rate and n is the total number of payments.",
  inputs: [
    {
      name: "loanAmount",
      label: "Loan Amount ($)",
      type: "currency",
      defaultValue: 200000,
      min: 0,
      max: 100000000,
    },
    {
      name: "termYears",
      label: "Loan Term (Years)",
      type: "number",
      defaultValue: 15,
      min: 1,
      max: 50,
    },
    {
      name: "interestRate",
      label: "Interest Rate (% / yr)",
      type: "percentage",
      defaultValue: 6.0,
      min: 0,
      max: 100,
    },
  ],
  outputs: [
    {
      name: "monthlyPayment",
      label: "Monthly Payment",
      type: "currency",
    },
    {
      name: "totalInterest",
      label: "Total Interest Paid",
      type: "currency",
    },
    {
      name: "totalAmountPaid",
      label: "Total Amount Repaid",
      type: "currency",
    },
  ],
  calculate: (inputs: Record<string, any>) => {
    const loan = Number(inputs.loanAmount) || 200000;
    const yrs = Number(inputs.termYears) || 15;
    const rate = Number(inputs.interestRate) || 6.0;

    const res = calculateFixedTermPayment({
      loanAmount: loan,
      termYears: yrs,
      termMonths: 0,
      interestRate: rate,
      frequency: "monthly",
      upfrontFees: 0,
      extraMonthlyPayment: 0,
      extraAnnualPayment: 0,
      oneTimeLumpSum: 0,
      oneTimeLumpSumMonth: 1,
    });

    return {
      monthlyPayment: `$${res.paymentPerPeriod.toLocaleString()}`,
      totalInterest: `$${res.totalInterestPaid.toLocaleString()}`,
      totalAmountPaid: `$${res.totalAmountPaid.toLocaleString()}`,
    };
  },
  CustomComponent: PaymentCalculator,
  ContentComponent: PaymentContent,
};

export default payment_calculatorConfig;
