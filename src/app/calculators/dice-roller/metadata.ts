import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const dice_rollerMetadata: Metadata = generateCalculatorMetadata({
  title: "Dice Roller — Free Online Calculator",
  description: "Roll virtual polyhedral dice (d4, d6, d8, d10, d12, d20, d100) for tabletop games.",
  slug: "dice-roller",
});
