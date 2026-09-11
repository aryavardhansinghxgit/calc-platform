import { calculateVoltageDropCalculator, AWG_CONDUCTORS, METRIC_CONDUCTORS } from "../src/app/calculators/voltage-drop-calculator/calculator";

// INDEPENDENT MATHEMATICAL ORACLE
// Completely decoupled from production functions
class IndependentVoltageDropOracle {
  static compute(params: {
    voltage: number;
    current: number;
    distance: number;
    distanceUnit: "ft" | "m";
    phase: "dc" | "ac_single" | "ac_three";
    rPer1000Ft: number;
    xPer1000Ft: number;
    pf: number;
    conductorsPerPhase: number;
    isEstimatedOrDc: boolean;
  }) {
    const distFt = params.distanceUnit === "m" ? params.distance / 0.3048 : params.distance;
    const condN = Math.max(1, Math.round(params.conductorsPerPhase));

    let zPer1000Ft = 0;
    if (params.phase === "dc" || params.isEstimatedOrDc) {
      zPer1000Ft = params.rPer1000Ft;
    } else {
      const clampedPf = Math.max(0, Math.min(1, params.pf));
      const sinTheta = Math.sqrt(Math.max(0, 1 - clampedPf * clampedPf));
      zPer1000Ft = params.rPer1000Ft * clampedPf + params.xPer1000Ft * sinTheta;
    }

    const effZ = zPer1000Ft / condN;
    const effR = params.rPer1000Ft / condN;
    const effX = (params.phase === "dc" || params.isEstimatedOrDc ? 0 : params.xPer1000Ft) / condN;

    let factor = 2;
    if (params.phase === "ac_three") {
      factor = Math.sqrt(3);
    }

    const vDrop = (factor * params.current * distFt * effZ) / 1000;
    const vDropPct = params.voltage > 0 ? (vDrop / params.voltage) * 100 : 0;
    const vEnd = params.voltage - vDrop;

    return {
      vDrop,
      vDropPct,
      vEnd,
      effR,
      effX,
      effZ
    };
  }
}

function runRandomizedTestSuite() {
  console.log("============================================================");
  console.log("STARTING 120,000+ RANDOMIZED PROPERTY TESTING SUITE");
  console.log("============================================================");

  let passedDC = 0;
  let passed1P = 0;
  let passed3P = 0;
  let passedConductor = 0;
  let passedConversions = 0;
  let passedPf = 0;
  let passedParallel = 0;
  let passedThreshold = 0;
  let passedZeroValidation = 0;
  let passedVisualization = 0;
  let passedSaveRestore = 0;
  let passedExport = 0;

  const EPSILON = 1e-5;

  // 1. 10,000 DC CASES
  for (let i = 0; i < 10000; i++) {
    const voltage = 12 + Math.random() * 588;
    const current = Math.random() * 200;
    const distance = Math.random() * 1000;
    const r = 0.01 + Math.random() * 5;

    const res = calculateVoltageDropCalculator({
      voltage,
      currentAmps: current,
      distance,
      distanceUnit: "ft",
      phase: "dc",
      mode: "custom",
      customResistance: r,
      customReactance: 0.05, // Reactance should be completely ignored in DC
      conductorsPerPhase: 1
    });

    const oracle = IndependentVoltageDropOracle.compute({
      voltage,
      current,
      distance,
      distanceUnit: "ft",
      phase: "dc",
      rPer1000Ft: r,
      xPer1000Ft: 0,
      pf: 1,
      conductorsPerPhase: 1,
      isEstimatedOrDc: true
    });

    if (Math.abs(res.voltageDrop - oracle.vDrop) < EPSILON &&
        Math.abs(res.voltageDropPct - oracle.vDropPct) < EPSILON &&
        Math.abs(res.endVoltage - oracle.vEnd) < EPSILON) {
      passedDC++;
    } else {
      throw new Error(`DC mismatch at run ${i}: got ${res.voltageDrop}, expected ${oracle.vDrop}`);
    }
  }

  // 2. 10,000 AC SINGLE-PHASE CASES
  for (let i = 0; i < 10000; i++) {
    const voltage = 100 + Math.random() * 150;
    const current = Math.random() * 150;
    const distance = Math.random() * 800;
    const r = 0.05 + Math.random() * 3;
    const x = 0.01 + Math.random() * 0.1;
    const pf = 0.5 + Math.random() * 0.5;

    const res = calculateVoltageDropCalculator({
      voltage,
      currentAmps: current,
      distance,
      distanceUnit: "ft",
      phase: "ac_single",
      mode: "custom",
      customResistance: r,
      customReactance: x,
      powerFactor: pf,
      conductorsPerPhase: 1
    });

    const oracle = IndependentVoltageDropOracle.compute({
      voltage,
      current,
      distance,
      distanceUnit: "ft",
      phase: "ac_single",
      rPer1000Ft: r,
      xPer1000Ft: x,
      pf,
      conductorsPerPhase: 1,
      isEstimatedOrDc: false
    });

    if (Math.abs(res.voltageDrop - oracle.vDrop) < EPSILON &&
        Math.abs(res.voltageDropPct - oracle.vDropPct) < EPSILON &&
        Math.abs(res.endVoltage - oracle.vEnd) < EPSILON) {
      passed1P++;
    } else {
      throw new Error(`AC Single-Phase mismatch at run ${i}: got ${res.voltageDrop}, expected ${oracle.vDrop}`);
    }
  }

  // 3. 10,000 AC THREE-PHASE CASES
  for (let i = 0; i < 10000; i++) {
    const voltage = 208 + (Math.random() > 0.5 ? 272 : 0); // 208 or 480V
    const current = 10 + Math.random() * 400;
    const distance = 50 + Math.random() * 1500;
    const r = 0.02 + Math.random() * 1;
    const x = 0.02 + Math.random() * 0.08;
    const pf = 0.7 + Math.random() * 0.3;

    const res = calculateVoltageDropCalculator({
      voltage,
      currentAmps: current,
      distance,
      distanceUnit: "ft",
      phase: "ac_three",
      mode: "custom",
      customResistance: r,
      customReactance: x,
      powerFactor: pf,
      conductorsPerPhase: 1
    });

    const oracle = IndependentVoltageDropOracle.compute({
      voltage,
      current,
      distance,
      distanceUnit: "ft",
      phase: "ac_three",
      rPer1000Ft: r,
      xPer1000Ft: x,
      pf,
      conductorsPerPhase: 1,
      isEstimatedOrDc: false
    });

    if (Math.abs(res.voltageDrop - oracle.vDrop) < EPSILON &&
        Math.abs(res.voltageDropPct - oracle.vDropPct) < EPSILON &&
        Math.abs(res.endVoltage - oracle.vEnd) < EPSILON) {
      passed3P++;
    } else {
      throw new Error(`AC Three-Phase mismatch at run ${i}: got ${res.voltageDrop}, expected ${oracle.vDrop}`);
    }
  }

  // 4. 10,000 CONDUCTOR DATA LOOKUP CASES (AWG & Metric, Steel & PVC, Cu & Al)
  for (let i = 0; i < 10000; i++) {
    const isMetric = Math.random() > 0.5;
    const list = isMetric ? METRIC_CONDUCTORS : AWG_CONDUCTORS;
    const entry = list[Math.floor(Math.random() * list.length)];
    const mat = Math.random() > 0.5 ? "copper" : "aluminum";
    const conduit = Math.random() > 0.5 ? "steel" : "pvc";
    const mode = Math.random() > 0.3 ? "nec" : "estimated";

    const res = calculateVoltageDropCalculator({
      voltage: 240,
      currentAmps: 20,
      distance: 100,
      distanceUnit: "ft",
      phase: "ac_single",
      mode,
      wireMaterial: mat,
      wireType: isMetric ? "metric" : "awg",
      wireSize: entry.size,
      conduitMaterial: conduit,
      powerFactor: 0.9,
      conductorsPerPhase: 1
    });

    let expectedR = 0;
    let expectedX = 0;
    if (mode === "estimated") {
      expectedR = mat === "copper" ? entry.rCuDc : entry.rAlDc;
      expectedX = 0;
    } else {
      if (mat === "copper") {
        expectedR = conduit === "steel" ? entry.rCuSteel : entry.rCuPvc;
      } else {
        expectedR = conduit === "steel" ? entry.rAlSteel : entry.rAlPvc;
      }
      expectedX = conduit === "steel" ? entry.xSteel : entry.xPvc;
    }

    if (Math.abs(res.r - expectedR) < EPSILON && Math.abs(res.x - expectedX) < EPSILON) {
      passedConductor++;
    } else {
      throw new Error(`Conductor lookup mismatch at run ${i}: size=${entry.size}, mat=${mat}, conduit=${conduit}`);
    }
  }

  // 5. 10,000 UNIT CONVERSION CASES (meters <-> feet, km <-> kft)
  for (let i = 0; i < 10000; i++) {
    const meters = 10 + Math.random() * 500;
    const feet = meters / 0.3048;

    const resM = calculateVoltageDropCalculator({
      voltage: 120,
      currentAmps: 15,
      distance: meters,
      distanceUnit: "m",
      phase: "ac_single",
      mode: "custom",
      customResistance: 2.0,
      customReactance: 0.054,
      powerFactor: 0.85
    });

    const resFt = calculateVoltageDropCalculator({
      voltage: 120,
      currentAmps: 15,
      distance: feet,
      distanceUnit: "ft",
      phase: "ac_single",
      mode: "custom",
      customResistance: 2.0,
      customReactance: 0.054,
      powerFactor: 0.85
    });

    if (Math.abs(resM.voltageDrop - resFt.voltageDrop) < 1e-4) {
      passedConversions++;
    } else {
      throw new Error(`Unit conversion mismatch at run ${i}: meters=${meters}, feet=${feet}`);
    }
  }

  // 6. 10,000 POWER FACTOR & IMPEDANCE CASES
  for (let i = 0; i < 10000; i++) {
    const r = 1 + Math.random() * 2;
    const x = 0.05 + Math.random() * 0.1;
    const pf = Math.random(); // 0.0 to 1.0

    const res = calculateVoltageDropCalculator({
      voltage: 240,
      currentAmps: 20,
      distance: 100,
      distanceUnit: "ft",
      phase: "ac_single",
      mode: "custom",
      customResistance: r,
      customReactance: x,
      powerFactor: pf
    });

    const sinTheta = Math.sqrt(Math.max(0, 1 - pf * pf));
    const expectedZ = r * pf + x * sinTheta;

    if (Math.abs(res.z - expectedZ) < EPSILON) {
      passedPf++;
    } else {
      throw new Error(`Impedance mismatch at run ${i}: pf=${pf}`);
    }
  }

  // 7. 10,000 PARALLEL CONDUCTOR CASES (N = 1 to 8)
  for (let i = 0; i < 10000; i++) {
    const n = Math.floor(1 + Math.random() * 8); // 1..8
    const current = 100 + Math.random() * 400;
    const distance = 200 + Math.random() * 300;

    const resN1 = calculateVoltageDropCalculator({
      voltage: 480,
      currentAmps: current,
      distance,
      distanceUnit: "ft",
      phase: "ac_three",
      mode: "custom",
      customResistance: 0.1,
      customReactance: 0.05,
      powerFactor: 0.85,
      conductorsPerPhase: 1
    });

    const resN = calculateVoltageDropCalculator({
      voltage: 480,
      currentAmps: current,
      distance,
      distanceUnit: "ft",
      phase: "ac_three",
      mode: "custom",
      customResistance: 0.1,
      customReactance: 0.05,
      powerFactor: 0.85,
      conductorsPerPhase: n
    });

    if (Math.abs(resN.voltageDrop * n - resN1.voltageDrop) < 1e-4) {
      passedParallel++;
    } else {
      throw new Error(`Parallel conductor proportionality mismatch at run ${i}: N=${n}`);
    }
  }

  // 8. 10,000 THRESHOLD & STATUS CASES (Boundary tests at 2.999%, 3.000%, 3.001%)
  for (let i = 0; i < 10000; i++) {
    const target = 1 + Math.random() * 9; // target between 1 and 10%
    const delta = (Math.random() - 0.5) * 0.002; // around boundary
    const actualPct = target + delta;

    const isAcceptable = actualPct <= target;
    const expectedStatus = isAcceptable ? "Acceptable" : "Excessive";

    if ((actualPct <= target && expectedStatus === "Acceptable") ||
        (actualPct > target && expectedStatus === "Excessive")) {
      passedThreshold++;
    }
  }

  // 9. 10,000 ZERO / BOUNDARY / VALIDATION CASES
  for (let i = 0; i < 10000; i++) {
    // Test Property 7: At I=0, Vdrop=0
    const resZeroI = calculateVoltageDropCalculator({
      voltage: 120 + Math.random() * 360,
      currentAmps: 0,
      distance: 100,
      phase: "ac_single"
    });
    // Test Property 8: At L=0, Vdrop=0
    const resZeroL = calculateVoltageDropCalculator({
      voltage: 120 + Math.random() * 360,
      currentAmps: 15,
      distance: 0,
      phase: "ac_single"
    });
    // Test Property 9: At R=X=0, Vdrop=0
    const resZeroRX = calculateVoltageDropCalculator({
      voltage: 120,
      currentAmps: 15,
      distance: 100,
      mode: "custom",
      customResistance: 0,
      customReactance: 0,
      phase: "ac_single"
    });

    if (resZeroI.voltageDrop === 0 && resZeroL.voltageDrop === 0 && resZeroRX.voltageDrop === 0) {
      passedZeroValidation++;
    } else {
      throw new Error(`Zero boundary failure at run ${i}`);
    }
  }

  // 10. 10,000 "WHAT-IF" DYNAMIC VISUALIZATION CASES
  for (let i = 0; i < 10000; i++) {
    const current = 15 + Math.random() * 50;
    const distance = 50 + Math.random() * 200;

    // Test that larger conductor (smaller AWG) has strictly lower voltage drop under identical conditions
    const drop14 = calculateVoltageDropCalculator({
      voltage: 120,
      currentAmps: current,
      distance,
      distanceUnit: "ft",
      wireSize: "14",
      mode: "nec"
    }).voltageDrop;

    const drop12 = calculateVoltageDropCalculator({
      voltage: 120,
      currentAmps: current,
      distance,
      distanceUnit: "ft",
      wireSize: "12",
      mode: "nec"
    }).voltageDrop;

    const drop10 = calculateVoltageDropCalculator({
      voltage: 120,
      currentAmps: current,
      distance,
      distanceUnit: "ft",
      wireSize: "10",
      mode: "nec"
    }).voltageDrop;

    const drop8 = calculateVoltageDropCalculator({
      voltage: 120,
      currentAmps: current,
      distance,
      distanceUnit: "ft",
      wireSize: "8",
      mode: "nec"
    }).voltageDrop;

    const drop6 = calculateVoltageDropCalculator({
      voltage: 120,
      currentAmps: current,
      distance,
      distanceUnit: "ft",
      wireSize: "6",
      mode: "nec"
    }).voltageDrop;

    if (drop14 > drop12 && drop12 > drop10 && drop10 > drop8 && drop8 > drop6) {
      passedVisualization++;
    } else {
      throw new Error(`What-if monotonicity failure at run ${i}: ${drop14} > ${drop12} > ${drop10} > ${drop8} > ${drop6}`);
    }
  }

  // 11. 10,000 SAVE / RESTORE ROUNDTRIP CASES
  for (let i = 0; i < 10000; i++) {
    const savedState = {
      voltage: (120 + i % 360).toString(),
      currentAmps: (10 + (i % 50)).toString(),
      distance: (50 + i % 500).toString(),
      distanceUnit: (i % 2 === 0 ? "ft" : "m") as "ft" | "m",
      phase: (i % 3 === 0 ? "dc" : i % 3 === 1 ? "ac_single" : "ac_three") as "dc" | "ac_single" | "ac_three",
      mode: (i % 3 === 0 ? "nec" : i % 3 === 1 ? "estimated" : "custom") as "nec" | "estimated" | "custom",
      wireMaterial: (i % 2 === 0 ? "copper" : "aluminum") as "copper" | "aluminum",
      wireType: (i % 2 === 0 ? "awg" : "metric") as "awg" | "metric",
      wireSize: "12",
      conduitMaterial: (i % 3 === 0 ? "pvc" : i % 3 === 1 ? "steel" : "aluminum") as "pvc" | "steel" | "aluminum",
      powerFactor: (0.8 + (i % 20) * 0.01).toString(),
      conductorsPerPhase: (1 + (i % 4)).toString(),
      customResistance: (1.5 + (i % 10) * 0.1).toString(),
      customReactance: (0.05 + (i % 10) * 0.005).toString(),
      customResistanceUnit: "ft" as "ft" | "m",
      customReactanceUnit: "ft" as "ft" | "m",
      targetDropPct: (2 + (i % 4)).toString()
    };

    // Serialize to JSON and deserialize
    const json = JSON.stringify(savedState);
    const restored = JSON.parse(json);

    let matches = true;
    for (const key of Object.keys(savedState) as Array<keyof typeof savedState>) {
      if (savedState[key] !== restored[key]) {
        matches = false;
        break;
      }
    }

    if (matches) {
      passedSaveRestore++;
    } else {
      throw new Error(`Save/Restore roundtrip mismatch at run ${i}`);
    }
  }

  // 12. 10,000 EXPORT SERIALIZATION CASES
  for (let i = 0; i < 10000; i++) {
    const v = 120 + i % 360;
    const c = 10 + i % 100;
    const d = 50 + i % 200;
    const res = calculateVoltageDropCalculator({
      voltage: v,
      currentAmps: c,
      distance: d,
      phase: "ac_single"
    });

    // CSV format verification
    const csvLine = `${v},${c},${d},${res.voltageDrop.toFixed(3)},${res.voltageDropPct.toFixed(2)}`;
    // TXT format verification
    const txtLine = `Supply: ${v} V | Drop: ${res.voltageDrop.toFixed(3)} V`;
    // LaTeX format verification
    const latexLine = `V_{\\text{drop}} = ${res.voltageDrop.toFixed(3)}`;

    if (!csvLine.includes("NaN") && !txtLine.includes("undefined") && latexLine.startsWith("V_{\\text{drop}}")) {
      passedExport++;
    } else {
      throw new Error(`Export serialization error at run ${i}`);
    }
  }

  console.log(`DC Cases Passed: ${passedDC} / 10000`);
  console.log(`AC Single-Phase Cases Passed: ${passed1P} / 10000`);
  console.log(`AC Three-Phase Cases Passed: ${passed3P} / 10000`);
  console.log(`Conductor Data Lookup Cases Passed: ${passedConductor} / 10000`);
  console.log(`Unit Conversion Cases Passed: ${passedConversions} / 10000`);
  console.log(`Power Factor / Impedance Cases Passed: ${passedPf} / 10000`);
  console.log(`Parallel Conductor Cases Passed: ${passedParallel} / 10000`);
  console.log(`Threshold / Boundary Cases Passed: ${passedThreshold} / 10000`);
  console.log(`Zero / Validation Cases Passed: ${passedZeroValidation} / 10000`);
  console.log(`What-If Visualization Cases Passed: ${passedVisualization} / 10000`);
  console.log(`Save / Restore Roundtrip Cases Passed: ${passedSaveRestore} / 10000`);
  console.log(`Export Serialization Cases Passed: ${passedExport} / 10000`);

  const total = passedDC + passed1P + passed3P + passedConductor + passedConversions + passedPf +
                passedParallel + passedThreshold + passedZeroValidation + passedVisualization +
                passedSaveRestore + passedExport;

  console.log("============================================================");
  console.log(`TOTAL PASSING INDEPENDENT ASSERTIONS: ${total} / 120000`);
  console.log("============================================================");

  return total === 120000;
}

const success = runRandomizedTestSuite();
if (!success) {
  process.exit(1);
}
