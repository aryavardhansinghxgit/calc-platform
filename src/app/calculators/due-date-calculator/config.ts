import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateDueDateCalculator } from "./calculator";
import { due_date_calculatorFaqs } from "./faq";

export const due_date_calculatorConfig: CalculatorModuleDefinition = {
  id: "due-date-calculator",
  title: "Due Date Calculator",
  slug: "due-date-calculator",
  category: "Health",
  subcategory: "Pregnancy",
  description: "Calculate estimated delivery due date using Naegele's rule based on last menstrual period.",
  iconName: "Clock",
  featured: true,
  keywords: ["due date","delivery date","naegele rule","baby date"],
  priority: 1,
  relatedCalculators: ["pregnancy-calculator","ovulation-calculator"],
  formulaDescription: "Naegele's Rule: LMP + 1 year - 3 months + 7 days",
  faqs: due_date_calculatorFaqs,
  inputs: [
  {
    "name": "lmpDate",
    "label": "First Day of Last Period",
    "type": "date",
    "defaultValue": "2026-01-01"
  },
  {
    "name": "cycleLength",
    "label": "Cycle Length (days)",
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
    "name": "daysRemaining",
    "label": "Days Remaining",
    "format": "number"
  }
],
  calculate: calculateDueDateCalculator,
};

export default due_date_calculatorConfig;
