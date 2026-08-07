import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateConceptionCalculator } from "./calculator";
import { conception_calculatorFaqs } from "./faq";

export const conception_calculatorConfig: CalculatorModuleDefinition = {
  id: "conception-calculator",
  title: "Conception Calculator",
  slug: "conception-calculator",
  category: "Health",
  subcategory: "Pregnancy",
  description: "Calculate estimated date of conception and last menstrual period from your estimated due date.",
  iconName: "Heart",
  featured: true,
  keywords: ["conception","conception date","pregnancy conception"],
  priority: 1,
  relatedCalculators: ["pregnancy-conception-calculator","due-date-calculator"],
  formulaDescription: "Conception = Due Date - 266 Days",
  faqs: conception_calculatorFaqs,
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
    "name": "lmpDate",
    "label": "Estimated Last Period",
    "format": "text"
  }
],
  calculate: calculateConceptionCalculator,
};

export default conception_calculatorConfig;
