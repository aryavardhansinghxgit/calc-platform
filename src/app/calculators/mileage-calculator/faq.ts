import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const mileage_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "How do I calculate my vehicle's mileage (MPG or km/L)?",
    answer: "To calculate vehicle gas mileage, fill your fuel tank completely and record your initial odometer reading. Drive normally until the tank is nearly empty, refill to full, and note the exact gallons (or Liters) added. Divide the trip distance driven by the fuel added: MPG = Distance Traveled / Fuel Added."
  },
  {
    question: "What is considered good gas mileage for a car?",
    answer: "Modern vehicle efficiency standards classify 25–32 MPG as good for standard gas-powered sedans and SUVs, 45–55 MPG for gasoline-electric hybrid vehicles, and 100+ MPGe for all-electric vehicles (EVs)."
  },
  {
    question: "Why does my dashboard mileage display differ from manual calculations?",
    answer: "Onboard vehicle computers estimate fuel consumption based on fuel injector pulse-width duration and airflow algorithms rather than physically measuring fluid volume added at the gas pump. Manual tank-to-tank fill-up calculation accounts for real metered fuel volume."
  },
  {
    question: "How do you convert US MPG to Liters per 100 km (L/100km)?",
    answer: "To convert US MPG to Liters per 100 km (L/100km), divide 235.215 by the US MPG figure: L/100km = 235.215 / US MPG. For example, 30 US MPG equals 7.84 L/100km."
  },
  {
    question: "What is the difference between US MPG and UK Imperial MPG?",
    answer: "One UK Imperial Gallon is equal to approximately 1.201 US Gallons (4.546 Liters vs 3.785 Liters). Because the Imperial gallon is 20% larger, UK MPG figures appear ~20% higher than US MPG for the exact same vehicle."
  },
  {
    question: "How does business mileage reimbursement work?",
    answer: "Business mileage reimbursement is calculated by multiplying total qualifying business miles driven by the standard mileage rate set by tax authorities (such as the IRS rate of $0.67 per mile for business travel)."
  },
  {
    question: "What is the 'MPG Illusion' in automotive efficiency?",
    answer: "The 'MPG Illusion' describes how non-linear MPG improvements deceive drivers. Increasing fuel efficiency from 15 to 20 MPG saves 16.7 gallons of fuel every 1,000 miles, whereas increasing from 40 to 50 MPG saves only 5 gallons over the exact same distance."
  },
  {
    question: "Does low tire pressure lower vehicle mileage?",
    answer: "Yes. Underinflated tires increase rolling resistance against the road surface. For every 1 PSI drop below recommended placard pressure across all four tires, fuel economy decreases by approximately 0.2% to 0.3%."
  },
  {
    question: "What is MPGe in electric and hybrid cars?",
    answer: "MPGe (Miles Per Gallon Equivalent) is the EPA metric used to evaluate electric vehicle efficiency. One US gallon of gasoline contains 33.7 kWh of thermal energy. An EV that travels 100 miles on 33.7 kWh achieves 100 MPGe."
  },
  {
    question: "How does highway speed affect gas mileage?",
    answer: "Aerodynamic drag forces scale exponentially with the square of vehicle velocity. Driving at 75–80 mph requires significantly more engine power to displace air resistance, reducing fuel economy by 7% to 25% compared to driving at 55–60 mph."
  }
];
