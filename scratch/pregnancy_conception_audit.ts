import fs from "fs";
import path from "path";
import { calculatePregnancyConceptionCalculator } from "../src/app/calculators/pregnancy-conception-calculator/calculator";

console.log("================================================================================");
console.log("   FORENSIC AUDIT: PREGNANCY CONCEPTION CALCULATOR (/calculators/pregnancy-conception-calculator)");
console.log("================================================================================\n");

let defects: { id: string; sev: string; desc: string; expected: string; actual: string }[] = [];

// 1. CANONICAL BASELINE
console.log("--- 1. CANONICAL BASELINE CHECK ---");
const canonical = calculatePregnancyConceptionCalculator({
  calculationMode: "lmp",
  lmpDate: "2026-01-01",
  cycleLength: 28,
  lutealPhaseLength: 14,
  motherAge: 28,
});

console.log("Estimated Conception:", canonical.estimatedConceptionDateFormatted, `(${canonical.estimatedConceptionDate})`);
console.log("Estimated Ovulation:", canonical.estimatedOvulationDateFormatted);
console.log("Estimated Due Date:", canonical.estimatedDueDateFormatted, `(${canonical.estimatedDueDate})`);
console.log("LMP Date:", canonical.lmpDateFormatted);
console.log("Fertile Window:", canonical.fertileWindowStartFormatted, "–", canonical.fertileWindowEndFormatted);
console.log("Fertile Window Formatted:", canonical.fertileWindowFormatted);
console.log("Implantation Window:", canonical.implantationWindowStartFormatted, "–", canonical.implantationWindowEndFormatted);

if (canonical.estimatedConceptionDateFormatted !== "Jan 15, 2026") {
  defects.push({
    id: "DEF-CANON-01",
    sev: "P1",
    desc: "Canonical conception date mismatch",
    expected: "Jan 15, 2026",
    actual: canonical.estimatedConceptionDateFormatted,
  });
}

if (canonical.estimatedDueDateFormatted !== "Oct 8, 2026") {
  defects.push({
    id: "DEF-CANON-02",
    sev: "P1",
    desc: "Canonical due date mismatch",
    expected: "Oct 8, 2026",
    actual: canonical.estimatedDueDateFormatted,
  });
}

// CHECK FERTILE WINDOW: Must be Jan 10 through Jan 15 (6 days: O-5 to O)
if (canonical.fertileWindowStartFormatted !== "Jan 10, 2026" || canonical.fertileWindowEndFormatted !== "Jan 15, 2026") {
  defects.push({
    id: "DEF-CANON-03",
    sev: "P1",
    desc: "Fertile window includes O+1 (7 days) instead of 6 days (O-5 to O)",
    expected: "Jan 10, 2026 – Jan 15, 2026 (6 calendar days)",
    actual: `${canonical.fertileWindowStartFormatted} – ${canonical.fertileWindowEndFormatted}`,
  });
}

// 2. DUE DATE REVERSE CALCULATION ROUND-TRIP
console.log("\n--- 2. DUE DATE REVERSE CALCULATION ROUND-TRIP ---");
const ddRes = calculatePregnancyConceptionCalculator({
  calculationMode: "due-date",
  dueDate: "2026-10-08",
  cycleLength: 28,
  lutealPhaseLength: 14,
});
console.log("Due Date Input: 2026-10-08");
console.log("Derived Conception:", ddRes.estimatedConceptionDateFormatted);
console.log("Derived LMP:", ddRes.lmpDateFormatted);
console.log("Derived EDD:", ddRes.estimatedDueDateFormatted);

// Round trip: Feed derived LMP back to LMP mode
const roundTripLmp = calculatePregnancyConceptionCalculator({
  calculationMode: "lmp",
  lmpDate: ddRes.estimatedConceptionDate, // wait, LMP
  cycleLength: 28,
  lutealPhaseLength: 14,
});

// Non-standard cycle round trip (Cycle = 35d, Luteal = 14d)
const dd35 = calculatePregnancyConceptionCalculator({
  calculationMode: "due-date",
  dueDate: "2026-10-08",
  cycleLength: 35,
  lutealPhaseLength: 14,
});
console.log("\nDue Date with 35-day cycle:");
console.log("Derived Conception:", dd35.estimatedConceptionDateFormatted);
console.log("Derived LMP:", dd35.lmpDateFormatted);

// In 35-day cycle with 14d luteal, conception is Day 21 post-LMP.
// If conception is Jan 15, LMP should be Jan 15 - 21 days = Dec 25, 2025.
// Let's check what dd35.lmpDateFormatted gives:
console.log("Expected LMP for 35d cycle (Conception Jan 15 - 21d): Dec 25, 2025. Actual:", dd35.lmpDateFormatted);
if (dd35.lmpDateFormatted !== "Dec 25, 2025") {
  defects.push({
    id: "DEF-CALC-01",
    sev: "P1",
    desc: "Due Date mode hardcodes LMP to EDD - 280 days, ignoring custom cycleLength and lutealPhaseLength",
    expected: "LMP = Conception - (cycleLength - lutealPhaseLength) = Dec 25, 2025",
    actual: dd35.lmpDateFormatted,
  });
}

// 3. ULTRASOUND MODE CYCLE SENSITIVITY
console.log("\n--- 3. ULTRASOUND MODE CYCLE SENSITIVITY ---");
const us35 = calculatePregnancyConceptionCalculator({
  calculationMode: "ultrasound",
  ultrasoundDate: "2026-03-01",
  ultrasoundWeeks: 10,
  ultrasoundDays: 2,
  cycleLength: 35,
  lutealPhaseLength: 14,
});
console.log("Ultrasound 35d cycle -> Conception:", us35.estimatedConceptionDateFormatted, "LMP:", us35.lmpDateFormatted);
// In calculator.ts line 80: estimatedConceptionDate = addDays(estimatedLmpDate, 14); (hardcoded 14!)
if (us35.estimatedConceptionDateFormatted) {
  // Let's check if calculator.ts line 80 hardcodes 14
  const usCalcFile = fs.readFileSync(path.resolve(process.cwd(), "src/app/calculators/pregnancy-conception-calculator/calculator.ts"), "utf-8");
  if (usCalcFile.includes("estimatedConceptionDate = addDays(estimatedLmpDate, 14);")) {
    defects.push({
      id: "DEF-CALC-02",
      sev: "P1",
      desc: "Ultrasound mode hardcodes conception to LMP + 14 days, ignoring custom cycle length and luteal phase",
      expected: "Conception = LMP + (cycleLength - lutealPhaseLength)",
      actual: "Hardcoded LMP + 14",
    });
  }
}

// 4. TIMEZONE SENSITIVITY IN PARSING
console.log("\n--- 4. TIMEZONE DATE PARSING ---");
const calcCode = fs.readFileSync(path.resolve(process.cwd(), "src/app/calculators/pregnancy-conception-calculator/calculator.ts"), "utf-8");
if (calcCode.includes("const parsed = new Date(val);")) {
  defects.push({
    id: "DEF-DATE-01",
    sev: "P0",
    desc: "Timezone bug: parseInputDate uses new Date(val) which parses YYYY-MM-DD as UTC midnight, shifting dates in Western hemisphere",
    expected: "Local calendar-date parsing (split YYYY-MM-DD and construct at midday 12:00)",
    actual: "new Date(val)",
  });
}
if (calcCode.includes("d.toISOString().split(\"T\")[0]")) {
  defects.push({
    id: "DEF-DATE-02",
    sev: "P0",
    desc: "Timezone bug: formatIso uses toISOString() which shifts local dates across UTC boundaries",
    expected: "Local formatIso: `${y}-${m}-${day}`",
    actual: "d.toISOString().split('T')[0]",
  });
}

// 5. MISSING RESET DEFAULTS & SHARE URL IN TOOLBAR
console.log("\n--- 5. RESET DEFAULTS & SHARE URL ---");
const uiCode = fs.readFileSync(path.resolve(process.cwd(), "src/components/calculator/pregnancy-conception/PregnancyConceptionCalculator.tsx"), "utf-8");
if (!uiCode.includes("Reset Defaults")) {
  defects.push({
    id: "DEF-UI-01",
    sev: "P2",
    desc: "Toolbar is missing 'Reset Defaults' action button",
    expected: "Reset Defaults button restoring canonical baseline state",
    actual: "Missing",
  });
}
if (!uiCode.includes("Share URL") && !uiCode.includes("handleShareUrl")) {
  defects.push({
    id: "DEF-UI-02",
    sev: "P2",
    desc: "Toolbar is missing 'Share URL' action button and query param serialization/hydration",
    expected: "Share URL serializing all inputs to searchParams and hydrating on mount",
    actual: "Missing",
  });
}

// 6. CSV EXPORT METHOD (DATA URI VS BLOB)
console.log("\n--- 6. CSV EXPORT IMPLEMENTATION ---");
if (uiCode.includes("data:text/csv;charset=utf-8,")) {
  defects.push({
    id: "DEF-EXP-01",
    sev: "P2",
    desc: "CSV export uses data: URI instead of standard Blob object with URL.createObjectURL and URL.revokeObjectURL",
    expected: "Blob-based export with RFC-4180 escaping",
    actual: "data:text/csv;charset=utf-8 URI",
  });
}

// 7. ACCESSIBILITY: MISSING HTMLFOR AND IDS
console.log("\n--- 7. ACCESSIBILITY LABELS & IDS ---");
if (!uiCode.includes("htmlFor=\"preg-due-date\"") && !uiCode.includes("id=\"preg-due-date\"")) {
  defects.push({
    id: "DEF-A11Y-01",
    sev: "P2",
    desc: "Form controls lack explicit unique id and matching <label htmlFor=...>",
    expected: "Accessible unique ids and label htmlFor attributes on all inputs and sliders",
    actual: "Missing id and htmlFor associations",
  });
}

// 8. UNSUBSTANTIATED ACCURACY CLAIMS (YMYL CLINICAL AUDIT)
console.log("\n--- 8. YMYL CLINICAL CLAIMS AUDIT ---");
if (calcCode.includes(">99% clinical accuracy") || uiCode.includes(">99% accuracy")) {
  defects.push({
    id: "DEF-MED-01",
    sev: "P1",
    desc: "Unsubstantiated clinical claim '>99% accuracy' for over-the-counter urine hCG tests without test context/source",
    expected: "Evidence-based cautious language: e.g. 'High clinical sensitivity around the day of missed period'",
    actual: ">99% accuracy / >99% clinical accuracy",
  });
}

// 9. CALCULATORLAYOUT DUPLICATE FAQ GUARD
console.log("\n--- 9. CALCULATORLAYOUT FAQ GUARD ---");
const layoutCode = fs.readFileSync(path.resolve(process.cwd(), "src/components/calculator/CalculatorLayout.tsx"), "utf-8");
if (!layoutCode.includes("!isPregnancyConception")) {
  defects.push({
    id: "DEF-LAYOUT-01",
    sev: "P2",
    desc: "CalculatorLayout.tsx lines 1000 and 1018 lack !isPregnancyConception guard, risking duplicate FAQ rendering",
    expected: "!isPregnancyConception added to lines 1000 and 1018",
    actual: "Missing !isPregnancyConception",
  });
}

// 10. CONTENT FORMAT: ZERO DARK CARDS & 401(K) STYLE
console.log("\n--- 10. CONTENT COMPONENT STYLING ---");
const contentCode = fs.readFileSync(path.resolve(process.cwd(), "src/components/calculator/pregnancy-conception/PregnancyConceptionContent.tsx"), "utf-8");
if (contentCode.includes("dark:bg-zinc-900") || contentCode.includes("prose-zinc")) {
  console.log("Notice: PregnancyConceptionContent uses generic prose-zinc / dark:bg-zinc-900 rather than clean 401(k) white cards.");
}

console.log("\n================================================================================");
console.log(`TOTAL DEFECTS DETECTED: ${defects.length}`);
defects.forEach((d, i) => {
  console.log(`\n[${i + 1}] ${d.id} (${d.sev}): ${d.desc}`);
  console.log(`    Expected: ${d.expected}`);
  console.log(`    Actual:   ${d.actual}`);
});
console.log("================================================================================");
