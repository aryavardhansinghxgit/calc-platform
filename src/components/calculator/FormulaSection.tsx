"use client";

import React from "react";
import { BookOpen, FunctionSquare } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export interface FormulaSectionProps {
  title?: string;
  formula: string;
  explanation?: string;
  variables?: Array<{ symbol: string; label: string }>;
}

export function FormulaSection({
  title = "Formula & Calculation Method",
  formula,
  explanation,
  variables = [],
}: FormulaSectionProps) {
  return (
    <Card className="bg-slate-900/60 border-slate-800/80 rounded-[12px] p-6 space-y-4">
      <CardHeader className="p-0 pb-2 border-b border-slate-800">
        <CardTitle className="text-base font-bold text-white flex items-center gap-2">
          <FunctionSquare className="h-4 w-4 text-sky-400" /> {title}
        </CardTitle>
        {explanation && <CardDescription className="text-xs text-slate-400">{explanation}</CardDescription>}
      </CardHeader>

      <CardContent className="p-0 space-y-4">
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 font-mono text-sm text-sky-400 font-bold overflow-x-auto">
          {formula}
        </div>

        {variables.length > 0 && (
          <div className="space-y-1.5 pt-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Variable Definitions:
            </span>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {variables.map((v, i) => (
                <li key={i} className="flex items-center gap-2 p-2 rounded-lg bg-slate-950/40 border border-slate-800/50">
                  <span className="font-mono font-bold text-sky-400">{v.symbol}</span>
                  <span className="text-slate-300">= {v.label}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default FormulaSection;
