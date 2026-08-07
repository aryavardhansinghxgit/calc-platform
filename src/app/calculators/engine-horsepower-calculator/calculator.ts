import { EngineHorsepowerCalculatorOutputs } from "./types";

export function calculateEngineHorsepowerCalculator(inputs: Record<string, any>): EngineHorsepowerCalculatorOutputs {
  const w = Math.max(100, Number(inputs.weightLbs) || 3400);
  const speed = Math.max(10, Number(inputs.trapSpeedMph) || 105);
  const hpWheel = w * Math.pow(speed / 234, 3);
  const hpCrank = hpWheel / 0.85;
  return { wheelHp: Math.round(hpWheel), crankHp: Math.round(hpCrank) };
}
