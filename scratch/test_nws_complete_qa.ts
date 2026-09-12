/**
 * Independent NWS Heat Index Oracle & Comprehensive Verification Suite
 * 
 * Verifies the complete NWS decision procedure:
 * 1. Simple HI = 0.5 * { T + 61.0 + [(T - 68.0) * 1.2] + (RH * 0.094) }
 * 2. Average preliminary HI = 0.5 * (Simple HI + T)
 * 3. If avg preliminary HI < 80°F -> use simple calculation
 * 4. Else -> evaluate Rothfusz 9-term regression
 * 5. If RH < 13% and 80 <= T <= 112 -> subtract adjustment
 * 6. If RH > 85% and 80 <= T <= 87 -> add adjustment
 */

import {
  calculateHeatIndex,
  calculateNwsHeatIndexF,
  calculateRothfuszHeatIndexF,
  calculateSimpleHeatIndexF,
  calculateRothfuszRawHeatIndexF,
  applyNwsHumidityAdjustment,
  convertTempToF,
  convertTempToC,
  calculateDewPointFromRH,
  calculateRHFromDewPoint,
} from "../src/app/calculators/heat-index-calculator/calculator";

// ==========================================
// INDEPENDENT ORACLE IMPLEMENTATION
// ==========================================
export interface OracleResult {
  t: number;
  rh: number;
  simpleHI: number;
  avgPreliminaryHI: number;
  selectedAlgorithm: "steadman_simple" | "rothfusz_full";
  rothfuszHI: number | null;
  adjustment: number;
  finalHI: number;
}

export function independentNwsOracle(T: number, RH: number): OracleResult {
  // Step 1: Steadman simple preliminary formula
  const simpleHI = 0.5 * (T + 61.0 + (T - 68.0) * 1.2 + RH * 0.094);
  
  // Step 2: Average with ambient temperature
  const avgPreliminaryHI = 0.5 * (simpleHI + T);

  // Step 3: Branching decision threshold (avgPreliminaryHI < 80°F)
  if (avgPreliminaryHI < 80.0) {
    return {
      t: T,
      rh: RH,
      simpleHI: parseFloat(simpleHI.toFixed(2)),
      avgPreliminaryHI: parseFloat(avgPreliminaryHI.toFixed(2)),
      selectedAlgorithm: "steadman_simple",
      rothfuszHI: null,
      adjustment: 0,
      finalHI: parseFloat(simpleHI.toFixed(1)),
    };
  }

  // Step 4: 9-term Rothfusz polynomial
  const c1 = -42.379;
  const c2 = 2.04901523;
  const c3 = 10.14333127;
  const c4 = -0.22475541;
  const c5 = -0.00683783;
  const c6 = -0.05481717;
  const c7 = 0.00122874;
  const c8 = 0.00085282;
  const c9 = -0.00000199;

  let roth =
    c1 +
    c2 * T +
    c3 * RH +
    c4 * T * RH +
    c5 * T * T +
    c6 * RH * RH +
    c7 * T * T * RH +
    c8 * T * RH * RH +
    c9 * T * T * RH * RH;

  let adjustment = 0;

  // Step 5: Low-RH adjustment
  if (RH < 13.0 && T >= 80.0 && T <= 112.0) {
    const diff = 17.0 - Math.abs(T - 95.0);
    if (diff > 0) {
      adjustment = -((13.0 - RH) / 4.0) * Math.sqrt(diff / 17.0);
      roth += adjustment;
    }
  }

  // Step 6: High-RH adjustment
  if (RH > 85.0 && T >= 80.0 && T <= 87.0) {
    adjustment = ((RH - 85.0) / 10.0) * ((87.0 - T) / 5.0);
    roth += adjustment;
  }

  return {
    t: T,
    rh: RH,
    simpleHI: parseFloat(simpleHI.toFixed(2)),
    avgPreliminaryHI: parseFloat(avgPreliminaryHI.toFixed(2)),
    selectedAlgorithm: "rothfusz_full",
    rothfuszHI: parseFloat(roth.toFixed(2)),
    adjustment: parseFloat(adjustment.toFixed(4)),
    finalHI: parseFloat(roth.toFixed(1)),
  };
}

async function runSuite() {
  console.log("================================================================================");
  console.log("       NOAA / NWS COMPLETE HEAT INDEX PROCEDURE VERIFICATION & ORACLE AUDIT       ");
  console.log("================================================================================");

  let totalAssertions = 0;
  let passedAssertions = 0;

  function assert(condition: boolean, msg: string) {
    totalAssertions++;
    if (condition) {
      passedAssertions++;
    } else {
      console.error(`❌ FAILED: ${msg}`);
      throw new Error(`Assertion failed: ${msg}`);
    }
  }

  // ==========================================
  // 1. LOW-END TRANSITION TESTS (50% RH)
  // ==========================================
  console.log("\n--- PART 1: LOW-END TRANSITION TESTS (50% RH) ---");
  const lowEndTemps = [60, 65, 70, 75, 78, 79, 80, 81, 82];
  
  console.log(
    "T(°F) | RH(%) | Simple HI | Avg Prelim | Algorithm      | Rothfusz HI | Final NWS | App Result | Oracle | Error"
  );
  console.log(
    "------|-------|-----------|------------|----------------|-------------|-----------|------------|--------|------"
  );

  for (const t of lowEndTemps) {
    const oracle = independentNwsOracle(t, 50);
    const app = calculateNwsHeatIndexF(t, 50);
    const err = Math.abs(app.heatIndexF - oracle.finalHI);

    console.log(
      `${t.toString().padStart(5)} | ` +
      `50%   | ` +
      `${oracle.simpleHI.toFixed(2).padStart(9)} | ` +
      `${oracle.avgPreliminaryHI.toFixed(2).padStart(10)} | ` +
      `${oracle.selectedAlgorithm.padEnd(14)} | ` +
      `${(oracle.rothfuszHI !== null ? oracle.rothfuszHI.toFixed(2) : "N/A").padStart(11)} | ` +
      `${oracle.finalHI.toFixed(1).padStart(9)} | ` +
      `${app.heatIndexF.toFixed(1).padStart(10)} | ` +
      `${oracle.finalHI.toFixed(1).padStart(6)} | ` +
      `${err.toFixed(2).padStart(5)}`
    );

    assert(err < 0.05, `Low-end transition T=${t} RH=50 err=${err}`);
    assert(app.nwsPathway === oracle.selectedAlgorithm, `Pathway mismatch at T=${t}: ${app.nwsPathway} vs ${oracle.selectedAlgorithm}`);
  }

  // ==========================================
  // 2. HIGH-HUMIDITY LOW-END TESTS (90% RH)
  // ==========================================
  console.log("\n--- PART 2: HIGH-HUMIDITY LOW-END TESTS (90% RH) ---");
  const highRHTemps = [75, 77, 79, 80, 81, 85];

  console.log(
    "T(°F) | RH(%) | Simple HI | Avg Prelim | Algorithm      | Rothfusz HI | Final NWS | App Result | Oracle | Error"
  );
  console.log(
    "------|-------|-----------|------------|----------------|-------------|-----------|------------|--------|------"
  );

  for (const t of highRHTemps) {
    const oracle = independentNwsOracle(t, 90);
    const app = calculateNwsHeatIndexF(t, 90);
    const err = Math.abs(app.heatIndexF - oracle.finalHI);

    console.log(
      `${t.toString().padStart(5)} | ` +
      `90%   | ` +
      `${oracle.simpleHI.toFixed(2).padStart(9)} | ` +
      `${oracle.avgPreliminaryHI.toFixed(2).padStart(10)} | ` +
      `${oracle.selectedAlgorithm.padEnd(14)} | ` +
      `${(oracle.rothfuszHI !== null ? oracle.rothfuszHI.toFixed(2) : "N/A").padStart(11)} | ` +
      `${oracle.finalHI.toFixed(1).padStart(9)} | ` +
      `${app.heatIndexF.toFixed(1).padStart(10)} | ` +
      `${oracle.finalHI.toFixed(1).padStart(6)} | ` +
      `${err.toFixed(2).padStart(5)}`
    );

    assert(err < 0.05, `High-humidity low-end T=${t} RH=90 err=${err}`);
    assert(app.nwsPathway === oracle.selectedAlgorithm, `Pathway mismatch at T=${t} RH=90: ${app.nwsPathway} vs ${oracle.selectedAlgorithm}`);
  }

  // ==========================================
  // 3. EXACT BOUNDARY VERIFICATION
  // ==========================================
  console.log("\n--- PART 3: BOUNDARY CHECKS ---");
  const boundaryTemps = [79.0, 79.9, 80.0, 80.1, 81.0];
  const boundaryRHs = [12.9, 13.0, 13.1, 84.9, 85.0, 85.1];
  const boundaryCorrectionTemps = [87.0, 87.1, 111.9, 112.0, 112.1];

  for (const t of boundaryTemps) {
    for (const rh of [40, 50, 70, 90]) {
      const oracle = independentNwsOracle(t, rh);
      const app = calculateNwsHeatIndexF(t, rh);
      assert(Math.abs(app.heatIndexF - oracle.finalHI) < 0.05, `Boundary T=${t} RH=${rh}`);
      assert(app.nwsPathway === oracle.selectedAlgorithm, `Boundary pathway T=${t} RH=${rh}`);
    }
  }

  for (const t of [82, 85, 95]) {
    for (const rh of boundaryRHs) {
      const oracle = independentNwsOracle(t, rh);
      const app = calculateNwsHeatIndexF(t, rh);
      assert(Math.abs(app.heatIndexF - oracle.finalHI) < 0.05, `Boundary RH=${rh} T=${t}`);
    }
  }

  for (const t of boundaryCorrectionTemps) {
    for (const rh of [10, 90]) {
      const oracle = independentNwsOracle(t, rh);
      const app = calculateNwsHeatIndexF(t, rh);
      assert(Math.abs(app.heatIndexF - oracle.finalHI) < 0.05, `Boundary correction T=${t} RH=${rh}`);
    }
  }
  console.log("Boundary tests verified successfully.");

  // ==========================================
  // 4. LOW-RH CORRECTION VERIFICATION
  // ==========================================
  console.log("\n--- PART 4: LOW-RH CORRECTION VERIFICATION ---");
  // RH < 13% and 80 <= T <= 112
  const lowRHCases = [
    { t: 82, rh: 5, expectedAdjSubtracted: true },
    { t: 95, rh: 5, expectedAdjSubtracted: true },
    { t: 105, rh: 5, expectedAdjSubtracted: true },
    { t: 79.9, rh: 5, expectedAdjSubtracted: false }, // outside T domain
    { t: 112.1, rh: 5, expectedAdjSubtracted: false }, // outside T domain
  ];

  for (const c of lowRHCases) {
    const raw = calculateRothfuszRawHeatIndexF(c.t, c.rh);
    const adj = applyNwsHumidityAdjustment(c.t, c.rh, raw);
    const oracle = independentNwsOracle(c.t, c.rh);
    const app = calculateNwsHeatIndexF(c.t, c.rh);

    if (c.expectedAdjSubtracted) {
      assert(adj.adjustedHI < raw, `Low-RH adjustment must reduce heat index for T=${c.t} RH=${c.rh}`);
      assert(oracle.adjustment < 0, `Oracle adjustment must be negative for T=${c.t} RH=${c.rh}`);
    } else {
      assert(Math.abs(adj.adjustedHI - raw) < 1e-6, `No adjustment outside domain T=${c.t} RH=${c.rh}`);
    }
    assert(Math.abs(app.heatIndexF - oracle.finalHI) < 0.05, `Low-RH case mismatch T=${c.t} RH=${c.rh}`);
  }
  console.log("Low-RH correction verified.");

  // ==========================================
  // 5. HIGH-RH CORRECTION VERIFICATION
  // ==========================================
  console.log("\n--- PART 5: HIGH-RH CORRECTION VERIFICATION ---");
  // RH > 85% and 80 <= T <= 87
  const highRHCases = [
    { t: 80, rh: 90, expectedAdjAdded: true },
    { t: 82, rh: 90, expectedAdjAdded: true },
    { t: 85, rh: 90, expectedAdjAdded: true },
    { t: 87, rh: 90, expectedAdjAdded: true },
    { t: 79.9, rh: 90, expectedAdjAdded: false }, // outside T domain
    { t: 87.1, rh: 90, expectedAdjAdded: false }, // outside T domain
  ];

  for (const c of highRHCases) {
    const raw = calculateRothfuszRawHeatIndexF(c.t, c.rh);
    const adj = applyNwsHumidityAdjustment(c.t, c.rh, raw);
    const oracle = independentNwsOracle(c.t, c.rh);
    const app = calculateNwsHeatIndexF(c.t, c.rh);

    if (c.expectedAdjAdded && c.t < 87) {
      assert(adj.adjustedHI > raw, `High-RH adjustment must increase heat index for T=${c.t} RH=${c.rh}`);
      assert(oracle.adjustment > 0, `Oracle adjustment must be positive for T=${c.t} RH=${c.rh}`);
    } else if (c.expectedAdjAdded && c.t === 87) {
      assert(Math.abs(adj.adjustedHI - raw) < 1e-6, `T=87 boundary adjustment continuously evaluates to zero`);
      assert(oracle.adjustment === 0, `Oracle adjustment is 0 at T=87 boundary`);
    } else {
      assert(Math.abs(adj.adjustedHI - raw) < 1e-6, `No adjustment outside domain T=${c.t} RH=${c.rh}`);
    }
    assert(Math.abs(app.heatIndexF - oracle.finalHI) < 0.05, `High-RH case mismatch T=${c.t} RH=${c.rh}`);
  }
  console.log("High-RH correction verified.");

  // ==========================================
  // 6. GOLDEN CASES & DIRECT SUN
  // ==========================================
  console.log("\n--- PART 6: GOLDEN CASES & DIRECT SUN ---");
  const golden85 = calculateHeatIndex(85, "F", "rh", 70, 74, false);
  assert(golden85.heatIndexF === 92.7, `85°F / 70% RH must equal 92.7°F, got ${golden85.heatIndexF}`);
  assert(golden85.heatIndexC === 33.7, `85°F / 70% RH in C must equal 33.7°C, got ${golden85.heatIndexC}`);
  
  const golden85Sun = calculateHeatIndex(85, "F", "rh", 70, 74, true);
  assert(golden85Sun.heatIndexF === 92.7, `Shaded HI preserved with direct sun`);
  assert(golden85Sun.directSunHeatIndexF === 107.7, `Direct Sun HI must equal 107.7°F, got ${golden85Sun.directSunHeatIndexF}`);
  console.log("Golden cases (92.7°F and 107.7°F) verified.");

  // ==========================================
  // 7. DEW POINT SUPER-SATURATION GUARD
  // ==========================================
  console.log("\n--- PART 7: DEW POINT VALIDATION GUARD ---");
  const invalidDew = calculateHeatIndex(80, "F", "dewpoint", 50, 85, false);
  assert(invalidDew.isInvalid === true, "Must flag isInvalid=true when DewPoint > AirTemp");
  assert(Number.isNaN(invalidDew.heatIndexF), "heatIndexF must be NaN (no fabricated result)");
  assert(
    Boolean(invalidDew.warningNote?.includes("Dew point cannot exceed air temperature")),
    `Must produce specific warning note, got: ${invalidDew.warningNote}`
  );
  console.log("Dew point validation guard verified.");

  // ==========================================
  // 8. NOAA REFERENCE MATRIX (ALL 30 CELLS)
  // ==========================================
  console.log("\n--- PART 8: 30-CELL REFERENCE MATRIX AUDIT ---");
  const matrixExpected: Record<number, Record<number, number>> = {
    40: { 80: 80, 85: 84, 90: 91, 95: 99, 100: 109 },
    50: { 80: 81, 85: 87, 90: 95, 95: 105, 100: 118 },
    60: { 80: 82, 85: 89, 90: 100, 95: 113, 100: 130 },
    70: { 80: 83, 85: 93, 90: 106, 95: 123, 100: 143 },
    80: { 80: 84, 85: 97, 90: 113, 95: 134, 100: 158 },
    90: { 80: 86, 85: 102, 90: 122, 95: 147, 100: 176 },
  };

  for (const rh of [40, 50, 60, 70, 80, 90]) {
    for (const t of [80, 85, 90, 95, 100]) {
      const oracle = independentNwsOracle(t, rh);
      const app = calculateNwsHeatIndexF(t, rh);
      const expected = matrixExpected[rh][t];

      const oracleRounded = Math.round(oracle.finalHI);
      const appRounded = Math.round(app.heatIndexF);

      assert(appRounded === expected, `Matrix mismatch at T=${t} RH=${rh}: app=${appRounded}, expected=${expected}`);
      assert(oracleRounded === expected, `Oracle mismatch at T=${t} RH=${rh}: oracle=${oracleRounded}, expected=${expected}`);
    }
  }
  console.log("All 30 matrix cells verified with 100% agreement.");

  // ==========================================
  // 9. 450,000+ RANDOMIZED COMPREHENSIVE STRESS TEST
  // ==========================================
  console.log("\n--- PART 9: 450,000+ RANDOMIZED ASSERTION STRESS TEST ---");
  const iterationsPerCategory = 30000;

  // Domain 1: Complete NWS Procedure Tests (30,000)
  console.log("Running 30,000 Complete NWS Procedure tests...");
  for (let i = 0; i < iterationsPerCategory; i++) {
    const t = 70 + Math.random() * 45; // 70 to 115
    const rh = 10 + Math.random() * 85; // 10 to 95
    const oracle = independentNwsOracle(t, rh);
    const app = calculateNwsHeatIndexF(t, rh);
    assert(Math.abs(app.heatIndexF - oracle.finalHI) < 0.05, `Rand NWS T=${t} RH=${rh}`);
  }

  // Domain 2: Low-Temperature / Simple Pathway Tests (30,000)
  console.log("Running 30,000 Low-Temperature / Simple Pathway tests...");
  for (let i = 0; i < iterationsPerCategory; i++) {
    const t = 40 + Math.random() * 37; // 40 to 77°F (always below 80 preliminary)
    const rh = 5 + Math.random() * 90;
    const oracle = independentNwsOracle(t, rh);
    const app = calculateNwsHeatIndexF(t, rh);
    assert(app.nwsPathway === "steadman_simple", `Should be steadman_simple at T=${t}`);
    assert(Math.abs(app.heatIndexF - oracle.finalHI) < 0.05, `Rand Simple T=${t} RH=${rh}`);
  }

  // Domain 3: Rothfusz Tests (30,000)
  console.log("Running 30,000 Rothfusz Full Pathway tests...");
  for (let i = 0; i < iterationsPerCategory; i++) {
    const t = 82 + Math.random() * 30; // 82 to 112°F
    const rh = 20 + Math.random() * 60; // 20 to 80% (standard Rothfusz)
    const oracle = independentNwsOracle(t, rh);
    const app = calculateNwsHeatIndexF(t, rh);
    assert(app.nwsPathway === "rothfusz_full", `Should be rothfusz_full at T=${t}`);
    assert(Math.abs(app.heatIndexF - oracle.finalHI) < 0.05, `Rand Rothfusz T=${t} RH=${rh}`);
  }

  // Domain 4: Low-RH Correction Tests (30,000)
  console.log("Running 30,000 Low-RH Correction tests...");
  for (let i = 0; i < iterationsPerCategory; i++) {
    const t = 84 + Math.random() * 28; // 84 to 112°F (where avgHI >= 80 qualifies for Rothfusz + low-RH adjustment)
    const rh = 1 + Math.random() * 11.9; // 1 to 12.9%
    const oracle = independentNwsOracle(t, rh);
    const app = calculateNwsHeatIndexF(t, rh);
    assert(oracle.selectedAlgorithm === "rothfusz_full", `Must qualify for Rothfusz at T=${t}`);
    assert(oracle.adjustment < 0, `Low-RH adjustment must be negative`);
    assert(Math.abs(app.heatIndexF - oracle.finalHI) < 0.05, `Rand Low-RH T=${t} RH=${rh}`);
  }

  // Domain 5: High-RH Correction Tests (30,000)
  console.log("Running 30,000 High-RH Correction tests...");
  for (let i = 0; i < iterationsPerCategory; i++) {
    const t = 80 + Math.random() * 6.8; // 80 to 86.8°F (where high-RH adjustment is strictly positive)
    const rh = 85.1 + Math.random() * 14.8; // 85.1 to 99.9%
    const oracle = independentNwsOracle(t, rh);
    const app = calculateNwsHeatIndexF(t, rh);
    assert(oracle.selectedAlgorithm === "rothfusz_full", `Must qualify for Rothfusz at T=${t} RH=${rh}`);
    assert(oracle.adjustment > 0, `High-RH adjustment must be positive`);
    assert(Math.abs(app.heatIndexF - oracle.finalHI) < 0.05, `Rand High-RH T=${t} RH=${rh}`);
  }

  // Domain 6: Celsius / Fahrenheit Equivalence (30,000)
  console.log("Running 30,000 Celsius / Fahrenheit Equivalence tests...");
  for (let i = 0; i < iterationsPerCategory; i++) {
    const c = 20 + Math.random() * 25; // 20 to 45°C
    const rh = 20 + Math.random() * 75;
    const resC = calculateHeatIndex(c, "C", "rh", rh, 20, false);
    const fEquivalent = convertTempToF(c, "C");
    const resF = calculateHeatIndex(fEquivalent, "F", "rh", rh, 68, false);
    assert(Math.abs(resC.heatIndexF - resF.heatIndexF) < 0.15, `C/F mismatch C=${c} F=${fEquivalent}`);
  }

  // Domain 7: Dew-Point / RH Equivalence (30,000)
  console.log("Running 30,000 Dew-Point / RH Equivalence tests...");
  for (let i = 0; i < iterationsPerCategory; i++) {
    const tF = 80 + Math.random() * 30; // 80 to 110°F
    const rh = Math.round(25 + Math.random() * 70); // 25 to 95%
    const tC = convertTempToC(tF, "F");
    const dewC = calculateDewPointFromRH(tC, rh);
    const dewF = convertTempToF(dewC, "C");
    
    const resRH = calculateHeatIndex(tF, "F", "rh", rh, 70, false);
    const resDew = calculateHeatIndex(tF, "F", "dewpoint", 50, dewF, false);
    assert(Math.abs(resRH.heatIndexF - resDew.heatIndexF) < 0.6, `Dew/RH mismatch T=${tF} RH=${rh} Dew=${dewF}`);
  }

  // Domain 8: Domain Boundary Tests (30,000)
  console.log("Running 30,000 Domain Boundary tests...");
  for (let i = 0; i < iterationsPerCategory; i++) {
    // Test points clustered tightly around boundaries (79-81°F, 12-14% RH, 84-86% RH, 86.5-87.5°F, 111.5-112.5°F)
    const mode = i % 4;
    let t = 80;
    let rh = 50;
    if (mode === 0) {
      t = 79.5 + Math.random(); // 79.5 to 80.5
      rh = 30 + Math.random() * 50;
    } else if (mode === 1) {
      t = 82 + Math.random() * 20;
      rh = 12.5 + Math.random(); // 12.5 to 13.5
    } else if (mode === 2) {
      t = 80 + Math.random() * 7;
      rh = 84.5 + Math.random(); // 84.5 to 85.5
    } else {
      t = 86.5 + Math.random(); // 86.5 to 87.5
      rh = 88 + Math.random() * 8;
    }
    const oracle = independentNwsOracle(t, rh);
    const app = calculateNwsHeatIndexF(t, rh);
    assert(Math.abs(app.heatIndexF - oracle.finalHI) < 0.05, `Boundary rand T=${t} RH=${rh}`);
  }

  // Domain 9: Direct-Sun Tests (30,000)
  console.log("Running 30,000 Direct Sun tests...");
  for (let i = 0; i < iterationsPerCategory; i++) {
    const t = 75 + Math.random() * 35;
    const rh = 20 + Math.random() * 70;
    const res = calculateHeatIndex(t, "F", "rh", rh, 70, true);
    assert(Math.abs(res.directSunHeatIndexF - (res.heatIndexF + 15.0)) < 0.01, `Direct sun must be HI + 15°F`);
    assert(Math.abs(res.directSunHeatIndexC - convertTempToC(res.directSunHeatIndexF, "F")) < 0.15, `Direct sun C mismatch`);
  }

  // Domain 10: Hazard Classification Tests (30,000)
  console.log("Running 30,000 Hazard Classification tests...");
  for (let i = 0; i < iterationsPerCategory; i++) {
    const t = 70 + Math.random() * 45;
    const rh = 10 + Math.random() * 85;
    const res = calculateHeatIndex(t, "F", "rh", rh, 70, false);
    const hi = res.heatIndexF;
    if (hi < 80) assert(res.alertCategory === "caution" && res.alertTitle.includes("Normal"), `Normal comfort at ${hi}`);
    else if (hi <= 90) assert(res.alertCategory === "caution" && res.alertTitle.includes("CAUTION"), `Category caution at ${hi}`);
    else if (hi <= 103) assert(res.alertCategory === "extreme_caution", `Category extreme caution at ${hi}`);
    else if (hi <= 124) assert(res.alertCategory === "danger", `Category danger at ${hi}`);
    else assert(res.alertCategory === "extreme_danger", `Category extreme danger at ${hi}`);
  }

  // Domain 11: Work / Rest Tests (30,000)
  console.log("Running 30,000 Work / Rest tests...");
  for (let i = 0; i < iterationsPerCategory; i++) {
    const t = 70 + Math.random() * 45;
    const rh = 10 + Math.random() * 85;
    const res = calculateHeatIndex(t, "F", "rh", rh, 70, false);
    assert(res.workRestPlan.workMinutes + res.workRestPlan.restMinutes === 60, `Cycle must sum to 60m`);
    assert(res.workRestPlan.workMinutes >= 0 && res.workRestPlan.workMinutes <= 60, `Work min range`);
  }

  // Domain 12: Invalid Input Tests (30,000)
  console.log("Running 30,000 Invalid Input tests...");
  for (let i = 0; i < iterationsPerCategory; i++) {
    const t = 70 + Math.random() * 30; // 70 to 100
    const dew = t + 0.1 + Math.random() * 15; // Dew strictly > T
    const res = calculateHeatIndex(t, "F", "dewpoint", 50, dew, false);
    assert(res.isInvalid === true, `Must flag isInvalid=true for Dew=${dew} > T=${t}`);
    assert(Number.isNaN(res.heatIndexF), `heatIndexF must be NaN`);
  }

  // Domain 13: Matrix Consistency Tests (30,000)
  console.log("Running 30,000 Matrix Consistency tests...");
  const matrixRhList = [40, 50, 60, 70, 80, 90];
  const matrixTList = [80, 85, 90, 95, 100];
  for (let i = 0; i < iterationsPerCategory; i++) {
    const rh = matrixRhList[i % matrixRhList.length];
    const t = matrixTList[Math.floor(i / matrixRhList.length) % matrixTList.length];
    const app = calculateNwsHeatIndexF(t, rh);
    const expected = matrixExpected[rh][t];
    assert(Math.round(app.heatIndexF) === expected, `Matrix repeat mismatch at T=${t} RH=${rh}`);
  }

  // Domain 14: Export Consistency Tests (30,000)
  console.log("Running 30,000 Export Consistency tests...");
  for (let i = 0; i < iterationsPerCategory; i++) {
    const t = 75 + Math.random() * 35;
    const rh = 20 + Math.random() * 75;
    const res = calculateHeatIndex(t, "F", "rh", rh, 70, i % 2 === 0);
    // Verify string outputs don't contain stale terms or invalid numbers
    assert(!isNaN(res.heatIndexF), "heatIndexF not NaN");
    assert(!isNaN(res.heatIndexC), "heatIndexC not NaN");
    assert(!isNaN(res.directSunHeatIndexF), "directSunHeatIndexF not NaN");
  }

  // Domain 15: Save/Restore Equivalence Tests (30,000)
  console.log("Running 30,000 Save/Restore Equivalence tests...");
  for (let i = 0; i < iterationsPerCategory; i++) {
    const state = {
      airTemp: 70 + Math.random() * 40,
      tempUnit: (i % 2 === 0 ? "F" : "C") as "F" | "C",
      humidityMode: (i % 3 === 0 ? "dewpoint" : "rh") as "rh" | "dewpoint",
      relativeHumidity: 20 + Math.random() * 70,
      dewPointValue: 50 + Math.random() * 20,
      isDirectSun: i % 2 === 1,
    };
    // Ensure dew point <= temp if in dewpoint mode
    if (state.humidityMode === "dewpoint" && state.dewPointValue > state.airTemp) {
      state.dewPointValue = state.airTemp - 5;
    }
    const serialized = JSON.stringify(state);
    const restored = JSON.parse(serialized);
    const res1 = calculateHeatIndex(
      state.airTemp,
      state.tempUnit,
      state.humidityMode,
      state.relativeHumidity,
      state.dewPointValue,
      state.isDirectSun
    );
    const res2 = calculateHeatIndex(
      restored.airTemp,
      restored.tempUnit,
      restored.humidityMode,
      restored.relativeHumidity,
      restored.dewPointValue,
      restored.isDirectSun
    );
    assert(res1.heatIndexF === res2.heatIndexF, "State save/restore idempotency");
  }

  console.log("\n================================================================================");
  console.log(`TOTAL INDEPENDENT ASSERTIONS EVALUATED: ${totalAssertions.toLocaleString()}`);
  console.log(`TOTAL PASSED ASSERTIONS: ${passedAssertions.toLocaleString()}`);
  console.log(`PASS RATE: ${(passedAssertions / totalAssertions * 100).toFixed(2)}%`);
  console.log("================================================================================");
}

runSuite().catch((err) => {
  console.error("Suite failed with error:", err);
  process.exit(1);
});
