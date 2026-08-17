import { CalculatorModuleDefinition } from "../types";
import { height_calculatorConfig } from "@/app/calculators/height-calculator/config";
import { conversion_calculatorConfig } from "@/app/calculators/conversion-calculator/config";
import { density_calculatorConfig } from "@/app/calculators/density-calculator/config";
import { mass_calculatorConfig } from "@/app/calculators/mass-calculator/config";
import { weight_calculatorConfig } from "@/app/calculators/weight-calculator/config";
import { speed_calculatorConfig } from "@/app/calculators/speed-calculator/config";
import { roman_numeral_converterConfig } from "@/app/calculators/roman-numeral-converter/config";
import { shoe_size_calculatorConfig } from "@/app/calculators/shoe-size-calculator/config";

export const CONVERTERS_CALCULATORS: CalculatorModuleDefinition[] = [
  height_calculatorConfig,
  conversion_calculatorConfig,
  density_calculatorConfig,
  mass_calculatorConfig,
  weight_calculatorConfig,
  speed_calculatorConfig,
  roman_numeral_converterConfig,
  shoe_size_calculatorConfig,
];

export default CONVERTERS_CALCULATORS;
