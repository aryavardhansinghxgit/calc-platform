import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateLoveCalculator } from "./calculator";
import { love_calculatorFaqs } from "./faq";

export const love_calculatorConfig: CalculatorModuleDefinition = {
  id: "love-calculator",
  title: "Love Calculator & Relationship Matcher",
  slug: "love-calculator",
  category: "other",
  subcategory: "Everyday & Lifestyle",
  description:
    "Next-Gen Love & Compatibility Engine. Multi-pillar matching via Pythagorean Name Numerology, Zodiac Western Astrology, and Birthday Life Path analysis.",
  iconName: "Heart",
  featured: true,
  keywords: [
    "love calculator",
    "love percentage calculator",
    "crush calculator",
    "compatibility calculator",
    "relationship compatibility test",
    "zodiac love calculator",
    "soulmate calculator",
    "true love calculator",
    "romantic compatibility calculator",
    "love match calculator",
    "name compatibility calculator",
    "zodiac compatibility test",
    "relationship matcher",
    "numerology love calculator",
    "life path love match",
    "couple name generator",
    "flames calculator",
    "flames love calculator"
  ],
  priority: 1,
  relatedCalculators: ["age-calculator", "date-calculator", "time-duration-calculator", "time-calculator"],
  formulaDescription:
    "Pythagorean Numerology Soul Urge & Personality Numbers | Astrological Elemental Synastry | Life Path Analysis | 90s FLAMES Circular Elimination",
  faqs: love_calculatorFaqs,
  inputs: [
    {
      name: "name1",
      label: "Person 1 Name",
      type: "text",
      defaultValue: "Romeo",
    },
    {
      name: "name2",
      label: "Person 2 Name",
      type: "text",
      defaultValue: "Juliet",
    },
    {
      name: "mode",
      label: "Matching Engine Mode",
      type: "select",
      defaultValue: "name",
      options: [
        { label: "Pythagorean Name Numerology", value: "name" },
        { label: "Zodiac Western Astrology", value: "zodiac" },
        { label: "Birthday & Life Path Number", value: "birthday" },
        { label: "90s Classic FLAMES Game", value: "flames" },
        { label: "Comprehensive Ultimate Chemistry", value: "ultimate" },
      ],
    },
    {
      name: "dob1",
      label: "Person 1 Date of Birth",
      type: "text",
      defaultValue: "1996-05-15",
    },
    {
      name: "dob2",
      label: "Person 2 Date of Birth",
      type: "text",
      defaultValue: "1998-09-20",
    },
    {
      name: "sign1",
      label: "Person 1 Zodiac Sign",
      type: "text",
      defaultValue: "Leo",
    },
    {
      name: "sign2",
      label: "Person 2 Zodiac Sign",
      type: "text",
      defaultValue: "Gemini",
    },
  ],
  outputs: [
    {
      name: "compatibilityScore",
      label: "Love Compatibility Score",
      format: "percentage",
      highlight: true,
    },
    {
      name: "tierBadge",
      label: "Relationship Tier",
      format: "text",
    },
    {
      name: "moniker",
      label: "Couple Moniker",
      format: "text",
    },
    {
      name: "verdict",
      label: "Engine Verdict",
      format: "text",
    },
    {
      name: "advice",
      label: "Relationship Advice",
      format: "text",
    },
    {
      name: "romanticPassion",
      label: "Romantic Passion & Chemistry",
      format: "percentage",
    },
    {
      name: "intellectualCommunication",
      label: "Intellectual & Communication",
      format: "percentage",
    },
    {
      name: "emotionalTrust",
      label: "Emotional Trust & Stability",
      format: "percentage",
    },
    {
      name: "longTermVision",
      label: "Long-Term Vision & Growth",
      format: "percentage",
    },
    {
      name: "flamesOutcome",
      label: "FLAMES Outcome",
      format: "text",
    },
  ],
  calculate: calculateLoveCalculator,
};

export default love_calculatorConfig;
