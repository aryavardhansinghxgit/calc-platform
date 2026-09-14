export type StandardPolyhedralDie = "d4" | "d6" | "d8" | "d10" | "d12" | "d20" | "d100";

export type DiceRng = (min: number, max: number) => number;

export interface SingleDieResult {
  dieType: string;
  sides: number;
  rawRoll: number;
  finalValue: number;
  isKept: boolean;
  isCriticalSuccess: boolean;
  isCriticalFumble: boolean;
  isExploded?: boolean;
  explodedRolls?: number[];
  isRerolled?: boolean;
}

export interface DiceGroupRollResult {
  expression: string;
  count: number;
  sides: number;
  modifier: number;
  rolls: SingleDieResult[];
  subtotal: number;
}

export interface RollResult {
  expression: string;
  total: number;
  diceGroups: DiceGroupRollResult[];
  modifier: number;
  hasCritSuccess: boolean;
  hasCritFumble: boolean;
  successCount?: number;
  isTargetSuccessMode?: boolean;
  timestamp: string;
}

export interface RollHistoryEntry {
  id: string;
  expression: string;
  total: number;
  timestamp: string;
  summary: string;
}

export interface ProbabilityPoint {
  value: number;
  rawProbability: number; // exact unrounded 0 to 1
  probability: number; // rounded for display e.g. 0.0278
  percent: number; // e.g. 2.78
  cumulative: number; // cumulative e.g. 100.00
}

export interface DiceProbabilityStats {
  min: number;
  max: number;
  mean: number;
  variance: number;
  stdDev: number;
  median: number;
  pmf: ProbabilityPoint[];
  rawSum: number;
  isSimulated?: boolean;
}

export interface DiceTerm {
  count: number;
  sides: number;
  keepHighest?: number;
  keepLowest?: number;
  dropHighest?: number;
  dropLowest?: number;
  exploding?: boolean;
  rerollBelow?: number;
  targetSuccess?: number;
  sign: number; // 1 or -1
}

export interface ParsedDiceExpression {
  terms: DiceTerm[];
  constantModifier: number;
  isValid: boolean;
  error?: string;
}
