"use client";

import React from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { AmortizationRow } from "@/lib/calculator-engine/formulas/mortgage";
import { formatCurrency, formatCompactNumber } from "@/lib/calculator-engine/formatters";

export interface BalanceLineChartProps {
  schedule: AmortizationRow[];
}

export function BalanceLineChart({ schedule }: BalanceLineChartProps) {
  if (!schedule || schedule.length === 0) return null;

  // Sample data to keep chart smooth (e.g., yearly intervals or max 40 points)
  const step = Math.max(1, Math.floor(schedule.length / 36));
  const sampledData = schedule.filter((_, idx) => idx % step === 0 || idx === schedule.length - 1);

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
          Loan Balance Over Time
        </h3>
        <span className="text-[10px] font-sans tabular-nums text-blue-600 dark:text-blue-400">
          Payoff in {schedule.length} months
        </span>
      </div>
      <div className="h-60 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={sampledData} margin={{ top: 10, right: 12, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" opacity={0.5} />
            <XAxis dataKey="date" stroke="#a1a1aa" tick={{ fontSize: 10 }} />
            <YAxis stroke="#a1a1aa" tick={{ fontSize: 10 }} tickFormatter={(val) => `$${formatCompactNumber(val)}`} />
            <Tooltip
              formatter={(val: any) => [formatCurrency(Number(val ?? 0)), "Remaining Balance"]}
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                borderColor: "#e4e4e7",
                borderRadius: "8px",
                fontSize: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              }}
            />
            <Line
              type="monotone"
              dataKey="remainingBalance"
              name="Balance"
              stroke="#3B82F6"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 5, fill: "#3B82F6" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default BalanceLineChart;
