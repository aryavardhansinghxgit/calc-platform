import { Metadata } from "next";

export const tdee_calculatorMetadata: Metadata = {
  title: "TDEE Calculator | Total Daily Energy Expenditure & Maintenance Calories",
  description:
    "Calculate your exact Total Daily Energy Expenditure (TDEE), BMR, maintenance calories, and deficit/surplus targets across 10 modes and 7 clinical BMR formulas. Features step count analyzer and 12-week weight projections.",
  keywords: [
    "TDEE Calculator",
    "Total Daily Energy Expenditure Calculator",
    "Maintenance Calorie Calculator",
    "Calorie Needs Calculator",
    "BMR Calculator",
    "Weight Loss Calorie Calculator",
    "Lean Bulk Calculator",
    "Metabolism Calculator",
  ],
  authors: [{ name: "Calculator Platform Clinical Nutrition Team" }],
  openGraph: {
    title: "Advanced TDEE Calculator & Metabolism Suite",
    description:
      "Calculate your daily calorie expenditure, BMR, NEAT, TEF, and 12-week weight projections tailored to your activity level and fitness goals.",
    type: "website",
    url: "https://calculator-platform.com/calculators/tdee-calculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "TDEE Calculator | Maintenance Calories & Weight Loss",
    description:
      "Calculate your daily energy expenditure, BMR, and deficit targets across 10 modes and 7 clinical formulas.",
  },
};
