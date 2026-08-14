import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const wind_chill_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "Can wind chill freeze water pipes or car engines below the actual air temperature?",
    answer: "No. Wind chill accelerates the rate of heat loss from an object toward the ambient air temperature, but it cannot cool an inanimate object (such as water pipes, car radiators, or fuel lines) below the actual thermometer reading of the air."
  },
  {
    question: "What is the formula used by the National Weather Service (NWS) to calculate wind chill?",
    answer: "The official Joint Action Group for Temperature Indices (JAG/TI) formula used by the NWS and Environment Canada is: Wind Chill (°F) = 35.74 + 0.6215T - 35.75(V^0.16) + 0.4275T(V^0.16), where T is air temperature in °F and V is wind speed in mph at 10 meters height."
  },
  {
    question: "At what wind chill temperature does frostbite become dangerous?",
    answer: "Frostbite becomes an immediate hazard when wind chill temperatures drop below -18°F (-28°C). At -19°F to -32°F, exposed skin can freeze in 30 minutes. Below -33°F (-36°C), frostbite can occur in 10 minutes, and below -50°F (-45°C), frostbite can occur in 5 minutes or less."
  },
  {
    question: "Why does wind make cold air feel significantly colder?",
    answer: "Your body naturally heats a thin microscopic layer of air trapped against your skin (the thermal boundary layer). Wind strips away this insulating layer through forced convective heat transfer, forcing your body to constantly expend energy heating fresh cold air."
  },
  {
    question: "Why does the standard wind chill formula only apply below 50°F (10°C)?",
    answer: "At temperatures above 50°F (10°C) and light wind speeds, the biophysical heat exchange dynamics between human skin and ambient air change significantly. Heat stress and humidity become dominant, making the Heat Index or Steadman Apparent Temperature formula more appropriate."
  },
  {
    question: "Does wind chill affect pets and animals the same way as humans?",
    answer: "Yes. While animals with thick fur coats benefit from an extra insulating layer, exposed tissue such as dog paws, ears, noses, and bellies lose heat rapidly and are vulnerable to frostbite and hypothermia under severe wind chill conditions."
  },
  {
    question: "What is the difference between Wind Chill and 'Feels Like' or 'RealFeel' temperature?",
    answer: "Wind Chill specifically measures convective heat loss caused by wind speed at cold temperatures (below 50°F). Proprietary 'Feels Like' or 'RealFeel' metrics combine wind chill with relative humidity, direct solar radiation, elevation, and heat index."
  },
  {
    question: "How does running or cycling in winter change the wind chill?",
    answer: "When you run or cycle, your forward movement creates a relative headwind that adds to the environmental wind speed. For example, cycling at 20 mph into a 10 mph wind creates an effective 30 mph airflow across your body, dramatically lowering your effective wind chill temperature."
  },
  {
    question: "Why was the wind chill index updated in 2001?",
    answer: "The original 1945 Siple-Passel wind chill formula was based on measuring how fast water froze in plastic cylinders in Antarctica, which overstated human cold perception. In 2001, NOAA and Environment Canada updated the formula using modern facial skin heat transfer models and clinical wind tunnel testing."
  },
  {
    question: "What are the early warning signs of frostbite and hypothermia?",
    answer: "Early signs of frostbite include skin redness, tingling, numbness, and pale/waxy skin texture (frostnip). Early signs of hypothermia include uncontrollable shivering, slurred speech, loss of fine motor coordination, and mental confusion."
  }
];
