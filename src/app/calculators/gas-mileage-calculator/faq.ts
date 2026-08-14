import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const gas_mileage_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "How do you calculate gas mileage manually?",
    answer: "To calculate gas mileage manually, reset your trip odometer (or record your starting odometer) when you fill up your tank completely. Drive normally until the tank is low, fill up completely again, and record the exact gallons/liters added and miles/km driven. Divide total miles driven by gallons added."
  },
  {
    question: "What is a good gas mileage (MPG) rating for a modern car?",
    answer: "Modern benchmarks classify 25–30 MPG as average for standard sedans and compact SUVs, 35–45 MPG as excellent for non-hybrid compacts, 50–55 MPG for gasoline-electric hybrids, and 100+ MPGe for pure Electric Vehicles (EVs)."
  },
  {
    question: "Why is my car's real-world gas mileage lower than the EPA window sticker?",
    answer: "EPA window sticker ratings are measured under controlled laboratory dyno conditions at mild ambient temperatures. Real-world gas mileage is lower due to aggressive acceleration, cruising at speeds above 65 mph, city stop-and-go traffic, roof racks, cold winter weather, and underinflated tires."
  },
  {
    question: "How do you convert US MPG to Liters per 100 km (L/100km)?",
    answer: "To convert US MPG to Liters per 100 km, divide 235.215 by your US MPG number (e.g., 30 MPG = 235.215 / 30 = 7.84 L/100km). To convert L/100km back to US MPG, divide 235.215 by your L/100km figure."
  },
  {
    question: "Why are UK Imperial MPG numbers higher than US MPG numbers?",
    answer: "A UK Imperial Gallon (approximately 4.546 Liters) is 20% larger than a US Liquid Gallon (approximately 3.785 Liters). Because a UK gallon contains more fuel mass, a vehicle's UK MPG rating will naturally be ~20% higher than its US MPG rating for the exact same physical fuel efficiency."
  },
  {
    question: "Does driving fast significantly lower gas mileage?",
    answer: "Yes. Aerodynamic drag increases exponentially above 50–55 mph. Cruising at 75 mph consumes up to 20% to 25% more fuel per mile than cruising at 55 mph, forcing your engine to burn more fuel to overcome air resistance."
  },
  {
    question: "How much gas does a car burn while idling?",
    answer: "An idling car engine burns between 0.2 and 0.5 gallons (0.75 to 1.9 Liters) of fuel per hour while yielding 0.0 MPG. Turning off your engine when stopped for more than 10 seconds saves fuel and reduces engine wear."
  },
  {
    question: "Does low tire pressure waste gasoline?",
    answer: "Yes. Underinflated tires increase rolling resistance against the road surface. Fuel economy drops by approximately 0.2% to 0.3% for every 1 PSI drop in pressure across all four tires below recommended manufacturer specifications."
  },
  {
    question: "What is the 'MPG Illusion' and why does it matter?",
    answer: "The 'MPG Illusion' refers to the non-linear relationship between MPG and actual fuel volume consumed. Improving a gas guzzler from 10 to 15 MPG saves far more fuel over 10,000 miles (333 gallons saved) than improving an efficient car from 30 to 35 MPG (48 gallons saved)."
  },
  {
    question: "Does using premium high-octane gasoline improve gas mileage in regular cars?",
    answer: "No. Premium octane gasoline is formulated to resist premature detonation ('engine knock') in high-compression or turbocharged engines. Using 91/93 octane fuel in an engine designed for regular 87 octane provides zero benefit in gas mileage, horsepower, or engine cleanliness."
  }
];
