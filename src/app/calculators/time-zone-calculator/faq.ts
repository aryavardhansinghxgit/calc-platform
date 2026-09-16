import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const time_zone_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "How do I convert a time from one time zone to another?",
    answer:
      "Select the date, time, origin time zone, and destination time zone. The conversion identifies the UTC instant represented by the origin time and then expresses that same instant using the destination zone's applicable rules.",
  },
  {
    question: "What is the difference between UTC and GMT?",
    answer:
      "UTC is the modern internationally agreed reference time standard. GMT originally described mean solar time at Greenwich and is now commonly used for the zero-offset civil time at Greenwich. In normal everyday time conversion, GMT and UTC can display the same clock time at UTC+00:00.",
  },
  {
    question: "Why does the time difference between two cities change?",
    answer:
      "The difference can change when one or both locations change their UTC offset because of Daylight Saving Time or another civil-time rule. The jurisdictions may also change their clocks on different dates.",
  },
  {
    question: "What happens during the spring DST transition?",
    answer:
      "When clocks move forward, a range of local clock times can disappear. A local time inside that gap is called nonexistent because it does not correspond to an ordinary instant in that local timezone on that date.",
  },
  {
    question: "What is an ambiguous time during the fall DST transition?",
    answer:
      "When clocks move backward, some local times occur twice. For example, 1:30 AM may correspond to two different UTC instants. Such a local clock reading is called ambiguous.",
  },
  {
    question: "Why does India use UTC+05:30 instead of UTC+05:00?",
    answer:
      "India's civil time is Indian Standard Time, UTC+05:30. The half-hour offset is part of India's national standard rather than a conversion error or rounding issue.",
  },
  {
    question: "Why is Nepal UTC+05:45?",
    answer:
      "Nepal uses Nepal Time at UTC+05:45. The 45-minute offset is an established national civil-time standard and demonstrates why time-zone conversion should not assume whole-hour offsets.",
  },
  {
    question: "Can converting a time change the date?",
    answer:
      "Yes. If the destination time is on the other side of midnight, the calendar date changes. International conversions can therefore result in the previous or following day.",
  },
  {
    question: "What is the International Date Line?",
    answer:
      "The International Date Line is an approximately 180-degree longitude boundary in the Pacific where the calendar date changes. Actual civil time-zone boundaries do not follow a perfect geometric line.",
  },
  {
    question: "Why can't I just add or subtract a fixed number of hours?",
    answer:
      "Fixed arithmetic works only when the applicable offset is already known and does not change. Real time zones can observe DST, use fractional offsets, or have other date-dependent rules, so the correct offset must be determined for the particular date and zone.",
  },
  {
    question: "Can a time zone have the same UTC offset as another time zone?",
    answer:
      "Yes. Different named time zones can share the same current offset while having different rules or histories. Equal offsets do not make the zones interchangeable for every date.",
  },
  {
    question: "Can I use the calculator to plan meetings across several cities?",
    answer:
      "Yes. The multi-city planner compares local working hours across the selected cities using a common UTC instant. This makes it easier to identify periods when participants are simultaneously within normal working hours.",
  },
];
