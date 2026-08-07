import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateProbabilityCalculator } from "./calculator";
import { probability_calculatorFaqs } from "./faq";

export const probability_calculatorConfig: CalculatorModuleDefinition = {
  id: "probability-calculator",
  title: "Probability Calculator",
  slug: "probability-calculator",
  category: "Math",
  subcategory: "Statistics",
  description: "Calculate probabilities of single, multiple, independent, and mutually exclusive events.",
  iconName: "PieChart",
  featured: true,
  keywords: ["probability calculator","odds","independent events","bayes theorem"],
  priority: 1,
  relatedCalculators: ["permutation-combination-calculator","random-number-generator"],
  formulaDescription: "P(A ∩ B) = P(A) × P(B); P(A ∪ B) = P(A) + P(B) - P(A ∩ B)",
  faqs: probability_calculatorFaqs,
  inputs: [
  {
    "name": "probA",
    "label": "Probability of Event A P(A)",
    "type": "number",
    "defaultValue": 0.5,
    "min": 0,
    "max": 1,
    "step": 0.05
  },
  {
    "name": "probB",
    "label": "Probability of Event B P(B)",
    "type": "number",
    "defaultValue": 0.4,
    "min": 0,
    "max": 1,
    "step": 0.05
  }
],
  outputs: [
  {
    "name": "probAandB",
    "label": "P(A and B) - Both Occur",
    "format": "number",
    "highlight": true
  },
  {
    "name": "probAorB",
    "label": "P(A or B) - Either Occurs",
    "format": "number"
  },
  {
    "name": "probNotA",
    "label": "P(Not A)",
    "format": "number"
  }
],
  calculate: calculateProbabilityCalculator,
};

export default probability_calculatorConfig;
