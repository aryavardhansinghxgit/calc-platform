import { CalculatorModuleDefinition } from "../../types";
import { calculateBmi } from "@/lib/formulas/bmi";
import { bmi_calculatorFaqs } from "@/app/calculators/bmi-calculator/faq";

export const BMI_CALCULATOR: CalculatorModuleDefinition = {
  id: "bmi",
  title: "BMI Calculator – Body Mass Index & Health Screening",
  slug: "bmi-calculator",
  category: "Health",
  subcategory: "Fitness",
  description: "Calculate Body Mass Index (BMI) and related body-composition estimates using standard anthropometric formulas and age-appropriate reference ranges.",
  iconName: "HeartPulse",
  featured: true,
  tags: ["bmi", "health", "weight", "fitness", "body mass index", "bmi prime", "ponderal index"],
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
      step: 1,
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
      name: "weightLbs",
      label: "Weight (lbs)",
      type: "number",
      defaultValue: 160,
      min: 30,
      max: 800,
    },
    {
      name: "heightFeet",
      label: "Height (Feet)",
      type: "number",
      defaultValue: 5,
      min: 1,
      max: 8,
    },
    {
      name: "heightInches",
      label: "Height (Inches)",
      type: "number",
      defaultValue: 10,
      min: 0,
      max: 11,
    },
  ],
  outputs: [
    {
      name: "bmi",
      label: "Body Mass Index (BMI)",
      format: "number",
      highlight: true,
    },
    {
      name: "category",
      label: "Classification",
      format: "text",
    },
    {
      name: "healthyWeightRange",
      label: "Healthy Weight Range",
      format: "text",
    },
    {
      name: "primeIndex",
      label: "BMI Prime",
      format: "number",
    },
  ],
  calculate: (inputs) => {
    const res = calculateBmi({
      unitSystem: inputs.unitSystem || "us",
      age: Number(inputs.age) || 25,
      gender: inputs.gender || "male",
      heightFeet: Number(inputs.heightFeet) || 5,
      heightInches: Number(inputs.heightInches) || 10,
      weightLbs: Number(inputs.weightLbs) || 160,
      heightCm: Number(inputs.heightCm) || 178,
      weightKg: Number(inputs.weightKg) || 72.5,
    });
    return {
      bmi: res.bmi,
      category: res.category,
      healthyWeightRange: `${res.healthyWeightRangeLbs[0]} - ${res.healthyWeightRangeLbs[1]} lbs (${res.healthyWeightRangeKg[0]} - ${res.healthyWeightRangeKg[1]} kg)`,
      primeIndex: res.bmiPrime,
    };
  },
};

export default BMI_CALCULATOR;
