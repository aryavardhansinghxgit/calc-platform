"use client";

import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { formatCurrency } from "@/lib/calculator-engine/formatters";

export interface MortgagePieChartProps {
  principalAndInterest: number;
  propertyTax: number;
  insurance: number;
  otherCosts: number; // Includes PMI, HOA, and Other Costs
  pmi?: number;
  hoa?: number;
  extraPayment?: number;
}

export function MortgagePieChart({
  principalAndInterest,
  propertyTax,
  insurance,
  otherCosts,
  pmi = 0,
  hoa = 0,
  extraPayment = 0,
}: MortgagePieChartProps) {
  // Aggregate other costs if separate pmi/hoa were passed
  const aggregateOtherCosts = Math.max(0, otherCosts + pmi + hoa);

  const data = [
    { name: "Principal & Interest", value: Math.max(0, principalAndInterest), color: "#3B82F6" },
    { name: "Property Tax", value: Math.max(0, propertyTax), color: "#10B981" },
    { name: "Home Insurance", value: Math.max(0, insurance), color: "#F59E0B" },
    { name: "Other Costs (PMI/HOA)", value: Math.max(0, aggregateOtherCosts), color: "#8B5CF6" },
    { name: "Extra Payment", value: Math.max(0, extraPayment), color: "#EC4899" },
  ].filter((d) => d.value > 0);

  const totalMonthly = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="h-56 w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={3}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" strokeWidth={0} />
              ))}
            </Pie>
            <Tooltip
              formatter={(val: any) => [formatCurrency(Number(val ?? 0)), "Monthly"]}
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
        {/* Center overlay badge */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-8">
          <span className="text-[10px] uppercase font-semibold tracking-wider text-zinc-400 dark:text-zinc-500">
            Total Monthly
          </span>
          <span className="text-sm font-extrabold text-zinc-900 dark:text-zinc-100 font-mono">
            {formatCurrency(totalMonthly)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default MortgagePieChart;
