import { CalculatorModuleDefinition } from "../types";
import { GST_CALCULATOR } from "./gst";
import { gdp_calculatorConfig } from "@/app/calculators/gdp-calculator/config";
import { electricity_calculatorConfig } from "@/app/calculators/electricity-calculator/config";

export const BUSINESS_CALCULATORS: CalculatorModuleDefinition[] = [
  GST_CALCULATOR,
  gdp_calculatorConfig,
  electricity_calculatorConfig,
];

export default BUSINESS_CALCULATORS;
