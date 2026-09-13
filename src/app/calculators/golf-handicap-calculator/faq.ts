import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const golf_handicap_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "What is a golf handicap?",
    answer: "A golf handicap is intended to represent a golfer's demonstrated playing ability and allow players of different abilities to compete more equitably. Under the WHS, that measure is the Handicap Index.",
  },
  {
    question: "What is the WHS?",
    answer: "The World Handicap System is the unified handicap framework jointly governed by the USGA and The R&A and implemented through authorized national associations and handicap organizations.",
  },
  {
    question: "How is a golf Handicap Index calculated?",
    answer: "The WHS converts rounds into Score Differentials and then selects the applicable number of the lowest differentials from the player's scoring record. With 20 Score Differentials, the lowest 8 of the most recent 20 are averaged before the applicable safeguards are considered.",
  },
  {
    question: "How many scores do I need for a Handicap Index?",
    answer: "The WHS permits a Handicap Index to be established after the player has posted the required 54 holes, using 9-hole and/or 18-hole scores under the applicable rules.",
  },
  {
    question: "What happens with fewer than 20 scores?",
    answer: "A reduced number of Score Differentials is used according to the WHS Rule 5.2a table. For example, with three Score Differentials the lowest one is used with a -2.0 adjustment; with four, the lowest one is used with a -1.0 adjustment.",
  },
  {
    question: "What are the best 8 of 20 scores?",
    answer: "Once a scoring record contains 20 Score Differentials, the basic Handicap Index calculation averages the lowest 8 of the most recent 20. The remaining 12 are not part of that initial average, although they remain in the scoring record.",
  },
  {
    question: "What is a Score Differential?",
    answer: "Score Differential measures how a round performed relative to the Course Rating, Slope Rating and applicable PCC. For an 18-hole score, the current formula is: (113 / Slope) × (Adjusted Gross Score - Course Rating - PCC).",
  },
  {
    question: "What is PCC in golf handicap calculation?",
    answer: "PCC means Playing Conditions Calculation. It is a daily statistical adjustment based on scores submitted at a course. Its adjustment ranges from -1 to +3, and most days have PCC 0.",
  },
  {
    question: "Does this calculator calculate the official PCC?",
    answer: "No. The calculator accepts a published daily PCC value as an input. It does not independently calculate the official course-day PCC from the complete score population.",
  },
  {
    question: "How does a 9-hole score count under the WHS?",
    answer: "Since the 2024 WHS revision, a 9-hole Score Differential is combined with an expected 9-hole Score Differential based on the player's current Handicap Index to create an 18-hole Score Differential. The 9-hole differential remains unrounded until after that combination.",
  },
  {
    question: "Can I just double my 9-hole score to get an 18-hole handicap differential?",
    answer: "No. The current WHS method does not simply double the 9-hole score. It combines the 9-hole Score Differential with an expected Score Differential based on the player's current Handicap Index.",
  },
  {
    question: "What is a Course Handicap?",
    answer: "Course Handicap converts a player's Handicap Index into the number of strokes applicable to a particular course and set of tees. For 18 holes, the formula is: HI × (Slope / 113) + (Course Rating - Par).",
  },
  {
    question: "What is a Playing Handicap?",
    answer: "Playing Handicap is the number of strokes actually used for the particular game or competition after the applicable handicap allowance is applied.",
  },
  {
    question: "What is the difference between Course Handicap and Playing Handicap?",
    answer: "Course Handicap is the course-specific handicap derived from the Handicap Index. Playing Handicap applies the appropriate allowance for the format of play and is the value normally used for the actual competition.",
  },
  {
    question: "What is a handicap allowance?",
    answer: "A handicap allowance is the percentage or calculation used to create equity for a specific format of play. Current Appendix C recommendations differ by format, such as 100% for individual stroke play and 85% for Four-Ball stroke play.",
  },
  {
    question: "What is a Low Handicap Index?",
    answer: "It is the player's lowest Handicap Index during the preceding 365 days and is used as the reference for certain WHS upward-movement safeguards.",
  },
  {
    question: "What is the WHS soft cap?",
    answer: "The soft cap limits rapid upward movement when the applicable Handicap Index calculation is more than 3.0 strokes above the Low Handicap Index. The excess above the trigger is suppressed by 50%.",
  },
  {
    question: "What is the WHS hard cap?",
    answer: "The hard cap places an upper limit on upward movement after the soft-cap mechanism has been applied. The current safeguard limits the increase to 5.0 strokes above the Low Handicap Index in the applicable calculation.",
  },
  {
    question: "What is Exceptional Score Reduction?",
    answer: "ESR is a safeguard applied when a Score Differential is at least 7.0 strokes better than the player's Handicap Index at the time the round was played. A 7.0–9.9 stroke improvement triggers a -1 adjustment, while a 10.0-or-more improvement triggers -2.",
  },
  {
    question: "What is a plus Handicap Index?",
    answer: "A plus Handicap Index is used for highly skilled players whose handicap is expressed on the plus side rather than as a conventional positive number. The sign matters when converting the Handicap Index to Course and Playing Handicap.",
  },
  {
    question: "Why does my Handicap Index sometimes not change after a new score?",
    answer: "Because the new Score Differential may not replace one of the current counting differentials. With 20 scores, only the lowest eight of the most recent 20 form the basic calculation, so a new round can leave that selected set unchanged.",
  },
  {
    question: "Does a lower golf score always lower my Handicap Index?",
    answer: "Not necessarily. The effect depends on the resulting Score Differential, the other differentials in the scoring record, and any safeguards such as ESR or the Low Handicap Index cap.",
  },
  {
    question: "Can I use this calculator to get an official Handicap Index?",
    answer: "The calculator provides a WHS-based calculation/estimate. It does not itself issue an official Handicap Index. Official Handicap Index issuance and administration are handled through authorized associations and golf clubs.",
  },
  {
    question: "What Course Rating and Slope Rating should I enter?",
    answer: "Use the values associated with the exact tees and course configuration played. Course Rating and Slope Rating are assigned to tee sets and are not generic values that should be substituted from another tee.",
  },
  {
    question: "What happens if PCC is -1 instead of 0?",
    answer: "A negative PCC reduces the subtraction term in the Score Differential formula, which generally makes the resulting differential higher for the same score, reflecting conditions that statistically played easier than expected. The calculator tests PCC values from -1 through +3.",
  },
  {
    question: "What happens if I have fewer than three scoring results?",
    answer: "An established Handicap Index is not calculated from fewer than the required minimum scoring history. The calculator displays N/A rather than incorrectly interpreting the absence of sufficient data as a 0.0 Scratch Handicap.",
  },
  {
    question: "Does this calculator automatically apply Net Double Bogey?",
    answer: "The calculator explains the WHS maximum-hole-score concept, but it should not be interpreted as an automated hole-by-hole score-posting system unless that specific functionality is provided. The WHS maximum score for handicap purposes is based on net double bogey.",
  },
];
