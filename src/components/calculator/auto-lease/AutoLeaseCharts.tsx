"use client";

import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";
import { formatCurrency } from "@/lib/calculator-engine/formatters";
import { LeaseVsBuyResult } from "@/lib/calculator-engine/formulas/auto-lease";

// ==========================================
// CHART 1: PAYMENT COMPOSITION DOUGHNUT
// ==========================================
export interface AutoLeasePaymentDoughnutChartProps {
  monthlyDepreciation: number;
  monthlyFinanceFee: number;
  monthlySalesTax: number;
  monthlyLeasePayment: number;
}

export function AutoLeasePaymentDoughnutChart({
  monthlyDepreciation,
  monthlyFinanceFee,
  monthlySalesTax,
  monthlyLeasePayment,
}: AutoLeasePaymentDoughnutChartProps) {
  const total = Math.max(0.01, monthlyLeasePayment);

  const data = [
    { name: "Depreciation Portion", value: Math.max(0, monthlyDepreciation), color: "#3B82F6" }, // Blue
    { name: "Finance Charge (Rent)", value: Math.max(0, monthlyFinanceFee), color: "#10B981" }, // Emerald
    { name: "Sales Tax", value: Math.max(0, monthlySalesTax), color: "#F59E0B" }, // Amber
  ].filter((item) => item.value > 0);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="h-64 w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="48%"
              innerRadius={55}
              outerRadius={88}
              paddingAngle={3}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-l-${index}`} fill={entry.color} stroke="transparent" strokeWidth={0} />
              ))}
            </Pie>
            <Tooltip
              formatter={(val: any, name: any) => [
                formatCurrency(Number(val ?? 0)),
                String(name),
              ]}
              contentStyle={{
                backgroundColor: "rgba(15, 23, 42, 0.95)",
                borderColor: "#334155",
                borderRadius: "8px",
                color: "#f8fafc",
                fontSize: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              }}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              iconSize={8}
              formatter={(value: string) => (
                <span className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400 mr-2">
                  {value}
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Center Text Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-8">
          <span className="text-[10px] uppercase font-semibold tracking-wider text-zinc-400 dark:text-zinc-500">
            Monthly Payment
          </span>
          <span className="text-sm font-extrabold text-zinc-900 dark:text-zinc-100 font-mono">
            {formatCurrency(total)}
          </span>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// CHART 2: LEASE COST TIMELINE (AREA)
// ==========================================
export interface AutoLeaseTimelineChartProps {
  monthlyPayment: number;
  upfrontCost: number;
  termMonths: number;
}

export function AutoLeaseTimelineChart({
  monthlyPayment,
  upfrontCost,
  termMonths,
}: AutoLeaseTimelineChartProps) {
  const data = [];
  let runningCost = upfrontCost;

  for (let m = 1; m <= termMonths; m++) {
    runningCost += monthlyPayment;
    data.push({
      month: `Mo ${m}`,
      CumulativeCost: Math.round(runningCost),
    });
  }

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="leaseCostGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(161,161,170,0.15)" />
          <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#71717a" }} tickLine={false} />
          <YAxis
            tick={{ fontSize: 10, fill: "#71717a" }}
            tickLine={false}
            tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
          />
          <Tooltip
            formatter={(val: any) => [formatCurrency(Number(val ?? 0)), "Cumulative Lease Outlay"]}
            contentStyle={{
              backgroundColor: "rgba(15, 23, 42, 0.95)",
              borderColor: "#334155",
              borderRadius: "8px",
              color: "#f8fafc",
              fontSize: "12px",
            }}
          />
          <Legend
            verticalAlign="top"
            height={32}
            iconSize={8}
            formatter={() => (
              <span className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400 mr-3">
                Cumulative Cash Outlay Over Lease Term
              </span>
            )}
          />
          <Area
            type="monotone"
            dataKey="CumulativeCost"
            stroke="#3B82F6"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#leaseCostGrad)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

// ==========================================
// CHART 3: LEASE VS BUY COMPARISON (BAR CHART)
// ==========================================
export interface AutoLeaseVsBuyBarChartProps {
  leaseVsBuy: LeaseVsBuyResult;
}

export function AutoLeaseVsBuyBarChart({ leaseVsBuy }: AutoLeaseVsBuyBarChartProps) {
  const data = [
    {
      metric: "Monthly Payment",
      Leasing: leaseVsBuy.leaseMonthlyPayment,
      Buying: leaseVsBuy.buyMonthlyPayment,
    },
    {
      metric: "Total Cash Outlay",
      Leasing: leaseVsBuy.leaseTotalOutlay,
      Buying: leaseVsBuy.buyTotalOutlay,
    },
    {
      metric: "Net Effective Cost",
      Leasing: leaseVsBuy.leaseNetEffectiveCost,
      Buying: leaseVsBuy.buyNetEffectiveCost,
    },
  ];

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(161,161,170,0.15)" />
          <XAxis dataKey="metric" tick={{ fontSize: 10, fill: "#71717a" }} tickLine={false} />
          <YAxis
            tick={{ fontSize: 10, fill: "#71717a" }}
            tickLine={false}
            tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
          />
          <Tooltip
            formatter={(val: any, name: any) => [formatCurrency(Number(val ?? 0)), String(name)]}
            contentStyle={{
              backgroundColor: "rgba(15, 23, 42, 0.95)",
              borderColor: "#334155",
              borderRadius: "8px",
              color: "#f8fafc",
              fontSize: "12px",
            }}
          />
          <Legend
            verticalAlign="top"
            height={32}
            iconSize={8}
            formatter={(val: string) => (
              <span className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400 mr-3">
                {val}
              </span>
            )}
          />
          <Bar dataKey="Leasing" fill="#3B82F6" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Buying" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
