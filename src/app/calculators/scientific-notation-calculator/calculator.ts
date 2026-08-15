import { ScientificNotationCalculatorOutputs } from "./types";
import {
  parseToScientific,
  formatNormalizedScientific,
  formatEngineeringNotation
} from "./scientific-notation-logic";

export function calculateScientificNotationCalculator(inputs: Record<string, any>): ScientificNotationCalculatorOutputs {
  const n = Number(inputs.number) || 3500000;
  const parsed = parseToScientific(n);

  const sci = formatNormalizedScientific(parsed, 4);
  const eng = formatEngineeringNotation(parsed, 4);

  return {
    scientific: sci,
    engineering: eng.engineeringString,
    standard: n
  };
}
