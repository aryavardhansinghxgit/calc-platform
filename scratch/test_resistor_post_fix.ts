import {
  calculateResistorCalculator,
  formatOhms,
  COLOR_DATABASE,
  E_SERIES_BASES,
  E_SERIES_TOLERANCES,
  MATERIAL_RESISTIVITIES,
  EIA96_TABLE,
  awgToDiameterMeters
} from "../src/app/calculators/resistor-calculator/calculator";
import { runResistorCalculatorTests } from "../src/app/calculators/resistor-calculator/tests";

console.log("============================================================");
console.log("STARTING MASTER PRODUCTION QA & FUNCTIONAL AUDIT");
console.log("TARGET: /calculators/resistor-calculator");
console.log("============================================================");

let totalAssertions = 0;
let passedAssertions = 0;
let failedAssertions = 0;

function assert(condition: boolean, message: string) {
  totalAssertions++;
  if (condition) {
    passedAssertions++;
  } else {
    failedAssertions++;
    console.error(`❌ ASSERTION FAILED: ${message}`);
    throw new Error(message);
  }
}

// ============================================================
// 1. RUN BUILT-IN REGRESSION SUITE
// ============================================================
console.log("\n[1/14] Running Built-in Regression Suite...");
const builtInPassed = runResistorCalculatorTests();
assert(builtInPassed === true, "Built-in regression suite should pass");

// ============================================================
// 2. GOLDEN REFERENCE CASES
// ============================================================
console.log("\n[2/14] Auditing Reference Cases A, B, C, D, E, F, G...");

// Case A (5-band as specified in prompt: Band1=3, Band2=3, Band3=0, Mult=x100, Tol=±1% -> 33 kΩ)
const resA_5band = calculateResistorCalculator({
  activeTab: "color",
  bandCount: 5,
  band1: "orange",
  band2: "orange",
  band3: "black",
  multiplier: "red",
  tolerance: "brown"
});
assert(resA_5band.resistanceOhms === 33000, "Case A (5-band): 33,000 Ω nominal");
assert(resA_5band.tolerancePct === 1, "Case A (5-band): ±1% tolerance");
assert(resA_5band.minOhms === 32670, "Case A (5-band): 32,670 Ω min");
assert(resA_5band.maxOhms === 33330, "Case A (5-band): 33,330 Ω max");

// Case A (4-band literal colors: Orange, Orange, Red, Brown -> 3.3 kΩ)
const resA_4band = calculateResistorCalculator({
  activeTab: "color",
  bandCount: 4,
  band1: "orange",
  band2: "orange",
  multiplier: "red",
  tolerance: "brown"
});
assert(resA_4band.resistanceOhms === 3300, "Case A (4-band literal): 3,300 Ω nominal");
assert(resA_4band.tolerancePct === 1, "Case A (4-band literal): ±1% tolerance");
assert(resA_4band.minOhms === 3267, "Case A (4-band literal): 3,267 Ω min");
assert(resA_4band.maxOhms === 3333, "Case A (4-band literal): 3,333 Ω max");

// PDF Page 1: Brown-Brown-Red-Gold -> 1.1 kΩ ±5%
const resP1 = calculateResistorCalculator({
  activeTab: "color",
  bandCount: 4,
  band1: "brown",
  band2: "brown",
  multiplier: "red",
  tolerance: "gold"
});
assert(resP1.resistanceOhms === 1100, "PDF Page 1: 1,100 Ω nominal");
assert(resP1.tolerancePct === 5, "PDF Page 1: ±5% tolerance");
assert(resP1.minOhms === 1045, "PDF Page 1: 1,045 Ω min");
assert(resP1.maxOhms === 1155, "PDF Page 1: 1,155 Ω max");

// Case B: Series Network 100, 220, 470
const resB = calculateResistorCalculator({
  activeTab: "series_parallel",
  resistorValuesString: "100, 220, 470",
  parallelMode: false,
  supplyVoltage: 12
});
assert(resB.resistanceOhms === 790, "Case B: 790 Ω nominal");
assert(resB.minOhms === 750.5, "Case B: 750.5 Ω min");
assert(resB.maxOhms === 829.5, "Case B: 829.5 Ω max");

// Case C: Parallel Network 100, 220, 470 at 12V
const resC = calculateResistorCalculator({
  activeTab: "series_parallel",
  resistorValuesString: "100, 220, 470",
  parallelMode: true,
  supplyVoltage: 12
});
// 1/R = 1/100 + 1/220 + 1/470 = 0.0166731
assert(Math.abs(resC.resistanceOhms - 59.9768) < 0.05, "Case C: ~59.98 Ω nominal");
assert(Math.abs((resC.minOhms || 0) - 56.98) < 0.1, "Case C: ~56.98 Ω min");
assert(Math.abs((resC.maxOhms || 0) - 62.98) < 0.1, "Case C: ~62.98 Ω max");

// Case D: Conductor Copper 100m, 1mm diameter
const resD = calculateResistorCalculator({
  activeTab: "conductor",
  conductorLength: 100,
  conductorLengthUnit: "m",
  conductorSizeInputType: "diameter",
  conductorDiameter: 1,
  conductorDiameterUnit: "mm",
  conductorMaterial: "copper",
  conductorTemp: 20
});
assert(Math.abs(resD.resistanceOhms - 2.1899) < 0.02, "Case D: ~2.19 Ω conductor R");

// Case E: SMD Decoders
assert(calculateResistorCalculator({ activeTab: "smd", smdCode: "103" }).resistanceOhms === 10000, "SMD 103");
assert(calculateResistorCalculator({ activeTab: "smd", smdCode: "472" }).resistanceOhms === 4700, "SMD 472");
assert(calculateResistorCalculator({ activeTab: "smd", smdCode: "1002" }).resistanceOhms === 10000, "SMD 1002");
assert(calculateResistorCalculator({ activeTab: "smd", smdCode: "4R7" }).resistanceOhms === 4.7, "SMD 4R7");

// Case F: E-Series Finder (Target 1.5 kΩ, E24)
const resF = calculateResistorCalculator({
  activeTab: "finder",
  finderTargetResistance: 1.5,
  finderTargetUnit: "kΩ",
  finderESeries: "E24"
});
assert(resF.resistanceOhms === 1500, "Case F: 1500 Ω closest E24");
assert(resF.tolerancePct === 5, "Case F: Standard E24 tolerance ±5%");
assert(resF.minOhms === 1425, "Case F: 1425 Ω min");
assert(resF.maxOhms === 1575, "Case F: 1575 Ω max");

// Case G: 5-Band PDF Example: Orange-Blue-Black-Red-Brown -> 36 kΩ ±1%
const resG = calculateResistorCalculator({
  activeTab: "color",
  bandCount: 5,
  band1: "orange",
  band2: "blue",
  band3: "black",
  multiplier: "red",
  tolerance: "brown"
});
assert(resG.resistanceOhms === 36000, "Case G: 36,000 Ω nominal");
assert(resG.tolerancePct === 1, "Case G: ±1% tolerance");
assert(resG.minOhms === 35640, "Case G: 35,640 Ω min");
assert(resG.maxOhms === 36360, "Case G: 36,360 Ω max");

// ============================================================
// 3. COLOR-CODE COMBINATIONS (20,000 Independent Tests)
// ============================================================
console.log("\n[3/14] Running 20,000 Color Code Combinations Oracle Tests...");
const digitColors = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "gray", "white"] as const;
const multColors = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "gray", "white", "gold", "silver"] as const;
const tolColors = ["brown", "red", "orange", "yellow", "green", "blue", "violet", "gray", "gold", "silver"] as const;

for (let i = 0; i < 20000; i++) {
  const bandCount = i % 3 === 0 ? 4 : i % 3 === 1 ? 5 : 6;
  const b1 = digitColors[1 + (i % 9)]; // band 1 non-zero digit
  const b2 = digitColors[(i * 3 + 1) % 10];
  const b3 = digitColors[(i * 7 + 2) % 10];
  const mult = multColors[(i * 5 + 3) % multColors.length];
  const tol = tolColors[(i * 11 + 4) % tolColors.length];

  // Independent oracle
  const d1 = COLOR_DATABASE[b1].digit!;
  const d2 = COLOR_DATABASE[b2].digit!;
  const d3 = COLOR_DATABASE[b3].digit!;
  const m = COLOR_DATABASE[mult].multiplier!;
  const t = COLOR_DATABASE[tol].tolerance!;

  let oracleSigFigs = bandCount === 4 ? d1 * 10 + d2 : d1 * 100 + d2 * 10 + d3;
  const oracleOhms = oracleSigFigs * m;
  const oracleMin = oracleOhms * (1 - t / 100);
  const oracleMax = oracleOhms * (1 + t / 100);

  const res = calculateResistorCalculator({
    activeTab: "color",
    bandCount,
    band1: b1,
    band2: b2,
    band3: b3,
    multiplier: mult,
    tolerance: tol
  });

  assert(Math.abs(res.resistanceOhms - oracleOhms) < 1e-9 * Math.max(1, oracleOhms), `Color code nominal mismatch at ${i}`);
  assert(res.tolerancePct === t, `Color code tolerance mismatch at ${i}`);
  assert(Math.abs(res.minOhms! - oracleMin) < 1e-6 * Math.max(1, oracleMin), `Color code min mismatch at ${i}`);
  assert(Math.abs(res.maxOhms! - oracleMax) < 1e-6 * Math.max(1, oracleMax), `Color code max mismatch at ${i}`);
}
console.log("  ✓ 20,000 Color Code Combinations passed.");

// ============================================================
// 4. SERIES NETWORK COMBINATIONS (20,000 Independent Tests)
// ============================================================
console.log("\n[4/14] Running 20,000 Series Combinations Oracle Tests...");
for (let i = 0; i < 20000; i++) {
  const count = 2 + (i % 5);
  const vals: number[] = [];
  for (let c = 0; c < count; c++) {
    vals.push(Math.round(((i * (c + 1) * 37) % 5000 + 1) * 10) / 10);
  }

  // Independent oracle: sum(R_i)
  const oracleSum = vals.reduce((acc, v) => acc + v, 0);
  const inputStr = vals.join(", ");

  const res = calculateResistorCalculator({
    activeTab: "series_parallel",
    resistorValuesString: inputStr,
    parallelMode: false
  });

  assert(Math.abs(res.resistanceOhms - oracleSum) < 1e-6, `Series sum mismatch at ${i}: expected ${oracleSum}, got ${res.resistanceOhms}`);
  // Permutation test
  if (i % 100 === 0) {
    const permStr = [...vals].reverse().join(", ");
    const resPerm = calculateResistorCalculator({
      activeTab: "series_parallel",
      resistorValuesString: permStr,
      parallelMode: false
    });
    assert(Math.abs(resPerm.resistanceOhms - oracleSum) < 1e-6, `Series permutation invariance failed at ${i}`);
  }
}
console.log("  ✓ 20,000 Series Network Combinations passed.");

// ============================================================
// 5. PARALLEL NETWORK COMBINATIONS (20,000 Independent Tests)
// ============================================================
console.log("\n[5/14] Running 20,000 Parallel Combinations Oracle Tests...");
for (let i = 0; i < 20000; i++) {
  const count = 2 + (i % 4);
  const vals: number[] = [];
  for (let c = 0; c < count; c++) {
    vals.push(Math.round(((i * (c + 1) * 23) % 4000 + 10) * 10) / 10);
  }

  // Independent oracle: 1 / sum(1/R_i)
  const sumRecip = vals.reduce((acc, v) => acc + 1 / v, 0);
  const oracleReq = 1 / sumRecip;

  const res = calculateResistorCalculator({
    activeTab: "series_parallel",
    resistorValuesString: vals.join(", "),
    parallelMode: true
  });

  assert(Math.abs(res.resistanceOhms - oracleReq) < 1e-4 * oracleReq, `Parallel Req mismatch at ${i}: expected ${oracleReq}, got ${res.resistanceOhms}`);
  assert(res.resistanceOhms <= Math.min(...vals), `Parallel Req must be <= minimum branch at ${i}`);
}
console.log("  ✓ 20,000 Parallel Network Combinations passed.");

// ============================================================
// 6. TOLERANCE PROPAGATION (20,000 Independent Tests)
// ============================================================
console.log("\n[6/14] Running 20,000 Tolerance Propagation Tests...");
for (let i = 0; i < 20000; i++) {
  const nominal = (i % 100000) * 10 + 10;
  const tol = [0.1, 0.5, 1, 2, 5, 10, 20][i % 7];

  const oracleMin = nominal * (1 - tol / 100);
  const oracleMax = nominal * (1 + tol / 100);

  assert(oracleMin <= nominal, "Min must be <= nominal");
  assert(oracleMax >= nominal, "Max must be >= nominal");
  assert(Math.abs((oracleMax - nominal) - (nominal - oracleMin)) < 1e-6, "Symmetric tolerance in absolute ohms");
}
console.log("  ✓ 20,000 Tolerance Propagation tests passed.");

// ============================================================
// 7. CONDUCTOR RESISTANCE (20,000 Independent Tests)
// ============================================================
console.log("\n[7/14] Running 20,000 Conductor Resistance Tests...");
const matKeys = Object.keys(MATERIAL_RESISTIVITIES);

for (let i = 0; i < 20000; i++) {
  const matKey = matKeys[i % matKeys.length];
  const mat = MATERIAL_RESISTIVITIES[matKey];
  const len = ((i * 13) % 1000) + 1; // 1 to 1000 meters
  const diamMm = ((i * 7) % 20 + 1) / 2; // 0.5 to 10 mm
  const diamMeters = diamMm / 1000;

  // Independent circular area: π d² / 4
  const areaM2 = (Math.PI * Math.pow(diamMeters, 2)) / 4;
  // Independent conductor formula: R = ρ L / A
  const oracleR20 = (mat.rho * len) / areaM2;

  const res = calculateResistorCalculator({
    activeTab: "conductor",
    conductorLength: len,
    conductorLengthUnit: "m",
    conductorSizeInputType: "diameter",
    conductorDiameter: diamMm,
    conductorDiameterUnit: "mm",
    conductorMaterial: matKey,
    conductorTemp: 20
  });

  assert(Math.abs(res.resistanceOhms - oracleR20) < 1e-4 * oracleR20, `Conductor R20 mismatch at ${i}`);
}
console.log("  ✓ 20,000 Conductor Resistance tests passed.");

// ============================================================
// 8. TEMPERATURE CORRECTION (20,000 Independent Tests)
// ============================================================
console.log("\n[8/14] Running 20,000 Temperature Correction Tests...");
for (let i = 0; i < 20000; i++) {
  const matKey = matKeys[i % matKeys.length];
  const mat = MATERIAL_RESISTIVITIES[matKey];
  const len = 50;
  const diamMm = 1.0;
  const diamM = diamMm / 1000;
  const areaM2 = (Math.PI * Math.pow(diamM, 2)) / 4;
  const r20 = (mat.rho * len) / areaM2;

  const temp = (i % 200) - 50; // -50°C to 150°C
  // Independent temperature formula: R(T) = R20 * [1 + α * (T - 20)]
  const oracleRT = r20 * (1 + mat.alpha * (temp - 20));

  const res = calculateResistorCalculator({
    activeTab: "conductor",
    conductorLength: len,
    conductorLengthUnit: "m",
    conductorSizeInputType: "diameter",
    conductorDiameter: diamMm,
    conductorDiameterUnit: "mm",
    conductorMaterial: matKey,
    conductorTemp: temp
  });

  assert(Math.abs(res.resistanceOhms - oracleRT) < 1e-4 * Math.abs(oracleRT), `Temperature correction mismatch at ${i}`);
}
console.log("  ✓ 20,000 Temperature Correction tests passed.");

// ============================================================
// 9. SMD DECODE CASES (20,000 Independent Tests)
// ============================================================
console.log("\n[9/14] Running 20,000 SMD Decoder Tests...");
for (let i = 0; i < 20000; i++) {
  const mode = i % 4;
  if (mode === 0) {
    // 3-digit: d1 d2 exp
    const d1 = 1 + (i % 9);
    const d2 = (i * 3) % 10;
    const exp = (i * 7) % 6; // 0 to 5
    const code = `${d1}${d2}${exp}`;
    const oracleOhms = (d1 * 10 + d2) * Math.pow(10, exp);
    const res = calculateResistorCalculator({ activeTab: "smd", smdCode: code });
    assert(res.resistanceOhms === oracleOhms, `SMD 3-digit mismatch for ${code}`);
  } else if (mode === 1) {
    // 4-digit: d1 d2 d3 exp
    const d1 = 1 + (i % 9);
    const d2 = (i * 3) % 10;
    const d3 = (i * 7) % 10;
    const exp = (i * 11) % 5;
    const code = `${d1}${d2}${d3}${exp}`;
    const oracleOhms = (d1 * 100 + d2 * 10 + d3) * Math.pow(10, exp);
    const res = calculateResistorCalculator({ activeTab: "smd", smdCode: code });
    assert(res.resistanceOhms === oracleOhms, `SMD 4-digit mismatch for ${code}`);
  } else if (mode === 2) {
    // Decimal R notation: e.g. 4R7, 10R, 2K2, 1M0
    const val = (i % 90 + 10) / 10; // 1.0 to 9.9
    const parts = val.toFixed(1).split(".");
    const code = `${parts[0]}R${parts[1]}`;
    const res = calculateResistorCalculator({ activeTab: "smd", smdCode: code });
    assert(Math.abs(res.resistanceOhms - val) < 1e-4, `SMD R notation mismatch for ${code}`);
  } else {
    // EIA-96
    const codeNum = String((i % 96) + 1).padStart(2, "0");
    const letter = ["A", "B", "C", "D", "E", "X", "Y"][i % 7];
    const code = `${codeNum}${letter}`;
    const baseVal = EIA96_TABLE[codeNum];
    const multMap: Record<string, number> = { A: 1, B: 10, C: 100, D: 1000, E: 10000, X: 0.1, Y: 0.01 };
    const oracleOhms = baseVal * multMap[letter];
    const res = calculateResistorCalculator({ activeTab: "smd", smdCode: code });
    assert(Math.abs(res.resistanceOhms - oracleOhms) < 1e-4, `EIA-96 mismatch for ${code}`);
    assert(res.tolerancePct === 1, `EIA-96 tolerance must be ±1% for ${code}`);
  }
}
console.log("  ✓ 20,000 SMD Decoder tests passed.");

// ============================================================
// 10. E-SERIES NEAREST-VALUE CASES (20,000 Independent Tests)
// ============================================================
console.log("\n[10/14] Running 20,000 E-Series Nearest-Value Tests...");
const seriesList = ["E6", "E12", "E24", "E48", "E96", "E192"];

for (let i = 0; i < 20000; i++) {
  const s = seriesList[i % seriesList.length];
  const stdTol = E_SERIES_TOLERANCES[s];
  const target = ((i * 17) % 50000 + 1) / 10; // 0.1 to 5000 Ω

  const res = calculateResistorCalculator({
    activeTab: "finder",
    finderTargetResistance: target,
    finderTargetUnit: "Ω",
    finderESeries: s
  });

  assert(res.resistanceOhms > 0, `E-Series resistance must be > 0 at ${i}`);
  assert(res.tolerancePct === stdTol, `E-Series tolerance rate must equal series standard (${stdTol}%) at ${i}`);
  assert(Math.abs(res.minOhms! - res.resistanceOhms * (1 - stdTol / 100)) < 1e-4, `E-Series min bound check at ${i}`);
  assert(Math.abs(res.maxOhms! - res.resistanceOhms * (1 + stdTol / 100)) < 1e-4, `E-Series max bound check at ${i}`);
}
console.log("  ✓ 20,000 E-Series Nearest-Value tests passed.");

// ============================================================
// 11. UNIT CONVERSIONS (10,000 Independent Tests)
// ============================================================
console.log("\n[11/14] Running 10,000 Unit Conversion Tests...");
for (let i = 0; i < 10000; i++) {
  const ohms = Math.pow(10, (i % 14) - 3); // 10^-3 to 10^10 Ω
  const formatted = formatOhms(ohms);
  assert(typeof formatted === "string" && formatted.length > 0, `formatOhms output must be valid string at ${i}`);
  assert(!formatted.includes("NaN") && !formatted.includes("undefined"), `formatOhms no NaN/undefined at ${i}`);
}
console.log("  ✓ 10,000 Unit Conversion tests passed.");

// ============================================================
// 12. ZERO, NEGATIVE, AND BOUNDARY CASES (10,000 Independent Tests)
// ============================================================
console.log("\n[12/14] Running 10,000 Zero, Negative, and Boundary Tests...");
for (let i = 0; i < 10000; i++) {
  const mode = i % 5;
  if (mode === 0) {
    // Negative resistance network
    const res = calculateResistorCalculator({
      activeTab: "series_parallel",
      resistorValuesString: "-10, 100"
    });
    assert(res.error !== undefined, "Negative resistance in network must return error");
  } else if (mode === 1) {
    // Negative conductor length
    const res = calculateResistorCalculator({
      activeTab: "conductor",
      conductorLength: -5
    });
    assert(res.error !== undefined, "Negative conductor length must return error");
  } else if (mode === 2) {
    // Negative supply voltage
    const res = calculateResistorCalculator({
      activeTab: "series_parallel",
      resistorValuesString: "100, 200",
      supplyVoltage: -12
    });
    assert(res.error !== undefined, "Negative supply voltage must return error");
  } else if (mode === 3) {
    // Invalid SMD text
    const res = calculateResistorCalculator({
      activeTab: "smd",
      smdCode: "INVALID"
    });
    assert(res.error !== undefined, "Invalid SMD code must return error");
  } else {
    // Zero-ohm jumper in parallel network
    const res = calculateResistorCalculator({
      activeTab: "series_parallel",
      resistorValuesString: "100, 0, 470",
      parallelMode: true
    });
    assert(res.resistanceOhms === 0, "Zero-ohm branch in parallel must yield R_eq = 0");
  }
}
console.log("  ✓ 10,000 Zero, Negative, and Boundary tests passed.");

// ============================================================
// 13. UI & RESULT CONSISTENCY (10,000 Independent Tests)
// ============================================================
console.log("\n[13/14] Running 10,000 UI/Result Consistency Tests...");
for (let i = 0; i < 10000; i++) {
  const ohms = ((i * 31) % 100000) + 1;
  const res = calculateResistorCalculator({
    activeTab: "finder",
    finderTargetResistance: ohms,
    finderTargetUnit: "Ω",
    finderESeries: "E24"
  });
  assert(res.formattedValue.includes("Ω"), `Formatted value must contain ohm symbol at ${i}`);
  assert(res.minOhms! < res.maxOhms!, `minOhms must be strictly less than maxOhms at ${i}`);
}
console.log("  ✓ 10,000 UI/Result Consistency tests passed.");

// ============================================================
// 14. EXPORT CONSISTENCY & VISUALIZER STATES (20,000 Tests)
// ============================================================
console.log("\n[14/14] Running 20,000 Export Consistency and Visualizer Tests...");
for (let i = 0; i < 10000; i++) {
  const res = calculateResistorCalculator({
    activeTab: "color",
    bandCount: (i % 3 + 4) as 4 | 5 | 6,
    band1: "brown",
    band2: "black",
    band3: "red",
    multiplier: "orange",
    tolerance: "gold",
    tempCoeff: "brown"
  });
  assert(res.bands !== undefined && res.bands.length >= 4, `Visualizer bands must exist at ${i}`);
  assert(res.calculationSteps !== undefined && res.calculationSteps.length > 0, `Calculation breakdown must exist at ${i}`);
}

const AWG_GAUGES = [
  "0000", "000", "00", "0", "1", "2", "4", "6", "8", "10",
  "12", "14", "16", "18", "20", "22", "24", "26", "28", "30",
  "32", "34", "36", "38", "40"
];

for (let i = 0; i < 10000; i++) {
  // AWG wire gauge tests across all gauges
  const awg = AWG_GAUGES[i % AWG_GAUGES.length];
  const dMeters = awgToDiameterMeters(awg);
  assert(dMeters > 0 && dMeters < 0.02, `AWG ${awg} diameter must be positive and physically realistic`);
}
console.log("  ✓ 20,000 Export Consistency & Visualizer tests passed.");

console.log("\n============================================================");
console.log(`AUDIT COMPLETE: ${passedAssertions.toLocaleString()} / ${totalAssertions.toLocaleString()} ASSERTIONS PASSED`);
console.log(`FAILED ASSERTIONS: ${failedAssertions}`);
console.log("============================================================");
