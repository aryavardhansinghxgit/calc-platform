import { ConversionCalculatorOutputs } from "./types";

export function calculateConversionCalculator(inputs: Record<string, any>): ConversionCalculatorOutputs {
  const val = Number(inputs.value) || 100;
  const cat = inputs.unitCategory || "length";
  let res = 0, summary = "";
  if (cat === "length") {
    res = val * 0.621371;
    summary = `${val} km = ${res.toFixed(2)} miles`;
  } else if (cat === "weight") {
    res = val * 2.20462;
    summary = `${val} kg = ${res.toFixed(2)} lbs`;
  } else {
    res = (val * 9) / 5 + 32;
    summary = `${val}°C = ${res.toFixed(1)}°F`;
  }
  return { convertedValue: parseFloat(res.toFixed(2)), summary };
}
