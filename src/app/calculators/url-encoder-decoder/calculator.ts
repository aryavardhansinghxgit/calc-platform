import { URLEncodeDecodeOutputs } from "./types";

export function calculateURLEncodeDecode(inputs: Record<string, any>): URLEncodeDecodeOutputs {
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
