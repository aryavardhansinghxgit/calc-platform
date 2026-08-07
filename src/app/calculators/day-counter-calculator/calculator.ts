import { DayCounterOutputs } from "./types";

export function calculateDayCounter(inputs: Record<string, any>): DayCounterOutputs {
  const d1 = new Date(inputs.startDate || "2026-01-01");
  const d2 = new Date(inputs.endDate || "2026-12-31");
  if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return { totalDays: 0, businessDays: 0, totalWeeks: 0 };
  const totalDays = Math.max(0, Math.floor((d2.getTime() - d1.getTime()) / 86400000));
  let biz = 0;
  const cur = new Date(d1);
  while (cur < d2) {
    const day = cur.getDay();
    if (day !== 0 && day !== 6) biz++;
    cur.setDate(cur.getDate() + 1);
  }
  return { totalDays, businessDays: biz, totalWeeks: parseFloat((totalDays / 7).toFixed(1)) };
}
