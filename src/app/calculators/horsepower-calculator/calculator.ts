import { HorsepowerCalculatorOutputs } from "./types";

export function calculateHorsepowerCalculator(inputs: Record<string, any>): HorsepowerCalculatorOutputs {
  const t = Math.max(0, Number(inputs.torqueLbFt) || 300);
  const rpm = Math.max(0, Number(inputs.rpm) || 5252);
  const hp = (t * rpm) / 5252;
  const kw = hp * 0.7457;
  return { horsepower: parseFloat(hp.toFixed(1)), kilowatts: parseFloat(kw.toFixed(1)) };
}
