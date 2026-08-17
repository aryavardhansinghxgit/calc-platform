import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateProbabilityCalculator } from "./calculator";
import { ProbabilityCalculator } from "@/components/calculator/probability/ProbabilityCalculator";
import { ProbabilityContent } from "@/components/calculator/probability/ProbabilityContent";

export const probability_calculatorConfig: CalculatorModuleDefinition = {
  id: "probability-calculator",
  title: "Probability Calculator — Single & Multiple Events, Bayes' Theorem & Odds",
  slug: "probability-calculator",
  category: "Math",
  subcategory: "Statistics",
  description: "Calculate probabilities of single, multiple, independent, mutually exclusive, and dependent events, Bayes' theorem diagnostic tests, Binomial distributions, and odds ratios with interactive SVG Venn diagrams.",
  iconName: "PieChart",
  featured: true,
  keywords: [
    "Probability Calculator",
    "Probability of A and B",
    "Odds Calculator",
    "Binomial Probability Calculator",
    "Bayes Theorem Calculator",
    "Dice Probability Calculator",
    "Conditional Probability Calculator"
  ],
  priority: 1,
  relatedCalculators: ["permutation-combination-calculator", "random-number-generator", "sample-size-calculator"],
  formulaDescription: "P(A ∩ B) = P(A) × P(B); P(A ∪ B) = P(A) + P(B) - P(A ∩ B)",
  faqs: [],
  CustomComponent: ProbabilityCalculator,
  ContentComponent: ProbabilityContent,
  inputs: [
    {
      name: "probA",
      label: "Probability of Event A P(A)",
      type: "number",
      defaultValue: 0.5,
      min: 0,
      max: 1,
      step: 0.05
    },
    {
      name: "probB",
      label: "Probability of Event B P(B)",
      type: "number",
      defaultValue: 0.4,
      min: 0,
      max: 1,
      step: 0.05
    }
  ],
  outputs: [
    {
      name: "probAandB",
      label: "P(A and B) - Both Occur",
      format: "number",
      highlight: true
    },
    {
      name: "probAorB",
      label: "P(A or B) - Either Occurs",
      format: "number"
    },
    {
      name: "probNotA",
      label: "P(Not A)",
      format: "number"
    }
  ],
  calculate: calculateProbabilityCalculator
} as any;

export default probability_calculatorConfig;
