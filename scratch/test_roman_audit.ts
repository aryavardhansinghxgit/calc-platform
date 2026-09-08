import {
  arabicToRoman,
  romanToArabic,
  convertDateToRoman,
  calculateRomanArithmetic,
} from "../src/lib/calculator-engine/formulas/roman";

async function runAudit() {
  console.log("=== STARTING ROMAN NUMERAL AUDIT ===");

  let passCount = 0;
  let failCount = 0;
  const failures: string[] = [];

  function assert(condition: boolean, msg: string) {
    if (condition) {
      passCount++;
    } else {
      failCount++;
      if (failures.length < 50) {
        failures.push(msg);
      }
    }
  }

  // 1. Exhaustive 1 to 3999 test: arabic -> roman -> arabic
  console.log("Testing 1–3999 exhaustive bidirectional conversion...");
  for (let i = 1; i <= 3999; i++) {
    const toRom = arabicToRoman(i, false);
    const backToArab = romanToArabic(toRom.romanUnicode);
    assert(backToArab.isValid && backToArab.arabicNumber === i, `Exhaustive failure for ${i}: got ${toRom.romanUnicode} -> ${backToArab.arabicNumber}`);
  }

  // 2. Strict classical subtractive rules & invalid Roman numeral syntax
  console.log("Testing invalid Roman syntax validation...");
  const invalidSyntaxes = [
    "IIII", "XXXX", "CCCC", "MMMM",
    "VV", "LL", "DD",
    "IL", "IC", "ID", "IM",
    "XD", "XM",
    "VX", "VL", "VC", "VD", "VM",
    "LC", "LD", "LM", "DM",
    "IIV", "IIX", "XXL", "CCD", "CCM",
    "IXIX", "XIXI",
    "ABC", "123", "1A", "Roman",
  ];

  for (const inv of invalidSyntaxes) {
    const res = romanToArabic(inv);
    assert(!res.isValid, `Should reject invalid Roman '${inv}', but got isValid=${res.isValid} and arabicNumber=${res.arabicNumber}`);
  }

  // 3. Zero and Negative inputs
  console.log("Testing zero and negative numbers...");
  const zeroRes = arabicToRoman(0);
  assert(zeroRes.arabicNumber !== 0 || zeroRes.romanUnicode === "", `arabicToRoman(0) should not silently become 1 (I). Got: ${zeroRes.romanUnicode} (${zeroRes.arabicNumber})`);

  // 4. Arithmetic: Subtraction Underflow
  console.log("Testing arithmetic subtraction underflow...");
  const subRes = calculateRomanArithmetic("I", "V", "-");
  assert(subRes.resultArabic <= 0 || (subRes as any).isError, `I - V should not silently become 1 (I). Got: ${subRes.resultRoman} (${subRes.resultArabic})`);

  // 5. Arithmetic: Division by zero
  console.log("Testing arithmetic division by zero...");
  const divZero = calculateRomanArithmetic("X", "0", "÷");
  assert((divZero as any).isError || divZero.stepsExplanation.includes("Undefined") || divZero.stepsExplanation.includes("Division by zero"), `X ÷ 0 should be division by zero error. Got: ${divZero.stepsExplanation}`);

  // 6. Golden cases
  console.log("Testing golden cases...");
  const golden: [number, string][] = [
    [1, "I"], [2, "II"], [3, "III"], [4, "IV"], [5, "V"], [6, "VI"], [8, "VIII"], [9, "IX"], [10, "X"],
    [14, "XIV"], [19, "XIX"], [40, "XL"], [44, "XLIV"], [49, "XLIX"], [50, "L"], [90, "XC"], [99, "XCIX"],
    [400, "CD"], [444, "CDXLIV"], [500, "D"], [900, "CM"], [944, "CMXLIV"], [999, "CMXCIX"], [1000, "M"],
    [1492, "MCDXCII"], [1776, "MDCCLXXVI"], [1944, "MCMXLIV"], [1984, "MCMLXXXIV"], [1994, "MCMXCIV"],
    [2000, "MM"], [2024, "MMXXIV"], [2025, "MMXXV"], [2026, "MMXXVI"], [3999, "MMMCMXCIX"],
  ];
  for (const [val, expectedRom] of golden) {
    const res = arabicToRoman(val, false);
    assert(res.romanUnicode === expectedRom, `Golden case ${val}: expected ${expectedRom}, got ${res.romanUnicode}`);
    const back = romanToArabic(expectedRom);
    assert(back.isValid && back.arabicNumber === val, `Golden decode ${expectedRom}: expected ${val}, got ${back.arabicNumber}`);
  }

  // 7. Date converter
  console.log("Testing date converter...");
  const dateRes = convertDateToRoman(2026, 8, 17, " • ");
  assert(dateRes.formattedMDY === "VIII • XVII • MMXXVI", `Date MDY: expected VIII • XVII • MMXXVI, got ${dateRes.formattedMDY}`);
  assert(dateRes.formattedDMY === "XVII • VIII • MMXXVI", `Date DMY: expected XVII • VIII • MMXXVI, got ${dateRes.formattedDMY}`);
  assert(dateRes.formattedYMD === "MMXXVI • VIII • XVII", `Date YMD: expected MMXXVI • VIII • XVII, got ${dateRes.formattedYMD}`);

  // 8. Vinculum tests
  console.log("Testing vinculum...");
  const vincCases: [number, string][] = [
    [5000, "V̅"],
    [10000, "X̅"],
    [50000, "L̅"],
    [100000, "C̅"],
    [500000, "D̅"],
    [1000000, "M̅"],
  ];
  for (const [v, expectedVinc] of vincCases) {
    const vRes = arabicToRoman(v, true);
    assert(vRes.romanUnicode === expectedVinc, `Vinculum ${v}: expected ${expectedVinc}, got ${vRes.romanUnicode}`);
    const vBack = romanToArabic(expectedVinc);
    assert(vBack.isValid && vBack.arabicNumber === v, `Vinculum decode ${expectedVinc}: expected ${v}, got ${vBack.arabicNumber}`);
  }

  console.log(`\n=== RESULTS ===`);
  console.log(`PASS: ${passCount}`);
  console.log(`FAIL: ${failCount}`);
  if (failures.length > 0) {
    console.log(`First ${failures.length} failures:`);
    failures.forEach((f, i) => console.log(`  ${i + 1}. ${f}`));
  }
}

runAudit().catch(console.error);
