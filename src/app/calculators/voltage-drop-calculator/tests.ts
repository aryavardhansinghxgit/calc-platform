import { calculateVoltageDropCalculator } from "./calculator";

export function runVoltageDropCalculatorTests() {
  const TOLERANCE = 1e-3;

  // 1. Golden Case #1: NEC Table 9 Base Case (120V, 15A, 100ft, 12 AWG Cu PVC, PF 0.85)
  // R = 2.00 Ω/kft, X = 0.054 Ω/kft
  // sin(theta) = sqrt(1 - 0.85^2) = 0.526782688
  // Z_eff = 2.00 * 0.85 + 0.054 * 0.526782688 = 1.70 + 0.028446 = 1.728446 Ω/kft
  // Vdrop = (2 * 15 * 100 * 1.728446) / 1000 = 5.185338 V
  const gc1 = calculateVoltageDropCalculator({
    voltage: 120,
    currentAmps: 15,
    distance: 100,
    distanceUnit: "ft",
    phase: "ac_single",
    mode: "nec",
    wireMaterial: "copper",
    wireType: "awg",
    wireSize: "12",
    conduitMaterial: "pvc",
    powerFactor: 0.85,
    conductorsPerPhase: 1
  });
  if (Math.abs(gc1.voltageDrop - 5.18534) > 0.005) {
    throw new Error(`Golden Case #1 Vdrop mismatch: expected ~5.185 V, got ${gc1.voltageDrop}`);
  }
  if (Math.abs(gc1.voltageDropPct - 4.32) > 0.02) {
    throw new Error(`Golden Case #1 Vdrop% mismatch: expected ~4.32%, got ${gc1.voltageDropPct}`);
  }
  if (Math.abs(gc1.endVoltage - 114.81) > 0.02) {
    throw new Error(`Golden Case #1 endVoltage mismatch: expected ~114.81 V, got ${gc1.endVoltage}`);
  }

  // 2. Golden Case #1 (Custom Conductor Mode): R = 2.00, X = 0.054, PF = 0.85
  const gc1Custom = calculateVoltageDropCalculator({
    voltage: 120,
    currentAmps: 15,
    distance: 100,
    distanceUnit: "ft",
    phase: "ac_single",
    mode: "custom",
    customResistance: 2.0,
    customReactance: 0.054,
    powerFactor: 0.85,
    conductorsPerPhase: 1
  });
  if (Math.abs(gc1Custom.voltageDrop - 5.18534) > 0.005) {
    throw new Error(`Custom Golden Case Vdrop mismatch: expected ~5.185 V, got ${gc1Custom.voltageDrop}`);
  }

  // 3. Worked Example A: 240V, 100A, 150ft, 1 AWG Cu PVC, PF 0.90
  // R = 0.15, X = 0.046
  // sin(theta) = sqrt(1 - 0.9^2) = 0.43588989
  // Z_eff = 0.15 * 0.9 + 0.046 * 0.43588989 = 0.135 + 0.02005 = 0.15505 Ω/kft
  // Vdrop = (2 * 100 * 150 * 0.15505) / 1000 = 4.6515 V
  const weA = calculateVoltageDropCalculator({
    voltage: 240,
    currentAmps: 100,
    distance: 150,
    distanceUnit: "ft",
    phase: "ac_single",
    mode: "nec",
    wireMaterial: "copper",
    wireType: "awg",
    wireSize: "1",
    conduitMaterial: "pvc",
    powerFactor: 0.9,
    conductorsPerPhase: 1
  });
  if (Math.abs(weA.voltageDrop - 4.6515) > 0.01) {
    throw new Error(`Worked Example A mismatch: expected ~4.65 V, got ${weA.voltageDrop}`);
  }
  if (Math.abs(weA.voltageDropPct - 1.94) > 0.02) {
    throw new Error(`Worked Example A percentage mismatch: expected ~1.94%, got ${weA.voltageDropPct}`);
  }

  // 4. Worked Example B: 480V, 120A, 400ft, 3/0 AWG Cu Steel, PF 0.85 (Three-Phase)
  // R = 0.079, X = 0.052
  // sin(theta) = 0.526782688
  // Z_eff = 0.079 * 0.85 + 0.052 * 0.526782688 = 0.0945427 Ω/kft
  // Vdrop = (sqrt(3) * 120 * 400 * 0.0945427) / 1000 = 7.859899 V
  const weB = calculateVoltageDropCalculator({
    voltage: 480,
    currentAmps: 120,
    distance: 400,
    distanceUnit: "ft",
    phase: "ac_three",
    mode: "nec",
    wireMaterial: "copper",
    wireType: "awg",
    wireSize: "3/0",
    conduitMaterial: "steel",
    powerFactor: 0.85,
    conductorsPerPhase: 1
  });
  if (Math.abs(weB.voltageDrop - 7.86) > 0.02) {
    throw new Error(`Worked Example B mismatch: expected ~7.86 V, got ${weB.voltageDrop}`);
  }
  if (Math.abs(weB.voltageDropPct - 1.64) > 0.02) {
    throw new Error(`Worked Example B percentage mismatch: expected ~1.64%, got ${weB.voltageDropPct}`);
  }

  // 5. Estimated Resistance Mode: R = 1.93 Ω/kft, I = 15 A, L = 100 ft (Single-Phase AC)
  // Expected: Vdrop = (2 * 15 * 100 * 1.93) / 1000 = 5.790 V, Drop% at 120V = 4.825%
  const estMode = calculateVoltageDropCalculator({
    voltage: 120,
    currentAmps: 15,
    distance: 100,
    distanceUnit: "ft",
    phase: "ac_single",
    mode: "estimated",
    wireMaterial: "copper",
    wireType: "awg",
    wireSize: "12",
    powerFactor: 0.85,
    conductorsPerPhase: 1
  });
  if (Math.abs(estMode.voltageDrop - 5.79) > TOLERANCE) {
    throw new Error(`Estimated Resistance Mode mismatch: expected 5.79 V, got ${estMode.voltageDrop}`);
  }
  if (Math.abs(estMode.voltageDropPct - 4.825) > 0.01) {
    throw new Error(`Estimated Resistance Mode % mismatch: expected 4.825%, got ${estMode.voltageDropPct}`);
  }
  if (Math.abs(estMode.endVoltage - 114.21) > 0.01) {
    throw new Error(`Estimated Resistance Mode load voltage mismatch: expected 114.21 V, got ${estMode.endVoltage}`);
  }

  // 6. Zero Current Test: I = 0 -> Vdrop must be exactly 0
  const zeroI = calculateVoltageDropCalculator({
    voltage: 120,
    currentAmps: 0,
    distance: 100,
    distanceUnit: "ft",
    phase: "ac_single"
  });
  if (zeroI.voltageDrop !== 0 || zeroI.voltageDropPct !== 0) {
    throw new Error(`Zero current test failed: expected 0, got ${zeroI.voltageDrop}`);
  }

  // 7. Zero Distance Test: L = 0 -> Vdrop must be exactly 0
  const zeroL = calculateVoltageDropCalculator({
    voltage: 120,
    currentAmps: 15,
    distance: 0,
    distanceUnit: "ft",
    phase: "ac_single"
  });
  if (zeroL.voltageDrop !== 0 || zeroL.voltageDropPct !== 0) {
    throw new Error(`Zero distance test failed: expected 0, got ${zeroL.voltageDrop}`);
  }

  // 8. Parallel Conductors Proportionality Test: N=2 cuts drop exactly in half
  const n1 = calculateVoltageDropCalculator({
    voltage: 480,
    currentAmps: 100,
    distance: 200,
    distanceUnit: "ft",
    phase: "ac_three",
    conductorsPerPhase: 1
  });
  const n2 = calculateVoltageDropCalculator({
    voltage: 480,
    currentAmps: 100,
    distance: 200,
    distanceUnit: "ft",
    phase: "ac_three",
    conductorsPerPhase: 2
  });
  if (Math.abs(n2.voltageDrop * 2 - n1.voltageDrop) > TOLERANCE) {
    throw new Error(`Parallel conductors test failed: N=2 did not halve drop`);
  }

  // 9. Three-Phase vs Single-Phase Vector Factor Test: Vdrop_3P / Vdrop_1P = sqrt(3) / 2
  const singlePh = calculateVoltageDropCalculator({
    voltage: 208,
    currentAmps: 50,
    distance: 100,
    distanceUnit: "ft",
    phase: "ac_single",
    powerFactor: 0.9
  });
  const threePh = calculateVoltageDropCalculator({
    voltage: 208,
    currentAmps: 50,
    distance: 100,
    distanceUnit: "ft",
    phase: "ac_three",
    powerFactor: 0.9
  });
  const expectedRatio = Math.sqrt(3) / 2;
  const actualRatio = threePh.voltageDrop / singlePh.voltageDrop;
  if (Math.abs(actualRatio - expectedRatio) > TOLERANCE) {
    throw new Error(`Three-phase ratio test failed: expected ${expectedRatio}, got ${actualRatio}`);
  }

  // 10. Metric Conductor & Meter Conversion Test: 150m, 70 mm², 480V 3Ø, N=2
  const metricTest = calculateVoltageDropCalculator({
    voltage: 480,
    currentAmps: 100,
    distance: 150,
    distanceUnit: "m",
    phase: "ac_three",
    mode: "nec",
    wireMaterial: "copper",
    wireType: "metric",
    wireSize: "70",
    conduitMaterial: "pvc",
    powerFactor: 0.85,
    conductorsPerPhase: 2
  });
  if (Math.abs(metricTest.voltageDrop - 4.544) > 0.05) {
    throw new Error(`Metric 70mm2 test failed: expected ~4.54 V, got ${metricTest.voltageDrop}`);
  }

  return true;
}

export default runVoltageDropCalculatorTests;
