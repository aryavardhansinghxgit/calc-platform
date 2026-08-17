import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateHalfLifeCalculator } from "./calculator";
import { half_life_calculatorFaqs } from "./faq";
import { HalfLifeCalculator } from "@/components/calculator/half-life/HalfLifeCalculator";
import { HalfLifeContent } from "@/components/calculator/half-life/HalfLifeContent";

export const half_life_calculatorConfig: CalculatorModuleDefinition = {
  id: "half-life-calculator",
  title: "Half-Life Calculator: Step-by-Step Solver & Isotope Presets",
  slug: "half-life-calculator",
  category: "Math",
  subcategory: "General Math",
  description: "Free online Half-Life Calculator. Solve for remaining quantity N(t), initial quantity N₀, half-life t½, or elapsed time t with isotope presets and decay graphs.",
  iconName: "Clock",
  featured: true,
  keywords: [
    "half-life calculator",
    "radioactive decay calculator",
    "carbon-14 dating calculator",
    "half life formula",
    "decay constant calculator",
    "isotope half life"
  ],
  priority: 1,
  relatedCalculators: ["exponent-calculator", "log-calculator", "scientific-calculator"],
  formulaDescription: "Solves exponential decay N(t) = N₀ × (1/2)^(t / t½) or N(t) = N₀ × e^(-λt) with step-by-step proofs.",
  faqs: half_life_calculatorFaqs,
  inputs: [
    {
      name: "initialQty",
      label: "Initial Quantity (N₀)",
      type: "number",
      defaultValue: 100,
      min: 0
    },
    {
      name: "remainingQty",
      label: "Remaining Quantity (Nₜ)",
      type: "number",
      defaultValue: 25,
      min: 0
    },
    {
      name: "halfLife",
      label: "Half-Life (t½)",
      type: "number",
      defaultValue: 5730,
      min: 0
    },
    {
      name: "elapsedTime",
      label: "Elapsed Time (t)",
      type: "number",
      defaultValue: 11460,
      min: 0
    }
  ],
  outputs: [
    {
      name: "solvedResult",
      label: "Calculated Value",
      format: "number",
      highlight: true
    },
    {
      name: "decayConstant",
      label: "Decay Constant (λ)",
      format: "number"
    }
  ],
  calculate: calculateHalfLifeCalculator,
  CustomComponent: HalfLifeCalculator,
  ContentComponent: HalfLifeContent,
};

export default half_life_calculatorConfig;
