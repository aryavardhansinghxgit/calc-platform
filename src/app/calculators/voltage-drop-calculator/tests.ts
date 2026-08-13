import { calculateVoltageDropCalculator } from "./calculator";

export function runVoltageDropCalculatorTests() {
  // Test Case 1: Default/DC Single Run Configuration
  const defaultInputs = {
    voltage: 120,
    currentAmps: 15,
    distanceFt: 100,
    wireGauge: "12",
    phase: "dc"
  };
  const res1 = calculateVoltageDropCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");
  // V_drop = (2 * I * L * R) / 1000 = (2 * 15 * 100 * 1.93) / 1000 = 5.79 V
  if (Math.abs(res1.voltageDrop - 5.79) > 0.1) {
    throw new Error(`DC Voltage drop calculation mismatch: expected ~5.79, got ${res1.voltageDrop}`);
  }

  // Test Case 2: Zero Inputs (should not throw, should clamp gracefully or return 0 drop)
  const zeroInputs = {
    voltage: 0,
    currentAmps: 0,
    distanceFt: 0,
    wireGauge: "12"
  };
  const res2 = calculateVoltageDropCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");
  if (res2.voltageDrop !== 0) {
    throw new Error(`Zero inputs should yield 0 drop, got ${res2.voltageDrop}`);
  }

  // Test Case 3: Negative Inputs (should handle gracefully)
  const negInputs = {
    voltage: -50,
    currentAmps: -50,
    distanceFt: -50,
    wireGauge: "12"
  };
  const res3 = calculateVoltageDropCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  // Test Case 4: AC Single-Phase with Reactance and Power Factor
  const acSingleInputs = {
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
  };
  const res4 = calculateVoltageDropCalculator(acSingleInputs);
  if (!res4 || res4.voltageDrop === 0) throw new Error("AC single-phase calculation failed");
  // Z = R * PF + X * sin(arccos(PF)) = 2.0 * 0.85 + 0.054 * 0.5268 = 1.7 + 0.0284 = 1.7284 Ω/kft
  // V_drop = (2 * 15 * 100 * 1.7284) / 1000 = 5.185 V -> ~5.19 V
  if (Math.abs(res4.voltageDrop - 5.185) > 0.1) {
    throw new Error(`AC Single-Phase drop mismatch: expected ~5.19, got ${res4.voltageDrop}`);
  }

  // Test Case 5: AC Three-Phase with Parallel Conductors and Metric Units
  const acThreeInputs = {
    voltage: 480,
    currentAmps: 100,
    distance: 150,
    distanceUnit: "m", // 150 m = 492.12 ft
    phase: "ac_three",
    mode: "nec",
    wireMaterial: "copper",
    wireType: "metric",
    wireSize: "70", // 70 mm² -> R = 0.099, X = 0.043
    conduitMaterial: "pvc",
    powerFactor: 0.85,
    conductorsPerPhase: 2
  };
  const res5 = calculateVoltageDropCalculator(acThreeInputs);
  if (!res5 || res5.voltageDrop === 0) throw new Error("AC three-phase metric parallel calculation failed");
  // Z = (0.099 * 0.85 + 0.043 * 0.5268) / 2 = 0.1068 / 2 = 0.0534 Ω/kft
  // V_drop = (√3 * 100 * 492.12 * 0.0534) / 1000 = (1.732 * 100 * 492.12 * 0.0534) / 1000 = 4.55 V
  if (Math.abs(res5.voltageDrop - 4.55) > 0.2) {
    throw new Error(`AC Three-Phase drop mismatch: expected ~4.55, got ${res5.voltageDrop}`);
  }

  return true;
}

export default runVoltageDropCalculatorTests;
