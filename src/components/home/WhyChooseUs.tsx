"use client";

import React from "react";
import { ShieldCheck, Zap, BarChart3, FileSpreadsheet, Sparkles, CheckCircle2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export interface WhyChooseUsProps {
  title?: string;
  subtitle?: string;
}

export function WhyChooseUs({
  title = "Why Choose CalcPlatform",
  subtitle = "Engineered for speed, precision, and privacy. Built for professionals, students, and financial planners.",
}: WhyChooseUsProps = {}) {
  const features = [
    {
      icon: Zap,
      title: "Real-Time Precision",
      description: "Instant computation with live updates as you tweak sliders or input figures.",
    },
    {
      icon: BarChart3,
      title: "Interactive Visuals",
      description: "Comprehensive charts, amortization tables, and visual breakdown graphs.",
    },
    {
      icon: FileSpreadsheet,
      title: "Export & Share",
      description: "Download detailed PDF calculation statements or export raw data tables.",
    },
    {
      icon: ShieldCheck,
      title: "100% Private & Free",
      description: "All calculations execute locally in your browser. No sign-up or tracking.",
    },
  ];

  return (
    <section className="space-y-6 pt-8 border-t border-slate-800/80">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
          <Sparkles className="h-3.5 w-3.5" /> Built for Accuracy
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          {title}
        </h2>
        <p className="text-sm text-slate-400 leading-relaxed">{subtitle}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
        {features.map((feature, i) => {
          const Icon = feature.icon;
          return (
            <Card
              key={i}
              className="bg-slate-900/60 border-slate-800/80 hover:border-blue-500/30 hover:bg-slate-900 transition-all group"
            >
              <CardHeader className="p-6 space-y-3">
                <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 w-fit group-hover:scale-105 transition-transform">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <CardTitle className="text-base font-bold text-white group-hover:text-blue-300 transition-colors flex items-center gap-1.5">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-xs text-slate-400 leading-relaxed">
                    {feature.description}
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

export default WhyChooseUs;
