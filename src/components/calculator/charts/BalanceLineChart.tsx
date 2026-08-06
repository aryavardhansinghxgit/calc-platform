"use client";

import React from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { TrendingDown } from "lucide-react";
import { AmortizationRow } from "@/lib/calculator-engine/formulas/mortgage";
import { formatCurrency, formatCompactNumber } from "@/lib/calculator-engine/formatters";

export interface BalanceLineChartProps {
  schedule: AmortizationRow[];
}

export function BalanceLineChart({ schedule }: BalanceLineChartProps) {
  const sampledData = schedule.filter((_, idx) => idx % 12 === 0 || idx === schedule.length - 1);

  return (
    <Card className="bg-slate-900/90 border-slate-800/80 rounded-[12px] p-5 space-y-4">
      <CardHeader className="p-0 pb-2 border-b border-slate-800">
        <CardTitle className="text-sm font-bold text-white flex items-center gap-2">
          <TrendingDown className="h-4 w-4 text-sky-400" /> Remaining Balance Over Time
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={sampledData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="date" stroke="#64748b" tick={{ fontSize: 11 }} />
            <YAxis
              stroke="#64748b"
              tick={{ fontSize: 11 }}
              tickFormatter={(val) => `$${formatCompactNumber(val)}`}
            />
            <Tooltip
              formatter={(val: any) => [
                formatCurrency(Number(val ?? 0)),
                "Remaining Loan Balance",
              ]}
              contentStyle={{ backgroundColor: "#0f172a", borderColor: "#1e293b", borderRadius: "12px", color: "#f8fafc" }}
            />

            <Line
              type="monotone"
              dataKey="remainingBalance"
              name="Balance"
              stroke="#38bdf8"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6, fill: "#38bdf8" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default BalanceLineChart;
