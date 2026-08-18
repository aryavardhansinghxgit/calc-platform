import { CalculatorModuleDefinition } from "../types";
import { voltage_drop_calculatorConfig } from "@/app/calculators/voltage-drop-calculator/config";
import { resistor_calculatorConfig } from "@/app/calculators/resistor-calculator/config";
import { ohms_law_calculatorConfig } from "@/app/calculators/ohms-law-calculator/config";
import { ip_subnet_calculatorConfig } from "@/app/calculators/ip-subnet-calculator/config";
import { bandwidth_calculatorConfig } from "@/app/calculators/bandwidth-calculator/config";
import { base64_calculatorConfig } from "@/app/calculators/base64-calculator/config";
import { url_encoder_decoderConfig } from "@/app/calculators/url-encoder-decoder/config";
import { password_generatorConfig } from "@/app/calculators/password-generator/config";
import { bra_size_calculatorConfig } from "@/app/calculators/bra-size-calculator/config";
import { tip_calculatorConfig } from "@/app/calculators/tip-calculator/config";
import { golf_handicap_calculatorConfig } from "@/app/calculators/golf-handicap-calculator/config";
import { sleep_calculatorConfig } from "@/app/calculators/sleep-calculator/config";
import { wind_chill_calculatorConfig } from "@/app/calculators/wind-chill-calculator/config";
import { heat_index_calculatorConfig } from "@/app/calculators/heat-index-calculator/config";
import { dew_point_calculatorConfig } from "@/app/calculators/dew-point-calculator/config";
import { fuel_cost_calculatorConfig } from "@/app/calculators/fuel-cost-calculator/config";
import { gas_mileage_calculatorConfig } from "@/app/calculators/gas-mileage-calculator/config";
import { horsepower_calculatorConfig } from "@/app/calculators/horsepower-calculator/config";
import { engine_horsepower_calculatorConfig } from "@/app/calculators/engine-horsepower-calculator/config";
import { mileage_calculatorConfig } from "@/app/calculators/mileage-calculator/config";
import { tire_size_calculatorConfig } from "@/app/calculators/tire-size-calculator/config";
import { dice_rollerConfig } from "@/app/calculators/dice-roller/config";
import { love_calculatorConfig } from "@/app/calculators/love-calculator/config";
import { gpa_calculatorConfig } from "@/app/calculators/gpa-calculator/config";
import { grade_calculatorConfig } from "@/app/calculators/grade-calculator/config";
import { molarity_calculatorConfig } from "@/app/calculators/molarity-calculator/config";
import { molecular_weight_calculatorConfig } from "@/app/calculators/molecular-weight-calculator/config";
import { electricity_calculatorConfig } from "@/app/calculators/electricity-calculator/config";
import { GDP_CALCULATOR } from "./gdp";

export const OTHER_CALCULATORS: CalculatorModuleDefinition[] = [
  electricity_calculatorConfig,
  voltage_drop_calculatorConfig,
  resistor_calculatorConfig,
  ohms_law_calculatorConfig,
  ip_subnet_calculatorConfig,
  bandwidth_calculatorConfig,
  base64_calculatorConfig,
  url_encoder_decoderConfig,
  password_generatorConfig,
  bra_size_calculatorConfig,
  tip_calculatorConfig,
  golf_handicap_calculatorConfig,
  sleep_calculatorConfig,
  wind_chill_calculatorConfig,
  heat_index_calculatorConfig,
  dew_point_calculatorConfig,
  fuel_cost_calculatorConfig,
  gas_mileage_calculatorConfig,
  horsepower_calculatorConfig,
  engine_horsepower_calculatorConfig,
  mileage_calculatorConfig,
  tire_size_calculatorConfig,
  dice_rollerConfig,
  love_calculatorConfig,
  gpa_calculatorConfig,
  grade_calculatorConfig,
  molarity_calculatorConfig,
  molecular_weight_calculatorConfig,
  GDP_CALCULATOR,
];

export default OTHER_CALCULATORS;
