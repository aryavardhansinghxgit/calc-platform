import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateBMICalculator } from "./calculator";
import { bmi_calculatorFaqs } from "./faq";

export const bmi_calculatorConfig: CalculatorModuleDefinition = {
  id: "bmi-calculator",
  title: "BMI Calculator – Body Mass Index & Health Screening",
  slug: "bmi-calculator",
  category: "Health",
  subcategory: "Fitness",
  description: "Calculate Body Mass Index (BMI) and related body-composition estimates using standard anthropometric formulas and age-appropriate reference ranges.",
  iconName: "HeartPulse",
  featured: true,
  keywords: [
    "BMI Calculator",
    "Calculate BMI",
    "Body Mass Index Calculator",
    "Healthy BMI Range",
    "BMI Formula",
    "BMI Chart",
    "BMI Prime",
    "Ponderal Index",
    "BMI For Men",
    "BMI For Women"
  ],
  relatedCalculators: [
    "body-fat-calculator",
    "ideal-weight-calculator",
    "healthy-weight-calculator",
    "bmr-calculator",
    "tdee-calculator",
    "calorie-calculator",
    "army-body-fat-calculator",
    "pace-calculator"
  ],
  formulaDescription: "BMI = Weight (kg) / [Height (m)]² | Imperial: 703 × Weight (lbs) / [Height (in)]²",
  faqs: bmi_calculatorFaqs,
  inputs: [
    {
      name: "unitSystem",
      label: "Unit System",
      type: "select",
      defaultValue: "us",
      options: [
        { label: "US Units (ft/in, lbs)", value: "us" },
        { label: "Metric Units (cm, kg)", value: "metric" },
        { label: "Other Units (m, in, ft)", value: "other" }
      ]
    },
    {
      name: "age",
      label: "Age (years)",
      type: "number",
      defaultValue: 25,
      min: 2,
      max: 120,
      step: 1
    },
    {
      name: "gender",
      label: "Gender",
      type: "select",
      defaultValue: "male",
      options: [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" }
      ]
    },
    {
      name: "heightFeet",
      label: "Height (Feet)",
      type: "number",
      defaultValue: 5,
      min: 1,
      max: 8
    },
    {
      name: "heightInches",
      label: "Height (Inches)",
      type: "number",
      defaultValue: 10,
      min: 0,
      max: 11
    },
    {
      name: "weightLbs",
      label: "Weight (lbs)",
      type: "number",
      defaultValue: 160,
      min: 30,
      max: 800
    },
    {
      name: "heightCm",
      label: "Height (cm)",
      type: "number",
      defaultValue: 178,
      min: 50,
      max: 250
    },
    {
      name: "weightKg",
      label: "Weight (kg)",
      type: "number",
      defaultValue: 72.5,
      min: 15,
      max: 350
    }
  ],
  outputs: [
    {
      name: "bmi",
      label: "Body Mass Index (BMI)",
      format: "number",
      highlight: true
    },
    {
      name: "category",
      label: "WHO Classification",
      format: "text"
    },
    {
      name: "healthyWeightRange",
      label: "Healthy Weight Range",
      format: "text"
    },
    {
      name: "primeIndex",
      label: "BMI Prime Ratio",
      format: "number"
    },
    {
      name: "ponderalIndex",
      label: "Ponderal Index (kg/m³)",
      format: "number"
    },
    {
      name: "idealWeight",
      label: "Clinical Ideal Weight",
      format: "text"
    },
    {
      name: "bodyFat",
      label: "Estimated Body Fat %",
      format: "percentage"
    },
    {
      name: "bmr",
      label: "Basal Metabolic Rate (BMR)",
      format: "number",
      unit: "kcal"
    }
  ],
  calculate: calculateBMICalculator,
};

export default bmi_calculatorConfig;
