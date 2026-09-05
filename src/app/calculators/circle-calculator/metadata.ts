import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const circle_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Circle Calculator: Area, Circumference, Radius & Diameter",
  description: "Use this free Circle Calculator to find radius, diameter, circumference and area. Calculate sectors, arcs, chords, sagitta, annulus area and circumcircles with formulas and steps.",
  slug: "circle-calculator",
});
