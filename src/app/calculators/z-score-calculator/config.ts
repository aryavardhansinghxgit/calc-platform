import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateZScoreCalculator } from "./calculator";
import { ZScoreCalculator } from "@/components/calculator/z-score/ZScoreCalculator";
import { ZScoreContent } from "@/components/calculator/z-score/ZScoreContent";

export const z_score_calculatorConfig: CalculatorModuleDefinition = {
  id: "z-score-calculator",
  title: "Z-Score Calculator & Normal Distribution Suite",
  slug: "z-score-calculator",
  category: "Math",
  subcategory: "Statistics",
  description: "Calculate Z-scores, normal probabilities, percentile ranks, inverse critical values, and batch CSV dataset Z-scores with interactive SVG bell curve charts.",
  iconName: "TrendingUp",
  featured: true,
  keywords: ["z score", "standard score", "percentile", "normal distribution", "inverse z score", "critical value z", "z table"],
  priority: 1,
  relatedCalculators: ["standard-deviation-calculator", "confidence-interval-calculator", "statistics-calculator"],
  formulaDescription: "Z = (X - μ) / σ",
  faqs: [],
  CustomComponent: ZScoreCalculator,
  ContentComponent: ZScoreContent,
  inputs: [
    {
      "name": "rawScore",
      "label": "Raw Score (X)",
      "type": "number",
      "defaultValue": 85,
      "min": -1000000,
      "max": 1000000,
      "step": 1
    },
    {
      "name": "mean",
      "label": "Population Mean (μ)",
      "type": "number",
      "defaultValue": 70,
      "min": -1000000,
      "max": 1000000,
      "step": 1
    },
    {
      "name": "sd",
      "label": "Standard Deviation (σ)",
      "type": "number",
      "defaultValue": 10,
      "min": 0.001,
      "max": 1000000,
      "step": 0.1
    }
  ],
  outputs: [
    {
      "name": "zScore",
      "label": "Z-Score",
      "format": "number",
      "highlight": true
    },
    {
      "name": "percentile",
      "label": "Percentile Rank",
      "format": "percentage"
    }
  ],
  calculate: calculateZScoreCalculator
};

export default z_score_calculatorConfig;
