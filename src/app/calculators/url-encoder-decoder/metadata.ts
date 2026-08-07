import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const url_encoder_decoderMetadata: Metadata = generateCalculatorMetadata({
  title: "URL Encode / Decode — Free Online Calculator",
  description: "Encode special characters for web URLs or decode percent-encoded URLs.",
  slug: "url-encoder-decoder",
});
