"use client";

import React from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { LoanAmortizationRow } from "@/modules/loan/types";
import { formatCurrency, formatCompactNumber } from "@/lib/calculator-engine/formatters";

export interface LoanBalanceLineChartProps {
  schedule: LoanAmortizationRow[];
}

export function LoanBalanceLineChart({ schedule }: LoanBalanceLineChartProps) {
  if (!schedule || schedule.length === 0) return null;

  const step = Math.max(1, Math.floor(schedule.length / 36));
  const sampledData = schedule
    .filter((_, idx) => idx % step === 0 || idx === schedule.length - 1)
    .map((row) => ({
      period: `#${row.paymentNumber}`,
      date: row.paymentDate,
      balance: Math.round(row.endingBalance),
    }));

  return (
    <div className="h-56 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={sampledData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
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
            dataKey="balance"
            name="Remaining Balance"
            stroke="#3B82F6"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 5, fill: "#3B82F6" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default LoanBalanceLineChart;
