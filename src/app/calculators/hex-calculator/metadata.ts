import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const hex_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Hex Calculator — Free Online Math Calculator",
  description: "Perform hexadecimal addition, subtraction, and conversion between hex, binary, and decimal.",
  slug: "hex-calculator",
});
