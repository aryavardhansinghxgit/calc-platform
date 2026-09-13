import {
  solveMolarityMass,
  solveStockDilution,
  solveMassPercent,
  solvePPMToMolarity,
  calculateMolarityCalculator,
} from "../src/app/calculators/molarity-calculator/calculator";
import { molarity_calculatorConfig } from "../src/app/calculators/molarity-calculator/config";
import http from "http";

console.log("=================================================");
console.log("MOLARITY CALCULATOR REMEDIATION VERIFICATION SUITE");
console.log("=================================================");

let allPassed = true;
function assert(desc: string, condition: boolean, details?: string) {
  if (condition) {
    console.log(`[PASS] ${desc}`);
  } else {
    console.error(`[FAIL] ${desc} ${details ? "- " + details : ""}`);
    allPassed = false;
  }
}

// -------------------------------------------------------------
// TEST FIX #1 & FIX #6: DILUTION SOLVE TARGETS & PHYSICAL BOUNDARIES
// -------------------------------------------------------------
console.log("\n--- TESTING FIX #1 & FIX #6: DILUTION LOGIC & BOUNDARIES ---");

// Test 1.A: Solve V1: C1=10M, C2=1M, V2=100mL => V1 = 10 mL
const dilA = solveStockDilution(10, 0, 1, 100, "v1");
assert("Dilution Solve V1 calculates 10 mL", Math.abs(dilA.v1 - 10) < 1e-4);
assert("Dilution Solve V1 valid status", !dilA.isInvalidDilution);
assert("Dilution Solve V1 solvent needed is 90 mL", Math.abs(dilA.solventVolumeNeeded - 90) < 1e-4);

// Test 1.B: Solve C2: C1=5M, V1=20mL, V2=200mL => C2 = 0.5 M
const dilB = solveStockDilution(5, 20, 0, 200, "c2");
assert("Dilution Solve C2 calculates 0.5000 M", Math.abs(dilB.c2 - 0.5) < 1e-4);
assert("Dilution Solve C2 valid status", !dilB.isInvalidDilution);

// Test 1.C: Solve V2: C1=5M, V1=20mL, C2=0.5M => V2 = 200 mL
const dilC = solveStockDilution(5, 20, 0.5, 0, "v2");
assert("Dilution Solve V2 calculates 200 mL", Math.abs(dilC.v2 - 200) < 1e-4);
assert("Dilution Solve V2 valid status", !dilC.isInvalidDilution);

// Test 1.D: Solve C1: V1=20mL, C2=0.5M, V2=200mL => C1 = 5 M
const dilD = solveStockDilution(0, 20, 0.5, 200, "c1");
assert("Dilution Solve C1 calculates 5.0000 M", Math.abs(dilD.c1 - 5) < 1e-4);
assert("Dilution Solve C1 valid status", !dilD.isInvalidDilution);

// Test 6.A: C2 == C1 (Equal concentration, no solvent)
const dilEqual = solveStockDilution(2, 50, 2, 50, "v1");
assert("Equal C1 and C2 is valid", !dilEqual.isInvalidDilution);
assert("Equal C1 and C2 solvent needed is 0", dilEqual.solventVolumeNeeded === 0);

// Test 6.B: C2 > C1 (Impossible dilution)
const dilImpossible = solveStockDilution(1, 0, 10, 100, "v1");
assert("C2 > C1 flagged as isInvalidDilution", dilImpossible.isInvalidDilution === true);
assert("C2 > C1 includes warning message", (dilImpossible.validationWarning || "").includes("Target concentration (C₂) cannot be greater than stock concentration (C₁)"));

// Test 6.C: Synthesizer protocol for impossible dilution
const synthImpossible = calculateMolarityCalculator({
  mode: "dilution",
  c1: 1,
  c2: 10,
  v2: 100,
  solveTarget: "v1",
});
assert("Synthesizer marks isInvalid = true", synthImpossible.isInvalid === true);
assert("Protocol starts with DILUTION VALIDATION ADVISORY", synthImpossible.benchProtocol[0] === "DILUTION VALIDATION ADVISORY:");

// -------------------------------------------------------------
// TEST FIX #3: CONFIG RELATED CALCULATORS
// -------------------------------------------------------------
console.log("\n--- TESTING FIX #3: CONFIG RELATED CALCULATORS ---");
const related = molarity_calculatorConfig.relatedCalculators || [];
assert("relatedCalculators does not link to molarity-calculator", !related.includes("molarity-calculator"));
assert("relatedCalculators includes molecular-weight-calculator", related.includes("molecular-weight-calculator"));
assert("relatedCalculators includes density-calculator", related.includes("density-calculator"));
assert("relatedCalculators includes percentage-calculator", related.includes("percentage-calculator"));

// -------------------------------------------------------------
// TEST FIX #5: DENSITY ISOLATION
// -------------------------------------------------------------
console.log("\n--- TESTING FIX #5: DENSITY ISOLATION ---");
const resMode3 = calculateMolarityCalculator({
  mode: "mass_percent",
  massPercent: 37,
  densityGperML: 1.19, // reagent density
  molarMass: 36.46,
  valence: 1,
});
const resMode4 = calculateMolarityCalculator({
  mode: "ppm_converter",
  ppm: 500,
  densityGperML: 1.00, // solvent density
  molarMass: 58.44,
});
assert("Mode 3 uses reagentDensity (1.19 g/mL) -> 12.0762 M", Math.abs((resMode3.massPercentResult?.molarityM || 0) - 12.0762) < 0.05);
assert("Mode 4 uses solventDensity (1.00 g/mL) -> molality approx 0.008556", Math.abs((resMode4.ppmResult?.molalityM || 0) - 0.008556) < 0.0001);

// -------------------------------------------------------------
// TEST 400,000 RANDOMIZED CASES (ORACLE NON-REGRESSION)
// -------------------------------------------------------------
console.log("\n--- TESTING 400,000 RANDOMIZED ORACLE CASES (NON-REGRESSION) ---");
let pass1 = 0, pass2 = 0, pass3 = 0, pass4 = 0;
const N = 100000;

for (let i = 0; i < N; i++) {
  const M = Math.random() * 20 + 0.001;
  const V = Math.random() * 50 + 0.001;
  const MW = Math.random() * 500 + 10;
  const hyd = Math.floor(Math.random() * 8);
  const effMW = MW + hyd * 18.01528;
  const m = M * effMW * V;

  const rM = solveMolarityMass("molarity", m, 0, V, MW, hyd).solvedValue;
  const rV = solveMolarityMass("volume", m, M, 0, MW, hyd).solvedValue;
  const rMass = solveMolarityMass("mass", 0, M, V, MW, hyd).solvedValue;

  if (Math.abs(rM - M) / M < 1e-7 && Math.abs(rV - V) / V < 1e-7 && Math.abs(rMass - m) / m < 1e-7) {
    pass1++;
  }

  // Dilution
  const c1 = Math.random() * 20 + 0.5;
  const c2 = Math.random() * (c1 - 0.01) + 0.001;
  const v1 = Math.random() * 200 + 0.1;
  const v2 = (c1 * v1) / c2;

  const solV1 = solveStockDilution(c1, 0, c2, v2, "v1").v1;
  const solC2 = solveStockDilution(c1, v1, 0, v2, "c2").c2;
  if (Math.abs(solV1 - v1) / v1 < 1e-7 && Math.abs(solC2 - c2) / c2 < 1e-7) {
    pass2++;
  }

  // Mass %
  const P = Math.random() * 95 + 1;
  const rho = Math.random() * 2 + 0.5;
  const expM = (P * rho * 10) / MW;
  const solM = solveMassPercent(P, rho, MW, 1).molarityM;
  if (Math.abs(solM - expM) < 0.0002) {
    pass3++;
  }

  // PPM
  const ppm = Math.random() * 10000 + 1;
  const expPpmM = (ppm / 1000) / MW;
  const solPpmM = solvePPMToMolarity(ppm, MW, 1.0).molarityM;
  if (Math.abs(solPpmM - expPpmM) < 1e-5) {
    pass4++;
  }
}

assert(`Family 1 (Mass 4-way): ${pass1}/${N} passed`, pass1 === N);
assert(`Family 2 (Dilution): ${pass2}/${N} passed`, pass2 === N);
assert(`Family 3 (Mass %): ${pass3}/${N} passed`, pass3 === N);
assert(`Family 4 (PPM): ${pass4}/${N} passed`, pass4 === N);

// -------------------------------------------------------------
// TEST FIX #4: SSR HTML AUDIT (2 RELATED CALCULATOR BLOCKS)
// -------------------------------------------------------------
console.log("\n--- TESTING FIX #4: SSR RELATED CALCULATOR BLOCKS ---");
async function checkSSR() {
  const html = await new Promise<string>((resolve, reject) => {
    http.get("http://localhost:3000/calculators/molarity-calculator", (res) => {
      let data = "";
      res.on("data", (c) => (data += c));
      res.on("end", () => resolve(data));
    }).on("error", reject);
  });

  const relBlocks = (html.match(/RELATED CALCULATORS:/gi) || []).length;
  assert(`Related Calculators blocks count is exactly 2 in SSR`, relBlocks === 2, `Found ${relBlocks}`);

  const linksToSelf = html.includes('href="/calculators/molarity-calculator"') &&
                      html.includes('Molarity Calculator &amp; Dilution Solver') &&
                      html.match(/href="\/calculators\/molarity-calculator"/g)!.length > 1; // 1 is canonical/breadcrumb
  assert("No self-referential link in related calculator blocks", !html.includes('href="/calculators/molarity-calculator" class="group'));

  const hasDensityLink = html.includes('href="/calculators/density-calculator"');
  assert("Contains link to /calculators/density-calculator", hasDensityLink);

  const hasMolWeightLink = html.includes('href="/calculators/molecular-weight-calculator"');
  assert("Contains link to /calculators/molecular-weight-calculator", hasMolWeightLink);

  console.log("\n=================================================");
  if (allPassed) {
    console.log("ALL REMEDIATION TESTS AND REGRESSION CHECKS PASSED!");
  } else {
    console.error("FAILURES DETECTED IN REMEDIATION CHECKS!");
  }
  console.log("=================================================");
}

checkSSR().catch(console.error);
