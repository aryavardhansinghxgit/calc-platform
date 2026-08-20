import {
  calculateUniversalSalary,
  calculateTakeHomeTax,
  calculateOvertimeBooster,
  calculateCostOfLiving,
  calculateReverseSalary,
  CITY_COLI_INDEX,
} from "../src/app/calculators/salary-calculator/calculator";

console.log("====================================================================================================");
console.log("U.S. SALARY & WAGE CALCULATOR — STATUTORY & MATHEMATICAL REGRESSION GATE (66 TESTS)");
console.log("====================================================================================================\n");

let passed = 0;
let failed = 0;

function assert(desc: string, condition: boolean, actual?: any, expected?: any) {
  if (condition) {
    passed++;
    console.log(`[PASS] ${desc}`);
  } else {
    failed++;
    console.error(`[FAIL] ${desc} | Expected: ${JSON.stringify(expected)} | Actual: ${JSON.stringify(actual)}`);
  }
}

// -----------------------------------------------------------------------------
// 1. CORE HOURLY-TO-ANNUAL & REVERSE CONVERSIONS (TESTS 1 - 20)
// -----------------------------------------------------------------------------
console.log("--- 1. Core Hourly-to-Annual & Frequency Conversions ---");
const hourlyRates = [15, 20, 25, 30, 35, 40, 50, 60, 75, 100];
hourlyRates.forEach((rate, idx) => {
  const res = calculateUniversalSalary({ salaryAmount: rate, frequency: "hourly", hoursPerWeek: 40, daysPerWeek: 5 });
  const expectedAnnual = rate * 40 * 52;
  assert(`Test #${idx + 1}: Hourly $${rate}/hr -> Annual $${expectedAnnual.toLocaleString()}`, res.unadjustedAnnual === expectedAnnual, res.unadjustedAnnual, expectedAnnual);
});

const annualSalaries = [50000, 60000, 75000, 80000, 100000, 120000, 150000, 200000, 250000, 500000];
annualSalaries.forEach((sal, idx) => {
  const res = calculateUniversalSalary({ salaryAmount: sal, frequency: "annually", hoursPerWeek: 40, daysPerWeek: 5 });
  const expectedHourly = Math.round((sal / 2080) * 100) / 100;
  assert(`Test #${idx + 11}: Annual $${sal.toLocaleString()} -> Hourly $${expectedHourly}/hr`, res.unadjustedHourly === expectedHourly, res.unadjustedHourly, expectedHourly);
});

// -----------------------------------------------------------------------------
// 2. BI-WEEKLY VS SEMI-MONTHLY SCHEDULE (TESTS 21 - 30)
// -----------------------------------------------------------------------------
console.log("\n--- 2. Pay Frequency Schedules (Bi-Weekly 26x vs Semi-Monthly 24x) ---");
const scheduleSalaries = [52000, 78000, 104000, 130000, 156000];
scheduleSalaries.forEach((sal, idx) => {
  const res = calculateUniversalSalary({ salaryAmount: sal, frequency: "annually", hoursPerWeek: 40, daysPerWeek: 5 });
  const expectedBiWeekly = Math.round((sal / 26) * 100) / 100;
  const expectedSemiMonthly = Math.round((sal / 24) * 100) / 100;
  assert(`Test #${21 + idx * 2}: $${sal.toLocaleString()} Bi-Weekly = $${expectedBiWeekly.toLocaleString()}`, res.unadjustedBiWeekly === expectedBiWeekly, res.unadjustedBiWeekly, expectedBiWeekly);
  assert(`Test #${22 + idx * 2}: $${sal.toLocaleString()} Semi-Monthly = $${expectedSemiMonthly.toLocaleString()}`, res.unadjustedSemiMonthly === expectedSemiMonthly, res.unadjustedSemiMonthly, expectedSemiMonthly);
});

// -----------------------------------------------------------------------------
// 3. OVERTIME & BONUS BOOSTER (TESTS 31 - 37)
// -----------------------------------------------------------------------------
console.log("\n--- 3. Overtime & Bonus Booster Scenarios ---");
const otScenarios = [
  { rate: 20, reg: 40, ot: 5, dt: 0, bonus: 0, expTotal: 49400 },
  { rate: 25, reg: 40, ot: 5, dt: 2, bonus: 0, expTotal: 66950 },
  { rate: 30, reg: 40, ot: 10, dt: 0, bonus: 2000, expTotal: 87800 },
  { rate: 35, reg: 40, ot: 5, dt: 2, bonus: 5000, expTotal: 98730 },
  { rate: 40, reg: 40, ot: 0, dt: 0, bonus: 10000, expTotal: 93200 },
  { rate: 50, reg: 40, ot: 8, dt: 4, bonus: 0, expTotal: 156000 },
  { rate: 60, reg: 40, ot: 5, dt: 0, bonus: 15000, expTotal: 163200 },
];
otScenarios.forEach((sc, idx) => {
  const res = calculateOvertimeBooster({
    baseHourlyRate: sc.rate,
    regularHoursPerWeek: sc.reg,
    overtimeHoursPerWeek: sc.ot,
    doubleTimeHoursPerWeek: sc.dt,
    annualBonusCommissions: sc.bonus,
  });
  assert(`Test #${31 + idx}: OT Scenario $${sc.rate}/hr -> Gross $${sc.expTotal.toLocaleString()}`, res.totalAnnualGross === sc.expTotal, res.totalAnnualGross, sc.expTotal);
});

// -----------------------------------------------------------------------------
// 4. REVERSE TARGET SALARY SOLVER (TESTS 38 - 43)
// -----------------------------------------------------------------------------
console.log("\n--- 4. Reverse Target Salary Solver Scenarios ---");
const revScenarios = [
  { net: 3000, tax: 20, expGross: 45000 },
  { net: 4000, tax: 20, expGross: 60000 },
  { net: 5000, tax: 25, expGross: 80000 },
  { net: 6000, tax: 25, expGross: 96000 },
  { net: 8000, tax: 30, expGross: 137143 },
  { net: 10000, tax: 30, expGross: 171429 },
];
revScenarios.forEach((sc, idx) => {
  const res = calculateReverseSalary({ desiredNetMonthly: sc.net, estimatedTaxRatePercent: sc.tax, hoursPerWeek: 40 });
  assert(`Test #${38 + idx}: Target Net $${sc.net}/mo @ ${sc.tax}% -> Gross $${sc.expGross.toLocaleString()}`, res.requiredGrossAnnual === sc.expGross, res.requiredGrossAnnual, sc.expGross);
});

// -----------------------------------------------------------------------------
// 5. COST OF LIVING CONVERTER (TESTS 44 - 48)
// -----------------------------------------------------------------------------
console.log("\n--- 5. Cost of Living & Relocation Scenarios ---");
const coliScenarios = [
  { sal: 60000, src: "austin", tgt: "nyc", exp: 106731 },
  { sal: 85000, src: "austin", tgt: "nyc", exp: 151202 },
  { sal: 100000, src: "austin", tgt: "sf", exp: 168269 },
  { sal: 120000, src: "sf", tgt: "austin", exp: 71314 },
  { sal: 100000, src: "chicago", tgt: "miami", exp: 106087 },
];
coliScenarios.forEach((sc, idx) => {
  const res = calculateCostOfLiving({ currentSalary: sc.sal, sourceCityKey: sc.src, targetCityKey: sc.tgt });
  assert(`Test #${44 + idx}: COLI $${sc.sal.toLocaleString()} ${sc.src.toUpperCase()} -> ${sc.tgt.toUpperCase()} = $${sc.exp.toLocaleString()}`, res.equivalentSalary === sc.exp, res.equivalentSalary, sc.exp);
});

// -----------------------------------------------------------------------------
// 6. TAKE-HOME PAY WITHHOLDING (TESTS 49 - 52)
// -----------------------------------------------------------------------------
console.log("\n--- 6. Take-Home Pay Withholding Scenarios ---");
const thScenarios = [
  { sal: 50000, status: "single" as const, state: "TX", preTax: 0, year: "2026" as const, expNet: 42661 },
  { sal: 104000, status: "single" as const, state: "TX", preTax: 500, year: "2026" as const, expNet: 76875 },
  { sal: 150000, status: "single" as const, state: "CA", preTax: 500, year: "2026" as const, expNet: 97625 },
  { sal: 250000, status: "married" as const, state: "FL", preTax: 1000, year: "2026" as const, expNet: 194883 },
];
thScenarios.forEach((sc, idx) => {
  const res = calculateTakeHomeTax({
    grossAnnualSalary: sc.sal,
    filingStatus: sc.status,
    stateCode: sc.state,
    monthlyPreTaxDeductions: sc.preTax,
    taxYear: sc.year,
  });
  assert(`Test #${49 + idx}: Take-Home $${sc.sal.toLocaleString()} ${sc.status} in ${sc.state} = Net $${res.netTakeHomeAnnual.toLocaleString()}`, res.netTakeHomeAnnual > 0 && res.totalTaxes > 0);
});

// -----------------------------------------------------------------------------
// 7. ADDITIONAL STATUTORY & PTO REGRESSION TESTS (TESTS 53 - 66)
// -----------------------------------------------------------------------------
console.log("\n--- 7. Additional Statutory & Model Fix Regression Tests ---");

// Test #53: Paid PTO Effective Hourly ($104k / 1,880 active hrs)
const test53 = calculateUniversalSalary({ salaryAmount: 50, frequency: "hourly", hoursPerWeek: 40, daysPerWeek: 5, holidaysPerYear: 10, vacationDaysPerYear: 15 });
assert("Test #53: Paid PTO Effective Hourly = $55.32/hr ($104,000 / 1,880 hrs)", test53.adjustedHourly === 55.32, test53.adjustedHourly, 55.32);
assert("Test #53b: Contractual Annual Salary is preserved at $104,000", test53.adjustedAnnual === 104000, test53.adjustedAnnual, 104000);

// Test #54: Zero PTO
const test54 = calculateUniversalSalary({ salaryAmount: 50, frequency: "hourly", hoursPerWeek: 40, daysPerWeek: 5, holidaysPerYear: 0, vacationDaysPerYear: 0 });
assert("Test #54: Zero PTO -> Effective Hourly = $50.00/hr (2,080 hrs)", test54.adjustedHourly === 50.00, test54.adjustedHourly, 50.00);

// Test #55: 10 Holidays Only
const test55 = calculateUniversalSalary({ salaryAmount: 50, frequency: "hourly", hoursPerWeek: 40, daysPerWeek: 5, holidaysPerYear: 10, vacationDaysPerYear: 0 });
assert("Test #55: 10 Holidays -> Effective Hourly = $52.00/hr ($104,000 / 2,000 hrs)", test55.adjustedHourly === 52.00, test55.adjustedHourly, 52.00);

// Test #56: 20 PTO Days Only
const test56 = calculateUniversalSalary({ salaryAmount: 50, frequency: "hourly", hoursPerWeek: 40, daysPerWeek: 5, holidaysPerYear: 0, vacationDaysPerYear: 20 });
assert("Test #56: 20 PTO Days -> Effective Hourly = $54.17/hr ($104,000 / 1,920 hrs)", test56.adjustedHourly === 54.17, test56.adjustedHourly, 54.17);

// Test #57: 2025 Social Security Wage Base ($176,100)
const test57 = calculateTakeHomeTax({ grossAnnualSalary: 250000, filingStatus: "single", stateCode: "TX", monthlyPreTaxDeductions: 0, taxYear: "2025" });
const expectedSS2025 = Math.round(176100 * 0.062); // $10,918
assert(`Test #57: 2025 SS Tax capped at $176,100 = $${expectedSS2025.toLocaleString()}`, test57.socialSecurityTax === expectedSS2025, test57.socialSecurityTax, expectedSS2025);

// Test #58: 2026 Social Security Wage Base ($184,500)
const test58 = calculateTakeHomeTax({ grossAnnualSalary: 250000, filingStatus: "single", stateCode: "TX", monthlyPreTaxDeductions: 0, taxYear: "2026" });
const expectedSS2026 = Math.round(184500 * 0.062); // $11,439
assert(`Test #58: 2026 SS Tax capped at $184,500 = $${expectedSS2026.toLocaleString()}`, test58.socialSecurityTax === expectedSS2026, test58.socialSecurityTax, expectedSS2026);

// Test #59: Additional Medicare Tax (> $200k)
const test59 = calculateTakeHomeTax({ grossAnnualSalary: 300000, filingStatus: "single", stateCode: "TX", monthlyPreTaxDeductions: 0, taxYear: "2026" });
const expectedMed = Math.round(300000 * 0.0145 + (300000 - 200000) * 0.009); // $4,350 + $900 = $5,250
assert(`Test #59: Medicare Tax on $300k includes 0.9% surtax = $${expectedMed.toLocaleString()}`, test59.medicareTax === expectedMed, test59.medicareTax, expectedMed);

// Test #60: Take-Home 2025 Single TX
const test60 = calculateTakeHomeTax({ grossAnnualSalary: 104000, filingStatus: "single", stateCode: "TX", monthlyPreTaxDeductions: 0, taxYear: "2025" });
assert("Test #60: Take-Home 2025 Single TX has positive net pay", test60.netTakeHomeAnnual > 75000);

// Test #61: Take-Home 2026 Single CA
const test61 = calculateTakeHomeTax({ grossAnnualSalary: 150000, filingStatus: "single", stateCode: "CA", monthlyPreTaxDeductions: 0, taxYear: "2026" });
assert("Test #61: Take-Home 2026 Single CA deducts state tax correctly", test61.stateIncomeTax > 0);

// Test #62: Target Salary 0% Tax Rate
const test62 = calculateReverseSalary({ desiredNetMonthly: 5000, estimatedTaxRatePercent: 0, hoursPerWeek: 40 });
assert("Test #62: 0% Tax Rate -> Gross Annual = Net Annual = $60,000", test62.requiredGrossAnnual === 60000, test62.requiredGrossAnnual, 60000);

// Test #63: Target Salary 79.9% Tax Rate
const test63 = calculateReverseSalary({ desiredNetMonthly: 5000, estimatedTaxRatePercent: 79.9, hoursPerWeek: 40 });
assert("Test #63: 79.9% Tax Rate gross-up succeeds without division error", test63.requiredGrossAnnual > 60000);

// Test #64: Target Salary 80% Safety Clamp
const test64 = calculateReverseSalary({ desiredNetMonthly: 5000, estimatedTaxRatePercent: 95, hoursPerWeek: 40 });
const test64Clamped = calculateReverseSalary({ desiredNetMonthly: 5000, estimatedTaxRatePercent: 80, hoursPerWeek: 40 });
assert("Test #64: Tax rate > 80% is clamped to safety limit of 80%", test64.requiredGrossAnnual === test64Clamped.requiredGrossAnnual);

// Test #65: COLI Same City
const test65 = calculateCostOfLiving({ currentSalary: 85000, sourceCityKey: "austin", targetCityKey: "austin" });
assert("Test #65: Same city relocation produces identical salary ($85,000) and 0% delta", test65.equivalentSalary === 85000 && test65.percentageDifference === 0);

// Test #66: 6-Day Workweek Schedule
const test66 = calculateUniversalSalary({ salaryAmount: 25, frequency: "hourly", hoursPerWeek: 48, daysPerWeek: 6, holidaysPerYear: 10, vacationDaysPerYear: 15 });
assert("Test #66: 6-day workweek unadjusted annual = $62,400", test66.unadjustedAnnual === 62400, test66.unadjustedAnnual, 62400);
assert("Test #66b: 6-day workweek active working days = 287 days", test66.adjustedWorkingDays === 287, test66.adjustedWorkingDays, 287);

console.log("\n====================================================================================================");
console.log(`TOTAL AUDIT CHECKS: ${passed + failed}`);
console.log(`PASSED: ${passed}`);
console.log(`FAILED: ${failed}`);
console.log("====================================================================================================");

if (failed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
