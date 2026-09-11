import { calculateOhmsLawCalculator, findClosestHigherE24 } from "./calculator";

export function runOhmsLawCalculatorTests() {
  // Golden Case 1: Core 12V / 4Ω
  const gc1 = calculateOhmsLawCalculator({
    voltage: 12,
    resistance: 4
  });
  if (!gc1 || gc1.current !== 3 || gc1.power !== 36) {
    throw new Error(`Golden Case 1 failed: expected I=3, P=36, got I=${gc1?.current}, P=${gc1?.power}`);
  }

  // Golden Case 2: Voltage Divider 12V / 10Ω / 5Ω unloaded
  const gc2 = calculateOhmsLawCalculator({
    activeTab: "voltage_divider",
    dividerVin: 12,
    dividerR1: 10,
    dividerR2: 5
  });
  if (Math.abs((gc2.dividerVout ?? 0) - 4) > 1e-6 || Math.abs((gc2.dividerCurrent ?? 0) - 0.8) > 1e-6 ||
      Math.abs((gc2.dividerR1Power ?? 0) - 6.4) > 1e-6 || Math.abs((gc2.dividerR2Power ?? 0) - 3.2) > 1e-6) {
    throw new Error(`Golden Case 2 failed: Vout=${gc2.dividerVout}, I=${gc2.dividerCurrent}, P1=${gc2.dividerR1Power}, P2=${gc2.dividerR2Power}`);
  }

  // Golden Case 3: Current Divider 2A / 10Ω / 10Ω
  const gc3 = calculateOhmsLawCalculator({
    activeTab: "current_divider",
    dividerItotal: 2,
    dividerBranchR1: 10,
    dividerBranchR2: 10
  });
  if (Math.abs(gc3.resistance - 5) > 1e-6 || Math.abs(gc3.voltage - 10) > 1e-6 ||
      Math.abs((gc3.branch1Current ?? 0) - 1) > 1e-6 || Math.abs((gc3.branch2Current ?? 0) - 1) > 1e-6) {
    throw new Error(`Golden Case 3 failed: Req=${gc3.resistance}, V=${gc3.voltage}, I1=${gc3.branch1Current}, I2=${gc3.branch2Current}`);
  }

  // Golden Case 4: LED Resistor 9V / 2.0V / 20mA
  const gc4 = calculateOhmsLawCalculator({
    activeTab: "led_resistor",
    ledVsource: 9,
    ledVforward: 2.0,
    ledIforward: 20
  });
  if (Math.abs(gc4.resistance - 350) > 1e-6 || gc4.ledResistance !== 360 || Math.abs((gc4.ledPower ?? 0) - 0.14) > 1e-6) {
    throw new Error(`Golden Case 4 failed: Rtarget=${gc4.resistance}, Rstd=${gc4.ledResistance}, P=${gc4.ledPower}`);
  }

  // Golden Case 5: 230V / 50Ω Heater Load
  const gc5 = calculateOhmsLawCalculator({
    activeTab: "ohms_law",
    voltage: 230,
    resistance: 50,
    knownVoltage: true,
    knownResistance: true
  });
  if (Math.abs(gc5.current - 4.6) > 1e-6 || Math.abs(gc5.power - 1058) > 1e-6) {
    throw new Error(`Golden Case 5 failed: I=${gc5.current}, P=${gc5.power}`);
  }

  // Pair Test Matrix:
  // Case A: V=12, I=3 -> R=4, P=36
  const pairA = calculateOhmsLawCalculator({ activeTab: "ohms_law", voltage: 12, current: 3, knownVoltage: true, knownCurrent: true });
  if (Math.abs(pairA.resistance - 4) > 1e-6 || Math.abs(pairA.power - 36) > 1e-6) throw new Error("Pair A failed");

  // Case B: V=12, R=4 -> I=3, P=36
  const pairB = calculateOhmsLawCalculator({ activeTab: "ohms_law", voltage: 12, resistance: 4, knownVoltage: true, knownResistance: true });
  if (Math.abs(pairB.current - 3) > 1e-6 || Math.abs(pairB.power - 36) > 1e-6) throw new Error("Pair B failed");

  // Case C: V=12, P=36 -> I=3, R=4
  const pairC = calculateOhmsLawCalculator({ activeTab: "ohms_law", voltage: 12, power: 36, knownVoltage: true, knownPower: true });
  if (Math.abs(pairC.current - 3) > 1e-6 || Math.abs(pairC.resistance - 4) > 1e-6) throw new Error("Pair C failed");

  // Case D: I=3, R=4 -> V=12, P=36
  const pairD = calculateOhmsLawCalculator({ activeTab: "ohms_law", current: 3, resistance: 4, knownCurrent: true, knownResistance: true });
  if (Math.abs(pairD.voltage - 12) > 1e-6 || Math.abs(pairD.power - 36) > 1e-6) throw new Error("Pair D failed");

  // Case E: I=3, P=36 -> V=12, R=4
  const pairE = calculateOhmsLawCalculator({ activeTab: "ohms_law", current: 3, power: 36, knownCurrent: true, knownPower: true });
  if (Math.abs(pairE.voltage - 12) > 1e-6 || Math.abs(pairE.resistance - 4) > 1e-6) throw new Error("Pair E failed");

  // Case F: R=4, P=36 -> V=12, I=3
  const pairF = calculateOhmsLawCalculator({ activeTab: "ohms_law", resistance: 4, power: 36, knownResistance: true, knownPower: true });
  if (Math.abs(pairF.voltage - 12) > 1e-6 || Math.abs(pairF.current - 3) > 1e-6) throw new Error("Pair F failed");

  // Loaded Voltage Divider: 12V, R1=10, R2=5, RL=10
  // Rparallel = 5 * 10 / (5 + 10) = 3.333333 Ω
  // Vout = 12 * 3.333333 / (10 + 3.333333) = 3.0 V
  const loadedDiv = calculateOhmsLawCalculator({
    activeTab: "voltage_divider",
    dividerVin: 12,
    dividerR1: 10,
    dividerR2: 5,
    dividerRl: 10
  });
  if (Math.abs((loadedDiv.dividerVout ?? 0) - 3.0) > 1e-4) {
    throw new Error(`Loaded voltage divider test failed: expected 3.0 V, got ${loadedDiv.dividerVout}`);
  }

  // Voltage Divider Edge Cases: R1=0, R2=5 -> Vout = Vin
  const divR1Zero = calculateOhmsLawCalculator({ activeTab: "voltage_divider", dividerVin: 12, dividerR1: 0, dividerR2: 5 });
  if (Math.abs((divR1Zero.dividerVout ?? 0) - 12) > 1e-6) throw new Error("Voltage divider R1=0 failed");

  // Voltage Divider Edge Cases: R2=0, R1=10 -> Vout = 0
  const divR2Zero = calculateOhmsLawCalculator({ activeTab: "voltage_divider", dividerVin: 12, dividerR1: 10, dividerR2: 0 });
  if ((divR2Zero.dividerVout ?? -1) !== 0) throw new Error("Voltage divider R2=0 failed");

  // Current Divider 3 branches: 3A, R1=10, R2=20, R3=30
  // Req = 1 / (1/10 + 1/20 + 1/30) = 1 / (0.1 + 0.05 + 0.033333) = 1 / 0.183333 = 5.454545 Ω
  const curr3 = calculateOhmsLawCalculator({
    activeTab: "current_divider",
    dividerItotal: 3,
    dividerBranchR1: 10,
    dividerBranchR2: 20,
    dividerBranchR3: 30
  });
  const sumI = (curr3.branch1Current ?? 0) + (curr3.branch2Current ?? 0) + (curr3.branch3Current ?? 0);
  if (Math.abs(sumI - 3) > 1e-6) throw new Error(`Current divider 3-branch sum failed: sum=${sumI}`);

  // LED Edge Case: Vs = Vf
  const ledEqual = calculateOhmsLawCalculator({ activeTab: "led_resistor", ledVsource: 2.0, ledVforward: 2.0, ledIforward: 20 });
  if (ledEqual.resistance !== 0 || (ledEqual.ledResistance ?? -1) !== 0) throw new Error("LED Vs=Vf failed");

  // LED Edge Case: Vs < Vf -> error
  const ledUnder = calculateOhmsLawCalculator({ activeTab: "led_resistor", ledVsource: 1.5, ledVforward: 2.0, ledIforward: 20 });
  if (!ledUnder.error) throw new Error("LED Vs<Vf should error");

  // Boundary Zeros: V=0, R>0 -> I=0, P=0
  const zeroVR = calculateOhmsLawCalculator({ activeTab: "ohms_law", voltage: 0, resistance: 10, knownVoltage: true, knownResistance: true });
  if (zeroVR.current !== 0 || zeroVR.power !== 0) throw new Error("V=0, R=10 failed");

  // Boundary Zeros: I=0, V>0 -> open circuit error
  const zeroIV = calculateOhmsLawCalculator({ activeTab: "ohms_law", voltage: 12, current: 0, knownVoltage: true, knownCurrent: true });
  if (!zeroIV.error) throw new Error("V=12, I=0 should error");

  return true;
}

export default runOhmsLawCalculatorTests;
