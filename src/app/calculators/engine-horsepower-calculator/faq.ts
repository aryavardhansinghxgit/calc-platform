import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const engine_horsepower_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "How do you calculate engine horsepower from quarter-mile time (ET)?",
    answer: "To calculate engine horsepower from quarter-mile elapsed time, divide the vehicle's total weight in pounds by the cube of (ET in seconds / 5.825): Horsepower = Weight / (ET / 5.825)^3. Ensure that total weight includes the vehicle curb weight, driver, fuel, and payload."
  },
  {
    question: "Why is trap speed a more accurate measure of horsepower than elapsed time?",
    answer: "Elapsed time is heavily influenced by initial launch traction, tire choice, and driver reaction time, whereas finish-line trap speed reflects the vehicle's net power-to-weight ratio over distance regardless of low-speed traction loss."
  },
  {
    question: "What is the difference between Wheel Horsepower (WHP) and Crank Horsepower (BHP)?",
    answer: "BHP (Brake Horsepower) is the raw power output measured at the engine crankshaft flywheel. WHP (Wheel Horsepower) is the usable power measured at the drive tires on a chassis dyno after overcoming 10%–25% drivetrain parasitic friction losses."
  },
  {
    question: "Why do horsepower and torque cross at 5,252 RPM?",
    answer: "Because 1 mechanical horsepower equals 33,000 foot-pounds of work per minute, and one rotational revolution equals 2π radians. Dividing 33,000 by 2π (6.28318) yields 5,252.11, causing horsepower and torque curves (in lb-ft) to intersect at 5,252 RPM when plotted on matching scales."
  },
  {
    question: "How much horsepower does forced induction (turbo/supercharger) add?",
    answer: "As a general rule, adding 14.7 PSI (1 Bar) of forced induction boost at sea level doubles ambient air density entering the cylinders, yielding an increase of roughly 70% to 90% in engine horsepower after thermal and mechanical losses."
  },
  {
    question: "How do you convert Kilowatts (kW) to Horsepower (HP)?",
    answer: "To convert Kilowatts to Mechanical Horsepower, multiply by 1.34102 (1 kW = 1.341 HP). To convert Mechanical Horsepower to Kilowatts, multiply by 0.7457 (1 HP = 0.7457 kW)."
  },
  {
    question: "What does SAE Net Horsepower mean on my vehicle's window sticker?",
    answer: "SAE Net Horsepower (standardized via SAE J1349) measures engine output with all factory accessories installed (water pump, alternator, power steering), factory air filter box, and production exhaust manifold systems attached."
  },
  {
    question: "How does vehicle weight affect quarter-mile acceleration?",
    answer: "Reducing vehicle weight by 100 lbs (45 kg) produces an effect equivalent to gaining roughly 10 horsepower, reducing quarter-mile elapsed time by approximately 0.1 seconds."
  },
  {
    question: "What is Volumetric Efficiency (VE) in an engine?",
    answer: "Volumetric Efficiency (VE) is the ratio of actual air/fuel volume drawn into the cylinder during the intake stroke compared to the cylinder's theoretical static displacement volume. Stock engines average 80%–90% VE, while tuned race engines can achieve 100%+ VE."
  },
  {
    question: "Can you calculate horsepower without a dynamometer?",
    answer: "Yes. By accurately logging quarter-mile finish line trap speed, elapsed time on a track, or recording Mass Air Flow (MAF) sensor intake logs, engineers can calculate engine horsepower within 3%–5% accuracy without a dyno facility."
  }
];
