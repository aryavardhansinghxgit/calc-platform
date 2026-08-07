import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Layers, Search } from "lucide-react";
import { CATEGORIES, getCategoryBySlug } from "@/data/categories";
import { getCalculatorsByCategory } from "@/calculators";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

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

  const CategoryIcon = category.icon;
  const registryCalculators = getCalculatorsByCategory(category.slug);

  return (
    <div className="space-y-4 max-w-7xl mx-auto py-1">
      {/* Breadcrumb Header */}
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> All Categories
        </Link>
        <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
          {registryCalculators.length} Tools
        </span>
      </div>

      {/* Main Grid: Left Category Content (Col 8) | Right Categories Sidebar (Col 4 matching Screen 3 & 5) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Category Info & High Density Tools List */}
        <div className="lg:col-span-8 space-y-4">
          <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 shrink-0">
              <CategoryIcon className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-zinc-900 dark:text-zinc-100">
                {category.name} Calculators
              </h1>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-xl leading-normal mt-0.5">
                {category.description}
              </p>
            </div>
          </div>

          {/* High Density Link Columns */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" /> Complete List of {category.name} Tools
            </h2>

            {registryCalculators.length === 0 ? (
              <p className="text-xs text-zinc-500 py-4 text-center">No calculators currently registered in this category.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {registryCalculators.map((calc) => (
                  <Link
                    key={calc.id}
                    href={`/calculators/${calc.slug}`}
                    className="p-2.5 rounded-lg border border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-800/40 hover:border-blue-300 dark:hover:border-blue-700 hover:bg-blue-50/40 dark:hover:bg-blue-950/30 transition-all group flex items-start justify-between"
                  >
                    <div className="space-y-0.5">
                      <div className="font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {calc.title}
                      </div>
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-1">
                        {calc.description}
                      </p>
                    </div>
                    <ArrowRight className="h-3.5 w-3.5 text-zinc-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all shrink-0 ml-2 mt-0.5" />
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar: All Category Navigation Index */}
        <aside className="lg:col-span-4 space-y-4">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3.5 shadow-sm space-y-2.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 border-b border-zinc-100 dark:border-zinc-800 pb-2">
              All Category Hubs
            </h3>

            <ul className="space-y-1 text-xs">
              {CATEGORIES.map((catItem) => {
                const isActive = catItem.slug === category.slug;
                const Icon = catItem.icon;
                return (
                  <li key={catItem.id}>
                    <Link
                      href={`/category/${catItem.slug}`}
                      className={`flex items-center justify-between px-2.5 py-2 rounded-lg transition-colors group ${
                        isActive
                          ? "bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-bold"
                          : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800/60"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <Icon className={`h-3.5 w-3.5 ${isActive ? "text-blue-600 dark:text-blue-400" : "text-zinc-400"}`} />
                        {catItem.name}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-400">
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
