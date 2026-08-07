import { CalculatorModuleDefinition } from "../../types";
import { calculateEmiFormula } from "@/lib/calculator-engine/formulas/emi";

export const EMI_CALCULATOR: CalculatorModuleDefinition = {
  id: "emi",
  title: "EMI Calculator",
  slug: "emi-calculator",
  category: "Finance",
  description: "Calculate Equated Monthly Installment (EMI) and interest component schedule.",
  iconName: "DollarSign",
  featured: true,
  tags: ["emi", "installment", "banking", "finance"],
  formulaDescription: "EMI = P × r × (1 + r)^n / [(1 + r)^n - 1]",
  inputs: [
    {
      name: "principal",
      label: "Loan Principal",
      type: "currency",
      defaultValue: 50000,
      unit: "$",
      min: 1000,
      max: 1000000,
      step: 1000,
    },
    {
      name: "interestRate",
      label: "Interest Rate (p.a.)",
      type: "percentage",
      defaultValue: 8.5,
      unit: "%",
      min: 0.5,
      max: 30,
      step: 0.1,
    },
    {
      name: "tenureMonths",
      label: "Tenure (Months)",
      type: "slider",
      defaultValue: 36,
      unit: "months",
      min: 6,
      max: 360,
      step: 6,
    },
  ],
  outputs: [
    {
      name: "monthlyEmi",
      label: "Monthly EMI",
      format: "currency",
      highlight: true,
    },
    {
      name: "totalInterestPayable",
      label: "Total Interest Payable",
      format: "currency",
    },
    {
      name: "totalPayment",
      label: "Total Payment",
      format: "currency",
    },
  ],
  calculate: (inputs) => {
    const res = calculateEmiFormula({
      principal: Number(inputs.principal || 50000),
      interestRate: Number(inputs.interestRate || 8.5),
      tenureMonths: Number(inputs.tenureMonths || 36),
    });
    return {
      monthlyEmi: res.monthlyEmi,
      totalInterestPayable: res.totalInterestPayable,
      totalPayment: res.totalPayment,
    };
  },
};

export default EMI_CALCULATOR;
