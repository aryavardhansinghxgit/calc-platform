import {
  arabicToRoman,
  romanToArabic,
  convertDateToRoman,
  calculateRomanArithmetic,
  isValidCalendarDate,
} from "../src/lib/calculator-engine/formulas/roman";

async function runMassiveAudit() {
  console.log("=== STARTING MASSIVE 30,000+ ASSERTION AUDIT ===");

  let pass = 0;
  let fail = 0;
  const failures: string[] = [];

  function assert(cond: boolean, msg: string) {
    if (cond) {
      pass++;
    } else {
      fail++;
      if (failures.length < 50) failures.push(msg);
    }
  }

  // BATTERY 1: 1–3999 Exhaustive (3,999 tests)
  console.log("Battery 1: 1–3999 Exhaustive bidirectional...");
  for (let i = 1; i <= 3999; i++) {
    const r = arabicToRoman(i, false);
    assert(r.isValid, `Exhaustive ${i} arabicToRoman marked invalid`);
    const a = romanToArabic(r.romanUnicode);
    assert(a.isValid && a.arabicNumber === i, `Exhaustive ${i}: got ${r.romanUnicode} -> ${a.arabicNumber}`);
  }

  // BATTERY 2: 10,000 Random Arabic to Roman (10,000 tests)
  console.log("Battery 2: 10,000 Random Arabic -> Roman...");
  for (let k = 0; k < 10000; k++) {
    const val = Math.floor(Math.random() * 3999) + 1;
    const rom = arabicToRoman(val, false);
    const dec = romanToArabic(rom.romanUnicode);
    assert(dec.isValid && dec.arabicNumber === val, `Random ${val} failed`);
  }

  // BATTERY 3: 5,000 Vinculum Overline Numbers (4,000 to 3,999,999) (5,000 tests)
  console.log("Battery 3: 5,000 Vinculum Overline conversions...");
  for (let k = 0; k < 5000; k++) {
    const val = Math.floor(Math.random() * (3999999 - 4000 + 1)) + 4000;
    const rom = arabicToRoman(val, true);
    assert(rom.isValid && rom.romanUnicode.length > 0, `Vinculum ${val} failed to generate`);
    const dec = romanToArabic(rom.romanUnicode);
    assert(dec.isValid && dec.arabicNumber === val, `Vinculum decode ${val}: got ${dec.arabicNumber}`);
  }

  // BATTERY 4: 5,000 Random Valid Dates across MDY, DMY, YMD (5,000 tests)
  console.log("Battery 4: 5,000 Random Valid Dates...");
  const monthDays = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  for (let k = 0; k < 5000; k++) {
    const y = Math.floor(Math.random() * 3000) + 1; // 1..3000
    const m = Math.floor(Math.random() * 12) + 1;
    const isLeap = (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
    const maxD = m === 2 && isLeap ? 29 : monthDays[m];
    const d = Math.floor(Math.random() * maxD) + 1;

    const dr = convertDateToRoman(y, m, d, " • ");
    assert(dr.isValid, `Valid date ${y}-${m}-${d} marked invalid`);
    assert(dr.formattedMDY.includes(" • "), `Date MDY format check failed`);
    assert(dr.formattedDMY.includes(" • "), `Date DMY format check failed`);
    assert(dr.formattedYMD.includes(" • "), `Date YMD format check failed`);
  }

  // BATTERY 5: 3,000 Random Additions (3,000 tests)
  console.log("Battery 5: 3,000 Random Additions...");
  for (let k = 0; k < 3000; k++) {
    const a = Math.floor(Math.random() * 1500) + 1;
    const b = Math.floor(Math.random() * 1500) + 1;
    const romA = arabicToRoman(a).romanUnicode;
    const romB = arabicToRoman(b).romanUnicode;
    const res = calculateRomanArithmetic(romA, romB, "+");
    assert(res.isValid && res.resultArabic === a + b, `Addition ${a} + ${b} failed: got ${res.resultArabic}`);
  }

  // BATTERY 6: 3,000 Random Subtractions (3,000 tests)
  console.log("Battery 6: 3,000 Random Subtractions...");
  for (let k = 0; k < 3000; k++) {
    const a = Math.floor(Math.random() * 2000) + 1;
    const b = Math.floor(Math.random() * 2000) + 1;
    const romA = arabicToRoman(a).romanUnicode;
    const romB = arabicToRoman(b).romanUnicode;
    const res = calculateRomanArithmetic(romA, romB, "-");
    if (a > b) {
      assert(res.isValid && res.resultArabic === a - b, `Subtraction ${a} - ${b} failed: got ${res.resultArabic}`);
    } else if (a === b) {
      assert(!res.isValid && Boolean(res.errorMessage?.includes("zero")), `Subtraction ${a} - ${b} zero error failed`);
    } else {
      assert(!res.isValid && Boolean(res.errorMessage?.includes("negative")), `Subtraction ${a} - ${b} underflow error failed`);
    }
  }

  // BATTERY 7: 3,000 Random Multiplications (3,000 tests)
  console.log("Battery 7: 3,000 Random Multiplications...");
  for (let k = 0; k < 3000; k++) {
    const a = Math.floor(Math.random() * 60) + 1;
    const b = Math.floor(Math.random() * 60) + 1;
    const romA = arabicToRoman(a).romanUnicode;
    const romB = arabicToRoman(b).romanUnicode;
    const res = calculateRomanArithmetic(romA, romB, "×");
    assert(res.isValid && res.resultArabic === a * b, `Multiplication ${a} × ${b} failed: got ${res.resultArabic}`);
  }

  // BATTERY 8: 3,000 Random Divisions (3,000 tests)
  console.log("Battery 8: 3,000 Random Divisions...");
  for (let k = 0; k < 3000; k++) {
    const a = Math.floor(Math.random() * 2000) + 1;
    const b = Math.floor(Math.random() * 200) + 1;
    const romA = arabicToRoman(a).romanUnicode;
    const romB = arabicToRoman(b).romanUnicode;
    const res = calculateRomanArithmetic(romA, romB, "÷");
    const expectedQ = Math.floor(a / b);
    const expectedR = a % b;
    assert(res.isValid && res.quotient === expectedQ && res.remainder === expectedR, `Division ${a} ÷ ${b} failed`);
  }

  // BATTERY 9: Calendar validation edge cases
  console.log("Battery 9: Calendar edge cases...");
  assert(!!isValidCalendarDate(2024, 2, 29).isValid, "2024-02-29 should be valid leap day");
  assert(!isValidCalendarDate(2025, 2, 29).isValid, "2025-02-29 should be invalid");
  assert(!!isValidCalendarDate(2000, 2, 29).isValid, "2000-02-29 should be valid century leap day");
  assert(!isValidCalendarDate(1900, 2, 29).isValid, "1900-02-29 should be invalid century non-leap day");
  assert(!isValidCalendarDate(2026, 4, 31).isValid, "April 31 should be invalid");
  assert(!isValidCalendarDate(2026, 11, 31).isValid, "November 31 should be invalid");
  assert(!isValidCalendarDate(0, 0, 0).isValid, "0-0-0 should be invalid");

  // BATTERY 10: Classical Reference Chart Verification
  console.log("Battery 10: Reference chart verification...");
  const refChart: [number, string][] = [
    [1, "I"], [2, "II"], [3, "III"], [4, "IV"], [5, "V"], [6, "VI"],
    [7, "VII"], [8, "VIII"], [9, "IX"], [10, "X"], [11, "XI"], [12, "XII"],
    [13, "XIII"], [14, "XIV"], [15, "XV"], [19, "XIX"], [20, "XX"], [25, "XXV"],
    [30, "XXX"], [40, "XL"], [50, "L"], [60, "LX"], [70, "LXX"], [80, "LXXX"],
    [90, "XC"], [99, "XCIX"], [100, "C"], [200, "CC"], [300, "CCC"], [400, "CD"],
    [500, "D"], [600, "DC"], [700, "DCC"], [800, "DCCC"], [900, "CM"], [1000, "M"],
    [1776, "MDCCLXXVI"], [1984, "MCMLXXXIV"], [2000, "MM"], [2024, "MMXXIV"], [2025, "MMXXV"], [2026, "MMXXVI"]
  ];
  for (const [val, rom] of refChart) {
    const enc = arabicToRoman(val, false);
    assert(enc.romanUnicode === rom, `Reference chart ${val}: expected ${rom}, got ${enc.romanUnicode}`);
    const dec = romanToArabic(rom);
    assert(dec.isValid && dec.arabicNumber === val, `Reference chart decode ${rom}: expected ${val}, got ${dec.arabicNumber}`);
  }

  // BATTERY 11: Division by zero & subtraction underflow
  console.log("Battery 11: Edge cases & underflow...");
  assert(!calculateRomanArithmetic("X", "0", "÷").isValid, "X / 0 should fail");
  assert(!calculateRomanArithmetic("I", "V", "-").isValid, "I - V should fail");
  assert(!calculateRomanArithmetic("X", "X", "-").isValid, "X - X should fail");

  console.log(`\n============================`);
  console.log(`TOTAL PASS: ${pass}`);
  console.log(`TOTAL FAIL: ${fail}`);
  console.log(`============================`);
  if (failures.length > 0) {
    console.log("Failures:");
    failures.forEach((f) => console.log(" - " + f));
  }
}

runMassiveAudit().catch(console.error);
