import { UrlEncoderDecoderOutputs } from "./types";

export function calculateUrlEncoderDecoder(inputs: Record<string, any>): UrlEncoderDecoderOutputs {
  const txt = String(inputs.text || "https://calcplatform.com/search?q=math & health");
  const isEnc = inputs.mode !== "decode";
  let res = "";
  try {
    if (isEnc) res = encodeURIComponent(txt);
    else res = decodeURIComponent(txt);
  } catch (err) {
    res = "Malformed URI Sequence";
  }
  return { result: res };
}
