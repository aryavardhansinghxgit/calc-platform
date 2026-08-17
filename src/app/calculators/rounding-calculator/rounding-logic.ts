/**
 * Core mathematical engine for Rounding Calculator & Numerical Precision Suite
 */

export type RoundingMethod =
  | "halfUp"        // Standard arithmetic / School method (0.5 -> up)
  | "halfDown"      // 0.5 -> down towards -infinity
  | "halfEven"      // Banker's Rounding / IEEE 754 (round 0.5 to nearest even)
  | "halfOdd"       // Round 0.5 to nearest odd
  | "up"            // Ceiling ⌈x⌉
  | "down"          // Floor ⌊x⌋
  | "towardZero"    // Truncate / Chop
  | "awayFromZero"; // Round away from zero

export interface RoundingStepExplanation {
  originalValue: number;
  roundedValue: number;
  placeName: string;
  targetDigit: number;
  decidingDigit: number;
  decisionRule: string;
  exactDifference: number;
  percentageError: number;
  methodName: string;
}

export interface NumberLineData {
  lowerBound: number;
  upperBound: number;
  originalPoint: number;
  roundedPoint: number;
  direction: "up" | "down" | "stay";
}

/**
 * Execute core tie-breaking rounding algorithm on a scaled number
 */
export function executeRoundingMethod(val: number, method: RoundingMethod): number {
  if (Number.isNaN(val) || !Number.isFinite(val)) return val;

  const floorVal = Math.floor(val);
  const diff = val - floorVal;
  const isPositive = val >= 0;

  switch (method) {
    case "up":
      return Math.ceil(val);

    case "down":
      return Math.floor(val);

    case "towardZero":
      return isPositive ? Math.floor(val) : Math.ceil(val);

    case "awayFromZero":
      return isPositive ? Math.ceil(val) : Math.floor(val);

    case "halfUp":
      if (isPositive) {
        return diff >= 0.5 ? Math.ceil(val) : Math.floor(val);
      } else {
        const absDiff = Math.abs(val) - Math.floor(Math.abs(val));
        return absDiff >= 0.5 ? Math.floor(val) : Math.ceil(val);
      }

    case "halfDown":
      if (diff > 0.5) return Math.ceil(val);
      if (diff < 0.5) return Math.floor(val);
      return Math.floor(val); // 0.5 -> down

    case "halfEven": {
      if (Math.abs(diff - 0.5) < 1e-12) {
        const evenCheck = Math.floor(val);
        return evenCheck % 2 === 0 ? evenCheck : evenCheck + 1;
      }
      return diff > 0.5 ? Math.ceil(val) : Math.floor(val);
    }

    case "halfOdd": {
      if (Math.abs(diff - 0.5) < 1e-12) {
        const check = Math.floor(val);
        return check % 2 !== 0 ? check : check + 1;
      }
      return diff > 0.5 ? Math.ceil(val) : Math.floor(val);
    }

    default:
      return Math.round(val);
  }
}

/**
 * Round to specified decimal places or place value factor
 */
export function roundByPlaceValue(val: number, decimals: number, method: RoundingMethod = "halfUp"): number {
  if (decimals === 0) {
    return executeRoundingMethod(val, method);
  }
  const factor = Math.pow(10, decimals);
  const scaled = val * factor;
  const roundedScaled = executeRoundingMethod(scaled, method);
  return roundedScaled / factor;
}

/**
 * Round to N significant figures
 */
export function roundBySigFigs(val: number, sigFigs: number, method: RoundingMethod = "halfUp"): {
  roundedValue: number;
  scientificNotation: string;
  formattedString: string;
} {
  if (val === 0 || !Number.isFinite(val)) {
    return { roundedValue: 0, scientificNotation: "0", formattedString: "0" };
  }

  const n = Math.max(1, Math.round(sigFigs));
  const magnitude = Math.floor(Math.log10(Math.abs(val)));
  const scale = Math.pow(10, n - 1 - magnitude);
  const scaled = val * scale;
  const roundedScaled = executeRoundingMethod(scaled, method);
  const roundedValue = roundedScaled / scale;

  const scientificNotation = roundedValue.toExponential(n - 1);
  const formattedString = roundedValue.toPrecision(n);

  return { roundedValue, scientificNotation, formattedString };
}

/**
 * Round to nearest fraction denominator (1/2, 1/4, 1/8, 1/16, 1/32)
 */
export function roundToNearestFraction(val: number, denominator: number, method: RoundingMethod = "halfUp"): {
  roundedValue: number;
  fractionString: string;
  wholePart: number;
  numPart: number;
  denPart: number;
} {
  const den = Math.max(1, Math.round(denominator));
  const scaled = val * den;
  const roundedNumerator = executeRoundingMethod(scaled, method);
  const roundedValue = roundedNumerator / den;

  const wholePart = Math.floor(Math.abs(roundedValue)) * (roundedValue < 0 ? -1 : 1);
  const remainderNumerator = Math.abs(roundedNumerator) % den;

  let fractionString = "";
  if (remainderNumerator === 0) {
    fractionString = `${wholePart}`;
  } else if (wholePart === 0) {
    fractionString = `${roundedValue < 0 ? "-" : ""}${remainderNumerator}/${den}`;
  } else {
    fractionString = `${wholePart} ${remainderNumerator}/${den}`;
  }

  return {
    roundedValue,
    fractionString,
    wholePart,
    numPart: remainderNumerator,
    denPart: den
  };
}

/**
 * Round to nearest custom multiple (e.g. 5, 10, 25, 50, 1000)
 */
export function roundToNearestMultiple(val: number, multiple: number, method: RoundingMethod = "halfUp"): number {
  if (multiple <= 0) return val;
  const scaled = val / multiple;
  const roundedScaled = executeRoundingMethod(scaled, method);
  return roundedScaled * multiple;
}

/**
 * Swedish Cash Rounding to nearest coin denomination ($0.01, $0.05, $0.10, $0.25, $1.00)
 */
export function roundCurrencyCash(val: number, denomination: number, method: RoundingMethod = "halfUp"): {
  roundedValue: number;
  currencyString: string;
} {
  const roundedValue = roundToNearestMultiple(val, denomination, method);
  const currencyString = `$${roundedValue.toFixed(2)}`;
  return { roundedValue, currencyString };
}

/**
 * Compute Exact Error Delta and Absolute Percentage Error
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
 * Generate 2D Number Line coordinates
 */
export function generateNumberLineData(original: number, rounded: number, step: number = 1): NumberLineData {
  const lowerBound = Math.floor(original / step) * step;
  const upperBound = lowerBound + step;
  let direction: "up" | "down" | "stay" = "stay";

  if (rounded > original) direction = "up";
  else if (rounded < original) direction = "down";

  return {
    lowerBound,
    upperBound,
    originalPoint: original,
    roundedPoint: rounded,
    direction
  };
}

/**
 * Generate step-by-step decision rule explanation
 */
export function explainRoundingStepByStep(val: number, decimals: number, method: RoundingMethod = "halfUp"): RoundingStepExplanation {
  const roundedValue = roundByPlaceValue(val, decimals, method);
  const { exactDifference, percentageError } = computeErrorDelta(val, roundedValue);

  const placeNames: Record<string, string> = {
    "-6": "Millionths (0.000001)",
    "-5": "Hundred-Thousandths (0.00001)",
    "-4": "Ten-Thousandths (0.0001)",
    "-3": "Thousandths (0.001)",
    "-2": "Hundredths (0.01)",
    "-1": "Tenths (0.1)",
    "0": "Ones / Units (1)",
    "1": "Tens (10)",
    "2": "Hundreds (100)",
    "3": "Thousands (1,000)",
    "4": "Ten Thousands (10,000)",
    "5": "Hundred Thousands (100,000)",
    "6": "Millions (1,000,000)"
  };

  const placeName = placeNames[decimals.toString()] || `${decimals} Decimal Places`;

  // Extract deciding digit directly to the right of target digit
  const str = Math.abs(val).toFixed(Math.max(0, decimals + 4));
  const dotIndex = str.indexOf(".");
  let decidingDigit = 0;

  if (decimals >= 0) {
    // Whole place value: inspecting digit to right
    const intPart = Math.abs(Math.floor(val)).toString();
    const rightPos = intPart.length - decimals;
    if (rightPos >= 0 && rightPos < intPart.length) {
      decidingDigit = parseInt(intPart[rightPos], 10) || 0;
    }
  } else {
    // Decimal place: inspecting digit at decimals+1 position
    const decPos = dotIndex + Math.abs(decimals) + 1;
    if (decPos < str.length) {
      decidingDigit = parseInt(str[decPos], 10) || 0;
    }
  }

  let decisionRule = "";
  if (decidingDigit >= 5) {
    decisionRule = `Since the deciding digit is ${decidingDigit} (≥ 5), we round the target digit UP.`;
  } else {
    decisionRule = `Since the deciding digit is ${decidingDigit} (< 5), we keep the target digit unchanged (round DOWN).`;
  }

  const methodNames: Record<string, string> = {
    halfUp: "Round Half Up (Standard Arithmetic)",
    halfDown: "Round Half Down",
    halfEven: "Banker's Rounding (Round Half to Even)",
    halfOdd: "Round Half to Odd",
    up: "Round Up (Ceiling ⌈x⌉)",
    down: "Round Down (Floor ⌊x⌋)",
    towardZero: "Round Toward Zero (Truncate)",
    awayFromZero: "Round Away from Zero"
  };

  return {
    originalValue: val,
    roundedValue,
    placeName,
    targetDigit: 0,
    decidingDigit,
    decisionRule,
    exactDifference,
    percentageError,
    methodName: methodNames[method] || method
  };
}
