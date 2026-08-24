import { CalculatorFAQ } from "@/calculators/types";

export const hours_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "How do I calculate hours between two times?",
    answer:
      "Enter the start and end times and the calculator determines the elapsed duration after applying its rollover and break rules. The result can be viewed in hours, minutes, seconds and decimal hours.",
  },
  {
    question: "How do I calculate hours between two dates?",
    answer:
      "Use the Hours Between Two Dates mode and enter the full start and end timestamps. The calculator measures the elapsed multi-day duration and converts it into hours, minutes and seconds.",
  },
  {
    question: "How do I convert minutes into decimal hours?",
    answer:
      "Divide minutes by 60. For example, 30 minutes is 0.50 hours, 45 minutes is 0.75 hours, and 18 minutes is 0.30 hours.",
  },
  {
    question: "How do I convert decimal hours into hours and minutes?",
    answer:
      "Take the decimal fraction and multiply it by 60. For example, 8.30 decimal hours equals 8 hours and 18 minutes because 0.30 × 60 = 18.",
  },
  {
    question: "How does the calculator handle overnight shifts?",
    answer:
      "If the end time occurs on the following day, the calculator applies a 24-hour rollover so the duration remains positive. For example, 10:15 PM to 6:45 AM is 8 hours and 30 minutes before any break deduction.",
  },
  {
    question: "How are unpaid breaks deducted?",
    answer:
      "The entered unpaid break duration is subtracted from the raw elapsed shift time before paid hours are reported. A 9-hour shift with a 30-minute break therefore becomes 8.5 paid hours.",
  },
  {
    question: "How does the timecard overtime calculator work?",
    answer:
      "The Time Card & Overtime Solver separates the total worked time into regular and overtime hours using the configured daily threshold and multiplier. It then calculates the corresponding regular and overtime earnings from the entered hourly wage.",
  },
  {
    question: "How are regular and overtime earnings calculated?",
    answer:
      "Regular earnings equal regular hours multiplied by the base hourly wage. Modeled overtime earnings equal overtime hours multiplied by the base wage and the selected overtime multiplier. Total gross earnings are the sum of those two amounts.",
  },
  {
    question: "What happens if the end time is earlier than the start time?",
    answer:
      "In an overnight scenario, the calculator treats the end as occurring on the following date rather than returning a negative duration. The exact behavior should be interpreted according to the selected mode and entered dates.",
  },
  {
    question: "How does the calculator handle 12-hour and 24-hour time formats?",
    answer:
      "The calculator accepts 12-hour times with AM/PM and normalizes them for arithmetic. The equivalent 24-hour values are used internally so times such as 5:30 PM become 17:30 and 12:00 AM becomes 00:00.",
  },
  {
    question: "Why can my payroll hours differ from a simple clock-in/clock-out calculation?",
    answer:
      "Payroll systems may apply rounding, break policies, overtime rules, shift rules, exemptions or other employer-specific conventions. The calculator reports the arithmetic result under its selected settings and does not determine which payroll policy legally applies.",
  },
  {
    question: "Why can the calculator result differ from my hand calculation?",
    answer:
      "Common causes include confusing decimal hours with minutes, forgetting overnight rollover, missing an unpaid break, or using a different rounding or payroll convention. The calculator uses a consistent minute-based arithmetic workflow, so shortcuts can produce a different result.",
  },
];
