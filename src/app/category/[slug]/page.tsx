import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CATEGORIES, getCategoryBySlug } from "@/data/categories";
import { getCalculatorsByCategory } from "@/calculators";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";
import { getCalculatorDisplayTitle } from "@/lib/calculator-title";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({
    slug: cat.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) return { title: "Category Not Found" };

  return generateCalculatorMetadata({
    title: `${category.name} Calculators`,
    description: category.description,
    slug: `category/${category.slug}`,
  });
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const registryCalculators = getCalculatorsByCategory(category.slug);

  // Group calculators by subcategory if present
  const subcategoryMap: Record<string, typeof registryCalculators> = {};
  registryCalculators.forEach((calc) => {
    const sub = calc.subcategory || "General";
    if (!subcategoryMap[sub]) {
      subcategoryMap[sub] = [];
    }
    subcategoryMap[sub].push(calc);
  });

  const subcategoryNames = Object.keys(subcategoryMap);

  return (
    <div className="space-y-4 max-w-7xl mx-auto py-1">
      {/* Breadcrumb Header */}
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> All Categories
        </Link>
      </div>

      <header className="border-b border-blue-200 dark:border-blue-900/60 pb-3">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight text-blue-600 dark:text-blue-400">
          {category.name} Calculators
        </h1>
      </header>

      {/* Main Grid: Left Category Content (Col 8) | Right Categories Sidebar (Col 4) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Subcategory Grouped Tools List */}
        <div className="lg:col-span-8 space-y-4">
          {/* Subcategory Grouped Calculators */}
          {registryCalculators.length === 0 ? (
            <div className="bg-card text-card-foreground border border-border rounded-xl p-6 text-center text-xs text-muted-foreground">
              No calculators currently registered in this category.
            </div>
          ) : (
            <div className="space-y-5">
              {subcategoryNames.map((subName) => {
                const tools = subcategoryMap[subName];
                return (
                  <div key={subName} className="bg-card text-card-foreground border border-border rounded-xl p-4 space-y-3">
                    <h2 className="text-sm sm:text-base font-bold tracking-tight text-blue-600 dark:text-blue-400 border-b border-blue-100 dark:border-blue-900/60 pb-2">
                      {subName}
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                      {tools.map((calc) => (
                        <Link
                          key={calc.id}
                          href={`/calculators/${calc.slug}`}
                          className="p-2.5 rounded-lg border border-border bg-background hover:border-primary/50 hover:bg-muted/50 transition-all group flex items-start justify-between"
                        >
                           <div>
                             <div className="font-bold text-foreground group-hover:text-primary transition-colors">
                               {getCalculatorDisplayTitle(calc.title)}
                             </div>
                           </div>
                          <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0 ml-2 mt-0.5" />
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Sidebar: All Category Navigation Index */}
        <aside className="lg:col-span-4 space-y-4">
          <div className="bg-card text-card-foreground border border-border rounded-xl p-3.5 shadow-xs space-y-2.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground border-b border-border pb-2">
              All Category Hubs
            </h3>

            <ul className="space-y-1 text-xs">
              {CATEGORIES.map((catItem) => {
                const isActive = catItem.slug === category.slug;
                return (
                  <li key={catItem.id}>
                    <Link
                      href={`/category/${catItem.slug}`}
                      className={`flex items-center justify-between px-2.5 py-2 rounded-lg transition-colors group ${
                        isActive
                          ? "bg-blue-600 text-white font-semibold shadow-sm"
                          : "text-foreground hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-950/40 dark:hover:text-blue-300"
                      }`}
                    >
                      {catItem.name}
                      <span className="text-[10px] font-mono text-muted-foreground">
                        {catItem.count}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
