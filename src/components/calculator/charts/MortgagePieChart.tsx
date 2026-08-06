"use client";

import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { PieChart as PieIcon } from "lucide-react";
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
    { name: "Principal & Interest", value: principalAndInterest, color: "#38bdf8" },
    { name: "Property Tax", value: propertyTax, color: "#34d399" },
    { name: "Home Insurance", value: insurance, color: "#f59e0b" },
    { name: "HOA Fees", value: hoa, color: "#a855f7" },
    { name: "Extra Principal", value: extraPayment, color: "#f43f5e" },
  ].filter((d) => d.value > 0);

  return (
    <Card className="bg-slate-900/90 border-slate-800/80 rounded-[12px] p-5 space-y-4">
      <CardHeader className="p-0 pb-2 border-b border-slate-800">
        <CardTitle className="text-sm font-bold text-white flex items-center gap-2">
          <PieIcon className="h-4 w-4 text-sky-400" /> Monthly Payment Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={4}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="#0f172a" strokeWidth={2} />
              ))}
            </Pie>
            <Tooltip
              formatter={(val: any) => [
                formatCurrency(Number(val ?? 0)),
                "Monthly Amount",
              ]}
              contentStyle={{ backgroundColor: "#0f172a", borderColor: "#1e293b", borderRadius: "12px", color: "#f8fafc" }}
            />

            <Legend
              verticalAlign="bottom"
              height={36}
              formatter={(value: string) => <span className="text-xs text-slate-300 font-medium">{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default MortgagePieChart;
