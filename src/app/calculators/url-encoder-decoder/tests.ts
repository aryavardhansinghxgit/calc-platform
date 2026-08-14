import { calculateUrlEncoderDecoder } from "./calculator";

export function runURLEncodeDecodeTests() {
  const defaultInputs = {
    text: "https://calcplatform.com/search?q=math & health",
    mode: "encode",
  };
  const res1 = calculateUrlEncoderDecoder(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
    text: 0,
    mode: 0,
  };
  const res2 = calculateUrlEncoderDecoder(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
    text: -50,
    mode: -50,
  };
  const res3 = calculateUrlEncoderDecoder(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
    text: null,
    mode: null,
  };
  const res4 = calculateUrlEncoderDecoder(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
