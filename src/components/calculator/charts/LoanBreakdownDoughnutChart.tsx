"use client";

import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { formatCurrency } from "@/lib/calculator-engine/formatters";

export interface LoanBreakdownDoughnutChartProps {
  totalPrincipal: number;
  totalInterest: number;
}

export function LoanBreakdownDoughnutChart({
  totalPrincipal,
  totalInterest,
}: LoanBreakdownDoughnutChartProps) {
  const total = Math.max(0.01, totalPrincipal + totalInterest);
  const principalPct = ((totalPrincipal / total) * 100).toFixed(1);
  const interestPct = ((totalInterest / total) * 100).toFixed(1);

  const data = [
    { name: `Principal (${principalPct}%)`, value: Math.max(0, totalPrincipal), color: "#3B82F6" },
    { name: `Interest (${interestPct}%)`, value: Math.max(0, totalInterest), color: "#10B981" },
  ];

  return (
    <div className="w-full flex flex-col items-center">
      <div className="h-56 w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={52}
              outerRadius={82}
              paddingAngle={3}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" strokeWidth={0} />
              ))}
            </Pie>
            <Tooltip
              formatter={(val: any) => [formatCurrency(Number(val ?? 0)), "Total"]}
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
              height={36}
              iconSize={8}
              formatter={(value: string) => (
                <span className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400 mr-2">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Center Overlay Badge */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-8">
          <span className="text-[10px] uppercase font-semibold tracking-wider text-zinc-400 dark:text-zinc-500">
            Total Loan Cost
          </span>
          <span className="text-sm font-extrabold text-zinc-900 dark:text-zinc-100 font-sans tabular-nums">
            {formatCurrency(total)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default LoanBreakdownDoughnutChart;
