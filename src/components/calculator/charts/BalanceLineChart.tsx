"use client";

import React from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { AmortizationRow } from "@/lib/calculator-engine/formulas/mortgage";
import { formatCurrency, formatCompactNumber } from "@/lib/calculator-engine/formatters";

export interface BalanceLineChartProps {
  schedule: AmortizationRow[];
}

export function BalanceLineChart({ schedule }: BalanceLineChartProps) {
  const sampledData = schedule.filter((_, idx) => idx % 12 === 0 || idx === schedule.length - 1);

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3">
      <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-2">Remaining Balance</p>
      <div className="h-52">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={sampledData} margin={{ top: 4, right: 8, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
            <XAxis dataKey="date" stroke="#a1a1aa" tick={{ fontSize: 10 }} />
            <YAxis stroke="#a1a1aa" tick={{ fontSize: 10 }} tickFormatter={(val) => `$${formatCompactNumber(val)}`} />
            <Tooltip
              formatter={(val: any) => [formatCurrency(Number(val ?? 0)), "Balance"]}
              contentStyle={{ backgroundColor: "#fff", borderColor: "#e4e4e7", borderRadius: "8px", fontSize: "12px" }}
            />
            <Line type="monotone" dataKey="remainingBalance" name="Balance" stroke="#3B82F6" strokeWidth={2} dot={false} activeDot={{ r: 4, fill: "#3B82F6" }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default BalanceLineChart;
