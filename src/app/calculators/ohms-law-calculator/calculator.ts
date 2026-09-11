import { OhmsLawCalculatorInputs, OhmsLawCalculatorOutputs } from "./types";

// ==========================================
// 1. SI Unit Conversion Normalizers
// ==========================================
export function normalizeVoltage(val: number, unit: string): number {
  const map: Record<string, number> = { "μV": 1e-6, "mV": 1e-3, "V": 1.0, "kV": 1e3, "MV": 1e6 };
  return val * (map[unit] !== undefined ? map[unit] : 1.0);
}

export function normalizeCurrent(val: number, unit: string): number {
  const map: Record<string, number> = { "nA": 1e-9, "μA": 1e-6, "mA": 1e-3, "A": 1.0, "kA": 1e3 };
  return val * (map[unit] !== undefined ? map[unit] : 1.0);
}

export function normalizeResistance(val: number, unit: string): number {
  const map: Record<string, number> = { "μΩ": 1e-6, "mΩ": 1e-3, "Ω": 1.0, "kΩ": 1e3, "MΩ": 1e6, "GΩ": 1e9 };
  return val * (map[unit] !== undefined ? map[unit] : 1.0);
}

export function normalizePower(val: number, unit: string): number {
  const map: Record<string, number> = { "μW": 1e-6, "mW": 1e-3, "W": 1.0, "kW": 1e3, "MW": 1e6 };
  return val * (map[unit] !== undefined ? map[unit] : 1.0);
}

// ==========================================
// Display Value Formatters (Metric prefixes)
// ==========================================
export function formatVoltage(v: number): string {
  if (isNaN(v) || !isFinite(v)) return "Invalid";
  const absV = Math.abs(v);
  if (absV === 0) return "0 V";
  if (absV >= 1e6) return `${(v / 1e6).toFixed(3).replace(/\.?0+$/, "")} MV`;
  if (absV >= 1e3) return `${(v / 1e3).toFixed(3).replace(/\.?0+$/, "")} kV`;
  if (absV < 1e-3) return `${(v * 1e6).toFixed(3).replace(/\.?0+$/, "")} μV`;
  if (absV < 1) return `${(v * 1e3).toFixed(3).replace(/\.?0+$/, "")} mV`;
  return `${v.toFixed(3).replace(/\.?0+$/, "")} V`;
}

export function formatCurrent(i: number): string {
  if (isNaN(i) || !isFinite(i)) return "Invalid";
  const absI = Math.abs(i);
  if (absI === 0) return "0 A";
  if (absI >= 1e3) return `${(i / 1e3).toFixed(3).replace(/\.?0+$/, "")} kA`;
  if (absI < 1e-6) return `${(i * 1e9).toFixed(3).replace(/\.?0+$/, "")} nA`;
  if (absI < 1e-3) return `${(i * 1e6).toFixed(3).replace(/\.?0+$/, "")} μA`;
  if (absI < 1) return `${(i * 1e3).toFixed(3).replace(/\.?0+$/, "")} mA`;
  return `${i.toFixed(3).replace(/\.?0+$/, "")} A`;
}

export function formatResistance(r: number): string {
  if (isNaN(r) || !isFinite(r)) return "Invalid";
  const absR = Math.abs(r);
  if (absR === 0) return "0 Ω";
  if (absR >= 1e9) return `${(r / 1e9).toFixed(3).replace(/\.?0+$/, "")} GΩ`;
  if (absR >= 1e6) return `${(r / 1e6).toFixed(3).replace(/\.?0+$/, "")} MΩ`;
  if (absR >= 1e3) return `${(r / 1e3).toFixed(3).replace(/\.?0+$/, "")} kΩ`;
  if (absR < 1e-3) return `${(r * 1e6).toFixed(3).replace(/\.?0+$/, "")} μΩ`;
  if (absR < 1) return `${(r * 1e3).toFixed(3).replace(/\.?0+$/, "")} mΩ`;
  return `${r.toFixed(3).replace(/\.?0+$/, "")} Ω`;
}

export function formatPower(p: number): string {
  if (isNaN(p) || !isFinite(p)) return "Invalid";
  const absP = Math.abs(p);
  if (absP === 0) return "0 W";
  if (absP >= 1e6) return `${(p / 1e6).toFixed(3).replace(/\.?0+$/, "")} MW`;
  if (absP >= 1e3) return `${(p / 1e3).toFixed(3).replace(/\.?0+$/, "")} kW`;
  if (absP < 1e-3) return `${(p * 1e6).toFixed(3).replace(/\.?0+$/, "")} μW`;
  if (absP < 1) return `${(p * 1e3).toFixed(3).replace(/\.?0+$/, "")} mW`;
  return `${p.toFixed(3).replace(/\.?0+$/, "")} W`;
}

// ==========================================
// E24 Standard Resistor Series Generator
// ==========================================
const E24_BASE_VALUES = [
  1.0, 1.1, 1.2, 1.3, 1.5, 1.6, 1.8, 2.0, 2.2, 2.4, 2.7, 3.0,
  3.3, 3.6, 3.9, 4.3, 4.7, 5.1, 5.6, 6.2, 6.8, 7.5, 8.2, 9.1
];

export function getE24StandardResistors(): number[] {
  const decades = [0.1, 1, 10, 100, 1e3, 1e4, 1e5, 1e6];
  const list: number[] = [];
  for (const dec of decades) {
    for (const b of E24_BASE_VALUES) {
      list.push(Math.round(b * dec * 100) / 100);
    }
  }
  return list.sort((a, b) => a - b);
}

export function findClosestHigherE24(targetR: number): number {
  if (targetR <= 0) return 1.0;
  const list = getE24StandardResistors();
  // Find the smallest E24 resistor that is >= targetR (safety rule for current limiting)
  for (const val of list) {
    if (val >= targetR - 1e-6) {
      return val;
    }
  }
  return list[list.length - 1];
}

// ==========================================
// 2. MAIN ENGINE CALCULATION HANDLER
// ==========================================
export function calculateOhmsLawCalculator(inputs: Record<string, any>): OhmsLawCalculatorOutputs {
  const activeTab = inputs.activeTab || "ohms_law";

  if (activeTab === "voltage_divider") {
    return runVoltageDivider(inputs);
  }
  if (activeTab === "current_divider") {
    return runCurrentDivider(inputs);
  }
  if (activeTab === "led_resistor") {
    return runLedResistor(inputs);
  }

  // DEFAULT TAB: Ohm's Law Core Suite
  return runOhmsLawCore(inputs);
}

// ==========================================
// TAB 1: Ohm's Law Core Calculations
// ==========================================
function runOhmsLawCore(inputs: Record<string, any>): OhmsLawCalculatorOutputs {
  const parseVal = (v: any): number | null => {
    if (v === undefined || v === null || v === "") return null;
    const num = Number(v);
    return isNaN(num) ? null : num;
  };

  const rawV = parseVal(inputs.voltage);
  const rawI = parseVal(inputs.current);
  const rawR = parseVal(inputs.resistance);
  const rawP = parseVal(inputs.power);

  const vUnit = inputs.voltageUnit || "V";
  const iUnit = inputs.currentUnit || "A";
  const rUnit = inputs.resistanceUnit || "Ω";
  const pUnit = inputs.powerUnit || "W";

  // Validate for negative values
  if ((rawV !== null && rawV < 0) || (rawI !== null && rawI < 0) || (rawR !== null && rawR < 0) || (rawP !== null && rawP < 0)) {
    return {
      voltage: 0,
      current: 0,
      resistance: 0,
      power: 0,
      formattedVoltage: "0 V",
      formattedCurrent: "0 A",
      formattedResistance: "0 Ω",
      formattedPower: "0 W",
      error: "Voltage, current, resistance, and power must be non-negative values."
    };
  }

  // Explicit known checkboxes if provided; otherwise check presence
  const isKnownV = inputs.knownVoltage !== undefined ? !!inputs.knownVoltage : (rawV !== null);
  const isKnownI = inputs.knownCurrent !== undefined ? !!inputs.knownCurrent : (rawI !== null);
  const isKnownR = inputs.knownResistance !== undefined ? !!inputs.knownResistance : (rawR !== null);
  const isKnownP = inputs.knownPower !== undefined ? !!inputs.knownPower : (rawP !== null);

  const normV = rawV !== null && isKnownV ? normalizeVoltage(rawV, vUnit) : null;
  const normI = rawI !== null && isKnownI ? normalizeCurrent(rawI, iUnit) : null;
  const normR = rawR !== null && isKnownR ? normalizeResistance(rawR, rUnit) : null;
  const normP = rawP !== null && isKnownP ? normalizePower(rawP, pUnit) : null;

  const knownCount = [isKnownV, isKnownI, isKnownR, isKnownP].filter(Boolean).length;

  if (knownCount < 2) {
    // If fewer than two inputs, check if raw inputs exist; else return explicit guidance
    if (rawV === null && rawR === null && rawI === null && rawP === null) {
      const defV = 12;
      const defR = 4;
      const calcI = defV / defR;
      const calcP = defV * calcI;
      return {
        voltage: defV,
        current: calcI,
        resistance: defR,
        power: calcP,
        formattedVoltage: formatVoltage(defV),
        formattedCurrent: formatCurrent(calcI),
        formattedResistance: formatResistance(defR),
        formattedPower: formatPower(calcP),
        calculationSteps: `Ohm's Law Default Calculation:\n1. Formula: I = V / R = ${defV} / ${defR} = ${calcI} A\n2. Power: P = V × I = ${defV} × ${calcI} = ${calcP} W`
      };
    }
    return {
      voltage: 0,
      current: 0,
      resistance: 0,
      power: 0,
      formattedVoltage: "0 V",
      formattedCurrent: "0 A",
      formattedResistance: "0 Ω",
      formattedPower: "0 W",
      error: "Please specify at least two known parameters to solve the circuit."
    };
  }

  let finalV = 0;
  let finalI = 0;
  let finalR = 0;
  let finalP = 0;
  let steps = "";

  // 1. Solve the 6 possible pairs
  if (isKnownV && isKnownI) {
    finalV = normV!;
    finalI = normI!;

    if (finalI === 0) {
      if (finalV > 0) {
        return {
          voltage: finalV,
          current: 0,
          resistance: 0,
          power: 0,
          formattedVoltage: formatVoltage(finalV),
          formattedCurrent: "0 A",
          formattedResistance: "Undefined",
          formattedPower: "0 W",
          error: "Current cannot be zero with non-zero voltage (open circuit, infinite resistance)."
        };
      } else {
        // V = 0, I = 0
        finalR = 0;
        finalP = 0;
        steps = `Given: V = 0 V, I = 0 A\nResistance is indeterminate (0/0), Power = 0 W.`;
      }
    } else {
      finalR = finalV / finalI;
      finalP = finalV * finalI;
      steps = `Given parameters: Voltage (V) = ${formatVoltage(finalV)}, Current (I) = ${formatCurrent(finalI)}\n` +
        `1. Calculate Resistance: R = V / I = ${finalV} / ${finalI} = ${finalR} Ω (${formatResistance(finalR)})\n` +
        `2. Calculate Power: P = V × I = ${finalV} × ${finalI} = ${finalP} W (${formatPower(finalP)})`;
    }
  } else if (isKnownV && isKnownR) {
    finalV = normV!;
    finalR = normR!;

    if (finalR === 0) {
      if (finalV > 0) {
        return {
          voltage: finalV,
          current: 0,
          resistance: 0,
          power: 0,
          formattedVoltage: formatVoltage(finalV),
          formattedCurrent: "Undefined",
          formattedResistance: "0 Ω",
          formattedPower: "Undefined",
          error: "Resistance cannot be zero for non-zero voltage (short circuit, infinite current)."
        };
      } else {
        // V = 0, R = 0
        finalI = 0;
        finalP = 0;
        steps = `Given: V = 0 V, R = 0 Ω\nCurrent = 0 A, Power = 0 W.`;
      }
    } else {
      finalI = finalV / finalR;
      finalP = Math.pow(finalV, 2) / finalR;
      steps = `Given parameters: Voltage (V) = ${formatVoltage(finalV)}, Resistance (R) = ${formatResistance(finalR)}\n` +
        `1. Calculate Current: I = V / R = ${finalV} / ${finalR} = ${finalI} A (${formatCurrent(finalI)})\n` +
        `2. Calculate Power: P = V² / R = ${finalV}² / ${finalR} = ${finalP} W (${formatPower(finalP)})`;
    }
  } else if (isKnownV && isKnownP) {
    finalV = normV!;
    finalP = normP!;

    if (finalV === 0) {
      if (finalP > 0) {
        return {
          voltage: 0,
          current: 0,
          resistance: 0,
          power: finalP,
          formattedVoltage: "0 V",
          formattedCurrent: "Undefined",
          formattedResistance: "Undefined",
          formattedPower: formatPower(finalP),
          error: "Voltage cannot be zero for non-zero power dissipation."
        };
      } else {
        finalI = 0;
        finalR = 0;
        steps = `Given: V = 0 V, P = 0 W\nCurrent = 0 A, Resistance = 0 Ω.`;
      }
    } else {
      finalI = finalP / finalV;
      finalR = Math.pow(finalV, 2) / finalP;
      steps = `Given parameters: Voltage (V) = ${formatVoltage(finalV)}, Power (P) = ${formatPower(finalP)}\n` +
        `1. Calculate Current: I = P / V = ${finalP} / ${finalV} = ${finalI} A (${formatCurrent(finalI)})\n` +
        `2. Calculate Resistance: R = V² / P = ${finalV}² / ${finalP} = ${finalR} Ω (${formatResistance(finalR)})`;
    }
  } else if (isKnownI && isKnownR) {
    finalI = normI!;
    finalR = normR!;
    finalV = finalI * finalR;
    finalP = Math.pow(finalI, 2) * finalR;
    steps = `Given parameters: Current (I) = ${formatCurrent(finalI)}, Resistance (R) = ${formatResistance(finalR)}\n` +
      `1. Calculate Voltage: V = I × R = ${finalI} × ${finalR} = ${finalV} V (${formatVoltage(finalV)})\n` +
      `2. Calculate Power: P = I² × R = ${finalI}² × ${finalR} = ${finalP} W (${formatPower(finalP)})`;
  } else if (isKnownI && isKnownP) {
    finalI = normI!;
    finalP = normP!;

    if (finalI === 0) {
      if (finalP > 0) {
        return {
          voltage: 0,
          current: 0,
          resistance: 0,
          power: finalP,
          formattedVoltage: "Undefined",
          formattedCurrent: "0 A",
          formattedResistance: "Undefined",
          formattedPower: formatPower(finalP),
          error: "Current cannot be zero for non-zero power dissipation."
        };
      } else {
        finalV = 0;
        finalR = 0;
        steps = `Given: I = 0 A, P = 0 W\nVoltage = 0 V, Resistance = 0 Ω.`;
      }
    } else {
      finalV = finalP / finalI;
      finalR = finalP / Math.pow(finalI, 2);
      steps = `Given parameters: Current (I) = ${formatCurrent(finalI)}, Power (P) = ${formatPower(finalP)}\n` +
        `1. Calculate Voltage: V = P / I = ${finalP} / ${finalI} = ${finalV} V (${formatVoltage(finalV)})\n` +
        `2. Calculate Resistance: R = P / I² = ${finalP} / ${finalI}² = ${finalR} Ω (${formatResistance(finalR)})`;
    }
  } else if (isKnownR && isKnownP) {
    finalR = normR!;
    finalP = normP!;

    if (finalR === 0) {
      if (finalP > 0) {
        return {
          voltage: 0,
          current: 0,
          resistance: 0,
          power: finalP,
          formattedVoltage: "Undefined",
          formattedCurrent: "Undefined",
          formattedResistance: "0 Ω",
          formattedPower: formatPower(finalP),
          error: "Resistance cannot be zero for non-zero power dissipation."
        };
      } else {
        finalV = 0;
        finalI = 0;
        steps = `Given: R = 0 Ω, P = 0 W\nVoltage = 0 V, Current = 0 A.`;
      }
    } else {
      finalV = Math.sqrt(finalP * finalR);
      finalI = Math.sqrt(finalP / finalR);
      steps = `Given parameters: Resistance (R) = ${formatResistance(finalR)}, Power (P) = ${formatPower(finalP)}\n` +
        `1. Calculate Voltage: V = √(P × R) = √(${finalP} × ${finalR}) = ${finalV} V (${formatVoltage(finalV)})\n` +
        `2. Calculate Current: I = √(P / R) = √(${finalP} / ${finalR}) = ${finalI} A (${formatCurrent(finalI)})`;
    }
  }

  // 2. Multi-input consistency checker (if 3 or 4 inputs provided)
  let consistency: "consistent" | "inconsistent" | "pending" = "consistent";
  let inconsistencyMessage = "";

  if (knownCount >= 3) {
    const tol = 0.015; // 1.5% engineering tolerance
    if (isKnownV && normV !== null && Math.abs(finalV - normV) / Math.max(1e-6, normV) > tol) consistency = "inconsistent";
    if (isKnownI && normI !== null && Math.abs(finalI - normI) / Math.max(1e-6, normI) > tol) consistency = "inconsistent";
    if (isKnownR && normR !== null && Math.abs(finalR - normR) / Math.max(1e-6, normR) > tol) consistency = "inconsistent";
    if (isKnownP && normP !== null && Math.abs(finalP - normP) / Math.max(1e-6, normP) > tol) consistency = "inconsistent";

    if (consistency === "inconsistent") {
      const enteredList = [];
      if (isKnownV && normV !== null) enteredList.push(`V_entered = ${formatVoltage(normV)} (expected ${formatVoltage(finalV)})`);
      if (isKnownI && normI !== null) enteredList.push(`I_entered = ${formatCurrent(normI)} (expected ${formatCurrent(finalI)})`);
      if (isKnownR && normR !== null) enteredList.push(`R_entered = ${formatResistance(normR)} (expected ${formatResistance(finalR)})`);
      if (isKnownP && normP !== null) enteredList.push(`P_entered = ${formatPower(normP)} (expected ${formatPower(finalP)})`);

      inconsistencyMessage = `The entered values disagree with Ohm's Law equations:\n` + enteredList.join("\n");
    }
  }

  // 3. Resistor Power Rating Verification
  let powerSafetyMessage = "";
  let isOverloaded = false;

  const safetyMargin = Number(inputs.safetyMargin) > 0 ? Number(inputs.safetyMargin) : 1.5;
  const resistorRating = Number(inputs.resistorRating) || 0;

  if (resistorRating > 0) {
    const minRequiredRating = finalP * safetyMargin;
    if (resistorRating < finalP) {
      isOverloaded = true;
      powerSafetyMessage = `⚠️ CRITICAL: Calculated power dissipation (${formatPower(finalP)}) exceeds the selected resistor wattage rating (${resistorRating} W). Overheating or component failure is highly likely!`;
    } else if (resistorRating < minRequiredRating) {
      powerSafetyMessage = `💡 ADVICE: Resistor rating (${resistorRating} W) is sufficient for raw power, but operates below the recommended design safety factor margin (recommended minimum rating: ${minRequiredRating.toFixed(2)} W based on a ${safetyMargin}x margin).`;
    } else {
      powerSafetyMessage = `✓ SAFE: Selected resistor rating (${resistorRating} W) satisfies the power load and satisfies the safety margin.`;
    }
  }

  return {
    voltage: finalV,
    current: finalI,
    resistance: finalR,
    power: finalP,
    formattedVoltage: formatVoltage(finalV),
    formattedCurrent: formatCurrent(finalI),
    formattedResistance: formatResistance(finalR),
    formattedPower: formatPower(finalP),
    consistency,
    inconsistencyMessage,
    powerSafetyMessage,
    isOverloaded,
    calculationSteps: steps
  };
}

// ==========================================
// TAB 2: Voltage Divider Calculator
// ==========================================
function runVoltageDivider(inputs: Record<string, any>): OhmsLawCalculatorOutputs {
  const vin = Number(inputs.dividerVin);
  const r1 = Number(inputs.dividerR1);
  const r2 = Number(inputs.dividerR2);
  const rawRl = inputs.dividerRl;
  const rl = rawRl !== undefined && rawRl !== null && rawRl !== "" ? Number(rawRl) : null;

  if (isNaN(vin) || isNaN(r1) || isNaN(r2)) {
    return { voltage: 0, current: 0, resistance: 0, power: 0, formattedVoltage: "0 V", formattedCurrent: "0 A", formattedResistance: "0 Ω", formattedPower: "0 W", error: "Please enter valid numeric values for Vin, R1, and R2." };
  }

  if (vin < 0) {
    return { voltage: 0, current: 0, resistance: 0, power: 0, formattedVoltage: "0 V", formattedCurrent: "0 A", formattedResistance: "0 Ω", formattedPower: "0 W", error: "Input voltage must be non-negative." };
  }

  if (r1 < 0 || r2 < 0) {
    return { voltage: 0, current: 0, resistance: 0, power: 0, formattedVoltage: "0 V", formattedCurrent: "0 A", formattedResistance: "0 Ω", formattedPower: "0 W", error: "Resistors R1 and R2 must be non-negative." };
  }

  if (r1 === 0 && r2 === 0) {
    return { voltage: 0, current: 0, resistance: 0, power: 0, formattedVoltage: "0 V", formattedCurrent: "0 A", formattedResistance: "0 Ω", formattedPower: "0 W", error: "Both R1 and R2 cannot be zero (short circuit across supply)." };
  }

  let vout = 0;
  let r2eff = r2;
  let steps = "";

  if (rl !== null && !isNaN(rl)) {
    if (rl < 0) {
      return { voltage: 0, current: 0, resistance: 0, power: 0, formattedVoltage: "0 V", formattedCurrent: "0 A", formattedResistance: "0 Ω", formattedPower: "0 W", error: "Load resistor RL must be non-negative." };
    }
    if (rl === 0) {
      // Short-circuit across R2
      r2eff = 0;
      vout = 0;
      steps = `Voltage Divider calculation with shorted Load Resistor (R_L = 0 Ω):\n` +
        `1. Effective R2 load: R2_eff = 0 Ω\n` +
        `2. V_out = 0 V, Current I = V_in / R1 = ${vin} / ${r1} = ${r1 > 0 ? (vin / r1).toFixed(4) : "Undefined"} A`;
    } else {
      // Parallel combination R2 || RL
      r2eff = (r2 * rl) / (r2 + rl);
      vout = (r1 + r2eff) > 0 ? vin * (r2eff / (r1 + r2eff)) : 0;
      steps = `Voltage Divider calculation with Load Resistor R_L:\n` +
        `1. Inputs: V_in = ${vin} V, R1 = ${r1} Ω, R2 = ${r2} Ω, R_L = ${rl} Ω\n` +
        `2. Calculate effective R2 parallel load: R2_eff = (R2 × R_L) / (R2 + R_L) = (${r2} × ${rl}) / (${r2} + ${rl}) = ${r2eff.toFixed(4)} Ω\n` +
        `3. Calculate output voltage: V_out = V_in × R2_eff / (R1 + R2_eff) = ${vin} × ${r2eff.toFixed(4)} / (${r1} + ${r2eff.toFixed(4)}) = ${vout.toFixed(4)} V`;
    }
  } else {
    // Unloaded standard divider
    vout = (r1 + r2) > 0 ? vin * (r2 / (r1 + r2)) : 0;
    steps = `Standard Voltage Divider calculation (unloaded):\n` +
      `1. Inputs: V_in = ${vin} V, R1 = ${r1} Ω, R2 = ${r2} Ω\n` +
      `2. Calculate output voltage: V_out = V_in × R2 / (R1 + R2) = ${vin} × ${r2} / (${r1} + ${r2}) = ${vout.toFixed(4)} V`;
  }

  const totalR = r1 + r2eff;
  if (totalR === 0) {
    return { voltage: 0, current: 0, resistance: 0, power: 0, formattedVoltage: "0 V", formattedCurrent: "0 A", formattedResistance: "0 Ω", formattedPower: "0 W", error: "Total effective resistance cannot be zero (short circuit across supply)." };
  }

  const dividerI = vin / totalR;
  const p1 = Math.pow(dividerI, 2) * r1;
  const p2 = r2 > 0 ? Math.pow(vout, 2) / r2 : 0;

  steps += `\n4. Branch Current: I = V_in / (R1 + R2_eff) = ${dividerI.toFixed(5)} A (${(dividerI * 1000).toFixed(2)} mA)\n` +
    `5. Power Dissipation: P_R1 = ${p1.toFixed(3)} W | P_R2 = ${p2.toFixed(3)} W`;

  return {
    voltage: vout,
    current: dividerI,
    resistance: totalR,
    power: vin * dividerI,
    formattedVoltage: formatVoltage(vout),
    formattedCurrent: formatCurrent(dividerI),
    formattedResistance: formatResistance(totalR),
    formattedPower: formatPower(vin * dividerI),
    dividerVout: vout,
    dividerCurrent: dividerI,
    dividerR1Power: p1,
    dividerR2Power: p2,
    calculationSteps: steps
  };
}

// ==========================================
// TAB 3: Current Divider Calculator
// ==========================================
function runCurrentDivider(inputs: Record<string, any>): OhmsLawCalculatorOutputs {
  const iTotal = Number(inputs.dividerItotal);
  const r1 = Number(inputs.dividerBranchR1);
  const r2 = Number(inputs.dividerBranchR2);
  const rawR3 = inputs.dividerBranchR3;
  const r3 = rawR3 !== undefined && rawR3 !== null && rawR3 !== "" ? Number(rawR3) : 0;

  if (isNaN(iTotal) || isNaN(r1) || isNaN(r2)) {
    return { voltage: 0, current: 0, resistance: 0, power: 0, formattedVoltage: "0 V", formattedCurrent: "0 A", formattedResistance: "0 Ω", formattedPower: "0 W", error: "Please enter valid numeric values for total current and branch resistances." };
  }

  if (iTotal < 0) {
    return { voltage: 0, current: 0, resistance: 0, power: 0, formattedVoltage: "0 V", formattedCurrent: "0 A", formattedResistance: "0 Ω", formattedPower: "0 W", error: "Total current must be non-negative." };
  }

  if (r1 < 0 || r2 < 0 || (r3 !== 0 && r3 < 0)) {
    return { voltage: 0, current: 0, resistance: 0, power: 0, formattedVoltage: "0 V", formattedCurrent: "0 A", formattedResistance: "0 Ω", formattedPower: "0 W", error: "Branch resistances must be non-negative." };
  }

  // Check for short branches (R = 0)
  const branches = [r1, r2];
  if (r3 > 0 || rawR3 === "0" || rawR3 === 0) branches.push(r3);

  const zeroBranches = branches.filter(r => r === 0).length;
  if (zeroBranches > 0) {
    // Current divides only among 0-ohm short branches; non-zero branches get 0 A
    const iEachShort = iTotal / zeroBranches;
    const i1 = r1 === 0 ? iEachShort : 0;
    const i2 = r2 === 0 ? iEachShort : 0;
    const i3 = branches.length === 3 ? (r3 === 0 ? iEachShort : 0) : undefined;
    const steps = `Current Divider with short circuit branch (0 Ω):\n` +
      `Equivalent parallel resistance Req = 0 Ω, Parallel Voltage Drop = 0 V.\n` +
      `All current passes through the 0 Ω branch(es).`;

    return {
      voltage: 0,
      current: iTotal,
      resistance: 0,
      power: 0,
      formattedVoltage: "0 V",
      formattedCurrent: formatCurrent(iTotal),
      formattedResistance: "0 Ω",
      formattedPower: "0 W",
      branch1Current: i1,
      branch2Current: i2,
      branch3Current: i3,
      calculationSteps: steps
    };
  }

  // Calculate equivalent parallel resistance
  let rEq = 0;
  if (r3 > 0) {
    rEq = 1 / (1 / r1 + 1 / r2 + 1 / r3);
  } else {
    rEq = 1 / (1 / r1 + 1 / r2);
  }

  const vParallel = iTotal * rEq;
  const i1 = vParallel / r1;
  const i2 = vParallel / r2;
  const i3 = r3 > 0 ? vParallel / r3 : 0;

  let steps = `Current Divider Calculation:\n` +
    `1. Inputs: I_total = ${iTotal} A, R1 = ${r1} Ω, R2 = ${r2} Ω${r3 > 0 ? `, R3 = ${r3} Ω` : ""}\n` +
    `2. Equivalent parallel resistance: R_eq = 1 / (1/R1 + 1/R2${r3 > 0 ? " + 1/R3" : ""}) = ${rEq.toFixed(4)} Ω\n` +
    `3. Parallel Voltage Drop: V = I_total × R_eq = ${vParallel.toFixed(4)} V\n` +
    `4. Individual branch currents:\n` +
    `   - Branch 1: I1 = V / R1 = ${i1.toFixed(4)} A (${formatCurrent(i1)})\n` +
    `   - Branch 2: I2 = V / R2 = ${i2.toFixed(4)} A (${formatCurrent(i2)})`;

  if (r3 > 0) {
    steps += `\n   - Branch 3: I3 = V / R3 = ${i3.toFixed(4)} A (${formatCurrent(i3)})`;
  }

  return {
    voltage: vParallel,
    current: iTotal,
    resistance: rEq,
    power: vParallel * iTotal,
    formattedVoltage: formatVoltage(vParallel),
    formattedCurrent: formatCurrent(iTotal),
    formattedResistance: formatResistance(rEq),
    formattedPower: formatPower(vParallel * iTotal),
    branch1Current: i1,
    branch2Current: i2,
    branch3Current: r3 > 0 ? i3 : undefined,
    calculationSteps: steps
  };
}

// ==========================================
// TAB 4: LED Resistor Calculator
// ==========================================
function runLedResistor(inputs: Record<string, any>): OhmsLawCalculatorOutputs {
  const vSource = Number(inputs.ledVsource);
  const vForward = Number(inputs.ledVforward);
  const rawI = inputs.ledIforward;
  const iForwardmA = Number(rawI);

  if (isNaN(vSource) || isNaN(vForward) || isNaN(iForwardmA)) {
    return { voltage: 0, current: 0, resistance: 0, power: 0, formattedVoltage: "0 V", formattedCurrent: "0 A", formattedResistance: "0 Ω", formattedPower: "0 W", error: "Please enter valid numbers for supply voltage, LED forward voltage, and forward current." };
  }

  if (vSource < 0 || vForward < 0) {
    return { voltage: 0, current: 0, resistance: 0, power: 0, formattedVoltage: "0 V", formattedCurrent: "0 A", formattedResistance: "0 Ω", formattedPower: "0 W", error: "Supply voltage and LED forward voltage must be non-negative." };
  }

  if (vSource < vForward) {
    return {
      voltage: 0,
      current: 0,
      resistance: 0,
      power: 0,
      formattedVoltage: "0 V",
      formattedCurrent: "0 A",
      formattedResistance: "0 Ω",
      formattedPower: "0 W",
      error: "Supply voltage (Vs) must be greater than or equal to LED forward voltage (Vf). LED will not conduct when Vs < Vf."
    };
  }

  if (iForwardmA <= 0) {
    return {
      voltage: 0,
      current: 0,
      resistance: 0,
      power: 0,
      formattedVoltage: "0 V",
      formattedCurrent: "0 A",
      formattedResistance: "0 Ω",
      formattedPower: "0 W",
      error: "Desired LED forward current must be strictly greater than 0 mA."
    };
  }

  const iForward = iForwardmA / 1000; // convert mA to Amperes
  const vDrop = vSource - vForward;

  if (vDrop === 0) {
    return {
      voltage: 0,
      current: iForward,
      resistance: 0,
      power: 0,
      formattedVoltage: "0 V",
      formattedCurrent: formatCurrent(iForward),
      formattedResistance: "0 Ω",
      formattedPower: "0 W",
      ledResistance: 0,
      ledPower: 0,
      calculationSteps: `LED Current Limiting Resistor Calculation:\n` +
        `1. Inputs: V_source = ${vSource} V, V_led = ${vForward} V, I_led = ${iForwardmA.toFixed(1)} mA\n` +
        `2. Resistor voltage drop: V_drop = V_source - V_led = 0 V (resistor voltage = 0 V; no resistor drop required)`
    };
  }

  const targetR = vDrop / iForward;
  const pResistor = Math.pow(iForward, 2) * targetR;

  // Closest higher E24 standard resistor (ensures operating current <= desired current)
  const closestStandard = findClosestHigherE24(targetR);

  // Recommended wattage rating (at least 1.5x - 2x margin)
  let recWattage = "1/4 W (0.25 W)";
  if (pResistor > 2.0) recWattage = "5 W or higher";
  else if (pResistor > 1.0) recWattage = "2 W";
  else if (pResistor > 0.5) recWattage = "1 W";
  else if (pResistor > 0.25) recWattage = "1/2 W (0.50 W)";
  else if (pResistor > 0.125) recWattage = "1/4 W (0.25 W)";
  else recWattage = "1/8 W (0.125 W) or 1/4 W";

  const steps = `LED Current Limiting Resistor Calculation:\n` +
    `1. Inputs: V_source = ${vSource} V, V_led = ${vForward} V, I_led = ${iForwardmA.toFixed(1)} mA (${iForward.toFixed(4)} A)\n` +
    `2. Calculate resistor voltage drop: V_drop = V_source - V_led = ${vSource} - ${vForward} = ${vDrop.toFixed(2)} V\n` +
    `3. Calculate target resistance: R = V_drop / I_led = ${vDrop.toFixed(2)} / ${iForward.toFixed(4)} = ${targetR.toFixed(2)} Ω\n` +
    `4. Resistor Power Dissipation: P = I_led² × R = ${iForward.toFixed(4)}² × ${targetR.toFixed(2)} = ${pResistor.toFixed(3)} W\n` +
    `5. Propose Standard Resistor (E24 closest higher safe match): ${closestStandard} Ω\n` +
    `6. Recommended Wattage Rating: ${recWattage} (allows ≥1.5x-2x thermal margin)`;

  return {
    voltage: vDrop,
    current: iForward,
    resistance: targetR,
    power: pResistor,
    formattedVoltage: formatVoltage(vDrop),
    formattedCurrent: formatCurrent(iForward),
    formattedResistance: formatResistance(targetR),
    formattedPower: formatPower(pResistor),
    ledResistance: closestStandard,
    ledPower: pResistor,
    calculationSteps: steps
  };
}
