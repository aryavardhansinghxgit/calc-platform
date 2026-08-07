/**
 * Calculator Registry - Central Registry for Calculator Definitions and Execution Logic.
 * Delegated to category modules in src/calculators for a clean modular architecture.
 */

import {
  getCalculatorDefinition as getCalcDef,
  getAllCalculatorDefinitions as getAllCalcDefs,
  getCalculatorsByCategory as getCalcsByCat,
  searchCalculators as searchReg,
  getRelatedCalculators as getRelatedCalcs,
  CalculatorModuleDefinition,
} from "@/calculators";

export const getCalculatorDefinition = getCalcDef;
export const getAllCalculatorDefinitions = getAllCalcDefs;
export const getCalculatorsByCategory = getCalcsByCat;
export const searchRegistry = searchReg;
export const getRelatedCalculators = getRelatedCalcs;
