import { CalculatorModuleDefinition } from "../../types";

export const PENSION_CALCULATOR: CalculatorModuleDefinition = {
  id: "pension",
  title: "Pension Calculator",
  slug: "pension-calculator",
  category: "Finance",
  subcategory: "Retirement",
  description: "Calculate your monthly defined-benefit pension income based on final average salary, years of service, and multiplier percentage.",
  iconName: "Shield",
  featured: false,
  tags: ["pension", "defined benefit", "retirement pension", "service years"],
  formulaDescription: "Annual Pension = Final Average Salary × Years of Service × Benefit Multiplier %.",
  faqs: [
    {
      question: "How is a defined benefit pension calculated?",
      answer: "Pensions are typically calculated using a formula multiplying your highest average salary by total years of service and a pension benefit multiplier percentage (usually 1.5% to 2.5%).",
    },
  ],
  inputs: [
    { name: "finalSalary", label: "Final Average Salary", type: "currency", defaultValue: 80000, unit: "$", min: 10000, max: 1000000, step: 2500 },
    { name: "yearsOfService", label: "Years of Service", type: "slider", defaultValue: 25, unit: "years", min: 1, max: 45, step: 1 },
    { name: "multiplierPercent", label: "Benefit Multiplier", type: "percentage", defaultValue: 2.0, unit: "%", min: 0.5, max: 5.0, step: 0.1 },
  ],
  outputs: [
    { name: "monthlyPension", label: "Monthly Pension Income", format: "currency", highlight: true },
    { name: "annualPension", label: "Annual Pension Income", format: "currency", highlight: true },
    { name: "replacementRatio", label: "Income Replacement Ratio", format: "percentage" },
  ],
  calculate: (inputs) => {
    const salary = Number(inputs.finalSalary || 80000);
    const years = Number(inputs.yearsOfService || 25);
    const mult = Number(inputs.multiplierPercent || 2.0) / 100;

    const annual = salary * years * mult;
    const monthly = annual / 12;
    const ratio = salary > 0 ? (annual / salary) * 100 : 0;

    return {
      monthlyPension: Number(monthly.toFixed(2)),
      annualPension: Number(annual.toFixed(2)),
      replacementRatio: `${ratio.toFixed(1)}%`,
    };
  },
};

export default PENSION_CALCULATOR;
