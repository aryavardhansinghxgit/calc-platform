import {
  calculatePregnancy,
  PregnancyInputs,
  parseLocalDate,
  formatDateStr,
  formatNiceDate,
} from "../src/lib/calculator-engine/formulas/pregnancy";

// Helper functions for calendar date arithmetic
function addDays(d: Date, days: number): Date {
  const r = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  r.setDate(r.getDate() + days);
  return r;
}

function diffDays(d1: Date, d2: Date): number {
  const u1 = Date.UTC(d1.getFullYear(), d1.getMonth(), d1.getDate());
  const u2 = Date.UTC(d2.getFullYear(), d2.getMonth(), d2.getDate());
  return Math.round((u1 - u2) / 86400000);
}

const refDate = new Date(2026, 8, 3); // 2026-09-03

console.log("=== INDEPENDENT GOLDEN CASE VERIFICATION (REF: 2026-09-03) ===");

// 1. LMP Mode
const lmp = new Date(2026, 0, 1); // 2026-01-01
const eddLmp = addDays(lmp, 280); // 2026-10-08
const concLmp = addDays(lmp, 14); // 2026-01-15
const daysProgLmp = diffDays(refDate, lmp);
const daysRemLmp = diffDays(eddLmp, refDate);
console.log("1. LMP Mode:");
console.log("   Conception:", formatDateStr(concLmp), "Expected: 2026-01-15");
console.log("   EDD:       ", formatDateStr(eddLmp), "Expected: 2026-10-08");
console.log("   Days Prog: ", daysProgLmp, "Expected: 245");
console.log("   GA:        ", `${Math.floor(daysProgLmp / 7)}w ${daysProgLmp % 7}d`, "Expected: 35w 0d");
console.log("   Days Rem:  ", daysRemLmp, "Expected: 35");
console.log("   Sum Check: ", daysProgLmp + daysRemLmp, "Expected: 280");

// 2. Due Date Mode
const edd = new Date(2026, 9, 8); // 2026-10-08
const lmpFromEdd = addDays(edd, -280);
const concFromEdd = addDays(edd, -266);
console.log("\n2. Due Date Mode:");
console.log("   LMP:       ", formatDateStr(lmpFromEdd), "Expected: 2026-01-01");
console.log("   Conception:", formatDateStr(concFromEdd), "Expected: 2026-01-15");

// 3. Conception Mode
const conc = new Date(2026, 0, 15); // 2026-01-15
const eddFromConc = addDays(conc, 266);
const lmpFromConc = addDays(conc, -14);
console.log("\n3. Conception Mode:");
console.log("   LMP:       ", formatDateStr(lmpFromConc), "Expected: 2026-01-01");
console.log("   EDD:       ", formatDateStr(eddFromConc), "Expected: 2026-10-08");

// 4. Ultrasound Mode (Scan: 2026-09-03, 8w0d)
const usDate = new Date(2026, 8, 3);
const lmpFromUs = addDays(usDate, -56);
const concFromUs = addDays(lmpFromUs, 14);
const eddSingleUs = addDays(lmpFromUs, 280);
const eddTwinsUs = addDays(lmpFromUs, 259);
console.log("\n4. Ultrasound Mode (Scan on 2026-09-03 at 8w0d):");
console.log("   Est LMP:        ", formatDateStr(lmpFromUs), "Expected: 2026-07-09");
console.log("   Est Conception: ", formatDateStr(concFromUs), "Expected: 2026-07-23");
console.log("   Singleton EDD:  ", formatDateStr(eddSingleUs), "Expected: 2027-04-15");
console.log("   Twins EDD:      ", formatDateStr(eddTwinsUs), "Expected: 2027-03-25 (Matches Screenshot 2!)");

// 5. IVF Day 5 Mode (Transfer: 2026-09-03, Day 5)
const ivfDate = new Date(2026, 8, 3);
const concIvf5 = addDays(ivfDate, -5);
const lmpIvf5 = addDays(concIvf5, -14);
const eddSingleIvf5 = addDays(lmpIvf5, 280);
const eddTwinsIvf5 = addDays(lmpIvf5, 259);
console.log("\n5. IVF Day 5 Mode (Transfer on 2026-09-03):");
console.log("   Est Conception: ", formatDateStr(concIvf5), "Expected: 2026-08-29");
console.log("   Singleton EDD:  ", formatDateStr(eddSingleIvf5), "Expected: 2027-05-22");
console.log("   Twins EDD:      ", formatDateStr(eddTwinsIvf5), "Expected: 2027-05-01 (Matches Screenshot 3!)");

// 6. Custom Start Mode (Anchor: 2026-09-03)
const customDate = new Date(2026, 8, 3);
const concCustom = addDays(customDate, 14);
const eddCustom = addDays(customDate, 280);
console.log("\n6. Custom Start Mode (Anchor on 2026-09-03):");
console.log("   GA:             0w 0d, Days Pregnant: 0, Days Remaining: 280");
console.log("   Est Conception: ", formatDateStr(concCustom), "Expected: 2026-09-17");
console.log("   Singleton EDD:  ", formatDateStr(eddCustom), "Expected: 2027-06-10");

// 7. Reverse Due Date Mode (Target: 2026-11-15)
const targetDue = new Date(2026, 10, 15);
const lmpRev = addDays(targetDue, -280);
const concRev = addDays(targetDue, -266);
const ivf5Rev = addDays(concRev, 5);
const us8wRev = addDays(lmpRev, 56);
const daysProgRev = diffDays(refDate, lmpRev);
const daysRemRev = diffDays(targetDue, refDate);
console.log("\n7. Reverse Due Date Mode (Target EDD: 2026-11-15):");
console.log("   Required LMP:   ", formatDateStr(lmpRev), "Expected: 2026-02-08");
console.log("   Conception:     ", formatDateStr(concRev), "Expected: 2026-02-22");
console.log("   IVF Day 5 Date: ", formatDateStr(ivf5Rev), "Expected: 2026-02-27");
console.log("   8w Scan Date:   ", formatDateStr(us8wRev), "Expected: 2026-04-05");
console.log("   GA on 09/03:    ", `${Math.floor(daysProgRev / 7)}w ${daysProgRev % 7}d`, "Expected: 29w 4d");
console.log("   Days Pregnant:  ", daysProgRev, "Expected: 207 (29*7 + 4 = 207)");
console.log("   Days Remaining: ", daysRemRev, "Expected: 73 (207 + 73 = 280)");

export {};
