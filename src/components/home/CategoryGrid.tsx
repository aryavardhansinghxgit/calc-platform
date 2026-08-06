"use client";

import React from "react";
import { Landmark, HeartPulse, Binary, HardHat, Layers, ArrowRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export interface CategoryGridProps {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

export function CategoryGrid({ activeCategory, onSelectCategory }: CategoryGridProps) {
  const categories = [
    {
      id: "Finance",
      title: "Finance & Wealth",
      desc: "Mortgage, Loan EMI, Investment SIP, and Interest calculations",
      icon: Landmark,
      count: "5 Tools",
      gradient: "from-sky-500/20 to-blue-600/10 border-sky-500/30",
      accent: "text-sky-400",
    },
    {
      id: "Health",
      title: "Health & Fitness",
      desc: "Body Mass Index (BMI), daily calorie needs & body metrics",
      icon: HeartPulse,
      count: "2 Tools",
      gradient: "from-emerald-500/20 to-teal-600/10 border-emerald-500/30",
      accent: "text-emerald-400",
    },
    {
      id: "Math",
      title: "Math & Conversions",
      desc: "Percentage change, ratio math, scientific & unit conversions",
      icon: Binary,
      count: "3 Tools",
      gradient: "from-purple-500/20 to-indigo-600/10 border-purple-500/30",
      accent: "text-purple-400",
    },
    {
      id: "Construction",
      title: "Construction & Engineering",
      desc: "Concrete estimation, materials pricing & dimensional math",
      icon: HardHat,
      count: "2 Tools",
      gradient: "from-amber-500/20 to-orange-600/10 border-amber-500/30",
      accent: "text-amber-400",
    },
  ];

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Layers className="h-5 w-5 text-sky-400" /> Browse Categories
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Select a category to filter targeted calculators
          </p>
        </div>

        {activeCategory !== "Home" && (
          <button
            onClick={() => onSelectCategory("Home")}
            className="text-xs font-semibold text-sky-400 hover:text-sky-300 underline underline-offset-4"
          >
            Show All
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;

          return (
            <Card
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`cursor-pointer transition-all duration-200 border rounded-2xl relative overflow-hidden group ${
                isActive
                  ? `bg-slate-900 ${cat.gradient} ring-2 ring-sky-500/50 shadow-lg`
                  : "bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900"
              }`}
            >
              <CardHeader className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div
                    className={`p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 ${cat.accent}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded-full bg-slate-800/80 text-slate-400 border border-slate-700">
                    {cat.count}
                  </span>
                </div>

                <div className="space-y-1">
                  <CardTitle className="text-base font-bold text-white group-hover:text-sky-300 transition-colors flex items-center gap-1.5">
                    {cat.title}
                    <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-sky-400" />
                  </CardTitle>
                  <CardDescription className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {cat.desc}
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
