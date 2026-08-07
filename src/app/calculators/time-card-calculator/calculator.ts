import { TimeCardCalculatorOutputs } from "./types";

export function calculateTimeCardCalculator(inputs: Record<string, any>): TimeCardCalculatorOutputs {
  const total = ["monHours", "tueHours", "wedHours", "thuHours", "friHours"].reduce((acc, k) => acc + Math.max(0, Number(inputs[k]) || 0), 0);
  const rate = Math.max(0, Number(inputs.hourlyRate) || 25);
  const regHours = Math.min(40, total);
  const otHours = Math.max(0, total - 40);
  const regPay = regHours * rate;
  const otPay = otHours * rate * 1.5;
  return { grossPay: regPay + otPay, totalHours: total, regularPay: regPay, overtimePay: otPay };
}
