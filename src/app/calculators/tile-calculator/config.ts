import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateTileCalculator } from "./calculator";
import { tile_calculatorFaqs } from "./faq";

export const tile_calculatorConfig: CalculatorModuleDefinition = {
  id: "tile-calculator",
  title: "Tile Calculator",
  slug: "tile-calculator",
  category: "construction",
  subcategory: "Housing / Building",
  description: "Calculate number of floor or wall tiles and boxes needed for a room with waste allowance.",
  iconName: "Grid",
  featured: true,
  keywords: ["tile calculator","flooring tile","tiles needed","grout calculator"],
  priority: 1,
  relatedCalculators: ["square-footage-calculator","concrete-calculator"],
  formulaDescription: "Tiles Needed = Ceil( [Room Area × (1 + Waste%)] / Tile Area )",
  faqs: tile_calculatorFaqs,
  inputs: [
  {
    "name": "roomSqFt",
    "label": "Room Area (sq ft)",
    "type": "number",
    "defaultValue": 200,
    "min": 1,
    "max": 10000,
    "step": 10
  },
  {
    "name": "tileSizeInches",
    "label": "Tile Dimension",
    "type": "select",
    "defaultValue": "144",
    "options": [
      {
        "label": "12\" x 12\" (1 sq ft)",
        "value": "144"
      },
      {
        "label": "12\" x 24\" (2 sq ft)",
        "value": "288"
      },
      {
        "label": "24\" x 24\" (4 sq ft)",
        "value": "576"
      }
    ]
  },
  {
    "name": "wastePct",
    "label": "Waste Allowance (%)",
    "type": "number",
    "defaultValue": 10,
    "min": 0,
    "max": 30,
    "step": 5
  }
],
  outputs: [
  {
    "name": "tilesNeeded",
    "label": "Total Individual Tiles Needed",
    "format": "number",
    "highlight": true
  },
  {
    "name": "boxesNeeded",
    "label": "Boxes Needed (10 tiles/box)",
    "format": "number"
  }
],
  calculate: calculateTileCalculator,
};

export default tile_calculatorConfig;
