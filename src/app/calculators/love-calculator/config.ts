import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateLoveCalculator } from "./calculator";
import { love_calculatorFaqs } from "./faq";

export const love_calculatorConfig: CalculatorModuleDefinition = {
  id: "love-calculator",
  title: "Love Calculator & Relationship Matcher",
  slug: "love-calculator",
  category: "other",
  subcategory: "Everyday Utility",
  description: "Next-Gen Love & Compatibility Engine. Multi-pillar matching via Pythagorean Name Numerology, Zodiac Western Astrology, and Birthday Life Path analysis.",
  iconName: "Heart",
  featured: true,
  keywords: [
    "love calculator",
    "compatibility test",
    "name compatibility calculator",
    "zodiac compatibility test",
    "relationship matcher",
    "numerology love calculator",
    "life path love match",
    "couple name generator",
    "soulmate calculator"
  ],
  priority: 1,
  relatedCalculators: ["date-calculator", "gpa-calculator", "random-number-generator"],
  formulaDescription: "Pythagorean Numerology Soul Urge & Personality Numbers | Astrological Elemental Synastry | Life Path Analysis",
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
  ],
  calculate: calculateLoveCalculator,
};

export default love_calculatorConfig;
