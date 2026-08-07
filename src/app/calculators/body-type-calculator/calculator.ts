import { BodyTypeCalculatorOutputs } from "./types";

export function calculateBodyTypeCalculator(inputs: Record<string, any>): BodyTypeCalculatorOutputs {
  const bust = Math.max(1, Number(inputs.bustChest) || 90);
  const waist = Math.max(1, Number(inputs.waist) || 70);
  const hip = Math.max(1, Number(inputs.hip) || 95);
  const isFemale = inputs.gender !== "male";
  const whr = parseFloat((waist / hip).toFixed(2));
  let shape = "Rectangle";
  if (isFemale) {
    if ((bust - hip <= 5 && hip - bust <= 5) && (bust - waist >= 20 || hip - waist >= 20)) shape = "Hourglass";
    else if (hip - bust >= 9) shape = "Pear (Bottom Hourglass)";
    else if (bust - hip >= 9) shape = "Inverted Triangle";
    else if (waist >= bust * 0.85) shape = "Apple";
    else shape = "Banana / Rectangle";
  } else {
    if (whr > 0.95) shape = "Apple";
    else if (bust - hip > 10) shape = "V-Shape / Inverted Triangle";
    else shape = "Rectangle";
  }
  let risk = "Low Risk";
  if (isFemale) {
    if (whr >= 0.85) risk = "High Risk";
    else if (whr >= 0.80) risk = "Moderate Risk";
  } else {
    if (whr >= 1.0) risk = "High Risk";
    else if (whr >= 0.90) risk = "Moderate Risk";
  }
  return { bodyShape: shape, whr, whrRisk: risk };
}
