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
  description:
    "Calculate your exact age in years, months and days, total days lived, next birthday, date-to-date age, business days, milestones and more.",
  iconName: "Calendar",
  featured: true,
  keywords: [
    "age calculator",
    "age calculator by date of birth",
    "exact age calculator",
    "how old am I calculator",
    "age in years months days",
    "age calculator as of date",
    "age difference calculator",
    "date of birth calculator",
    "calculate age between two dates",
    "age on a specific date",
    "total days lived calculator",
    "birthday countdown calculator",
    "age calculator with leap year",
    "date-to-date age calculator",
    "age in days calculator",
    "chronological age calculator",
  ],
  priority: 1,
  relatedCalculators: [
    "date-calculator",
    "time-calculator",
    "time-duration-calculator",
    "hours-calculator",
    "day-counter-calculator",
    "time-zone-calculator",
    "time-card-calculator",
  ],
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
