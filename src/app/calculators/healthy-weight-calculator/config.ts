import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateHealthyWeightCalculator } from "./calculator";
import { healthy_weight_calculatorFaqs } from "./faq";

export const healthy_weight_calculatorConfig: CalculatorModuleDefinition = {
  id: "healthy-weight-calculator",
  title: "Healthy Weight Calculator",
  slug: "healthy-weight-calculator",
  category: "Health",
  subcategory: "Fitness",
  description: "Estimate a healthy weight range from adult BMI and compare several established ideal body weight (IBW) equations. This calculator shows your BMI-based weight range, a reference target, Devine, Hamwi, Robinson, Miller and Peterson estimates, optional body-frame adjustment, and the difference between your current weight and the calculated reference values.",
  iconName: "Heart",
  featured: true,
  keywords: ["healthy weight", "ideal weight", "bmi range", "target weight", "ibw formulas", "devine formula", "peterson formula"],
  priority: 1,
  relatedCalculators: [
    "bmi-calculator",
    "ideal-weight-calculator",
    "body-fat-calculator",
    "bmr-calculator",
    "tdee-calculator",
    "calorie-calculator",
    "protein-calculator",
  ],
  formulaDescription: "Healthy Weight Range = 18.5 × [Height(m)]² to 24.9 × [Height(m)]²",
  faqs: healthy_weight_calculatorFaqs,
  inputs: [
    {
      name: "heightCm",
      label: "Height (cm)",
      type: "number",
      defaultValue: 175,
      min: 100,
      max: 230,
      step: 1,
    },
  ],
  outputs: [
    {
      name: "minWeight",
      label: "Minimum Healthy Weight (BMI 18.5)",
      format: "number",
      unit: "kg",
    },
    {
      name: "targetWeight",
      label: "Optimal Healthy Weight (BMI 22.0)",
      format: "number",
      highlight: true,
      unit: "kg",
    },
    {
      name: "maxWeight",
      label: "Maximum Healthy Weight (BMI 24.9)",
      format: "number",
      unit: "kg",
    },
  ],
  calculate: calculateHealthyWeightCalculator,
};

export default healthy_weight_calculatorConfig;
