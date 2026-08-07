import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const roman_numeral_converterMetadata: Metadata = generateCalculatorMetadata({
  title: "Roman Numeral Converter — Free Online Calculator",
  description: "Convert numbers to Roman numerals and convert Roman numerals back to numbers.",
  slug: "roman-numeral-converter",
});
