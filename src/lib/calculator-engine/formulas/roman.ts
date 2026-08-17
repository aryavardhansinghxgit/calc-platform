/**
 * Pure Mathematical Calculation Engine for Roman Numeral Suite
 * Compliant with Classical Latin Epigraphic Standards, Medieval Vinculum (Overline) Notation,
 * and Modern Unicode Combining Macron Standards.
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
}

export function arabicToRoman(num: number, useVinculum = true): RomanConversionResult {
  const n = Math.floor(Math.max(1, Math.min(3999999, num || 1)));

  let remainder = n;
  let romanAscii = "";
  let romanUnicode = "";
  const expansionParts: ExpansionPart[] = [];
  const activeSymbolsSet = new Set<string>();

  const mapping = [
    { val: 1000000, ascii: "_M", uni: "M̅" },
    { val: 900000, ascii: "_C_M", uni: "C̅M̅" },
    { val: 500000, ascii: "_D", uni: "D̅" },
    { val: 400000, ascii: "_C_D", uni: "C̅D̅" },
    { val: 100000, ascii: "_C", uni: "C̅" },
    { val: 90000, ascii: "_X_C", uni: "X̅C̅" },
    { val: 50000, ascii: "_L", uni: "L̅" },
    { val: 40000, ascii: "_X_L", uni: "X̅L̅" },
    { val: 10000, ascii: "_X", uni: "X̅" },
    { val: 9000, ascii: "_I_X", uni: "I̅X̅" },
    { val: 5000, ascii: "_V", uni: "V̅" },
    { val: 4000, ascii: "_I_V", uni: "I̅V̅" },
    { val: 1000, ascii: "M", uni: "M" },
    { val: 900, ascii: "CM", uni: "CM" },
    { val: 500, ascii: "D", uni: "D" },
    { val: 400, ascii: "CD", uni: "CD" },
    { val: 100, ascii: "C", uni: "C" },
    { val: 90, ascii: "XC", uni: "XC" },
    { val: 50, ascii: "L", uni: "L" },
    { val: 40, ascii: "XL", uni: "XL" },
    { val: 10, ascii: "X", uni: "X" },
    { val: 9, ascii: "IX", uni: "IX" },
    { val: 5, ascii: "V", uni: "V" },
    { val: 4, ascii: "IV", uni: "IV" },
    { val: 1, ascii: "I", uni: "I" },
  ];

  // If vinculum disabled and number <= 3999, filter out > 1000
  const activeMapping = useVinculum ? mapping : mapping.filter((m) => m.val <= 1000);

  for (const item of activeMapping) {
    while (remainder >= item.val) {
      romanAscii += item.ascii;
      romanUnicode += item.uni;
      remainder -= item.val;

      // Track symbols
      for (const char of item.uni) {
        activeSymbolsSet.add(char);
      }
    }
  }

  // Decompose into standard place value expansion (e.g. 1994 -> 1000 + 900 + 90 + 4)
  const numStr = n.toString();
  const len = numStr.length;
  for (let i = 0; i < len; i++) {
    const digit = parseInt(numStr[i], 10);
    if (digit === 0) continue;
    const place = Math.pow(10, len - i - 1);
    const partValue = digit * place;

    // Convert individual place value
    let partAscii = "";
    let partUni = "";
    let remPart = partValue;
    for (const item of activeMapping) {
      while (remPart >= item.val) {
        partAscii += item.ascii;
        partUni += item.uni;
        remPart -= item.val;
      }
    }

    expansionParts.push({
      placeValue: place,
      arabicPart: partValue,
      romanPart: partAscii,
      unicodePart: partUni,
      explanation: `${partValue.toLocaleString()} = ${partUni}`,
    });
  }

  const stepByStep = expansionParts.map((p) => `${p.arabicPart} (${p.unicodePart})`).join(" + ") + ` = ${romanUnicode}`;

  return {
    arabicNumber: n,
    romanAscii,
    romanUnicode,
    expansionParts,
    stepByStepFormula: stepByStep,
    activeSymbols: Array.from(activeSymbolsSet),
  };
}

export function romanToArabic(rawRoman: string): {
  arabicNumber: number;
  isValid: boolean;
  errorMessage?: string;
  expansionParts: ExpansionPart[];
  stepByStepFormula: string;
} {
  if (!rawRoman || rawRoman.trim() === "") {
    return { arabicNumber: 0, isValid: false, errorMessage: "Input is empty", expansionParts: [], stepByStepFormula: "" };
  }

  const cleaned = rawRoman.trim().toUpperCase();

  // Value map
  const valueMap: Record<string, number> = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };

  // Check for vinculum prefix (e.g. _V = 5000, _X = 10000, or combining macron \u0305)
  // Let's normalize combining macrons: V̅ -> _V, etc.
  let normalized = cleaned
    .replace(/M[\u0304\u0305]/g, "_M")
    .replace(/D[\u0304\u0305]/g, "_D")
    .replace(/C[\u0304\u0305]/g, "_C")
    .replace(/L[\u0304\u0305]/g, "_L")
    .replace(/X[\u0304\u0305]/g, "_X")
    .replace(/V[\u0304\u0305]/g, "_V")
    .replace(/I[\u0304\u0305]/g, "_I");

  let total = 0;
  let i = 0;

  // Process tokens
  const tokens: { sym: string; val: number }[] = [];
  while (i < normalized.length) {
    if (normalized[i] === "_" && i + 1 < normalized.length) {
      const nextChar = normalized[i + 1];
      const baseVal = valueMap[nextChar];
      if (baseVal) {
        tokens.push({ sym: `_${nextChar}`, val: baseVal * 1000 });
        i += 2;
        continue;
      }
    }
    const char = normalized[i];
    const baseVal = valueMap[char];
    if (baseVal !== undefined) {
      tokens.push({ sym: char, val: baseVal });
      i++;
    } else if (char === " " || char === "•" || char === "/" || char === "-" || char === ".") {
      i++;
    } else {
      return {
        arabicNumber: 0,
        isValid: false,
        errorMessage: `Invalid Roman numeral character: '${char}'`,
        expansionParts: [],
        stepByStepFormula: "",
      };
    }
  }

  if (tokens.length === 0) {
    return { arabicNumber: 0, isValid: false, errorMessage: "No valid Roman numeral symbols found", expansionParts: [], stepByStepFormula: "" };
  }

  for (let t = 0; t < tokens.length; t++) {
    const currentVal = tokens[t].val;
    const nextVal = t + 1 < tokens.length ? tokens[t + 1].val : 0;

    if (currentVal < nextVal) {
      total -= currentVal;
    } else {
      total += currentVal;
    }
  }

  // Canonical re-generation check for step breakdown
  const canon = arabicToRoman(total);

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
}

export function convertDateToRoman(
  year: number,
  month: number,
  day: number,
  separator = " • "
): RomanDateResult {
  const y = Math.max(1, Math.min(3999, year || 2026));
  const m = Math.max(1, Math.min(12, month || 1));
  const d = Math.max(1, Math.min(31, day || 1));

  const monthRom = arabicToRoman(m, false).romanUnicode;
  const dayRom = arabicToRoman(d, false).romanUnicode;
  const yearRom = arabicToRoman(y, false).romanUnicode;

  const sep = separator || " • ";

  return {
    monthRoman: monthRom,
    dayRoman: dayRom,
    yearRoman: yearRom,
    formattedMDY: `${monthRom}${sep}${dayRom}${sep}${yearRom}`,
    formattedDMY: `${dayRom}${sep}${monthRom}${sep}${yearRom}`,
    formattedYMD: `${yearRom}${sep}${monthRom}${sep}${dayRom}`,
    formattedClassicDots: `${dayRom}.${monthRom}.${yearRom}`,
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
}

export function calculateRomanArithmetic(
  op1Str: string,
  op2Str: string,
  operator: "+" | "-" | "×" | "÷"
): RomanArithmeticResult {
  // Convert inputs to arabic
  let num1 = 0;
  let num2 = 0;

  if (/^\d+$/.test(op1Str.trim())) {
    num1 = parseInt(op1Str.trim(), 10);
  } else {
    num1 = romanToArabic(op1Str).arabicNumber;
  }

  if (/^\d+$/.test(op2Str.trim())) {
    num2 = parseInt(op2Str.trim(), 10);
  } else {
    num2 = romanToArabic(op2Str).arabicNumber;
  }

  num1 = Math.max(1, num1 || 1);
  num2 = Math.max(1, num2 || 1);

  const rom1 = arabicToRoman(num1).romanUnicode;
  const rom2 = arabicToRoman(num2).romanUnicode;

  let resArabic = 0;
  let quotient: number | undefined;
  let remainder: number | undefined;
  let remainderRoman: string | undefined;
  let steps = "";

  if (operator === "+") {
    resArabic = num1 + num2;
    steps = `${rom1} (${num1}) + ${rom2} (${num2}) = ${arabicToRoman(resArabic).romanUnicode} (${resArabic})`;
  } else if (operator === "-") {
    resArabic = Math.max(1, num1 - num2);
    steps = `${rom1} (${num1}) - ${rom2} (${num2}) = ${arabicToRoman(resArabic).romanUnicode} (${resArabic})`;
  } else if (operator === "×") {
    resArabic = num1 * num2;
    steps = `${rom1} (${num1}) × ${rom2} (${num2}) = ${arabicToRoman(resArabic).romanUnicode} (${resArabic})`;
  } else {
    // Division
    quotient = Math.floor(num1 / num2);
    remainder = num1 % num2;
    resArabic = quotient;
    remainderRoman = remainder > 0 ? arabicToRoman(remainder).romanUnicode : undefined;
    steps = `${rom1} (${num1}) ÷ ${rom2} (${num2}) = ${arabicToRoman(quotient).romanUnicode} (${quotient}) with Remainder ${remainder > 0 ? `${remainderRoman} (${remainder})` : "0"}`;
  }

  const resRom = arabicToRoman(resArabic).romanUnicode;

  return {
    op1Arabic: num1,
    op1Roman: rom1,
    op2Arabic: num2,
    op2Roman: rom2,
    operator,
    resultArabic: resArabic,
    resultRoman: resRom,
    quotient,
    remainder,
    remainderRoman,
    stepsExplanation: steps,
  };
}
