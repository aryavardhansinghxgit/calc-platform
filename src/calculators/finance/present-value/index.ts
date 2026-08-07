import { CalculatorModuleDefinition } from "../../types";

export const PRESENT_VALUE_CALCULATOR: CalculatorModuleDefinition = {
  id: "present-value",
  title: "Present Value Calculator",
  slug: "present-value-calculator",
  category: "Finance",
  subcategory: "Investment",
  description: "Calculate the present value of a future lump sum discounted by an expected discount rate.",
  iconName: "DollarSign",
  featured: false,
  tags: ["present value", "pv", "discounted cash flow", "dcf"],
  formulaDescription: "PV = FV / (1 + r)^n",
  faqs: [
    {
      question: "What is Present Value (PV)?",
      answer: "Present Value is the current value of a future sum of money, given a specified discount rate of return.",
    },
  ],
  inputs: [
    { name: "futureValue", label: "Future Value (FV)", type: "currency", defaultValue: 50000, unit: "$", min: 100, max: 10000000, step: 1000 },
    { name: "discountRate", label: "Discount Rate (p.a.)", type: "percentage", defaultValue: 7.0, unit: "%", min: 0.1, max: 25, step: 0.1 },
    { name: "periodsYears", label: "Years in Future", type: "slider", defaultValue: 10, unit: "years", min: 1, max: 50, step: 1 },
  ],
  outputs: [
    { name: "presentValue", label: "Present Value (PV)", format: "currency", highlight: true },
    { name: "discountAmount", label: "Total Discount Amount", format: "currency" },
  ],
  calculate: (inputs) => {
    const fv = Number(inputs.futureValue || 50000);
    const r = Number(inputs.discountRate || 7.0) / 100;
    const n = Number(inputs.periodsYears || 10);

    const pv = fv / Math.pow(1 + r, n);
    const discount = fv - pv;

    return {
      presentValue: Number(pv.toFixed(2)),
      discountAmount: Number(discount.toFixed(2)),
    };
  },
};

export default PRESENT_VALUE_CALCULATOR;
