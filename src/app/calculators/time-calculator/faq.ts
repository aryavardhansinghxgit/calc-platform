import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const time_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "How does a time calculator add hours, minutes and seconds?",
    answer:
      "It converts each time value into total seconds, combines the signed totals, and converts the result back into normalized days, hours, minutes and seconds. This avoids errors caused by treating minutes and seconds like ordinary decimal digits.",
  },
  {
    question: "How do you subtract time when the minutes or seconds are smaller?",
    answer:
      "The calculator can borrow one minute as 60 seconds or one hour as 60 minutes, just as you would in manual subtraction. Internally, it uses total seconds, then normalizes the signed result.",
  },
  {
    question: "What is the difference between decimal hours and hours and minutes?",
    answer:
      "Decimal hours express the entire duration as a decimal number. For example, 2 hours 30 minutes is 2.5 hours. It is not 2.30 hours because the .30 would represent 18 minutes if interpreted mathematically.",
  },
  {
    question: "How do I calculate the time between two clock times?",
    answer:
      "Subtract the earlier time from the later time. When the shift crosses midnight, the elapsed-duration logic adds the next calendar day. The Work Duration mode also subtracts an unpaid break when calculating paid hours.",
  },
  {
    question: "How does the Time Calculator handle overnight shifts?",
    answer:
      "If the clock-out time is earlier than the clock-in time, the calculator treats the shift as crossing midnight and adds 24 hours before calculating the elapsed duration. An unpaid break is then deducted from the gross interval.",
  },
  {
    question: "How do I add or subtract time from a date?",
    answer:
      "Enter the starting date and time, choose Add or Subtract, and enter the duration in days, hours, minutes and seconds. The calculator shifts the timestamp using its UTC-based elapsed-duration model and returns the resulting date and time.",
  },
  {
    question: "Does the Time Calculator account for daylight saving time?",
    answer:
      "The date-shift engine uses UTC-based arithmetic rather than named local time zones. That means a 24-hour shift is treated as exactly 86,400 seconds instead of changing length because a local region enters or leaves daylight saving time. It is therefore not a substitute for a location-specific time-zone scheduler.",
  },
  {
    question: "What does 12:00 AM mean?",
    answer:
      "12:00 AM means midnight and corresponds to 00:00 in the 24-hour system. 12:00 PM means noon and corresponds to 12:00.",
  },
  {
    question: "Can I type an expression such as 1d 2h + 30m - 45s?",
    answer:
      "Yes. The expression parser supports day, hour, minute and second tokens with plus and minus operators. It normalizes the signed total and shows the result in several units.",
  },
  {
    question: "How are work hours calculated when there is an unpaid break?",
    answer:
      "The calculator first determines gross elapsed time, including overnight rollover when necessary, then subtracts the unpaid break. Paid hours are clamped at zero and gross earnings are calculated as paid hours multiplied by the hourly wage.",
  },
  {
    question: "Is the Time Calculator 100% accurate?",
    answer:
      "It applies the calculator's stated time-conversion, arithmetic and date/time rules to the inputs you provide. Displayed decimal values are rounded according to the selected precision. Results should not be treated as official payroll, contractual, legal or location-specific timekeeping determinations.",
  },
  {
    question: "Does the calculator save my time calculations?",
    answer:
      "Saved calculation history is stored locally in the browser according to the current implementation. Copy and share features can also serialize the current calculation state. The calculator should be used with awareness that browser storage and sharing behavior are separate from the arithmetic itself.",
  },
];
