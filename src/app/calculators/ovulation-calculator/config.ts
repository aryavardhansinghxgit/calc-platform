import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateOvulationCalculator } from "./calculator";
import { ovulation_calculatorFaqs } from "./faq";

export const ovulation_calculatorConfig: CalculatorModuleDefinition = {
  id: "ovulation-calculator",
  title: "Ovulation Calculator",
  slug: "ovulation-calculator",
  category: "Health",
  subcategory: "Pregnancy",
  description: "Predict fertile window, ovulation day, and next period dates to maximize chances of conception.",
  iconName: "Sparkles",
  featured: true,
  keywords: ["ovulation","fertile window","conception","fertility"],
  priority: 1,
  relatedCalculators: ["period-calculator","pregnancy-calculator"],
  formulaDescription: "Ovulation Date = Last Period + Cycle Length - 14 Days",
  faqs: ovulation_calculatorFaqs,
  inputs: [
  {
    "name": "lastPeriod",
    "label": "First Day of Last Period",
    "type": "date",
    "defaultValue": "2026-08-01"
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
    "name": "ovulationDate",
    "label": "Estimated Ovulation Date",
    "format": "text",
    "highlight": true
  },
  {
    "name": "fertileStart",
    "label": "Fertile Window Start",
    "format": "text"
  },
  {
    "name": "fertileEnd",
    "label": "Fertile Window End",
    "format": "text"
  }
],
  calculate: calculateOvulationCalculator,
};

export default ovulation_calculatorConfig;
