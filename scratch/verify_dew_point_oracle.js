// Independent Psychrometric Oracle & Golden Case Verification Script
// Standalone script in pure Node.js (CommonJS / ES compatible)

// 1. INDEPENDENT PSYCHROMETRIC ORACLE (No import of calculator code)
function oracleDewPointC(tempC, rh, a = 17.625, b = 243.04) {
  const gamma = Math.log(rh / 100) + (a * tempC) / (b + tempC);
  return (b * gamma) / (a - gamma);
}

function oracleRH(tempC, dewC, a = 17.625, b = 243.04) {
  const gammaD = (a * dewC) / (b + dewC);
  const gammaT = (a * tempC) / (b + tempC);
  return 100 * Math.exp(gammaD - gammaT);
}

function oracleTempC(dewC, rh, a = 17.625, b = 243.04) {
  const gammaD = (a * dewC) / (b + dewC);
  const term = gammaD - Math.log(rh / 100);
  return (b * term) / (a - term);
}

function oracleWetBulbC(tempC, rh) {
  const T = tempC;
  const RH = rh;
  return (
    T * Math.atan(0.151977 * Math.pow(RH + 8.313659, 0.5)) +
    Math.atan(T + RH) -
    Math.atan(RH - 1.676331) +
    0.00391838 * Math.pow(RH, 1.5) * Math.atan(0.023101 * RH) -
    4.686035
  );
}

function oracleVaporPressureHpa(tempC, rh, a = 17.625, b = 243.04) {
  const es = 6.112 * Math.exp((a * tempC) / (b + tempC));
  return (rh / 100) * es;
}

function oracleAbsoluteHumidity(tempC, rh, a = 17.625, b = 243.04) {
  const e = oracleVaporPressureHpa(tempC, rh, a, b);
  return (216.7 * e) / (tempC + 273.15);
}

function oracleCloudBaseFt(tempF, dewF) {
  return Math.max(0, Math.round(((tempF - dewF) / 4.4) * 1000));
}

function runOracleVerification() {
  console.log("============================================================");
  console.log("1. PRIMARY GOLDEN CASE VERIFICATION");
  console.log("============================================================");

  const T_air_F = 70;
  const RH = 65;
  const T_air_C = (T_air_F - 32) * (5 / 9);
  const T_air_K = T_air_C + 273.15;

  const oracle_dew_C = oracleDewPointC(T_air_C, RH);
  const oracle_dew_F = oracle_dew_C * (9 / 5) + 32;
  const oracle_dew_K = oracle_dew_C + 273.15;

  const oracle_wb_C = oracleWetBulbC(T_air_C, RH);
  const oracle_wb_F = oracle_wb_C * (9 / 5) + 32;

  const oracle_vp = oracleVaporPressureHpa(T_air_C, RH);
  const oracle_ah = oracleAbsoluteHumidity(T_air_C, RH);
  const oracle_cb = oracleCloudBaseFt(T_air_F, oracle_dew_F);

  const substrate_F = 75;
  const margin_F = substrate_F - oracle_dew_F;

  console.log(`Air Temp: ${T_air_F}°F (${T_air_C.toFixed(4)}°C, ${T_air_K.toFixed(4)} K)`);
  console.log(`Relative Humidity: ${RH}%`);
  console.log(`Oracle Dew Point: ${oracle_dew_F.toFixed(4)}°F -> Rounded: ${oracle_dew_F.toFixed(1)}°F (Expected: ~57.7°F)`);
  console.log(`Oracle Celsius: ${oracle_dew_C.toFixed(4)}°C -> Rounded: ${oracle_dew_C.toFixed(1)}°C (Expected: ~14.3°C)`);
  console.log(`Oracle Kelvin: ${oracle_dew_K.toFixed(4)} K -> Rounded: ${oracle_dew_K.toFixed(2)} K (Expected: ~287.43 K)`);
  console.log(`Oracle Wet Bulb: ${oracle_wb_F.toFixed(4)}°F -> Rounded: ${Math.round(oracle_wb_F)}°F (Expected: ~62°F)`);
  console.log(`Oracle Vapor Pressure: ${oracle_vp.toFixed(4)} hPa -> Rounded: ${oracle_vp.toFixed(2)} hPa (Expected: ~16.25 hPa)`);
  console.log(`Oracle Absolute Humidity: ${oracle_ah.toFixed(4)} g/m³ -> Rounded: ${oracle_ah.toFixed(2)} g/m³ (Expected: ~11.97 g/m³)`);
  console.log(`Oracle Cloud Base: ${oracle_cb} ft (Expected: ~2,795 ft)`);
  console.log(`Substrate Margin: ${margin_F.toFixed(4)}°F -> Rounded: ${margin_F.toFixed(1)}°F (Expected: ~17.3°F)`);

  const passDewPoint = Math.abs(oracle_dew_F - 57.7) < 0.05;
  const passWetBulb = Math.abs(oracle_wb_F - 62) < 0.2;
  const passVP = Math.abs(oracle_vp - 16.25) < 0.02;
  const passAH = Math.abs(oracle_ah - 11.97) < 0.02;
  const passCB = Math.abs(oracle_cb - 2795) <= 1;
  const passMargin = Math.abs(margin_F - 17.3) < 0.05;

  console.log(`\nPrimary Golden Case Checks:`);
  console.log(`Dew Point 57.7°F: ${passDewPoint ? "PASS" : "FAIL"}`);
  console.log(`Wet Bulb 62°F: ${passWetBulb ? "PASS" : "FAIL"}`);
  console.log(`Vapor Pressure 16.25 hPa: ${passVP ? "PASS" : "FAIL"}`);
  console.log(`Absolute Humidity 11.97 g/m³: ${passAH ? "PASS" : "FAIL"}`);
  console.log(`Cloud Base 2,795 ft: ${passCB ? "PASS" : "FAIL"}`);
  console.log(`Dew Point Margin 17.3°F: ${passMargin ? "PASS" : "FAIL"}`);

  if (!passDewPoint || !passWetBulb || !passVP || !passAH || !passCB || !passMargin) {
    console.error("PRIMARY GOLDEN CASE VERIFICATION FAILED!");
    process.exit(1);
  }

  console.log("\n============================================================");
  console.log("2. BIDIRECTIONAL SOLVER REVERSIBILITY");
  console.log("============================================================");

  // Direction A: T=70°F, RH=65% -> Td
  const Td_golden = oracleDewPointC(T_air_C, 65);
  // Direction B: T=70°F, Td=Td_golden -> RH
  const RH_rec = oracleRH(T_air_C, Td_golden);
  // Direction C: Td=Td_golden, RH=65% -> T
  const T_rec = oracleTempC(Td_golden, 65);

  console.log(`Direction A (T=70°F, RH=65% -> Td): ${ (Td_golden * 9/5 + 32).toFixed(4) }°F`);
  console.log(`Direction B (T=70°F, Td -> RH): ${ RH_rec.toFixed(6) }% (Expected: 65%)`);
  console.log(`Direction C (Td, RH=65% -> T): ${ (T_rec * 9/5 + 32).toFixed(6) }°F (Expected: 70°F)`);

  const rhDiff = Math.abs(RH_rec - 65);
  const tDiff = Math.abs((T_rec * 9/5 + 32) - 70);
  console.log(`Reversibility Error: RH delta = ${rhDiff.toExponential(4)}, Temp delta = ${tDiff.toExponential(4)}`);
  if (rhDiff > 1e-10 || tDiff > 1e-10) {
    console.error("BIDIRECTIONAL INVERSION FAILED!");
    process.exit(1);
  }
  console.log("Bidirectional Inversion: PASS (Machine precision reversibility)");

  console.log("\n============================================================");
  console.log("3. 25,000 RANDOMIZED ROUND-TRIP INVERSION TESTS");
  console.log("============================================================");

  const ROUND_TRIP_COUNT = 25000;
  let maxTempDrift = 0;
  let maxRhDrift = 0;

  for (let i = 0; i < ROUND_TRIP_COUNT; i++) {
    // Generate random physical temperatures between -30°C and +50°C
    const tC = -30 + Math.random() * 80;
    // Generate random RH between 1% and 100%
    const rh = 1 + Math.random() * 99;

    const td = oracleDewPointC(tC, rh);
    const recoveredRH = oracleRH(tC, td);
    const recoveredTC = oracleTempC(td, recoveredRH);

    const dTemp = Math.abs(tC - recoveredTC);
    const dRH = Math.abs(rh - recoveredRH);

    if (dTemp > maxTempDrift) maxTempDrift = dTemp;
    if (dRH > maxRhDrift) maxRhDrift = dRH;
  }

  console.log(`Completed ${ROUND_TRIP_COUNT} round trips.`);
  console.log(`Max Temperature Drift: ${maxTempDrift.toExponential(4)} °C`);
  console.log(`Max RH Drift: ${maxRhDrift.toExponential(4)} %`);

  if (maxTempDrift > 1e-8 || maxRhDrift > 1e-8) {
    console.error("ROUND TRIP PROPERTY TEST FAILED: Drift exceeded tolerance!");
    process.exit(1);
  }
  console.log("25,000 Round Trips: PASS (Zero material drift)");

  console.log("\n============================================================");
  console.log("4. 35-CELL HEAT-MAP INDEPENDENT RE-VERIFICATION");
  console.log("============================================================");

  const temps = [60, 70, 80, 90, 100];
  const rhs = [30, 40, 50, 60, 70, 80, 90];
  const pdfExpected = {
    30: [28, 37, 46, 54, 63],
    40: [36, 45, 54, 62, 71],
    50: [41, 51, 60, 69, 78],
    60: [46, 55, 65, 74, 84],
    70: [50, 60, 69, 79, 88],
    80: [54, 64, 73, 83, 93],
    90: [57, 67, 77, 87, 97],
  };

  let matrixPassCount = 0;
  for (const rhVal of rhs) {
    const rowResults = [];
    temps.forEach((tF, idx) => {
      const tC = ((tF - 32) * 5) / 9;
      const tdC = oracleDewPointC(tC, rhVal);
      const tdF = Math.round(tdC * (9 / 5) + 32);
      const expected = pdfExpected[rhVal][idx];
      const match = tdF === expected;
      if (match) matrixPassCount++;
      rowResults.push(`${tF}°F->${tdF}°F (${match ? "OK" : "FAIL"})`);
    });
    console.log(`${rhVal}% RH: ${rowResults.join(", ")}`);
  }

  console.log(`Matrix verification: ${matrixPassCount} / 35 matched exactly`);
  if (matrixPassCount !== 35) {
    console.error("HEAT-MAP MATRIX VERIFICATION FAILED!");
    process.exit(1);
  }
  console.log("Heat-Map Matrix: PASS (35 / 35)");

  console.log("\n============================================================");
  console.log("5. COMFORT BOUNDARY TESTS");
  console.log("============================================================");

  function evalComfort(dewF) {
    if (dewF < 50) return "dry";
    if (dewF < 60) return "comfortable";
    if (dewF < 65) return "sticky";
    if (dewF < 70) return "muggy";
    return "severe_stress";
  }

  const boundaryChecks = [
    { val: 49.9, exp: "dry" },
    { val: 50.0, exp: "comfortable" },
    { val: 50.1, exp: "comfortable" },
    { val: 59.9, exp: "comfortable" },
    { val: 60.0, exp: "sticky" },
    { val: 60.1, exp: "sticky" },
    { val: 64.9, exp: "sticky" },
    { val: 65.0, exp: "muggy" },
    { val: 65.1, exp: "muggy" },
    { val: 69.9, exp: "muggy" },
    { val: 70.0, exp: "severe_stress" },
    { val: 70.1, exp: "severe_stress" },
  ];

  for (const b of boundaryChecks) {
    const actual = evalComfort(b.val);
    const pass = actual === b.exp;
    console.log(`Comfort at ${b.val}°F: ${actual} (Expected: ${b.exp}) -> ${pass ? "PASS" : "FAIL"}`);
    if (!pass) {
      console.error(`Boundary test failed at ${b.val}!`);
      process.exit(1);
    }
  }
  console.log("Comfort Boundaries: PASS (Zero gaps, zero off-by-one errors)");

  console.log("\n============================================================");
  console.log("6. COATING CONDENSATION SCREENING BOUNDARIES");
  console.log("============================================================");

  function evalPainting(subF, dewF) {
    const margin = subF - dewF;
    if (margin <= 0) return "CONDENSATION RISK: Surface at or below dew point";
    if (margin < 5.0) return "HIGH RISK / BELOW SELECTED 5°F SCREENING MARGIN";
    return "SCREENING CONDITION SATISFIED (5°F Margin)";
  }

  const coatingChecks = [
    { sub: 56.7, dew: 57.7, exp: "CONDENSATION RISK: Surface at or below dew point" }, // Td - 1°F -> condensation risk
    { sub: 57.7, dew: 57.7, exp: "CONDENSATION RISK: Surface at or below dew point" }, // Td -> condensation risk
    { sub: 59.7, dew: 57.7, exp: "HIGH RISK / BELOW SELECTED 5°F SCREENING MARGIN" },   // Td + 2°F -> below selected 5°F screening margin
    { sub: 62.6, dew: 57.7, exp: "HIGH RISK / BELOW SELECTED 5°F SCREENING MARGIN" },   // Td + 4.9°F -> below selected 5°F screening margin
    { sub: 62.7, dew: 57.7, exp: "SCREENING CONDITION SATISFIED (5°F Margin)" },       // Td + 5.0°F -> screening benchmark satisfied
    { sub: 62.8, dew: 57.7, exp: "SCREENING CONDITION SATISFIED (5°F Margin)" },       // Td + 5.1°F -> screening benchmark satisfied
    { sub: 67.7, dew: 57.7, exp: "SCREENING CONDITION SATISFIED (5°F Margin)" },       // Td + 10.0°F -> screening benchmark satisfied
  ];

  for (const c of coatingChecks) {
    const act = evalPainting(c.sub, c.dew);
    const pass = act === c.exp;
    console.log(`Substrate ${c.sub}°F, Dew ${c.dew}°F -> ${act} -> ${pass ? "PASS" : "FAIL"}`);
    if (!pass) {
      console.error("Coating check failed!");
      process.exit(1);
    }
  }
  console.log("Coating Condensation Screening Boundaries: PASS");

  console.log("\n>>> ALL ORACLE & GOLDEN CHECKS PASSED PERFECTLY! <<<");
}

runOracleVerification();
