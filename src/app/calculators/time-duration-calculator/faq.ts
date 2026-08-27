import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const time_duration_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "How do you calculate the exact duration between two times?",
    answer: "Convert both timestamps to 24-hour military notation (00:00:00 to 23:59:59). If the starting minutes or seconds exceed the ending values, borrow 60 units from the preceding column using sexagesimal base-60 borrowing, subtract the starting time from the ending time, and normalize the result into hours, minutes, and seconds.",
  },
  {
    question: "How does this calculator handle overnight durations that cross midnight?",
    answer: "When an ending time is numerically smaller than the starting time on the same clock (e.g., 10:00 PM to 2:00 AM), the calculator recognizes a midnight rollover and adds 24 hours (86,400 seconds) to the ending time before subtracting, producing the correct positive duration of 4 hours.",
  },
  {
    question: "What is the difference between decimal hours and clock hours with minutes?",
    answer: "Clock notation uses base-60 sexagesimal minutes and seconds, while decimal hours represent time as a base-10 fraction. For example, 5.50 decimal hours equals 5 hours and 30 minutes (0.50 × 60 = 30), whereas 5.30 decimal hours equals 5 hours and 18 minutes.",
  },
  {
    question: "How do you add multiple separate time intervals together?",
    answer: "Convert each time interval into total seconds using (Hours × 3,600) + (Minutes × 60) + Seconds, sum all seconds across all segments, and convert the total cumulative seconds back into normalized hours, minutes, and seconds by dividing by 3,600 and 60.",
  },
  {
    question: "How does cross-date duration calculate intervals across leap years and month boundaries?",
    answer: "Cross-Date mode uses exact UTC calendar timestamps based on Gregorian calendar rules. It accurately accounts for differing month lengths (28, 29, 30, or 31 days) and recognizes leap years (such as 2024 and 2028 where February has 29 days) without relying on fixed 30-day month approximations.",
  },
  {
    question: "Why is the second used as the base unit for time duration calculations?",
    answer: "The International Bureau of Weights and Measures (BIPM) and NIST define the second (s) as the fundamental SI base unit of time. All standard time units are integer multiples of the second: 1 minute = 60 s, 1 hour = 3,600 s, and 1 solar day = 86,400 s.",
  },
];
