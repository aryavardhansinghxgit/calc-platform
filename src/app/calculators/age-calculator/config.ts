import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateAgeCalculator } from "./calculator";
import { age_calculatorFaqs } from "./faq";

export const age_calculatorConfig: CalculatorModuleDefinition = {
  id: "age-calculator",
  title: "Age Calculator",
  slug: "age-calculator",
  category: "other",
  subcategory: "Date & Time",
  description: "Calculate exact age in years, months, days, hours, and minutes from birth date.",
  iconName: "Calendar",
  featured: true,
  keywords: ["age calculator","how old am i","date of birth","birthday calculator"],
  priority: 1,
  relatedCalculators: ["date-calculator","day-counter-calculator","day-of-the-week-calculator"],
  formulaDescription: "Age = Target Date - Birth Date",
  faqs: age_calculatorFaqs,
  inputs: [
  {
    "name": "birthDate",
    "label": "Date of Birth",
    "type": "date",
    "defaultValue": "2000-01-01"
  },
  {
    "name": "targetDate",
    "label": "Age at Date",
    "type": "date",
    "defaultValue": "2026-08-07"
  }
],
  outputs: [
  {
    "name": "ageYearsMonthsDays",
    "label": "Exact Age",
    "format": "text",
    "highlight": true
  },
  {
    "name": "totalDays",
    "label": "Total Days Lived",
    "format": "number"
  },
  {
    "name": "nextBirthday",
    "label": "Days Until Next Birthday",
    "format": "number"
  }
],
  calculate: calculateAgeCalculator,
};

export default age_calculatorConfig;
