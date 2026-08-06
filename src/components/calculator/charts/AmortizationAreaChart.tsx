"use client";

import React from "react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Layers } from "lucide-react";
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
    <Card className="bg-slate-900/90 border-slate-800/80 rounded-[12px] p-5 space-y-4">
      <CardHeader className="p-0 pb-2 border-b border-slate-800">
        <CardTitle className="text-sm font-bold text-white flex items-center gap-2">
          <Layers className="h-4 w-4 text-sky-400" /> Cumulative Principal vs Interest
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorPrincipal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#34d399" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorInterest" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
              </linearGradient>
            </defs>
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
              ]}
              contentStyle={{ backgroundColor: "#0f172a", borderColor: "#1e293b", borderRadius: "12px", color: "#f8fafc" }}
            />

            <Legend verticalAlign="bottom" height={36} formatter={(value) => <span className="text-xs text-slate-300 font-medium">{value}</span>} />
            <Area
              type="monotone"
              dataKey="principal"
              name="Cumulative Principal"
              stroke="#34d399"
              fillOpacity={1}
              fill="url(#colorPrincipal)"
            />
            <Area
              type="monotone"
              dataKey="interest"
              name="Cumulative Interest"
              stroke="#f59e0b"
              fillOpacity={1}
              fill="url(#colorInterest)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default AmortizationAreaChart;
