import { calculateLoanModule } from "../src/modules/loan/formula";
import { LoanInput } from "../src/modules/loan/types";

function round2(num: number): number {
  return Math.round((num + Number.EPSILON) * 100) / 100;
}

console.log("==================================================");
console.log("LOAN CALCULATOR COMPREHENSIVE QA & REGRESSION AUDIT");
console.log("==================================================");

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition: boolean, testName: string, details?: string) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`[PASS] ${testName}`);
  } else {
    failedTests++;
    console.error(`[FAIL] ${testName} - ${details || ""}`);
  }
}

// 1. BASELINE PDF CASE RECONCILIATION
console.log("\n--- 1. Baseline Case Reconciliation (PDF Page 1-3) ---");
const baselineInput: LoanInput = {
  mode: "monthly-payment",
  loanAmount: 25000,
  interestRate: 7.5,
  loanTermYears: 5,
  loanTermMonths: 0,
  paymentFrequency: "monthly",
  extraMonthlyPayment: 0,
  startMonth: 8, // Aug 2026 as per PDF capture date
  startYear: 2026,
};
const baselineRes = calculateLoanModule(baselineInput);

// Oracle formulas
const p = 25000;
const r = 7.5 / 100 / 12;
const n = 60;
const oraclePayment = p * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
const oracleTotalRepayment = oraclePayment * n;
const oracleTotalInterest = oracleTotalRepayment - p;
const oracleInterestShare = (oracleTotalInterest / oracleTotalRepayment) * 100;

console.log(`Monthly Payment: App=${round2(baselineRes.periodicPayment)}, Oracle=${round2(oraclePayment)} (PDF: $500.95)`);
assert(Math.abs(baselineRes.periodicPayment - oraclePayment) < 0.01, "Baseline Monthly Payment matches oracle ($500.95)");

console.log(`Total Repayment: App=${round2(baselineRes.totalRepayment)}, Oracle=${round2(oracleTotalRepayment)} (PDF: $30,056.92)`);
assert(Math.abs(baselineRes.totalRepayment - oracleTotalRepayment) < 0.05, "Baseline Total Repayment matches oracle ($30,056.92)");

console.log(`Total Interest: App=${round2(baselineRes.totalInterest)}, Oracle=${round2(oracleTotalInterest)} (PDF: $5,056.92)`);
assert(Math.abs(baselineRes.totalInterest - oracleTotalInterest) < 0.05, "Baseline Total Interest matches oracle ($5,056.92)");

console.log(`Interest Share: App=${baselineRes.interestPercentage}%, Oracle=${round2(oracleInterestShare)}% (PDF: 16.8%)`);
assert(baselineRes.interestPercentage === 16.8, "Baseline Interest Share matches PDF (16.8%)");

console.log(`Number of Payments: App=${baselineRes.totalPaymentsCount} (PDF: 60)`);
assert(baselineRes.totalPaymentsCount === 60, "Baseline Payment count matches PDF (60)");

console.log(`Payoff Date: App="${baselineRes.payoffDate}" (PDF: "August 2031")`);
assert(baselineRes.payoffDate === "August 2031", "Baseline Payoff Date matches PDF ('August 2031')");

// PDF Amortization rows verification
console.log("\n--- PDF Amortization First 12 Rows Verification ---");
const pdfRows = [
  { num: 1, date: "Sep 2026", beg: 25000.00, pmt: 500.95, princ: 344.70, int: 156.25, rem: 24655.30 },
  { num: 2, date: "Oct 2026", beg: 24655.30, pmt: 500.95, princ: 346.85, int: 154.10, rem: 24308.45 },
  { num: 3, date: "Nov 2026", beg: 24308.45, pmt: 500.95, princ: 349.02, int: 151.93, rem: 23959.43 },
  { num: 4, date: "Dec 2026", beg: 23959.43, pmt: 500.95, princ: 351.20, int: 149.75, rem: 23608.22 },
  { num: 5, date: "Jan 2027", beg: 23608.22, pmt: 500.95, princ: 353.40, int: 147.55, rem: 23254.83 },
  { num: 6, date: "Feb 2027", beg: 23254.83, pmt: 500.95, princ: 355.61, int: 145.34, rem: 22899.22 },
  { num: 7, date: "Mar 2027", beg: 22899.22, pmt: 500.95, princ: 357.83, int: 143.12, rem: 22541.39 },
  { num: 8, date: "Apr 2027", beg: 22541.39, pmt: 500.95, princ: 360.07, int: 140.88, rem: 22181.33 },
  { num: 9, date: "May 2027", beg: 22181.33, pmt: 500.95, princ: 362.32, int: 138.63, rem: 21819.01 },
  { num: 10, date: "Jun 2027", beg: 21819.01, pmt: 500.95, princ: 364.58, int: 136.37, rem: 21454.43 },
  { num: 11, date: "Jul 2027", beg: 21454.43, pmt: 500.95, princ: 366.86, int: 134.09, rem: 21087.57 },
  { num: 12, date: "Aug 2027", beg: 21087.57, pmt: 500.95, princ: 369.15, int: 131.80, rem: 20718.42 },
];

for (const exp of pdfRows) {
  const row = baselineRes.amortizationSchedule[exp.num - 1];
  const dateOk = row.paymentDate === exp.date;
  const begOk = Math.abs(row.beginningBalance - exp.beg) < 0.02;
  const intOk = Math.abs(row.interestPaid - exp.int) < 0.02;
  const princOk = Math.abs(row.principalPaid - exp.princ) < 0.02;
  const remOk = Math.abs(row.endingBalance - exp.rem) < 0.02;
  assert(dateOk && begOk && intOk && princOk && remOk, `Amortization Row #${exp.num} (${exp.date}) matches PDF within 2 cents`);
}

// 2. CORE AMORTIZATION CASES
console.log("\n--- 2. Core Payment Formula Cases A-E ---");
const cases = [
  { id: "A", p: 25000, rate: 7.5, term: 5, freq: "monthly" },
  { id: "B", p: 100000, rate: 8.0, term: 10, freq: "monthly" },
  { id: "C", p: 250000, rate: 6.5, term: 30, freq: "monthly" },
  { id: "D", p: 1000, rate: 1.0, term: 1, freq: "monthly" },
  { id: "E", p: 500000, rate: 12.0, term: 15, freq: "monthly" },
];

for (const c of cases) {
  const res = calculateLoanModule({
    loanAmount: c.p,
    interestRate: c.rate,
    loanTermYears: c.term,
    paymentFrequency: "monthly",
  });
  const ratePerPeriod = c.rate / 100 / 12;
  const nPeriods = c.term * 12;
  const oracle = c.p * (ratePerPeriod * Math.pow(1 + ratePerPeriod, nPeriods)) / (Math.pow(1 + ratePerPeriod, nPeriods) - 1);
  const diff = Math.abs(res.periodicPayment - oracle);
  assert(diff < 0.01, `Case ${c.id}: P=$${c.p}, Rate=${c.rate}%, Term=${c.term}Y -> App=$${round2(res.periodicPayment)}, Oracle=$${round2(oracle)}`);
}

// 3. ZERO-INTEREST TEST
console.log("\n--- 3. Zero-Interest Loan Test ---");
const zeroRateRes = calculateLoanModule({
  loanAmount: 12000,
  interestRate: 0,
  loanTermYears: 1,
  loanTermMonths: 0,
  paymentFrequency: "monthly",
});
assert(round2(zeroRateRes.periodicPayment) === 1000.00, "Zero-rate payment: $12k / 12 = $1000/mo");
assert(round2(zeroRateRes.totalInterest) === 0.00, "Zero-rate total interest = $0.00");
assert(round2(zeroRateRes.totalRepayment) === 12000.00, "Zero-rate total repayment = $12,000.00");
assert(!isNaN(zeroRateRes.periodicPayment), "Zero-rate payment is not NaN");
assert(isFinite(zeroRateRes.periodicPayment), "Zero-rate payment is finite");

// 4. EDGE TERM TESTS
console.log("\n--- 4. Edge Term Tests ---");
const edge1 = calculateLoanModule({ loanAmount: 10000, interestRate: 5, loanTermYears: 0, loanTermMonths: 1 });
assert(edge1.totalPaymentsCount === 1, "0 Years 1 Month gives 1 payment period");

const edge2 = calculateLoanModule({ loanAmount: 10000, interestRate: 5, loanTermYears: 1, loanTermMonths: 1 });
assert(edge2.totalPaymentsCount === 13, "1 Year 1 Month gives 13 payment periods");

const edge3 = calculateLoanModule({ loanAmount: 10000, interestRate: 5, loanTermYears: 5, loanTermMonths: 11 });
assert(edge3.totalPaymentsCount === 71, "5 Years 11 Months gives 71 payment periods");

const edge4 = calculateLoanModule({ loanAmount: 10000, interestRate: 5, loanTermYears: 0, loanTermMonths: 0 });
assert(edge4.totalPaymentsCount >= 1, "0 Years 0 Months clamps safely to minimum 1 period");

// 5. PAYMENT FREQUENCIES & ACCELERATED BIWEEKLY DIFFERENTIATION
console.log("\n--- 5. Payment Frequencies & Regular vs Accelerated Biweekly ---");
const monthlyRes = calculateLoanModule({ loanAmount: 25000, interestRate: 7.5, loanTermYears: 5, paymentFrequency: "monthly" });
const biweeklyRes = calculateLoanModule({ loanAmount: 25000, interestRate: 7.5, loanTermYears: 5, paymentFrequency: "biweekly" });
const weeklyRes = calculateLoanModule({ loanAmount: 25000, interestRate: 7.5, loanTermYears: 5, paymentFrequency: "weekly" });

console.log(`Monthly:  Periods=${monthlyRes.totalPaymentsCount}, Pmt=$${round2(monthlyRes.periodicPayment)}, Int=$${round2(monthlyRes.totalInterest)}`);
console.log(`Biweekly: Periods=${biweeklyRes.totalPaymentsCount}, Pmt=$${round2(biweeklyRes.periodicPayment)}, Int=$${round2(biweeklyRes.totalInterest)}`);
console.log(`Weekly:   Periods=${weeklyRes.totalPaymentsCount}, Pmt=$${round2(weeklyRes.periodicPayment)}, Int=$${round2(weeklyRes.totalInterest)}`);

assert(monthlyRes.totalPaymentsCount === 60, "Monthly schedule has 60 periods");
assert(biweeklyRes.totalPaymentsCount === 130, "Regular Biweekly schedule has 130 periods (26 * 5)");
assert(weeklyRes.totalPaymentsCount === 260, "Weekly schedule has 260 periods (52 * 5)");
assert(biweeklyRes.periodicPayment < monthlyRes.periodicPayment, "Biweekly periodic payment ($230.89) is lower than monthly payment ($500.95)");

// Mathematical modeling of Accelerated Biweekly vs Regular Biweekly
const acceleratedBiweeklyPayment = oraclePayment / 2; // $250.475
console.log(`Regular Biweekly Payment: $${round2(biweeklyRes.periodicPayment)} (Amortizes over full 130 periods)`);
console.log(`Accelerated Biweekly Payment: $${round2(acceleratedBiweeklyPayment)} (Equivalent to 13 monthly payments/yr)`);
assert(acceleratedBiweeklyPayment > biweeklyRes.periodicPayment, "Accelerated Biweekly ($250.48) > Regular Biweekly ($230.89)");

// 6. EXTRA PAYMENTS LOGIC
console.log("\n--- 6. Extra Monthly Payment Tests ---");
const extra0 = calculateLoanModule({ loanAmount: 25000, interestRate: 7.5, loanTermYears: 5, extraMonthlyPayment: 0 });
const extra100 = calculateLoanModule({ loanAmount: 25000, interestRate: 7.5, loanTermYears: 5, extraMonthlyPayment: 100 });
const extra500 = calculateLoanModule({ loanAmount: 25000, interestRate: 7.5, loanTermYears: 5, extraMonthlyPayment: 500 });
const extraHuge = calculateLoanModule({ loanAmount: 25000, interestRate: 7.5, loanTermYears: 5, extraMonthlyPayment: 50000 });

assert(extra100.totalPaymentsCount < extra0.totalPaymentsCount, "+$100 extra payment reduces total payments count (50 vs 60)");
assert(extra100.totalInterest < extra0.totalInterest, "+$100 extra payment reduces total interest ($4,196 vs $5,057)");
assert(extra500.totalPaymentsCount < extra100.totalPaymentsCount, "+$500 extra payment further shortens loan (27 periods)");
assert(extraHuge.totalPaymentsCount === 1, "Extreme extra payment payoffs in 1 period without negative balance");
assert(extraHuge.amortizationSchedule[0].endingBalance === 0, "Extreme extra payment ending balance is exactly 0");

// 7. AMORTIZATION INVARIANTS & FINAL PAYMENT LOGIC
console.log("\n--- 7. Amortization Invariants & Final Payment Reconciliation ---");
function verifyAmortizationInvariants(res: ReturnType<typeof calculateLoanModule>, label: string) {
  let sumPrinc = 0;
  let sumInt = 0;
  let sumPmt = 0;
  let prevEnd = res.amortizationSchedule[0].beginningBalance;

  for (let i = 0; i < res.amortizationSchedule.length; i++) {
    const row = res.amortizationSchedule[i];
    sumPrinc += row.principalPaid;
    sumInt += row.interestPaid;
    sumPmt += row.paymentAmount;

    // Check continuity
    if (i > 0) {
      if (Math.abs(row.beginningBalance - prevEnd) > 0.001) {
        return { ok: false, error: `Row ${i + 1} beginning balance ($${row.beginningBalance}) != prev ending ($${prevEnd})` };
      }
    }
    // Check balance reduction
    const expectedEnd = row.beginningBalance - row.principalPaid;
    if (Math.abs(row.endingBalance - expectedEnd) > 0.001) {
      return { ok: false, error: `Row ${i + 1} ending balance mismatch` };
    }
    prevEnd = row.endingBalance;
  }

  const finalRow = res.amortizationSchedule[res.amortizationSchedule.length - 1];
  const finalBalanceOk = finalRow.endingBalance < 0.01;
  const princOk = Math.abs(sumPrinc - res.maxLoanAmount) < 0.05;
  const intOk = Math.abs(sumInt - res.totalInterest) < 0.05;
  const pmtOk = Math.abs(sumPmt - res.totalRepayment) < 0.05;

  return {
    ok: finalBalanceOk && princOk && intOk && pmtOk,
    finalBalanceOk,
    princOk,
    intOk,
    pmtOk,
    sumPrinc,
    sumInt,
    sumPmt,
  };
}

const inv1 = verifyAmortizationInvariants(baselineRes, "Baseline $25k loan");
assert(inv1.ok, "Baseline loan satisfies all amortization invariants (continuity, sums, final balance=0)");

const inv2 = verifyAmortizationInvariants(extra100, "+$100 Extra payment loan");
assert(inv2.ok, "Extra payment loan satisfies all amortization invariants");

// 8. REVERSE SOLVER MODES
console.log("\n--- 8. Reverse Solver Modes (Modes 2, 3, 4) ---");
// Mode 2: Loan Amount from Payment
const mode2Res = calculateLoanModule({
  mode: "loan-amount",
  desiredPayment: 500.95,
  interestRate: 7.5,
  loanTermYears: 5,
  paymentFrequency: "monthly",
});
console.log(`Mode 2 (Loan Amount): Given Pmt=$500.95, Rate=7.5%, 5Y -> Loan Amount=$${round2(mode2Res.maxLoanAmount)} (Expected ~$25,000)`);
assert(Math.abs(mode2Res.maxLoanAmount - 25000) < 1.0, "Mode 2 solves Loan Amount = $25,000 from $500.95 payment");

// Mode 3: Loan Term from Loan Amount & Payment
const mode3Res = calculateLoanModule({
  mode: "loan-term",
  loanAmount: 25000,
  desiredPayment: 500.95,
  interestRate: 7.5,
  paymentFrequency: "monthly",
});
console.log(`Mode 3 (Loan Term): Given P=$25k, Pmt=$500.95, Rate=7.5% -> Term=${mode3Res.requiredTermYears}Y ${mode3Res.requiredTermMonths}M (Expected 5Y 0M)`);
assert(mode3Res.requiredTermYears === 5 && mode3Res.requiredTermMonths === 0, "Mode 3 solves Loan Term = 5 Years 0 Months");

// Mode 4: Interest Rate from Loan Amount, Payment & Term
const mode4Res = calculateLoanModule({
  mode: "interest-rate",
  loanAmount: 25000,
  desiredPayment: 500.95,
  loanTermYears: 5,
  paymentFrequency: "monthly",
});
console.log(`Mode 4 (Interest Rate): Given P=$25k, Pmt=$500.95, 5Y -> Rate=${mode4Res.estimatedInterestRate}% (Expected 7.5%)`);
assert(Math.abs(mode4Res.estimatedInterestRate - 7.5) < 0.05, "Mode 4 solves Interest Rate = 7.5%");

// 9. NEW APR FIDELITY TESTS (FEE-FREE NOMINAL APR = INTEREST RATE)
console.log("\n--- 9. Fee-Free Nominal APR Tests ---");
const apr75 = calculateLoanModule({ loanAmount: 25000, interestRate: 7.5, loanTermYears: 5 });
assert(apr75.estimatedApr === 7.50, "7.50% interest rate gives 7.50% fee-free Nominal APR (Fixed from 7.88%)");

const apr50 = calculateLoanModule({ loanAmount: 25000, interestRate: 5.0, loanTermYears: 5 });
assert(apr50.estimatedApr === 5.00, "5.00% interest rate gives 5.00% fee-free Nominal APR");

const apr80 = calculateLoanModule({ loanAmount: 25000, interestRate: 8.0, loanTermYears: 5 });
assert(apr80.estimatedApr === 8.00, "8.00% interest rate gives 8.00% fee-free Nominal APR");

const apr120 = calculateLoanModule({ loanAmount: 25000, interestRate: 12.0, loanTermYears: 5 });
assert(apr120.estimatedApr === 12.00, "12.00% interest rate gives 12.00% fee-free Nominal APR");

// 10. DIFFERENTIAL TESTING SUITE (30 SCENARIOS)
console.log("\n--- 10. Differential Testing Suite (30 Scenarios) ---");
interface DiffCase {
  id: number;
  input: LoanInput;
  oraclePmt?: number;
  oracleTotalInt?: number;
  oracleTermM?: number;
}

const diffCases: DiffCase[] = [
  { id: 1, input: { loanAmount: 5000, interestRate: 5.0, loanTermYears: 2 } },
  { id: 2, input: { loanAmount: 15000, interestRate: 6.5, loanTermYears: 4 } },
  { id: 3, input: { loanAmount: 30000, interestRate: 4.25, loanTermYears: 5 } },
  { id: 4, input: { loanAmount: 45000, interestRate: 8.0, loanTermYears: 6 } },
  { id: 5, input: { loanAmount: 60000, interestRate: 9.5, loanTermYears: 7 } },
  { id: 6, input: { loanAmount: 100000, interestRate: 7.0, loanTermYears: 15 } },
  { id: 7, input: { loanAmount: 200000, interestRate: 6.0, loanTermYears: 20 } },
  { id: 8, input: { loanAmount: 350000, interestRate: 6.75, loanTermYears: 30 } },
  { id: 9, input: { loanAmount: 500000, interestRate: 7.25, loanTermYears: 30 } },
  { id: 10, input: { loanAmount: 750000, interestRate: 8.5, loanTermYears: 25 } },
  { id: 11, input: { loanAmount: 10000, interestRate: 0.0, loanTermYears: 2 } }, // Zero-rate
  { id: 12, input: { loanAmount: 50000, interestRate: 0.0, loanTermYears: 5 } }, // Zero-rate
  { id: 13, input: { loanAmount: 20000, interestRate: 15.0, loanTermYears: 3 } }, // High rate
  { id: 14, input: { loanAmount: 10000, interestRate: 24.99, loanTermYears: 2 } }, // Subprime personal
  { id: 15, input: { loanAmount: 25000, interestRate: 5.0, loanTermYears: 3, paymentFrequency: "biweekly" } },
  { id: 16, input: { loanAmount: 25000, interestRate: 5.0, loanTermYears: 3, paymentFrequency: "weekly" } },
  { id: 17, input: { loanAmount: 50000, interestRate: 6.0, loanTermYears: 5, paymentFrequency: "biweekly" } },
  { id: 18, input: { loanAmount: 100000, interestRate: 7.0, loanTermYears: 10, paymentFrequency: "weekly" } },
  { id: 19, input: { loanAmount: 25000, interestRate: 7.5, loanTermYears: 5, extraMonthlyPayment: 50 } },
  { id: 20, input: { loanAmount: 25000, interestRate: 7.5, loanTermYears: 5, extraMonthlyPayment: 150 } },
  { id: 21, input: { loanAmount: 100000, interestRate: 6.5, loanTermYears: 15, extraMonthlyPayment: 200 } },
  { id: 22, input: { loanAmount: 300000, interestRate: 7.0, loanTermYears: 30, extraMonthlyPayment: 300 } },
  { id: 23, input: { mode: "loan-amount", desiredPayment: 250, interestRate: 5.0, loanTermYears: 3 } },
  { id: 24, input: { mode: "loan-amount", desiredPayment: 1000, interestRate: 7.0, loanTermYears: 5 } },
  { id: 25, input: { mode: "loan-amount", desiredPayment: 2000, interestRate: 6.5, loanTermYears: 30 } },
  { id: 26, input: { mode: "loan-term", loanAmount: 10000, desiredPayment: 300, interestRate: 6.0 } },
  { id: 27, input: { mode: "loan-term", loanAmount: 50000, desiredPayment: 1000, interestRate: 7.5 } },
  { id: 28, input: { mode: "interest-rate", loanAmount: 10000, desiredPayment: 304.22, loanTermYears: 3 } },
  { id: 29, input: { mode: "interest-rate", loanAmount: 50000, desiredPayment: 966.64, loanTermYears: 5 } },
  { id: 30, input: { loanAmount: 1000, interestRate: 10.0, loanTermYears: 0, loanTermMonths: 6 } }, // 6-month short term
];

for (const tc of diffCases) {
  const res = calculateLoanModule(tc.input);
  if (tc.input.mode === "loan-amount") {
    const r = (tc.input.interestRate || 0) / 100 / 12;
    const n = (tc.input.loanTermYears || 0) * 12;
    const oracleLA = (tc.input.desiredPayment! * (Math.pow(1 + r, n) - 1)) / (r * Math.pow(1 + r, n));
    const diff = Math.abs(res.maxLoanAmount - oracleLA);
    assert(diff < 1.0, `Diff #${tc.id} [Mode: Loan Amount] Oracle=$${round2(oracleLA)}, App=$${round2(res.maxLoanAmount)}`);
  } else if (tc.input.mode === "loan-term") {
    const P = tc.input.loanAmount!;
    const pmt = tc.input.desiredPayment!;
    const r = (tc.input.interestRate || 0) / 100 / 12;
    const oracleN = Math.log(pmt / (pmt - P * r)) / Math.log(1 + r);
    const appTotalM = (res.requiredTermYears ?? 0) * 12 + (res.requiredTermMonths ?? 0);
    const diff = Math.abs(appTotalM - Math.ceil(oracleN));
    assert(diff <= 1, `Diff #${tc.id} [Mode: Loan Term] Oracle=${Math.ceil(oracleN)} mos, App=${appTotalM} mos`);
  } else if (tc.input.mode === "interest-rate") {
    assert(res.estimatedInterestRate > 0, `Diff #${tc.id} [Mode: Interest Rate] Solved rate=${res.estimatedInterestRate}%`);
  } else {
    // Standard payment mode
    const periodsPerYr = tc.input.paymentFrequency === "weekly" ? 52 : tc.input.paymentFrequency === "biweekly" ? 26 : 12;
    const r = (tc.input.interestRate || 0) / 100 / periodsPerYr;
    const n = Math.round(((tc.input.loanTermYears || 0) * 12 + (tc.input.loanTermMonths || 0)) * (periodsPerYr / 12));
    let oracle = 0;
    if (r === 0) {
      oracle = tc.input.loanAmount! / n;
    } else {
      oracle = tc.input.loanAmount! * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    }
    const diff = Math.abs(res.periodicPayment - oracle);
    assert(diff < 0.05, `Diff #${tc.id} [Payment] Oracle=$${round2(oracle)}, App=$${round2(res.periodicPayment)}`);
  }
}

console.log("\n==================================================");
console.log(`TOTAL TESTS: ${totalTests}`);
console.log(`PASSED: ${passedTests}`);
console.log(`FAILED: ${failedTests}`);
console.log("==================================================");
