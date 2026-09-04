import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const volume_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "What is the formula for volume?",
    answer: "The formula depends on the shape. A rectangular prism uses V = lwh, a cylinder uses V = πr²h, a sphere uses V = (4/3)πr³, and a cone uses V = (1/3)πr²h."
  },
  {
    question: "How do I calculate the volume of a box?",
    answer: "Multiply length × width × height (V = lwh). Make sure all three dimensions use compatible units (e.g. all in meters, feet, or inches)."
  },
  {
    question: "How do I calculate cylinder volume?",
    answer: "Multiply the area of the circular base by the perpendicular height: V = πr²h. Enter the cylinder radius and height into the calculator."
  },
  {
    question: "How do I calculate the volume of a sphere?",
    answer: "Use V = (4/3)πr³. The radius r is the distance from the center to the surface. If given a diameter d, first divide by 2 (r = d/2)."
  },
  {
    question: "How many liters are in one cubic foot?",
    answer: "One cubic foot equals exactly 28.316846592 liters. To convert cubic feet to liters, multiply cubic feet by 28.316846592."
  },
  {
    question: "How do I calculate tank capacity?",
    answer: "For a rectangular tank, V_total = lwh gives the full container capacity. If the tank is partially filled, use V_liquid = lwd, where d is the current liquid fill depth."
  },
  {
    question: "What is the difference between tank capacity and liquid volume?",
    answer: "Tank capacity is the maximum volume the container can hold when completely filled. Liquid volume is the amount currently occupied by the liquid. For example, a partially filled 240 ft³ tank with liquid depth 3 ft holds 180 ft³ of liquid, leaving 60 ft³ of remaining air space."
  },
  {
    question: "Can I convert cubic feet to gallons?",
    answer: "Yes. The conversion factor depends on the gallon standard: 1 cubic foot ≈ 7.48052 US liquid gallons, or ≈ 6.22883 UK Imperial gallons. The calculator keeps these two systems distinct."
  },
  {
    question: "What is the volume of a cone?",
    answer: "A right circular cone has volume V = (1/3)πr²h, where r is the base radius and h is the perpendicular height from the base center to the apex."
  },
  {
    question: "Can I calculate the volume of a hollow pipe?",
    answer: "Yes. A hollow cylindrical tube subtracts the inner cylindrical space from the outer cylindrical solid: V = πh(R² - r²) = [π(d1² - d2²)h]/4, where R (or d1) is the outer radius/diameter and r (or d2) is the inner radius/diameter."
  },
  {
    question: "What unit should I use for volume?",
    answer: "Use a cubic unit appropriate to the application: cubic meters (m³) for SI engineering calculations, cubic feet (ft³) or cubic inches (in³) for US customary measurements, and liters (L) or US gallons for liquid capacity."
  },
  {
    question: "Why is my volume result different after changing units?",
    answer: "A correct unit conversion changes the numerical value because the size of the unit changes. For example, 1 cubic meter equals 1,000 liters, so the numerical value becomes 1,000 times larger while representing the identical physical space."
  }
];
