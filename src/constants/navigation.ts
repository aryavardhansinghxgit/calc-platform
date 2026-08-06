import { Home, LucideIcon } from "lucide-react";
import { CATEGORIES, CategoryData } from "@/data/categories";

export interface NavigationCategory {
  id: string;
  name: string;
  slug: string;
  icon: LucideIcon;
  description: string;
  href: string;
  count?: number;
}

export const NAVIGATION_CATEGORIES: NavigationCategory[] = [
  {
    id: "home",
    name: "Home",
    slug: "home",
    icon: Home,
    description: "Overview of all top calculators and categories",
    href: "/",
  },
  ...CATEGORIES.map((cat) => ({
    id: cat.id,
    name: cat.name,
    slug: cat.slug,
    icon: cat.icon,
    description: cat.description,
    href: `/category/${cat.slug}`,
    count: cat.count,
  })),
];

export const NAV_LINKS = NAVIGATION_CATEGORIES;

export function getCategoryById(id: string): NavigationCategory | undefined {
  return NAVIGATION_CATEGORIES.find(
    (cat) => cat.id.toLowerCase() === id.toLowerCase() || cat.name.toLowerCase() === id.toLowerCase()
  );
}
