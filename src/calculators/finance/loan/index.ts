import { CalculatorModuleDefinition } from "../../types";
import { calculateLoanFormula } from "@/lib/calculator-engine/formulas/loan";

export const LOAN_CALCULATOR: CalculatorModuleDefinition = {
  id: "loan",
  title: "Loan Calculator",
  slug: "loan-calculator",
  category: "Finance",
  description: "Estimate monthly auto and personal loan payments with custom interest rates and terms.",
  iconName: "CalcIcon",
  featured: true,
  tags: ["loan", "personal loan", "monthly payment", "borrowing cost"],
  formulaDescription: "Monthly Payment = P × [r(1 + r)^n] / [(1 + r)^n - 1]",
  inputs: [
    {
      name: "loanAmount",
      label: "Loan Amount",
      type: "currency",
      defaultValue: 25000,
      unit: "$",
      min: 1000,
      max: 500000,
      step: 500,
    },
    {
      name: "interestRate",
      label: "Interest Rate",
      type: "percentage",
      defaultValue: 7.5,
      unit: "%",
      min: 0.1,
      max: 30,
      step: 0.1,
    },
    {
      name: "loanTermYears",
      label: "Loan Term",
      type: "slider",
      defaultValue: 5,
      unit: "years",
      min: 1,
      max: 10,
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
      name: "totalInterestPaid",
      label: "Total Interest",
      format: "currency",
    },
    {
      name: "totalPaid",
      label: "Total Amount Paid",
      format: "currency",
    },
  ],
  calculate: (inputs) => {
    const res = calculateLoanFormula({
      loanAmount: Number(inputs.loanAmount || 25000),
      interestRate: Number(inputs.interestRate || 7.5),
      loanTermYears: Number(inputs.loanTermYears || 5),
    });
    return {
      monthlyPayment: res.monthlyPayment,
      totalInterestPaid: res.totalInterestPaid,
      totalPaid: res.totalPaid,
    };
  },
};

export default LOAN_CALCULATOR;
