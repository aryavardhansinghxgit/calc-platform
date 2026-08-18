import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateDateCalculator } from "./calculator";
import { DateCalculator } from "@/components/calculator/date/DateCalculator";
import { DateContent } from "@/components/calculator/date/DateContent";

export const date_calculatorConfig: CalculatorModuleDefinition = {
  id: "date-calculator",
  title: "Date Calculator",
  slug: "date-calculator",
  category: "date",
  subcategory: "Date & Time",
  description: "Find the exact duration between two dates, or add/subtract days, weeks, months, years, and business days with holiday awareness.",
  iconName: "CalendarDays",
  featured: true,
  keywords: [
    "date calculator",
    "days between dates",
    "add days to date",
    "subtract days from date",
    "business day calculator",
    "workday calculator",
    "calendar calculator",
  ],
  priority: 1,
  relatedCalculators: ["age-calculator", "time-calculator", "time-duration-calculator", "day-counter-calculator"],
  formulaDescription: "Days Between Dates = End Date - Start Date (with month borrowing and leap year adjustments)",
  CustomComponent: DateCalculator,
  ContentComponent: DateContent,
  inputs: [
    {
      name: "startDate",
      label: "Start Date",
      type: "date",
      defaultValue: "2026-08-18",
    },
    {
      name: "endDate",
      label: "End Date",
      type: "date",
      defaultValue: "2026-09-17",
    },
    {
      name: "operation",
      label: "Action",
      type: "select",
      defaultValue: "add",
      options: [
        { label: "Add (+)", value: "add" },
        { label: "Subtract (-)", value: "sub" },
      ],
    },
    {
      name: "days",
      label: "Days",
      type: "number",
      defaultValue: 30,
      min: 0,
      max: 10000,
      step: 1,
    },
  ],
  outputs: [
    {
      name: "resultDate",
      label: "Calculated Target Date",
      format: "text",
      highlight: true,
    },
    {
      name: "dayOfWeek",
      label: "Day of the Week",
      format: "text",
    },
  ],
  calculate: calculateDateCalculator,
};

export default date_calculatorConfig;
