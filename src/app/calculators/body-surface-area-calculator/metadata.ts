import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const body_surface_area_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Body Surface Area Calculator — Free Online Health Calculator",
  description: "Calculate Body Surface Area (BSA) in square meters using Mosteller, Du Bois, and Haycock formulas.",
  slug: "body-surface-area-calculator",
});
