import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const tile_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Tile Calculator: Calculate Tiles, Boxes, Grout & Cost",
  description:
    "Calculate how many tiles you need for floors, walls, backsplashes and multiple rooms. Estimate tile waste, boxes, grout, thin-set and project cost.",
  slug: "tile-calculator",
});
