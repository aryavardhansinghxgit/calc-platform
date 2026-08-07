import { CalculatorModuleDefinition } from "../../types";
import { calculateBmi } from "@/lib/formulas/bmi";

export const BMI_CALCULATOR: CalculatorModuleDefinition = {
  id: "bmi",
  title: "BMI Calculator",
  slug: "bmi-calculator",
  category: "Health",
  description: "Check Body Mass Index classification, ideal weight range, and body metrics.",
  iconName: "HeartPulse",
  featured: true,
  tags: ["bmi", "health", "weight", "fitness", "body mass index"],
  formulaDescription: "BMI = Weight (kg) / [Height (m)]²",
  faqs: [
    {
      question: "What is a healthy BMI range?",
      answer: "A BMI between 18.5 and 24.9 is generally considered normal/healthy weight for adults according to WHO guidelines.",
    },
    {
      question: "Is BMI accurate for athletes?",
      answer: "BMI does not distinguish between muscle mass and fat mass, so athletic individuals with high muscle volume may have a higher BMI despite low body fat.",
    },
  ],
  inputs: [
    {
      name: "weightKg",
      label: "Weight (kg)",
      type: "number",
      defaultValue: 70,
      min: 20,
      max: 300,
      step: 1,
    },
    {
      name: "heightCm",
      label: "Height (cm)",
      type: "number",
      defaultValue: 175,
      min: 50,
      max: 250,
      step: 1,
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
      label: "Ideal Weight Range",
      format: "text",
    },
  ],
  calculate: (inputs) => {
    const res = calculateBmi({
      weightKg: Number(inputs.weightKg || 70),
      heightCm: Number(inputs.heightCm || 175),
    });
    return {
      bmi: res.bmi,
      category: res.category,
      healthyWeightRange: `${res.healthyWeightRange[0]} kg – ${res.healthyWeightRange[1]} kg`,
    };
  },
};

export default BMI_CALCULATOR;
