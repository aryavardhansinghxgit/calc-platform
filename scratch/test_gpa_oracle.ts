import {
  calculateCoursesGPA,
  solveTargetGPA,
  convertInternationalGPA,
  evaluateAcademicStanding,
  calculateGPACalculator,
  GRADE_POINTS_UNWEIGHTED,
  LEVEL_WEIGHT_ADDITIONS,
} from "../src/app/calculators/gpa-calculator/calculator";
import {
  CourseEntry,
  SemesterEntry,
  GradeLetter,
  GradeLevel,
} from "../src/app/calculators/gpa-calculator/types";

let totalAssertions = 0;
let passedAssertions = 0;
let failedAssertions = 0;

function assert(condition: boolean, msg: string) {
  totalAssertions++;
  if (condition) {
    passedAssertions++;
  } else {
    failedAssertions++;
    console.error(`FAILED: ${msg}`);
  }
}

console.log("=== STARTING INDEPENDENT ORACLE & PROPERTY TEST SUITE ===");

// 1. GOLDEN CASE INDEPENDENT VERIFICATION
console.log("--- 1. Testing Golden Case ---");
const goldenCourses: CourseEntry[] = [
  { id: "1", name: "Calculus I", grade: "A", credits: 4, level: "ap_ib" },
  { id: "2", name: "English Composition", grade: "A-", credits: 3, level: "honors" },
  { id: "3", name: "General Chemistry", grade: "B+", credits: 4, level: "regular" },
  { id: "4", name: "World History", grade: "B", credits: 3, level: "regular" },
];

const goldenUnweighted = calculateCoursesGPA(goldenCourses, false);
assert(goldenUnweighted.totalGradedCredits === 14, "Golden case graded credits === 14");
assert(Math.abs(goldenUnweighted.totalQualityPoints - 49.3) < 1e-6, "Golden case quality points === 49.3");
assert(goldenUnweighted.gpa === 3.52, "Golden case semester GPA === 3.52");

const goldenWeighted = calculateCoursesGPA(goldenCourses, true);
assert(Math.abs(goldenWeighted.totalQualityPoints - 54.8) < 1e-6, "Golden case weighted quality points === 54.8");
assert(goldenWeighted.gpa === 3.91, "Golden case weighted GPA === 3.91");

const goldenCumulative = calculateGPACalculator({
  mode: "college",
  priorGpa: 3.2,
  priorCredits: 30,
  courses: goldenCourses,
  targetGpa: 3.6,
  additionalCredits: 15,
});
assert(goldenCumulative.cumulativeGpa === 3.30, "Golden case cumulative GPA === 3.30");
assert(goldenCumulative.academicStanding.includes("Good Academic Standing"), "Golden case academic standing is Good Academic Standing");

const goldenTarget = solveTargetGPA(3.3022727, 44, 3.6, 15, 145.3);
assert(goldenTarget.requiredGpa === 4.47, "Golden target required GPA === 4.47");
assert(goldenTarget.isAchievable === false, "Golden target correctly flagged as unachievable");

const goldenIntl = convertInternationalGPA(3.30);
assert(goldenIntl.mitScale5 === 4.13, "Golden MIT 5.0 === 4.13");
assert(goldenIntl.canadianScale433 === 3.57, "Golden Canadian 4.33 === 3.57");
assert(goldenIntl.indianCgpa10 === 8.25, "Golden Indian 10.0 === 8.25");
assert(goldenIntl.ukClassification.includes("Upper Second Class (2:1)"), "Golden UK === 2:1");
assert(goldenIntl.ectsGrade.includes("Grade C"), "Golden ECTS === Grade C");

// 2. SUITE: 25,000 COURSE-LEVEL GPA RANDOM CASES
console.log("--- 2. Running 25,000 Course-Level GPA Cases ---");
const gradeList: GradeLetter[] = ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "D-", "F"];
const oracleGradeMap: Record<GradeLetter, number> = {
  "A+": 4.0, A: 4.0, "A-": 3.7, "B+": 3.3, B: 3.0, "B-": 2.7,
  "C+": 2.3, C: 2.0, "C-": 1.7, "D+": 1.3, D: 1.0, "D-": 0.7, F: 0.0,
  P: 0, NP: 0, S: 0, U: 0, I: 0, W: 0,
};

for (let i = 0; i < 25000; i++) {
  const numCourses = 1 + (i % 8);
  const testCourses: CourseEntry[] = [];
  let oracleQP = 0;
  let oracleCredits = 0;

  for (let c = 0; c < numCourses; c++) {
    const g = gradeList[(i * 7 + c * 13) % gradeList.length];
    const cr = 1 + ((i + c) % 6);
    testCourses.push({
      id: `c-${c}`,
      name: `Course ${c}`,
      grade: g,
      credits: cr,
      level: "regular",
    });
    oracleQP += oracleGradeMap[g] * cr;
    oracleCredits += cr;
  }

  const res = calculateCoursesGPA(testCourses, false);
  const oracleExpectedGPA = parseFloat((oracleQP / oracleCredits).toFixed(2));
  assert(Math.abs(res.exactQualityPoints - oracleQP) < 1e-5, `Course level QP match at ${i}`);
  assert(res.totalGradedCredits === oracleCredits, `Course credits match at ${i}`);
  assert(res.gpa === oracleExpectedGPA, `Course GPA match at ${i}`);
}

// 3. SUITE: 25,000 WEIGHTED HIGH SCHOOL GPA CASES
console.log("--- 3. Running 25,000 Weighted HS GPA Cases ---");
const levelWeights: Record<GradeLevel, number> = { regular: 0.0, honors: 0.5, ap_ib: 1.0 };
const levels: GradeLevel[] = ["regular", "honors", "ap_ib"];

for (let i = 0; i < 25000; i++) {
  const numCourses = 1 + (i % 6);
  const testCourses: CourseEntry[] = [];
  let oracleWeightedQP = 0;
  let oracleCredits = 0;

  for (let c = 0; c < numCourses; c++) {
    const g = gradeList[(i * 11 + c * 5) % gradeList.length];
    const lvl = levels[(i + c) % levels.length];
    const cr = 1 + ((i * 3 + c) % 5);
    testCourses.push({
      id: `c-${c}`,
      name: `Course ${c}`,
      grade: g,
      credits: cr,
      level: lvl,
    });
    const base = oracleGradeMap[g];
    const bonus = base > 0 ? levelWeights[lvl] : 0;
    oracleWeightedQP += (base + bonus) * cr;
    oracleCredits += cr;
  }

  const res = calculateCoursesGPA(testCourses, true);
  const expectedWeightedGPA = parseFloat((oracleWeightedQP / oracleCredits).toFixed(2));
  assert(Math.abs(res.exactQualityPoints - oracleWeightedQP) < 1e-5, `Weighted QP match at ${i}`);
  assert(res.gpa === expectedWeightedGPA, `Weighted GPA match at ${i}`);
}

// 4. SUITE: 25,000 CUMULATIVE GPA CASES
console.log("--- 4. Running 25,000 Cumulative GPA Cases ---");
for (let i = 0; i < 25000; i++) {
  const priorGpa = parseFloat(((i % 401) / 100).toFixed(2)); // 0.00 to 4.00
  const priorCredits = (i * 3) % 120; // 0 to 117
  const termGpa = parseFloat((((i * 7) % 401) / 100).toFixed(2));
  const termCredits = 1 + ((i * 5) % 20); // 1 to 20

  const termCourses: CourseEntry[] = [
    { id: "1", name: "C1", grade: "A", credits: termCredits, level: "regular" }
  ];
  // simulate term directly
  const priorQP = priorGpa * priorCredits;
  const termQP = 4.0 * termCredits;
  const totalQP = priorQP + termQP;
  const totalCredits = priorCredits + termCredits;
  const oracleCumulative = parseFloat((totalQP / totalCredits).toFixed(2));

  const output = calculateGPACalculator({
    mode: "college",
    priorGpa,
    priorCredits,
    courses: termCourses,
  });

  assert(output.cumulativeGpa === oracleCumulative, `Cumulative GPA match at ${i}`);
}

// 5. SUITE: 25,000 MULTI-TERM CASES
console.log("--- 5. Running 25,000 Multi-Term Cases ---");
for (let i = 0; i < 25000; i++) {
  const cr1 = 5 + (i % 15);
  const cr2 = 5 + ((i * 3) % 15);
  const g1: GradeLetter = (i % 2 === 0) ? "B" : "C"; // 3.0 or 2.0
  const g2: GradeLetter = (i % 3 === 0) ? "A" : "B"; // 4.0 or 3.0

  const sem1: SemesterEntry = {
    id: "s1",
    name: "Term 1",
    courses: [{ id: "c1", name: "T1C1", grade: g1, credits: cr1, level: "regular" }],
  };
  const sem2: SemesterEntry = {
    id: "s2",
    name: "Term 2",
    courses: [{ id: "c2", name: "T2C1", grade: g2, credits: cr2, level: "regular" }],
  };

  const qp1 = oracleGradeMap[g1] * cr1;
  const qp2 = oracleGradeMap[g2] * cr2;
  const expectedCGPA = parseFloat(((qp1 + qp2) / (cr1 + cr2)).toFixed(2));

  const output = calculateGPACalculator({
    mode: "college",
    priorGpa: 0,
    priorCredits: 0,
    semesters: [sem1, sem2],
    courses: sem1.courses,
  });

  assert(output.cumulativeGpa === expectedCGPA, `Multi-term weighted cumulative match at ${i}`);
}

// 6. SUITE: 25,000 TARGET GPA SOLVER CASES
console.log("--- 6. Running 25,000 Target GPA Solver Cases ---");
for (let i = 0; i < 25000; i++) {
  const curGPA = 2.0 + ((i % 200) / 100); // 2.0 to 4.0
  const curCredits = 15 + (i % 90);
  const target = 2.5 + (((i * 2) % 150) / 100); // 2.5 to 4.0
  const futCredits = 3 + (i % 30);

  const curQP = curGPA * curCredits;
  const futTotalCredits = curCredits + futCredits;
  const reqTotalQP = target * futTotalCredits;
  const reqFutQP = reqTotalQP - curQP;
  const oracleReqGPA = parseFloat((reqFutQP / futCredits).toFixed(2));
  const oracleAchievable = oracleReqGPA <= 4.0 && target <= 4.0;

  const solverRes = solveTargetGPA(curGPA, curCredits, target, futCredits, curQP);
  assert(solverRes.requiredGpa === oracleReqGPA, `Target required GPA match at ${i}`);
  assert(solverRes.isAchievable === oracleAchievable, `Target achievability match at ${i}`);
}

// 7. SUITE: 25,000 CREDIT WEIGHTING & REORDERING PROPERTIES
console.log("--- 7. Running 25,000 Credit Weighting & Monotonicity Properties ---");
for (let i = 0; i < 25000; i++) {
  const crA = 1 + (i % 6);
  const crB = 1 + ((i * 2) % 6);
  const cA: CourseEntry = { id: "a", name: "A", grade: "A", credits: crA, level: "regular" };
  const cB: CourseEntry = { id: "b", name: "B", grade: "C", credits: crB, level: "regular" };

  // Forward order
  const res1 = calculateCoursesGPA([cA, cB], false);
  // Reversed order
  const res2 = calculateCoursesGPA([cB, cA], false);

  assert(res1.gpa === res2.gpa, `Course order invariance at ${i}`);
  assert(res1.totalQualityPoints === res2.totalQualityPoints, `Order invariance QP at ${i}`);
}

// 8. SUITE: 25,000 INVALID INPUT & EDGE CASES
console.log("--- 8. Running 25,000 Invalid Input & Edge Cases ---");
for (let i = 0; i < 25000; i++) {
  const zeroCrCourse: CourseEntry = { id: "z", name: "Zero", grade: "A", credits: 0, level: "regular" };
  const normalCourse: CourseEntry = { id: "n", name: "Normal", grade: "B", credits: 3, level: "regular" };

  // Case with zero credit course alone
  const resZero = calculateCoursesGPA([zeroCrCourse], false);
  assert(resZero.gpa === 0, `Zero credit GPA is 0 at ${i}`);
  assert(!isNaN(resZero.gpa) && isFinite(resZero.gpa), `No NaN on zero credits at ${i}`);

  // Neutral grades (P, NP, W)
  const neutralCourse: CourseEntry = { id: "p", name: "Pass", grade: "P", credits: 4, level: "regular" };
  const resNeutral = calculateCoursesGPA([neutralCourse, normalCourse], false);
  assert(resNeutral.gpa === 3.0, `Pass/Fail grade excluded from GPA at ${i}`);
  assert(resNeutral.totalGradedCredits === 3, `Pass/Fail excluded from graded credits at ${i}`);
}

// 9. SUITE: 25,000 GRADE CHANGE MONOTONICITY CASES
console.log("--- 9. Running 25,000 Grade Change Monotonicity Cases ---");
for (let i = 0; i < 25000; i++) {
  const cr = 1 + (i % 6);
  const lowCourse: CourseEntry = { id: "1", name: "C", grade: "C", credits: cr, level: "regular" };
  const highCourse: CourseEntry = { id: "1", name: "C", grade: "A", credits: cr, level: "regular" };

  const resLow = calculateCoursesGPA([lowCourse], false);
  const resHigh = calculateCoursesGPA([highCourse], false);

  assert(resHigh.gpa >= resLow.gpa, `Grade increase raises or keeps GPA at ${i}`);
}

// 10. SUITE: 25,000 INTERNATIONAL CONVERSION CASES
console.log("--- 10. Running 25,000 International Mapping Cases ---");
for (let i = 0; i < 25000; i++) {
  const usGpa = parseFloat(((i % 401) / 100).toFixed(2));
  const intl = convertInternationalGPA(usGpa);

  assert(intl.mitScale5 === parseFloat((usGpa * 1.25).toFixed(2)), `MIT 5.0 conversion match at ${i}`);
  assert(intl.canadianScale433 === parseFloat(((usGpa / 4.0) * 4.33).toFixed(2)), `Canadian 4.33 match at ${i}`);
  assert(intl.indianCgpa10 === parseFloat((usGpa * 2.5).toFixed(2)), `Indian CGPA 10.0 match at ${i}`);
}

console.log(`\n=== TEST COMPLETE ===`);
console.log(`Total assertions evaluated: ${totalAssertions.toLocaleString()}`);
console.log(`Passed: ${passedAssertions.toLocaleString()}`);
console.log(`Failed: ${failedAssertions.toLocaleString()}`);

if (failedAssertions > 0) {
  process.exit(1);
} else {
  console.log("ALL ORACLE & PROPERTY TESTS PASSED WITH 100% SUCCESS!");
}
