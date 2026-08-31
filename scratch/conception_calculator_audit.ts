import fs from "fs";
import path from "path";
import { calculateConceptionCalculator, parseInputDate } from "../src/app/calculators/conception-calculator/calculator";

console.log("================================================================================");
console.log("   FORENSIC AUDIT: CONCEPTION CALCULATOR (/calculators/conception-calculator)");
console.log("================================================================================\n");

interface Defect {
  id: string;
  severity: "CRITICAL (P0)" | "MAJOR (P1)" | "MINOR (P2)" | "UX (P3)";
  category: string;
  description: string;
  expected: string;
  actual: string;
}

const defects: Defect[] = [];

// 1. CANONICAL BASELINE & FERTILE WINDOW (PHASE 1 & 2)
console.log("--- 1. CANONICAL BASELINE & FERTILE WINDOW ---");
const canonical = calculateConceptionCalculator({
  calculationMode: "lmp",
  lmpDate: "2026-01-01",
  cycleLength: 28,
  periodLength: 5,
  lutealPhaseLength: 14,
  motherAge: 28,
});

console.log("Mode:                   ", canonical.mode);
console.log("Estimated Ovulation:    ", canonical.ovulationDate);
console.log("Estimated Conception:   ", canonical.conceptionDate);
console.log("Fertile Window:         ", canonical.fertileWindow.start, "to", canonical.fertileWindow.end);
console.log("Implantation Window:    ", canonical.implantationWindow.start, "to", canonical.implantationWindow.end);
console.log("Estimated Due Date:     ", canonical.estimatedDueDate);
console.log("Earliest Test (10 DPO): ", canonical.earliestTestDate.sensitive10Dpo);
console.log("Gestational Age:        ", `${canonical.gestationalAge.weeks} Weeks ${canonical.gestationalAge.days} Days`);

// Check Fertile Window: Must be Jan 10 through Jan 15 (O-5 to O: 6 days)
if (canonical.fertileWindow.end === "2026-01-16") {
  defects.push({
    id: "DEF-CLIN-01",
    severity: "CRITICAL (P0)",
    category: "Clinical Logic",
    description: "Fertile window includes Day O+1 (2026-01-16), creating a 7-day window instead of the ASRM 6-day standard (O-5 to O).",
    expected: "2026-01-10 to 2026-01-15 (6 calendar days)",
    actual: `${canonical.fertileWindow.start} to ${canonical.fertileWindow.end} (7 calendar days)`,
  });
}

// Check Due Date Reverse calculation (Phase 1 & 6)
console.log("\n--- 2. DUE DATE REVERSE CALCULATION & CYCLE SENSITIVITY ---");
const dd35 = calculateConceptionCalculator({
  calculationMode: "due-date",
  dueDate: "2026-10-08",
  cycleLength: 35,
  lutealPhaseLength: 14,
});

console.log("Due Date 2026-10-08 with 35d cycle -> Conception:", dd35.conceptionDate, "LMP:", dd35.estimatedLmpDate);
// In 35d cycle with 14d luteal, ovulation is Day 21 (35 - 14).
// Conception is Jan 15, 2026. LMP must be Jan 15 - 21 days = Dec 25, 2025.
if (dd35.estimatedLmpDate !== "2025-12-25") {
  defects.push({
    id: "DEF-CALC-01",
    severity: "MAJOR (P1)",
    category: "Calculation Engine",
    description: "Due Date mode hardcodes LMP to DueDate - 280 days, ignoring custom cycleLength and lutealPhaseLength.",
    expected: "LMP = Conception - (cycleLength - lutealPhaseLength) = 2025-12-25",
    actual: `LMP = ${dd35.estimatedLmpDate} (hardcoded -280 days)`,
  });
}

// Check Ultrasound Mode (Phase 1 & 6)
console.log("\n--- 3. ULTRASOUND MODE CYCLE SENSITIVITY ---");
const us35 = calculateConceptionCalculator({
  calculationMode: "ultrasound",
  ultrasoundDate: "2026-03-01",
  ultrasoundWeeks: 10,
  ultrasoundDays: 2,
  cycleLength: 35,
  lutealPhaseLength: 14,
});
console.log("Ultrasound 2026-03-01 (10w 2d), Cycle 35d -> LMP:", us35.estimatedLmpDate, "Conception:", us35.conceptionDate, "EDD:", us35.estimatedDueDate);
// In calculator.ts line 89: dueDateObj = addDays(lmpDateObj, 280);
// If cycle is 35d, EDD from LMP should be LMP + 280 + (cycle - 28) = LMP + 287, or Conception + 266!
if (us35.estimatedDueDate !== "2026-10-02") {
  defects.push({
    id: "DEF-CALC-02",
    severity: "MAJOR (P1)",
    category: "Calculation Engine",
    description: "Ultrasound mode hardcodes EDD to LMP + 280 days, ignoring custom cycle length.",
    expected: "EDD = Conception + 266 days = 2026-10-02",
    actual: `EDD = ${us35.estimatedDueDate}`,
  });
}

// 4. TIMEZONE PARSING CHECK
console.log("\n--- 4. TIMEZONE SENSITIVITY ---");
const calcCode = fs.readFileSync(path.resolve(process.cwd(), "src/app/calculators/conception-calculator/calculator.ts"), "utf-8");
if (calcCode.includes("const parsed = new Date(dateStr);")) {
  defects.push({
    id: "DEF-DATE-01",
    severity: "CRITICAL (P0)",
    category: "Timezone Engine",
    description: "parseDate uses new Date(dateStr) which parses YYYY-MM-DD as UTC midnight, causing 1-day shifts in Western hemisphere.",
    expected: "Local calendar-safe date parsing (splitting YYYY-MM-DD and constructing at midday 12:00)",
    actual: "new Date(dateStr)",
  });
}

// 5. HARDCODED 'TODAY' IN GESTATIONAL AGE
if (calcCode.includes("const today = new Date(\"2026-01-01T00:00:00\");")) {
  defects.push({
    id: "DEF-CALC-03",
    severity: "MAJOR (P1)",
    category: "Calculation Engine",
    description: "Gestational age calculation hardcodes 'today' to static date 2026-01-01T00:00:00, freezing gestational age at 0 Weeks 0 Days.",
    expected: "Dynamic system current date (or relative to user input date)",
    actual: "new Date('2026-01-01T00:00:00')",
  });
}

// 6. ALL 8 MODES VERIFICATION
console.log("\n--- 5. ALL 8 MODES SUPPORT ---");
const supportedModes = ["lmp", "ovulation", "due-date", "ultrasound", "ivf", "reverse", "planner", "timeline"];
supportedModes.forEach((m) => {
  const res = calculateConceptionCalculator({ calculationMode: m });
  if (!res || !res.conceptionDate || !res.fertileWindow) {
    defects.push({
      id: `DEF-MODE-${m}`,
      severity: "CRITICAL (P0)",
      category: "Calculation Engine",
      description: `Mode ${m} failed to compute complete results`,
      expected: "Valid conception results",
      actual: "Failed or missing fields",
    });
  }
});

// 7. INPUT BOUNDARIES (PHASE 5)
console.log("\n--- 6. INPUT SLIDER BOUNDARIES ---");
const uiCode = fs.readFileSync(path.resolve(process.cwd(), "src/components/calculator/conception/ConceptionCalculator.tsx"), "utf-8");
if (uiCode.includes("min={21}") && uiCode.includes("max={45}")) {
  defects.push({
    id: "DEF-INPUT-01",
    severity: "MINOR (P2)",
    category: "Input Testing",
    description: "Cycle length slider min is set to 21 instead of required boundary 20.",
    expected: "min={20} max={45}",
    actual: "min={21} max={45}",
  });
}
if (uiCode.includes("min={2}") && uiCode.includes("max={10}")) {
  defects.push({
    id: "DEF-INPUT-02",
    severity: "MINOR (P2)",
    category: "Input Testing",
    description: "Period length slider boundaries are 2–10 instead of required boundary 1–15.",
    expected: "min={1} max={15}",
    actual: "min={2} max={10}",
  });
}
if (uiCode.includes("min={9}") && uiCode.includes("max={16}")) {
  defects.push({
    id: "DEF-INPUT-03",
    severity: "MINOR (P2)",
    category: "Input Testing",
    description: "Luteal phase slider boundaries are 9–16 instead of required boundary 8–18.",
    expected: "min={8} max={18}",
    actual: "min={9} max={16}",
  });
}

// 8. ACCESSIBILITY (PHASE 12)
console.log("\n--- 7. ACCESSIBILITY & FORM LABELS ---");
if (!uiCode.includes("id=\"conception-lmp-date\"") || !uiCode.includes("htmlFor=\"conception-lmp-date\"")) {
  defects.push({
    id: "DEF-A11Y-01",
    severity: "MAJOR (P1)",
    category: "Accessibility",
    description: "Inputs and sliders lack unique id attributes and matching <label htmlFor=...> associations.",
    expected: "Explicit id and htmlFor associations on all date pickers and range sliders",
    actual: "Missing id and htmlFor associations",
  });
}
if (!uiCode.includes("role=\"tablist\"") || !uiCode.includes("role=\"tab\"") || !uiCode.includes("aria-selected")) {
  defects.push({
    id: "DEF-A11Y-02",
    severity: "MAJOR (P1)",
    category: "Accessibility",
    description: "Calculation mode buttons and chart tabs lack WAI-ARIA role='tablist', role='tab', and aria-selected attributes.",
    expected: "Standard tablist ARIA semantics",
    actual: "Missing ARIA markup",
  });
}

// 9. EXPORTS (PHASE 7 & 8)
console.log("\n--- 8. EXPORTS AUDIT ---");
if (uiCode.includes("data:text/csv;charset=utf-8,")) {
  defects.push({
    id: "DEF-EXP-01",
    severity: "MINOR (P2)",
    category: "Export Errors",
    description: "CSV export uses legacy data: URI instead of standard Blob object with URL.createObjectURL and URL.revokeObjectURL.",
    expected: "Blob-based CSV export with RFC-4180 escaping",
    actual: "data:text/csv;charset=utf-8 URI",
  });
}
if (!uiCode.includes("Reset Defaults")) {
  defects.push({
    id: "DEF-UI-01",
    severity: "MINOR (P2)",
    category: "UX Issues",
    description: "Action toolbar is missing a visible 'Reset Defaults' button to return to canonical defaults.",
    expected: "Reset Defaults action button in toolbar",
    actual: "Missing",
  });
}
if (!uiCode.includes("Share URL") && !uiCode.includes("handleShareUrl")) {
  defects.push({
    id: "DEF-UI-02",
    severity: "MINOR (P2)",
    category: "UX Issues",
    description: "Toolbar lacks a 'Share URL' action button with search query parameter serialization and hydration on mount.",
    expected: "Share URL action button and mount hydration",
    actual: "Missing",
  });
}

// 10. SEO & DUPLICATE FAQ (PHASE 13)
console.log("\n--- 9. SEO & DUPLICATE FAQ AUDIT ---");
const layoutCode = fs.readFileSync(path.resolve(process.cwd(), "src/components/calculator/CalculatorLayout.tsx"), "utf-8");
if (!layoutCode.includes("!isConception")) {
  defects.push({
    id: "DEF-SEO-01",
    severity: "CRITICAL (P0)",
    category: "SEO Issues",
    description: "CalculatorLayout.tsx lines 1000 and 1018 lack !isConception guard, causing generic fallback FAQs to render in addition to custom FAQs (Duplicate FAQ in DOM).",
    expected: "!isConception added to line 1000 and line 1018",
    actual: "Missing !isConception (triggers duplicate FAQ sections)",
  });
}

// 11. MEDICAL / PROBABILITY CLAIMS (PHASE 3)
console.log("\n--- 10. MEDICAL / PROBABILITY CLAIMS ---");
if (uiCode.includes("FERTILITY SCORE: 100% (PEAK)") || uiCode.includes("100% (PEAK)")) {
  defects.push({
    id: "DEF-MED-01",
    severity: "MAJOR (P1)",
    category: "Clinical Logic",
    description: "Hero badge displays 'FERTILITY SCORE: 100% (PEAK)', misleading users with an unsupported 100% fertility/conception claim.",
    expected: "Peak Fertility Index (Reference Score) or High Fecundability Window without 100% guarantee",
    actual: "FERTILITY SCORE: 100% (PEAK)",
  });
}

console.log("\n================================================================================");
console.log(`TOTAL DEFECTS FOUND: ${defects.length}`);
defects.forEach((d, idx) => {
  console.log(`\n[${idx + 1}] ${d.id} [${d.severity}] - ${d.category}: ${d.description}`);
  console.log(`    Expected: ${d.expected}`);
  console.log(`    Actual:   ${d.actual}`);
});
console.log("================================================================================");
