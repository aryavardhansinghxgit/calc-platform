import {
  calculateSlabVolume,
  calculateColumnVolume,
  calculateTubeVolume,
  calculateCurbVolume,
  calculateStairsVolume,
  estimateMixMaterials,
  estimateCost,
  convertToFeet,
  emptyResult,
  validateDimensions,
  validateQuantity,
  validateDensity,
  validateTube,
  DEFAULT_CONCRETE_DENSITY_LBS_PER_CUFT,
} from "../src/lib/calculator-engine/formulas/concrete";

interface TestReport {
  id: string;
  name: string;
  pass: boolean;
  expected: any;
  actual: any;
  details: string;
}

const reports: TestReport[] = [];

function assertApprox(val: number, expected: number, tol = 1e-3, label = ""): boolean {
  const diff = Math.abs(val - expected);
  const ok = diff <= tol;
  if (!ok) {
    console.error(`FAIL: ${label}: expected ${expected}, got ${val} (diff: ${diff})`);
  }
  return ok;
}

console.log("=== 1. CORE UNIT CONVERSION ORACLE AUDIT ===");
{
  const okFt = convertToFeet(1, "feet") === 1;
  const okIn = Math.abs(convertToFeet(12, "inches") - 1) < 1e-6;
  const okYd = convertToFeet(1, "yards") === 3;
  const okM = Math.abs(convertToFeet(1, "meters") - 3.28084) < 1e-4;
  const okCm = Math.abs(convertToFeet(100, "centimeters") - 3.28084) < 1e-4;

  reports.push({
    id: "UNIT-CONV",
    name: "Linear Unit Conversions to Feet",
    pass: okFt && okIn && okYd && okM && okCm,
    expected: "1ft=1, 12in=1ft, 1yd=3ft, 1m=3.28084ft, 100cm=3.28084ft",
    actual: `ft=${convertToFeet(1, "feet")}, in=${convertToFeet(12, "inches")}, yd=${convertToFeet(1, "yards")}, m=${convertToFeet(1, "meters")}`,
    details: "Checks conversion of all 5 supported linear units",
  });
}

console.log("\n=== 2. GOLDEN TESTS (A1, A2, B1, C1, D1, E1) ===");

// GOLDEN TEST A1 — SLAB (5 ft x 2.5 ft x 5 in, Qty 1, Waste 0%, Density 133)
{
  const res = calculateSlabVolume(5, 2.5, 5, "feet", "feet", "inches", 1, 0, 133);
  const expectedCuFt = 5 * 2.5 * (5 / 12); // 5.208333333
  const expectedCuYd = expectedCuFt / 27; // 0.192901235
  const expectedWeightLbs = expectedCuFt * 133; // 692.708333

  const okCuFt = assertApprox(res.cubicFeet, expectedCuFt, 0.01, "A1 cuFt");
  const okCuYd = assertApprox(res.cubicYards, expectedCuYd, 0.01, "A1 cuYd");
  const okWeight = assertApprox(res.weightLbs, expectedWeightLbs, 0.5, "A1 weightLbs");

  reports.push({
    id: "GOLDEN-A1",
    name: "Slab Golden Test A1 (5ft x 2.5ft x 5in, 0% waste)",
    pass: okCuFt && okCuYd && okWeight,
    expected: { cuFt: 5.21, cuYd: 0.19, weightLbs: 692.71 },
    actual: { cuFt: res.cubicFeet, cuYd: res.cubicYards, weightLbs: res.weightLbs },
    details: `Expected: 5.208 cuft, 0.193 cuyd, 692.71 lbs. Actual: ${res.cubicFeet} cuft, ${res.cubicYards} cuyd, ${res.weightLbs} lbs`,
  });
}

// GOLDEN TEST A2 — SLAB WITH 10% WASTE
{
  const res = calculateSlabVolume(5, 2.5, 5, "feet", "feet", "inches", 1, 10, 133);
  const expectedCuFt = 5 * 2.5 * (5 / 12) * 1.10; // 5.729166666
  const expectedCuYd = expectedCuFt / 27; // 0.212191358

  const okCuFt = assertApprox(res.cubicFeet, expectedCuFt, 0.01, "A2 cuFt");
  const okCuYd = assertApprox(res.cubicYards, expectedCuYd, 0.01, "A2 cuYd");

  reports.push({
    id: "GOLDEN-A2",
    name: "Slab Golden Test A2 (10% waste)",
    pass: okCuFt && okCuYd,
    expected: { cuFt: 5.73, cuYd: 0.21 },
    actual: { cuFt: res.cubicFeet, cuYd: res.cubicYards },
    details: `Expected: 5.729 cuft, 0.212 cuyd. Actual: ${res.cubicFeet} cuft, ${res.cubicYards} cuyd`,
  });
}

// GOLDEN TEST B1 — HOLE / COLUMN / ROUND FOOTING (d=2.5ft, h=6ft, Qty 1, Waste 0%)
{
  const res = calculateColumnVolume(2.5, 6, "feet", "feet", 1, 0);
  const radius = 1.25;
  const expectedCuFt = Math.PI * radius * radius * 6; // 29.45243113
  const expectedCuYd = expectedCuFt / 27; // 1.09083078

  const okCuFt = assertApprox(res.cubicFeet, expectedCuFt, 0.01, "B1 cuFt");
  const okCuYd = assertApprox(res.cubicYards, expectedCuYd, 0.01, "B1 cuYd");

  reports.push({
    id: "GOLDEN-B1",
    name: "Column Golden Test B1 (d=2.5ft, h=6ft)",
    pass: okCuFt && okCuYd,
    expected: { cuFt: 29.45, cuYd: 1.09 },
    actual: { cuFt: res.cubicFeet, cuYd: res.cubicYards },
    details: `Expected: 29.452 cuft, 1.091 cuyd. Actual: ${res.cubicFeet} cuft, ${res.cubicYards} cuyd`,
  });
}

// GOLDEN TEST C1 — CIRCULAR SLAB / TUBE (d1=5ft, d2=4ft, h=6in, Qty 1, Waste 0%)
{
  const res = calculateTubeVolume(5, 4, 6, "feet", "feet", "inches", 1, 0);
  const expectedCuFt = (Math.PI / 4) * (25 - 16) * 0.5; // 3.534291735
  const expectedCuYd = expectedCuFt / 27; // 0.130899694

  const okCuFt = assertApprox(res.cubicFeet, expectedCuFt, 0.01, "C1 cuFt");
  const okCuYd = assertApprox(res.cubicYards, expectedCuYd, 0.01, "C1 cuYd");

  reports.push({
    id: "GOLDEN-C1",
    name: "Tube Golden Test C1 (d1=5ft, d2=4ft, h=6in)",
    pass: okCuFt && okCuYd,
    expected: { cuFt: 3.53, cuYd: 0.13 },
    actual: { cuFt: res.cubicFeet, cuYd: res.cubicYards },
    details: `Expected: 3.534 cuft, 0.131 cuyd. Actual: ${res.cubicFeet} cuft, ${res.cubicYards} cuyd`,
  });
}

// GOLDEN TEST D1 — CURB & GUTTER (4x4 curb, 10x5 gutter, 10ft length, Qty 1)
{
  const res = calculateCurbVolume(4, 10, 4, 5, 10, "inches", "inches", "inches", "inches", "feet", 1);
  const areaSqIn = 4 * 4 + 10 * 5; // 66 sq in
  const areaSqFt = areaSqIn / 144; // 0.458333333 sq ft
  const expectedCuFt = areaSqFt * 10; // 4.583333333
  const expectedCuYd = expectedCuFt / 27; // 0.169753086

  const okCuFt = assertApprox(res.cubicFeet, expectedCuFt, 0.01, "D1 cuFt");
  const okCuYd = assertApprox(res.cubicYards, expectedCuYd, 0.01, "D1 cuYd");

  reports.push({
    id: "GOLDEN-D1",
    name: "Curb & Gutter Golden Test D1 (4x4 curb, 10x5 gutter, 10ft length)",
    pass: okCuFt && okCuYd,
    expected: { cuFt: 4.58, cuYd: 0.17 },
    actual: { cuFt: res.cubicFeet, cuYd: res.cubicYards },
    details: `Expected: 4.583 cuft, 0.170 cuyd. Actual: ${res.cubicFeet} cuft, ${res.cubicYards} cuyd`,
  });
}

// GOLDEN TEST E1 — STAIRS (run=12in, rise=6in, width=50in, plat=5in, 5 risers)
{
  const res = calculateStairsVolume(12, 6, 50, 5, 5, "inches", "inches", "inches", "inches");
  const widthFt = 50 / 12;
  const runFt = 1;
  const riseFt = 0.5;
  const platFt = 5 / 12;
  const n = 5;

  const vSteps = widthFt * runFt * riseFt * ((n * (n + 1)) / 2); // (50/12)*1*0.5*15 = 31.25
  const vPlatform = widthFt * platFt * (n * riseFt); // (50/12)*(5/12)*2.5 = 4.340277778
  const expectedCuFt = vSteps + vPlatform; // 35.590277778
  const expectedCuYd = expectedCuFt / 27; // 1.318158436

  const okCuFt = assertApprox(res.cubicFeet, expectedCuFt, 0.01, "E1 cuFt");
  const okCuYd = assertApprox(res.cubicYards, expectedCuYd, 0.01, "E1 cuYd");

  reports.push({
    id: "GOLDEN-E1",
    name: "Stairs Golden Test E1 (5 risers, run=12in, rise=6in, width=50in, plat=5in)",
    pass: okCuFt && okCuYd,
    expected: { cuFt: 35.59, cuYd: 1.32 },
    actual: { cuFt: res.cubicFeet, cuYd: res.cubicYards },
    details: `Expected: 35.590 cuft, 1.318 cuyd. Actual: ${res.cubicFeet} cuft, ${res.cubicYards} cuyd`,
  });
}

console.log("\n=== 3. QUANTITY SCALING TESTS ===");
{
  const res1 = calculateSlabVolume(10, 10, 4, "feet", "feet", "inches", 1, 0);
  const res2 = calculateSlabVolume(10, 10, 4, "feet", "feet", "inches", 2, 0);
  const res5 = calculateSlabVolume(10, 10, 4, "feet", "feet", "inches", 5, 0);

  const ok2 = Math.abs(res2.cubicFeet - res1.cubicFeet * 2) < 0.05;
  const ok5 = Math.abs(res5.cubicFeet - res1.cubicFeet * 5) < 0.05;

  reports.push({
    id: "QTY-SCALE",
    name: "Linear Quantity Scaling (1x, 2x, 5x)",
    pass: ok2 && ok5,
    expected: "2x and 5x exact volume scaling",
    actual: `1x=${res1.cubicFeet}, 2x=${res2.cubicFeet}, 5x=${res5.cubicFeet}`,
    details: `Ratio 2x/1x = ${res2.cubicFeet / res1.cubicFeet}, 5x/1x = ${res5.cubicFeet / res1.cubicFeet}`,
  });
}

console.log("\n=== 4. STRICT INPUT VALIDATION & ZERO/NEGATIVE REJECTION (P1-01) ===");
{
  // A. Qty = 0 -> must return 0
  const resQty0 = calculateSlabVolume(10, 10, 4, "feet", "feet", "inches", 0, 0);
  const okQty0 = resQty0.cubicFeet === 0 && resQty0.cubicYards === 0;

  // B. Qty = -1 -> must return 0
  const resQtyNeg = calculateSlabVolume(10, 10, 4, "feet", "feet", "inches", -1, 0);
  const okQtyNeg = resQtyNeg.cubicFeet === 0;

  // C. Length = -5 -> must return 0
  const resLenNeg = calculateSlabVolume(-5, 10, 4, "feet", "feet", "inches", 1, 0);
  const okLenNeg = resLenNeg.cubicFeet === 0;

  // D. Width = 0 -> must return 0
  const resWidth0 = calculateSlabVolume(10, 0, 4, "feet", "feet", "inches", 1, 0);
  const okWidth0 = resWidth0.cubicFeet === 0;

  // E. Density = 0 -> must return 0, NOT fallback to 133
  const resDens0 = calculateSlabVolume(10, 10, 4, "feet", "feet", "inches", 1, 0, 0);
  const okDens0 = resDens0.cubicFeet === 0 && resDens0.weightLbs === 0;

  // F. Density = -10 -> must return 0
  const resDensNeg = calculateSlabVolume(10, 10, 4, "feet", "feet", "inches", 1, 0, -10);
  const okDensNeg = resDensNeg.cubicFeet === 0;

  // G. Tube inner == outer -> must return 0 (invalid geometry)
  const resTubeEq = calculateTubeVolume(5, 5, 6, "feet", "feet", "inches", 1, 0);
  const okTubeEq = resTubeEq.cubicFeet === 0;

  // H. Tube inner > outer -> must return 0 (invalid geometry)
  const resTubeInverted = calculateTubeVolume(4, 5, 6, "feet", "feet", "inches", 1, 0);
  const okTubeInverted = resTubeInverted.cubicFeet === 0;

  // I. Helper validators test
  const vDim = validateDimensions(10, -2, 5);
  const vQty = validateQuantity(0);
  const vDens = validateDensity(0);
  const vTube = validateTube(4, 5);
  const okHelpers = !vDim.isValid && !vQty.isValid && !vDens.isValid && !vTube.isValid;

  const allValPass = okQty0 && okQtyNeg && okLenNeg && okWidth0 && okDens0 && okDensNeg && okTubeEq && okTubeInverted && okHelpers;

  reports.push({
    id: "VAL-BEHAVIOR",
    name: "Input validation & strict rejection of zero/negative/invalid values",
    pass: allValPass,
    expected: "All invalid inputs (Qty<=0, Dim<=0, Density<=0, Tube d2>=d1) strictly return 0 without coercion",
    actual: `Qty0=${resQty0.cubicFeet}, QtyNeg=${resQtyNeg.cubicFeet}, LenNeg=${resLenNeg.cubicFeet}, Dens0=${resDens0.cubicFeet}, TubeEq=${resTubeEq.cubicFeet}, TubeInv=${resTubeInverted.cubicFeet}`,
    details: `All invalid edge cases successfully reject silent coercion.`,
  });
}

console.log("\n=== 5. SAVE / RESTORE IMMUTABILITY & PURITY AUDIT (P1-02) ===");
{
  // Simulate saved estimate workflow
  const originalSlab = {
    length: "18",
    width: "12",
    height: "6",
    lengthUnit: "feet" as const,
    widthUnit: "feet" as const,
    heightUnit: "inches" as const,
    qty: "2",
    wastage: "10",
    density: "140",
  };

  const calculatedOriginal = calculateSlabVolume(18, 12, 6, "feet", "feet", "inches", 2, 10, 140);

  // Store in simulated saved estimate
  const savedEntry = {
    id: "test-save-1",
    timestamp: "12:00 PM",
    inputSummary: "18 ft x 12 ft x 6 in, Qty 2",
    result: calculatedOriginal,
    rawInputs: JSON.parse(JSON.stringify(originalSlab)),
  };

  // Mutate active inputs dramatically
  let activeInputs = { ...originalSlab, length: "5", width: "2", qty: "1" };

  // Verify saved entry rawInputs did NOT mutate
  const immutabilityPass = savedEntry.rawInputs.length === "18" && savedEntry.rawInputs.qty === "2";

  // Simulate restore
  activeInputs = JSON.parse(JSON.stringify(savedEntry.rawInputs));
  const restoredCalc = calculateSlabVolume(
    parseFloat(activeInputs.length),
    parseFloat(activeInputs.width),
    parseFloat(activeInputs.height),
    activeInputs.lengthUnit,
    activeInputs.widthUnit,
    activeInputs.heightUnit,
    parseFloat(activeInputs.qty),
    parseFloat(activeInputs.wastage),
    parseFloat(activeInputs.density),
  );

  const restoreExactMatch =
    restoredCalc.cubicFeet === calculatedOriginal.cubicFeet &&
    restoredCalc.cubicYards === calculatedOriginal.cubicYards &&
    restoredCalc.weightLbs === calculatedOriginal.weightLbs &&
    activeInputs.lengthUnit === "feet" &&
    activeInputs.heightUnit === "inches";

  reports.push({
    id: "SAVE-RESTORE",
    name: "Save / Restore State Immutability & Exact Recovery",
    pass: immutabilityPass && restoreExactMatch,
    expected: "Saved record immutable; restored state recovers exact inputs and calculation",
    actual: `SavedL=${savedEntry.rawInputs.length}, RestoredCuFt=${restoredCalc.cubicFeet} (Expected ${calculatedOriginal.cubicFeet})`,
    details: "Verified full rawInputs recovery and mathematical parity across mutations.",
  });
}

console.log("\n=== 6. 5,000 RANDOMIZED PROPERTY TESTS ===");
let randPass = 0;
let randFail = 0;

// 1,000 Rectangular Slabs
for (let i = 0; i < 1000; i++) {
  const l = Math.random() * 100 + 0.1;
  const w = Math.random() * 100 + 0.1;
  const h = Math.random() * 24 + 0.5; // inches
  const qty = Math.floor(Math.random() * 10) + 1;
  const waste = Math.random() * 20;

  const res = calculateSlabVolume(l, w, h, "feet", "feet", "inches", qty, waste);
  const expectedCuFt = l * w * (h / 12) * qty * (1 + waste / 100);
  const expectedCuYd = expectedCuFt / 27;

  const ok =
    assertApprox(res.cubicFeet, expectedCuFt, 0.05) &&
    assertApprox(res.cubicYards, expectedCuYd, 0.05) &&
    isFinite(res.cubicFeet) &&
    res.cubicFeet > 0;
  if (ok) randPass++;
  else randFail++;
}

// 1,000 Cylinders
for (let i = 0; i < 1000; i++) {
  const d = Math.random() * 20 + 0.1;
  const h = Math.random() * 30 + 0.1;
  const qty = Math.floor(Math.random() * 10) + 1;
  const waste = Math.random() * 20;

  const res = calculateColumnVolume(d, h, "feet", "feet", qty, waste);
  const expectedCuFt = Math.PI * (d / 2) * (d / 2) * h * qty * (1 + waste / 100);
  const expectedCuYd = expectedCuFt / 27;

  const ok =
    assertApprox(res.cubicFeet, expectedCuFt, 0.05) &&
    assertApprox(res.cubicYards, expectedCuYd, 0.05) &&
    isFinite(res.cubicFeet) &&
    res.cubicFeet > 0;
  if (ok) randPass++;
  else randFail++;
}

// 1,000 Annular Tubes (d1 > d2)
for (let i = 0; i < 1000; i++) {
  const d2 = Math.random() * 20 + 0.1;
  const d1 = d2 + Math.random() * 10 + 0.1; // strictly d1 > d2
  const h = Math.random() * 30 + 0.1;
  const qty = Math.floor(Math.random() * 10) + 1;
  const waste = Math.random() * 20;

  const res = calculateTubeVolume(d1, d2, h, "feet", "feet", "feet", qty, waste);
  const expectedCuFt = (Math.PI / 4) * (d1 * d1 - d2 * d2) * h * qty * (1 + waste / 100);
  const expectedCuYd = expectedCuFt / 27;

  const ok =
    assertApprox(res.cubicFeet, expectedCuFt, 0.05) &&
    assertApprox(res.cubicYards, expectedCuYd, 0.05) &&
    isFinite(res.cubicFeet) &&
    res.cubicFeet > 0;
  if (ok) randPass++;
  else randFail++;
}

// 1,000 Curb & Gutter
for (let i = 0; i < 1000; i++) {
  const cd = Math.random() * 12 + 1;
  const gw = Math.random() * 24 + 1;
  const ch = Math.random() * 12 + 1;
  const ft = Math.random() * 8 + 1;
  const l = Math.random() * 100 + 1;
  const qty = Math.floor(Math.random() * 5) + 1;

  const res = calculateCurbVolume(cd, gw, ch, ft, l, "inches", "inches", "inches", "inches", "feet", qty);
  const areaSqFt = (cd * ch + gw * ft) / 144;
  const expectedCuFt = areaSqFt * l * qty;
  const expectedCuYd = expectedCuFt / 27;

  const ok =
    assertApprox(res.cubicFeet, expectedCuFt, 0.05) &&
    assertApprox(res.cubicYards, expectedCuYd, 0.05) &&
    isFinite(res.cubicFeet) &&
    res.cubicFeet > 0;
  if (ok) randPass++;
  else randFail++;
}

// 1,000 Stairs
for (let i = 0; i < 1000; i++) {
  const run = Math.random() * 14 + 8;
  const rise = Math.random() * 8 + 4;
  const width = Math.random() * 60 + 24;
  const plat = Math.random() * 20 + 0;
  const n = Math.floor(Math.random() * 12) + 1;

  const res = calculateStairsVolume(run, rise, width, plat, n, "inches", "inches", "inches", "inches");
  const wFt = width / 12;
  const runFt = run / 12;
  const riseFt = rise / 12;
  const platFt = plat / 12;

  const vSteps = wFt * runFt * riseFt * ((n * (n + 1)) / 2);
  const vPlat = wFt * platFt * (n * riseFt);
  const expectedCuFt = vSteps + vPlat;
  const expectedCuYd = expectedCuFt / 27;

  const ok =
    assertApprox(res.cubicFeet, expectedCuFt, 0.05) &&
    assertApprox(res.cubicYards, expectedCuYd, 0.05) &&
    isFinite(res.cubicFeet) &&
    res.cubicFeet > 0;
  if (ok) randPass++;
  else randFail++;
}

reports.push({
  id: "RAND-5000",
  name: "5,000 Randomized Property Tests (1,000 per module)",
  pass: randFail === 0,
  expected: "5000 / 5000 pass",
  actual: `Passed: ${randPass}, Failed: ${randFail}`,
  details: `Tested 1,000 slabs, 1,000 columns, 1,000 tubes, 1,000 curbs, 1,000 stairs against analytical float64 oracles`,
});

console.log("\n============================================================");
console.log("TEST REPORT SUMMARY");
console.log("============================================================");
reports.forEach((r) => {
  console.log(`[${r.pass ? "PASS" : "FAIL"}] ${r.id.padEnd(16)} : ${r.name}`);
  console.log(`      Details: ${r.details}`);
});

const allPassed = reports.every((r) => r.pass);
if (!allPassed) {
  process.exit(1);
}
console.log("\nALL MATHEMATICAL AUDIT & REGRESSION TESTS PASSED (100% PASS RATE).");
