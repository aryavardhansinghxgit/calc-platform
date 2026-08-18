import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateTimeZoneCalculator } from "./calculator";
import { TimeZoneCalculator } from "@/components/calculator/time-zone/TimeZoneCalculator";
import { TimeZoneContent } from "@/components/calculator/time-zone/TimeZoneContent";

export const time_zone_calculatorConfig: CalculatorModuleDefinition = {
  id: "time-zone-calculator",
  title: "Time Zone Calculator",
  slug: "time-zone-calculator",
  category: "date",
  subcategory: "Date & Time",
  description: "Convert time across global time zones (UTC-12 to UTC+14), plan multi-city meetings, and account for automated Daylight Saving Time (DST).",
  iconName: "Globe",
  featured: true,
  keywords: [
    "time zone calculator",
    "timezone converter",
    "utc converter",
    "gmt time converter",
    "world clock meeting planner",
    "est to gmt converter",
    "daylight saving time converter",
  ],
  priority: 1,
  relatedCalculators: ["time-calculator", "hours-calculator", "time-card-calculator", "time-duration-calculator", "date-calculator"],
  formulaDescription: "Target Time = Origin Time - Origin Offset + Destination Offset",
  CustomComponent: TimeZoneCalculator,
  ContentComponent: TimeZoneContent,
  inputs: [
    {
      name: "timeStr",
      label: "Local Time (HH:MM)",
      type: "text",
      defaultValue: "14:30",
    },
    {
      name: "fromOffset",
      label: "From UTC Offset",
      type: "number",
      defaultValue: -5,
      min: -12,
      max: 14,
      step: 0.5,
    },
    {
      name: "toOffset",
      label: "To UTC Offset",
      type: "number",
      defaultValue: 0,
      min: -12,
      max: 14,
      step: 0.5,
    },
  ],
  outputs: [
    {
      name: "convertedTime",
      label: "Converted Local Time",
      format: "text",
      highlight: true,
    },
    {
      name: "timeDiffHours",
      label: "Time Difference (Hours)",
      format: "number",
    },
  ],
  calculate: calculateTimeZoneCalculator,
};

export default time_zone_calculatorConfig;
