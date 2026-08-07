import { calculateBase64EncodeDecode } from "./calculator";

export function runBase64EncodeDecodeTests() {
  const defaultInputs = {
  "text": "Hello CalcPlatform!",
  "mode": "encode"
};
  const res1 = calculateBase64EncodeDecode(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "text": 0,
  "mode": 0
};
  const res2 = calculateBase64EncodeDecode(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "text": -50,
  "mode": -50
};
  const res3 = calculateBase64EncodeDecode(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "text": null,
  "mode": null
};
  const res4 = calculateBase64EncodeDecode(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
