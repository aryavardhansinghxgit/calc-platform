import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const base64_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Base64 Encoder / Decoder — Data URI & Base64URL Generator",
  description: "Free online Base64 encoder and decoder. Convert text, images, and files to Base64 strings, RFC 4648 URL-Safe variants, and HTML/CSS Data URIs instantly.",
  slug: "base64-calculator",
});
