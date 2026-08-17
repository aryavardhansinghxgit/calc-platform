import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const ideal_weight_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Ideal Weight Calculator — Devine, Robinson, Miller, Hamwi & WHO Standards",
  description:
    "Free clinical Ideal Body Weight (IBW) calculator. Compare 5 medical formulas (Devine, Robinson, Miller, Hamwi, Lemmens), adjust for bone frame size (±10%), and analyze WHO healthy BMI weight ranges.",
  slug: "ideal-weight-calculator",
});
