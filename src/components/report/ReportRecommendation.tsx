"use client";

import React from "react";
import { ReportRecommendationData } from "./types";

export interface ReportRecommendationProps {
  recommendation: ReportRecommendationData;
}

export function ReportRecommendation({ recommendation }: ReportRecommendationProps) {
  if (!recommendation) return null;

  return (
    <div className="border border-zinc-900 rounded-lg p-4 bg-zinc-50 space-y-2 mt-4">
      <div className="flex items-center justify-between border-b border-zinc-300 pb-1.5">
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600">
          {recommendation.title || "EXECUTIVE FINANCIAL RECOMMENDATION"}
        </h3>
        {recommendation.rating && (
          <span className="text-[10px] font-sans tabular-nums font-extrabold uppercase px-2 py-0.5 rounded bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 text-blue-700 dark:text-blue-400">
            {recommendation.rating} ({recommendation.score ?? 80}/100)
          </span>
        )}
      </div>

      <p className="text-xs text-zinc-800 leading-relaxed font-medium">
        {recommendation.text}
      </p>

      {recommendation.reasons && recommendation.reasons.length > 0 && (
        <ul className="space-y-1 text-xs text-zinc-700 font-medium pt-1 pl-2">
          {recommendation.reasons.map((r, idx) => (
            <li key={`rec-reason-${idx}`} className="flex items-start gap-1.5">
              <span className="font-bold text-zinc-900">•</span>
              <span>{r}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ReportRecommendation;
