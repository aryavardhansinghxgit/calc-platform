import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateDateCalculator } from "./calculator";
import { date_calculatorFaqs } from "./faq";

export const date_calculatorConfig: CalculatorModuleDefinition = {
  id: "date-calculator",
  title: "Date Calculator",
  slug: "date-calculator",
  category: "other",
  subcategory: "Date & Time",
  description: "Add or subtract days, weeks, months, or years from any given starting date.",
  iconName: "CalendarDays",
  featured: true,
  keywords: ["date calculator","add days to date","subtract days","future date"],
  priority: 1,
  relatedCalculators: ["age-calculator","day-counter-calculator"],
  formulaDescription: "Target Date = Start Date ± (Years, Months, Days)",
  faqs: date_calculatorFaqs,
  inputs: [
  {
    "name": "startDate",
    "label": "Start Date",
    "type": "date",
    "defaultValue": "2026-08-07"
  },
  {
    "name": "operation",
    "label": "Action",
    "type": "select",
    "defaultValue": "add",
    "options": [
      {
        "label": "Add (+)",
        "value": "add"
      },
      {
        "label": "Subtract (-)",
        "value": "sub"
      }
    ]
  },
  {
    "name": "years",
    "label": "Years",
    "type": "number",
    "defaultValue": 0,
    "min": 0,
    "max": 100,
    "step": 1
  },
  {
    "name": "months",
    "label": "Months",
    "type": "number",
    "defaultValue": 0,
    "min": 0,
    "max": 120,
    "step": 1
  },
  {
    "name": "days",
    "label": "Days",
    "type": "number",
    "defaultValue": 30,
    "min": 0,
    "max": 1000,
    "step": 1
  }
],
  outputs: [
  {
    "name": "resultDate",
    "label": "Calculated Target Date",
    "format": "text",
    "highlight": true
  },
  {
    "name": "dayOfWeek",
    "label": "Day of the Week",
    "format": "text"
  }
],
  calculate: calculateDateCalculator,
};

export default date_calculatorConfig;
