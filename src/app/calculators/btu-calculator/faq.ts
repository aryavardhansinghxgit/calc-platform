import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const btu_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "What is a BTU and what does BTU/hr mean in air conditioning?",
    answer: "A British Thermal Unit (BTU) is defined by NIST as the heat energy required to raise the temperature of one pound of water by 1°F. In HVAC engineering, BTU per hour (BTU/hr) expresses the rate of heat extraction for cooling or heat injection for heating."
  },
  {
    question: "How many BTUs equal 1 refrigeration ton of AC capacity?",
    answer: "One ton of refrigeration equals exactly 12,000 BTU/hr of heat removal capacity (equivalent to ~3.517 kW). For example, an 18,000 BTU/hr system represents 1.5 tons, and a 24,000 BTU/hr system represents 2.0 tons."
  },
  {
    question: "How do you convert cooling BTU/hr to kilowatts (kW)?",
    answer: "Thermal cooling capacity is converted using the relation 1 kW = 3,412.142 BTU/hr (or kW = BTU/hr ÷ 3,412.142). For example, 8,750 BTU/hr equals approximately 2.56 kW of thermal cooling power. Note that thermal cooling kW is distinct from the electrical power drawn by the unit."
  },
  {
    question: "How many BTUs are needed for a 300 square foot room?",
    answer: "Under baseline ENERGY STAR conditions with standard 8-foot ceilings, a 300 sq ft room requires approximately 8,000 BTU/hr. If the room has 9-foot ceilings, an additional 750 BTU/hr is added, yielding 8,750 BTU/hr (~0.75 ton)."
  },
  {
    question: "Why does ceiling height increase cooling load requirements?",
    answer: "Higher ceilings enclose a greater volume of air that must be conditioned and circulated, and increase exterior wall surface area exposed to outdoor ambient temperatures, increasing total thermal load beyond pure floor area."
  },
  {
    question: "Why should AC sizing not be chosen from square footage alone?",
    answer: "Square footage captures only floor footprint. Comprehensive HVAC sizing must account for window dimensions, solar exposure, insulation R-values, air infiltration, ceiling height, occupant count, internal appliance heat gains, and local outdoor summer design temperatures."
  },
  {
    question: "What happens if an air conditioner is oversized or undersized?",
    answer: "An undersized AC runs continuously without reaching setpoint on peak days, leading to high electric bills and premature compressor fatigue. An oversized AC cools the room too fast ('short-cycling') and shuts down before dehumidifying, leaving indoor air clammy and prone to mold."
  },
  {
    question: "How does a higher SEER rating lower AC electricity costs?",
    answer: "Seasonal Energy Efficiency Ratio (SEER) measures total cooling output in BTUs divided by total electrical energy input in Watt-hours over a cooling season. Higher SEER draws fewer watts for the same cooling output: upgrading from SEER 10 to SEER 20 reduces electricity consumption by exactly 50%."
  },
  {
    question: "What is AFUE and how does it affect heating calculations?",
    answer: "Annual Fuel Utilization Efficiency (AFUE) measures the percentage of combustion fuel converted into usable space heat. At a standard 85% AFUE, a 70,200 BTU/hr heating load consumes approximately 0.826 therms of natural gas per hour or 0.903 gallons of propane per hour."
  },
  {
    question: "How does this BTU calculator differ from a formal ACCA Manual J load calculation?",
    answer: "This calculator provides rapid planning estimates using room dimensions, ceiling height, insulation quality, sun exposure, and design temperature differentials. ACCA Manual J is a detailed engineering procedure that evaluates duct heat loss, window solar heat gain coefficients (SHGC), orientation azimuths, and construction assembly U-values for code compliance and final equipment purchase."
  }
];
