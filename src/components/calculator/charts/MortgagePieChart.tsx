"use client";

import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { formatCurrency } from "@/lib/calculator-engine/formatters";

export interface MortgagePieChartProps {
  principalAndInterest: number;
  propertyTax: number;
  insurance: number;
  hoa: number;
  extraPayment?: number;
}

export function MortgagePieChart({
  principalAndInterest,
  propertyTax,
  insurance,
  hoa,
  extraPayment = 0,
}: MortgagePieChartProps) {
  const data = [
    { name: "P&I", value: principalAndInterest, color: "#3B82F6" },
    { name: "Tax", value: propertyTax, color: "#10B981" },
    { name: "Insurance", value: insurance, color: "#F59E0B" },
    { name: "HOA", value: hoa, color: "#8B5CF6" },
    { name: "Extra", value: extraPayment, color: "#EF4444" },
  ].filter((d) => d.value > 0);

  return (
    <div className="h-48">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="45%"
            innerRadius={40}
            outerRadius={65}
            paddingAngle={3}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" strokeWidth={0} />
            ))}
          </Pie>
          <Tooltip
            formatter={(val: any) => [formatCurrency(Number(val ?? 0)), "Monthly"]}
            contentStyle={{ backgroundColor: "#fff", borderColor: "#e4e4e7", borderRadius: "8px", fontSize: "12px" }}
          />
          <Legend
            verticalAlign="bottom"
            height={28}
            iconSize={8}
            formatter={(value: string) => <span className="text-[11px] text-zinc-600 dark:text-zinc-400">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MortgagePieChart;
