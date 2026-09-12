import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const horsepower_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "How do you calculate horsepower from torque and RPM?",
    answer: "For torque in lb-ft, HP = (Torque × RPM) / 5252.113. For example, 400 lb-ft at 5,252.113 RPM produces approximately 400 HP."
  },
  {
    question: "Why is 5,252 RPM special?",
    answer: "It is the RPM at which horsepower and torque have the same numerical value when horsepower is expressed in HP and torque in lb-ft. It comes from the mechanical horsepower definition (33,000 ft-lbf/min) and the 2π radians relationship per engine revolution (33,000 / 2π ≈ 5252.113)."
  },
  {
    question: "What is the difference between BHP and WHP?",
    answer: "BHP (Brake Horsepower) generally represents engine output measured at or associated with the crankshaft/flywheel under relevant test conditions. WHP (Wheel Horsepower) represents usable power measured at the drive tires on a chassis dynamometer after transmission, driveshaft, and axle parasitic friction losses."
  },
  {
    question: "How do I calculate WHP from BHP?",
    answer: "Using a simple drivetrain-loss percentage: WHP = BHP × (1 - Loss). For example, with 400 BHP and 14% loss: 400 × 0.86 = 344 WHP."
  },
  {
    question: "How accurate is a quarter-mile horsepower calculator?",
    answer: "It is an empirical estimate, not a direct dyno measurement. Accuracy depends on the appropriateness of the selected model and the quality of the weight, ET or trap-speed data. Launch quality, traction, gearing, aerodynamics, and shift times all influence real-world quarter-mile times."
  },
  {
    question: "What is the 1/4-mile horsepower formula?",
    answer: "A commonly used ET formulation is Hale: HP = Weight / (ET / 5.825)^3 or Fox: HP = Weight / (ET / 5.71)^3, while the empirical trap-speed relationship is Fox: HP = Weight × (Trap Speed / 234)^3."
  },
  {
    question: "Which is more useful: quarter-mile ET or trap speed?",
    answer: "They describe different parts of the run. Elapsed time (ET) is strongly affected by the launch and early acceleration traction, while trap speed reflects power and acceleration sustained through the top end of the track. Using both provides a comprehensive assessment."
  },
  {
    question: "How much drivetrain loss should I use?",
    answer: "There is no universal percentage. Typical estimation presets are 11% for FWD manual, 14% for RWD manual, 17.5% for RWD automatic, and 22% for AWD/4WD systems, though actual losses vary by transmission design, fluid temperature, and tire setup."
  },
  {
    question: "What is power-to-weight ratio?",
    answer: "Power-to-weight compares engine power with total vehicle curb weight. Common expressions are HP/ton (short tons or metric tonnes) or lb/HP (Weight in lbs / HP). A lower lb/HP value indicates more power available per unit of vehicle mass to overcome inertia."
  },
  {
    question: "How much horsepower is needed for a 0–60 mph time?",
    answer: "There is no universal horsepower requirement because acceleration depends on vehicle mass, tire traction, gearing ratios, launch control, and torque delivery. A calculator provides an empirical kinetic-inertia estimate, but cannot eliminate vehicle-specific mechanical factors."
  },
  {
    question: "What is the difference between HP and PS?",
    answer: "Mechanical (Imperial) HP is based on 550 ft-lbs/sec (approx. 745.7 Watts). Metric horsepower (PS, CV, or DIN) is based on lifting 75 kg by 1 meter in 1 second (approx. 735.5 Watts). Consequently, 1 mechanical HP equals approximately 1.01387 metric PS."
  },
  {
    question: "How many kilowatts is 400 horsepower?",
    answer: "Using mechanical horsepower: 400 × 0.745699872 ≈ 298.28 kW (approximately 298.3 kW)."
  },
  {
    question: "Does hot weather reduce horsepower?",
    answer: "Yes. Hotter intake air is less dense, reducing the mass of oxygen entering a naturally aspirated combustion chamber per intake stroke. Forced-induction engines may also experience intercooler heat soak and ECU ignition timing retardation."
  },
  {
    question: "What is SAE J1349?",
    answer: "SAE J1349 is a standardized engine power testing and atmospheric correction standard. It defines methods for obtaining repeatable engine dyno measurements normalized to baseline reference inlet conditions (77°F / 25°C, 29.92 inHg barometric pressure)."
  },
  {
    question: "Does SAE J1349 tell me exactly how much power I lose at altitude?",
    answer: "No. SAE explicitly states that J1349 correction equations are not intended for altitude derating. They standardize dynamometer power measurements under specified laboratory conditions rather than acting as a universal altitude loss formula."
  },
  {
    question: "Can two dynos show different horsepower?",
    answer: "Yes. Dynamometer architecture (engine bench vs. chassis roller vs. hub dyno), calibration, roller inertia, ambient weather sensors, tie-down tension, and testing procedures cause variation. This is why BHP and WHP figures must not be directly conflated."
  },
  {
    question: "Is horsepower enough to predict a car's performance?",
    answer: "No. Horsepower represents the rate of doing work, but real-world acceleration depends heavily on vehicle mass, the breadth of the torque curve, transmission gearing, launch traction, and aerodynamic drag."
  }
];
