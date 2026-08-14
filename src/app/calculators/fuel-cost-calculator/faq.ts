import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const fuel_cost_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "How do I calculate the fuel cost for a road trip?",
    answer: "To calculate total road trip fuel cost, divide your total trip distance by your vehicle's fuel efficiency (MPG or L/100km) to determine total fuel volume required, then multiply that volume by the average price per gallon or liter."
  },
  {
    question: "How do you convert MPG to Liters per 100 km (L/100km)?",
    answer: "To convert US MPG to L/100km, divide 235.215 by your MPG figure (e.g., 25 MPG = 235.215 / 25 = 9.41 L/100km). For UK Imperial MPG, divide 282.481 by your Imperial MPG figure."
  },
  {
    question: "Why does my car consume more fuel at speeds above 65 mph?",
    answer: "Aerodynamic drag increases exponentially with speed (proportional to the square of velocity). Cruising at 75 mph requires your engine to overcome significantly more wind resistance than cruising at 55 mph, burning up to 20% to 25% more fuel for the same distance."
  },
  {
    question: "How much money does carpooling actually save?",
    answer: "Carpooling divides total fuel, toll, and parking expenses evenly across all vehicle occupants. Sharing a ride with 3 coworkers (4 passengers total) cuts individual commuting costs by 75% while reducing individual vehicle wear and carbon emissions."
  },
  {
    question: "Does using the air conditioner burn more gas than opening the windows?",
    answer: "It depends on vehicle speed. At low city speeds (under 45 mph), opening windows is more fuel-efficient. At highway speeds (over 50 mph), open windows create significant aerodynamic drag, making air conditioning the more fuel-efficient option."
  },
  {
    question: "How much does low tire pressure increase fuel costs?",
    answer: "Under-inflated tires increase rolling resistance against the road surface. For every 1 PSI drop below recommended tire pressure, fuel efficiency decreases by roughly 0.2% to 0.3%, leading to noticeably higher annual fuel expenses."
  },
  {
    question: "Is it cheaper to drive an Electric Vehicle (EV) than a gas car?",
    answer: "Yes, in most cases. Charging an EV at home costs around 3¢ to 5¢ per mile (based on standard electricity rates of 14¢/kWh), compared to 12¢ to 18¢ per mile for a gasoline car averaging 25 MPG at $3.50/gallon."
  },
  {
    question: "How do I calculate my vehicle's actual real-world MPG?",
    answer: "Use the fill-up method: Fill your gas tank completely and record your start odometer reading. Drive normally until the tank is low, fill it completely again, and record the gallons added and end odometer reading. Divide miles driven (End Odo - Start Odo) by gallons added."
  },
  {
    question: "Does carrying extra weight in the trunk increase fuel consumption?",
    answer: "Yes. Carrying an extra 100 lbs (45 kg) of cargo reduces vehicle fuel economy by approximately 1% in smaller cars. Removing unnecessary heavy items from your trunk immediately improves efficiency."
  },
  {
    question: "What is the difference between US Gallons and UK Imperial Gallons?",
    answer: "One UK Imperial Gallon equals approximately 4.546 Liters (1.201 US Gallons). Because a UK gallon is 20% larger than a US gallon, a vehicle's UK MPG rating will be about 20% higher than its US MPG rating for the exact same physical fuel economy."
  }
];
