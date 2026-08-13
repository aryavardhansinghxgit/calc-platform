import { ResistorCalculatorInputs, ResistorCalculatorOutputs, ResistorColor } from "./types";

// ==========================================
// 1. Resistor Color Code Database
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
  if (isNaN(ohms) || ohms === null) return "0 Ω";
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
// 3. E-Series Base Standard Value Arrays
// ==========================================
export const E_SERIES_BASES: Record<string, number[]> = {
  E6: [1.0, 1.5, 2.2, 3.3, 4.7, 6.8],
  E12: [1.0, 1.2, 1.5, 1.8, 2.2, 2.7, 3.3, 3.9, 4.7, 5.6, 6.8, 8.2],
  E24: [1.0, 1.1, 1.2, 1.3, 1.5, 1.6, 1.8, 2.0, 2.2, 2.4, 2.7, 3.0, 3.3, 3.6, 3.9, 4.3, 4.7, 5.1, 5.6, 6.2, 6.8, 7.5, 8.2, 9.1],
  E48: [1.0, 1.05, 1.1, 1.15, 1.21, 1.27, 1.33, 1.4, 1.47, 1.54, 1.62, 1.69, 1.78, 1.87, 1.96, 2.05, 2.15, 2.26, 2.37, 2.49, 2.61, 2.74, 2.87, 3.01, 3.16, 3.32, 3.48, 3.65, 3.83, 4.02, 4.22, 4.42, 4.64, 4.87, 5.11, 5.36, 5.62, 5.9, 6.19, 6.49, 6.81, 7.15, 7.5, 7.87, 8.25, 8.66, 9.09, 9.53],
  E96: [1.0, 1.02, 1.05, 1.07, 1.1, 1.13, 1.15, 1.18, 1.21, 1.24, 1.27, 1.3, 1.33, 1.37, 1.4, 1.43, 1.47, 1.5, 1.54, 1.58, 1.62, 1.65, 1.69, 1.74, 1.78, 1.82, 1.87, 1.91, 1.96, 2.0, 2.05, 2.1, 2.15, 2.21, 2.26, 2.32, 2.37, 2.43, 2.49, 2.55, 2.61, 2.67, 2.74, 2.8, 2.87, 2.94, 3.01, 3.09, 3.16, 3.24, 3.32, 3.4, 3.48, 3.57, 3.65, 3.74, 3.83, 3.92, 4.02, 4.12, 4.22, 4.32, 4.42, 4.53, 4.64, 4.75, 4.87, 4.99, 5.11, 5.23, 5.36, 5.49, 5.62, 5.76, 5.9, 6.04, 6.19, 6.34, 6.49, 6.65, 6.81, 6.98, 7.15, 7.32, 7.5, 7.68, 7.87, 8.06, 8.25, 8.45, 8.66, 8.87, 9.09, 9.31, 9.53, 9.76],
  E192: [1.0, 1.01, 1.02, 1.04, 1.05, 1.06, 1.07, 1.09, 1.1, 1.11, 1.13, 1.14, 1.15, 1.17, 1.18, 1.2, 1.21, 1.23, 1.24, 1.26, 1.27, 1.29, 1.3, 1.32, 1.33, 1.35, 1.37, 1.38, 1.4, 1.42, 1.43, 1.45, 1.47, 1.49, 1.5, 1.52, 1.54, 1.56, 1.58, 1.6, 1.62, 1.64, 1.65, 1.67, 1.69, 1.72, 1.74, 1.76, 1.78, 1.8, 1.82, 1.84, 1.87, 1.89, 1.91, 1.93, 1.96, 1.98, 2.0, 2.03, 2.05, 2.08, 2.1, 2.13, 2.15, 2.18, 2.21, 2.23, 2.26, 2.29, 2.32, 2.34, 2.37, 2.4, 2.43, 2.46, 2.49, 2.52, 2.55, 2.58, 2.61, 2.64, 2.67, 2.7, 2.74, 2.77, 2.8, 2.84, 2.87, 2.91, 2.94, 2.98, 3.01, 3.05, 3.09, 3.12, 3.16, 3.2, 3.24, 3.28, 3.32, 3.36, 3.4, 3.44, 3.48, 3.52, 3.57, 3.61, 3.65, 3.7, 3.74, 3.79, 3.83, 3.88, 3.92, 3.97, 4.02, 4.07, 4.12, 4.17, 4.22, 4.27, 4.32, 4.37, 4.42, 4.48, 4.53, 4.59, 4.64, 4.7, 4.75, 4.81, 4.87, 4.93, 4.99, 5.05, 5.11, 5.17, 5.23, 5.3, 5.36, 5.42, 5.49, 5.56, 5.62, 5.69, 5.76, 5.83, 5.9, 5.97, 6.04, 6.12, 6.19, 6.26, 6.34, 6.42, 6.49, 6.57, 6.65, 6.73, 6.81, 6.89, 6.98, 7.06, 7.15, 7.23, 7.32, 7.41, 7.5, 7.59, 7.68, 7.77, 7.87, 7.96, 8.06, 8.16, 8.25, 8.35, 8.45, 8.56, 8.66, 8.76, 8.87, 8.98, 9.09, 9.2, 9.31, 9.42, 9.53, 9.65, 9.76, 9.88]
};

// ==========================================
// 4. MAIN ENGINE CALCULATION HANDLER
// ==========================================
export function calculateResistorCalculator(inputs: Record<string, any>): ResistorCalculatorOutputs {
  const activeTab = inputs.activeTab || "color";

  // Tab 1: Resistor Color Code
  if (activeTab === "color") {
    return runColorCodeDecoding(inputs);
  }

  // Tab 2: Series / Parallel networks
  if (activeTab === "series_parallel") {
    return runSeriesParallelCalculation(inputs);
  }

  // Tab 3: Conductor resistance
  if (activeTab === "conductor") {
    return runConductorResistanceCalculation(inputs);
  }

  // Tab 4: SMD resistor decoder
  if (activeTab === "smd") {
    return runSmdDecoder(inputs);
  }

  // Tab 5: E-Series Lookup / Combinations
  if (activeTab === "finder") {
    return runCombinationFinder(inputs);
  }

  return { resistanceOhms: 0, formattedValue: "0 Ω", error: "Invalid active tab selection." };
}

// ==========================================
// TAB 1: Color Code Decoding (Two-Way)
// ==========================================
function runColorCodeDecoding(inputs: Record<string, any>): ResistorCalculatorOutputs {
  const isReverse = !!inputs.reverseMode;

  // REVERSE CONVERSION: Resistance -> Color Bands
  if (isReverse) {
    const targetVal = Math.max(0.001, Number(inputs.targetResistance) || 100);
    const unit = inputs.targetResistanceUnit || "Ω";
    const targetTol = Number(inputs.targetTolerance) || 5;
    const targetTemp = Number(inputs.targetTempCoeff) || 100;
    const bandCount = Number(inputs.bandCount) || 4;

    // Convert target input to absolute ohms
    let absoluteOhms = targetVal;
    if (unit === "mΩ") absoluteOhms = targetVal / 1000;
    if (unit === "kΩ") absoluteOhms = targetVal * 1000;
    if (unit === "MΩ") absoluteOhms = targetVal * 1000000;
    if (unit === "GΩ") absoluteOhms = targetVal * 1000000000;

    // Determine bands based on standard resistor lookup
    const digitsCount = bandCount === 4 ? 2 : 3;
    
    // Find closest E-Series base number and multiplier
    // log10 of resistance helps determine the exponent
    const exponent = Math.floor(Math.log10(absoluteOhms));
    const multiplierPow = Math.pow(10, exponent - (digitsCount - 1));

    let sigFigs = Math.round(absoluteOhms / multiplierPow);
    let finalMultiplier = multiplierPow;

    // Boundary corrections
    if (sigFigs >= Math.pow(10, digitsCount)) {
      sigFigs = Math.round(sigFigs / 10);
      finalMultiplier *= 10;
    }
    if (sigFigs < Math.pow(10, digitsCount - 1)) {
      sigFigs *= 10;
      finalMultiplier /= 10;
    }

    // Convert sigFigs digits back to colors
    const digitsStr = String(sigFigs).padStart(digitsCount, "0");
    const bands: ResistorColor[] = [];
    for (let char of digitsStr) {
      const idx = Number(char);
      const color = Object.keys(COLOR_DATABASE).find(k => COLOR_DATABASE[k as ResistorColor].digit === idx) as ResistorColor;
      bands.push(color || "black");
    }

    // Find closest multiplier color
    const multColor = Object.keys(COLOR_DATABASE).find(k => {
      const val = COLOR_DATABASE[k as ResistorColor].multiplier;
      return val !== null && Math.abs(val - finalMultiplier) < 0.001 * val;
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

    // Re-verify actual decoded resistance
    const finalOhms = Number(digitsStr) * finalMultiplier;
    const toleranceVal = COLOR_DATABASE[tolColor]?.tolerance || 5;
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
    const s = String(val);
    const digitMap: Record<string, ResistorColor> = {
      "0": "black", "1": "brown", "2": "red", "3": "orange", "4": "yellow",
      "5": "green", "6": "blue", "7": "violet", "8": "gray", "9": "white"
    };
    return digitMap[s] || (Object.keys(COLOR_DATABASE).includes(s) ? (s as ResistorColor) : fallback);
  };

  const mapMult = (val: any, fallback: ResistorColor): ResistorColor => {
    if (val === undefined || val === null) return fallback;
    const s = String(val);
    const multMap: Record<string, ResistorColor> = {
      "1": "black", "10": "brown", "100": "red", "1000": "orange", "10000": "yellow",
      "100000": "green", "1000000": "blue", "10000000": "violet", "100000000": "gray",
      "1000000000": "white", "0.1": "gold", "0.01": "silver"
    };
    return multMap[s] || (Object.keys(COLOR_DATABASE).includes(s) ? (s as ResistorColor) : fallback);
  };

  const b1 = mapDigit(inputs.band1, "brown");
  const b2 = mapDigit(inputs.band2, "black");
  const b3 = mapDigit(inputs.band3, "black"); // only used in 5 and 6 bands
  const mult = mapMult(inputs.multiplier, "red");
  const tol = Object.keys(COLOR_DATABASE).includes(String(inputs.tolerance)) ? (inputs.tolerance as ResistorColor) : "gold";
  const temp = Object.keys(COLOR_DATABASE).includes(String(inputs.tempCoeff)) ? (inputs.tempCoeff as ResistorColor) : "brown";

  const v1 = COLOR_DATABASE[b1 as ResistorColor];
  const v2 = COLOR_DATABASE[b2 as ResistorColor];
  const v3 = COLOR_DATABASE[b3 as ResistorColor];
  const vMult = COLOR_DATABASE[mult as ResistorColor];
  const vTol = COLOR_DATABASE[tol as ResistorColor];
  const vTemp = COLOR_DATABASE[temp as ResistorColor];

  // Perform checks
  if (v1.digit === null || v2.digit === null) {
    return { resistanceOhms: 0, formattedValue: "0 Ω", error: "Digit bands cannot be multiplier or tolerance colors." };
  }
  if (vMult.multiplier === null) {
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
    // 5 and 6 bands use 3 digits
    if (v3.digit === null) {
      return { resistanceOhms: 0, formattedValue: "0 Ω", error: "3rd Band (Digit 3) color is invalid." };
    }
    sigFigs = v1.digit * 100 + v2.digit * 10 + v3.digit;
    steps = `Calculation Steps for ${bandCount}-Band Resistor:\n` +
      `1. Significant Digits: Band 1 (${v1.label}) = ${v1.digit}, Band 2 (${v2.label}) = ${v2.digit}, Band 3 (${v3.label}) = ${v3.digit} -> Value = ${sigFigs}\n` +
      `2. Multiplier: Band 4 (${vMult.label}) = ×${vMult.multiplier}\n` +
      `3. Calculation: ${sigFigs} × ${vMult.multiplier} = ${sigFigs * vMult.multiplier} Ω\n`;
  }

  const ohms = sigFigs * vMult.multiplier;
  const toleranceVal = vTol.tolerance !== null ? vTol.tolerance : 20;
  const minVal = ohms * (1 - toleranceVal / 100);
  const maxVal = ohms * (1 + toleranceVal / 100);

  steps += `4. Tolerance: Band ${bandCount === 4 ? 4 : 5} (${vTol.label}) = ±${toleranceVal}%\n` +
    `5. Limits: Minimum Value = ${formatOhms(minVal)}, Maximum Value = ${formatOhms(maxVal)}`;

  if (bandCount === 6 && vTemp.tempCoeff !== null) {
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
    tempCoeffPpm: bandCount === 6 ? vTemp.tempCoeff || undefined : undefined,
    bands: outputBands as ResistorColor[],
    calculationSteps: steps
  };
}

// ==========================================
// TAB 2: Series / Parallel Networks
// ==========================================
interface ParsedResistor {
  value: number;
  tolerance: number;
}

function runSeriesParallelCalculation(inputs: Record<string, any>): ResistorCalculatorOutputs {
  const rawString = inputs.resistorValuesString || "";
  const isParallel = !!inputs.parallelMode;
  const supplyV = Math.max(0, Number(inputs.supplyVoltage) || 0);

  // Parsing values
  // Support entries with units like "10k", "2.2M", "100", etc.
  const parts = rawString.split(",").map((s: string) => s.trim()).filter(Boolean);
  if (parts.length === 0) {
    return { resistanceOhms: 0, formattedValue: "0 Ω", error: "Please enter at least one resistor value." };
  }

  const parsedList: ParsedResistor[] = [];
  for (const part of parts) {
    // Extract base number and tolerance if specified, e.g. "10k@5" (10k ohms, 5% tol)
    let text = part;
    let tol = 5; // default 5%
    if (part.includes("@")) {
      const splitTol = part.split("@");
      text = splitTol[0].trim();
      tol = Math.max(0, parseFloat(splitTol[1]) || 0);
    }

    // Match multipliers: m, k, K, M, G
    const match = text.match(/^([0-9.]+)\s*([a-zA-ZΩ]*)$/);
    if (!match) {
      return { resistanceOhms: 0, formattedValue: "0 Ω", error: `Invalid entry value: "${part}"` };
    }

    const val = parseFloat(match[1]);
    const unitSymbol = match[2].toLowerCase();
    let multiplier = 1;

    if (unitSymbol.startsWith("m") && !unitSymbol.startsWith("meg") && !unitSymbol.startsWith("mΩ")) {
      multiplier = 0.001; // milli
    }
    if (unitSymbol.startsWith("k")) {
      multiplier = 1000;
    }
    if (unitSymbol.startsWith("m") && (unitSymbol.startsWith("meg") || unitSymbol.includes("m"))) {
      if (unitSymbol === "m" || unitSymbol === "mΩ") {
        // Wait, did they mean mega or standard milli?
        // In electronics "M" means Mega, "m" means milli. Let's make "m" milli and "M" Mega.
        // If the parsed unit is lowercase "m", it is milli unless they typed "meg"
        multiplier = 0.001;
      }
    }
    // Check if the original string was uppercase M
    const originalUnit = match[2];
    if (originalUnit.includes("M") || originalUnit.toLowerCase().startsWith("meg")) {
      multiplier = 1e6;
    }
    if (originalUnit.includes("G")) {
      multiplier = 1e9;
    }

    const ohms = val * multiplier;
    if (ohms <= 0) {
      return { resistanceOhms: 0, formattedValue: "0 Ω", error: "Resistance value must be greater than 0." };
    }
    parsedList.push({ value: ohms, tolerance: tol });
  }

  let totalOhms = 0;
  let minOhms = 0;
  let maxOhms = 0;
  let steps = "";

  if (!isParallel) {
    // Series: Rtotal = R1 + R2 + ...
    totalOhms = parsedList.reduce((acc, r) => acc + r.value, 0);
    minOhms = parsedList.reduce((acc, r) => acc + r.value * (1 - r.tolerance / 100), 0);
    maxOhms = parsedList.reduce((acc, r) => acc + r.value * (1 + r.tolerance / 100), 0);

    steps = `Series Resistors Configuration:\n` +
      `Formula: R_total = R_1 + R_2 + ... + R_n\n\n` +
      parsedList.map((r, i) => `  Resistor ${i + 1}: ${formatOhms(r.value)} (±${r.tolerance}%)`).join("\n") +
      `\n\nCalculated Equivalent: R_total = ${parsedList.map(r => formatOhms(r.value)).join(" + ")} = ${formatOhms(totalOhms)}\n` +
      `Tolerance bounds: Minimum = ${formatOhms(minOhms)} | Maximum = ${formatOhms(maxOhms)}`;
  } else {
    // Parallel: 1/Rtotal = 1/R1 + 1/R2 + ...
    let sumReciprocals = 0;
    let sumMinReciprocals = 0;
    let sumMaxReciprocals = 0;

    for (const r of parsedList) {
      sumReciprocals += 1 / r.value;
      sumMinReciprocals += 1 / (r.value * (1 - r.tolerance / 100));
      sumMaxReciprocals += 1 / (r.value * (1 + r.tolerance / 100));
    }

    totalOhms = 1 / sumReciprocals;
    // To minimize parallel resistance, branches should be minimized (which maximizes reciprocal sum)
    minOhms = 1 / sumMinReciprocals;
    maxOhms = 1 / sumMaxReciprocals;

    steps = `Parallel Resistors Configuration:\n` +
      `Formula: 1/R_total = 1/R_1 + 1/R_2 + ... + 1/R_n\n\n` +
      parsedList.map((r, i) => `  Resistor ${i + 1}: ${formatOhms(r.value)} (±${r.tolerance}%)`).join("\n") +
      `\n\nCalculated Equivalent: R_total = 1 / (${parsedList.map(r => `(1 / ${formatOhms(r.value)})`).join(" + ")}) = ${formatOhms(totalOhms)}\n` +
      `Tolerance bounds: Minimum = ${formatOhms(minOhms)} | Maximum = ${formatOhms(maxOhms)}`;
  }

  // Ohm's law checks if voltage is active
  if (supplyV > 0) {
    const totalCurrent = supplyV / totalOhms;
    const totalPower = supplyV * totalCurrent;
    steps += `\n\nOhm's Law Analysis (V_source = ${supplyV} V):\n` +
      `1. Total Current (I_total) = V / R_total = ${supplyV} / ${totalOhms.toFixed(2)} = ${totalCurrent.toFixed(5)} A (${(totalCurrent * 1000).toFixed(2)} mA)\n` +
      `2. Total Power (P_total) = V × I_total = ${totalPower.toFixed(3)} W`;

    // Branches distribution breakdown
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

  return {
    resistanceOhms: totalOhms,
    formattedValue: formatOhms(totalOhms),
    minOhms,
    maxOhms,
    tolerancePct: Number(((maxOhms - totalOhms) / totalOhms * 100).toFixed(2)),
    calculationSteps: steps
  };
}

// ==========================================
// TAB 3: Conductor Resistance
// ==========================================
const MATERIAL_RESISTIVITIES: Record<string, { rho: number; alpha: number; name: string }> = {
  copper: { rho: 1.72e-8, alpha: 0.00393, name: "Copper" },
  aluminum: { rho: 2.82e-8, alpha: 0.00403, name: "Aluminum" },
  silver: { rho: 1.59e-8, alpha: 0.0038, name: "Silver" },
  gold: { rho: 2.44e-8, alpha: 0.0034, name: "Gold" },
  iron: { rho: 1.0e-7, alpha: 0.005, name: "Iron" },
  carbon: { rho: 3.5e-5, alpha: -0.0005, name: "Carbon" }
};

function runConductorResistanceCalculation(inputs: Record<string, any>): ResistorCalculatorOutputs {
  const len = Math.max(0, Number(inputs.conductorLength) || 0);
  const lenUnit = inputs.conductorLengthUnit || "m";
  const sizeType = inputs.conductorSizeInputType || "diameter";
  const diam = Math.max(0, Number(inputs.conductorDiameter) || 0);
  const diamUnit = inputs.conductorDiameterUnit || "mm";
  const area = Math.max(0, Number(inputs.conductorArea) || 0);
  const areaUnit = inputs.conductorAreaUnit || "mm²";
  const matKey = inputs.conductorMaterial || "copper";
  const temp = inputs.conductorTemp !== undefined ? Number(inputs.conductorTemp) : 20;

  if (len <= 0) {
    return { resistanceOhms: 0, formattedValue: "0 Ω", error: "Length must be greater than 0." };
  }

  // Convert length to meters
  let lMeters = len;
  if (lenUnit === "mm") lMeters = len / 1000;
  if (lenUnit === "cm") lMeters = len / 100;
  if (lenUnit === "km") lMeters = len * 1000;
  if (lenUnit === "in") lMeters = len * 0.0254;
  if (lenUnit === "ft") lMeters = len * 0.3048;
  if (lenUnit === "yd") lMeters = len * 0.9144;
  if (lenUnit === "mile") lMeters = len * 1609.34;

  // Resolve Area in m²
  let areaM2 = 0;
  if (sizeType === "diameter") {
    if (diam <= 0) return { resistanceOhms: 0, formattedValue: "0 Ω", error: "Diameter must be greater than 0." };
    // Convert diameter to meters
    let dMeters = diam;
    if (diamUnit === "mm") dMeters = diam / 1000;
    if (diamUnit === "cm") dMeters = diam / 100;
    if (diamUnit === "in") dMeters = diam * 0.0254;
    areaM2 = Math.PI * Math.pow(dMeters / 2, 2);
  } else {
    if (area <= 0) return { resistanceOhms: 0, formattedValue: "0 Ω", error: "Cross-sectional area must be greater than 0." };
    // Convert area to m²
    if (areaUnit === "mm²") areaM2 = area * 1e-6;
    if (areaUnit === "cm²") areaM2 = area * 1e-4;
    if (areaUnit === "in²") areaM2 = area * 0.00064516;
  }

  // Get material properties
  let mat = MATERIAL_RESISTIVITIES[matKey];
  if (!mat) {
    mat = MATERIAL_RESISTIVITIES["copper"];
  }

  // Resistance at reference temperature (20 °C)
  // R = rho * L / A
  const r20 = mat.rho * lMeters / areaM2;

  // Adjust for temperature
  // R(T) = R20 * (1 + alpha * (T - 20))
  const rT = r20 * (1 + mat.alpha * (temp - 20));

  const steps = `Conductor Resistance Analysis:\n` +
    `1. Conductor Material: ${mat.name} (Resistivity ρ_20 = ${mat.rho.toExponential(2)} Ω·m, Temp Coeff α = ${mat.alpha}/°C)\n` +
    `2. Normalized Length: ${len} ${lenUnit} = ${lMeters.toFixed(4)} meters\n` +
    `3. Cross-sectional Area (A): ${sizeType === "diameter" 
      ? `Diameter: ${diam} ${diamUnit} -> Radius = ${(diam/2)} ${diamUnit} -> A = π × r² = ${areaM2.toExponential(4)} m²`
      : `Area: ${area} ${areaUnit} = ${areaM2.toExponential(4)} m²`}\n` +
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
function runSmdDecoder(inputs: Record<string, any>): ResistorCalculatorOutputs {
  const code = (inputs.smdCode || "").trim().toUpperCase();
  if (!code) {
    return { resistanceOhms: 0, formattedValue: "0 Ω", error: "Please enter an SMD code." };
  }

  let ohms = 0;
  let steps = "";

  // Regex patterns:
  // 1. 3-digit: e.g. "103"
  // 2. 4-digit: e.g. "1002"
  // 3. R-decimal: e.g. "4R7", "R22", "2M2", "1R00"
  // 4. EIA-96: e.g. "01A", "88C"

  const rDecimalMatch = code.match(/^([0-9]*)?([RKM])([0-9]*)?$/);
  const threeDigitMatch = code.match(/^([0-9]{3})$/);
  const fourDigitMatch = code.match(/^([0-9]{4})$/);
  const eia96Match = code.match(/^([0-9]{2})([A-FYXSR])$/);

  if (rDecimalMatch) {
    const char = rDecimalMatch[2];
    const left = rDecimalMatch[1] || "0";
    const right = rDecimalMatch[3] || "";
    const combinedStr = `${left}.${right}`;
    const parsedVal = parseFloat(combinedStr);
    
    let multiplier = 1;
    let label = "Ω";
    if (char === "K") { multiplier = 1000; label = "kΩ"; }
    if (char === "M") { multiplier = 1e6; label = "MΩ"; }

    ohms = parsedVal * multiplier;
    steps = `SMD Decimal (R/K/M) Notation Decoder:\n` +
      `Code: ${code}\n` +
      `Decimal character '${char}' acts as decimal point and indicates base multiplier (R = ×1, K = ×1,000, M = ×1,000,000).\n` +
      `Decoded resistance: ${combinedStr.replace(/\.$/, "")} × ${multiplier} = ${formatOhms(ohms)}`;
  } else if (threeDigitMatch) {
    const d1 = Number(code[0]);
    const d2 = Number(code[1]);
    const exp = Number(code[2]);
    ohms = (d1 * 10 + d2) * Math.pow(10, exp);
    
    steps = `SMD 3-Digit Standard Code Decoder:\n` +
      `Code: ${code}\n` +
      `1. Significant digits: ${d1}${d2}\n` +
      `2. Multiplier: 10^${exp} = ×${Math.pow(10, exp)}\n` +
      `3. Calculation: ${d1 * 10 + d2} × ${Math.pow(10, exp)} = ${ohms} Ω (${formatOhms(ohms)})`;
  } else if (fourDigitMatch) {
    const d1 = Number(code[0]);
    const d2 = Number(code[1]);
    const d3 = Number(code[2]);
    const exp = Number(code[3]);
    ohms = (d1 * 100 + d2 * 10 + d3) * Math.pow(10, exp);

    steps = `SMD 4-Digit Standard Code Decoder:\n` +
      `Code: ${code}\n` +
      `1. Significant digits: ${d1}${d2}${d3}\n` +
      `2. Multiplier: 10^${exp} = ×${Math.pow(10, exp)}\n` +
      `3. Calculation: ${d1 * 100 + d2 * 10 + d3} × ${Math.pow(10, exp)} = ${ohms} Ω (${formatOhms(ohms)})`;
  } else if (eia96Match) {
    const codeNum = eia96Match[1];
    const letter = eia96Match[2];

    const baseVal = EIA96_TABLE[codeNum];
    if (!baseVal) {
      return { resistanceOhms: 0, formattedValue: "0 Ω", error: `Invalid EIA-96 digits: "${codeNum}"` };
    }

    // Letter multiplier mapping
    const multiplierMap: Record<string, number> = {
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
    ohms = baseVal * multVal;

    steps = `SMD EIA-96 Precision Code Decoder:\n` +
      `Code: ${code}\n` +
      `1. Digits lookup: '${codeNum}' matches significant base value ${baseVal} in EIA-96 table.\n` +
      `2. Multiplier letter: '${letter}' = ×${multVal}\n` +
      `3. Calculation: ${baseVal} × ${multVal} = ${ohms} Ω (${formatOhms(ohms)})`;
  } else {
    return { resistanceOhms: 0, formattedValue: "0 Ω", error: "Unrecognized SMD format. Enter a 3-digit, 4-digit, or EIA-96 code." };
  }

  return {
    resistanceOhms: ohms,
    formattedValue: formatOhms(ohms),
    calculationSteps: steps
  };
}

// ==========================================
// TAB 5: Resistor Combination Finder
// ==========================================
function runCombinationFinder(inputs: Record<string, any>): ResistorCalculatorOutputs {
  const targetVal = Math.max(0.1, Number(inputs.finderTargetResistance) || 100);
  const unit = inputs.finderTargetUnit || "Ω";
  const eSeries = inputs.finderESeries || "E24";

  let absoluteOhms = targetVal;
  if (unit === "kΩ") absoluteOhms = targetVal * 1000;
  if (unit === "MΩ") absoluteOhms = targetVal * 1000000;

  const bases = E_SERIES_BASES[eSeries] || E_SERIES_BASES["E24"];

  // Expand base values to standard ranges from 1 ohm to 1 Megohm
  const standardValues: number[] = [];
  const decades = [1, 10, 100, 1000, 10000, 100000, 1000000];
  for (const dec of decades) {
    for (const b of bases) {
      standardValues.push(b * dec);
    }
  }

  // Find closest single value
  let closestSingle = standardValues[0];
  let minDiff = Math.abs(closestSingle - absoluteOhms);

  for (const val of standardValues) {
    const diff = Math.abs(val - absoluteOhms);
    if (diff < minDiff) {
      minDiff = diff;
      closestSingle = val;
    }
  }

  // Suggest E-series matches
  const errorSingle = (closestSingle - absoluteOhms) / absoluteOhms * 100;
  let steps = `E-Series Resistor Finder Analysis (Target = ${formatOhms(absoluteOhms)}):\n` +
    `1. Closest Single Standard ${eSeries} Value:\n` +
    `   Value: ${formatOhms(closestSingle)} (Error: ${errorSingle.toFixed(2)}%)\n\n` +
    `2. Suggested Resistor Networks (Series/Parallel Approximations):\n`;

  // Search 2-resistor combinations: Series (R1 + R2) and Parallel (R1 || R2)
  interface Combination {
    r1: number;
    r2: number;
    type: "series" | "parallel";
    val: number;
    error: number;
  }

  const combinations: Combination[] = [];

  // Limit search space for performance
  // We filter standard values close to the target range
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

  // Sort and pick top 4 best combinations
  const topCombs = combinations.sort((a, b) => a.error - b.error).slice(0, 5);

  if (topCombs.length > 0) {
    topCombs.forEach((c, idx) => {
      const actualError = (c.val - absoluteOhms) / absoluteOhms * 100;
      steps += `   [Option ${idx + 1}] ${c.type === "series" ? "Series combination: R1 + R2" : "Parallel combination: R1 || R2"}\n` +
        `     R1 = ${formatOhms(c.r1)}, R2 = ${formatOhms(c.r2)} -> Equivalent = ${formatOhms(c.val)} (Error: ${actualError.toFixed(3)}%)\n`;
    });
  } else {
    steps += `   No 2-resistor combinations found with better accuracy than the closest single E-Series value.`;
  }

  return {
    resistanceOhms: closestSingle,
    formattedValue: formatOhms(closestSingle),
    minOhms: closestSingle * 0.95, // nominal min
    maxOhms: closestSingle * 1.05, // nominal max
    tolerancePct: errorSingle,
    calculationSteps: steps
  };
}
