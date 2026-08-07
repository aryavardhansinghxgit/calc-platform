import { CalculatorModuleDefinition } from "../types";
import { bmi_calculatorConfig } from "@/app/calculators/bmi-calculator/config";
import { calorie_calculatorConfig } from "@/app/calculators/calorie-calculator/config";
import { body_fat_calculatorConfig } from "@/app/calculators/body-fat-calculator/config";
import { bmr_calculatorConfig } from "@/app/calculators/bmr-calculator/config";
import { ideal_weight_calculatorConfig } from "@/app/calculators/ideal-weight-calculator/config";
import { pace_calculatorConfig } from "@/app/calculators/pace-calculator/config";
import { army_body_fat_calculatorConfig } from "@/app/calculators/army-body-fat-calculator/config";
import { lean_body_mass_calculatorConfig } from "@/app/calculators/lean-body-mass-calculator/config";
import { healthy_weight_calculatorConfig } from "@/app/calculators/healthy-weight-calculator/config";
import { calories_burned_calculatorConfig } from "@/app/calculators/calories-burned-calculator/config";
import { one_rep_max_calculatorConfig } from "@/app/calculators/one-rep-max-calculator/config";
import { target_heart_rate_calculatorConfig } from "@/app/calculators/target-heart-rate-calculator/config";
import { pregnancy_calculatorConfig } from "@/app/calculators/pregnancy-calculator/config";
import { pregnancy_weight_gain_calculatorConfig } from "@/app/calculators/pregnancy-weight-gain-calculator/config";
import { pregnancy_conception_calculatorConfig } from "@/app/calculators/pregnancy-conception-calculator/config";
import { due_date_calculatorConfig } from "@/app/calculators/due-date-calculator/config";
import { ovulation_calculatorConfig } from "@/app/calculators/ovulation-calculator/config";
import { conception_calculatorConfig } from "@/app/calculators/conception-calculator/config";
import { period_calculatorConfig } from "@/app/calculators/period-calculator/config";
import { macro_calculatorConfig } from "@/app/calculators/macro-calculator/config";
import { carbohydrate_calculatorConfig } from "@/app/calculators/carbohydrate-calculator/config";
import { protein_calculatorConfig } from "@/app/calculators/protein-calculator/config";
import { fat_intake_calculatorConfig } from "@/app/calculators/fat-intake-calculator/config";
import { tdee_calculatorConfig } from "@/app/calculators/tdee-calculator/config";
import { gfr_calculatorConfig } from "@/app/calculators/gfr-calculator/config";
import { body_type_calculatorConfig } from "@/app/calculators/body-type-calculator/config";
import { body_surface_area_calculatorConfig } from "@/app/calculators/body-surface-area-calculator/config";
import { bac_calculatorConfig } from "@/app/calculators/bac-calculator/config";

export const HEALTH_CALCULATORS: CalculatorModuleDefinition[] = [
  bmi_calculatorConfig,
  calorie_calculatorConfig,
  body_fat_calculatorConfig,
  bmr_calculatorConfig,
  ideal_weight_calculatorConfig,
  pace_calculatorConfig,
  army_body_fat_calculatorConfig,
  lean_body_mass_calculatorConfig,
  healthy_weight_calculatorConfig,
  calories_burned_calculatorConfig,
  one_rep_max_calculatorConfig,
  target_heart_rate_calculatorConfig,
  pregnancy_calculatorConfig,
  pregnancy_weight_gain_calculatorConfig,
  pregnancy_conception_calculatorConfig,
  due_date_calculatorConfig,
  ovulation_calculatorConfig,
  conception_calculatorConfig,
  period_calculatorConfig,
  macro_calculatorConfig,
  carbohydrate_calculatorConfig,
  protein_calculatorConfig,
  fat_intake_calculatorConfig,
  tdee_calculatorConfig,
  gfr_calculatorConfig,
  body_type_calculatorConfig,
  body_surface_area_calculatorConfig,
  bac_calculatorConfig,
];

export default HEALTH_CALCULATORS;
