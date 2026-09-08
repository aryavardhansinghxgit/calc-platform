/**
 * Pure Mathematical Calculation Engine for Roman Numeral Suite
 * Compliant with Classical Latin Epigraphic Standards, Strict Canonical Additive/Subtractive Grammar,
 * Medieval Vinculum (Overline) Notation, and Real Calendar Validation.
 */

export interface RomanSymbol {
  symbol: string;
  unicodeSymbol: string;
  value: number;
  isVinculum: boolean;
  name: string;
}

export const ROMAN_SYMBOLS_TABLE: RomanSymbol[] = [
  { symbol: "_M", unicodeSymbol: "M̅", value: 1000000, isVinculum: true, name: "1,000,000 (Overline M)" },
  { symbol: "_D", unicodeSymbol: "D̅", value: 500000, isVinculum: true, name: "500,000 (Overline D)" },
  { symbol: "_C", unicodeSymbol: "C̅", value: 100000, isVinculum: true, name: "100,000 (Overline C)" },
  { symbol: "_L", unicodeSymbol: "L̅", value: 50000, isVinculum: true, name: "50,000 (Overline L)" },
  { symbol: "_X", unicodeSymbol: "X̅", value: 10000, isVinculum: true, name: "10,000 (Overline X)" },
  { symbol: "_V", unicodeSymbol: "V̅", value: 5000, isVinculum: true, name: "5,000 (Overline V)" },
  { symbol: "_I_V", unicodeSymbol: "I̅V̅", value: 4000, isVinculum: true, name: "4,000 (Overline IV)" },
  { symbol: "M", unicodeSymbol: "M", value: 1000, isVinculum: false, name: "1,000 (Mille)" },
  { symbol: "CM", unicodeSymbol: "CM", value: 900, isVinculum: false, name: "900 (Centum from Mille)" },
  { symbol: "D", unicodeSymbol: "D", value: 500, isVinculum: false, name: "500 (Quingenti)" },
  { symbol: "CD", unicodeSymbol: "CD", value: 400, isVinculum: false, name: "400 (Centum from Quingenti)" },
  { symbol: "C", unicodeSymbol: "C", value: 100, isVinculum: false, name: "100 (Centum)" },
  { symbol: "XC", unicodeSymbol: "XC", value: 90, isVinculum: false, name: "90 (Decem from Centum)" },
  { symbol: "L", unicodeSymbol: "L", value: 50, isVinculum: false, name: "50 (Quinquaginta)" },
  { symbol: "XL", unicodeSymbol: "XL", value: 40, isVinculum: false, name: "40 (Decem from Quinquaginta)" },
  { symbol: "X", unicodeSymbol: "X", value: 10, isVinculum: false, name: "10 (Decem)" },
  { symbol: "IX", unicodeSymbol: "IX", value: 9, isVinculum: false, name: "9 (Unus from Decem)" },
  { symbol: "V", unicodeSymbol: "V", value: 5, isVinculum: false, name: "5 (Quinque)" },
  { symbol: "IV", unicodeSymbol: "IV", value: 4, isVinculum: false, name: "4 (Unus from Quinque)" },
  { symbol: "I", unicodeSymbol: "I", value: 1, isVinculum: false, name: "1 (Unus)" },
];

export interface ExpansionPart {
  placeValue: number;
  arabicPart: number;
  romanPart: string;
  unicodePart: string;
  explanation: string;
}

export interface RomanConversionResult {
  arabicNumber: number;
  romanAscii: string;
  romanUnicode: string;
  expansionParts: ExpansionPart[];
  stepByStepFormula: string;
  activeSymbols: string[];
  isValid: boolean;
  errorMessage?: string;
}

// ─── CLASSICAL LOOKUP TABLE (1 TO 3999) ──────────────────────────────────────

const CLASSICAL_TABLE: [number, string][] = [
  [1000, "M"],
  [900, "CM"],
  [500, "D"],
  [400, "CD"],
  [100, "C"],
  [90, "XC"],
  [50, "L"],
  [40, "XL"],
  [10, "X"],
  [9, "IX"],
  [5, "V"],
  [4, "IV"],
  [1, "I"],
];

/**
 * Encodes an integer 1..3999 into canonical classical Roman numerals.
 */
function classicalArabicToRoman(num: number): string {
  if (num < 1 || num > 3999) return "";
  let rem = num;
  let res = "";
  for (const [val, sym] of CLASSICAL_TABLE) {
    while (rem >= val) {
      res += sym;
      rem -= val;
    }
  }
  return res;
}

/**
 * Strict classical Roman numeral regex (1..3999).
 * Enforces:
 * - At most 3 consecutive M, C, X, I
 * - Non-repeating D, L, V
 * - Only valid subtractive pairs: IV, IX, XL, XC, CD, CM
 * - Strict place-value descending order
 */
const STRICT_CLASSICAL_REGEX =
  /^(M{0,3})(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;

/**
 * Encodes an integer into canonical Roman numerals.
 * Supports standard range 1..3,999 and Vinculum overline range 4,000..3,999,999.
 */
export function arabicToRoman(num: number, useVinculum = true): RomanConversionResult {
  if (!Number.isFinite(num) || !Number.isInteger(num)) {
    return {
      arabicNumber: 0,
      romanAscii: "",
      romanUnicode: "",
      expansionParts: [],
      stepByStepFormula: "",
      activeSymbols: [],
      isValid: false,
      errorMessage: "Please enter a valid whole integer.",
    };
  }

  if (num === 0) {
    return {
      arabicNumber: 0,
      romanAscii: "",
      romanUnicode: "",
      expansionParts: [],
      stepByStepFormula: "",
      activeSymbols: [],
      isValid: false,
      errorMessage:
        "Classical Roman numerals do not have a symbol for zero (the Romans used 'nulla' or the letter 'N' for empty balances).",
    };
  }

  if (num < 0) {
    return {
      arabicNumber: num,
      romanAscii: "",
      romanUnicode: "",
      expansionParts: [],
      stepByStepFormula: "",
      activeSymbols: [],
      isValid: false,
      errorMessage: "Classical Roman numerals cannot represent negative numbers.",
    };
  }

  if (num > 3999999) {
    return {
      arabicNumber: num,
      romanAscii: "",
      romanUnicode: "",
      expansionParts: [],
      stepByStepFormula: "",
      activeSymbols: [],
      isValid: false,
      errorMessage: "Number exceeds maximum supported range (3,999,999).",
    };
  }

  if (!useVinculum && num > 3999) {
    return {
      arabicNumber: num,
      romanAscii: "",
      romanUnicode: "",
      expansionParts: [],
      stepByStepFormula: "",
      activeSymbols: [],
      isValid: false,
      errorMessage:
        "Standard classical Roman numerals max out at 3,999 (MMMCMXCIX). Enable 'Vinculum Overlines' to convert numbers ≥ 4,000.",
    };
  }

  let romanUnicode = "";
  let romanAscii = "";
  const activeSymbolsSet = new Set<string>();

  if (num <= 3999) {
    romanUnicode = classicalArabicToRoman(num);
    romanAscii = romanUnicode;
    for (const ch of romanUnicode) {
      activeSymbolsSet.add(ch);
    }
  } else {
    // Vinculum decomposition: thousands part and units part
    const thousands = Math.floor(num / 1000);
    const remainder = num % 1000;

    const thousandsClassical = classicalArabicToRoman(thousands);
    // Add combining macron to each character of the thousands portion
    let thousandsUnicode = "";
    let thousandsAscii = "";
    for (const ch of thousandsClassical) {
      thousandsUnicode += `${ch}\u0305`;
      thousandsAscii += `_${ch}`;
      activeSymbolsSet.add(ch);
    }

    const remainderClassical = remainder > 0 ? classicalArabicToRoman(remainder) : "";
    for (const ch of remainderClassical) {
      activeSymbolsSet.add(ch);
    }

    romanUnicode = thousandsUnicode + remainderClassical;
    romanAscii = thousandsAscii + remainderClassical;
  }

  // Decompose by decimal place value (e.g. 1994 -> 1000 + 900 + 90 + 4)
  const expansionParts: ExpansionPart[] = [];
  const numStr = num.toString();
  const len = numStr.length;

  for (let i = 0; i < len; i++) {
    const digit = parseInt(numStr[i], 10);
    if (digit === 0) continue;
    const place = Math.pow(10, len - i - 1);
    const partValue = digit * place;

    let partUni = "";
    let partAscii = "";

    if (partValue <= 3999) {
      partUni = classicalArabicToRoman(partValue);
      partAscii = partUni;
    } else {
      const pThou = Math.floor(partValue / 1000);
      const pRem = partValue % 1000;
      const tClass = classicalArabicToRoman(pThou);
      for (const ch of tClass) {
        partUni += `${ch}\u0305`;
        partAscii += `_${ch}`;
      }
      if (pRem > 0) {
        const rClass = classicalArabicToRoman(pRem);
        partUni += rClass;
        partAscii += rClass;
      }
    }

    expansionParts.push({
      placeValue: place,
      arabicPart: partValue,
      romanPart: partAscii,
      unicodePart: partUni,
      explanation: `${partValue.toLocaleString("en-US")} = ${partUni}`,
    });
  }

  const stepByStep =
    expansionParts.map((p) => `${p.arabicPart.toLocaleString("en-US")} (${p.unicodePart})`).join(" + ") +
    ` = ${romanUnicode}`;

  return {
    arabicNumber: num,
    romanAscii,
    romanUnicode,
    expansionParts,
    stepByStepFormula: stepByStep,
    activeSymbols: Array.from(activeSymbolsSet),
    isValid: true,
  };
}

/**
 * Parses raw Roman numeral string, strictly validating against classical grammar
 * and Vinculum overline conventions.
 */
export function romanToArabic(rawRoman: string): {
  arabicNumber: number;
  isValid: boolean;
  errorMessage?: string;
  expansionParts: ExpansionPart[];
  stepByStepFormula: string;
} {
  if (!rawRoman || rawRoman.trim() === "") {
    return {
      arabicNumber: 0,
      isValid: false,
      errorMessage: "Please enter a Roman numeral.",
      expansionParts: [],
      stepByStepFormula: "",
    };
  }

  const trimmed = rawRoman.trim();

  // Normalize combining macrons (\u0304, \u0305) and overlines
  // e.g. "V̅" -> "_V", "X\u0305" -> "_X"
  const normalizedOverlines = trimmed
    .replace(/([IVXLCDMivxlcdm])[\u0304\u0305\u033F]/g, "_$1")
    .toUpperCase();

  // Check for internal whitespace corruption
  if (/\s{2,}/.test(normalizedOverlines)) {
    return {
      arabicNumber: 0,
      isValid: false,
      errorMessage: "Invalid Roman numeral format: unexpected whitespace sequence.",
      expansionParts: [],
      stepByStepFormula: "",
    };
  }

  // Remove single spacing or dots between tokens
  const cleanTokens = normalizedOverlines.replace(/[\s\.\•\/\-]+/g, "");

  // Check for illegal characters
  const illegalMatch = cleanTokens.match(/[^IVXLCDM_]/);
  if (illegalMatch) {
    return {
      arabicNumber: 0,
      isValid: false,
      errorMessage: `Invalid character '${illegalMatch[0]}' in Roman numeral. Allowed symbols are I, V, X, L, C, D, M (and overlines).`,
      expansionParts: [],
      stepByStepFormula: "",
    };
  }

  // Split into Vinculum (prefixed with _) and Classical components
  let thousandsStr = "";
  let classicalStr = "";

  let i = 0;
  while (i < cleanTokens.length) {
    if (cleanTokens[i] === "_") {
      if (i + 1 < cleanTokens.length) {
        thousandsStr += cleanTokens[i + 1];
        i += 2;
      } else {
        return {
          arabicNumber: 0,
          isValid: false,
          errorMessage: "Malformed vinculum overline syntax: trailing underscore without symbol.",
          expansionParts: [],
          stepByStepFormula: "",
        };
      }
    } else {
      classicalStr += cleanTokens[i];
      i++;
    }
  }

  // Check specific common grammar mistakes for classical component
  const testGrammar = (str: string, isVinculum = false) => {
    if (!str) return null;

    // Check repetition limit: more than 3 consecutive I, X, C, M
    if (/I{4,}/.test(str)) {
      return "Invalid repetition: 'I' cannot appear more than 3 consecutive times (4 is IV).";
    }
    if (/X{4,}/.test(str)) {
      return "Invalid repetition: 'X' cannot appear more than 3 consecutive times (40 is XL).";
    }
    if (/C{4,}/.test(str)) {
      return "Invalid repetition: 'C' cannot appear more than 3 consecutive times (400 is CD).";
    }
    if (/M{4,}/.test(str)) {
      return "Invalid repetition: 'M' cannot appear more than 3 consecutive times in standard notation (use Vinculum for ≥ 4,000).";
    }

    // V, L, D never repeated
    if (/V{2,}/.test(str)) {
      return "Invalid repetition: 'V' cannot be repeated (10 is X).";
    }
    if (/L{2,}/.test(str)) {
      return "Invalid repetition: 'L' cannot be repeated (100 is C).";
    }
    if (/D{2,}/.test(str)) {
      return "Invalid repetition: 'D' cannot be repeated (1000 is M).";
    }

    // Invalid subtractive symbols: V, L, D cannot be subtracted
    if (/V[XLCDM]/.test(str)) {
      return "Invalid subtractive pair: 'V' can never be subtracted.";
    }
    if (/L[CDM]/.test(str)) {
      return "Invalid subtractive pair: 'L' can never be subtracted.";
    }
    if (/DM/.test(str)) {
      return "Invalid subtractive pair: 'D' can never be subtracted.";
    }

    // Invalid subtractive distance: I can only subtract from V and X
    if (/I[LCDM]/.test(str)) {
      const match = str.match(/I[LCDM]/)![0];
      return `Invalid subtractive pair '${match}': 'I' can only precede 'V' or 'X'.`;
    }

    // Invalid subtractive distance: X can only subtract from L and C
    if (/X[DM]/.test(str)) {
      const match = str.match(/X[DM]/)![0];
      return `Invalid subtractive pair '${match}': 'X' can only precede 'L' or 'C'.`;
    }

    // Multiple subtractive: e.g. IIV, IIX, XXL, CCD
    if (/I{2,}[VX]/.test(str) || /X{2,}[LC]/.test(str) || /C{2,}[DM]/.test(str)) {
      return "Invalid multiple subtractive notation (e.g. 'IIV' or 'XXL'). Only one subtractive symbol is permitted before a larger value.";
    }

    // Non-canonical grammar check against strict regex
    if (!STRICT_CLASSICAL_REGEX.test(str)) {
      return `Invalid Roman numeral grammar in '${str}'. Please follow standard additive-subtractive ordering.`;
    }

    return null;
  };

  if (thousandsStr) {
    const thErr = testGrammar(thousandsStr, true);
    if (thErr) {
      return {
        arabicNumber: 0,
        isValid: false,
        errorMessage: `Overline portion error: ${thErr}`,
        expansionParts: [],
        stepByStepFormula: "",
      };
    }
  }

  if (classicalStr) {
    const clErr = testGrammar(classicalStr, false);
    if (clErr) {
      return {
        arabicNumber: 0,
        isValid: false,
        errorMessage: clErr,
        expansionParts: [],
        stepByStepFormula: "",
      };
    }
  }

  // Calculate decimal value
  const parseClassical = (s: string): number => {
    if (!s) return 0;
    const valueMap: Record<string, number> = {
      I: 1,
      V: 5,
      X: 10,
      L: 50,
      C: 100,
      D: 500,
      M: 1000,
    };
    let sum = 0;
    for (let idx = 0; idx < s.length; idx++) {
      const current = valueMap[s[idx]];
      const next = idx + 1 < s.length ? valueMap[s[idx + 1]] : 0;
      if (current < next) {
        sum -= current;
      } else {
        sum += current;
      }
    }
    return sum;
  };

  const thouVal = parseClassical(thousandsStr);
  const classVal = parseClassical(classicalStr);
  const total = thouVal * 1000 + classVal;

  if (total === 0) {
    return {
      arabicNumber: 0,
      isValid: false,
      errorMessage: "No valid Roman numeral symbols found.",
      expansionParts: [],
      stepByStepFormula: "",
    };
  }

  // Final canonical verification: the re-encoded form must match input
  const canon = arabicToRoman(total, !!thousandsStr);
  if (!canon.isValid) {
    return {
      arabicNumber: 0,
      isValid: false,
      errorMessage: canon.errorMessage || "Invalid Roman numeral format.",
      expansionParts: [],
      stepByStepFormula: "",
    };
  }

  return {
    arabicNumber: total,
    isValid: true,
    expansionParts: canon.expansionParts,
    stepByStepFormula: canon.stepByStepFormula,
  };
}

// ─── CARD 2: ROMAN DATE CONVERTER ───────────────────────────────────────────

export interface RomanDateResult {
  monthRoman: string;
  dayRoman: string;
  yearRoman: string;
  formattedMDY: string;
  formattedDMY: string;
  formattedYMD: string;
  formattedClassicDots: string;
  isValid: boolean;
  errorMessage?: string;
}

/**
 * Validates real calendar dates, including exact leap year calculations and month boundaries.
 */
export function isValidCalendarDate(
  year: number,
  month: number,
  day: number
): { isValid: boolean; errorMessage?: string } {
  if (!Number.isInteger(year) || year < 1 || year > 3999) {
    return { isValid: false, errorMessage: "Year must be a valid integer between 1 and 3,999." };
  }
  if (!Number.isInteger(month) || month < 1 || month > 12) {
    return { isValid: false, errorMessage: "Month must be between 1 and 12." };
  }

  const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  const daysInMonth = [0, 31, isLeapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const maxDay = daysInMonth[month];

  if (!Number.isInteger(day) || day < 1 || day > maxDay) {
    if (month === 2 && day === 29 && !isLeapYear) {
      return {
        isValid: false,
        errorMessage: `February ${year} is not a leap year and only has 28 days (February 29 does not exist in ${year}).`,
      };
    }
    const monthNames = [
      "", "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return {
      isValid: false,
      errorMessage: `Invalid calendar date: ${monthNames[month]} only has ${maxDay} days (entered ${day}).`,
    };
  }

  return { isValid: true };
}

export function convertDateToRoman(
  year: number,
  month: number,
  day: number,
  separator = " • "
): RomanDateResult {
  const dateCheck = isValidCalendarDate(year, month, day);
  if (!dateCheck.isValid) {
    return {
      monthRoman: "",
      dayRoman: "",
      yearRoman: "",
      formattedMDY: "",
      formattedDMY: "",
      formattedYMD: "",
      formattedClassicDots: "",
      isValid: false,
      errorMessage: dateCheck.errorMessage,
    };
  }

  const monthRom = classicalArabicToRoman(month);
  const dayRom = classicalArabicToRoman(day);
  const yearRom = classicalArabicToRoman(year);
  const sep = separator || " • ";

  return {
    monthRoman: monthRom,
    dayRoman: dayRom,
    yearRoman: yearRom,
    formattedMDY: `${monthRom}${sep}${dayRom}${sep}${yearRom}`,
    formattedDMY: `${dayRom}${sep}${monthRom}${sep}${yearRom}`,
    formattedYMD: `${yearRom}${sep}${monthRom}${sep}${dayRom}`,
    formattedClassicDots: `${dayRom}.${monthRom}.${yearRom}`,
    isValid: true,
  };
}

// ─── CARD 3: ROMAN NUMERAL ARITHMETIC SOLVER ────────────────────────────────

export interface RomanArithmeticResult {
  op1Arabic: number;
  op1Roman: string;
  op2Arabic: number;
  op2Roman: string;
  operator: "+" | "-" | "×" | "÷";
  resultArabic: number;
  resultRoman: string;
  quotient?: number;
  remainder?: number;
  remainderRoman?: string;
  stepsExplanation: string;
  isValid: boolean;
  errorMessage?: string;
}

export function calculateRomanArithmetic(
  op1Str: string,
  op2Str: string,
  operator: "+" | "-" | "×" | "÷"
): RomanArithmeticResult {
  const parseOperand = (raw: string, label: string): { val: number; rom: string; error?: string } => {
    const s = raw.trim();
    if (!s) {
      return { val: 0, rom: "", error: `Please enter ${label}.` };
    }
    if (/^\d+$/.test(s)) {
      const n = parseInt(s, 10);
      if (n < 1 || n > 3999999) {
        return { val: 0, rom: "", error: `${label} must be between 1 and 3,999,999.` };
      }
      return { val: n, rom: arabicToRoman(n).romanUnicode };
    }
    const parsed = romanToArabic(s);
    if (!parsed.isValid) {
      return { val: 0, rom: "", error: `Invalid ${label} ('${s}'): ${parsed.errorMessage}` };
    }
    return { val: parsed.arabicNumber, rom: arabicToRoman(parsed.arabicNumber).romanUnicode };
  };

  const parsed1 = parseOperand(op1Str, "first operand");
  if (parsed1.error) {
    return {
      op1Arabic: 0,
      op1Roman: op1Str,
      op2Arabic: 0,
      op2Roman: op2Str,
      operator,
      resultArabic: 0,
      resultRoman: "",
      stepsExplanation: "",
      isValid: false,
      errorMessage: parsed1.error,
    };
  }

  // Check for division by zero upfront
  if (operator === "÷" && (op2Str.trim() === "0" || op2Str.trim().toLowerCase() === "nulla" || op2Str.trim().toUpperCase() === "N")) {
    return {
      op1Arabic: parsed1.val,
      op1Roman: parsed1.rom,
      op2Arabic: 0,
      op2Roman: op2Str,
      operator,
      resultArabic: 0,
      resultRoman: "",
      stepsExplanation: "Division by zero is mathematically undefined.",
      isValid: false,
      errorMessage: "Division by zero is mathematically undefined.",
    };
  }

  const parsed2 = parseOperand(op2Str, "second operand");
  if (parsed2.error) {
    return {
      op1Arabic: parsed1.val,
      op1Roman: parsed1.rom,
      op2Arabic: 0,
      op2Roman: op2Str,
      operator,
      resultArabic: 0,
      resultRoman: "",
      stepsExplanation: "",
      isValid: false,
      errorMessage: parsed2.error,
    };
  }

  const num1 = parsed1.val;
  const rom1 = parsed1.rom;
  const num2 = parsed2.val;
  const rom2 = parsed2.rom;

  if (operator === "+") {
    const sum = num1 + num2;
    if (sum > 3999999) {
      return {
        op1Arabic: num1,
        op1Roman: rom1,
        op2Arabic: num2,
        op2Roman: rom2,
        operator,
        resultArabic: sum,
        resultRoman: "",
        stepsExplanation: "",
        isValid: false,
        errorMessage: `Arithmetic overflow: ${num1} + ${num2} = ${sum.toLocaleString("en-US")} exceeds maximum Roman numeral limit (3,999,999).`,
      };
    }
    const romRes = arabicToRoman(sum).romanUnicode;
    return {
      op1Arabic: num1,
      op1Roman: rom1,
      op2Arabic: num2,
      op2Roman: rom2,
      operator,
      resultArabic: sum,
      resultRoman: romRes,
      stepsExplanation: `${rom1} (${num1.toLocaleString("en-US")}) + ${rom2} (${num2.toLocaleString("en-US")}) = ${romRes} (${sum.toLocaleString("en-US")})`,
      isValid: true,
    };
  }

  if (operator === "-") {
    if (num1 === num2) {
      return {
        op1Arabic: num1,
        op1Roman: rom1,
        op2Arabic: num2,
        op2Roman: rom2,
        operator,
        resultArabic: 0,
        resultRoman: "nulla",
        stepsExplanation: `${rom1} (${num1}) - ${rom2} (${num2}) = 0 (Roman numerals do not possess a symbol for zero; Romans recorded 'nulla' or 'N' for nil).`,
        isValid: false,
        errorMessage: "Roman numerals have no symbol for zero (nulla / N).",
      };
    }
    if (num1 < num2) {
      const diff = num1 - num2;
      return {
        op1Arabic: num1,
        op1Roman: rom1,
        op2Arabic: num2,
        op2Roman: rom2,
        operator,
        resultArabic: diff,
        resultRoman: "",
        stepsExplanation: `${rom1} (${num1}) - ${rom2} (${num2}) = ${diff} (Roman numerals cannot represent negative quantities).`,
        isValid: false,
        errorMessage: `Negative result underflow: ${num1} - ${num2} = ${diff}. Roman numerals cannot represent negative numbers.`,
      };
    }
    const diff = num1 - num2;
    const romRes = arabicToRoman(diff).romanUnicode;
    return {
      op1Arabic: num1,
      op1Roman: rom1,
      op2Arabic: num2,
      op2Roman: rom2,
      operator,
      resultArabic: diff,
      resultRoman: romRes,
      stepsExplanation: `${rom1} (${num1.toLocaleString("en-US")}) - ${rom2} (${num2.toLocaleString("en-US")}) = ${romRes} (${diff.toLocaleString("en-US")})`,
      isValid: true,
    };
  }

  if (operator === "×") {
    const prod = num1 * num2;
    if (prod > 3999999) {
      return {
        op1Arabic: num1,
        op1Roman: rom1,
        op2Arabic: num2,
        op2Roman: rom2,
        operator,
        resultArabic: prod,
        resultRoman: "",
        stepsExplanation: "",
        isValid: false,
        errorMessage: `Arithmetic overflow: ${num1} × ${num2} = ${prod.toLocaleString("en-US")} exceeds maximum Roman numeral limit (3,999,999).`,
      };
    }
    const romRes = arabicToRoman(prod).romanUnicode;
    return {
      op1Arabic: num1,
      op1Roman: rom1,
      op2Arabic: num2,
      op2Roman: rom2,
      operator,
      resultArabic: prod,
      resultRoman: romRes,
      stepsExplanation: `${rom1} (${num1.toLocaleString("en-US")}) × ${rom2} (${num2.toLocaleString("en-US")}) = ${romRes} (${prod.toLocaleString("en-US")})`,
      isValid: true,
    };
  }

  // operator === "÷" (Division)
  if (num2 === 0) {
    return {
      op1Arabic: num1,
      op1Roman: rom1,
      op2Arabic: 0,
      op2Roman: "0",
      operator,
      resultArabic: 0,
      resultRoman: "",
      stepsExplanation: "Division by zero is mathematically undefined.",
      isValid: false,
      errorMessage: "Division by zero is mathematically undefined.",
    };
  }

  if (num1 < num2) {
    return {
      op1Arabic: num1,
      op1Roman: rom1,
      op2Arabic: num2,
      op2Roman: rom2,
      operator,
      resultArabic: 0,
      resultRoman: "nulla",
      quotient: 0,
      remainder: num1,
      remainderRoman: rom1,
      stepsExplanation: `${rom1} (${num1}) ÷ ${rom2} (${num2}) = 0 with Remainder ${rom1} (${num1}) (Quotient is less than 1; Roman numerals do not represent fractional numbers in standard integer arithmetic).`,
      isValid: true,
    };
  }

  const quotient = Math.floor(num1 / num2);
  const remainder = num1 % num2;
  const romQuot = arabicToRoman(quotient).romanUnicode;
  const romRem = remainder > 0 ? arabicToRoman(remainder).romanUnicode : undefined;

  let steps = "";
  if (remainder === 0) {
    steps = `${rom1} (${num1.toLocaleString("en-US")}) ÷ ${rom2} (${num2.toLocaleString("en-US")}) = ${romQuot} (${quotient.toLocaleString("en-US")})`;
  } else {
    steps = `${rom1} (${num1.toLocaleString("en-US")}) ÷ ${rom2} (${num2.toLocaleString("en-US")}) = ${romQuot} (${quotient.toLocaleString("en-US")}) with Remainder ${romRem} (${remainder.toLocaleString("en-US")})`;
  }

  return {
    op1Arabic: num1,
    op1Roman: rom1,
    op2Arabic: num2,
    op2Roman: rom2,
    operator,
    resultArabic: quotient,
    resultRoman: romQuot,
    quotient,
    remainder,
    remainderRoman: romRem,
    stepsExplanation: steps,
    isValid: true,
  };
}
