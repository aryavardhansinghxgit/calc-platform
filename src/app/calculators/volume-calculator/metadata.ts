import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const volume_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Volume Calculator – 3D Shapes, Tanks, Cylinders & Unit Conversions",
  description: "Free volume calculator for cylinders, spheres, cones, cubes, prisms, tanks and more. Calculate volume, surface area, tank capacity and convert m³, ft³, liters, gallons and other units.",
  slug: "volume-calculator",
});
