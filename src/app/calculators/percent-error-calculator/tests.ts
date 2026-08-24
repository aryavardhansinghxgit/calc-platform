import { calculatePercentErrorCalculator } from "./calculator";
import { percent_error_calculatorFaqs } from "./faq";
import { percent_error_calculatorConfig } from "./config";
import { percent_error_calculatorMetadata } from "./metadata";

// Independent Mathematical Oracle (not using production code)
function oraclePercentError(obs: number, tru: number) {
  if (!Number.isFinite(obs) || !Number.isFinite(tru)) {
    throw new Error("Non-finite input");
  }
  if (tru === 0) {
    throw new Error("Zero true value");
  }
  const diff = obs - tru;
  const absError = Math.abs(diff);
  const pctError = (absError / Math.abs(tru)) * 100;
  const signedPctError = (diff / tru) * 100;
  const relError = absError / Math.abs(tru);
  return {
    diff,
    absError,
    pctError,
    signedPctError,
    relError,
  };
}

export function runPercentErrorCalculatorTests() {
  let propertyPassed = 0;
  let differentialPassed = 0;
  let precisionDifferentialPassed = 0;
  let edgeDifferentialPassed = 0;
  let focusedPassed = 0;

  // ==========================================
  // 1. PROPERTY TESTS (30 Tests)
  // ==========================================
  
  // 1. Standard signed error (10 vs 11)
  const p1 = calculatePercentErrorCalculator({ expVal: 10, theoVal: 11 });
  if (Math.abs(p1.signedPercentError - -9.091) < 0.01) propertyPassed++;

  // 2. Standard absolute error (10 vs 11)
  if (Math.abs(p1.percentError - 9.091) < 0.01) propertyPassed++;

  // 3. Overestimate (12 vs 10 -> +20%)
  const p3 = calculatePercentErrorCalculator({ expVal: 12, theoVal: 10 });
  if (p3.signedPercentError === 20 && p3.percentError === 20) propertyPassed++;

  // 4. Underestimate (8 vs 10 -> -20%)
  const p4 = calculatePercentErrorCalculator({ expVal: 8, theoVal: 10 });
  if (p4.signedPercentError === -20 && p4.percentError === 20) propertyPassed++;

  // 5. Zero error (10 vs 10 -> 0%)
  const p5 = calculatePercentErrorCalculator({ expVal: 10, theoVal: 10 });
  if (p5.signedPercentError === 0 && p5.percentError === 0 && p5.absoluteError === 0) propertyPassed++;

  // 6. Zero true-value rejected with error
  let p6Failed = false;
  try {
    calculatePercentErrorCalculator({ expVal: 10, theoVal: 0 });
  } catch {
    p6Failed = true;
  }
  if (p6Failed) propertyPassed++;

  // 7. Negative observed (-12 vs 10 -> -220%)
  const p7 = calculatePercentErrorCalculator({ expVal: -12, theoVal: 10 });
  if (p7.signedPercentError === -220 && p7.percentError === 220) propertyPassed++;

  // 8. Negative true (12 vs -10 -> -220%)
  const p8 = calculatePercentErrorCalculator({ expVal: 12, theoVal: -10 });
  if (p8.signedPercentError === -220 && p8.percentError === 220) propertyPassed++;

  // 9. Both negative (-9 vs -10 -> -10%)
  const p9 = calculatePercentErrorCalculator({ expVal: -9, theoVal: -10 });
  if (p9.signedPercentError === -10 && p9.percentError === 10) propertyPassed++;

  // 10. Decimals (9.8 vs 10 -> -2%)
  const p10 = calculatePercentErrorCalculator({ expVal: 9.8, theoVal: 10 });
  if (p10.signedPercentError === -2 && p10.percentError === 2) propertyPassed++;

  // 11. Large numbers (1000001 vs 1000000 -> 0.0001% = 0.000%)
  const p11 = calculatePercentErrorCalculator({ expVal: 1000001, theoVal: 1000000 });
  if (p11.percentError === 0.000 && p11.absoluteError === 1) propertyPassed++;

  // 12. Small numbers (0.00099 vs 0.001 -> -1%)
  const p12 = calculatePercentErrorCalculator({ expVal: 0.00099, theoVal: 0.001 });
  if (p12.signedPercentError === -1 && p12.percentError === 1) propertyPassed++;

  // 13. Rounding stability (no NaN, safe numbers)
  const p13 = calculatePercentErrorCalculator({ expVal: 1, theoVal: 3 });
  if (p13.percentError === 66.667) propertyPassed++;

  // 14. Absolute error (|10 - 11| = 1)
  if (p1.absoluteError === 1) propertyPassed++;

  // 15. Relative error (1 / 11 = 0.090909)
  if (Math.abs(p1.relativeError - 0.090909) < 0.0001) propertyPassed++;

  // 16. Step derivation consistency
  const p16 = calculatePercentErrorCalculator({ expVal: 50, theoVal: 40 });
  if (p16.signedPercentError === 25 && p16.percentError === 25 && p16.absoluteError === 10) propertyPassed++;

  // 17. Closeness accuracy score
  if (p16.accuracy === 75) propertyPassed++;

  // 18. Zero observed with positive true (0 vs 10 -> -100%)
  const p18 = calculatePercentErrorCalculator({ expVal: 0, theoVal: 10 });
  if (p18.signedPercentError === -100 && p18.percentError === 100) propertyPassed++;

  // 19. Both negative exact (-50 vs -50 -> 0%)
  const p19 = calculatePercentErrorCalculator({ expVal: -50, theoVal: -50 });
  if (p19.percentError === 0 && p19.signedPercentError === 0) propertyPassed++;

  // 20. Both zero rejected safely
  let p20Failed = false;
  try {
    calculatePercentErrorCalculator({ expVal: 0, theoVal: 0 });
  } catch {
    p20Failed = true;
  }
  if (p20Failed) propertyPassed++;

  // 21. State isolation between calls
  const a1 = calculatePercentErrorCalculator({ expVal: 5, theoVal: 10 });
  const a2 = calculatePercentErrorCalculator({ expVal: 15, theoVal: 10 });
  if (a1.signedPercentError === -50 && a2.signedPercentError === 50) propertyPassed++;

  // 22. Invalid null input rejected
  let p22Failed = false;
  try {
    calculatePercentErrorCalculator({ expVal: null, theoVal: null });
  } catch {
    p22Failed = true;
  }
  if (p22Failed) propertyPassed++;

  // 23. String number input converted safely
  const p23 = calculatePercentErrorCalculator({ expVal: "10", theoVal: "20" });
  if (p23.signedPercentError === -50) propertyPassed++;

  // 24. Sign normalization (no -0)
  const p24 = calculatePercentErrorCalculator({ expVal: 5, theoVal: 5 });
  if (Object.is(p24.signedPercentError, 0)) propertyPassed++;

  // 25. Formula consistency
  const p25 = calculatePercentErrorCalculator({ expVal: 10.5, theoVal: 10 });
  if (p25.signedPercentError === 5 && p25.percentError === 5) propertyPassed++;

  // 26. FAQ count (exactly 12)
  if (percent_error_calculatorFaqs.length === 12) propertyPassed++;

  // 27. FAQ topics populated
  if (percent_error_calculatorFaqs.every(f => f.question && f.answer && f.question.length > 5)) propertyPassed++;

  // 28. Related routes (exactly 7)
  if (percent_error_calculatorConfig.relatedCalculators?.length === 7) propertyPassed++;

  // 29. Metadata configured
  if (percent_error_calculatorMetadata.title && percent_error_calculatorMetadata.description) propertyPassed++;

  // 30. Build / Typecheck definitions
  if (percent_error_calculatorConfig.id === "percent-error-calculator") propertyPassed++;


  // ==========================================
  // 2. DIFFERENTIAL TESTS (650 Tests)
  // ==========================================
  for (let i = 1; i <= 650; i++) {
    const obs = ((i * 37) % 500) - 200 + ((i % 10) * 0.1);
    let tru = ((i * 53) % 400) - 150 + ((i % 7) * 0.1);
    if (tru === 0) tru = 1.5;

    const oracle = oraclePercentError(obs, tru);
    const actual = calculatePercentErrorCalculator({ expVal: obs, theoVal: tru });

    const oraclePct = parseFloat(oracle.pctError.toFixed(3));
    const oracleSigned = parseFloat(oracle.signedPctError.toFixed(3));
    const oracleAbs = parseFloat(oracle.absError.toFixed(4));

    if (
      Math.abs(actual.percentError - oraclePct) <= 0.002 &&
      Math.abs(actual.signedPercentError - oracleSigned) <= 0.002 &&
      Math.abs(actual.absoluteError - oracleAbs) <= 0.001
    ) {
      differentialPassed++;
    }
  }


  // ==========================================
  // 3. PRECISION DIFFERENTIAL (120 Tests)
  // ==========================================
  for (let i = 1; i <= 120; i++) {
    const obs = 10 + (i * 0.000123);
    const tru = 10 + (i * 0.000456);

    const oracle = oraclePercentError(obs, tru);
    const actual = calculatePercentErrorCalculator({ expVal: obs, theoVal: tru });

    const oraclePct = parseFloat(oracle.pctError.toFixed(3));
    const oracleSigned = parseFloat(oracle.signedPctError.toFixed(3));

    if (
      Math.abs(actual.percentError - oraclePct) <= 0.002 &&
      Math.abs(actual.signedPercentError - oracleSigned) <= 0.002
    ) {
      precisionDifferentialPassed++;
    }
  }


  // ==========================================
  // 4. EDGE-CASE DIFFERENTIAL (120 Tests)
  // ==========================================
  const edgeCases = [
    { obs: 0, tru: 10 },
    { obs: 0, tru: -10 },
    { obs: -10, tru: 10 },
    { obs: 10, tru: -10 },
    { obs: -10, tru: -10 },
    { obs: 1000000, tru: 1000000 },
    { obs: -1000000, tru: 1000000 },
    { obs: 0.00001, tru: 0.00002 },
    { obs: 9.99999, tru: 10 },
    { obs: 10.00001, tru: 10 },
  ];

  for (let i = 0; i < 120; i++) {
    const base = edgeCases[i % edgeCases.length];
    const obs = base.obs + (i * 0.001);
    const tru = base.tru === 0 ? 1 : base.tru;

    const oracle = oraclePercentError(obs, tru);
    const actual = calculatePercentErrorCalculator({ expVal: obs, theoVal: tru });

    const oraclePct = parseFloat(oracle.pctError.toFixed(3));
    if (Math.abs(actual.percentError - oraclePct) <= 0.005) {
      edgeDifferentialPassed++;
    }
  }


  // ==========================================
  // 5. FOCUSED TESTS (20 Key Scenarios)
  // ==========================================
  const f1 = calculatePercentErrorCalculator({ expVal: 10, theoVal: 11 });
  if (Math.abs(f1.signedPercentError - -9.091) <= 0.001) focusedPassed++; // 1. 10 vs 11 signed = -9.0909%
  if (Math.abs(f1.percentError - 9.091) <= 0.001) focusedPassed++; // 2. 10 vs 11 absolute = 9.0909%

  const f3 = calculatePercentErrorCalculator({ expVal: 12, theoVal: 10 });
  if (f3.signedPercentError === 20 && f3.percentError === 20) focusedPassed++; // 3. 12 vs 10 = +20%

  const f4 = calculatePercentErrorCalculator({ expVal: 8, theoVal: 10 });
  if (f4.signedPercentError === -20 && f4.percentError === 20) focusedPassed++; // 4. 8 vs 10 = -20%

  const f5 = calculatePercentErrorCalculator({ expVal: 10, theoVal: 10 });
  if (f5.signedPercentError === 0 && f5.percentError === 0) focusedPassed++; // 5. 10 vs 10 = 0

  let f6Failed = false;
  try {
    calculatePercentErrorCalculator({ expVal: 10, theoVal: 0 });
  } catch {
    f6Failed = true;
  }
  if (f6Failed) focusedPassed++; // 6. true = 0

  const f7 = calculatePercentErrorCalculator({ expVal: 0, theoVal: 10 });
  if (f7.signedPercentError === -100 && f7.percentError === 100) focusedPassed++; // 7. 0 vs 10 = -100%

  const f8 = calculatePercentErrorCalculator({ expVal: 20, theoVal: 10 });
  if (f8.signedPercentError === 100 && f8.percentError === 100) focusedPassed++; // 8. 20 vs 10 = +100%

  const f9 = calculatePercentErrorCalculator({ expVal: -12, theoVal: 10 });
  if (f9.signedPercentError === -220 && f9.percentError === 220) focusedPassed++; // 9. -12 vs 10 = -220%

  const f10 = calculatePercentErrorCalculator({ expVal: 12, theoVal: -10 });
  if (f10.signedPercentError === -220 && f10.percentError === 220) focusedPassed++; // 10. 12 vs -10 = -220%

  const f11 = calculatePercentErrorCalculator({ expVal: -9, theoVal: -10 });
  if (f11.signedPercentError === -10 && f11.percentError === 10) focusedPassed++; // 11. -9 vs -10 = -10%

  const f12 = calculatePercentErrorCalculator({ expVal: 9.8, theoVal: 10 });
  if (f12.signedPercentError === -2 && f12.percentError === 2) focusedPassed++; // 12. Decimal case

  const f13 = calculatePercentErrorCalculator({ expVal: 1000000001, theoVal: 1000000000 });
  if (f13.absoluteError === 1) focusedPassed++; // 13. Large value case

  const f14 = calculatePercentErrorCalculator({ expVal: 0.00099, theoVal: 0.001 });
  if (f14.signedPercentError === -1 && f14.percentError === 1) focusedPassed++; // 14. Small value case

  if (f1.absoluteError === 1 && Math.abs(f1.relativeError - 0.090909) < 0.0001) focusedPassed++; // 15. Step derivation

  if (percent_error_calculatorConfig.id === "percent-error-calculator") focusedPassed++; // 16. Config id
  if (percent_error_calculatorConfig.relatedCalculators?.length === 7) focusedPassed++; // 17. Related count
  if (percent_error_calculatorFaqs.length === 12) focusedPassed++; // 18. FAQ count
  if (percent_error_calculatorConfig.category === "Math") focusedPassed++; // 19. Category Math
  if (typeof calculatePercentErrorCalculator === "function") focusedPassed++; // 20. Function type

  return {
    property: `${propertyPassed}/30`,
    differential: `${differentialPassed}/650`,
    precisionDifferential: `${precisionDifferentialPassed}/120`,
    edgeDifferential: `${edgeDifferentialPassed}/120`,
    focused: `${focusedPassed}/20`,
    success:
      propertyPassed === 30 &&
      differentialPassed === 650 &&
      precisionDifferentialPassed === 120 &&
      edgeDifferentialPassed === 120 &&
      focusedPassed === 20,
  };
}
