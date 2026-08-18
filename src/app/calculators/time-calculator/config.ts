import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateTimeCalculator } from "./calculator";
import { TimeCalculator } from "@/components/calculator/time/TimeCalculator";
import { TimeContent } from "@/components/calculator/time/TimeContent";

export const time_calculatorConfig: CalculatorModuleDefinition = {
  id: "time-calculator",
  title: "Time Calculator",
  slug: "time-calculator",
  category: "date",
  subcategory: "Date & Time",
  description: "Add, subtract, and convert time values in days, hours, minutes, and seconds, evaluate free-text expressions, and calculate date-time shifts.",
  iconName: "Clock",
  featured: true,
  keywords: [
    "time calculator",
    "add hours and minutes",
    "time duration calculator",
    "calculate time difference",
    "add time",
    "subtract time",
    "time expression parser",
  ],
  priority: 1,
  relatedCalculators: ["date-calculator", "age-calculator", "time-duration-calculator", "hours-calculator", "day-counter-calculator"],
  formulaDescription: "Total Time = Time 1 ± Time 2 (with sexagesimal base-60 rollover)",
  CustomComponent: TimeCalculator,
  ContentComponent: TimeContent,
  inputs: [
    {
      name: "h1",
      label: "Time 1 Hours",
      type: "number",
      defaultValue: 4,
      min: 0,
      max: 1000,
      step: 1,
    },
    {
      name: "m1",
      label: "Time 1 Minutes",
      type: "number",
      defaultValue: 35,
      min: 0,
      max: 59,
      step: 1,
    },
    {
      name: "operation",
      label: "Operator",
      type: "select",
      defaultValue: "+",
      options: [
        { label: "Add (+)", value: "+" },
        { label: "Subtract (-)", value: "-" },
      ],
    },
    {
      name: "h2",
      label: "Time 2 Hours",
      type: "number",
      defaultValue: 2,
      min: 0,
      max: 1000,
      step: 1,
    },
    {
      name: "m2",
      label: "Time 2 Minutes",
      type: "number",
      defaultValue: 45,
      min: 0,
      max: 59,
      step: 1,
    },
  ],
  outputs: [
    {
      name: "resultTime",
      label: "Total Time",
      format: "text",
      highlight: true,
    },
    {
      name: "totalHours",
      label: "Total Hours (Decimal)",
      format: "number",
    },
  ],
  calculate: calculateTimeCalculator,
};

export default time_calculatorConfig;
