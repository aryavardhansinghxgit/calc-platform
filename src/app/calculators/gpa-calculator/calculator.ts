import {
  GPACalculatorOutputs,
  GradeLetter,
  GradeLevel,
  CourseEntry,
  SemesterEntry,
  TargetSolverResult,
  InternationalConversion,
} from "./types";

// Standard Unweighted 4.0 Grade Point Mapping
export const GRADE_POINTS_UNWEIGHTED: Record<GradeLetter, number | null> = {
  "A+": 4.0,
  A: 4.0,
  "A-": 3.7,
  "B+": 3.3,
  B: 3.0,
  "B-": 2.7,
  "C+": 2.3,
  C: 2.0,
  "C-": 1.7,
  "D+": 1.3,
  D: 1.0,
  "D-": 0.7,
  F: 0.0,
  // Non-credit / Neutral Filter Grades (returns null to indicate exclusion)
  P: null,
  NP: null,
  S: null,
  U: null,
  I: null,
  W: null,
};

// Course Level Weight Additions
export const LEVEL_WEIGHT_ADDITIONS: Record<GradeLevel, number> = {
  regular: 0.0,
  honors: 0.5,
  ap_ib: 1.0,
};

/**
 * Get grade point value for a specific grade letter and course level
 */
export function getGradePoints(grade: GradeLetter, level: GradeLevel = "regular", isWeighted: boolean = false): number | null {
  const basePoints = GRADE_POINTS_UNWEIGHTED[grade];
  if (basePoints === null) return null;

  if (isWeighted && basePoints > 0) {
    return basePoints + (LEVEL_WEIGHT_ADDITIONS[level] || 0);
  }
  return basePoints;
}

/**
 * Calculate GPA for a single list of course entries
 */
export function calculateCoursesGPA(courses: CourseEntry[], isWeighted: boolean = false) {
  let totalQualityPoints = 0;
  let totalGradedCredits = 0;

  for (const course of courses) {
    const points = getGradePoints(course.grade, course.level, isWeighted);
    if (points !== null && course.credits > 0) {
      totalQualityPoints += points * course.credits;
      totalGradedCredits += course.credits;
    }
  }

  const gpa = totalGradedCredits > 0 ? totalQualityPoints / totalGradedCredits : 0;
  return {
    gpa: parseFloat(gpa.toFixed(2)),
    totalQualityPoints: parseFloat(totalQualityPoints.toFixed(2)),
    totalGradedCredits,
  };
}

/**
 * Target / "Raise My GPA" Planner Solver
 */
export function solveTargetGPA(
  currentGpa: number,
  currentCredits: number,
  targetGpa: number,
  additionalCredits: number
): TargetSolverResult {
  if (additionalCredits <= 0) {
    return {
      targetGpa,
      currentGpa,
      currentCredits,
      additionalCredits,
      requiredGpa: 0,
      isAchievable: false,
      recommendedGradeMix: "Additional credit hours must be greater than 0.",
    };
  }

  const totalFutureCredits = currentCredits + additionalCredits;
  const totalRequiredPoints = targetGpa * totalFutureCredits;
  const currentPoints = currentGpa * currentCredits;
  const requiredPointsForNewTerm = totalRequiredPoints - currentPoints;
  const requiredGpa = requiredPointsForNewTerm / additionalCredits;

  const roundedRequiredGpa = parseFloat(requiredGpa.toFixed(2));
  const isAchievable = roundedRequiredGpa <= 4.0 && roundedRequiredGpa >= 0;

  let recommendedGradeMix = "Requires an average grade of A/A+ across upcoming courses.";
  if (roundedRequiredGpa <= 2.0) {
    recommendedGradeMix = "Maintain a C average (2.0 GPA) or higher.";
  } else if (roundedRequiredGpa <= 3.0) {
    recommendedGradeMix = "Maintain a B average (3.0 GPA) or higher.";
  } else if (roundedRequiredGpa <= 3.5) {
    recommendedGradeMix = "Aim for a mix of A and B grades (3.5 GPA).";
  } else if (roundedRequiredGpa <= 4.0) {
    recommendedGradeMix = "Requires nearly straight A grades (4.0 GPA).";
  } else {
    recommendedGradeMix = "Target GPA is mathematically unachievable in the given credits.";
  }

  return {
    targetGpa,
    currentGpa,
    currentCredits,
    additionalCredits,
    requiredGpa: roundedRequiredGpa,
    isAchievable,
    recommendedGradeMix,
  };
}

/**
 * Convert US 4.0 GPA to International Scales
 */
export function convertInternationalGPA(usGpa: number): InternationalConversion {
  const gpa = Math.max(0, Math.min(4.0, usGpa));

  const mitScale5 = parseFloat((gpa * 1.25).toFixed(2));
  const canadianScale433 = parseFloat(((gpa / 4.0) * 4.33).toFixed(2));
  const indianCgpa10 = parseFloat((gpa * 2.5).toFixed(2));

  let ukClassification = "Third Class Honours (3rd)";
  if (gpa >= 3.7) ukClassification = "First Class Honours (1st)";
  else if (gpa >= 3.3) ukClassification = "Upper Second Class (2:1)";
  else if (gpa >= 2.7) ukClassification = "Lower Second Class (2:2)";
  else if (gpa >= 2.0) ukClassification = "Third Class Honours (3rd)";
  else ukClassification = "Pass / Ordinary Degree";

  let ectsGrade = "Grade F (Fail)";
  if (gpa >= 3.8) ectsGrade = "Grade A (Excellent)";
  else if (gpa >= 3.4) ectsGrade = "Grade B (Very Good)";
  else if (gpa >= 2.8) ectsGrade = "Grade C (Good)";
  else if (gpa >= 2.2) ectsGrade = "Grade D (Satisfactory)";
  else if (gpa >= 2.0) ectsGrade = "Grade E (Sufficient)";

  return {
    usGpa4: gpa,
    mitScale5,
    canadianScale433,
    indianCgpa10,
    ukClassification,
    ectsGrade,
  };
}

/**
 * Dynamic Academic Standing & Honors Evaluator
 */
export function evaluateAcademicStanding(gpa: number): { standing: string; color: string } {
  if (gpa >= 3.9) return { standing: "Summa Cum Laude / President's Honor Roll ✨", color: "emerald" };
  if (gpa >= 3.7) return { standing: "Magna Cum Laude / High Dean's List 🌟", color: "emerald" };
  if (gpa >= 3.5) return { standing: "Cum Laude / Dean's Honor List 🎓", color: "purple" };
  if (gpa >= 2.0) return { standing: "Good Academic Standing ✅", color: "blue" };
  return { standing: "Academic Warning / Probation Alert ⚠️", color: "rose" };
}

/**
 * Main GPA Calculator Synthesizer
 */
export function calculateGPACalculator(inputs: Record<string, any>): GPACalculatorOutputs {
  const mode = String(inputs.mode || "college");
  const priorGpa = Number(inputs.priorGpa || 0);
  const priorCredits = Number(inputs.priorCredits || 0);

  // Parse courses array or construct default courses
  let courses: CourseEntry[] = Array.isArray(inputs.courses) ? inputs.courses : [];
  if (courses.length === 0) {
    courses = [
      { id: "1", name: "Mathematics", grade: "A", credits: 4, level: "ap_ib" },
      { id: "2", name: "English Literature", grade: "A-", credits: 3, level: "honors" },
      { id: "3", name: "Biology", grade: "B+", credits: 4, level: "regular" },
      { id: "4", name: "History", grade: "B", credits: 3, level: "regular" },
    ];
  }

  // Handle Course Retake & Grade Forgiveness
  let adjustedPriorPoints = priorGpa * priorCredits;
  let adjustedPriorCredits = priorCredits;

  for (const course of courses) {
    if (course.isRetake && course.oldGrade) {
      const oldPts = getGradePoints(course.oldGrade, course.level, mode === "weighted_hs");
      if (oldPts !== null && course.credits > 0) {
        adjustedPriorPoints = Math.max(0, adjustedPriorPoints - oldPts * course.credits);
      }
    }
  }

  // Calculate current term unweighted & weighted
  const unweightedResult = calculateCoursesGPA(courses, false);
  const weightedResult = calculateCoursesGPA(courses, true);

  // Calculate Cumulative GPA
  const totalCumulativePoints = adjustedPriorPoints + unweightedResult.totalQualityPoints;
  const totalCumulativeCredits = adjustedPriorCredits + unweightedResult.totalGradedCredits;
  const cumulativeGpa =
    totalCumulativeCredits > 0 ? parseFloat((totalCumulativePoints / totalCumulativeCredits).toFixed(2)) : unweightedResult.gpa;

  // Target Solver Mode
  let targetResult: TargetSolverResult | undefined;
  if (mode === "target") {
    const targetGpa = Number(inputs.targetGpa || 3.5);
    const additionalCredits = Number(inputs.additionalCredits || 15);
    targetResult = solveTargetGPA(cumulativeGpa, totalCumulativeCredits, targetGpa, additionalCredits);
  }

  // International Conversion
  const internationalResult = convertInternationalGPA(cumulativeGpa);

  // Academic Standing
  const standingInfo = evaluateAcademicStanding(cumulativeGpa);

  return {
    semesterGpa: unweightedResult.gpa,
    cumulativeGpa,
    weightedGpa: weightedResult.gpa,
    unweightedGpa: unweightedResult.gpa,
    totalQualityPoints: unweightedResult.totalQualityPoints,
    totalGradedCredits: unweightedResult.totalGradedCredits,
    academicStanding: standingInfo.standing,
    standingBadgeColor: standingInfo.color,
    targetResult,
    internationalResult,
  };
}
