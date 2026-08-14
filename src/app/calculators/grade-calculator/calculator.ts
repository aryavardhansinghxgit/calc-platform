import {
  GradeCalculatorOutputs,
  GradeMode,
  CurveMode,
  AssignmentEntry,
  CategoryEntry,
  FinalExamSolverResult,
  CategoryBreakdown,
} from "./types";

/**
 * Convert percentage grade to letter grade and 4.0 GPA points
 */
export function getLetterAndGPA(percent: number): { letter: string; gpa: number } {
  const p = Math.max(0, percent);
  if (p >= 97) return { letter: "A+", gpa: 4.0 };
  if (p >= 93) return { letter: "A", gpa: 4.0 };
  if (p >= 90) return { letter: "A-", gpa: 3.7 };
  if (p >= 87) return { letter: "B+", gpa: 3.3 };
  if (p >= 83) return { letter: "B", gpa: 3.0 };
  if (p >= 80) return { letter: "B-", gpa: 2.7 };
  if (p >= 77) return { letter: "C+", gpa: 2.3 };
  if (p >= 73) return { letter: "C", gpa: 2.0 };
  if (p >= 70) return { letter: "C-", gpa: 1.7 };
  if (p >= 65) return { letter: "D", gpa: 1.0 };
  return { letter: "F", gpa: 0.0 };
}

/**
 * Apply grading curves (flat curve or square-root curve)
 */
export function applyGradeCurve(rawPercent: number, curveMode: CurveMode = "none", curveValue: number = 0): number {
  if (curveMode === "flat") {
    return Math.min(100, Math.max(0, rawPercent + curveValue));
  }
  if (curveMode === "sqrt") {
    return Math.min(100, Math.max(0, 10 * Math.sqrt(Math.max(0, rawPercent))));
  }
  return rawPercent;
}

/**
 * Drop lowest N scores algorithm
 */
export function dropLowestScores(assignments: AssignmentEntry[], dropCount: number): AssignmentEntry[] {
  if (dropCount <= 0 || assignments.length <= dropCount) return assignments;
  const sorted = [...assignments].sort((a, b) => a.grade - b.grade);
  return sorted.slice(dropCount);
}

/**
 * Solve required final exam score
 */
export function solveFinalExamTarget(
  currentGrade: number,
  targetGrade: number,
  finalExamWeight: number
): FinalExamSolverResult {
  const w = Math.max(1, Math.min(99, finalExamWeight)) / 100;
  const reqScore = (targetGrade - currentGrade * (1 - w)) / w;

  const roundedReq = parseFloat(reqScore.toFixed(1));
  const isAchievable = roundedReq <= 100 && roundedReq >= 0;

  let verdict = "Achievable with focused preparation.";
  if (roundedReq > 100) {
    verdict = "Requires extra credit (>100% on final exam).";
  } else if (roundedReq <= 0) {
    verdict = "Target grade guaranteed! You can score 0% on final and still achieve target.";
  }

  // Target Matrix for standard grade cutoffs
  const targets = [
    { letter: "A (90%)", targetPercent: 90 },
    { label: "B (80%)", targetPercent: 80 },
    { label: "C (70%)", targetPercent: 70 },
    { label: "D (60%)", targetPercent: 60 },
  ];

  const targetMatrix = targets.map((t) => {
    const score = (t.targetPercent - currentGrade * (1 - w)) / w;
    const rounded = parseFloat(score.toFixed(1));
    return {
      letter: t.letter || t.label || "",
      targetPercent: t.targetPercent,
      requiredScore: rounded,
      isAchievable: rounded <= 100 && rounded >= 0,
    };
  });

  return {
    currentGrade,
    targetGrade,
    finalExamWeight,
    requiredFinalScore: roundedReq,
    isAchievable,
    verdict,
    targetMatrix,
  };
}

/**
 * Main Grade Calculator Synthesizer
 */
export function calculateGradeCalculator(inputs: Record<string, any>): GradeCalculatorOutputs {
  const mode: GradeMode = (inputs.mode as GradeMode) || "weighted";
  const curveMode: CurveMode = (inputs.curveMode as CurveMode) || "none";
  const curveValue = Number(inputs.curveValue || 0);

  // Final Exam Mode Quick Solver
  if (mode === "final_solver") {
    const cur = Number(inputs.currentGrade || 85);
    const target = Number(inputs.targetGrade || 90);
    const w = Number(inputs.finalExamWeight || 20);

    const solver = solveFinalExamTarget(cur, target, w);
    const letterInfo = getLetterAndGPA(cur);

    return {
      overallGrade: cur,
      letterGrade: letterInfo.letter,
      gpaPoints: letterInfo.gpa,
      performanceStatus: cur >= 90 ? "Honor Roll 🌟" : cur >= 70 ? "Passing ✅" : "At Risk ⚠️",
      statusBadgeColor: cur >= 90 ? "emerald" : cur >= 70 ? "blue" : "rose",
      finalSolverResult: solver,
    };
  }

  // Points-Based System Mode
  if (mode === "points") {
    const assignments: AssignmentEntry[] = Array.isArray(inputs.assignments)
      ? inputs.assignments
      : [
          { id: "1", name: "Homework 1", grade: 45, weightOrMax: 50 },
          { id: "2", name: "Quiz 1", grade: 18, weightOrMax: 20 },
          { id: "3", name: "Midterm Exam", grade: 88, weightOrMax: 100 },
        ];

    let earned = 0;
    let possible = 0;

    for (const a of assignments) {
      if (a.weightOrMax > 0) {
        earned += a.grade;
        possible += a.weightOrMax;
      }
    }

    const rawPercent = possible > 0 ? (earned / possible) * 100 : 0;
    const finalPercent = parseFloat(applyGradeCurve(rawPercent, curveMode, curveValue).toFixed(2));
    const letterInfo = getLetterAndGPA(finalPercent);

    return {
      overallGrade: finalPercent,
      letterGrade: letterInfo.letter,
      gpaPoints: letterInfo.gpa,
      performanceStatus: finalPercent >= 90 ? "Honor Roll 🌟" : finalPercent >= 70 ? "Passing ✅" : "At Risk ⚠️",
      statusBadgeColor: finalPercent >= 90 ? "emerald" : finalPercent >= 70 ? "blue" : "rose",
      totalPointsEarned: earned,
      totalPointsPossible: possible,
    };
  }

  // Default: Weighted Percentage System Mode
  const categories: CategoryEntry[] = Array.isArray(inputs.categories)
    ? inputs.categories
    : [
        {
          id: "cat-1",
          name: "Homework",
          weight: 20,
          dropLowestCount: 0,
          assignments: [{ id: "a1", name: "HW 1", grade: 90, weightOrMax: 20 }],
        },
        {
          id: "cat-2",
          name: "Midterm Exam",
          weight: 30,
          dropLowestCount: 0,
          assignments: [{ id: "a2", name: "Midterm", grade: 85, weightOrMax: 30 }],
        },
        {
          id: "cat-3",
          name: "Final Project",
          weight: 50,
          dropLowestCount: 0,
          assignments: [{ id: "a3", name: "Project", grade: 92, weightOrMax: 50 }],
        },
      ];

  let totalWeightedScore = 0;
  let totalWeightCompleted = 0;
  const categoryBreakdowns: CategoryBreakdown[] = [];

  for (const cat of categories) {
    if (cat.weight > 0 && cat.assignments.length > 0) {
      // Apply drop lowest scores algorithm
      const filtered = dropLowestScores(cat.assignments, cat.dropLowestCount);
      const catAvg = filtered.reduce((acc, a) => acc + a.grade, 0) / filtered.length;

      const weightedContribution = (catAvg * cat.weight) / 100;
      totalWeightedScore += weightedContribution;
      totalWeightCompleted += cat.weight;

      categoryBreakdowns.push({
        name: cat.name,
        weight: cat.weight,
        earnedPercent: parseFloat(catAvg.toFixed(1)),
        droppedCount: cat.assignments.length - filtered.length,
        contributionToFinal: parseFloat(weightedContribution.toFixed(1)),
      });
    }
  }

  // Normalize if category weights do not sum to 100%
  const rawOverall = totalWeightCompleted > 0 ? (totalWeightedScore / totalWeightCompleted) * 100 : 0;
  const finalPercent = parseFloat(applyGradeCurve(rawOverall, curveMode, curveValue).toFixed(2));
  const letterInfo = getLetterAndGPA(finalPercent);

  return {
    overallGrade: finalPercent,
    letterGrade: letterInfo.letter,
    gpaPoints: letterInfo.gpa,
    performanceStatus: finalPercent >= 90 ? "Honor Roll 🌟" : finalPercent >= 70 ? "Passing ✅" : "At Risk ⚠️",
    statusBadgeColor: finalPercent >= 90 ? "emerald" : finalPercent >= 70 ? "blue" : "rose",
    categoryBreakdowns,
  };
}
