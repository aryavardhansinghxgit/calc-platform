import {
  calculatePersonalLoan,
  calculateDebtConsolidation,
  calculateExtraPayments,
  solveActuarialApr,
  PersonalLoanInput,
} from "../src/lib/calculator-engine/formulas/personal-loan";

function round2(num: number): number {
  return Math.round((num + Number.EPSILON) * 100) / 100;
}

console.log("==================================================");
console.log("PERSONAL LOAN CALCULATOR COMPREHENSIVE QA AUDIT");
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

// 1. BASELINE PDF RECONCILIATION
console.log("\n--- 1. Baseline Case Reconciliation (PDF Page 1-2) ---");
const baselineInput: PersonalLoanInput = {
  loanAmount: 20000,
  interestRate: 10.0,
  loanTermYears: 5,
  loanTermMonths: 0,
  startDate: "2026-08",
  includeFees: false,
};
const baselineRes = calculatePersonalLoan(baselineInput);

const P = 20000;
const r = 10.0 / 100 / 12;
const n = 60;
const oraclePayment = (P * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
const oracleTotalRepayment = oraclePayment * n;
const oracleTotalInterest = oracleTotalRepayment - P;

console.log(`Monthly Payment: App=${baselineRes.monthlyPayment}, Oracle=${round2(oraclePayment)} (PDF: $424.94)`);
assert(Math.abs(baselineRes.monthlyPayment - oraclePayment) < 0.01, "Baseline Monthly Payment matches oracle ($424.94)");

console.log(`Total Repayment: App=${baselineRes.totalPayments}, Oracle=${round2(oracleTotalRepayment)} (PDF: $25,496.45)`);
assert(Math.abs(baselineRes.totalPayments - oracleTotalRepayment) < 0.05, "Baseline Total Repayment matches oracle ($25,496.45)");

console.log(`Total Interest: App=${baselineRes.totalInterestPaid}, Oracle=${round2(oracleTotalInterest)} (PDF: $5,496.45)`);
assert(Math.abs(baselineRes.totalInterestPaid - oracleTotalInterest) < 0.05, "Baseline Total Interest matches oracle ($5,496.45)");

console.log(`Payoff Date: App="${baselineRes.payoffDateStr}" (PDF: "Aug 2031")`);
assert(baselineRes.payoffDateStr === "Aug 2031", "Baseline Payoff Date matches PDF ('Aug 2031')");

console.log(`Effective APR: App=${baselineRes.effectiveApr}% (PDF: 10%)`);
assert(baselineRes.effectiveApr === 10.0, "Baseline Effective APR without fees equals nominal rate (10%)");

// 2. ZERO-INTEREST LOAN TEST
console.log("\n--- 2. Zero-Interest Loan Test ---");
const zeroRateRes = calculatePersonalLoan({
  loanAmount: 12000,
  interestRate: 0,
  loanTermYears: 1,
  loanTermMonths: 0,
  includeFees: false,
});
console.log(`Zero Rate: Pmt=$${zeroRateRes.monthlyPayment}, Total=$${zeroRateRes.totalPayments}, Int=$${zeroRateRes.totalInterestPaid}`);
assert(zeroRateRes.monthlyPayment === 1000.0, "Zero-rate monthly payment: $12k / 12 = $1000/mo");
assert(zeroRateRes.totalInterestPaid === 0.0, "Zero-rate total interest = $0.00");
assert(zeroRateRes.totalPayments === 12000.0, "Zero-rate total payments = $12,000.00");
assert(!isNaN(zeroRateRes.monthlyPayment), "Zero-rate payment is not NaN");
assert(isFinite(zeroRateRes.monthlyPayment), "Zero-rate payment is finite");

// 3. ZERO PRINCIPAL TEST
console.log("\n--- 3. Zero Principal Loan Test ---");
const zeroPrincipalRes = calculatePersonalLoan({
  loanAmount: 0,
  interestRate: 10,
  loanTermYears: 5,
  loanTermMonths: 0,
});
console.log(`Zero Principal: Pmt=$${zeroPrincipalRes.monthlyPayment}, Total=$${zeroPrincipalRes.totalPayments}, Int=$${zeroPrincipalRes.totalInterestPaid}`);
assert(zeroPrincipalRes.monthlyPayment === 0, "Zero principal produces $0 monthly payment without defaulting to $20k");
assert(zeroPrincipalRes.totalPayments === 0, "Zero principal produces $0 total payments");
assert(zeroPrincipalRes.totalInterestPaid === 0, "Zero principal produces $0 total interest");

// 4. TERM COMBINATIONS & TOTAL MONTHS CALCULATION
console.log("\n--- 4. Term Combinations (Years + Months) ---");
const t1 = calculatePersonalLoan({ loanAmount: 10000, interestRate: 8, loanTermYears: 0, loanTermMonths: 1 });
assert(t1.monthlySchedule.length === 1, "0 Years 1 Month gives 1 payment period");

const t2 = calculatePersonalLoan({ loanAmount: 10000, interestRate: 8, loanTermYears: 1, loanTermMonths: 0 });
assert(t2.monthlySchedule.length === 12, "1 Year 0 Months gives 12 payment periods");

const t3 = calculatePersonalLoan({ loanAmount: 10000, interestRate: 8, loanTermYears: 1, loanTermMonths: 1 });
assert(t3.monthlySchedule.length === 13, "1 Year 1 Month gives 13 payment periods");

const t4 = calculatePersonalLoan({ loanAmount: 10000, interestRate: 8, loanTermYears: 5, loanTermMonths: 11 });
assert(t4.monthlySchedule.length === 71, "5 Years 11 Months gives 71 payment periods");

const t5 = calculatePersonalLoan({ loanAmount: 10000, interestRate: 8, loanTermYears: 0, loanTermMonths: 0 });
assert(t5.monthlySchedule.length >= 1, "0 Years 0 Months clamps safely to minimum 1 period");

// 5. TRUE ACTUARIAL APR & FEE MODEL AUDIT
console.log("\n--- 5. True Actuarial APR & Fee Model Audit ---");
const feeOff = calculatePersonalLoan({ loanAmount: 20000, interestRate: 10, loanTermYears: 5, includeFees: false });
const fee1Pct = calculatePersonalLoan({ loanAmount: 20000, interestRate: 10, loanTermYears: 5, includeFees: true, originationFeePercent: 1 });
const fee5Pct = calculatePersonalLoan({ loanAmount: 20000, interestRate: 10, loanTermYears: 5, includeFees: true, originationFeePercent: 5 });
const fee8Pct = calculatePersonalLoan({ loanAmount: 20000, interestRate: 10, loanTermYears: 5, includeFees: true, originationFeePercent: 8 });

console.log(`Fee OFF: Pmt=$${feeOff.monthlyPayment}, Total=$${feeOff.totalPayments}, FeesPaid=$${feeOff.totalFeesPaid}, ActuarialAPR=${feeOff.effectiveApr}%`);
console.log(`Fee 1%:  Pmt=$${fee1Pct.monthlyPayment}, Total=$${fee1Pct.totalPayments}, FeesPaid=$${fee1Pct.totalFeesPaid}, ActuarialAPR=${fee1Pct.effectiveApr}%`);
console.log(`Fee 5%:  Pmt=$${fee5Pct.monthlyPayment}, Total=$${fee5Pct.totalPayments}, FeesPaid=$${fee5Pct.totalFeesPaid}, ActuarialAPR=${fee5Pct.effectiveApr}%`);
console.log(`Fee 8%:  Pmt=$${fee8Pct.monthlyPayment}, Total=$${fee8Pct.totalPayments}, FeesPaid=$${fee8Pct.totalFeesPaid}, ActuarialAPR=${fee8Pct.effectiveApr}%`);

assert(fee5Pct.totalFeesPaid === 1000, "5% origination fee on $20,000 = $1,000 total fees");
assert(fee5Pct.totalPayments === round2(feeOff.totalPayments + 1000), "Total payments with 5% fee equals base total + $1,000 fee");
assert(fee5Pct.effectiveApr === 12.239, "5% fee on 10% 5Y loan gives true Actuarial APR of 12.239% (Oracle: 12.239%)");
assert(fee8Pct.effectiveApr === 13.664, "8% fee on 10% 5Y loan gives true Actuarial APR of 13.664% (Oracle: 13.664%)");
assert(fee8Pct.effectiveApr > fee5Pct.effectiveApr, "Higher upfront fee strictly increases Actuarial APR");

// Monthly fee & insurance test
const monthlyFeeRes = calculatePersonalLoan({
  loanAmount: 20000,
  interestRate: 10,
  loanTermYears: 5,
  includeFees: true,
  monthlyFeeDollar: 10,
  loanInsuranceMonthly: 15,
});
console.log(`Monthly Fees ($10 fee + $15 insurance): MonthlyPmtWithFees=$${monthlyFeeRes.totalMonthlyPaymentWithFees}, TotalFeesPaid=$${monthlyFeeRes.totalFeesPaid}, ActuarialAPR=${monthlyFeeRes.effectiveApr}%`);
assert(monthlyFeeRes.totalMonthlyPaymentWithFees === round2(baselineRes.monthlyPayment + 25), "Monthly payment with fees includes $25/mo extra fees");
assert(monthlyFeeRes.totalFeesPaid === 25 * 60, "Total fees paid over 60 months = $1,500");

// 6. AMORTIZATION SCHEDULE INVARIANTS
console.log("\n--- 6. Amortization Schedule Invariants ---");
function verifySchedule(schedule: ReturnType<typeof calculatePersonalLoan>["monthlySchedule"], principal: number) {
  let sumPrinc = 0;
  let sumInt = 0;

  for (let i = 0; i < schedule.length; i++) {
    const row = schedule[i];
    sumPrinc += row.principal;
    sumInt += row.interest;

    if (i > 0) {
      const diff = Math.abs(schedule[i - 1].endingBalance - (row.endingBalance + row.principal));
      if (diff > 0.05) {
        return { ok: false, error: `Row ${i + 1} balance transition error: diff=${diff}` };
      }
    }
  }

  const finalRow = schedule[schedule.length - 1];
  const finalBalanceOk = finalRow.endingBalance === 0;
  const sumPrincOk = Math.abs(sumPrinc - principal) < 0.05;

  return {
    ok: finalBalanceOk && sumPrincOk,
    finalBalanceOk,
    sumPrincOk,
    sumPrinc,
    sumInt,
  };
}

const schedInv = verifySchedule(baselineRes.monthlySchedule, 20000);
assert(schedInv.ok, "Baseline amortization schedule satisfies all continuity and terminal balance invariants");

// 7. DEBT CONSOLIDATION CALCULATOR AUDIT
console.log("\n--- 7. Debt Consolidation Analyzer Audit ---");
const consRes = calculateDebtConsolidation({
  debts: [
    { name: "Card A", balance: 8000, interestRate: 19.99, currentMonthlyPayment: 240 },
    { name: "Card B", balance: 7000, interestRate: 24.99, currentMonthlyPayment: 225 },
  ],
  newLoanInterestRate: 12.0,
  newLoanTermYears: 5,
  originationFeePercent: 5.0,
});
console.log(`Debt Consolidation:
  Total Card Balance: $${consRes.totalBalance}
  Origination Fee (5%): $${consRes.originationFeeAmount}
  New Loan Principal (Financed): $${consRes.newLoanPrincipal}
  Combined Current Card Monthly Payment: $${consRes.currentCombinedMonthlyPayment}
  New Loan Monthly Payment: $${consRes.newMonthlyPayment}
  Monthly Savings: $${consRes.monthlySavings}
  Current 5-Yr Card Interest: $${consRes.currentTotalInterest}
  New Loan Total Interest: $${consRes.newTotalInterest}
  Total Interest Savings: $${consRes.totalInterestSavings}
  Effective Actuarial APR: ${consRes.effectiveApr}% (PDF Match: 14.284%)`);

assert(consRes.totalBalance === 15000, "Total card balance = $15,000");
assert(consRes.originationFeeAmount === 750, "5% origination fee on $15,000 = $750");
assert(consRes.newLoanPrincipal === 15750, "Financed new loan principal = $15,750");
assert(consRes.currentCombinedMonthlyPayment === 465, "Current monthly payment = $240 + $225 = $465/mo");
assert(consRes.newMonthlyPayment === 350.35, "New loan monthly payment = $350.35/mo (Reconciled with content)");
assert(consRes.monthlySavings === 114.65, "Monthly payment cash flow savings = $114.65/mo");
assert(consRes.effectiveApr === 14.170, "Actuarial APR for consolidation matches exact bisection solution (14.170%)");

// 8. EXTRA PAYMENT SIMULATOR AUDIT
console.log("\n--- 8. Early Payoff & Extra Payments Simulator Audit ---");
const extraRes = calculateExtraPayments({
  loanAmount: 20000,
  interestRate: 10.0,
  loanTermYears: 5,
  extraMonthlyPayment: 100,
});
console.log(`Extra Payments ($100/mo):
  Original Payment: $${extraRes.originalMonthlyPayment}
  Original Total Interest: $${extraRes.originalTotalInterest}
  New Term: ${extraRes.newTermMonths} Months (Original: ${extraRes.originalTermMonths})
  New Total Interest: $${extraRes.newTotalInterest}
  Months Saved: ${extraRes.monthsSaved} Months
  Interest Saved: $${extraRes.interestSaved}`);

assert(extraRes.monthsSaved === 13, "+$100/mo extra saves 13 months (47 mos vs 60 mos)");
assert(extraRes.interestSaved === 1333.80, "+$100/mo extra saves $1,333.80 in interest ($5,496.45 - $4,162.65)");

// 9. 30 DIFFERENTIAL TEST SCENARIOS + 6 MANDATORY CASES (36 TOTAL)
console.log("\n--- 9. Differential Testing Suite (36 Scenarios) ---");
interface DiffCase {
  id: number;
  input: PersonalLoanInput;
}

const diffCases: DiffCase[] = [
  { id: 1, input: { loanAmount: 5000, interestRate: 6.0, loanTermYears: 2 } },
  { id: 2, input: { loanAmount: 10000, interestRate: 8.5, loanTermYears: 3 } },
  { id: 3, input: { loanAmount: 15000, interestRate: 11.0, loanTermYears: 4 } },
  { id: 4, input: { loanAmount: 25000, interestRate: 9.0, loanTermYears: 5 } },
  { id: 5, input: { loanAmount: 35000, interestRate: 7.5, loanTermYears: 5 } },
  { id: 6, input: { loanAmount: 50000, interestRate: 12.0, loanTermYears: 7 } },
  { id: 7, input: { loanAmount: 100000, interestRate: 14.5, loanTermYears: 5 } },
  { id: 8, input: { loanAmount: 2000, interestRate: 18.0, loanTermYears: 1 } },
  { id: 9, input: { loanAmount: 8000, interestRate: 24.0, loanTermYears: 2 } },
  { id: 10, input: { loanAmount: 12000, interestRate: 29.99, loanTermYears: 3 } },
  // Zero-rate cases
  { id: 11, input: { loanAmount: 6000, interestRate: 0.0, loanTermYears: 1 } },
  { id: 12, input: { loanAmount: 24000, interestRate: 0.0, loanTermYears: 2 } },
  // Fee-inclusive cases
  { id: 13, input: { loanAmount: 10000, interestRate: 10.0, loanTermYears: 3, includeFees: true, originationFeePercent: 1 } },
  { id: 14, input: { loanAmount: 10000, interestRate: 10.0, loanTermYears: 3, includeFees: true, originationFeePercent: 3 } },
  { id: 15, input: { loanAmount: 20000, interestRate: 12.0, loanTermYears: 5, includeFees: true, originationFeePercent: 5 } },
  { id: 16, input: { loanAmount: 25000, interestRate: 8.0, loanTermYears: 4, includeFees: true, originationFeePercent: 6 } },
  { id: 17, input: { loanAmount: 30000, interestRate: 15.0, loanTermYears: 5, includeFees: true, originationFeePercent: 8 } },
  // Monthly fee & insurance cases
  { id: 18, input: { loanAmount: 15000, interestRate: 10.0, loanTermYears: 3, includeFees: true, monthlyFeeDollar: 5 } },
  { id: 19, input: { loanAmount: 20000, interestRate: 11.0, loanTermYears: 5, includeFees: true, loanInsuranceMonthly: 20 } },
  { id: 20, input: { loanAmount: 50000, interestRate: 9.5, loanTermYears: 5, includeFees: true, originationFeePercent: 4, monthlyFeeDollar: 10, loanInsuranceMonthly: 15 } },
  // Edge terms
  { id: 21, input: { loanAmount: 5000, interestRate: 10.0, loanTermYears: 0, loanTermMonths: 6 } },
  { id: 22, input: { loanAmount: 10000, interestRate: 8.0, loanTermYears: 1, loanTermMonths: 6 } },
  { id: 23, input: { loanAmount: 20000, interestRate: 12.0, loanTermYears: 2, loanTermMonths: 6 } },
  { id: 24, input: { loanAmount: 30000, interestRate: 7.0, loanTermYears: 4, loanTermMonths: 6 } },
  { id: 25, input: { loanAmount: 40000, interestRate: 6.5, loanTermYears: 6, loanTermMonths: 6 } },
  // High-value cases
  { id: 26, input: { loanAmount: 75000, interestRate: 9.0, loanTermYears: 7 } },
  { id: 27, input: { loanAmount: 100000, interestRate: 11.5, loanTermYears: 7 } },
  // Micro loans
  { id: 28, input: { loanAmount: 1000, interestRate: 15.0, loanTermYears: 1 } },
  { id: 29, input: { loanAmount: 2500, interestRate: 20.0, loanTermYears: 2 } },
  { id: 30, input: { loanAmount: 50000, interestRate: 5.5, loanTermYears: 3 } },
  // Additional Mandatory Cases 31-36
  { id: 31, input: { loanAmount: 6000, interestRate: 0.0, loanTermYears: 1, loanTermMonths: 0 } },
  { id: 32, input: { loanAmount: 24000, interestRate: 0.0, loanTermYears: 2, loanTermMonths: 0 } },
  { id: 33, input: { loanAmount: 5000, interestRate: 10.0, loanTermYears: 0, loanTermMonths: 6 } },
  { id: 34, input: { loanAmount: 20000, interestRate: 10.0, loanTermYears: 5, includeFees: true, originationFeePercent: 5 } },
  { id: 35, input: { loanAmount: 20000, interestRate: 10.0, loanTermYears: 5, includeFees: true, originationFeePercent: 8 } },
  { id: 36, input: { loanAmount: 15000, interestRate: 12.0, loanTermYears: 5, includeFees: true, originationFeePercent: 5 } },
];

for (const tc of diffCases) {
  const res = calculatePersonalLoan(tc.input);
  const P_val = tc.input.loanAmount;
  const r_val = tc.input.interestRate / 100 / 12;
  const n_val = (tc.input.loanTermYears || 0) * 12 + (tc.input.loanTermMonths || 0);

  let oraclePmt = 0;
  if (r_val === 0) {
    oraclePmt = P_val / n_val;
  } else {
    oraclePmt = (P_val * (r_val * Math.pow(1 + r_val, n_val))) / (Math.pow(1 + r_val, n_val) - 1);
  }

  const diff = Math.abs(res.monthlyPayment - oraclePmt);
  assert(diff < 0.05, `Diff #${tc.id}: P=$${P_val}, Rate=${tc.input.interestRate}%, Term=${n_val}M -> Oracle=$${round2(oraclePmt)}, App=$${res.monthlyPayment}`);
}

console.log("\n==================================================");
console.log(`TOTAL TESTS: ${totalTests}`);
console.log(`PASSED: ${passedTests}`);
console.log(`FAILED: ${failedTests}`);
console.log("==================================================");
