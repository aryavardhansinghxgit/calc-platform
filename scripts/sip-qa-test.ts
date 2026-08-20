import { calculateSipFormula } from "../src/lib/calculator-engine/formulas/sip";

// Independent Oracle for Annuity-Due SIP
function independentSipOracle(P: number, annualRate: number, years: number) {
  const n = years * 12;
  const invested = P * n;
  if (n <= 0) return { maturity: 0, invested: 0, returns: 0 };
  if (annualRate === 0) {
    return { maturity: invested, invested, returns: 0 };
  }
  const i = (annualRate / 100) / 12;
  const factor = Math.pow(1 + i, n);
  const maturity = P * ((factor - 1) / i) * (1 + i);
  const returns = maturity - invested;
  return { maturity, invested, returns };
}

console.log("=== 1. CORE TEST CASES (ANNUITY DUE) ===");
const cases = [
  { name: "CASE A", P: 500, r: 12.0, y: 10 },
  { name: "CASE B", P: 1000, r: 10.0, y: 5 },
  { name: "CASE C", P: 100, r: 8.0, y: 20 },
  { name: "CASE D (0%)", P: 500, r: 0.0, y: 10 },
  { name: "CASE E", P: 10000, r: 7.0, y: 30 },
];

cases.forEach((c) => {
  const oracle = independentSipOracle(c.P, c.r, c.y);
  const app = calculateSipFormula({
    investmentType: "sip",
    monthlyInvestment: c.P,
    expectedReturnRate: c.r,
    timePeriodYears: c.y,
  });

  const matDiff = Math.abs(oracle.maturity - app.totalMaturityValue);
  const invDiff = Math.abs(oracle.invested - app.totalInvested);
  const retDiff = Math.abs(oracle.returns - app.estimatedReturns);

  console.log(`${c.name}: P=$${c.P}, r=${c.r}%, Term=${c.y}Y`);
  console.log(`  Oracle: Mat=$${oracle.maturity.toFixed(2)}, Inv=$${oracle.invested.toFixed(2)}, Ret=$${oracle.returns.toFixed(2)}`);
  console.log(`  App:    Mat=$${app.totalMaturityValue.toFixed(2)}, Inv=$${app.totalInvested.toFixed(2)}, Ret=$${app.estimatedReturns.toFixed(2)}`);
  console.log(`  Diff:   Mat Diff=${matDiff.toFixed(4)} => ${matDiff < 0.02 ? "PASS" : "FAIL"}\n`);
});

console.log("=== 2. PDF NUMERICAL VERIFICATION ===");
// PDF default: P=500, r=12%, y=10, infl=4%, tax=10%
const pdfTest = calculateSipFormula({
  investmentType: "sip",
  monthlyInvestment: 500,
  expectedReturnRate: 12,
  timePeriodYears: 10,
  inflationRate: 4,
  taxRate: 10,
});
console.log("PDF Baseline ($500, 12%, 10Y, 4% infl, 10% tax):");
console.log(`  Maturity Value:           App=$${pdfTest.totalMaturityValue.toFixed(2)} (PDF: $116,169.54) => ${Math.abs(pdfTest.totalMaturityValue - 116169.54) < 0.02 ? "PASS" : "FAIL"}`);
console.log(`  Total Invested Capital:   App=$${pdfTest.totalInvested.toFixed(2)} (PDF: $60,000.00) => ${pdfTest.totalInvested === 60000 ? "PASS" : "FAIL"}`);
console.log(`  Estimated Wealth Returns: App=$${pdfTest.estimatedReturns.toFixed(2)} (PDF: $56,169.54) => ${Math.abs(pdfTest.estimatedReturns - 56169.54) < 0.02 ? "PASS" : "FAIL"}`);
console.log(`  Wealth Multiplier:        App=${pdfTest.wealthMultiplier}x (PDF: 1.94x) => ${pdfTest.wealthMultiplier === 1.94 ? "PASS" : "FAIL"}`);
console.log(`  Inflation-Adjusted Value: App=$${pdfTest.inflationAdjustedValue.toFixed(2)} (PDF: $78,479.98) => ${Math.abs(pdfTest.inflationAdjustedValue - 78479.98) < 0.02 ? "PASS" : "FAIL"}`);
console.log(`  Post-Tax Maturity:        App=$${pdfTest.postTaxMaturityValue.toFixed(2)} (PDF: $110,552.59) => ${Math.abs(pdfTest.postTaxMaturityValue - 110552.59) < 0.02 ? "PASS" : "FAIL"}`);
console.log(`  Estimated Tax Drag:       App=$${pdfTest.totalTaxPaid.toFixed(2)} (PDF: $5,616.95) => ${Math.abs(pdfTest.totalTaxPaid - 5616.95) < 0.02 ? "PASS" : "FAIL"}`);
console.log(`  SIP Health Rating:        App=${pdfTest.healthRating} (${pdfTest.sipHealthScore}/100) (PDF: Good (85/100)) => ${pdfTest.sipHealthScore === 85 ? "PASS" : "FAIL"}`);

console.log("\n=== 3. SCHEDULE CONTINUITY & INVARIANTS ===");
let scheduleValid = true;
const sched = pdfTest.annualSchedule;
for (let i = 0; i < sched.length; i++) {
  const row = sched[i];
  const expectedEnding = row.startingBalance + row.contributions + row.interestEarned;
  const balanceDiff = Math.abs(row.endingBalance - expectedEnding);
  if (balanceDiff > 0.02) {
    console.log(`Year ${row.year} calculation mismatch: Ending=${row.endingBalance}, Calc=${expectedEnding}`);
    scheduleValid = false;
  }
  if (i > 0) {
    const prevEnding = sched[i - 1].endingBalance;
    if (Math.abs(row.startingBalance - prevEnding) > 0.02) {
      console.log(`Year ${row.year} continuity mismatch: Start=${row.startingBalance}, PrevEnd=${prevEnding}`);
      scheduleValid = false;
    }
  }
}
console.log(`Schedule Continuity & Accounting Invariants: ${scheduleValid ? "PASS" : "FAIL"}`);

console.log("\n=== 4. 20 DIFFERENTIAL TEST CASES ===");
const diffScenarios = [
  { P: 50, r: 5.0, y: 1, infl: 2, tax: 5 },
  { P: 100, r: 8.0, y: 3, infl: 3, tax: 10 },
  { P: 250, r: 9.5, y: 5, infl: 4, tax: 15 },
  { P: 500, r: 12.0, y: 10, infl: 4, tax: 10 },
  { P: 1000, r: 10.0, y: 15, infl: 5, tax: 20 },
  { P: 1500, r: 11.0, y: 20, infl: 3.5, tax: 10 },
  { P: 2000, r: 13.5, y: 25, infl: 4.5, tax: 12.5 },
  { P: 5000, r: 7.5, y: 30, infl: 3.0, tax: 15 },
  { P: 10000, r: 6.0, y: 10, infl: 2.5, tax: 0 },
  { P: 500, r: 0.0, y: 10, infl: 0, tax: 0 },
  { P: 750, r: 14.0, y: 8, infl: 5.0, tax: 10 },
  { P: 1200, r: 8.5, y: 12, infl: 4.0, tax: 10 },
  { P: 3000, r: 15.0, y: 18, infl: 6.0, tax: 20 },
  { P: 450, r: 10.5, y: 7, infl: 3.8, tax: 10 },
  { P: 2500, r: 9.0, y: 22, infl: 4.2, tax: 15 },
  { P: 800, r: 16.0, y: 14, infl: 5.5, tax: 12.5 },
  { P: 150, r: 18.0, y: 6, infl: 4.0, tax: 10 },
  { P: 3500, r: 11.5, y: 16, infl: 3.2, tax: 10 },
  { P: 6000, r: 8.0, y: 28, infl: 4.0, tax: 15 },
  { P: 20000, r: 12.5, y: 35, infl: 3.5, tax: 20 },
];

let allDiffPass = true;
diffScenarios.forEach((s, idx) => {
  const oracle = independentSipOracle(s.P, s.r, s.y);
  const app = calculateSipFormula({
    investmentType: "sip",
    monthlyInvestment: s.P,
    expectedReturnRate: s.r,
    timePeriodYears: s.y,
    inflationRate: s.infl,
    taxRate: s.tax,
  });

  const matDiff = Math.abs(oracle.maturity - app.totalMaturityValue);
  const pass = matDiff < 0.05 && app.totalInvested === s.P * s.y * 12;
  if (!pass) allDiffPass = false;

  console.log(`[Diff ${idx + 1}] P=$${s.P}, r=${s.r}%, ${s.y}Y => App Mat=$${app.totalMaturityValue.toFixed(2)}, Oracle=$${oracle.maturity.toFixed(2)} (Diff: ${matDiff.toFixed(4)}) => ${pass ? "PASS" : "FAIL"}`);
});
console.log(`\nAll 20 Differential Scenarios Passed: ${allDiffPass}`);
