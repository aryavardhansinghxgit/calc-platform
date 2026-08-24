import { CalculatorFAQ } from "@/calculators/types";

export const date_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "How do I calculate the number of days between two dates?",
    answer:
      "Enter the start and end dates in the Days Between Two Dates mode. The calculator computes the elapsed calendar-day interval using its configured inclusive or exclusive counting convention and then shows related units such as weeks, hours, minutes and seconds.",
  },
  {
    question: "What is the difference between inclusive and exclusive date counting?",
    answer:
      "Exclusive counting measures the elapsed interval between dates, so January 1 to January 2 is one day. Inclusive counting includes both boundary dates, so the same range contains two counted dates. Use the convention required by the situation you are modeling.",
  },
  {
    question: "How does the Date Calculator handle leap years?",
    answer:
      "It follows Gregorian leap-year rules: years divisible by 4 are leap years except century years not divisible by 400. Thus 2000 is a leap year, while 1900 and 2100 are not.",
  },
  {
    question: "What happens when I add one month to a date such as January 31?",
    answer:
      "The calculator uses month-end clamping. January 31 plus one month becomes February 28 in a standard year or February 29 in a leap year because February does not have a 31st day.",
  },
  {
    question: "How do I add or subtract days, weeks, months, or years from a date?",
    answer:
      "Use the Add or Subtract from a Date mode, enter the calendar units and choose Add or Subtract. Days and weeks are calendar-based, while month and year arithmetic follows the calculator's calendar-aware month-end and leap-year rules.",
  },
  {
    question: "How are business days calculated?",
    answer:
      "The calculator evaluates each calendar day in the selected range and excludes configured weekend days and selected holidays. The exact result depends on the start date, end date, counting convention, holiday set and workweek settings.",
  },
  {
    question: "Are weekends excluded from business-day calculations?",
    answer:
      "Yes, under the business-day mode, configured weekend days are excluded from the working-day count. The calculator also supports custom weekend schedules when enabled, so the excluded weekdays need not always be Saturday and Sunday.",
  },
  {
    question: "Are U.S. federal holidays excluded from business-day calculations?",
    answer:
      "When the U.S. holiday setting is enabled, the calculator excludes the federal holiday dates represented by its configured holiday table. Federal observation rules can differ from private employer calendars, so confirm the schedule that applies to your situation.",
  },
  {
    question: "How does the calculator handle floating holidays such as Memorial Day?",
    answer:
      "Floating holidays are generated from calendar rules rather than fixed dates. For example, Memorial Day is the last Monday in May and Labor Day is the first Monday in September. This lets the holiday calculation update correctly as the year changes.",
  },
  {
    question: "Can I calculate a date using a custom weekend schedule?",
    answer:
      "Yes, the business-day model supports custom weekend configurations. Select the weekend pattern that matches the calendar you are modeling, then verify the result against the actual organization or policy when the date has operational or contractual consequences.",
  },
  {
    question: "Why can my result differ when I include the start or end date?",
    answer:
      "Including a boundary day changes the counting convention. A one-day elapsed interval can become two counted calendar dates when both endpoints are included. Check the Include End Day setting before comparing a result with a hand calculation.",
  },
  {
    question: "Why can a hand-calculated date differ from the calculator?",
    answer:
      "Common causes include treating every month as 30 days, ignoring leap years, using the wrong inclusive/exclusive convention, missing a holiday, or applying a different weekend schedule. The calculator uses calendar-aware rules, so a manual shortcut may produce a different result.",
  },
];
