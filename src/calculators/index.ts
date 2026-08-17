import { CalculatorModuleDefinition } from "./types";
import { FINANCE_CALCULATORS } from "./finance";
import { MATH_CALCULATORS } from "./math";
import { BUSINESS_CALCULATORS } from "./business";
import { HEALTH_CALCULATORS } from "./health";
import { DATE_CALCULATORS } from "./date";
import { CONSTRUCTION_CALCULATORS } from "./construction";
import { CONVERTERS_CALCULATORS } from "./converters";
import { OTHER_CALCULATORS } from "./other";

export * from "./types";

// Combine all category registries
const RAW_CALCULATORS: CalculatorModuleDefinition[] = [
  ...FINANCE_CALCULATORS,
  ...MATH_CALCULATORS,
  ...BUSINESS_CALCULATORS,
  ...HEALTH_CALCULATORS,
  ...DATE_CALCULATORS,
  ...CONSTRUCTION_CALCULATORS,
  ...CONVERTERS_CALCULATORS,
  ...OTHER_CALCULATORS,
];

// Deduplicate calculators by id to guarantee uniqueness
export const ALL_CALCULATORS: CalculatorModuleDefinition[] = Array.from(
  new Map(RAW_CALCULATORS.map((calc) => [calc.id.toLowerCase(), calc])).values()
);

// Map lookup table for O(1) slug/id resolution
const CALCULATOR_REGISTRY: Record<string, CalculatorModuleDefinition> = {};

ALL_CALCULATORS.forEach((calc) => {
  CALCULATOR_REGISTRY[calc.id.toLowerCase()] = calc;
  CALCULATOR_REGISTRY[calc.slug.toLowerCase()] = calc;
});

export function getCalculatorDefinition(idOrSlug: string): CalculatorModuleDefinition | undefined {
  if (!idOrSlug) return undefined;
  return CALCULATOR_REGISTRY[idOrSlug.toLowerCase().trim()];
}

export function getAllCalculatorDefinitions(): CalculatorModuleDefinition[] {
  return ALL_CALCULATORS;
}

export function getCalculatorsByCategory(categorySlugOrName: string): CalculatorModuleDefinition[] {
  if (!categorySlugOrName || categorySlugOrName === "all" || categorySlugOrName === "Home") {
    return ALL_CALCULATORS;
  }
  const target = categorySlugOrName.toLowerCase().trim().replace(/-/g, " ");
  return ALL_CALCULATORS.filter(
    (calc) => calc.category.toLowerCase().replace(/-/g, " ") === target
  );
}

export function getFeaturedCalculators(): CalculatorModuleDefinition[] {
  return ALL_CALCULATORS.filter((c) => c.featured);
}

export function searchCalculators(query: string): CalculatorModuleDefinition[] {
  if (!query || query.trim() === "") return ALL_CALCULATORS;
  const q = query.toLowerCase().trim();
  const tokens = q.split(/\s+/).filter(Boolean);

  const aliases: Record<string, string[]> = {
    car: ["auto-loan", "loan"],
    vehicle: ["auto-loan"],
    auto: ["auto-loan"],
    va: ["va-mortgage-calculator"],
    fha: ["fha-loan-calculator"],
    apr: ["apr-calculator"],
    dti: ["dti-calculator"],
    house: ["mortgage", "house-affordability", "rent-calculator", "dti-calculator"],
    home: ["mortgage", "house-affordability", "rent-calculator", "dti-calculator"],
    rent: ["rent-calculator", "rental-property-calculator"],
    rental: ["rental-property-calculator", "rent-calculator"],
    brrrr: ["rental-property-calculator"],
    lease: ["rent-calculator"],
    apartment: ["rent-calculator"],
    roommate: ["rent-calculator"],
    property: ["mortgage", "rental-property-calculator"],
    tax: ["gst"],
    vat: ["gst"],
    investment: ["sip", "compound-interest", "fd", "rd"],
    deposit: ["fd", "rd", "compound-interest"],
    returns: ["sip", "compound-interest"],
    installment: ["emi", "loan", "mortgage"],
    weight: ["bmi"],
    fitness: ["bmi"],
    birthday: ["age"],
  };

  const expandedTargetIds = new Set<string>();
  Object.entries(aliases).forEach(([alias, targetIds]) => {
    if (alias.includes(q) || q.includes(alias)) {
      targetIds.forEach((id) => expandedTargetIds.add(id));
    }
  });

  const matches = ALL_CALCULATORS.filter((calc) => {
    const title = calc.title.toLowerCase();
    const desc = calc.description.toLowerCase();
    const cat = calc.category.toLowerCase();
    const id = calc.id.toLowerCase();
    const slug = calc.slug.toLowerCase();
    const tags = calc.tags ? calc.tags.map((t) => t.toLowerCase()) : [];

    if (
      title.includes(q) ||
      desc.includes(q) ||
      cat.includes(q) ||
      id.includes(q) ||
      slug.includes(q) ||
      tags.some((t) => t.includes(q))
    ) {
      return true;
    }

    if (expandedTargetIds.has(id) || expandedTargetIds.has(slug)) {
      return true;
    }

    return tokens.every(
      (token) =>
        title.includes(token) ||
        desc.includes(token) ||
        cat.includes(token) ||
        id.includes(token) ||
        slug.includes(token) ||
        tags.some((t) => t.includes(token))
    );
  });

  return matches.sort((a, b) => {
    const getScore = (calc: CalculatorModuleDefinition) => {
      const title = calc.title.toLowerCase();
      const slug = calc.slug.toLowerCase();
      const id = calc.id.toLowerCase();
      const category = calc.category.toLowerCase();
      const titleWords = title.split(/\s+/);

      if (title === q || slug === q || id === q) return 0;
      if (title.startsWith(q)) return 1;
      if (titleWords.some((word) => word.startsWith(q))) return 2;
      if (slug.startsWith(q) || id.startsWith(q)) return 3;
      if (category.startsWith(q)) return 4;
      if (title.includes(q)) return 5;
      if (slug.includes(q) || id.includes(q) || category.includes(q)) return 6;
      return 7;
    };

    const scoreDifference = getScore(a) - getScore(b);
    if (scoreDifference !== 0) return scoreDifference;

    return a.title.localeCompare(b.title, undefined, { sensitivity: "base" });
  });
}

export function getRelatedCalculators(
  currentId: string,
  category?: string,
  count: number = 3
): CalculatorModuleDefinition[] {
  const filtered = ALL_CALCULATORS.filter(
    (c) =>
      c.id.toLowerCase() !== currentId.toLowerCase() &&
      c.slug.toLowerCase() !== currentId.toLowerCase()
  );

  if (category) {
    const categoryMatches = filtered.filter(
      (c) => c.category.toLowerCase() === category.toLowerCase()
    );
    if (categoryMatches.length >= count) {
      return categoryMatches.slice(0, count);
    }
    const nonMatches = filtered.filter(
      (c) => c.category.toLowerCase() !== category.toLowerCase()
    );
    return [...categoryMatches, ...nonMatches].slice(0, count);
  }

  return filtered.slice(0, count);
}
