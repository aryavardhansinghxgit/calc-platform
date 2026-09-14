import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateArmyBodyFatCalculator } from "./calculator";
import { army_body_fat_calculatorFaqs } from "./faq";

export const army_body_fat_calculatorConfig: CalculatorModuleDefinition = {
  id: "army-body-fat-calculator",
  title: "Army Waist-to-Height Ratio Calculator",
  slug: "army-body-fat-calculator",
  category: "Health",
  subcategory: "Fitness",
  description:
    "Use the 2026 Army Body Composition Calculator to calculate waist-to-height ratio (WHtR), check the 0.55 Army standard, and understand compliant and non-compliant results.",
  iconName: "ShieldCheck",
  featured: true,
  keywords: [
    "army waist to height ratio",
    "army body composition 2026",
    "whtr calculator army",
    "ar 600-9",
    "army directive 2026-13",
    "army body fat calculator",
  ],
  priority: 1,
  relatedCalculators: ["bmi-calculator", "body-fat-calculator", "lean-body-mass-calculator"],
  formulaDescription:
    "Army Directive 2026-13 Standard: Waist-to-Height Ratio (WHtR) = Waist Circumference / Standing Height. Compliant if strictly < 0.55.",
  faqs: army_body_fat_calculatorFaqs,
  inputs: [
    {
      name: "heightInches",
      label: "Standing Height (inches)",
      type: "number",
      defaultValue: 70,
      min: 48,
      max: 96,
      step: 0.25,
    },
    {
      name: "waistInches",
      label: "Abdominal Waist Circumference (inches)",
      type: "number",
      defaultValue: 34,
      min: 18,
      max: 80,
      step: 0.25,
    },
  ],
  outputs: [
    {
      name: "whtr",
      label: "Waist-to-Height Ratio",
      format: "number",
      highlight: true,
    },
    {
      name: "maxAllowedWhtr",
      label: "Army Threshold (< 0.55)",
      format: "number",
    },
    {
      name: "status",
      label: "Compliance Status",
      format: "text",
    },
  ],
  calculate: calculateArmyBodyFatCalculator,
};

export default army_body_fat_calculatorConfig;
