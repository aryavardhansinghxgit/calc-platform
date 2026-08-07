import { LoveCalculatorOutputs } from "./types";

export function calculateLoveCalculator(inputs: Record<string, any>): LoveCalculatorOutputs {
  const n1 = String(inputs.name1 || "Romeo").trim().toLowerCase();
  const n2 = String(inputs.name2 || "Juliet").trim().toLowerCase();
  const combined = (n1 + n2).replace(/[^a-z]/g, "");
  let hash = 0;
  for (let i = 0; i < combined.length; i++) hash = (hash * 31 + combined.charCodeAt(i)) % 101;
  const score = Math.max(50, hash % 51 + 50); // Fun positive bias (50-100%)
  let verdict = "Soulmates! Perfect Match 💕";
  if (score < 65) verdict = "Good Match! Opposites Attract ✨";
  else if (score < 85) verdict = "Great Chemistry! Strong Connection 💖";
  return { compatibilityScore: score, verdict };
}
