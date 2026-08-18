import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateAgeCalculator } from "./calculator";
import { age_calculatorFaqs } from "./faq";
import { AgeCalculator } from "@/components/calculator/age/AgeCalculator";
import { AgeContent } from "@/components/calculator/age/AgeContent";

export const age_calculatorConfig: CalculatorModuleDefinition = {
  id: "age-calculator",
  title: "Age Calculator",
  slug: "age-calculator",
  category: "date",
  subcategory: "Date & Time",
  description: "Calculate exact age in years, months, days, hours, minutes, and seconds. Discover your next birthday countdown, sub-unit duration matrix, zodiac profile, and planetary ages.",
  iconName: "Calendar",
  featured: true,
  keywords: [
    "age calculator",
    "calculate age online",
    "chronological age calculator",
    "days between two dates",
    "birthday calculator",
    "how old am i",
    "date interval solver",
  ],
  priority: 1,
  relatedCalculators: ["date-calculator", "day-counter-calculator", "time-duration-calculator"],
  formulaDescription: "Age = Target Date - Birth Date (with dynamic calendar borrow and leap year logic)",
  faqs: age_calculatorFaqs,
  CustomComponent: AgeCalculator,
  ContentComponent: AgeContent,
  inputs: [
    {
      name: "birthDate",
      label: "Date of Birth",
      type: "date",
      defaultValue: "2000-01-01",
    },
    {
      name: "targetDate",
      label: "Age at Date",
      type: "date",
      defaultValue: "2026-08-18",
    },
  ],
  outputs: [
    {
      name: "ageYearsMonthsDays",
      label: "Exact Age",
      format: "text",
      highlight: true,
    },
    {
      name: "totalDays",
      label: "Total Days Lived",
      format: "number",
    },
    {
      name: "nextBirthday",
      label: "Days Until Next Birthday",
      format: "number",
    },
  ],
  calculate: calculateAgeCalculator,
};

export default age_calculatorConfig;
