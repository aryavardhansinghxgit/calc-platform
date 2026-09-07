import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const mulch_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "How do I calculate how much mulch I need?",
    answer:
      "Calculate the area, convert the desired mulch depth into the same length unit (feet), and multiply: Volume = Area × Depth. Then convert the resulting cubic feet into cubic yards (divide by 27) or bags depending on how you plan to purchase the mulch.",
  },
  {
    question: "How many cubic yards of mulch do I need?",
    answer:
      "For a rectangular bed: Cubic Yards = (Length in feet × Width in feet × Depth in inches) / 324. For irregular areas, multiply the total square footage by the depth in inches and divide by 324.",
  },
  {
    question: "How many bags of mulch are in a cubic yard?",
    answer:
      "It depends on the volume of each bag. Since 1 cubic yard = 27 cubic feet, a standard 2 cu ft bag yields 27 / 2 = 13.5 bags per cubic yard. In practice, purchasing whole bags requires rounding upward to 14 bags. A 1.5 cu ft bag requires 18 bags, and a 3 cu ft bag requires 9 bags.",
  },
  {
    question: "How many bags of mulch do I need for 200 square feet?",
    answer:
      "At 3 inches deep, 200 sq ft requires 200 × (3 / 12) = 50 cu ft. With standard 2 cu ft bags, 50 / 2 = 25 bags. With 1.5 cu ft bags, 50 / 1.5 = 34 bags.",
  },
  {
    question: "How much mulch do I need for 1,000 square feet?",
    answer:
      "The volume depends directly on depth. At 2 inches depth, 1,000 sq ft requires (1,000 × 2) / 324 ≈ 6.17 cubic yards (84 bags of 2 cu ft). At 3 inches depth, it requires (1,000 × 3) / 324 ≈ 9.26 cubic yards (125 bags). At 4 inches, it requires (1,000 × 4) / 324 ≈ 12.35 cubic yards (167 bags).",
  },
  {
    question: "How deep should mulch be?",
    answer:
      "There is no single depth that applies to every landscape. Extension guidance commonly describes about 2–3 inches for many plantings, while recommendations vary by plant type and situation. Avoid excessive depth and keep mulch away from trunks and stems.",
  },
  {
    question: "How much mulch do I need around a tree?",
    answer:
      "For a circular or tree-ring area, use the annulus formula: Area = (π / 4) × (Outer_Diameter² − Trunk_Diameter²). Then multiply the ring area by the chosen mulch depth. The trunk opening should always be excluded from the mulch area.",
  },
  {
    question: "Should mulch touch a tree trunk?",
    answer:
      "No. Extension guidance recommends keeping mulch away from trunks and leaving the root flare visible rather than building a mulch mound against the tree. Piling mulch against bark (mulch volcanoing) traps moisture and invites decay and pests.",
  },
  {
    question: "Is bulk mulch cheaper than bagged mulch?",
    answer:
      "Not always. Compare Bagged Cost (Bags × Bag Price) with Bulk Cost (Cubic Yards × Bulk Price + Delivery Fee). For small projects requiring under 2 cubic yards, bagged mulch is usually cheaper by avoiding delivery charges ($35–$60). For 3–5+ cubic yards, bulk delivery is significantly more economical.",
  },
  {
    question: "How do I calculate mulch weight?",
    answer:
      "Use Weight = Volume × Density. In metric units, Weight (kg) = Volume (m³) × Density (kg/m³). In imperial units, Weight (lbs) = Volume (yd³) × Density (lbs/yd³). Hardwood bark mulch typically weighs 600–800 lbs/yd³ (~355–475 kg/m³), while wet compost weighs 1,000–1,400 lbs/yd³.",
  },
  {
    question: "How many bags of mulch are in 2 cubic yards?",
    answer:
      "Two cubic yards contain 2 × 27 = 54 cubic feet. With standard 2 cu ft bags, 54 / 2 = 27 bags. With 1.5 cu ft bags, 54 / 1.5 = 36 bags.",
  },
  {
    question: "Can I calculate mulch for several garden beds at once?",
    answer:
      "Yes. The Multi-Bed Landscape Aggregator lets you enter separate beds and combine their total area and volume. This is useful when a property contains several differently shaped or differently sized planting areas.",
  },
  {
    question: "How do I estimate mulch for a tree ring with a trunk opening?",
    answer:
      "Subtract the trunk's circular area from the outer circle: Area = (π / 4) × (Outer_Diameter² − Inner_Diameter²). Then multiply by mulch depth in feet to obtain cubic feet, and divide by 27 for cubic yards.",
  },
  {
    question: "Can a pickup truck carry all the mulch I need?",
    answer:
      "Not necessarily. The amount required by the landscape and the amount a vehicle can legally and safely carry are different questions. Compare both volume and payload limits: Recommended Trips = max(Trips by Volume, Trips by Weight). Even lightweight mulch can exceed bed volume limits, while dense or wet mulch can easily exceed payload limits.",
  },
];
