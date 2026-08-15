import { calculateScientificNotationCalculator } from "./calculator";
import {
  parseToScientific,
  formatNormalizedScientific,
  formatEngineeringNotation,
  multiplyScientific,
  addScientific,
  divideScientific
} from "./scientific-notation-logic";

export function runScientificNotationCalculatorTests() {
  // Test 1: 3500000 -> "3.5 × 10^6"
  const res1 = calculateScientificNotationCalculator({ number: 3500000 });
  if (!res1.scientific.includes("3.5 × 10^6")) {
    throw new Error(`Expected 3.5 × 10^6 for 3,500,000, got ${res1.scientific}`);
  }

  // Test 2: Scientific Multiplication (1.432e2 * 8.0e1 = 1.1456e4)
  const x = parseToScientific("1.432e2");
  const y = parseToScientific("8.0e1");
  const mult = multiplyScientific(x, y);
  if (mult.mantissa !== 1.1456 || mult.exponent !== 4) {
    throw new Error(`Scientific multiplication failed: got ${mult.mantissa}e${mult.exponent}`);
  }

  // Test 3: Scientific Addition with Exponent Alignment (1.432e2 + 8.0e1 = 2.232e2)
  const add = addScientific(x, y);
  if (add.mantissa !== 2.232 || add.exponent !== 2) {
    throw new Error(`Scientific addition failed: got ${add.mantissa}e${add.exponent}`);
  }

  // Test 4: Engineering Notation (1234000 -> "1.234 × 10^6" with Mega prefix)
  const eng = formatEngineeringNotation(parseToScientific(1234000), 3);
  if (!eng.engineeringString.includes("1.234 × 10^6") || eng.prefixName !== "Mega") {
    throw new Error(`Engineering notation failed: got ${eng.engineeringString}, prefix ${eng.prefixName}`);
  }

  // Test 5: Scientific Division (6.0e23 / 2.0e3 = 3.0e20)
  const div = divideScientific(parseToScientific("6.0e23"), parseToScientific("2.0e3"));
  if (div.mantissa !== 3 || div.exponent !== 20) {
    throw new Error(`Scientific division failed: got ${div.mantissa}e${div.exponent}`);
  }

  // Test 6: Zero & Edge Inputs
  const resZero = calculateScientificNotationCalculator({ number: 0 });
  if (!resZero || typeof resZero.scientific !== "string") {
    throw new Error("Formula failed for zero inputs");
  }

  return true;
}
