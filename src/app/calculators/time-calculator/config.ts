import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateTimeCalculator } from "./calculator";
import { TimeCalculator } from "@/components/calculator/time/TimeCalculator";
import { TimeContent } from "@/components/calculator/time/TimeContent";
import { time_calculatorFaqs } from "./faq";

export const time_calculatorConfig: CalculatorModuleDefinition = {
  id: "time-calculator",
  title: "Time Calculator",
  slug: "time-calculator",
  category: "date",
  subcategory: "Date & Time",
  description:
    "Add and subtract time, shift dates by hours or days, evaluate time expressions, calculate work duration and convert time between days, hours, minutes and seconds.",
  iconName: "Clock",
  featured: true,
  keywords: [
    "time calculator",
    "time duration calculator",
    "add time calculator",
    "subtract time calculator",
    "hours and minutes calculator",
    "time difference calculator",
    "calculate hours between times",
    "time card calculator",
    "work hours calculator",
    "add hours minutes seconds",
    "subtract hours minutes seconds",
    "date time calculator",
    "time expression calculator",
    "duration calculator",
    "decimal hours calculator",
    "time calculator with seconds",
  ],
  priority: 1,
  relatedCalculators: [
    "date-calculator",
    "age-calculator",
    "time-duration-calculator",
    "hours-calculator",
    "day-counter-calculator",
    "time-zone-calculator",
    "time-card-calculator",
  ],
  formulaDescription: "Total Time = Time 1 ± Time 2 (with sexagesimal base-60 rollover)",
  CustomComponent: TimeCalculator,
  ContentComponent: TimeContent,
  faqs: time_calculatorFaqs,
  inputs: [
    {
      name: "h1",
      label: "Time 1 Hours",
      type: "number",
      defaultValue: 4,
      min: 0,
      max: 1000,
      step: 1,
    },
    {
      name: "m1",
      label: "Time 1 Minutes",
      type: "number",
      defaultValue: 35,
      min: 0,
      max: 59,
      step: 1,
    },
    {
      name: "operation",
      label: "Operator",
      type: "select",
      defaultValue: "+",
      options: [
        { label: "Add (+)", value: "+" },
        { label: "Subtract (-)", value: "-" },
      ],
    },
    {
      name: "h2",
      label: "Time 2 Hours",
      type: "number",
      defaultValue: 2,
      min: 0,
      max: 1000,
      step: 1,
    },
    {
      name: "m2",
      label: "Time 2 Minutes",
      type: "number",
      defaultValue: 45,
      min: 0,
      max: 59,
      step: 1,
    },
  ],
  outputs: [
    {
      name: "resultTime",
      label: "Total Time",
      format: "text",
      highlight: true,
    },
    {
      name: "totalHours",
      label: "Total Hours (Decimal)",
      format: "number",
    },
  ],
  calculate: calculateTimeCalculator,
};

export default time_calculatorConfig;
