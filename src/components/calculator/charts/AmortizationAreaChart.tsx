"use client";

import React from "react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";
import { AmortizationRow } from "@/lib/calculator-engine/formulas/mortgage";
import { formatCurrency, formatCompactNumber } from "@/lib/calculator-engine/formatters";

export interface AmortizationAreaChartProps {
  schedule: AmortizationRow[];
}

export function AmortizationAreaChart({ schedule }: AmortizationAreaChartProps) {
  let cumPrincipal = 0;
  const chartData: Array<{ date: string; principal: number; interest: number }> = [];

  schedule.forEach((row, idx) => {
    cumPrincipal += row.principalPaid;
    if (idx % 12 === 0 || idx === schedule.length - 1) {
      chartData.push({
        date: row.date,
        principal: Math.round(cumPrincipal),
        interest: Math.round(row.totalInterestPaid),
      });
    }
  });

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3">
      <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-2">Principal vs Interest</p>
      <div className="h-52">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 4, right: 8, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="colorPrincipal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorInterest" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
            <XAxis dataKey="date" stroke="#a1a1aa" tick={{ fontSize: 10 }} />
            <YAxis stroke="#a1a1aa" tick={{ fontSize: 10 }} tickFormatter={(val) => `$${formatCompactNumber(val)}`} />
            <Tooltip
              formatter={(val: any) => [formatCurrency(Number(val ?? 0))]}
              contentStyle={{ backgroundColor: "#fff", borderColor: "#e4e4e7", borderRadius: "8px", fontSize: "12px" }}
            />
            <Legend verticalAlign="bottom" height={24} iconSize={8} formatter={(value) => <span className="text-[11px] text-zinc-600 dark:text-zinc-400">{value}</span>} />
            <Area type="monotone" dataKey="principal" name="Principal" stroke="#10B981" fillOpacity={1} fill="url(#colorPrincipal)" />
            <Area type="monotone" dataKey="interest" name="Interest" stroke="#F59E0B" fillOpacity={1} fill="url(#colorInterest)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default AmortizationAreaChart;
