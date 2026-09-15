import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateDayCounter } from "./calculator";
import { DayCounterCalculator } from "@/components/calculator/day-counter/DayCounterCalculator";
import { DayCounterContent } from "@/components/calculator/day-counter/DayCounterContent";
import { day_counter_calculatorFaqs } from "./faq";

export const day_counter_calculatorConfig: CalculatorModuleDefinition = {
  id: "day-counter-calculator",
  title: "Day Counter Calculator",
  slug: "day-counter-calculator",
  category: "date",
  subcategory: "Date & Time",
  description:
    "Calculate days between two dates, working days, weekends and U.S. federal holidays. Add or subtract days, check weekdays with Doomsday, and explore date-count conventions.",
  iconName: "Calendar",
  featured: true,
  keywords: [
    "day counter calculator",
    "days between dates",
    "calendar days calculator",
    "working days counter",
    "business days calculator",
    "conway doomsday rule",
  ],
  priority: 1,
  relatedCalculators: [
    "date-calculator",
    "time-calculator",
    "hours-calculator",
    "time-card-calculator",
    "time-duration-calculator",
    "age-calculator",
  ],
  formulaDescription: "Total Days = End Date - Start Date (with business days and holiday exclusions)",
  faqs: day_counter_calculatorFaqs,
  CustomComponent: DayCounterCalculator,
  ContentComponent: DayCounterContent,
  inputs: [
    {
      name: "startDate",
      label: "Start Date",
      type: "date",
      defaultValue: "2026-09-14",
    },
    {
      name: "endDate",
      label: "End Date",
      type: "date",
      defaultValue: "2026-12-14",
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
