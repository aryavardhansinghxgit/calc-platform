export interface GradeCalculatorInputs {
  currentGrade?: number;
  targetGrade?: number;
  finalWeight?: number;
}

export interface GradeCalculatorOutputs {
  requiredFinalScore: number;
  verdict: string;
}
