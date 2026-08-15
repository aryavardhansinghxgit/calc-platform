"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, CheckCircle2, AlertTriangle, Lightbulb } from "lucide-react";

export interface RefinanceAiInsightPanelProps {
  insights: {
    summary: string;
    benefits: string[];
    risks: string[];
  };
  score: number;
  rating: string;
}

export function RefinanceAiInsightPanel({ insights, score, rating }: RefinanceAiInsightPanelProps) {
  if (!insights) return null;

  return (
    <Card className="border border-purple-200 dark:border-purple-900 bg-gradient-to-br from-purple-50/60 via-white to-indigo-50/40 dark:from-zinc-900 dark:via-zinc-900 dark:to-purple-950/20 shadow-xs">
      <CardHeader className="pb-2 border-b border-purple-100 dark:border-purple-900/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-purple-600 text-white shadow-xs">
              <Sparkles className="h-4 w-4" />
            </div>
            <CardTitle className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
              AI Refinance Advisor Insights
            </CardTitle>
          </div>
          <span className="text-xs font-sans tabular-nums font-bold text-purple-700 dark:text-purple-300">
            Rating: {rating} ({score}/100)
          </span>
        </div>
      </CardHeader>

      <CardContent className="p-4 space-y-4 text-xs">
        {/* Executive Summary */}
        <div className="p-3 bg-white/80 dark:bg-zinc-800/80 rounded-xl border border-purple-100 dark:border-purple-900/60">
          <span className="font-bold text-purple-900 dark:text-purple-200 flex items-center gap-1.5 mb-1">
            <Lightbulb className="h-3.5 w-3.5 text-amber-500" /> Executive Financial Takeaway:
          </span>
          <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium">
            {insights.summary}
          </p>
        </div>

        {/* Benefits & Risks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Key Benefits */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5 uppercase tracking-wider">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> Why Refinancing Helps You
            </h4>
            <ul className="space-y-1.5 pl-2">
              {insights.benefits.length === 0 ? (
                <li className="text-zinc-400 italic">No significant financial benefits detected for this setup.</li>
              ) : (
                insights.benefits.map((b, idx) => (
                  <li key={`b-${idx}`} className="text-zinc-600 dark:text-zinc-400 flex items-start gap-1.5">
                    <span className="text-emerald-500 font-bold">•</span>
                    <span>{b}</span>
                  </li>
                ))
              )}
            </ul>
          </div>

          {/* Potential Risks & Caveats */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-amber-700 dark:text-amber-300 flex items-center gap-1.5 uppercase tracking-wider">
              <AlertTriangle className="h-3.5 w-3.5 text-amber-500" /> Potential Risks & Considerations
            </h4>
            <ul className="space-y-1.5 pl-2">
              {insights.risks.length === 0 ? (
                <li className="text-zinc-400 italic">No major risks identified.</li>
              ) : (
                insights.risks.map((r, idx) => (
                  <li key={`r-${idx}`} className="text-zinc-600 dark:text-zinc-400 flex items-start gap-1.5">
                    <span className="text-amber-500 font-bold">•</span>
                    <span>{r}</span>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default RefinanceAiInsightPanel;
