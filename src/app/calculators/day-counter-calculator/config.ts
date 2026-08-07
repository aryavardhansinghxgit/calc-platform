import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateDayCounter } from "./calculator";
import { day_counter_calculatorFaqs } from "./faq";

export const day_counter_calculatorConfig: CalculatorModuleDefinition = {
  id: "day-counter-calculator",
  title: "Day Counter",
  slug: "day-counter-calculator",
  category: "other",
  subcategory: "Date & Time",
  description: "Count exact total calendar days and business days between two dates.",
  iconName: "Calendar",
  featured: true,
  keywords: ["day counter","days between dates","calendar days","working days"],
  priority: 1,
  relatedCalculators: ["date-calculator","day-of-the-week-calculator"],
  formulaDescription: "Total Days = End Date - Start Date",
  faqs: day_counter_calculatorFaqs,
  inputs: [
  {
    "name": "startDate",
    "label": "Start Date",
    "type": "date",
    "defaultValue": "2026-01-01"
  },
  {
    "name": "endDate",
    "label": "End Date",
    "type": "date",
    "defaultValue": "2026-12-31"
  }
],
  outputs: [
  {
    "name": "totalDays",
    "label": "Total Calendar Days",
    "format": "number",
    "highlight": true
  },
  {
    "name": "businessDays",
    "label": "Business Days (Mon-Fri)",
    "format": "number"
  },
  {
    "name": "totalWeeks",
    "label": "Total Weeks",
    "format": "number"
  }
],
  calculate: calculateDayCounter,
};

export default day_counter_calculatorConfig;
