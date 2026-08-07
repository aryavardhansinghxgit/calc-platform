import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Layers, Sparkles } from "lucide-react";
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
    <div className="space-y-4 max-w-5xl mx-auto py-2">
      {/* Compact Breadcrumb & Category Header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> All Categories
          </Link>
          <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
            {registryCalculators.length} Tools
          </span>
        </div>

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
      </div>

      {/* Calculators Compact Responsive Grid (4 columns on lg) */}
      <div className="space-y-2">
        <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
          <Layers className="h-4 w-4 text-blue-600 dark:text-blue-400" /> Available Tools
        </h2>

        {registryCalculators.length === 0 ? (
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-xl text-center space-y-1">
            <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">More {category.name} calculators coming soon!</p>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400">Check back shortly as we launch new tools every week.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {registryCalculators.map((calc) => (
              <Link key={calc.id} href={`/calculators/${calc.slug}`} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-xl">
                <div className="h-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-sm transition-all cursor-pointer group p-3.5 rounded-xl space-y-2 flex flex-col justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono font-medium px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                        {calc.category}
                      </span>
                      <ArrowRight className="h-3.5 w-3.5 text-zinc-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
                    </div>
                    <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {calc.title}
                    </h3>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                      {calc.description}
                    </p>
                  </div>

                  {calc.tags && calc.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-1">
                      {calc.tags.slice(0, 2).map((tag, i) => (
                        <span key={i} className="text-[9px] text-zinc-400 dark:text-zinc-500 bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
