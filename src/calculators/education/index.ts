import { CalculatorModuleDefinition } from "../types";
import { molarity_calculatorConfig } from "@/app/calculators/molarity-calculator/config";
import { molecular_weight_calculatorConfig } from "@/app/calculators/molecular-weight-calculator/config";
import { gpa_calculatorConfig } from "@/app/calculators/gpa-calculator/config";
import { grade_calculatorConfig } from "@/app/calculators/grade-calculator/config";

export const EDUCATION_CALCULATORS: CalculatorModuleDefinition[] = [
  molarity_calculatorConfig,
  molecular_weight_calculatorConfig,
  gpa_calculatorConfig,
  grade_calculatorConfig,
];

export default EDUCATION_CALCULATORS;
