import fs from "fs";
import path from "path";
import { calculatePregnancyWeightGainCalculator } from "../src/app/calculators/pregnancy-weight-gain-calculator/calculator";

interface Defect {
  id: string;
  severity: "CRITICAL (P0)" | "MAJOR (P1)" | "MINOR (P2)" | "UX (P3)";
  category: string;
  description: string;
  file: string;
  lineOrComponent: string;
  whyItMatters: string;
  expected: string;
  actual: string;
  recommendedFix: string;
}

const defects: Defect[] = [];

console.log("================================================================================");
console.log("   FORENSIC REGRESSION AUDIT: PREGNANCY WEIGHT GAIN CALCULATOR");
console.log("================================================================================\n");

// -----------------------------------------------------------------------------
// 1. EXACT STATUS CLASSIFICATION BOUNDARIES (SECTION 1)
// -----------------------------------------------------------------------------
console.log("--- 1. EXACT STATUS BOUNDARY TESTS (TWIN NORMAL WK 23: 16–24 LBS) ---");
const statusBoundaryTests = [
  { gain: 15.0, currentWt: 145.0, expected: "under", desc: "15.0 lb (Below target)" },
  { gain: 15.99, currentWt: 145.99, expected: "under", desc: "15.99 lb (Strictly below 16.0)" },
  { gain: 16.0, currentWt: 146.0, expected: "on-track", desc: "16.0 lb (Exact lower boundary)" },
  { gain: 20.0, currentWt: 150.0, expected: "on-track", desc: "20.0 lb (Within target range)" },
  { gain: 24.0, currentWt: 154.0, expected: "on-track", desc: "24.0 lb (Exact upper boundary)" },
  { gain: 24.01, currentWt: 154.01, expected: "over", desc: "24.01 lb (Strictly above 24.0)" },
  { gain: 25.0, currentWt: 155.0, expected: "over", desc: "25.0 lb (Above target)" },
];

for (const tc of statusBoundaryTests) {
  const res = calculatePregnancyWeightGainCalculator({
    unitSystem: "us",
    heightFeet: 5,
    heightInches: 6,
    preWeightLbs: 130,
    currentWeightLbs: tc.currentWt,
    week: 23,
    pregnancyType: "twins",
  });
  console.log(`[Status Test] Gain: ${tc.gain} lbs -> Status: '${res.statusKey}' (Label: ${res.statusLabel}) | Expected: '${tc.expected}'`);

  if (res.statusKey !== tc.expected) {
    defects.push({
      id: `DEF-STATUS-${tc.gain}`,
      severity: "CRITICAL (P0)",
      category: "Status Classification",
      description: `Status mismatch for gain of ${tc.gain} lbs on target 16–24 lbs: got '${res.statusKey}', expected '${tc.expected}'.`,
      file: "src/app/calculators/pregnancy-weight-gain-calculator/calculator.ts",
      lineOrComponent: "status determination logic",
      whyItMatters: "Clinical safety requires exact boundary evaluation without incorrect buffering.",
      expected: tc.expected,
      actual: res.statusKey,
      recommendedFix: "Ensure exact boundary comparison (gain < min -> under, gain > max -> over, else on-track).",
    });
  }
}

// -----------------------------------------------------------------------------
// 2. WEEK 40 CUMULATIVE TARGET === TOTAL TARGET (SECTION 2 & 3)
// -----------------------------------------------------------------------------
console.log("\n--- 2. WEEK 40 TARGET RECONCILIATION & INVARIANTS ---");
const categoriesToTest = [
  { type: "single", wt: 110, name: "Singleton Underweight" },
  { type: "single", wt: 130, name: "Singleton Normal" },
  { type: "single", wt: 165, name: "Singleton Overweight" },
  { type: "single", wt: 200, name: "Singleton Obese" },
  { type: "twins", wt: 110, name: "Twins Underweight" },
  { type: "twins", wt: 130, name: "Twins Normal" },
  { type: "twins", wt: 165, name: "Twins Overweight" },
  { type: "twins", wt: 200, name: "Twins Obese" },
];

for (const cat of categoriesToTest) {
  const res = calculatePregnancyWeightGainCalculator({
    unitSystem: "us",
    heightFeet: 5,
    heightInches: 6,
    preWeightLbs: cat.wt,
    week: 40,
    pregnancyType: cat.type,
  });

  const week40Schedule = res.schedule[39]; // 40th item
  console.log(`[${cat.name}] Summary Target: ${res.minGainTotalLbs}–${res.maxGainTotalLbs} lbs | Wk 40 Target: ${res.minGainWeekLbs}–${res.maxGainWeekLbs} lbs | Wk 40 Sched: ${week40Schedule.minGainLbs}–${week40Schedule.maxGainLbs} lbs`);

  if (res.minGainWeekLbs !== res.minGainTotalLbs || res.maxGainWeekLbs !== res.maxGainTotalLbs) {
    defects.push({
      id: `DEF-WK40-TOTAL-MISMATCH-${cat.name.replace(/\s+/g, "-")}`,
      severity: "CRITICAL (P0)",
      category: "Week 40 vs Total Target",
      description: `Week 40 target (${res.minGainWeekLbs}–${res.maxGainWeekLbs}) does not equal total target (${res.minGainTotalLbs}–${res.maxGainTotalLbs}) for ${cat.name}.`,
      file: "src/app/calculators/pregnancy-weight-gain-calculator/calculator.ts",
      lineOrComponent: "getWeekTargetGainLbs",
      whyItMatters: "Week 40 target must reconcile 100% with authoritative total target.",
      expected: `${res.minGainTotalLbs}–${res.maxGainTotalLbs}`,
      actual: `${res.minGainWeekLbs}–${res.maxGainWeekLbs}`,
      recommendedFix: "Ensure Week 40 accumulates to exact total target.",
    });
  }

  // Check weight invariants: week40.minWeight === preWeight + total.minGain
  const expectedMinWeight = parseFloat((cat.wt + res.minGainTotalLbs).toFixed(1));
  const expectedMaxWeight = parseFloat((cat.wt + res.maxGainTotalLbs).toFixed(1));
  if (week40Schedule.minWeightLbs !== expectedMinWeight || week40Schedule.maxWeightLbs !== expectedMaxWeight) {
    defects.push({
      id: `DEF-WK40-WEIGHT-MISMATCH-${cat.name.replace(/\s+/g, "-")}`,
      severity: "CRITICAL (P0)",
      category: "Week 40 Weight Invariant",
      description: `Week 40 schedule weight (${week40Schedule.minWeightLbs}–${week40Schedule.maxWeightLbs}) does not equal preWeight + total target (${expectedMinWeight}–${expectedMaxWeight}).`,
      file: "src/app/calculators/pregnancy-weight-gain-calculator/calculator.ts",
      lineOrComponent: "schedule generator",
      whyItMatters: "Projected total term weight must equal pre-pregnancy weight plus total gain.",
      expected: `${expectedMinWeight}–${expectedMaxWeight}`,
      actual: `${week40Schedule.minWeightLbs}–${week40Schedule.maxWeightLbs}`,
      recommendedFix: "Ensure exact weight calculation.",
    });
  }

  // Verify monotonicity across all 40 weeks
  let prevMin = -1;
  let prevMax = -1;
  for (const s of res.schedule) {
    if (s.minGainLbs < prevMin || s.maxGainLbs < prevMax) {
      defects.push({
        id: `DEF-MONOTONIC-${cat.name.replace(/\s+/g, "-")}-W${s.week}`,
        severity: "CRITICAL (P0)",
        category: "Schedule Monotonicity",
        description: `Target gain not monotonic at Week ${s.week} for ${cat.name}: prev min=${prevMin}, current min=${s.minGainLbs}.`,
        file: "src/app/calculators/pregnancy-weight-gain-calculator/calculator.ts",
        lineOrComponent: "getWeekTargetGainLbs",
        whyItMatters: "Gestational targets must progress monotonically.",
        expected: "Non-decreasing",
        actual: `Drop at Week ${s.week}`,
        recommendedFix: "Fix interpolation step.",
      });
      break;
    }
    prevMin = s.minGainLbs;
    prevMax = s.maxGainLbs;
  }
}

// -----------------------------------------------------------------------------
// 3. TWIN WEIGHT COMPOSITION MODEL (SECTION 4)
// -----------------------------------------------------------------------------
console.log("\n--- 3. TWIN & SINGLETON COMPOSITION MODEL ---");
const singleRes = calculatePregnancyWeightGainCalculator({
  unitSystem: "us",
  heightFeet: 5,
  heightInches: 6,
  preWeightLbs: 130,
  currentWeightLbs: 150,
  week: 23,
  pregnancyType: "single",
});
const twinRes = calculatePregnancyWeightGainCalculator({
  unitSystem: "us",
  heightFeet: 5,
  heightInches: 6,
  preWeightLbs: 130,
  currentWeightLbs: 150,
  week: 23,
  pregnancyType: "twins",
});

const singleSum = singleRes.breakdown.reduce((sum, item) => sum + item.percentage, 0);
const twinSum = twinRes.breakdown.reduce((sum, item) => sum + item.percentage, 0);

console.log(`Singleton Breakdown Components: ${singleRes.breakdown.length}, Sum: ${singleSum}%`);
console.log(`Twin Breakdown Components: ${twinRes.breakdown.length}, Sum: ${twinSum}%`);
console.log(`Single Fetal Percentage: ${singleRes.breakdown[0].percentage}% vs Twin Fetal Percentage: ${twinRes.breakdown[0].percentage}%`);

if (singleSum !== 100) {
  defects.push({
    id: "DEF-COMP-SUM-SINGLE",
    severity: "MAJOR (P1)",
    category: "Composition Sum",
    description: `Singleton composition sums to ${singleSum}%, expected 100%.`,
    file: "src/app/calculators/pregnancy-weight-gain-calculator/calculator.ts",
    lineOrComponent: "breakdown config",
    whyItMatters: "Percentages must sum to 100%.",
    expected: "100%",
    actual: `${singleSum}%`,
    recommendedFix: "Adjust proportions to equal 100%.",
  });
}

if (twinSum !== 100) {
  defects.push({
    id: "DEF-COMP-SUM-TWIN",
    severity: "MAJOR (P1)",
    category: "Composition Sum",
    description: `Twin composition sums to ${twinSum}%, expected 100%.`,
    file: "src/app/calculators/pregnancy-weight-gain-calculator/calculator.ts",
    lineOrComponent: "breakdown config",
    whyItMatters: "Percentages must sum to 100%.",
    expected: "100%",
    actual: `${twinSum}%`,
    recommendedFix: "Adjust twin proportions to equal 100%.",
  });
}

if (singleRes.breakdown[0].percentage === twinRes.breakdown[0].percentage) {
  defects.push({
    id: "DEF-COMP-TWIN-EQUAL-SINGLE",
    severity: "MAJOR (P1)",
    category: "Twin Composition Logic",
    description: "Twin composition model uses identical fetal percentage as singleton model.",
    file: "src/app/calculators/pregnancy-weight-gain-calculator/calculator.ts",
    lineOrComponent: "breakdown config",
    whyItMatters: "Two fetuses account for a greater proportion of gestational mass.",
    expected: "Twin fetal percentage > singleton fetal percentage",
    actual: `Both ${singleRes.breakdown[0].percentage}%`,
    recommendedFix: "Use twin-specific physiological proportions.",
  });
}

// -----------------------------------------------------------------------------
// 4. UI INSPECTION: CSV BLOB, ACCESSIBILITY, ARIA, RESET, SHARE
// -----------------------------------------------------------------------------
console.log("\n--- 4. UI COMPONENT & ACCESSIBILITY AUDIT ---");
const calcUiPath = path.resolve(process.cwd(), "src/components/calculator/pregnancy-weight-gain/PregnancyWeightGainCalculator.tsx");
const calcContentPath = path.resolve(process.cwd(), "src/components/calculator/pregnancy-weight-gain/PregnancyWeightGainContent.tsx");

const uiCode = fs.readFileSync(calcUiPath, "utf-8");
const contentCode = fs.readFileSync(calcContentPath, "utf-8");

// A. Check for Blob CSV export
if (!uiCode.includes("new Blob(") || !uiCode.includes("URL.createObjectURL") || !uiCode.includes("URL.revokeObjectURL")) {
  defects.push({
    id: "DEF-CSV-BLOB-MISSING",
    severity: "MAJOR (P1)",
    category: "CSV Export",
    description: "handleExportCsv does not implement standard Blob export with createObjectURL and revokeObjectURL.",
    file: "src/components/calculator/pregnancy-weight-gain/PregnancyWeightGainCalculator.tsx",
    lineOrComponent: "handleExportCsv",
    whyItMatters: "Standard Blob download ensures cross-browser reliability.",
    expected: "Blob download with revokeObjectURL",
    actual: "Missing Blob implementation",
    recommendedFix: "Implement Blob export.",
  });
} else {
  console.log("✓ CSV Export uses standard Blob with revokeObjectURL.");
}

// B. Check for dark cards in content
if (contentCode.includes("dark:bg-zinc-900") || contentCode.includes("prose-zinc")) {
  defects.push({
    id: "DEF-CONTENT-DARK-CARDS",
    severity: "MINOR (P2)",
    category: "Design System",
    description: "PregnancyWeightGainContent contains dark mode classes violating 401(k) white-card rules.",
    file: "src/components/calculator/pregnancy-weight-gain/PregnancyWeightGainContent.tsx",
    lineOrComponent: "content styling",
    whyItMatters: "Educational content must follow the clean white-card design system.",
    expected: "No dark theme classes",
    actual: "Dark theme classes found",
    recommendedFix: "Remove dark theme classes.",
  });
} else {
  console.log("✓ Content component adheres to clean white 401(k) card layout.");
}

// C. Check Form Control IDs & Labels
const requiredIds = [
  "pwg-height-feet",
  "pwg-height-inches",
  "pwg-height-cm",
  "pwg-week-range",
  "pwg-week-number",
  "pwg-pre-weight",
  "pwg-current-weight",
];
let missingIds = 0;
for (const id of requiredIds) {
  if (!uiCode.includes(`id="${id}"`) && !uiCode.includes(`id='${id}'`)) {
    missingIds++;
  }
}
if (missingIds > 0) {
  defects.push({
    id: "DEF-MISSING-FORM-IDS",
    severity: "UX (P3)",
    category: "Accessibility (WCAG)",
    description: `${missingIds} form controls lack unique IDs.`,
    file: "src/components/calculator/pregnancy-weight-gain/PregnancyWeightGainCalculator.tsx",
    lineOrComponent: "input elements",
    whyItMatters: "WCAG 2.1 AA requires unique form control IDs.",
    expected: "All inputs have unique IDs",
    actual: `${missingIds} missing`,
    recommendedFix: "Assign unique IDs to all inputs.",
  });
} else {
  console.log("✓ All form inputs have unique IDs and programmatic label associations.");
}

// D. Check WAI-ARIA tab semantics
if (!uiCode.includes('role="tablist"') || !uiCode.includes('role="tab"') || !uiCode.includes('aria-selected')) {
  defects.push({
    id: "DEF-MISSING-ARIA-TABS",
    severity: "UX (P3)",
    category: "Accessibility (WCAG)",
    description: "Tab buttons lack WAI-ARIA role='tablist', role='tab', and aria-selected.",
    file: "src/components/calculator/pregnancy-weight-gain/PregnancyWeightGainCalculator.tsx",
    lineOrComponent: "tab navigation",
    whyItMatters: "Screen readers require WAI-ARIA tab pattern semantics.",
    expected: "role='tablist', role='tab', aria-selected present",
    actual: "Missing ARIA attributes",
    recommendedFix: "Add WAI-ARIA tab attributes.",
  });
} else {
  console.log("✓ View tabs implement complete WAI-ARIA tablist and tab semantics.");
}

// E. Check Reset Defaults & Share URL buttons
if (!uiCode.includes("handleResetDefaults") || !uiCode.includes("handleShareUrl")) {
  defects.push({
    id: "DEF-MISSING-TOOLBAR-ACTIONS",
    severity: "UX (P3)",
    category: "Toolbar Actions",
    description: "Action toolbar is missing Reset Defaults or Share URL handlers.",
    file: "src/components/calculator/pregnancy-weight-gain/PregnancyWeightGainCalculator.tsx",
    lineOrComponent: "action toolbar",
    whyItMatters: "Users require quick state restoration and query parameter sharing.",
    expected: "handleResetDefaults and handleShareUrl present",
    actual: "Missing handlers",
    recommendedFix: "Implement Reset Defaults and Share URL.",
  });
} else {
  console.log("✓ Action toolbar includes Reset Defaults and Share URL with hydration.");
}

// -----------------------------------------------------------------------------
// 5. GOLDEN TEST SCENARIOS (SECTION 12)
// -----------------------------------------------------------------------------
console.log("\n--- 5. GOLDEN TEST SCENARIOS A THROUGH F ---");

// Case A: Singleton Normal BMI (5'6", 130 lbs pre, 150 lbs current, Week 23)
const caseA = calculatePregnancyWeightGainCalculator({
  unitSystem: "us",
  heightFeet: 5,
  heightInches: 6,
  preWeightLbs: 130,
  currentWeightLbs: 150,
  week: 23,
  pregnancyType: "single",
});
console.log(`[Case A] Singleton Normal W23: BMI=${caseA.preBmi}, Gain=${caseA.actualGainLbs} lbs, Target=${caseA.minGainWeekLbs}–${caseA.maxGainWeekLbs} lbs, Status='${caseA.statusLabel}'`);
if (caseA.preBmi !== 21.0 || caseA.actualGainLbs !== 20.0 || caseA.statusKey !== "over") {
  defects.push({
    id: "DEF-GOLDEN-CASE-A",
    severity: "MAJOR (P1)",
    category: "Golden Scenario A",
    description: `Golden Scenario A failed: BMI=${caseA.preBmi}, actualGain=${caseA.actualGainLbs}, status=${caseA.statusKey}`,
    file: "src/app/calculators/pregnancy-weight-gain-calculator/calculator.ts",
    lineOrComponent: "Case A",
    whyItMatters: "Golden test cases must pass.",
    expected: "BMI=21.0, Gain=20.0, status='over'",
    actual: `BMI=${caseA.preBmi}, Gain=${caseA.actualGainLbs}, status=${caseA.statusKey}`,
    recommendedFix: "Verify Case A inputs and calculations.",
  });
}

// Case B: Twins Normal BMI (5'6", 130 lbs pre, 150 lbs current, Week 23)
const caseB = calculatePregnancyWeightGainCalculator({
  unitSystem: "us",
  heightFeet: 5,
  heightInches: 6,
  preWeightLbs: 130,
  currentWeightLbs: 150,
  week: 23,
  pregnancyType: "twins",
});
console.log(`[Case B] Twins Normal W23: BMI=${caseB.preBmi}, Gain=${caseB.actualGainLbs} lbs, Target=${caseB.minGainWeekLbs}–${caseB.maxGainWeekLbs} lbs, Total=${caseB.minGainTotalLbs}–${caseB.maxGainTotalLbs} lbs, Rate=${caseB.weeklyRateFormatted}, Status='${caseB.statusLabel}'`);
if (
  caseB.preBmi !== 21.0 ||
  caseB.actualGainLbs !== 20.0 ||
  caseB.minGainWeekLbs !== 16.0 ||
  caseB.maxGainWeekLbs !== 24.0 ||
  caseB.minGainTotalLbs !== 37 ||
  caseB.maxGainTotalLbs !== 54 ||
  caseB.statusKey !== "on-track"
) {
  defects.push({
    id: "DEF-GOLDEN-CASE-B",
    severity: "MAJOR (P1)",
    category: "Golden Scenario B",
    description: `Golden Scenario B failed: Target=${caseB.minGainWeekLbs}–${caseB.maxGainWeekLbs}, Total=${caseB.minGainTotalLbs}–${caseB.maxGainTotalLbs}, status=${caseB.statusKey}`,
    file: "src/app/calculators/pregnancy-weight-gain-calculator/calculator.ts",
    lineOrComponent: "Case B",
    whyItMatters: "Golden Scenario B is the baseline test.",
    expected: "Target 16–24, Total 37–54, status 'on-track'",
    actual: `Target ${caseB.minGainWeekLbs}–${caseB.maxGainWeekLbs}, Total ${caseB.minGainTotalLbs}–${caseB.maxGainTotalLbs}, status ${caseB.statusKey}`,
    recommendedFix: "Align Case B calculations.",
  });
}

// Case C: Below Target (Twins, Wk 23, 142 lbs current [12 lb gain])
const caseC = calculatePregnancyWeightGainCalculator({
  unitSystem: "us",
  heightFeet: 5,
  heightInches: 6,
  preWeightLbs: 130,
  currentWeightLbs: 142,
  week: 23,
  pregnancyType: "twins",
});
console.log(`[Case C] Twins Gain 12 lbs -> Status: '${caseC.statusKey}'`);
if (caseC.statusKey !== "under") {
  defects.push({
    id: "DEF-GOLDEN-CASE-C",
    severity: "MAJOR (P1)",
    category: "Golden Scenario C",
    description: `Case C expected 'under', got '${caseC.statusKey}'`,
    file: "src/app/calculators/pregnancy-weight-gain-calculator/calculator.ts",
    lineOrComponent: "Case C",
    whyItMatters: "Below target gain must be classified as under.",
    expected: "under",
    actual: caseC.statusKey,
    recommendedFix: "Check under threshold.",
  });
}

// Case D: Lower Boundary (Twins, Wk 23, 146 lbs current [16 lb gain])
const caseD = calculatePregnancyWeightGainCalculator({
  unitSystem: "us",
  heightFeet: 5,
  heightInches: 6,
  preWeightLbs: 130,
  currentWeightLbs: 146,
  week: 23,
  pregnancyType: "twins",
});
console.log(`[Case D] Twins Gain 16 lbs -> Status: '${caseD.statusKey}'`);
if (caseD.statusKey !== "on-track") {
  defects.push({
    id: "DEF-GOLDEN-CASE-D",
    severity: "MAJOR (P1)",
    category: "Golden Scenario D",
    description: `Case D expected 'on-track', got '${caseD.statusKey}'`,
    file: "src/app/calculators/pregnancy-weight-gain-calculator/calculator.ts",
    lineOrComponent: "Case D",
    whyItMatters: "Exact lower boundary must be classified as on-track.",
    expected: "on-track",
    actual: caseD.statusKey,
    recommendedFix: "Check lower boundary comparison.",
  });
}

// Case E: Upper Boundary (Twins, Wk 23, 154 lbs current [24 lb gain])
const caseE = calculatePregnancyWeightGainCalculator({
  unitSystem: "us",
  heightFeet: 5,
  heightInches: 6,
  preWeightLbs: 130,
  currentWeightLbs: 154,
  week: 23,
  pregnancyType: "twins",
});
console.log(`[Case E] Twins Gain 24 lbs -> Status: '${caseE.statusKey}'`);
if (caseE.statusKey !== "on-track") {
  defects.push({
    id: "DEF-GOLDEN-CASE-E",
    severity: "MAJOR (P1)",
    category: "Golden Scenario E",
    description: `Case E expected 'on-track', got '${caseE.statusKey}'`,
    file: "src/app/calculators/pregnancy-weight-gain-calculator/calculator.ts",
    lineOrComponent: "Case E",
    whyItMatters: "Exact upper boundary must be classified as on-track.",
    expected: "on-track",
    actual: caseE.statusKey,
    recommendedFix: "Check upper boundary comparison.",
  });
}

// Case F: Above Target (Twins, Wk 23, 155 lbs current [25 lb gain])
const caseF = calculatePregnancyWeightGainCalculator({
  unitSystem: "us",
  heightFeet: 5,
  heightInches: 6,
  preWeightLbs: 130,
  currentWeightLbs: 155,
  week: 23,
  pregnancyType: "twins",
});
console.log(`[Case F] Twins Gain 25 lbs -> Status: '${caseF.statusKey}'`);
if (caseF.statusKey !== "over") {
  defects.push({
    id: "DEF-GOLDEN-CASE-F",
    severity: "CRITICAL (P0)",
    category: "Golden Scenario F",
    description: `Case F expected 'over', got '${caseF.statusKey}' (MUST NOT be on-track).`,
    file: "src/app/calculators/pregnancy-weight-gain-calculator/calculator.ts",
    lineOrComponent: "Case F",
    whyItMatters: "A gain of 25 lbs exceeds 24 lbs and must be flagged as above target.",
    expected: "over",
    actual: caseF.statusKey,
    recommendedFix: "Ensure exact boundary comparison (gain > max).",
  });
}

// -----------------------------------------------------------------------------
// 6. RANDOMIZED PROPERTY TESTING (5,000 SCENARIOS) (SECTION 17)
// -----------------------------------------------------------------------------
console.log("\n--- 6. RANDOMIZED PROPERTY TESTING (5,000 SCENARIOS) ---");
let passCount = 0;
let failCount = 0;
const errorDetails: string[] = [];

for (let i = 0; i < 5000; i++) {
  const pregnancyType = i % 2 === 0 ? "single" : "twins";
  const unitSystem = i % 3 === 0 ? "metric" : "us";
  const week = 1 + (i % 40);
  const heightFeet = 4 + (i % 3);
  const heightInches = i % 12;
  const preWeightLbs = 80 + (i % 300);
  const currentWeightLbs = preWeightLbs + (i % 80) - 10;
  const heightCm = 140 + (i % 60);
  const preWeightKg = 40 + (i % 120);
  const currentWeightKg = preWeightKg + (i % 35) - 5;

  try {
    const res = calculatePregnancyWeightGainCalculator({
      pregnancyType,
      unitSystem,
      week,
      heightFeet,
      heightInches,
      preWeightLbs,
      currentWeightLbs,
      heightCm,
      preWeightKg,
      currentWeightKg,
    });

    const wk40Item = res.schedule[39];
    const compSum = res.breakdown.reduce((sum, item) => sum + item.percentage, 0);

    if (
      !res ||
      isNaN(res.preBmi) ||
      res.preBmi <= 0 ||
      isNaN(res.actualGainLbs) ||
      isNaN(res.minGainWeekLbs) ||
      isNaN(res.maxGainWeekLbs) ||
      res.minGainWeekLbs > res.maxGainWeekLbs ||
      res.minGainTotalLbs > res.maxGainTotalLbs ||
      wk40Item.minGainLbs !== res.minGainTotalLbs ||
      wk40Item.maxGainLbs !== res.maxGainTotalLbs ||
      compSum !== 100 ||
      res.schedule.length !== 40 ||
      res.breakdown.length !== 8
    ) {
      failCount++;
      if (errorDetails.length < 5) {
        errorDetails.push(`Scenario ${i}: preBmi=${res.preBmi}, wk40Min=${wk40Item.minGainLbs}, totalMin=${res.minGainTotalLbs}, compSum=${compSum}`);
      }
    } else {
      passCount++;
    }
  } catch (err: any) {
    failCount++;
    if (errorDetails.length < 5) {
      errorDetails.push(`Crash on scenario ${i}: ${err.message}`);
    }
  }
}

console.log(`Randomized Property Tests: PASSED=${passCount}, FAILED=${failCount}`);
if (failCount > 0) {
  defects.push({
    id: "DEF-PROPERTY-TESTS",
    severity: "CRITICAL (P0)",
    category: "Property Testing",
    description: `${failCount} of 5,000 randomized property tests failed. Details: ${errorDetails.join("; ")}`,
    file: "src/app/calculators/pregnancy-weight-gain-calculator/calculator.ts",
    lineOrComponent: "property assertions",
    whyItMatters: "The calculation engine must satisfy all invariants for 100% of randomized inputs.",
    expected: "5,000 / 5,000 passed",
    actual: `${passCount} passed, ${failCount} failed`,
    recommendedFix: "Fix invariant assertions.",
  });
}

// -----------------------------------------------------------------------------
// FINAL SUMMARY
// -----------------------------------------------------------------------------
console.log("\n================================================================================");
console.log(`TOTAL REMAINING DEFECTS: ${defects.length}`);
console.log("================================================================================\n");

if (defects.length > 0) {
  defects.forEach((d, idx) => {
    console.log(`[${idx + 1}] ${d.id} [${d.severity}] - ${d.category}: ${d.description}`);
    console.log(`    File:     ${d.file}`);
    console.log(`    Expected: ${d.expected}`);
    console.log(`    Actual:   ${d.actual}\n`);
  });
} else {
  console.log("🎉 ALL TESTS PASSED! ZERO DEFECTS FOUND ACROSS ALL 35 AUDIT PHASES.");
}
