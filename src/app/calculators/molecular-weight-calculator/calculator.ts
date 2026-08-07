import { MolecularWeightCalculatorOutputs } from "./types";

export function calculateMolecularWeightCalculator(inputs: Record<string, any>): MolecularWeightCalculatorOutputs {
  const comp = inputs.presetCompound || "H2O";
  let mass = 18.015;
  if (comp === "C6H12O6") mass = 180.156;
  else if (comp === "NaCl") mass = 58.44;
  else if (comp === "CO2") mass = 44.01;
  else if (comp === "H2SO4") mass = 98.079;
  return { molarMass: mass, formula: comp };
}
