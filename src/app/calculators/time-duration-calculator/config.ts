import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateTimeDurationCalculator } from "./calculator";
import { TimeDurationCalculator } from "@/components/calculator/time-duration/TimeDurationCalculator";
import { TimeDurationContent } from "@/components/calculator/time-duration/TimeDurationContent";

import { time_duration_calculatorFaqs } from "./faq";

export const time_duration_calculatorConfig: CalculatorModuleDefinition = {
  id: "time-duration-calculator",
  title: "Time Duration Calculator",
  slug: "time-duration-calculator",
  category: "date",
  subcategory: "Date & Time",
  description: "Calculate elapsed time between two times or dates, add multiple time intervals, handle midnight and date changes, and convert durations into hours, minutes, and seconds.",
  iconName: "Clock",
  featured: true,
  keywords: [
    "time duration calculator",
    "calculate hours between two times",
    "calculate elapsed time between two times and dates",
    "elapsed time calculator",
    "how to calculate time difference",
    "time interval calculator",
    "hours minutes seconds duration",
  ],
  priority: 1,
  relatedCalculators: ["time-calculator", "hours-calculator", "date-calculator", "time-card-calculator", "day-counter-calculator", "day-of-the-week-calculator"],
  formulaDescription: "Duration = End Time - Start Time (using sexagesimal base-60 subtraction)",
  faqs: time_duration_calculatorFaqs,
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
