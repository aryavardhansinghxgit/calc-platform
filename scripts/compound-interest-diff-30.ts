import {
  calculateCompoundInterestFormula,
  convertInterestRate,
  calculateContinuousCompounding,
  calculateRuleOf72,
  calculateAprVsApy,
  rateToEAR,
  CompoundingFrequency,
} from "../src/lib/calculator-engine/formulas/compound-interest";

console.log("=== 30 INDEPENDENT DIFFERENTIAL SCENARIOS ===");
const testScenarios = [
  // 1-8: Core Future Value across frequencies
  { P: 1000, r: 5, t: 10, freq: "annual" as CompoundingFrequency, n: 1 },
  { P: 2500, r: 4.5, t: 7, freq: "semiannual" as CompoundingFrequency, n: 2 },
  { P: 5000, r: 6, t: 5, freq: "quarterly" as CompoundingFrequency, n: 4 },
  { P: 10000, r: 7.5, t: 15, freq: "monthly" as CompoundingFrequency, n: 12 },
  { P: 15000, r: 8, t: 12, freq: "biweekly" as CompoundingFrequency, n: 26 },
  { P: 20000, r: 9, t: 20, freq: "weekly" as CompoundingFrequency, n: 52 },
  { P: 50000, r: 10, t: 25, freq: "daily" as CompoundingFrequency, n: 365 },
  { P: 100000, r: 12, t: 30, freq: "continuous" as CompoundingFrequency, n: -1 },

  // 9-16: Rate conversions
  { P: 0, r: 5, t: 0, freq: "annual" as CompoundingFrequency, n: 1, tgt: "monthly" as CompoundingFrequency },
  { P: 0, r: 6.5, t: 0, freq: "monthly" as CompoundingFrequency, n: 12, tgt: "daily" as CompoundingFrequency },
  { P: 0, r: 8, t: 0, freq: "daily" as CompoundingFrequency, n: 365, tgt: "continuous" as CompoundingFrequency },
  { P: 0, r: 12, t: 0, freq: "continuous" as CompoundingFrequency, n: -1, tgt: "annual" as CompoundingFrequency },
  { P: 0, r: 7, t: 0, freq: "quarterly" as CompoundingFrequency, n: 4, tgt: "semiannual" as CompoundingFrequency },
  { P: 0, r: 9.5, t: 0, freq: "weekly" as CompoundingFrequency, n: 52, tgt: "monthly" as CompoundingFrequency },
  { P: 0, r: 4, t: 0, freq: "biweekly" as CompoundingFrequency, n: 26, tgt: "annual" as CompoundingFrequency },
  { P: 0, r: 15, t: 0, freq: "monthly" as CompoundingFrequency, n: 12, tgt: "quarterly" as CompoundingFrequency },

  // 17-22: Zero and Extreme rates
  { P: 10000, r: 0, t: 10, freq: "monthly" as CompoundingFrequency, n: 12 },
  { P: 500, r: 0.1, t: 5, freq: "daily" as CompoundingFrequency, n: 365 },
  { P: 1000000, r: 18, t: 40, freq: "monthly" as CompoundingFrequency, n: 12 },
  { P: 50, r: 25, t: 2, freq: "annual" as CompoundingFrequency, n: 1 },
  { P: 25000, r: 0.05, t: 1, freq: "continuous" as CompoundingFrequency, n: -1 },
  { P: 75000, r: 14.5, t: 18, freq: "quarterly" as CompoundingFrequency, n: 4 },

  // 23-30: Rule of 72 & APR/APY
  { P: 0, r: 4.5, t: 0, freq: "annual" as CompoundingFrequency, n: 1, testType: "r72" },
  { P: 0, r: 7.2, t: 0, freq: "annual" as CompoundingFrequency, n: 1, testType: "r72" },
  { P: 0, r: 9.0, t: 0, freq: "annual" as CompoundingFrequency, n: 1, testType: "r72" },
  { P: 0, r: 12.0, t: 0, freq: "annual" as CompoundingFrequency, n: 1, testType: "r72" },
  { P: 0, r: 18.0, t: 0, freq: "annual" as CompoundingFrequency, n: 1, testType: "r72" },
  { P: 10000, r: 6.0, t: 1, freq: "monthly" as CompoundingFrequency, n: 12, testType: "aprapy" },
  { P: 10000, r: 12.0, t: 1, freq: "daily" as CompoundingFrequency, n: 365, testType: "aprapy" },
  { P: 10000, r: 8.5, t: 1, freq: "quarterly" as CompoundingFrequency, n: 4, testType: "aprapy" },
];

let allPass = true;
testScenarios.forEach((sc, idx) => {
  if (sc.testType === "r72") {
    const oracleR72 = 72 / sc.r;
    const oracleExact = Math.log(2) / Math.log(1 + sc.r / 100);
    const app = calculateRuleOf72(sc.r);
    const pass = Math.abs(app.ruleOf72Years - oracleR72) < 0.02 && Math.abs(app.exactYears - oracleExact) < 0.02;
    if (!pass) allPass = false;
    console.log(`[Diff ${idx + 1}] Rule of 72 @ ${sc.r}%: R72=${app.ruleOf72Years}, Exact=${app.exactYears} => ${pass ? "PASS" : "FAIL"}`);
  } else if (sc.testType === "aprapy") {
    const oracleApy = (Math.pow(1 + (sc.r / 100) / sc.n, sc.n) - 1) * 100;
    const app = calculateAprVsApy(sc.r, sc.freq);
    const pass = Math.abs(app.apyPercent - oracleApy) < 0.001;
    if (!pass) allPass = false;
    console.log(`[Diff ${idx + 1}] APR vs APY @ ${sc.r}% ${sc.freq}: App APY=${app.apyPercent.toFixed(4)}%, Oracle=${oracleApy.toFixed(4)}% => ${pass ? "PASS" : "FAIL"}`);
  } else if (sc.tgt) {
    const app = convertInterestRate({ inputRatePercent: sc.r, sourceFrequency: sc.freq, targetFrequency: sc.tgt });
    const ear = rateToEAR(sc.r, sc.freq);
    const tgtRate = sc.tgt === "continuous" ? Math.log(1 + ear) * 100 : (sc.tgt === "monthly" ? 12 : sc.tgt === "daily" ? 365 : sc.tgt === "quarterly" ? 4 : sc.tgt === "semiannual" ? 2 : sc.tgt === "biweekly" ? 26 : sc.tgt === "weekly" ? 52 : 1) * (Math.pow(1 + ear, 1 / (sc.tgt === "monthly" ? 12 : sc.tgt === "daily" ? 365 : sc.tgt === "quarterly" ? 4 : sc.tgt === "semiannual" ? 2 : sc.tgt === "biweekly" ? 26 : sc.tgt === "weekly" ? 52 : 1)) - 1) * 100;
    const pass = Math.abs(app.convertedRatePercent - tgtRate) < 0.001;
    if (!pass) allPass = false;
    console.log(`[Diff ${idx + 1}] Conversion ${sc.r}% ${sc.freq} -> ${sc.tgt}: App=${app.convertedRatePercent.toFixed(4)}%, Oracle=${tgtRate.toFixed(4)}% => ${pass ? "PASS" : "FAIL"}`);
  } else {
    let oracleFv = 0;
    if (sc.freq === "continuous") {
      oracleFv = sc.P * Math.exp((sc.r / 100) * sc.t);
    } else {
      oracleFv = sc.P * Math.pow(1 + (sc.r / 100) / sc.n, sc.n * sc.t);
    }
    let appFv = 0;
    if (sc.freq === "continuous") {
      appFv = calculateContinuousCompounding(sc.P, sc.r, sc.t).futureValue;
    } else {
      appFv = calculateCompoundInterestFormula({ principal: sc.P, annualInterestRate: sc.r, years: sc.t, compoundingFrequency: sc.n }).futureValue;
    }
    const pass = Math.abs(appFv - oracleFv) < 0.05;
    if (!pass) allPass = false;
    console.log(`[Diff ${idx + 1}] Growth P=$${sc.P}, ${sc.r}%, ${sc.t}Y ${sc.freq}: App=$${appFv.toFixed(2)}, Oracle=$${oracleFv.toFixed(2)} => ${pass ? "PASS" : "FAIL"}`);
  }
});
console.log(`\nAll 30 Differential Test Scenarios Passed: ${allPass}`);
