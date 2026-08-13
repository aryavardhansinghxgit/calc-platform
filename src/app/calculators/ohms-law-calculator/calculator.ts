import { OhmsLawCalculatorInputs, OhmsLawCalculatorOutputs } from "./types";

// ==========================================
// 1. SI Unit Conversion Normalizers
// ==========================================
function normalizeVoltage(val: number, unit: string): number {
  const map: Record<string, number> = { "μV": 1e-6, "mV": 1e-3, "V": 1.0, "kV": 1e3, "MV": 1e6 };
  return val * (map[unit] || 1.0);
}

function normalizeCurrent(val: number, unit: string): number {
  const map: Record<string, number> = { "nA": 1e-9, "μA": 1e-6, "mA": 1e-3, "A": 1.0, "kA": 1e3 };
  return val * (map[unit] || 1.0);
}

function normalizeResistance(val: number, unit: string): number {
  const map: Record<string, number> = { "μΩ": 1e-6, "mΩ": 1e-3, "Ω": 1.0, "kΩ": 1e3, "MΩ": 1e6, "GΩ": 1e9 };
  return val * (map[unit] || 1.0);
}

function normalizePower(val: number, unit: string): number {
  const map: Record<string, number> = { "μW": 1e-6, "mW": 1e-3, "W": 1.0, "kW": 1e3, "MW": 1e6 };
  return val * (map[unit] || 1.0);
}

// ==========================================
// Display Value Formatters (Metric prefixes)
// ==========================================
export function formatVoltage(v: number): string {
  const absV = Math.abs(v);
  if (absV === 0) return "0 V";
  if (absV >= 1e6) return `${(v / 1e6).toFixed(3).replace(/\.?0+$/, "")} MV`;
  if (absV >= 1e3) return `${(v / 1e3).toFixed(3).replace(/\.?0+$/, "")} kV`;
  if (absV < 1e-3) return `${(v * 1e6).toFixed(3).replace(/\.?0+$/, "")} μV`;
  if (absV < 1) return `${(v * 1e3).toFixed(3).replace(/\.?0+$/, "")} mV`;
  return `${v.toFixed(3).replace(/\.?0+$/, "")} V`;
}

export function formatCurrent(i: number): string {
  const absI = Math.abs(i);
  if (absI === 0) return "0 A";
  if (absI >= 1e3) return `${(i / 1e3).toFixed(3).replace(/\.?0+$/, "")} kA`;
  if (absI < 1e-6) return `${(i * 1e9).toFixed(3).replace(/\.?0+$/, "")} nA`;
  if (absI < 1e-3) return `${(i * 1e6).toFixed(3).replace(/\.?0+$/, "")} μA`;
  if (absI < 1) return `${(i * 1e3).toFixed(3).replace(/\.?0+$/, "")} mA`;
  return `${i.toFixed(3).replace(/\.?0+$/, "")} A`;
}

export function formatResistance(r: number): string {
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
  const absP = Math.abs(p);
  if (absP === 0) return "0 W";
  if (absP >= 1e6) return `${(p / 1e6).toFixed(3).replace(/\.?0+$/, "")} MW`;
  if (absP >= 1e3) return `${(p / 1e3).toFixed(3).replace(/\.?0+$/, "")} kW`;
  if (absP < 1e-3) return `${(p * 1e6).toFixed(3).replace(/\.?0+$/, "")} μW`;
  if (absP < 1) return `${(p * 1e3).toFixed(3).replace(/\.?0+$/, "")} mW`;
  return `${p.toFixed(3).replace(/\.?0+$/, "")} W`;
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
  // Backward compatibility check:
  // If inputs has voltage and resistance directly but no active tab config
  const rawV = inputs.voltage !== undefined ? Number(inputs.voltage) : null;
  const rawI = inputs.current !== undefined ? Number(inputs.current) : null;
  const rawR = inputs.resistance !== undefined ? Number(inputs.resistance) : null;
  const rawP = inputs.power !== undefined ? Number(inputs.power) : null;

  const vUnit = inputs.voltageUnit || "V";
  const iUnit = inputs.currentUnit || "A";
  const rUnit = inputs.resistanceUnit || "Ω";
  const pUnit = inputs.powerUnit || "W";

  // Identify which inputs are explicitly marked as "known" (or are defined)
  const isKnownV = inputs.knownVoltage !== undefined ? !!inputs.knownVoltage : (rawV !== null && rawV > 0);
  const isKnownI = inputs.knownCurrent !== undefined ? !!inputs.knownCurrent : (rawI !== null && rawI > 0);
  const isKnownR = inputs.knownResistance !== undefined ? !!inputs.knownResistance : (rawR !== null && rawR > 0);
  const isKnownP = inputs.knownPower !== undefined ? !!inputs.knownPower : (rawP !== null && rawP > 0);

  const normV = rawV !== null && isKnownV ? normalizeVoltage(rawV, vUnit) : null;
  const normI = rawI !== null && isKnownI ? normalizeCurrent(rawI, iUnit) : null;
  const normR = rawR !== null && isKnownR ? normalizeResistance(rawR, rUnit) : null;
  const normP = rawP !== null && isKnownP ? normalizePower(rawP, pUnit) : null;

  // Count active inputs
  const knownCount = [isKnownV, isKnownI, isKnownR, isKnownP].filter(Boolean).length;

  if (knownCount < 2) {
    // If fewer than two inputs are provided, we fallback to defaults for backwards compatibility
    // e.g. voltage=12, resistance=4
    const defV = rawV !== null ? normalizeVoltage(rawV, vUnit) : 12;
    const defR = rawR !== null ? normalizeResistance(rawR, rUnit) : 4;
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

  let finalV = 0;
  let finalI = 0;
  let finalR = 0;
  let finalP = 0;
  let steps = "";

  // Standard combinations mapping (6 options)
  if (isKnownV && isKnownI) {
    finalV = normV!;
    finalI = normI!;
    if (finalI === 0) {
      return { voltage: finalV, current: 0, resistance: 0, power: 0, formattedVoltage: "0 V", formattedCurrent: "0 A", formattedResistance: "0 Ω", formattedPower: "0 W", error: "Current cannot be zero." };
    }
    finalR = finalV / finalI;
    finalP = finalV * finalI;
    steps = `Given parameters: Voltage (V) = ${formatVoltage(finalV)}, Current (I) = ${formatCurrent(finalI)}\n` +
      `1. Calculate Resistance: R = V / I = ${finalV.toFixed(4)} / ${finalI.toFixed(4)} = ${finalR.toFixed(4)} Ω (${formatResistance(finalR)})\n` +
      `2. Calculate Power: P = V × I = ${finalV.toFixed(4)} × ${finalI.toFixed(4)} = ${finalP.toFixed(4)} W (${formatPower(finalP)})`;
  } else if (isKnownV && isKnownR) {
    finalV = normV!;
    finalR = normR!;
    if (finalR === 0) {
      return { voltage: finalV, current: 0, resistance: 0, power: 0, formattedVoltage: "0 V", formattedCurrent: "0 A", formattedResistance: "0 Ω", formattedPower: "0 W", error: "Resistance cannot be zero." };
    }
    finalI = finalV / finalR;
    finalP = Math.pow(finalV, 2) / finalR;
    steps = `Given parameters: Voltage (V) = ${formatVoltage(finalV)}, Resistance (R) = ${formatResistance(finalR)}\n` +
      `1. Calculate Current: I = V / R = ${finalV.toFixed(4)} / ${finalR.toFixed(4)} = ${finalI.toFixed(4)} A (${formatCurrent(finalI)})\n` +
      `2. Calculate Power: P = V² / R = ${finalV.toFixed(4)}² / ${finalR.toFixed(4)} = ${finalP.toFixed(4)} W (${formatPower(finalP)})`;
  } else if (isKnownV && isKnownP) {
    finalV = normV!;
    finalP = normP!;
    if (finalV === 0) {
      return { voltage: 0, current: 0, resistance: 0, power: finalP, formattedVoltage: "0 V", formattedCurrent: "0 A", formattedResistance: "0 Ω", formattedPower: "0 W", error: "Voltage cannot be zero." };
    }
    finalI = finalP / finalV;
    finalR = Math.pow(finalV, 2) / finalP;
    steps = `Given parameters: Voltage (V) = ${formatVoltage(finalV)}, Power (P) = ${formatPower(finalP)}\n` +
      `1. Calculate Current: I = P / V = ${finalP.toFixed(4)} / ${finalV.toFixed(4)} = ${finalI.toFixed(4)} A (${formatCurrent(finalI)})\n` +
      `2. Calculate Resistance: R = V² / P = ${finalV.toFixed(4)}² / ${finalP.toFixed(4)} = ${finalR.toFixed(4)} Ω (${formatResistance(finalR)})`;
  } else if (isKnownI && isKnownR) {
    finalI = normI!;
    finalR = normR!;
    finalV = finalI * finalR;
    finalP = Math.pow(finalI, 2) * finalR;
    steps = `Given parameters: Current (I) = ${formatCurrent(finalI)}, Resistance (R) = ${formatResistance(finalR)}\n` +
      `1. Calculate Voltage: V = I × R = ${finalI.toFixed(4)} × ${finalR.toFixed(4)} = ${finalV.toFixed(4)} V (${formatVoltage(finalV)})\n` +
      `2. Calculate Power: P = I² × R = ${finalI.toFixed(4)}² × ${finalR.toFixed(4)} = ${finalP.toFixed(4)} W (${formatPower(finalP)})`;
  } else if (isKnownI && isKnownP) {
    finalI = normI!;
    finalP = normP!;
    if (finalI === 0) {
      return { voltage: 0, current: 0, resistance: 0, power: finalP, formattedVoltage: "0 V", formattedCurrent: "0 A", formattedResistance: "0 Ω", formattedPower: "0 W", error: "Current cannot be zero." };
    }
    finalV = finalP / finalI;
    finalR = finalP / Math.pow(finalI, 2);
    steps = `Given parameters: Current (I) = ${formatCurrent(finalI)}, Power (P) = ${formatPower(finalP)}\n` +
      `1. Calculate Voltage: V = P / I = ${finalP.toFixed(4)} / ${finalI.toFixed(4)} = ${finalV.toFixed(4)} V (${formatVoltage(finalV)})\n` +
      `2. Calculate Resistance: R = P / I² = ${finalP.toFixed(4)} / ${finalI.toFixed(4)}² = ${finalR.toFixed(4)} Ω (${formatResistance(finalR)})`;
  } else if (isKnownR && isKnownP) {
    finalR = normR!;
    finalP = normP!;
    if (finalR < 0 || finalP < 0) {
      return { voltage: 0, current: 0, resistance: finalR, power: finalP, formattedVoltage: "0 V", formattedCurrent: "0 A", formattedResistance: "0 Ω", formattedPower: "0 W", error: "Resistance and Power must be positive for square root operations." };
    }
    finalV = Math.sqrt(finalP * finalR);
    finalI = Math.sqrt(finalP / finalR);
    steps = `Given parameters: Resistance (R) = ${formatResistance(finalR)}, Power (P) = ${formatPower(finalP)}\n` +
      `1. Calculate Voltage: V = √(P × R) = √(${finalP.toFixed(4)} × ${finalR.toFixed(4)}) = ${finalV.toFixed(4)} V (${formatVoltage(finalV)})\n` +
      `2. Calculate Current: I = √(P / R) = √(${finalP.toFixed(4)} / ${finalR.toFixed(4)}) = ${finalI.toFixed(4)} A (${formatCurrent(finalI)})`;
  }

  // 3. Consistency checker if 3 or 4 values are input
  let consistency: "consistent" | "inconsistent" | "pending" = "consistent";
  let inconsistencyMessage = "";

  if (knownCount >= 3) {
    // We check if the remaining entered values match the computed ones
    if (isKnownV && Math.abs(finalV - normV!) / Math.max(1, normV!) > 0.01) consistency = "inconsistent";
    if (isKnownI && Math.abs(finalI - normI!) / Math.max(1, normI!) > 0.01) consistency = "inconsistent";
    if (isKnownR && Math.abs(finalR - normR!) / Math.max(1, normR!) > 0.01) consistency = "inconsistent";
    if (isKnownP && Math.abs(finalP - normP!) / Math.max(1, normP!) > 0.01) consistency = "inconsistent";

    if (consistency === "inconsistent") {
      const enteredList = [];
      if (isKnownV) enteredList.push(`V_entered = ${formatVoltage(normV!)} (expected ${formatVoltage(finalV)})`);
      if (isKnownI) enteredList.push(`I_entered = ${formatCurrent(normI!)} (expected ${formatCurrent(finalI)})`);
      if (isKnownR) enteredList.push(`R_entered = ${formatResistance(normR!)} (expected ${formatResistance(finalR)})`);
      if (isKnownP) enteredList.push(`P_entered = ${formatPower(normP!)} (expected ${formatPower(finalP)})`);

      inconsistencyMessage = `The entered values disagree with Ohm's Law equations:\n` + enteredList.join("\n");
    }
  }

  // 4. Power Rating Safety Margin advice
  let powerSafetyMessage = "";
  let isOverloaded = false;

  const safetyMargin = Number(inputs.safetyMargin) || 1.5;
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
  const vin = Math.max(0, Number(inputs.dividerVin) || 0);
  const r1 = Math.max(0.001, Number(inputs.dividerR1) || 0);
  const r2 = Math.max(0.001, Number(inputs.dividerR2) || 0);
  const rl = Number(inputs.dividerRl) || 0; // optional load resistance

  if (r1 <= 0 || r2 <= 0) {
    return { voltage: 0, current: 0, resistance: 0, power: 0, formattedVoltage: "0 V", formattedCurrent: "0 A", formattedResistance: "0 Ω", formattedPower: "0 W", error: "Resistors R1 and R2 must be greater than 0." };
  }

  let vout = 0;
  let r2eff = r2;
  let steps = "";

  if (rl > 0) {
    // Parallel combination R2 || RL
    r2eff = 1 / (1 / r2 + 1 / rl);
    vout = vin * (r2eff / (r1 + r2eff));
    steps = `Voltage Divider calculation with Load Resistor R_L:\n` +
      `1. Inputs: V_in = ${vin} V, R1 = ${r1} Ω, R2 = ${r2} Ω, R_L = ${rl} Ω\n` +
      `2. Calculate effective R2 parallel load: R2_eff = (R2 × R_L) / (R2 + R_L) = (${r2} × ${rl}) / (${r2} + ${rl}) = ${r2eff.toFixed(2)} Ω\n` +
      `3. Calculate output voltage: V_out = V_in × R2_eff / (R1 + R2_eff) = ${vin} × ${r2eff.toFixed(2)} / (${r1} + ${r2eff.toFixed(2)}) = ${vout.toFixed(4)} V`;
  } else {
    vout = vin * (r2 / (r1 + r2));
    steps = `Standard Voltage Divider calculation (unloaded):\n` +
      `1. Inputs: V_in = ${vin} V, R1 = ${r1} Ω, R2 = ${r2} Ω\n` +
      `2. Calculate output voltage: V_out = V_in × R2 / (R1 + R2) = ${vin} × ${r2} / (${r1} + ${r2}) = ${vout.toFixed(4)} V`;
  }

  const dividerI = vin / (r1 + r2eff);
  const p1 = Math.pow(dividerI, 2) * r1;
  const p2 = Math.pow(vout, 2) / r2;

  steps += `\n4. Branch Current: I = V_in / (R1 + R2_eff) = ${dividerI.toFixed(5)} A (${(dividerI * 1000).toFixed(2)} mA)\n` +
    `5. Power Dissipation: P_R1 = ${p1.toFixed(3)} W | P_R2 = ${p2.toFixed(3)} W`;

  return {
    voltage: vout,
    current: dividerI,
    resistance: r1 + r2eff,
    power: vin * dividerI,
    formattedVoltage: formatVoltage(vout),
    formattedCurrent: formatCurrent(dividerI),
    formattedResistance: formatResistance(r1 + r2eff),
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
  const iTotal = Math.max(0, Number(inputs.dividerItotal) || 0);
  const r1 = Math.max(0.001, Number(inputs.dividerBranchR1) || 0);
  const r2 = Math.max(0.001, Number(inputs.dividerBranchR2) || 0);
  const r3 = Math.max(0, Number(inputs.dividerBranchR3) || 0); // optional branch

  if (r1 <= 0 || r2 <= 0) {
    return { voltage: 0, current: 0, resistance: 0, power: 0, formattedVoltage: "0 V", formattedCurrent: "0 A", formattedResistance: "0 Ω", formattedPower: "0 W", error: "Resistors R1 and R2 must be greater than 0." };
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
    branch3Current: i3 > 0 ? i3 : undefined,
    calculationSteps: steps
  };
}

// ==========================================
// TAB 4: LED Resistor Calculator
// ==========================================
function runLedResistor(inputs: Record<string, any>): OhmsLawCalculatorOutputs {
  const vSource = Math.max(0.1, Number(inputs.ledVsource) || 0);
  const vForward = Math.max(0.1, Number(inputs.ledVforward) || 0);
  const iForward = Math.max(0.01, Number(inputs.ledIforward) || 0) / 1000; // convert mA to A

  if (vSource <= vForward) {
    return { voltage: 0, current: 0, resistance: 0, power: 0, formattedVoltage: "0 V", formattedCurrent: "0 A", formattedResistance: "0 Ω", formattedPower: "0 W", error: "Source voltage must be strictly greater than LED forward voltage." };
  }

  // R = (Vsource - Vforward) / Iforward
  const targetR = (vSource - vForward) / iForward;
  const pResistor = Math.pow(iForward, 2) * targetR;

  // Find standard resistor values close to targetR (from E24 series)
  const e24Bases = [1.0, 1.1, 1.2, 1.3, 1.5, 1.6, 1.8, 2.0, 2.2, 2.4, 2.7, 3.0, 3.3, 3.6, 3.9, 4.3, 4.7, 5.1, 5.6, 6.2, 6.8, 7.5, 8.2, 9.1];
  const decades = [1, 10, 100, 1000, 10000];
  const standardList: number[] = [];
  for (const dec of decades) {
    for (const b of e24Bases) {
      standardList.push(b * dec);
    }
  }

  let closestStandard = standardList[0];
  let minDiff = Math.abs(closestStandard - targetR);
  for (const val of standardList) {
    const diff = Math.abs(val - targetR);
    if (diff < minDiff) {
      minDiff = diff;
      closestStandard = val;
    }
  }

  // If closest standard is smaller, the LED might draw slightly more current. Propose next higher standard resistor for safety.
  if (closestStandard < targetR) {
    const currentIndex = standardList.indexOf(closestStandard);
    if (currentIndex !== -1 && currentIndex + 1 < standardList.length) {
      closestStandard = standardList[currentIndex + 1];
    }
  }

  const steps = `LED Current Limiting Resistor Calculation:\n` +
    `1. Inputs: V_source = ${vSource} V, V_led = ${vForward} V, I_led = ${(iForward * 1000).toFixed(1)} mA\n` +
    `2. Calculate resistor voltage drop: V_drop = V_source - V_led = ${vSource} - ${vForward} = ${(vSource - vForward).toFixed(2)} V\n` +
    `3. Calculate target resistance: R = V_drop / I_led = ${(vSource - vForward).toFixed(2)} / ${iForward.toFixed(4)} = ${targetR.toFixed(2)} Ω\n` +
    `4. Resistor Power Dissipation: P = I_led² × R = ${iForward.toFixed(4)}² × ${targetR.toFixed(2)} = ${pResistor.toFixed(3)} W\n` +
    `5. Propose Standard Resistor (E24 closest higher match): ${closestStandard} Ω`;

  return {
    voltage: vSource - vForward,
    current: iForward,
    resistance: targetR,
    power: pResistor,
    formattedVoltage: formatVoltage(vSource - vForward),
    formattedCurrent: formatCurrent(iForward),
    formattedResistance: formatResistance(targetR),
    formattedPower: formatPower(pResistor),
    ledResistance: closestStandard,
    ledPower: pResistor,
    calculationSteps: steps
  };
}
