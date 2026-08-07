import { calculateDiceRoller } from "./calculator";

export function runDiceRollerTests() {
  const defaultInputs = {
  "diceCount": 2,
  "diceSides": "6",
  "modifier": 0
};
  const res1 = calculateDiceRoller(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "diceCount": 0,
  "diceSides": 0,
  "modifier": 0
};
  const res2 = calculateDiceRoller(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "diceCount": -50,
  "diceSides": -50,
  "modifier": -50
};
  const res3 = calculateDiceRoller(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "diceCount": null,
  "diceSides": null,
  "modifier": null
};
  const res4 = calculateDiceRoller(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
