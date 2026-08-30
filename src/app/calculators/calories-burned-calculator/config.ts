import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateCaloriesBurnedCalculator } from "./calculator";
import { calories_burned_calculatorFaqs } from "./faq";

export const calories_burned_calculatorConfig: CalculatorModuleDefinition = {
  id: "calories-burned-calculator",
  title: "Calories Burned Calculator",
  slug: "calories-burned-calculator",
  category: "Health",
  subcategory: "Fitness",
  description: "Estimate calories burned from physical activities using activity MET values, body weight, and duration or distance.",
  iconName: "TrendingUp",
  featured: true,
  keywords: ["calories burned", "exercise calories", "met", "workout calories", "calories burned walking", "calories burned running"],
  priority: 1,
  relatedCalculators: [
    "calorie-calculator",
    "pace-calculator",
    "tdee-calculator",
    "bmr-calculator",
    "target-heart-rate-calculator",
    "one-rep-max-calculator",
  ],
  formulaDescription: "kcal/min = (MET × 3.5 × Weight in kg) / 200; Total Calories = kcal/min × Duration (minutes)",
  faqs: calories_burned_calculatorFaqs,
  inputs: [
    {
      name: "activity",
      label: "Activity Type",
      type: "select",
      defaultValue: "3.5",
      options: [
        { label: "Walking (3.0 mph / 4.8 km/h)", value: "3.5" },
        { label: "Running (6.0 mph / 9.6 km/h)", value: "9.8" },
        { label: "Cycling (moderate)", value: "8.0" },
        { label: "Swimming (freestyle)", value: "5.8" },
        { label: "Weightlifting (moderate)", value: "5.0" },
        { label: "HIIT / Circuit Training", value: "8.0" },
        { label: "Yoga (hatha)", value: "2.8" },
      ],
    },
    {
      name: "weightKg",
      label: "Your Weight (kg)",
      type: "number",
      defaultValue: 72.5,
      min: 20,
      max: 300,
      step: 0.5,
    },
    {
      name: "durationMins",
      label: "Duration (minutes)",
      type: "number",
      defaultValue: 45,
      min: 1,
      max: 600,
      step: 1,
    },
  ],
  outputs: [
    {
      name: "caloriesBurned",
      label: "Total Calories Burned",
      format: "number",
      highlight: true,
      unit: "kcal",
    },
    {
      name: "metValue",
      label: "MET Value",
      format: "number",
    },
    {
      name: "calPerMin",
      label: "Burn Rate",
      format: "number",
      unit: "kcal/min",
    },
  ],
  calculate: calculateCaloriesBurnedCalculator,
};

export default calories_burned_calculatorConfig;
