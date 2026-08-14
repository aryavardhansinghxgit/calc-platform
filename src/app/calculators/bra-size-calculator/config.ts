import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateBraSizeFromInputs } from "./calculator";
import { bra_size_calculatorFaqs } from "./faq";
import { BraSizeCalculator } from "@/components/calculator/bra/BraSizeCalculator";
import { BraSizeContent } from "@/components/calculator/bra/BraSizeContent";

export const bra_size_calculatorConfig: CalculatorModuleDefinition = {
  id: "bra-size-calculator",
  title: "Bra Size Calculator",
  slug: "bra-size-calculator",
  category: "other",
  subcategory: "Everyday Utility",
  description: "Calculate bra size across US/CAN, UK, EU, FR, and AU standards. Features sister size finder, breast shape adjustor, style engine, and visual measurement guide.",
  iconName: "Heart",
  featured: true,
  keywords: [
    "bra size calculator",
    "cup size calculator",
    "sister sizes",
    "bra size converter",
    "us to uk bra size",
    "eu bra size"
  ],
  priority: 1,
  relatedCalculators: ["shoe-size-calculator"],
  formulaDescription: "Band Size = Underbust Rounded to Nearest Even Integer; Cup Size = Bust - Underbust",
  faqs: bra_size_calculatorFaqs,
  CustomComponent: BraSizeCalculator,
  ContentComponent: BraSizeContent,
  inputs: [
    {
      name: "underbust",
      label: "Underbust Measurement (inches)",
      type: "number",
      defaultValue: 30,
      min: 20,
      max: 60,
      step: 0.5
    },
    {
      name: "bust",
      label: "Bust Measurement (inches)",
      type: "number",
      defaultValue: 34,
      min: 20,
      max: 70,
      step: 0.5
    }
  ],
  outputs: [
    {
      name: "primarySize",
      label: "Calculated Bra Size",
      format: "text",
      highlight: true
    }
  ],
  calculate: calculateBraSizeFromInputs,
} as any;

export default bra_size_calculatorConfig;
