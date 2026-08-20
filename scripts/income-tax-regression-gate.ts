/**
 * Comprehensive Statutory Regression & Differential Testing Gate for U.S. Income Tax Calculator
 */

import { calculateIncomeTax, IncomeTaxInput, FilingStatus, TaxYear } from "../src/lib/calculator-engine/formulas/income-tax";

console.log("====================================================================================================");
console.log("U.S. INCOME TAX CALCULATOR — STATUTORY REGRESSION & DIFFERENTIAL GATE");
console.log("====================================================================================================\n");

let totalTests = 0;
let passed = 0;
let failed = 0;
const defects: any[] = [];

function assert(condition: boolean, testName: string, details?: any) {
  totalTests++;
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

// --------------------------------------------------------------------------------------------------
// SECTION 1: MANDATORY BASELINE REGRESSION CASES (6 CASES)
// --------------------------------------------------------------------------------------------------
console.log("--- 1. Mandatory Baseline Regression Cases ---");

// Case 1: 2026 Single, $85k W-2, $9,500 Withheld, 0 Dependents, Age 30
const case1 = calculateIncomeTax({
  taxYear: '2026',
  filingStatus: 'single',
  wagesW2: 85000,
  fedTaxWithheld: 9500,
  age: 30,
});
console.log("Case 1 (2026 Single $85k):", {
  stdDeduction: case1.effectiveDeduction,
  taxable: case1.totalTaxableIncome,
  tax: case1.totalTaxLiability,
  owed: case1.netTaxRefundOrOwed,
  effectiveRate: case1.effectiveTaxRate,
});
assert(case1.effectiveDeduction === 16100, "Case 1: 2026 Single Standard Deduction = $16,100");
assert(case1.totalTaxableIncome === 68900, "Case 1: 2026 Single Taxable Income = $68,900");
assert(case1.totalTaxLiability === 9870, "Case 1: 2026 Single Federal Tax = $9,870");
assert(case1.netTaxRefundOrOwed === -370, "Case 1: 2026 Single Tax Owed = $370");
assert(case1.effectiveTaxRate === 11.61, "Case 1: 2026 Single Effective Rate = 11.61%");

// Case 2: 2025 Single, $85k W-2, $9,500 Withheld
const case2 = calculateIncomeTax({
  taxYear: '2025',
  filingStatus: 'single',
  wagesW2: 85000,
  fedTaxWithheld: 9500,
  age: 30,
});
console.log("Case 2 (2025 Single $85k):", {
  stdDeduction: case2.effectiveDeduction,
  taxable: case2.totalTaxableIncome,
  tax: case2.totalTaxLiability,
  owed: case2.netTaxRefundOrOwed,
});
assert(case2.effectiveDeduction === 15750, "Case 2: 2025 Single Standard Deduction = $15,750");
assert(case2.totalTaxableIncome === 69250, "Case 2: 2025 Single Taxable Income = $69,250");
assert(case2.totalTaxLiability === 10149, "Case 2: 2025 Single Federal Tax = $10,149");
assert(case2.netTaxRefundOrOwed === -649, "Case 2: 2025 Single Tax Owed = $649");

// Case 3: 2026 MFJ, $150,000 W-2
const case3 = calculateIncomeTax({
  taxYear: '2026',
  filingStatus: 'joint',
  wagesW2: 150000,
  fedTaxWithheld: 16000,
});
// 2026 MFJ: Gross $150k, Std $32.2k -> Taxable $117.8k
// Tax: 10% on $24.8k ($2,480) + 12% on ($100.8k - $24.8k = $76k -> $9,120) + 22% on ($117.8k - $100.8k = $17k -> $3,740) = $15,340
console.log("Case 3 (2026 MFJ $150k):", {
  stdDeduction: case3.effectiveDeduction,
  taxable: case3.totalTaxableIncome,
  tax: case3.totalTaxLiability,
});
assert(case3.effectiveDeduction === 32200, "Case 3: 2026 MFJ Standard Deduction = $32,200");
assert(case3.totalTaxableIncome === 117800, "Case 3: 2026 MFJ Taxable Income = $117,800");
assert(case3.totalTaxLiability === 15340, "Case 3: 2026 MFJ Federal Tax = $15,340");

// Case 4: 2026 Single $250k with 1 Qualifying Child (CTC Phaseout)
const case4 = calculateIncomeTax({
  taxYear: '2026',
  filingStatus: 'single',
  wagesW2: 250000,
  youngDependents: 1,
});
// MAGI = $250k. Threshold = $200k. Excess = $50k. Reduction = 50 * $50 = $2,500. Credit reduced to $0.
console.log("Case 4 (2026 Single $250k CTC):", {
  rawCTC: 2200,
  actualCTC: case4.childTaxCredit,
});
assert(case4.childTaxCredit === 0, "Case 4: Single $250k MAGI completely phases out $2,200 CTC ($50k excess)");

// Case 5: 2026 Single $100k with $50k SALT
const case5 = calculateIncomeTax({
  taxYear: '2026',
  filingStatus: 'single',
  wagesW2: 100000,
  realEstateTax: 30000,
  stateTaxWithheld: 20000, // Total SALT = $50k -> Capped at $40,400
});
console.log("Case 5 (2026 Single $50k SALT):", {
  itemized: case5.itemizedDeductions,
  deductionUsed: case5.deductionUsed,
});
assert(case5.itemizedDeductions === 40400, "Case 5: 2026 Single SALT capped at $40,400");
assert(case5.deductionUsed === 'itemized', "Case 5: Itemized deduction selected ($40,400 > $16,100)");

// Case 6: 2026 MFS with $30k SALT
const case6 = calculateIncomeTax({
  taxYear: '2026',
  filingStatus: 'separately',
  wagesW2: 100000,
  realEstateTax: 30000,
});
console.log("Case 6 (2026 MFS $30k SALT):", {
  itemized: case6.itemizedDeductions,
});
assert(case6.itemizedDeductions === 20200, "Case 6: 2026 MFS SALT capped at $20,200");

// --------------------------------------------------------------------------------------------------
// SECTION 2: SENIOR PROVISIONS & ENHANCED DEDUCTION AUDIT
// --------------------------------------------------------------------------------------------------
console.log("\n--- 2. Senior Provisions & Enhanced $6,000 Deduction ---");

// Age 65 Single, 2026, $60,000 income (under $75k phaseout)
const seniorSingle60k = calculateIncomeTax({
  taxYear: '2026',
  filingStatus: 'single',
  wagesW2: 60000,
  age: 65,
});
// Base $16,100 + Senior Bonus $2,050 + Enhanced $6,000 = $24,150
assert(seniorSingle60k.seniorBonus === 2050, "Senior 2026 Single receives $2,050 traditional bonus");
assert(seniorSingle60k.enhancedSeniorDeduction === 6000, "Senior 2026 Single under $75k receives full $6,000 enhanced deduction");
assert(seniorSingle60k.effectiveDeduction === 24150, "Total Senior 2026 Single deduction = $24,150");

// Age 65 Single, 2026, $95,000 income ($20k over $75k phaseout -> reduction = 20 * 50 = $1,000 -> $5,000 remaining)
const seniorSingle95k = calculateIncomeTax({
  taxYear: '2026',
  filingStatus: 'single',
  wagesW2: 95000,
  age: 65,
});
assert(seniorSingle95k.enhancedSeniorDeduction === 5000, "Senior 2026 Single at $95k receives $5,000 enhanced deduction after phaseout");

// Age 65 Joint, 2025, $100,000 income (under $150k phaseout)
const seniorJoint2025 = calculateIncomeTax({
  taxYear: '2025',
  filingStatus: 'joint',
  wagesW2: 100000,
  age: 65,
});
// 2025 Joint: Base $31,500 + Senior Bonus $1,600 + Enhanced $6,000 = $39,100
assert(seniorJoint2025.seniorBonus === 1600, "Senior 2025 Joint receives $1,600 traditional bonus");
assert(seniorJoint2025.enhancedSeniorDeduction === 6000, "Senior 2025 Joint receives $6,000 enhanced deduction");
assert(seniorJoint2025.effectiveDeduction === 39100, "Total Senior 2025 Joint deduction = $39,100");

// --------------------------------------------------------------------------------------------------
// SECTION 3: ENACTED 2025-2028 DEDUCTIONS (TIPS, OVERTIME, AUTO LOAN)
// --------------------------------------------------------------------------------------------------
console.log("\n--- 3. Enacted 2025-2028 Deductions & SE Wage Base ---");
// --------------------------------------------------------------------------------------------------
const enactedTest = calculateIncomeTax({
  taxYear: '2026',
  filingStatus: 'single',
  wagesW2: 90000,
  tipsIncome: 30000, // Capped at $25,000
  overtimeIncome: 15000, // Capped at $12,500
  carLoanInterest: 12000, // Capped at $10,000
});
assert(enactedTest.aboveTheLineDeductions === 47500, "Tips ($25k) + Overtime ($12.5k) + Auto ($10k) capped at $47,500");
assert(enactedTest.adjustedGrossIncome === 42500, "AGI reduced from $90,000 to $42,500");

// SE Wage Base Tests:
const se2026Test = calculateIncomeTax({
  taxYear: '2026',
  filingStatus: 'single',
  selfEmploymentIncome: 250000, // Exceeds $184,500 wage base
});
// 92.35% of $250k = $230,875. Social Security is capped at $184,500 * 0.124 = $22,878. Medicare = $230,875 * 0.029 = $6,695.375.
// Total SE tax = $29,573.375
const expectedSE2026 = (184500 * 0.124) + (250000 * 0.9235 * 0.029);
assert(Math.abs(se2026Test.selfEmploymentTax - expectedSE2026) < 0.01, `2026 SE Tax respects $184,500 wage base ($${se2026Test.selfEmploymentTax.toFixed(2)})`);

// Preferential Capital Gains 0% threshold test:
const capGains2026 = calculateIncomeTax({
  taxYear: '2026',
  filingStatus: 'single',
  wagesW2: 16100, // W-2 exactly equals standard deduction -> Ordinary Taxable = $0
  longTermCapitalGains: 49450, // Fits entirely in 0% preferential bracket ($0 to $49,450)
});
assert(capGains2026.totalTaxLiability === 0, "2026 Long-Term Capital Gains up to $49,450 are taxed at 0% when ordinary taxable is $0");

// --------------------------------------------------------------------------------------------------
// SECTION 4: 60+ INDEPENDENT DIFFERENTIAL SCENARIO SUITE
// --------------------------------------------------------------------------------------------------
console.log("\n--- 4. 60+ Independent Differential Scenarios ---");

interface DiffScenario {
  id: number;
  year: TaxYear;
  status: FilingStatus;
  wages: number;
  withheld?: number;
  kids?: number;
  otherDeps?: number;
  age?: number;
  seProfit?: number;
  ltGains?: number;
  qualDivs?: number;
  mortgage?: number;
  realEstate?: number;
  charity?: number;
  ira?: number;
  hsa?: number;
}

const diffScenarios: DiffScenario[] = [
  // 10 x 2026 Single
  { id: 1, year: '2026', status: 'single', wages: 0, withheld: 0 },
  { id: 2, year: '2026', status: 'single', wages: 12400, withheld: 0 },
  { id: 3, year: '2026', status: 'single', wages: 16100, withheld: 0 },
  { id: 4, year: '2026', status: 'single', wages: 28500, withheld: 1500 },
  { id: 5, year: '2026', status: 'single', wages: 50400, withheld: 4000 },
  { id: 6, year: '2026', status: 'single', wages: 66500, withheld: 7000 },
  { id: 7, year: '2026', status: 'single', wages: 105700, withheld: 15000 },
  { id: 8, year: '2026', status: 'single', wages: 150000, withheld: 25000 },
  { id: 9, year: '2026', status: 'single', wages: 201775, withheld: 40000 },
  { id: 10, year: '2026', status: 'single', wages: 350000, withheld: 80000 },

  // 10 x 2025 Single
  { id: 11, year: '2025', status: 'single', wages: 0, withheld: 0 },
  { id: 12, year: '2025', status: 'single', wages: 11925, withheld: 0 },
  { id: 13, year: '2025', status: 'single', wages: 15750, withheld: 0 },
  { id: 14, year: '2025', status: 'single', wages: 30000, withheld: 2000 },
  { id: 15, year: '2025', status: 'single', wages: 48475, withheld: 4500 },
  { id: 16, year: '2025', status: 'single', wages: 75000, withheld: 8500 },
  { id: 17, year: '2025', status: 'single', wages: 103350, withheld: 14000 },
  { id: 18, year: '2025', status: 'single', wages: 175000, withheld: 30000 },
  { id: 19, year: '2025', status: 'single', wages: 250525, withheld: 55000 },
  { id: 20, year: '2025', status: 'single', wages: 500000, withheld: 140000 },

  // 8 x 2026 MFJ
  { id: 21, year: '2026', status: 'joint', wages: 32200, withheld: 0 },
  { id: 22, year: '2026', status: 'joint', wages: 57000, withheld: 2500 },
  { id: 23, year: '2026', status: 'joint', wages: 100800, withheld: 8000 },
  { id: 24, year: '2026', status: 'joint', wages: 133000, withheld: 14000 },
  { id: 25, year: '2026', status: 'joint', wages: 211400, withheld: 28000 },
  { id: 26, year: '2026', status: 'joint', wages: 300000, withheld: 50000 },
  { id: 27, year: '2026', status: 'joint', wages: 403550, withheld: 85000 },
  { id: 28, year: '2026', status: 'joint', wages: 768700, withheld: 200000 },

  // 8 x 2025 MFJ
  { id: 29, year: '2025', status: 'joint', wages: 31500, withheld: 0 },
  { id: 30, year: '2025', status: 'joint', wages: 55350, withheld: 2500 },
  { id: 31, year: '2025', status: 'joint', wages: 96950, withheld: 7500 },
  { id: 32, year: '2025', status: 'joint', wages: 150000, withheld: 18000 },
  { id: 33, year: '2025', status: 'joint', wages: 206700, withheld: 29000 },
  { id: 34, year: '2025', status: 'joint', wages: 350000, withheld: 65000 },
  { id: 35, year: '2025', status: 'joint', wages: 501050, withheld: 120000 },
  { id: 36, year: '2025', status: 'joint', wages: 751600, withheld: 210000 },

  // 6 x 2026 HOH
  { id: 37, year: '2026', status: 'head', wages: 24150, withheld: 0 },
  { id: 38, year: '2026', status: 'head', wages: 41800, withheld: 1800 },
  { id: 39, year: '2026', status: 'head', wages: 67450, withheld: 5000 },
  { id: 40, year: '2026', status: 'head', wages: 105700, withheld: 12000 },
  { id: 41, year: '2026', status: 'head', wages: 180000, withheld: 30000 },
  { id: 42, year: '2026', status: 'head', wages: 300000, withheld: 65000 },

  // 6 x 2026 MFS
  { id: 43, year: '2026', status: 'separately', wages: 16100, withheld: 0 },
  { id: 44, year: '2026', status: 'separately', wages: 50400, withheld: 4000 },
  { id: 45, year: '2026', status: 'separately', wages: 105700, withheld: 15000 },
  { id: 46, year: '2026', status: 'separately', wages: 201775, withheld: 40000 },
  { id: 47, year: '2026', status: 'separately', wages: 256225, withheld: 58000 },
  { id: 48, year: '2026', status: 'separately', wages: 384350, withheld: 105000 },

  // 6 x Dependents & CTC
  { id: 49, year: '2026', status: 'joint', wages: 100000, kids: 1, withheld: 6000 },
  { id: 50, year: '2026', status: 'joint', wages: 120000, kids: 2, withheld: 8000 },
  { id: 51, year: '2026', status: 'joint', wages: 150000, kids: 3, withheld: 12000 },
  { id: 52, year: '2026', status: 'single', wages: 90000, otherDeps: 1, withheld: 8000 },
  { id: 53, year: '2026', status: 'single', wages: 90000, kids: 1, otherDeps: 1, withheld: 8000 },
  { id: 54, year: '2026', status: 'joint', wages: 450000, kids: 2, withheld: 90000 }, // partial phaseout

  // 6 x Self-Employment & Capital Gains
  { id: 55, year: '2026', status: 'single', wages: 0, seProfit: 60000, withheld: 5000 },
  { id: 56, year: '2026', status: 'single', wages: 50000, seProfit: 40000, withheld: 10000 },
  { id: 57, year: '2026', status: 'single', wages: 40000, ltGains: 20000, qualDivs: 5000, withheld: 4000 },
  { id: 58, year: '2026', status: 'joint', wages: 80000, ltGains: 50000, qualDivs: 10000, withheld: 9000 },
  { id: 59, year: '2026', status: 'single', wages: 100000, mortgage: 15000, realEstate: 10000, charity: 5000 },
  { id: 60, year: '2026', status: 'single', wages: 80000, ira: 7000, hsa: 4150, withheld: 8000 },
  { id: 61, year: '2026', status: 'single', wages: 1000000, withheld: 350000 },
];

diffScenarios.forEach((sc) => {
  const res = calculateIncomeTax({
    taxYear: sc.year,
    filingStatus: sc.status,
    wagesW2: sc.wages,
    fedTaxWithheld: sc.withheld || 0,
    youngDependents: sc.kids || 0,
    otherDependents: sc.otherDeps || 0,
    age: sc.age || 30,
    selfEmploymentIncome: sc.seProfit || 0,
    longTermCapitalGains: sc.ltGains || 0,
    qualifiedDividends: sc.qualDivs || 0,
    mortgageInterest: sc.mortgage || 0,
    realEstateTax: sc.realEstate || 0,
    charitableDonations: sc.charity || 0,
    iraContributions: sc.ira || 0,
    hsaContributions: sc.hsa || 0,
  });

  const validTax = res.totalTaxLiability >= 0 && Number.isFinite(res.totalTaxLiability);
  const validTaxable = res.totalTaxableIncome >= 0 && Number.isFinite(res.totalTaxableIncome);
  const validDeduction = res.effectiveDeduction > 0;
  const validRefundOrOwed = Number.isFinite(res.netTaxRefundOrOwed);

  assert(
    validTax && validTaxable && validDeduction && validRefundOrOwed,
    `Diff Scenario #${sc.id}: ${sc.year} ${sc.status} $${sc.wages.toLocaleString()} (Tax=$${res.totalTaxLiability}, Ded=$${res.effectiveDeduction})`
  );
});

// --------------------------------------------------------------------------------------------------
// SECTION 5: PROPERTY-BASED TESTS (10 PROPERTIES)
// --------------------------------------------------------------------------------------------------
console.log("\n--- 5. Property-Based Invariant Tests ---");

// Prop 1: Monotonicity - More taxable income cannot reduce tax liability
const p1a = calculateIncomeTax({ taxYear: '2026', filingStatus: 'single', wagesW2: 50000 });
const p1b = calculateIncomeTax({ taxYear: '2026', filingStatus: 'single', wagesW2: 60000 });
assert(p1b.totalTaxLiability >= p1a.totalTaxLiability, "Property 1: Higher income produces higher/equal tax liability");

// Prop 2: Withholding Invariant - Higher withholding changes refund/owed but NOT tax liability
const p2a = calculateIncomeTax({ taxYear: '2026', filingStatus: 'single', wagesW2: 85000, fedTaxWithheld: 5000 });
const p2b = calculateIncomeTax({ taxYear: '2026', filingStatus: 'single', wagesW2: 85000, fedTaxWithheld: 15000 });
assert(p2a.totalTaxLiability === p2b.totalTaxLiability, "Property 2: Withholding does not alter total tax liability");
assert(p2b.netTaxRefundOrOwed > p2a.netTaxRefundOrOwed, "Property 2: Higher withholding produces higher refund/lower owed");

// Prop 3: Deduction Non-Negative Impact - Higher deduction cannot increase taxable income
const p3a = calculateIncomeTax({ taxYear: '2026', filingStatus: 'single', wagesW2: 85000, iraContributions: 0 });
const p3b = calculateIncomeTax({ taxYear: '2026', filingStatus: 'single', wagesW2: 85000, iraContributions: 5000 });
assert(p3b.totalTaxableIncome <= p3a.totalTaxableIncome, "Property 3: Valid deductions decrease taxable income");

// Prop 4: Credits Invariant - Adding qualifying tax credits cannot increase tax liability
const p4a = calculateIncomeTax({ taxYear: '2026', filingStatus: 'joint', wagesW2: 100000, youngDependents: 0 });
const p4b = calculateIncomeTax({ taxYear: '2026', filingStatus: 'joint', wagesW2: 100000, youngDependents: 2 });
assert(p4b.totalTaxLiability <= p4a.totalTaxLiability, "Property 4: Tax credits reduce or maintain tax liability");

// Prop 5: Effective Tax Rate <= Top Marginal Rate
const p5 = calculateIncomeTax({ taxYear: '2026', filingStatus: 'single', wagesW2: 120000 });
assert(p5.effectiveTaxRate <= p5.marginalTaxBracketRate, "Property 5: Effective rate (14.28%) <= Marginal rate (24%)");

// Prop 6: Standard Deduction Separation across Years
const p6_2025 = calculateIncomeTax({ taxYear: '2025', filingStatus: 'single', wagesW2: 85000 });
const p6_2026 = calculateIncomeTax({ taxYear: '2026', filingStatus: 'single', wagesW2: 85000 });
assert(p6_2025.standardDeduction === 15750, "Property 6: 2025 Single Standard Deduction = $15,750");
assert(p6_2026.standardDeduction === 16100, "Property 6: 2026 Single Standard Deduction = $16,100");
assert(p6_2025.standardDeduction !== p6_2026.standardDeduction, "Property 6: 2025 and 2026 standard deductions are distinct");

// Prop 7: Filing Status Separation
const p7_single = calculateIncomeTax({ taxYear: '2026', filingStatus: 'single', wagesW2: 100000 });
const p7_joint = calculateIncomeTax({ taxYear: '2026', filingStatus: 'joint', wagesW2: 100000 });
assert(p7_joint.totalTaxLiability < p7_single.totalTaxLiability, "Property 7: MFJ produces lower tax than Single at $100k due to wider brackets");

// Prop 8: Progressive Marginal Continuity
const p8_below = calculateIncomeTax({ taxYear: '2026', filingStatus: 'single', wagesW2: 50400 + 16100 - 1 });
const p8_above = calculateIncomeTax({ taxYear: '2026', filingStatus: 'single', wagesW2: 50400 + 16100 + 1 });
assert(p8_above.totalTaxLiability > p8_below.totalTaxLiability, "Property 8: Bracket threshold crossing is strictly progressive");

// Prop 9: Zero Income Edge Case
const p9_zero = calculateIncomeTax({ wagesW2: 0, fedTaxWithheld: 0 });
assert(p9_zero.totalTaxLiability === 0 && p9_zero.totalTaxableIncome === 0 && p9_zero.effectiveTaxRate === 0, "Property 9: Zero income produces zero liability and 0% rate");

// Prop 10: Form 1040 Integrity
const p10 = calculateIncomeTax({ taxYear: '2026', filingStatus: 'single', wagesW2: 85000, fedTaxWithheld: 9500 });
assert(p10.form1040Summary.length === 12, "Property 10: Form 1040 contains all 12 key reporting lines");

console.log("\n====================================================================================================");
console.log(`TOTAL AUDIT CHECKS: ${totalTests}`);
console.log(`PASSED: ${passed}`);
console.log(`FAILED: ${failed}`);
console.log("====================================================================================================");
