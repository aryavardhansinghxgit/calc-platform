import { SleepCalculatorOutputs } from "./types";

export function calculateSleepCalculator(inputs: Record<string, any>): SleepCalculatorOutputs {
  const parts = String(inputs.wakeTime || "07:00").split(":").map(Number);
  const wakeMins = (parts[0] || 7) * 60 + (parts[1] || 0);
  const formatTime = (mins: number) => {
    let m = mins % (24 * 60);
    if (m < 0) m += 24 * 60;
    const hrs = Math.floor(m / 60);
    const min = m % 60;
    return `${hrs.toString().padStart(2, "0")}:${min.toString().padStart(2, "0")}`;
  };
  const b6 = wakeMins - (6 * 90 + 14); // 6 cycles + 14 mins to fall asleep
  const b5 = wakeMins - (5 * 90 + 14);
  return { idealBedtime: formatTime(b6), goodBedtime: formatTime(b5) };
}
