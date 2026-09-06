import {
  roundExactDecimal,
  roundByPlaceValue,
  roundBySigFigs,
  roundToNearestFraction,
  roundToNearestMultiple,
  roundCurrencyCash,
  explainRoundingStepByStep,
  parseAndRoundBulkCSV,
  parseNumberInput,
  RoundingMethod
} from "../src/app/calculators/rounding-calculator/rounding-logic";

console.log("=================================================");
console.log("RUNNING MASTER ROUNDING REGRESSION SUITE");
console.log("=================================================");

let failCount = 0;

function assert(condition: boolean, msg: string) {
  if (!condition) {
    console.error(`❌ FAILED: ${msg}`);
    failCount++;
  } else {
    console.log(`✅ PASSED: ${msg}`);
  }
}

// 1. EXACT DECIMAL ROUNDING GOLDEN CASES
const goldenCases = [
  { id: "TC-01", val: "1.005", d: 2, m: "halfUp" as RoundingMethod, expStr: "1.01", expNum: 1.01 },
  { id: "TC-02", val: "644.925", d: 2, m: "halfUp" as RoundingMethod, expStr: "644.93", expNum: 644.93 },
  { id: "TC-03", val: "-9.995", d: 2, m: "halfUp" as RoundingMethod, expStr: "-10.00", expNum: -10.00 },
  { id: "TC-04", val: "12.34567", d: 2, m: "halfUp" as RoundingMethod, expStr: "12.35", expNum: 12.35 },
  { id: "TC-05", val: "12.34467", d: 2, m: "halfUp" as RoundingMethod, expStr: "12.34", expNum: 12.34 },
  { id: "TC-06", val: "0.005", d: 2, m: "halfUp" as RoundingMethod, expStr: "0.01", expNum: 0.01 },
  { id: "TC-07", val: "9.99", d: 1, m: "halfUp" as RoundingMethod, expStr: "10.0", expNum: 10.0 },
  { id: "TC-08", val: "999.995", d: 2, m: "halfUp" as RoundingMethod, expStr: "1000.00", expNum: 1000.00 },
  { id: "TC-09", val: "2.5", d: 0, m: "halfUp" as RoundingMethod, expStr: "3", expNum: 3 },
  { id: "TC-10", val: "-2.5", d: 0, m: "halfUp" as RoundingMethod, expStr: "-3", expNum: -3 },
  { id: "TC-11", val: "2.5", d: 0, m: "halfEven" as RoundingMethod, expStr: "2", expNum: 2 },
  { id: "TC-12", val: "3.5", d: 0, m: "halfEven" as RoundingMethod, expStr: "4", expNum: 4 },
  { id: "TC-13", val: "4.5", d: 0, m: "halfEven" as RoundingMethod, expStr: "4", expNum: 4 },
  { id: "TC-14", val: "5.5", d: 0, m: "halfEven" as RoundingMethod, expStr: "6", expNum: 6 },
  { id: "TC-15", val: "-2.5", d: 0, m: "halfEven" as RoundingMethod, expStr: "-2", expNum: -2 },
  { id: "TC-16", val: "-3.5", d: 0, m: "halfEven" as RoundingMethod, expStr: "-4", expNum: -4 },
  { id: "TC-17", val: "5.7", d: 0, m: "down" as RoundingMethod, expStr: "5", expNum: 5 },
  { id: "TC-18", val: "5.7", d: 0, m: "up" as RoundingMethod, expStr: "6", expNum: 6 },
  { id: "TC-19", val: "-5.7", d: 0, m: "down" as RoundingMethod, expStr: "-6", expNum: -6 },
  { id: "TC-20", val: "-5.7", d: 0, m: "up" as RoundingMethod, expStr: "-5", expNum: -5 },
  { id: "TC-21", val: "-5.7", d: 0, m: "towardZero" as RoundingMethod, expStr: "-5", expNum: -5 },
];

for (const g of goldenCases) {
  const res = roundExactDecimal(g.val, g.d, g.m);
  assert(res.formattedString === g.expStr, `${g.id} Formatted: ${g.val} -> ${res.formattedString} (exp ${g.expStr})`);
  assert(Math.abs(res.numericValue - g.expNum) < 1e-9, `${g.id} Numeric: ${g.val} -> ${res.numericValue} (exp ${g.expNum})`);
}

// 2. DECIDING DIGIT & EXPLANATION CHECK
console.log("\n--- Checking Deciding Digit Explanation ---");
const exp1 = explainRoundingStepByStep("12.34567", 2, "halfUp");
assert(exp1.decidingDigit === 5, `Deciding digit for 12.34567 at 2 decimals is 5 (got ${exp1.decidingDigit})`);
assert(exp1.targetDigit === 4, `Target digit for 12.34567 at 2 decimals is 4 (got ${exp1.targetDigit})`);
assert(exp1.roundedString === "12.35", `Rounded string is 12.35 (got ${exp1.roundedString})`);
assert(exp1.decisionRule.includes("rounds UP"), `Decision rule says rounds UP (got ${exp1.decisionRule})`);

const exp2 = explainRoundingStepByStep("12.34467", 2, "halfUp");
assert(exp2.decidingDigit === 4, `Deciding digit for 12.34467 is 4 (got ${exp2.decidingDigit})`);
assert(exp2.roundedString === "12.34", `Rounded string is 12.34 (got ${exp2.roundedString})`);
assert(exp2.decisionRule.includes("rounds DOWN"), `Decision rule says rounds DOWN (got ${exp2.decisionRule})`);

// 3. FRACTION REDUCTION CHECK
console.log("\n--- Checking Fraction Reduction ---");
const frac1 = roundToNearestFraction("12.5", 4, "halfUp");
assert(frac1.fractionString === "12 1/2", `12.5 to nearest quarter reduces to '12 1/2' (got '${frac1.fractionString}')`);

const frac2 = roundToNearestFraction("0.375", 8, "halfUp");
assert(frac2.fractionString === "3/8", `0.375 to nearest eighth is '3/8' (got '${frac2.fractionString}')`);

const frac3 = roundToNearestFraction("-12.375", 8, "halfUp");
assert(frac3.fractionString === "-12 3/8", `-12.375 to nearest eighth is '-12 3/8' (got '${frac3.fractionString}')`);

// 4. SWEDISH CASH ROUNDING CHECK
console.log("\n--- Checking Swedish Cash Rounding ---");
const cash1 = roundCurrencyCash(14.83, 0.05, "halfUp");
assert(cash1.formattedPayable === "$14.85", `$14.83 at $0.05 is $14.85 (got ${cash1.formattedPayable})`);
assert(cash1.difference === 0.02, `Difference is 0.02 (got ${cash1.difference})`);

const cash2 = roundCurrencyCash(14.82, 0.05, "halfUp");
assert(cash2.formattedPayable === "$14.80", `$14.82 at $0.05 is $14.80 (got ${cash2.formattedPayable})`);

// 5. BULK CSV ROUNDING CHECK
console.log("\n--- Checking Bulk CSV Processing ---");
const sampleCSV = `Item,Price,Weight\nApple,1.005,12.34567\nOrange,-9.995,644.925`;
const bulkRes = parseAndRoundBulkCSV(sampleCSV, 2, "halfUp", ",");
assert(bulkRes.rows.length === 2, `Parsed 2 data rows (got ${bulkRes.rows.length})`);
assert(bulkRes.rows[0].roundedValues[1] === "1.01", `1.005 in CSV rounded to 1.01 (got ${bulkRes.rows[0].roundedValues[1]})`);
assert(bulkRes.rows[0].roundedValues[2] === "12.35", `12.34567 in CSV rounded to 12.35 (got ${bulkRes.rows[0].roundedValues[2]})`);
assert(bulkRes.rows[1].roundedValues[1] === "-10.00", `-9.995 in CSV rounded to -10.00 (got ${bulkRes.rows[1].roundedValues[1]})`);
assert(bulkRes.rows[1].roundedValues[2] === "644.93", `644.925 in CSV rounded to 644.93 (got ${bulkRes.rows[1].roundedValues[2]})`);

// 6. FRACTION INPUT PARSER CHECK
console.log("\n--- Checking Expression / Fraction Input Parsing ---");
assert(parseNumberInput("25/2").value === 12.5, "25/2 parses to 12.5");
assert(parseNumberInput("-25/2").value === -12.5, "-25/2 parses to -12.5");
assert(parseNumberInput("12 3/8").value === 12.375, "12 3/8 parses to 12.375");
assert(parseNumberInput("1,234.56").value === 1234.56, "1,234.56 parses to 1234.56");

console.log("\n=================================================");
if (failCount === 0) {
  console.log("🏆 ALL REGRESSION SUITE TESTS PASSED (0 FAILURES)!");
} else {
  console.error(`💥 REGRESSION SUITE FINISHED WITH ${failCount} FAILURES!`);
  process.exit(1);
}
