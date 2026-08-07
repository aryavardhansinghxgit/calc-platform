import { DayoftheWeekCalculatorOutputs } from "./types";

export function calculateDayoftheWeekCalculator(inputs: Record<string, any>): DayoftheWeekCalculatorOutputs {
  const d = new Date(inputs.targetDate || "1969-07-20");
  if (isNaN(d.getTime())) return { dayOfWeek: "Invalid Date", isLeapYear: "N/A" };
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const y = d.getFullYear();
  const isLeap = (y % 4 === 0 && y % 100 !== 0) || (y % 400 === 0);
  return { dayOfWeek: days[d.getDay()], isLeapYear: isLeap ? "Yes" : "No" };
}
