import {
  getLetterAndGPA,
  applyGradeCurve,
  dropLowestScores,
  solveFinalExamTarget,
  calculateGradeCalculator,
} from "./calculator";

export function runGradeCalculatorTests() {
  // Test 1: Letter grade mapping (95 => A, 4.0 GPA)
  const letterRes = getLetterAndGPA(95);
  if (letterRes.letter !== "A" || letterRes.gpa !== 4.0) {
    throw new Error("Letter grade conversion failed");
  }

  // Test 2: Square root curve (64 => 10 * sqrt(64) = 80)
  const curved = applyGradeCurve(64, "sqrt");
  if (curved !== 80) {
    throw new Error("Square root curve calculation failed");
  }

  // Test 3: Drop lowest scores (scores: 50, 80, 90; drop 1 => 80, 90)
  const assignments = [
    { id: "1", name: "Quiz 1", grade: 50, weightOrMax: 10 },
    { id: "2", name: "Quiz 2", grade: 80, weightOrMax: 10 },
    { id: "3", name: "Quiz 3", grade: 90, weightOrMax: 10 },
  ];
  const filtered = dropLowestScores(assignments, 1);
  if (filtered.length !== 2 || filtered[0].grade !== 80) {
    throw new Error("Drop lowest score algorithm failed");
  }

  // Test 4: Final exam target solver (Current 85, Target 90, Weight 20% => Needs 110%)
  const solverRes = solveFinalExamTarget(85, 90, 20);
  if (solverRes.requiredFinalScore !== 110) {
    throw new Error("Final exam target solver failed");
  }

  // Test 5: Synthesizer default run
  const synthRes = calculateGradeCalculator({ mode: "weighted" });
  if (synthRes.overallGrade <= 0 || !synthRes.letterGrade) {
    throw new Error("Grade Calculator synthesizer failed");
  }

  return true;
}
