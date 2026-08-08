/**
 * Pure Mathematical Logic for Loan Calculator.
 * Delegated to src/modules/loan/formula.ts for Clean Architecture.
 */

import { calculateLoanModule } from "@/modules/loan/formula";
import { LoanInput, LoanOutput } from "@/modules/loan/types";

export type LoanFormulaInput = LoanInput;
export type LoanFormulaResult = LoanOutput;

export function calculateLoanFormula(inputs: LoanFormulaInput): LoanFormulaResult {
  return calculateLoanModule(inputs);
}
