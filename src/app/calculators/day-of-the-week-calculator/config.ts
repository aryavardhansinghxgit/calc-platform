import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateDayoftheWeekCalculator } from "./calculator";
import { DayOfWeekCalculator } from "@/components/calculator/day-of-week/DayOfWeekCalculator";
import { DayOfWeekContent } from "@/components/calculator/day-of-week/DayOfWeekContent";

export const day_of_the_week_calculatorConfig: CalculatorModuleDefinition = {
  id: "day-of-the-week-calculator",
  title: "Day of the Week Calculator",
  slug: "day-of-the-week-calculator",
  category: "date",
  subcategory: "Date & Time",
  description: "Determine the exact day of the week for any past, present, or future date with Zeller's congruence and planetary etymology.",
  iconName: "Calendar",
  featured: true,
  keywords: [
    "day of the week calculator",
    "what day of the week was I born",
    "find day for date",
    "day of week finder",
    "born on a monday calculator",
    "zeller congruence calculator",
  ],
  priority: 1,
  relatedCalculators: ["date-calculator", "day-counter-calculator", "age-calculator", "time-calculator", "hours-calculator"],
  formulaDescription: "Zeller's Congruence & ISO 8601 Calendar Algorithm",
  CustomComponent: DayOfWeekCalculator,
  ContentComponent: DayOfWeekContent,
  inputs: [
    {
      name: "targetDate",
      label: "Target Date",
      type: "date",
      defaultValue: "1969-07-20",
    },
  ],
  outputs: [
    {
      name: "dayOfWeek",
      label: "Day of the Week",
      format: "text",
      highlight: true,
    },
    {
      name: "isLeapYear",
      label: "Is Leap Year?",
      format: "text",
    },
  ],
  calculate: calculateDayoftheWeekCalculator,
};

export default day_of_the_week_calculatorConfig;
