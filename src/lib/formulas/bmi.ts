export interface BmiInput {
  weightKg: number;
  heightCm: number;
}

export interface BmiResult {
  bmi: number;
  category: "Underweight" | "Normal weight" | "Overweight" | "Obesity";
  healthyWeightRange: [number, number];
}

export function calculateBmi(input: BmiInput): BmiResult {
  const heightM = input.heightCm / 100;
  if (heightM <= 0 || input.weightKg <= 0) {
    return {
      bmi: 0,
      category: "Normal weight",
      healthyWeightRange: [0, 0],
    };
  }

  const bmi = input.weightKg / (heightM * heightM);

  let category: "Underweight" | "Normal weight" | "Overweight" | "Obesity" = "Normal weight";
  if (bmi < 18.5) {
    category = "Underweight";
  } else if (bmi < 25) {
    category = "Normal weight";
  } else if (bmi < 30) {
    category = "Overweight";
  } else {
    category = "Obesity";
  }

  const minHealthyWeight = 18.5 * (heightM * heightM);
  const maxHealthyWeight = 24.9 * (heightM * heightM);

  return {
    bmi: parseFloat(bmi.toFixed(1)),
    category,
    healthyWeightRange: [
      parseFloat(minHealthyWeight.toFixed(1)),
      parseFloat(maxHealthyWeight.toFixed(1)),
    ],
  };
}
