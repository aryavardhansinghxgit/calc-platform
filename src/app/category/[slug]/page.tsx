import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Layers, Sparkles } from "lucide-react";
import { CATEGORIES, getCategoryBySlug } from "@/data/categories";
import { getCalculatorsByCategory, getAllCalculatorDefinitions } from "@/lib/calculator-engine/registry";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
    <div className="space-y-10 max-w-5xl mx-auto py-2">
      {/* Category Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-sky-400 transition-colors bg-slate-900/80 px-3.5 py-1.5 rounded-xl border border-slate-800 hover:border-slate-700"
          >
            <ArrowLeft className="h-4 w-4" /> Home
          </Link>
          <span className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20">
            <Sparkles className="h-3.5 w-3.5" /> Category Hub
          </span>
        </div>

        <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 space-y-4">
          <div className="flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-400">
              <CategoryIcon className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
                {category.name} Calculators
              </h1>
              <p className="text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
                {category.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Calculators Grid */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Layers className="h-4 w-4 text-sky-400" /> Available {category.name} Tools ({registryCalculators.length})
        </h2>

        {registryCalculators.length === 0 ? (
          <Card className="bg-slate-900/60 border-slate-800/80 p-8 text-center space-y-2">
            <p className="text-sm font-semibold text-slate-300">More {category.name} calculators coming soon!</p>
            <p className="text-xs text-slate-400">Check back shortly as we launch new tools every week.</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {registryCalculators.map((calc) => (
              <Link key={calc.id} href={`/calculators/${calc.slug}`}>
                <Card className="h-full bg-slate-900/80 border-slate-800/80 hover:border-sky-500/40 hover:bg-slate-900 transition-all cursor-pointer group p-5 space-y-3">
                  <CardHeader className="p-0 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-medium px-2.5 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20">
                        {calc.category}
                      </span>
                      <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-sky-400 group-hover:translate-x-1 transition-all" />
                    </div>
                    <CardTitle className="text-base font-bold text-white group-hover:text-sky-300 transition-colors">
                      {calc.title}
                    </CardTitle>
                    <CardDescription className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {calc.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
