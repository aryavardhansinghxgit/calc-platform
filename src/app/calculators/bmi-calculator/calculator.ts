import { calculateBmi, BmiInput } from "@/lib/formulas/bmi";

export function calculateBMICalculator(inputs: Record<string, any>): Record<string, any> {
  const inputObj: BmiInput = {
    unitSystem: inputs.unitSystem || "us",
    age: Number(inputs.age) || 25,
    gender: inputs.gender || "male",
    heightFeet: Number(inputs.heightFeet) || 5,
    heightInches: Number(inputs.heightInches) || 10,
    weightLbs: Number(inputs.weightLbs) || 160,
    heightCm: Number(inputs.heightCm) || 178,
    weightKg: Number(inputs.weightKg) || 72.5,
    activityLevel: inputs.activityLevel || "sedentary",
  };

  const res = calculateBmi(inputObj);

  return {
    bmi: res.bmi,
    category: res.category,
    healthyWeightRange: `${res.healthyWeightRangeLbs[0]} - ${res.healthyWeightRangeLbs[1]} lbs (${res.healthyWeightRangeKg[0]} - ${res.healthyWeightRangeKg[1]} kg)`,
    primeIndex: res.bmiPrime,
    ponderalIndex: res.ponderalIndexMetric,
    idealWeight: `${res.idealWeight.averageLbs} lbs (${res.idealWeight.averageKg} kg)`,
    bodyFat: res.bodyFatPercentage,
    bmr: res.bmr,
    tdee: res.tdee,
  };
}
