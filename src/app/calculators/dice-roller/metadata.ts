import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const dice_rollerMetadata: Metadata = generateCalculatorMetadata({
  title: "Dice Roller: Virtual Polyhedral & TTRPG Probability Engine",
  description: "Free Virtual Dice Roller & TTRPG Engine. Roll d4, d6, d8, d10, d12, d20, d100, custom dice notation (4d6kh3, Advantage), CSPRNG randomness, and live probability curves.",
  slug: "dice-roller",
});
