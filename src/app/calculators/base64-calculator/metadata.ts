import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const base64_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Base64 Encode / Decode — Free Online Calculator",
  description: "Encode text strings into Base64 format or decode Base64 back to plain text.",
  slug: "base64-calculator",
});
