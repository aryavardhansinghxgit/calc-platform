import { calculateRoundingCalculator } from "./calculator";
import {
  roundByPlaceValue,
  roundBySigFigs,
  roundToNearestFraction,
  roundToNearestMultiple,
  roundCurrencyCash,
  executeRoundingMethod
} from "./rounding-logic";

export function runRoundingCalculatorTests() {
  // Test 1: Standard Round Half Up (3.14159 to 2 d.p. -> 3.14)
  const res1 = calculateRoundingCalculator({ number: 3.14159, precision: "2" });
  if (res1.roundedValue !== 3.14) {
    throw new Error(`Expected 3.14159 rounded to 2 d.p. to be 3.14, got ${res1.roundedValue}`);
  }

  // Test 2: Banker's Rounding (2.5 -> 2, 3.5 -> 4)
  const banker2 = roundByPlaceValue(2.5, 0, "halfEven");
  const banker3 = roundByPlaceValue(3.5, 0, "halfEven");
  if (banker2 !== 2 || banker3 !== 4) {
    throw new Error(`Banker's rounding failed: expected 2.5->2 and 3.5->4; got ${banker2} and ${banker3}`);
  }

  // Test 3: Sig Figs Rounding (12.34567 to 3 sig figs -> 12.3)
  const sig = roundBySigFigs(12.34567, 3, "halfUp");
  if (sig.roundedValue !== 12.3) {
    throw new Error(`Expected 12.34567 to 3 sig figs to be 12.3, got ${sig.roundedValue}`);
  }

  // Test 4: Nearest Fraction (15.65 to nearest 1/8 -> 15 5/8 = 15.625)
  const frac = roundToNearestFraction(15.65, 8, "halfUp");
  if (frac.roundedValue !== 15.625 || frac.fractionString !== "15 5/8") {
    throw new Error(`Expected 15.65 to nearest 1/8 to be 15 5/8 (15.625), got ${frac.fractionString}`);
  }

  // Test 5: Swedish Cash Rounding (19.98 to nearest $0.05 -> $20.00)
  const cash = roundCurrencyCash(19.98, 0.05, "halfUp");
  if (cash.currencyString !== "$20.00") {
    throw new Error(`Expected $19.98 cash rounded to nearest nickel to be $20.00, got ${cash.currencyString}`);
  }

  // Test 6: Zero & Edge Inputs
  const resZero = calculateRoundingCalculator({ number: 0, precision: 0 });
  if (!resZero || typeof resZero.roundedValue !== "number") {
    throw new Error("Formula failed for zero inputs");
  }

  return true;
}
