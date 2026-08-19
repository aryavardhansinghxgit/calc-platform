import { MetadataRoute } from "next";
import { getAllCalculatorDefinitions } from "@/calculators";
import { CATEGORIES } from "@/data/categories";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://calcplatform.com";
  const currentDate = new Date();

  // 1. Core Platform Pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1.0,
    },
  ];

  // 2. Category Hub Pages
  const categoryRoutes: MetadataRoute.Sitemap = CATEGORIES.map((cat) => ({
    url: `${baseUrl}/category/${cat.slug}`,
    lastModified: currentDate,
    changeFrequency: "daily",
    priority: 0.85,
  }));

  // 3. Calculator Tool Pages (Deduplicated across all categories)
  const allCalculators = getAllCalculatorDefinitions();
  const seenSlugs = new Set<string>();
  const calculatorRoutes: MetadataRoute.Sitemap = [];

  for (const calc of allCalculators) {
    if (!calc.slug || seenSlugs.has(calc.slug)) continue;
    seenSlugs.add(calc.slug);

    calculatorRoutes.push({
      url: `${baseUrl}/calculators/${calc.slug}`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: calc.featured ? 0.9 : 0.75,
    });
  }

  // 4. Standalone Top-Level Aliases
  const standaloneAliases = [
    "loan-calculator",
    "cd-calculator",
    "finance-calculator",
    "house-affordability-calculator",
    "interest-rate-calculator",
    "refinance-calculator",
    "cash-back-or-low-interest-calculator",
  ];

  const standaloneRoutes: MetadataRoute.Sitemap = standaloneAliases.map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // 5. Institutional & Legal Pages
  const institutionalPages = ["about", "privacy", "terms", "contact"];
  const institutionalRoutes: MetadataRoute.Sitemap = institutionalPages.map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...categoryRoutes, ...calculatorRoutes, ...standaloneRoutes, ...institutionalRoutes];
}
