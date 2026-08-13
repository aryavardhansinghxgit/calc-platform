import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const voltage_drop_calculatorFaqs: CalculatorFAQ[] = [
  {
    "question": "What is voltage drop and why does it occur?",
    "answer": "Voltage drop is the decrease in electrical potential along the path of a current flowing in an electrical circuit. It occurs because the conductors (wires) have a small amount of electrical resistance. As current flows through this resistance, some voltage is converted to heat (following Ohm's Law V = I × R), leaving less voltage available at the receiving end of the circuit."
  },
  {
    "question": "What percentage of voltage drop is acceptable?",
    "answer": "The National Electrical Code (NEC) recommends a maximum voltage drop of 3% for branch circuits, and a maximum total voltage drop of 5% combined across both feeder and branch circuits. Keeping voltage drop within these limits ensures electrical equipment operates at peak efficiency and avoids safety hazards like motor overheating."
  },
  {
    "question": "How does wire size (AWG or metric) affect voltage drop?",
    "answer": "Wire size is inversely proportional to electrical resistance: the larger the diameter (or cross-sectional area) of the wire, the lower its resistance. By increasing the wire size (using a lower AWG number or a larger mm² metric size), you reduce the resistance and subsequently lower the voltage drop across the run."
  },
  {
    "question": "Does wire length impact voltage drop?",
    "answer": "Yes, voltage drop is directly proportional to wire length. Resistance is cumulative along the length of a conductor. Therefore, doubling the length of the run doubles the total resistance, which doubles the voltage drop if current and wire size remain constant."
  },
  {
    "question": "How does current (Amps) affect voltage drop?",
    "answer": "Voltage drop is directly proportional to current (Amperes), according to Ohm's Law (V = I × Z). If the current traveling through a conductor doubles, the voltage drop will double. This is why circuits supplying high-power appliances (like heaters or chargers) experience higher voltage drop."
  },
  {
    "question": "Does copper have less voltage drop than aluminum?",
    "answer": "Yes, copper is a better electrical conductor than aluminum and has lower resistivity. A copper wire of a given size (AWG or mm²) will experience roughly 35% to 40% less voltage drop than an aluminum wire of the exact same size under the same load."
  },
  {
    "question": "What is the formula for calculating DC voltage drop?",
    "answer": "For Direct Current (DC) circuits, the formula is: Vdrop = (2 × L × I × R) / 1000, where L is the one-way distance in feet, I is current in Amps, and R is the DC resistance of the wire in ohms per 1000 feet. The factor of 2 accounts for the out-and-back path of the current."
  },
  {
    "question": "How do you calculate AC single-phase voltage drop?",
    "answer": "For AC single-phase circuits, calculations must account for inductive reactance (X) in addition to AC resistance (R). The effective impedance is: Z_eff = R × cosθ + X × sinθ, where cosθ is the power factor. The voltage drop is then: Vdrop = (2 × L × I × Z_eff) / 1000."
  },
  {
    "question": "What is the formula for AC three-phase voltage drop?",
    "answer": "For AC three-phase systems, line-to-line voltage drop is calculated as: Vdrop = (√3 × L × I × Z_eff) / 1000. Here, the factor of √3 (approximately 1.732) is used instead of 2 because phase voltages are shifted by 120 degrees, meaning current return paths are shared among the three wires."
  },
  {
    "question": "Does power factor affect voltage drop in AC circuits?",
    "answer": "Yes, power factor (PF) represents the alignment between voltage and current. Lower power factor indicates inductive reactance in the circuit (commonly from motors or transformers). Under low power factor conditions, inductive reactance (X) contributes significantly more to the overall impedance and voltage drop than it does at a unity power factor."
  },
  {
    "question": "How can I reduce voltage drop in my design?",
    "answer": "You can reduce voltage drop by: 1. Increasing the size (cross-sectional area) of the wire; 2. Using copper instead of aluminum; 3. Running multiple conductors in parallel; 4. Shortening the path length; or 5. Operating at a higher system voltage (e.g., converting 120V to 240V, which cuts current in half for the same power, reducing drop by 75%)."
  },
  {
    "question": "Does a larger AWG number mean a larger wire size?",
    "answer": "No, American Wire Gauge (AWG) is an inverse logarithmic scale. A smaller AWG number represents a larger conductor diameter. For example, a 10 AWG wire is larger than a 12 AWG wire, and has lower resistance. The scale transitions to 'ought' sizes (1/0, 2/0, etc.) and then to circular mils (kcmil) for even larger cables."
  },
  {
    "question": "What is the difference between voltage drop and ampacity?",
    "answer": "Ampacity is the maximum current a wire can carry continuously without exceeding its insulation's temperature rating (a safety threshold to prevent fires). Voltage drop is the measure of electric potential lost along the wire. A wire might be safe to carry a load (sufficient ampacity) but still drop too much voltage over a long distance, causing equipment malfunction."
  },
  {
    "question": "Does conduit material affect AC voltage drop?",
    "answer": "Yes. Enclosing AC conductors in metallic/steel conduit introduces magnetic induction, which increases the wire's inductive reactance (X) and AC resistance. PVC and aluminum conduits are nonmagnetic, resulting in lower reactance and less voltage drop compared to steel conduit."
  },
  {
    "question": "Does temperature affect wire resistance and voltage drop?",
    "answer": "Yes. As a conductor's temperature increases, its metal atoms vibrate more rapidly, impeding electron flow and increasing resistance. Copper resistance increases by about 0.393% per °C rise, which is why standard voltage drop calculations (like NEC Chapter 9 Table 9) assume a warm conductor operating temperature of 75°C (167°F)."
  }
];

export default voltage_drop_calculatorFaqs;
