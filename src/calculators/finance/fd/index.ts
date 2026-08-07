import { CalculatorModuleDefinition } from "../../types";
import { calculateFdFormula } from "@/lib/calculator-engine/formulas/fd";

export const FD_CALCULATOR: CalculatorModuleDefinition = {
  id: "fd",
  title: "FD Calculator",
  slug: "fd-calculator",
  category: "Finance",
  subcategory: "Investment",
  description: "Calculate Fixed Deposit (FD) maturity amount and interest earned.",
  iconName: "Landmark",
  featured: false,
  tags: ["fd", "fixed deposit", "bank deposit", "interest rate"],
  formulaDescription: "A = P(1 + r/n)^(nt)",
  inputs: [
    {
      name: "depositAmount",
      label: "Total Deposit Amount",
      type: "currency",
      defaultValue: 10000,
      unit: "$",
      min: 1000,
      max: 1000000,
      step: 1000,
    },
    {
      name: "interestRate",
      label: "Interest Rate (p.a.)",
      type: "percentage",
      defaultValue: 7.5,
      unit: "%",
      min: 1,
      max: 20,
      step: 0.1,
    },
    {
      name: "tenureYears",
      label: "Tenure (Years)",
      type: "slider",
      defaultValue: 5,
      unit: "years",
      min: 1,
      max: 20,
      step: 1,
    },
  ],
  outputs: [
    {
      name: "maturityAmount",
      label: "Maturity Amount",
      format: "currency",
      highlight: true,
    },
    {
      name: "totalInterestEarned",
      label: "Total Interest Earned",
      format: "currency",
    },
    {
      name: "depositAmount",
      label: "Principal Deposit",
      format: "currency",
    },
  ],
  calculate: (inputs) => {
    const res = calculateFdFormula({
      depositAmount: Number(inputs.depositAmount || 10000),
      interestRate: Number(inputs.interestRate || 7.5),
      tenureYears: Number(inputs.tenureYears || 5),
    });
    return {
      maturityAmount: res.maturityAmount,
      totalInterestEarned: res.totalInterestEarned,
      depositAmount: res.depositAmount,
    };
  },
};

export default FD_CALCULATOR;
