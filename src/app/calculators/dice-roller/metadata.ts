import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const dice_rollerMetadata: Metadata = generateCalculatorMetadata({
  title: "Dice Roller & TTRPG Dice Calculator – Probability, Advantage & 4d6",
  description:
    "Roll d4, d6, d8, d10, d12, d20 and d100 dice online. Calculate TTRPG formulas, modifiers, advantage, keep-highest, exploding dice and exact probability distributions.",
  slug: "dice-roller",
});

