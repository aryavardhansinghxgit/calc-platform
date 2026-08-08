/**
 * Pure Mathematical Engine for Refinance Calculator.
 * Delegated to src/modules/refinance/formula.ts for Clean Architecture.
 */

import { calculateRefinanceModule } from "@/modules/refinance/formula";
import { RefinanceInput, RefinanceOutput } from "@/modules/refinance/types";

export type { RefinanceInput, RefinanceOutput };

export function calculateRefinanceFormula(inputs: RefinanceInput): RefinanceOutput {
  return calculateRefinanceModule(inputs);
}
