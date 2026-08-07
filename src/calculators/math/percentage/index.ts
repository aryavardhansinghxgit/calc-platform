import { CalculatorModuleDefinition } from "../../types";
import { calculatePercentageFormula } from "@/lib/calculator-engine/formulas/percentage";

export const PERCENTAGE_CALCULATOR: CalculatorModuleDefinition = {
  id: "percentage",
  title: "Percentage Calculator",
  slug: "percentage-calculator",
  category: "Math",
  description: "Calculate percentage values, percentage increase/decrease, and proportions.",
  iconName: "Percent",
  featured: true,
  tags: ["percentage", "math", "ratio", "change", "proportion"],
  formulaDescription: "Result = (Value1 / 100) × Value2",
  inputs: [
    {
      name: "value1",
      label: "Percentage (%)",
      type: "percentage",
      defaultValue: 15,
      unit: "%",
      min: 0,
      max: 1000,
      step: 1,
    },
    {
      name: "value2",
      label: "Total Number",
      type: "number",
      defaultValue: 500,
      min: 0,
      max: 1000000,
      step: 10,
    },
  ],
  outputs: [
    {
      name: "result",
      label: "Calculated Value",
      format: "number",
      highlight: true,
    },
  ],
  calculate: (inputs) => {
    const res = calculatePercentageFormula({
      value1: Number(inputs.value1 || 15),
      value2: Number(inputs.value2 || 500),
    });
    return {
      result: res.result,
    };
  },
};

export default PERCENTAGE_CALCULATOR;
