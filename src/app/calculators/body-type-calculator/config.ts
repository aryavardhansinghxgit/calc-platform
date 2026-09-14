import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateBodyTypeCalculator } from "./calculator";
import { body_type_calculatorFaqs } from "./faq";

export const body_type_calculatorConfig: CalculatorModuleDefinition = {
  id: "body-type-calculator",
  title: "Body Type Calculator",
  slug: "body-type-calculator",
  category: "Health",
  subcategory: "Nutrition & Health",
  description:
    "Determine your body shape classification (Hourglass, Pear, Apple, Spoon, Rectangle, V-Shape), Waist-to-Hip Ratio (WHR), Waist-to-Height Ratio (WHtR), shape similarity score, and estimated somatotype proxy with practical wardrobe recommendations.",
  iconName: "User",
  featured: true,
  keywords: [
    "body type calculator",
    "body shape calculator",
    "hourglass calculator",
    "pear shape calculator",
    "waist to hip ratio calculator",
    "whr calculator",
    "somatotype proxy calculator",
  ],
  priority: 1,
  relatedCalculators: [
    "bmi-calculator",
    "ideal-weight-calculator",
    "body-fat-calculator",
    "lean-body-mass-calculator",
    "body-surface-area-calculator",
    "tdee-calculator",
    "calorie-calculator",
  ],
  formulaDescription:
    "Body shapes classified via 4-variable criteria adapted from apparel anthropometric research combined with WHO WHR and NICE WHtR health risk screening benchmarks.",
  faqs: body_type_calculatorFaqs,
  inputs: [
    {
      name: "mode",
      label: "Calculation Mode",
      type: "select",
      defaultValue: "female-fashion",
      options: [
        { label: "Female Frame Classification (7-Shape Reference)", value: "female-fashion" },
        { label: "Male Frame Classification (5-Shape Model)", value: "male-structure" },
        { label: "Estimated Somatotype Proxy (Endo / Meso / Ecto)", value: "somatotype" },
        { label: "Waist-to-Hip Ratio (WHO Cardiovascular Risk Indicator)", value: "whr-health" },
        { label: "Waist-to-Height Ratio (NICE Central Adiposity Standard)", value: "whtr-metabolic" },
        { label: "Body Circumference & Proportion Ratios", value: "body-volume" },
        { label: "Wardrobe & Clothing Styling Guide", value: "wardrobe-style" },
        { label: "Fitness & Conditioning Recommendations", value: "fitness-shaping" },
        { label: "Shape Similarity Score Matrix", value: "comparison" },
        { label: "Custom Morphological Evaluation", value: "custom" },
      ],
    },
    {
      name: "gender",
      label: "Gender",
      type: "select",
      defaultValue: "female",
      options: [
        { label: "Female", value: "female" },
        { label: "Male", value: "male" },
      ],
    },
    {
      name: "unitSystem",
      label: "Unit System",
      type: "select",
      defaultValue: "us",
      options: [
        { label: "US Imperial (Inches / lbs)", value: "us" },
        { label: "Metric (cm / kg)", value: "metric" },
      ],
    },
    {
      name: "bustChestInches",
      label: "Bust / Chest Circumference (Inches)",
      type: "number",
      defaultValue: 36,
      min: 20,
      max: 80,
    },
    {
      name: "waistInches",
      label: "Waist Circumference (Inches)",
      type: "number",
      defaultValue: 26,
      min: 15,
      max: 80,
    },
    {
      name: "highHipInches",
      label: "High Hip Circumference (Inches)",
      type: "number",
      defaultValue: 32,
      min: 20,
      max: 90,
    },
    {
      name: "hipInches",
      label: "Low Hip Circumference (Inches)",
      type: "number",
      defaultValue: 36,
      min: 20,
      max: 90,
    },
    {
      name: "heightInches",
      label: "Height (Inches)",
      type: "number",
      defaultValue: 66,
      min: 36,
      max: 96,
    },
    {
      name: "weightLbs",
      label: "Weight (lbs)",
      type: "number",
      defaultValue: 140,
      min: 50,
      max: 500,
    },
  ],
  outputs: [
    {
      name: "primaryShape",
      label: "Body Shape Category",
      format: "text",
      highlight: true,
    },
    {
      name: "whr",
      label: "Waist-to-Hip Ratio (WHR)",
      format: "number",
      highlight: true,
    },
    {
      name: "whrRisk",
      label: "WHO Cardiovascular Risk",
      format: "text",
    },
    {
      name: "whtr",
      label: "Waist-to-Height Ratio (WHtR)",
      format: "number",
    },
  ],
  calculate: calculateBodyTypeCalculator,
};

export default body_type_calculatorConfig;
