import { runScientificCalculatorTests } from "../src/app/calculators/scientific-calculator/tests";
import { runFractionCalculatorTests } from "../src/app/calculators/fraction-calculator/tests";
import { runPercentageCalculatorTests } from "../src/app/calculators/percentage-calculator/tests";
import { runRandomNumberGeneratorTests } from "../src/app/calculators/random-number-generator/tests";
import { runPercentErrorCalculatorTests } from "../src/app/calculators/percent-error-calculator/tests";
import { runExponentCalculatorTests } from "../src/app/calculators/exponent-calculator/tests";
import { runBinaryCalculatorTests } from "../src/app/calculators/binary-calculator/tests";
import { runHexCalculatorTests } from "../src/app/calculators/hex-calculator/tests";
import { runHalfLifeCalculatorTests } from "../src/app/calculators/half-life-calculator/tests";
import { runQuadraticFormulaCalculatorTests } from "../src/app/calculators/quadratic-formula-calculator/tests";
import { runLogCalculatorTests } from "../src/app/calculators/log-calculator/tests";
import { runRatioCalculatorTests } from "../src/app/calculators/ratio-calculator/tests";
import { runRootCalculatorTests } from "../src/app/calculators/root-calculator/tests";
import { runLeastCommonMultipleLCMCalculatorTests } from "../src/app/calculators/lcm-calculator/tests";
import { runGreatestCommonFactorGCFCalculatorTests } from "../src/app/calculators/gcf-calculator/tests";
import { runFactorCalculatorTests } from "../src/app/calculators/factor-calculator/tests";
import { runRoundingCalculatorTests } from "../src/app/calculators/rounding-calculator/tests";
import { runMatrixCalculatorTests } from "../src/app/calculators/matrix-calculator/tests";
import { runScientificNotationCalculatorTests } from "../src/app/calculators/scientific-notation-calculator/tests";
import { runBigNumberCalculatorTests } from "../src/app/calculators/big-number-calculator/tests";
import { runStandardDeviationCalculatorTests } from "../src/app/calculators/standard-deviation-calculator/tests";
import { runNumberSequenceCalculatorTests } from "../src/app/calculators/number-sequence-calculator/tests";
import { runSampleSizeCalculatorTests } from "../src/app/calculators/sample-size-calculator/tests";
import { runProbabilityCalculatorTests } from "../src/app/calculators/probability-calculator/tests";
import { runStatisticsCalculatorTests } from "../src/app/calculators/statistics-calculator/tests";
import { runMeanMedianModeRangeCalculatorTests } from "../src/app/calculators/mean-median-mode-calculator/tests";
import { runPermutationCombinationCalculatorTests } from "../src/app/calculators/permutation-combination-calculator/tests";
import { runZScoreCalculatorTests } from "../src/app/calculators/z-score-calculator/tests";
import { runConfidenceIntervalCalculatorTests } from "../src/app/calculators/confidence-interval-calculator/tests";
import { runTriangleCalculatorTests } from "../src/app/calculators/triangle-calculator/tests";
import { runVolumeCalculatorTests } from "../src/app/calculators/volume-calculator/tests";
import { runSlopeCalculatorTests } from "../src/app/calculators/slope-calculator/tests";
import { runAreaCalculatorTests } from "../src/app/calculators/area-calculator/tests";
import { runDistanceCalculatorTests } from "../src/app/calculators/distance-calculator/tests";
import { runCircleCalculatorTests } from "../src/app/calculators/circle-calculator/tests";
import { runSurfaceAreaCalculatorTests } from "../src/app/calculators/surface-area-calculator/tests";
import { runPythagoreanTheoremCalculatorTests } from "../src/app/calculators/pythagorean-theorem-calculator/tests";
import { runRightTriangleCalculatorTests } from "../src/app/calculators/right-triangle-calculator/tests";

console.log("Running individual unit test suites for 38 Math Calculators...");

const testSuites = [
  { name: "Scientific Calculator", fn: runScientificCalculatorTests },
  { name: "Fraction Calculator", fn: runFractionCalculatorTests },
  { name: "Percentage Calculator", fn: runPercentageCalculatorTests },
  { name: "Random Number Generator", fn: runRandomNumberGeneratorTests },
  { name: "Percent Error Calculator", fn: runPercentErrorCalculatorTests },
  { name: "Exponent Calculator", fn: runExponentCalculatorTests },
  { name: "Binary Calculator", fn: runBinaryCalculatorTests },
  { name: "Hex Calculator", fn: runHexCalculatorTests },
  { name: "Half-Life Calculator", fn: runHalfLifeCalculatorTests },
  { name: "Quadratic Formula Calculator", fn: runQuadraticFormulaCalculatorTests },
  { name: "Log Calculator", fn: runLogCalculatorTests },
  { name: "Ratio Calculator", fn: runRatioCalculatorTests },
  { name: "Root Calculator", fn: runRootCalculatorTests },
  { name: "LCM Calculator", fn: runLeastCommonMultipleLCMCalculatorTests },
  { name: "GCF Calculator", fn: runGreatestCommonFactorGCFCalculatorTests },
  { name: "Factor Calculator", fn: runFactorCalculatorTests },
  { name: "Rounding Calculator", fn: runRoundingCalculatorTests },
  { name: "Matrix Calculator", fn: runMatrixCalculatorTests },
  { name: "Scientific Notation Calculator", fn: runScientificNotationCalculatorTests },
  { name: "Big Number Calculator", fn: runBigNumberCalculatorTests },
  { name: "Standard Deviation Calculator", fn: runStandardDeviationCalculatorTests },
  { name: "Number Sequence Calculator", fn: runNumberSequenceCalculatorTests },
  { name: "Sample Size Calculator", fn: runSampleSizeCalculatorTests },
  { name: "Probability Calculator", fn: runProbabilityCalculatorTests },
  { name: "Statistics Calculator", fn: runStatisticsCalculatorTests },
  { name: "Mean, Median, Mode Calculator", fn: runMeanMedianModeRangeCalculatorTests },
  { name: "Permutation & Combination Calculator", fn: runPermutationCombinationCalculatorTests },
  { name: "Z-Score Calculator", fn: runZScoreCalculatorTests },
  { name: "Confidence Interval Calculator", fn: runConfidenceIntervalCalculatorTests },
  { name: "Triangle Calculator", fn: runTriangleCalculatorTests },
  { name: "Volume Calculator", fn: runVolumeCalculatorTests },
  { name: "Slope Calculator", fn: runSlopeCalculatorTests },
  { name: "Area Calculator", fn: runAreaCalculatorTests },
  { name: "Distance Calculator", fn: runDistanceCalculatorTests },
  { name: "Circle Calculator", fn: runCircleCalculatorTests },
  { name: "Surface Area Calculator", fn: runSurfaceAreaCalculatorTests },
  { name: "Pythagorean Theorem Calculator", fn: runPythagoreanTheoremCalculatorTests },
  { name: "Right Triangle Calculator", fn: runRightTriangleCalculatorTests }
];

let passed = 0;
let failed = 0;

for (const suite of testSuites) {
  try {
    suite.fn();
    console.log(`✓ [PASS] ${suite.name}`);
    passed++;
  } catch (err: any) {
    console.error(`✗ [FAIL] ${suite.name}: ${err.message}`);
    failed++;
  }
}

console.log(`\nIndividual Math Test Summary: ${passed} passed, ${failed} failed.`);
if (failed > 0) process.exit(1);
