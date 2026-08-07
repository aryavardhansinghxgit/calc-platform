import { DateCalculatorOutputs } from "./types";

export function calculateDateCalculator(inputs: Record<string, any>): DateCalculatorOutputs {
  try {
    const rawStart = typeof inputs.startDate === "string" ? inputs.startDate : "2026-08-07";
    const start = new Date(rawStart);
    if (isNaN(start.getTime())) return { resultDate: "Invalid Date", dayOfWeek: "N/A" };
    const mult = inputs.operation === "sub" ? -1 : 1;
    const y = Math.min(1000, Math.max(0, Number(inputs.years) || 0));
    const m = Math.min(1200, Math.max(0, Number(inputs.months) || 0));
    const d = Math.min(36500, Math.max(0, Number(inputs.days) || 0));
    const res = new Date(start);
    res.setFullYear(res.getFullYear() + mult * y);
    res.setMonth(res.getMonth() + mult * m);
    res.setDate(res.getDate() + mult * d);
    if (isNaN(res.getTime())) return { resultDate: "Invalid Date", dayOfWeek: "N/A" };
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return { resultDate: res.toISOString().split("T")[0], dayOfWeek: daysOfWeek[res.getDay()] || "N/A" };
  } catch (err) {
    return { resultDate: "Invalid Date", dayOfWeek: "N/A" };
  }
}
