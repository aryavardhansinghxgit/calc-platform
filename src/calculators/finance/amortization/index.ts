import { CalculatorModuleDefinition } from "../../types";
import { calculateAmortizationFormula } from "@/lib/calculator-engine/formulas/amortization";
import { AmortizationCalculator } from "@/components/calculator/amortization/AmortizationCalculator";
import AmortizationContentSection from "@/components/calculator/amortization/AmortizationContentSection";
import { amortization_calculatorFaqs } from "./faq";

export const AMORTIZATION_CALCULATOR: CalculatorModuleDefinition = {
  id: "amortization",
  title: "Amortization Calculator — Mortgage & Loan Payment Schedule",
  slug: "amortization-calculator",
  category: "Finance",
  subcategory: "Mortgage and Real Estate",
  description:
    "Calculate monthly payments, principal and interest, amortization schedules, payoff dates and interest savings with extra monthly, yearly or lump-sum payments.",
  iconName: "Table",
  featured: true,
  tags: [
    "mortgage amortization calculator",
    "loan amortization calculator",
    "amortization schedule",
    "mortgage amortization schedule",
    "amortization calculator with extra payments",
    "early payoff calculator",
    "loan payment amortization",
    "principal and interest calculator",
    "mortgage payoff schedule",
    "interest savings calculator",
    "extra payment mortgage calculator",
    "monthly amortization schedule",
    "annual amortization schedule",
    "amortization table",
  ],
  formulaDescription:
    "Monthly Payment = P × [r(1 + r)^n] / [(1 + r)^n - 1]. Each payment splits into Interest (Balance × r) and Principal reduction.",
  CustomComponent: AmortizationCalculator,
  ContentComponent: AmortizationContentSection,
  faqs: amortization_calculatorFaqs,
  relatedCalculators: [
    "mortgage-calculator",
    "loan-calculator",
    "auto-loan-calculator",
    "personal-loan-calculator",
    "interest-rate-calculator",
    "emi-calculator",
    "refinance-calculator",
  ],
  inputs: [
    {
      name: "loanAmount",
      label: "Loan Amount",
      type: "currency",
      defaultValue: 200000,
      unit: "$",
      min: 1000,
      max: 10000000,
      step: 5000,
    },
    {
      name: "interestRate",
      label: "Interest Rate (p.a.)",
      type: "percentage",
      defaultValue: 6.0,
      unit: "%",
      min: 0.1,
      max: 30,
      step: 0.1,
    },
    {
      name: "loanTermYears",
      label: "Loan Term (Years)",
      type: "slider",
      defaultValue: 15,
      unit: "years",
      min: 1,
      max: 50,
      step: 1,
    },
    {
      name: "loanTermMonths",
      label: "Loan Term (Months)",
      type: "number",
      defaultValue: 0,
      unit: "months",
      min: 0,
      max: 11,
      step: 1,
    },
  ],
  outputs: [
    {
      name: "monthlyPayment",
      label: "Monthly Payment",
      format: "currency",
      highlight: true,
    },
    {
      name: "totalInterest",
      label: "Total Interest",
      format: "currency",
    },
    {
      name: "totalAmountPaid",
      label: "Total Amount Paid",
      format: "currency",
    },
    {
      name: "loanPayoffDate",
      label: "Loan Payoff Date",
      format: "text",
    },
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
