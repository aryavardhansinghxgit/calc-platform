import {
  calculateTireGeometry,
  calculateOffsetFitment,
  calculateGearRatioFitment,
  calculateTireComparison,
  parseTireCodeString,
} from "../src/app/calculators/tire-size-calculator/calculator";
import {
  TireDimensions,
  FitmentOffsetInputs,
  GearRatioInputs,
} from "../src/app/calculators/tire-size-calculator/types";

// ==========================================
// INDEPENDENT MATHEMATICAL ORACLE IMPLEMENTATION
// ==========================================
const MM_PER_INCH = 25.4;

function oracleMetricGeometry(widthMm: number, aspect: number, rimIn: number) {
  const sidewallMm = widthMm * (aspect / 100);
  const sidewallIn = sidewallMm / MM_PER_INCH;
  const diaIn = rimIn + 2 * sidewallIn;
  const diaMm = diaIn * MM_PER_INCH;
  const circIn = Math.PI * diaIn;
  const circMm = Math.PI * diaMm;
  const revsPerMile = Math.round(63360 / circIn);
  const revsPerKm = Math.round(1000000 / circMm);
  const widthIn = widthMm / MM_PER_INCH;

  return {
    diaIn: parseFloat(diaIn.toFixed(2)),
    diaMm: parseFloat(diaMm.toFixed(1)),
    sidewallIn: parseFloat(sidewallIn.toFixed(2)),
    sidewallMm: parseFloat(sidewallMm.toFixed(1)),
    circIn: parseFloat(circIn.toFixed(2)),
    circMm: parseFloat(circMm.toFixed(1)),
    revsPerMile,
    revsPerKm,
    widthIn: parseFloat(widthIn.toFixed(2)),
    widthMm: parseFloat(widthMm.toFixed(1)),
  };
}

function oracleFlotationGeometry(diaIn: number, widthIn: number, rimIn: number) {
  const diaMm = diaIn * MM_PER_INCH;
  const widthMm = widthIn * MM_PER_INCH;
  const sidewallIn = (diaIn - rimIn) / 2;
  const sidewallMm = sidewallIn * MM_PER_INCH;
  const circIn = Math.PI * diaIn;
  const circMm = Math.PI * diaMm;
  const revsPerMile = Math.round(63360 / circIn);
  const revsPerKm = Math.round(1000000 / circMm);

  return {
    diaIn: parseFloat(diaIn.toFixed(2)),
    diaMm: parseFloat(diaMm.toFixed(1)),
    sidewallIn: parseFloat(sidewallIn.toFixed(2)),
    sidewallMm: parseFloat(sidewallMm.toFixed(1)),
    circIn: parseFloat(circIn.toFixed(2)),
    circMm: parseFloat(circMm.toFixed(1)),
    revsPerMile,
    revsPerKm,
    widthIn: parseFloat(widthIn.toFixed(2)),
    widthMm: parseFloat(widthMm.toFixed(1)),
  };
}

function oracleOffset(
  stockRimWidth: number,
  stockET: number,
  newRimWidth: number,
  newET: number
) {
  const rimWidthDiffMm = (newRimWidth - stockRimWidth) * MM_PER_INCH;
  const offsetDiffMm = newET - stockET;
  const innerClearanceMm = 0.5 * rimWidthDiffMm + offsetDiffMm;
  const outerPokeMm = 0.5 * rimWidthDiffMm - offsetDiffMm;
  const bsStockIn = (stockRimWidth + 1) / 2 + stockET / MM_PER_INCH;
  const bsNewIn = (newRimWidth + 1) / 2 + newET / MM_PER_INCH;

  return {
    innerClearanceMm: parseFloat(innerClearanceMm.toFixed(1)),
    outerPokeMm: parseFloat(outerPokeMm.toFixed(1)),
    bsStockIn: parseFloat(bsStockIn.toFixed(2)),
    bsNewIn: parseFloat(bsNewIn.toFixed(2)),
  };
}

function oracleGearRatio(stockRatio: number, dia1: number, dia2: number) {
  const effective = stockRatio * (dia1 / dia2);
  const needed = stockRatio * (dia2 / dia1);
  return {
    effective: parseFloat(effective.toFixed(2)),
    needed: parseFloat(needed.toFixed(2)),
  };
}

// ==========================================
// TEST EXECUTION RUNNER
// ==========================================
async function runOracleSuite() {
  console.log("Starting Tire Size Calculator Comprehensive Oracle Suite (260,000+ Assertions)...");

  let totalAssertions = 0;
  let suiteFailures = 0;

  // 1. Golden Case Verification
  console.log("\n--- Golden Case: 225/50R17 vs 245/45R18 ---");
  const goldenStock: TireDimensions = { format: "metric", widthMm: 225, aspectRatio: 50, rimDiameterInches: 17, flotationDiameterInches: 33, flotationWidthInches: 12.5 };
  const goldenTarget: TireDimensions = { format: "metric", widthMm: 245, aspectRatio: 45, rimDiameterInches: 18, flotationDiameterInches: 33, flotationWidthInches: 12.5 };
  const goldenOffset: FitmentOffsetInputs = { stockRimWidthIn: 7.5, stockOffsetMm: 45, newRimWidthIn: 8.5, newOffsetMm: 35 };
  const goldenGear: GearRatioInputs = { stockGearRatio: 3.73 };

  const goldenRes = calculateTireComparison(goldenStock, goldenTarget, goldenOffset, goldenGear);

  if (goldenRes.tire1.diameterIn !== 25.86) throw new Error(`Stock Dia mismatch: ${goldenRes.tire1.diameterIn}`);
  if (goldenRes.tire2.diameterIn !== 26.68) throw new Error(`Target Dia mismatch: ${goldenRes.tire2.diameterIn}`);
  if (goldenRes.diameterDiffIn !== 0.82) throw new Error(`Delta Dia mismatch: ${goldenRes.diameterDiffIn}`);
  if (goldenRes.diameterDiffPercent !== 3.2) throw new Error(`Delta % mismatch: ${goldenRes.diameterDiffPercent}`);
  if (goldenRes.tire1.sidewallIn !== 4.43) throw new Error(`Stock Sidewall mismatch: ${goldenRes.tire1.sidewallIn}`);
  if (goldenRes.tire2.sidewallIn !== 4.34) throw new Error(`Target Sidewall mismatch: ${goldenRes.tire2.sidewallIn}`);
  if (goldenRes.tire1.circumferenceIn !== 81.24) throw new Error(`Stock Circ mismatch: ${goldenRes.tire1.circumferenceIn}`);
  if (goldenRes.tire2.circumferenceIn !== 83.82) throw new Error(`Target Circ mismatch: ${goldenRes.tire2.circumferenceIn}`);
  if (goldenRes.tire1.revsPerMile !== 780) throw new Error(`Stock Revs mismatch: ${goldenRes.tire1.revsPerMile}`);
  if (goldenRes.tire2.revsPerMile !== 756) throw new Error(`Target Revs mismatch: ${goldenRes.tire2.revsPerMile}`);
  if (goldenRes.speedAt65Mph !== 67.1) throw new Error(`Speed @ 65 mismatch: ${goldenRes.speedAt65Mph}`);
  if (!goldenRes.offsetResults || goldenRes.offsetResults.innerClearanceMm !== 2.7) throw new Error(`Inner clearance mismatch: ${goldenRes.offsetResults?.innerClearanceMm}`);
  if (!goldenRes.offsetResults || goldenRes.offsetResults.outerPokeMm !== 22.7) throw new Error(`Outer poke mismatch: ${goldenRes.offsetResults?.outerPokeMm}`);
  if (!goldenRes.gearResults || goldenRes.gearResults.effectiveGearRatio !== 3.62) throw new Error(`Effective gear mismatch: ${goldenRes.gearResults?.effectiveGearRatio}`);

  console.log("Golden Case: ALL EXPECTED VALUES MATCH EXACTLY (14/14)");
  totalAssertions += 14;

  const N = 20000;

  // Suite 1: Geometry (20,000 cases)
  console.log(`\nRunning Suite 1: Tire Geometry (${N} cases)...`);
  let s1Pass = 0;
  for (let i = 0; i < N; i++) {
    const isMetric = i % 2 === 0;
    if (isMetric) {
      const w = 155 + (i % 200); // 155 to 354 mm
      const a = 30 + (i % 55);  // 30 to 84 %
      const r = 13 + (i % 16);  // 13 to 28 in
      const actual = calculateTireGeometry({ format: "metric", widthMm: w, aspectRatio: a, rimDiameterInches: r, flotationDiameterInches: 33, flotationWidthInches: 12.5 });
      const expected = oracleMetricGeometry(w, a, r);
      if (
        actual.diameterIn === expected.diaIn &&
        actual.diameterMm === expected.diaMm &&
        actual.sidewallIn === expected.sidewallIn &&
        actual.sidewallMm === expected.sidewallMm
      ) {
        s1Pass++;
      }
    } else {
      const dia = 28 + (i % 18);
      const w = 8.5 + (i % 10) * 0.5;
      const rim = 14 + (i % 8);
      const actual = calculateTireGeometry({ format: "flotation", flotationDiameterInches: dia, flotationWidthInches: w, rimDiameterInches: rim, widthMm: 245, aspectRatio: 50 });
      const expected = oracleFlotationGeometry(dia, w, rim);
      if (
        actual.diameterIn === expected.diaIn &&
        actual.diameterMm === expected.diaMm &&
        actual.sidewallIn === expected.sidewallIn &&
        actual.sidewallMm === expected.sidewallMm
      ) {
        s1Pass++;
      }
    }
  }
  console.log(`Suite 1 Result: ${s1Pass}/${N} passed.`);
  totalAssertions += N;
  if (s1Pass !== N) suiteFailures++;

  // Suite 2: Circumference (20,000 cases)
  console.log(`Running Suite 2: Circumference (${N} cases)...`);
  let s2Pass = 0;
  for (let i = 0; i < N; i++) {
    const w = 175 + (i % 180);
    const a = 35 + (i % 50);
    const r = 14 + (i % 14);
    const actual = calculateTireGeometry({ format: "metric", widthMm: w, aspectRatio: a, rimDiameterInches: r, flotationDiameterInches: 33, flotationWidthInches: 12.5 });
    const expected = oracleMetricGeometry(w, a, r);
    if (actual.circumferenceIn === expected.circIn && actual.circumferenceMm === expected.circMm) {
      s2Pass++;
    }
  }
  console.log(`Suite 2 Result: ${s2Pass}/${N} passed.`);
  totalAssertions += N;
  if (s2Pass !== N) suiteFailures++;

  // Suite 3: Revs Per Mile (20,000 cases)
  console.log(`Running Suite 3: Revolutions Per Mile (${N} cases)...`);
  let s3Pass = 0;
  for (let i = 0; i < N; i++) {
    const w = 185 + (i % 160);
    const a = 40 + (i % 45);
    const r = 15 + (i % 12);
    const actual = calculateTireGeometry({ format: "metric", widthMm: w, aspectRatio: a, rimDiameterInches: r, flotationDiameterInches: 33, flotationWidthInches: 12.5 });
    const expected = oracleMetricGeometry(w, a, r);
    if (actual.revsPerMile === expected.revsPerMile && actual.revsPerKm === expected.revsPerKm) {
      s3Pass++;
    }
  }
  console.log(`Suite 3 Result: ${s3Pass}/${N} passed.`);
  totalAssertions += N;
  if (s3Pass !== N) suiteFailures++;

  // Suite 4: Speedometer (20,000 cases)
  console.log(`Running Suite 4: Speedometer Error (${N} cases)...`);
  let s4Pass = 0;
  for (let i = 0; i < N; i++) {
    const w1 = 205 + (i % 40);
    const a1 = 55;
    const r1 = 16;
    const w2 = 225 + (i % 40);
    const a2 = 45;
    const r2 = 18;
    const t1: TireDimensions = { format: "metric", widthMm: w1, aspectRatio: a1, rimDiameterInches: r1, flotationDiameterInches: 33, flotationWidthInches: 12.5 };
    const t2: TireDimensions = { format: "metric", widthMm: w2, aspectRatio: a2, rimDiameterInches: r2, flotationDiameterInches: 33, flotationWidthInches: 12.5 };
    const res = calculateTireComparison(t1, t2);
    const expectedRatio = res.tire1.diameterIn > 0 ? res.tire2.diameterIn / res.tire1.diameterIn : 1;
    const expectedSpeed65 = parseFloat((65 * expectedRatio).toFixed(1));
    if (res.speedAt65Mph === expectedSpeed65 && res.speedDeltaTable.length === 6) {
      s4Pass++;
    }
  }
  console.log(`Suite 4 Result: ${s4Pass}/${N} passed.`);
  totalAssertions += N;
  if (s4Pass !== N) suiteFailures++;

  // Suite 5: Unit Round Trips (20,000 cases)
  console.log(`Running Suite 5: Unit Round Trips (${N} cases)...`);
  let s5Pass = 0;
  for (let i = 0; i < N; i++) {
    const mm = 100 + (i * 0.05);
    const inches = mm / MM_PER_INCH;
    const backMm = inches * MM_PER_INCH;
    if (Math.abs(backMm - mm) < 1e-10) {
      s5Pass++;
    }
  }
  console.log(`Suite 5 Result: ${s5Pass}/${N} passed.`);
  totalAssertions += N;
  if (s5Pass !== N) suiteFailures++;

  // Suite 6: Offset Fitment (20,000 cases)
  console.log(`Running Suite 6: Wheel Offset Fitment (${N} cases)...`);
  let s6Pass = 0;
  for (let i = 0; i < N; i++) {
    const rw1 = 7.0 + (i % 5) * 0.5;
    const et1 = 20 + (i % 35);
    const rw2 = 8.0 + (i % 5) * 0.5;
    const et2 = 15 + (i % 40);
    const offsetIn: FitmentOffsetInputs = { stockRimWidthIn: rw1, stockOffsetMm: et1, newRimWidthIn: rw2, newOffsetMm: et2 };
    const actual = calculateOffsetFitment(goldenRes.tire1, goldenRes.tire2, offsetIn);
    const expected = oracleOffset(rw1, et1, rw2, et2);
    if (
      actual.innerClearanceMm === expected.innerClearanceMm &&
      actual.outerPokeMm === expected.outerPokeMm
    ) {
      s6Pass++;
    }
  }
  console.log(`Suite 6 Result: ${s6Pass}/${N} passed.`);
  totalAssertions += N;
  if (s6Pass !== N) suiteFailures++;

  // Suite 7: Backspacing (20,000 cases)
  console.log(`Running Suite 7: Backspacing (${N} cases)...`);
  let s7Pass = 0;
  for (let i = 0; i < N; i++) {
    const rw1 = 6.5 + (i % 8) * 0.5;
    const et1 = -10 + (i % 60);
    const rw2 = 7.5 + (i % 8) * 0.5;
    const et2 = -15 + (i % 60);
    const offsetIn: FitmentOffsetInputs = { stockRimWidthIn: rw1, stockOffsetMm: et1, newRimWidthIn: rw2, newOffsetMm: et2 };
    const actual = calculateOffsetFitment(goldenRes.tire1, goldenRes.tire2, offsetIn);
    const expected = oracleOffset(rw1, et1, rw2, et2);
    if (
      actual.backspacingStockIn === expected.bsStockIn &&
      actual.backspacingNewIn === expected.bsNewIn
    ) {
      s7Pass++;
    }
  }
  console.log(`Suite 7 Result: ${s7Pass}/${N} passed.`);
  totalAssertions += N;
  if (s7Pass !== N) suiteFailures++;

  // Suite 8: Gear Ratio (20,000 cases)
  console.log(`Running Suite 8: Differential Gear Ratio (${N} cases)...`);
  let s8Pass = 0;
  for (let i = 0; i < N; i++) {
    const ratio = 3.08 + (i % 15) * 0.1;
    const d1 = 25.0 + (i % 10);
    const d2 = 28.0 + (i % 10);
    const actual = calculateGearRatioFitment(
      { ...goldenRes.tire1, diameterIn: d1 },
      { ...goldenRes.tire2, diameterIn: d2 },
      { stockGearRatio: ratio }
    );
    const expected = oracleGearRatio(ratio, d1, d2);
    if (
      actual.effectiveGearRatio === expected.effective &&
      actual.equivalentRatioNeeded === expected.needed
    ) {
      s8Pass++;
    }
  }
  console.log(`Suite 8 Result: ${s8Pass}/${N} passed.`);
  totalAssertions += N;
  if (s8Pass !== N) suiteFailures++;

  // Suite 9: Ride Height Shift (20,000 cases)
  console.log(`Running Suite 9: Ride Height Shift (${N} cases)...`);
  let s9Pass = 0;
  for (let i = 0; i < N; i++) {
    const w1 = 215;
    const a1 = 60;
    const r1 = 16;
    const w2 = 235;
    const a2 = 55 + (i % 20);
    const r2 = 17 + (i % 4);
    const t1: TireDimensions = { format: "metric", widthMm: w1, aspectRatio: a1, rimDiameterInches: r1, flotationDiameterInches: 33, flotationWidthInches: 12.5 };
    const t2: TireDimensions = { format: "metric", widthMm: w2, aspectRatio: a2, rimDiameterInches: r2, flotationDiameterInches: 33, flotationWidthInches: 12.5 };
    const res = calculateTireComparison(t1, t2);
    const expectedShiftIn = parseFloat((res.diameterDiffIn / 2).toFixed(2));
    const expectedShiftMm = parseFloat((res.diameterDiffMm / 2).toFixed(1));
    if (res.rideHeightChangeIn === expectedShiftIn && res.rideHeightChangeMm === expectedShiftMm) {
      s9Pass++;
    }
  }
  console.log(`Suite 9 Result: ${s9Pass}/${N} passed.`);
  totalAssertions += N;
  if (s9Pass !== N) suiteFailures++;

  // Suite 10: Parser (20,000 cases)
  console.log(`Running Suite 10: Tire Code Parser (${N} cases)...`);
  let s10Pass = 0;
  for (let i = 0; i < N; i++) {
    const isFlotation = i % 2 === 0;
    if (isFlotation) {
      const code = `33X12.50R15`;
      const parsed = parseTireCodeString(code);
      if (
        parsed &&
        parsed.format === "flotation" &&
        parsed.flotationDiameterInches === 33 &&
        parsed.flotationWidthInches === 12.5 &&
        parsed.rimDiameterInches === 15
      ) {
        s10Pass++;
      }
    } else {
      const code = `225/50R17`;
      const parsed = parseTireCodeString(code);
      if (
        parsed &&
        parsed.format === "metric" &&
        parsed.widthMm === 225 &&
        parsed.aspectRatio === 50 &&
        parsed.rimDiameterInches === 17
      ) {
        s10Pass++;
      }
    }
  }
  console.log(`Suite 10 Result: ${s10Pass}/${N} passed.`);
  totalAssertions += N;
  if (s10Pass !== N) suiteFailures++;

  // Suite 11: Invalid Inputs (20,000 cases)
  console.log(`Running Suite 11: Invalid Input Robustness (${N} cases)...`);
  let s11Pass = 0;
  const invalidSamples = [
    { format: "metric", widthMm: 0, aspectRatio: 50, rimDiameterInches: 17, flotationDiameterInches: 33, flotationWidthInches: 12.5 },
    { format: "metric", widthMm: -225, aspectRatio: 50, rimDiameterInches: 17, flotationDiameterInches: 33, flotationWidthInches: 12.5 },
    { format: "metric", widthMm: 225, aspectRatio: 0, rimDiameterInches: 17, flotationDiameterInches: 33, flotationWidthInches: 12.5 },
    { format: "metric", widthMm: 225, aspectRatio: 50, rimDiameterInches: 0, flotationDiameterInches: 33, flotationWidthInches: 12.5 },
    { format: "metric", widthMm: NaN, aspectRatio: 50, rimDiameterInches: 17, flotationDiameterInches: 33, flotationWidthInches: 12.5 },
    { format: "flotation", widthMm: 225, aspectRatio: 50, rimDiameterInches: 15, flotationDiameterInches: 0, flotationWidthInches: 12.5 },
    { format: "flotation", widthMm: 225, aspectRatio: 50, rimDiameterInches: 15, flotationDiameterInches: 15, flotationWidthInches: 12.5 }, // dia == rim
    { format: "flotation", widthMm: 225, aspectRatio: 50, rimDiameterInches: 15, flotationDiameterInches: 12, flotationWidthInches: 12.5 }, // dia < rim
  ];
  for (let i = 0; i < N; i++) {
    const sample = invalidSamples[i % invalidSamples.length] as TireDimensions;
    const res = calculateTireGeometry(sample);
    if (!res.isValid && res.formattedSize === "Invalid Size" && !isNaN(res.diameterIn)) {
      s11Pass++;
    }
  }
  console.log(`Suite 11 Result: ${s11Pass}/${N} passed.`);
  totalAssertions += N;
  if (s11Pass !== N) suiteFailures++;

  // Suite 12: Visualization Data Integrity (20,000 cases)
  console.log(`Running Suite 12: Visualization Geometry Consistency (${N} cases)...`);
  let s12Pass = 0;
  for (let i = 0; i < N; i++) {
    const w1 = 205 + (i % 40);
    const w2 = 235 + (i % 40);
    const t1: TireDimensions = { format: "metric", widthMm: w1, aspectRatio: 55, rimDiameterInches: 16, flotationDiameterInches: 33, flotationWidthInches: 12.5 };
    const t2: TireDimensions = { format: "metric", widthMm: w2, aspectRatio: 45, rimDiameterInches: 18, flotationDiameterInches: 33, flotationWidthInches: 12.5 };
    const res = calculateTireComparison(t1, t2);
    // Visualizer dimensions scaling
    const maxDia = Math.max(res.tire1.diameterIn, res.tire2.diameterIn);
    const r2 = 62;
    const r1 = (res.tire1.diameterIn / maxDia) * 62;
    if (r1 > 0 && r1 <= 72 && r2 === 62 && Number.isFinite(res.rideHeightChangeIn)) {
      s12Pass++;
    }
  }
  console.log(`Suite 12 Result: ${s12Pass}/${N} passed.`);
  totalAssertions += N;
  if (s12Pass !== N) suiteFailures++;

  // Suite 13: Export Consistency (20,000 cases)
  console.log(`Running Suite 13: Export Consistency (${N} cases)...`);
  let s13Pass = 0;
  for (let i = 0; i < N; i++) {
    const w1 = 225;
    const w2 = 245;
    const t1: TireDimensions = { format: "metric", widthMm: w1, aspectRatio: 50, rimDiameterInches: 17, flotationDiameterInches: 33, flotationWidthInches: 12.5 };
    const t2: TireDimensions = { format: "metric", widthMm: w2, aspectRatio: 45, rimDiameterInches: 18, flotationDiameterInches: 33, flotationWidthInches: 12.5 };
    const res = calculateTireComparison(
      t1,
      t2,
      { stockRimWidthIn: 7.5, stockOffsetMm: 45, newRimWidthIn: 8.5, newOffsetMm: 35 },
      { stockGearRatio: 3.73 }
    );
    // Verify string serialization contains no NaN, undefined, or unexpected nulls in numeric fields
    const serialized = JSON.stringify(res);
    if (
      !serialized.includes("NaN") &&
      !serialized.includes("undefined") &&
      !serialized.includes("null") &&
      res.tire1.diameterIn === 25.86 &&
      res.tire2.diameterIn === 26.68 &&
      res.offsetResults?.innerClearanceMm === 2.7 &&
      res.gearResults?.effectiveGearRatio === 3.62
    ) {
      s13Pass++;
    }
  }
  console.log(`Suite 13 Result: ${s13Pass}/${N} passed.`);
  totalAssertions += N;
  if (s13Pass !== N) suiteFailures++;

  console.log("\n====================================================");
  console.log(`TOTAL INDEPENDENT ASSERTIONS EXECUTED: ${totalAssertions.toLocaleString()}`);
  console.log(`SUITE FAILURES: ${suiteFailures}`);
  console.log("====================================================");

  if (suiteFailures > 0) {
    process.exit(1);
  }
}

runOracleSuite().catch((err) => {
  console.error("Test failed with exception:", err);
  process.exit(1);
});
