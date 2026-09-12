import { UrlEncoderDecoderOutputs, UrlEncodingMode } from "./types";

export function calculateUrlEncoderDecoder(inputs: Record<string, any>): UrlEncoderDecoderOutputs {
  const txt = String(inputs.text || "https://api.example.com/v1/search?query=hello world");
  const isEnc = inputs.mode !== "decode";
  const encMode: UrlEncodingMode = inputs.encodingMode || "component";
  const lineByLine = Boolean(inputs.lineByLine);

  try {
    const processSingle = (t: string): string => {
      if (isEnc) {
        switch (encMode) {
          case "component":
            return encodeURIComponent(t);
          case "fullUri":
            return encodeURI(t);
          case "rfc3986":
            return encodeURIComponent(t).replace(/[!'()*]/g, (c) => "%" + c.charCodeAt(0).toString(16).toUpperCase());
          case "formData":
            return encodeURIComponent(t).replace(/%20/g, "+");
          default:
            return encodeURIComponent(t);
        }
      } else {
        let prep = t;
        if (encMode === "formData") {
          prep = prep.replace(/\+/g, "%20");
        }
        if (encMode === "fullUri") {
          return decodeURI(prep);
        }
        return decodeURIComponent(prep);
      }
    };

    if (lineByLine) {
      const lines = txt.split("\n");
      return { result: lines.map(processSingle).join("\n") };
    }

    return { result: processSingle(txt) };
  } catch (err) {
    return { result: "Malformed URI Sequence" };
  }
}
