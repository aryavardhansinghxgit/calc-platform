import { BraSizeCalculatorOutputs } from "./types";

export function calculateBraSizeCalculator(inputs: Record<string, any>): BraSizeCalculatorOutputs {
  const ub = Number(inputs.underbustInches) || 32;
  const bust = Number(inputs.bustInches) || 36;
  const band = Math.round(ub) % 2 === 0 ? Math.round(ub) : Math.round(ub) + 1;
  const diff = Math.max(0, Math.round(bust - ub));
  const cups = ["AA", "A", "B", "C", "D", "DD/E", "DDD/F", "G", "H"];
  const cup = cups[Math.min(diff, cups.length - 1)] || "A";
  return { braSize: `${band}${cup}`, bandSize: band, cupLetter: cup };
}
