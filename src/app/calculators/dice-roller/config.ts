import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateDiceRollerFromInputs } from "./calculator";
import { dice_rollerFaqs } from "./faq";

export const dice_rollerConfig: CalculatorModuleDefinition = {
  id: "dice-roller",
  title: "Dice Roller & TTRPG Probability Engine",
  slug: "dice-roller",
  category: "other",
  subcategory: "Everyday & Lifestyle",
  description: "Virtual Polyhedral Dice Roller & TTRPG Engine. Roll d4, d6, d8, d10, d12, d20, d100, custom notation (4d6kh3, Advantage), CSPRNG randomness, and live probability curves.",
  iconName: "Dices",
  featured: true,
  keywords: [
    "dice roller",
    "d20 dice roller",
    "virtual dice roller",
    "dnd dice roller",
    "online dice roller",
    "polyhedral dice roller",
    "dice notation parser",
    "dice probability calculator",
    "4d6kh3 roller",
    "advantage disadvantage roller"
  ],
  priority: 1,
  relatedCalculators: ["random-number-generator", "probability-calculator", "permutation-combination-calculator"],
  formulaDescription: "Single Die Expected Value E[X] = (n + 1) / 2 | Variance Var(X) = (n² - 1) / 12",
  faqs: dice_rollerFaqs,
  inputs: [
    {
      name: "diceCount",
      label: "Number of Dice",
      type: "number",
      defaultValue: 2,
      min: 1,
      max: 20,
      step: 1,
    },
    {
      name: "diceSides",
      label: "Sides per Die (d)",
      type: "number",
      defaultValue: 6,
      min: 2,
      max: 100,
      step: 1,
    },
    {
      name: "modifier",
      label: "Modifier (+/-)",
      type: "number",
      defaultValue: 0,
      min: -50,
      max: 50,
      step: 1,
    },
  ],
  outputs: [
    {
      name: "mean",
      label: "Expected Average (Mean)",
      format: "number",
      highlight: true,
    },
    {
      name: "minMax",
      label: "Range (Min – Max)",
      format: "text",
    },
    {
      name: "stdDev",
      label: "Standard Deviation (σ)",
      format: "number",
    },
  ],
  calculate: calculateDiceRollerFromInputs,
};

export default dice_rollerConfig;
