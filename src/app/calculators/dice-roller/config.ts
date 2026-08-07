import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateDiceRoller } from "./calculator";
import { dice_rollerFaqs } from "./faq";

export const dice_rollerConfig: CalculatorModuleDefinition = {
  id: "dice-roller",
  title: "Dice Roller",
  slug: "dice-roller",
  category: "other",
  subcategory: "Entertainment",
  description: "Roll virtual polyhedral dice (d4, d6, d8, d10, d12, d20, d100) for tabletop games.",
  iconName: "Dices",
  featured: true,
  keywords: ["dice roller","roll dice","d20 roller","random dice","dnd dice"],
  priority: 1,
  relatedCalculators: ["random-number-generator","love-calculator"],
  formulaDescription: "Total = Sum of Random Rolls (1 to Sides) + Modifier",
  faqs: dice_rollerFaqs,
  inputs: [
  {
    "name": "diceCount",
    "label": "Number of Dice",
    "type": "number",
    "defaultValue": 2,
    "min": 1,
    "max": 20,
    "step": 1
  },
  {
    "name": "diceSides",
    "label": "Dice Type",
    "type": "select",
    "defaultValue": "6",
    "options": [
      {
        "label": "d4 (4 sides)",
        "value": "4"
      },
      {
        "label": "d6 (6 sides)",
        "value": "6"
      },
      {
        "label": "d8 (8 sides)",
        "value": "8"
      },
      {
        "label": "d10 (10 sides)",
        "value": "10"
      },
      {
        "label": "d20 (20 sides)",
        "value": "20"
      },
      {
        "label": "d100 (100 sides)",
        "value": "100"
      }
    ]
  },
  {
    "name": "modifier",
    "label": "Score Modifier (±)",
    "type": "number",
    "defaultValue": 0,
    "min": -50,
    "max": 50,
    "step": 1
  }
],
  outputs: [
  {
    "name": "totalScore",
    "label": "Total Roll Result",
    "format": "number",
    "highlight": true
  },
  {
    "name": "rollsList",
    "label": "Individual Dice Rolls",
    "format": "text"
  }
],
  calculate: calculateDiceRoller,
};

export default dice_rollerConfig;
