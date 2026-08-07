import { DiceRollerOutputs } from "./types";

export function calculateDiceRoller(inputs: Record<string, any>): DiceRollerOutputs {
  const count = Math.min(20, Math.max(1, Number(inputs.diceCount) || 2));
  const sides = Math.max(2, Number(inputs.diceSides) || 6);
  const mod = Number(inputs.modifier) || 0;
  const rolls: number[] = [];
  for (let i = 0; i < count; i++) {
    rolls.push(Math.floor(Math.random() * sides) + 1);
  }
  const sum = rolls.reduce((a, b) => a + b, 0) + mod;
  return { totalScore: sum, rollsList: `[${rolls.join(", ")}]${mod !== 0 ? (mod > 0 ? " + " + mod : " - " + Math.abs(mod)) : ""}` };
}
