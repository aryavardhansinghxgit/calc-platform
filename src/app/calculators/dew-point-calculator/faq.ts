import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const dew_point_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "What is dew point?",
    answer:
      "Dew point is the temperature at which air reaches saturation and water vapor can begin to condense into liquid water under the relevant conditions. Higher dew points generally indicate more moisture in the air."
  },
  {
    question: "How do I calculate dew point?",
    answer:
      "Enter the air temperature and relative humidity into the calculator. The calculator estimates dew point using its selected Alduchov & Eskridge improved Magnus-form approximation for saturation vapor pressure."
  },
  {
    question: "What is the dew point if the temperature is 70°F and humidity is 65%?",
    answer:
      "Using the calculator's selected formulation, the dew point is approximately 57.7°F."
  },
  {
    question: "Is dew point the same as relative humidity?",
    answer:
      "No. Relative humidity describes how close the air is to saturation at its current temperature, while dew point is the temperature at which saturation would occur if the air were cooled."
  },
  {
    question: "Is a higher dew point more humid?",
    answer:
      "Generally, yes. A higher dew point indicates greater moisture content and typically corresponds to a more humid or muggy feeling."
  },
  {
    question: "What happens when the surface temperature reaches the dew point?",
    answer:
      "When a surface is cooled to the dew point of the surrounding air, the local air near the surface can reach saturation and condensation can occur."
  },
  {
    question: "What is wet-bulb temperature?",
    answer:
      "Wet-bulb temperature is an evaporative-cooling temperature related to temperature, humidity and atmospheric conditions. This calculator estimates it using the Stull (2011) empirical approximation developed for standard sea-level pressure."
  },
  {
    question: "How accurate is the Stull wet-bulb calculation?",
    answer:
      "Stull's published approximation is intended for approximately 5%–99% relative humidity and −20°C to 50°C, excluding some low-humidity/cold-temperature combinations. Within its stated valid range, the published errors are approximately −1°C to +0.65°C, with mean absolute error below 0.3°C."
  },
  {
    question: "What is frost point?",
    answer:
      "Frost point refers to conditions where water vapor can deposit as ice rather than condense as liquid water, which is particularly relevant below freezing."
  },
  {
    question: "Can dew point predict cloud formation?",
    answer:
      "Dew point can help describe atmospheric moisture and the temperature/dew-point spread can be used for approximate cloud-base estimation, but it does not by itself predict cloud formation or exact cloud ceilings."
  },
  {
    question: "Can dew point tell me whether condensation will form?",
    answer:
      "It can help assess condensation potential. The most important comparison for a surface is the surface temperature versus dew point. A surface at or below the dew point can be susceptible to condensation."
  },
  {
    question: "Is the 5°F coating margin an ISO 8502-4 requirement?",
    answer:
      "No. The calculator's 5°F surface-to-dew-point difference is a calculator-specific screening benchmark. ISO 8502-4:2017 provides guidance for estimating condensation probability before painting, but the calculator does not certify compliance with that standard."
  },
  {
    question: "Can I use this calculator for painting and coating work?",
    answer:
      "Yes, as a screening and decision-support tool for comparing surface temperature and dew point. However, professional coating work should also follow the coating manufacturer's requirements, project specifications, site measurements and applicable standards."
  },
  {
    question: "Why can two places with the same relative humidity have different dew points?",
    answer:
      "Because relative humidity depends on air temperature. Warmer air can contain substantially more water vapor before saturation, so two locations with the same RH can have different actual moisture levels and therefore different dew points."
  },
  {
    question: "Does dew point affect how hot the weather feels?",
    answer:
      "Yes. Higher dew points mean more moisture in the air and can make evaporation of sweat less effective, so warm conditions can feel more humid and uncomfortable."
  }
];
