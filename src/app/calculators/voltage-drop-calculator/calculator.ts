import { VoltageDropCalculatorOutputs } from "./types";

export function calculateVoltageDropCalculator(inputs: Record<string, any>): VoltageDropCalculatorOutputs {
  const v = Math.max(1, Number(inputs.voltage) || 120);
  const i = Math.max(0, Number(inputs.currentAmps) || 15);
  const d = Math.max(0, Number(inputs.distanceFt) || 100);
  const awg = inputs.wireGauge || "12";
  let rPer1000Ft = 1.93; // 12 AWG copper
  if (awg === "14") rPer1000Ft = 3.07;
  else if (awg === "10") rPer1000Ft = 1.21;
  else if (awg === "8") rPer1000Ft = 0.764;
  const totalDistFeet = 2 * d; // 2-wire single phase
  const vDrop = (2 * d * i * rPer1000Ft) / 1000;
  const pct = (vDrop / v) * 100;
  return { voltageDrop: parseFloat(vDrop.toFixed(2)), voltageDropPct: parseFloat(pct.toFixed(2)), endVoltage: parseFloat((v - vDrop).toFixed(2)) };
}
