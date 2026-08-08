"use client";

import React from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ReferenceLine } from "recharts";
import { RefinanceTimelinePoint } from "@/modules/refinance/types";
import { formatCurrency, formatCompactNumber } from "@/lib/calculator-engine/formatters";

export interface RefinanceBreakEvenChartProps {
  timelineData: RefinanceTimelinePoint[];
  breakEvenMonths: number;
}

export function RefinanceBreakEvenChart({
  timelineData,
  breakEvenMonths,
}: RefinanceBreakEvenChartProps) {
  if (!timelineData || timelineData.length === 0) return null;

  const data = timelineData.map((pt) => ({
    monthStr: `Mo ${pt.month}`,
    netDifference: pt.netDifference,
  }));

  return (
    <div className="h-56 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" opacity={0.5} />
          <XAxis dataKey="monthStr" stroke="#a1a1aa" tick={{ fontSize: 10 }} />
          <YAxis stroke="#a1a1aa" tick={{ fontSize: 10 }} tickFormatter={(val) => `$${formatCompactNumber(val)}`} />
          <Tooltip
            formatter={(val: any) => [formatCurrency(Number(val ?? 0)), "Cumulative Savings / (Cost)"]}
            contentStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              borderColor: "#e4e4e7",
              borderRadius: "8px",
              fontSize: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            }}
          />
          <ReferenceLine y={0} stroke="#9CA3AF" strokeDasharray="3 3" />
          {breakEvenMonths > 0 && breakEvenMonths < 300 && (
            <ReferenceLine x={`Mo ${breakEvenMonths}`} stroke="#10B981" label={{ value: "Break-Even", fontSize: 10, fill: "#10B981" }} />
          )}
          <Line
            type="monotone"
            dataKey="netDifference"
            name="Net Savings / (Cost)"
            stroke="#10B981"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 5, fill: "#10B981" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default RefinanceBreakEvenChart;
