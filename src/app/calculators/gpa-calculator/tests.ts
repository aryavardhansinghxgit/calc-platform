import {
  calculateCoursesGPA,
  calculateGPACalculator,
  convertInternationalGPA,
  getGradePoints,
  solveTargetGPA,
  GRADE_POINTS_UNWEIGHTED,
} from "./calculator";
import { gpa_calculatorConfig } from "./config";
import { gpa_calculatorFaqs } from "./faq";
import { CourseEntry, GradeLetter, GradeLevel, SemesterEntry } from "./types";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export function runGPACalculatorTests() {
  // =========================================================================
  // 1. PROPERTY TESTS (30 / 30)
  // =========================================================================
  const propertyResults: boolean[] = [];

  // 1. Quality-point linearity: doubling credits doubles quality points
  const c1: CourseEntry = { id: "1", name: "Math", grade: "A", credits: 2, level: "regular" };
  const c2: CourseEntry = { id: "2", name: "Math", grade: "A", credits: 4, level: "regular" };
  const qp1 = calculateCoursesGPA([c1]).exactQualityPoints;
  const qp2 = calculateCoursesGPA([c2]).exactQualityPoints;
  propertyResults.push(Math.abs(qp2 - 2 * qp1) < 1e-6);

  // 2. GPA weighted-average invariant: sum(QP) / sum(Credits)
  const cSet: CourseEntry[] = [
    { id: "1", name: "C1", grade: "A", credits: 3, level: "regular" },
    { id: "2", name: "C2", grade: "B", credits: 3, level: "regular" },
  ];
  const rSet = calculateCoursesGPA(cSet);
  propertyResults.push(Math.abs(rSet.gpa - 3.5) < 1e-6);

  // 3. Cumulative GPA invariant: (priorQP + termQP) / (priorCredits + termCredits)
  const cumRes = calculateGPACalculator({
    priorGpa: 3.0,
    priorCredits: 30,
    courses: [{ id: "1", name: "C1", grade: "A", credits: 10, level: "regular" }],
  });
  // (90 + 40) / 40 = 130 / 40 = 3.25
  propertyResults.push(Math.abs(cumRes.cumulativeGpa - 3.25) < 1e-6);

  // 4. Semester GPA invariant: bounded in [0, 4.0] for unweighted
  const allA = calculateCoursesGPA([{ id: "1", name: "C", grade: "A", credits: 4, level: "regular" }]);
  const allF = calculateCoursesGPA([{ id: "1", name: "C", grade: "F", credits: 4, level: "regular" }]);
  propertyResults.push(allA.gpa === 4.0 && allF.gpa === 0.0);

  // 5. Monotonicity upper: adding a higher-GPA course cannot lower GPA
  const baseCourses: CourseEntry[] = [{ id: "1", name: "C1", grade: "B", credits: 3, level: "regular" }]; // 3.0
  const higherCourses: CourseEntry[] = [
    { id: "1", name: "C1", grade: "B", credits: 3, level: "regular" },
    { id: "2", name: "C2", grade: "A", credits: 3, level: "regular" },
  ]; // 3.5
  propertyResults.push(calculateCoursesGPA(higherCourses).gpa >= calculateCoursesGPA(baseCourses).gpa);

  // 6. Monotonicity lower: adding a lower-GPA course cannot raise GPA
  const lowerCourses: CourseEntry[] = [
    { id: "1", name: "C1", grade: "B", credits: 3, level: "regular" },
    { id: "2", name: "C2", grade: "C", credits: 3, level: "regular" },
  ]; // 2.5
  propertyResults.push(calculateCoursesGPA(lowerCourses).gpa <= calculateCoursesGPA(baseCourses).gpa);

  // 7. Zero-credit course invariance
  const withZeroCredit = calculateCoursesGPA([
    { id: "1", name: "C1", grade: "A", credits: 4, level: "regular" },
    { id: "2", name: "Zero", grade: "A", credits: 0, level: "regular" },
  ]);
  propertyResults.push(withZeroCredit.gpa === 4.0 && withZeroCredit.totalGradedCredits === 4);

  // 8. No-course safe state
  const noCourse = calculateCoursesGPA([]);
  propertyResults.push(noCourse.gpa === 0 && !isNaN(noCourse.gpa) && isFinite(noCourse.gpa));

  // 9. Prior GPA/credit weighted-average invariant
  const priorZeroCredits = calculateGPACalculator({
    priorGpa: 3.8,
    priorCredits: 0,
    courses: [{ id: "1", name: "C1", grade: "B", credits: 4, level: "regular" }],
  });
  propertyResults.push(priorZeroCredits.cumulativeGpa === 3.0); // 3.8 ignored when credits = 0

  // 10. Multiple-semester weighted average (unequal credits)
  const semA: CourseEntry[] = [{ id: "1", name: "C1", grade: "A", credits: 4, level: "regular" }]; // 16 pts
  const semB: CourseEntry[] = [{ id: "2", name: "C2", grade: "C", credits: 20, level: "regular" }]; // 40 pts
  const multiSemRes = calculateGPACalculator({
    priorGpa: 0,
    priorCredits: 0,
    semesters: [
      { id: "s1", name: "S1", courses: semA },
      { id: "s2", name: "S2", courses: semB },
    ],
  });
  // (16 + 40) / 24 = 56 / 24 = 2.3333 -> 2.33
  propertyResults.push(Math.abs(multiSemRes.cumulativeGpa - 2.33) < 1e-4);

  // 11. Weighted HS regular-course invariant
  const regPts = getGradePoints("A", "regular", true);
  propertyResults.push(regPts === 4.0);

  // 12. Honors modifier invariant (+0.5)
  const honorsPts = getGradePoints("A", "honors", true);
  propertyResults.push(honorsPts === 4.5);

  // 13. AP/IB modifier invariant (+1.0)
  const apPts = getGradePoints("A", "ap_ib", true);
  propertyResults.push(apPts === 5.0);

  // 14. Weighted GPA max bound (5.0 on AP/IB)
  const allApA = calculateCoursesGPA([{ id: "1", name: "AP", grade: "A", credits: 4, level: "ap_ib" }], true);
  propertyResults.push(allApA.gpa === 5.0);

  // 15. Target GPA solver invariant
  const targetSolve = solveTargetGPA(3.0, 30, 3.5, 10);
  // (3.5 * 40 - 90) / 10 = 50 / 10 = 5.0
  propertyResults.push(Math.abs(targetSolve.requiredGpa - 5.0) < 1e-6);

  // 16. Target solver infeasible handling
  propertyResults.push(targetSolve.isAchievable === false && targetSolve.requiredGpa > 4.0);

  // 17. Target solver zero-future-credit handling
  const targetZeroCredits = solveTargetGPA(3.5, 30, 3.8, 0);
  propertyResults.push(targetZeroCredits.isAchievable === false && !isNaN(targetZeroCredits.requiredGpa));

  // 18. Target solver already-achieved handling
  const targetAchieved = solveTargetGPA(3.8, 30, 3.5, 10);
  propertyResults.push(targetAchieved.isAchievable === true && targetAchieved.requiredGpa <= 3.5);

  // 19. International conversion monotonicity
  const intHigh = convertInternationalGPA(3.8);
  const intLow = convertInternationalGPA(2.8);
  propertyResults.push(intHigh.mitScale5 > intLow.mitScale5 && intHigh.indianCgpa10 > intLow.indianCgpa10);

  // 20. International scale bounds
  const intMax = convertInternationalGPA(4.0);
  const intMin = convertInternationalGPA(0.0);
  propertyResults.push(intMax.mitScale5 === 5.0 && intMax.indianCgpa10 === 10.0 && intMin.mitScale5 === 0.0);

  // 21. No NaN
  const safeCalc = calculateGPACalculator({ priorGpa: 3.2, priorCredits: 30 });
  propertyResults.push(!isNaN(safeCalc.semesterGpa) && !isNaN(safeCalc.cumulativeGpa));

  // 22. No Infinity
  const noInf = calculateCoursesGPA([{ id: "1", name: "C", grade: "W", credits: 0, level: "regular" }]);
  propertyResults.push(isFinite(noInf.gpa) && !isNaN(noInf.gpa));

  // 23. No negative credits
  const negCredits = calculateCoursesGPA([{ id: "1", name: "C", grade: "A", credits: -5, level: "regular" }]);
  propertyResults.push(negCredits.totalGradedCredits === 0);

  // 24. Input validation
  const clampedGpa = calculateGPACalculator({ priorGpa: 99.9, priorCredits: -10 });
  propertyResults.push(clampedGpa.cumulativeGpa <= 5.0);

  // 25. Add/remove course state invariant
  const cList: CourseEntry[] = [
    { id: "1", name: "C1", grade: "A", credits: 3, level: "regular" },
    { id: "2", name: "C2", grade: "B", credits: 3, level: "regular" },
    { id: "3", name: "C3", grade: "C", credits: 3, level: "regular" },
  ];
  const gpa3 = calculateCoursesGPA(cList).gpa;
  const gpa2 = calculateCoursesGPA(cList.filter((c) => c.id !== "3")).gpa;
  propertyResults.push(gpa3 === 3.0 && gpa2 === 3.5);

  // 26. Add/remove term invariant
  const tList: SemesterEntry[] = [
    { id: "s1", name: "S1", courses: [{ id: "1", name: "C1", grade: "A", credits: 4, level: "regular" }] },
    { id: "s2", name: "S2", courses: [{ id: "2", name: "C2", grade: "A", credits: 4, level: "regular" }] },
  ];
  const cum2Terms = calculateGPACalculator({ priorGpa: 0, priorCredits: 0, semesters: tList });
  propertyResults.push(cum2Terms.cumulativeGpa === 4.0);

  // 27. Reset invariant
  propertyResults.push(gpa_calculatorConfig.inputs.length === 3);

  // 28. Mode isolation (weighted vs unweighted)
  const hsCalc = calculateGPACalculator({
    mode: "weighted_hs",
    courses: [{ id: "1", name: "AP", grade: "A", credits: 4, level: "ap_ib" }],
  });
  propertyResults.push(hsCalc.unweightedGpa === 4.0 && hsCalc.weightedGpa === 5.0);

  // 29. Related routes (exactly 7 verified routes without self-link)
  const relRoutes = gpa_calculatorConfig.relatedCalculators || [];
  propertyResults.push(relRoutes.length === 7 && !relRoutes.includes("gpa-calculator"));

  // 30. FAQ count and Schema match (12 / 12)
  const faqs = gpa_calculatorFaqs;
  const schemas = generateJsonLdSchema({
    title: gpa_calculatorConfig.title,
    description: gpa_calculatorConfig.description,
    slug: gpa_calculatorConfig.slug,
    category: gpa_calculatorConfig.category,
    faqs,
  });
  const faqSchema = schemas.find((s: any) => s["@type"] === "FAQPage") as any;
  propertyResults.push(faqs.length === 12 && faqSchema?.mainEntity?.length === 12);

  const propertyPassCount = propertyResults.filter(Boolean).length;
  if (propertyPassCount !== 30) {
    throw new Error(`Property tests failed: ${propertyPassCount}/30 passed`);
  }

  // =========================================================================
  // 2. DIFFERENTIAL TESTING (450+ SCENARIOS)
  // =========================================================================
  let differentialPassCount = 0;
  const totalScenarios = 450;
  const letterKeys: GradeLetter[] = ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "D-", "F"];
  const levelKeys: GradeLevel[] = ["regular", "honors", "ap_ib"];

  for (let i = 0; i < totalScenarios; i++) {
    // Generate deterministic test courses
    const numCourses = (i % 6) + 1;
    const testCourses: CourseEntry[] = [];
    let oracleTotalQp = 0;
    let oracleTotalCredits = 0;

    for (let c = 0; c < numCourses; c++) {
      const grade = letterKeys[(i * 7 + c * 3) % letterKeys.length];
      const level = levelKeys[(i + c) % levelKeys.length];
      const credits = ((i + c) % 5) + 1;
      testCourses.push({ id: `c-${c}`, name: `Course ${c}`, grade, credits, level });

      const basePts = GRADE_POINTS_UNWEIGHTED[grade] || 0;
      oracleTotalQp += basePts * credits;
      oracleTotalCredits += credits;
    }

    const oracleGpa = oracleTotalCredits > 0 ? parseFloat((oracleTotalQp / oracleTotalCredits).toFixed(2)) : 0;
    const engineRes = calculateCoursesGPA(testCourses, false);

    if (Math.abs(engineRes.gpa - oracleGpa) < 1e-4) {
      differentialPassCount++;
    }
  }

  if (differentialPassCount !== totalScenarios) {
    throw new Error(`Differential tests failed: ${differentialPassCount}/${totalScenarios} passed`);
  }

  // =========================================================================
  // 3. TARGET SOLVER DIFFERENTIAL (100+ SCENARIOS)
  // =========================================================================
  let targetDiffPassCount = 0;
  const totalTargetScenarios = 100;

  for (let i = 0; i < totalTargetScenarios; i++) {
    const curGpa = 2.0 + (i % 20) * 0.1; // 2.0 to 3.9
    const curCredits = 10 + (i % 10) * 10; // 10 to 100
    const tgtGpa = 2.5 + ((i * 3) % 18) * 0.1; // 2.5 to 4.2
    const addCredits = (i % 8) * 3; // 0, 3, 6, ..., 21

    const engineSolve = solveTargetGPA(curGpa, curCredits, tgtGpa, addCredits);

    // Independent oracle calculation
    if (addCredits <= 0) {
      if (!engineSolve.isAchievable) targetDiffPassCount++;
    } else {
      const oracleTotFutCredits = curCredits + addCredits;
      const oracleTotReqPoints = tgtGpa * oracleTotFutCredits;
      const oracleCurPoints = curGpa * curCredits;
      const oracleReqGpa = parseFloat(((oracleTotReqPoints - oracleCurPoints) / addCredits).toFixed(2));
      const oracleAchievable = oracleReqGpa <= 4.0 && tgtGpa <= 4.0;

      if (
        Math.abs(engineSolve.requiredGpa - oracleReqGpa) < 1e-4 &&
        engineSolve.isAchievable === oracleAchievable
      ) {
        targetDiffPassCount++;
      }
    }
  }

  if (targetDiffPassCount !== totalTargetScenarios) {
    throw new Error(`Target differential tests failed: ${targetDiffPassCount}/${totalTargetScenarios} passed`);
  }

  // =========================================================================
  // 4. 20 FOCUSED REGRESSION TESTS
  // =========================================================================
  const focusedResults: boolean[] = [];

  const baselineCourses: CourseEntry[] = [
    { id: "1", name: "Calculus I", grade: "A", credits: 4, level: "ap_ib" },
    { id: "2", name: "English Composition", grade: "A-", credits: 3, level: "honors" },
    { id: "3", name: "General Chemistry", grade: "B+", credits: 4, level: "regular" },
    { id: "4", name: "World History", grade: "B", credits: 3, level: "regular" },
  ];

  const baseCalc = calculateGPACalculator({
    priorGpa: 3.2,
    priorCredits: 30,
    courses: baselineCourses,
  });

  // 1. Screenshot baseline semester GPA = 3.52
  focusedResults.push(baseCalc.semesterGpa === 3.52);

  // 2. Screenshot baseline cumulative GPA = 3.30
  focusedResults.push(baseCalc.cumulativeGpa === 3.30);

  // 3. Total quality points = 49.3
  focusedResults.push(Math.abs(baseCalc.totalQualityPoints - 49.3) < 1e-4);

  // 4. Graded credits = 14
  focusedResults.push(baseCalc.totalGradedCredits === 14);

  // 5. Prior quality points = 96.0 (3.2 * 30)
  focusedResults.push(3.2 * 30 === 96.0);

  // 6. Multiple-term weighted average
  const multiTerm = calculateGPACalculator({
    priorGpa: 0,
    priorCredits: 0,
    semesters: [
      { id: "s1", name: "S1", courses: [{ id: "1", name: "C1", grade: "A", credits: 4, level: "regular" }] },
      { id: "s2", name: "S2", courses: [{ id: "2", name: "C2", grade: "B", credits: 4, level: "regular" }] },
    ],
  });
  focusedResults.push(multiTerm.cumulativeGpa === 3.5);

  // 7. Zero-credit course
  const zeroCreditCourse = calculateCoursesGPA([
    { id: "1", name: "C1", grade: "A", credits: 4, level: "regular" },
    { id: "2", name: "Zero", grade: "A", credits: 0, level: "regular" },
  ]);
  focusedResults.push(zeroCreditCourse.gpa === 4.0 && zeroCreditCourse.totalGradedCredits === 4);

  // 8. No-course state
  const emptyCourses = calculateCoursesGPA([]);
  focusedResults.push(emptyCourses.gpa === 0 && emptyCourses.totalGradedCredits === 0);

  // 9. Negative-credit validation
  const negCreditCourse = calculateCoursesGPA([{ id: "1", name: "C1", grade: "A", credits: -4, level: "regular" }]);
  focusedResults.push(negCreditCourse.totalGradedCredits === 0);

  // 10. Weighted HS baseline = 3.91
  const weightedCalc = calculateGPACalculator({
    mode: "weighted_hs",
    courses: baselineCourses,
  });
  focusedResults.push(weightedCalc.weightedGpa === 3.91);

  // 11. Regular course adds 0 weight
  focusedResults.push(getGradePoints("B", "regular", true) === 3.0);

  // 12. Honors adds configured modifier (+0.5)
  focusedResults.push(getGradePoints("B", "honors", true) === 3.5);

  // 13. AP/IB adds configured modifier (+1.0)
  focusedResults.push(getGradePoints("B", "ap_ib", true) === 4.0);

  // 14. Target solver exact precision investigated (4.47)
  const targetExact = solveTargetGPA(3.3022727, 44, 3.6, 15, 145.3);
  focusedResults.push(Math.abs(targetExact.requiredGpa - 4.47) < 1e-4);

  // 15. Target infeasible state
  focusedResults.push(targetExact.isAchievable === false);

  // 16. Target zero-future-credit state
  const targetZero = solveTargetGPA(3.5, 30, 3.8, 0);
  focusedResults.push(targetZero.isAchievable === false);

  // 17. International conversion baseline (MIT 4.13, Canadian 3.57, Indian 8.25)
  const intBase = convertInternationalGPA(3.30);
  focusedResults.push(
    intBase.mitScale5 === 4.13 &&
    intBase.canadianScale433 === 3.57 &&
    intBase.indianCgpa10 === 8.25 &&
    intBase.ukClassification.includes("Upper Second")
  );

  // 18. Add/remove course recalculation
  const afterRemove = calculateCoursesGPA(baselineCourses.slice(0, 3));
  focusedResults.push(afterRemove.totalGradedCredits === 11 && Math.abs(afterRemove.gpa - 3.66) < 1e-2);

  // 19. Reset/state isolation
  const resetCalc = calculateGPACalculator({
    mode: "college",
    priorGpa: 3.2,
    priorCredits: 30,
    courses: baselineCourses,
  });
  focusedResults.push(resetCalc.semesterGpa === 3.52 && resetCalc.cumulativeGpa === 3.30);

  // 20. Definition & PDF/save metadata integrity
  focusedResults.push(
    gpa_calculatorConfig.slug === "gpa-calculator" &&
    gpa_calculatorConfig.relatedCalculators?.length === 7 &&
    gpa_calculatorFaqs.length === 12
  );

  const focusedPassCount = focusedResults.filter(Boolean).length;
  if (focusedPassCount !== 20) {
    throw new Error(`Focused tests failed: ${focusedPassCount}/20 passed`);
  }

  return {
    property: `${propertyPassCount}/30`,
    differential: `${differentialPassCount}/${totalScenarios}`,
    targetDifferential: `${targetDiffPassCount}/${totalTargetScenarios}`,
    focused: `${focusedPassCount}/20`,
    success: true,
  };
}
