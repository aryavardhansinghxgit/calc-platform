import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateHoursCalculator } from "./calculator";
import { hours_calculatorFaqs } from "./faq";

export const hours_calculatorConfig: CalculatorModuleDefinition = {
  id: "hours-calculator",
  title: "Hours Calculator",
  slug: "hours-calculator",
  category: "date",
  subcategory: "Date & Time",
  description: "Calculate total hours worked between start and end times minus break time.",
  iconName: "Timer",
  featured: true,
  keywords: ["hours calculator","work hours","time worked","timecard"],
  priority: 1,
  relatedCalculators: ["time-card-calculator","time-calculator"],
  formulaDescription: "Total Hours = (End Time - Start Time - Break Mins) / 60",
  faqs: hours_calculatorFaqs,
  inputs: [
  {
    "name": "startTime",
    "label": "Start Time (e.g. 09:00)",
    "type": "text",
    "defaultValue": "09:00"
  },
  {
    "name": "endTime",
    "label": "End Time (e.g. 17:00)",
    "type": "text",
    "defaultValue": "17:00"
  },
  {
    "name": "breakMins",
    "label": "Unpaid Break (minutes)",
    "type": "number",
    "defaultValue": 30,
    "min": 0,
    "max": 240,
    "step": 5
  }
],
  outputs: [
  {
    "name": "totalHours",
    "label": "Total Paid Hours",
    "format": "number",
    "highlight": true
  },
  {
    "name": "formattedDuration",
    "label": "Duration Format",
    "format": "text"
  }
],
  calculate: calculateHoursCalculator,
};

export default hours_calculatorConfig;
