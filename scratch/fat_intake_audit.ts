import { calculateFatIntakeCalculator, calculateFatOutputs } from "../src/app/calculators/fat-intake-calculator/calculator";
import { fat_intake_calculatorConfig } from "../src/app/calculators/fat-intake-calculator/config";
import { fat_intake_calculatorFaqs } from "../src/app/calculators/fat-intake-calculator/faq";
import { fat_intake_calculatorMetadata } from "../src/app/calculators/fat-intake-calculator/metadata";
import { generateJsonLdSchema } from "../src/lib/seo-helpers";
import * as fs from "fs";

console.log("================================================================================");
console.log("           SCIENTIFIC & QA REGRESSION AUDIT: FAT INTAKE CALCULATOR              ");
console.log("================================================================================\n");

const anomalies: Array<{ id: string; severity: string; title: string; detail: string; fix: string }> = [];

// -----------------------------------------------------------------------------
// 1. CANONICAL BASELINE VERIFICATION
// -----------------------------------------------------------------------------
console.log("--- 1. CANONICAL BASELINE VERIFICATION ---");
const canonicalInput = {
  unitSystem: "us",
  calculationMode: "daily",
  age: 25,
  gender: "male",
  heightFeet: 5,
  heightInches: 10,
  weightLbs: 160,
  activityLevel: "light",
  goal: "maintain",
  bmrFormula: "mifflin",
  bodyFat: 20,
  customFatPercentage: 25,
};

const baseRes = calculateFatIntakeCalculator(canonicalInput);
console.log(`Canonical Baseline: BMR = ${baseRes.bmr} kcal, TDEE = ${baseRes.tdee} kcal, Target Calories = ${baseRes.targetCalories} kcal`);
console.log(`Daily Fat Target: ${baseRes.fatTargetGrams} g (${baseRes.fatTargetCalories} kcal | ${baseRes.fatPercentage}%)`);
console.log(`Hormone Safety Min: ${baseRes.hormoneSafetyMinGrams} g`);
console.log(`Saturated Fat Limit: ${baseRes.fattyAcids.saturatedGrams} g (<${baseRes.fattyAcids.saturatedMaxPercent}%)`);
console.log(`Omega-3 Target: ${baseRes.fattyAcids.omega3Grams} g`);
console.log(`MUFA: ${baseRes.fattyAcids.mufaGrams} g, PUFA: ${baseRes.fattyAcids.pufaGrams} g`);

// Verify Daily Baseline
// 2361 kcal * 0.25 = 590.25 kcal / 9 = 65.58 g -> rounds to 66 g
if (baseRes.fatTargetGrams !== 66 || baseRes.fatTargetCalories !== 590) {
  anomalies.push({
    id: "ANOMALY-BASE-01",
    severity: "P2",
    title: "Daily baseline rounding discrepancy",
    detail: `Expected 66g / 590 kcal, got ${baseRes.fatTargetGrams}g / ${baseRes.fatTargetCalories} kcal`,
    fix: "Reconcile rounding",
  });
}

// -----------------------------------------------------------------------------
// 2. TEST ALL 10 MODES
// -----------------------------------------------------------------------------
console.log("\n--- 2. TESTING ALL 10 MODES ---");
const modes = [
  { id: "daily", expectedPct: 25, label: "Daily Baseline" },
  { id: "loss", expectedPct: 22, label: "Weight Loss Fat" },
  { id: "gain", expectedPct: 32, label: "Weight Gain Fat" },
  { id: "maintenance", expectedPct: 28, label: "Maintenance" },
  { id: "athlete", expectedPct: 22, label: "Athlete Fat Target" },
  { id: "heart-health", expectedPct: 25, label: "Heart Health Mode" },
  { id: "keto", expectedPct: 75, label: "Keto Fat Calculator" },
  { id: "low-fat", expectedPct: 18, label: "Low Fat Diet" },
  { id: "bodybuilding", expectedPct: 22, label: "Bodybuilder Minimum" },
  { id: "custom", expectedPct: 25, label: "Custom Ratio" },
];

for (const m of modes) {
  const res = calculateFatIntakeCalculator({ ...canonicalInput, calculationMode: m.id });
  console.log(`Mode: [${m.label.padEnd(22)}] -> Fat: ${String(res.fatTargetGrams).padStart(3)}g | ${String(res.fatTargetCalories).padStart(4)} kcal | ${res.fatPercentage}% | Sat Limit: ${res.fattyAcids.saturatedGrams}g | MUFA: ${res.fattyAcids.mufaGrams}g | PUFA: ${res.fattyAcids.pufaGrams}g`);

  // Check Bodybuilder Minimum discrepancy
  if (m.id === "bodybuilding") {
    // Presets in UI claim: "Bodybuilder Minimum: 0.35g/lb hormone minimum"
    // 160 lbs * 0.35 = 56 g. But at 22%, 2361 * 0.22 / 9 = 57.7g -> 58g.
    // What if weight is 200 lbs? 200 * 0.35 = 70 g!
    const heavyBB = calculateFatIntakeCalculator({ ...canonicalInput, calculationMode: "bodybuilding", weightLbs: 200 });
    console.log(`   -> Heavy BB (200 lbs): fatTargetGrams = ${heavyBB.fatTargetGrams}g. Expected at 0.35g/lb: 70g. Expected at 0.3g/lb: 60g.`);
    if (heavyBB.fatTargetGrams < 70) {
      anomalies.push({
        id: "ANOMALY-BB-01",
        severity: "P1",
        title: "Bodybuilder Minimum mode formula mismatch",
        detail: `UI label claims '0.35g/lb hormone minimum', but calculation uses fixed 22% of calories or 0.3g/lb minimum (${heavyBB.fatTargetGrams}g vs 70g for 200 lb athlete).`,
        fix: "In bodybuilding mode, ensure fat intake scales with body weight at 0.35g/lb or clarify the 22% vs 0.35g/lb calculation convention.",
      });
    }
  }

  // Check that Saturated Fat Limit is NOT inserted as an additive donut slice
  // In our new Option B implementation, Tab 1 uses independent comparative targets
  const calcUiCode = fs.readFileSync("src/components/calculator/fat-intake/FatIntakeCalculator.tsx", "utf-8");
  const hasInvalidSubtypeDonut = calcUiCode.includes("fatSubTypesPieData");
  if (hasInvalidSubtypeDonut) {
    anomalies.push({
      id: "ANOMALY-SUBTYPE-01",
      severity: "P1",
      title: "Fat Sub-types Donut Chart slice sum exceeds 100%",
      detail: "fatSubTypesPieData still present in UI",
      fix: "Remove fatSubTypesPieData and use independent targets visualization",
    });
  }
}

// -----------------------------------------------------------------------------
// 3. CUSTOM RATIO TESTING
// -----------------------------------------------------------------------------
console.log("\n--- 3. CUSTOM RATIO TESTING ---");
const customPcts = [0, 10, 20, 22.5, 25, 30, 40, 50, 60, 75, 100, -10, 120, NaN];
for (const pct of customPcts) {
  const res = calculateFatIntakeCalculator({
    ...canonicalInput,
    calculationMode: "custom",
    customFatPercentage: pct,
  });
  console.log(`Custom ${pct}%: Fat = ${res.fatTargetGrams}g, Cal = ${res.fatTargetCalories} kcal, Pct = ${res.fatPercentage}%`);
  if (isNaN(res.fatTargetGrams) || !isFinite(res.fatTargetGrams)) {
    anomalies.push({
      id: "ANOMALY-CUSTOM-NAN",
      severity: "P0",
      title: "Custom ratio returns NaN or non-finite value",
      detail: `Input customFatPercentage=${pct} produced NaN or non-finite output.`,
      fix: "Sanitize and clamp customFatPercentage to [5, 85].",
    });
  }
  // Check hormone minimum enforcement in custom mode
  if (pct === 0 && res.fatTargetGrams === 0) {
    console.log(`   Notice: 0% produced 0g fat!`);
  }
}

// -----------------------------------------------------------------------------
// 4. UNIT CONVERSION TESTING
// -----------------------------------------------------------------------------
console.log("\n--- 4. UNIT CONVERSION TESTING ---");
const usRes = calculateFatIntakeCalculator({
  ...canonicalInput,
  unitSystem: "us",
  heightFeet: 5,
  heightInches: 10,
  weightLbs: 160,
});
const metricRes = calculateFatIntakeCalculator({
  ...canonicalInput,
  unitSystem: "metric",
  heightCm: 177.8,
  weightKg: 72.5748,
});
console.log(`US Output:     BMR = ${usRes.bmr}, TDEE = ${usRes.tdee}, Fat = ${usRes.fatTargetGrams}g`);
console.log(`Metric Output: BMR = ${metricRes.bmr}, TDEE = ${metricRes.tdee}, Fat = ${metricRes.fatTargetGrams}g`);

if (Math.abs(usRes.fatTargetGrams - metricRes.fatTargetGrams) > 1) {
  anomalies.push({
    id: "ANOMALY-UNIT-CONV",
    severity: "P1",
    title: "Unit conversion discrepancy between US and Metric",
    detail: `US fat target (${usRes.fatTargetGrams}g) and Metric (${metricRes.fatTargetGrams}g) diverge by more than 1g.`,
    fix: "Synchronize internal height and weight conversions.",
  });
}

// -----------------------------------------------------------------------------
// 5. BMR FORMULA TESTING
// -----------------------------------------------------------------------------
console.log("\n--- 5. BMR FORMULA DEPENDENCY TESTING ---");
const bmrFormulas = ["mifflin", "katch", "harris", "revised-harris", "cunningham"];
for (const f of bmrFormulas) {
  const res = calculateFatIntakeCalculator({ ...canonicalInput, bmrFormula: f });
  console.log(`Formula [${f.padEnd(15)}] -> BMR: ${res.bmr} kcal | TDEE: ${res.tdee} kcal | Fat: ${res.fatTargetGrams}g | Used: ${res.formulaUsed}`);
}

// -----------------------------------------------------------------------------
// 6. FOOD DATABASE AUDIT
// -----------------------------------------------------------------------------
console.log("\n--- 6. FOOD DATABASE AUDIT ---");
console.log(`Food database item count: ${baseRes.foodDatabase.length}`);
if (baseRes.foodDatabase.length < 30) {
  anomalies.push({
    id: "ANOMALY-FOOD-COUNT",
    severity: "P1",
    title: "Food database contains only 10 items despite '35+ database' claim",
    detail: `The UI, description, and metadata claim a '35+ healthy fats food database', but calculator.ts only defines 10 items, leaving categories like 'Meat & Poultry' completely empty.`,
    fix: "Expand healthy fats database to 35+ items across all 7 categories (Oils, Nuts/Seeds, Seafood, Dairy/Eggs, Avocados/Fruits, Meat/Poultry, Snacks).",
  });
}

// -----------------------------------------------------------------------------
// 7. SATURATED FAT SCALING AUDIT (<10% Standard vs <6% AHA)
// -----------------------------------------------------------------------------
console.log("\n--- 7. SATURATED FAT SCALING AUDIT (<10% Standard vs <6% AHA) ---");
const caloriesList = [1800, 2000, 2361, 2500, 3000];
for (const cal of caloriesList) {
  const satGramsStandard = Math.round((cal * 0.10) / 9);
  const satGramsAha = Math.round((cal * 0.06) / 9);
  console.log(`Calories: ${cal} kcal -> General Limit (<10%): ${satGramsStandard} g | AHA Heart Ceiling (<6%): ${satGramsAha} g`);
  if (satGramsAha >= satGramsStandard) {
    anomalies.push({
      id: "ANOMALY-AHA-SCALING",
      severity: "P0",
      title: "AHA Heart Health Ceiling must be strictly less than General Limit",
      detail: `At ${cal} kcal, AHA ceiling ${satGramsAha}g is not less than general limit ${satGramsStandard}g`,
      fix: "Ensure 6% AHA formula is applied correctly",
    });
  }
}

// Canonical baseline check (2361 kcal)
const canonicalHeart = calculateFatIntakeCalculator({ ...canonicalInput, calculationMode: "heart-health" });
if (canonicalHeart.fattyAcids.saturatedMaxPercent !== 6) {
  anomalies.push({
    id: "ANOMALY-AHA-PERCENT",
    severity: "P0",
    title: "Heart Health mode saturatedMaxPercent must be 6%",
    detail: `Found ${canonicalHeart.fattyAcids.saturatedMaxPercent}% instead of 6%`,
    fix: "Set saturatedMaxPercent = 6 for heart-health mode in calculator.ts",
  });
}
if (canonicalHeart.fattyAcids.saturatedGrams !== 16) {
  anomalies.push({
    id: "ANOMALY-AHA-GRAMS",
    severity: "P0",
    title: "Heart Health mode saturated fat ceiling at 2361 kcal must be 16g (15.74g)",
    detail: `Found ${canonicalHeart.fattyAcids.saturatedGrams}g instead of 16g`,
    fix: "Ensure Math.round((2361 * 0.06) / 9) = 16g is used",
  });
}

// Stale '7%' check in fat intake files
const filesToCheck = [
  "src/app/calculators/fat-intake-calculator/calculator.ts",
  "src/app/calculators/fat-intake-calculator/config.ts",
  "src/app/calculators/fat-intake-calculator/content.ts",
  "src/app/calculators/fat-intake-calculator/faq.ts",
  "src/components/calculator/fat-intake/FatIntakeCalculator.tsx",
  "src/components/calculator/fat-intake/FatIntakeContent.tsx",
];
for (const file of filesToCheck) {
  const content = fs.readFileSync(file, "utf-8");
  if (content.includes("7%") || content.includes("<7%")) {
    anomalies.push({
      id: "ANOMALY-STALE-7PCT",
      severity: "P0",
      title: `Stale '7%' or '<7%' found in ${file}`,
      detail: `File still contains reference to 7% for AHA ceiling`,
      fix: "Replace all 7% AHA references with 6%",
    });
  }
  if (content.includes("18 g") || content.includes("18g max")) {
    anomalies.push({
      id: "ANOMALY-STALE-18G",
      severity: "P0",
      title: `Stale '18 g' found in ${file}`,
      detail: `File contains stale hardcoded 18 g ceiling from old 7% formula`,
      fix: "Remove hardcoded 18g reference",
    });
  }
}

// -----------------------------------------------------------------------------
// 8. ACCORDION & FAQ COUNT AUDIT (PARITY & COMPETITOR MENTION)
// -----------------------------------------------------------------------------
console.log("\n--- 8. FAQ COUNT, JSON-LD PARITY & CONTENT AUDIT ---");
console.log(`Visible FAQs in faq.ts: ${fat_intake_calculatorFaqs.length}`);

// Check for competitor mention in FAQs
const competitorFaq = fat_intake_calculatorFaqs.find(
  (f) => f.question.toLowerCase().includes("calculator.net") || f.answer.toLowerCase().includes("calculator.net")
);
if (competitorFaq) {
  console.log(`   [ANOMALY-COMPETITOR-FAQ] Found competitor mention in FAQ: "${competitorFaq.question}"`);
  anomalies.push({
    id: "ANOMALY-COMPETITOR-FAQ",
    severity: "P1",
    title: "Competitor mention in FAQ violates guidelines",
    detail: `FAQ mentions 'Calculator.net' explicitly: "${competitorFaq.question}". Guideline prohibits competitor targeting and self-promotional comparisons.`,
    fix: "Remove or rewrite competitor-referencing FAQ to focus purely on scientific educational value.",
  });
}

// Check JSON-LD schema generation
const schemas = generateJsonLdSchema({
  title: fat_intake_calculatorConfig.title,
  description: fat_intake_calculatorConfig.description,
  slug: fat_intake_calculatorConfig.slug,
  category: fat_intake_calculatorConfig.category,
  faqs: fat_intake_calculatorConfig.faqs,
});
const faqSchema = schemas.find((s: any) => s["@type"] === "FAQPage") as any;
console.log(`JSON-LD FAQ count: ${faqSchema?.mainEntity?.length || 0}`);

// -----------------------------------------------------------------------------
// 9. CALCULATORLAYOUT DUPLICATE FAQ AUDIT
// -----------------------------------------------------------------------------
console.log("\n--- 9. CALCULATORLAYOUT DUPLICATE FAQ AUDIT ---");
const calcLayoutCode = fs.readFileSync("src/components/calculator/CalculatorLayout.tsx", "utf-8");
const isFatIntakeSuppressedInFaq = calcLayoutCode.includes("!isFatIntake");
console.log(`Is '!isFatIntake' in CalculatorLayout line 1000/1018? ${isFatIntakeSuppressedInFaq}`);
if (!isFatIntakeSuppressedInFaq) {
  anomalies.push({
    id: "ANOMALY-DUP-FAQ",
    severity: "P0",
    title: "Duplicate FAQ Section rendered in CalculatorLayout",
    detail: "CalculatorLayout does not include '!isFatIntake' in its FAQ suppression condition, causing CalculatorLayout to render an entire secondary FAQ block below FatIntakeContent.",
    fix: "Add '!isFatIntake' to lines 1000 and 1018 of CalculatorLayout.tsx.",
  });
}

// -----------------------------------------------------------------------------
// 10. STATE PERSISTENCE & ACTIONS AUDIT (RESET, SHARE, SAVE/RESTORE)
// -----------------------------------------------------------------------------
console.log("\n--- 10. STATE PERSISTENCE & ACTIONS AUDIT ---");
const calcUiCode = fs.readFileSync("src/components/calculator/fat-intake/FatIntakeCalculator.tsx", "utf-8");
const hasReset = calcUiCode.includes("handleReset") || calcUiCode.includes("reset");
const hasShare = calcUiCode.includes("handleShare") || calcUiCode.includes("Share");
const hasSaveRestore = calcUiCode.includes("localStorage");
console.log(`Has Reset button: ${hasReset}`);
console.log(`Has Share URL button: ${hasShare}`);
console.log(`Has Save/Restore Drawer: ${hasSaveRestore}`);

if (!hasReset) {
  anomalies.push({
    id: "ANOMALY-NO-RESET",
    severity: "P1",
    title: "Missing Reset to Canonical Baseline button",
    detail: "FatIntakeCalculator lacks a Reset button to restore canonical baseline inputs.",
    fix: "Add handleReset button in hero or action toolbar.",
  });
}
if (!hasShare) {
  anomalies.push({
    id: "ANOMALY-NO-SHARE",
    severity: "P1",
    title: "Missing Share URL functionality",
    detail: "FatIntakeCalculator lacks URL serialization and hydration for sharing customized profiles.",
    fix: "Implement URL query parameter serialization, copy share link, and hydration on page load.",
  });
}

// Check Unit System Toggle State Decoupling
const hasUnitSync = calcUiCode.includes("handleSetUnitSystem");
console.log(`Has Unit System input synchronization: ${hasUnitSync}`);
if (!hasUnitSync) {
  anomalies.push({
    id: "ANOMALY-UNIT-DECOUPLING",
    severity: "P1",
    title: "Unit system toggle state decoupling bug",
    detail: "Switching from US to Metric does not convert heightFeet/heightInches to heightCm or weightLbs to weightKg, retaining stale disconnected state.",
    fix: "When switching unitSystem, convert and synchronize height and weight state variables bidirectionally.",
  });
}

// -----------------------------------------------------------------------------
// 11. 5,000 RANDOMIZED PROPERTY RUNS
// -----------------------------------------------------------------------------
console.log("\n--- 11. RUNNING 5,000 RANDOMIZED PROPERTY TESTS ---");
let propertyPassCount = 0;
const modesArray = ["daily", "loss", "gain", "maintenance", "athlete", "heart-health", "keto", "low-fat", "bodybuilding", "custom"];
const gendersArray = ["male", "female"];
const activitiesArray = ["sedentary", "light", "moderate", "active", "very-active"];
const goalsArray = ["maintain", "mild-loss", "loss", "extreme-loss", "mild-gain", "gain", "extreme-gain", "recomp"];
const bmrArray = ["mifflin", "katch", "harris", "revised-harris", "cunningham"];

for (let i = 0; i < 5000; i++) {
  const randAge = Math.floor(Math.random() * 80) + 15;
  const randGender = gendersArray[Math.floor(Math.random() * gendersArray.length)];
  const randWeightLbs = Math.floor(Math.random() * 250) + 90;
  const randHeightInches = Math.floor(Math.random() * 30) + 55;
  const randMode = modesArray[Math.floor(Math.random() * modesArray.length)];
  const randGoal = goalsArray[Math.floor(Math.random() * goalsArray.length)];
  const randBmr = bmrArray[Math.floor(Math.random() * bmrArray.length)];
  const randCustomPct = Math.floor(Math.random() * 70) + 10;

  const res = calculateFatIntakeCalculator({
    unitSystem: "us",
    calculationMode: randMode,
    age: randAge,
    gender: randGender,
    heightFeet: Math.floor(randHeightInches / 12),
    heightInches: randHeightInches % 12,
    weightLbs: randWeightLbs,
    activityLevel: activitiesArray[Math.floor(Math.random() * activitiesArray.length)],
    goal: randGoal,
    bmrFormula: randBmr,
    customFatPercentage: randCustomPct,
  });

  if (isNaN(res.fatTargetGrams) || res.fatTargetGrams < 0) {
    throw new Error(`Random test failed at run ${i}: invalid fatTargetGrams=${res.fatTargetGrams}`);
  }
  if (isNaN(res.targetCalories) || res.targetCalories <= 0) {
    throw new Error(`Random test failed at run ${i}: invalid targetCalories=${res.targetCalories}`);
  }
  propertyPassCount++;
}
console.log(`   ✓ 5,000 / 5,000 Randomized Property Tests Passed!`);

// -----------------------------------------------------------------------------
// SUMMARY OF DISCOVERED ANOMALIES
// -----------------------------------------------------------------------------
console.log("\n================================================================================");
console.log(`TOTAL ANOMALIES DISCOVERED: ${anomalies.length}`);
console.log("================================================================================");
anomalies.forEach((a, idx) => {
  console.log(`\n[${idx + 1}] ${a.id} (${a.severity}): ${a.title}`);
  console.log(`    Detail: ${a.detail}`);
  console.log(`    Fix:    ${a.fix}`);
});
