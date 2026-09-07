import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateTileCalculator } from "./calculator";
import { tile_calculatorFaqs } from "./faq";

export const tile_calculatorConfig: CalculatorModuleDefinition = {
  id: "tile-calculator",
  title: "Tile Calculator",
  slug: "tile-calculator",
  category: "construction",
  subcategory: "Housing / Building",
  description: "Calculate how many tiles you need for floors, walls, backsplashes and multiple rooms. Estimate tile waste, boxes, grout, thin-set and project cost.",
  iconName: "Grid",
  featured: true,
  keywords: [
    "tile calculator",
    "tile calculator square feet",
    "floor tile calculator",
    "how many tiles do I need",
    "how many tiles calculator",
    "tile quantity calculator",
    "tile box calculator",
    "tile waste calculator",
    "tile coverage calculator",
    "wall tile calculator",
    "bathroom tile calculator",
    "floor tile estimate",
    "tile cost calculator",
    "grout calculator",
    "thinset calculator",
    "tile installation cost calculator"
  ],
  priority: 1,
  relatedCalculators: ["square-footage-calculator", "concrete-calculator"],
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
