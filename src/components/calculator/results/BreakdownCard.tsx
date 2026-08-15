"use client";

import React from "react";
import { Card, CardTitle, CardContent } from "@/components/ui/card";

export interface BreakdownItem {
  label: string;
  amount: string | number;
  percentage?: number;
  color?: string;
}

export interface BreakdownCardProps {
  title?: string;
  items: BreakdownItem[];
}

export function BreakdownCard({ title = "Payment Breakdown", items }: BreakdownCardProps) {
  return (
    <Card className="bg-slate-900/90 border-slate-800 rounded-[12px] p-5 space-y-4">
      {title && <CardTitle className="text-sm font-bold text-slate-200">{title}</CardTitle>}
      <CardContent className="p-0 space-y-3">
        {items.map((item, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-medium">{item.label}</span>
              <span className="font-sans tabular-nums font-bold text-white">{item.amount}</span>
            </div>
            {item.percentage !== undefined && (
              <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${item.color || "bg-sky-500"}`}
                  style={{ width: `${Math.min(100, Math.max(0, item.percentage))}%` }}
                />
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default BreakdownCard;
