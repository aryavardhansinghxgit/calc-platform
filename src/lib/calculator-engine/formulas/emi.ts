/**
 * Pure Mathematical Logic for EMI Calculator.
 * Delegated to src/modules/emi/formula.ts for Clean Architecture.
 */

import { calculateEmiModule } from "@/modules/emi/formula";
import { EmiInput, EmiOutput } from "@/modules/emi/types";

export type EmiFormulaInput = EmiInput;
export type EmiFormulaResult = EmiOutput;

export function calculateEmiFormula(inputs: EmiFormulaInput): EmiFormulaResult {
  return calculateEmiModule(inputs);
}
