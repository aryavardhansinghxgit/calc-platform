import {
  calculateCoursesGPA,
  solveTargetGPA,
  convertInternationalGPA,
  calculateGPACalculator,
} from "./calculator";

export function runGPACalculatorTests() {
  // Test 1: Standard Unweighted GPA (A=4 in 3cr, B=3 in 3cr => 3.5 GPA)
  const courses1 = [
    { id: "1", name: "Math", grade: "A" as const, credits: 3, level: "regular" as const },
    { id: "2", name: "English", grade: "B" as const, credits: 3, level: "regular" as const },
  ];
  const res1 = calculateCoursesGPA(courses1, false);
  if (res1.gpa !== 3.5 || res1.totalGradedCredits !== 6) {
    throw new Error("Unweighted GPA calculation failed");
  }

  // Test 2: AP/IB Weighted GPA (AP A = 5.0 in 4cr, Regular B = 3.0 in 4cr => 4.0 Weighted GPA)
  const courses2 = [
    { id: "1", name: "AP Physics", grade: "A" as const, credits: 4, level: "ap_ib" as const },
    { id: "2", name: "PE", grade: "B" as const, credits: 4, level: "regular" as const },
  ];
  const res2 = calculateCoursesGPA(courses2, true);
  if (res2.gpa !== 4.0) {
    throw new Error("Weighted GPA calculation failed");
  }

  // Test 3: Target GPA Planner Solver (Current 3.0 in 30 credits, Target 3.5 in 15 credits => Requires 4.5 GPA -> Unachievable)
  const targetSol = solveTargetGPA(3.0, 30, 3.5, 15);
  if (targetSol.requiredGpa !== 4.5 || targetSol.isAchievable !== false) {
    throw new Error("Target GPA solver calculation failed");
  }

  // Test 4: International Conversion (US 3.8 => MIT 4.75)
  const intlRes = convertInternationalGPA(3.8);
  if (intlRes.mitScale5 !== 4.75 || intlRes.ukClassification !== "First Class Honours (1st)") {
    throw new Error("International GPA conversion failed");
  }

  // Test 5: Synthesizer default run
  const synthRes = calculateGPACalculator({ priorGpa: 3.2, priorCredits: 30 });
  if (synthRes.cumulativeGpa <= 0 || !synthRes.academicStanding) {
    throw new Error("GPA Calculator synthesizer failed");
  }

  return true;
}
