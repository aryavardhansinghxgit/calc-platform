import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const day_counter_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "How many days are between two dates?",
    answer: "Subtract the start date from the end date using the selected inclusive or exclusive convention. For example, September 14, 2026 to December 14, 2026 is 91 elapsed days when the end date is excluded."
  },
  {
    question: "Does the Day Counter include the end date?",
    answer: "It can. Turn on the Include end day option when you want both endpoint dates included. Otherwise, the calculator uses exclusive elapsed-day counting."
  },
  {
    question: "How are working days calculated?",
    answer: "Working days are determined from the selected workweek and then reduced by excluded holidays. Under the standard schedule, Monday through Friday are workdays and Saturday and Sunday are weekends."
  },
  {
    question: "Does the calculator exclude U.S. federal holidays?",
    answer: "Yes, when the federal-holiday exclusion option is enabled. The holiday engine generates dates for each year in the calculation rather than reusing one fixed year's calendar."
  },
  {
    question: "How are weekend federal holidays observed?",
    answer: "For most federal employees, a Saturday holiday is generally observed on Friday and a Sunday holiday on Monday. OPM provides the official holiday schedules and observation rules."
  },
  {
    question: "What happens if the start date is after the end date?",
    answer: "The calculator detects the reversed order, displays a warning, identifies the reordered calculation and provides a way to swap the dates."
  },
  {
    question: "How does the calculator handle leap years?",
    answer: "It uses the Gregorian leap-year rule, including the special rule for century years. Thus 2000 is a leap year, while 2100 is not."
  },
  {
    question: "Can I calculate 30, 60 or 90 days from a date?",
    answer: "Yes. Use the Add/Subtract mode to add or subtract a chosen number of calendar or business days, where supported."
  },
  {
    question: "How does business-day addition work?",
    answer: "The calculator advances through dates while skipping non-working days and excluded holidays according to the selected work schedule."
  },
  {
    question: "What is Conway's Doomsday Rule?",
    answer: "It is a mental-math algorithm for determining the weekday of a Gregorian date. The calculator implements the century anchor, year calculation and month-anchor steps."
  },
  {
    question: "What does Percent of Mean Gregorian Year mean?",
    answer: "It expresses the date interval as a percentage of a 365.2425-day mean Gregorian calendar year. A 91-day interval is approximately 24.91% of that mean year."
  },
  {
    question: "What is Actual/Actual ICMA?",
    answer: "Actual/Actual ICMA is a financial day-count convention associated with coupon-period calculations. It is different from Actual/Actual ISDA and other Actual/Actual variants."
  },
  {
    question: "What is Actual/Actual ISDA?",
    answer: "Actual/Actual ISDA uses a 366-day denominator for days falling in leap years and 365 for days falling in common years. It should not be treated as identical to Actual/Actual ICMA."
  },
  {
    question: "What is Actual/360?",
    answer: "Actual/360 uses the actual number of days divided by a 360-day denominator for the relevant accrual fraction."
  },
  {
    question: "What is 30/360?",
    answer: "30/360 is a group of financial day-count conventions. U.S. 30/360 and 30E/360 use different date-adjustment rules, so the exact convention needs to be specified."
  },
  {
    question: "Why do different date calculators show different results?",
    answer: "They may use different endpoint rules, workweeks, holiday calendars, observed-holiday rules, leap-year handling or financial conventions."
  },
  {
    question: "Are calendar days and working days the same?",
    answer: "No. Calendar days measure elapsed calendar time. Working days depend on the selected work schedule and excluded holidays."
  },
  {
    question: "Why does enabling holidays change my working-day total?",
    answer: "Because eligible weekdays that are recognized as excluded holidays are removed from the working-day count. For example, the benchmark has 65 weekdays and three applicable federal holidays, leaving 62 working days."
  },
  {
    question: "Can I use the Day Counter for a legal deadline?",
    answer: "You can use it to perform the arithmetic, but a legally significant deadline must follow the exact rule in the applicable law, contract, court rule or policy."
  },
  {
    question: "Can I save and share a Day Counter result?",
    answer: "Yes. Valid calculations can be stored in local browser history, copied as a summary, or shared through a generated URL. The calculator blocks invalid calculations from being saved."
  },
  {
    question: "Can I print the result as a PDF?",
    answer: "Yes. The current implementation includes a dedicated Print Report action designed to produce a clean report rather than printing the entire interactive interface."
  }
];

export default day_counter_calculatorFaqs;
