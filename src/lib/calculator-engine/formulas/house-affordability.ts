/**
 * Pure Mathematical Logic for House Affordability Calculator.
 * Delegated to src/modules/house-affordability/formula.ts for Clean Architecture.
 */

import {
  calculateIncomeAffordability,
  calculateBudgetAffordability,
} from "@/modules/house-affordability/formula";
import {
  IncomeAffordabilityInput,
  IncomeAffordabilityOutput,
  BudgetAffordabilityInput,
  BudgetAffordabilityOutput,
} from "@/modules/house-affordability/types";

export type {
  IncomeAffordabilityInput,
  IncomeAffordabilityOutput,
  BudgetAffordabilityInput,
  BudgetAffordabilityOutput,
};

export function calculateIncomeAffordabilityFormula(
  inputs: IncomeAffordabilityInput
): IncomeAffordabilityOutput {
  return calculateIncomeAffordability(inputs);
}

export function calculateBudgetAffordabilityFormula(
  inputs: BudgetAffordabilityInput
): BudgetAffordabilityOutput {
  return calculateBudgetAffordability(inputs);
}
