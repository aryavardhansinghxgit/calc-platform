import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const gravel_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "How much gravel do I need?",
    answer:
      "Calculate the project's area, multiply it by the required depth, convert the resulting volume to cubic yards, and then convert cubic yards to weight using the selected material density. Add any justified compaction and waste allowances before ordering.",
  },
  {
    question: "How do I calculate cubic yards of gravel?",
    answer:
      "For a rectangular area, multiply length by width by depth in feet, then divide by 27: Cubic Yards = (L × W × D_ft) / 27. If depth is given in inches, convert it first: D_ft = D_in / 12. For non-rectangular areas, calculate the surface area first and then multiply by depth.",
  },
  {
    question: "How many tons of gravel are in a cubic yard?",
    answer:
      "There is no single universal answer. The conversion depends on the material's density: Tons = Cubic Yards × Density (tons/yd³). Standard #57 crushed stone weighs about 1.42 tons/yd³, crusher run weighs about 1.60 tons/yd³, and pea gravel weighs about 1.39 tons/yd³. Check your supplier's bulk density before ordering.",
  },
  {
    question: "How many cubic yards of gravel do I need for a driveway?",
    answer:
      "It depends on the driveway's length, width, and installed depth. For example, a 50 × 12 ft driveway at 4 inches deep has a raw volume of approximately 7.41 yd³. Factoring in typical 8% compaction settling and 5% waste brings the recommended order quantity to approximately 8.40 yd³ (~11.93 tons).",
  },
  {
    question: "How much gravel do I need for 600 square feet?",
    answer:
      "Square footage alone is not enough; you also need the intended gravel depth. At 4 inches deep (0.333 ft), 600 sq ft requires 200 cubic feet, or approximately 7.41 cubic yards (10.5 to 11.9 tons depending on aggregate density) before compaction or waste adjustments.",
  },
  {
    question: "How do I calculate gravel for a circular area?",
    answer:
      "Calculate the circular area first using Area = π × r² (or Area = π × d² / 4). Then multiply that surface area by the gravel layer depth in feet, and divide by 27 to obtain cubic yards.",
  },
  {
    question: "Should I add a waste allowance to gravel?",
    answer:
      "A waste allowance (typically 5% to 10%) is recommended for irregular perimeter edges, trench over-excavation, wheelbarrow handling losses, and spillage. Do not confuse waste with compaction settling, which accounts for volume reduction under tamping or rolling.",
  },
  {
    question: "What is the difference between gravel volume and gravel weight?",
    answer:
      "Volume measures the physical 3D space the material occupies, usually in cubic yards (yd³) or cubic feet (ft³). Weight measures mass, usually in short tons (2,000 lbs) or metric tonnes (1,000 kg). The conversion between them depends on the material's bulk density: Weight = Volume × Density.",
  },
  {
    question: "How much gravel is needed for a French drain?",
    answer:
      "You need the trench length, width, and depth, plus the pipe diameter when a pipe is installed. The gross trench volume is reduced by the cylindrical space displaced by the pipe: Net Volume = Gross Trench Volume − Pipe Displacement. The installation should also account for geotextile filter fabric overlap.",
  },
  {
    question: "What is the formula for a French-drain pipe displacement?",
    answer:
      "For a cylindrical pipe, displacement volume is calculated as: V_pipe = π × (d / 2)² × L, where d is the outer pipe diameter and L is the trench length. When 'No Pipe' is selected, pipe displacement is 0.",
  },
  {
    question: "Can I calculate gravel for multiple areas at once?",
    answer:
      "Yes. The Multi-Zone Project Master Aggregator in this calculator allows multiple independently measured sections (such as a driveway, sub-base, and garden walkway) to be entered with independent dimensions and aggregate types, then consolidated into a single quarry order sheet.",
  },
  {
    question: "Is a gravel calculator accurate enough for ordering?",
    answer:
      "It provides a precise geometric and engineering planning takeoff, but you should always compare the result with your local quarry or supplier's actual product density, delivery minimums, and truckload capacity. Structural roads or critical commercial drainage projects also require project-specific geotechnical review.",
  },
];
