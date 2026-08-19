import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateFatOutputs } from "./calculator";
import { fat_intake_calculatorFaqs } from "./faq";

export const fat_intake_calculatorConfig: CalculatorModuleDefinition = {
  id: "fat-intake-calculator",
  title: "Fat Intake Calculator",
  slug: "fat-intake-calculator",
  category: "Health",
  subcategory: "Nutrition & Health",
  description:
    "Calculate your daily dietary fat requirements, saturated fat limits, monounsaturated/polyunsaturated targets, and Omega-3 ratios across 10 modes and 5 BMR formulas. Features searchable healthy fats food database.",
  iconName: "Flame",
  featured: true,
  keywords: [
    "fat intake calculator",
    "daily fat calculator",
    "keto fat calculator",
    "dietary fat calculator",
    "saturated fat limit calculator",
    "healthy fat calculator",
  ],
  priority: 2,
  relatedCalculators: [
    "calorie-calculator",
    "macro-calculator",
    "carbohydrate-calculator",
    "protein-calculator",
    "tdee-calculator",
    "bmr-calculator",
    "bmi-calculator",
    "body-fat-calculator",
  ],
  formulaDescription:
    "Fat Target (g) = (Daily Target Calories × Fat Percentage) / 9. Saturated Fat Limit < 10% (or < 7% for AHA Heart Health).",
  faqs: fat_intake_calculatorFaqs,
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
        { label: "Daily Fat Target (AMDR 20-35% Standard)", value: "daily" },
        { label: "Weight Loss Fat Calculator (22% Low Fat Deficit)", value: "loss" },
        { label: "Weight Gain Fat Calculator (32% Surplus Energy)", value: "gain" },
        { label: "Maintenance Fat Calculator (28% Balance)", value: "maintenance" },
        { label: "Athlete Fat Calculator (22% Carb Focus)", value: "athlete" },
        { label: "Heart Health Fat Calculator (Sat Fat <7% Target)", value: "heart-health" },
        { label: "Keto Fat Calculator (75% Fat for Ketosis)", value: "keto" },
        { label: "Low Fat Diet Calculator (18% Strict Low Fat)", value: "low-fat" },
        { label: "Bodybuilding Fat Calculator (Hormone Safety Min)", value: "bodybuilding" },
        { label: "Custom Fat Ratio Calculator", value: "custom" },
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
      name: "fatTargetGrams",
      label: "Daily Fat Target",
      format: "number",
      suffix: " g",
      highlight: true,
    },
    {
      name: "saturatedFatMaxGrams",
      label: "Saturated Fat Limit",
      format: "number",
      suffix: " g max",
      highlight: true,
    },
    {
      name: "fatPercentage",
      label: "Fat Energy Share",
      format: "number",
      suffix: " %",
    },
    {
      name: "targetCalories",
      label: "Daily Calorie Target",
      format: "number",
      suffix: " kcal",
    },
    {
      name: "tdee",
      label: "Total Energy Expenditure (TDEE)",
      format: "number",
      suffix: " kcal",
    },
  ],
  calculate: calculateFatOutputs,
};

export default fat_intake_calculatorConfig;
