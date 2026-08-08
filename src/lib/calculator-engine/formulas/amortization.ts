/**
 * Pure Mathematical Logic for Amortization Calculation.
 * Delegated to src/modules/amortization/formula.ts for Clean Feature Module Architecture.
 */

import { calculateAmortizationModule } from "@/modules/amortization/formula";
import { AmortizationInput, AmortizationOutput, AmortizationRow } from "@/modules/amortization/types";

export type AmortizationFormulaInput = AmortizationInput;
export type AmortizationFormulaResult = AmortizationOutput;
export type { AmortizationRow };

export function calculateAmortizationFormula(inputs: AmortizationFormulaInput): AmortizationFormulaResult {
  return calculateAmortizationModule(inputs);
}
