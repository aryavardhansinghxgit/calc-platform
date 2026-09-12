import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const mileage_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "How do I calculate my car's mileage?",
    answer: "For a conventional fuel vehicle, MPG = Miles Driven / Gallons Used, and km/L = Kilometers Driven / Liters Used. The most useful real-world measurement is usually based on a consistent tank-to-tank fill-up: fill to full, reset the trip odometer, drive normally, refill to full, and divide trip distance by metered fuel added."
  },
  {
    question: "What is a good MPG for a car?",
    answer: "There is no single MPG value that is 'good' for every vehicle. A small efficient car, large SUV, pickup truck and hybrid have different expected efficiency ranges. Generally, 30–35 MPG is good for gas sedans, 45–55 MPG for hybrids, and 100+ MPGe for all-electric vehicles. Compare vehicles in similar classes using the same measurement standard."
  },
  {
    question: "Is higher MPG better?",
    answer: "Yes. MPG measures distance traveled per gallon, so a larger MPG value means the vehicle travels farther using the same quantity of fuel. L/100km works in the opposite direction: a lower number means less fuel is required for the same distance."
  },
  {
    question: "How do I convert MPG to L/100km?",
    answer: "For US MPG: L/100km = 235.214583 / US MPG. For example, 30.4 US MPG equals 7.73 L/100km. The calculator performs the conversion without prematurely rounding intermediate values, preserving high numerical precision."
  },
  {
    question: "What is the difference between US MPG and UK MPG?",
    answer: "US MPG uses the US liquid gallon (3.78541 L), while UK Imperial MPG uses the larger Imperial gallon (4.54609 L). Therefore, the numerical UK MPG value is approximately 1.20095 times higher than US MPG for the exact same physical vehicle efficiency."
  },
  {
    question: "How do I calculate fuel cost per mile?",
    answer: "For a US MPG calculation: Cost per mile = Fuel Price per Gallon / MPG. For example, $3.50/gal at 30 MPG gives approximately $0.1167, or $0.12 per mile."
  },
  {
    question: "How do I calculate the cost of a road trip?",
    answer: "First calculate fuel required: Fuel Required = Trip Distance / MPG. Then: Trip Fuel Cost = Fuel Required × Fuel Price. For example, 300 miles at 25 MPG requires 12 gallons. At $3.50/gal, fuel cost is 12 × $3.50 = $42.00."
  },
  {
    question: "How should I average mileage from several fill-ups?",
    answer: "Do not take a simple arithmetic average of individual MPG readings. Use total distance divided by total fuel: Weighted Overall Efficiency = Σ Distance / Σ Fuel. This weighted approach prevents a short trip with unusual conditions from skewing overall fleet calculations."
  },
  {
    question: "What is the 2026 IRS mileage rate?",
    answer: "For U.S. business travel, the IRS lists 72.5 cents per mile for January 1 through June 30, 2026, and a revised rate of 76.0 cents per mile beginning July 1, 2026. The applicable rate should therefore be tied to the relevant travel period rather than assuming one static annual rate."
  },
  {
    question: "Is the IRS mileage rate the same as a guaranteed tax deduction?",
    answer: "No. The standard mileage rate is an optional IRS standard for calculating deductible business travel costs or employee reimbursements, but actual deductibility depends on the taxpayer's circumstances, documentation, and applicable tax rules."
  },
  {
    question: "What is MPGe?",
    answer: "MPGe means miles per gallon of gasoline equivalent. It allows electric and other alternative-fuel vehicles to be compared using an energy-equivalent gallon of gasoline. The EPA defines one gallon of gasoline equivalent as approximately 33.7 kWh of electricity."
  },
  {
    question: "How is EV MPGe calculated?",
    answer: "For an electric vehicle: MPGe = (Miles Driven / kWh Consumed) × 33.7. For example, traveling 240 miles on 75 kWh yields (240 / 75) × 33.7 = 3.2 × 33.7 = 107.84 MPGe."
  },
  {
    question: "Why is my calculated mileage different from my car's dashboard?",
    answer: "The vehicle dashboard estimates fuel economy electronically based on fuel-injector pulse duration and engine airflow algorithms, while a tank-to-tank calculation uses measured odometer distance and physically metered fuel added at the pump. Differences can arise from pump shutoff variation, tire pressure, temperature, and driving conditions."
  },
  {
    question: "Does tire pressure affect mileage?",
    answer: "Yes. Underinflated tires increase rolling resistance against the road surface. For every 1 PSI drop below the manufacturer's recommended placard pressure across all four tires, fuel economy decreases by approximately 0.2% to 0.3%."
  },
  {
    question: "Does driving faster reduce fuel economy?",
    answer: "Generally, higher speed increases aerodynamic drag significantly. Aerodynamic drag force is proportional to velocity squared (F_d ∝ v²), and the power required to overcome drag scales with the cube of velocity (P ∝ v³). Driving at 75–80 mph can reduce fuel economy by 7% to 25% compared to 55–60 mph."
  },
  {
    question: "Can the Mileage Calculator calculate EV charging cost?",
    answer: "Yes. In EV mode, enter the distance driven, electricity consumed in kWh, and electricity charging price ($/kWh). The calculator derives energy efficiency, MPGe, total charging cost, cost per distance, and distance per dollar."
  }
];
