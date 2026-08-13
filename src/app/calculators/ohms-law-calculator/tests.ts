import { calculateOhmsLawCalculator } from "./calculator";

export function runOhmsLawCalculatorTests() {
  // Test Case 1: Backward Compatible Default Inputs
  const defaultInputs = {
    voltage: 12,
    resistance: 4
  };
  const res1 = calculateOhmsLawCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");
  // 12 V / 4 Ω = 3 A; P = 36 W
  if (res1.current !== 3 || res1.power !== 36) {
    throw new Error(`Default inputs calculation error: expected I=3, P=36, got I=${res1.current}, P=${res1.power}`);
  }

  // Test Case 2: Core Ohm's Law Core (Given Voltage and Current)
  const res2 = calculateOhmsLawCalculator({
    activeTab: "ohms_law",
    voltage: 10,
    voltageUnit: "V",
    current: 2,
    currentUnit: "A",
    knownVoltage: true,
    knownCurrent: true,
    knownResistance: false,
    knownPower: false
  });
  // R = 10 / 2 = 5 Ω; P = 10 * 2 = 20 W
  if (res2.resistance !== 5 || res2.power !== 20) {
    throw new Error(`Core I-V check failed: expected R=5, P=20, got R=${res2.resistance}, P=${res2.power}`);
  }

  // Test Case 3: Core Ohm's Law (Given Resistance and Power)
  const res3 = calculateOhmsLawCalculator({
    activeTab: "ohms_law",
    resistance: 10,
    resistanceUnit: "Ω",
    power: 40,
    powerUnit: "W",
    knownVoltage: false,
    knownCurrent: false,
    knownResistance: true,
    knownPower: true
  });
  // V = √(40 * 10) = 20 V; I = √(40 / 10) = 2 A
  if (res3.voltage !== 20 || res3.current !== 2) {
    throw new Error(`Core R-P check failed: expected V=20, I=2, got V=${res3.voltage}, I=${res3.current}`);
  }

  // Test Case 4: Consistency check (Disagreement warning)
  const res4 = calculateOhmsLawCalculator({
    activeTab: "ohms_law",
    voltage: 12,
    voltageUnit: "V",
    current: 2,
    currentUnit: "A",
    resistance: 10, // expect 6
    resistanceUnit: "Ω",
    knownVoltage: true,
    knownCurrent: true,
    knownResistance: true,
    knownPower: false
  });
  if (res4.consistency !== "inconsistent") {
    throw new Error(`Consistency checker failed to detect disagreement between inputs.`);
  }

  // Test Case 5: Voltage Divider with load resistance
  const resDiv = calculateOhmsLawCalculator({
    activeTab: "voltage_divider",
    dividerVin: 10,
    dividerR1: 10,
    dividerR2: 10,
    dividerRl: 10 // parallel R2 || Rl = 5 Ω
  });
  // Vout = 10 * 5 / (10 + 5) = 3.333 V
  if (Math.abs((resDiv.dividerVout || 0) - 3.333) > 0.005) {
    throw new Error(`Voltage divider with load failed: expected ~3.333, got ${resDiv.dividerVout}`);
  }

  // Test Case 6: Current Divider
  const resCurr = calculateOhmsLawCalculator({
    activeTab: "current_divider",
    dividerItotal: 3,
    dividerBranchR1: 10,
    dividerBranchR2: 10
  });
  // R_eq = 5 Ω; V = 15 V; branch currents = 1.5 A each
  if (resCurr.branch1Current !== 1.5 || resCurr.branch2Current !== 1.5) {
    throw new Error(`Current divider failed: expected 1.5 A branches, got I1=${resCurr.branch1Current}, I2=${resCurr.branch2Current}`);
  }

  // Test Case 7: LED limiting resistor
  const resLed = calculateOhmsLawCalculator({
    activeTab: "led_resistor",
    ledVsource: 9,
    ledVforward: 2,
    ledIforward: 20 // 20 mA
  });
  // R = (9 - 2) / 0.02 = 350 Ω (Closest E24 match = 360 Ω)
  if (resLed.ledResistance !== 360) {
    throw new Error(`LED limiter failed: expected E24 standard resistor value 360, got ${resLed.ledResistance}`);
  }

  // Test Case 8: Boundary zeros
  const resZero = calculateOhmsLawCalculator({
    activeTab: "ohms_law",
    voltage: 0,
    resistance: 0
  });
  if (resZero.voltage !== 12 || resZero.resistance !== 4) {
    // Falls back to standard inputs if 0/NaN are checked
    if (resZero.error && !resZero.error.includes("cannot be zero")) {
      throw new Error("Zero inputs fell back incorrectly.");
    }
  }

  return true;
}

export default runOhmsLawCalculatorTests;
