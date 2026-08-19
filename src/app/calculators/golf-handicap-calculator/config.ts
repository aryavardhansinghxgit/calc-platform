import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateGolfHandicapFromInputs } from "./calculator";
import { golf_handicap_calculatorFaqs } from "./faq";
import { GolfHandicapCalculator } from "@/components/calculator/golf/GolfHandicapCalculator";
import { GolfHandicapContent } from "@/components/calculator/golf/GolfHandicapContent";

export const golf_handicap_calculatorConfig: CalculatorModuleDefinition = {
  id: "golf-handicap-calculator",
  title: "Golf Handicap Calculator",
  slug: "golf-handicap-calculator",
  category: "other",
  subcategory: "Everyday & Lifestyle",
  description: "Calculate World Handicap System (WHS) Golf Handicap Index, 1–20 round differentials, and Course / Playing Handicaps.",
  iconName: "Trophy",
  featured: true,
  keywords: [
    "golf handicap calculator",
    "whs handicap calculator",
    "course handicap calculator",
    "playing handicap",
    "score differential calculator",
    "best 8 of 20 rounds"
  ],
  priority: 1,
  relatedCalculators: ["gpa-calculator"],
  formulaDescription: "Score Differential = (113 / Slope) × (Gross Score - Course Rating - PCC)",
  faqs: golf_handicap_calculatorFaqs,
  CustomComponent: GolfHandicapCalculator,
  ContentComponent: GolfHandicapContent,
  inputs: [
    {
      name: "score",
      label: "Adjusted Gross Score",
      type: "number",
      defaultValue: 85,
      min: 50,
      max: 150,
      step: 1
    },
    {
      name: "courseRating",
      label: "Course Rating",
      type: "number",
      defaultValue: 72.1,
      min: 50,
      max: 90,
      step: 0.1
    },
    {
      name: "slopeRating",
      label: "Slope Rating",
      type: "number",
      defaultValue: 125,
      min: 55,
      max: 155,
      step: 1
    }
  ],
  outputs: [
    {
      name: "finalHandicapIndex",
      label: "WHS Handicap Index",
      format: "number",
      highlight: true
    }
  ],
  calculate: calculateGolfHandicapFromInputs,
} as any;

export default golf_handicap_calculatorConfig;
