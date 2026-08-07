import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const tile_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Tile Calculator — Free Online Calculator",
  description: "Calculate number of floor or wall tiles and boxes needed for a room with waste allowance.",
  slug: "tile-calculator",
});
