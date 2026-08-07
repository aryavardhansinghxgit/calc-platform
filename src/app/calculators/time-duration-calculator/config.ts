import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateTimeDurationCalculator } from "./calculator";
import { time_duration_calculatorFaqs } from "./faq";

export const time_duration_calculatorConfig: CalculatorModuleDefinition = {
  id: "time-duration-calculator",
  title: "Time Duration Calculator",
  slug: "time-duration-calculator",
  category: "date",
  subcategory: "Date & Time",
  description: "Calculate exact elapsed duration in days, hours, and minutes between two dates & times.",
  iconName: "Clock",
  featured: true,
  keywords: ["time duration","elapsed time","duration calculator","time interval"],
  priority: 1,
  relatedCalculators: ["date-calculator","day-counter-calculator"],
  formulaDescription: "Duration = End Timestamp - Start Timestamp",
  faqs: time_duration_calculatorFaqs,
  inputs: [
  {
    "name": "startDate",
    "label": "Start Date",
    "type": "date",
    "defaultValue": "2026-08-01"
  },
  {
    "name": "startTime",
    "label": "Start Time",
    "type": "text",
    "defaultValue": "08:00"
  },
  {
    "name": "endDate",
    "label": "End Date",
    "type": "date",
    "defaultValue": "2026-08-07"
  },
  {
    "name": "endTime",
    "label": "End Time",
    "type": "text",
    "defaultValue": "17:30"
  }
],
  outputs: [
  {
    "name": "formattedDuration",
    "label": "Elapsed Duration",
    "format": "text",
    "highlight": true
  },
  {
    "name": "totalHours",
    "label": "Total Hours",
    "format": "number"
  }
],
  calculate: calculateTimeDurationCalculator,
};

export default time_duration_calculatorConfig;
