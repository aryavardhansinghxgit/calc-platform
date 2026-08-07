import { ArmyBodyFatCalculatorOutputs } from "./types";

export function calculateArmyBodyFatCalculator(inputs: Record<string, any>): ArmyBodyFatCalculatorOutputs {
  const g = inputs.gender || "male";
  const ageVal = Number(inputs.age) || 24;
  const h = Math.max(1, Number(inputs.heightCm) || 175);
  const neck = Math.max(1, Number(inputs.neckCm) || 38);
  const waist = Math.max(1, Number(inputs.waistCm) || 82);
  const hip = Math.max(1, Number(inputs.hipCm) || 95);
  let bf = 16;
  if (g === "male") {
    const val = waist - neck;
    if (val > 0) bf = 86.010 * Math.log10(val) - 70.041 * Math.log10(h) + 36.76;
  } else {
    const val = waist + hip - neck;
    if (val > 0) bf = 163.205 * Math.log10(val) - 97.684 * Math.log10(h) - 78.387;
  }
  bf = Math.min(60, Math.max(3, parseFloat(bf.toFixed(1))));
  let maxAllowed = 22;
  if (g === "male") {
    if (ageVal <= 20) maxAllowed = 20;
    else if (ageVal <= 27) maxAllowed = 22;
    else if (ageVal <= 39) maxAllowed = 24;
    else maxAllowed = 26;
  } else {
    if (ageVal <= 20) maxAllowed = 30;
    else if (ageVal <= 27) maxAllowed = 32;
    else if (ageVal <= 39) maxAllowed = 34;
    else maxAllowed = 36;
  }
  const status = bf <= maxAllowed ? "PASS (Compliant)" : "FAIL (Non-Compliant)";
  return { bodyFatPercent: bf, maxAllowed, status };
}
