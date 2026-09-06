import {
  executeRoundingMethod,
  roundByPlaceValue,
  roundBySigFigs,
  roundToNearestFraction,
  roundToNearestMultiple,
  RoundingMethod
} from "../src/app/calculators/rounding-calculator/rounding-logic";

/**
 * INDEPENDENT EXACT-DECIMAL ORACLE
 * Uses string manipulation and BigInt scaling, completely independent of production code.
 */
class ExactDecimalOracle {
  /**
   * Parse a float/decimal string to integer digits and scale
   */
  static roundDecimal(numStr: string, decimals: number, method: RoundingMethod): string {
    const isNeg = numStr.startsWith("-");
    const cleanStr = isNeg ? numStr.slice(1) : numStr;
    const parts = cleanStr.split(".");
    const intPart = parts[0] || "0";
    const fracPart = parts[1] || "";

    // For decimals >= 0: rounding at fracPart[decimals - 1] with deciding digit fracPart[decimals]
    // For decimals < 0: rounding at whole number power of 10
    if (decimals >= 0) {
      const paddedFrac = fracPart.padEnd(decimals + 10, "0");
      const keepFrac = paddedFrac.slice(0, decimals);
      const decidingDigit = parseInt(paddedFrac[decimals], 10);
      const restDigits = paddedFrac.slice(decimals + 1);
      const hasRestNonZero = /[1-9]/.test(restDigits);
      const isExactMidpoint = decidingDigit === 5 && !hasRestNonZero;

      // Base integer before decimal point + kept decimals as a single BigInt
      let baseInt = BigInt(intPart + keepFrac);
      const lastDigitOfBase = Number(baseInt % 10n);

      let doRoundUp = false; // "up" in magnitude

      switch (method) {
        case "up": // ceil
          if (decidingDigit > 0 || hasRestNonZero) {
            doRoundUp = !isNeg;
          }
          break;
        case "down": // floor
          if (decidingDigit > 0 || hasRestNonZero) {
            doRoundUp = isNeg;
          }
          break;
        case "towardZero": // truncate
          doRoundUp = false;
          break;
        case "awayFromZero":
          if (decidingDigit > 0 || hasRestNonZero) {
            doRoundUp = true;
          }
          break;
        case "halfUp":
          if (isNeg) {
            // Half up for negative: in standard arithmetic, -2.5 -> -3 (away from zero) OR -2 (towards +inf)?
            // The prompt says: "Expected under standard Round Half Up = -12.35" for -12.345
            // So round half up is symmetric (away from zero on 0.5)
            doRoundUp = decidingDigit >= 5;
          } else {
            doRoundUp = decidingDigit >= 5;
          }
          break;
        case "halfDown":
          if (isExactMidpoint) {
            doRoundUp = false;
          } else {
            doRoundUp = decidingDigit >= 5;
          }
          break;
        case "halfEven":
          if (isExactMidpoint) {
            doRoundUp = lastDigitOfBase % 2 !== 0;
          } else {
            doRoundUp = decidingDigit >= 5;
          }
          break;
        case "halfOdd":
          if (isExactMidpoint) {
            doRoundUp = lastDigitOfBase % 2 === 0;
          } else {
            doRoundUp = decidingDigit >= 5;
          }
          break;
      }

      if (doRoundUp) {
        baseInt += 1n;
      }

      let resStr = baseInt.toString();
      if (decimals === 0) {
        return (isNeg && resStr !== "0" ? "-" : "") + resStr;
      }
      if (resStr.length <= decimals) {
        resStr = resStr.padStart(decimals + 1, "0");
      }
      const splitIdx = resStr.length - decimals;
      const resInt = resStr.slice(0, splitIdx);
      const resFrac = resStr.slice(splitIdx);
      const finalVal = `${resInt}.${resFrac}`;
      return (isNeg && parseFloat(finalVal) !== 0 ? "-" : "") + finalVal;
    } else {
      // Place value > 0 (e.g. tens = -1, hundreds = -2)
      const shift = Math.abs(decimals);
      const paddedInt = intPart.padStart(shift + 1, "0");
      const targetIdx = paddedInt.length - shift;
      const decidingDigit = parseInt(paddedInt[targetIdx], 10);
      const rest = paddedInt.slice(targetIdx + 1) + fracPart;
      const hasRestNonZero = /[1-9]/.test(rest);
      const isExactMidpoint = decidingDigit === 5 && !hasRestNonZero;

      const basePrefix = BigInt(paddedInt.slice(0, targetIdx));
      const lastDigitOfBase = Number(basePrefix % 10n);

      let doRoundUp = false;
      switch (method) {
        case "up":
          doRoundUp = !isNeg && (decidingDigit > 0 || hasRestNonZero);
          break;
        case "down":
          doRoundUp = isNeg && (decidingDigit > 0 || hasRestNonZero);
          break;
        case "towardZero":
          doRoundUp = false;
          break;
        case "awayFromZero":
          doRoundUp = decidingDigit > 0 || hasRestNonZero;
          break;
        case "halfUp":
          doRoundUp = decidingDigit >= 5;
          break;
        case "halfDown":
          doRoundUp = isExactMidpoint ? false : decidingDigit >= 5;
          break;
        case "halfEven":
          doRoundUp = isExactMidpoint ? lastDigitOfBase % 2 !== 0 : decidingDigit >= 5;
          break;
        case "halfOdd":
          doRoundUp = isExactMidpoint ? lastDigitOfBase % 2 === 0 : decidingDigit >= 5;
          break;
      }

      const finalPrefix = (basePrefix + (doRoundUp ? 1n : 0n)).toString();
      const resStr = finalPrefix + "0".repeat(shift);
      return (isNeg && resStr !== "0" ? "-" : "") + resStr;
    }
  }
}

async function runPropertyTests() {
  console.log("Starting Randomized Property Tests with Independent Oracle...");

  // 1. 5000 Decimal Cases
  let passDec = 0, failDec = 0;
  let maxAbsErrDec = 0, maxRelErrDec = 0;

  for (let i = 0; i < 5000; i++) {
    const whole = Math.floor(Math.random() * 10000);
    const fracDigits = Math.floor(Math.random() * 6) + 1;
    const frac = Math.floor(Math.random() * Math.pow(10, fracDigits)).toString().padStart(fracDigits, "0");
    const numStr = `${whole}.${frac}`;
    const num = parseFloat(numStr);
    const targetDec = Math.floor(Math.random() * 5); // 0 to 4
    const methods: RoundingMethod[] = ["halfUp", "halfEven", "up", "down", "towardZero", "awayFromZero"];
    const method = methods[Math.floor(Math.random() * methods.length)];

    const expectedStr = ExactDecimalOracle.roundDecimal(numStr, targetDec, method);
    const expected = parseFloat(expectedStr);
    const actual = roundByPlaceValue(num, targetDec, method);

    const absErr = Math.abs(actual - expected);
    if (absErr > maxAbsErrDec) maxAbsErrDec = absErr;

    if (absErr < 1e-6) {
      passDec++;
    } else {
      failDec++;
      if (failDec <= 5) {
        console.log(`[DEC FAIL #${failDec}] in=${numStr}, tgt=${targetDec}, m=${method} => act=${actual}, exp=${expectedStr} (diff=${absErr})`);
      }
    }
  }
  console.log(`1. Decimal Tests: ${passDec} Passed, ${failDec} Failed out of 5000. Max Abs Error: ${maxAbsErrDec}`);

  // 2. 2000 Negative Cases
  let passNeg = 0, failNeg = 0;
  let maxAbsErrNeg = 0;
  for (let i = 0; i < 2000; i++) {
    const whole = Math.floor(Math.random() * 10000);
    const fracDigits = Math.floor(Math.random() * 5) + 1;
    const frac = Math.floor(Math.random() * Math.pow(10, fracDigits)).toString().padStart(fracDigits, "0");
    const numStr = `-${whole}.${frac}`;
    const num = parseFloat(numStr);
    const targetDec = Math.floor(Math.random() * 4);
    const methods: RoundingMethod[] = ["halfUp", "halfEven", "up", "down", "towardZero", "awayFromZero"];
    const method = methods[Math.floor(Math.random() * methods.length)];

    const expectedStr = ExactDecimalOracle.roundDecimal(numStr, targetDec, method);
    const expected = parseFloat(expectedStr);
    const actual = roundByPlaceValue(num, targetDec, method);

    const absErr = Math.abs(actual - expected);
    if (absErr > maxAbsErrNeg) maxAbsErrNeg = absErr;

    if (absErr < 1e-6) {
      passNeg++;
    } else {
      failNeg++;
      if (failNeg <= 5) {
        console.log(`[NEG FAIL #${failNeg}] in=${numStr}, tgt=${targetDec}, m=${method} => act=${actual}, exp=${expectedStr} (diff=${absErr})`);
      }
    }
  }
  console.log(`2. Negative Tests: ${passNeg} Passed, ${failNeg} Failed out of 2000. Max Abs Error: ${maxAbsErrNeg}`);

  // 3. 1000 Midpoint / Tie Cases
  let passTie = 0, failTie = 0;
  for (let i = 0; i < 1000; i++) {
    const whole = Math.floor(Math.random() * 1000);
    const targetDec = Math.floor(Math.random() * 3); // 0, 1, 2
    // construct exact .5 at targetDec + 1
    const prefixFrac = Math.floor(Math.random() * Math.pow(10, targetDec)).toString().padStart(targetDec, "0");
    const numStr = `${whole}${targetDec > 0 ? "." + prefixFrac : "."}5`;
    const num = parseFloat(numStr);
    const methods: RoundingMethod[] = ["halfUp", "halfEven", "halfDown", "halfOdd"];
    const method = methods[Math.floor(Math.random() * methods.length)];

    const expectedStr = ExactDecimalOracle.roundDecimal(numStr, targetDec, method);
    const expected = parseFloat(expectedStr);
    const actual = roundByPlaceValue(num, targetDec, method);

    const absErr = Math.abs(actual - expected);
    if (absErr < 1e-6) {
      passTie++;
    } else {
      failTie++;
      if (failTie <= 5) {
        console.log(`[TIE FAIL #${failTie}] in=${numStr}, tgt=${targetDec}, m=${method} => act=${actual}, exp=${expectedStr} (diff=${absErr})`);
      }
    }
  }
  console.log(`3. Midpoint/Tie Tests: ${passTie} Passed, ${failTie} Failed out of 1000.`);

  // 4. 2000 Significant Figures Cases
  let passSig = 0, failSig = 0;
  for (let i = 0; i < 2000; i++) {
    const sigFigs = Math.floor(Math.random() * 5) + 1; // 1 to 5
    const mag = Math.floor(Math.random() * 8) - 4; // 10^-4 to 10^3
    const base = (1 + Math.random() * 8.999) * Math.pow(10, mag);
    const res = roundBySigFigs(base, sigFigs, "halfUp");
    const expPrec = parseFloat(base.toPrecision(sigFigs));
    // Check difference
    const absErr = Math.abs(res.roundedValue - expPrec);
    if (absErr / Math.abs(base) < 1e-4) {
      passSig++;
    } else {
      failSig++;
      if (failSig <= 5) {
        console.log(`[SIG FAIL #${failSig}] in=${base}, sig=${sigFigs} => act=${res.roundedValue}, exp=${expPrec}`);
      }
    }
  }
  console.log(`4. Sig Fig Tests: ${passSig} Passed, ${failSig} Failed out of 2000.`);

  // 5. 2000 Nearest Fraction Cases
  let passFrac = 0, failFrac = 0;
  const denoms = [2, 4, 8, 16, 32];
  for (let i = 0; i < 2000; i++) {
    const val = (Math.random() - 0.5) * 100;
    const den = denoms[Math.floor(Math.random() * denoms.length)];
    const res = roundToNearestFraction(val, den, "halfUp");
    const expectedDec = Math.round(val * den) / den;
    const absErr = Math.abs(res.roundedValue - expectedDec);
    if (absErr < 1e-6) {
      passFrac++;
    } else {
      failFrac++;
      if (failFrac <= 5) {
        console.log(`[FRAC FAIL #${failFrac}] in=${val}, den=${den} => act=${res.roundedValue}, exp=${expectedDec}`);
      }
    }
  }
  console.log(`5. Fraction Tests: ${passFrac} Passed, ${failFrac} Failed out of 2000.`);

  // 6. 2000 Nearest Multiple Cases
  let passMult = 0, failMult = 0;
  const multiples = [0.05, 0.1, 0.25, 0.5, 1, 5, 10, 25, 50, 100];
  for (let i = 0; i < 2000; i++) {
    const val = (Math.random() - 0.5) * 1000;
    const m = multiples[Math.floor(Math.random() * multiples.length)];
    const res = roundToNearestMultiple(val, m, "halfUp");
    const act = typeof res === "number" ? res : res.roundedValue;
    const exp = Math.round(val / m) * m;
    const absErr = Math.abs(act - exp);
    if (absErr < 1e-4 || absErr / m < 1e-4) {
      passMult++;
    } else {
      failMult++;
      if (failMult <= 5) {
        console.log(`[MULT FAIL #${failMult}] in=${val}, mult=${m} => act=${act}, exp=${exp}`);
      }
    }
  }
  console.log(`6. Multiple Tests: ${passMult} Passed, ${failMult} Failed out of 2000.`);
}

runPropertyTests();
