import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const gas_mileage_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "How do I calculate my car's MPG?",
    answer:
      "Subtract the starting odometer reading from the ending reading to get miles driven, then divide by gallons of fuel used: MPG = Miles Driven ÷ Gallons Used. For example, 360 miles using 12 gallons gives 30 MPG.",
  },
  {
    question: "How do I calculate fuel cost from MPG?",
    answer:
      "First calculate fuel required: Fuel = Distance ÷ MPG. Then multiply by fuel price: Fuel Cost = Fuel × Fuel Price. For 300 miles at 25 MPG and $3.50/gal, 300 ÷ 25 = 12 gallons, and 12 × $3.50 = $42.00.",
  },
  {
    question: "What is a good MPG?",
    answer:
      "There is no single MPG number that is 'good' for every vehicle. Fuel economy varies with vehicle size, drivetrain, engine, load, speed, driving conditions and use. The most useful comparison is often between similar vehicles or between your own vehicle's current and historical fuel economy.",
  },
  {
    question: "How do I convert MPG to L/100km?",
    answer:
      "For U.S. MPG: L/100km = 235.214583 ÷ MPG. Therefore, 30 MPG ≈ 7.84 L/100km. NIST documents the U.S. MPG conversion basis. For UK Imperial MPG, the constant is approximately 282.481.",
  },
  {
    question: "What is the difference between U.S. MPG and Imperial MPG?",
    answer:
      "A U.S. gallon is approximately 3.785412 liters, while an Imperial gallon is 4.54609 liters. Because the gallons differ in size, the numerical MPG values are not directly equivalent.",
  },
  {
    question: "How do I calculate my real-world gas mileage?",
    answer:
      "Record the starting odometer, drive normally, record the ending odometer and note how much fuel you add during the measurement. Then: MPG = (Ending Odometer − Starting Odometer) ÷ Fuel Added. Several tanks can be combined for a more stable long-term measurement.",
  },
  {
    question: "Why is my actual MPG different from the advertised MPG?",
    answer:
      "Actual fuel economy can be affected by driving behavior, speed, traffic, temperature, terrain, payload, tire pressure, vehicle condition and other operating conditions. DOE specifically notes that driving behavior and vehicle condition can materially affect fuel economy.",
  },
  {
    question: "Does driving faster use more fuel?",
    answer:
      "Often, yes. Fuel economy can decline at higher speeds, although the exact pattern differs by vehicle. Aerodynamic drag force is approximately proportional to velocity squared (F_drag ∝ v²), while aerodynamic power required to overcome drag scales approximately with velocity cubed (P_drag ∝ v³). DOE's modeled vehicle data also shows fuel economy varying significantly with speed.",
  },
  {
    question: "Does tire pressure affect gas mileage?",
    answer:
      "Yes. Underinflated tires generally increase rolling resistance. DOE recommends maintaining the manufacturer's specified tire pressure and reports measurable fuel-economy benefits from properly inflated tires.",
  },
  {
    question: "How do I calculate driving range?",
    answer:
      "For a simple estimate: Range = Tank Capacity × Fuel Economy. A 15-gallon tank at 30 MPG gives 15 × 30 = 450 miles. Actual range can differ because usable fuel capacity and real-world MPG are not perfectly constant.",
  },
  {
    question: "How is a multi-tank MPG average calculated?",
    answer:
      "Add all measured distances and all fuel consumed, then divide: Weighted MPG = Total Distance ÷ Total Fuel. This is preferable to taking a simple arithmetic average of separate tank MPG values when the tanks contain different amounts of fuel.",
  },
  {
    question: "How much CO₂ does gasoline produce?",
    answer:
      "EPA uses 8,887 grams of CO₂ per gallon of gasoline consumed as a tailpipe combustion factor. That means 12 gallons corresponds to about 106.6 kg of direct tailpipe CO₂. This is a combustion estimate rather than a complete lifecycle emissions calculation.",
  },
];
