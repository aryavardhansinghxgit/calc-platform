import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const surface_area_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Surface Area Calculator – 3D Shapes, Solids & Surface Area",
  description: "Calculate surface area for spheres, hemispheres, cones, frustums, cylinders, pipes, cubes, prisms, pyramids, capsules and ellipsoids. Includes formulas and unit conversions.",
  slug: "surface-area-calculator",
});
