"use client";

import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";
import { AnnualEmiRow } from "@/modules/emi/types";
import { formatCurrency, formatCompactNumber } from "@/lib/calculator-engine/formatters";

export interface EmiYearlyBarChartProps {
  annualSchedule: AnnualEmiRow[];
}

export function EmiYearlyBarChart({ annualSchedule }: EmiYearlyBarChartProps) {
  if (!annualSchedule || annualSchedule.length === 0) return null;

  const data = annualSchedule.map((row) => ({
    year: `Year ${row.year}`,
    principal: Math.round(row.principalPaid),
    interest: Math.round(row.interestPaid),
  }));

  return (
    <div className="h-56 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" opacity={0.5} />
          <XAxis dataKey="year" stroke="#a1a1aa" tick={{ fontSize: 10 }} />
          <YAxis stroke="#a1a1aa" tick={{ fontSize: 10 }} tickFormatter={(val) => formatCompactNumber(val)} />
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
          <Bar dataKey="principal" name="Principal Paid" fill="#3B82F6" stackId="a" radius={[0, 0, 0, 0]} />
          <Bar dataKey="interest" name="Interest Paid" fill="#10B981" stackId="a" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default EmiYearlyBarChart;
