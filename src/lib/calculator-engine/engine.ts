/**
 * Main Calculator Engine core evaluator.
 */

import { CalculationInput, CalculationResult } from "./types";
import { formatCurrency, formatPercent } from "./formatter";
import { validateInputNumber } from "./validators";

export class CalculatorEngine {
  public static evaluate(input: CalculationInput): CalculationResult {
    return {
      success: true,
      value: 0,
      formatted: "0",
    };
  }
}

export default CalculatorEngine;
