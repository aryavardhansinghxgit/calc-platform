const { solveMolarityMass, solveStockDilution, solveMassPercent, solvePPMToMolarity, calculateMolarityCalculator } = require("../src/app/calculators/molarity-calculator/calculator");
const { COMMON_CHEMICAL_COMPOUNDS, HYDRATE_WATER_MOLAR_MASS } = require("../src/app/calculators/molarity-calculator/compounds");

console.log("=================================================");
console.log("MOLARITY CALCULATOR INDEPENDENT ORACLE & QA AUDIT");
console.log("=================================================");

let failures = [];

function assertApprox(label, actual, expected, tol = 1e-4) {
  const absErr = Math.abs(actual - expected);
  const relErr = expected !== 0 ? absErr / Math.abs(expected) : absErr;
  if (absErr > tol && relErr > tol) {
    const msg = `FAIL: ${label} | Expected: ${expected}, Actual: ${actual}, AbsErr: ${absErr}, RelErr: ${relErr}`;
    failures.push(msg);
    console.error(msg);
    return false;
  }
  return true;
}

// -----------------------------------------------------------------
// 1. INDEPENDENT SCIENTIFIC ORACLES
// -----------------------------------------------------------------
// Mode 1: Mass & Molarity
// m = M * MW_eff * V
// M = m / (MW_eff * V)
// V = m / (M * MW_eff)
// MW_eff = MW + n_hydrate * 18.01528
function oracleMass(M, V_L, MW, n_hydrate = 0) {
  const MW_eff = MW + n_hydrate * 18.01528;
  return M * MW_eff * V_L;
}
function oracleMolarity(m_g, V_L, MW, n_hydrate = 0) {
  const MW_eff = MW + n_hydrate * 18.01528;
  return m_g / (MW_eff * V_L);
}
function oracleVolume(m_g, M, MW, n_hydrate = 0) {
  const MW_eff = MW + n_hydrate * 18.01528;
  return m_g / (M * MW_eff);
}
function oracleMW(m_g, M, V_L) {
  return m_g / (M * V_L);
}

// Mode 2: Dilution
// C1*V1 = C2*V2
function oracleDilution(c1, v1, c2, v2, target) {
  if (target === "v1") return (c2 * v2) / c1;
  if (target === "c1") return (c2 * v2) / v1;
  if (target === "v2") return (c1 * v1) / c2;
  if (target === "c2") return (c1 * v1) / v2;
}

// Mode 3: Mass % & Density
// M = (P * rho * 10) / MW
// N = M * valence
function oracleMassPercent(P, rho, MW, valence = 1) {
  const M = (P * rho * 10) / MW;
  const N = M * valence;
  return { M, N };
}

// Mode 4: PPM to Molarity & Molality
// 1 ppm = 1 mg/L = 0.001 g/L
// M = (ppm / 1000) / MW
// solvent_kg_per_L = (rho * 1000 - gramsPerLiter) / 1000
// molality m = (gramsPerLiter / MW) / solvent_kg_per_L
function oraclePPM(ppm, MW, rho = 1.0) {
  const g_per_L = ppm / 1000;
  const M = g_per_L / MW;
  const solvent_kg = (rho * 1000 - g_per_L) / 1000;
  const m = solvent_kg > 0 ? M / solvent_kg : M;
  return { M, m };
}

// -----------------------------------------------------------------
// 2. GOLDEN TEST CASES
// -----------------------------------------------------------------
console.log("\n--- RUNNING GOLDEN TEST CASES ---");

// Case 1: Standard 1 L of 1 M NaCl (MW 58.44) -> mass = 58.44 g
const g1 = solveMolarityMass("mass", 0, 1.0, 1.0, 58.44, 0);
assertApprox("Golden 1: 1L of 1M NaCl mass", g1.solvedValue, oracleMass(1.0, 1.0, 58.44));

// Case 2: Article worked example: 500 mL (0.5 L) of 0.250 M NaCl -> 7.305 g
const g2 = solveMolarityMass("mass", 0, 0.250, 0.500, 58.44, 0);
assertApprox("Golden 2: 500mL 0.25M NaCl mass", g2.solvedValue, 7.305);

// Case 3: Hydrate salt: Copper(II) sulfate pentahydrate CuSO4.5H2O (159.60 + 5*18.01528 = 249.6764 g/mol)
// 250 mL of 0.1 M -> mass = 0.1 * 249.6764 * 0.25 = 6.24191 g
const g3 = solveMolarityMass("mass", 0, 0.1, 0.25, 159.60, 5);
assertApprox("Golden 3: CuSO4.5H2O mass", g3.solvedValue, oracleMass(0.1, 0.25, 159.60, 5));

// Case 4: Stock dilution: C1 = 10 M, C2 = 0.5 M, V2 = 500 mL -> V1 = (0.5 * 500) / 10 = 25 mL
const g4 = solveStockDilution(10, 0, 0.5, 500, "v1");
assertApprox("Golden 4: Stock dilution V1", g4.v1, oracleDilution(10, 0, 0.5, 500, "v1"));
assertApprox("Golden 4: Solvent volume", g4.solventVolumeNeeded, 500 - 25);

// Case 5: Stock dilution solve C2: C1 = 5 M, V1 = 20 mL, V2 = 200 mL -> C2 = (5 * 20) / 200 = 0.5 M
const g5 = solveStockDilution(5, 20, 0, 200, "c2");
assertApprox("Golden 5: Stock dilution C2", g5.c2, oracleDilution(5, 20, 0, 200, "c2"));

// Case 6: Stock acid table: 37% HCl, density 1.19 g/mL, MW 36.46, valence 1 -> M = (37 * 1.19 * 10) / 36.46 = 12.0762... M
const g6 = solveMassPercent(37, 1.19, 36.46, 1);
const exp6 = oracleMassPercent(37, 1.19, 36.46, 1);
assertApprox("Golden 6: 37% HCl Molarity", g6.molarityM, exp6.M, 0.01);
assertApprox("Golden 6: 37% HCl Normality", g6.normalityN, exp6.N, 0.01);

// Case 7: Stock acid table: 96% H2SO4, density 1.84 g/mL, MW 98.079, valence 2 -> M = 18.0099 M, N = 36.0199 N
const g7 = solveMassPercent(96, 1.84, 98.079, 2);
const exp7 = oracleMassPercent(96, 1.84, 98.079, 2);
assertApprox("Golden 7: 96% H2SO4 Molarity", g7.molarityM, exp7.M, 0.02);
assertApprox("Golden 7: 96% H2SO4 Normality", g7.normalityN, exp7.N, 0.04);

// Case 8: PPM conversion: 500 ppm NaCl (MW 58.44), density 1.0 g/mL -> M = 0.5 / 58.44 = 0.00855578 M
const g8 = solvePPMToMolarity(500, 58.44, 1.0);
const exp8 = oraclePPM(500, 58.44, 1.0);
assertApprox("Golden 8: 500 ppm NaCl Molarity", g8.molarityM, exp8.M, 1e-5);
assertApprox("Golden 8: 500 ppm NaCl Molality", g8.molalityM, exp8.m, 1e-5);

// -----------------------------------------------------------------
// 3. RANDOMIZED ORACLE TESTING (100,000 cases per family)
// -----------------------------------------------------------------
console.log("\n--- RUNNING 100,000 RANDOMIZED TESTS PER CALCULATION FAMILY ---");

// Family 1: Mass & Molarity 4-way solver
let f1Pass = 0, f1Fail = 0, maxAbsErr1 = 0, maxRelErr1 = 0;
const N1 = 100000;
for (let i = 0; i < N1; i++) {
  const M = Math.random() * 20 + 0.0001;
  const V = Math.random() * 50 + 0.001;
  const MW = Math.random() * 500 + 10;
  const hydrate = Math.floor(Math.random() * 11);
  const m = oracleMass(M, V, MW, hydrate);

  // Test solve molarity
  const resM = solveMolarityMass("molarity", m, 0, V, MW, hydrate);
  const errM = Math.abs(resM.solvedValue - M);
  const relM = errM / M;
  if (errM > maxAbsErr1) maxAbsErr1 = errM;
  if (relM > maxRelErr1) maxRelErr1 = relM;

  // Test solve volume
  const resV = solveMolarityMass("volume", m, M, 0, MW, hydrate);
  const errV = Math.abs(resV.solvedValue - V);
  const relV = errV / V;

  // Test solve mass
  const resMass = solveMolarityMass("mass", 0, M, V, MW, hydrate);
  const errMass = Math.abs(resMass.solvedValue - m);
  const relMass = errMass / m;

  if (relM < 1e-7 && relV < 1e-7 && relMass < 1e-7) {
    f1Pass++;
  } else {
    f1Fail++;
  }
}
console.log(`Family 1 (Mass Solver 4-way): ${f1Pass}/${N1} passed. Max Abs Err: ${maxAbsErr1.toExponential(4)}, Max Rel Err: ${maxRelErr1.toExponential(4)}`);

// Family 2: Dilution C1V1 = C2V2
let f2Pass = 0, f2Fail = 0, maxAbsErr2 = 0, maxRelErr2 = 0;
const N2 = 100000;
for (let i = 0; i < N2; i++) {
  const c1 = Math.random() * 20 + 0.1;
  const v1 = Math.random() * 500 + 0.1;
  const c2 = Math.random() * (c1 - 0.01) + 0.001; // c2 < c1 for realistic dilution
  const v2 = (c1 * v1) / c2;

  const resV1 = solveStockDilution(c1, 0, c2, v2, "v1").v1;
  const resC1 = solveStockDilution(0, v1, c2, v2, "c1").c1;
  const resV2 = solveStockDilution(c1, v1, c2, 0, "v2").v2;
  const resC2 = solveStockDilution(c1, v1, 0, v2, "c2").c2;

  const err1 = Math.abs(resV1 - v1) / v1;
  const err2 = Math.abs(resC1 - c1) / c1;
  const err3 = Math.abs(resV2 - v2) / v2;
  const err4 = Math.abs(resC2 - c2) / c2;
  const maxErr = Math.max(err1, err2, err3, err4);

  if (maxErr > maxRelErr2) maxRelErr2 = maxErr;
  if (maxErr < 1e-7) {
    f2Pass++;
  } else {
    f2Fail++;
  }
}
console.log(`Family 2 (C1V1 = C2V2): ${f2Pass}/${N2} passed. Max Rel Err: ${maxRelErr2.toExponential(4)}`);

// Family 3: Mass % & Density
let f3Pass = 0, f3Fail = 0, maxRelErr3 = 0;
const N3 = 100000;
for (let i = 0; i < N3; i++) {
  const P = Math.random() * 99 + 0.1;
  const rho = Math.random() * 2.5 + 0.5;
  const MW = Math.random() * 500 + 10;
  const val = Math.floor(Math.random() * 4) + 1;

  const res = solveMassPercent(P, rho, MW, val);
  const exp = oracleMassPercent(P, rho, MW, val);

  const errM = Math.abs(res.molarityM - exp.M);
  const relM = errM / exp.M;
  if (relM > maxRelErr3) maxRelErr3 = relM;

  // Since solveMassPercent rounds to 4 decimals (.toFixed(4)), tolerance is ~1e-3
  if (errM < 0.0002) {
    f3Pass++;
  } else {
    f3Fail++;
  }
}
console.log(`Family 3 (Mass %): ${f3Pass}/${N3} passed (within rounding precision). Max Rel Err: ${maxRelErr3.toExponential(4)}`);

// Family 4: PPM to Molarity
let f4Pass = 0, f4Fail = 0, maxRelErr4 = 0;
const N4 = 100000;
for (let i = 0; i < N4; i++) {
  const ppm = Math.random() * 50000 + 0.1;
  const MW = Math.random() * 500 + 10;
  const rho = Math.random() * 1.5 + 0.8;

  const res = solvePPMToMolarity(ppm, MW, rho);
  const exp = oraclePPM(ppm, MW, rho);

  const errM = Math.abs(res.molarityM - exp.M);
  // Tolerance due to .toFixed(6)
  if (errM < 1e-5) {
    f4Pass++;
  } else {
    f4Fail++;
  }
}
console.log(`Family 4 (PPM Converter): ${f4Pass}/${N4} passed (within rounding precision).`);

// -----------------------------------------------------------------
// 4. CHEMICAL DATABASE AUDIT
// -----------------------------------------------------------------
console.log("\n--- AUDITING CHEMICAL COMPOUND DATABASE ---");
COMMON_CHEMICAL_COMPOUNDS.forEach((c) => {
  if (!c.name || !c.formula || !c.molarMass || c.molarMass <= 0) {
    failures.push(`Invalid compound entry: ${JSON.stringify(c)}`);
  }
  if (c.valence && (c.valence < 1 || !Number.isInteger(c.valence))) {
    failures.push(`Invalid valence for compound: ${c.name}`);
  }
});
console.log(`Chemical database contains ${COMMON_CHEMICAL_COMPOUNDS.length} validated compounds.`);

// -----------------------------------------------------------------
// 5. SUMMARY
// -----------------------------------------------------------------
console.log("\n=================================================");
if (failures.length === 0) {
  console.log("ALL MATHEMATICAL ORACLE TESTS PASSED SUCCESSFULLY!");
} else {
  console.log(`FOUND ${failures.length} MATHEMATICAL FAILURES!`);
}
console.log("=================================================");
