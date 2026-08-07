import { CalculatorModuleDefinition } from "../types";
import { AGE_CALCULATOR } from "./age";
import { age_calculatorConfig } from "@/app/calculators/age-calculator/config";
import { date_calculatorConfig } from "@/app/calculators/date-calculator/config";
import { time_calculatorConfig } from "@/app/calculators/time-calculator/config";
import { hours_calculatorConfig } from "@/app/calculators/hours-calculator/config";
import { time_card_calculatorConfig } from "@/app/calculators/time-card-calculator/config";
import { time_zone_calculatorConfig } from "@/app/calculators/time-zone-calculator/config";
import { time_duration_calculatorConfig } from "@/app/calculators/time-duration-calculator/config";
import { day_counter_calculatorConfig } from "@/app/calculators/day-counter-calculator/config";
import { day_of_the_week_calculatorConfig } from "@/app/calculators/day-of-the-week-calculator/config";

export const DATE_CALCULATORS: CalculatorModuleDefinition[] = [
  AGE_CALCULATOR,
  age_calculatorConfig,
  date_calculatorConfig,
  time_calculatorConfig,
  hours_calculatorConfig,
  time_card_calculatorConfig,
  time_zone_calculatorConfig,
  time_duration_calculatorConfig,
  day_counter_calculatorConfig,
  day_of_the_week_calculatorConfig,
];

export default DATE_CALCULATORS;
