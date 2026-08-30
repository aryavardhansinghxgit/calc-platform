import { calculateLeanBodyMassCalculator } from "./calculator";
import { calculateLeanBodyMass } from "@/lib/formulas/leanBodyMass";

export function runLeanBodyMassCalculatorTests() {
  // 1. Reference Baseline: Male, 30 years, 160 lbs, 5'10" (70 in)
  const baseRes = calculateLeanBodyMass({
    unitSystem: "imperial",
    gender: "male",
    isChild: false,
    age: 30,
    weightLbs: 160,
    heightInches: 70,
  });

  if (baseRes.consensusLbmLbs !== 126.1) {
    throw new Error(`Baseline failed: expected 126.1 lbs consensus, got ${baseRes.consensusLbmLbs}`);
  }
  if (baseRes.consensusLbmKg !== 57.2) {
    throw new Error(`Baseline failed: expected 57.2 kg consensus, got ${baseRes.consensusLbmKg}`);
  }
  if (baseRes.bmi !== 23.0) {
    throw new Error(`Baseline failed: expected BMI 23.0, got ${baseRes.bmi}`);
  }
  // Scientific identity: Fat-Free Mass must equal Lean Body Mass in 2-compartment model
  if (baseRes.fatFreeMassLbs !== baseRes.consensusLbmLbs) {
    throw new Error(`FFM identity failed: expected ${baseRes.consensusLbmLbs}, got ${baseRes.fatFreeMassLbs}`);
  }

  // Verify adult formulas present
  const boer = baseRes.formulaResults.find((f) => f.formulaName.includes("Boer"));
  const james = baseRes.formulaResults.find((f) => f.formulaName.includes("James"));
  const hume = baseRes.formulaResults.find((f) => f.formulaName.includes("Hume"));
  const jan = baseRes.formulaResults.find((f) => f.formulaName.includes("Janmahasatian"));

  if (!boer || boer.lbmLbs !== 127.5) throw new Error(`Boer formula failed: got ${boer?.lbmLbs}`);
  if (!james || james.lbmLbs !== 129.0) throw new Error(`James formula failed: got ${james?.lbmLbs}`);
  if (!hume || hume.lbmLbs !== 120.4) throw new Error(`Hume formula failed: got ${hume?.lbmLbs}`);
  if (!jan || (jan.lbmLbs !== 127.4 && jan.lbmLbs !== 127.3)) throw new Error(`Janmahasatian formula failed: got ${jan?.lbmLbs}`);

  // 2. Age-gating Crossover Tests
  // Age 14 must be Child (Peters pediatric only)
  const child14 = calculateLeanBodyMass({
    unitSystem: "imperial",
    gender: "male",
    isChild: true,
    age: 14,
    weightLbs: 100,
    heightInches: 60,
  });
  if (!child14.isChild) throw new Error("Age 14 failed: expected isChild true");
  if (child14.formulaResults.length !== 1 || !child14.formulaResults[0].formulaName.includes("Peters")) {
    throw new Error("Age 14 failed: expected only Peters pediatric formula");
  }

  // Age 15 must be Adult (4 adult formulas, no Peters)
  const adult15 = calculateLeanBodyMass({
    unitSystem: "imperial",
    gender: "male",
    isChild: false,
    age: 15,
    weightLbs: 120,
    heightInches: 65,
  });
  if (adult15.isChild) throw new Error("Age 15 failed: expected isChild false");
  if (adult15.formulaResults.length !== 4) {
    throw new Error(`Age 15 failed: expected 4 adult formulas, got ${adult15.formulaResults.length}`);
  }

  // 3. Fallback Calculator tests
  const defaultInputs = { gender: "male", weightKg: 75, heightCm: 175 };
  const res1 = calculateLeanBodyMassCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = { gender: 0, weightKg: 0, heightCm: 0 };
  const res2 = calculateLeanBodyMassCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  return true;
}
