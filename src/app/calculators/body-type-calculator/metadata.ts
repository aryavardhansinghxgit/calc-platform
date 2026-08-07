import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const body_type_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Body Type Calculator — Free Online Health Calculator",
  description: "Determine body shape classification (Hourglass, Pear, Rectangle, Inverted Triangle, Apple) & WHR health risk.",
  slug: "body-type-calculator",
});
