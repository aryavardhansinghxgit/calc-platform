import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const age_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "How do I calculate my exact age?",
    answer:
      "Enter your date of birth and the date on which you want to measure your age. The calculator returns your chronological age in completed years, remaining months and remaining days, using the calendar rules configured for the calculation.",
  },
  {
    question: "How does the age calculator calculate years, months and days?",
    answer:
      "It uses calendar arithmetic rather than dividing total days by 365. The engine determines complete years, then complete months, then the remaining days, borrowing the actual length of the relevant previous month when necessary.",
  },
  {
    question: "Can I calculate my age on a past or future date?",
    answer:
      "Yes. Change the target or assessment date to any valid past or future date. This is useful for historical ages, future birthday calculations, application cut-off dates and milestone planning.",
  },
  {
    question: "Why is my age in years, months and days different from my total days?",
    answer:
      "They are two representations of the same interval. Years, months and days preserve calendar structure, while total days express the entire span as one unit. Because months have different lengths and leap years add days, total days cannot be reconstructed by multiplying years by a single fixed number of days.",
  },
  {
    question: "How does the calculator handle leap years and February 29 birthdays?",
    answer:
      "It uses the Gregorian leap-year rule and provides a selectable convention for February 29 birthdays in non-leap years. You can choose a February 28 or March 1 convention, and the selected setting affects the relevant age and birthday calculations.",
  },
  {
    question: "What is the difference between sequential and end-of-month age calculation?",
    answer:
      "Sequential mode follows the normal calendar borrowing process. End-of-Month Anchor mode can treat two month-end dates as a full month even when their numerical day-of-month values differ, such as January 31 to February 28. The setting exists because month-based date intervals are not uniquely defined without a convention.",
  },
  {
    question: "How many days have I been alive?",
    answer:
      "Enter your birth date and target date. The calculator reports the total elapsed days under its selected day-counting convention and also converts that total into hours, minutes and seconds.",
  },
  {
    question: "Does the age calculator count business days?",
    answer:
      "Yes. The current model separates Monday-Friday weekdays from Saturday-Sunday weekend days. It does not automatically remove public holidays unless the implementation explicitly provides a holiday calendar, so a business-day result should not be treated as an organization's official working-day count.",
  },
  {
    question: "How is my next birthday calculated?",
    answer:
      "The calculator finds the next occurrence of your birth month and day after the selected target date, then counts the calendar days until that date. It also reports the weekday and turning age associated with that birthday.",
  },
  {
    question: "What is traditional Korean age?",
    answer:
      "Traditional Korean age is a historical and cultural counting convention in which a newborn is treated as one at birth and the count increases on January 1. South Korea standardized international age for general legal and administrative use in 2023, so traditional Korean age should not be treated as the current general legal age system.",
  },
  {
    question: "What is my age on Mars or another planet?",
    answer:
      "Planetary age is a unit-conversion exercise. The calculator divides your elapsed Earth days by the selected planet's orbital period, showing how many orbital periods of that planet have passed. It is not a biological, legal or medical age.",
  },
  {
    question: "Can I use an age calculator for legal, tax, pension or license eligibility?",
    answer:
      "You can use it to determine chronological age on a specified date, but the calculator does not determine legal or tax eligibility. Age-based rules vary by jurisdiction, program and account type. For example, IRS rules for retirement-account distributions have specific conditions and exceptions around age 59½.",
  },
];
