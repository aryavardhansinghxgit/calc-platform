import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateLoveCalculator } from "./calculator";
import { love_calculatorFaqs } from "./faq";

export const love_calculatorConfig: CalculatorModuleDefinition = {
  id: "love-calculator",
  title: "Love Calculator",
  slug: "love-calculator",
  category: "other",
  subcategory: "Entertainment",
  description: "Calculate playful love compatibility percentage and match feedback between two names.",
  iconName: "Heart",
  featured: true,
  keywords: ["love calculator","love test","name compatibility","relationship test"],
  priority: 1,
  relatedCalculators: ["dice-roller"],
  formulaDescription: "Deterministic String Hashing Algorithm (For Entertainment)",
  faqs: love_calculatorFaqs,
  inputs: [
  {
    "name": "name1",
    "label": "Your Name",
    "type": "text",
    "defaultValue": "Romeo"
  },
  {
    "name": "name2",
    "label": "Partner Name",
    "type": "text",
    "defaultValue": "Juliet"
  }
],
  outputs: [
  {
    "name": "compatibilityScore",
    "label": "Love Match Score",
    "format": "percentage",
    "highlight": true
  },
  {
    "name": "verdict",
    "label": "Match Verdict",
    "format": "text"
  }
],
  calculate: calculateLoveCalculator,
};

export default love_calculatorConfig;
