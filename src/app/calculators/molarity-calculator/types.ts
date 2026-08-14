export type MolarityMode = "mass_solver" | "dilution" | "mass_percent" | "ppm_converter";

export type SolveVariable = "molarity" | "mass" | "volume" | "molar_mass";

export interface ChemicalCompound {
  name: string;
  formula: string;
  molarMass: number; // g/mol
  valence?: number; // equivalents per mole for Normality (N)
}

export interface DilutionResult {
  c1: number;
  v1: number;
  c2: number;
  v2: number;
  solventVolumeNeeded: number; // V2 - V1
  pipetteProtocol: string;
}

export interface MassPercentResult {
  molarityM: number;
  normalityN: number;
  molesPerLiter: number;
}

export interface PPMResult {
  ppm: number;
  molarityM: number;
  molalityM: number;
}

export interface MolarityCalculatorOutputs {
  mode: MolarityMode;
  solvedVariable?: SolveVariable;
  solvedValue?: number;
  formattedSolvedValue?: string;
  molarityM?: number;
  massGrams?: number;
  volumeLiters?: number;
  molarMass?: number;
  normalityN?: number;
  dilutionResult?: DilutionResult;
  massPercentResult?: MassPercentResult;
  ppmResult?: PPMResult;
  benchProtocol: string[];
}
