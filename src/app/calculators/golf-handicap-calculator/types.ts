export interface GolfRound {
  id: string;
  score: number;
  courseRating: number;
  slopeRating: number;
  pcc?: number;
  holes?: 9 | 18;
  date?: string;
}

export interface DifferentialResult {
  roundId: string;
  score: number;
  courseRating: number;
  slopeRating: number;
  pcc: number;
  differential: number;
  isCounting: boolean;
  isExceptional: boolean;
  esrAdjustment: number;
}

export type HandicapAllowanceFormat =
  | "100_stroke"
  | "95_fourball"
  | "85_alternate"
  | "scramble_2p"
  | "scramble_4p";

export interface CourseHandicapResult {
  courseHandicap: number;
  playingHandicap: number;
  allowancePct: number;
  allowanceLabel: string;
}

export interface WHSHandicapResult {
  roundsSubmitted: number;
  countingRoundsCount: number;
  rawUncappedIndex: number;
  lowIndexAnchor?: number;
  softCapApplied: boolean;
  hardCapApplied: boolean;
  esrApplied: boolean;
  totalEsrAdjustment: number;
  finalHandicapIndex: number;
  differentials: DifferentialResult[];
  whsRuleNote: string;
}
