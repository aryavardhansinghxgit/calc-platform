import {
  solveMolarityMass,
  solveStockDilution,
  solveMassPercent,
  solvePPMToMolarity,
  calculateMolarityCalculator,
} from "./calculator";

export function runMolarityCalculatorTests() {
  // Test 1: Solute mass solver (NaCl 1.0 M, 1.0 L, 58.44 g/mol => 58.44 g)
  const massRes = solveMolarityMass("mass", 0, 1.0, 1.0, 58.44);
  if (Math.abs(massRes.solvedValue - 58.44) > 0.01) {
    throw new Error("Solute mass calculation failed");
  }

  // Test 2: Molarity solver (58.44 g NaCl in 1.0 L => 1.0 M)
  const molRes = solveMolarityMass("molarity", 58.44, 0, 1.0, 58.44);
  if (Math.abs(molRes.solvedValue - 1.0) > 0.001) {
    throw new Error("Molarity calculation failed");
  }

  // Test 3: Dilution C1V1 = C2V2 (C1=10M, C2=1M, V2=100mL => V1=10mL)
  const dilRes = solveStockDilution(10, 0, 1, 100, "v1");
  if (Math.abs(dilRes.v1 - 10) > 0.01) {
    throw new Error("Stock dilution calculation failed");
  }

  // Test 4: Mass Percent & Density (37% HCl, density 1.19 g/mL, MW 36.46 => ~12.08 M)
  const mpRes = solveMassPercent(37, 1.19, 36.46, 1);
  if (Math.abs(mpRes.molarityM - 12.08) > 0.1) {
    throw new Error("Mass percent to molarity conversion failed");
  }

  // Test 5: Synthesizer default run
  const synthRes = calculateMolarityCalculator({ mode: "mass_solver" });
  if (!synthRes.benchProtocol || synthRes.benchProtocol.length === 0) {
    throw new Error("Molarity synthesizer failed to produce bench protocol");
  }

  return true;
}
