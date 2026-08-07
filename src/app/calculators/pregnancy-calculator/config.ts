import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculatePregnancyCalculator } from "./calculator";
import { pregnancy_calculatorFaqs } from "./faq";

export const pregnancy_calculatorConfig: CalculatorModuleDefinition = {
  id: "pregnancy-calculator",
  title: "Pregnancy Calculator",
  slug: "pregnancy-calculator",
  category: "Health",
  subcategory: "Pregnancy",
  description: "Track pregnancy milestone dates, gestational age in weeks & days, trimester, and estimated due date.",
  iconName: "Baby",
  featured: true,
  keywords: ["pregnancy calculator","due date","gestational age","trimester","baby due"],
  priority: 1,
  relatedCalculators: ["due-date-calculator","ovulation-calculator","conception-calculator"],
  formulaDescription: "Due Date = LMP + 280 Days + (Cycle Length - 28 Days)",
  faqs: pregnancy_calculatorFaqs,
  inputs: [
  {
    "name": "lmpDate",
    "label": "First Day of Last Period",
    "type": "date",
    "defaultValue": "2026-01-01"
  },
  {
    "name": "cycleLength",
    "label": "Average Cycle Length (days)",
    "type": "number",
    "defaultValue": 28,
    "min": 20,
    "max": 45,
    "step": 1
  }
],
  outputs: [
  {
    "name": "dueDate",
    "label": "Estimated Due Date",
    "format": "text",
    "highlight": true
  },
  {
    "name": "gestationalAge",
    "label": "Current Gestational Age",
    "format": "text"
  },
  {
    "name": "trimester",
    "label": "Current Trimester",
    "format": "text"
  },
  {
    "name": "conceptionDate",
    "label": "Estimated Conception",
    "format": "text"
  }
],
  calculate: calculatePregnancyCalculator,
};

export default pregnancy_calculatorConfig;
