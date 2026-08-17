import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const tile_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Tile Calculator — Floor, Wall, Grout, Boxes & Cost Suite",
  description:
    "Free online tile calculator for floor and wall coverage, tile box requirements, TCNA grout weight, thin-set mortar bags, and material cost estimation.",
  slug: "tile-calculator",
});
