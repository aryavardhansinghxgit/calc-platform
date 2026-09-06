function gcd(a: number, b: number): number {
  a = Math.abs(Math.round(a));
  b = Math.abs(Math.round(b));
  while (b !== 0) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
}

export type RoundingMethod =
  | "halfUp"
  | "halfDown"
  | "halfEven"
  | "halfOdd"
  | "up"
  | "down"
  | "towardZero"
  | "awayFromZero";

export interface ParsedNumber {
  value: number;
  normalizedStr: string;
  isNegative: boolean;
  intPart: string;
  fracPart: string;
  isValid: boolean;
  errorMessage?: string;
}

export function parseNumberInput(input: string): ParsedNumber {
  if (!input || typeof input !== "string") {
    return { value: 0, normalizedStr: "0", isNegative: false, intPart: "0", fracPart: "", isValid: false, errorMessage: "Please enter a valid number or fraction." };
  }

  const trimmed = input.trim();
  if (!trimmed) {
    return { value: 0, normalizedStr: "0", isNegative: false, intPart: "0", fracPart: "", isValid: false, errorMessage: "Input cannot be empty." };
  }

  // 1. Check for mixed fraction: e.g. "12 3/8", "-12 3/8"
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
    const parts = absVal.toFixed(12).replace(/\.?0+$/, "").split(".");
    return {
      value: val,
      normalizedStr: val.toString(),
      isNegative: isNeg,
      intPart: parts[0] || "0",
      fracPart: parts[1] || "",
      isValid: true
    };
  }

  // 2. Check for simple fraction: e.g. "25/2", "-25/2", "3/4"
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
    const parts = absVal.toFixed(12).replace(/\.?0+$/, "").split(".");
    return {
      value: val,
      normalizedStr: val.toString(),
      isNegative: isNeg,
      intPart: parts[0] || "0",
      fracPart: parts[1] || "",
      isValid: true
    };
  }

  // 3. Remove commas from standard decimal / integer: "1,234.56"
  const cleanNum = trimmed.replace(/,/g, "");
  // Verify numeric validity
  if (!/^[-+]?((\d+(\.\d*)?)|(\.\d+))([eE][-+]?\d+)?$/.test(cleanNum)) {
    return { value: 0, normalizedStr: "0", isNegative: false, intPart: "0", fracPart: "", isValid: false, errorMessage: "Invalid number format." };
  }

  const val = Number(cleanNum);
  if (Number.isNaN(val) || !Number.isFinite(val)) {
    return { value: 0, normalizedStr: "0", isNegative: false, intPart: "0", fracPart: "", isValid: false, errorMessage: "Numeric value out of range." };
  }

  const isNeg = cleanNum.startsWith("-");
  const unsignedStr = isNeg || cleanNum.startsWith("+") ? cleanNum.slice(1) : cleanNum;

  // Handle scientific notation expansion if any
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

export function roundExactDecimal(
  input: string | number,
  decimals: number,
  method: RoundingMethod = "halfUp"
): {
  numericValue: number;
  formattedString: string;
  targetDigit: number;
  decidingDigit: number;
  isExactMidpoint: boolean;
  decisionRule: string;
} {
  const parsed = typeof input === "string" ? parseNumberInput(input) : parseNumberInput(input.toString());
  if (!parsed.isValid) {
    return {
      numericValue: 0,
      formattedString: "0",
      targetDigit: 0,
      decidingDigit: 0,
      isExactMidpoint: false,
      decisionRule: parsed.errorMessage || "Invalid input"
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
    // Rounding to decimal places (0 = ones, 1 = tenths, 2 = hundredths, etc.)
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

    // Determine increment based on algorithm
    switch (method) {
      case "up": // Ceiling
        doIncrement = !isNeg && hasAnyDiscarded;
        break;
      case "down": // Floor
        doIncrement = isNeg && hasAnyDiscarded;
        break;
      case "towardZero": // Truncate
        doIncrement = false;
        break;
      case "awayFromZero":
        doIncrement = hasAnyDiscarded;
        break;
      case "halfUp":
        // Symmetric round-half-up (away from zero on .5)
        doIncrement = decidingDigit >= 5;
        break;
      case "halfDown":
        doIncrement = isExactMidpoint ? false : decidingDigit >= 5;
        break;
      case "halfEven": // Banker's rounding
        if (isExactMidpoint) {
          doIncrement = targetDigit % 2 !== 0; // if odd, round up to even
        } else {
          doIncrement = decidingDigit >= 5;
        }
        break;
      case "halfOdd":
        if (isExactMidpoint) {
          doIncrement = targetDigit % 2 === 0; // if even, round up to odd
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
    // Rounding to whole number powers of 10 (tens = -1, hundreds = -2, thousands = -3)
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
    // Remove leading zeros if any
    const trimmedVal = BigInt(finalStr).toString();
    formattedResult = (isNeg && trimmedVal !== "0" ? "-" : "") + trimmedVal;
  }

  // Generate dynamic, mathematically consistent decision explanation
  let decisionRule = "";
  if (method === "halfUp") {
    if (decidingDigit >= 5) {
      decisionRule = `Since the deciding digit is ${decidingDigit} (≥ 5), the target digit ${targetDigit} rounds UP${doIncrement ? ` to ${(targetDigit + 1) % 10}` : ""}.`;
    } else {
      decisionRule = `Since the deciding digit is ${decidingDigit} (< 5), the target digit ${targetDigit} remains unchanged (rounds DOWN).`;
    }
  } else if (method === "halfEven") {
    if (isExactMidpoint) {
      decisionRule = `Exact midpoint encountered (deciding digit 5 followed by zeros). Banker's Rounding rounds to nearest EVEN digit: target digit ${targetDigit} ${doIncrement ? `rounds UP to ${targetDigit + 1}` : "remains unchanged"}.`;
    } else if (decidingDigit >= 5) {
      decisionRule = `Since the deciding digit is ${decidingDigit} (> 5), round UP.`;
    } else {
      decisionRule = `Since the deciding digit is ${decidingDigit} (< 5), round DOWN.`;
    }
  } else if (method === "up") {
    decisionRule = hasAnyDiscarded
      ? `Ceiling rule: any non-zero discarded fraction rounds toward +∞.`
      : `Value is already exact at target precision.`;
  } else if (method === "down") {
    decisionRule = hasAnyDiscarded
      ? `Floor rule: any non-zero discarded fraction rounds toward -∞.`
      : `Value is already exact at target precision.`;
  } else if (method === "towardZero") {
    decisionRule = `Truncate rule: fractional digits beyond target precision are discarded toward 0.`;
  } else if (method === "awayFromZero") {
    decisionRule = hasAnyDiscarded
      ? `Round away from zero: non-zero discarded fraction increases magnitude.`
      : `Value is already exact at target precision.`;
  } else {
    decisionRule = doIncrement ? `Round UP.` : `Round DOWN.`;
  }

  const numericValue = parseFloat(formattedResult);

  return {
    numericValue,
    formattedString: formattedResult,
    targetDigit,
    decidingDigit,
    isExactMidpoint,
    decisionRule
  };
}

// Test cases verification
const testCases = [
  { val: "1.005", d: 2, m: "halfUp" as RoundingMethod, expNum: 1.01, expStr: "1.01" },
  { val: "644.925", d: 2, m: "halfUp" as RoundingMethod, expNum: 644.93, expStr: "644.93" },
  { val: "-9.995", d: 2, m: "halfUp" as RoundingMethod, expNum: -10.0, expStr: "-10.00" },
  { val: "12.34567", d: 2, m: "halfUp" as RoundingMethod, expNum: 12.35, expStr: "12.35" },
  { val: "12.34467", d: 2, m: "halfUp" as RoundingMethod, expNum: 12.34, expStr: "12.34" },
  { val: "2.5", d: 0, m: "halfUp" as RoundingMethod, expNum: 3, expStr: "3" },
  { val: "-2.5", d: 0, m: "halfUp" as RoundingMethod, expNum: -3, expStr: "-3" },
  { val: "2.5", d: 0, m: "halfEven" as RoundingMethod, expNum: 2, expStr: "2" },
  { val: "3.5", d: 0, m: "halfEven" as RoundingMethod, expNum: 4, expStr: "4" },
  { val: "4.5", d: 0, m: "halfEven" as RoundingMethod, expNum: 4, expStr: "4" },
  { val: "5.5", d: 0, m: "halfEven" as RoundingMethod, expNum: 6, expStr: "6" },
  { val: "-2.5", d: 0, m: "halfEven" as RoundingMethod, expNum: -2, expStr: "-2" },
  { val: "-3.5", d: 0, m: "halfEven" as RoundingMethod, expNum: -4, expStr: "-4" },
  { val: "9.99", d: 1, m: "halfUp" as RoundingMethod, expNum: 10, expStr: "10.0" },
  { val: "999.995", d: 2, m: "halfUp" as RoundingMethod, expNum: 1000, expStr: "1000.00" },
  { val: "12.3", d: 3, m: "halfUp" as RoundingMethod, expNum: 12.3, expStr: "12.300" },
  { val: "1234567.891234", d: -3, m: "halfUp" as RoundingMethod, expNum: 1235000, expStr: "1235000" },
  { val: "1234567.891234", d: -2, m: "halfUp" as RoundingMethod, expNum: 1234600, expStr: "1234600" },
  { val: "1234567.891234", d: -1, m: "halfUp" as RoundingMethod, expNum: 1234570, expStr: "1234570" },
  { val: "5.7", d: 0, m: "up" as RoundingMethod, expNum: 6, expStr: "6" },
  { val: "5.7", d: 0, m: "down" as RoundingMethod, expNum: 5, expStr: "5" },
  { val: "-5.7", d: 0, m: "up" as RoundingMethod, expNum: -5, expStr: "-5" },
  { val: "-5.7", d: 0, m: "down" as RoundingMethod, expNum: -6, expStr: "-6" },
];

let allPass = true;
for (const tc of testCases) {
  const res = roundExactDecimal(tc.val, tc.d, tc.m);
  const pass = res.formattedString === tc.expStr && Math.abs(res.numericValue - tc.expNum) < 1e-9;
  if (!pass) {
    console.log(`FAIL: val=${tc.val}, d=${tc.d}, m=${tc.m} => expStr=${tc.expStr}, actStr=${res.formattedString}, expNum=${tc.expNum}, actNum=${res.numericValue}`);
    allPass = false;
  } else {
    console.log(`PASS: val=${tc.val} (d=${tc.d}, m=${tc.m}) -> ${res.formattedString} (targetDigit=${res.targetDigit}, decidingDigit=${res.decidingDigit})`);
  }
}

console.log("All Test Cases Passed:", allPass);
