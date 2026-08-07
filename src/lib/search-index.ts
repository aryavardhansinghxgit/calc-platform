import {
  ALL_CALCULATORS,
  searchCalculators as searchRegistryCalculators,
  CalculatorModuleDefinition,
} from "@/calculators";

export interface SearchIndexItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  keywords: string[];
  description: string;
  href: string;
}

function mapDefinitionToSearchIndex(def: CalculatorModuleDefinition): SearchIndexItem {
  return {
    id: def.slug || def.id,
    title: def.title,
    slug: def.slug,
    category: def.category,
    keywords: def.tags || [def.id, def.category.toLowerCase()],
    description: def.description,
    href: `/calculators/${def.slug}`,
  };
}

export const SEARCH_INDEX: SearchIndexItem[] = ALL_CALCULATORS.map(mapDefinitionToSearchIndex);

export function searchCalculators(query: string): SearchIndexItem[] {
  return searchRegistryCalculators(query).map(mapDefinitionToSearchIndex);
}
