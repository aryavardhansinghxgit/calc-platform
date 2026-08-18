import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateHoursCalculator } from "./calculator";
import { HoursCalculator } from "@/components/calculator/hours/HoursCalculator";
import { HoursContent } from "@/components/calculator/hours/HoursContent";

export const hours_calculatorConfig: CalculatorModuleDefinition = {
  id: "hours-calculator",
  title: "Hours Calculator",
  slug: "hours-calculator",
  category: "date",
  subcategory: "Date & Time",
  description: "Calculate total hours and minutes between two times, track multi-day durations, and compute timecard hours with break deductions and overtime.",
  iconName: "Timer",
  featured: true,
  keywords: [
    "hours calculator",
    "calculate hours between two times",
    "work hours calculator",
    "hours and minutes finder",
    "timecard calculator",
    "overtime calculator",
  ],
  priority: 1,
  relatedCalculators: ["time-card-calculator", "time-calculator", "time-duration-calculator", "date-calculator", "day-counter-calculator"],
  formulaDescription: "Total Hours = (End Time - Start Time - Unpaid Breaks) / 60",
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
