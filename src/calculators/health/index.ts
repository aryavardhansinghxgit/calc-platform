import { CalculatorModuleDefinition } from "../types";
import { BMI_CALCULATOR } from "./bmi";

export const HEALTH_CALCULATORS: CalculatorModuleDefinition[] = [
  BMI_CALCULATOR,
];

export default HEALTH_CALCULATORS;
