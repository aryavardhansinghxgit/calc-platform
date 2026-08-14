import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const url_encoder_decoderMetadata: Metadata = generateCalculatorMetadata({
  title: "URL Encoder / Decoder — Percent-Encoding & Query Parser",
  description: "Free online URL encoder and decoder. Convert text to RFC 3986 percent-encoding (%20 / +), parse URL query parameters into editable tables, and inspect URL components instantly.",
  slug: "url-encoder-decoder",
});
