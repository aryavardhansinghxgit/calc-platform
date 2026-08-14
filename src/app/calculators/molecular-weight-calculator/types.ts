export type ParserMode = "formula" | "empirical_solver" | "mass_converter";

export interface ElementData {
  number: number;
  symbol: string;
  name: string;
  atomicWeight: number; // IUPAC average g/mol
  monoisotopicMass: number; // Da (most abundant isotope)
  category: string;
  period: number;
  group: number;
}

export interface ParsedElement {
  symbol: string;
  name: string;
  count: number;
  atomicWeight: number;
  monoisotopicMass: number;
  totalSubMass: number;
  totalSubMonoisotopic: number;
  massPercentage: number;
  color: string;
}

export interface EmpiricalResult {
  empiricalFormula: string;
  empiricalMass: number;
  molecularFormula: string;
  molecularMass: number;
  multiplier: number;
}

export interface ConverterResult {
  grams: number;
  milligrams: number;
  moles: number;
  millimoles: number;
  moleculesCount: string; // Scientific notation string
}

export interface MolecularWeightOutputs {
  mode: ParserMode;
  formula: string;
  parsedElements: ParsedElement[];
  totalMolarMass: number;
  totalMonoisotopicMass: number;
  totalAtomCount: number;
  isMonoisotopicMode?: boolean;
  empiricalResult?: EmpiricalResult;
  converterResult?: ConverterResult;
  parseError?: string;
}
