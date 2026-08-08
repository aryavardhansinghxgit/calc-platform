"use client";

import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell } from "recharts";
import { formatCurrency, formatCompactNumber } from "@/lib/calculator-engine/formatters";

export interface RefinanceInterestChartProps {
  currentRemainingInterest: number;
  newLoanTotalInterest: number;
}

export function RefinanceInterestChart({
  currentRemainingInterest,
  newLoanTotalInterest,
}: RefinanceInterestChartProps) {
  const data = [
    { name: "Current Remaining Interest", amount: Math.round(currentRemainingInterest), color: "#F59E0B" },
    { name: "New Loan Interest", amount: Math.round(newLoanTotalInterest), color: "#3B82F6" },
  ];

  return (
    <div className="h-56 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" opacity={0.5} />
          <XAxis dataKey="name" stroke="#a1a1aa" tick={{ fontSize: 10 }} />
          <YAxis stroke="#a1a1aa" tick={{ fontSize: 10 }} tickFormatter={(val) => `$${formatCompactNumber(val)}`} />
          <Tooltip
            formatter={(val: any) => [formatCurrency(Number(val ?? 0)), "Total Interest"]}
            contentStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              borderColor: "#e4e4e7",
              borderRadius: "8px",
              fontSize: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            }}
          />
          <Bar dataKey="amount" radius={[6, 6, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default RefinanceInterestChart;
