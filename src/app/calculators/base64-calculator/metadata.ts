import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const base64_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Base64 Encoder & Decoder – Text, File, URL-Safe & Data URI",
  description: "Free Base64 encoder and decoder for text and files. Convert UTF-8, binary data and Data URIs with Standard Base64, Base64URL, MIME wrapping and exact size analysis.",
  slug: "base64-calculator",
});
