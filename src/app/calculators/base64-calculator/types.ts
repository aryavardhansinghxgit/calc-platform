export type Base64Mode = "encode" | "decode";
export type Base64Variant = "standard" | "urlsafe";
export type CharsetEncoding = "UTF-8" | "ASCII" | "UTF-16" | "Latin-1";
export type FileOutputType = "raw" | "dataUri" | "htmlImg" | "cssBg";

export interface Base64EncodeDecodeOutputs {
  result: string;
}

export interface Base64Analytics {
  inputBytes: number;
  outputBytes: number;
  inputChars: number;
  outputChars: number;
  expansionRatio: number; // e.g. +33.33%
  lineCount: number;
}
