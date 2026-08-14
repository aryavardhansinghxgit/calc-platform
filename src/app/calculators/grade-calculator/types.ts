export type GradeMode = "weighted" | "points" | "final_solver" | "scale_converter";

export type CurveMode = "none" | "flat" | "sqrt";

export interface AssignmentEntry {
  id: string;
  name: string;
  grade: number; // percentage (0-100) or points earned
  weightOrMax: number; // weight (%) or max points possible
  categoryId?: string;
}

export interface CategoryEntry {
  id: string;
  name: string;
  weight: number; // category weight (%)
  dropLowestCount: number; // drop lowest N scores
  assignments: AssignmentEntry[];
}

export interface FinalExamSolverResult {
  currentGrade: number;
  targetGrade: number;
  finalExamWeight: number;
  requiredFinalScore: number;
  isAchievable: boolean;
  verdict: string;
  targetMatrix: {
    letter: string;
    targetPercent: number;
    requiredScore: number;
    isAchievable: boolean;
  }[];
}

export interface CategoryBreakdown {
  name: string;
  weight: number;
  earnedPercent: number;
  droppedCount: number;
  contributionToFinal: number;
}

export interface GradeCalculatorOutputs {
  overallGrade: number;
  letterGrade: string;
  gpaPoints: number;
  performanceStatus: string;
  statusBadgeColor: string;
  totalPointsEarned?: number;
  totalPointsPossible?: number;
  categoryBreakdowns?: CategoryBreakdown[];
  finalSolverResult?: FinalExamSolverResult;
}
