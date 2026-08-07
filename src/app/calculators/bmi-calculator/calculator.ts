import { BMICalculatorOutputs } from "./types";

export function calculateBMICalculator(inputs: Record<string, any>): BMICalculatorOutputs {
  const weight = Math.max(0, Number(inputs.weightKg) || 0);
  const height = Math.max(0, Number(inputs.heightCm) || 0);
  if (weight <= 0 || height <= 0) {
    return { bmi: 0, category: "Invalid inputs", healthyWeightRange: "N/A", primeIndex: 0 };
  }
  const heightM = height / 100;
  const bmi = parseFloat((weight / (heightM * heightM)).toFixed(1));
  let category = "Normal weight";
  if (bmi < 18.5) category = "Underweight";
  else if (bmi < 25) category = "Normal weight";
  else if (bmi < 30) category = "Overweight";
  else category = "Obesity";
  const minW = (18.5 * heightM * heightM).toFixed(1);
  const maxW = (24.9 * heightM * heightM).toFixed(1);
  const primeIndex = parseFloat((bmi / 25).toFixed(2));
  return { bmi, category, healthyWeightRange: `${minW} kg – ${maxW} kg`, primeIndex };
}
