import { Base64EncodeDecodeOutputs } from "./types";

export function calculateBase64EncodeDecode(inputs: Record<string, any>): Base64EncodeDecodeOutputs {
  const txt = String(inputs.text || "Hello CalcPlatform!");
  const isEnc = inputs.mode !== "decode";
  let res = "";
  try {
    if (isEnc) res = Buffer.from(txt, "utf-8").toString("base64");
    else res = Buffer.from(txt, "base64").toString("utf-8");
  } catch (err) {
    res = "Encoding/Decoding Error";
  }
  return { result: res };
}
