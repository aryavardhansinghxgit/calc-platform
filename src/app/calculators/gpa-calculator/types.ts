export type GPAMode = "college" | "weighted_hs" | "target" | "international";

export type GradeLevel = "regular" | "honors" | "ap_ib";

export type GradeLetter =
  | "A+"
  | "A"
  | "A-"
  | "B+"
  | "B"
  | "B-"
  | "C+"
  | "C"
  | "C-"
  | "D+"
  | "D"
  | "D-"
  | "F"
  | "P"
  | "NP"
  | "S"
  | "U"
  | "I"
  | "W";

export interface CourseEntry {
  id: string;
  name: string;
  grade: GradeLetter;
  credits: number;
  level: GradeLevel;
  isRetake?: boolean;
  oldGrade?: GradeLetter;
}

export interface SemesterEntry {
  id: string;
  name: string;
  courses: CourseEntry[];
}

export interface TargetSolverResult {
  targetGpa: number;
  currentGpa: number;
  currentCredits: number;
  additionalCredits: number;
  requiredGpa: number;
  isAchievable: boolean;
  recommendedGradeMix: string;
}

export interface InternationalConversion {
  usGpa4: number;
  mitScale5: number;
  canadianScale433: number;
  indianCgpa10: number;
  ukClassification: string;
  ectsGrade: string;
}

export interface GPACalculatorOutputs {
  semesterGpa: number;
  cumulativeGpa: number;
  weightedGpa: number;
  unweightedGpa: number;
  totalQualityPoints: number;
  totalGradedCredits: number;
  academicStanding: string;
  standingBadgeColor: string;
  targetResult?: TargetSolverResult;
  internationalResult?: InternationalConversion;
  semestersSummary?: {
    semesterName: string;
    semesterGpa: number;
    cumulativeGpa: number;
    credits: number;
  }[];
}
