import {
  Home,
  Percent,
  Calculator as CalcIcon,
  TrendingUp,
  HeartPulse,
  Scale,
  Calendar,
  Building,
  GraduationCap,
  Briefcase,
  ArrowRightLeft,
  BarChart3,
  DollarSign,
  Landmark,
  RefreshCw,
  Receipt,
  LucideIcon,
} from "lucide-react";
import {
  ALL_CALCULATORS,
  getFeaturedCalculators as getRegistryFeatured,
  getCalculatorsByCategory as getRegistryByCategory,
  getCalculatorDefinition,
  CalculatorModuleDefinition,
} from "@/calculators";

export interface CalculatorItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  featured: boolean;
  icon: LucideIcon;
  tags?: string[];
}

const ICON_MAP: Record<string, LucideIcon> = {
  Home,
  Percent,
  CalcIcon,
  TrendingUp,
  HeartPulse,
  Scale,
  Calendar,
  Building,
  GraduationCap,
  Briefcase,
  ArrowRightLeft,
  BarChart3,
  DollarSign,
  Landmark,
  RefreshCw,
  Receipt,
};

function mapDefinitionToItem(def: CalculatorModuleDefinition): CalculatorItem {
  return {
    id: def.id,
    title: def.title,
    slug: def.slug,
    category: def.category,
    description: def.description,
    featured: !!def.featured,
    icon: (def.iconName && ICON_MAP[def.iconName]) || CalcIcon,
    tags: def.tags,
  };
}

export const CALCULATORS: CalculatorItem[] = ALL_CALCULATORS.map(mapDefinitionToItem);

export default CALCULATORS;

export function getFeaturedCalculators(): CalculatorItem[] {
  return getRegistryFeatured().map(mapDefinitionToItem);
}

export function getCalculatorsByCategory(category: string): CalculatorItem[] {
  return getRegistryByCategory(category).map(mapDefinitionToItem);
}

export function getCalculatorBySlug(slug: string): CalculatorItem | undefined {
  const def = getCalculatorDefinition(slug);
  return def ? mapDefinitionToItem(def) : undefined;
}
