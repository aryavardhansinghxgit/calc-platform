import { CalculatorModuleDefinition } from "../types";
import { scientific_calculatorConfig } from "@/app/calculators/scientific-calculator/config";
import { fraction_calculatorConfig } from "@/app/calculators/fraction-calculator/config";
import { percentage_calculatorConfig } from "@/app/calculators/percentage-calculator/config";
import { random_number_generatorConfig } from "@/app/calculators/random-number-generator/config";
import { percent_error_calculatorConfig } from "@/app/calculators/percent-error-calculator/config";
import { exponent_calculatorConfig } from "@/app/calculators/exponent-calculator/config";
import { binary_calculatorConfig } from "@/app/calculators/binary-calculator/config";
import { hex_calculatorConfig } from "@/app/calculators/hex-calculator/config";
import { half_life_calculatorConfig } from "@/app/calculators/half-life-calculator/config";
import { quadratic_formula_calculatorConfig } from "@/app/calculators/quadratic-formula-calculator/config";
import { log_calculatorConfig } from "@/app/calculators/log-calculator/config";
import { ratio_calculatorConfig } from "@/app/calculators/ratio-calculator/config";
import { root_calculatorConfig } from "@/app/calculators/root-calculator/config";
import { lcm_calculatorConfig } from "@/app/calculators/lcm-calculator/config";
import { gcf_calculatorConfig } from "@/app/calculators/gcf-calculator/config";
import { factor_calculatorConfig } from "@/app/calculators/factor-calculator/config";
import { rounding_calculatorConfig } from "@/app/calculators/rounding-calculator/config";
import { matrix_calculatorConfig } from "@/app/calculators/matrix-calculator/config";
import { scientific_notation_calculatorConfig } from "@/app/calculators/scientific-notation-calculator/config";
import { big_number_calculatorConfig } from "@/app/calculators/big-number-calculator/config";
import { standard_deviation_calculatorConfig } from "@/app/calculators/standard-deviation-calculator/config";
import { number_sequence_calculatorConfig } from "@/app/calculators/number-sequence-calculator/config";
import { sample_size_calculatorConfig } from "@/app/calculators/sample-size-calculator/config";
import { probability_calculatorConfig } from "@/app/calculators/probability-calculator/config";
import { statistics_calculatorConfig } from "@/app/calculators/statistics-calculator/config";
import { mean_median_mode_calculatorConfig } from "@/app/calculators/mean-median-mode-calculator/config";
import { permutation_combination_calculatorConfig } from "@/app/calculators/permutation-combination-calculator/config";
import { z_score_calculatorConfig } from "@/app/calculators/z-score-calculator/config";
import { confidence_interval_calculatorConfig } from "@/app/calculators/confidence-interval-calculator/config";
import { triangle_calculatorConfig } from "@/app/calculators/triangle-calculator/config";
import { volume_calculatorConfig } from "@/app/calculators/volume-calculator/config";
import { slope_calculatorConfig } from "@/app/calculators/slope-calculator/config";
import { area_calculatorConfig } from "@/app/calculators/area-calculator/config";
import { distance_calculatorConfig } from "@/app/calculators/distance-calculator/config";
import { circle_calculatorConfig } from "@/app/calculators/circle-calculator/config";
import { surface_area_calculatorConfig } from "@/app/calculators/surface-area-calculator/config";
import { pythagorean_theorem_calculatorConfig } from "@/app/calculators/pythagorean-theorem-calculator/config";
import { right_triangle_calculatorConfig } from "@/app/calculators/right-triangle-calculator/config";

export const MATH_CALCULATORS: CalculatorModuleDefinition[] = [
  scientific_calculatorConfig,
  fraction_calculatorConfig,
  percentage_calculatorConfig,
  random_number_generatorConfig,
  percent_error_calculatorConfig,
  exponent_calculatorConfig,
  binary_calculatorConfig,
  hex_calculatorConfig,
  half_life_calculatorConfig,
  quadratic_formula_calculatorConfig,
  log_calculatorConfig,
  ratio_calculatorConfig,
  root_calculatorConfig,
  lcm_calculatorConfig,
  gcf_calculatorConfig,
  factor_calculatorConfig,
  rounding_calculatorConfig,
  matrix_calculatorConfig,
  scientific_notation_calculatorConfig,
  big_number_calculatorConfig,
  standard_deviation_calculatorConfig,
  number_sequence_calculatorConfig,
  sample_size_calculatorConfig,
  probability_calculatorConfig,
  statistics_calculatorConfig,
  mean_median_mode_calculatorConfig,
  permutation_combination_calculatorConfig,
  z_score_calculatorConfig,
  confidence_interval_calculatorConfig,
  triangle_calculatorConfig,
  volume_calculatorConfig,
  slope_calculatorConfig,
  area_calculatorConfig,
  distance_calculatorConfig,
  circle_calculatorConfig,
  surface_area_calculatorConfig,
  pythagorean_theorem_calculatorConfig,
  right_triangle_calculatorConfig,
];

export default MATH_CALCULATORS;
