import { GFRCalculatorOutputs } from "./types";

export function calculateGFRCalculator(inputs: Record<string, any>): GFRCalculatorOutputs {
  const scr = Math.max(0.1, Number(inputs.serumCreatinine) || 1.0);
  const age = Math.max(18, Number(inputs.age) || 50);
  const isFemale = inputs.gender === "female";
  const kappa = isFemale ? 0.7 : 0.9;
  const alpha = isFemale ? -0.241 : -0.302;
  const genderMult = isFemale ? 1.012 : 1.0;
  const scrRatio = scr / kappa;
  const minVal = Math.min(scrRatio, 1);
  const maxVal = Math.max(scrRatio, 1);
  const egfrRaw = 142 * Math.pow(minVal, alpha) * Math.pow(maxVal, -1.200) * Math.pow(0.9938, age) * genderMult;
  const egfr = Math.round(Math.max(0, egfrRaw));
  let stage = "G1 (Normal / High)";
  if (egfr < 15) stage = "G5 (Kidney Failure)";
  else if (egfr < 30) stage = "G4 (Severely Decreased)";
  else if (egfr < 45) stage = "G3b (Moderately to Severely Decreased)";
  else if (egfr < 60) stage = "G3a (Mildly to Moderately Decreased)";
  else if (egfr < 90) stage = "G2 (Mildly Decreased)";
  return { eGfr: egfr, stage };
}
