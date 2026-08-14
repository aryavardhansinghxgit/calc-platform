import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const heat_index_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "What is the Heat Index and how is it calculated?",
    answer: "The Heat Index (sometimes called the apparent temperature or 'humiture') is a measure of how hot it feels to the human body when relative humidity is combined with ambient air temperature. It is calculated using the National Weather Service (NWS) Rothfusz 9-term polynomial regression equation, which models human heat transfer and sweat evaporation."
  },
  {
    question: "Why does high humidity make hot weather feel much worse?",
    answer: "Your body cools itself primarily by evaporating sweat off your skin. When relative humidity is high, the surrounding air is already saturated with water vapor, slowing down sweat evaporation. As a result, metabolic heat remains trapped in your body, making it feel much hotter."
  },
  {
    question: "Is the Heat Index calculated for the shade or direct sun?",
    answer: "Official NWS Heat Index values assume shaded conditions with light wind speeds. Exposure to direct sunlight adds up to +15°F (+8.3°C) of radiant solar heat load to the calculated Heat Index value."
  },
  {
    question: "What Heat Index level is considered dangerous to human health?",
    answer: "NWS heat safety thresholds classify Heat Index values into four hazard levels: Caution (80°F–90°F: fatigue possible), Extreme Caution (91°F–103°F: heat cramps & heat exhaustion possible), Danger (104°F–124°F: heat cramps & exhaustion likely; heat stroke probable), and Extreme Danger (125°F+: heat stroke imminent)."
  },
  {
    question: "What is the difference between Heat Index and Wet-Bulb Globe Temperature (WBGT)?",
    answer: "Heat Index models apparent temperature in shaded conditions for general public weather advisories. Wet-Bulb Globe Temperature (WBGT) measures true environmental heat stress in direct sunlight by combining temperature, humidity, wind speed, and solar radiation angle (used heavily by OSHA, athletic associations, and the military)."
  },
  {
    question: "At what temperature does the Heat Index formula become active?",
    answer: "The standard NOAA/NWS Rothfusz Heat Index regression formula becomes active at air temperatures of 80°F (26.7°C) and above with relative humidity of 40% or higher. At temperatures below 80°F, a simplified Steadman baseline formula is used."
  },
  {
    question: "What is the difference between Heat Exhaustion and Heat Stroke?",
    answer: "Heat exhaustion causes heavy sweating, rapid pulse, dizziness, nausea, and cool/clammy skin, requiring rest in the shade and hydration. Heat stroke is a life-threatening medical emergency where body temperature exceeds 104°F (40°C), accompanied by hot/dry skin or profuse sweating, confusion, and loss of consciousness, requiring immediate emergency medical care."
  },
  {
    question: "Can heat index be calculated using Dew Point instead of Relative Humidity?",
    answer: "Yes. Dew Point directly measures the absolute moisture content of the air. Using the Magnus-Tetens approximation, Dew Point and air temperature can be converted to Relative Humidity, which is then fed into the Heat Index regression equation."
  },
  {
    question: "How much water should I drink during high heat index conditions?",
    answer: "OSHA guidelines recommend drinking about 1 cup (250 ml) of cold water every 20 minutes during moderate outdoor physical labor in high Heat Index conditions, rather than drinking large quantities all at once."
  },
  {
    question: "Why does a breeze or fan help lower heat stress?",
    answer: "A breeze increases forced convective air movement across your skin, which accelerates the rate of sweat evaporation and strips away your warm thermal boundary layer, provided ambient air temperature remains below extreme body threshold levels."
  }
];
