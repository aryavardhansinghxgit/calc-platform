/**
 * Core mathematical engine for Advanced Binary Calculator & Multi-Base Converter.
 * Implements exact arbitrary-precision BigInt arithmetic, 2's complement logic,
 * register overflow/carry tracking, and arbitrary base-2 to base-36 conversions.
 */

export type Operation = "+" | "-" | "*" | "/" | "%" | "AND" | "OR" | "XOR" | "NOT" | "<<" | ">>";
export type BitWidth = 8 | 16 | 32 | 64;
export type RepMode = "unsigned" | "twos";

export interface FormattedMultiBase {
  binRaw: string;
  binGrouped: string;
  hexRaw: string;
  octRaw: string;
  decStr: string;
  asciiChar: string;
}

export interface SubtractionStepDetail {
  bRaw: string;
  onesComp: string;
  twosComp: string;
  sumRaw: string;
  discardCarry: boolean;
  signedDec: string;
}

export interface BinaryCalculationResult {
  resVal: bigint;
  signedDecVal: bigint;
  unsignedDecVal: bigint;
  mathResultVal: bigint;
  remainderVal: bigint | null;
  remainderMultiBase: FormattedMultiBase | null;
  multiBaseA: FormattedMultiBase;
  multiBaseB: FormattedMultiBase;
  multiBaseRes: FormattedMultiBase;
  isOverflow: boolean;
  carryOut: boolean;
  overflowReason?: string;
  steps: string[];
  carryChain: string[];
  subtractionDetail?: SubtractionStepDetail;
  error?: string;
}

export interface BaseConversionStep {
  dividend: string;
  quotient: string;
  remainder: number;
  remainderChar: string;
}

export interface BaseConversionResult {
  decVal: bigint;
  binResult: string;
  octResult: string;
  decResult: string;
  hexResult: string;
  targetResult: string;
  steps: string[];
  detailedSteps: BaseConversionStep[];
  error?: string;
}

const DIGITS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

/**
 * Validates binary string (only 0 and 1, optional whitespace).
 */
export function isBinaryValid(val: string): boolean {
  return /^[01\s]*$/.test(val);
}

/**
 * Parse a binary string into BigInt with register width and signed interpretation.
 */
export function parseBinToBigInt(
  binStr: string,
  mode: RepMode,
  width: BitWidth
): { val: bigint; unsignedVal: bigint; decStr: string } {
  const clean = binStr.replace(/\s+/g, "");
  if (!clean) return { val: 0n, unsignedVal: 0n, decStr: "0" };

  try {
    const rawBig = BigInt(`0b${clean}`);
    const mask = (1n << BigInt(width)) - 1n;
    const msbMask = 1n << BigInt(width - 1);
    const masked = rawBig & mask;

    if (mode === "unsigned") {
      return { val: masked, unsignedVal: masked, decStr: masked.toString() };
    }

    // Signed 2's complement
    if ((masked & msbMask) !== 0n) {
      const signedVal = masked - (1n << BigInt(width));
      return { val: signedVal, unsignedVal: masked, decStr: signedVal.toString() };
    }

    return { val: masked, unsignedVal: masked, decStr: masked.toString() };
  } catch {
    return { val: 0n, unsignedVal: 0n, decStr: "0" };
  }
}

/**
 * Convert any BigInt into formatted Multi-Base outputs honoring bit width and representation mode.
 */
export function formatMultiBase(
  num: bigint,
  width: BitWidth,
  mode: RepMode = "unsigned"
): FormattedMultiBase {
  try {
    const modulus = 1n << BigInt(width);
    const mask = modulus - 1n;
    const msbMask = 1n << BigInt(width - 1);

    // Represented unsigned bit pattern in the register
    const uVal = num < 0n ? (num + modulus) & mask : num & mask;

    const binRaw = uVal.toString(2).padStart(width, "0");
    const hexRaw = uVal.toString(16).toUpperCase().padStart(Math.ceil(width / 4), "0");
    const octRaw = uVal.toString(8).padStart(Math.ceil(width / 3), "0");

    // Exact decimal string based on signed/unsigned interpretation of the register bits
    let decStr = uVal.toString();
    if (mode === "twos") {
      if ((uVal & msbMask) !== 0n) {
        decStr = (uVal - modulus).toString();
      } else {
        decStr = uVal.toString();
      }
    }

    let asciiChar = "N/A";
    const charCode = Number(uVal);
    if (width <= 8 || uVal <= 255n) {
      if (charCode >= 32 && charCode <= 126) {
        asciiChar = `'${String.fromCharCode(charCode)}'`;
      } else if (charCode === 10) {
        asciiChar = "'\\n' (LF)";
      } else if (charCode === 13) {
        asciiChar = "'\\r' (CR)";
      } else if (charCode === 9) {
        asciiChar = "'\\t' (Tab)";
      } else if (charCode === 0) {
        asciiChar = "'\\0' (NUL)";
      }
    }

    return {
      binRaw,
      binGrouped: binRaw.replace(/(.{4})/g, "$1 ").trim(),
      hexRaw,
      octRaw,
      decStr,
      asciiChar,
    };
  } catch {
    return {
      binRaw: "0".padStart(width, "0"),
      binGrouped: "0".padStart(width, "0"),
      hexRaw: "0",
      octRaw: "0",
      decStr: "0",
      asciiChar: "N/A",
    };
  }
}

/**
 * Execute Binary Arithmetic / Bitwise operation.
 */
export function executeBinaryOperation(
  inputA: string,
  inputB: string,
  operation: Operation,
  bitWidth: BitWidth,
  repMode: RepMode,
  shiftAmount: number = 1,
  inputAMode: "bin" | "dec" = "bin",
  inputBMode: "bin" | "dec" = "bin"
): BinaryCalculationResult {
  // Pre-parse and normalize Input A
  let cleanA = inputA.replace(/\s+/g, "");
  if (inputAMode === "dec") {
    const trimmed = inputA.trim();
    if (!trimmed || isNaN(Number(trimmed))) {
      return createErrorResult("Please enter a valid decimal number for Input A.", bitWidth);
    }
    try {
      const dec = BigInt(trimmed);
      const mask = (1n << BigInt(bitWidth)) - 1n;
      const uVal = dec < 0n ? (dec + (1n << BigInt(bitWidth))) & mask : dec & mask;
      cleanA = uVal.toString(2).padStart(bitWidth, "0");
    } catch {
      return createErrorResult("Invalid decimal format for Input A.", bitWidth);
    }
  } else {
    if (!isBinaryValid(inputA) || cleanA.length === 0) {
      return createErrorResult("Please enter a valid binary number (0s and 1s only) for Input A.", bitWidth);
    }
    cleanA = cleanA.padStart(bitWidth, "0").slice(-bitWidth);
  }

  // Pre-parse and normalize Input B
  let cleanB = inputB.replace(/\s+/g, "");
  const isUnary = operation === "NOT" || operation === "<<" || operation === ">>";
  if (!isUnary) {
    if (inputBMode === "dec") {
      const trimmed = inputB.trim();
      if (!trimmed || isNaN(Number(trimmed))) {
        return createErrorResult("Please enter a valid decimal number for Input B.", bitWidth);
      }
      try {
        const dec = BigInt(trimmed);
        const mask = (1n << BigInt(bitWidth)) - 1n;
        const uVal = dec < 0n ? (dec + (1n << BigInt(bitWidth))) & mask : dec & mask;
        cleanB = uVal.toString(2).padStart(bitWidth, "0");
      } catch {
        return createErrorResult("Invalid decimal format for Input B.", bitWidth);
      }
    } else {
      if (!isBinaryValid(inputB) || cleanB.length === 0) {
        return createErrorResult("Please enter a valid binary number (0s and 1s only) for Input B.", bitWidth);
      }
      cleanB = cleanB.padStart(bitWidth, "0").slice(-bitWidth);
    }
  }

  const modulus = 1n << BigInt(bitWidth);
  const mask = modulus - 1n;
  const msbMask = 1n << BigInt(bitWidth - 1);
  const minSigned = -(1n << BigInt(bitWidth - 1));
  const maxSigned = (1n << BigInt(bitWidth - 1)) - 1n;

  const { val: aVal, decStr: aDec } = parseBinToBigInt(cleanA, repMode, bitWidth);
  const { val: bVal, decStr: bDec } = parseBinToBigInt(cleanB, repMode, bitWidth);

  let resVal = 0n;
  let mathResultVal = 0n;
  let remainderVal: bigint | null = null;
  let isOverflow = false;
  let carryOut = false;
  let overflowReason = "";
  const steps: string[] = [];
  const carryChain: string[] = [];
  let subtractionDetail: SubtractionStepDetail | undefined = undefined;

  switch (operation) {
    case "+": {
      mathResultVal = aVal + bVal;
      resVal = mathResultVal & mask;

      if (repMode === "unsigned") {
        carryOut = aVal + bVal >= modulus;
        isOverflow = carryOut;
        if (isOverflow) {
          overflowReason = `Unsigned addition exceeded ${bitWidth}-bit capacity (${modulus - 1n}). MSB carry-out bit discarded.`;
        }
      } else {
        // Signed 2's complement overflow
        const aSigned = aVal;
        const bSigned = bVal;
        const resSigned = (resVal & msbMask) !== 0n ? resVal - modulus : resVal;
        isOverflow = mathResultVal < minSigned || mathResultVal > maxSigned;
        // Unsigned carry out is also checked
        const uA = BigInt(`0b${cleanA}`);
        const uB = BigInt(`0b${cleanB}`);
        carryOut = uA + uB >= modulus;
        if (isOverflow) {
          overflowReason = `Signed sum (${mathResultVal}) is outside the ${bitWidth}-bit range [${minSigned}, ${maxSigned}].`;
        }
      }

      steps.push(`Binary Addition: ${cleanA} + ${cleanB}`);
      steps.push(`Decimal Equivalence: ${aDec} + ${bDec} = ${mathResultVal.toString()}`);

      // Detailed column carry generation
      let carry = 0;
      const padA = cleanA.padStart(bitWidth, "0");
      const padB = cleanB.padStart(bitWidth, "0");
      const sumArr: string[] = [];

      for (let i = bitWidth - 1; i >= 0; i--) {
        const bitA = parseInt(padA[i], 10);
        const bitB = parseInt(padB[i], 10);
        const sum = bitA + bitB + carry;
        sumArr.unshift((sum % 2).toString());
        carry = Math.floor(sum / 2);
        carryChain.unshift(carry.toString());
      }
      if (carry > 0) {
        carryChain.unshift("1"); // Complete 9-bit carry chain showing MSB carry-out
        sumArr.unshift("1");
      }

      steps.push(`Column Carry Chain: [${carryChain.join(" ")}]`);
      steps.push(`Represented Register Result: ${resVal.toString(2).padStart(bitWidth, "0")}`);
      if (isOverflow) {
        steps.push(`Overflow Status: YES (${overflowReason})`);
      } else {
        steps.push(`Overflow Status: NO (Fits within ${bitWidth}-bit register)`);
      }
      break;
    }

    case "-": {
      mathResultVal = aVal - bVal;
      resVal = mathResultVal & mask;

      const uA = BigInt(`0b${cleanA}`);
      const uB = BigInt(`0b${cleanB}`);

      if (repMode === "unsigned") {
        isOverflow = uA < uB;
        carryOut = !isOverflow; // No borrow means carry=1 in ALU subtract
        if (isOverflow) {
          overflowReason = `Unsigned underflow: ${uA} < ${uB}. Register wrapped via modulo 2^${bitWidth}.`;
        }
      } else {
        isOverflow = mathResultVal < minSigned || mathResultVal > maxSigned;
        carryOut = uA >= uB;
        if (isOverflow) {
          overflowReason = `Signed difference (${mathResultVal}) is outside the ${bitWidth}-bit range [${minSigned}, ${maxSigned}].`;
        }
      }

      // Detailed Two's Complement Workflow
      const notB = (~uB) & mask;
      const twosCompB = (notB + 1n) & mask;
      const discardCarry = uA + (notB + 1n) >= modulus;

      const signedDecOutput = ((resVal & msbMask) !== 0n) ? (resVal - modulus).toString() : resVal.toString();

      subtractionDetail = {
        bRaw: cleanB,
        onesComp: notB.toString(2).padStart(bitWidth, "0"),
        twosComp: twosCompB.toString(2).padStart(bitWidth, "0"),
        sumRaw: resVal.toString(2).padStart(bitWidth, "0"),
        discardCarry,
        signedDec: signedDecOutput,
      };

      steps.push(`Binary Subtraction: ${cleanA} - ${cleanB}`);
      steps.push(`Decimal Equivalence: ${aDec} - ${bDec} = ${mathResultVal.toString()}`);
      steps.push(`Step 1 (1's complement of B): ~${cleanB} = ${subtractionDetail.onesComp}`);
      steps.push(`Step 2 (2's complement of B): ~B + 1 = ${subtractionDetail.twosComp}`);
      steps.push(`Step 3 (Add A to 2's complement of B): ${cleanA} + ${subtractionDetail.twosComp} = ${resVal.toString(2).padStart(bitWidth, "0")}`);
      if (discardCarry) {
        steps.push(`Step 4 (Carry Handling): Carry-out generated beyond bit ${bitWidth - 1} was discarded.`);
      } else {
        steps.push(`Step 4 (Carry Handling): No carry-out generated (indicates borrow).`);
      }
      steps.push(`Step 5 (Interpretation): Represented ${repMode === "twos" ? "signed" : "unsigned"} value is ${signedDecOutput}.`);
      break;
    }

    case "*": {
      mathResultVal = aVal * bVal;
      resVal = mathResultVal & mask;

      if (repMode === "unsigned") {
        isOverflow = mathResultVal > mask || mathResultVal < 0n;
      } else {
        isOverflow = mathResultVal < minSigned || mathResultVal > maxSigned;
      }

      if (isOverflow) {
        overflowReason = `Multiplication product (${mathResultVal}) exceeds ${bitWidth}-bit register limit.`;
      }

      steps.push(`Binary Multiplication: ${cleanA} × ${cleanB}`);
      steps.push(`Decimal Equivalence: ${aDec} × ${bDec} = ${mathResultVal.toString()}`);
      steps.push(`Partial Products Alignment:`);
      for (let i = 0; i < cleanB.length; i++) {
        const bit = cleanB[cleanB.length - 1 - i];
        if (bit === "1") {
          steps.push(`  Shift ${i} bits left: ${cleanA}${"0".repeat(i)}`);
        }
      }
      steps.push(`Register Result (${bitWidth}-Bit): ${resVal.toString(2).padStart(bitWidth, "0")}`);
      break;
    }

    case "/": {
      if (bVal === 0n) {
        return createErrorResult("Division by zero (0) is undefined.", bitWidth);
      }

      // Check signed division overflow: MIN_INT / -1
      if (repMode === "twos" && aVal === minSigned && bVal === -1n) {
        isOverflow = true;
        mathResultVal = -minSigned; // +2^(width-1)
        resVal = minSigned & mask;
        remainderVal = 0n;
        overflowReason = `Division overflow: ${minSigned} / -1 cannot be represented in ${bitWidth}-bit signed 2's complement.`;
      } else {
        mathResultVal = aVal / bVal;
        resVal = mathResultVal & mask;
        remainderVal = aVal % bVal;
      }

      steps.push(`Binary Division: ${cleanA} ÷ ${cleanB}`);
      steps.push(`Decimal Equivalence: ${aDec} ÷ ${bDec} = Quotient ${mathResultVal.toString()}, Remainder ${remainderVal?.toString()}`);
      steps.push(`Quotient Binary (${bitWidth}-Bit): ${resVal.toString(2).padStart(bitWidth, "0")}`);
      if (remainderVal !== null) {
        const remMasked = remainderVal < 0n ? (remainderVal + modulus) & mask : remainderVal & mask;
        steps.push(`Remainder Binary (${bitWidth}-Bit): ${remMasked.toString(2).padStart(bitWidth, "0")}`);
      }
      break;
    }

    case "%": {
      if (bVal === 0n) {
        return createErrorResult("Modulo by zero (0) is undefined.", bitWidth);
      }

      mathResultVal = aVal % bVal;
      resVal = mathResultVal & mask;

      const quotient = aVal / bVal;
      steps.push(`Binary Modulo: ${cleanA} % ${cleanB}`);
      steps.push(`Decimal Equivalence: ${aDec} % ${bDec} = ${mathResultVal.toString()} (Quotient = ${quotient.toString()})`);
      steps.push(`Remainder Binary (${bitWidth}-Bit): ${resVal.toString(2).padStart(bitWidth, "0")}`);
      break;
    }

    case "AND": {
      mathResultVal = aVal & bVal;
      resVal = mathResultVal & mask;
      steps.push(`Bitwise AND Operation (A & B):`);
      steps.push(`Outputs 1 only when both corresponding bits are 1.`);
      steps.push(`${cleanA} & ${cleanB} = ${resVal.toString(2).padStart(bitWidth, "0")}`);
      break;
    }

    case "OR": {
      mathResultVal = aVal | bVal;
      resVal = mathResultVal & mask;
      steps.push(`Bitwise OR Operation (A | B):`);
      steps.push(`Outputs 1 when at least one corresponding bit is 1.`);
      steps.push(`${cleanA} | ${cleanB} = ${resVal.toString(2).padStart(bitWidth, "0")}`);
      break;
    }

    case "XOR": {
      mathResultVal = aVal ^ bVal;
      resVal = mathResultVal & mask;
      steps.push(`Bitwise XOR Operation (A ^ B):`);
      steps.push(`Outputs 1 when corresponding bits are different.`);
      steps.push(`${cleanA} ^ ${cleanB} = ${resVal.toString(2).padStart(bitWidth, "0")}`);
      break;
    }

    case "NOT": {
      const uA = BigInt(`0b${cleanA}`);
      mathResultVal = (~uA) & mask;
      resVal = mathResultVal;
      steps.push(`Bitwise NOT Operation (~A):`);
      steps.push(`Inverts all 0 bits to 1 and all 1 bits to 0.`);
      steps.push(`~${cleanA} = ${resVal.toString(2).padStart(bitWidth, "0")}`);
      break;
    }

    case "<<": {
      const shift = BigInt(Math.max(0, shiftAmount));
      mathResultVal = aVal << shift;
      resVal = mathResultVal & mask;
      const uA = BigInt(`0b${cleanA}`);
      isOverflow = (uA << shift) > mask;
      if (isOverflow) {
        overflowReason = `Left shift dropped ${shiftAmount} most-significant bits beyond bit ${bitWidth - 1}.`;
      }
      steps.push(`Left Bitwise Shift (A << ${shiftAmount}):`);
      steps.push(`Shifts bits left by ${shiftAmount} positions (fills vacated low bits with 0).`);
      steps.push(`${cleanA} << ${shiftAmount} = ${resVal.toString(2).padStart(bitWidth, "0")}`);
      break;
    }

    case ">>": {
      const shift = BigInt(Math.max(0, shiftAmount));
      if (repMode === "unsigned") {
        const uA = BigInt(`0b${cleanA}`);
        mathResultVal = uA >> shift;
        resVal = mathResultVal & mask;
        steps.push(`Logical Right Shift (A >>> ${shiftAmount}):`);
        steps.push(`Shifts bits right by ${shiftAmount} positions (fills vacated high bits with 0).`);
      } else {
        // Arithmetic right shift preserving sign bit
        mathResultVal = aVal >> shift;
        resVal = mathResultVal < 0n ? (mathResultVal + modulus) & mask : mathResultVal & mask;
        steps.push(`Arithmetic Right Shift (A >> ${shiftAmount}):`);
        steps.push(`Shifts bits right by ${shiftAmount} positions (preserves sign bit at MSB).`);
      }
      steps.push(`${cleanA} >> ${shiftAmount} = ${resVal.toString(2).padStart(bitWidth, "0")}`);
      break;
    }
  }

  // Multi-base formatting for operands and results
  const multiBaseA = formatMultiBase(aVal, bitWidth, repMode);
  const multiBaseB = formatMultiBase(bVal, bitWidth, repMode);
  const multiBaseRes = formatMultiBase(resVal, bitWidth, repMode);
  const remainderMultiBase = remainderVal !== null ? formatMultiBase(remainderVal, bitWidth, repMode) : null;

  const signedDecVal = (resVal & msbMask) !== 0n ? resVal - modulus : resVal;
  const unsignedDecVal = resVal;

  return {
    resVal,
    signedDecVal,
    unsignedDecVal,
    mathResultVal,
    remainderVal,
    remainderMultiBase,
    multiBaseA,
    multiBaseB,
    multiBaseRes,
    isOverflow,
    carryOut,
    overflowReason,
    steps,
    carryChain,
    subtractionDetail,
  };
}

function createErrorResult(error: string, bitWidth: BitWidth): BinaryCalculationResult {
  const dummy = formatMultiBase(0n, bitWidth);
  return {
    resVal: 0n,
    signedDecVal: 0n,
    unsignedDecVal: 0n,
    mathResultVal: 0n,
    remainderVal: null,
    remainderMultiBase: null,
    multiBaseA: dummy,
    multiBaseB: dummy,
    multiBaseRes: dummy,
    isOverflow: false,
    carryOut: false,
    steps: [],
    carryChain: [],
    error,
  };
}

/**
 * Parses arbitrary-precision string in base 2–36 via exact Horner accumulation.
 */
export function parseArbitraryBase(rawStr: string, sourceBase: number): { value: bigint; isNegative: boolean } {
  const trimmed = rawStr.trim();
  if (!trimmed) throw new Error("Empty input.");

  let isNegative = false;
  let str = trimmed;
  if (str.startsWith("-")) {
    isNegative = true;
    str = str.slice(1);
  } else if (str.startsWith("+")) {
    str = str.slice(1);
  }

  // Strip prefixes if present
  if (sourceBase === 16 && /^0x/i.test(str)) str = str.slice(2);
  if (sourceBase === 8 && /^0o/i.test(str)) str = str.slice(2);
  if (sourceBase === 2 && /^0b/i.test(str)) str = str.slice(2);

  if (!str) throw new Error("No digits provided.");

  const baseBig = BigInt(sourceBase);
  let value = 0n;

  for (let i = 0; i < str.length; i++) {
    const ch = str[i].toUpperCase();
    const idx = DIGITS.indexOf(ch);
    if (idx === -1 || idx >= sourceBase) {
      throw new Error(`Invalid digit '${str[i]}' for Base-${sourceBase}. Allowed: 0-${DIGITS[sourceBase - 1]}`);
    }
    value = value * baseBig + BigInt(idx);
  }

  return { value: isNegative ? -value : value, isNegative };
}

/**
 * Execute Base Conversion (Card 2) with exact BigInt Euclidean division and zero bitwidth truncation.
 */
export function executeBaseConversion(
  rawInput: string,
  sourceBase: number,
  targetBase: number
): BaseConversionResult {
  const trimmed = rawInput.trim();
  if (!trimmed) {
    return {
      decVal: 0n,
      binResult: "",
      octResult: "",
      decResult: "",
      hexResult: "",
      targetResult: "",
      steps: [],
      detailedSteps: [],
      error: "Please enter a valid number to convert.",
    };
  }

  try {
    const { value: decVal, isNegative } = parseArbitraryBase(trimmed, sourceBase);

    // Exact unconstrained multi-base representations
    const absVal = decVal < 0n ? -decVal : decVal;

    // Convert to targetBase using exact BigInt division
    const baseBig = BigInt(targetBase);
    let n = absVal;
    const detailedSteps: BaseConversionStep[] = [];
    const remainders: string[] = [];

    if (n === 0n) {
      detailedSteps.push({
        dividend: "0",
        quotient: "0",
        remainder: 0,
        remainderChar: "0",
      });
      remainders.push("0");
    } else {
      while (n > 0n) {
        const q = n / baseBig;
        const r = Number(n % baseBig);
        const charR = DIGITS[r];
        detailedSteps.push({
          dividend: n.toString(),
          quotient: q.toString(),
          remainder: r,
          remainderChar: charR,
        });
        remainders.push(charR);
        n = q;
      }
    }

    const targetRaw = remainders.slice().reverse().join("");
    const targetResult = (isNegative ? "-" : "") + targetRaw;

    // Standard base representations
    const binRaw = absVal.toString(2);
    const binPaddedLen = Math.ceil(binRaw.length / 4) * 4;
    const binGrouped = (isNegative ? "-" : "") + binRaw.padStart(binPaddedLen, "0").replace(/(.{4})/g, "$1 ").trim();
    const octResult = (isNegative ? "-0o" : "0o") + absVal.toString(8);
    const hexResult = (isNegative ? "-0x" : "0x") + absVal.toString(16).toUpperCase();
    const decResult = decVal.toString();

    // Human-readable step strings
    const steps: string[] = [];
    detailedSteps.forEach((s) => {
      steps.push(`${s.dividend} ÷ ${targetBase} = ${s.quotient}, Remainder ${s.remainder} ('${s.remainderChar}')`);
    });
    steps.push(`Read remainders bottom-to-top → ${targetResult} (Base ${targetBase})`);

    return {
      decVal,
      binResult: binGrouped,
      octResult,
      decResult,
      hexResult,
      targetResult,
      steps,
      detailedSteps,
    };
  } catch (err: any) {
    return {
      decVal: 0n,
      binResult: "",
      octResult: "",
      decResult: "",
      hexResult: "",
      targetResult: "",
      steps: [],
      detailedSteps: [],
      error: err.message || "Invalid number for selected source base.",
    };
  }
}

/**
 * Generate syntactically clean LaTeX for binary calculation.
 */
export function formatBinaryLatex(
  inputA: string,
  inputB: string,
  operation: Operation,
  resValBin: string,
  decStr: string
): string {
  const cleanA = inputA.replace(/\s+/g, "");
  const cleanB = inputB.replace(/\s+/g, "");
  const cleanRes = resValBin.replace(/\s+/g, "");

  let opLatex = operation as string;
  if (operation === "*") opLatex = "\\times";
  else if (operation === "/") opLatex = "\\div";
  else if (operation === "%") opLatex = "\\pmod";
  else if (operation === "AND") opLatex = "\\land";
  else if (operation === "OR") opLatex = "\\lor";
  else if (operation === "XOR") opLatex = "\\oplus";
  else if (operation === "NOT") return `\\neg (${cleanA}_2) = ${cleanRes}_2 = ${decStr}_{10}`;
  else if (operation === "<<") opLatex = "\\ll";
  else if (operation === ">>") opLatex = "\\gg";

  return `${cleanA}_2 ${opLatex} ${cleanB}_2 = ${cleanRes}_2 = ${decStr}_{10}`;
}
