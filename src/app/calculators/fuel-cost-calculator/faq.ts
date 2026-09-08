import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const fuel_cost_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "How do I calculate fuel cost for a trip?",
    answer:
      "Divide trip distance by vehicle MPG to find gallons required, then multiply gallons by the fuel price.",
  },
  {
    question: "How much gas do I need for 300 miles at 25 MPG?",
    answer:
      "You need: 300 ÷ 25 = 12 gallons. At $3.50 per gallon, the fuel costs $42.00.",
  },
  {
    question: "How do I calculate round-trip fuel cost?",
    answer:
      "Double the one-way distance first, then divide by MPG. For 300 miles one way: 600 ÷ 25 = 24 gallons. At $3.50/gal: $84.00.",
  },
  {
    question: "How do I calculate my commute fuel cost per month?",
    answer:
      "Calculate your daily fuel requirement, multiply by fuel price, then multiply by the number of commute days per month. For 300 miles/day at 25 MPG and $3.50/gal: $42/day × 22 = $924/month.",
  },
  {
    question: "How do I calculate MPG from my odometer?",
    answer:
      "Subtract the starting odometer from the ending odometer and divide the distance by gallons added: MPG = (End − Start) ÷ Gallons Added. For 10,000 → 10,350 miles and 14 gallons: 25 MPG.",
  },
  {
    question: "What is the difference between MPG and L/100km?",
    answer:
      "MPG measures distance traveled per gallon, while L/100km measures liters consumed per 100 kilometers. Higher MPG is better. Lower L/100km is better.",
  },
  {
    question: "How do I convert 25 MPG to L/100km?",
    answer:
      "For U.S. MPG: 235.214583 ÷ 25 ≈ 9.41 L/100km. The conversion differs for Imperial MPG because the Imperial gallon is larger. NIST lists 3.785412 L for a U.S. gallon and 4.54609 L for an Imperial gallon.",
  },
  {
    question: "What is the difference between U.S. and Imperial MPG?",
    answer:
      "A U.S. gallon is approximately 3.785 L, while an Imperial gallon is approximately 4.546 L. Therefore, the same numerical MPG value represents different physical fuel consumption.",
  },
  {
    question: "Does driving faster increase fuel consumption?",
    answer:
      "Usually, yes, especially at higher road speeds. Aerodynamic drag force increases approximately with the square of velocity, while aerodynamic power required to overcome drag scales approximately with the cube of velocity.",
  },
  {
    question: "Does air conditioning increase fuel consumption?",
    answer:
      "It can increase vehicle energy demand, particularly in some operating conditions. The effect varies with temperature, vehicle type, speed, HVAC system and usage. It is not a single fixed percentage for every car.",
  },
  {
    question: "Does extra weight increase fuel consumption?",
    answer:
      "Additional weight generally increases the energy required to accelerate the vehicle and can increase consumption, particularly in stop-and-go driving. The exact effect depends on the vehicle and driving conditions.",
  },
  {
    question: "Does low tire pressure increase fuel consumption?",
    answer:
      "Underinflated tires can increase rolling resistance and reduce efficiency. Use the vehicle manufacturer's recommended tire pressure rather than assuming a universal percentage penalty.",
  },
  {
    question: "How much can carpooling reduce my personal fuel cost?",
    answer:
      "If the total trip cost is $42, splitting it equally among four people gives each person a $10.50 share, assuming all participants share the cost equally.",
  },
  {
    question: "Is an EV always cheaper than a gasoline car?",
    answer:
      "No. EV-versus-gas cost depends on gasoline price, electricity price, gasoline MPG, EV energy consumption, charging location and other factors. DOE notes that EV charging costs vary with electricity price, region, time of use and charging location.",
  },
  {
    question: "How do I calculate EV charging cost for a trip?",
    answer:
      "For an EV rated at kWh per 100 miles: Energy = Distance × kWh/100mi ÷ 100. Then: Charging Cost = Energy × Electricity Rate.",
  },
  {
    question: "What if the EV costs more than the gasoline car for a trip?",
    answer:
      "The result should be described as an EV premium rather than negative savings. For example, if gasoline costs $42 and the EV costs $72, the EV premium is $30 per trip.",
  },
  {
    question: "How are gasoline CO₂ emissions calculated?",
    answer:
      "The calculator uses 8.887 kg CO₂ per gallon of gasoline. EPA documents the equivalent factor of 8,887 grams CO₂ per gallon.",
  },
  {
    question: "Are these CO₂ values lifecycle emissions?",
    answer:
      "No. A gasoline-combustion factor does not automatically include every upstream or lifecycle source of greenhouse gases. EPA distinguishes combustion emissions from broader greenhouse-gas accounting and upstream emissions.",
  },
  {
    question: "Why does my actual fuel cost differ from the calculator?",
    answer:
      "Actual fuel expense can differ because of changing fuel prices, traffic, weather, terrain, driving behavior, vehicle load, tire condition, HVAC use, and actual fuel economy.",
  },
  {
    question: "Can I use this calculator to estimate a complete cost of owning a car?",
    answer:
      "It estimates the fuel and selected trip-related costs that it models. It does not automatically represent depreciation, insurance, financing, maintenance, registration, repairs, or every ownership expense.",
  },
];
