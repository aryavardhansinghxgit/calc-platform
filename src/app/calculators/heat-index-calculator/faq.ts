import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const heat_index_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "What is a heat index calculator?",
    answer:
      "A heat index calculator combines air temperature and relative humidity to estimate the apparent temperature associated with hot, humid conditions. The NWS heat-index method is designed to communicate how hot conditions may feel and the potential for heat stress.",
  },
  {
    question: "How do you calculate heat index?",
    answer:
      "The NWS procedure first calculates a simpler preliminary value. If the resulting conditions are below approximately 80°F, the simple procedure is used. Otherwise, the Rothfusz regression is applied together with any applicable low- or high-humidity correction.",
  },
  {
    question: "What is the heat index at 85°F and 70% humidity?",
    answer:
      "Using the NWS procedure, 85°F with 70% relative humidity produces a heat index of approximately 92.7°F. The actual air temperature remains 85°F.",
  },
  {
    question: "What is the NWS heat index formula?",
    answer:
      "The main NWS Rothfusz formula is a nine-term polynomial involving air temperature and relative humidity. It includes temperature-squared, humidity-squared and temperature-humidity interaction terms. The NWS also specifies a simpler procedure for conditions where the full regression is not appropriate.",
  },
  {
    question: "Is the heat index the actual temperature?",
    answer:
      "No. Heat index is an apparent-temperature measure. If the thermometer reads 85°F and the heat index is 95°F, the actual air temperature is still 85°F.",
  },
  {
    question: "Does humidity make it hotter?",
    answer:
      "Humidity can make hot weather feel more oppressive because it reduces the effectiveness of evaporative cooling. That is why heat index increases as humidity rises at a fixed temperature over the normal range of the index.",
  },
  {
    question: "What heat index is dangerous?",
    answer:
      "NWS commonly classifies approximately 103–124°F as the Danger range and 125°F or higher as Extreme Danger, although risk also depends on exposure duration and physical activity.",
  },
  {
    question: "Does direct sunlight change heat index?",
    answer:
      "Yes. NWS says heat-index values on standard charts are for shade and that direct sunlight can raise the heat index by up to about 15°F. This calculator presents +15°F as a conservative maximum-load estimate rather than claiming it is a universal fixed correction.",
  },
  {
    question: "What is the difference between heat index and feels-like temperature?",
    answer:
      "\"Feels-like temperature\" is a broad phrase that can describe several different apparent-temperature models. Heat Index specifically refers to the temperature-humidity relationship used for hot conditions.",
  },
  {
    question: "What is the difference between heat index and WBGT?",
    answer:
      "Heat Index primarily combines air temperature and humidity for shaded conditions. WBGT incorporates additional environmental factors such as radiant heat and wind and is more appropriate for detailed occupational heat assessment. OSHA recommends worksite WBGT assessment for workplace heat hazards.",
  },
  {
    question: "Can I calculate heat index from dew point?",
    answer:
      "Yes, when a valid dew point and air temperature are available, the corresponding moisture state can be determined and used for the heat-index calculation. The entered dew point must be physically consistent with the air temperature.",
  },
  {
    question: "What is heat index in Celsius?",
    answer:
      "Heat-index calculations can be displayed in Celsius by converting the Fahrenheit result. For example, a heat index of 92.7°F is approximately 33.7°C.",
  },
  {
    question: "Why does my heat index calculator give a different answer from another website?",
    answer:
      "Different results can come from different formulas, rounding, model domains, humidity corrections or whether the calculation is based on NWS Heat Index, another apparent-temperature model, or an unrestricted implementation of the Rothfusz polynomial. Always compare the underlying method before comparing numbers.",
  },
  {
    question: "Is a heat index of 100°F the same as an actual 100°F temperature?",
    answer:
      "No. A 100°F heat index can occur when the actual air temperature is substantially lower because humidity increases apparent heat. Heat index should therefore never be mistaken for the thermometer's actual reading.",
  },
  {
    question: "Can heat index predict heat stroke?",
    answer:
      "No. Heat index is an environmental screening indicator and cannot determine whether a particular person will develop heat stroke. OSHA notes that workplace heat risk also depends on workload, clothing/PPE, acclimatization and other environmental factors.",
  },
  {
    question: "What should workers do when the heat index is high?",
    answer:
      "Reduce unnecessary heat exposure, use appropriate rest and cooling practices, maintain hydration, and follow the employer's heat-safety program. For occupational settings, use appropriate site-specific heat assessment rather than relying only on a weather-service Heat Index.",
  },
];
