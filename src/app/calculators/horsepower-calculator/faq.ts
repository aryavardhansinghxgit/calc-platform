import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const horsepower_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "How do you calculate horsepower from torque and RPM?",
    answer: "To calculate horsepower from torque and RPM, multiply torque (in lb-ft) by engine speed (in RPM) and divide by the mathematical constant 5,252: HP = (Torque × RPM) / 5252. If torque is given in Newton-meters (N-m), use HP = (Torque N-m × RPM) / 7127."
  },
  {
    question: "Why do horsepower and torque always cross at 5,252 RPM?",
    answer: "Because one mechanical horsepower is defined as 33,000 foot-pounds of work per minute, and one rotational revolution equals 2π radians. Dividing 33,000 by 2π (6.28318) yields 5,252.11. When horsepower and imperial torque (lb-ft) are plotted on identical numerical scales, their curves must mathematically intersect at exactly 5,252 RPM."
  },
  {
    question: "What is the difference between BHP, WHP, and HP?",
    answer: "BHP (Brake Horsepower) is raw engine output measured at the crankshaft flywheel without drivetrain parasitic losses. WHP (Wheel Horsepower) is usable power measured at the drive wheels on a chassis dyno after transmission and differential friction losses. HP (Horsepower) is a general unit of power."
  },
  {
    question: "How do you convert Kilowatts (kW) to Horsepower (HP)?",
    answer: "To convert Kilowatts to Mechanical Horsepower, multiply by 1.34102 (1 kW = 1.341 HP). To convert Mechanical Horsepower to Kilowatts, multiply by 0.7457 (1 HP = 0.7457 kW)."
  },
  {
    question: "What is the difference between Mechanical HP and Metric HP (PS / CV)?",
    answer: "Mechanical (Imperial) HP is based on lifting 33,000 lbs by 1 foot in 1 minute (745.7 Watts). Metric HP (PS, CV, PK, or DIN) is based on lifting 75 kilograms by 1 meter in 1 second (735.5 Watts). Consequently, 1 Mechanical HP equals approximately 1.014 Metric PS."
  },
  {
    question: "How much horsepower does a typical car lose through the drivetrain?",
    answer: "Drivetrain parasitic friction losses average 10%–12% for Front-Wheel Drive (FWD) manual transmissions, 13%–15% for Rear-Wheel Drive (RWD) manual transmissions, 16%–19% for RWD torque-converter automatic transmissions, and 20%–25% for All-Wheel Drive (AWD/4WD) systems."
  },
  {
    question: "How can I estimate horsepower from quarter-mile track time?",
    answer: "Use the empirical Fox elapsed time formula: Horsepower = Vehicle Weight in lbs × (234 / 1/4-Mile ET)^3. For example, a 3,500 lb car running a 12.0 second quarter-mile requires approximately 377 Crank HP."
  },
  {
    question: "Does hot weather or high altitude reduce an engine's horsepower?",
    answer: "Yes. High ambient temperatures, low barometric pressure at high altitude, and high humidity reduce air density, providing fewer oxygen molecules per cubic foot for combustion. Naturally aspirated engines lose roughly 3% of their horsepower for every 1,000 feet of elevation gain."
  },
  {
    question: "What is Power-to-Weight Ratio and why is it important for speed?",
    answer: "Power-to-Weight Ratio divides vehicle horsepower by total curb weight (expressed as HP/ton or lb/HP). It determines real-world acceleration performance more accurately than peak horsepower alone, as light cars require less force to overcome inertia."
  },
  {
    question: "How many horses does one horsepower actually equal?",
    answer: "While James Watt standardized 1 HP based on sustained all-day draft horse work (550 ft-lbs/sec), a real living horse can generate peak short-burst power output of 10 to 15 horsepower during maximum sprinting."
  }
];
