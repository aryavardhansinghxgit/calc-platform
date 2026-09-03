import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateRatioCalculator } from "./calculator";
import { ratio_calculatorFaqs } from "./faq";
import { RatioCalculator } from "@/components/calculator/ratio/RatioCalculator";
import { RatioContent } from "@/components/calculator/ratio/RatioContent";

export const ratio_calculatorConfig: CalculatorModuleDefinition = {
  id: "ratio-calculator",
  title: "Ratio Calculator",
  slug: "ratio-calculator",
  category: "Math",
  subcategory: "General Math",
  description: "Solve proportions, simplify ratios, divide amounts by a ratio, calculate unit rates, resize images by aspect ratio, and find golden-ratio segments with step-by-step solutions.",
  iconName: "PieChart",
  featured: true,
  keywords: [
    "ratio calculator",
    "proportion calculator",
    "ratio simplifier",
    "solve for x in ratio",
    "aspect ratio calculator",
    "divide by ratio calculator",
    "golden ratio calculator"
  ],
  priority: 1,
  relatedCalculators: ["percentage-calculator", "fraction-calculator", "scientific-calculator"],
  formulaDescription: "Solves proportion A/B = C/D via cross-multiplication A×D = B×C, reduces multi-term ratios via GCD, and partitions total amounts.",
  faqs: ratio_calculatorFaqs,
  inputs: [
    {
      name: "propA",
      label: "Ratio Term A",
      type: "number",
      defaultValue: 3
    },
    {
      name: "propB",
      label: "Ratio Term B",
      type: "number",
      defaultValue: 4
    },
    {
      name: "propC",
      label: "Ratio Term C",
      type: "number",
      defaultValue: 6
    }
  ],
  outputs: [
    {
      name: "solvedVal",
      label: "Calculated Value",
      format: "number",
      highlight: true
    },
    {
      name: "simplifiedRatio",
      label: "Simplified Ratio",
      format: "text"
    }
  ],
  calculate: calculateRatioCalculator,
  CustomComponent: RatioCalculator,
  ContentComponent: RatioContent,
};

export default ratio_calculatorConfig;
