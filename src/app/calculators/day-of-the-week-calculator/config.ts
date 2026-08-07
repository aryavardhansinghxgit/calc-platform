import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateDayoftheWeekCalculator } from "./calculator";
import { day_of_the_week_calculatorFaqs } from "./faq";

export const day_of_the_week_calculatorConfig: CalculatorModuleDefinition = {
  id: "day-of-the-week-calculator",
  title: "Day of the Week Calculator",
  slug: "day-of-the-week-calculator",
  category: "other",
  subcategory: "Date & Time",
  description: "Determine what day of the week any past or future historical date falls on.",
  iconName: "HelpCircle",
  featured: true,
  keywords: ["day of the week","what day was i born","day finder","calendar day"],
  priority: 1,
  relatedCalculators: ["age-calculator","day-counter-calculator"],
  formulaDescription: "Zeller's Congruence / Calendar Algorithm",
  faqs: day_of_the_week_calculatorFaqs,
  inputs: [
  {
    "name": "targetDate",
    "label": "Target Date",
    "type": "date",
    "defaultValue": "1969-07-20"
  }
],
  outputs: [
  {
    "name": "dayOfWeek",
    "label": "Day of the Week",
    "format": "text",
    "highlight": true
  },
  {
    "name": "isLeapYear",
    "label": "Is Leap Year?",
    "format": "text"
  }
],
  calculate: calculateDayoftheWeekCalculator,
};

export default day_of_the_week_calculatorConfig;
