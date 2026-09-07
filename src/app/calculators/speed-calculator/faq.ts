import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const speed_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "How do I calculate speed from distance and time?",
    answer: "Divide distance by elapsed time: v = d / t. For example, 100 miles in 1.5 hours gives 66.67 mph."
  },
  {
    question: "How do I calculate distance from speed and time?",
    answer: "Multiply speed by time: d = v × t. For example, traveling at 60 mph for 2 hours gives 120 miles."
  },
  {
    question: "How do I calculate travel time?",
    answer: "Divide distance by speed: t = d / v. For example, 250 km at 100 km/h takes 2.5 hours, or 2 hours 30 minutes."
  },
  {
    question: "What is the difference between speed and velocity?",
    answer: "Speed is a scalar magnitude. Velocity includes both magnitude and direction. A distance/time calculator can determine speed but cannot determine a complete velocity vector without directional information."
  },
  {
    question: "How do I convert mph to km/h?",
    answer: "Multiply mph by 1.609344: km/h = mph × 1.609344. Therefore 60 mph is 96.56064 km/h."
  },
  {
    question: "How do I convert mph to m/s?",
    answer: "Multiply mph by 0.44704: m/s = mph × 0.44704. Therefore 1 mph equals 0.44704 m/s."
  },
  {
    question: "How do I convert km/h to m/s?",
    answer: "Divide km/h by 3.6: m/s = km/h ÷ 3.6. Therefore 72 km/h equals 20 m/s."
  },
  {
    question: "What is the difference between speed and pace?",
    answer: "Speed describes distance covered per unit time. Pace describes time required to cover a unit distance. For example, a runner can be described as moving at 12 km/h or maintaining a pace of 5:00 min/km."
  },
  {
    question: "How do I calculate running pace?",
    answer: "Divide total time by total distance. For a 5 km run completed in 24:30: 24.5 minutes / 5 = 4.9 minutes/km = 4:54/km."
  },
  {
    question: "What is average speed for multiple trips or segments?",
    answer: "For a general multi-segment trip: Average Speed = Total Distance / Total Time, or s_avg = Σd / Σt. This accounts for the actual distance and time of each segment."
  },
  {
    question: "Is average trip speed the same as harmonic mean?",
    answer: "Not in general. The harmonic mean can apply to special rate-averaging cases, especially equal-distance segments. For a general journey, overall average speed is total distance divided by total elapsed time."
  },
  {
    question: "What is a good way to calculate 5K pace?",
    answer: "Divide the total 5K finishing time by 5 to obtain minutes per kilometer. For 24:30: 24:30 / 5 = 4:54 per kilometer. The equivalent pace is approximately 7:53 per mile."
  }
];
