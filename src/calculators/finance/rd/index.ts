import { CalculatorModuleDefinition } from "../../types";
import { calculateRdFormula } from "@/lib/calculator-engine/formulas/rd";

export const RD_CALCULATOR: CalculatorModuleDefinition = {
  id: "rd",
  title: "RD Calculator",
  slug: "rd-calculator",
  category: "Finance",
  subcategory: "Investment",
  description: "Calculate Recurring Deposit (RD) total investment returns and interest maturity value.",
  iconName: "RefreshCw",
  featured: false,
  tags: ["rd", "recurring deposit", "monthly savings", "bank deposit"],
  formulaDescription: "Interest = P × [n(n+1)/2] × (r/12)",
  inputs: [
    {
      name: "monthlyDeposit",
      label: "Monthly Deposit Amount",
      type: "currency",
      defaultValue: 500,
      unit: "$",
      min: 50,
      max: 50000,
      step: 50,
    },
    {
      name: "interestRate",
      label: "Interest Rate (p.a.)",
      type: "percentage",
      defaultValue: 6.8,
      unit: "%",
      min: 1,
      max: 20,
      step: 0.1,
    },
    {
      name: "tenureMonths",
      label: "Tenure (Months)",
      type: "slider",
      defaultValue: 24,
      unit: "months",
      min: 6,
      max: 120,
      step: 6,
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
      name: "totalInvested",
      label: "Total Invested Amount",
      format: "currency",
    },
    {
      name: "totalInterestEarned",
      label: "Total Interest Earned",
      format: "currency",
    },
  ],
  calculate: (inputs) => {
    const res = calculateRdFormula({
      monthlyDeposit: Number(inputs.monthlyDeposit || 500),
      interestRate: Number(inputs.interestRate || 6.8),
      tenureMonths: Number(inputs.tenureMonths || 24),
    });
    return {
      maturityAmount: res.maturityAmount,
      totalInvested: res.totalInvested,
      totalInterestEarned: res.totalInterestEarned,
    };
  },
};

export default RD_CALCULATOR;
