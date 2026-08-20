const { calculateEmiModule } = require("../src/modules/emi/formula");

// Independent Oracle for EMI
function independentEmiOracle(principal, annualRate, tenureYears, tenureMonths = 0) {
  const n = tenureYears * 12 + tenureMonths;
  const P = principal;
  if (n <= 0) return { emi: 0, totalInterest: 0, totalPayment: 0, n: 0 };
  if (annualRate === 0) {
    const emi = P / n;
    return { emi, totalInterest: 0, totalPayment: P, n };
  }
  const r = (annualRate / 100) / 12;
  const factor = Math.pow(1 + r, n);
  const emi = (P * r * factor) / (factor - 1);
  const totalPayment = emi * n;
  const totalInterest = totalPayment - P;
  return { emi, totalInterest, totalPayment, n };
}

console.log("=== 1. CORE TEST CASES ===");
const cases = [
  { name: "CASE A", P: 100000, r: 6.0, y: 30, m: 0 },
  { name: "CASE B", P: 500000, r: 8.5, y: 10, m: 0 },
  { name: "CASE C", P: 250000, r: 10.0, y: 5, m: 0 },
  { name: "CASE D", P: 1000, r: 1.0, y: 1, m: 0 },
  { name: "CASE E (0%)", P: 100000, r: 0.0, y: 10, m: 0 },
];

cases.forEach(c => {
  const oracle = independentEmiOracle(c.P, c.r, c.y, c.m);
  const app = calculateEmiModule({
    loanAmount: c.P,
    interestRate: c.r,
    loanTermYears: c.y,
    loanTermMonths: c.m,
    processingFeeRate: 0,
    processingFeeFlat: 0,
    extraMonthlyPrepayment: 0,
    oneTimePrepayment: 0,
  });

  const emiDiff = Math.abs(oracle.emi - app.monthlyEmi);
  const interestDiff = Math.abs(oracle.totalInterest - app.totalInterestPayable);
  console.log(`${c.name}: P=${c.P}, r=${c.r}%, Term=${c.y}Y ${c.m}M`);
  console.log(`  Oracle: EMI=${oracle.emi.toFixed(2)}, TotalInt=${oracle.totalInterest.toFixed(2)}`);
  console.log(`  App:    EMI=${app.monthlyEmi.toFixed(2)}, TotalInt=${app.totalInterestPayable.toFixed(2)}`);
  console.log(`  Diff:   EMI Diff=${emiDiff.toFixed(6)}, Int Diff=${interestDiff.toFixed(6)} => ${emiDiff < 0.01 && interestDiff < 0.05 ? "PASS" : "FAIL"}`);
});

console.log("\n=== 2. TENURE LOGIC TESTS ===");
const tenures = [
  { y: 1, m: 0, expN: 12 },
  { y: 1, m: 1, expN: 13 },
  { y: 1, m: 6, expN: 18 },
  { y: 5, m: 11, expN: 71 },
  { y: 10, m: 0, expN: 120 },
  { y: 0, m: 12, expN: 12 },
  { y: 0, m: 1, expN: 1 },
  { y: 30, m: 0, expN: 360 },
];

tenures.forEach(t => {
  const app = calculateEmiModule({
    loanAmount: 100000,
    interestRate: 8.5,
    loanTermYears: t.y,
    loanTermMonths: t.m,
    processingFeeRate: 0,
  });
  console.log(`Tenure ${t.y}Y ${t.m}M -> Total Months: ${app.monthlySchedule.length} (Expected ${t.expN}) => ${app.monthlySchedule.length === t.expN ? "PASS" : "FAIL"}`);
});

console.log("\n=== 3. PROCESSING FEE & TOTAL COST RECONCILIATION ===");
const feeTests = [
  { P: 500000, r: 8.5, y: 10, rate: 0, flat: 0 },
  { P: 500000, r: 8.5, y: 10, rate: 0.5, flat: 0 },
  { P: 500000, r: 8.5, y: 10, rate: 1.0, flat: 0 },
  { P: 500000, r: 8.5, y: 10, rate: 2.0, flat: 0 },
  { P: 500000, r: 8.5, y: 10, rate: 0, flat: 1000 },
  { P: 500000, r: 8.5, y: 10, rate: 0, flat: 2500 },
  { P: 500000, r: 8.5, y: 10, rate: 1.0, flat: 2500 },
];

feeTests.forEach(f => {
  const app = calculateEmiModule({
    loanAmount: f.P,
    interestRate: f.r,
    loanTermYears: f.y,
    loanTermMonths: 0,
    processingFeeRate: f.rate,
    processingFeeFlat: f.flat,
  });
  const expFee = f.P * (f.rate / 100) + f.flat;
  const expTotalCost = f.P + app.totalInterestPayable + expFee;
  const expRatio = (app.totalInterestPayable / expTotalCost) * 100;
  console.log(`Fee Rate=${f.rate}%, Flat=${f.flat}:`);
  console.log(`  Fee: App=${app.processingFeeTotal.toFixed(2)}, Exp=${expFee.toFixed(2)}`);
  console.log(`  TotalCost: App=${app.totalCostOfLoan.toFixed(2)}, Exp=${expTotalCost.toFixed(2)}`);
  console.log(`  InterestRatio: App=${app.interestRatio}%, Exp=${expRatio.toFixed(1)}%`);
  console.log(`  Reconciliation: ${Math.abs(app.processingFeeTotal - expFee) < 0.01 && Math.abs(app.totalCostOfLoan - expTotalCost) < 0.01 ? "PASS" : "FAIL"}`);
});

console.log("\n=== 4. PREPAYMENT BEHAVIOR (Reduce Tenure vs Reduce EMI) ===");
const basePrepay = calculateEmiModule({
  loanAmount: 500000,
  interestRate: 8.5,
  loanTermYears: 10,
  loanTermMonths: 0,
  extraMonthlyPrepayment: 0,
  oneTimePrepayment: 0,
});
const reduceTenure = calculateEmiModule({
  loanAmount: 500000,
  interestRate: 8.5,
  loanTermYears: 10,
  loanTermMonths: 0,
  extraMonthlyPrepayment: 1000,
  prepaymentStrategy: "reduce-tenure",
});
const reduceEmi = calculateEmiModule({
  loanAmount: 500000,
  interestRate: 8.5,
  loanTermYears: 10,
  loanTermMonths: 0,
  oneTimePrepayment: 50000,
  oneTimePrepaymentMonth: 12,
  oneTimePrepaymentYear: new Date().getFullYear(),
  prepaymentStrategy: "reduce-emi",
});

console.log(`Baseline: EMI=${basePrepay.monthlyEmi.toFixed(2)}, Months=${basePrepay.totalPaymentsCount}, TotalInt=${basePrepay.totalInterestPayable.toFixed(2)}`);
console.log(`Reduce Tenure (+1k/mo): Months=${reduceTenure.totalPaymentsCount}, TotalInt=${reduceTenure.totalInterestPayable.toFixed(2)}, IntSaved=${reduceTenure.interestSaved.toFixed(2)}, TimeSaved=${reduceTenure.timeSavedMonths}mo`);
console.log(`Reduce EMI (50k one-time): Months=${reduceEmi.totalPaymentsCount}, TotalInt=${reduceEmi.totalInterestPayable.toFixed(2)}, IntSaved=${reduceEmi.interestSaved.toFixed(2)}`);
console.log(`Final Month Ending Balances: Base=${basePrepay.monthlySchedule[basePrepay.monthlySchedule.length-1].endingBalance}, ReduceTenure=${reduceTenure.monthlySchedule[reduceTenure.monthlySchedule.length-1].endingBalance}`);

console.log("\n=== 5. REDUCING VS FLAT RATE EQUIVALENCE ===");
// Flat rate comparison
const flatTest = calculateEmiModule({
  loanAmount: 500000,
  interestRate: 8.5,
  loanTermYears: 10,
  flatInterestRate: 8.5,
});
console.log(`P=$500,000, Rate=8.5%, 10Y:`);
console.log(`  Reducing Balance Total Interest: $${flatTest.totalInterestPayable.toFixed(2)}`);
console.log(`  Flat Rate Total Interest:        $${flatTest.flatRateTotalInterest.toFixed(2)}`);
console.log(`  Flat Rate Monthly Payment:       $${flatTest.flatRateMonthlyPayment.toFixed(2)}`);
console.log(`  Difference:                      $${flatTest.flatVsReducingDifference.toFixed(2)}`);
