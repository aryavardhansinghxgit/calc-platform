import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const height_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Height Calculator — Free Online Calculator",
  description: "Convert height between feet/inches and cm, and predict child adult height.",
  slug: "height-calculator",
});
