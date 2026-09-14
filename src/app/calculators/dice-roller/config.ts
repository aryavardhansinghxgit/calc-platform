import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateDiceRollerFromInputs } from "./calculator";
import { dice_rollerFaqs } from "./faq";

export const dice_rollerConfig: CalculatorModuleDefinition = {
  id: "dice-roller",
  title: "Dice Roller & TTRPG Probability Calculator",
  slug: "dice-roller",
  category: "other",
  subcategory: "Everyday & Lifestyle",
  description:
    "Roll polyhedral dice, enter TTRPG formulas, analyze modifiers and keep/drop rules, and explore exact probability distributions with cryptographically secure randomness.",
  iconName: "Dices",
  featured: true,
  keywords: [
    "dice roller",
    "online dice roller",
    "ttrpg dice roller",
    "D&D dice roller",
    "dice calculator",
    "dice probability calculator",
    "dice probability",
    "dice roll calculator",
    "d20 roller",
    "d100 roller",
    "d6 roller",
    "4d6 drop lowest",
    "4d6kh3",
    "advantage calculator",
    "disadvantage calculator",
    "keep highest dice",
    "keep lowest dice",
    "exploding dice calculator",
    "TTRPG dice calculator",
    "D&D probability calculator",
    "2d20 advantage probability",
    "dice PMF",
    "dice distribution calculator",
    "dice expected value",
    "dice variance",
    "dice formula parser"
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
