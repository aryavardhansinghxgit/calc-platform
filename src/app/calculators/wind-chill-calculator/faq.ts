import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const wind_chill_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "What is a wind chill calculator?",
    answer: "A wind chill calculator combines air temperature and wind speed to estimate how cold the conditions may feel to exposed skin. The NWS wind-chill value is an exposure-oriented \"feels like\" index, not a separate physical air temperature."
  },
  {
    question: "What is the NWS wind chill formula?",
    answer: "For Fahrenheit, the NWS formula is: WCT = 35.74 + 0.6215T - 35.75(V^0.16) + 0.4275T(V^0.16), where T is temperature in °F and V is wind speed in mph. The NWS defines the formula for temperatures at or below 50°F and wind speeds above 3 mph."
  },
  {
    question: "What is the wind chill at 10°F and 20 mph?",
    answer: "Using the NWS/JAG-TI formula, the result is approximately −8.9°F. The calculator's production test suite independently verifies this exact reference case."
  },
  {
    question: "Can wind chill make water, pipes or a car engine colder than the actual air temperature?",
    answer: "No. Wind can increase the rate at which an object loses heat, but the object cannot be cooled below the surrounding air temperature solely because of wind chill. Environment Canada gives the same physical explanation."
  },
  {
    question: "Can you get frostbite when the air temperature is above freezing but wind chill is below freezing?",
    answer: "According to the NWS, frostbite requires the actual air temperature near the skin to be below freezing. A wind-chill number alone cannot make frostbite occur when the ambient air remains above freezing."
  },
  {
    question: "At what wind chill does frostbite become dangerous?",
    answer: "Risk increases as wind chill falls. Environment Canada classifies −28 to −39 as high risk, −40 to −47 as very high risk, −48 to −54 as severe risk and −55 or colder as extreme risk. Exposure times can become very short at the coldest values."
  },
  {
    question: "How long can exposed skin be outside in extreme wind chill?",
    answer: "There is no universally guaranteed safe duration. Published wind-chill guidance provides approximate exposure windows under specific conditions, but actual risk depends on clothing, exposed skin, wind, moisture, activity and individual factors. Seek shelter and protect exposed skin when conditions are hazardous."
  },
  {
    question: "Does running or cycling change wind chill?",
    answer: "Your forward movement can create additional airflow over the body. This is sometimes called relative wind or relative airflow. The calculator includes an optional activity/headwind model so you can evaluate conditions during movement, but that supplemental adjustment should not be confused with the core NWS meteorological formula."
  },
  {
    question: "What is the difference between wind chill and Steadman apparent temperature?",
    answer: "They are different apparent-temperature models. NWS wind chill focuses on cold-related heat loss from exposed skin, while Steadman's apparent-temperature framework incorporates temperature and atmospheric moisture. Because the models represent different physical relationships, they can produce different numbers for the same weather conditions."
  },
  {
    question: "Why does my wind chill result differ from another website?",
    answer: "The most common reasons are different formulas, unit conversions, weather inputs, wind measurement conventions or rounding. Always compare the model being used before comparing the numerical results. This calculator explicitly identifies the active model in its result and exports."
  },
  {
    question: "What are the early signs of frostbite and hypothermia?",
    answer: "Frostbite can cause numbness and skin that becomes pale, white or grayish-yellow and firm or waxy. Hypothermia can involve shivering, exhaustion, confusion, fumbling hands, drowsiness and slurred speech. Hypothermia is a medical emergency."
  },
  {
    question: "Is wind chill the same as a \"feels like\" temperature?",
    answer: "Not always. \"Feels like\" is a broad everyday description that can refer to several different apparent-temperature models. Wind chill specifically describes the effect of cold air and wind, while other apparent-temperature measures can incorporate variables such as humidity."
  }
];
