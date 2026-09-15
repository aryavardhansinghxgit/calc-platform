import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const day_of_the_week_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "What day of the week was I born?",
    answer: "Enter your birth date into the Day of the Week Calculator. It returns the corresponding weekday and can also show the day of year, ISO week and leap-year status."
  },
  {
    question: "How does a day-of-the-week calculator work?",
    answer: "It uses calendar arithmetic to map a valid date to one of seven weekdays. This calculator uses Zeller's Congruence for its Gregorian weekday calculation and exposes the mathematical steps."
  },
  {
    question: "What is Zeller's Congruence?",
    answer: "Zeller's Congruence is a modular-arithmetic formula for calculating the weekday of a calendar date. January and February are treated as months 13 and 14 of the preceding year in the standard formulation."
  },
  {
    question: "What day was July 20, 1969?",
    answer: "July 20, 1969 was Sunday. The date is also available as an Apollo 11 preset in the calculator."
  },
  {
    question: "What day was July 4, 1776?",
    answer: "July 4, 1776 was Thursday under the Gregorian calculation used by the calculator."
  },
  {
    question: "What day was January 1, 2000?",
    answer: "January 1, 2000 was Saturday."
  },
  {
    question: "What is an ISO week number?",
    answer: "An ISO week number identifies a date's week under ISO 8601 week-date rules. ISO weeks start on Monday and Week 1 is the week containing the first Thursday."
  },
  {
    question: "Why can January 1 belong to the previous ISO year?",
    answer: "Because ISO week numbering is based on Monday-to-Sunday weeks and the week containing the year's first Thursday. Therefore, the first days of January can fall in the final ISO week of the previous year."
  },
  {
    question: "What is the day of the year?",
    answer: "It is the ordinal position of a date within its calendar year. January 1 is Day 1; December 31 is Day 365 in a common year and Day 366 in a leap year."
  },
  {
    question: "How many days are left in the year?",
    answer: "This calculator defines days remaining as the number of days after the selected date. For September 15, 2026, Day 258 of 365 leaves 107 days remaining."
  },
  {
    question: "Does changing the first day of the week change the answer?",
    answer: "No. Sunday-start or Monday-start only changes the arrangement of the calendar grid. The calculated weekday stays the same."
  },
  {
    question: "What is the difference between Gregorian and Julian calendars?",
    answer: "They are different calendar systems with different leap-year rules. Gregorian uses century exceptions; the Julian system treats every fourth year as a leap year."
  },
  {
    question: "What is a proleptic Julian calendar?",
    answer: "It applies Julian calendar rules mathematically to dates regardless of whether that calendar was historically used in that place and period. This calculator explicitly labels the mode as proleptic Julian."
  },
  {
    question: "Why does the Julian result differ from the Gregorian result?",
    answer: "Because the two calendar systems use different rules for leap years and calendar dates. For September 15, 2026, this calculator gives Tuesday in Gregorian mode and Monday in proleptic Julian mode."
  },
  {
    question: "Can the calculator handle leap years?",
    answer: "Yes. It correctly handles Gregorian leap-year rules, including the special century cases such as 2000 and 2100."
  },
  {
    question: "Can I enter historical dates?",
    answer: "Yes, within the supported year range of 1–9999. Historical results should be interpreted with the selected calendar system in mind."
  },
  {
    question: "What happens if I enter an invalid date?",
    answer: "The calculator rejects impossible dates such as February 30 rather than silently normalizing them. An accessible validation message is shown."
  },
  {
    question: "Can I calculate many dates at once?",
    answer: "Yes. The Batch Multi-Date Parser accepts multiple dates and returns the calculated results for valid entries."
  },
  {
    question: "Can I save a weekday calculation?",
    answer: "Yes. Valid calculations can be stored in the browser's local history. Invalid dates cannot be saved."
  },
  {
    question: "Can I share a calculation?",
    answer: "Yes. The share state includes the relevant date and calendar parameters so the recipient can reproduce the calculation."
  },
  {
    question: "Can I export the result to CSV?",
    answer: "Yes. CSV export is implemented for both single-date and batch results."
  },
  {
    question: "Can I print or save the result as a PDF?",
    answer: "Yes. The calculator uses a dedicated print report designed to keep the calculation separate from the interactive webpage interface."
  },
  {
    question: "Is the day-of-week calculation done in my browser?",
    answer: "The post-fix audit verified client-side calculation with no external outbound requests during testing."
  },
  {
    question: "Why do two weekday calculators sometimes disagree?",
    answer: "They may use different calendar systems, date conventions, historical interpretations, or algorithms. Always check whether both tools are using Gregorian, Julian or another calendar framework."
  }
];

export default day_of_the_week_calculatorFaqs;
