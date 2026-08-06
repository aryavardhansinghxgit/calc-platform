/**
 * Pure Mathematical Logic for Mortgage Calculation.
 * Delegated to src/modules/mortgage/formula.ts for Clean Feature Module Architecture.
 */

import { calculateMortgageModule } from "@/modules/mortgage/formula";
import { MortgageModuleInput, MortgageModuleOutput, AmortizationRow } from "@/modules/mortgage/types";

export type MortgageFormulaInput = MortgageModuleInput;
export type MortgageFormulaResult = MortgageModuleOutput;
export type { AmortizationRow };

export function calculateMortgageFormula(inputs: MortgageFormulaInput): MortgageFormulaResult {
  return calculateMortgageModule(inputs);
}
