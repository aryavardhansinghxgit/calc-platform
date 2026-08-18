import { CalculatorModuleDefinition } from "../../types";
import { calculateDetailedAge } from "@/lib/calculator-engine/formulas/age";

export const AGE_CALCULATOR: CalculatorModuleDefinition = {
  id: "age",
  title: "Age Calculator",
  slug: "age-calculator",
  category: "Date",
  description: "Calculate exact age in years, months, days, total days, and countdown to next birthday.",
  iconName: "Calendar",
  featured: false,
  tags: ["age", "date", "birthday", "days lived", "time"],
  formulaDescription: "Age = Target Date - Birth Date",
  inputs: [
    {
      name: "birthDate",
      label: "Date of Birth",
      type: "text",
      defaultValue: "1995-06-15",
    },
  ],
  outputs: [
    {
      name: "ageSummary",
      label: "Exact Age",
      format: "text",
      highlight: true,
    },
    {
      name: "totalDays",
      label: "Total Days Lived",
      format: "number",
    },
    {
      name: "nextBirthdayDays",
      label: "Days Until Next Birthday",
      format: "number",
    },
  ],
  calculate: (inputs) => {
    const res = calculateDetailedAge({
      birthDate: String(inputs.birthDate || "1995-06-15"),
    });
    return {
      ageSummary: `${res.years} years, ${res.months} months, ${res.days} days`,
      totalDays: res.matrix.totalDays,
      nextBirthdayDays: res.nextBirthday.daysRemaining,
    };
  },
};

export default AGE_CALCULATOR;
