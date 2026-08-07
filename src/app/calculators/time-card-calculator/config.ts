import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateTimeCardCalculator } from "./calculator";
import { time_card_calculatorFaqs } from "./faq";

export const time_card_calculatorConfig: CalculatorModuleDefinition = {
  id: "time-card-calculator",
  title: "Time Card Calculator",
  slug: "time-card-calculator",
  category: "other",
  subcategory: "Date & Time",
  description: "Calculate weekly work hours, overtime, regular pay, and gross earnings.",
  iconName: "Briefcase",
  featured: true,
  keywords: ["time card calculator","timesheet","payroll","gross pay","overtime"],
  priority: 1,
  relatedCalculators: ["hours-calculator","time-calculator"],
  formulaDescription: "Gross Pay = (Regular Hours × Rate) + (Overtime Hours × 1.5 × Rate)",
  faqs: time_card_calculatorFaqs,
  inputs: [
  {
    "name": "monHours",
    "label": "Monday Hours",
    "type": "number",
    "defaultValue": 8,
    "min": 0,
    "max": 24,
    "step": 0.5
  },
  {
    "name": "tueHours",
    "label": "Tuesday Hours",
    "type": "number",
    "defaultValue": 8,
    "min": 0,
    "max": 24,
    "step": 0.5
  },
  {
    "name": "wedHours",
    "label": "Wednesday Hours",
    "type": "number",
    "defaultValue": 8,
    "min": 0,
    "max": 24,
    "step": 0.5
  },
  {
    "name": "thuHours",
    "label": "Thursday Hours",
    "type": "number",
    "defaultValue": 8,
    "min": 0,
    "max": 24,
    "step": 0.5
  },
  {
    "name": "friHours",
    "label": "Friday Hours",
    "type": "number",
    "defaultValue": 8,
    "min": 0,
    "max": 24,
    "step": 0.5
  },
  {
    "name": "hourlyRate",
    "label": "Hourly Pay Rate ($)",
    "type": "number",
    "defaultValue": 25,
    "min": 1,
    "max": 500,
    "step": 1
  }
],
  outputs: [
  {
    "name": "grossPay",
    "label": "Total Gross Pay",
    "format": "currency",
    "highlight": true
  },
  {
    "name": "totalHours",
    "label": "Total Weekly Hours",
    "format": "number"
  },
  {
    "name": "regularPay",
    "label": "Regular Pay",
    "format": "currency"
  },
  {
    "name": "overtimePay",
    "label": "Overtime Pay (1.5x)",
    "format": "currency"
  }
],
  calculate: calculateTimeCardCalculator,
};

export default time_card_calculatorConfig;
