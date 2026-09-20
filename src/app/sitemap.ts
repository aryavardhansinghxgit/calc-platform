import { MetadataRoute } from "next";
import { getAllCalculatorDefinitions } from "@/calculators";
import { CATEGORIES } from "@/data/categories";

export default function sitemap(): MetadataRoute.Sitemap {
  const rawBaseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://calcplatform.com";
  const baseUrl = rawBaseUrl.replace(/\/+$/, "");
  const currentDate = new Date();

  // 1. Core Homepage
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1.0,
    },
  ];

  // 2. Category Hub Pages (Finance, Health, Math, Construction, Converters, Date, Other)
  const categoryRoutes: MetadataRoute.Sitemap = CATEGORIES.map((cat) => ({
    url: `${baseUrl}/category/${cat.slug}`,
    lastModified: currentDate,
    changeFrequency: "daily",
    priority: 0.9,
  }));

  // 3. All 190+ Verified Mathematical & Computational Calculators
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
      priority: calc.featured ? 0.85 : 0.8,
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
    priority: 0.85,
  }));

  // 5. Feedback, Support & Institutional Pages
  const institutionalPages = [
    { slug: "contact", priority: 0.8, changeFrequency: "daily" as const },
    { slug: "about", priority: 0.7, changeFrequency: "monthly" as const },
    { slug: "privacy", priority: 0.6, changeFrequency: "monthly" as const },
    { slug: "terms", priority: 0.6, changeFrequency: "monthly" as const },
  ];

  const institutionalRoutes: MetadataRoute.Sitemap = institutionalPages.map((item) => ({
    url: `${baseUrl}/${item.slug}`,
    lastModified: currentDate,
    changeFrequency: item.changeFrequency,
    priority: item.priority,
  }));

  return [
    ...staticRoutes,
    ...categoryRoutes,
    ...calculatorRoutes,
    ...standaloneRoutes,
    ...institutionalRoutes,
  ];
}
