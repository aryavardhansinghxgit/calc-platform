/**
 * Core mathematical engine for Rounding Calculator & Numerical Precision Suite
 * Implements exact decimal string arithmetic to eliminate IEEE-754 binary floating-point midpoint errors.
 */

export type RoundingMethod =
  | "halfUp"        // Standard arithmetic / School method (0.5 away from zero)
  | "halfDown"      // 0.5 towards zero (or -infinity for negative)
  | "halfEven"      // Banker's Rounding / IEEE 754 (round 0.5 to nearest even)
  | "halfOdd"       // Round 0.5 to nearest odd
  | "up"            // Ceiling ⌈x⌉ (toward +infinity)
  | "down"          // Floor ⌊x⌋ (toward -infinity)
  | "towardZero"    // Truncate / Chop
  | "awayFromZero"; // Round away from zero (magnitude expansion)

export interface ParsedNumber {
  value: number;
  normalizedStr: string;
  isNegative: boolean;
  intPart: string;
  fracPart: string;
  isValid: boolean;
  errorMessage?: string;
}

export interface ExactRoundingResult {
  numericValue: number;
  formattedString: string;
  targetDigit: number;
  decidingDigit: number;
  isExactMidpoint: boolean;
  decisionRule: string;
  exactDifference: number;
  percentageError: number;
}

export interface RoundingStepExplanation {
  originalValue: number;
  originalString: string;
  roundedValue: number;
  roundedString: string;
  placeName: string;
  targetDigit: number;
  decidingDigit: number;
  isExactMidpoint: boolean;
  decisionRule: string;
  exactDifference: number;
  percentageError: number;
  methodName: string;
  latexFormula: string;
}

export interface NumberLineData {
  lowerBound: number;
  lowerBoundStr: string;
  midpoint: number;
  midpointStr: string;
  upperBound: number;
  upperBoundStr: string;
  originalPoint: number;
  roundedPoint: number;
  originalProgress: number; // 0 to 1
  roundedProgress: number;  // 0 to 1
  direction: "up" | "down" | "stay";
}

/**
 * Compute greatest common divisor using Euclidean algorithm
 */
export function gcd(a: number, b: number): number {
  let x = Math.abs(Math.round(a));
  let y = Math.abs(Math.round(b));
  while (y !== 0) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x;
}

/**
 * Parse any user input into clean decimal sign, integer, and fractional strings.
 * Supports:
 * - standard decimals and integers: "12.345", "-8.5"
 * - comma separators: "1,234.56"
 * - simple fractions: "25/2", "-25/2", "3/4"
 * - mixed fractions: "12 3/8", "-12 3/8"
 * - scientific notation: "1.23e+4", "5e-3"
 */
export function parseNumberInput(input: string | number): ParsedNumber {
  if (input === null || input === undefined) {
    return { value: 0, normalizedStr: "0", isNegative: false, intPart: "0", fracPart: "", isValid: false, errorMessage: "Please enter a value." };
  }

  const rawStr = typeof input === "number" ? input.toString() : input;
  const trimmed = rawStr.trim();
  if (!trimmed) {
    return { value: 0, normalizedStr: "0", isNegative: false, intPart: "0", fracPart: "", isValid: false, errorMessage: "Input cannot be empty." };
  }

  // 1. Check for mixed fraction: e.g. "12 3/8" or "-12 3/8"
  const mixedMatch = trimmed.match(/^([-+]?)\s*(\d+)\s+(\d+)\s*\/\s*(\d+)$/);
  if (mixedMatch) {
    const sign = mixedMatch[1] === "-" ? -1 : 1;
    const whole = parseInt(mixedMatch[2], 10);
    const num = parseInt(mixedMatch[3], 10);
    const den = parseInt(mixedMatch[4], 10);
    if (den === 0) {
      return { value: 0, normalizedStr: "0", isNegative: false, intPart: "0", fracPart: "", isValid: false, errorMessage: "Division by zero in fraction." };
    }
    const val = sign * (whole + num / den);
    const isNeg = val < 0;
    const absVal = Math.abs(val);
    const parts = absVal.toFixed(14).replace(/\.?0+$/, "").split(".");
    return {
      value: val,
      normalizedStr: val.toString(),
      isNegative: isNeg,
      intPart: parts[0] || "0",
      fracPart: parts[1] || "",
      isValid: true
    };
  }

  // 2. Check for simple fraction: e.g. "25/2" or "-3/4"
  const fracMatch = trimmed.match(/^([-+]?)\s*(\d+)\s*\/\s*(\d+)$/);
  if (fracMatch) {
    const sign = fracMatch[1] === "-" ? -1 : 1;
    const num = parseInt(fracMatch[2], 10);
    const den = parseInt(fracMatch[3], 10);
    if (den === 0) {
      return { value: 0, normalizedStr: "0", isNegative: false, intPart: "0", fracPart: "", isValid: false, errorMessage: "Division by zero in fraction." };
    }
    const val = sign * (num / den);
    const isNeg = val < 0;
    const absVal = Math.abs(val);
    const parts = absVal.toFixed(14).replace(/\.?0+$/, "").split(".");
    return {
      value: val,
      normalizedStr: val.toString(),
      isNegative: isNeg,
      intPart: parts[0] || "0",
      fracPart: parts[1] || "",
      isValid: true
    };
  }

  // 3. Clean commas and check standard number format
  const cleanNum = trimmed.replace(/,/g, "");
  if (!/^[-+]?((\d+(\.\d*)?)|(\.\d+))([eE][-+]?\d+)?$/.test(cleanNum)) {
    return { value: 0, normalizedStr: "0", isNegative: false, intPart: "0", fracPart: "", isValid: false, errorMessage: "Invalid numeric or fraction format." };
  }

  const val = Number(cleanNum);
  if (Number.isNaN(val) || !Number.isFinite(val)) {
    return { value: 0, normalizedStr: "0", isNegative: false, intPart: "0", fracPart: "", isValid: false, errorMessage: "Number out of range." };
  }

  const isNeg = cleanNum.startsWith("-");
  const unsignedStr = isNeg || cleanNum.startsWith("+") ? cleanNum.slice(1) : cleanNum;

  // Handle scientific notation expansion into pure decimal digits
  let standardDecimalStr = unsignedStr;
  if (unsignedStr.includes("e") || unsignedStr.includes("E")) {
    const [coeff, expStr] = unsignedStr.toLowerCase().split("e");
    const exp = parseInt(expStr, 10);
    const [cInt, cFrac = ""] = coeff.split(".");
    if (exp > 0) {
      if (exp >= cFrac.length) {
        standardDecimalStr = cInt + cFrac + "0".repeat(exp - cFrac.length);
      } else {
        standardDecimalStr = cInt + cFrac.slice(0, exp) + "." + cFrac.slice(exp);
      }
    } else {
      const absExp = Math.abs(exp);
      standardDecimalStr = "0." + "0".repeat(absExp - 1) + cInt + cFrac;
    }
  }

  const parts = standardDecimalStr.split(".");
  const intPart = parts[0] || "0";
  const fracPart = parts[1] || "";

  return {
    value: val,
    normalizedStr: (isNeg ? "-" : "") + standardDecimalStr,
    isNegative: isNeg,
    intPart,
    fracPart,
    isValid: true
  };
}

/**
 * Core Exact Decimal Rounding Algorithm
 * Uses base-10 digit decomposition to prevent IEEE-754 floating-point midpoint failures.
 */
export function roundExactDecimal(
  input: string | number,
  decimals: number,
  method: RoundingMethod = "halfUp"
): ExactRoundingResult {
  const parsed = parseNumberInput(input);
  if (!parsed.isValid) {
    return {
      numericValue: 0,
      formattedString: "0",
      targetDigit: 0,
      decidingDigit: 0,
      isExactMidpoint: false,
      decisionRule: parsed.errorMessage || "Invalid input",
      exactDifference: 0,
      percentageError: 0
    };
  }

  const isNeg = parsed.isNegative;
  const intPart = parsed.intPart;
  const fracPart = parsed.fracPart;

  let targetDigit = 0;
  let decidingDigit = 0;
  let isExactMidpoint = false;
  let hasAnyDiscarded = false;
  let doIncrement = false;
  let formattedResult = "";

  if (decimals >= 0) {
    // Rounding to fractional decimal places: 0 = ones, 1 = tenths, 2 = hundredths, etc.
    const paddedFrac = fracPart.padEnd(decimals + 10, "0");
    const keptFrac = paddedFrac.slice(0, decimals);

    if (decimals === 0) {
      targetDigit = parseInt(intPart[intPart.length - 1], 10) || 0;
      decidingDigit = parseInt(paddedFrac[0], 10) || 0;
      const rest = fracPart.slice(1);
      hasAnyDiscarded = decidingDigit > 0 || /[1-9]/.test(rest);
      isExactMidpoint = decidingDigit === 5 && !/[1-9]/.test(rest);
    } else {
      targetDigit = parseInt(keptFrac[decimals - 1], 10) || 0;
      decidingDigit = parseInt(paddedFrac[decimals], 10) || 0;
      const rest = fracPart.slice(decimals + 1);
      hasAnyDiscarded = decidingDigit > 0 || /[1-9]/.test(rest);
      isExactMidpoint = decidingDigit === 5 && !/[1-9]/.test(rest);
    }

    switch (method) {
      case "up": // Ceiling ⌈x⌉
        doIncrement = !isNeg && hasAnyDiscarded;
        break;
      case "down": // Floor ⌊x⌋
        doIncrement = isNeg && hasAnyDiscarded;
        break;
      case "towardZero": // Truncate
        doIncrement = false;
        break;
      case "awayFromZero":
        doIncrement = hasAnyDiscarded;
        break;
      case "halfUp":
        // Symmetric round half away from zero
        doIncrement = decidingDigit >= 5;
        break;
      case "halfDown":
        doIncrement = isExactMidpoint ? false : decidingDigit >= 5;
        break;
      case "halfEven": // Banker's Rounding
        if (isExactMidpoint) {
          doIncrement = targetDigit % 2 !== 0; // round to nearest even digit
        } else {
          doIncrement = decidingDigit >= 5;
        }
        break;
      case "halfOdd":
        if (isExactMidpoint) {
          doIncrement = targetDigit % 2 === 0; // round to nearest odd digit
        } else {
          doIncrement = decidingDigit >= 5;
        }
        break;
    }

    let combinedDigits = BigInt(intPart + keptFrac);
    if (doIncrement) {
      combinedDigits += 1n;
    }

    let combinedStr = combinedDigits.toString();
    if (decimals === 0) {
      formattedResult = (isNeg && combinedStr !== "0" ? "-" : "") + combinedStr;
    } else {
      if (combinedStr.length <= decimals) {
        combinedStr = combinedStr.padStart(decimals + 1, "0");
      }
      const splitIdx = combinedStr.length - decimals;
      const resInt = combinedStr.slice(0, splitIdx);
      const resFrac = combinedStr.slice(splitIdx);
      const finalVal = `${resInt}.${resFrac}`;
      formattedResult = (isNeg && parseFloat(finalVal) !== 0 ? "-" : "") + finalVal;
    }
  } else {
    // Rounding to whole number powers of 10: -1 = tens, -2 = hundreds, -3 = thousands, etc.
    const shift = Math.abs(decimals);
    const paddedInt = intPart.padStart(shift + 1, "0");
    const targetIdx = paddedInt.length - shift - 1;
    targetDigit = parseInt(paddedInt[targetIdx], 10) || 0;
    decidingDigit = parseInt(paddedInt[targetIdx + 1], 10) || 0;
    const rest = paddedInt.slice(targetIdx + 2) + fracPart;
    hasAnyDiscarded = decidingDigit > 0 || /[1-9]/.test(rest);
    isExactMidpoint = decidingDigit === 5 && !/[1-9]/.test(rest);

    switch (method) {
      case "up":
        doIncrement = !isNeg && hasAnyDiscarded;
        break;
      case "down":
        doIncrement = isNeg && hasAnyDiscarded;
        break;
      case "towardZero":
        doIncrement = false;
        break;
      case "awayFromZero":
        doIncrement = hasAnyDiscarded;
        break;
      case "halfUp":
        doIncrement = decidingDigit >= 5;
        break;
      case "halfDown":
        doIncrement = isExactMidpoint ? false : decidingDigit >= 5;
        break;
      case "halfEven":
        doIncrement = isExactMidpoint ? targetDigit % 2 !== 0 : decidingDigit >= 5;
        break;
      case "halfOdd":
        doIncrement = isExactMidpoint ? targetDigit % 2 === 0 : decidingDigit >= 5;
        break;
    }

    const basePrefix = BigInt(paddedInt.slice(0, targetIdx + 1));
    const newPrefix = (basePrefix + (doIncrement ? 1n : 0n)).toString();
    const finalStr = newPrefix + "0".repeat(shift);
    const trimmedVal = BigInt(finalStr).toString();
    formattedResult = (isNeg && trimmedVal !== "0" ? "-" : "") + trimmedVal;
  }

  // Generate dynamic, mathematically consistent rule description
  let decisionRule = "";
  if (method === "halfUp") {
    if (decidingDigit >= 5) {
      decisionRule = `Since deciding digit is ${decidingDigit} (≥ 5), target digit ${targetDigit} rounds UP${doIncrement ? ` to ${(targetDigit + 1) % 10}` : ""}.`;
    } else {
      decisionRule = `Since deciding digit is ${decidingDigit} (< 5), target digit ${targetDigit} remains unchanged (rounds DOWN).`;
    }
  } else if (method === "halfEven") {
    if (isExactMidpoint) {
      decisionRule = `Exact midpoint encountered (deciding digit 5 followed by zeros). Banker's Rounding rounds to nearest EVEN digit: target digit ${targetDigit} ${doIncrement ? `rounds UP to ${(targetDigit + 1) % 10}` : "remains unchanged"}.`;
    } else if (decidingDigit >= 5) {
      decisionRule = `Since deciding digit is ${decidingDigit} (> 5), round UP.`;
    } else {
      decisionRule = `Since deciding digit is ${decidingDigit} (< 5), round DOWN.`;
    }
  } else if (method === "halfDown") {
    if (isExactMidpoint) {
      decisionRule = `Exact midpoint encountered (deciding digit 5). Round Half Down keeps target digit unchanged (rounds DOWN).`;
    } else if (decidingDigit >= 5) {
      decisionRule = `Since deciding digit is ${decidingDigit} (> 5), round UP.`;
    } else {
      decisionRule = `Since deciding digit is ${decidingDigit} (< 5), round DOWN.`;
    }
  } else if (method === "up") {
    decisionRule = hasAnyDiscarded ? `Ceiling rule: any non-zero discarded portion rounds toward +∞.` : `Value is already exact at target precision.`;
  } else if (method === "down") {
    decisionRule = hasAnyDiscarded ? `Floor rule: any non-zero discarded portion rounds toward -∞.` : `Value is already exact at target precision.`;
  } else if (method === "towardZero") {
    decisionRule = `Truncate rule: discarded fractional digits are dropped toward 0.`;
  } else if (method === "awayFromZero") {
    decisionRule = hasAnyDiscarded ? `Round away from zero: non-zero discarded fraction increases magnitude.` : `Value is already exact at target precision.`;
  } else {
    decisionRule = doIncrement ? `Rounds UP.` : `Rounds DOWN.`;
  }

  const numericValue = parseFloat(formattedResult);
  const exactDifference = numericValue - parsed.value;
  const percentageError = parsed.value !== 0 ? Math.abs(exactDifference / parsed.value) * 100 : 0;

  return {
    numericValue,
    formattedString: formattedResult,
    targetDigit,
    decidingDigit,
    isExactMidpoint,
    decisionRule,
    exactDifference,
    percentageError
  };
}

/**
 * Backward-compatible wrapper returning number
 */
export function roundByPlaceValue(val: number | string, decimals: number, method: RoundingMethod = "halfUp"): number {
  return roundExactDecimal(val, decimals, method).numericValue;
}

/**
 * Backward-compatible execution on integer/scaled value (0 decimal places)
 */
export function executeRoundingMethod(val: number, method: RoundingMethod): number {
  return roundExactDecimal(val.toString(), 0, method).numericValue;
}

/**
 * Backward-compatible wrapper returning formatted string with precision preserved
 */
export function roundByPlaceValueFormatted(val: number | string, decimals: number, method: RoundingMethod = "halfUp"): string {
  return roundExactDecimal(val, decimals, method).formattedString;
}

/**
 * Round to N significant figures with scientific notation support
 */
export function roundBySigFigs(val: number | string, sigFigs: number, method: RoundingMethod = "halfUp"): {
  roundedValue: number;
  scientificNotation: string;
  formattedString: string;
} {
  const parsed = parseNumberInput(val);
  if (!parsed.isValid || parsed.value === 0) {
    return { roundedValue: 0, scientificNotation: "0", formattedString: "0" };
  }

  const n = Math.max(1, Math.round(sigFigs));
  const magnitude = Math.floor(Math.log10(Math.abs(parsed.value)));
  const decimalsNeeded = n - 1 - magnitude;

  const rounded = roundExactDecimal(parsed.normalizedStr, decimalsNeeded, method);
  const numericVal = rounded.numericValue;

  const scientificNotation = numericVal.toExponential(n - 1);
  const formattedString = numericVal.toPrecision(n);

  return {
    roundedValue: numericVal,
    scientificNotation,
    formattedString
  };
}

/**
 * Round to nearest fraction denominator (1/2, 1/4, 1/8, 1/16, 1/32) with GCD reduction
 */
export function roundToNearestFraction(val: number | string, denominator: number, method: RoundingMethod = "halfUp"): {
  roundedValue: number;
  fractionString: string;
  wholePart: number;
  numPart: number;
  denPart: number;
  reducedNum: number;
  reducedDen: number;
} {
  const parsed = parseNumberInput(val);
  const numericVal = parsed.isValid ? parsed.value : 0;
  const den = Math.max(1, Math.round(denominator));

  const scaled = numericVal * den;
  const roundedScaled = roundExactDecimal(scaled.toString(), 0, method).numericValue;
  const roundedValue = roundedScaled / den;

  const isNeg = roundedScaled < 0;
  const absNumerator = Math.abs(roundedScaled);
  let wholePart = Math.floor(absNumerator / den);
  let remainderNumerator = absNumerator % den;

  let reducedNum = 0;
  let reducedDen = den;
  if (remainderNumerator > 0) {
    const divisor = gcd(remainderNumerator, den);
    reducedNum = remainderNumerator / divisor;
    reducedDen = den / divisor;
    if (reducedNum === reducedDen) {
      wholePart += 1;
      reducedNum = 0;
      remainderNumerator = 0;
    }
  }

  let fractionString = "";
  const signStr = isNeg ? "-" : "";
  if (reducedNum === 0) {
    fractionString = `${signStr}${wholePart}`;
  } else if (wholePart === 0) {
    fractionString = `${signStr}${reducedNum}/${reducedDen}`;
  } else {
    fractionString = `${signStr}${wholePart} ${reducedNum}/${reducedDen}`;
  }

  return {
    roundedValue,
    fractionString,
    wholePart: isNeg ? -wholePart : wholePart,
    numPart: remainderNumerator,
    denPart: den,
    reducedNum,
    reducedDen
  };
}

/**
 * Round to nearest custom multiple (e.g. 5, 0.05, 10, 25, 50, 100)
 */
export function roundToNearestMultiple(val: number | string, multiple: number, method: RoundingMethod = "halfUp"): {
  roundedValue: number;
  formattedString: string;
  difference: number;
  percentageError: number;
} {
  const parsed = parseNumberInput(val);
  const numVal = parsed.isValid ? parsed.value : 0;
  if (multiple <= 0) {
    return { roundedValue: numVal, formattedString: numVal.toString(), difference: 0, percentageError: 0 };
  }

  const scaled = numVal / multiple;
  const roundedScaled = roundExactDecimal(scaled.toString(), 0, method).numericValue;
  const roundedValue = roundedScaled * multiple;

  // Determine decimal places in multiple to preserve trailing zeros if decimal
  const multStr = multiple.toString();
  const decPlaces = multStr.includes(".") ? multStr.split(".")[1].length : 0;
  const formattedString = decPlaces > 0 ? roundedValue.toFixed(decPlaces) : roundedValue.toString();

  const difference = roundedValue - numVal;
  const percentageError = numVal !== 0 ? Math.abs(difference / numVal) * 100 : 0;

  return {
    roundedValue,
    formattedString,
    difference,
    percentageError
  };
}

/**
 * Swedish Cash Rounding to nearest coin denomination ($0.01, $0.05, $0.10, $0.25, $1.00)
 */
export function roundCurrencyCash(val: number | string, denomination: number = 0.05, method: RoundingMethod = "halfUp"): {
  originalAmount: number;
  roundedAmount: number;
  formattedOriginal: string;
  formattedPayable: string;
  currencyString: string;
  difference: number;
  customerImpact: "none" | "customerPaysMore" | "customerSaves";
  explanation: string;
} {
  const parsed = parseNumberInput(val);
  const originalAmount = parsed.isValid ? parsed.value : 0;
  const result = roundToNearestMultiple(originalAmount, denomination, method);

  const roundedAmount = result.roundedValue;
  const diff = parseFloat((roundedAmount - originalAmount).toFixed(4));
  const cleanDiff = Math.abs(diff) < 1e-9 ? 0 : diff;

  let customerImpact: "none" | "customerPaysMore" | "customerSaves" = "none";
  let explanation = "";

  if (cleanDiff > 0) {
    customerImpact = "customerPaysMore";
    explanation = `Amount rounds up by $${cleanDiff.toFixed(2)}. The customer pays an extra $${cleanDiff.toFixed(2)} in cash.`;
  } else if (cleanDiff < 0) {
    customerImpact = "customerSaves";
    explanation = `Amount rounds down by $${Math.abs(cleanDiff).toFixed(2)}. The customer saves $${Math.abs(cleanDiff).toFixed(2)} on this cash purchase.`;
  } else {
    customerImpact = "none";
    explanation = `Exact cash denomination: no cash rounding adjustment required.`;
  }

  const formattedPayable = `$${roundedAmount.toFixed(2)}`;

  return {
    originalAmount,
    roundedAmount,
    formattedOriginal: `$${originalAmount.toFixed(2)}`,
    formattedPayable,
    currencyString: formattedPayable,
    difference: cleanDiff,
    customerImpact,
    explanation
  };
}

/**
 * Compute Error Delta and Absolute Percentage Error
 */
export function computeErrorDelta(original: number, rounded: number): {
  exactDifference: number;
  percentageError: number;
} {
  const exactDifference = rounded - original;
  const percentageError = original !== 0 ? Math.abs(exactDifference / original) * 100 : 0;
  return { exactDifference, percentageError };
}

/**
 * Generate dynamic 2D Number Line coordinates derived from actual calculation
 */
export function generateNumberLineData(
  original: number,
  rounded: number,
  decimals: number
): NumberLineData {
  let step = 1;
  if (decimals >= 0) {
    step = Math.pow(10, -decimals);
  } else {
    step = Math.pow(10, Math.abs(decimals));
  }

  const lowerBound = Math.floor(original / step) * step;
  const upperBound = lowerBound + step;
  const midpoint = lowerBound + step / 2;

  const decPlaces = Math.max(0, Math.min(8, decimals >= 0 ? decimals : 0));
  const lowerBoundStr = decPlaces > 0 ? lowerBound.toFixed(decPlaces) : lowerBound.toString();
  const upperBoundStr = decPlaces > 0 ? upperBound.toFixed(decPlaces) : upperBound.toString();
  const midpointStr = (decPlaces + 1) > 0 ? midpoint.toFixed(decPlaces + 1) : midpoint.toString();

  const span = upperBound - lowerBound;
  const originalProgress = span > 0 ? Math.max(0, Math.min(1, (original - lowerBound) / span)) : 0.5;
  const roundedProgress = span > 0 ? Math.max(0, Math.min(1, (rounded - lowerBound) / span)) : 0.5;

  let direction: "up" | "down" | "stay" = "stay";
  if (rounded > original) direction = "up";
  else if (rounded < original) direction = "down";

  return {
    lowerBound,
    lowerBoundStr,
    midpoint,
    midpointStr,
    upperBound,
    upperBoundStr,
    originalPoint: original,
    roundedPoint: rounded,
    originalProgress,
    roundedProgress,
    direction
  };
}

/**
 * Step-by-step decision rule explanation with consistent digit derivation
 */
export function explainRoundingStepByStep(
  input: string | number,
  decimals: number,
  method: RoundingMethod = "halfUp"
): RoundingStepExplanation {
  const parsed = parseNumberInput(input);
  const exact = roundExactDecimal(input, decimals, method);

  const placeNames: Record<string, string> = {
    "6": "Millionths (0.000001 / 6 decimal places)",
    "5": "Hundred-Thousandths (0.00001 / 5 decimal places)",
    "4": "Ten-Thousandths (0.0001 / 4 decimal places)",
    "3": "Thousandths (0.001 / 3 decimal places)",
    "2": "Hundredths (0.01 / 2 decimal places)",
    "1": "Tenths (0.1 / 1 decimal place)",
    "0": "Ones / Whole Number (1)",
    "-1": "Tens (10)",
    "-2": "Hundreds (100)",
    "-3": "Thousands (1,000)",
    "-4": "Ten Thousands (10,000)",
    "-5": "Hundred Thousands (100,000)",
    "-6": "Millions (1,000,000)"
  };

  const placeName = placeNames[decimals.toString()] || (decimals > 0 ? `${decimals} Decimal Places` : `10^${Math.abs(decimals)}`);

  const methodNames: Record<string, string> = {
    halfUp: "Round Half Up (Standard Arithmetic)",
    halfDown: "Round Half Down",
    halfEven: "Banker's Rounding (Round Half to Even / IEEE 754)",
    halfOdd: "Round Half to Odd",
    up: "Round Up (Ceiling ⌈x⌉)",
    down: "Round Down (Floor ⌊x⌋)",
    towardZero: "Round Toward Zero (Truncate)",
    awayFromZero: "Round Away from Zero"
  };

  const latexFormula = `${parsed.normalizedStr} \\xrightarrow{\\text{round to } ${placeName}} ${exact.formattedString}`;

  return {
    originalValue: parsed.value,
    originalString: parsed.normalizedStr,
    roundedValue: exact.numericValue,
    roundedString: exact.formattedString,
    placeName,
    targetDigit: exact.targetDigit,
    decidingDigit: exact.decidingDigit,
    isExactMidpoint: exact.isExactMidpoint,
    decisionRule: exact.decisionRule,
    exactDifference: exact.exactDifference,
    percentageError: exact.percentageError,
    methodName: methodNames[method] || method,
    latexFormula
  };
}

/**
 * Bulk Column CSV Parser & Precision Rounding Processor
 */
export interface BulkCSVRow {
  rowNumber: number;
  originalValues: string[];
  roundedValues: string[];
  isHeader: boolean;
  isValid: boolean;
}

export interface BulkCSVResult {
  headers: string[];
  rows: BulkCSVRow[];
  totalRows: number;
  numericCount: number;
  delimiter: string;
}

export function parseAndRoundBulkCSV(
  csvContent: string,
  targetDecimals: number,
  method: RoundingMethod = "halfUp",
  customDelimiter?: string,
  hasHeader: boolean = true
): BulkCSVResult {
  if (!csvContent || typeof csvContent !== "string") {
    return { headers: [], rows: [], totalRows: 0, numericCount: 0, delimiter: "," };
  }

  // Auto-detect delimiter if not specified
  let delimiter = customDelimiter || ",";
  if (!customDelimiter) {
    const firstLine = csvContent.split(/\r?\n/)[0] || "";
    const commaCount = (firstLine.match(/,/g) || []).length;
    const tabCount = (firstLine.match(/\t/g) || []).length;
    const semiCount = (firstLine.match(/;/g) || []).length;
    if (tabCount > commaCount && tabCount > semiCount) delimiter = "\t";
    else if (semiCount > commaCount && semiCount > tabCount) delimiter = ";";
  }

  // Simple RFC-compatible CSV row splitter handling quotes
  const lines = csvContent.split(/\r?\n/).filter(line => line.trim().length > 0);
  if (lines.length === 0) {
    return { headers: [], rows: [], totalRows: 0, numericCount: 0, delimiter };
  }

  const parseLine = (line: string): string[] => {
    const result: string[] = [];
    let cur = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (c === '"') {
        if (inQuotes && line[i + 1] === '"') {
          cur += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (c === delimiter && !inQuotes) {
        result.push(cur.trim());
        cur = "";
      } else {
        cur += c;
      }
    }
    result.push(cur.trim());
    return result;
  };

  const parsedLines = lines.map(parseLine);
  let headers: string[] = [];
  let dataRowsStart = 0;

  if (hasHeader && parsedLines.length > 0) {
    headers = parsedLines[0];
    dataRowsStart = 1;
  }

  const rows: BulkCSVRow[] = [];
  let numericCount = 0;

  for (let r = dataRowsStart; r < parsedLines.length; r++) {
    const cols = parsedLines[r];
    const roundedCols: string[] = [];
    let rowHasNumeric = false;

    for (const cell of cols) {
      const parsed = parseNumberInput(cell);
      if (parsed.isValid) {
        const rounded = roundExactDecimal(parsed.normalizedStr, targetDecimals, method);
        roundedCols.push(rounded.formattedString);
        numericCount++;
        rowHasNumeric = true;
      } else {
        roundedCols.push(cell); // keep non-numeric text intact
      }
    }

    rows.push({
      rowNumber: r + 1,
      originalValues: cols,
      roundedValues: roundedCols,
      isHeader: false,
      isValid: rowHasNumeric
    });
  }

  return {
    headers,
    rows,
    totalRows: rows.length,
    numericCount,
    delimiter
  };
}

/**
 * Generate RFC-4180 compliant CSV string with escaping
 */
export function generateRFC4180CSV(headers: string[], dataRows: string[][]): string {
  const escapeCell = (cell: string): string => {
    if (cell === null || cell === undefined) return "";
    const str = cell.toString();
    if (str.includes(",") || str.includes('"') || str.includes("\n") || str.includes("\r")) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const lines: string[] = [];
  if (headers.length > 0) {
    lines.push(headers.map(escapeCell).join(","));
  }
  for (const row of dataRows) {
    lines.push(row.map(escapeCell).join(","));
  }
  return lines.join("\r\n");
}
