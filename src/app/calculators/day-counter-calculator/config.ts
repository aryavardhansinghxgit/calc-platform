import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateDayCounter } from "./calculator";
import { DayCounterCalculator } from "@/components/calculator/day-counter/DayCounterCalculator";
import { DayCounterContent } from "@/components/calculator/day-counter/DayCounterContent";

export const day_counter_calculatorConfig: CalculatorModuleDefinition = {
  id: "day-counter-calculator",
  title: "Day Counter",
  slug: "day-counter-calculator",
  category: "date",
  subcategory: "Date & Time",
  description: "Count exact total calendar days, working days, and weekends between two dates, or solve day-of-week with Conway's Doomsday rule.",
  iconName: "Calendar",
  featured: true,
  keywords: [
    "day counter",
    "days between dates",
    "calendar days calculator",
    "working days counter",
    "business days calculator",
    "conway doomsday rule",
  ],
  priority: 1,
  relatedCalculators: ["date-calculator", "time-calculator", "hours-calculator", "time-card-calculator", "time-duration-calculator"],
  formulaDescription: "Total Days = End Date - Start Date (with business days and holiday exclusions)",
  CustomComponent: DayCounterCalculator,
  ContentComponent: DayCounterContent,
  inputs: [
    {
      name: "startDate",
      label: "Start Date",
      type: "date",
      defaultValue: "2026-01-01",
    },
    {
      name: "endDate",
      label: "End Date",
      type: "date",
      defaultValue: "2026-12-31",
    },
  ],
  outputs: [
    {
      name: "totalDays",
      label: "Total Calendar Days",
      format: "number",
      highlight: true,
    },
    {
      name: "businessDays",
      label: "Business Days (Mon-Fri)",
      format: "number",
    },
    {
      name: "totalWeeks",
      label: "Total Weeks",
      format: "number",
    },
  ],
  calculate: calculateDayCounter,
};

export default day_counter_calculatorConfig;
