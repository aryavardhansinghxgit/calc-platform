import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculatePregnancyConceptionCalculator } from "./calculator";
import { pregnancy_conception_calculatorFaqs } from "./faq";

export const pregnancy_conception_calculatorConfig: CalculatorModuleDefinition = {
  id: "pregnancy-conception-calculator",
  title: "Pregnancy Conception Calculator",
  slug: "pregnancy-conception-calculator",
  category: "Health",
  subcategory: "Pregnancy",
  description: "Estimate the probable conception date and fertile window based on due date or last period.",
  iconName: "Calendar",
  featured: true,
  keywords: ["conception date","when did i conceive","conception calculator"],
  priority: 1,
  relatedCalculators: ["pregnancy-calculator","due-date-calculator","ovulation-calculator"],
  formulaDescription: "Conception Date = Due Date - 266 Days",
  faqs: pregnancy_conception_calculatorFaqs,
  inputs: [
  {
    "name": "dueDate",
    "label": "Estimated Due Date",
    "type": "date",
    "defaultValue": "2026-10-08"
  }
],
  outputs: [
  {
    "name": "conceptionDate",
    "label": "Estimated Conception Date",
    "format": "text",
    "highlight": true
  },
  {
    "name": "fertileWindow",
    "label": "Probable Conception Window",
    "format": "text"
  }
],
  calculate: calculatePregnancyConceptionCalculator,
};

export default pregnancy_conception_calculatorConfig;
