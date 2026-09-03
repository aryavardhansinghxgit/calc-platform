import {
  calculatePregnancy,
  PregnancyInputs,
  parseLocalDate,
  formatDateStr,
  formatNiceDate,
} from "../src/lib/calculator-engine/formulas/pregnancy";
import { FETAL_WEEKLY_DATA } from "../src/components/calculator/pregnancy/fetalData";

console.log("===============================================================================");
console.log("   ADVANCED PREGNANCY CALCULATOR - MASTER QA & ENGINE AUDIT");
console.log("===============================================================================");

// Test helper: run calculation with an overridden 'today' if possible or inspect date math
// Let's inspect calculatePregnancy date math for the golden cases.

console.log("\n--- TEST 1: DATE ARITHMETIC SAFETY ---");
const datesToTest = ["2026-01-01", "2026-01-31", "2026-02-28", "2028-02-29", "2026-12-31"];
for (const dStr of datesToTest) {
  const d = parseLocalDate(dStr);
  const formatted = formatDateStr(d);
  console.log(`Input: ${dStr} -> Parsed & Formatted: ${formatted} [Match: ${dStr === formatted}]`);
}

console.log("\n--- TEST 2: GOLDEN CASE - LMP ---");
// Golden Case LMP: LMP 2026-01-01, cycle 28, single.
// Expected: Conception: 2026-01-15, EDD: 2026-10-08.
// With reference date 2026-09-03: Days pregnant: 245, GA: 35w0d, Days remaining: 35.
const lmpRes = calculatePregnancy({
  mode: "lmp",
  lmpDate: "2026-01-01",
  cycleLength: 28,
  pregnancyType: "single",
});
console.log("LMP Mode Result:");
console.log("  Due Date:", lmpRes.dueDateStr);
console.log("  Conception Date:", lmpRes.conceptionDateStr);
console.log("  Birth Window:", lmpRes.estimatedBirthWindowStart, "to", lmpRes.estimatedBirthWindowEnd);
console.log("  GA Weeks:", lmpRes.gestationalAgeWeeks, "Days:", lmpRes.gestationalAgeDays);
console.log("  Days Pregnant:", lmpRes.totalDaysPregnant);
console.log("  Days Remaining:", lmpRes.daysRemaining);

console.log("\n--- TEST 3: GOLDEN CASE - DUE DATE ---");
// Golden Case Due Date: EDD 2026-10-08
// Expected: LMP 2026-01-01, Conception 2026-01-15.
const eddRes = calculatePregnancy({
  mode: "due-date",
  dueDate: "2026-10-08",
  pregnancyType: "single",
});
console.log("Due Date Mode Result:");
console.log("  LMP Date:", eddRes.lmpDateStr);
console.log("  Conception Date:", eddRes.conceptionDateStr);
console.log("  Due Date:", eddRes.dueDateStr);

console.log("\n--- TEST 4: GOLDEN CASE - CONCEPTION ---");
// Conception: 2026-01-15. Expected: EDD 2026-10-08.
const concRes = calculatePregnancy({
  mode: "conception",
  conceptionDate: "2026-01-15",
  pregnancyType: "single",
});
console.log("Conception Mode Result:");
console.log("  LMP Date:", concRes.lmpDateStr);
console.log("  Due Date:", concRes.dueDateStr);

console.log("\n--- TEST 5: GOLDEN CASE - ULTRASOUND ---");
// Ultrasound: US date 2026-09-03, GA 8w0d.
// Expected: LMP 2026-07-09, Conception 2026-07-23, EDD 2027-03-25.
const usRes = calculatePregnancy({
  mode: "ultrasound",
  ultrasoundDate: "2026-09-03",
  ultrasoundWeeks: 8,
  ultrasoundDays: 0,
  pregnancyType: "single",
});
console.log("Ultrasound Mode Result:");
console.log("  Estimated LMP:", usRes.lmpDateStr);
console.log("  Estimated Conception:", usRes.conceptionDateStr);
console.log("  Due Date:", usRes.dueDateStr);

console.log("\n--- TEST 6: GOLDEN CASE - IVF DAY 5 ---");
// Transfer: 2026-09-03, Day 5. Expected Conception: 2026-08-29, EDD: 2027-05-01.
const ivfRes = calculatePregnancy({
  mode: "ivf",
  ivfDate: "2026-09-03",
  embryoAge: "day5",
  pregnancyType: "single",
});
console.log("IVF Day 5 Result:");
console.log("  Estimated Conception:", ivfRes.conceptionDateStr);
console.log("  Due Date:", ivfRes.dueDateStr);

console.log("\n--- TEST 7: GOLDEN CASE - CUSTOM START ---");
// Custom start: 2026-09-03. Expected Conception: 2026-09-17, EDD: 2027-06-10.
const customRes = calculatePregnancy({
  mode: "custom",
  customStartDate: "2026-09-03",
  pregnancyType: "single",
});
console.log("Custom Start Result:");
console.log("  Estimated Conception:", customRes.conceptionDateStr);
console.log("  Due Date:", customRes.dueDateStr);

console.log("\n--- TEST 8: GOLDEN CASE - REVERSE DUE DATE ---");
// Target EDD: 2026-11-15.
// Expected: LMP 2026-02-08, Conception 2026-02-22, Day 5 IVF 2026-02-27, US 8w 2026-04-05.
const revRes = calculatePregnancy({
  mode: "reverse",
  targetDueDate: "2026-11-15",
  pregnancyType: "single",
});
console.log("Reverse Due Date Result:");
console.log("  LMP Date:", revRes.lmpDateStr);
console.log("  Conception Date:", revRes.conceptionDateStr);
console.log("  Reverse Details:", revRes.reverseDetails);

console.log("\n--- TEST 9: MULTIPLE PREGNANCY BIRTH WINDOW & DATES ---");
const singleLmp = calculatePregnancy({ mode: "lmp", lmpDate: "2026-01-01", pregnancyType: "single" });
const twinLmp = calculatePregnancy({ mode: "lmp", lmpDate: "2026-01-01", pregnancyType: "twins" });
const tripletLmp = calculatePregnancy({ mode: "lmp", lmpDate: "2026-01-01", pregnancyType: "triplets" });

console.log("Singleton (40w): EDD =", singleLmp.dueDateStr, "| Window =", singleLmp.estimatedBirthWindowStart, "to", singleLmp.estimatedBirthWindowEnd);
console.log("Twins (37w):     EDD =", twinLmp.dueDateStr, "| Window =", twinLmp.estimatedBirthWindowStart, "to", twinLmp.estimatedBirthWindowEnd);
console.log("Triplets (34w):  EDD =", tripletLmp.dueDateStr, "| Window =", tripletLmp.estimatedBirthWindowStart, "to", tripletLmp.estimatedBirthWindowEnd);

console.log("\n--- TEST 10: FETAL DEVELOPMENT W1 & W2 ---");
console.log("Week 1 data:", FETAL_WEEKLY_DATA[1]);
console.log("Week 2 data:", FETAL_WEEKLY_DATA[2]);

export {};
