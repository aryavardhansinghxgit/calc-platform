import { CalculatorFAQ } from "@/calculators/types";

export const tire_size_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "What do the numbers on a tire size mean (e.g., 225/65R17)?",
    answer:
      "In a standard metric tire code like 225/65R17: 225 is the section width in millimeters, 65 is the aspect ratio percentage representing sidewall height relative to width (65% of 225mm = 146.25mm), R stands for Radial tire construction, and 17 is the wheel rim diameter in inches.",
  },
  {
    question: "How do you calculate the overall diameter of a tire?",
    answer:
      "To calculate overall tire diameter: First convert sidewall height to inches by multiplying section width by aspect ratio percentage and dividing by 25.4 (Sidewall = [Width × Aspect / 100] / 25.4). Then multiply sidewall height by 2 and add the rim diameter: Overall Diameter = (2 × Sidewall) + Rim Diameter.",
  },
  {
    question: "What is the maximum safe percentage difference when changing tire sizes?",
    answer:
      "Automotive engineers recommend keeping overall tire diameter within ±3% of OEM factory specifications (ideally under ±1.5%). Exceeding 3% can disrupt ABS braking systems, traction control, automatic transmission shift points, and cause suspension or fender lip rubbing.",
  },
  {
    question: "Why does my speedometer read incorrectly after installing larger tires?",
    answer:
      "Your vehicle's speedometer is calibrated to count wheel revolutions based on stock tire circumference. Larger diameter tires travel farther per single revolution, causing the vehicle to move faster than indicated on the speedometer dashboard.",
  },
  {
    question: "What is the 'Plus Sizing' rule for wheels and tires?",
    answer:
      "Plus Sizing (+1, +2, or +3) is the practice of increasing wheel rim diameter while decreasing tire sidewall aspect ratio in equal proportions. This maintains the original factory rolling diameter, preserving speedometer calibration while enhancing steering response and cornering grip.",
  },
  {
    question: "What is the difference between Section Width and Tread Width?",
    answer:
      "Section Width is the maximum width of the tire measured from outer sidewall to inner sidewall when properly inflated on a wheel rim. Tread Width is the specific portion of rubber tread pattern that actually contacts the road surface.",
  },
  {
    question: "How do you convert metric tire sizes to inches (e.g., 285/75R16 to 33-inch)?",
    answer:
      "To convert 285/75R16 to inches: 1) Sidewall = (285 × 0.75) = 213.75 mm = 8.415 inches. 2) Diameter = (2 × 8.415) + 16 = 32.83 inches. 3) Width = 285 / 25.4 = 11.22 inches. Thus, 285/75R16 is equivalent to a 33x11.50R16 flotation off-road size.",
  },
  {
    question: "What is wheel offset and why does it matter for tire clearance?",
    answer:
      "Wheel offset (ET) is the distance in millimeters from the wheel's true centerline to its hub mounting surface. Positive offset moves the wheel face outward (sinking the tire inward toward struts), while negative offset pushes the wheel outward (increasing fender poke and stance). Correct offset prevents tire sidewall contact with inner suspension components.",
  },
  {
    question: "How do I find my vehicle's recommended tire size and pressure?",
    answer:
      "Factory recommended tire sizes and inflation pressures (PSI / kPa) are listed on the tire information placard located inside the driver's side door jamb (B-pillar) or inside the fuel filler door and vehicle owner's manual.",
  },
  {
    question: "How do I read the manufacture date on a tire sidewall?",
    answer:
      "Look for the 4-digit DOT serial code stamped into the lower sidewall. The first two digits represent the week of manufacture, and the last two digits represent the year. For example, '1326' indicates the tire was produced in the 13th week of 2026.",
  },
];
