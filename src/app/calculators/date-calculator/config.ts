import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateDateCalculator } from "./calculator";
import { date_calculatorFaqs } from "./faq";
import { DateCalculator } from "@/components/calculator/date/DateCalculator";
import { DateContent } from "@/components/calculator/date/DateContent";

export const date_calculatorConfig: CalculatorModuleDefinition = {
  id: "date-calculator",
  title: "Date Calculator",
  slug: "date-calculator",
  category: "date",
  subcategory: "Date & Time",
  description:
    "Calculate days between two dates, add or subtract days, weeks, months and years, and count business days with leap-year, month-end, weekend and holiday support.",
  iconName: "CalendarDays",
  featured: true,
  keywords: [
    "date calculator",
    "days between dates calculator",
    "days calculator",
    "date difference calculator",
    "add days to date",
    "subtract days from date",
    "business days calculator",
    "working days calculator",
    "date duration calculator",
    "date interval calculator",
    "days between two dates",
    "calculate days between dates",
    "date add/subtract calculator",
    "holiday-aware business days calculator",
  ],
  priority: 1,
  relatedCalculators: [
    "age-calculator",
    "time-calculator",
    "time-duration-calculator",
    "day-counter-calculator",
    "hours-calculator",
    "day-of-the-week-calculator",
    "due-date-calculator",
  ],
  formulaDescription: "Days Between Dates = End Date - Start Date (with month borrowing and leap year adjustments)",
  faqs: date_calculatorFaqs,
  CustomComponent: DateCalculator,
  ContentComponent: DateContent,
  inputs: [
    {
      name: "startDate",
      label: "Start Date",
      type: "date",
      defaultValue: "2026-08-24",
    },
    {
      name: "endDate",
      label: "End Date",
      type: "date",
      defaultValue: "2026-09-23",
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
