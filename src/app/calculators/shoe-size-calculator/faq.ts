import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const shoe_size_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "How do I calculate my shoe size?",
    answer:
      "Measure both feet from heel to the longest toe while standing, enter the measurements into the calculator, and review the recommended size and width profile.",
  },
  {
    question: "Should I measure both feet?",
    answer:
      "Yes. The calculator compares both feet and bases the recommendation on the larger dimensions according to its implemented bilateral logic.",
  },
  {
    question: "What if one foot is longer than the other?",
    answer:
      "Use the larger foot for sizing. The calculator also displays an asymmetry message when the length difference crosses its configured threshold.",
  },
  {
    question: "What if one foot is wider than the other?",
    answer:
      "The calculator checks bilateral width differences and flags a significant difference. It identifies the wider foot so the recommendation does not hide that information.",
  },
  {
    question: "Is 10 inches what shoe size?",
    answer:
      "For the calculator's current men's model, a 10.0-inch reference foot produces US Men's 8.5. The calculator also reports UK 7.5, EU theoretical 40 and JP 25.5 cm for the reference profile.",
  },
  {
    question: "What is a 10-inch foot in centimeters?",
    answer: "10 inches = 25.4 cm.",
  },
  {
    question: "What is a US men's 8.5 in UK size?",
    answer: "Under the conversion model used by this calculator, US Men's 8.5 = UK 7.5.",
  },
  {
    question: "What is a US men's 8.5 in EU size?",
    answer:
      "The calculator's theoretical conversion produces EU 40, while commercial retail labeling can differ. The page deliberately distinguishes the theoretical conversion from retail sizing rather than presenting EU 40 as a universal brand-independent label.",
  },
  {
    question: "Is EU shoe size the same for every brand?",
    answer:
      "No. International conversion tables are guidance, and individual brands and models can have different fit characteristics. ISO 19407:2023 specifically notes that shoe-size conversion systems developed differently and provides guidance rather than a universal exact mapping.",
  },
  {
    question: "What is Mondopoint?",
    answer:
      "Mondopoint is an international footwear sizing and marking system based on defined measurements of the foot. ISO 9407:2019 specifies the Mondopoint system.",
  },
  {
    question: "Is JP the same as Mondopoint?",
    answer:
      "Not automatically. The calculator can display a JP centimeter value and a Mondopoint millimeter measurement, but those labels should not be treated as universally interchangeable across every retailer.",
  },
  {
    question: "Should I measure my feet in the morning or evening?",
    answer:
      "Measuring later in the day can be useful because feet may change during prolonged standing and walking. More important than the exact time is using a consistent weight-bearing method for both feet.",
  },
  {
    question: "Should I add room to my measured foot length?",
    answer:
      "Footwear needs usable space, but the appropriate amount depends on the shoe type, construction and intended use. Do not blindly add one universal allowance to every shoe.",
  },
  {
    question: "Why does my calculated size differ from a brand's chart?",
    answer:
      "The calculator uses its own sizing model and conversion assumptions, while a brand may use its own last dimensions, grading and size chart. Check the specific brand/model chart before purchase.",
  },
  {
    question: "Why can two shoes with the same size fit differently?",
    answer:
      "The size label does not uniquely define the shoe's internal geometry. Last shape, toe-box volume, width, materials and construction can all affect fit.",
  },
  {
    question: "What width is 3.8 inches?",
    answer:
      "Width depends on foot length and the sizing model being used. This calculator classifies width using a length-to-width ratio rather than treating one raw width measurement as universally narrow or wide.",
  },
  {
    question: "Can I use the calculator for children?",
    answer:
      "Yes, provided the child's measurement lies within the supported Kids domain. Larger measurements outside that range trigger a transition advisory rather than producing an artificial children's size.",
  },
  {
    question: "Can I rely on the result for every shoe?",
    answer:
      "No. Treat it as a starting recommendation. Verify the final size using the manufacturer's current chart and, when possible, the actual shoe's fit.",
  },
  {
    question: "Is the calculator a medical or orthopedic assessment?",
    answer:
      "No. It is a footwear-sizing and measurement tool. It does not diagnose foot conditions or replace professional clinical assessment.",
  },
];
