"use client";

import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  ReferenceLine,
} from "recharts";
import { PregnancyCalculationResults } from "@/lib/calculator-engine/formulas/pregnancy";
import { FETAL_WEEKLY_DATA } from "./fetalData";

interface PregnancyChartsProps {
  results: PregnancyCalculationResults;
}

export const PregnancyCharts: React.FC<PregnancyChartsProps> = ({ results }) => {
  const currentWeek = results.gestationalAgeWeeks;

  // 1. Fetal Growth Data (Weeks 4 to 42 - Complete reference range)
  const fetalGrowthData = Array.from({ length: 39 }, (_, i) => {
    const w = i + 4;
    const item = FETAL_WEEKLY_DATA[w] || FETAL_WEEKLY_DATA[42];
    return {
      week: `W${w}`,
      weekNum: w,
      weightGrams: item.weightGrams,
      lengthCm: item.lengthCm,
      isCurrent: w === currentWeek,
    };
  });

  // Current Fetal Weight pill label: does not display fictitious weight for pre-conception weeks
  const fetalBadgeLabel =
    currentWeek <= 2
      ? `Current: W${currentWeek} (Pre-conception stage)`
      : currentWeek === 3
      ? `Current: W3 (Implantation stage)`
      : `Current: W${currentWeek} (${FETAL_WEEKLY_DATA[currentWeek]?.weightGrams ?? FETAL_WEEKLY_DATA[42].weightGrams}g)`;

  // 2. Weight Gain Corridor Data (Calibrated to IOM 2009 Trimester Progression)
  const t1Min = 1.1;
  const t1Max = 4.4;
  const weightGainData = Array.from({ length: 41 }, (_, w) => {
    let minRec: number;
    let maxRec: number;
    if (w <= 13) {
      minRec = (t1Min * (w / 13));
      maxRec = (t1Max * (w / 13));
    } else {
      const postT1 = w - 13;
      minRec = t1Min + postT1 * ((results.weightMetrics.minRecommendedLbs - t1Min) / 27);
      maxRec = t1Max + postT1 * ((results.weightMetrics.maxRecommendedLbs - t1Max) / 27);
    }
    const isPastOrCurrent = w <= currentWeek;
    const actualGain = isPastOrCurrent ? (results.weightMetrics.currentGainLbs / Math.max(1, currentWeek)) * w : null;

    return {
      week: `W${w}`,
      weekNum: w,
      minRec: Math.round(minRec * 10) / 10,
      maxRec: Math.round(maxRec * 10) / 10,
      actualGain: actualGain !== null ? Math.round(actualGain * 10) / 10 : undefined,
    };
  });

  // 3. Due Date Probability Distribution (Weeks 36 to 42+ Population Delivery Timing)
  const probabilityData = [
    { week: "W36", label: "Preterm", percent: 4, desc: "Delivery prior to 37 completed weeks" },
    { week: "W37", label: "Early Term", percent: 12, desc: "Weeks 37w0d - 37w6d" },
    { week: "W38", label: "Early Term", percent: 22, desc: "Weeks 38w0d - 38w6d" },
    { week: "W39", label: "Full Term", percent: 32, desc: "Weeks 39w0d - 39w6d (Peak Window)" },
    { week: "W40", label: "Due Date", percent: 20, desc: "Due date week (~4% deliver on exact EDD)" },
    { week: "W41", label: "Late Term", percent: 8, desc: "Weeks 41w0d - 41w6d" },
    { week: "W42+", label: "Post Term", percent: 2, desc: "Weeks 42w0d and beyond" },
  ];

  return (
    <div className="space-y-6 my-6">
      {/* Chart 1: Fetal Weight & Length Growth Trajectory */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">Fetal Growth Trajectory (Weight in Grams)
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              Standard fetal weight progression from Week 4 through Week 42 (Hadlock & INTERGROWTH-21st reference standard)
            </p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300">
            {fetalBadgeLabel}
          </span>
        </div>

        <div className="h-64 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={fetalGrowthData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
              <defs>
                <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
              <XAxis dataKey="week" tick={{ fontSize: 11 }} interval={3} stroke="#9ca3af" />
              <YAxis tick={{ fontSize: 11 }} stroke="#9ca3af" unit="g" />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="p-2.5 rounded-lg bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 text-blue-700 dark:text-blue-400 text-xs space-y-1 shadow-lg border border-zinc-700">
                        <p className="font-bold text-rose-300">{data.week} Fetal Reference Size</p>
                        <p>Estimated Weight: <span className="font-semibold text-white">{data.weightGrams} g</span></p>
                        <p>Estimated Length: <span className="font-semibold text-white">{data.lengthCm} cm</span></p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area type="monotone" dataKey="weightGrams" stroke="#f43f5e" strokeWidth={2.5} fillOpacity={1} fill="url(#colorWeight)" />
              {currentWeek >= 4 && currentWeek <= 42 && (
                <ReferenceLine x={`W${currentWeek}`} stroke="#f43f5e" strokeDasharray="3 3" label={{ value: `W${currentWeek}`, fill: "#f43f5e", fontSize: 11, position: "top" }} />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart 2: Weight Gain Corridor Tracking */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">Maternal Weight Gain Corridor (IOM 2009 Standards)
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              Recommended cumulative weight gain band for {results.weightMetrics.bmiCategory} BMI ({results.weightMetrics.minRecommendedLbs} – {results.weightMetrics.maxRecommendedLbs} lbs)
            </p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
            Gain: {results.weightMetrics.currentGainLbs} lbs ({results.weightMetrics.status})
          </span>
        </div>

        <div className="h-64 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={weightGainData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
              <defs>
                <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
              <XAxis dataKey="week" tick={{ fontSize: 11 }} interval={4} stroke="#9ca3af" />
              <YAxis tick={{ fontSize: 11 }} stroke="#9ca3af" unit=" lbs" />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="p-2.5 rounded-lg bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 text-blue-700 dark:text-blue-400 text-xs space-y-1 shadow-lg border border-zinc-700">
                        <p className="font-bold text-emerald-300">{data.week}</p>
                        <p>Recommended Min: <span className="font-semibold">{data.minRec} lbs</span></p>
                        <p>Recommended Max: <span className="font-semibold">{data.maxRec} lbs</span></p>
                        {data.actualGain !== undefined && (
                          <p className="text-rose-300">Your Gain: <span className="font-semibold text-white">{data.actualGain} lbs</span></p>
                        )}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area type="monotone" dataKey="maxRec" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorTarget)" />
              <Area type="monotone" dataKey="minRec" stroke="#059669" strokeWidth={1.5} fillOpacity={0} />
              {currentWeek <= 40 && (
                <ReferenceLine x={`W${currentWeek}`} stroke="#10b981" strokeDasharray="3 3" label={{ value: `Week ${currentWeek}`, fill: "#10b981", fontSize: 11, position: "top" }} />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart 3: Due Date Birth Timing Population Distribution */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-3">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">Birth Timing Population Distribution Window
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            Population delivery timing distribution across gestational weeks (US Vital Statistics / CDC benchmark reference; individual birth timing varies)
          </p>
        </div>

        <div className="h-56 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={probabilityData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
              <XAxis dataKey="week" tick={{ fontSize: 11 }} stroke="#9ca3af" />
              <YAxis tick={{ fontSize: 11 }} stroke="#9ca3af" unit="%" />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="p-2.5 rounded-lg bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 text-blue-700 dark:text-blue-400 text-xs space-y-1 shadow-lg border border-zinc-700">
                        <p className="font-bold text-amber-300">{data.week} ({data.label})</p>
                        <p>Population Share: <span className="font-semibold text-white">{data.percent}%</span></p>
                        <p className="text-zinc-400 text-[11px]">{data.desc}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="percent" fill="#f43f5e" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
