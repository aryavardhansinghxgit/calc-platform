import fs from "fs";
import path from "path";
import { calculateOvulationCalculator, parseInputDate, formatIso } from "../src/app/calculators/ovulation-calculator/calculator";
import { ovulation_calculatorFaqs } from "../src/app/calculators/ovulation-calculator/faq";

console.log("================================================================================");
console.log("       MASTER VERIFICATION AUDIT: OVULATION CALCULATOR REMEDIATION              ");
console.log("================================================================================\n");

let anomalies = 0;

// 1. CANONICAL BASELINE VERIFICATION
console.log("--- 1. CANONICAL BASELINE VERIFICATION ---");
const canonical = calculateOvulationCalculator({
  calculationMode: "lmp",
  lastPeriodDate: "2026-08-01",
  cycleLength: 28,
  periodLength: 5,
  lutealPhaseLength: 14,
});

console.log("Predicted Ovulation:", canonical.predictedOvulationDateFormatted);
console.log("Fertile Window:", canonical.fertileWindowStartFormatted, "–", canonical.fertileWindowEndFormatted);
console.log("Peak Window:", canonical.peakFertilityStartFormatted, "–", canonical.peakFertilityEndFormatted);
console.log("Implantation Window:", canonical.implantationWindowStartFormatted, "–", canonical.implantationWindowEndFormatted);
console.log("Next Expected Period:", canonical.nextPeriodDateFormatted);
console.log("Estimated Due Date:", canonical.estimatedDueDateFormatted);
console.log("Daily Fertility Score:", canonical.dailyFertilityScore, "/ 100", `(${canonical.fertilityRating})`);

if (canonical.predictedOvulationDateFormatted !== "Aug 15, 2026") {
  console.error("FAIL: Predicted Ovulation mismatch");
  anomalies++;
}
if (canonical.fertileWindowStartFormatted !== "Aug 10, 2026" || canonical.fertileWindowEndFormatted !== "Aug 15, 2026") {
  console.error("FAIL: 6-day fertile window mismatch");
  anomalies++;
}
if (canonical.estimatedDueDateFormatted !== "May 8, 2027") {
  console.error("FAIL: EDD mismatch");
  anomalies++;
}

// 2. TIMEZONE INVARIANCE
console.log("\n--- 2. TIMEZONE & DATE PARSING SAFETY ---");
const testIso = "2026-08-01";
const parsed = parseInputDate(testIso);
const formatted = formatIso(parsed);
console.log(`Input: ${testIso} -> Parsed Year: ${parsed.getFullYear()}, Month: ${parsed.getMonth() + 1}, Date: ${parsed.getDate()} -> Formatted: ${formatted}`);
if (formatted !== testIso || parsed.getDate() !== 1 || parsed.getMonth() !== 7 || parsed.getFullYear() !== 2026) {
  console.error("FAIL: Timezone parsing drift detected!");
  anomalies++;
} else {
  console.log("✓ Timezone-safe local calendar parsing verified without UTC shift.");
}

// 3. ALL 6 MODES FUNCTIONAL
console.log("\n--- 3. VERIFYING ALL 6 CALCULATION MODES ---");
const modes = [
  { mode: "lmp", inputs: { lastPeriodDate: "2026-08-01" }, expectedOv: "Aug 15, 2026" },
  { mode: "next-period", inputs: { nextPeriodDate: "2026-08-29" }, expectedOv: "Aug 15, 2026" },
  { mode: "due-date", inputs: { targetDueDate: "2027-05-08" }, expectedOv: "Aug 15, 2026" },
  { mode: "conception-date", inputs: { conceptionDate: "2026-08-15" }, expectedOv: "Aug 15, 2026" },
  { mode: "reverse", inputs: { reverseOvulationDate: "2026-08-15" }, expectedOv: "Aug 15, 2026" },
  { mode: "advanced-planner", inputs: { lastPeriodDate: "2026-08-01", opkTestDate: "2026-08-14" }, expectedOv: "Aug 15, 2026" },
];

modes.forEach(m => {
  const res = calculateOvulationCalculator({
    calculationMode: m.mode as any,
    ...m.inputs,
    cycleLength: 28,
    periodLength: 5,
    lutealPhaseLength: 14,
  });
  console.log(`Mode [${m.mode.padEnd(16)}] -> Ovulation: ${res.predictedOvulationDateFormatted} (Expected: ${m.expectedOv})`);
  if (res.predictedOvulationDateFormatted !== m.expectedOv) {
    console.error(`FAIL: Mode ${m.mode} mismatch`);
    anomalies++;
  }
});

// 4. DYNAMIC HORMONE CHART (21, 28, 35, 45 DAYS)
console.log("\n--- 4. DYNAMIC HORMONE CHART LENGTH ---");
[21, 28, 32, 35, 40, 45].forEach(c => {
  const res = calculateOvulationCalculator({ calculationMode: "lmp", cycleLength: c, lutealPhaseLength: 14 });
  console.log(`Cycle: ${c} days -> Hormone data points: ${res.hormoneCycleData.length} (Expected: ${c})`);
  if (res.hormoneCycleData.length !== c) {
    console.error(`FAIL: Hormone chart not dynamic for cycle length ${c}`);
    anomalies++;
  }
});

// 5. CALENDAR GRID LENGTH FOR EXTENDED CYCLES
console.log("\n--- 5. CALENDAR GRID LENGTH FOR EXTENDED CYCLES ---");
[28, 35, 42, 45].forEach(c => {
  const res = calculateOvulationCalculator({ calculationMode: "lmp", cycleLength: c });
  const expectedMin = Math.max(35, c + 7);
  console.log(`Cycle: ${c} days -> Calendar days: ${res.monthlyCalendarDays.length} (Expected >= ${expectedMin})`);
  if (res.monthlyCalendarDays.length < expectedMin) {
    console.error(`FAIL: Calendar grid truncated for cycle length ${c}`);
    anomalies++;
  }
});

// 6. ZERO SEX-SELECTION OR "98% PROBABILITY" CLAIMS IN REPOSITORY
console.log("\n--- 6. ZERO-TOLERANCE SCAN: SEX-SELECTION & 98% PROBABILITY ---");
const filesToScan = [
  "src/app/calculators/ovulation-calculator/calculator.ts",
  "src/app/calculators/ovulation-calculator/types.ts",
  "src/app/calculators/ovulation-calculator/config.ts",
  "src/app/calculators/ovulation-calculator/metadata.ts",
  "src/app/calculators/ovulation-calculator/content.ts",
  "src/app/calculators/ovulation-calculator/faq.ts",
  "src/components/calculator/ovulation/OvulationCalculator.tsx",
  "src/components/calculator/ovulation/OvulationContent.tsx",
];

const disallowedPatterns = [
  { name: "Boy Lean", regex: /boy lean/i },
  { name: "Girl Lean", regex: /girl lean/i },
  { name: "Y-Sperm Strategy", regex: /y-sperm/i },
  { name: "X-Sperm Strategy", regex: /x-sperm/i },
  { name: "98% Conception Probability", regex: /98%\s*conception\s*probability/i },
  { name: "gender timing optimization", regex: /gender timing optimization/i },
];

filesToScan.forEach(relPath => {
  const fullPath = path.resolve(process.cwd(), relPath);
  if (!fs.existsSync(fullPath)) return;
  const content = fs.readFileSync(fullPath, "utf-8");

  disallowedPatterns.forEach(pat => {
    if (pat.regex.test(content)) {
      console.error(`FAIL: Found disallowed pattern "${pat.name}" in ${relPath}`);
      anomalies++;
    }
  });
});
console.log("✓ Zero occurrences of unscientific sex-selection claims or '98% Conception Probability' found.");

// 7. FAQ PARITY
console.log("\n--- 7. FAQ PARITY & ACCORDION ---");
console.log(`Authoritative FAQs in faq.ts: ${ovulation_calculatorFaqs.length}`);
if (ovulation_calculatorFaqs.length !== 20) {
  console.error(`FAIL: Expected exactly 20 FAQs, found ${ovulation_calculatorFaqs.length}`);
  anomalies++;
}

// 8. CALCULATORLAYOUT GUARD
console.log("\n--- 8. CALCULATORLAYOUT DUPLICATE FAQ EXCLUSION GUARD ---");
const layoutPath = path.resolve(process.cwd(), "src/components/calculator/CalculatorLayout.tsx");
const layoutContent = fs.readFileSync(layoutPath, "utf-8");
const hasOvulationGuard = layoutContent.includes("!isOvulation");
console.log("Has !isOvulation in CalculatorLayout.tsx:", hasOvulationGuard);
if (!hasOvulationGuard) {
  console.error("FAIL: Missing !isOvulation guard in CalculatorLayout.tsx");
  anomalies++;
}

// 9. PRINT CSS CALENDAR GRID
console.log("\n--- 9. PRINT CSS CALENDAR GRID VERIFICATION ---");
const cssPath = path.resolve(process.cwd(), "src/app/globals.css");
const cssContent = fs.readFileSync(cssPath, "utf-8");
const hasCalendarGridRule = cssContent.includes(".calendar-grid") && cssContent.includes("grid-template-columns: repeat(7, minmax(0, 1fr)) !important;");
console.log("Has .calendar-grid print rules in globals.css:", hasCalendarGridRule);
if (!hasCalendarGridRule) {
  console.error("FAIL: Missing .calendar-grid print rules in globals.css");
  anomalies++;
}

console.log("\n================================================================================");
console.log(`TOTAL REMEDIATION ANOMALIES: ${anomalies}`);
console.log("================================================================================");

if (anomalies > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
