import { calculateWindChillFromInputs } from "./calculator";

export function runWindChillCalculatorTests() {
  const defaultInputs = {
    temperature: 30,
    windSpeed: 15,
  };
  const res1 = calculateWindChillFromInputs(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
    temperature: 0,
    windSpeed: 0,
  };
  const res2 = calculateWindChillFromInputs(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
    temperature: -50,
    windSpeed: -50,
  };
  const res3 = calculateWindChillFromInputs(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
    temperature: null,
    windSpeed: null,
  };
  const res4 = calculateWindChillFromInputs(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
