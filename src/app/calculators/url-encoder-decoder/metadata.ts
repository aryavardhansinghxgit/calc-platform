import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const url_encoder_decoderMetadata: Metadata = generateCalculatorMetadata({
  title: "URL Encoder & Decoder – Percent Encoding, Query & RFC 3986",
  description: "Free URL Encoder and Decoder for percent-encoding, query parameters, UTF-8, RFC 3986, encodeURI, encodeURIComponent, and form-style URLs.",
  slug: "url-encoder-decoder",
});
