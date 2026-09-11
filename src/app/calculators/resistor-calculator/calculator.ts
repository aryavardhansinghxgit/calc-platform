import { ResistorCalculatorInputs, ResistorCalculatorOutputs, ResistorColor } from "./types";

// ==========================================
// 1. Resistor Color Code Database (IEC 60062)
// ==========================================
export interface BandValue {
  digit: number | null;
  multiplier: number | null;
  tolerance: number | null; // in %
  tempCoeff: number | null; // in ppm/K
  label: string;
}

export const COLOR_DATABASE: Record<ResistorColor, BandValue> = {
  black: { digit: 0, multiplier: 1, tolerance: null, tempCoeff: 250, label: "Black" },
  brown: { digit: 1, multiplier: 10, tolerance: 1, tempCoeff: 100, label: "Brown" },
  red: { digit: 2, multiplier: 100, tolerance: 2, tempCoeff: 50, label: "Red" },
  orange: { digit: 3, multiplier: 1000, tolerance: 0.05, tempCoeff: 15, label: "Orange" },
  yellow: { digit: 4, multiplier: 10000, tolerance: 0.02, tempCoeff: 25, label: "Yellow" },
  green: { digit: 5, multiplier: 100000, tolerance: 0.5, tempCoeff: 20, label: "Green" },
  blue: { digit: 6, multiplier: 1000000, tolerance: 0.25, tempCoeff: 10, label: "Blue" },
  violet: { digit: 7, multiplier: 10000000, tolerance: 0.1, tempCoeff: 5, label: "Violet" },
  gray: { digit: 8, multiplier: 100000000, tolerance: 0.01, tempCoeff: 1, label: "Gray" },
  white: { digit: 9, multiplier: 1000000000, tolerance: null, tempCoeff: null, label: "White" },
  gold: { digit: null, multiplier: 0.1, tolerance: 5, tempCoeff: null, label: "Gold" },
  silver: { digit: null, multiplier: 0.01, tolerance: 10, tempCoeff: null, label: "Silver" },
  none: { digit: null, multiplier: null, tolerance: 20, tempCoeff: null, label: "None" }
};

// List of all valid colors in order of standard representation
export const VALID_COLORS: ResistorColor[] = [
  "black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "gray", "white", "gold", "silver"
];

// ==========================================
// Helper: Resistance Format
// ==========================================
export function formatOhms(ohms: number): string {
  if (isNaN(ohms) || ohms === null || ohms === undefined) return "0 Ω";
  const absVal = Math.abs(ohms);
  if (absVal === 0) return "0 Ω";
  if (absVal >= 1e9) return `${(ohms / 1e9).toFixed(3).replace(/\.?0+$/, "")} GΩ`;
  if (absVal >= 1e6) return `${(ohms / 1e6).toFixed(3).replace(/\.?0+$/, "")} MΩ`;
  if (absVal >= 1e3) return `${(ohms / 1e3).toFixed(3).replace(/\.?0+$/, "")} kΩ`;
  if (absVal < 1) return `${(ohms * 1e3).toFixed(3).replace(/\.?0+$/, "")} mΩ`;
  return `${ohms.toFixed(3).replace(/\.?0+$/, "")} Ω`;
}

// ==========================================
// 2. EIA-96 Standard Significant Figures Table
// ==========================================
export const EIA96_TABLE: Record<string, number> = {
  "01": 100, "02": 102, "03": 105, "04": 107, "05": 110, "06": 113, "07": 115, "08": 118, "09": 121, "10": 124,
  "11": 127, "12": 130, "13": 133, "14": 137, "15": 140, "16": 143, "17": 147, "18": 150, "19": 154, "20": 158,
  "21": 162, "22": 165, "23": 169, "24": 174, "25": 178, "26": 182, "27": 187, "28": 191, "29": 196, "30": 200,
  "31": 205, "32": 210, "33": 215, "34": 221, "35": 226, "36": 232, "37": 237, "38": 243, "39": 249, "40": 255,
  "41": 261, "42": 267, "43": 274, "44": 280, "45": 287, "46": 294, "47": 301, "48": 309, "49": 316, "50": 324,
  "51": 332, "52": 340, "53": 348, "54": 357, "55": 365, "56": 374, "57": 383, "58": 392, "59": 402, "60": 412,
  "61": 422, "62": 432, "63": 442, "64": 453, "65": 464, "66": 475, "67": 487, "68": 499, "69": 511, "70": 523,
  "71": 536, "72": 549, "73": 562, "74": 576, "75": 590, "76": 604, "77": 619, "78": 634, "79": 649, "80": 665,
  "81": 681, "82": 698, "83": 715, "84": 732, "85": 750, "86": 768, "87": 787, "88": 806, "89": 825, "90": 845,
  "91": 866, "92": 887, "93": 909, "94": 931, "95": 953, "96": 976
};

// ==========================================
// 3. E-Series Base Standard Value Arrays & Tolerances (IEC 60063)
// ==========================================
export const E_SERIES_BASES: Record<string, number[]> = {
  E6: [1.0, 1.5, 2.2, 3.3, 4.7, 6.8],
  E12: [1.0, 1.2, 1.5, 1.8, 2.2, 2.7, 3.3, 3.9, 4.7, 5.6, 6.8, 8.2],
  E24: [1.0, 1.1, 1.2, 1.3, 1.5, 1.6, 1.8, 2.0, 2.2, 2.4, 2.7, 3.0, 3.3, 3.6, 3.9, 4.3, 4.7, 5.1, 5.6, 6.2, 6.8, 7.5, 8.2, 9.1],
  E48: [1.0, 1.05, 1.1, 1.15, 1.21, 1.27, 1.33, 1.4, 1.47, 1.54, 1.62, 1.69, 1.78, 1.87, 1.96, 2.05, 2.15, 2.26, 2.37, 2.49, 2.61, 2.74, 2.87, 3.01, 3.16, 3.32, 3.48, 3.65, 3.83, 4.02, 4.22, 4.42, 4.64, 4.87, 5.11, 5.36, 5.62, 5.9, 6.19, 6.49, 6.81, 7.15, 7.5, 7.87, 8.25, 8.66, 9.09, 9.53],
  E96: [1.0, 1.02, 1.05, 1.07, 1.1, 1.13, 1.15, 1.18, 1.21, 1.24, 1.27, 1.3, 1.33, 1.37, 1.4, 1.43, 1.47, 1.5, 1.54, 1.58, 1.62, 1.65, 1.69, 1.74, 1.78, 1.82, 1.87, 1.91, 1.96, 2.0, 2.05, 2.1, 2.15, 2.21, 2.26, 2.32, 2.37, 2.43, 2.49, 2.55, 2.61, 2.67, 2.74, 2.8, 2.87, 2.94, 3.01, 3.09, 3.16, 3.24, 3.32, 3.4, 3.48, 3.57, 3.65, 3.74, 3.83, 3.92, 4.02, 4.12, 4.22, 4.32, 4.42, 4.53, 4.64, 4.75, 4.87, 4.99, 5.11, 5.23, 5.36, 5.49, 5.62, 5.76, 5.9, 6.04, 6.19, 6.34, 6.49, 6.65, 6.81, 6.98, 7.15, 7.32, 7.5, 7.68, 7.87, 8.06, 8.25, 8.45, 8.66, 8.87, 9.09, 9.31, 9.53, 9.76],
  E192: [1.0, 1.01, 1.02, 1.04, 1.05, 1.06, 1.07, 1.09, 1.1, 1.11, 1.13, 1.14, 1.15, 1.17, 1.18, 1.2, 1.21, 1.23, 1.24, 1.26, 1.27, 1.29, 1.3, 1.32, 1.33, 1.35, 1.37, 1.38, 1.4, 1.42, 1.43, 1.45, 1.47, 1.49, 1.5, 1.52, 1.54, 1.56, 1.58, 1.6, 1.62, 1.64, 1.65, 1.67, 1.69, 1.72, 1.74, 1.76, 1.78, 1.8, 1.82, 1.84, 1.87, 1.89, 1.91, 1.93, 1.96, 1.98, 2.0, 2.03, 2.05, 2.08, 2.1, 2.13, 2.15, 2.18, 2.21, 2.23, 2.26, 2.29, 2.32, 2.34, 2.37, 2.4, 2.43, 2.46, 2.49, 2.52, 2.55, 2.58, 2.61, 2.64, 2.67, 2.7, 2.74, 2.77, 2.8, 2.84, 2.87, 2.91, 2.94, 2.98, 3.01, 3.05, 3.09, 3.12, 3.16, 3.2, 3.24, 3.28, 3.32, 3.36, 3.4, 3.44, 3.48, 3.52, 3.57, 3.61, 3.65, 3.7, 3.74, 3.79, 3.83, 3.88, 3.92, 3.97, 4.02, 4.07, 4.12, 4.17, 4.22, 4.27, 4.32, 4.37, 4.42, 4.48, 4.53, 4.59, 4.64, 4.7, 4.75, 4.81, 4.87, 4.93, 4.99, 5.05, 5.11, 5.17, 5.23, 5.3, 5.36, 5.42, 5.49, 5.56, 5.62, 5.69, 5.76, 5.83, 5.9, 5.97, 6.04, 6.12, 6.19, 6.26, 6.34, 6.42, 6.49, 6.57, 6.65, 6.73, 6.81, 6.89, 6.98, 7.06, 7.15, 7.23, 7.32, 7.41, 7.5, 7.59, 7.68, 7.77, 7.87, 7.96, 8.06, 8.16, 8.25, 8.35, 8.45, 8.56, 8.66, 8.76, 8.87, 8.98, 9.09, 9.2, 9.31, 9.42, 9.53, 9.65, 9.76, 9.88]
};

export const E_SERIES_TOLERANCES: Record<string, number> = {
  E6: 20,
  E12: 10,
  E24: 5,
  E48: 2,
  E96: 1,
  E192: 0.5
};

// ==========================================
// 4. Conductor Materials Constants (at 20°C)
// ==========================================
export const MATERIAL_RESISTIVITIES: Record<string, { rho: number; alpha: number; name: string }> = {
  copper: { rho: 1.72e-8, alpha: 0.00393, name: "Copper" },
  aluminum: { rho: 2.82e-8, alpha: 0.00403, name: "Aluminum" },
  silver: { rho: 1.59e-8, alpha: 0.0038, name: "Silver" },
  gold: { rho: 2.44e-8, alpha: 0.0034, name: "Gold" },
  iron: { rho: 1.0e-7, alpha: 0.005, name: "Iron" },
  nickel: { rho: 6.99e-8, alpha: 0.006, name: "Nickel" },
  steel: { rho: 1.43e-7, alpha: 0.003, name: "Steel" },
  carbon: { rho: 3.5e-5, alpha: -0.0005, name: "Carbon" }
};

// ==========================================
// Helper: AWG to Diameter in Meters
// Formula: d_n = 0.127 * 92^((36 - n) / 39) mm
// ==========================================
export function awgToDiameterMeters(awgInput: number | string): number {
  let n: number;
  const s = String(awgInput).trim().toUpperCase();
  if (s === "0000" || s === "4/0") n = -3;
  else if (s === "000" || s === "3/0") n = -2;
  else if (s === "00" || s === "2/0") n = -1;
  else if (s === "0" || s === "1/0") n = 0;
  else {
    n = parseInt(s, 10);
  }
  if (isNaN(n) || n < -3 || n > 40) {
    throw new Error(`Invalid AWG wire gauge: "${awgInput}". Valid range is 0000 (4/0) to 40.`);
  }
  const d_mm = 0.127 * Math.pow(92, (36 - n) / 39);
  return d_mm / 1000;
}

// ==========================================
// 5. MAIN ENGINE CALCULATION HANDLER
// ==========================================
export function calculateResistorCalculator(inputs: Record<string, any>): ResistorCalculatorOutputs {
  const activeTab = inputs.activeTab || "color";

  if (activeTab === "color") {
    return runColorCodeDecoding(inputs);
  }
  if (activeTab === "series_parallel") {
    return runSeriesParallelCalculation(inputs);
  }
  if (activeTab === "conductor") {
    return runConductorResistanceCalculation(inputs);
  }
  if (activeTab === "smd") {
    return runSmdDecoder(inputs);
  }
  if (activeTab === "finder") {
    return runCombinationFinder(inputs);
  }

  return { resistanceOhms: 0, formattedValue: "0 Ω", error: "Invalid active tab selection." };
}

// ==========================================
// TAB 1: Color Code Decoding (Two-Way)
// ==========================================
export function runColorCodeDecoding(inputs: Record<string, any>): ResistorCalculatorOutputs {
  const isReverse = !!inputs.reverseMode;

  // REVERSE CONVERSION: Resistance -> Color Bands
  if (isReverse) {
    const rawTarget = inputs.targetResistance;
    if (rawTarget === undefined || rawTarget === null || rawTarget === "") {
      return { resistanceOhms: 0, formattedValue: "0 Ω", error: "Please enter target resistance." };
    }
    const targetVal = Number(rawTarget);
    if (isNaN(targetVal) || targetVal <= 0) {
      return { resistanceOhms: 0, formattedValue: "0 Ω", error: "Target resistance value must be greater than 0." };
    }

    const unit = inputs.targetResistanceUnit || "Ω";
    const rawTol = inputs.targetTolerance;
    const targetTol = rawTol !== undefined && rawTol !== "" ? Number(rawTol) : 5;
    if (isNaN(targetTol) || targetTol <= 0) {
      return { resistanceOhms: 0, formattedValue: "0 Ω", error: "Target tolerance must be greater than 0%." };
    }

    const rawTemp = inputs.targetTempCoeff;
    const targetTemp = rawTemp !== undefined && rawTemp !== "" ? Number(rawTemp) : 100;
    const bandCount = Number(inputs.bandCount) || 4;

    // Convert target input to absolute ohms
    let absoluteOhms = targetVal;
    if (unit === "mΩ") absoluteOhms = targetVal / 1000;
    if (unit === "kΩ") absoluteOhms = targetVal * 1000;
    if (unit === "MΩ") absoluteOhms = targetVal * 1000000;
    if (unit === "GΩ") absoluteOhms = targetVal * 1000000000;

    const digitsCount = bandCount === 4 ? 2 : 3;
    const exponent = Math.floor(Math.log10(absoluteOhms));
    const multiplierPow = Math.pow(10, exponent - (digitsCount - 1));

    let sigFigs = Math.round(absoluteOhms / multiplierPow);
    let finalMultiplier = multiplierPow;

    if (sigFigs >= Math.pow(10, digitsCount)) {
      sigFigs = Math.round(sigFigs / 10);
      finalMultiplier *= 10;
    }
    if (sigFigs < Math.pow(10, digitsCount - 1)) {
      sigFigs *= 10;
      finalMultiplier /= 10;
    }

    const digitsStr = String(sigFigs).padStart(digitsCount, "0");
    const bands: ResistorColor[] = [];
    for (const char of digitsStr) {
      const idx = Number(char);
      const color = Object.keys(COLOR_DATABASE).find(k => COLOR_DATABASE[k as ResistorColor].digit === idx) as ResistorColor;
      bands.push(color || "black");
    }

    // Find closest multiplier color
    const multColor = Object.keys(COLOR_DATABASE).find(k => {
      const val = COLOR_DATABASE[k as ResistorColor].multiplier;
      return val !== null && Math.abs(val - finalMultiplier) < 0.001 * Math.max(val, 0.001);
    }) as ResistorColor || "black";
    bands.push(multColor);

    // Find closest tolerance color
    const tolColor = Object.keys(COLOR_DATABASE).find(k => {
      const val = COLOR_DATABASE[k as ResistorColor].tolerance;
      return val !== null && Math.abs(val - targetTol) < 0.01;
    }) as ResistorColor || "gold";
    bands.push(tolColor);

    // If 6-band, find temperature coefficient color
    if (bandCount === 6) {
      const tempColor = Object.keys(COLOR_DATABASE).find(k => {
        const val = COLOR_DATABASE[k as ResistorColor].tempCoeff;
        return val !== null && Math.abs(val - targetTemp) < 5;
      }) as ResistorColor || "brown";
      bands.push(tempColor);
    }

    const finalOhms = Number(digitsStr) * finalMultiplier;
    const toleranceVal = COLOR_DATABASE[tolColor]?.tolerance ?? 5;
    const minVal = finalOhms * (1 - toleranceVal / 100);
    const maxVal = finalOhms * (1 + toleranceVal / 100);

    const steps = `Reverse Calculation Steps:\n` +
      `1. Target Input: ${targetVal} ${unit} (Equivalent absolute ohms: ${absoluteOhms} Ω)\n` +
      `2. Significant Figures count for ${bandCount}-band resistor = ${digitsCount} digits\n` +
      `3. Calculated digits: ${digitsStr} | Multiplier: ×${finalMultiplier}\n` +
      `4. Mapped colors: [${bands.map(b => COLOR_DATABASE[b].label).join(" - ")}]\n` +
      `5. Tolerance: ±${toleranceVal}%\n` +
      `6. Temp Coefficient: ${bandCount === 6 ? (COLOR_DATABASE[bands[5]]?.tempCoeff || 100) + " ppm/K" : "N/A"}`;

    return {
      resistanceOhms: finalOhms,
      formattedValue: formatOhms(finalOhms),
      minOhms: minVal,
      maxOhms: maxVal,
      tolerancePct: toleranceVal,
      tempCoeffPpm: bandCount === 6 ? COLOR_DATABASE[bands[5]]?.tempCoeff || undefined : undefined,
      bands,
      calculationSteps: steps
    };
  }

  // STANDARD CONVERSION: Colors -> Resistance
  const bandCount = Number(inputs.bandCount) || 4;

  const mapDigit = (val: any, fallback: ResistorColor): ResistorColor => {
    if (val === undefined || val === null) return fallback;
    const s = String(val).toLowerCase();
    const digitMap: Record<string, ResistorColor> = {
      "0": "black", "1": "brown", "2": "red", "3": "orange", "4": "yellow",
      "5": "green", "6": "blue", "7": "violet", "8": "gray", "9": "white"
    };
    return digitMap[s] || (Object.keys(COLOR_DATABASE).includes(s) ? (s as ResistorColor) : fallback);
  };

  const mapMult = (val: any, fallback: ResistorColor): ResistorColor => {
    if (val === undefined || val === null) return fallback;
    const s = String(val).toLowerCase();
    const multMap: Record<string, ResistorColor> = {
      "1": "black", "10": "brown", "100": "red", "1000": "orange", "10000": "yellow",
      "100000": "green", "1000000": "blue", "10000000": "violet", "100000000": "gray",
      "1000000000": "white", "0.1": "gold", "0.01": "silver"
    };
    return multMap[s] || (Object.keys(COLOR_DATABASE).includes(s) ? (s as ResistorColor) : fallback);
  };

  const b1 = mapDigit(inputs.band1, "brown");
  const b2 = mapDigit(inputs.band2, "black");
  const b3 = mapDigit(inputs.band3, "black");
  const mult = mapMult(inputs.multiplier, "red");
  const tol = Object.keys(COLOR_DATABASE).includes(String(inputs.tolerance).toLowerCase()) 
    ? (String(inputs.tolerance).toLowerCase() as ResistorColor) 
    : "gold";
  const temp = Object.keys(COLOR_DATABASE).includes(String(inputs.tempCoeff).toLowerCase()) 
    ? (String(inputs.tempCoeff).toLowerCase() as ResistorColor) 
    : "brown";

  const v1 = COLOR_DATABASE[b1];
  const v2 = COLOR_DATABASE[b2];
  const v3 = COLOR_DATABASE[b3];
  const vMult = COLOR_DATABASE[mult];
  const vTol = COLOR_DATABASE[tol];
  const vTemp = COLOR_DATABASE[temp];

  if (!v1 || v1.digit === null || !v2 || v2.digit === null) {
    return { resistanceOhms: 0, formattedValue: "0 Ω", error: "Digit bands cannot be multiplier or tolerance colors." };
  }
  if (!vMult || vMult.multiplier === null) {
    return { resistanceOhms: 0, formattedValue: "0 Ω", error: "Multiplier band color is invalid." };
  }

  let sigFigs = 0;
  let steps = "";

  if (bandCount === 4) {
    sigFigs = v1.digit * 10 + v2.digit;
    steps = `Calculation Steps for 4-Band Resistor:\n` +
      `1. Significant Digits: Band 1 (${v1.label}) = ${v1.digit}, Band 2 (${v2.label}) = ${v2.digit} -> Value = ${sigFigs}\n` +
      `2. Multiplier: Band 3 (${vMult.label}) = ×${vMult.multiplier}\n` +
      `3. Calculation: ${sigFigs} × ${vMult.multiplier} = ${sigFigs * vMult.multiplier} Ω\n`;
  } else {
    if (!v3 || v3.digit === null) {
      return { resistanceOhms: 0, formattedValue: "0 Ω", error: "3rd Band (Digit 3) color is invalid." };
    }
    sigFigs = v1.digit * 100 + v2.digit * 10 + v3.digit;
    steps = `Calculation Steps for ${bandCount}-Band Resistor:\n` +
      `1. Significant Digits: Band 1 (${v1.label}) = ${v1.digit}, Band 2 (${v2.label}) = ${v2.digit}, Band 3 (${v3.label}) = ${v3.digit} -> Value = ${sigFigs}\n` +
      `2. Multiplier: Band 4 (${vMult.label}) = ×${vMult.multiplier}\n` +
      `3. Calculation: ${sigFigs} × ${vMult.multiplier} = ${sigFigs * vMult.multiplier} Ω\n`;
  }

  const ohms = sigFigs * vMult.multiplier;
  const toleranceVal = vTol?.tolerance !== null && vTol?.tolerance !== undefined ? vTol.tolerance : 20;
  const minVal = ohms * (1 - toleranceVal / 100);
  const maxVal = ohms * (1 + toleranceVal / 100);

  steps += `4. Tolerance: Band ${bandCount === 4 ? 4 : 5} (${vTol?.label || "None"}) = ±${toleranceVal}%\n` +
    `5. Limits: Minimum Value = ${formatOhms(minVal)}, Maximum Value = ${formatOhms(maxVal)}`;

  if (bandCount === 6 && vTemp?.tempCoeff !== null && vTemp?.tempCoeff !== undefined) {
    steps += `\n6. Temperature Coefficient: Band 6 (${vTemp.label}) = ${vTemp.tempCoeff} ppm/K`;
  }

  const outputBands = bandCount === 4 
    ? [b1, b2, mult, tol]
    : (bandCount === 5 ? [b1, b2, b3, mult, tol] : [b1, b2, b3, mult, tol, temp]);

  return {
    resistanceOhms: ohms,
    formattedValue: formatOhms(ohms),
    minOhms: minVal,
    maxOhms: maxVal,
    tolerancePct: toleranceVal,
    tempCoeffPpm: bandCount === 6 ? vTemp?.tempCoeff || undefined : undefined,
    bands: outputBands as ResistorColor[],
    calculationSteps: steps
  };
}

// ==========================================
// TAB 2: Series / Parallel Networks
// ==========================================
export interface ParsedResistor {
  value: number;
  tolerance: number;
}

export function runSeriesParallelCalculation(inputs: Record<string, any>): ResistorCalculatorOutputs {
  const rawString = String(inputs.resistorValuesString ?? "").trim();
  const isParallel = !!inputs.parallelMode;

  // Explicit supply voltage check without silent clamping
  const rawV = inputs.supplyVoltage;
  let supplyV = 0;
  if (rawV !== undefined && rawV !== null && rawV !== "") {
    supplyV = Number(rawV);
    if (isNaN(supplyV)) {
      return { resistanceOhms: 0, formattedValue: "0 Ω", error: "Supply voltage must be a valid number." };
    }
    if (supplyV < 0) {
      return { resistanceOhms: 0, formattedValue: "0 Ω", error: "Supply voltage cannot be negative." };
    }
  }

  if (!rawString) {
    return { resistanceOhms: 0, formattedValue: "0 Ω", error: "Please enter at least one resistor value." };
  }

  const parts = rawString.split(/[,\n\r]+/).map(s => s.trim()).filter(Boolean);
  if (parts.length === 0) {
    return { resistanceOhms: 0, formattedValue: "0 Ω", error: "Please enter at least one resistor value." };
  }

  const parsedList: ParsedResistor[] = [];
  for (const part of parts) {
    let text = part;
    let tol = 5; // default 5%
    if (part.includes("@")) {
      const splitTol = part.split("@");
      text = splitTol[0].trim();
      const parsedTol = parseFloat(splitTol[1]);
      if (isNaN(parsedTol) || parsedTol < 0) {
        return { resistanceOhms: 0, formattedValue: "0 Ω", error: `Invalid tolerance specified in: "${part}"` };
      }
      tol = parsedTol;
    }

    // Check for negative sign directly
    if (text.startsWith("-")) {
      return { resistanceOhms: 0, formattedValue: "0 Ω", error: `Resistance values cannot be negative: "${part}"` };
    }

    // Check R-notation inside network inputs, e.g. 4R7, 10R, 2K2, 1M0
    const rMatch = text.match(/^([0-9]*)([RKM])([0-9]*)$/i);
    let ohms: number;

    if (rMatch && (rMatch[1] || rMatch[3])) {
      const char = rMatch[2].toUpperCase();
      const left = rMatch[1] || "0";
      const right = rMatch[3] || "";
      const val = parseFloat(`${left}.${right}`);
      if (isNaN(val) || val < 0) {
        return { resistanceOhms: 0, formattedValue: "0 Ω", error: `Invalid entry value: "${part}"` };
      }
      let mult = 1;
      if (char === "K") mult = 1e3;
      if (char === "M") mult = 1e6;
      ohms = val * mult;
    } else {
      const match = text.match(/^([0-9.]+)\s*([a-zA-ZΩ]*)$/);
      if (!match) {
        return { resistanceOhms: 0, formattedValue: "0 Ω", error: `Invalid entry value: "${part}"` };
      }

      const val = parseFloat(match[1]);
      if (isNaN(val) || val < 0) {
        return { resistanceOhms: 0, formattedValue: "0 Ω", error: `Invalid resistance number in: "${part}"` };
      }

      const originalUnit = match[2];
      let multiplier = 1;

      if (originalUnit.includes("M") || originalUnit.toLowerCase().startsWith("meg")) {
        multiplier = 1e6;
      } else if (originalUnit.toLowerCase().startsWith("k")) {
        multiplier = 1000;
      } else if (originalUnit.toLowerCase().startsWith("g")) {
        multiplier = 1e9;
      } else if (originalUnit.toLowerCase() === "m" || originalUnit.toLowerCase() === "mω") {
        multiplier = 0.001; // milli-ohms
      }

      ohms = val * multiplier;
    }

    parsedList.push({ value: ohms, tolerance: tol });
  }

  let totalOhms = 0;
  let minOhms = 0;
  let maxOhms = 0;
  let steps = "";

  if (!isParallel) {
    // Series: R_total = sum(R_i)
    totalOhms = parsedList.reduce((acc, r) => acc + r.value, 0);
    minOhms = parsedList.reduce((acc, r) => acc + r.value * (1 - r.tolerance / 100), 0);
    maxOhms = parsedList.reduce((acc, r) => acc + r.value * (1 + r.tolerance / 100), 0);

    steps = `Series Resistors Configuration:\n` +
      `Formula: R_total = R_1 + R_2 + ... + R_n\n\n` +
      parsedList.map((r, i) => `  Resistor ${i + 1}: ${formatOhms(r.value)} (±${r.tolerance}%)`).join("\n") +
      `\n\nCalculated Equivalent: R_total = ${parsedList.map(r => formatOhms(r.value)).join(" + ")} = ${formatOhms(totalOhms)}\n` +
      `Tolerance bounds: Minimum = ${formatOhms(minOhms)} | Maximum = ${formatOhms(maxOhms)}`;
  } else {
    // Parallel: 1/R_total = sum(1/R_i)
    // Check if any resistor is ideal zero ohms (short-circuit)
    const hasZero = parsedList.some(r => r.value === 0);
    if (hasZero) {
      totalOhms = 0;
      minOhms = 0;
      maxOhms = 0;
      steps = `Parallel Resistors Configuration:\n` +
        `Formula: 1/R_total = 1/R_1 + 1/R_2 + ... + 1/R_n\n\n` +
        parsedList.map((r, i) => `  Branch ${i + 1}: ${formatOhms(r.value)} (±${r.tolerance}%)`).join("\n") +
        `\n\nNotice: Circuit contains a 0 Ω branch (ideal short-circuit). In parallel, a 0 Ω short-circuit forces the entire equivalent resistance to R_total = 0 Ω.`;
    } else {
      let sumReciprocals = 0;
      let sumMinReciprocals = 0;
      let sumMaxReciprocals = 0;

      for (const r of parsedList) {
        sumReciprocals += 1 / r.value;
        sumMinReciprocals += 1 / (r.value * (1 - r.tolerance / 100));
        sumMaxReciprocals += 1 / (r.value * (1 + r.tolerance / 100));
      }

      totalOhms = 1 / sumReciprocals;
      minOhms = 1 / sumMinReciprocals;
      maxOhms = 1 / sumMaxReciprocals;

      steps = `Parallel Resistors Configuration:\n` +
        `Formula: 1/R_total = 1/R_1 + 1/R_2 + ... + 1/R_n\n\n` +
        parsedList.map((r, i) => `  Resistor ${i + 1}: ${formatOhms(r.value)} (±${r.tolerance}%)`).join("\n") +
        `\n\nCalculated Equivalent: R_total = 1 / (${parsedList.map(r => `(1 / ${formatOhms(r.value)})`).join(" + ")}) = ${formatOhms(totalOhms)}\n` +
        `Tolerance bounds: Minimum = ${formatOhms(minOhms)} | Maximum = ${formatOhms(maxOhms)}`;
    }
  }

  // Ohm's law checks if voltage is active
  if (supplyV > 0) {
    if (totalOhms === 0) {
      steps += `\n\nOhm's Law Analysis (V_source = ${supplyV} V):\n` +
        `Short-circuit condition: Connected supply voltage across 0 Ω implies theoretically infinite current (short circuit).`;
    } else {
      const totalCurrent = supplyV / totalOhms;
      const totalPower = supplyV * totalCurrent;
      steps += `\n\nOhm's Law Analysis (V_source = ${supplyV} V):\n` +
        `1. Total Current (I_total) = V / R_total = ${supplyV} / ${totalOhms.toFixed(4)} = ${totalCurrent.toFixed(5)} A (${(totalCurrent * 1000).toFixed(2)} mA)\n` +
        `2. Total Power (P_total) = V × I_total = ${totalPower.toFixed(4)} W`;

      if (isParallel) {
        steps += `\n3. Branch Current breakdown:\n` +
          parsedList.map((r, i) => {
            const iBranch = supplyV / r.value;
            const pBranch = supplyV * iBranch;
            return `   - Branch ${i + 1} (${formatOhms(r.value)}): I = ${iBranch.toFixed(4)} A, P = ${pBranch.toFixed(3)} W`;
          }).join("\n");
      } else {
        steps += `\n3. Resistor Voltage drops breakdown:\n` +
          parsedList.map((r, i) => {
            const vDrop = totalCurrent * r.value;
            const pRes = vDrop * totalCurrent;
            return `   - Resistor ${i + 1} (${formatOhms(r.value)}): V_drop = ${vDrop.toFixed(3)} V, P = ${pRes.toFixed(3)} W`;
          }).join("\n");
      }
    }
  }

  const tolPct = totalOhms > 0 ? Number(((maxOhms - totalOhms) / totalOhms * 100).toFixed(2)) : 0;

  return {
    resistanceOhms: totalOhms,
    formattedValue: formatOhms(totalOhms),
    minOhms,
    maxOhms,
    tolerancePct: tolPct,
    calculationSteps: steps
  };
}

// ==========================================
// TAB 3: Conductor Resistance
// ==========================================
export function runConductorResistanceCalculation(inputs: Record<string, any>): ResistorCalculatorOutputs {
  const rawLen = inputs.conductorLength;
  if (rawLen === undefined || rawLen === null || rawLen === "") {
    return { resistanceOhms: 0, formattedValue: "0 Ω", error: "Please enter conductor length." };
  }
  const len = Number(rawLen);
  if (isNaN(len) || len <= 0) {
    return { resistanceOhms: 0, formattedValue: "0 Ω", error: "Conductor length must be greater than 0." };
  }

  const lenUnit = inputs.conductorLengthUnit || "m";
  const sizeType = inputs.conductorSizeInputType || "diameter";
  const diamUnit = inputs.conductorDiameterUnit || "mm";
  const areaUnit = inputs.conductorAreaUnit || "mm²";
  const matKey = String(inputs.conductorMaterial || "copper").toLowerCase();

  const rawTemp = inputs.conductorTemp;
  const temp = rawTemp !== undefined && rawTemp !== "" ? Number(rawTemp) : 20;
  if (isNaN(temp)) {
    return { resistanceOhms: 0, formattedValue: "0 Ω", error: "Operating temperature must be a valid number." };
  }

  // Convert length to meters
  let lMeters = len;
  if (lenUnit === "mm") lMeters = len / 1000;
  else if (lenUnit === "cm") lMeters = len / 100;
  else if (lenUnit === "km") lMeters = len * 1000;
  else if (lenUnit === "in") lMeters = len * 0.0254;
  else if (lenUnit === "ft") lMeters = len * 0.3048;
  else if (lenUnit === "yd") lMeters = len * 0.9144;
  else if (lenUnit === "mile") lMeters = len * 1609.34;

  let areaM2 = 0;
  let sizeLabel = "";

  if (sizeType === "diameter") {
    const rawDiam = inputs.conductorDiameter;
    if (rawDiam === undefined || rawDiam === null || rawDiam === "") {
      return { resistanceOhms: 0, formattedValue: "0 Ω", error: "Please enter wire diameter." };
    }
    const diam = Number(rawDiam);
    if (isNaN(diam) || diam <= 0) {
      return { resistanceOhms: 0, formattedValue: "0 Ω", error: "Wire diameter must be greater than 0." };
    }

    let dMeters = diam;
    if (diamUnit === "mm") dMeters = diam / 1000;
    else if (diamUnit === "cm") dMeters = diam / 100;
    else if (diamUnit === "in") dMeters = diam * 0.0254;

    areaM2 = Math.PI * Math.pow(dMeters / 2, 2);
    sizeLabel = `Diameter: ${diam} ${diamUnit} (d = ${dMeters} m) -> Area = π × (d/2)² = ${areaM2.toExponential(5)} m²`;
  } else if (sizeType === "awg") {
    const awgVal = inputs.conductorAwg !== undefined && inputs.conductorAwg !== "" ? inputs.conductorAwg : 14;
    try {
      const dMeters = awgToDiameterMeters(awgVal);
      areaM2 = Math.PI * Math.pow(dMeters / 2, 2);
      sizeLabel = `AWG ${awgVal} (Diameter = ${(dMeters * 1000).toFixed(4)} mm) -> Area = ${areaM2.toExponential(5)} m²`;
    } catch (err: any) {
      return { resistanceOhms: 0, formattedValue: "0 Ω", error: err.message };
    }
  } else {
    const rawArea = inputs.conductorArea;
    if (rawArea === undefined || rawArea === null || rawArea === "") {
      return { resistanceOhms: 0, formattedValue: "0 Ω", error: "Please enter cross-sectional area." };
    }
    const area = Number(rawArea);
    if (isNaN(area) || area <= 0) {
      return { resistanceOhms: 0, formattedValue: "0 Ω", error: "Cross-sectional area must be greater than 0." };
    }

    if (areaUnit === "mm²") areaM2 = area * 1e-6;
    else if (areaUnit === "cm²") areaM2 = area * 1e-4;
    else if (areaUnit === "in²") areaM2 = area * 0.00064516;

    sizeLabel = `Area: ${area} ${areaUnit} = ${areaM2.toExponential(5)} m²`;
  }

  let mat = MATERIAL_RESISTIVITIES[matKey];
  if (!mat) {
    mat = MATERIAL_RESISTIVITIES["copper"];
  }

  // Resistance at 20°C: R = rho * L / A
  const r20 = mat.rho * lMeters / areaM2;

  // Resistance corrected for temperature: R(T) = R20 * [1 + alpha * (T - 20)]
  const rT = r20 * (1 + mat.alpha * (temp - 20));

  const steps = `Conductor Resistance Analysis:\n` +
    `1. Conductor Material: ${mat.name} (Resistivity ρ_20 = ${mat.rho.toExponential(2)} Ω·m, Temp Coeff α = ${mat.alpha}/°C)\n` +
    `2. Normalized Length: ${len} ${lenUnit} = ${lMeters.toFixed(4)} meters\n` +
    `3. Cross-sectional Area: ${sizeLabel}\n` +
    `4. Resistance at 20°C: R_20 = ρ × L / A = ${r20.toFixed(4)} Ω\n` +
    `5. Temperature Correction (at ${temp}°C): R(T) = R_20 × [1 + α × (T - 20)]\n` +
    `   R(${temp}°C) = ${r20.toFixed(5)} × [1 + ${mat.alpha} × (${temp} - 20)] = ${rT.toFixed(5)} Ω`;

  return {
    resistanceOhms: rT,
    formattedValue: formatOhms(rT),
    calculationSteps: steps
  };
}

// ==========================================
// TAB 4: SMD Resistor Decoder
// ==========================================
export function runSmdDecoder(inputs: Record<string, any>): ResistorCalculatorOutputs {
  const rawCode = String(inputs.smdCode || "").trim().toUpperCase();
  if (!rawCode) {
    return { resistanceOhms: 0, formattedValue: "0 Ω", error: "Please enter an SMD code." };
  }

  let ohms = 0;
  let steps = "";
  let toleranceVal = 5;

  const rDecimalMatch = rawCode.match(/^([0-9]*)([RKM])([0-9]*)$/);
  const threeDigitMatch = rawCode.match(/^([0-9]{3})$/);
  const fourDigitMatch = rawCode.match(/^([0-9]{4})$/);
  const eia96Match = rawCode.match(/^([0-9]{2})([A-FYXSRZH])$/);

  if (rDecimalMatch && (rDecimalMatch[1] || rDecimalMatch[3])) {
    const char = rDecimalMatch[2];
    const left = rDecimalMatch[1] || "0";
    const right = rDecimalMatch[3] || "";
    const combinedStr = `${left}.${right}`;
    const parsedVal = parseFloat(combinedStr);
    
    let multiplier = 1;
    if (char === "K") multiplier = 1000;
    if (char === "M") multiplier = 1e6;

    ohms = parsedVal * multiplier;
    toleranceVal = 5;

    steps = `SMD Decimal (R/K/M) Notation Decoder:\n` +
      `Code: ${rawCode}\n` +
      `Decimal character '${char}' acts as decimal point and indicates base multiplier (R = ×1, K = ×1,000, M = ×1,000,000).\n` +
      `Decoded resistance: ${combinedStr.replace(/\.$/, "")} × ${multiplier} = ${formatOhms(ohms)} (±5%)`;
  } else if (threeDigitMatch) {
    if (rawCode === "000") {
      ohms = 0;
      steps = `SMD 3-Digit Code '000': Standard zero-ohm jumper (0 Ω).`;
    } else {
      const d1 = Number(rawCode[0]);
      const d2 = Number(rawCode[1]);
      const exp = Number(rawCode[2]);
      ohms = (d1 * 10 + d2) * Math.pow(10, exp);
      toleranceVal = 5;

      steps = `SMD 3-Digit Standard Code Decoder:\n` +
        `Code: ${rawCode}\n` +
        `1. Significant digits: ${d1}${d2}\n` +
        `2. Multiplier: 10^${exp} = ×${Math.pow(10, exp)}\n` +
        `3. Calculation: ${d1 * 10 + d2} × ${Math.pow(10, exp)} = ${ohms} Ω (${formatOhms(ohms)} ±5%)`;
    }
  } else if (fourDigitMatch) {
    if (rawCode === "0000") {
      ohms = 0;
      steps = `SMD 4-Digit Code '0000': Precision zero-ohm jumper (0 Ω).`;
    } else {
      const d1 = Number(rawCode[0]);
      const d2 = Number(rawCode[1]);
      const d3 = Number(rawCode[2]);
      const exp = Number(rawCode[3]);
      ohms = (d1 * 100 + d2 * 10 + d3) * Math.pow(10, exp);
      toleranceVal = 1;

      steps = `SMD 4-Digit Standard Code Decoder:\n` +
        `Code: ${rawCode}\n` +
        `1. Significant digits: ${d1}${d2}${d3}\n` +
        `2. Multiplier: 10^${exp} = ×${Math.pow(10, exp)}\n` +
        `3. Calculation: ${d1 * 100 + d2 * 10 + d3} × ${Math.pow(10, exp)} = ${ohms} Ω (${formatOhms(ohms)} ±1%)`;
    }
  } else if (eia96Match) {
    const codeNum = eia96Match[1];
    const letter = eia96Match[2];

    const baseVal = EIA96_TABLE[codeNum];
    if (!baseVal) {
      return { resistanceOhms: 0, formattedValue: "0 Ω", error: `Invalid EIA-96 digits: "${codeNum}"` };
    }

    const multiplierMap: Record<string, number> = {
      Z: 0.001,
      Y: 0.01, R: 0.01,
      X: 0.1, S: 0.1,
      A: 1,
      B: 10, H: 10,
      C: 100,
      D: 1000,
      E: 10000,
      F: 100000
    };

    const multVal = multiplierMap[letter];
    if (multVal === undefined) {
      return { resistanceOhms: 0, formattedValue: "0 Ω", error: `Invalid EIA-96 letter multiplier: "${letter}"` };
    }

    ohms = baseVal * multVal;
    toleranceVal = 1; // Standard EIA-96 is ±1% precision

    steps = `SMD EIA-96 Precision Code Decoder:\n` +
      `Code: ${rawCode}\n` +
      `1. Digits lookup: '${codeNum}' matches significant base value ${baseVal} in EIA-96 table.\n` +
      `2. Multiplier letter: '${letter}' = ×${multVal}\n` +
      `3. Calculation: ${baseVal} × ${multVal} = ${ohms} Ω (${formatOhms(ohms)})\n` +
      `4. Standard Tolerance: ±1% Precision`;
  } else {
    return { resistanceOhms: 0, formattedValue: "0 Ω", error: `Invalid SMD resistor code: "${rawCode}". Enter a 3-digit, 4-digit, decimal (e.g. 4R7), or EIA-96 code.` };
  }

  const minVal = ohms * (1 - toleranceVal / 100);
  const maxVal = ohms * (1 + toleranceVal / 100);

  return {
    resistanceOhms: ohms,
    formattedValue: formatOhms(ohms),
    minOhms: minVal,
    maxOhms: maxVal,
    tolerancePct: toleranceVal,
    calculationSteps: steps
  };
}

// ==========================================
// TAB 5: Resistor Combination & E-Series Finder
// ==========================================
export function runCombinationFinder(inputs: Record<string, any>): ResistorCalculatorOutputs {
  const rawTarget = inputs.finderTargetResistance;
  if (rawTarget === undefined || rawTarget === null || rawTarget === "") {
    return { resistanceOhms: 0, formattedValue: "0 Ω", error: "Please enter a target resistance." };
  }
  const targetVal = Number(rawTarget);
  if (isNaN(targetVal) || targetVal <= 0) {
    return { resistanceOhms: 0, formattedValue: "0 Ω", error: "Target resistance must be greater than 0." };
  }

  const unit = inputs.finderTargetUnit || "Ω";
  const eSeries = (inputs.finderESeries || "E24").toUpperCase();

  let absoluteOhms = targetVal;
  if (unit === "kΩ") absoluteOhms = targetVal * 1000;
  if (unit === "MΩ") absoluteOhms = targetVal * 1000000;

  const bases = E_SERIES_BASES[eSeries] || E_SERIES_BASES["E24"];
  const stdTolerance = E_SERIES_TOLERANCES[eSeries] ?? 5;

  // Expand base values to standard ranges from 1 ohm to 10 Megohms
  const standardValues: number[] = [];
  const decades = [0.1, 1, 10, 100, 1000, 10000, 100000, 1000000];
  for (const dec of decades) {
    for (const b of bases) {
      standardValues.push(Number((b * dec).toPrecision(6)));
    }
  }

  // Find closest standard single value
  let closestSingle = standardValues[0];
  let minDiff = Math.abs(closestSingle - absoluteOhms);

  for (const val of standardValues) {
    const diff = Math.abs(val - absoluteOhms);
    if (diff < minDiff) {
      minDiff = diff;
      closestSingle = val;
    }
  }

  const errorSingle = (closestSingle - absoluteOhms) / absoluteOhms * 100;
  const minVal = closestSingle * (1 - stdTolerance / 100);
  const maxVal = closestSingle * (1 + stdTolerance / 100);

  let steps = `E-Series Resistor Finder Analysis (Target = ${formatOhms(absoluteOhms)}):\n` +
    `1. Preferred Standard: ${eSeries} (Standard Manufacturing Tolerance: ±${stdTolerance}%)\n` +
    `2. Closest Single Standard Value: ${formatOhms(closestSingle)}\n` +
    `   - Deviation / Approximation Error: ${errorSingle >= 0 ? "+" : ""}${errorSingle.toFixed(2)}%\n` +
    `   - Manufacturing Tolerance Range: ${formatOhms(minVal)} to ${formatOhms(maxVal)} (±${stdTolerance}%)\n\n` +
    `3. Suggested Resistor Networks (Series/Parallel Combinations):\n`;

  interface Combination {
    r1: number;
    r2: number;
    type: "series" | "parallel";
    val: number;
    error: number;
  }

  const combinations: Combination[] = [];
  const minBound = absoluteOhms / 100;
  const maxBound = absoluteOhms * 100;
  const subset = standardValues.filter(v => v >= minBound && v <= maxBound);

  for (let i = 0; i < subset.length; i++) {
    for (let j = i; j < subset.length; j++) {
      const r1 = subset[i];
      const r2 = subset[j];

      // Series combination
      const sVal = r1 + r2;
      const sErr = Math.abs((sVal - absoluteOhms) / absoluteOhms) * 100;
      if (sErr < Math.abs(errorSingle) && sErr < 5) {
        combinations.push({ r1, r2, type: "series", val: sVal, error: sErr });
      }

      // Parallel combination
      const pVal = 1 / (1 / r1 + 1 / r2);
      const pErr = Math.abs((pVal - absoluteOhms) / absoluteOhms) * 100;
      if (pErr < Math.abs(errorSingle) && pErr < 5) {
        combinations.push({ r1, r2, type: "parallel", val: pVal, error: pErr });
      }
    }
  }

  const topCombs = combinations.sort((a, b) => a.error - b.error).slice(0, 5);

  if (topCombs.length > 0) {
    topCombs.forEach((c, idx) => {
      const actualError = (c.val - absoluteOhms) / absoluteOhms * 100;
      steps += `   [Option ${idx + 1}] ${c.type === "series" ? "Series: R1 + R2" : "Parallel: R1 || R2"}\n` +
        `     R1 = ${formatOhms(c.r1)}, R2 = ${formatOhms(c.r2)} -> Equivalent = ${formatOhms(c.val)} (Error: ${actualError >= 0 ? "+" : ""}${actualError.toFixed(3)}%)\n`;
    });
  } else {
    steps += `   No 2-resistor combination with tighter tolerance than closest single standard value.`;
  }

  return {
    resistanceOhms: closestSingle,
    formattedValue: formatOhms(closestSingle),
    minOhms: minVal,
    maxOhms: maxVal,
    tolerancePct: stdTolerance,
    errorPct: Number(errorSingle.toFixed(2)),
    calculationSteps: steps
  };
}
