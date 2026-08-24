import { ScientificCalculatorInputs, ScientificCalculatorOutputs } from "./types";

export function calculateScientificCalculator(inputs: Record<string, any>): ScientificCalculatorOutputs {
  const x = inputs.value1 !== undefined && inputs.value1 !== null && !isNaN(Number(inputs.value1))
    ? Number(inputs.value1)
    : 0;
  const y = inputs.value2 !== undefined && inputs.value2 !== null && !isNaN(Number(inputs.value2))
    ? Number(inputs.value2)
    : 2;
  const op = inputs.operation || "sin";
  const unit = (inputs.angleUnit || "deg") as "deg" | "rad" | "grad";

  const toRad = (val: number) => {
    if (unit === "deg") return (val * Math.PI) / 180;
    if (unit === "grad") return (val * Math.PI) / 200;
    return val;
  };
  const toAngleOut = (radVal: number) => {
    if (unit === "deg") return (radVal * 180) / Math.PI;
    if (unit === "grad") return (radVal * 200) / Math.PI;
    return radVal;
  };
  const unitLabel = unit === "deg" ? "°" : unit === "grad" ? " grad" : " rad";

  let resultNum: number = 0;
  let explanation: string = "";
  let domainNote: string | undefined = undefined;

  switch (op) {
    case "sin": {
      const rad = toRad(x);
      resultNum = Math.sin(rad);
      explanation = `sin(${x}${unitLabel}) = ${resultNum.toFixed(6)}`;
      break;
    }
    case "cos": {
      const rad = toRad(x);
      resultNum = Math.cos(rad);
      explanation = `cos(${x}${unitLabel}) = ${resultNum.toFixed(6)}`;
      break;
    }
    case "tan": {
      const rad = toRad(x);
      // Check for odd multiples of pi/2 (or 90 deg) where tan is undefined
      const degNormalized = Math.abs(x % 180);
      if (unit === "deg" && (degNormalized === 90)) {
        return {
          result: "Undefined",
          explanation: `tan(${x}°) is undefined (vertical asymptote at odd multiples of 90°)`,
          domainNote: "Tangent is undefined when cosine is zero (cos = 0)."
        };
      }
      resultNum = Math.tan(rad);
      explanation = `tan(${x}${unitLabel}) = ${resultNum.toFixed(6)}`;
      break;
    }
    case "asin": {
      if (x < -1 || x > 1) {
        return {
          result: "Undefined (Out of Domain)",
          explanation: `arcsin(${x}) is undefined for real numbers. Domain: [-1, 1]`,
          domainNote: "Domain restricted to [-1, 1]."
        };
      }
      const rad = Math.asin(x);
      resultNum = toAngleOut(rad);
      explanation = `arcsin(${x}) = ${resultNum.toFixed(6)}${unitLabel}`;
      break;
    }
    case "acos": {
      if (x < -1 || x > 1) {
        return {
          result: "Undefined (Out of Domain)",
          explanation: `arccos(${x}) is undefined for real numbers. Domain: [-1, 1]`,
          domainNote: "Domain restricted to [-1, 1]."
        };
      }
      const rad = Math.acos(x);
      resultNum = toAngleOut(rad);
      explanation = `arccos(${x}) = ${resultNum.toFixed(6)}${unitLabel}`;
      break;
    }
    case "atan": {
      const rad = Math.atan(x);
      resultNum = toAngleOut(rad);
      explanation = `arctan(${x}) = ${resultNum.toFixed(6)}${unitLabel}`;
      break;
    }
    case "ln": {
      if (x <= 0) {
        return {
          result: "Undefined",
          explanation: `ln(${x}) is undefined for x ≤ 0. Domain: (0, ∞)`,
          domainNote: "Natural logarithm requires positive inputs (x > 0)."
        };
      }
      resultNum = Math.log(x);
      explanation = `ln(${x}) = ${resultNum.toFixed(6)}`;
      break;
    }
    case "log10": {
      if (x <= 0) {
        return {
          result: "Undefined",
          explanation: `log₁₀(${x}) is undefined for x ≤ 0. Domain: (0, ∞)`,
          domainNote: "Base-10 logarithm requires positive inputs (x > 0)."
        };
      }
      resultNum = Math.log10(x);
      explanation = `log₁₀(${x}) = ${resultNum.toFixed(6)}`;
      break;
    }
    case "log2": {
      if (x <= 0) {
        return {
          result: "Undefined",
          explanation: `log₂(${x}) is undefined for x ≤ 0. Domain: (0, ∞)`,
          domainNote: "Base-2 logarithm requires positive inputs (x > 0)."
        };
      }
      resultNum = Math.log2(x);
      explanation = `log₂(${x}) = ${resultNum.toFixed(6)}`;
      break;
    }
    case "sqr": {
      resultNum = x * x;
      explanation = `${x}² = ${resultNum}`;
      break;
    }
    case "cube": {
      resultNum = x * x * x;
      explanation = `${x}³ = ${resultNum}`;
      break;
    }
    case "pow": {
      resultNum = Math.pow(x, y);
      explanation = `${x}^${y} = ${resultNum}`;
      break;
    }
    case "exp": {
      resultNum = Math.exp(x);
      explanation = `e^(${x}) = ${resultNum.toFixed(6)}`;
      break;
    }
    case "pow10": {
      resultNum = Math.pow(10, x);
      explanation = `10^(${x}) = ${resultNum}`;
      break;
    }
    case "sqrt": {
      if (x < 0) {
        return {
          result: "Complex Number",
          explanation: `√(${x}) is not a real number. Real domain requires x ≥ 0.`,
          domainNote: "Square root of negative numbers yields imaginary numbers (i)."
        };
      }
      resultNum = Math.sqrt(x);
      explanation = `√(${x}) = ${resultNum.toFixed(6)}`;
      break;
    }
    case "cbrt": {
      resultNum = Math.cbrt(x);
      explanation = `∛(${x}) = ${resultNum.toFixed(6)}`;
      break;
    }
    case "yroot": {
      if (y === 0) {
        return {
          result: "Undefined",
          explanation: "0th root is undefined (division by zero in exponent 1/y)",
          domainNote: "Root index y cannot be zero."
        };
      }
      if (x < 0 && y % 2 === 0) {
        return {
          result: "Undefined (Real Domain)",
          explanation: `Even root (${y}) of negative number (${x}) is non-real.`,
          domainNote: "Even roots of negative bases require complex numbers."
        };
      }
      resultNum = x < 0 ? -Math.pow(-x, 1 / y) : Math.pow(x, 1 / y);
      explanation = `${y}-th root of ${x} = ${resultNum.toFixed(6)}`;
      break;
    }
    case "factorial": {
      if (x < 0 || !Number.isInteger(x)) {
        return {
          result: "Undefined (Integer Only)",
          explanation: `Factorial x! is defined for non-negative integers x ≥ 0.`,
          domainNote: "For non-integers, use the Gamma function Γ(x+1)."
        };
      }
      if (x > 170) {
        return {
          result: "Infinity (Overflow)",
          explanation: `${x}! exceeds double-precision floating-point limit (170!).`,
          domainNote: "Values > 170! overflow standard IEEE 754 float limits."
        };
      }
      let f = 1;
      for (let i = 2; i <= x; i++) f *= i;
      resultNum = f;
      explanation = `${x}! = ${resultNum}`;
      break;
    }
    case "abs": {
      resultNum = Math.abs(x);
      explanation = `|${x}| = ${resultNum}`;
      break;
    }
    case "recip": {
      if (x === 0) {
        return {
          result: "Undefined",
          explanation: "1 / 0 is undefined (division by zero)",
          domainNote: "Reciprocal of zero is undefined."
        };
      }
      resultNum = 1 / x;
      explanation = `1 / ${x} = ${resultNum.toFixed(6)}`;
      break;
    }
    case "mod": {
      if (y === 0) {
        return {
          result: "Undefined",
          explanation: "x mod 0 is undefined (division by zero)",
          domainNote: "Modulo divisor cannot be zero."
        };
      }
      resultNum = x % y;
      explanation = `${x} mod ${y} = ${resultNum}`;
      break;
    }
    default: {
      resultNum = x;
      explanation = `Value: ${x}`;
    }
  }

  // Format clean output
  const finalVal = typeof resultNum === "number"
    ? (Number.isInteger(resultNum) ? resultNum : parseFloat(resultNum.toFixed(8)))
    : resultNum;

  return {
    result: finalVal,
    explanation,
    domainNote
  };
}
