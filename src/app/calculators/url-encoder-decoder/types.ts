export type UrlEncodingMode = "component" | "fullUri" | "rfc3986" | "formData";
export type UrlCharset = "UTF-8" | "ASCII" | "UTF-16" | "Latin-1";

export interface UrlParameter {
  id: string;
  key: string;
  value: string;
  enabled: boolean;
}

export interface UrlBreakdown {
  protocol: string;
  hostname: string;
  port: string;
  pathname: string;
  search: string;
  hash: string;
}

export interface UrlAnalytics {
  inputChars: number;
  outputChars: number;
  inputBytes: number;
  outputBytes: number;
  expansionRatio: number;
  lineCount: number;
}

export interface UrlEncoderDecoderOutputs {
  result: string;
}
