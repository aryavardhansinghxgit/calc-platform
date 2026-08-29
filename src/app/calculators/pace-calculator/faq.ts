import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const pace_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "What is a pace calculator?",
    answer:
      "A pace calculator determines the amount of time required to cover a unit of distance, usually in minutes per kilometer or minutes per mile. It can also work backward to calculate finish time or distance when the other two values are known."
  },
  {
    question: "How do I calculate my running pace?",
    answer:
      "Divide your total running time by the distance covered: Pace = Time / Distance. For example, 25 minutes over 5 km equals 5:00/km."
  },
  {
    question: "How do I calculate pace per mile from pace per kilometer?",
    answer:
      "Convert the pace to seconds and multiply by 1.609344 because one mile is exactly 1.609344 kilometers. A 5:00/km pace (300 seconds) multiplied by 1.609344 equals 482.8 seconds, or approximately 8:03/mile."
  },
  {
    question: "What pace is needed to run a 5K in 25 minutes?",
    answer:
      "A 25-minute 5K requires an average pace of 25 / 5 = 5:00/km, which corresponds to approximately 8:03/mile or a running speed of 12.00 km/h (7.46 mph)."
  },
  {
    question: "What is the difference between pace and speed?",
    answer:
      "Pace measures time per distance, such as 5:00/km. Speed measures distance per time, such as 12 km/h. A faster performance means a lower pace but a higher speed."
  },
  {
    question: "How do I calculate finish time from pace?",
    answer:
      "Multiply your distance by your pace: Time = Distance × Pace. For example, 10 km at a 5:00/km pace equals 50 minutes."
  },
  {
    question: "How do I calculate distance from pace and time?",
    answer:
      "Divide total elapsed time by pace: Distance = Time / Pace. For example, 60 minutes at a 5:00/km pace gives 60 / 5 = 12 km."
  },
  {
    question: "Can I calculate cycling pace with this calculator?",
    answer:
      "Yes. The underlying mathematics applies to any activity where distance and elapsed time are meaningful. The page is primarily designed around running and athletic performance, but pace, speed and distance relationships are mathematically general."
  },
  {
    question: "What is a negative split?",
    answer:
      "A negative split means completing the second part of a race faster than the first part. Segment splits can help you identify whether your pace was even, progressive, or declining during a run."
  },
  {
    question: "Why is the average pace different from the average of my split paces?",
    answer:
      "Because the correct overall pace is Total Time / Total Distance. An arithmetic average of split paces is only reliable under specific equal-distance conditions. Unequal segment distances require a distance-weighted calculation."
  },
  {
    question: "What is Riegel's formula?",
    answer:
      "Riegel's formula is an empirical race-performance model that estimates a time at one distance from a known time at another distance: T2 = T1 × (D2 / D1)^1.06. Peter Riegel published the underlying endurance work in American Scientist in 1981."
  },
  {
    question: "How accurate is a Riegel race prediction?",
    answer:
      "It is best treated as an estimate rather than a guarantee. Individual endurance, training, weather, terrain, pacing, fueling and race experience can make actual performance substantially different from the model."
  },
  {
    question: "Can a 5K time predict a marathon time?",
    answer:
      "A 5K can be used as a mathematical baseline for a model-based marathon estimate, but the prediction becomes less certain as the target distance becomes much longer than the baseline race. Marathon performance depends heavily on endurance-specific preparation."
  },
  {
    question: "What is the 220 minus age heart-rate formula?",
    answer:
      "It is a commonly used age-based estimate: HRmax = 220 - Age. It is a prediction equation, not a direct clinical measurement of maximum heart rate."
  },
  {
    question: "What is the Tanaka heart-rate formula?",
    answer:
      "The Tanaka equation estimates HRmax = 208 - 0.7 × Age. It was developed as an alternative to the older 220-minus-age relationship. Studies show that age-based equations have individual prediction error, so neither should be treated as an exact personal maximum."
  },
  {
    question: "What are the five heart-rate training zones?",
    answer:
      "This calculator displays five percentage-based zones ranging from approximately 50–60% of estimated maximum heart rate through 90–100%. For example, using a 190 bpm estimated maximum (Age 30): Zone 1 is 95–114 bpm, Zone 2 is 114–133 bpm, Zone 3 is 133–152 bpm, Zone 4 is 152–171 bpm, and Zone 5 is 171–190 bpm."
  },
  {
    question: "Should I run exactly at the pace calculated?",
    answer:
      "Not necessarily. A calculated pace is a mathematical reference. Actual training pace should account for workout purpose, terrain, weather, fatigue, recovery and perceived effort."
  },
  {
    question: "Why is my pace slower on hot or hilly days?",
    answer:
      "Environmental conditions and terrain increase physiological effort even when your running mechanics and intended workout remain similar. In those situations, pace may need to be adjusted rather than forcing the same numerical target."
  },
  {
    question: "Can this calculator tell me whether I am fit enough to run a marathon?",
    answer:
      "No calculator can determine marathon readiness from one pace number alone. A race prediction can provide a benchmark, but marathon readiness also depends on training volume, long-run development, recovery, fueling and race-specific preparation."
  },
  {
    question: "Are the heart-rate zones medical recommendations?",
    answer:
      "No. The heart-rate zones are age-based training estimates. They should not be treated as medical measurements or individualized medical advice. Age-predicted maximum-heart-rate formulas have meaningful individual error, so people with medical concerns should rely on appropriate professional guidance rather than a generic formula."
  }
];
