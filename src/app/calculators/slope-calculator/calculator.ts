import { SlopeCalculatorOutputs } from "./types";
import { computeTwoPointSlope } from "./slope-logic";

export function calculateSlopeCalculator(inputs: Record<string, any>): SlopeCalculatorOutputs {
  const x1 = inputs.x1 !== undefined && inputs.x1 !== "" ? Number(inputs.x1) : 1;
  const y1 = inputs.y1 !== undefined && inputs.y1 !== "" ? Number(inputs.y1) : 1;
  const x2 = inputs.x2 !== undefined && inputs.x2 !== "" ? Number(inputs.x2) : 4;
  const y2 = inputs.y2 !== undefined && inputs.y2 !== "" ? Number(inputs.y2) : 7;

  const result = computeTwoPointSlope(x1, y1, x2, y2, 4);

  return {
    slopeM: result.slope,
    angleDeg: result.angleDeg,
    lineEquation: result.slopeInterceptForm,
    isVertical: result.isVertical,
    isCoincident: result.isCoincident
  };
}
