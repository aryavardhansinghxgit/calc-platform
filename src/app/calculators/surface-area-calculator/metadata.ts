import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const surface_area_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Surface Area Calculator — Free Online Math Calculator",
  description: "Calculate total surface area for 3D shapes including spheres, cylinders, cubes, and cones.",
  slug: "surface-area-calculator",
});
