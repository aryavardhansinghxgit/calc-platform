"use client";

import React from "react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";
import { AmortizationRow } from "@/lib/calculator-engine/formulas/mortgage";
import { formatCurrency, formatCompactNumber } from "@/lib/calculator-engine/formatters";

export interface AmortizationAreaChartProps {
  schedule: AmortizationRow[];
}

export function AmortizationAreaChart({ schedule }: AmortizationAreaChartProps) {
  if (!schedule || schedule.length === 0) return null;

  let cumPrincipal = 0;
  const chartData: Array<{ date: string; principal: number; interest: number }> = [];

  const step = Math.max(1, Math.floor(schedule.length / 36));

  schedule.forEach((row, idx) => {
    cumPrincipal += row.principalPaid + (row.extraPaid || 0);
    if (idx % step === 0 || idx === schedule.length - 1) {
      chartData.push({
        date: row.date,
        principal: Math.round(cumPrincipal),
        interest: Math.round(row.totalInterestPaid),
      });
    }
  });

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
          Principal vs. Interest Paid Over Time
        </h3>
        <span className="text-[10px] font-sans tabular-nums text-emerald-600 dark:text-emerald-400">
          Equity Growth
        </span>
      </div>
      <div className="h-60 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 12, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="colorPrincipal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorInterest" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" opacity={0.5} />
            <XAxis dataKey="date" stroke="#a1a1aa" tick={{ fontSize: 10 }} />
            <YAxis stroke="#a1a1aa" tick={{ fontSize: 10 }} tickFormatter={(val) => `$${formatCompactNumber(val)}`} />
            <Tooltip
              formatter={(val: any) => [formatCurrency(Number(val ?? 0))]}
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                borderColor: "#e4e4e7",
                borderRadius: "8px",
                fontSize: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              }}
            />
            <Legend
              verticalAlign="bottom"
              height={28}
              iconSize={8}
              formatter={(value) => (
                <span className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400 mr-2">{value}</span>
              )}
            />
            <Area
              type="monotone"
              dataKey="principal"
              name="Cumulative Principal"
              stroke="#10B981"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorPrincipal)"
            />
            <Area
              type="monotone"
              dataKey="interest"
              name="Cumulative Interest"
              stroke="#F59E0B"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorInterest)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default AmortizationAreaChart;
