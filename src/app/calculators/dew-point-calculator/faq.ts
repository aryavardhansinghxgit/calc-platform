import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const dew_point_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "What is the dew point and what does it tell you?",
    answer: "The dew point is the exact temperature to which air must be cooled (at constant barometric pressure) to become fully saturated with water vapor (100% relative humidity). When the air cools below its dew point, excess moisture condenses into liquid water droplets, forming dew, fog, or precipitation."
  },
  {
    question: "Why is dew point a better measure of humidity than relative humidity?",
    answer: "Relative humidity fluctuates constantly with temperature changes throughout the day, even if the actual amount of moisture in the air stays identical. Dew point is an absolute measure of actual moisture mass, providing a consistent benchmark for human comfort, weather forecasting, and building science."
  },
  {
    question: "What dew point temperature feels uncomfortable or 'muggy' to humans?",
    answer: "On the human comfort scale: below 55°F (13°C) feels dry and comfortable; 55°F–59°F (13°C–15°C) is pleasant; 60°F–64°F (16°C–18°C) feels noticeably humid ('sticky'); 65°F–69°F (18°C–21°C) feels muggy and oppressive; and 70°F+ (21°C+) causes severe heat stress."
  },
  {
    question: "What happens when the air temperature and dew point are equal?",
    answer: "When air temperature and dew point are equal, relative humidity reaches 100%. The air is completely saturated with moisture, and condensation begins immediately, creating fog, heavy dew, or clouds."
  },
  {
    question: "Can the dew point ever be higher than the air temperature?",
    answer: "No. Under normal atmospheric conditions, the dew point cannot exceed the ambient air temperature. If air cools down to the dew point, relative humidity reaches 100% and any additional cooling forces liquid moisture to condense out of the air."
  },
  {
    question: "What is the difference between Dew Point and Wet-Bulb Temperature?",
    answer: "Dew Point is the temperature where current air reaches 100% saturation without changing pressure. Wet-Bulb Temperature is the lowest temperature achievable solely through evaporative cooling of a moist wick in moving air."
  },
  {
    question: "How do you estimate cloud base altitude using dew point?",
    answer: "In aviation meteorology, cumulus cloud base altitude (in feet) is estimated using the spread between air temperature and dew point in °F: Cloud Base (ft) ≈ [(Air Temp °F - Dew Point °F) / 4.4] × 1,000."
  },
  {
    question: "Why does condensation form on cold drink glasses or basement walls?",
    answer: "When warm, moist room air comes into contact with a cold glass or basement wall, the surface cools the adjacent air below its local dew point temperature, forcing water vapor out of the gas phase into liquid droplets."
  },
  {
    question: "What is the difference between Dew Point and Frost Point?",
    answer: "Dew Point is the saturation temperature for liquid water droplets. When saturation occurs at temperatures below freezing (32°F / 0°C), moisture desublimates directly from vapor into ice crystals, known as the Frost Point."
  },
  {
    question: "Why must steel temperature be 5°F above dew point before painting?",
    answer: "Under ISO 8502-4 standards, steel substrate temperature must be at least 5°F (3°C) warmer than the dew point before applying industrial paints or epoxies. Otherwise, invisible microscopic condensation forms on the metal, causing coating adhesion failure, flash rusting, and blistering."
  }
];
