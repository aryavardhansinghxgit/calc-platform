/**
 * Core Calculator Engine Evaluator.
 */

import { CalculatorDefinition, CalculationResult } from "./types";
import { getCalculatorDefinition } from "./registry";
import { formatCurrency, formatPercent, formatNumber } from "./formatters";

export class CalculatorEngine {
  public static run(
    calculatorIdOrSlug: string,
    userInputs: Record<string, any>
  ): CalculationResult {
    const def = getCalculatorDefinition(calculatorIdOrSlug);

    if (!def) {
      return {
        success: false,
        data: {},
        formatted: {},
        error: `Calculator '${calculatorIdOrSlug}' not found in registry`,
      };
    }

    try {
      // Execute definition calculation logic
      const rawData = def.calculate(userInputs);
      const formatted: Record<string, string> = {};

      def.outputs.forEach((out) => {
        const val = rawData[out.name];
        if (typeof val === "number") {
          switch (out.format) {
            case "currency":
              formatted[out.name] = formatCurrency(val, out.unit || "$");
              break;
            case "percentage":
              formatted[out.name] = formatPercent(val);
              break;
            case "number":
              formatted[out.name] = formatNumber(val);
              break;
            default:
              formatted[out.name] = String(val);
          }
        } else {
          formatted[out.name] = String(val ?? "");
        }
      });

      return {
        success: true,
        data: rawData,
        formatted,
      };
    } catch (err: any) {
      return {
        success: false,
        data: {},
        formatted: {},
        error: err.message || "Failed to execute calculation formula",
      };
    }
  }
}

export default CalculatorEngine;
