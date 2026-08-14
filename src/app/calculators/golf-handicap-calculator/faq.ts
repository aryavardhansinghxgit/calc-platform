import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const golf_handicap_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "How is a Golf Handicap Index calculated under the World Handicap System (WHS)?",
    answer: "Under the World Handicap System (WHS), a player's Handicap Index is calculated by taking the average of the lowest (best) 8 Score Differentials from their 20 most recent 18-hole scores. If fewer than 20 rounds are submitted, a sliding scale rules table determines how many differentials count (e.g., for 3 rounds, the lowest 1 differential minus 2.0 is used)."
  },
  {
    question: "What is the minimum number of 18-hole rounds needed to get an official handicap?",
    answer: "You need a minimum of 54 holes of posted scores to establish an official WHS Handicap Index. This can be achieved by submitting three 18-hole rounds, six 9-hole rounds, or any equivalent combination of 9 and 18-hole rounds."
  },
  {
    question: "What is the difference between a Course Handicap and a Playing Handicap?",
    answer: "A Course Handicap represents the number of stroke adjustments a player needs for a specific set of tees on a specific golf course: Course Handicap = Handicap Index × (Slope Rating / 113) + (Course Rating - Par). A Playing Handicap applies format-specific tournament allowances (e.g., 95% for Four-Ball stroke play) to the Course Handicap."
  },
  {
    question: "What is a standard Slope Rating in golf?",
    answer: "A Slope Rating of 113 represents a golf course of standard relative difficulty for a bogey golfer compared to a scratch golfer. Slope Ratings range from 55 (easiest) to 155 (most difficult)."
  },
  {
    question: "What does 'Net Double Bogey' mean when entering scores?",
    answer: "Net Double Bogey is the maximum individual hole score a golfer can post for handicap calculation purposes. It is calculated as: Par + 2 + any handicap strokes received on that specific hole based on its stroke index allocation."
  },
  {
    question: "Why does my Handicap Index not equal the average of all my rounds?",
    answer: "A Handicap Index measures a player's demonstrated potential ability rather than their average score. By taking only the best 8 differentials out of the last 20 rounds, the system reflects how well you play when performing near your potential."
  },
  {
    question: "What is a 'Scratch Golfer' vs. a 'Plus Handicap'?",
    answer: "A scratch golfer is a player with a Handicap Index of 0.0 who is expected to average par under normal conditions. A 'plus handicap' golfer has an index better than scratch (e.g., +2.5), meaning stroke adjustments are added to their gross score rather than subtracted."
  },
  {
    question: "Can 9-hole scores be used to calculate an 18-hole handicap?",
    answer: "Yes, under WHS rules, 9-hole scores are scaled to an 18-hole equivalent differential or automatically combined with another 9-hole score to form a complete 18-hole differential."
  },
  {
    question: "What are the Soft Cap and Hard Cap rules in golf handicapping?",
    answer: "Soft Cap and Hard Cap rules prevent a player's Handicap Index from rising too rapidly due to a temporary slump. The system tracks a player's Low Handicap Index over the past 365 days. A Soft Cap suppresses index increases beyond 3.0 strokes by 50%, while a Hard Cap limits the maximum index increase to 5.0 strokes above the Low Index."
  },
  {
    question: "How does an Exceptional Score Reduction (ESR) work?",
    answer: "An Exceptional Score Reduction is automatically triggered when a player posts a score differential that is significantly lower than their current Handicap Index. If a differential is 7.0 to 9.9 strokes below the index, a -1.0 stroke reduction is applied across all 20 round differentials. If 10.0+ strokes below, a -2.0 stroke reduction is applied."
  }
];
