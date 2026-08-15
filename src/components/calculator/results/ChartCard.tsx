"use client";

import React from "react";
import { PieChart, BarChart3 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export interface ChartSegment {
  label: string;
  value: number;
  color: string; // e.g. "#38bdf8", "#34d399", "#f59e0b"
  formattedValue?: string;
}

export interface ChartCardProps {
  title?: string;
  segments: ChartSegment[];
  centerLabel?: string;
  centerValue?: string;
}

export function ChartCard({
  title = "Visual Breakdown",
  segments,
  centerLabel = "Total",
  centerValue,
}: ChartCardProps) {
  const total = segments.reduce((sum, seg) => sum + Math.max(0, seg.value), 0);

  // Calculate SVG donut slice arcs
  let accumulatedAngle = 0;
  const radius = 40;
  const strokeWidth = 14;
  const circumference = 2 * Math.PI * radius;

  return (
    <Card className="bg-slate-900/90 border-slate-800/80 rounded-[12px] p-5 space-y-4">
      <CardHeader className="p-0 pb-2 border-b border-slate-800">
        <CardTitle className="text-sm font-bold text-white flex items-center gap-2">
          <PieChart className="h-4 w-4 text-sky-400" /> {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0 flex flex-col sm:flex-row items-center justify-around gap-6">
        {/* SVG Donut Chart */}
        <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {segments.map((seg, idx) => {
              const portion = total > 0 ? seg.value / total : 0;
              const strokeDasharray = `${portion * circumference} ${circumference}`;
              const strokeDashoffset = -accumulatedAngle * circumference;
              accumulatedAngle += portion;

              return (
                <circle
                  key={idx}
                  cx="50"
                  cy="50"
                  r={radius}
                  fill="transparent"
                  stroke={seg.color}
                  strokeWidth={strokeWidth}
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-500 ease-out"
                />
              );
            })}
          </svg>
          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className="text-[10px] uppercase font-semibold text-slate-400">
              {centerLabel}
            </span>
            {centerValue && (
              <span className="text-xs font-bold text-white font-sans tabular-nums">{centerValue}</span>
            )}
          </div>
        </div>

        {/* Legend List */}
        <div className="space-y-2.5 w-full sm:w-auto">
          {segments.map((seg, idx) => {
            const pct = total > 0 ? Math.round((seg.value / total) * 100) : 0;
            return (
              <div key={idx} className="flex items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full shrink-0" style={{ backgroundColor: seg.color }} />
                  <span className="text-slate-300 font-medium">{seg.label}</span>
                </div>
                <div className="flex items-center gap-2 font-sans tabular-nums">
                  <span className="font-bold text-white">
                    {seg.formattedValue || `$${seg.value.toLocaleString()}`}
                  </span>
                  <span className="text-[10px] text-slate-400">({pct}%)</span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

export default ChartCard;
