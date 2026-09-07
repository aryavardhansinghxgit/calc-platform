import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const stair_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "How do I calculate the number of stair risers?",
    answer:
      "Divide the total rise by the target riser height and round up to the next whole number: N = ceil(Total Rise / Target Riser Height). Then divide the total rise by that final integer count to obtain the exact riser height.",
  },
  {
    question: "How many risers do I need for a 10-foot staircase?",
    answer:
      "A 10-foot rise is 120 inches. With a 7.5-inch target riser: 120 / 7.5 = 16 risers, producing an exact riser height of 7.5 inches. The final allowable configuration still needs to be checked against your applicable local building code.",
  },
  {
    question: "How many treads are in a staircase with 15 risers?",
    answer:
      "For the standard-drop configuration used by the calculator, there are 15 - 1 = 14 treads. The actual tread count depends on the stair configuration and landing attachment.",
  },
  {
    question: "What is the formula for stair angle?",
    answer:
      "The stair incline angle is θ = arctan(Total Rise / Total Run). The result is converted to degrees for practical field interpretation.",
  },
  {
    question: "How do I calculate stringer length?",
    answer:
      "Treat the staircase as a right triangle: L = √(Total Rise² + Total Run²), where Total Rise is the vertical elevation and Total Run is the total horizontal travel.",
  },
  {
    question: "What is a good stair riser height?",
    answer:
      "There is no single universal answer because requirements depend on building type and adopted code. For example, the 2021 IRC specifies a maximum riser of 7¾ inches for residential stairs, while the 2024 IBC specifies 7 inches maximum for commercial building-code stairs.",
  },
  {
    question: "What is the minimum stair tread depth?",
    answer:
      "It depends on the applicable code and stair type. The 2021 IRC specifies 10 inches minimum for rectangular treads in residential stairs, while the 2024 IBC specifies 11 inches minimum for commercial stairs.",
  },
  {
    question: "What headroom is required over stairs?",
    answer:
      "A commonly referenced model-code value is 80 inches (6 ft 8 in / 2032 mm). The 2021 IRC and 2024 IBC both specify 80 inches of stair headroom, measured vertically from the sloped line adjoining the tread nosings or landing surface.",
  },
  {
    question: "Does a 1:12 slope mean the stair is ADA compliant?",
    answer:
      "No. A 1:12 slope is an accessible-ramp standard under ADA guidelines (1 unit of vertical rise per 12 units of horizontal run), not a stair step geometry requirement. The calculator's 1:12 preset serves as a ramp reference.",
  },
  {
    question: "Can I enter stair measurements as fractions?",
    answer:
      "Yes. The calculator supports common construction fractions and mixed numbers such as 7 1/2, 10 1/4, 3/4, and 7 3/16, allowing you to work directly from tape-measure dimensions.",
  },
  {
    question: "Why should stair risers be uniform?",
    answer:
      "Uniform risers make walking cadence rhythm predictable, preventing tripping hazards. Building codes strictly limit variation; for example, the 2021 IRC limits the difference between the greatest and smallest riser height within a flight to 3/8 inch.",
  },
  {
    question: "Is this stair calculator a substitute for building-code approval?",
    answer:
      "No. It is a mathematical planning and estimating tool. Final stair designs must always be verified with the local authority having jurisdiction, project engineering specifications, and site measurements.",
  },
];
