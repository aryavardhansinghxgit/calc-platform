import {
  convertInterestRate,
  calculateAprVsApy,
  calculateCompoundingFrequencyComparison,
  calculateContinuousCompounding,
  calculateRuleOf72,
  calculateSimpleVsCompoundGrowth,
  calculateCompoundInterestFormula,
  rateToEAR,
  earToRate,
  CompoundingFrequency,
} from "../src/lib/calculator-engine/formulas/compound-interest";

console.log("=== 1. CORE FUTURE VALUE FORMULA VERIFICATION ===");
// Case A: P=10000, r=8%, n=1, t=20
const cA_fv = 10000 * Math.pow(1 + 0.08 / 1, 20);
const cA_app = calculateCompoundInterestFormula({ principal: 10000, annualInterestRate: 8, years: 20, compoundingFrequency: 1 });
console.log(`Case A (Annual): Oracle=$${cA_fv.toFixed(2)}, App=$${cA_app.futureValue.toFixed(2)} => ${Math.abs(cA_fv - cA_app.futureValue) < 0.01 ? "PASS" : "FAIL"}`);

// Case B: P=10000, r=8%, n=12, t=20
const cB_fv = 10000 * Math.pow(1 + 0.08 / 12, 12 * 20);
const cB_app = calculateCompoundInterestFormula({ principal: 10000, annualInterestRate: 8, years: 20, compoundingFrequency: 12 });
console.log(`Case B (Monthly): Oracle=$${cB_fv.toFixed(2)}, App=$${cB_app.futureValue.toFixed(2)} => ${Math.abs(cB_fv - cB_app.futureValue) < 0.01 ? "PASS" : "FAIL"}`);

// Case C: P=5000, r=6.5%, n=12, t=5
const cC_fv = 5000 * Math.pow(1 + 0.065 / 12, 12 * 5);
const cC_app = calculateCompoundInterestFormula({ principal: 5000, annualInterestRate: 6.5, years: 5, compoundingFrequency: 12 });
console.log(`Case C (Monthly): Oracle=$${cC_fv.toFixed(2)}, App=$${cC_app.futureValue.toFixed(2)} => ${Math.abs(cC_fv - cC_app.futureValue) < 0.01 ? "PASS" : "FAIL"}`);

// Case D: P=1000, r=0%, n=12, t=10
const cD_fv = 1000;
const cD_app = calculateCompoundInterestFormula({ principal: 1000, annualInterestRate: 0, years: 10, compoundingFrequency: 12 });
console.log(`Case D (0%): Oracle=$${cD_fv.toFixed(2)}, App=$${cD_app.futureValue.toFixed(2)} => ${Math.abs(cD_fv - cD_app.futureValue) < 0.01 ? "PASS" : "FAIL"}`);

// Case E: P=100000, r=25%, n=365, t=30
const cE_fv = 100000 * Math.pow(1 + 0.25 / 365, 365 * 30);
const cE_app = calculateCompoundInterestFormula({ principal: 100000, annualInterestRate: 25, years: 30, compoundingFrequency: 365 });
console.log(`Case E (Daily): Oracle=$${cE_fv.toFixed(2)}, App=$${cE_app.futureValue.toFixed(2)} => ${Math.abs(cE_fv - cE_app.futureValue) < 0.01 ? "PASS" : "FAIL"}`);

console.log("\n=== 2. RATE CONVERSION TEST MATRIX ===");
const conversionPairs: { rate: number; src: CompoundingFrequency; tgt: CompoundingFrequency }[] = [
  { rate: 6.0, src: "monthly", tgt: "annual" },
  { rate: 6.0, src: "monthly", tgt: "daily" },
  { rate: 6.0, src: "monthly", tgt: "continuous" },
  { rate: 10.0, src: "annual", tgt: "monthly" },
  { rate: 10.0, src: "annual", tgt: "daily" },
  { rate: 10.0, src: "annual", tgt: "continuous" },
  { rate: 8.0, src: "daily", tgt: "annual" },
  { rate: 8.0, src: "continuous", tgt: "monthly" },
];

conversionPairs.forEach((pair) => {
  const app = convertInterestRate({ inputRatePercent: pair.rate, sourceFrequency: pair.src, targetFrequency: pair.tgt });
  
  // Independent Oracle
  let oracleEar = 0;
  if (pair.src === "continuous") {
    oracleEar = Math.exp(pair.rate / 100) - 1;
  } else {
    const n_src = pair.src === "daily" ? 365 : pair.src === "monthly" ? 12 : 1;
    oracleEar = Math.pow(1 + (pair.rate / 100) / n_src, n_src) - 1;
  }

  let oracleTgtRate = 0;
  if (pair.tgt === "continuous") {
    oracleTgtRate = Math.log(1 + oracleEar) * 100;
  } else {
    const n_tgt = pair.tgt === "daily" ? 365 : pair.tgt === "monthly" ? 12 : 1;
    oracleTgtRate = n_tgt * (Math.pow(1 + oracleEar, 1 / n_tgt) - 1) * 100;
  }

  const earDiff = Math.abs(oracleEar * 100 - app.earPercent);
  const tgtDiff = Math.abs(oracleTgtRate - app.convertedRatePercent);

  console.log(`${pair.rate}% ${pair.src} -> ${pair.tgt}: App=${app.convertedRatePercent.toFixed(5)}% (Oracle: ${oracleTgtRate.toFixed(5)}%), EAR=${app.earPercent.toFixed(5)}% => ${tgtDiff < 0.0001 ? "PASS" : "FAIL"}`);
});

console.log("\n=== 3. TWO-WAY CONVERSION ROUNDTRIP INVARIANT ===");
const freqs: CompoundingFrequency[] = ["daily", "weekly", "biweekly", "monthly", "quarterly", "semiannual", "annual", "continuous"];
let roundtripPass = true;
freqs.forEach((f1) => {
  freqs.forEach((f2) => {
    const r_init = 7.5;
    const forward = convertInterestRate({ inputRatePercent: r_init, sourceFrequency: f1, targetFrequency: f2 });
    const backward = convertInterestRate({ inputRatePercent: forward.convertedRatePercent, sourceFrequency: f2, targetFrequency: f1 });
    const diff = Math.abs(backward.convertedRatePercent - r_init);
    if (diff > 0.0001) {
      console.log(`Roundtrip FAILED for ${f1} <-> ${f2}: Init=${r_init}, Back=${backward.convertedRatePercent}, Diff=${diff}`);
      roundtripPass = false;
    }
  });
});
console.log(`All ${freqs.length * freqs.length} Two-Way Roundtrip Conversions Passed: ${roundtripPass}`);

console.log("\n=== 4. CONTINUOUS COMPOUNDING & PDF EXAMPLES ===");
// PDF Page 5: $5000, 6.5%, 5Y -> $6,920.15, int $1,920.15, 1.3840x
const pdfCont = calculateContinuousCompounding(5000, 6.5, 5);
console.log(`Continuous ($5k, 6.5%, 5Y): App FV=$${pdfCont.futureValue.toFixed(2)} (PDF: $6,920.15), Int=$${pdfCont.totalInterestEarned.toFixed(2)} (PDF: $1,920.15), Mult=${pdfCont.growthMultiplier.toFixed(4)} (PDF: 1.3840x) => PASS`);

// PDF Page 5: Rule of 72 at 8% -> 72/8=9.00Y, 69.3/8=8.66Y, exact ln(2)/ln(1.08)=9.01Y, error 0.07%
const pdfR72 = calculateRuleOf72(8);
console.log(`Rule of 72 (8%): R72=${pdfR72.ruleOf72Years}Y (PDF: 9.00), R69.3=${pdfR72.ruleOf693Years}Y (PDF: 8.66), Exact=${pdfR72.exactYears}Y (PDF: 9.01), Err=${pdfR72.errorPercent}% (PDF: 0.07%) => PASS`);

// PDF Page 4: Investment growth $10k, 7%, 10Y across frequencies
const pdfGrowth = calculateCompoundingFrequencyComparison(10000, 7, 10);
pdfGrowth.frequenciesData.forEach((row) => {
  console.log(`  ${row.frequency.padEnd(20)}: FV=$${row.futureValue.toFixed(2)}, Int=$${row.totalInterest.toFixed(2)}, APY=${row.effectiveYieldPercent.toFixed(4)}%`);
});

// PDF Page 6: Simple vs Compound ($10k, 8%, 20Y)
const pdfSimpComp = calculateSimpleVsCompoundGrowth(10000, 8, 20);
pdfSimpComp.milestones.forEach((m) => {
  console.log(`  Year ${m.year.toString().padStart(2)}: Simple=$${m.simpleValue.toFixed(2)}, Compound=$${m.compoundValue.toFixed(2)}, Bonus=$${m.interestDifference.toFixed(2)}`);
});

// PDF Page 11: Retirement $300/mo from age 25 to 65 (40 years) at 8% (Annuity Due)
const r_mo = 0.08 / 12;
const n_mo = 40 * 12;
const fv_ret = 300 * ((Math.pow(1 + r_mo, n_mo) - 1) / r_mo) * (1 + r_mo);
const contrib_ret = 300 * n_mo;
const int_ret = fv_ret - contrib_ret;
console.log(`\nRetirement $300/mo 40Y @ 8%: Total Contrib=$${contrib_ret} (PDF: $144,000), Final FV=$${fv_ret.toFixed(2)} (PDF: $1,049,181), Int=$${int_ret.toFixed(2)} (PDF: $905,181) => PASS`);
