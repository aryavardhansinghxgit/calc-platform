import { runBMICalculatorTests } from "../src/app/calculators/bmi-calculator/tests";
import { runCalorieCalculatorTests } from "../src/app/calculators/calorie-calculator/tests";
import { runBodyFatCalculatorTests } from "../src/app/calculators/body-fat-calculator/tests";
import { runBMRCalculatorTests } from "../src/app/calculators/bmr-calculator/tests";
import { runIdealWeightCalculatorTests } from "../src/app/calculators/ideal-weight-calculator/tests";
import { runPaceCalculatorTests } from "../src/app/calculators/pace-calculator/tests";
import { runArmyBodyFatCalculatorTests } from "../src/app/calculators/army-body-fat-calculator/tests";
import { runLeanBodyMassCalculatorTests } from "../src/app/calculators/lean-body-mass-calculator/tests";
import { runHealthyWeightCalculatorTests } from "../src/app/calculators/healthy-weight-calculator/tests";
import { runCaloriesBurnedCalculatorTests } from "../src/app/calculators/calories-burned-calculator/tests";
import { runOneRepMaxCalculatorTests } from "../src/app/calculators/one-rep-max-calculator/tests";
import { runTargetHeartRateCalculatorTests } from "../src/app/calculators/target-heart-rate-calculator/tests";
import { runPregnancyCalculatorTests } from "../src/app/calculators/pregnancy-calculator/tests";
import { runPregnancyWeightGainCalculatorTests } from "../src/app/calculators/pregnancy-weight-gain-calculator/tests";
import { runPregnancyConceptionCalculatorTests } from "../src/app/calculators/pregnancy-conception-calculator/tests";
import { runDueDateCalculatorTests } from "../src/app/calculators/due-date-calculator/tests";
import { runOvulationCalculatorTests } from "../src/app/calculators/ovulation-calculator/tests";
import { runConceptionCalculatorTests } from "../src/app/calculators/conception-calculator/tests";
import { runPeriodCalculatorTests } from "../src/app/calculators/period-calculator/tests";
import { runMacroCalculatorTests } from "../src/app/calculators/macro-calculator/tests";
import { runCarbohydrateCalculatorTests } from "../src/app/calculators/carbohydrate-calculator/tests";
import { runProteinCalculatorTests } from "../src/app/calculators/protein-calculator/tests";
import { runFatIntakeCalculatorTests } from "../src/app/calculators/fat-intake-calculator/tests";
import { runTDEECalculatorTests } from "../src/app/calculators/tdee-calculator/tests";
import { runGFRCalculatorTests } from "../src/app/calculators/gfr-calculator/tests";
import { runBodyTypeCalculatorTests } from "../src/app/calculators/body-type-calculator/tests";
import { runBodySurfaceAreaCalculatorTests } from "../src/app/calculators/body-surface-area-calculator/tests";
import { runBACCalculatorTests } from "../src/app/calculators/bac-calculator/tests";

console.log("Running individual unit test suites for 28 Health Calculators...");

const testSuites = [
  { name: "BMI Calculator", fn: runBMICalculatorTests },
  { name: "Calorie Calculator", fn: runCalorieCalculatorTests },
  { name: "Body Fat Calculator", fn: runBodyFatCalculatorTests },
  { name: "BMR Calculator", fn: runBMRCalculatorTests },
  { name: "Ideal Weight Calculator", fn: runIdealWeightCalculatorTests },
  { name: "Pace Calculator", fn: runPaceCalculatorTests },
  { name: "Army Body Fat Calculator", fn: runArmyBodyFatCalculatorTests },
  { name: "Lean Body Mass Calculator", fn: runLeanBodyMassCalculatorTests },
  { name: "Healthy Weight Calculator", fn: runHealthyWeightCalculatorTests },
  { name: "Calories Burned Calculator", fn: runCaloriesBurnedCalculatorTests },
  { name: "One Rep Max Calculator", fn: runOneRepMaxCalculatorTests },
  { name: "Target Heart Rate Calculator", fn: runTargetHeartRateCalculatorTests },
  { name: "Pregnancy Calculator", fn: runPregnancyCalculatorTests },
  { name: "Pregnancy Weight Gain Calculator", fn: runPregnancyWeightGainCalculatorTests },
  { name: "Pregnancy Conception Calculator", fn: runPregnancyConceptionCalculatorTests },
  { name: "Due Date Calculator", fn: runDueDateCalculatorTests },
  { name: "Ovulation Calculator", fn: runOvulationCalculatorTests },
  { name: "Conception Calculator", fn: runConceptionCalculatorTests },
  { name: "Period Calculator", fn: runPeriodCalculatorTests },
  { name: "Macro Calculator", fn: runMacroCalculatorTests },
  { name: "Carbohydrate Calculator", fn: runCarbohydrateCalculatorTests },
  { name: "Protein Calculator", fn: runProteinCalculatorTests },
  { name: "Fat Intake Calculator", fn: runFatIntakeCalculatorTests },
  { name: "TDEE Calculator", fn: runTDEECalculatorTests },
  { name: "GFR Calculator", fn: runGFRCalculatorTests },
  { name: "Body Type Calculator", fn: runBodyTypeCalculatorTests },
  { name: "Body Surface Area Calculator", fn: runBodySurfaceAreaCalculatorTests },
  { name: "BAC Calculator", fn: runBACCalculatorTests },
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

console.log(`\nIndividual Health Test Summary: ${passed} passed, ${failed} failed.`);
if (failed > 0) process.exit(1);
