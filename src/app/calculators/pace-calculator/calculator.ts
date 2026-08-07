import { PaceCalculatorOutputs } from "./types";

export function calculatePaceCalculator(inputs: Record<string, any>): PaceCalculatorOutputs {
  const dist = Math.max(0.01, Number(inputs.distanceKm) || 10);
  const hrs = Math.max(0, Number(inputs.timeHours) || 0);
  const mins = Math.max(0, Number(inputs.timeMinutes) || 0);
  const secs = Math.max(0, Number(inputs.timeSeconds) || 0);
  const totalSecs = hrs * 3600 + mins * 60 + secs;
  if (totalSecs <= 0) return { paceKm: "00:00 /km", paceMile: "00:00 /mi", speedKmh: 0, speedMph: 0 };
  const secPerKm = totalSecs / dist;
  const secPerMile = secPerKm * 1.60934;
  const formatPace = (s: number) => {
    const m = Math.floor(s / 60);
    const remainder = Math.round(s % 60);
    return `${m}:${remainder < 10 ? "0" : ""}${remainder}`;
  };
  const speedKmh = parseFloat((dist / (totalSecs / 3600)).toFixed(2));
  const speedMph = parseFloat((speedKmh / 1.60934).toFixed(2));
  return { paceKm: `${formatPace(secPerKm)} /km`, paceMile: `${formatPace(secPerMile)} /mi`, speedKmh, speedMph };
}
