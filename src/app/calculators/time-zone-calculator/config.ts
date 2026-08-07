import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateTimeZoneCalculator } from "./calculator";
import { time_zone_calculatorFaqs } from "./faq";

export const time_zone_calculatorConfig: CalculatorModuleDefinition = {
  id: "time-zone-calculator",
  title: "Time Zone Calculator",
  slug: "time-zone-calculator",
  category: "other",
  subcategory: "Date & Time",
  description: "Convert time between UTC/GMT and major global time zones.",
  iconName: "Globe",
  featured: true,
  keywords: ["time zone calculator","utc converter","timezone converter","gmt time"],
  priority: 1,
  relatedCalculators: ["time-calculator","day-counter-calculator"],
  formulaDescription: "Target Time = Origin Time + (Target Offset - Origin Offset)",
  faqs: time_zone_calculatorFaqs,
  inputs: [
  {
    "name": "timeStr",
    "label": "Local Time (HH:MM)",
    "type": "text",
    "defaultValue": "12:00"
  },
  {
    "name": "fromOffset",
    "label": "From UTC Offset",
    "type": "number",
    "defaultValue": -5,
    "min": -12,
    "max": 14,
    "step": 0.5
  },
  {
    "name": "toOffset",
    "label": "To UTC Offset",
    "type": "number",
    "defaultValue": 1,
    "min": -12,
    "max": 14,
    "step": 0.5
  }
],
  outputs: [
  {
    "name": "convertedTime",
    "label": "Converted Local Time",
    "format": "text",
    "highlight": true
  },
  {
    "name": "timeDiffHours",
    "label": "Time Difference (Hours)",
    "format": "number"
  }
],
  calculate: calculateTimeZoneCalculator,
};

export default time_zone_calculatorConfig;
