export type StandardPolyhedralDie = "d4" | "d6" | "d8" | "d10" | "d12" | "d20" | "d100";

export interface SingleDieResult {
  dieType: string;
  sides: number;
  rawRoll: number;
  finalValue: number;
  isKept: boolean;
  isCriticalSuccess: boolean;
  isCriticalFumble: boolean;
  isExploded?: boolean;
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
  probability: number; // 0 to 1
  percent: number; // 0 to 100
  cumulative: number; // 0 to 100
}

export interface DiceProbabilityStats {
  min: number;
  max: number;
  mean: number;
  variance: number;
  stdDev: number;
  median: number;
  pmf: ProbabilityPoint[];
}
