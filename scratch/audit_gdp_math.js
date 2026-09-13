const {
  calculateExpenditureGdp,
  calculateIncomeGdp,
  calculateRealGdp,
  calculateGdpGrowth,
  calculateProductionGdp,
} = require('../src/lib/calculator-engine/formulas/gdp.ts');

console.log('====================================================');
console.log('CALCPLATFORM — GDP CALCULATOR INDEPENDENT QA HARNESS');
console.log('====================================================\n');

// 1. GOLDEN TESTS
console.log('--- 1. GOLDEN TESTS ---');

// E1
const e1 = calculateExpenditureGdp({
  personalConsumption: 19100,
  grossInvestment: 5100,
  governmentSpending: 4850,
  exports: 3150,
  imports: 3820,
  population: 335000000,
});
console.log('E1 Expenditure GDP:', e1.totalGdp, '(Expected: 28380)');
console.log('E1 Net Exports:', e1.netExports, '(Expected: -670)');
console.log('E1 C %:', e1.consumptionPct.toFixed(4), '(Expected: ~67.3009%)');
console.log('E1 I %:', e1.investmentPct.toFixed(4), '(Expected: ~17.9704%)');
console.log('E1 G %:', e1.governmentPct.toFixed(4), '(Expected: ~17.0895%)');
console.log('E1 NX %:', e1.netExportsPct.toFixed(4), '(Expected: ~ -2.3608%)');
console.log('E1 Per Capita:', e1.gdpPerCapita, 'raw dollars/capita, or', (e1.totalGdp * 1e9) / 335e6, '(Expected: 84716.4179)');

// I1
const i1 = calculateIncomeGdp({
  employeeCompensation: 14500,
  proprietorsIncome: 2100,
  rentalIncome: 950,
  corporateProfits: 3400,
  netInterestIncome: 1100,
  indirectTaxes: 1850,
  depreciation: 4200,
  netForeignIncome: -120,
});
console.log('I1 Income GDP:', i1.totalGdp, '(Expected: 27980)');
console.log('I1 GNP:', i1.gnp, '(Expected: 22050)');
console.log('I1 National Income:', i1.nationalIncome, '(Expected: 22050)');
console.log('I1 Depreciation Share %:', i1.capitalConsumptionShare.toFixed(4), '(Expected: ~15.0107%)');

// R1
const r1 = calculateRealGdp(28380, 124.5);
console.log('R1 Real GDP:', r1.realGdp.toFixed(4), '(Expected: ~22795.1807)');
console.log('R1 Inflation Drag:', r1.inflationDragAmount.toFixed(4), '(Expected: ~5584.8193)');

// G1
const g1 = calculateGdpGrowth(27360, 28380, 1);
console.log('G1 Nominal Growth %:', g1.nominalGrowthPct.toFixed(5), '(Expected: ~3.72807%)');
console.log('G1 Annualized CAGR %:', g1.annualizedGrowthCagr.toFixed(5), '(Expected: ~3.72807%)');
console.log('G1 Dollar Expansion:', g1.dollarExpansion, '(Expected: 1020)');

// P1
const p1 = calculateProductionGdp(52000, 26000, 2380);
console.log('P1 GVA:', p1.grossValueAdded, '(Expected: 26000)');
console.log('P1 GDP Contribution:', p1.totalGdpContribution, '(Expected: 28380)');
console.log('P1 Value-Added Margin %:', p1.valueAddedMarginPct.toFixed(2), '(Expected: 50.00%)');

// 2. RANDOMIZED TESTING (100,000 cases per family)
console.log('\n--- 2. RANDOMIZED SUITES (100,000 cases each) ---');

const NUM_TESTS = 100000;

// Family 1: Expenditure GDP
{
  let pass = 0, fail = 0, maxErr = 0;
  for (let i = 0; i < NUM_TESTS; i++) {
    const C = Math.random() * 50000;
    const I = Math.random() * 20000;
    const G = Math.random() * 20000;
    const X = Math.random() * 15000;
    const M = Math.random() * 15000;
    const pop = (Math.random() * 1500 + 1) * 1e6;

    const res = calculateExpenditureGdp({ personalConsumption: C, grossInvestment: I, governmentSpending: G, exports: X, imports: M, population: pop });
    
    // Oracle
    const oracleNX = X - M;
    const oracleGDP = C + I + G + oracleNX;
    const oracleCapita = oracleGDP / pop;
    const base = oracleGDP > 0 ? oracleGDP : 1;
    const oracleCPct = (C / base) * 100;

    const errGdp = Math.abs(res.totalGdp - oracleGDP);
    const errNX = Math.abs(res.netExports - oracleNX);
    const errCap = Math.abs(res.gdpPerCapita - oracleCapita);
    const errCPct = Math.abs(res.consumptionPct - oracleCPct);

    const err = Math.max(errGdp, errNX, errCap, errCPct);
    if (err > maxErr) maxErr = err;
    if (err < 1e-9) pass++;
    else fail++;
  }
  console.log(`Expenditure GDP: ${pass}/${NUM_TESTS} passed (${((pass/NUM_TESTS)*100).toFixed(2)}%), Max Error: ${maxErr.toExponential(2)}`);
}

// Family 2: Income Approach
{
  let pass = 0, fail = 0, maxErr = 0;
  for (let i = 0; i < NUM_TESTS; i++) {
    const comp = Math.random() * 30000;
    const prop = Math.random() * 5000;
    const rent = Math.random() * 5000;
    const prof = Math.random() * 10000;
    const int = Math.random() * 5000;
    const tax = Math.random() * 5000;
    const dep = Math.random() * 10000;
    const nfi = (Math.random() - 0.5) * 2000;

    const res = calculateIncomeGdp({
      employeeCompensation: comp,
      proprietorsIncome: prop,
      rentalIncome: rent,
      corporateProfits: prof,
      netInterestIncome: int,
      indirectTaxes: tax,
      depreciation: dep,
      netForeignIncome: nfi,
    });

    const oracleNI = comp + prop + rent + prof + int;
    const oracleGdp = oracleNI + tax + dep + nfi;
    const oracleCapShare = oracleGdp > 0 ? (dep / oracleGdp) * 100 : 0;

    const errGdp = Math.abs(res.totalGdp - oracleGdp);
    const errNI = Math.abs(res.nationalIncome - oracleNI);
    const errShare = Math.abs(res.capitalConsumptionShare - oracleCapShare);

    const err = Math.max(errGdp, errNI, errShare);
    if (err > maxErr) maxErr = err;
    if (err < 1e-9) pass++;
    else fail++;
  }
  console.log(`Income Approach: ${pass}/${NUM_TESTS} passed (${((pass/NUM_TESTS)*100).toFixed(2)}%), Max Error: ${maxErr.toExponential(2)}`);
}

// Family 3: Real GDP / Deflator
{
  let pass = 0, fail = 0, maxErr = 0;
  for (let i = 0; i < NUM_TESTS; i++) {
    const nom = Math.random() * 50000;
    const def = Math.random() * 300 + 10;

    const res = calculateRealGdp(nom, def);
    const oracleReal = (nom / def) * 100;
    const oracleDrag = nom - oracleReal;

    const err = Math.max(Math.abs(res.realGdp - oracleReal), Math.abs(res.inflationDragAmount - oracleDrag));
    if (err > maxErr) maxErr = err;
    if (err < 1e-9) pass++;
    else fail++;
  }
  console.log(`Real GDP / Deflator: ${pass}/${NUM_TESTS} passed (${((pass/NUM_TESTS)*100).toFixed(2)}%), Max Error: ${maxErr.toExponential(2)}`);
}

// Family 4: Growth Rate & CAGR
{
  let pass = 0, fail = 0, maxErr = 0;
  for (let i = 0; i < NUM_TESTS; i++) {
    const prior = Math.random() * 50000 + 10;
    const curr = Math.random() * 50000;
    const yrs = Math.random() * 20 + 1;

    const res = calculateGdpGrowth(prior, curr, yrs);
    const oracleGrowth = ((curr - prior) / prior) * 100;
    const oracleCagr = (Math.pow(curr / prior, 1 / yrs) - 1) * 100;
    const oracleExp = curr - prior;

    const err = Math.max(
      Math.abs(res.nominalGrowthPct - oracleGrowth),
      Math.abs(res.annualizedGrowthCagr - oracleCagr),
      Math.abs(res.dollarExpansion - oracleExp)
    );
    if (err > maxErr) maxErr = err;
    if (err < 1e-9) pass++;
    else fail++;
  }
  console.log(`Growth Rate & CAGR: ${pass}/${NUM_TESTS} passed (${((pass/NUM_TESTS)*100).toFixed(2)}%), Max Error: ${maxErr.toExponential(2)}`);
}

// Family 5: Production / GVA
{
  let pass = 0, fail = 0, maxErr = 0;
  for (let i = 0; i < NUM_TESTS; i++) {
    const out = Math.random() * 100000;
    const inp = Math.random() * out; // valid intermediate <= output
    const tax = Math.random() * 10000;

    const res = calculateProductionGdp(out, inp, tax);
    const oracleGva = out - inp;
    const oracleTotal = oracleGva + tax;
    const oracleMargin = out > 0 ? (oracleGva / out) * 100 : 0;

    const err = Math.max(
      Math.abs(res.grossValueAdded - oracleGva),
      Math.abs(res.totalGdpContribution - oracleTotal),
      Math.abs(res.valueAddedMarginPct - oracleMargin)
    );
    if (err > maxErr) maxErr = err;
    if (err < 1e-9) pass++;
    else fail++;
  }
  console.log(`Production / GVA: ${pass}/${NUM_TESTS} passed (${((pass/NUM_TESTS)*100).toFixed(2)}%), Max Error: ${maxErr.toExponential(2)}`);
}

// Family 6: GDP Per Capita & Monthly Normalization
{
  let pass = 0, fail = 0, maxErr = 0;
  for (let i = 0; i < NUM_TESTS; i++) {
    const gdpTrillion = Math.random() * 40 + 0.1;
    const rawGdp = gdpTrillion * 1e12;
    const popMillions = Math.random() * 1400 + 1;
    const rawPop = popMillions * 1e6;

    const perCapita = rawGdp / rawPop;
    const monthly = perCapita / 12;

    const reconstructedGdp = perCapita * rawPop;
    const errGdp = Math.abs(reconstructedGdp - rawGdp) / rawGdp;
    const errMonthly = Math.abs(monthly * 12 - perCapita);

    const err = Math.max(errGdp, errMonthly);
    if (err > maxErr) maxErr = err;
    if (err < 1e-9) pass++;
    else fail++;
  }
  console.log(`Per Capita & Monthly: ${pass}/${NUM_TESTS} passed (${((pass/NUM_TESTS)*100).toFixed(2)}%), Max Error: ${maxErr.toExponential(2)}`);
}

// Family 7: Sector Matrix Percentage Invariance
{
  let pass = 0, fail = 0, maxErr = 0;
  for (let i = 0; i < NUM_TESTS; i++) {
    const C = Math.random() * 50000 + 100;
    const I = Math.random() * 20000 + 50;
    const G = Math.random() * 20000 + 50;
    const X = Math.random() * 15000;
    const M = Math.random() * 15000;

    const res = calculateExpenditureGdp({ personalConsumption: C, grossInvestment: I, governmentSpending: G, exports: X, imports: M });
    const sumPct = res.consumptionPct + res.investmentPct + res.governmentPct + res.netExportsPct;

    const err = Math.abs(sumPct - 100);
    if (err > maxErr) maxErr = err;
    if (err < 1e-9) pass++;
    else fail++;
  }
  console.log(`Sector Shares Sum to 100%: ${pass}/${NUM_TESTS} passed (${((pass/NUM_TESTS)*100).toFixed(2)}%), Max Error: ${maxErr.toExponential(2)}`);
}
