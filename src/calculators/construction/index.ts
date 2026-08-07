import { CalculatorModuleDefinition } from "../types";
import { concrete_calculatorConfig } from "@/app/calculators/concrete-calculator/config";
import { btu_calculatorConfig } from "@/app/calculators/btu-calculator/config";
import { square_footage_calculatorConfig } from "@/app/calculators/square-footage-calculator/config";
import { stair_calculatorConfig } from "@/app/calculators/stair-calculator/config";
import { roofing_calculatorConfig } from "@/app/calculators/roofing-calculator/config";
import { tile_calculatorConfig } from "@/app/calculators/tile-calculator/config";
import { mulch_calculatorConfig } from "@/app/calculators/mulch-calculator/config";
import { gravel_calculatorConfig } from "@/app/calculators/gravel-calculator/config";

export const CONSTRUCTION_CALCULATORS: CalculatorModuleDefinition[] = [
  concrete_calculatorConfig,
  btu_calculatorConfig,
  square_footage_calculatorConfig,
  stair_calculatorConfig,
  roofing_calculatorConfig,
  tile_calculatorConfig,
  mulch_calculatorConfig,
  gravel_calculatorConfig,
];

export default CONSTRUCTION_CALCULATORS;
