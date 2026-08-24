import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateHoursCalculator } from "./calculator";
import { hours_calculatorFaqs } from "./faq";
import { HoursCalculator } from "@/components/calculator/hours/HoursCalculator";
import { HoursContent } from "@/components/calculator/hours/HoursContent";

export const hours_calculatorConfig: CalculatorModuleDefinition = {
  id: "hours-calculator",
  title: "Hours Calculator",
  slug: "hours-calculator",
  category: "date",
  subcategory: "Date & Time",
  description:
    "Calculate hours between times or dates, subtract unpaid breaks, handle overnight shifts, convert decimal hours, and estimate regular and overtime pay.",
  iconName: "Timer",
  featured: true,
  keywords: [
    "hours calculator",
    "hours between two times",
    "hours between dates",
    "calculate hours worked",
    "time card calculator",
    "work hours calculator",
    "overtime calculator",
    "hours and minutes calculator",
    "decimal hours calculator",
    "hours to minutes calculator",
    "minutes to decimal hours",
    "overnight shift calculator",
    "payroll hours calculator",
    "timecard hours calculator",
  ],
  priority: 1,
  relatedCalculators: [
    "time-calculator",
    "time-duration-calculator",
    "date-calculator",
    "age-calculator",
    "day-counter-calculator",
    "time-card-calculator",
    "time-zone-calculator",
  ],
  formulaDescription:
    "Total Hours = (End Time - Start Time - Unpaid Breaks) / 60 (with 24h rollover and decimal hours conversion)",
  faqs: hours_calculatorFaqs,
  CustomComponent: HoursCalculator,
  ContentComponent: HoursContent,
  inputs: [
    {
      name: "startTime",
      label: "Start Time",
      type: "text",
      defaultValue: "08:30",
    },
    {
      name: "endTime",
      label: "End Time",
      type: "text",
      defaultValue: "17:30",
    },
    {
      name: "breakMins",
      label: "Unpaid Break (minutes)",
      type: "number",
      defaultValue: 30,
      min: 0,
      max: 300,
      step: 5,
    },
  ],
  outputs: [
    {
      name: "totalHours",
      label: "Total Paid Hours (Decimal)",
      format: "number",
      highlight: true,
    },
    {
      name: "formattedDuration",
      label: "Duration (Hours and Minutes)",
      format: "text",
    },
  ],
  calculate: calculateHoursCalculator,
};

export default hours_calculatorConfig;
