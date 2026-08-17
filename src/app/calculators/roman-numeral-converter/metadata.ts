import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const roman_numeral_converterMetadata: Metadata = generateCalculatorMetadata({
  title: "Roman Numeral Converter & Date Calculator — Numbers to Roman Numerals",
  description:
    "Free online Roman Numeral Converter, Date to Roman Numeral generator, and Roman Numeral arithmetic solver. Convert numbers up to 3,999,999 with Vinculum overlines and tattoo date styling.",
  slug: "roman-numeral-converter",
});
