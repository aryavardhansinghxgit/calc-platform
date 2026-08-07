import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const volume_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Volume Calculator — Free Online Math Calculator",
  description: "Calculate 3D volume for spheres, cylinders, cones, cubes, and rectangular prisms.",
  slug: "volume-calculator",
});
