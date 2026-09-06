import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const right_triangle_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Right Triangle Calculator – Sides, Angles, Area & Perimeter",
  description: "Solve a right triangle from two known values. Find missing sides, hypotenuse, angles, area, perimeter, altitude, inradius, circumradius, and trig ratios with steps.",
  slug: "right-triangle-calculator",
});
