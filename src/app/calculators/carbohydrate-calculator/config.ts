import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateCarbohydrateOutputs } from "./calculator";
import { carbohydrate_calculatorFaqs } from "./faq";

export const carbohydrate_calculatorConfig: CalculatorModuleDefinition = {
  id: "carbohydrate-calculator",
  title: "Carbohydrate Calculator",
  slug: "carbohydrate-calculator",
  category: "Health",
  subcategory: "Fitness",
  description:
    "Calculate your exact daily carbohydrate requirements, net carbs, glycemic load, and 7-day carb cycling schedule across 10 modes and 5 BMR formulas. Includes searchable food GI database.",
  iconName: "Apple",
  featured: true,
  keywords: [
    "carb calculator",
    "carbohydrate calculator",
    "net carb calculator",
    "glycemic load calculator",
    "carb cycling calculator",
    "low carb calculator",
  ],
  priority: 2,
  relatedCalculators: [
    "calorie-calculator",
    "macro-calculator",
    "protein-calculator",
    "fat-intake-calculator",
    "tdee-calculator",
    "bmr-calculator",
    "bmi-calculator",
    "body-fat-calculator",
  ],
  formulaDescription:
    "Target Carbs = (Target Calories × Carb %) / 4. Net Carbs = Total Carbs - Fiber - Sugar Alcohols.",
  faqs: carbohydrate_calculatorFaqs,
  inputs: [
    {
      name: "unitSystem",
      label: "Unit System",
      type: "select",
      defaultValue: "us",
      options: [
        { label: "US Units (feet, inches, lbs)", value: "us" },
        { label: "Metric Units (cm, kg)", value: "metric" },
      ],
    },
    {
      name: "calculationMode",
      label: "Calculation Mode",
      type: "select",
      defaultValue: "daily",
      options: [
        { label: "Daily Carbohydrate Calculator (AMDR 45-65%)", value: "daily" },
        { label: "Weight Loss Carb Calculator (35%)", value: "weight-loss" },
        { label: "Weight Gain Carb Calculator (55%)", value: "weight-gain" },
        { label: "Maintenance Carb Calculator (45%)", value: "maintenance" },
        { label: "Athlete Carb Calculator (6g/kg)", value: "athlete" },
        { label: "Endurance Sports Carb Calculator (8.5g/kg)", value: "endurance" },
        { label: "Low-Carb Calculator (20% / 50-100g)", value: "low-carb" },
        { label: "Moderate-Carb Calculator (45%)", value: "moderate-carb" },
        { label: "High-Carb Calculator (65%)", value: "high-carb" },
        { label: "Custom Carb Target Calculator", value: "custom" },
      ],
    },
    {
      name: "age",
      label: "Age (Years)",
      type: "number",
      defaultValue: 25,
      min: 15,
      max: 80,
    },
    {
      name: "gender",
      label: "Gender",
      type: "select",
      defaultValue: "male",
      options: [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
      ],
    },
    {
      name: "activityLevel",
      label: "Activity Level",
      type: "select",
      defaultValue: "light",
      options: [
        { label: "Sedentary: desk job, little exercise", value: "sedentary" },
        { label: "Light: exercise 1-3 times/week", value: "light" },
        { label: "Moderate: exercise 4-5 times/week", value: "moderate" },
        { label: "Active: intense exercise 6-7 times/week", value: "active" },
        { label: "Very Active: 2+ hrs intense exercise daily", value: "very-active" },
      ],
    },
    {
      name: "goal",
      label: "Fitness Goal",
      type: "select",
      defaultValue: "maintain",
      options: [
        { label: "Maintain Weight", value: "maintain" },
        { label: "Mild Weight Loss (-0.5 lb/week)", value: "mild-loss" },
        { label: "Weight Loss (-1.0 lb/week)", value: "loss" },
        { label: "Extreme Weight Loss (-2.0 lb/week)", value: "extreme-loss" },
        { label: "Mild Weight Gain (+0.5 lb/week)", value: "mild-gain" },
        { label: "Weight Gain (+1.0 lb/week)", value: "gain" },
        { label: "Fast Muscle Gain (+2.0 lb/week)", value: "extreme-gain" },
        { label: "Body Recomposition", value: "recomp" },
      ],
    },
    {
      name: "bmrFormula",
      label: "BMR Formula",
      type: "select",
      defaultValue: "mifflin",
      options: [
        { label: "Mifflin-St Jeor (Standard)", value: "mifflin" },
        { label: "Katch-McArdle (Requires Body Fat %)", value: "katch" },
        { label: "Original Harris-Benedict", value: "harris" },
        { label: "Revised Harris-Benedict", value: "revised-harris" },
        { label: "Cunningham (Athletic LBM)", value: "cunningham" },
      ],
    },
  ],
  outputs: [
    {
      name: "totalCarbGrams",
      label: "Daily Carbohydrate Target",
      format: "number",
      suffix: " g",
      highlight: true,
    },
    {
      name: "netCarbGrams",
      label: "Net Carbs Target",
      format: "number",
      suffix: " g",
      highlight: true,
    },
    {
      name: "glycemicLoad",
      label: "Estimated Glycemic Load (GL)",
      format: "number",
    },
    {
      name: "targetCalories",
      label: "Daily Calorie Target",
      format: "number",
      suffix: " kcal",
    },
    {
      name: "tdee",
      label: "Total Daily Energy Expenditure (TDEE)",
      format: "number",
      suffix: " kcal",
    },
  ],
  calculate: calculateCarbohydrateOutputs,
};

export default carbohydrate_calculatorConfig;
