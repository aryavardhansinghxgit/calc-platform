import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateTimeDurationCalculator } from "./calculator";
import { TimeDurationCalculator } from "@/components/calculator/time-duration/TimeDurationCalculator";
import { TimeDurationContent } from "@/components/calculator/time-duration/TimeDurationContent";

export const time_duration_calculatorConfig: CalculatorModuleDefinition = {
  id: "time-duration-calculator",
  title: "Time Duration Calculator",
  slug: "time-duration-calculator",
  category: "date",
  subcategory: "Date & Time",
  description: "Calculate exact elapsed time between two times, dates, or multiple intervals with step-by-step sexagesimal borrowing.",
  iconName: "Clock",
  featured: true,
  keywords: [
    "time duration calculator",
    "calculate hours between two times",
    "elapsed time calculator",
    "how to calculate time difference",
    "time interval calculator",
    "hours minutes seconds duration",
  ],
  priority: 1,
  relatedCalculators: ["hours-calculator", "time-calculator", "time-card-calculator", "date-calculator", "day-counter-calculator"],
  formulaDescription: "Duration = End Time - Start Time (using sexagesimal base-60 subtraction)",
  CustomComponent: TimeDurationCalculator,
  ContentComponent: TimeDurationContent,
  inputs: [
    {
      name: "startDate",
      label: "Start Date",
      type: "date",
      defaultValue: "2026-08-18",
    },
    {
      name: "startTime",
      label: "Start Time",
      type: "text",
      defaultValue: "08:30",
    },
    {
      name: "endDate",
      label: "End Date",
      type: "date",
      defaultValue: "2026-08-18",
    },
    {
      name: "endTime",
      label: "End Time",
      type: "text",
      defaultValue: "17:30",
    },
  ],
  outputs: [
    {
      name: "formattedDuration",
      label: "Elapsed Duration",
      format: "text",
      highlight: true,
    },
    {
      name: "totalHours",
      label: "Total Decimal Hours",
      format: "number",
    },
  ],
  calculate: calculateTimeDurationCalculator,
};

export default time_duration_calculatorConfig;
