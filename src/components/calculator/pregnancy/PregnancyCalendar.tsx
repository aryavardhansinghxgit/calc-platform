"use client";

import React, { useState } from "react";
import { PregnancyCalculationResults, MilestoneItem } from "@/lib/calculator-engine/formulas/pregnancy";
import { Calendar as CalendarIcon, CheckCircle2, Circle, Clock, Stethoscope, Sparkles } from "lucide-react";

interface PregnancyCalendarProps {
  results: PregnancyCalculationResults;
}

export const PregnancyCalendar: React.FC<PregnancyCalendarProps> = ({ results }) => {
  const [activeTab, setActiveTab] = useState<"milestones" | "trimesters">("milestones");
  const [filterCategory, setFilterCategory] = useState<"all" | "clinical" | "developmental">("all");

  const filteredMilestones = results.milestones.filter((m) => {
    if (filterCategory === "all") return true;
    return m.category === filterCategory;
  });

  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4 my-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-200 dark:border-zinc-800 pb-3">
        <div>
          <h3 className="text-base font-extrabold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-rose-500" />
            Interactive Pregnancy Calendar & Milestones
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Key clinical screenings, developmental check-ins, and milestone timelines
          </p>
        </div>

        <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setActiveTab("milestones")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === "milestones"
                ? "bg-white dark:bg-zinc-900 text-rose-600 dark:text-rose-400 shadow-sm font-bold"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
            }`}
          >
            Milestone Timeline ({results.milestones.length})
          </button>
          <button
            onClick={() => setActiveTab("trimesters")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === "trimesters"
                ? "bg-white dark:bg-zinc-900 text-rose-600 dark:text-rose-400 shadow-sm font-bold"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
            }`}
          >
            Trimester Schedule
          </button>
        </div>
      </div>

      {activeTab === "milestones" && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-zinc-500 dark:text-zinc-400 font-medium">Filter by:</span>
            <button
              onClick={() => setFilterCategory("all")}
              className={`px-2.5 py-1 rounded-full border transition-all ${
                filterCategory === "all"
                  ? "bg-rose-50 dark:bg-rose-950/60 border-rose-300 dark:border-rose-800 text-rose-700 dark:text-rose-300 font-semibold"
                  : "border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400"
              }`}
            >
              All Events
            </button>
            <button
              onClick={() => setFilterCategory("clinical")}
              className={`px-2.5 py-1 rounded-full border transition-all ${
                filterCategory === "clinical"
                  ? "bg-rose-50 dark:bg-rose-950/60 border-rose-300 dark:border-rose-800 text-rose-700 dark:text-rose-300 font-semibold"
                  : "border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400"
              }`}
            >
              Clinical & Ultrasound Scans
            </button>
            <button
              onClick={() => setFilterCategory("developmental")}
              className={`px-2.5 py-1 rounded-full border transition-all ${
                filterCategory === "developmental"
                  ? "bg-rose-50 dark:bg-rose-950/60 border-rose-300 dark:border-rose-800 text-rose-700 dark:text-rose-300 font-semibold"
                  : "border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400"
              }`}
            >
              Baby Growth & Milestones
            </button>
          </div>

          <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
            {filteredMilestones.map((m) => (
              <div
                key={m.id}
                className={`p-3 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                  m.isPassed
                    ? "bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/40 opacity-85"
                    : m.week === results.gestationalAgeWeeks
                    ? "bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 ring-1 ring-rose-400"
                    : "bg-zinc-50 dark:bg-zinc-800/40 border-zinc-200 dark:border-zinc-800"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {m.isPassed ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <Circle className="h-5 w-5 text-zinc-400" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-zinc-900 dark:text-zinc-100">{m.title}</span>
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300">
                        Week {m.week}
                      </span>
                      {m.category === "clinical" && (
                        <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                          Medical Scan
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">{m.description}</p>
                  </div>
                </div>

                <div className="text-right whitespace-nowrap">
                  <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 block">{m.dateStr}</span>
                  <span className="text-[10px] text-zinc-500 dark:text-zinc-400">
                    {m.isPassed ? "Completed" : "Upcoming"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "trimesters" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
          {results.trimesters.map((t) => (
            <div
              key={t.trimester}
              className={`p-4 rounded-xl border space-y-2 ${
                results.currentTrimester === t.trimester
                  ? "bg-rose-50/60 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 ring-1 ring-rose-400"
                  : "bg-zinc-50 dark:bg-zinc-800/40 border-zinc-200 dark:border-zinc-800 opacity-90"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-zinc-900 dark:text-zinc-100">{t.name}</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-900/60 text-rose-700 dark:text-rose-300">
                  {t.weeksRange}
                </span>
              </div>
              <div className="text-xs text-zinc-600 dark:text-zinc-400 space-y-1">
                <p>Start: <span className="font-medium text-zinc-800 dark:text-zinc-200">{t.startDateStr}</span></p>
                <p>End: <span className="font-medium text-zinc-800 dark:text-zinc-200">{t.endDateStr}</span></p>
              </div>
              <div className="space-y-1 pt-1">
                <div className="flex justify-between text-[11px] font-medium text-zinc-500">
                  <span>Trimester Progress</span>
                  <span>{t.progressPercent}%</span>
                </div>
                <div className="h-2 w-full bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                  <div className="h-full bg-rose-500 rounded-full" style={{ width: `${t.progressPercent}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
