"use client";

import React from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";
import { LoanAmortizationRow } from "@/modules/loan/types";
import { formatCurrency, formatCompactNumber } from "@/lib/calculator-engine/formatters";

export interface LoanPrincipalInterestChartProps {
  schedule: LoanAmortizationRow[];
}

export function LoanPrincipalInterestChart({ schedule }: LoanPrincipalInterestChartProps) {
  if (!schedule || schedule.length === 0) return null;

  const step = Math.max(1, Math.floor(schedule.length / 36));
  const sampledData = schedule
    .filter((_, idx) => idx % step === 0 || idx === schedule.length - 1)
    .map((row) => ({
      date: row.paymentDate,
      cumulativePrincipal: Math.round(row.cumulativePrincipal),
      cumulativeInterest: Math.round(row.cumulativeInterest),
    }));

  return (
    <div className="h-56 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={sampledData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
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
          <Line
            type="monotone"
            dataKey="cumulativePrincipal"
            name="Cumulative Principal"
            stroke="#10B981"
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="cumulativeInterest"
            name="Cumulative Interest"
            stroke="#F59E0B"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default LoanPrincipalInterestChart;
