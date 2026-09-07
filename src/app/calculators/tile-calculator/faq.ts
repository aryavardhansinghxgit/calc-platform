import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const tile_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "How do I calculate how many tiles I need?",
    answer:
      "Calculate the surface area by multiplying length by width, then divide by the area covered by one tile. Round the result up to a whole tile and add an appropriate waste allowance. If tiles are sold by the box, divide the final tile quantity by the number of tiles per box and round up again.",
  },
  {
    question: "How much extra tile should I buy for waste?",
    answer:
      "A 10% allowance is a common starting point for straightforward tile projects, but the appropriate amount depends on the room shape, tile size, layout pattern and number of cuts. Complicated rooms and patterns can require more material. Use the waste field as an estimate rather than a universal installation rule.",
  },
  {
    question: "How many 12 × 12 tiles do I need for 100 square feet?",
    answer:
      "A 12 × 12 inch tile has a nominal area of 1 square foot. At a basic area-only calculation, 100 square feet requires 100 tiles. The actual purchase quantity can be higher after considering grout joints, cuts, waste and package size.",
  },
  {
    question: "Do grout lines affect how many tiles I need?",
    answer:
      "They can affect the repeating module used in a tile layout. When grout spacing is included, the effective module can be modeled from the tile dimensions plus the joint width. The effect is usually modest for an individual tile but becomes meaningful across a large installation.",
  },
  {
    question: "How do I calculate the number of boxes of tile?",
    answer:
      "Divide the required number of tiles by the number of tiles contained in one box and round up to the next whole box. For example, 325 tiles with 12 tiles per box require 28 boxes.",
  },
  {
    question: "Should I calculate floor tile and wall tile differently?",
    answer:
      "The surface-area calculation is similar, but the installation requirements are not necessarily the same. Floor and wall applications can have different substrate, bonding, service-rating, waterproofing and coverage considerations. Use the calculator for quantity estimation and follow the tile and mortar manufacturer's instructions for installation.",
  },
  {
    question: "How much grout do I need?",
    answer:
      "Grout quantity depends on tile length, tile width, tile thickness, joint width and total area, as well as the characteristics of the selected grout. Smaller tiles and wider joints generally create more grout joints over the same area. For the final purchase quantity, compare the calculator estimate with the manufacturer's coverage information.",
  },
  {
    question: "How much thin-set mortar do I need?",
    answer:
      "Thin-set coverage depends on the specific product, trowel size, tile dimensions, substrate, application technique and required mortar coverage. Use the calculator as a preliminary estimate, then verify the exact product's coverage data before purchasing.",
  },
  {
    question: "What if I have several rooms to tile?",
    answer:
      "Use the multi-room section to enter each area separately. You can include room dimensions and valid deductions, then aggregate the net areas into one project-level tile estimate.",
  },
  {
    question: "Can a tile calculator tell me the exact final quantity?",
    answer:
      "It can produce a strong planning estimate when accurate dimensions, tile sizes, grout spacing, waste allowance and package quantities are provided. However, the final quantity can change after the real installation layout is planned. Irregular walls, pattern matching, cuts, fixtures, breakage and manufacturer requirements can all affect the final takeoff.",
  },
];
