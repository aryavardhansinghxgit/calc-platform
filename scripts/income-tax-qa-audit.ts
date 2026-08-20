/**
 * Master QA Audit Script for US Income Tax Calculator
 */

import { calculateIncomeTax, IncomeTaxInput, FilingStatus, TaxYear } from "../src/lib/calculator-engine/formulas/income-tax";

console.log("==================================================");
console.log("U.S. INCOME TAX CALCULATOR MASTER QA AUDIT");
console.log("==================================================\n");

let passed = 0;
let failed = 0;
const defects: any[] = [];

function assert(condition: boolean, testName: string, details?: any) {
  if (condition) {
    console.log(`[PASS] ${testName}`);
    passed++;
  } else {
    console.error(`[FAIL] ${testName}`);
    if (details) console.error("       Details:", details);
    failed++;
    defects.push({ testName, details });
  }
}

// 1. PDF Baseline Case Audit (Page 1-2)
console.log("--- 1. PDF Baseline Case Audit ---");
const pdfBaseline = calculateIncomeTax({
  taxYear: '2026',
  filingStatus: 'single',
  wagesW2: 85000,
  fedTaxWithheld: 9500,
  stateTaxWithheld: 2500, // App default
  youngDependents: 0,
  otherDependents: 0,
  age: 30,
});

console.log("PDF Baseline Output:", {
  gross: pdfBaseline.totalGrossIncome,
  taxable: pdfBaseline.totalTaxableIncome,
  liability: pdfBaseline.totalTaxLiability,
  withheld: pdfBaseline.totalTaxWithheld,
  netRefundOrOwed: pdfBaseline.netTaxRefundOrOwed,
  effectiveRate: pdfBaseline.effectiveTaxRate,
  topBracket: pdfBaseline.marginalTaxBracketLabel,
  deduction: pdfBaseline.effectiveDeduction,
  takeHome: pdfBaseline.takeHomePay
});

assert(pdfBaseline.totalGrossIncome === 85000, "Gross Income is $85,000");
assert(pdfBaseline.effectiveDeduction === 15000, "App uses $15,000 deduction for 2026 single");
assert(pdfBaseline.totalTaxableIncome === 70000, "Taxable income is $70,000");
assert(pdfBaseline.totalTaxLiability === 10314, "Federal tax liability is $10,314");
assert(pdfBaseline.netTaxRefundOrOwed === -814, "Estimated tax owed is $814");
assert(pdfBaseline.effectiveTaxRate === 12.13, "Effective tax rate is 12.13%");
assert(pdfBaseline.marginalTaxBracketLabel === "22%", "Top bracket is 22%");
assert(pdfBaseline.takeHomePay === 72186, "Take home pay matches PDF ($72,186) when state withholding is $2,500");

// 2. Year Switching Audit (2025 vs 2026)
console.log("\n--- 2. Tax Year Separation Audit (2025 vs 2026) ---");
const single2025 = calculateIncomeTax({ taxYear: '2025', filingStatus: 'single', wagesW2: 85000, fedTaxWithheld: 9500 });
const single2026 = calculateIncomeTax({ taxYear: '2026', filingStatus: 'single', wagesW2: 85000, fedTaxWithheld: 9500 });

console.log("2025 vs 2026 Single $85k Comparison:", {
  year2025: {
    stdDeduction: single2025.effectiveDeduction,
    taxable: single2025.totalTaxableIncome,
    tax: single2025.totalTaxLiability,
    topBracket: single2025.marginalTaxBracketLabel
  },
  year2026: {
    stdDeduction: single2026.effectiveDeduction,
    taxable: single2026.totalTaxableIncome,
    tax: single2026.totalTaxLiability,
    topBracket: single2026.marginalTaxBracketLabel
  }
});

// Check if standard deduction differs between 2025 and 2026
assert(single2025.effectiveDeduction === 15000, "2025 Single Standard Deduction in App is $15,000");
// In the current code, STANDARD_DEDUCTIONS_2026 is also $15,000 (Stale/Identical!)
const stdDeductionDiffer = single2025.effectiveDeduction !== single2026.effectiveDeduction;
console.log("Standard deduction differs between 2025 and 2026:", stdDeductionDiffer);

// Check if brackets differ between 2025 and 2026
console.log("2025 tax liability:", single2025.totalTaxLiability, "2026 tax liability:", single2026.totalTaxLiability);

// 3. Child Tax Credit Audit
console.log("\n--- 3. Child Tax Credit (CTC) & Dependents Audit ---");
const noKids = calculateIncomeTax({ taxYear: '2026', filingStatus: 'joint', wagesW2: 120000, youngDependents: 0 });
const oneKid = calculateIncomeTax({ taxYear: '2026', filingStatus: 'joint', wagesW2: 120000, youngDependents: 1 });
const twoKids = calculateIncomeTax({ taxYear: '2026', filingStatus: 'joint', wagesW2: 120000, youngDependents: 2 });
const otherDep = calculateIncomeTax({ taxYear: '2026', filingStatus: 'joint', wagesW2: 120000, otherDependents: 1 });

console.log("CTC App Values:", {
  noKidsTax: noKids.totalTaxLiability,
  oneKidTax: oneKid.totalTaxLiability,
  oneKidCredit: oneKid.childTaxCredit,
  twoKidsCredit: twoKids.childTaxCredit,
  otherDepCredit: otherDep.otherDependentCredit
});

assert(oneKid.childTaxCredit === 2200, "App uses $2,200 per child (Statutory is $2,000)");
assert(otherDep.otherDependentCredit === 500, "App uses $500 for other dependents (ODC)");

// 4. CTC High-Income Phaseout Audit
console.log("\n--- 4. CTC High-Income Phaseout Audit ---");
const highIncomeKid = calculateIncomeTax({ taxYear: '2026', filingStatus: 'single', wagesW2: 500000, youngDependents: 1 });
console.log("Single $500k with 1 Child CTC:", highIncomeKid.childTaxCredit);
const hasPhaseout = highIncomeKid.childTaxCredit < 2200;
assert(hasPhaseout, "CTC should phase out above $200k Single / $400k MFJ", { actual: highIncomeKid.childTaxCredit });

// 5. Senior / Age Bonus Audit
console.log("\n--- 5. Senior (Age 65+) Standard Deduction Audit ---");
const age30 = calculateIncomeTax({ taxYear: '2026', filingStatus: 'single', wagesW2: 60000, age: 30 });
const age64 = calculateIncomeTax({ taxYear: '2026', filingStatus: 'single', wagesW2: 60000, age: 64 });
const age65 = calculateIncomeTax({ taxYear: '2026', filingStatus: 'single', wagesW2: 60000, age: 65 });
const age70Joint = calculateIncomeTax({ taxYear: '2026', filingStatus: 'joint', wagesW2: 60000, age: 70 });

console.log("Senior Deduction Adjustments:", {
  age30Deduction: age30.effectiveDeduction,
  age64Deduction: age64.effectiveDeduction,
  age65Deduction: age65.effectiveDeduction,
  age70JointDeduction: age70Joint.effectiveDeduction,
});

assert(age64.effectiveDeduction === age30.effectiveDeduction, "Age 64 gets standard base deduction");
assert(age65.effectiveDeduction === age30.effectiveDeduction + 1950, "Age 65 Single gets +$1,950 senior bonus");
assert(age70Joint.effectiveDeduction === 30000 + 1550, "Age 70 Joint gets +$1,550 senior bonus in app");

// 6. Preferential Income (Capital Gains & Qualified Dividends)
console.log("\n--- 6. Preferential Capital Gains & Qualified Dividends Audit ---");
const capGainsCase = calculateIncomeTax({
  taxYear: '2026',
  filingStatus: 'single',
  wagesW2: 40000,
  longTermCapitalGains: 20000,
  qualifiedDividends: 5000,
});

console.log("Preferential Income Breakdown:", {
  gross: capGainsCase.totalGrossIncome,
  taxableOrdinary: capGainsCase.taxableOrdinaryIncome,
  taxablePref: capGainsCase.taxablePreferentialIncome,
  ordinaryTax: capGainsCase.ordinaryIncomeTax,
  preferentialTax: capGainsCase.preferentialIncomeTax,
  totalTax: capGainsCase.totalTaxLiability,
});

assert(capGainsCase.taxablePreferentialIncome === 25000, "Preferential income correctly separated ($25,000)");

// 7. Self-Employment Tax Audit
console.log("\n--- 7. Self-Employment (Schedule SE) Audit ---");
const seCase = calculateIncomeTax({
  taxYear: '2026',
  filingStatus: 'single',
  wagesW2: 0,
  selfEmploymentIncome: 100000,
});

console.log("Self-Employment Calculation:", {
  gross: seCase.totalGrossIncome,
  seTax: seCase.selfEmploymentTax,
  atlDeduction: seCase.aboveTheLineDeductions,
  agi: seCase.adjustedGrossIncome,
  ordinaryTax: seCase.ordinaryIncomeTax,
  totalTax: seCase.totalTaxLiability,
});

// SE Tax = $100k * 0.9235 * 0.153 = $14,129.55
assert(Math.abs(seCase.selfEmploymentTax - 14129.55) < 0.1, "SE Tax = 15.3% of 92.35% net profit ($14,129.55)");
assert(Math.abs(seCase.aboveTheLineDeductions - 7064.775) < 0.1, "50% SE Tax is above-the-line deduction ($7,064.78)");

// 8. Itemized vs Standard Deduction Audit
console.log("\n--- 8. Itemized vs Standard Deduction Selection Audit ---");
const itemizedCase = calculateIncomeTax({
  taxYear: '2026',
  filingStatus: 'single',
  wagesW2: 120000,
  mortgageInterest: 12000,
  realEstateTax: 8000,
  stateTaxWithheld: 6000, // Total SALT = 8k + 6k = 14k -> capped at 10k
  charitableDonations: 4000,
});

console.log("Itemized Case:", {
  stdDeduction: itemizedCase.standardDeduction,
  itemizedDeduction: itemizedCase.itemizedDeductions,
  deductionUsed: itemizedCase.deductionUsed,
  effectiveDeduction: itemizedCase.effectiveDeduction,
});

// Itemized = $12k mortgage + $10k SALT cap + $4k charity = $26,000 > $15,000 standard
assert(itemizedCase.itemizedDeductions === 26000, "Itemized deductions = $26,000 (with $10,000 SALT cap)");
assert(itemizedCase.deductionUsed === 'itemized', "Engine selects itemized deductions when larger");
assert(itemizedCase.effectiveDeduction === 26000, "Effective deduction is $26,000");

// 9. Zero & Boundary Tests
console.log("\n--- 9. Zero & Extreme Input Tests ---");
const zeroIncome = calculateIncomeTax({ wagesW2: 0, fedTaxWithheld: 0 });
assert(zeroIncome.totalTaxLiability === 0, "Zero income produces $0 tax liability");
assert(zeroIncome.totalTaxableIncome === 0, "Zero income produces $0 taxable income");
assert(zeroIncome.effectiveTaxRate === 0, "Zero income produces 0% effective rate (no NaN)");

const largeIncome = calculateIncomeTax({ wagesW2: 5000000, fedTaxWithheld: 2000000 });
assert(largeIncome.marginalTaxBracketLabel === "37%", "Large income reaches 37% top bracket");
assert(largeIncome.totalTaxLiability > 0, "Large income produces positive tax liability");

console.log("\n==================================================");
console.log(`TOTAL AUDIT CHECKS: ${passed + failed}`);
console.log(`PASSED: ${passed}`);
console.log(`FAILED: ${failed}`);
console.log("==================================================");
